import { useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  MailIcon,
  TrendIcon,
  UsersIcon,
  WalletIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

type CustomerRow = {
  name: string
  lifetimeValue: string
  orders: string
  location: string
  status: string
  tone: 'success' | 'warning' | 'danger' | 'info'
  support: string
}

const customerStats: DashboardMetric[] = [
  {
    label: 'Active Buyers',
    value: '3,842',
    helper: 'Unique shoppers with purchases in the current merch cycle',
    delta: '+14.7%',
    icon: <UsersIcon className="metric-card__glyph" />,
  },
  {
    label: 'Repeat Rate',
    value: '38%',
    helper: 'Customers returning for a second or third BlacVolta merch order',
    delta: '+5.1%',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Average Order Value',
    value: 'GH₵512',
    helper: 'Weighted by premium fashion, accessories, and creator merch bundles',
    delta: '+GH₵32',
    icon: <WalletIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Fraud Watchlist',
    value: '9 accounts',
    helper: 'High-risk profiles requiring blacklist or manual support review',
    delta: '+2',
    icon: <MailIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const customerRows: CustomerRow[] = [
  {
    name: 'Ama Mensah',
    lifetimeValue: 'GH₵4,860',
    orders: '9 orders',
    location: 'Accra, Ghana',
    status: 'VIP',
    tone: 'success',
    support: 'Editorial concierge',
  },
  {
    name: 'Kojo Aboagye',
    lifetimeValue: 'GH₵1,920',
    orders: '4 orders',
    location: 'London, UK',
    status: 'Repeat Buyer',
    tone: 'info',
    support: 'No issues',
  },
  {
    name: 'Efua Bannerman',
    lifetimeValue: 'GH₵720',
    orders: '2 orders',
    location: 'Kumasi, Ghana',
    status: 'Support Open',
    tone: 'warning',
    support: 'Size exchange',
  },
  {
    name: 'Yaw Frimpong',
    lifetimeValue: 'GH₵460',
    orders: '1 order',
    location: 'Tema, Ghana',
    status: 'Fraud Review',
    tone: 'danger',
    support: 'Payment mismatch',
  },
]

const locationInsights = [
  { label: 'Accra', value: '42%' },
  { label: 'London', value: '18%' },
  { label: 'Lagos', value: '14%' },
  { label: 'New York', value: '10%' },
  { label: 'Other', value: '16%' },
]

const supportTools = [
  'Customer profiles with purchase history and order context',
  'Average order value and repeat-purchase signals',
  'Location insights for fulfillment and curation decisions',
  'Blacklist controls for fraud and abuse prevention',
]

export function CustomersPage() {
  const navigate = useNavigate()

  function exportCustomers() {
    downloadCsv('blacvolta-customers.csv', [
      ['Name', 'Lifetime Value', 'Orders', 'Location', 'Status', 'Support'],
      ...customerRows.map((row) => [
        row.name,
        row.lifetimeValue,
        row.orders,
        row.location,
        row.status,
        row.support,
      ]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Support Desk',
            icon: <MailIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportCustomers,
          },
          {
            label: 'Open Orders',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/orders'),
            variant: 'primary',
          },
        ]}
        subtitle="Track shopper profiles, repeat behavior, support needs, and fraud risk across the marketplace."
        title="Customer Management"
      />

      <MetricsGrid metrics={customerStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Customer Profiles</h2>
              <p className="section-subtitle">
                Buyer visibility for support, loyalty, fraud checks, and fulfillment context.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Lifetime Value</th>
                  <th>Orders</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Support</th>
                </tr>
              </thead>
              <tbody>
                {customerRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td className="registrations-table__amount">{row.lifetimeValue}</td>
                    <td>{row.orders}</td>
                    <td>{row.location}</td>
                    <td>
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td>{row.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="stack-grid">
          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Location Insights</p>
                <h2 className="section-title">Where Demand Is Building</h2>
              </div>
              <TrendIcon className="insight-card__headline-icon" />
            </div>
            <ul className="source-list">
              {locationInsights.map((location) => (
                <li key={location.label} className="source-list__item">
                  <div className="source-list__meta">
                    <span>{location.label}</span>
                    <strong>{location.value}</strong>
                  </div>
                  <div className="source-bar">
                    <span className="source-bar__fill" style={{ width: location.value }} />
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Admin Tools</p>
                <h2 className="section-title">Support Controls</h2>
              </div>
              <UsersIcon className="insight-card__headline-icon" />
            </div>
            <ul className="feature-list">
              {supportTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}
