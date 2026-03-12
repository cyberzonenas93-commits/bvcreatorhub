import { Outlet } from 'react-router-dom'

import { SidebarNav } from '../components/dashboard/SidebarNav'
import { Topbar } from '../components/dashboard/Topbar'

export function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <SidebarNav />

      <div className="dashboard-main">
        <Topbar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
