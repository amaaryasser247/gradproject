import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Luxury Velvet Sofa",
    category: "Sofas",
    price: 12500,
    rating: 4.8,
    votes: 134,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: 2,
    name: "Scandinavian Armchair",
    category: "Chairs",
    price: 4800,
    rating: 4.7,
    votes: 89,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    id: 3,
    name: "Marble Dining Table",
    category: "Tables",
    price: 18900,
    rating: 4.9,
    votes: 61,
    badge: null,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
  },
  {
    id: 4,
    name: "Oak Bookshelf",
    category: "Furniture",
    price: 7200,
    rating: 4.6,
    votes: 47,
    badge: null,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80",
  },
  {
    id: 5,
    name: "King Bed Frame",
    category: "Beds",
    price: 22000,
    rating: 4.9,
    votes: 203,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  },
  {
    id: 6,
    name: "Glass Coffee Table",
    category: "Tables",
    price: 5500,
    rating: 4.5,
    votes: 38,
    badge: null,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
  },
  {
    id: 7,
    name: "Rattan Lounge Chair",
    category: "Chairs",
    price: 3900,
    rating: 4.7,
    votes: 72,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
  },


  {
    id: 8,
    name: "Walnut Wardrobe",
    category: "Beds",
    price: 15600,
    rating: 4.8,
    votes: 55,
    badge: null,
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80",
  },

  {
    id: 9,
    name: "Minimalist Desk",
    category: "Tables",
    price: 6800,
    rating: 4.6,
    votes: 91,
    badge: "New",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
  },
  {
    id: 10,
    name: "Linen Sectional Sofa",
    category: "Sofas",
    price: 27500,
    rating: 5.0,
    votes: 18,
    badge: "New",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80",
  },
  {
    id: 11,
    name: "Bedside Table Set",
    category: "Tables",
    price: 3200,
    rating: 4.4,
    votes: 44,
    badge: null,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
  },
  {
    id: 12,
    name: "TV Console Unit",
    category: "Furniture",
    price: 9100,
    rating: 4.7,
    votes: 130,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },


  {
    id: 13,
    name: "Modern Nightstand",
    category: "Beds",
    price: 4100,
    rating: 4.6,
    votes: 67,
    badge: null,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
  },
  {
    id: 14,
    name: "Wooden TV Stand",
    category: "Furniture",
    price: 8300,
    rating: 4.7,
    votes: 92,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=600&q=80",
  },
  {
    id: 15,
    name: "Classic Dining Chair",
    category: "Chairs",
    price: 2700,
    rating: 4.5,
    votes: 51,
    badge: null,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
  },
  {
    id: 16,
    name: "Office Work Desk",
    category: "Tables",
    price: 7600,
    rating: 4.8,
    votes: 110,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=600&q=80",
  },
  {
  id: 17,
  name: "Modern Sofa Chair",
  category: "Sofas",
  price: 8900,
  rating: 4.6,
  votes: 77,
  badge: null,
image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80",
},
{
  id: 18,
  name: "Wood Dining Set",
  category: "Tables",
  price: 14500,
  rating: 4.8,
  votes: 88,
  badge: "Popular",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
},
{
  id: 19,
  name: "Classic Bed Frame",
  category: "Beds",
  price: 19800,
  rating: 4.7,
  votes: 66,
  badge: null,
  image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
},
{
  id: 20,
  name: "Storage Cabinet",
  category: "Furniture",
  price: 7600,
  rating: 4.5,
  votes: 59,
  badge: null,
  image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
},
]

const CATEGORIES = ["All", "Sofas", "Chairs", "Tables", "Furniture", "Beds"]

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
      {/* Image */}
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
        {/* Category pill */}
        <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Info */}
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

  const filtered = ALL_PRODUCTS
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

      {/* ===== NAVBAR ===== */}
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

      {/* ===== HERO BANNER ===== */}
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

      {/* ===== CONTROLS ===== */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search + Sort row */}
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

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
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

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> products
        </p>

        {/* ===== GRID ===== */}
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

      {/* ===== FOOTER STRIP ===== */}
<div className="mt-20 py-8 text-center text-[#c76f56] text-sm border-t border-[#e7cfc5] bg-[#f1ebe6]">
        © 2026 CASA MOOD. All rights reserved.
      </div>
    </div>
  )
}