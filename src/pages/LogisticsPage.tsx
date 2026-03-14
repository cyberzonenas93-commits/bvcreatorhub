import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  MapPinIcon,
  RefreshIcon,
  TrendIcon,
  WalletIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const logisticsStats: DashboardMetric[] = [
  {
    label: 'Active Carriers',
    value: '3',
    helper: 'Shipping options currently available for your store across local and cross-border orders.',
    delta: '+1',
    icon: <MapPinIcon className="metric-card__glyph" />,
  },
  {
    label: 'On-Time Delivery',
    value: '96.8%',
    helper: 'Orders delivered within the promised service window across your active providers.',
    delta: '+1.9%',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Shipping Rules',
    value: '8',
    helper: 'Rate and zone rules currently shaping checkout delivery options for your customers.',
    delta: 'API',
    icon: <WalletIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Delayed Orders',
    value: '3',
    helper: 'Orders that need fulfillment follow-up because they are moving slower than expected.',
    delta: '-1',
    icon: <RefreshIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const providerRows = [
  {
    provider: 'DHL Express',
    regions: 'Regional + cross-border',
    pricing: 'API live rates',
    status: 'Healthy',
    tone: 'success' as const,
    performance: '98.2%',
  },
  {
    provider: 'FedEx',
    regions: 'Cross-border priority',
    pricing: 'Tiered premium',
    status: 'Delay Watch',
    tone: 'warning' as const,
    performance: '92.4%',
  },
  {
    provider: 'Kwik Delivery',
    regions: 'Accra metro same-day',
    pricing: 'Fixed zone rules',
    status: 'Healthy',
    tone: 'info' as const,
    performance: '95.6%',
  },
  {
    provider: 'Local Courier Network',
    regions: 'National standard',
    pricing: 'Manual fallback',
    status: 'Review',
    tone: 'accent' as const,
    performance: '89.8%',
  },
]

const providerControls = [
  'Choose the carriers and service levels you want visible at checkout.',
  'Review rate rules by zone so delivery pricing matches your margin goals.',
  'Track delayed shipments early and update customers before support tickets grow.',
  'Keep your shipping setup aligned with campaign launches, drops, and cross-border orders.',
]

const checkoutCapabilities = [
  'Dynamic delivery rate retrieval at checkout',
  'Preferred shipping options for local and cross-border buyers',
  'Tracking links returned into each order timeline',
  'Delivery ETA surfaced before payment confirmation',
]

export function LogisticsPage() {
  const navigate = useNavigate()
  const [isProviderRulesOpen, setIsProviderRulesOpen] = useState(false)

  function exportProviders() {
    downloadCsv('shipping-setup.csv', [
      ['Provider', 'Regions', 'Pricing', 'Status', 'Success Rate'],
      ...providerRows.map((row) => [
        row.provider,
        row.regions,
        row.pricing,
        row.status,
        row.performance,
      ]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Shipping Rules',
            icon: <MapPinIcon className="merch-action-button__glyph" />,
            onClick: () => setIsProviderRulesOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportProviders,
          },
          {
            label: 'Open Orders',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/orders'),
            variant: 'primary',
          },
        ]}
        subtitle="Set up delivery options, rate rules, and shipment visibility so customers know exactly how and when orders will arrive."
        title="Shipping & Fulfillment"
      />

      <MetricsGrid metrics={logisticsStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Provider Performance Grid</h2>
              <p className="section-subtitle">
                Your current shipping setup, including provider health, coverage, and pricing mode.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Regions</th>
                  <th>Pricing</th>
                  <th>Status</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {providerRows.map((row) => (
                  <tr key={row.provider}>
                    <td data-label="Provider">{row.provider}</td>
                    <td data-label="Regions">{row.regions}</td>
                    <td data-label="Pricing">{row.pricing}</td>
                    <td data-label="Status">
                      <StatusPill label={row.status} tone={row.tone} />
                    </td>
                    <td className="registrations-table__amount" data-label="Success Rate">
                      {row.performance}
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
                <p className="insight-card__eyebrow">Shipping Rules</p>
                <h2 className="section-title">How To Configure Fulfillment</h2>
              </div>
              <MapPinIcon className="insight-card__headline-icon" />
            </div>
            <ul className="feature-list">
              {providerControls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Checkout Experience</p>
                <h2 className="section-title">What Customers Can Choose</h2>
              </div>
              <WalletIcon className="insight-card__headline-icon" />
            </div>
            <ul className="pill-list">
              {checkoutCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {isProviderRulesOpen ? (
        <ActionSummaryModal
          description="Use shipping rules to control how carriers, delivery pricing, and ETA visibility appear inside your storefront."
          onClose={() => setIsProviderRulesOpen(false)}
          onPrimaryAction={() => {
            setIsProviderRulesOpen(false)
            navigate('/merch/orders')
          }}
          primaryActionLabel="Open Orders"
          sections={[
            { title: 'Shipping Setup', items: providerControls },
            { title: 'Checkout Capabilities', items: checkoutCapabilities },
            {
              title: 'Provider Health',
              items: providerRows.map((row) => `${row.provider}: ${row.status} • ${row.performance}`),
            },
          ]}
          title="Shipping Rules"
        />
      ) : null}
    </div>
  )
}
