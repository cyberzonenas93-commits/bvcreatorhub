import { Link } from 'react-router-dom'

import {
  AlertIcon,
  CardIcon,
  ChevronRightIcon,
  MailIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '../components/ui/Icons'

const sections = [
  {
    group: 'Account',
    items: [
      { to: '/settings/profile', title: 'Profile Settings', description: 'Update your personal information', icon: <UsersIcon className="button-icon" /> },
      { to: '/settings/email-preferences', title: 'Email Preferences', description: 'Manage notification settings', icon: <MailIcon className="button-icon" /> },
      { to: '/settings/security', title: 'Security', description: 'Passwords and authentication', icon: <ShieldCheckIcon className="button-icon" /> },
    ],
  },
  {
    group: 'Business',
    items: [
      { to: '/settings/payout', title: 'Payout Settings', description: 'Manage your payout methods', icon: <CardIcon className="button-icon" /> },
      { to: '/settings/onboarding', title: 'Onboarding', description: 'View progress connected to setup', icon: <AlertIcon className="button-icon" /> },
    ],
  },
  {
    group: 'Notifications',
    items: [
      { to: '/settings/push-notifications', title: 'Push Notifications', description: 'Manage push notification settings', icon: <AlertIcon className="button-icon" /> },
    ],
  },
] as const

export function SettingsPage() {
  return (
    <div className="dashboard-page dashboard-page--narrow utility-page">
      <section className="utility-page__header utility-page__header--stacked">
        <div>
          <h1>Settings</h1>
          <p>Manage your account settings and preferences.</p>
        </div>
      </section>

      <div className="settings-groups">
        {sections.map((section) => (
          <section key={section.group} className="settings-group">
            <span className="settings-group__label">{section.group}</span>
            <div className="settings-group__items">
              {section.items.map((item) => (
                <Link key={item.to} className="settings-row" to={item.to}>
                  <span className="settings-row__icon">{item.icon}</span>
                  <div className="settings-row__copy">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                  <ChevronRightIcon className="button-icon settings-row__chevron" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
