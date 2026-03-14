import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionSummaryModal } from '../components/dashboard/ActionSummaryModal'
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
    value: '48',
    helper: 'Products currently visible in your storefront and collection pages.',
    delta: '+6',
    icon: <PackageIcon className="metric-card__glyph" />,
  },
  {
    label: 'Draft Products',
    value: '6',
    helper: 'Styles still being prepared with media, copy, or pricing before launch.',
    delta: '+2',
    icon: <TagIcon className="metric-card__glyph" />,
    tone: 'warning',
  },
  {
    label: 'Low Stock SKUs',
    value: '4',
    helper: 'Variants that may need a restock before your next campaign or drop.',
    delta: '+1',
    icon: <TrendIcon className="metric-card__glyph" />,
    tone: 'success',
  },
  {
    label: 'Active Collections',
    value: '7',
    helper: 'Collections, capsules, and limited drops currently tied to your catalog.',
    delta: '+1',
    icon: <LayersIcon className="metric-card__glyph" />,
    tone: 'info',
  },
]

const productRows: ProductRow[] = [
  {
    name: 'Runway Silk Shirt',
    brand: 'Resort Edit',
    category: 'Shirts',
    price: 'GH₵780',
    stock: '42 units',
    status: 'Live',
    tone: 'success',
  },
  {
    name: 'Community Code Hoodie',
    brand: 'Core Store',
    category: 'Hoodies',
    price: 'GH₵460',
    stock: '18 units',
    status: 'Low Stock',
    tone: 'warning',
  },
  {
    name: 'BV Creator Tote',
    brand: 'Creator Capsule',
    category: 'Accessories',
    price: 'GH₵220',
    stock: '74 units',
    status: 'Featured',
    tone: 'info',
  },
  {
    name: 'Holiday Capsule Dress',
    brand: 'Holiday Drop',
    category: 'Dresses',
    price: 'GH₵1,150',
    stock: 'Preorder',
    status: 'Draft',
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
  const [isCatalogRulesOpen, setIsCatalogRulesOpen] = useState(false)

  function exportProducts() {
    downloadCsv('product-catalog.csv', [
      ['Product', 'Brand', 'Category', 'Price', 'Stock', 'Status'],
      ...productRows.map((row) => [row.name, row.brand, row.category, row.price, row.stock, row.status]),
    ])
  }

  return (
    <div className="dashboard-page">
      <MerchPageHeader
        actions={[
          {
            label: 'Catalog Tips',
            icon: <TagIcon className="merch-action-button__glyph" />,
            onClick: () => setIsCatalogRulesOpen(true),
          },
          {
            label: 'Export',
            icon: <DownloadIcon className="merch-action-button__glyph" />,
            onClick: exportProducts,
          },
          {
            label: 'Open Campaigns',
            icon: <MegaphoneIcon className="merch-action-button__glyph" />,
            onClick: () => navigate('/merch/promotions'),
            variant: 'primary',
          },
        ]}
        subtitle="Create, organize, and track the products shoppers see across your storefront, drops, and content commerce placements."
        title="Product Catalog & Merchandising"
      />

      <MetricsGrid metrics={productStats} />

      <section className="split-grid">
        <section className="table-card">
          <div className="table-card__header">
            <div>
              <h2 className="section-title">Product Library</h2>
              <p className="section-subtitle">
                Your current product library, including live listings, featured products, and in-progress drafts.
              </p>
            </div>
          </div>
          <div className="table-scroll">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Collection</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((row) => (
                  <tr key={row.name}>
                    <td data-label="Product">{row.name}</td>
                    <td data-label="Collection">{row.brand}</td>
                    <td data-label="Category">{row.category}</td>
                    <td className="registrations-table__amount" data-label="Price">
                      {row.price}
                    </td>
                    <td data-label="Stock">{row.stock}</td>
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
                <p className="insight-card__eyebrow">Product Authoring</p>
                <h2 className="section-title">Publishing Checklist</h2>
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

      {isCatalogRulesOpen ? (
        <ActionSummaryModal
          description="Use these publishing tips to keep your catalog ready for launches, campaigns, and feature placements."
          onClose={() => setIsCatalogRulesOpen(false)}
          onPrimaryAction={() => {
            setIsCatalogRulesOpen(false)
            navigate('/merch/promotions')
          }}
          primaryActionLabel="Open Campaigns"
          sections={[
            { title: 'Publishing Checklist', items: productFields },
            { title: 'Merch Programs', items: collectionTypes },
            {
              title: 'Catalog Snapshot',
              items: productRows.map((row) => `${row.name}: ${row.status} • ${row.stock}`),
            },
          ]}
          title="Catalog Tips"
        />
      ) : null}
    </div>
  )
}
