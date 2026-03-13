import { useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  LinkIcon,
  PackageIcon,
  TrendIcon,
  UsersIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const contentStats: DashboardMetric[] = [
  {
    label: 'Shoppable Stories',
    value: '26',
    helper: 'Editorial articles and fashion stories linked directly to merch',
    delta: '+9',
    icon: <LinkIcon className="metric-card__glyph" />,
  },
  {
    label: 'Event-linked SKUs',
    value: '42',
    helper: 'Products attached to BlacVolta cultural events and merch moments',
    delta: '+13',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Creator Launches',
    value: '6',
    helper: 'Merch collections paired with tastemakers, DJs, and hosts',
    delta: '+2',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Podcast Placements',
    value: '11',
    helper: 'Commerce modules embedded inside podcasts and fashion culture content',
    delta: '+4',
    icon: <PackageIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const contentRows = [
  {
    placement: 'Christie Brown runway story',
    surface: 'Editorial article',
    linkedProducts: '8 SKUs',
    status: 'Live',
    tone: 'success' as const,
  },
  {
    placement: 'AfroFuture merch carousel',
    surface: 'Event content',
    linkedProducts: '6 SKUs',
    status: 'Planned',
    tone: 'accent' as const,
  },
  {
    placement: 'DJ Loft capsule feature',
    surface: 'Creator content',
    linkedProducts: '4 SKUs',
    status: 'Draft',
    tone: 'warning' as const,
  },
  {
    placement: 'Style frequency edit',
    surface: 'Podcast + fashion story',
    linkedProducts: '5 SKUs',
    status: 'Live',
    tone: 'info' as const,
  },
]

const contentChannels = [
  'Editorial articles',
  'Events',
  'Creator content',
  'Podcasts',
  'Fashion stories',
]

export function ContentCommercePage() {
  const navigate = useNavigate()

  function exportContentCommerce() {
    downloadCsv('blacvolta-content-commerce.csv', [
      ['Placement', 'Surface', 'Linked Products', 'Status'],
      ...contentRows.map((row) => [
        row.placement,
        row.surface,
        row.linkedProducts,
        row.status,
      ]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Surface Rules',
            icon: <LinkIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportContentCommerce,
          },
          {
            label: 'Review Products',
            icon: <PackageIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/products'),
            variant: 'primary',
          },
        ]}
        subtitle="Attach merch to editorial, events, creator media, podcasts, and fashion stories across the BlacVolta ecosystem."
        title="Content Driven Commerce"
      />

      <MetricsGrid metrics={contentStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Live Commerce Placements</h2>
              <p className="section-subtitle">
                Content modules that turn storytelling into shopping moments inside the BlacVolta ecosystem.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Placement</th>
                  <th>Surface</th>
                  <th>Linked Products</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contentRows.map((row) => (
                  <tr key={row.placement}>
                    <td>{row.placement}</td>
                    <td>{row.surface}</td>
                    <td>{row.linkedProducts}</td>
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
              <p className="insight-card__eyebrow">Supported Surfaces</p>
              <h2 className="section-title">Where Products Can Attach</h2>
            </div>
            <LinkIcon className="insight-card__headline-icon" />
          </div>
          <ul className="pill-list">
            {contentChannels.map((channel) => (
              <li key={channel}>{channel}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
