import { useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { SidebarNav } from '../components/dashboard/SidebarNav'
import { Topbar } from '../components/dashboard/Topbar'

export function DashboardLayout() {
  const location = useLocation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const isTicketingShell = !location.pathname.startsWith('/merch')

  return (
    <div
      className={`dashboard-shell${
        isTicketingShell ? ' dashboard-shell--ticketing' : ' dashboard-shell--merch'
      }`}
    >
      <button
        aria-hidden={!isMobileNavOpen}
        aria-label="Close navigation"
        className={`dashboard-overlay${isMobileNavOpen ? ' dashboard-overlay--visible' : ''}`}
        onClick={() => setIsMobileNavOpen(false)}
        tabIndex={isMobileNavOpen ? 0 : -1}
        type="button"
      />

      <SidebarNav isMobileOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <div className="dashboard-main">
        <Topbar onMenuClick={() => setIsMobileNavOpen((open) => !open)} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
