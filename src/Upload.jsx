import { useState } from "react"
import { Link } from "react-router-dom"

export default function Upload() {

  const [file, setFile] = useState(null)

  const [room, setRoom] = useState("Living Room")
  const [style, setStyle] = useState("Modern")
  const [min, setMin] = useState(20000)
  const [max, setMax] = useState(1000000)

  const rooms = ["Living Room","Bedroom","Office","Kitchen"]
  const styles = ["Modern","Classic","Egyptian","Industrial"]

  function handleFile(e){
    const selected = e.target.files[0]
    if(selected){
      setFile(selected)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f5f1ec]">
      
    


      <div className="max-w-6xl mx-auto space-y-10">

        

        {/* ================= UPLOAD FILE ================= */}

        <div className="bg-white rounded-2xl p-10 shadow">

          <h2 className="text-xl font-semibold mb-2">
            Design Image
          </h2>

          <p className="text-gray-500 mb-6">
            Upload a high-quality 2D design image (PNG, JPG)
          </p>

          <label className="border-2 border-dashed border-[#d97757] rounded-xl p-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#fff7f4] transition">

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

        {/* ================= PROJECT DETAILS ================= */}

        <div className="bg-white rounded-2xl p-10 shadow">

          <h2 className="text-2xl font-semibold mb-8">
            Project Details
          </h2>

          {/* ROOM TYPE */}

          <p className="text-gray-700 mb-4">Room Type</p>

          <div className="flex gap-4 flex-wrap mb-10">
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

          {/* BUDGET */}

          <p className="text-gray-700 mb-4">
            Budget Range (EGP)
          </p>

          <div className="bg-[#f1ebe6] rounded-2xl p-8 mb-10">

            <h3 className="text-xl font-semibold mb-6">
              {min.toLocaleString()} - {max.toLocaleString()} EGP
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              Minimum
            </p>

            <input
              type="range"
              min="20000"
              max="100000"
              value={min}
              onChange={(e)=>setMin(e.target.value)}
              className="w-full mb-6"
            />

            <p className="text-sm text-gray-500 mb-2">
              Maximum
            </p>

            <input
              type="range"
              min="20000"
              max="100000"
              value={max}
              onChange={(e)=>setMax(e.target.value)}
              className="w-full"
            />

          </div>

          {/* STYLE */}

          <p className="text-gray-700 mb-4">
            Style Preference
          </p>

          <div className="flex gap-4 flex-wrap">
            {styles.map((s)=>(
              <button
                key={s}
                onClick={()=>setStyle(s)}
                className={`px-10 py-4 rounded-full border transition
                ${style===s
                  ? "border-[#5e6b5f] text-[#5e6b5f] bg-[#eef3f0]"
                  : "border-gray-300 text-gray-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

        </div>

        {/* ================= ANALYZE SECTION ================= */}

<div className="mt-12">

  {/* ANALYZE BUTTON */}
  <button
    className="w-full py-5 rounded-full text-white text-lg font-semibold shadow-lg
    bg-linear-to-r from-[#d97757] to-[#5e6b5f] hover:opacity-90 transition flex items-center justify-center gap-3"
  >
   Analyze with AI
  </button>


  {/* FEATURES */}
  <div className="grid md:grid-cols-3 gap-6 mt-10">

    {/* CARD 1 */}
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


    {/* CARD 2 */}
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


    {/* CARD 3 */}
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