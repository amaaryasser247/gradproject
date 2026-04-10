import { Mail, Lock } from "lucide-react"
import { Link } from "react-router-dom"


export default function Login()
 {
    
  return (
    <div className="min-h-screen flex bg-[#f5f1ec]">

      {/* LEFT SIDE */}
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
              Welcome Back to CASA MOOD
            </h2>
            <p className="mt-6 text-lg text-white/90 max-w-md">
              Continue transforming interior designs into real market costs
              with AI-powered precision
            </p>
          </div>

          <p className="text-sm text-white/80">
            Trusted by 500+ interior designers across Egypt
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-8 py-12">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-800">
            Sign In
          </h2>

          <p className="mt-2 text-gray-600">
            Enter your credentials to access your account
          </p>

          {/* Email */}
          <div className="mt-8">
            <label className="text-sm font-medium">
              Email Address
            </label>

            <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
              <Mail size={18} className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="designer@example.com"
                className="outline-none w-full bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
              <Lock size={18} className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Enter your password"
                className="outline-none w-full bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="text-[#c76f56] cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            className="w-full mt-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition"
            style={{
              background:
                "linear-gradient(135deg,#c76f56,#5e6b5f)",
            }}
          >
            Sign In →
          </button>

        </div>
      </div>
    </div>
  )
}