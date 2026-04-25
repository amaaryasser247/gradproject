import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Lock, Briefcase, Palette, Building2, Phone, MapPin, FileText, Image, MessageCircle } from "lucide-react"

export default function SignUp() {
  const [role, setRole] = useState("designer")
  const navigate = useNavigate()

  // Shared fields
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Designer field
  const [designerPhone, setDesignerPhone] = useState("")

  // Vendor fields
  const [companyName, setCompanyName] = useState("")
  const [vendorPhone, setVendorPhone] = useState("")
  const [whatsApp, setWhatsApp] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [logoUrl, setLogoUrl] = useState("")

  const handleSignUp = () => {
    // قراءة البيانات من الـ state مباشرة بدل الـ refs
    const pass    = password;
    const confirm = confirmPassword;

    if (pass !== confirm) {
      setPasswordError("Passwords do not match")
      return
    }
    if (pass.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }
    setPasswordError("")

    // حفظ بيانات اليوزر في localStorage
    const user = {
      name:  fullName,
      email: email,
      role,
    }
    localStorage.setItem("casamood_user", JSON.stringify(user))

    if (role === "vendor") {
      navigate("/vendor/products")
    } else {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f5f1ec]">

      {/* LEFT SIDE IMAGE */}
      <div
        className="hidden lg:flex w-1/2 relative text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(199,111,86,0.85), rgba(94,107,95,0.85))" }}
        />
        <div className="relative z-20 p-12 flex flex-col justify-between w-full">
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">✦</div>
            <h1 className="text-xl font-semibold">CASA MOOD</h1>
          </a>
          <div>
            <h2 className="text-4xl font-bold">Join CASA MOOD Today</h2>
            <p className="mt-6 text-lg text-white/90 max-w-md">
              Start transforming interior designs into real market costs with AI-powered precision.
            </p>
          </div>
          <p className="text-sm text-white/80">Trusted by 500+ interior designers across Egypt</p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex w-full lg:w-1/2 items-start justify-center px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">

          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="mt-2 text-gray-600">Choose your role and get started in minutes</p>

          {/* Role Selection */}
          <div className="mt-8 flex gap-6">
            <div
              onClick={() => setRole("designer")}
              className={`flex-1 cursor-pointer rounded-2xl p-6 text-center border-2 transition
              ${role === "designer" ? "border-[#d97757] bg-[#f7e8e2]" : "border-gray-200 bg-white"}`}
            >
              <Palette className={`mx-auto mb-3 ${role === "designer" ? "text-[#d97757]" : "text-gray-400"}`} />
              <p className="font-semibold">Designer</p>
            </div>
            <div
              onClick={() => setRole("vendor")}
              className={`flex-1 cursor-pointer rounded-2xl p-6 text-center border-2 transition
              ${role === "vendor" ? "border-[#d97757] bg-[#f7e8e2]" : "border-gray-200 bg-white"}`}
            >
              <Briefcase className={`mx-auto mb-3 ${role === "vendor" ? "text-[#d97757]" : "text-gray-400"}`} />
              <p className="font-semibold">Vendor</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                <User size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                <Mail size={18} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="designer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Designer Phone */}
            {role === "designer" && (
              <div>
                <label className="text-sm font-medium">Phone</label>
                <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                  <Phone size={18} className="text-gray-400 mr-3" />
                  <input
                    type="tel"
                    placeholder="+20 10 0000 0000"
                    value={designerPhone}
                    onChange={(e) => setDesignerPhone(e.target.value)}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className={`mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm ${passwordError ? "ring-1 ring-red-400" : ""}`}>
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div className={`mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm ${passwordError ? "ring-1 ring-red-400" : ""}`}>
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError("") }}
                  className="w-full outline-none bg-transparent"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1.5">⚠ {passwordError}</p>
              )}
            </div>

            {/* Vendor Extra Fields */}
            {role === "vendor" && (
              <>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-[#f0e6e0]" />
                  <span className="text-xs text-[#d97757] font-semibold uppercase tracking-widest">Vendor Info</span>
                  <div className="flex-1 h-px bg-[#f0e6e0]" />
                </div>

                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                    <Building2 size={18} className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                    <Phone size={18} className="text-gray-400 mr-3" />
                    <input
                      type="tel"
                      placeholder="+20 10 0000 0000"
                      value={vendorPhone}
                      onChange={(e) => setVendorPhone(e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">WhatsApp Link</label>
                  <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                    <MessageCircle size={18} className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="https://wa.me/20100000000"
                      value={whatsApp}
                      onChange={(e) => setWhatsApp(e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                    <MapPin size={18} className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Cairo, Egypt"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <div className="mt-2 flex items-start bg-white rounded-xl px-4 py-3 shadow-sm">
                    <FileText size={18} className="text-gray-400 mr-3 mt-0.5" />
                    <textarea
                      rows={3}
                      placeholder="Tell us about your business..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full outline-none bg-transparent resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Logo Image URL</label>
                  <div className="mt-2 flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                    <Image size={18} className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="https://example.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>
              </>
            )}

          </div>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <input type="checkbox" />
            <p>
              I agree to the{" "}
              <span className="text-[#d97757]">Terms of Service</span> and{" "}
              <span className="text-[#d97757]">Privacy Policy</span>
            </p>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full mt-8 bg-[#d97757] text-white py-4 rounded-full font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            Create Account →
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-[#d97757] font-medium">Sign In</a>
          </p>

        </div>
      </div>
    </div>
  )
}