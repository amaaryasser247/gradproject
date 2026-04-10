import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 }
}

/* ========= CARD COMPONENT ========= */
function Card({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-8 text-left shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg,#c76f56,#5e6b5f)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {icon}
        </svg>
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  return (
    <div className="bg-[#f5f1ec] text-gray-800 font-sans">

      {/* ================= NAVBAR ================= */}
<nav className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* Logo */}
  <Link to="/" className="flex items-center gap-3">
  <div className="w-10 h-10 bg-[#e7cfc5] rounded-full flex items-center justify-center text-[#c76f56] font-bold">
    ✦
  </div>
  <h1 className="text-lg font-semibold tracking-wide">
    CASA MOOD
  </h1>
</Link>

    {/* Center Links */}
  <ul className="hidden md:flex items-center gap-10 text-gray-600 font-medium">
  <li><a href="#features" className="hover:text-black transition">Features</a></li>
  <li><a href="#how" className="hover:text-black transition">How It Works</a></li>
  <li><a href="#vendors" className="hover:text-black transition">Vendors</a></li>
  <li><a href="#testimonials" className="hover:text-black transition">Testimonials</a></li>
</ul>

    {/* Right Side */}
    <div className="flex items-center gap-6">
<button
  onClick={() => navigate("/login")}
  className="text-gray-700 font-medium hover:text-black transition"
>
  Login
</button>

      <a
  href="/signup"
  className="bg-[#d97757] text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition inline-block"
>
  Get Started
</a>
    </div>

  </div>
</nav>

      {/* ================= HERO ================= */}
      <section id="hero" className="max-w-7xl mx-auto px-6 py-24">

        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-gray-600 mb-6">
           AI-Powered Interior Design Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
          Turn Interior Designs <br />
          Into <span className="text-[#d97757]">Real Market</span> <br />
          <span className="text-[#6b6b55]">Costs</span> Instantly
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Upload your 2D design, let AI detect furniture automatically,
          and get matched with real products from Egyptian market vendors.
          Generate professional catalogs in minutes, not days.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
<Link to="/dashboard/upload">
  <button className="bg-[#d97757] text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition">
    Upload Design
  </button>
</Link>

          <button className="bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition">
            Explore Vendors →
          </button>
        </div>

      </section>

     <section id="how" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-5xl font-bold">
      How It Works
    </h2>

    <p className="mt-4 text-gray-600">
      Transform your design workflow in three simple steps
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-8">

      <div className="bg-[#f5f1ec] rounded-2xl p-10 text-left shadow hover:shadow-xl transition">
        <h3 className="text-5xl font-bold text-[#c76f56]">01</h3>
        <h4 className="mt-6 text-xl font-semibold">
          Upload Your Design
        </h4>
        <p className="mt-4 text-gray-600">
          Simply drag and drop your 2D interior design images
        </p>
      </div>

      <div className="bg-[#f5f1ec] rounded-2xl p-10 text-left shadow hover:shadow-xl transition">
        <h3 className="text-5xl font-bold text-[#c76f56]">02</h3>
        <h4 className="mt-6 text-xl font-semibold">
          AI Detects Furniture
        </h4>
        <p className="mt-4 text-gray-600">
          Our AI identifies every piece of furniture and decor automatically
        </p>
      </div>

      <div className="bg-[#f5f1ec] rounded-2xl p-10 text-left shadow hover:shadow-xl transition">
        <h3 className="text-5xl font-bold text-[#c76f56]">03</h3>
        <h4 className="mt-6 text-xl font-semibold">
          Get Cost & Catalog
        </h4>
        <p className="mt-4 text-gray-600">
          Receive accurate costs and a professional catalog instantly
        </p>
      </div>

    </div>

  </div>
</section>

      {/* ================= WHY CASA MOOD ================= */}
      <section id="features" className="py-24 bg-[#f1ebe6]">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-5xl font-bold">
            Why CASA MOOD
          </h2>

          <p className="mt-4 text-gray-600">
            Everything you need to streamline your interior design workflow
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">

            <Card
              icon={<path d="M4 12h4v4H4zM16 12h4v4h-4zM4 4h4v4H4zM16 4h4v4h-4z" />}
              title="AI-Powered Detection"
              desc="Advanced AI automatically identifies furniture and decor items from your design images"
            />

            <Card
              icon={<path d="M4 20l6-6 4 4 6-10" />}
              title="Real Market Prices"
              desc="Get accurate pricing from verified Egyptian furniture vendors in real-time"
            />

            <Card
              icon={<path d="M6 2h9l5 5v15H6zM15 2v6h6" />}
              title="Professional Catalogs"
              desc="Generate beautiful, print-ready catalogs for your clients instantly"
            />

            <Card
              icon={<path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6z" />}
              title="Vendor Verified"
              desc="All vendors are verified and trusted suppliers in the Egyptian market"
            />

            <Card
              icon={
                <>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v6l4 2" />
                </>
              }
              title="Save Time"
              desc="Reduce project estimation time from days to minutes"
            />

            <Card
              icon={<path d="M12 2l2.5 5 5 .5-4 3.5 1 5-4.5-2.5L7 16l1-5-4-3.5 5-.5z" />}
              title="Budget Optimization"
              desc="Smart suggestions to match your client's budget without compromising quality"
            />

          </div>
        </div>
      </section>

      {/* ================= FEATURED VENDORS ================= */}
<section id="vendors" className="py-24 bg-[#f5f1ec]">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
      Featured Vendors
    </h2>

    <p className="mt-4 text-lg text-gray-600">
      Trusted Egyptian furniture suppliers with verified products
    </p>

    <div className="mt-16 grid md:grid-cols-4 gap-8">

      {[
        { initials: "M", name: "Mobilia", products: "150+ Products" },
        { initials: "HC", name: "Home Center", products: "300+ Products" },
        { initials: "FE", name: "Furniture Egypt", products: "200+ Products" },
        { initials: "DH", name: "Design Hub", products: "180+ Products" },
      ].map((vendor, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >

          {/* Circle */}
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-6"
            style={{
              background: "linear-gradient(135deg,#c76f56,#5e6b5f)"
            }}
          >
            {vendor.initials}
          </div>

          <h3 className="text-xl font-semibold text-gray-800">
            {vendor.name}
          </h3>

          <p className="mt-2 text-gray-600">
            {vendor.products}
          </p>

        </div>
      ))}

    </div>

  </div>
  
</section>
{/* ================= TESTIMONIALS ================= */}
<section id="testimonials" className="py-24 bg-[#f1ebe6]">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
      What Designers Say
    </h2>

    <p className="mt-4 text-lg text-gray-600">
      Join hundreds of designers who trust CASA MOOD
    </p>

    <div className="mt-16 grid md:grid-cols-2 gap-10">

      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 text-left">

        <div className="flex items-center gap-5">

          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
            alt="Sara Ahmed"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold">Sara Ahmed</h3>
            <p className="text-gray-600">Interior Designer</p>
          </div>

        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          "CASA MOOD has transformed how I present projects to clients.
          What used to take days now takes minutes!"
        </p>

        <div className="mt-6 flex gap-2">
          {[1,2,3,4,5].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-[#d97757] rounded-full"
            ></div>
          ))}
        </div>

      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 text-left">

        <div className="flex items-center gap-5">

          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
            alt="Khaled Ibrahim"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold">Khaled Ibrahim</h3>
            <p className="text-gray-600">Design Studio Owner</p>
          </div>

        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          "The accuracy of the AI detection and real market pricing
          has increased our client satisfaction significantly."
        </p>

        <div className="mt-6 flex gap-2">
          {[1,2,3,4,5].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-[#d97757] rounded-full"
            ></div>
          ))}
        </div>

      </div>

    </div>

  </div>
</section>
{/* ================= CTA SECTION ================= */}
<section
  className="py-28 text-center"
  style={{
    background: "linear-gradient(135deg,#c76f56,#5e6b5f)"
  }}
>
  <div className="max-w-4xl mx-auto px-6">

    <h2 className="text-4xl md:text-6xl font-bold text-white">
      Ready to Transform Your Workflow?
    </h2>

    <p className="mt-6 text-lg md:text-xl text-white/90">
      Join CASA MOOD today and start creating professional catalogs in minutes
    </p>

    <button className="mt-12 bg-white text-[#c76f56] px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition duration-300">
      Get Started Free
    </button>

  </div>
</section>

     {/* ================= FOOTER ================= */}
<footer className="bg-[#f5f1ec] pt-20 pb-10">
  <div className="max-w-7xl mx-auto px-6">

    {/* Top Grid */}
    <div className="grid md:grid-cols-4 gap-12">

      {/* Logo + Description */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: "linear-gradient(135deg,#c76f56,#5e6b5f)" }}
          >
            ✦
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            CASA MOOD
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed">
          AI-powered interior design cost estimation
          platform for Egyptian market
        </p>
      </div>

      {/* Product */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-6">
          Product
        </h4>
        <ul className="space-y-3 text-gray-600">
          <li className="hover:text-black transition cursor-pointer">Features</li>
          <li className="hover:text-black transition cursor-pointer">How It Works</li>
          <li className="hover:text-black transition cursor-pointer">Pricing</li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-6">
          Company
        </h4>
        <ul className="space-y-3 text-gray-600">
          <li className="hover:text-black transition cursor-pointer">About</li>
          <li className="hover:text-black transition cursor-pointer">Blog</li>
          <li className="hover:text-black transition cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-6">
          Legal
        </h4>
        <ul className="space-y-3 text-gray-600">
          <li className="hover:text-black transition cursor-pointer">Privacy Policy</li>
          <li className="hover:text-black transition cursor-pointer">Terms of Service</li>
        </ul>
      </div>

    </div>

    {/* Divider */}
    <div className="border-t border-gray-300 mt-16 pt-6 text-center text-gray-600">
      © 2026 CASA MOOD. All rights reserved.
    </div>

  </div>
</footer>

    </div>
  )
}

export default App