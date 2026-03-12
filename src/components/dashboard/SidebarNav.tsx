import { NavLink } from 'react-router-dom'

import {
  CalendarIcon,
  CardIcon,
  MenuPanelIcon,
  OverviewGridIcon,
  SettingsIcon,
  TrendIcon,
  UsersIcon,
} from '../ui/Icons'
import { navigationItems } from '../../data/navigation'

function SidebarItemIcon({ label }: { label: string }) {
  switch (label) {
    case 'Overview':
      return <OverviewGridIcon className="sidebar__icon-svg" />
    case 'Events':
      return <CalendarIcon className="sidebar__icon-svg" />
    case 'Contacts':
      return <UsersIcon className="sidebar__icon-svg" />
    case 'Affiliate':
      return <TrendIcon className="sidebar__icon-svg" />
    case 'Payments & Payouts':
      return <CardIcon className="sidebar__icon-svg" />
    case 'Settings':
      return <SettingsIcon className="sidebar__icon-svg" />
    default:
      return <OverviewGridIcon className="sidebar__icon-svg" />
  }
}

export function SidebarNav() {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="sidebar__brand">
        <MenuPanelIcon className="sidebar__logo" />
        <span className="sidebar__title">Admin Panel</span>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
            end={item.to === '/overview'}
            to={item.to}
          >
            <SidebarItemIcon label={item.label} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
