import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom"

export default function VendorLayout() {

  const navigate = useNavigate()
  const location = useLocation()

  const hideSidebar = location.pathname === "/vendor/store"

  const handleLogout = () => {
    console.log("logout clicked")
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-[#f5f1ec]">

      {/* SIDEBAR */}
      {!hideSidebar && (
        <div className="w-64 fixed left-0 top-0 h-full bg-[#f1ebe6] p-6 flex flex-col border-r">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-[#d97757] flex items-center justify-center text-white">
              ✦
            </div>
            <h1 className="font-bold text-lg">CASA MOOD</h1>
          </NavLink>

          {/* LINKS */}
          <nav className="flex flex-col gap-2">
            <SidebarLink to="/vendor/products" label="Products" />
            <SidebarLink to="/vendor/add-product" label="Add Product" />
            <SidebarLink to="/vendor/categories" label="Categories" />
          </nav>

          {/* USER + LOGOUT */}
          <div className="mt-auto pt-6 border-t">
            <div className="bg-white rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d97757] text-white flex items-center justify-center">
                JD
              </div>
              <div>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-gray-500">Vendor</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-gray-600 hover:text-white hover:bg-red-500 transition-all duration-300 group w-full"
            >
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>

              Logout
            </button>
          </div>

        </div>
      )}

      {/* CONTENT */}
      <div className={`${hideSidebar ? "ml-0" : "ml-64"} w-full p-8`}>
        <Outlet />
      </div>

    </div>
  )
}

function SidebarLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-3 rounded-xl transition ${
          isActive
            ? "bg-[#d97757] text-white"
            : "text-gray-600 hover:bg-white"
        }`
      }
    >
      {label}
    </NavLink>
  )
}