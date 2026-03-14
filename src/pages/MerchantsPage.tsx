import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
  surface: string
  purpose: string
  status: string
  tone: 'accent' | 'success' | 'warning' | 'info'
  nextStep: string
  visibility: string
  contactEmail: string
}

const merchantStats: DashboardMetric[] = [
  {
    label: 'Profile Completion',
    value: '92%',
    helper: 'Your storefront profile, assets, and storytelling surfaces are almost fully configured.',
    delta: '+8%',
    icon: <StoreIcon className="metric-card__glyph" />,
  },
  {
    label: 'Verification Status',
    value: 'Approved',
    helper: 'Your brand is cleared to sell and receive payouts through the marketplace.',
    delta: 'Live',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Featured Surfaces',
    value: '3',
    helper: 'Current placements across editorial, collections, and content commerce surfaces.',
    delta: '+1',
    icon: <ShieldCheckIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Payout Setup',
    value: 'Ready',
    helper: 'Your Paystack configuration and settlement destination are active.',
    delta: 'Weekly',
    icon: <UserPlusIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const merchantRows: MerchantRow[] = [
  {
    surface: 'Brand Story',
    purpose: 'About page + designer narrative',
    status: 'Live',
    tone: 'success',
    nextStep: 'Refresh seasonal copy',
    visibility: 'Storefront + editorial',
    contactEmail: 'support@bvcreatorhub.test',
  },
  {
    surface: 'Social Links',
    purpose: 'Instagram, TikTok, and brand website',
    status: 'Live',
    tone: 'warning',
    nextStep: 'Add campaign landing link',
    visibility: 'Storefront footer',
    contactEmail: 'support@bvcreatorhub.test',
  },
  {
    surface: 'Brand Assets',
    purpose: 'Logo, campaign banner, and hero imagery',
    status: 'Review',
    tone: 'accent',
    nextStep: 'Upload updated homepage banner',
    visibility: 'Storefront + collections',
    contactEmail: 'support@bvcreatorhub.test',
  },
  {
    surface: 'Tax & Payout',
    purpose: 'Settlement account and tax details',
    status: 'Ready',
    tone: 'info',
    nextStep: 'No action needed',
    visibility: 'Payments',
    contactEmail: 'support@bvcreatorhub.test',
  },
]

const brandChecklistItems = [
  'Keep your story, socials, and brand assets updated across all storefront surfaces.',
  'Review featured placement opportunities before new collections and drops go live.',
  'Check payout readiness whenever tax details or settlement accounts change.',
  'Use settings to manage your team roles, permissions, and support contacts.',
]

const profileSurfaces = [
  'Storytelling-led brand profile',
  'Logo and campaign asset uploads',
  'Social links and direct customer channels',
  'Tax and payout configuration powered by Paystack',
]

const featuredBrands = [
  {
    name: 'Homepage Feature',
    note: 'Your current editorial placement is driving premium traffic into your Resort Edit collection.',
  },
  {
    name: 'Creator Capsule',
    note: 'Your creator-linked tote edit is ready for a timed drop once launch assets are approved.',
  },
  {
    name: 'Event Merch Edit',
    note: 'Bundle event-linked products with content commerce placements to expand visibility beyond your storefront.',
  },
]

export function MerchantsPage() {
  const navigate = useNavigate()
  const [isApprovalQueueOpen, setIsApprovalQueueOpen] = useState(false)

  function exportMerchants() {
    downloadCsv('storefront-profile.csv', [
      ['Surface', 'Purpose', 'Status', 'Next Step', 'Visibility'],
      ...merchantRows.map((row) => [
        row.surface,
        row.purpose,
        row.status,
        row.nextStep,
        row.visibility,
      ]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Brand Checklist',
            icon: <ShieldCheckIcon className="merch-action-button__glyph" />,
            onClick: () => setIsApprovalQueueOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportMerchants,
          },
          {
            label: 'Open Settings',
            icon: <SettingsIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/settings'),
            variant: 'primary',
          },
        ]}
        subtitle="Manage how your brand appears inside BV Creator Hub, from story and social links to payout readiness and featured placements."
        title="Storefront Profile & Brand Setup"
      />

      <MetricsGrid metrics={merchantStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Storefront Readiness</h2>
              <p className="section-subtitle">
                The key brand surfaces shoppers see before they buy from your storefront.
              </p>
            </div>
            <Link className="table-card__link" to="/merch/settings">
              <span>Store settings</span>
              <ArrowRightIcon className="merch-inline-icon" />
            </Link>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Surface</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Next Step</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {merchantRows.map((row) => (
                  <tr key={row.surface}>
                    <td data-label="Surface">{row.surface}</td>
                    <td data-label="Purpose">{row.purpose}</td>
                    <td data-label="Status">
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td data-label="Next Step">{row.nextStep}</td>
                    <td data-label="Visibility">{row.visibility}</td>
                    <td className="actions-cell" data-label="Actions">
                      <Link aria-label={`Open ${row.surface}`} className="icon-action-button" to="/merch/settings">
                        <EyeIcon className="button-icon button-icon--muted" />
                      </Link>
                      <a aria-label={`Email support about ${row.surface}`} className="icon-action-button" href={`mailto:${row.contactEmail}`}>
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
                <p className="insight-card__eyebrow">Brand Checklist</p>
                <h2 className="section-title">What To Keep Updated</h2>
              </div>
              <SettingsIcon className="insight-card__headline-icon" />
            </div>
            <ul className="feature-list">
              {brandChecklistItems.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </article>

          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Storefront Surfaces</p>
                <h2 className="section-title">What Buyers See</h2>
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
            <p className="catalog-card__eyebrow">Featured Placement</p>
            <h2 className="section-title">{brand.name}</h2>
            <p className="catalog-card__copy">{brand.note}</p>
          </article>
        ))}
      </section>

      {isApprovalQueueOpen ? (
        <ActionSummaryModal
          description="Use this checklist to keep your storefront polished, payout-ready, and visible across key marketplace surfaces."
          onClose={() => setIsApprovalQueueOpen(false)}
          onPrimaryAction={() => {
            setIsApprovalQueueOpen(false)
            navigate('/merch/settings')
          }}
          primaryActionLabel="Open Settings"
          sections={[
            { title: 'Brand Checklist', items: brandChecklistItems },
            {
              title: 'Current Brand Surfaces',
              items: merchantRows.map((row) => `${row.surface}: ${row.status} • ${row.nextStep}`),
            },
          ]}
          title="Brand Checklist"
        />
      ) : null}
    </div>
  )
}
