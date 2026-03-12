import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { DashboardLayout } from './layouts/DashboardLayout'
import { CreateEventPage } from './pages/CreateEventPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsManagementPage } from './pages/EventsManagementPage'
import { GetStartedPage } from './pages/GetStartedPage'
import { MerchantSetupPage } from './pages/MerchantSetupPage'
import { OverviewPage } from './pages/OverviewPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/setup/account" />,
  },
  {
    path: 'auth',
    element: <GetStartedPage />,
  },
  {
    path: 'setup',
    element: <Navigate replace to="/setup/account" />,
  },
  {
    path: 'setup/:step',
    element: <MerchantSetupPage />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'events',
        element: <EventsManagementPage />,
      },
      {
        path: 'events/new',
        element: <CreateEventPage />,
      },
      {
        path: 'events/:eventId',
        element: <EventDetailPage />,
      },
      {
        path: 'events/:eventId/:tab',
        element: <EventDetailPage />,
      },
      {
        path: 'contacts',
        element: (
          <PlaceholderPage
            title="Contacts"
            description="Manage contact records and guest relationship workflows."
            bullets={[
              'Audience lists and tagging',
              'Contact history and notes',
              'Guest communication tools',
            ]}
          />
        ),
      },
      {
        path: 'affiliate',
        element: (
          <PlaceholderPage
            title="Affiliate"
            description="Track promoter performance and referral-driven sales."
            bullets={[
              'Affiliate link reporting',
              'Commission payouts',
              'Partner leaderboard views',
            ]}
          />
        ),
      },
      {
        path: 'payouts',
        element: (
          <PlaceholderPage
            title="Payments & Payouts"
            description="Review settlements, payout schedules, and payment method performance."
            bullets={[
              'Settlement summaries',
              'Payout status tracking',
              'Payment channel reporting',
            ]}
          />
        ),
      },
      {
        path: 'settings',
        element: (
          <PlaceholderPage
            title="Settings"
            description="Configure account preferences, payment rules, and team permissions."
            bullets={[
              'Organization profile settings',
              'Team roles and access',
              'Default event behavior',
            ]}
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/setup/account" />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
