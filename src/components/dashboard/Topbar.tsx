import { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { bellIcon, caretDownIcon } from '../../assets/figma'
import {
  AlertIcon,
  CheckIcon,
  InfoIcon,
  MenuIcon,
  TicketIcon,
  TrendIcon,
  WalletIcon,
  XIcon,
} from '../ui/Icons'

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const isMarketplace = location.pathname.startsWith('/merch')
  const items = isMarketplace
    ? [
        {
          title: 'New Order Received',
          body: 'Order #BV-2401 has been paid and is ready for packing.',
          time: '6 mins ago',
          icon: <CheckIcon className="button-icon" />,
          tone: 'warning',
          unread: true,
          to: '/merch/orders',
        },
        {
          title: 'Low Stock Alert',
          body: 'Community Code Hoodie is down to 18 units and may need a restock soon.',
          time: '18 mins ago',
          icon: <AlertIcon className="button-icon" />,
          tone: 'warning',
          unread: true,
          to: '/merch/inventory',
        },
        {
          title: 'Payout Scheduled',
          body: 'Your next settlement is scheduled for Friday after recent orders clear.',
          time: '1 hour ago',
          icon: <WalletIcon className="button-icon" />,
          tone: 'success',
          unread: false,
          to: '/merch/payments',
        },
        {
          title: 'Collection Feature Live',
          body: 'Your Resort Edit collection is now featured in the marketplace and content feed.',
          time: '2 hours ago',
          icon: <TrendIcon className="button-icon" />,
          tone: 'muted',
          unread: false,
          to: '/merch/collections',
        },
      ]
    : [
        {
          title: 'New Ticket Sold',
          body: 'Ama Mensah just purchased 2 VIP tickets for Afrochella 2026.',
          time: '2 mins ago',
          icon: <TicketIcon className="button-icon" />,
          tone: 'accent',
          unread: true,
          to: '/events',
        },
        {
          title: 'Capacity Alert',
          body: 'Ghana Tech Summit 2026 is now at 95% capacity.',
          time: '15 mins ago',
          icon: <AlertIcon className="button-icon" />,
          tone: 'warning',
          unread: true,
          to: '/events',
        },
        {
          title: 'Payout Successful',
          body: 'Your payout of GH₵74,700.00 has been processed via MTN Mobile Money.',
          time: '1 hour ago',
          icon: <CheckIcon className="button-icon" />,
          tone: 'success',
          unread: false,
          to: '/payouts',
        },
        {
          title: 'New Registration',
          body: 'Someone just registered for your Chale Wote Street Art Festival event.',
          time: '3 hours ago',
          icon: <InfoIcon className="button-icon" />,
          tone: 'muted',
          unread: false,
          to: '/overview',
        },
      ]

  return (
    <header className="topbar">
      <button
        aria-label="Open navigation"
        className="icon-button topbar__menu-button"
        onClick={onMenuClick}
        type="button"
      >
        <MenuIcon className="button-icon" />
      </button>

      <div className="topbar__actions">
        <button className="icon-button" type="button" aria-label="Notifications" onClick={() => setIsNotificationsOpen((open) => !open)}>
          <img src={bellIcon} alt="" aria-hidden="true" />
        </button>

        <button
          className="profile-chip"
          onClick={() => navigate(isMarketplace ? '/merch/settings' : '/settings')}
          type="button"
        >
          <span className="profile-chip__avatar">{isMarketplace ? 'CB' : 'DA'}</span>
          <span className="profile-chip__name">{isMarketplace ? 'Christie Brown Studio' : 'Delasie Ametepey'}</span>
          <img src={caretDownIcon} alt="" aria-hidden="true" />
        </button>

        {isNotificationsOpen ? (
          <section className="notifications-popover">
            <header className="notifications-popover__header">
              <div className="notifications-popover__title">
                <TrendIcon className="button-icon" />
                <h2>Notifications</h2>
              </div>
              <button aria-label="Close notifications" className="notifications-popover__close" onClick={() => setIsNotificationsOpen(false)} type="button">
                <XIcon className="button-icon" />
              </button>
            </header>

            <div className="notifications-popover__list">
              {items.map((item) => (
                <Link
                  key={item.title}
                  className="notifications-item"
                  onClick={() => setIsNotificationsOpen(false)}
                  to={item.to}
                >
                  <span className={`notifications-item__icon notifications-item__icon--${item.tone}`}>{item.icon}</span>
                  <div className="notifications-item__copy">
                    <div className="notifications-item__title-row">
                      <strong>{item.title}</strong>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.body}</p>
                  </div>
                  {item.unread ? <span className="notifications-item__dot" /> : null}
                </Link>
              ))}
            </div>

            <Link
              className="notifications-popover__link"
              onClick={() => setIsNotificationsOpen(false)}
              to={isMarketplace ? '/merch/analytics' : '/overview'}
            >
              <TrendIcon className="button-icon" />
              <span>View all activity</span>
            </Link>
          </section>
        ) : null}
      </div>
    </header>
  )
}
