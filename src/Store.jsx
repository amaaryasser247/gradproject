import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllProducts } from "./services/productService"
import { getCategories } from "./services/categoryService"

const BADGE_STYLES = {
  Popular: "bg-[#d97757] text-white",
  "Best Seller": "bg-[#5e6b5f] text-white",
  New: "bg-[#e7cfc5] text-[#c76f56]",
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-[#d97757]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-sm font-semibold text-gray-800">{rating}</span>
    </div>
  )
}

function ProductCard({ product }) {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
      
      <div
  className="relative overflow-hidden h-52 cursor-pointer"
 onClick={() => navigate("/vendor/product-preview", { state: product })}
>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        
        <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800 leading-snug">{product.name}</h3>
          <span className="shrink-0 bg-[#f1ebe6] text-[#c76f56] font-bold text-sm px-3 py-1 rounded-lg">
            {product.price.toLocaleString()} EGP
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.votes} votes)</span>
        </div>

        <button
          className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold border-2 border-[#d97757] text-[#d97757] hover:bg-[#d97757] hover:text-white transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(["All"])

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories()
        ])
        setProducts(unwrapProducts(productsData).map(mapProduct))
        
        const apiCategories = unwrapProducts(categoriesData)
        if (apiCategories.length > 0) {
           const categoryNames = apiCategories.map(c => c.name || c.categoryName)
           setCategories(["All", ...categoryNames])
        }
      } catch (error) {
        console.error("Failed to load store data:", error)
      }
    }

    loadData()
  }, [])

  const filtered = products
    .filter((p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="bg-[#f5f1ec] min-h-screen font-sans text-gray-800">

      
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e7cfc5] rounded-full flex items-center justify-center text-[#c76f56] font-bold">
              ✦
            </div>
            <h1 className="text-lg font-semibold tracking-wide">CASA MOOD</h1>
          </Link>

          <ul className="hidden md:flex items-center gap-10 text-gray-600 font-medium">
            <li><Link to="/#features" className="hover:text-black transition">Features</Link></li>
            <li><Link to="/#how" className="hover:text-black transition">How It Works</Link></li>
            <li><Link to="/vendor/store" className="text-[#d97757] font-semibold">Store</Link></li>
            <li><Link to="/#vendors" className="hover:text-black transition">Vendors</Link></li>
            <li><Link to="/#testimonials" className="hover:text-black transition">Testimonials</Link></li>
          </ul>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-gray-700 font-medium hover:text-black transition">Login</Link>
            <Link
              to="/signup"
              className="bg-[#d97757] text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      
      <div
        className="py-16 text-center"
        style={{ background: "linear-gradient(135deg,#c76f56,#5e6b5f)" }}
      >
        <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm mb-4">
          ✦ Verified Egyptian Furniture Vendors
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Furniture Store
        </h1>
        <p className="mt-3 text-white/80 text-lg">
          Browse real products with real prices from trusted suppliers
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 py-10">

        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#d97757]/40 text-gray-700"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 bg-white rounded-xl shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#d97757]/40 text-gray-700 font-medium"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#d97757] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-[#e7cfc5] hover:text-[#c76f56]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> products
        </p>

        
        {filtered.length > 0 ? (
         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">🪑</div>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-2">Try a different search or category</p>
          </div>
        )}
      </div>

      
<div className="mt-20 py-8 text-center text-[#c76f56] text-sm border-t border-[#e7cfc5] bg-[#f1ebe6]">
        © 2026 CASA MOOD. All rights reserved.
      </div>
    </div>
  )
}

function unwrapProducts(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.products)) return data.products
  return []
}

function mapProduct(product) {
  const price = Number(
    product.price ??
      product.salePrice ??
      product.SalePrice ??
      product.priceEgp ??
      product.unitPrice ??
      0
  )

  return {
    ...product,
    id: product.id ?? product.Id ?? product.productId ?? product.ProductId,
    name: product.name ?? product.Name ?? product.productName ?? "Untitled Product",
    category:
      product.category?.name ??
      product.Category?.Name ??
      product.categoryName ??
      product.CategoryName ??
      product.category ??
      "Furniture",
    price,
    rating: Number(product.rating ?? product.Rating ?? 0),
    votes: Number(product.votes ?? product.Votes ?? product.reviewCount ?? 0),
    badge: product.badge ?? product.Badge ?? null,
    image:
      product.image ??
      product.Image ??
      product.imageUrl ??
      product.ImageUrl ??
      product.photoUrl ??
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  }
}
