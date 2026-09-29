import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard-soft-ui grid min-h-screen grid-cols-[18rem_minmax(0,1fr)] bg-background text-foreground">
      
      <div className="sticky top-0 h-screen w-72 bg-card p-6 flex flex-col border-r border-border shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
              ✦
            </div>
            <h1 className="font-semibold text-lg text-foreground">CASA MOOD</h1>
          </NavLink>
        </div>

        <nav className="space-y-2 flex-1">
          
          <SidebarLink to="/dashboard/upload" label="New Project" />
          <SidebarLink to="/dashboard/projects" label="My Projects" />
          <SidebarLink to="/dashboard/catalogs" label="My Catalogs" />

        </nav>

        
        <div className="mt-auto pt-6 border-t border-border">
          <div className="bg-muted rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-semibold italic">JD</div>
            <div>
              <p className="font-semibold text-foreground text-sm">John Doe</p>
              <p className="text-xs text-muted-foreground">Designer</p>
            </div>
          </div>
        </div>
      </div>

      
      <main className="min-w-0 w-full flex-1 max-w-none px-6 py-8 lg:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block p-3 rounded-full transition-all ${
          isActive ? "bg-accent text-white shadow-md" : "text-muted-foreground hover:bg-muted"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
