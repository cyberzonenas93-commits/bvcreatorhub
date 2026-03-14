import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
    value: '8',
    helper: 'Stories, editorial features, and landing pages currently linking into your products.',
    delta: '+2',
    icon: <LinkIcon className="metric-card__glyph" />,
  },
  {
    label: 'Event-linked SKUs',
    value: '14',
    helper: 'Products attached to events, drops, and campaign moments that extend your reach.',
    delta: '+4',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Creator Launches',
    value: '3',
    helper: 'Creator-led launches or collaborations linked to your current collections.',
    delta: '+2',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Podcast Placements',
    value: '2',
    helper: 'Commerce placements currently driving discovery from branded content surfaces.',
    delta: '+1',
    icon: <PackageIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const contentRows = [
  {
    placement: 'Runway collection story',
    surface: 'Editorial article',
    linkedProducts: '8 SKUs',
    status: 'Live',
    tone: 'success' as const,
  },
  {
    placement: 'Weekend capsule countdown page',
    surface: 'Launch landing page',
    linkedProducts: '6 SKUs',
    status: 'Planned',
    tone: 'accent' as const,
  },
  {
    placement: 'Designer diary capsule feature',
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
  const [isSurfaceRulesOpen, setIsSurfaceRulesOpen] = useState(false)

  function exportContentCommerce() {
    downloadCsv('content-commerce.csv', [
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
            label: 'Publishing Guide',
            icon: <LinkIcon className="merch-action-button__glyph" />,
            onClick: () => setIsSurfaceRulesOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportContentCommerce,
          },
          {
            label: 'Open Products',
            icon: <PackageIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/products'),
            variant: 'primary',
          },
        ]}
        subtitle="Attach products to editorial, creator content, events, and shareable storefront links so shoppers can buy from every discovery moment."
        title="Content Commerce & Creator Links"
      />

      <MetricsGrid metrics={contentStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Live Commerce Placements</h2>
              <p className="section-subtitle">
                The content surfaces currently helping shoppers discover products from your store.
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
                    <td data-label="Placement">{row.placement}</td>
                    <td data-label="Surface">{row.surface}</td>
                    <td data-label="Linked Products">{row.linkedProducts}</td>
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
                <p className="insight-card__eyebrow">Supported Surfaces</p>
                <h2 className="section-title">Where You Can Attach Products</h2>
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

      {isSurfaceRulesOpen ? (
        <ActionSummaryModal
          description="Use this guide to link products into content surfaces that match your campaigns, collections, and creator partnerships."
          onClose={() => setIsSurfaceRulesOpen(false)}
          onPrimaryAction={() => {
            setIsSurfaceRulesOpen(false)
            navigate('/merch/products')
          }}
          primaryActionLabel="Open Products"
          sections={[
            { title: 'Supported Surfaces', items: contentChannels },
            {
              title: 'Live Placements',
              items: contentRows.map((row) => `${row.placement}: ${row.status} • ${row.linkedProducts}`),
            },
          ]}
          title="Publishing Guide"
        />
      ) : null}
    </div>
  )
}
