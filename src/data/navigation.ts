export type NavigationItem = {
  label: string
  to: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'Overview', to: '/overview' },
  { label: 'Events', to: '/events' },
  { label: 'Contacts', to: '/contacts' },
  { label: 'Affiliate', to: '/affiliate' },
  { label: 'Payments & Payouts', to: '/payouts' },
  { label: 'Settings', to: '/settings' },
]
