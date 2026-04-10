import { useParams } from "react-router-dom";

export default function Catalog() {

const { id } = useParams();

return (

<div className="bg-[#f5f1ec] min-h-screen p-10 space-y-10">


{/* HEADER */}

<div className="flex items-center justify-between">

<div>

<h1 className="text-2xl font-bold">
Professional Catalog
</h1>

<p className="text-gray-500">
Modern Living Room • Project #{id}
</p>

</div>

<div className="flex gap-4">

<button className="border px-4 py-2 rounded-full">
Email
</button>

<button className="border px-4 py-2 rounded-full">
Share Link
</button>

<button className="border px-4 py-2 rounded-full">
Print
</button>

<button className="bg-[#d97757] text-white px-5 py-2 rounded-full">
Export PDF
</button>

</div>

</div>



{/* PROJECT SUMMARY */}

<div className="bg-white rounded-2xl shadow p-10">

<div className="flex justify-between">

<div>

<h2 className="text-3xl font-bold">
CASA MOOD
</h2>

<p className="text-gray-500">
Interior Design Catalog
</p>

<div className="mt-6 space-y-2">

<p><span className="font-semibold">Project ID:</span> #{id}</p>

<p><span className="font-semibold">Room Type:</span> Living Room</p>

<p><span className="font-semibold">Style:</span> Modern, Contemporary</p>

<p><span className="font-semibold">Items:</span> 6 pieces</p>

</div>

</div>


<div className="bg-gray-50 rounded-xl p-6 w-72">

<h3 className="font-semibold mb-4">
Project Summary
</h3>

<div className="flex justify-between text-sm mb-2">
<span>Total Items</span>
<span>6</span>
</div>

<div className="flex justify-between text-sm mb-2">
<span>Subtotal</span>
<span>35,050 EGP</span>
</div>

<div className="flex justify-between font-semibold text-[#d97757]">
<span>Total Cost</span>
<span>40,457 EGP</span>
</div>

</div>

</div>

</div>



{/* SELECTED PRODUCTS */}

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-semibold mb-8">
Selected Products
</h2>

<div className="grid md:grid-cols-2 gap-8">


{/* PRODUCT 1 */}

<div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

<img
src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
className="w-full h-72 object-cover"
/>

<div className="p-6 space-y-3">

<div className="flex justify-between items-center">

<span className="text-[#d97757] text-sm">
Seating
</span>

<span className="text-[#d97757] font-semibold text-lg">
18,500 EGP
</span>

</div>

<h3 className="text-lg font-semibold">
Modern 3-Seater Sofa - Grey
</h3>

<p className="text-gray-500 text-sm">
by Mobilia
</p>

<hr/>

<div className="grid grid-cols-2 text-sm text-gray-600 gap-y-2">

<span>SKU</span>
<span className="text-right">SOF-001</span>

<span>Material</span>
<span className="text-right">Fabric, Wood</span>

<span>Dimensions</span>
<span className="text-right">220 × 90 × 85 cm</span>

</div>

</div>
</div>



{/* PRODUCT 2 */}

<div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

<img
src="https://images.unsplash.com/photo-1493809842364-78817add7ffb"
className="w-full h-72 object-cover"
/>

<div className="p-6 space-y-3">

<div className="flex justify-between items-center">

<span className="text-[#d97757] text-sm">
Tables
</span>

<span className="text-[#d97757] font-semibold text-lg">
4,200 EGP
</span>

</div>

<h3 className="text-lg font-semibold">
Marble Top Coffee Table
</h3>

<p className="text-gray-500 text-sm">
by Home Center
</p>

<hr/>

<div className="grid grid-cols-2 text-sm text-gray-600 gap-y-2">

<span>SKU</span>
<span className="text-right">TBL-045</span>

<span>Material</span>
<span className="text-right">Marble, Metal</span>

<span>Dimensions</span>
<span className="text-right">120 × 60 × 45 cm</span>

</div>

</div>
</div>



{/* PRODUCT 3 */}

<div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

<img
src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
className="w-full h-72 object-cover"
/>

<div className="p-6 space-y-3">

<div className="flex justify-between items-center">

<span className="text-[#d97757] text-sm">
Lighting
</span>

<span className="text-[#d97757] font-semibold text-lg">
2,800 EGP
</span>

</div>

<h3 className="text-lg font-semibold">
Designer Arc Floor Lamp
</h3>

<p className="text-gray-500 text-sm">
by Design Hub
</p>

<hr/>

<div className="grid grid-cols-2 text-sm text-gray-600 gap-y-2">

<span>SKU</span>
<span className="text-right">LMP-022</span>

<span>Material</span>
<span className="text-right">Metal, Fabric</span>

<span>Dimensions</span>
<span className="text-right">180 × 40 cm</span>

</div>

</div>
</div>



{/* PRODUCT 4 */}

<div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

<img
src="https://images.unsplash.com/photo-1600166898405-da9535204843"
className="w-full h-72 object-cover"
/>

<div className="p-6 space-y-3">

<div className="flex justify-between items-center">

<span className="text-[#d97757] text-sm">
Decor
</span>

<span className="text-[#d97757] font-semibold text-lg">
5,500 EGP
</span>

</div>

<h3 className="text-lg font-semibold">
Persian Style Area Rug
</h3>

<p className="text-gray-500 text-sm">
by Furniture Egypt
</p>

<hr/>

<div className="grid grid-cols-2 text-sm text-gray-600 gap-y-2">

<span>SKU</span>
<span className="text-right">RUG-018</span>

<span>Material</span>
<span className="text-right">Wool</span>

<span>Dimensions</span>
<span className="text-right">200 × 300 cm</span>

</div>

</div>
</div>


</div>
</div>


{/* COST BREAKDOWN */}

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-xl font-semibold mb-6">
Cost Breakdown
</h2>

<div className="space-y-3">

<div className="flex justify-between">
<span>Subtotal (6 items)</span>
<span>35,050 EGP</span>
</div>

<div className="flex justify-between">
<span>VAT (14%)</span>
<span>4,907 EGP</span>
</div>

<div className="flex justify-between">
<span>Delivery & Installation</span>
<span>500 EGP</span>
</div>

<hr/>

<div className="flex justify-between text-xl font-semibold text-[#d97757]">

<span>Total Amount</span>

<span>40,457 EGP</span>

</div>

</div>

</div>



</div>

);

}