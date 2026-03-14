import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
    value: 'GH₵684k',
    helper: 'Total customer payments processed through your storefront and collection launches.',
    delta: '+18.4%',
    icon: <WalletIcon className="metric-card__glyph" />,
  },
  {
    label: 'Net Payouts',
    value: 'GH₵512k',
    helper: 'Settlements released to your payout account after payment confirmation and scheduled deductions.',
    delta: '+16.2%',
    icon: <CardIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Fees Deducted',
    value: 'GH₵48k',
    helper: 'Platform fees and payment charges applied before your net payout is released.',
    delta: '+3.1%',
    icon: <RefreshIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Pending Settlement',
    value: 'GH₵124k',
    helper: 'Recent order revenue currently scheduled for your next payout cycle.',
    delta: '+9.4%',
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
    merchant: 'Mar 1 - Mar 7',
    amount: 'GH₵68,200',
    status: 'Ready',
    tone: 'success' as const,
  },
  {
    batch: 'Batch 34',
    merchant: 'Mar 8 - Mar 14',
    amount: 'GH₵44,800',
    status: 'Processing',
    tone: 'warning' as const,
  },
  {
    batch: 'Batch 34',
    merchant: 'Mar 15 - Mar 21',
    amount: 'GH₵39,600',
    status: 'Queued',
    tone: 'accent' as const,
  },
  {
    batch: 'Batch 33',
    merchant: 'Feb 22 - Feb 28',
    amount: 'GH₵54,300',
    status: 'Paid',
    tone: 'info' as const,
  },
]

const paymentFlow = [
  'Track gross sales and recent fees before the next settlement cycle closes.',
  'Review payout windows so launches and campaign pushes align with cash flow.',
  'Use transaction history to reconcile orders, refunds, and payout timing.',
  'Check account health if any settlement is delayed or placed on hold.',
]

export function PaymentsPage() {
  const navigate = useNavigate()
  const [isFeeControlsOpen, setIsFeeControlsOpen] = useState(false)

  function exportPayments() {
    downloadCsv('payments-and-payouts.csv', [
      ['Batch', 'Settlement Window', 'Amount', 'Status'],
      ...payoutRows.map((row) => [row.batch, row.merchant, row.amount, row.status]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Payout Schedule',
            icon: <RefreshIcon className="merch-action-button__glyph" />,
            onClick: () => setIsFeeControlsOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportPayments,
          },
          {
            label: 'Account Health',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/risk'),
            variant: 'primary',
          },
        ]}
        subtitle="Track gross sales, upcoming settlements, fees, and payout history from one payout view."
        title="Payments & Payouts"
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
        secondaryLabel="Payouts"
        secondaryStep={200000}
        subtitle="Monthly sales compared with settlement volume released to your payout account."
        title="Sales & Payout Trend"
      />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Settlement Batches</h2>
              <p className="section-subtitle">
                Your recent settlement windows and payout batches.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Settlement Window</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutRows.map((row) => (
                  <tr key={`${row.batch}-${row.merchant}`}>
                    <td data-label="Batch">{row.batch}</td>
                    <td data-label="Settlement Window">{row.merchant}</td>
                    <td className="registrations-table__amount" data-label="Amount">
                      {row.amount}
                    </td>
                    <td data-label="Status">
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
              <p className="insight-card__eyebrow">Payout Guide</p>
              <h2 className="section-title">How Your Revenue Flows</h2>
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

      {isFeeControlsOpen ? (
        <ActionSummaryModal
          description="Use your payout schedule to understand when recent orders settle, what fees were applied, and when money lands in your account."
          onClose={() => setIsFeeControlsOpen(false)}
          onPrimaryAction={() => {
            setIsFeeControlsOpen(false)
            navigate('/merch/risk')
          }}
          primaryActionLabel="Account Health"
          sections={[
            { title: 'Processing Blueprint', items: paymentFlow },
            {
              title: 'Current Settlement Batch',
              items: payoutRows.map((row) => `${row.merchant}: ${row.status} • ${row.amount}`),
            },
          ]}
          title="Payout Schedule"
        />
      ) : null}
    </div>
  )
}
