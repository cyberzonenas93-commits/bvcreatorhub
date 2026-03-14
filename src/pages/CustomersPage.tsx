import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
    helper: 'Customers returning for a second or third purchase from your store',
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
    helper: 'Profiles that may need fraud checks or extra support follow-up',
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
  'Buyer notes and fraud-prevention flags for sensitive orders',
]

export function CustomersPage() {
  const navigate = useNavigate()
  const [isSupportDeskOpen, setIsSupportDeskOpen] = useState(false)

  function exportCustomers() {
    downloadCsv('customers-and-insights.csv', [
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
            label: 'Support Playbook',
            icon: <MailIcon className="merch-action-button__glyph" />,
            onClick: () => setIsSupportDeskOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportCustomers,
          },
          {
            label: 'Open Orders',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/orders'),
            variant: 'primary',
          },
        ]}
        subtitle="Understand who is buying from your store, spot repeat customers, and stay on top of service follow-up."
        title="Customers & Insights"
      />

      <MetricsGrid metrics={customerStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Customer Profiles</h2>
              <p className="section-subtitle">
                A snapshot of your customers, repeat buyers, and support-sensitive orders.
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
                    <td data-label="Customer">{row.name}</td>
                    <td className="registrations-table__amount" data-label="Lifetime Value">
                      {row.lifetimeValue}
                    </td>
                    <td data-label="Orders">{row.orders}</td>
                    <td data-label="Location">{row.location}</td>
                    <td data-label="Status">
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td data-label="Support">{row.support}</td>
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
                <p className="insight-card__eyebrow">Support Tools</p>
                <h2 className="section-title">How To Stay Responsive</h2>
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

      {isSupportDeskOpen ? (
        <ActionSummaryModal
          description="Use this playbook to respond faster, protect repeat buyers, and keep support issues from slowing future orders."
          onClose={() => setIsSupportDeskOpen(false)}
          onPrimaryAction={() => {
            setIsSupportDeskOpen(false)
            navigate('/merch/orders')
          }}
          primaryActionLabel="Open Orders"
          sections={[
            { title: 'Support Controls', items: supportTools },
            {
              title: 'Profiles Requiring Attention',
              items: customerRows
                .filter((row) => row.status !== 'VIP' && row.status !== 'Repeat Buyer')
                .map((row) => `${row.name}: ${row.status} • ${row.support}`),
            },
          ]}
          title="Support Playbook"
        />
      ) : null}
    </div>
  )
}
