import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "./services/api"

export default function Upload() {
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [projectName, setProjectName] = useState("")
  const [room, setRoom] = useState("Living Room")
  const [budget, setBudget] = useState(45000)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false) // حالة التحميل

  const rooms = ["Living Room","Bedroom","Office","Kitchen"]

  function handleFile(e){
    const selected = e.target.files[0]
    if(selected){
      setFile(selected)
    }
  }

  function saveProject(){
    const id = Date.now().toString()
    const name = projectName.trim() || "Untitled Project"
    const project = {
      id,
      name,
      room,
      budget: Number(budget) || 0,
      fileName: file?.name || "",
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("casaMoodProjectBudget", String(project.budget))
    localStorage.setItem("casaMoodProjectRoom", room)
    localStorage.setItem("casaMoodProjectName", name)
    localStorage.setItem("casaMoodLastProject", JSON.stringify(project))

    return project
  }

  function handleCreateProject(){
    handleAnalyze();
  }

  // --- التعديل الجوهري هنا لربط الـ API ---
  async function handleAnalyze(){
    if (!file) {
      setMessage("Please upload an image first.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    
    // تجهيز البيانات كـ FormData لإرسال الملف
    const formData = new FormData();
    formData.append("Name", projectName.trim() || "Untitled Project");
    formData.append("RoomType", room);
    formData.append("Budget", budget);
    formData.append("Image", file);

    try {
      const response = await api.post('/Projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const result = response.data;
      
      // التوجه لصفحة المشروع باستخدام الـ ID اللي راجع من السيرفر فعلياً
      navigate(`/dashboard/project/${result.id || result.projectId}`);
    } catch (err) {
      setMessage("Error during AI analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  // ------------------------------------------

  return (
    <div className="min-h-screen flex bg-[#f5f1ec]">
      
      <div className="max-w-6xl mx-auto space-y-10">

        <div className="bg-white rounded-2xl p-10 shadow">

          <h2 className="text-xl font-semibold mb-2">
            Design Image
          </h2>

          <p className="text-gray-500 mb-6">
            Upload a high-quality 2D design image (PNG, JPG)
          </p>

          <label className="border border-dashed border-[#d97757]/30 rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer bg-[#fffaf7] hover:bg-[#fff7f4] transition">

            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-[#d97757]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 3v12m0 0l4-4m-4 4l-4-4"/>
              </svg>
            </div>

            <p className="text-gray-700">
              Drop your design here, or <span className="text-[#d97757]">browse</span>
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Supports: JPG, PNG (Max 10MB)
            </p>

            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFile}
            />

          </label>

          {file && (
            <p className="mt-4 text-green-600">
              Uploaded: {file.name}
            </p>
          )}

        </div>

        <div className="bg-white rounded-2xl p-10 shadow space-y-8">

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e)=>setProjectName(e.target.value)}
            className="text-2xl font-semibold w-full outline-none border-b border-gray-300 focus:border-[#d97757] pb-2"
          />

          <div>
            <p className="text-gray-700 mb-4">Room Type</p>

            <div className="flex gap-4 flex-wrap">
              {rooms.map((r)=>(
                <button
                  key={r}
                  onClick={()=>setRoom(r)}
                  className={`px-10 py-4 rounded-full border transition
                  ${room===r
                    ? "border-[#d97757] text-[#d97757] bg-[#fff7f4]"
                    : "border-gray-300 text-gray-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-end">
            <label>
              <span className="block text-gray-700 mb-3">Available Budget</span>
              <div className="flex items-center gap-3 rounded-2xl border bg-[#fffaf7] px-5 py-4">
                <span className="font-semibold text-[#d97757]">EGP</span>
                <input
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e)=>setBudget(e.target.value)}
                  placeholder="Enter your budget"
                  className="w-full bg-transparent text-lg font-semibold text-[#2f2f2f] outline-none"
                />
              </div>
            </label>

            <div className="rounded-2xl bg-[#f1ebe6] px-5 py-4">
              <p className="text-xs text-gray-500">Current Budget</p>
              <p className="text-xl font-bold text-[#d97757]">
                {(Number(budget) || 0).toLocaleString()} EGP
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {message && (
              <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {message}
              </p>
            )}

            <button
              onClick={handleCreateProject}
              className="w-full rounded-full bg-[#d97757] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90 sm:ml-auto sm:w-fit"
            >
              Create Project
            </button>
          </div>

        </div>

        <div className="mt-12">

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full py-5 rounded-full text-white text-lg font-semibold shadow-lg
            bg-linear-to-r from-[#d97757] to-[#5e6b5f] hover:opacity-90 transition flex items-center justify-center gap-3
            ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Analyzing Image..." : "Analyze with AI"}
          </button>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white rounded-2xl p-6 shadow flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#f3e4df] flex items-center justify-center text-[#d97757] text-xl">
                ✦
              </div>
              <div>
                <h3 className="font-semibold">AI Detection</h3>
                <p className="text-gray-500 text-sm">
                  Automatically identifies all furniture items
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#e9efe9] flex items-center justify-center text-[#5e6b5f] text-xl">
                $
              </div>
              <div>
                <h3 className="font-semibold">Real Pricing</h3>
                <p className="text-gray-500 text-sm">
                  Get accurate prices from Egyptian vendors
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#f3e4df] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#d97757]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 3v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Instant Results</h3>
                <p className="text-gray-500 text-sm">
                  Complete analysis in under 30 seconds
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}