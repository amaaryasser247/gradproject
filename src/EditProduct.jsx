import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function EditProduct() {

  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state

  if (!product) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-semibold mb-4">No product data</h2>
        <button
          onClick={() => navigate("/vendor/products")}
          className="bg-[#d97757] text-white px-6 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    )
  }

  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [category, setCategory] = useState(product.category)
  const [size, setSize] = useState(product.size)
  const [stock, setStock] = useState(product.stock)
  const [image, setImage] = useState(product.image)

  // تغيير الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setImage(preview)
    }
  }

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name,
      price,
      category,
      size,
      stock,
      image
    }

    console.log("Updated:", updatedProduct)

    navigate("/vendor/products")
  }

  return (
    <div className="p-10 bg-[#f5f1ec] min-h-screen">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-10">

        <h2 className="text-2xl font-bold mb-6 text-[#2f2f2f]">
          Edit Product
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* صورة المنتج */}
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-full h-100 md:h-125 object-cover rounded-xl shadow"
            />

            {/* زرار تغيير الصورة */}
           <label className="absolute bottom-4 right-4 bg-linear-to-r from-[#d97757] to-[#e38b73] text-white px-5 py-2 rounded-full shadow-md cursor-pointer hover:scale-105 transition text-sm font-medium">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* الفورم */}
          <div className="space-y-5">

            <div>
              <label className="text-sm text-gray-500">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Size</label>
              <input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Stock</label>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
              />
            </div>

          </div>

        </div>

        {/* أزرار */}
        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => navigate("/vendor/products")}
            className="px-6 py-2 rounded-full border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-[#d97757] text-white px-8 py-3 rounded-full shadow hover:opacity-90"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )
}