import { useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  MegaphoneIcon,
  TagIcon,
  TrendIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const promotionStats: DashboardMetric[] = [
  {
    label: 'Live Campaigns',
    value: '12',
    helper: 'Discounts, countdown launches, and homepage pushes currently running',
    delta: '+4',
    icon: <MegaphoneIcon className="metric-card__glyph" />,
  },
  {
    label: 'Flash Sales',
    value: '3',
    helper: 'High-intensity price windows tied to drops and merch moments',
    delta: '+1',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Discount Codes',
    value: '28',
    helper: 'Merchant-managed code inventory across active storefronts',
    delta: '+7',
    icon: <TagIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Free Shipping Offers',
    value: '6',
    helper: 'Threshold-based shipping incentives by brand or campaign',
    delta: '+2',
    icon: <MegaphoneIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const campaigns = [
  {
    name: 'Weekend Capsule Drop',
    type: 'Countdown launch',
    brand: 'Free The Youth',
    status: 'Live',
    tone: 'success' as const,
  },
  {
    name: 'Editorial Bundle Offer',
    type: 'Percentage discount',
    brand: 'Christie Brown',
    status: 'Planned',
    tone: 'accent' as const,
  },
  {
    name: 'Event Merch Free Ship',
    type: 'Free shipping',
    brand: 'BlacVolta Essentials',
    status: 'Live',
    tone: 'info' as const,
  },
  {
    name: 'Holiday Capsule BOGO',
    type: 'Buy one get one',
    brand: 'Chocolate',
    status: 'Awaiting assets',
    tone: 'warning' as const,
  },
]

const campaignTypes = [
  'Percentage discounts',
  'Buy one get one',
  'Free shipping',
  'Flash sales and timed launch windows',
]

export function PromotionsPage() {
  const navigate = useNavigate()

  function exportCampaigns() {
    downloadCsv('blacvolta-promotions.csv', [
      ['Campaign', 'Type', 'Brand', 'Status'],
      ...campaigns.map((campaign) => [
        campaign.name,
        campaign.type,
        campaign.brand,
        campaign.status,
      ]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Campaign Rules',
            icon: <TagIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportCampaigns,
          },
          {
            label: 'Open Content',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/content-commerce'),
            variant: 'primary',
          },
        ]}
        subtitle="Run discounts, flash sales, limited drops, and launch countdowns without leaving the merch control center."
        title="Promotion & Campaign Tools"
      />

      <MetricsGrid metrics={promotionStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Campaign Board</h2>
              <p className="section-subtitle">
                Promotion formats defined in the epic, organized for operational execution.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Type</th>
                  <th>Brand</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.name}>
                    <td>{campaign.name}</td>
                    <td>{campaign.type}</td>
                    <td>{campaign.brand}</td>
                    <td>
                      <StatusPill label={campaign.status} tone={campaign.tone} />
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
              <p className="insight-card__eyebrow">Campaign Types</p>
              <h2 className="section-title">Promotion Formats</h2>
            </div>
            <MegaphoneIcon className="insight-card__headline-icon" />
          </div>
          <ul className="pill-list">
            {campaignTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
