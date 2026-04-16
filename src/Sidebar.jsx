import { Link, useLocation } from "react-router-dom"
import {
  Package,
  PlusCircle,
  Layers,
  BarChart3,
  Boxes,
  User,
  LogOut
} from "lucide-react"

export default function Sidebar() {
  const location = useLocation()

  const menu = [
    { name: "Products", icon: Package, path: "/vendor/products" },
    { name: "Add Product", icon: PlusCircle, path: "/vendor/add-product" },
    { name: "Categories", icon: Layers, path: "/vendor/categories" },
    { name: "Analytics", icon: BarChart3, path: "/vendor/analytics" },
    { name: "Inventory", icon: Boxes, path: "/vendor/inventory" },
    { name: "Profile", icon: User, path: "/vendor/profile" },
  ]

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-[#f3ede7] flex flex-col justify-between border-r">

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3 p-6">
        <div className="w-10 h-10 rounded-full bg-[#d97757] text-white flex items-center justify-center">
          ✦
        </div>
        <h1 className="font-bold text-lg">CASA MOOD</h1>
      </Link>

      {/* MENU */}
      <div className="px-4 flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon
          const active = location.pathname.startsWith(item.path)

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-[#d97757] text-white shadow"
                  : "text-gray-600 hover:bg-[#eaded6]"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* USER */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 bg-[#e7ded7] p-3 rounded-xl mb-3">
          <div className="w-10 h-10 rounded-full bg-[#b85c3f] text-white flex items-center justify-center">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">Vendor</p>
          </div>
        </div>

        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  )
}