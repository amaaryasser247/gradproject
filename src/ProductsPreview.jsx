import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function ProductPreview() {
  const { state: product } = useLocation()
  const navigate = useNavigate()
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f5f1ec]">
        <p className="text-gray-400 text-lg">No product selected.</p>
      </div>
    )
  }

  const stockColor =
    product.stock > 20
      ? { bg: "bg-green-100", text: "text-green-600", label: "In Stock" }
      : product.stock > 5
      ? { bg: "bg-yellow-100", text: "text-yellow-600", label: "Low Stock" }
      : { bg: "bg-red-100", text: "text-red-500", label: "Very Low" }

  const details = [
    { label: "Category", value: product.category },
    { label: "Size", value: product.size },
    { label: "Price", value: product.price },
    { label: "Stock", value: `${product.stock} units` },
    { label: "Status", value: stockColor.label },
    { label: "Last Updated", value: "Recently" },
  ]

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="ml-64 w-full bg-[#f5f1ec] min-h-screen p-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#d97757] mb-8 hover:opacity-75 transition group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-semibold tracking-wide uppercase">Back to Products</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#eee] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: Image Panel ── */}
            <div className="relative bg-[#faf7f4] flex items-center justify-center p-10 min-h-120">

              {/* Decorative ring */}
              <div className="absolute inset-8 rounded-2xl border border-[#f0e6e0] opacity-60 pointer-events-none" />

              {/* Skeleton while loading */}
              {!imgLoaded && (
                <div className="absolute inset-10 rounded-2xl bg-[#f0e6e0] animate-pulse" />
              )}

              <img
                src={`${product.image}?w=600&q=80`}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                className={`relative z-10 w-full max-w-sm h-72 object-cover rounded-2xl shadow-lg transition-opacity duration-500 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Stock badge pinned top-right */}
              <span className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-semibold ${stockColor.bg} ${stockColor.text}`}>
                {product.stock} in stock
              </span>
            </div>

            {/* ── Right: Info Panel ── */}
            <div className="p-10 flex flex-col justify-between">

              {/* Header */}
              <div>
                <span className="inline-block bg-[#f7e8e2] text-[#d97757] px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {product.category}
                </span>

                <h1 className="text-4xl font-bold text-[#2f2f2f] leading-tight mb-2">
                  {product.name}
                </h1>

                <p className="text-[#d97757] text-3xl font-bold mt-4 mb-8">
                  {product.price}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#f0e6e0] mb-8" />

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  {details.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-[#2f2f2f] font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-10">
                <button
                  onClick={() => navigate("/vendor/edit-product", { state: product })}
                  className="flex items-center gap-2 bg-[#d97757] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c9673f] hover:scale-105 transition-all shadow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                  Edit Product
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 border border-[#f0e6e0] text-[#2f2f2f] px-6 py-3 rounded-xl font-semibold hover:bg-[#faf7f4] transition-all"
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}