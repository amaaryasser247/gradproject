import { Link, useLocation, useNavigate } from "react-router-dom"
import { logoutUser } from "./services/authService"
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
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  const menu = [
    { name: "Products", icon: Package, path: "/vendor/products" },
    { name: "Add Product", icon: PlusCircle, path: "/vendor/add-product" },
    { name: "Categories", icon: Layers, path: "/vendor/categories" },
    { name: "Analytics", icon: BarChart3, path: "/vendor/analytics" },
    { name: "Inventory", icon: Boxes, path: "/vendor/inventory" },
    { name: "Profile", icon: User, path: "/vendor/profile" },
  ]

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-card flex flex-col border-r border-border shadow-sm">

      
      <div className="flex items-center justify-between p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
            ✦
          </div>
          <h1 className="font-bold text-lg text-foreground">CASA MOOD</h1>
        </Link>
      </div>

      
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
                  ? "bg-accent text-white shadow"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          )
        })}
      </div>

      
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center gap-3 bg-muted p-3 rounded-xl mb-3">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Vendor</p>
          </div>
        </div>

        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-muted-foreground transition hover:bg-muted hover:text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  )
}
