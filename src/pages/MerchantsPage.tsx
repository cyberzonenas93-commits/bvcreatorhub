import { Link, useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  ArrowRightIcon,
  DownloadIcon,
  EyeIcon,
  LinkIcon,
  MailIcon,
  SettingsIcon,
  ShieldCheckIcon,
  StoreIcon,
  TrendIcon,
  UserPlusIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

type MerchantRow = {
  brand: string
  category: string
  status: string
  tone: 'accent' | 'success' | 'warning' | 'info'
  commission: string
  payout: string
  featured: string
  contactEmail: string
}

const merchantStats: DashboardMetric[] = [
  {
    label: 'Approved Merchants',
    value: '44',
    helper: 'Fashion houses, creators, and BlacVolta-owned storefronts',
    delta: '+11%',
    icon: <StoreIcon className="metric-card__glyph" />,
  },
  {
    label: 'Featured Brands',
    value: '8',
    helper: 'Homepage and editorial curation placements',
    delta: '+2',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'KYB In Review',
    value: '12',
    helper: 'Documentation and verification in-flight',
    delta: '+4',
    icon: <ShieldCheckIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Avg. Onboarding Time',
    value: '4.2 days',
    helper: 'From brand submission to payout-ready merchant',
    delta: '-0.8d',
    icon: <UserPlusIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const merchantRows: MerchantRow[] = [
  {
    brand: 'Christie Brown',
    category: 'Luxury Womenswear',
    status: 'Approved',
    tone: 'success',
    commission: '12%',
    payout: 'Ready',
    featured: 'Editorial + Homepage',
    contactEmail: 'team@christiebrown.test',
  },
  {
    brand: 'Free The Youth',
    category: 'Streetwear',
    status: 'Verification',
    tone: 'warning',
    commission: '10%',
    payout: 'Awaiting tax form',
    featured: 'Drop Candidate',
    contactEmail: 'ops@freetheyouth.test',
  },
  {
    brand: 'Chocolate',
    category: 'Premium Ready-to-Wear',
    status: 'Payout Setup',
    tone: 'accent',
    commission: '11%',
    payout: 'Paystack linking',
    featured: 'Lookbook Collection',
    contactEmail: 'partnerships@chocolate.test',
  },
  {
    brand: 'Brill',
    category: 'Contemporary Fashion',
    status: 'Featured',
    tone: 'info',
    commission: '12%',
    payout: 'Ready',
    featured: 'Editors Pick',
    contactEmail: 'hello@brill.test',
  },
]

const adminControls = [
  'Approve or reject merchants with contextual review notes',
  'Assign merchant categories for discovery and analytics segments',
  'Set platform commission percentages by brand tier or campaign',
  'Enable featured brand status for homepage and editorial placement',
]

const profileSurfaces = [
  'Storytelling-led brand profile',
  'Logo and brand asset uploads',
  'Social links and contact channels',
  'Tax and payout configuration powered by Paystack',
]

const featuredBrands = [
  {
    name: 'Christie Brown',
    note: 'Story-first luxury storefront with runway editorial hooks and premium accessory cross-sell.',
  },
  {
    name: 'Free The Youth',
    note: 'Community-led streetwear catalog built for flash drops, artist tie-ins, and creator merch capsules.',
  },
  {
    name: 'Brill',
    note: 'Seasonal capsule collections with high-margin looks and homepage curation readiness.',
  },
]

export function MerchantsPage() {
  const navigate = useNavigate()

  function exportMerchants() {
    downloadCsv('blacvolta-merchants.csv', [
      ['Brand', 'Category', 'Status', 'Commission', 'Payout', 'Featured'],
      ...merchantRows.map((row) => [
        row.brand,
        row.category,
        row.status,
        row.commission,
        row.payout,
        row.featured,
      ]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Approval Queue',
            icon: <ShieldCheckIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportMerchants,
          },
          {
            label: 'Configure Roles',
            icon: <SettingsIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/settings'),
            variant: 'primary',
          },
        ]}
        subtitle="Review premium brands, verify documentation, configure payout readiness, and assign featured marketplace status."
        title="Brand & Merchant Onboarding"
      />

      <MetricsGrid metrics={merchantStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Merchant Approval Pipeline</h2>
              <p className="section-subtitle">
                Workflow aligned to onboarding, verification, commission setup, and launch readiness.
              </p>
            </div>
            <Link className="table-card__link" to="/settings">
              <span>Role settings</span>
              <ArrowRightIcon className="merch-inline-icon" />
            </Link>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Commission</th>
                  <th>Payout</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {merchantRows.map((row) => (
                  <tr key={row.brand}>
                    <td>{row.brand}</td>
                    <td>{row.category}</td>
                    <td>
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td>{row.commission}</td>
                    <td>{row.payout}</td>
                    <td>{row.featured}</td>
                    <td className="actions-cell">
                      <Link aria-label={`Open ${row.brand}`} className="icon-action-button" to="/settings">
                        <EyeIcon className="button-icon button-icon--muted" />
                      </Link>
                      <a aria-label={`Email ${row.brand}`} className="icon-action-button" href={`mailto:${row.contactEmail}`}>
                        <MailIcon className="button-icon button-icon--accent" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="stack-grid">
          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Admin Controls</p>
                <h2 className="section-title">Decision Surface</h2>
              </div>
              <SettingsIcon className="insight-card__headline-icon" />
            </div>
            <ul className="feature-list">
              {adminControls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </article>

          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Merchant Profile</p>
                <h2 className="section-title">Required Brand Surfaces</h2>
              </div>
              <LinkIcon className="insight-card__headline-icon" />
            </div>
            <ul className="pill-list">
              {profileSurfaces.map((surface) => (
                <li key={surface}>{surface}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="catalog-grid">
        {featuredBrands.map((brand) => (
          <article key={brand.name} className="catalog-card">
            <p className="catalog-card__eyebrow">Featured Brand</p>
            <h2 className="section-title">{brand.name}</h2>
            <p className="catalog-card__copy">{brand.note}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
