import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function VendorLayout() {
  const location = useLocation()
  const hideSidebar = location.pathname === "/vendor/store"

  return (
    <div className="min-h-screen bg-[#f5f1ec]">
      {hideSidebar ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen w-full bg-[#f5f1ec]">
          <aside className="sticky top-0 h-screen w-64 shrink-0">
            <Sidebar />
          </aside>

          <main className="dashboard-soft-ui vendor-dashboard-main min-w-0 flex-1 w-full max-w-none bg-[#f5f1ec]">
            <Outlet />
          </main>
        </div>
      )}

      <style>{`
        .vendor-dashboard-main > * {
          width: 100%;
          min-height: 100vh;
          background: #f5f1ec;
        }

        .vendor-dashboard-main > .flex > :first-child,
        .vendor-dashboard-main > .min-h-screen > :first-child {
          display: none !important;
        }

        .vendor-dashboard-main > .flex > :nth-child(2),
        .vendor-dashboard-main > .min-h-screen > :nth-child(2) {
          width: 100% !important;
          max-width: none !important;
          flex: 1 1 auto !important;
          margin-left: 0 !important;
          padding: 1.5rem !important;
        }

        @media (min-width: 1024px) {
          .vendor-dashboard-main > .flex > :nth-child(2),
          .vendor-dashboard-main > .min-h-screen > :nth-child(2) {
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
