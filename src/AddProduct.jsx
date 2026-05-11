import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import { getApiErrorMessage } from "./services/api"
import { createProduct } from "./services/productService"

export default function AddProduct() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    category: "Seating",
    price: "",
    material: "",
    length: "",
    width: "",
    height: "",
    stock: "",
    description: "",
    image: null
  })
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setForm({ ...form, image: URL.createObjectURL(file) })
    }
  }

  const handleSubmit = async () => {
    setError("")
    
    if (!imageFile) {
      setError("Please select a product image.")
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("Name", form.name)
    formData.append("Price", Number(form.price) || 0)
    formData.append("Material", form.material || "")
    formData.append("Length", Number(form.length) || 0)
    formData.append("Width", Number(form.width) || 0)
    formData.append("Height", Number(form.height) || 0)
    formData.append("Stock", Number(form.stock) || 0)
    formData.append("Description", form.description || "")
    
    const categoryMap = { "Seating": 1, "Tables": 2, "Lighting": 3, "Decor": 4 }
    formData.append("CategoryId", categoryMap[form.category] || 1)
    formData.append("Image", imageFile)

    try {
      await createProduct(formData)
      navigate("/vendor/products")
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to create product. Please try again."))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex">

      
      <Sidebar />

      
      <div className="ml-64 w-full bg-[#f5f1ec] min-h-screen p-8">

        <h1 className="text-3xl font-bold mb-6 text-[#2f2f2f]">
          Add New Product
        </h1>

        <div className="grid grid-cols-3 gap-6">

          
          <div className="col-span-2 space-y-6">

            
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

              <input name="material" placeholder="Material" className="w-full bg-[#fffaf7] border p-3 rounded-lg" onChange={handleChange} />
            </div>

            
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h2 className="font-semibold mb-4">Dimensions (cm)</h2>

              <div className="grid grid-cols-3 gap-4">
                <input name="length" placeholder="Length" className="border p-3 rounded-lg" onChange={handleChange} />
                <input name="width" placeholder="Width" className="border p-3 rounded-lg" onChange={handleChange} />
                <input name="height" placeholder="Height" className="border p-3 rounded-lg" onChange={handleChange} />
              </div>
            </div>

            
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h2 className="font-semibold mb-4">Product Images</h2>

              <label className="w-40 h-40 border border-dashed border-[#d97757]/30 bg-[#fffaf7] flex items-center justify-center rounded-2xl cursor-pointer hover:bg-[#fff7f4] transition">
                +
                <input type="file" hidden onChange={handleImage} />
              </label>
            </div>

            
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h2 className="font-semibold mb-4">Additional Details</h2>

              <div className="mb-4">
                <input name="stock" placeholder="Stock Quantity" className="border p-3 rounded-lg w-full" onChange={handleChange} />
              </div>

              <textarea
                name="description"
                placeholder="Description"
                className="w-full border p-3 rounded-lg"
                rows="4"
                onChange={handleChange}
              />
            </div>

          </div>

          
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

            {error && (
              <p className="mt-3 text-sm text-red-500">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-4 py-3 rounded-xl text-white bg-[#d97757]"
            >
              {isSubmitting ? "Adding..." : "+ Add Product"}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}
