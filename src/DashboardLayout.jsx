import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5f1ec]">
      {/* السايدبار بتاعك - ثابت */}
      <div className="w-72 bg-white min-h-screen p-6 flex flex-col fixed border-r border-gray-100">
        <NavLink to="/" className="flex items-center gap-3 mb-8">
  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#c76f56] to-[#5e6b5f] flex items-center justify-center text-white font-bold">
    ✦
  </div>
  <h1 className="font-semibold text-lg text-gray-800">CASA MOOD</h1>
</NavLink>

        <nav className="space-y-2 flex-1">
          <SidebarLink to="/dashboard/overview" label="Overview" />
          <SidebarLink to="/dashboard/upload" label="New Project" />
          <SidebarLink to="/dashboard/projects" label="My Projects" />
          <SidebarLink to="/dashboard/settings" label="Settings" />
        </nav>

        {/* بروفايل المستخدم اللي تحت */}
        <div className="mt-auto pt-6 border-t">
          <div className="bg-[#f1ebe6] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#c76f56] to-[#5e6b5f] flex items-center justify-center text-white font-semibold italic">JD</div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">John Doe</p>
              <p className="text-xs text-gray-500">Designer</p>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى المتغير - اللي الصور بتاعته هتظهر هنا */}
      <main className="flex-1 ml-72 p-10">
        <Outlet />
      </main>
    </div>
  );
}

// مكون بسيط للروابط عشان نحدد اللون البرتقالي لما نضغط
function SidebarLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block p-3 rounded-full transition-all ${
          isActive ? "bg-[#d97757] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}