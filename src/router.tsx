import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AffiliatePage } from './pages/AffiliatePage'
import { ContactsPage } from './pages/ContactsPage'
import { DashboardLayout } from './layouts/DashboardLayout'
import { CreateEventPage } from './pages/CreateEventPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsManagementPage } from './pages/EventsManagementPage'
import { GetStartedPage } from './pages/GetStartedPage'
import { MerchantSetupPage } from './pages/MerchantSetupPage'
import { OverviewPage } from './pages/OverviewPage'
import { PaymentsPayoutsPage } from './pages/PaymentsPayoutsPage'
import { SettingsDetailPage } from './pages/SettingsDetailPage'
import { SettingsPage } from './pages/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetStartedPage />,
  },
  {
    path: 'auth',
    element: <Navigate replace to="/" />,
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
        path: 'dashboard',
        element: <Navigate replace to="/overview" />,
      },
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
        path: 'events/:eventId/edit',
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
        element: <ContactsPage />,
      },
      {
        path: 'affiliate',
        element: <AffiliatePage />,
      },
      {
        path: 'payouts',
        element: <PaymentsPayoutsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/:section',
        element: <SettingsDetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
