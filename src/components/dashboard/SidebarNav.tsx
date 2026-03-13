import { NavLink } from 'react-router-dom'
import brandMark from '../../../BV PORTRAIT MARK.png'

import {
  CalendarIcon,
  CardIcon,
  OverviewGridIcon,
  SettingsIcon,
  TrendIcon,
  UsersIcon,
  XIcon,
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

export function SidebarNav({
  isMobileOpen = false,
  onClose,
}: {
  isMobileOpen?: boolean
  onClose?: () => void
}) {
  return (
    <aside className={`sidebar${isMobileOpen ? ' sidebar--mobile-open' : ''}`} aria-label="Primary">
      <div className="sidebar__brand">
        <div className="sidebar__brand-copy">
          <img className="sidebar__logo" src={brandMark} alt="Black Volta mark" />
          <span className="sidebar__title">Admin Panel</span>
        </div>

        <button
          aria-label="Close navigation"
          className="icon-button sidebar__close"
          onClick={onClose}
          type="button"
        >
          <XIcon className="button-icon" />
        </button>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
            end={item.to === '/overview'}
            onClick={onClose}
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
