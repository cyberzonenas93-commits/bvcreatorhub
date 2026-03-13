import { Link, useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  EyeIcon,
  MailIcon,
  TrendIcon,
  UsersIcon,
  DocumentIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

type OrderRow = {
  id: string
  customer: string
  brand: string
  status: string
  tone: 'accent' | 'success' | 'warning' | 'info' | 'danger'
  amount: string
  refund: string
  contactEmail: string
}

const orderStats: DashboardMetric[] = [
  {
    label: 'Pending Orders',
    value: '38',
    helper: 'New order volume waiting for merchant processing',
    delta: '+12',
    icon: <DocumentIcon className="metric-card__glyph" />,
  },
  {
    label: 'Processing',
    value: '64',
    helper: 'Orders currently being packed or routed for shipment',
    delta: '+8',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Shipped This Week',
    value: '112',
    helper: 'Marketplace fulfillment volume with tracking attached',
    delta: '+21',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Returns Rate',
    value: '2.8%',
    helper: 'Returned or refunded orders requiring review',
    delta: '-0.4%',
    icon: <MailIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const statusColumns = [
  {
    title: 'Pending',
    tone: 'accent' as const,
    items: ['#BV-2401 Christie Brown edit', '#BV-2405 Free The Youth tee'],
  },
  {
    title: 'Paid',
    tone: 'success' as const,
    items: ['#BV-2396 BlacVolta hoodie bundle', '#BV-2398 Chocolate preorder'],
  },
  {
    title: 'Processing',
    tone: 'warning' as const,
    items: ['#BV-2388 Brill resort capsule', '#BV-2393 Creator tote drop'],
  },
  {
    title: 'Shipped',
    tone: 'info' as const,
    items: ['#BV-2381 AfroFuture merch pack', '#BV-2384 Christie Brown dress'],
  },
  {
    title: 'Delivered',
    tone: 'success' as const,
    items: ['#BV-2374 Streetwear combo kit'],
  },
  {
    title: 'Returned',
    tone: 'danger' as const,
    items: ['#BV-2368 Size exchange requested'],
  },
]

const orderRows: OrderRow[] = [
  {
    id: '#BV-2401',
    customer: 'Ama Mensah',
    brand: 'Christie Brown',
    status: 'Processing',
    tone: 'warning',
    amount: 'GH₵1,460',
    refund: 'No',
    contactEmail: 'ama.mensah@blacvolta.test',
  },
  {
    id: '#BV-2396',
    customer: 'Kwesi Laryea',
    brand: 'BlacVolta Essentials',
    status: 'Paid',
    tone: 'success',
    amount: 'GH₵680',
    refund: 'No',
    contactEmail: 'kwesi.laryea@blacvolta.test',
  },
  {
    id: '#BV-2384',
    customer: 'Efua Bannerman',
    brand: 'Brill',
    status: 'Shipped',
    tone: 'info',
    amount: 'GH₵940',
    refund: 'No',
    contactEmail: 'efua.bannerman@blacvolta.test',
  },
  {
    id: '#BV-2368',
    customer: 'Yaw Frimpong',
    brand: 'Free The Youth',
    status: 'Returned',
    tone: 'danger',
    amount: 'GH₵460',
    refund: 'Yes',
    contactEmail: 'yaw.frimpong@blacvolta.test',
  },
]

const adminTools = [
  'Search orders and filter by brand, date, or status',
  'Manage refunds without leaving the operations desk',
  'View customer details and delivery context inline',
  'Escalate returns and exceptions to support instantly',
]

export function OrdersPage() {
  const navigate = useNavigate()

  function exportOrders() {
    downloadCsv('blacvolta-orders.csv', [
      ['Order', 'Customer', 'Brand', 'Status', 'Amount', 'Refund'],
      ...orderRows.map((row) => [row.id, row.customer, row.brand, row.status, row.amount, row.refund]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Refund Queue',
            icon: <DocumentIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportOrders,
          },
          {
            label: 'Review Customers',
            icon: <UsersIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/customers'),
            variant: 'primary',
          },
        ]}
        subtitle="Centralized order tracking for purchases, refunds, delivery milestones, and customer follow-up."
        title="Order Management System"
      />

      <MetricsGrid metrics={orderStats} />

      <section className="kanban-grid">
        {statusColumns.map((column) => (
          <article key={column.title} className="kanban-column">
            <div className="kanban-column__header">
              <h2 className="section-title">{column.title}</h2>
              <StatusPill label={`${column.items.length} orders`} tone={column.tone} />
            </div>
            <div className="kanban-column__list">
              {column.items.map((item) => (
                <div key={item} className="kanban-item">
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Operational Queue</h2>
              <p className="section-subtitle">
                Search, filter, refund, and resolve customer issues from one merch operations surface.
              </p>
            </div>
            <Link className="table-card__link" to="/customers">
              <span>Customer profiles</span>
              <TrendIcon className="merch-inline-icon" />
            </Link>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Brand</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Refund</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.brand}</td>
                    <td>
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td className="registrations-table__amount">{row.amount}</td>
                    <td>{row.refund}</td>
                    <td className="actions-cell">
                      <Link aria-label={`Open ${row.id}`} className="icon-action-button" to="/customers">
                        <EyeIcon className="button-icon button-icon--muted" />
                      </Link>
                      <a aria-label={`Email ${row.customer}`} className="icon-action-button" href={`mailto:${row.contactEmail}`}>
                        <MailIcon className="button-icon button-icon--accent" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <article className="insight-card">
          <div className="insight-card__header">
            <div>
              <p className="insight-card__eyebrow">Admin Tools</p>
              <h2 className="section-title">What The Ops Desk Handles</h2>
            </div>
            <DocumentIcon className="insight-card__headline-icon" />
          </div>
          <ul className="feature-list">
            {adminTools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
