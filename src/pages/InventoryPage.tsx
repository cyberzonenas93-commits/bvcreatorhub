import { useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  AlertIcon,
  DownloadIcon,
  PackageIcon,
  TrendIcon,
  MegaphoneIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

const inventoryStats: DashboardMetric[] = [
  {
    label: 'Tracked SKUs',
    value: '1,124',
    helper: 'All products with inventory visibility across brands and collections',
    delta: '+302',
    icon: <PackageIcon className="metric-card__glyph" />,
  },
  {
    label: 'Low Stock Alerts',
    value: '23',
    helper: 'Products nearing threshold before customer experience is impacted',
    delta: '+7',
    icon: <AlertIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Out Of Stock',
    value: '9',
    helper: 'Active merch entries that require replenishment or replacement',
    delta: '-3',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Auto Deduction',
    value: 'Enabled',
    helper: 'Stock decrements instantly after successful payment confirmation',
    delta: 'Live',
    icon: <PackageIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const stockRows = [
  {
    sku: 'CB-RUNWAY-SHIRT-M',
    product: 'Runway Silk Shirt',
    brand: 'Christie Brown',
    stock: '12',
    status: 'Low Stock',
    tone: 'warning' as const,
  },
  {
    sku: 'FTY-HOODIE-BLK-L',
    product: 'Community Code Hoodie',
    brand: 'Free The Youth',
    stock: '0',
    status: 'Out Of Stock',
    tone: 'danger' as const,
  },
  {
    sku: 'BV-TOTE-CORE-OS',
    product: 'BV Creator Tote',
    brand: 'BlacVolta Essentials',
    stock: '74',
    status: 'Healthy',
    tone: 'success' as const,
  },
  {
    sku: 'CH-DRESS-HOLIDAY-S',
    product: 'Holiday Capsule Dress',
    brand: 'Chocolate',
    stock: '18',
    status: 'Watchlist',
    tone: 'accent' as const,
  },
]

const inventoryRules = [
  'Automatic stock deduction immediately after successful purchase confirmation',
  'Low stock and out-of-stock alerts routed to merchants and internal ops',
  'SKU-level tracking to support size and color variants',
  'Restock coordination tied to campaigns and collection relaunches',
]

export function InventoryPage() {
  const navigate = useNavigate()

  function exportInventory() {
    downloadCsv('blacvolta-inventory.csv', [
      ['SKU', 'Product', 'Brand', 'Stock', 'Status'],
      ...stockRows.map((row) => [row.sku, row.product, row.brand, row.stock, row.status]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Alert Rules',
            icon: <AlertIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportInventory,
          },
          {
            label: 'Plan Restock Campaign',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/promotions'),
            variant: 'primary',
          },
        ]}
        subtitle="Monitor stock health, protect live drops, and coordinate replenishment before conversion suffers."
        title="Inventory & Stock Management"
      />

      <MetricsGrid metrics={inventoryStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Stock Watch List</h2>
              <p className="section-subtitle">
                Inventory visibility for fast-moving styles, size variants, and launch-sensitive SKUs.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stockRows.map((row) => (
                  <tr key={row.sku}>
                    <td>{row.sku}</td>
                    <td>{row.product}</td>
                    <td>{row.brand}</td>
                    <td>{row.stock}</td>
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
              <p className="insight-card__eyebrow">Inventory Logic</p>
              <h2 className="section-title">Operational Safeguards</h2>
            </div>
            <PackageIcon className="insight-card__headline-icon" />
          </div>
          <ul className="feature-list">
            {inventoryRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
