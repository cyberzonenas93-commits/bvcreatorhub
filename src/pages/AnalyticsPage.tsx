import { useNavigate } from 'react-router-dom'

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
    label: 'Revenue Generated',
    value: 'GH₵8.44M',
    helper: 'Rolling 12-month marketplace GMV across all merch programs',
    delta: '+29.3%',
    icon: <WalletIcon className="metric-card__glyph" />,
  },
  {
    label: 'Units Sold',
    value: '16,482',
    helper: 'Products fulfilled across direct catalog and content-led journeys',
    delta: '+22.1%',
    icon: <PackageIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Conversion Rate',
    value: '4.9%',
    helper: 'Sessions converting into an order on the merch marketplace',
    delta: '+0.8%',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Cart Abandonment',
    value: '27%',
    helper: 'Users who added merch to cart without completing checkout',
    delta: '-3.4%',
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
  { label: 'Editorial stories', value: '32%' },
  { label: 'Brand pages', value: '24%' },
  { label: 'Creator content', value: '18%' },
  { label: 'Event surfaces', value: '14%' },
  { label: 'Podcasts & stories', value: '12%' },
]

const topProducts = [
  'Christie Brown Resort Edit',
  'Free The Youth Community Hoodie',
  'BV Creator Tote',
]

export function AnalyticsPage() {
  const navigate = useNavigate()

  function exportAnalytics() {
    downloadCsv('blacvolta-analytics.csv', [
      ['Month', 'Revenue', 'Units Sold'],
      ...analyticsSeries.map((point) => [point.label, String(point.primary), String(point.secondary)]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Attribution',
            icon: <LinkIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportAnalytics,
          },
          {
            label: 'Open Overview',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/overview'),
            variant: 'primary',
          },
        ]}
        subtitle="Revenue, demand, conversion, and traffic patterns to help merchants understand what is moving the marketplace."
        title="Analytics & Performance Dashboard"
      />

      <MetricsGrid metrics={analyticsStats} />

      <MerchChartCard
        formatPrimaryTick={(value) => `GH₵${Math.round(value / 1000)}k`}
        formatPrimaryValue={(value) => `GH₵${value.toLocaleString('en-US')}`}
        formatSecondaryTick={(value) => `${Math.round(value)}`}
        formatSecondaryValue={(value) => `${value.toLocaleString('en-US')} units`}
        points={analyticsSeries}
        primaryLabel="Revenue"
        primaryStep={200000}
        secondaryLabel="Units Sold"
        secondaryStep={500}
        subtitle="Revenue growth compared with item demand across the last 12 months."
        title="Revenue Trends"
      />

      <section className="split-grid">
        <article className="insight-card">
          <div className="insight-card__header">
            <div>
              <p className="insight-card__eyebrow">Traffic Sources</p>
              <h2 className="section-title">Where Discovery Starts</h2>
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
              <p className="insight-card__eyebrow">Top Performing Products</p>
              <h2 className="section-title">Current Leaders</h2>
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
    </div>
  )
}
