import React, { useState } from "react"
import Sidebar from "./Sidebar"

export default function AddProduct() {

  const [form, setForm] = useState({
    name: "",
    category: "Seating",
    price: "",
    material: "",
    style: "Modern",
    length: "",
    width: "",
    height: "",
    stock: "",
    location: "",
    description: "",
    image: null
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setForm({ ...form, image: URL.createObjectURL(file) })
  }

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="ml-64 w-full bg-[#f5f1ec] min-h-screen p-8">

        <h1 className="text-3xl font-bold mb-6 text-[#2f2f2f]">
          Add New Product
        </h1>

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-6">

            {/* BASIC INFO */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-[#f0e6e0]">
              <h2 className="font-semibold mb-4">Basic Information</h2>

              <input
                name="name"
                placeholder="Product Name"
                className="w-full bg-[#fffaf7] border border-[#f0e6e0] p-3 rounded-lg mb-4 outline-none focus:border-[#d97757]"
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <select name="category" className="bg-[#fffaf7] border p-3 rounded-lg" onChange={handleChange}>
                  <option>Seating</option>
                  <option>Tables</option>
                  <option>Lighting</option>
                  <option>Decor</option>
                </select>

                <input name="price" placeholder="Price (EGP)" className="bg-[#fffaf7] border p-3 rounded-lg" onChange={handleChange} />
              </div>

              <input name="material" placeholder="Material" className="w-full bg-[#fffaf7] border p-3 rounded-lg mb-4" onChange={handleChange} />

              <div className="flex gap-3">
                {["Modern", "Classic", "Scandinavian", "Industrial"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, style: s })}
                    className={`px-4 py-2 rounded-full border ${
                      form.style === s
                        ? "bg-[#d97757] text-white"
                        : "bg-[#fffaf7]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* DIMENSIONS */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h2 className="font-semibold mb-4">Dimensions (cm)</h2>

              <div className="grid grid-cols-3 gap-4">
                <input name="length" placeholder="Length" className="border p-3 rounded-lg" onChange={handleChange} />
                <input name="width" placeholder="Width" className="border p-3 rounded-lg" onChange={handleChange} />
                <input name="height" placeholder="Height" className="border p-3 rounded-lg" onChange={handleChange} />
              </div>
            </div>

            {/* IMAGE */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h2 className="font-semibold mb-4">Product Images</h2>

              <label className="w-40 h-40 border-2 border-dashed border-[#d97757] flex items-center justify-center rounded-xl cursor-pointer">
                +
                <input type="file" hidden onChange={handleImage} />
              </label>
            </div>

            {/* ADDITIONAL */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h2 className="font-semibold mb-4">Additional Details</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input name="stock" placeholder="Stock Quantity" className="border p-3 rounded-lg" onChange={handleChange} />
                <input name="location" placeholder="Location" className="border p-3 rounded-lg" onChange={handleChange} />
              </div>

              <textarea name="description" className="w-full border p-3 rounded-lg" rows="4" onChange={handleChange} />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">

            <h2 className="font-semibold mb-4">Product Preview</h2>

            <div className="w-full h-48 bg-[#fffaf7] rounded-xl flex items-center justify-center mb-4">
              {form.image ? (
                <img src={form.image} className="w-full h-full object-cover" />
              ) : (
                <span>No image</span>
              )}
            </div>

            <p className="text-sm text-gray-500">{form.category}</p>
            <h3 className="font-semibold">{form.name || "Product Name"}</h3>
            <p className="text-[#d97757] font-bold">{form.price || 0} EGP</p>

            <button className="w-full mt-4 py-3 rounded-xl text-white bg-[#d97757]">
              + Add Product
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}