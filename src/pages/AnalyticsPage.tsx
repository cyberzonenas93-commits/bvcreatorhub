import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
import { MerchChartCard } from '../components/dashboard/MerchChartCard'
import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import {
  DownloadIcon,
  TrendIcon,
  WalletIcon,
  PackageIcon,
  LinkIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const analyticsStats: DashboardMetric[] = [
  {
    label: 'Gross Sales',
    value: 'GH₵684k',
    helper: 'Total sales processed through your storefront across direct orders, drops, and content commerce.',
    delta: '+18.4%',
    icon: <WalletIcon className="metric-card__glyph" />,
  },
  {
    label: 'Units Sold',
    value: '1,836',
    helper: 'Paid units sold across your catalog during the current rolling period.',
    delta: '+12.7%',
    icon: <PackageIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Conversion Rate',
    value: '4.8%',
    helper: 'Sessions that converted into completed orders across your storefront and product links.',
    delta: '+0.9%',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Returning Customers',
    value: '38%',
    helper: 'Shoppers who came back for another purchase from your brand.',
    delta: '+5.1%',
    icon: <LinkIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const analyticsSeries = [
  { label: 'Jul', primary: 520000, secondary: 950 },
  { label: 'Aug', primary: 566000, secondary: 1010 },
  { label: 'Sep', primary: 614000, secondary: 1104 },
  { label: 'Oct', primary: 688000, secondary: 1188 },
  { label: 'Nov', primary: 744000, secondary: 1244 },
  { label: 'Dec', primary: 812000, secondary: 1322 },
  { label: 'Jan', primary: 868000, secondary: 1408 },
  { label: 'Feb', primary: 924000, secondary: 1496 },
  { label: 'Mar', primary: 978000, secondary: 1580 },
  { label: 'Apr', primary: 1046000, secondary: 1674 },
  { label: 'May', primary: 1118000, secondary: 1742 },
  { label: 'Jun', primary: 1184000, secondary: 1836 },
]

const trafficSources = [
  { label: 'Instagram', value: '31%' },
  { label: 'Marketplace app', value: '26%' },
  { label: 'Direct links', value: '18%' },
  { label: 'Search', value: '14%' },
  { label: 'Creator links', value: '11%' },
]

const topProducts = [
  'Runway Silk Shirt',
  'Holiday Capsule Dress',
  'BV Creator Tote',
]

const revenueModelItems = [
  'Track which traffic channels bring the highest-value shoppers into your store.',
  'Compare top products, returning customers, and conversion before planning your next drop.',
  'Watch payout timing against campaign launches so stock and settlement stay aligned.',
  'Use content links and creator placements to bring more buyers into your storefront.',
]

export function AnalyticsPage() {
  const navigate = useNavigate()
  const [isRevenueModelOpen, setIsRevenueModelOpen] = useState(false)

  function exportAnalytics() {
    downloadCsv('store-performance.csv', [
      ['Month', 'Revenue', 'Units Sold'],
      ...analyticsSeries.map((point) => [point.label, String(point.primary), String(point.secondary)]),
    ])
  }

  return (
    <div className="dashboard-page merch-analytics-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Performance Tips',
            icon: <LinkIcon className="merch-action-button__glyph" />,
            onClick: () => setIsRevenueModelOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportAnalytics,
          },
          {
            label: 'View Payouts',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/payments'),
            variant: 'primary',
          },
        ]}
        subtitle="Track your sales, best-performing products, returning customers, and traffic sources from one vendor dashboard."
        title="Store Performance Overview"
      />

      <MetricsGrid metrics={analyticsStats} />

      <MerchChartCard
        formatPrimaryTick={(value) => `GH₵${Math.round(value / 1000)}k`}
        formatPrimaryValue={(value) => `GH₵${value.toLocaleString('en-US')}`}
        formatSecondaryTick={(value) => `${Math.round(value)}`}
        formatSecondaryValue={(value) => `${value.toLocaleString('en-US')} orders`}
        points={analyticsSeries}
        primaryLabel="Sales"
        primaryStep={200000}
        secondaryLabel="Orders"
        secondaryStep={500}
        subtitle="Monthly sales compared with order volume across your storefront."
        title="Sales & Order Trend"
      />

      <section className="split-grid">
        <article className="insight-card">
          <div className="insight-card__header">
            <div>
              <p className="insight-card__eyebrow">Traffic Sources</p>
              <h2 className="section-title">Where Shoppers Find You</h2>
            </div>
            <TrendIcon className="insight-card__headline-icon" />
          </div>
          <ul className="source-list">
              {trafficSources.map((source) => (
              <li key={source.label} className="source-list__item">
                <div className="source-list__meta">
                  <span>{source.label}</span>
                  <strong>{source.value}</strong>
                </div>
                <div className="source-bar">
                  <span className="source-bar__fill" style={{ width: source.value }} />
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="insight-card">
          <div className="insight-card__header">
            <div>
              <p className="insight-card__eyebrow">Top Selling Products</p>
              <h2 className="section-title">What Is Moving Fastest</h2>
            </div>
            <PackageIcon className="insight-card__headline-icon" />
          </div>
          <ul className="feature-list">
            {topProducts.map((product) => (
              <li key={product}>{product}</li>
            ))}
          </ul>
        </article>
      </section>

      {isRevenueModelOpen ? (
        <ActionSummaryModal
          description="Use your overview to understand what is selling, where shoppers are coming from, and when to push your next campaign."
          onClose={() => setIsRevenueModelOpen(false)}
          onPrimaryAction={() => {
            setIsRevenueModelOpen(false)
            navigate('/merch/payments')
          }}
          primaryActionLabel="View Payouts"
          sections={[
            { title: 'Performance Tips', items: revenueModelItems },
            { title: 'Current Traffic Mix', items: trafficSources.map((source) => `${source.label}: ${source.value}`) },
          ]}
          title="Performance Tips"
        />
      ) : null}
    </div>
  )
}
