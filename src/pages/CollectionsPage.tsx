import { useNavigate } from 'react-router-dom'

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
    helper: 'Collections currently driving on-app merchandising',
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
    helper: 'Editorial-led premium collections receiving marketplace curation',
    delta: '+2',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Event Merch Lines',
    value: '4',
    helper: 'Drops linked to BlacVolta events and cultural moments',
    delta: '+1',
    icon: <MegaphoneIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const collections = [
  {
    name: 'Christie Brown Resort Edit',
    timing: 'Live now',
    note: 'Luxury resort silhouettes merchandised with editorial stories and matching accessories.',
  },
  {
    name: 'Free The Youth Community Drop',
    timing: 'Launches in 5 days',
    note: 'Countdown-led capsule with creator previews, exclusive tees, and early waitlist access.',
  },
  {
    name: 'AfroFuture Merch Capsule',
    timing: 'Planning',
    note: 'Event-linked merchandise with timed launch windows and bundled add-ons in content.',
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

  function exportCollections() {
    downloadCsv('blacvolta-collections.csv', [
      ['Collection', 'Timing', 'Notes'],
      ...collections.map((collection) => [collection.name, collection.timing, collection.note]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Drop Calendar',
            icon: <CalendarIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportCollections,
          },
          {
            label: 'Schedule Campaign',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/promotions'),
            variant: 'primary',
          },
        ]}
        subtitle="Shape capsule collections, limited releases, and event-linked merch into a cohesive launch calendar."
        title="Collections & Drop Planning"
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
            <h2 className="section-title">Ready Every Collection For Drop Day</h2>
          </div>
          <LayersIcon className="insight-card__headline-icon" />
        </div>
        <ul className="feature-list">
          {launchChecklist.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}
