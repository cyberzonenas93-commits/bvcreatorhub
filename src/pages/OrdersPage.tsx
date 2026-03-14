import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
    label: 'New Orders',
    value: '18',
    helper: 'Freshly paid orders waiting for confirmation, packing, or fulfillment.',
    delta: '+6',
    icon: <DocumentIcon className="metric-card__glyph" />,
  },
  {
    label: 'Ready To Ship',
    value: '12',
    helper: 'Orders with payment cleared and inventory allocated for fulfillment.',
    delta: '+3',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Delivered This Week',
    value: '47',
    helper: 'Orders that reached customers successfully during the current week.',
    delta: '+9',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Open Returns',
    value: '2',
    helper: 'Orders currently in return or refund review with your team.',
    delta: '-1',
    icon: <MailIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const statusColumns = [
  {
    title: 'Pending',
    tone: 'accent' as const,
    items: ['#BV-2401 Resort Edit dress', '#BV-2405 Silk shirt reorder'],
  },
  {
    title: 'Paid',
    tone: 'success' as const,
    items: ['#BV-2396 Core essentials set', '#BV-2398 Holiday preorder'],
  },
  {
    title: 'Processing',
    tone: 'warning' as const,
    items: ['#BV-2388 Resort capsule order', '#BV-2393 Creator tote bundle'],
  },
  {
    title: 'Shipped',
    tone: 'info' as const,
    items: ['#BV-2381 Event capsule pack', '#BV-2384 Holiday dress order'],
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
    brand: 'Resort Edit',
    status: 'Processing',
    tone: 'warning',
    amount: 'GH₵1,460',
    refund: 'No',
    contactEmail: 'ama.mensah@blacvolta.test',
  },
  {
    id: '#BV-2396',
    customer: 'Kwesi Laryea',
    brand: 'Core Store',
    status: 'Paid',
    tone: 'success',
    amount: 'GH₵680',
    refund: 'No',
    contactEmail: 'kwesi.laryea@blacvolta.test',
  },
  {
    id: '#BV-2384',
    customer: 'Efua Bannerman',
    brand: 'Holiday Drop',
    status: 'Shipped',
    tone: 'info',
    amount: 'GH₵940',
    refund: 'No',
    contactEmail: 'efua.bannerman@blacvolta.test',
  },
  {
    id: '#BV-2368',
    customer: 'Yaw Frimpong',
    brand: 'Creator Capsule',
    status: 'Returned',
    tone: 'danger',
    amount: 'GH₵460',
    refund: 'Yes',
    contactEmail: 'yaw.frimpong@blacvolta.test',
  },
]

const adminTools = [
  'Search orders and filter by date, status, or shipping stage',
  'Review returns and refunds without leaving your order queue',
  'Open customer details quickly when a shipment needs support',
  'Keep fulfillment, returns, and delivery follow-up in one place',
]

export function OrdersPage() {
  const navigate = useNavigate()
  const [isRefundQueueOpen, setIsRefundQueueOpen] = useState(false)

  function exportOrders() {
    downloadCsv('orders-and-fulfillment.csv', [
      ['Order', 'Customer', 'Brand', 'Status', 'Amount', 'Refund'],
      ...orderRows.map((row) => [row.id, row.customer, row.brand, row.status, row.amount, row.refund]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Returns & Refunds',
            icon: <DocumentIcon className="merch-action-button__glyph" />,
            onClick: () => setIsRefundQueueOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportOrders,
          },
          {
            label: 'Open Customers',
            icon: <UsersIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/customers'),
            variant: 'primary',
          },
        ]}
        subtitle="Track every order from payment through delivery, handle returns, and keep your fulfillment flow on schedule."
        title="Orders & Fulfillment"
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
                Your active order queue, including shipment progress, returns, and customer follow-up.
              </p>
            </div>
            <Link className="table-card__link" to="/merch/customers">
              <span>Customer details</span>
              <TrendIcon className="merch-inline-icon" />
            </Link>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Collection</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Refund</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Order">{row.id}</td>
                    <td data-label="Customer">{row.customer}</td>
                    <td data-label="Collection">{row.brand}</td>
                    <td data-label="Status">
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td className="registrations-table__amount" data-label="Amount">
                      {row.amount}
                    </td>
                    <td data-label="Refund">{row.refund}</td>
                    <td className="actions-cell" data-label="Actions">
                      <Link aria-label={`Open ${row.id}`} className="icon-action-button" to="/merch/customers">
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
                <p className="insight-card__eyebrow">Fulfillment Tools</p>
                <h2 className="section-title">What Your Team Can Do</h2>
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

      {isRefundQueueOpen ? (
        <ActionSummaryModal
          description="Review open returns and refunds before they affect customer satisfaction or payout timing."
          onClose={() => setIsRefundQueueOpen(false)}
          onPrimaryAction={() => {
            setIsRefundQueueOpen(false)
            navigate('/merch/customers')
          }}
          primaryActionLabel="Open Customers"
          sections={[
            { title: 'Order Tools', items: adminTools },
            {
              title: 'Refund-Sensitive Orders',
              items: orderRows
                .filter((row) => row.refund === 'Yes' || row.status === 'Returned')
                .map((row) => `${row.id}: ${row.customer} • ${row.status} • ${row.amount}`),
            },
          ]}
          title="Returns & Refunds"
        />
      ) : null}
    </div>
  )
}
