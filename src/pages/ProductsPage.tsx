import { useNavigate } from 'react-router-dom'

import { MerchPageHeader } from '../components/dashboard/MerchPageHeader'
import { MetricsGrid, type DashboardMetric } from '../components/dashboard/MetricsGrid'
import { StatusPill } from '../components/dashboard/StatusPill'
import {
  DownloadIcon,
  LayersIcon,
  MegaphoneIcon,
  PackageIcon,
  TagIcon,
  TrendIcon,
} from '../components/ui/Icons'
import { downloadCsv } from '../lib/download'

type ProductRow = {
  name: string
  brand: string
  category: string
  price: string
  stock: string
  status: string
  tone: 'accent' | 'success' | 'warning' | 'info'
}

const productStats: DashboardMetric[] = [
  {
    label: 'Live Products',
    value: '486',
    helper: 'Approved and currently visible in the marketplace',
    delta: '+38',
    icon: <PackageIcon className="metric-card__glyph" />,
  },
  {
    label: 'Drafts Awaiting Review',
    value: '27',
    helper: 'Merchant-submitted listings pending admin approval',
    delta: '+9',
    icon: <TagIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Limited Drops',
    value: '14',
    helper: 'Launch-mode collections with timed access windows',
    delta: '+5',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Creator Capsules',
    value: '6',
    helper: 'Merch collections linked to artists, DJs, and tastemakers',
    delta: '+2',
    icon: <LayersIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const productRows: ProductRow[] = [
  {
    name: 'Runway Silk Shirt',
    brand: 'Christie Brown',
    category: 'Shirts',
    price: 'GH₵780',
    stock: '42 units',
    status: 'Approved',
    tone: 'success',
  },
  {
    name: 'Community Code Hoodie',
    brand: 'Free The Youth',
    category: 'Hoodies',
    price: 'GH₵460',
    stock: '18 units',
    status: 'Low Stock',
    tone: 'warning',
  },
  {
    name: 'BV Creator Tote',
    brand: 'BlacVolta Essentials',
    category: 'Accessories',
    price: 'GH₵220',
    stock: '74 units',
    status: 'Featured',
    tone: 'info',
  },
  {
    name: 'Holiday Capsule Dress',
    brand: 'Chocolate',
    category: 'Dresses',
    price: 'GH₵1,150',
    stock: 'Preorder',
    status: 'Pending Review',
    tone: 'accent',
  },
]

const productFields = [
  'Product name, brand, and category',
  'Rich description and storytelling blocks',
  'Price and discount price',
  'Images, product video, and launch media',
  'Size variants, color variants, and SKU generation',
  'Inventory quantity, tags, and collection assignment',
]

const collectionTypes = [
  'Spring/Summer collection',
  'Limited drops',
  'Capsule collections',
  'Event merchandise',
]

export function ProductsPage() {
  const navigate = useNavigate()

  function exportProducts() {
    downloadCsv('blacvolta-products.csv', [
      ['Product', 'Brand', 'Category', 'Price', 'Stock', 'Status'],
      ...productRows.map((row) => [row.name, row.brand, row.category, row.price, row.stock, row.status]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Catalog Rules',
            icon: <TagIcon className="merch-action-button__glyph" />,
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportProducts,
          },
          {
            label: 'Plan Promotion',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/promotions'),
            variant: 'primary',
          },
        ]}
        subtitle="Approve products, manage rich product content, and stage collections for premium brand storytelling."
        title="Product & Collection Management"
      />

      <MetricsGrid metrics={productStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Product Approval Queue</h2>
              <p className="section-subtitle">
                The core merchant authoring model from the epic, translated into the merch dashboard.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.brand}</td>
                    <td>{row.category}</td>
                    <td className="registrations-table__amount">{row.price}</td>
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

        <div className="stack-grid">
          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Product Authoring</p>
                <h2 className="section-title">Required Fields</h2>
              </div>
              <PackageIcon className="insight-card__headline-icon" />
            </div>
            <ul className="feature-list">
              {productFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </article>

          <article className="insight-card">
            <div className="insight-card__header">
              <div>
                <p className="insight-card__eyebrow">Collection Types</p>
                <h2 className="section-title">Merch Programs</h2>
              </div>
              <LayersIcon className="insight-card__headline-icon" />
            </div>
            <ul className="pill-list">
              {collectionTypes.map((collection) => (
                <li key={collection}>{collection}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}
