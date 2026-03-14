import { NavLink, useLocation } from 'react-router-dom'
import brandMark from '../../../BV PORTRAIT MARK.png'

import {
  AlertIcon,
  CalendarIcon,
  CardIcon,
  DocumentIcon,
  InventoryIcon,
  LayersIcon,
  LinkIcon,
  MapPinIcon,
  MegaphoneIcon,
  OverviewGridIcon,
  PackageIcon,
  SettingsIcon,
  StoreIcon,
  TrendIcon,
  UsersIcon,
  WalletIcon,
  XIcon,
} from '../ui/Icons'
import { merchNavigationItems, ticketingNavigationItems } from '../../data/navigation'

function SidebarItemIcon({ label }: { label: string }) {
  switch (label) {
    case 'Overview':
    case 'Analytics':
      return <OverviewGridIcon className="sidebar__icon-svg" />
    case 'Events':
      return <CalendarIcon className="sidebar__icon-svg" />
    case 'Contacts':
    case 'Customers':
    case 'CRM':
      return <UsersIcon className="sidebar__icon-svg" />
    case 'Affiliate':
      return <TrendIcon className="sidebar__icon-svg" />
    case 'Merchants':
    case 'Governance':
    case 'Storefront':
      return <StoreIcon className="sidebar__icon-svg" />
    case 'Products':
    case 'Catalog':
      return <PackageIcon className="sidebar__icon-svg" />
    case 'Orders':
      return <DocumentIcon className="sidebar__icon-svg" />
    case 'Inventory':
      return <InventoryIcon className="sidebar__icon-svg" />
    case 'Risk':
    case 'Account Health':
      return <AlertIcon className="sidebar__icon-svg" />
    case 'Collections':
    case 'Drops':
      return <LayersIcon className="sidebar__icon-svg" />
    case 'Promotions':
    case 'Marketing':
    case 'Campaigns':
      return <MegaphoneIcon className="sidebar__icon-svg" />
    case 'Payments & Payouts':
      return <CardIcon className="sidebar__icon-svg" />
    case 'Payments':
    case 'Revenue':
    case 'Payouts':
      return <WalletIcon className="sidebar__icon-svg" />
    case 'Logistics':
    case 'Shipping':
      return <MapPinIcon className="sidebar__icon-svg" />
    case 'Content':
    case 'Creator':
    case 'Content Commerce':
      return <LinkIcon className="sidebar__icon-svg" />
    case 'Settings':
    case 'Controls':
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
  const location = useLocation()
  const isMerchDashboard = location.pathname.startsWith('/merch')
  const navigationItems = isMerchDashboard ? merchNavigationItems : ticketingNavigationItems

  return (
    <aside className={`sidebar${isMobileOpen ? ' sidebar--mobile-open' : ''}`} aria-label="Primary">
      <div className="sidebar__brand">
        <div className="sidebar__brand-copy">
          <img
            className={`sidebar__logo${isMerchDashboard ? '' : ' sidebar__logo--ticketing'}`}
            src={brandMark}
            alt="Blacvolta mark"
          />
          <span className="sidebar__title">{isMerchDashboard ? 'BV Creator Hub' : 'Admin Panel'}</span>
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
            end={item.to === '/dashboard' || item.to === '/merch/analytics'}
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
