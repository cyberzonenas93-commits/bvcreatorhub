import { useNavigate } from 'react-router-dom'

import { MerchChartCard } from '../components/dashboard/MerchChartCard'
import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  TrendIcon,
  WalletIcon,
  RefreshIcon,
  CardIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const paymentsStats: DashboardMetric[] = [
  {
    label: 'Gross Sales',
    value: 'GH₵5.92M',
    helper: 'Marketplace revenue processed through Paystack year to date',
    delta: '+24.1%',
    icon: <WalletIcon className="metric-card__glyph" />,
  },
  {
    label: 'Commission Earned',
    value: 'GH₵698k',
    helper: 'Platform share after automated merchant revenue split',
    delta: '+18.6%',
    icon: <CardIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Merchant Payouts Due',
    value: 'GH₵412k',
    helper: 'Scheduled settlement batches awaiting the next payout run',
    delta: '+7.8%',
    icon: <RefreshIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Webhook Health',
    value: '99.98%',
    helper: 'Transaction confirmations and payment verification success rate',
    delta: '+0.04%',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const payoutSeries = [
  { label: 'Jan', primary: 620000, secondary: 454000 },
  { label: 'Feb', primary: 688000, secondary: 502000 },
  { label: 'Mar', primary: 744000, secondary: 548000 },
  { label: 'Apr', primary: 812000, secondary: 604000 },
  { label: 'May', primary: 884000, secondary: 662000 },
  { label: 'Jun', primary: 948000, secondary: 714000 },
]

const payoutRows = [
  {
    batch: 'Batch 34',
    merchant: 'Christie Brown',
    amount: 'GH₵68,200',
    status: 'Ready',
    tone: 'success' as const,
  },
  {
    batch: 'Batch 34',
    merchant: 'Free The Youth',
    amount: 'GH₵44,800',
    status: 'KYC Hold',
    tone: 'warning' as const,
  },
  {
    batch: 'Batch 34',
    merchant: 'Brill',
    amount: 'GH₵39,600',
    status: 'Queued',
    tone: 'accent' as const,
  },
  {
    batch: 'Batch 33',
    merchant: 'Chocolate',
    amount: 'GH₵54,300',
    status: 'Paid',
    tone: 'info' as const,
  },
]

const paymentFlow = [
  'Paystack transaction processing with real-time payment verification',
  'Webhook confirmation for successful payment events and reconciliations',
  'Revenue split between merchant payout and BlacVolta commission',
  'Dashboard reporting for total sales, merchant revenue, and transaction history',
]

export function PaymentsPage() {
  const navigate = useNavigate()

  function exportPayments() {
    downloadCsv('blacvolta-payments.csv', [
      ['Batch', 'Merchant', 'Amount', 'Status'],
      ...payoutRows.map((row) => [row.batch, row.merchant, row.amount, row.status]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Settlement Rules',
            icon: <RefreshIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportPayments,
          },
          {
            label: 'Open Analytics',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/analytics'),
            variant: 'primary',
          },
        ]}
        subtitle="Payments, commission splits, webhook health, and payout execution for every merchant account."
        title="Payment & Payout Management"
      />

      <MetricsGrid metrics={paymentsStats} />

      <MerchChartCard
        formatPrimaryTick={(value) => `GH₵${Math.round(value / 1000)}k`}
        formatPrimaryValue={(value) => `GH₵${value.toLocaleString('en-US')}`}
        formatSecondaryTick={(value) => `GH₵${Math.round(value / 1000)}k`}
        formatSecondaryValue={(value) => `GH₵${value.toLocaleString('en-US')}`}
        points={payoutSeries}
        primaryLabel="Gross Sales"
        primaryStep={200000}
        secondaryLabel="Merchant Payouts"
        secondaryStep={200000}
        subtitle="Monthly payment volume compared with the merchant share of the revenue split."
        title="Revenue Split Trend"
      />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Payout Batches</h2>
              <p className="section-subtitle">
                Merchant settlements scheduled directly from the merch admin dashboard.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Merchant</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutRows.map((row) => (
                  <tr key={`${row.batch}-${row.merchant}`}>
                    <td>{row.batch}</td>
                    <td>{row.merchant}</td>
                    <td className="registrations-table__amount">{row.amount}</td>
                    <td>
                      <StatusPill label={row.status} tone={row.tone} />
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
              <p className="insight-card__eyebrow">Paystack Workflow</p>
              <h2 className="section-title">Processing Blueprint</h2>
            </div>
            <WalletIcon className="insight-card__headline-icon" />
          </div>
          <ul className="feature-list">
            {paymentFlow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
