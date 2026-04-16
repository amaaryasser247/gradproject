import React from "react"
import Sidebar from "./Sidebar"

export default function Products() {

  const products = [
    {
      id: 1,
      name: "Modern Velvet Sofa",
      category: "Sofas",
      price: "$1299",
      size: "220x90x85 cm",
      stock: 24,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    },
    {
      id: 2,
      name: "Scandinavian Chair",
      category: "Chairs",
      price: "$249",
      size: "45x85x50 cm",
      stock: 48,
      image: "https://images.unsplash.com/photo-1503602642458-232111445657"
    },
    {
      id: 3,
      name: "Marble Coffee Table",
      category: "Tables",
      price: "$899",
      size: "120x60x45 cm",
      stock: 3,
      image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed"
    },
    {
      id: 4,
      name: "Industrial Floor Lamp",
      category: "Lighting",
      price: "$189",
      size: "30x30x180 cm",
      stock: 31,
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5"
    },
    {
      id: 5,
      name: "Wooden Dining Table",
      category: "Tables",
      price: "$1099",
      size: "180x90x75 cm",
      stock: 12,
      image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc"
    },
    {
      id: 6,
      name: "Luxury Armchair",
      category: "Chairs",
      price: "$549",
      size: "75x80x75 cm",
      stock: 19,
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
    },
    {
      id: 7,
      name: "Minimal Desk",
      category: "Tables",
      price: "$399",
      size: "120x60x75 cm",
      stock: 8,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
    },
    {
      id: 8,
      name: "Decor Vase Set",
      category: "Decor",
      price: "$79",
      size: "Small",
      stock: 55,
      image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f"
    }
  ]

  return (
    <div className="flex">

      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      <div className="ml-64 w-full bg-[#f5f1ec] min-h-screen p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2f2f2f]">
            Products
          </h1>

          <button className="bg-[#d97757] text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition">
            + Add Product
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            placeholder="Search products..."
            className="flex-1 bg-white border border-[#f0e6e0] p-3 rounded-xl outline-none focus:border-[#d97757]"
          />

          <select className="bg-white border border-[#f0e6e0] p-3 rounded-xl">
            <option>All Categories</option>
          </select>

          <select className="bg-white border border-[#f0e6e0] p-3 rounded-xl">
            <option>All Stock Status</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#eee] overflow-hidden">

          <div className="grid grid-cols-6 px-6 py-4 text-sm text-gray-500 bg-[#faf7f4]">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Size</span>
            <span>Stock</span>
            <span className="text-right">Actions</span>
          </div>

          {products.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-6 px-6 py-5 items-center border-t hover:bg-[#faf7f4] transition"
            >

              <div className="flex items-center gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-[#2f2f2f]">{p.name}</p>
                  <p className="text-xs text-gray-400">Updated recently</p>
                </div>
              </div>

              <span className="bg-[#f7e8e2] text-[#d97757] px-3 py-1 rounded-full text-xs w-fit">
                {p.category}
              </span>

              <span className="font-semibold">{p.price}</span>

              <span className="text-gray-500">{p.size}</span>

              <span
                className={`px-3 py-1 rounded-full text-xs w-fit ${
                  p.stock > 20
                    ? "bg-green-100 text-green-600"
                    : p.stock > 5
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {p.stock} in stock
              </span>

              {/* ✅ SVG ICONS */}
              <div className="flex justify-end gap-4">

                {/* VIEW */}
                <svg
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-[#d97757]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                {/* EDIT */}
                <svg
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>

                {/* DELETE */}
                <svg
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-2 14H7L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}