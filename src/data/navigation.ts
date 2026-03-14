export type NavigationItem = {
  label: string
  to: string
}

export const ticketingNavigationItems: NavigationItem[] = [
  { label: 'Overview', to: '/overview' },
  { label: 'Events', to: '/events' },
  { label: 'Contacts', to: '/contacts' },
  { label: 'Affiliate', to: '/affiliate' },
  { label: 'Payments & Payouts', to: '/payouts' },
  { label: 'Settings', to: '/settings' },
]

export const merchNavigationItems: NavigationItem[] = [
  { label: 'Overview', to: '/merch/analytics' },
  { label: 'Storefront', to: '/merch/merchants' },
  { label: 'Products', to: '/merch/products' },
  { label: 'Orders', to: '/merch/orders' },
  { label: 'Payouts', to: '/merch/payments' },
  { label: 'Shipping', to: '/merch/logistics' },
  { label: 'Account Health', to: '/merch/risk' },
  { label: 'Inventory', to: '/merch/inventory' },
  { label: 'Collections', to: '/merch/collections' },
  { label: 'Campaigns', to: '/merch/promotions' },
  { label: 'Customers', to: '/merch/customers' },
  { label: 'Content Commerce', to: '/merch/content-commerce' },
  { label: 'Settings', to: '/merch/settings' },
]
