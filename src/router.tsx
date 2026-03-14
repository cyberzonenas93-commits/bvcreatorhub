import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AnalyticsPage } from './pages/AnalyticsPage'
import { AffiliatePage } from './pages/AffiliatePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { ContentCommercePage } from './pages/ContentCommercePage'
import { ContactsPage } from './pages/ContactsPage'
import { CustomersPage } from './pages/CustomersPage'
import { DashboardLayout } from './layouts/DashboardLayout'
import { CreateEventPage } from './pages/CreateEventPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsManagementPage } from './pages/EventsManagementPage'
import { GetStartedPage } from './pages/GetStartedPage'
import { InventoryPage } from './pages/InventoryPage'
import { MerchGetStartedPage } from './pages/MerchGetStartedPage'
import { MerchOnboardingPage } from './pages/MerchOnboardingPage'
import { MerchantsPage } from './pages/MerchantsPage'
import { MerchSettingsPage } from './pages/MerchSettingsPage'
import { MerchantSetupPage } from './pages/MerchantSetupPage'
import { LogisticsPage } from './pages/LogisticsPage'
import { OverviewPage } from './pages/OverviewPage'
import { OrdersPage } from './pages/OrdersPage'
import { PaymentsPage } from './pages/PaymentsPage'
import { PaymentsPayoutsPage } from './pages/PaymentsPayoutsPage'
import { ProductsPage } from './pages/ProductsPage'
import { PromotionsPage } from './pages/PromotionsPage'
import { RiskPage } from './pages/RiskPage'
import { SettingsDetailPage } from './pages/SettingsDetailPage'
import { SettingsPage } from './pages/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/merch/get-started" />,
  },
  {
    path: 'auth',
    element: <Navigate replace to="/merch/get-started" />,
  },
  {
    path: 'ticketing/get-started',
    element: <GetStartedPage />,
  },
  {
    path: 'ticketing/auth',
    element: <Navigate replace to="/ticketing/get-started" />,
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
    path: 'merch/get-started',
    element: <MerchGetStartedPage />,
  },
  {
    path: 'merch/auth',
    element: <Navigate replace to="/merch/get-started" />,
  },
  {
    path: 'merch/setup',
    element: <Navigate replace to="/merch/setup/account" />,
  },
  {
    path: 'merch/setup/:step',
    element: <MerchOnboardingPage />,
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
    path: 'merch',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/merch/analytics" />,
      },
      {
        path: 'overview',
        element: <Navigate replace to="/merch/analytics" />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'merchants',
        element: <MerchantsPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'inventory',
        element: <InventoryPage />,
      },
      {
        path: 'collections',
        element: <CollectionsPage />,
      },
      {
        path: 'promotions',
        element: <PromotionsPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'logistics',
        element: <LogisticsPage />,
      },
      {
        path: 'risk',
        element: <RiskPage />,
      },
      {
        path: 'content-commerce',
        element: <ContentCommercePage />,
      },
      {
        path: 'settings',
        element: <MerchSettingsPage />,
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
