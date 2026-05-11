import { useEffect, useState } from "react"; // ضفت الحالات هنا
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import api from "./services/api";

// --- جزء الـ API المسؤول عن جلب البيانات ---
async function getProjects() {
  const response = await api.get('/Projects')
  return { data: response.data }
}
// ------------------------------

export default function MyProjects() {
  const navigate = useNavigate();

  // --- تعريف الحالات والـ useEffect لجلب البيانات ---
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)
        const { data } = await getProjects();
        let projectList = [];
        if (Array.isArray(data)) projectList = data;
        else if (data?.data && Array.isArray(data.data)) projectList = data.data;
        else if (data?.items && Array.isArray(data.items)) projectList = data.items;
        else if (data?.$values && Array.isArray(data.$values)) projectList = data.$values;
        else if (data?.projects && Array.isArray(data.projects)) projectList = data.projects;
        
        if (!cancelled) setProjects(projectList);
      } catch (err) {
        console.error("Failed to load projects:", err);
        if (!cancelled) setError("Failed to load projects.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchProjects()
    return () => { cancelled = true }
  }, [])
  // ----------------------------------------------

  return (
    <div className="space-y-10">

      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, John! 
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your projects today
          </p>
        </div>

      <button
  onClick={() => navigate("/dashboard/upload")}
  className="bg-[#d97757] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
>
  + New Project
</button>
      </div>

      
      <div className="grid md:grid-cols-4 gap-6">

        
        <div className="bg-white p-6 rounded-2xl shadow flex items-start justify-between">
          <div>
           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 3v12m0 0l4-4m-4 4l-4-4"/>
         </svg>
            <p className="text-3xl font-bold">24</p>
            <p className="text-gray-500">Total Projects</p>
          </div>
          <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
            +12%
          </span>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow flex items-start justify-between">
          <div>
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  className="w-6 h-6 text-[#5e6b5f]" 
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="currentColor" 
  strokeWidth="2"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.12-4 2.5S9.79 13 12 13s4 1.12 4 2.5S14.21 18 12 18"/>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12"/>
</svg>
            <p className="text-3xl font-bold">EGP 45,000</p>
            <p className="text-gray-500">Avg. Project Cost</p>
          </div>
          <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
            +8%
          </span>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow flex items-start justify-between">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <circle cx="12" cy="12" r="9"/>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/>
</svg>
            <p className="text-3xl font-bold">120 hrs</p>
            <p className="text-gray-500">Saved Time</p>
          </div>
          <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
            +25%
          </span>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow flex items-start justify-between">
          <div>
           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#5e6b5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
</svg>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-gray-500">Catalog Views</p>
          </div>
          <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
            +15%
          </span>
        </div>

      </div>


<div className="bg-white rounded-2xl shadow overflow-hidden">

  
  <div className="flex items-center justify-between px-8 py-6 border-b">

    <div>
      <h2 className="text-2xl font-semibold">
        Recent Projects
      </h2>

      <p className="text-gray-500 text-sm">
        Your latest design analyses
      </p>
    </div>

    <button className="text-[#d97757] hover:underline">
      View All
    </button>

  </div>


  
  <div className="grid md:grid-cols-2 gap-6 p-6">

    {/* --- عرض المشاريع من الـ API (إضافة جديدة) --- */}
    {!loading && projects.map((project) => (
      <Link to={`/dashboard/project/${project.id}`} key={project.id}>
        <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
          <div className="relative">
            {/* ربط imageUrl */}
            <img src={project.imageUrl} className="w-full h-56 object-cover rounded-t-2xl" />
            <span className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {/* معالجة حالة status */}
              {project.status === 3 ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="p-5 space-y-3">
            {/* ربط name */}
            <h3 className="text-lg font-semibold">{project.name}</h3>
            {/* ربط roomType */}
            <p className="text-gray-500 text-sm">{project.roomType}</p>
            <div className="border-t border-[#d97757] pt-3 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Cost</p>
                {/* ربط customerBudget */}
                <p className="text-[#d97757] font-semibold text-lg">EGP {(project.customerBudget || 0).toLocaleString()}</p>
              </div>
              <span className="text-gray-400 text-sm">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}</span>
            </div>
          </div>
        </div>
      </Link>
    ))}

  </div>

</div>

    </div>
    
    
  )
}