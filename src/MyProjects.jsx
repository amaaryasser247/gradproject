import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function MyProjects() {
  const navigate = useNavigate();
  return (
    <div className="space-y-10">

      {/* HEADER */}
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

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* CARD 1 */}
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

        {/* CARD 2 */}
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

        {/* CARD 3 */}
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

        {/* CARD 4 */}
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

{/* RECENT PROJECTS */}
<div className="bg-white rounded-2xl shadow overflow-hidden">

  {/* HEADER */}
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


  {/* PROJECT CARDS */}
  <div className="grid md:grid-cols-2 gap-6 p-6">

   {/* PROJECT 1 */}

<Link to="/dashboard/project/1">

<div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">

  <div className="relative">

    <img
      src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
      className="w-full h-56 object-cover rounded-t-2xl"
    />

    <span className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Completed
    </span>

  </div>
      

  <div className="p-5 space-y-3">

    <h3 className="text-lg font-semibold">
      Modern Living Room
    </h3>

    <p className="text-gray-500 text-sm">
      Living Room • 12 items
    </p>

    <div className="border-t border-[#d97757] pt-3 flex items-center justify-between">  

      <div>
        <p className="text-gray-500 text-sm">Total Cost</p>
        <p className="text-[#d97757] font-semibold text-lg">
          EGP 52,000
        </p>
      </div>

      <span className="text-gray-400 text-sm">
        2 days ago
      </span>

    </div>

  </div>

</div>

</Link>

    {/* PROJECT 2 */}

<Link to="/dashboard/project/2">

<div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">

  <div className="relative">

    <img
     src="https://images.unsplash.com/photo-1493809842364-78817add7ffb"
      className="w-full h-56 object-cover"
    />

    <span className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Completed
    </span>

  </div>

  <div className="p-5 space-y-3">

    <h3 className="text-lg font-semibold">
      Scandinavian Bedroom
    </h3>

    <p className="text-gray-500 text-sm">
      Bedroom • 9 items
    </p>

    <div className="border-t border-[#d97757] pt-3 flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm">Total Cost</p>
        <p className="text-[#d97757] font-semibold text-lg">
          EGP 38,500
        </p>
      </div>

      <span className="text-gray-400 text-sm">
        5 days ago
      </span>

    </div>

  </div>

</div>

</Link>
{/* PROJECT 3 */}

<Link to="/dashboard/project/3">

<div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">

  <div className="relative">

    <img
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      className="w-full h-56 object-cover"
    />

    <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      In Progress
    </span>

  </div>

  <div className="p-5 space-y-3">

    <h3 className="text-lg font-semibold">
      Executive Office
    </h3>

    <p className="text-gray-500 text-sm">
      Office • 15 items
    </p>

    <div className="border-t border-[#d97757] pt-3 flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm">Total Cost</p>
        <p className="text-[#d97757] font-semibold text-lg">
          EGP 65,000
        </p>
      </div>

      <span className="text-gray-400 text-sm">
        1 week ago
      </span>

    </div>

  </div>

</div>

</Link>

{/* PROJECT 4 */}

<Link to="/dashboard/project/4">

<div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">

  <div className="relative">

    <img
      src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
      className="w-full h-56 object-cover"
    />

    <span className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Completed
    </span>

  </div>

  <div className="p-5 space-y-3">

    <h3 className="text-lg font-semibold">
      Cozy Cafe Interior
    </h3>

    <p className="text-gray-500 text-sm">
      Commercial • 24 items
    </p>

    <div className="border-t border-[#d97757] pt-3 flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm">Total Cost</p>
        <p className="text-[#d97757] font-semibold text-lg">
          EGP 95,000
        </p>
      </div>

      <span className="text-gray-400 text-sm">
        2 weeks ago
      </span>

    </div>

  </div>

</div>

</Link>
  </div>

</div>

    </div>
    
    
  )
}