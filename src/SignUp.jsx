import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Lock, Briefcase, Palette } from "lucide-react"

export default function SignUp() {
  const [role, setRole] = useState("designer")
  const navigate = useNavigate()

  const handleSignUp = () => {
    // هنا بعد ما تعمل validation أو API

    if (role === "vendor") {
      navigate("/products")
    } else {
      navigate("/dashboard") // غيرها لو عندك صفحة تانية
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f5f1ec]">

      {/* ===== LEFT SIDE IMAGE ===== */}
      <div
        className="hidden lg:flex w-1/2 relative text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(199,111,86,0.85), rgba(94,107,95,0.85))",
          }}
        />

        <div className="relative z-20 p-12 flex flex-col justify-between w-full">

          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              ✦
            </div>
            <h1 className="text-xl font-semibold">CASA MOOD</h1>
          </a>

          <div>
            <h2 className="text-4xl font-bold">
              Join CASA MOOD Today
            </h2>
            <p className="mt-6 text-lg text-white/90 max-w-md">
              Start transforming interior designs into real market costs
              with AI-powered precision.
            </p>
          </div>

          <p className="text-sm text-white/80">
            Trusted by 500+ interior designers across Egypt
          </p>
        </div>
      </div>

      {/* ===== RIGHT SIDE FORM ===== */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-8 py-12">

        <div className="w-full max-w-lg">

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-2 text-gray-600">
            Choose your role and get started in minutes
          </p>

          {/* Role Selection */}
          <div className="mt-8 flex gap-6">

            <div
              onClick={() => setRole("designer")}
              className={`flex-1 cursor-pointer rounded-2xl p-6 text-center border-2 transition
              ${
                role === "designer"
                  ? "border-[#d97757] bg-[#f7e8e2]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <Palette
                className={`mx-auto mb-3 ${
                  role === "designer" ? "text-[#d97757]" : "text-gray-400"
                }`}
              />
              <p className="font-semibold">Designer</p>
            </div>

            <div
              onClick={() => setRole("vendor")}
              className={`flex-1 cursor-pointer rounded-2xl p-6 text-center border-2 transition
              ${
                role === "vendor"
                  ? "border-[#d97757] bg-[#f7e8e2]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <Briefcase
                className={`mx-auto mb-3 ${
                  role === "vendor" ? "text-[#d97757]" : "text-gray-400"
                }`}
              />
              <p className="font-semibold">Vendor</p>
            </div>

          </div>

          {/* Form */}
          <div className="mt-8 space-y-5">

            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                <User size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                <Mail size={18} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="designer@example.com"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

          </div>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <input type="checkbox" />
            <p>
              I agree to the{" "}
              <span className="text-[#d97757]">Terms of Service</span> and{" "}
              <span className="text-[#d97757]">Privacy Policy</span>
            </p>
          </div>

          {/* 🔥 هنا التعديل */}
          <button
            onClick={handleSignUp}
            className="w-full mt-8 bg-[#d97757] text-white py-4 rounded-full font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            Create Account →
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-[#d97757] font-medium">
              Sign In
            </a>
          </p>

        </div>
      </div>

    </div>
  )
}