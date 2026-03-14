import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import {
  DownloadIcon,
  ShieldCheckIcon,
  StoreIcon,
  UsersIcon,
  WalletIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const settingsStats: DashboardMetric[] = [
  {
    label: 'Roles Configured',
    value: '4',
    helper: 'Merchant roles currently shaping access for catalog, orders, customers, and payouts.',
    delta: 'RBAC',
    icon: <ShieldCheckIcon className="metric-card__glyph" />,
  },
  {
    label: 'Team Members',
    value: '8',
    helper: 'People currently helping you manage products, fulfillment, and customer support.',
    delta: '+1',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Payout Connections',
    value: '2',
    helper: 'Active payout destinations and finance connections tied to your store.',
    delta: 'Ready',
    icon: <StoreIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Shipping Integrations',
    value: '3 providers',
    helper: 'Connected delivery partners available for labels, tracking, and shipping updates.',
    delta: 'DHL + local',
    icon: <WalletIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const roles = [
  {
    name: 'Store Owner',
    permissions: ['Team permissions', 'Payout settings', 'Catalog publishing'],
  },
  {
    name: 'Store Manager',
    permissions: ['Collection planning', 'Campaign updates', 'Analytics access'],
  },
  {
    name: 'Fulfillment Lead',
    permissions: ['Order handling', 'Shipping updates', 'Inventory visibility'],
  },
  {
    name: 'Support & CRM',
    permissions: ['Customer messaging', 'Returns follow-up', 'Order support'],
  },
]

const logistics = [
  'DHL for premium regional shipping',
  'FedEx for cross-border fulfillment',
  'Local Ghana delivery partners for same-city convenience',
]

export function MerchSettingsPage() {
  const navigate = useNavigate()
  const [isSecurityPoliciesOpen, setIsSecurityPoliciesOpen] = useState(false)

  function exportRoles() {
    downloadCsv('team-access.csv', [
      ['Role', 'Permissions'],
      ...roles.map((role) => [role.name, role.permissions.join(' | ')]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Access Guide',
            icon: <ShieldCheckIcon className="merch-action-button__glyph" />,
            onClick: () => setIsSecurityPoliciesOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportRoles,
          },
          {
            label: 'Open Storefront',
            icon: <StoreIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/merchants'),
            variant: 'primary',
          },
        ]}
        subtitle="Manage your team, permissions, payout connections, and shipping integrations from one place."
        title="Team, Access & Store Settings"
      />

      <MetricsGrid metrics={settingsStats} />

      <section className="role-grid">
        {roles.map((role) => (
          <article key={role.name} className="role-card">
            <p className="role-card__eyebrow">Role</p>
            <h2 className="section-title">{role.name}</h2>
            <ul className="feature-list">
              {role.permissions.map((permission) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <article className="insight-card">
        <div className="insight-card__header">
          <div>
            <p className="insight-card__eyebrow">Shipping & Fulfillment</p>
            <h2 className="section-title">Connected Delivery Partners</h2>
          </div>
          <WalletIcon className="insight-card__headline-icon" />
        </div>
        <ul className="pill-list">
          {logistics.map((provider) => (
            <li key={provider}>{provider}</li>
          ))}
        </ul>
      </article>

      {isSecurityPoliciesOpen ? (
        <ActionSummaryModal
          description="Use this access guide to keep the right people in the right roles while protecting orders, payouts, and customer data."
          onClose={() => setIsSecurityPoliciesOpen(false)}
          onPrimaryAction={() => {
            setIsSecurityPoliciesOpen(false)
            navigate('/merch/merchants')
          }}
          primaryActionLabel="Open Storefront"
          sections={[
            {
              title: 'Role Coverage',
              items: roles.map((role) => `${role.name}: ${role.permissions.join(', ')}`),
            },
            { title: 'Fulfillment Footprint', items: logistics },
          ]}
          title="Access Guide"
        />
      ) : null}
    </div>
  )
}
