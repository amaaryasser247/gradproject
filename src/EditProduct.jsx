import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getApiErrorMessage } from "./services/api"
import { updateProduct } from "./services/productService"

export default function EditProduct() {

  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state

  const [name, setName] = useState(product?.name || "")
  const [price, setPrice] = useState(product?.price || "")
  const [category, setCategory] = useState(product?.category || "")
  const [size, setSize] = useState(product?.size || "")
  const [stock, setStock] = useState(product?.stock || "")
  const [image, setImage] = useState(product?.image || "")
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!product) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-semibold mb-4">No product data</h2>
        <button
          onClick={() => navigate("/vendor/products")}
          className="bg-accent text-white px-6 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    )
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const preview = URL.createObjectURL(file)
      setImage(preview)
    }
  }

  const handleSave = async () => {
    setError("")
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("Name", name)
    formData.append("Price", Number(price) || 0)
    formData.append("Stock", Number(stock) || 0)
    
    // Fallbacks or other fields can go here based on API
    // If the category is needed as an ID, you might have to map it like in AddProduct
    const categoryMap = { "Seating": 1, "Tables": 2, "Lighting": 3, "Decor": 4 }
    if (category) formData.append("CategoryId", categoryMap[category] || 1)
    
    if (size) formData.append("Dimensions", size)
    
    if (imageFile) {
      formData.append("Image", imageFile)
    }

    try {
      await updateProduct(product.id, formData)
      navigate("/vendor/products")
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to update product. Please try again."))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex">

      

      <div className=" w-full bg-background min-h-screen p-10">

        
        <button
          onClick={() => navigate("/vendor/products")}
          className="flex items-center gap-2 text-accent mb-8 hover:opacity-75 transition group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-semibold tracking-wide uppercase">Back to Products</span>
        </button>

        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow p-10">

          <h2 className="text-2xl font-bold mb-6 text-[#2f2f2f]">Edit Product</h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="relative">
              <img
                src={image}
                alt={name}
                className="w-full h-100 md:h-125 object-cover rounded-xl shadow"
              />
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

            <div className="space-y-5">

              <div>
                <label className="text-sm text-muted-foreground">Product Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Price</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Size</label>
                <input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Stock</label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full border p-3 rounded-xl mt-1 outline-none focus:border-[#d97757]"
                />
              </div>

            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            {error && (
              <p className="mr-auto text-sm text-red-500 self-center">{error}</p>
            )}
            <button
              onClick={() => navigate("/vendor/products")}
              className="px-6 py-2 rounded-full border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-accent text-white px-8 py-3 rounded-full shadow hover:opacity-90"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
