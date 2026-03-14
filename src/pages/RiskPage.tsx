import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  AlertIcon,
  DownloadIcon,
  ShieldCheckIcon,
  TrendIcon,
  UsersIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const riskStats: DashboardMetric[] = [
  {
    label: 'Policy Alerts',
    value: '2',
    helper: 'Issues that may affect listings, customer experience, or future payouts if left unresolved.',
    delta: '-1',
    icon: <AlertIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Verification Tasks',
    value: '1',
    helper: 'Profile or payout details that still need your attention to keep the account fully ready.',
    delta: '1 open',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'accent',
  },
  {
    label: 'Open Support Cases',
    value: '3',
    helper: 'Customer-facing issues that may need quicker action from your team.',
    delta: '-1',
    icon: <ShieldCheckIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Refund Rate',
    value: '1.7%',
    helper: 'The share of recent orders currently moving through a refund or return workflow.',
    delta: '-0.5%',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
]

const riskRows = [
  {
    caseId: 'RSK-204',
    merchant: 'Payout setup',
    signal: 'Tax form refresh required before the next settlement window.',
    score: 'High',
    status: 'Action needed',
    tone: 'warning' as const,
  },
  {
    caseId: 'RSK-201',
    merchant: 'Returns',
    signal: 'Two recent size exchanges should be reviewed before the next campaign push.',
    score: 'Medium',
    status: 'Monitoring',
    tone: 'info' as const,
  },
  {
    caseId: 'RSK-198',
    merchant: 'Catalog',
    signal: 'One draft listing still needs care instructions before it can go live.',
    score: 'Low',
    status: 'Resolved',
    tone: 'success' as const,
  },
  {
    caseId: 'RSK-193',
    merchant: 'Shipping',
    signal: 'A courier delay may affect 3 orders due for delivery today.',
    score: 'Medium',
    status: 'Review',
    tone: 'accent' as const,
  },
]

const scoringSignals = [
  'Refund rates relative to your normal sales pattern',
  'Repeated delivery complaints or unresolved support cases',
  'Missing verification, payout, or tax information',
  'Catalog issues that may delay a listing or feature placement',
]

const interventions = [
  'Update account or payout details before the next settlement cycle',
  'Resolve delayed shipments before support issues escalate',
  'Refresh product details that may block a launch or prevent a listing from going live',
  'Track a clear action history so your team knows what has been fixed',
]

export function RiskPage() {
  const navigate = useNavigate()
  const [isPolicyRulesOpen, setIsPolicyRulesOpen] = useState(false)

  function exportRiskCases() {
    downloadCsv('account-health.csv', [
      ['Case', 'Area', 'Issue', 'Priority', 'Status'],
      ...riskRows.map((row) => [row.caseId, row.merchant, row.signal, row.score, row.status]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Policy Guide',
            icon: <ShieldCheckIcon className="merch-action-button__glyph" />,
            onClick: () => setIsPolicyRulesOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportRiskCases,
          },
          {
            label: 'Open Settings',
            icon: <TrendIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/settings'),
            variant: 'primary',
          },
        ]}
        subtitle="Track account alerts, verification tasks, and support-sensitive issues before they affect listings, customers, or payouts."
        title="Account Health & Compliance"
      />

      <MetricsGrid metrics={riskStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Account Health Checklist</h2>
              <p className="section-subtitle">
                A checklist of the issues that currently need attention across your store, orders, catalog, and payouts.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Area</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {riskRows.map((row) => (
                  <tr key={row.caseId}>
                    <td data-label="Case">{row.caseId}</td>
                    <td data-label="Area">{row.merchant}</td>
                    <td data-label="Issue">{row.signal}</td>
                    <td className="registrations-table__amount" data-label="Priority">
                      {row.score}
                    </td>
                    <td data-label="Status">
                      <StatusPill label={row.status} tone={row.tone} />
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
                <p className="insight-card__eyebrow">Account Signals</p>
                <h2 className="section-title">What To Watch</h2>
              </div>
              <AlertIcon className="insight-card__headline-icon" />
            </div>
            <ul className="feature-list">
              {scoringSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </article>

          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Action Guide</p>
                <h2 className="section-title">How To Stay In Good Standing</h2>
              </div>
              <ShieldCheckIcon className="insight-card__headline-icon" />
            </div>
            <ul className="pill-list">
              {interventions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {isPolicyRulesOpen ? (
        <ActionSummaryModal
          description="Use this guide to stay ahead of payout holds, listing issues, and support problems before they slow your store down."
          onClose={() => setIsPolicyRulesOpen(false)}
          onPrimaryAction={() => {
            setIsPolicyRulesOpen(false)
            navigate('/merch/settings')
          }}
          primaryActionLabel="Open Settings"
          sections={[
            { title: 'What To Watch', items: scoringSignals },
            { title: 'Action Guide', items: interventions },
            {
              title: 'Current Account Alerts',
              items: riskRows.map((row) => `${row.caseId}: ${row.merchant} • ${row.status}`),
            },
          ]}
          title="Policy Guide"
        />
      ) : null}
    </div>
  )
}
