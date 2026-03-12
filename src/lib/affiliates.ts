export type AffiliateStatus = 'Active' | 'Paused'
export type CommissionType = '%' | 'GHC'

export interface AffiliateRecord {
  id: string
  name: string
  email: string
  phone: string
  trackingCode: string
  trackingLink: string
  clicks: number
  sales: number
  revenue: number
  commissionType: CommissionType
  commissionRate: number
  status: AffiliateStatus
  badge?: string
}

const AFFILIATES_STORAGE_KEY = 'bv-dashboard-affiliates'

const defaultAffiliates: AffiliateRecord[] = [
  {
    id: 'kwame-osei',
    name: 'Kwame Osei',
    email: 'kwame.osei@promoter.gh',
    phone: '+233 24 123 4567',
    trackingCode: 'KWAME2026',
    trackingLink: 'https://events.gh/event/ref=KWAME2026',
    clicks: 1847,
    sales: 234,
    revenue: 84700,
    commissionType: '%',
    commissionRate: 10,
    status: 'Active',
  },
  {
    id: 'ama-asante',
    name: 'Ama Asante',
    email: 'ama@events.gh',
    phone: '+233 20 987 6543',
    trackingCode: 'AMA2026',
    trackingLink: 'https://events.gh/event/ref=AMA2026',
    clicks: 892,
    sales: 156,
    revenue: 39100,
    commissionType: '%',
    commissionRate: 15,
    status: 'Active',
  },
  {
    id: 'kofi-mensah',
    name: 'Kofi Mensah',
    email: 'kofi.m@live.gh',
    phone: '+233 59 249 1324',
    trackingCode: 'PROMO12325',
    trackingLink: 'https://events.gh/event/ref=PROMO12325',
    clicks: 634,
    sales: 89,
    revenue: 19900,
    commissionType: 'GHC',
    commissionRate: 50,
    status: 'Paused',
    badge: 'New',
  },
]

function sortAffiliates(affiliates: AffiliateRecord[]) {
  return [...affiliates].sort((left, right) => left.name.localeCompare(right.name))
}

export function readStoredAffiliates() {
  if (typeof window === 'undefined') {
    return defaultAffiliates
  }

  try {
    const stored = window.localStorage.getItem(AFFILIATES_STORAGE_KEY)

    if (!stored) {
      return defaultAffiliates
    }

    return sortAffiliates(JSON.parse(stored) as AffiliateRecord[])
  } catch {
    return defaultAffiliates
  }
}

export function writeStoredAffiliates(affiliates: AffiliateRecord[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AFFILIATES_STORAGE_KEY, JSON.stringify(sortAffiliates(affiliates)))
}

export function createAffiliateId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug.length > 0 ? slug : `affiliate-${Date.now()}`
}

export function buildTrackingLink(code: string) {
  return `https://events.gh/event/ref=${code}`
}

export function upsertStoredAffiliate(nextAffiliate: AffiliateRecord) {
  const affiliates = readStoredAffiliates()
  const index = affiliates.findIndex((affiliate) => affiliate.id === nextAffiliate.id)

  if (index === -1) {
    writeStoredAffiliates([...affiliates, nextAffiliate])
    return nextAffiliate
  }

  const updated = [...affiliates]
  updated[index] = nextAffiliate
  writeStoredAffiliates(updated)

  return nextAffiliate
}
