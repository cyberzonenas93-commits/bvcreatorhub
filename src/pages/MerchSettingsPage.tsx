import { useNavigate } from 'react-router-dom'

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
    helper: 'Super Admin, Merch Admin, Merchant Admin, and Merchant Staff',
    delta: 'RBAC',
    icon: <ShieldCheckIcon className="metric-card__glyph" />,
  },
  {
    label: 'Permission Groups',
    value: '12',
    helper: 'Granular access to products, orders, analytics, and payouts',
    delta: '+3',
    icon: <UsersIcon className="metric-card__glyph" />,
    tone: 'info',
  },
  {
    label: 'Merchant Access',
    value: '32 accounts',
    helper: 'Active merchant admins and staff currently using the dashboard',
    delta: '+7',
    icon: <StoreIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Fulfillment Integrations',
    value: '3 providers',
    helper: 'Shipping partners connected for labels and tracking updates',
    delta: 'DHL + local',
    icon: <WalletIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
]

const roles = [
  {
    name: 'Super Admin',
    permissions: ['Marketplace controls', 'Commission rules', 'Security policies'],
  },
  {
    name: 'BlacVolta Merch Admin',
    permissions: ['Product approval', 'Order operations', 'Analytics access'],
  },
  {
    name: 'Merchant Admin',
    permissions: ['Catalog management', 'Inventory visibility', 'Campaign controls'],
  },
  {
    name: 'Merchant Staff',
    permissions: ['Order support', 'Stock updates', 'Customer messaging'],
  },
]

const logistics = [
  'DHL for premium regional shipping',
  'FedEx for cross-border fulfillment',
  'Local Ghana delivery partners for same-city convenience',
]

export function MerchSettingsPage() {
  const navigate = useNavigate()

  function exportRoles() {
    downloadCsv('blacvolta-roles.csv', [
      ['Role', 'Permissions'],
      ...roles.map((role) => [role.name, role.permissions.join(' | ')]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Security Policies',
            icon: <ShieldCheckIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportRoles,
          },
          {
            label: 'Open Merchants',
            icon: <StoreIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merchants'),
            variant: 'primary',
          },
        ]}
        subtitle="Permissions, merchant access, payout controls, and fulfillment integrations that keep the platform secure."
        title="Security, Roles & Platform Settings"
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
            <p className="insight-card__eyebrow">Logistics & Fulfillment</p>
            <h2 className="section-title">Shipping Provider Footprint</h2>
          </div>
          <WalletIcon className="insight-card__headline-icon" />
        </div>
        <ul className="pill-list">
          {logistics.map((provider) => (
            <li key={provider}>{provider}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}
