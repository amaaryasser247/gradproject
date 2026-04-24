import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";



export default function ProjectDetails() {

const navigate = useNavigate()
const { id } = useParams()
const [min, setMin] = useState(20000)
const [max, setMax] = useState(1000000)

return (

<div className="space-y-10">

{/* HEADER */}

<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold text-gray-800">
AI Analysis Complete
</h1>

<p className="text-gray-500 mt-1">
Project #2 • Modern Living Room
</p>

</div>

<div className="flex gap-4">

<button className="border px-5 py-2 rounded-full hover:bg-gray-100 transition">
Share
</button>

<button
  onClick={() => navigate(`/dashboard/catalog/${id}`)}
  className="bg-[#d97757] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
>
  Generate Catalog
</button>

</div>

</div>


{/* AI DETECTION */}

<div className="bg-white rounded-2xl shadow p-6">

<div className="flex items-center gap-3 mb-6">

<div className="w-10 h-10 bg-[#e7cfc5] rounded-full flex items-center justify-center">
✦
</div>

<div>

<h2 className="text-xl font-semibold">
AI Detection Results
</h2>

<p className="text-gray-500 text-sm">
5 items identified
</p>

</div>

</div>

<img
src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
className="rounded-xl w-full"
/>

</div>







{/* MATCHED PRODUCTS */}

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-semibold mb-6">
Matched Products
</h2>


<div className="space-y-6">


{/* PRODUCT 1 */}

<div className="flex items-center justify-between border p-4 rounded-xl">

<div className="flex gap-4 items-center">

<img
src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
className="w-20 h-20 rounded-xl object-cover"
/>

<div>

<p className="text-sm text-[#d97757]">
Seating
</p>

<h3 className="font-semibold">
Modern 3-Seater Sofa
</h3>

<p className="text-gray-500 text-sm">
Mobilia
</p>

</div>

</div>

<p className="text-[#d97757] font-semibold text-lg">
18,500 EGP
</p>

</div>



{/* PRODUCT 2 */}

<div className="flex items-center justify-between border p-4 rounded-xl">

<div className="flex gap-4 items-center">

<img
src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
className="w-20 h-20 rounded-xl object-cover"
/>

<div>

<p className="text-sm text-[#d97757]">
Tables
</p>

<h3 className="font-semibold">
Marble Coffee Table
</h3>

<p className="text-gray-500 text-sm">
Home Center
</p>

</div>

</div>

<p className="text-[#d97757] font-semibold text-lg">
4,200 EGP
</p>

</div>



{/* PRODUCT 3 */}

<div className="flex items-center justify-between border p-4 rounded-xl">

<div className="flex gap-4 items-center">

<img
src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
className="w-20 h-20 rounded-xl object-cover"
/>

<div>

<p className="text-sm text-[#d97757]">
Lighting
</p>

<h3 className="font-semibold">
Designer Arc Floor Lamp
</h3>

<p className="text-gray-500 text-sm">
Design Hub
</p>

</div>

</div>

<p className="text-[#d97757] font-semibold text-lg">
2,800 EGP
</p>

</div>

</div>

</div>


{/* BUDGET RANGE */}

<div className="bg-white rounded-2xl shadow p-6">

  <h2 className="text-xl font-semibold mb-6">
    Budget Range (EGP)
  </h2>

  <div className="bg-[#f1ebe6] rounded-2xl p-8">

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

</div>

{/* COST SUMMARY */}

<div
className="rounded-2xl p-8 text-white"
style={{
background:"linear-gradient(135deg,#c76f56,#5e6b5f)"
}}
>

<h2 className="text-xl font-semibold mb-6">
Cost Summary
</h2>

<div className="space-y-3">

<div className="flex justify-between">
<span>Subtotal (5 items)</span>
<span>34,200 EGP</span>
</div>

<div className="flex justify-between">
<span>Tax (14%)</span>
<span>4,788 EGP</span>
</div>

<div className="flex justify-between">
<span>Shipping</span>
<span>500 EGP</span>
</div>

<hr className="my-4 opacity-40"/>

<div className="flex justify-between text-2xl font-bold">
<span>Total Cost</span>
<span>39,488 EGP</span>
</div>

<button className="mt-6 w-full bg-white text-[#d97757] py-3 rounded-full font-semibold">
Generate Catalog
</button>

</div>

</div>


</div>

)

}