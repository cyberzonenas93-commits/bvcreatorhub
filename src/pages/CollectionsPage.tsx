import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import {
  CalendarIcon,
  DownloadIcon,
  LayersIcon,
  MegaphoneIcon,
  TrendIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const collectionStats: DashboardMetric[] = [
  {
    label: 'Active Collections',
    value: '18',
    helper: 'Collections currently driving discovery across your storefront and launch surfaces',
    delta: '+4',
    icon: <LayersIcon className="metric-card__glyph" />,
  },
  {
    label: 'Upcoming Drops',
    value: '7',
    helper: 'Scheduled releases with countdown and launch orchestration',
    delta: '+3',
    icon: <CalendarIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Featured Capsules',
    value: '5',
    helper: 'Collections currently receiving stronger placement and shopper interest',
    delta: '+2',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Event Merch Lines',
    value: '4',
    helper: 'Drops linked to live moments, collaborations, and seasonal campaigns',
    delta: '+1',
    icon: <MegaphoneIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const collections = [
  {
    name: 'Resort Edit',
    timing: 'Live now',
    note: 'Luxury resort silhouettes merchandised with editorial stories and matching accessories.',
  },
  {
    name: 'Weekend Capsule Drop',
    timing: 'Launches in 5 days',
    note: 'Countdown-led capsule with preview content, limited stock, and early access links.',
  },
  {
    name: 'Holiday Occasion Edit',
    timing: 'Planning',
    note: 'Occasion-led collection planned with launch windows, gift bundles, and styled add-ons.',
  },
]

const launchChecklist = [
  'Assign products to collection and verify SKU inventory',
  'Configure launch window, countdown, and homepage placement',
  'Attach campaign creative, media assets, and tagged content surfaces',
  'Set featured collection status and post-drop reporting',
]

export function CollectionsPage() {
  const navigate = useNavigate()
  const [isDropCalendarOpen, setIsDropCalendarOpen] = useState(false)

  function exportCollections() {
    downloadCsv('collections-and-drops.csv', [
      ['Collection', 'Timing', 'Notes'],
      ...collections.map((collection) => [collection.name, collection.timing, collection.note]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Launch Calendar',
            icon: <CalendarIcon className="merch-action-button__glyph" />,
            onClick: () => setIsDropCalendarOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportCollections,
          },
          {
            label: 'Open Campaigns',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/promotions'),
            variant: 'primary',
          },
        ]}
        subtitle="Plan collections, timed drops, and launch windows that help your brand build anticipation and conversion."
        title="Collections & Drops"
      />

      <MetricsGrid metrics={collectionStats} />

      <section className="catalog-grid">
        {collections.map((collection) => (
          <article key={collection.name} className="catalog-card">
            <p className="catalog-card__eyebrow">{collection.timing}</p>
            <h2 className="section-title">{collection.name}</h2>
            <p className="catalog-card__copy">{collection.note}</p>
          </article>
        ))}
      </section>

      <article className="insight-card">
        <div className="insight-card__header">
          <div>
            <p className="insight-card__eyebrow">Launch Checklist</p>
            <h2 className="section-title">Prepare Every Collection For Drop Day</h2>
          </div>
          <LayersIcon className="insight-card__headline-icon" />
        </div>
        <ul className="feature-list">
          {launchChecklist.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </article>

      {isDropCalendarOpen ? (
        <ActionSummaryModal
          description="Use your launch calendar to coordinate collection timing, stock readiness, and campaign support before a drop goes live."
          onClose={() => setIsDropCalendarOpen(false)}
          onPrimaryAction={() => {
            setIsDropCalendarOpen(false)
            navigate('/merch/promotions')
          }}
          primaryActionLabel="Open Campaigns"
          sections={[
            {
              title: 'Upcoming Timeline',
              items: collections.map((collection) => `${collection.name}: ${collection.timing}`),
            },
            { title: 'Launch Checklist', items: launchChecklist },
          ]}
          title="Launch Calendar"
        />
      ) : null}
    </div>
  )
}
