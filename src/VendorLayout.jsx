import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function VendorLayout() {
  const location = useLocation()
  const hideSidebar = location.pathname === "/vendor/store"

  if (hideSidebar) {
    return <Outlet />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 h-screen w-64 shrink-0 bg-card border-r border-border">
        <Sidebar />
      </aside>

      <main className="min-w-0 flex-1 bg-background text-foreground">
        <Outlet />
      </main>
    </div>
  )
}
