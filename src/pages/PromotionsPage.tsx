import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
    value: '5',
    helper: 'Discounts, launch pushes, and seasonal offers currently active in your store.',
    delta: '+2',
    icon: <MegaphoneIcon className="metric-card__glyph" />,
  },
  {
    label: 'Flash Sales',
    value: '2',
    helper: 'Timed price windows currently linked to your collections and drop moments.',
    delta: '+1',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Discount Codes',
    value: '12',
    helper: 'Active codes you can use across campaigns, events, or creator collaborations.',
    delta: '+3',
    icon: <TagIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Free Shipping Offers',
    value: '3',
    helper: 'Shipping incentives currently helping convert shoppers in your store.',
    delta: '+1',
    icon: <MegaphoneIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const campaigns = [
  {
    name: 'Weekend Capsule Drop',
    type: 'Countdown launch',
    brand: 'Resort Edit',
    status: 'Live',
    tone: 'success' as const,
  },
  {
    name: 'Editorial Bundle Offer',
    type: 'Percentage discount',
    brand: 'Core Store',
    status: 'Planned',
    tone: 'accent' as const,
  },
  {
    name: 'Event Merch Free Ship',
    type: 'Free shipping',
    brand: 'Event Capsule',
    status: 'Live',
    tone: 'info' as const,
  },
  {
    name: 'Holiday Capsule BOGO',
    type: 'Buy one get one',
    brand: 'Holiday Drop',
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
  const [isCampaignRulesOpen, setIsCampaignRulesOpen] = useState(false)

  function exportCampaigns() {
    downloadCsv('campaigns-and-offers.csv', [
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
            label: 'Campaign Planner',
            icon: <TagIcon className="merch-action-button__glyph" />,
            onClick: () => setIsCampaignRulesOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportCampaigns,
          },
          {
            label: 'Open Content Commerce',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/content-commerce'),
            variant: 'primary',
          },
        ]}
        subtitle="Run discounts, launch campaigns, and promotional moments that help more shoppers discover and buy from your store."
        title="Campaigns & Offers"
      />

      <MetricsGrid metrics={promotionStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Campaign Board</h2>
              <p className="section-subtitle">
                Your current promotion plan, including live campaigns, launch offers, and assets still in progress.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Type</th>
                  <th>Collection</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.name}>
                    <td data-label="Campaign">{campaign.name}</td>
                    <td data-label="Type">{campaign.type}</td>
                    <td data-label="Collection">{campaign.brand}</td>
                    <td data-label="Status">
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
                <h2 className="section-title">Offer Formats</h2>
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

      {isCampaignRulesOpen ? (
        <ActionSummaryModal
          description="Use campaign planning to coordinate discounting, flash-sale urgency, and launch support around your products."
          onClose={() => setIsCampaignRulesOpen(false)}
          onPrimaryAction={() => {
            setIsCampaignRulesOpen(false)
            navigate('/merch/content-commerce')
          }}
          primaryActionLabel="Open Content Commerce"
          sections={[
            { title: 'Promotion Formats', items: campaignTypes },
            {
              title: 'Current Campaign Board',
              items: campaigns.map((campaign) => `${campaign.name}: ${campaign.type} • ${campaign.status}`),
            },
          ]}
          title="Campaign Planner"
        />
      ) : null}
    </div>
  )
}
