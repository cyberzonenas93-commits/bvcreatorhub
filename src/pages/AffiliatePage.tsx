import { useEffect, useState } from 'react'

import { DashboardModal } from '../components/dashboard/Modal'
import {
  CopyIcon,
  DollarIcon,
  EyeIcon,
  LinkIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TicketIcon,
  TrendIcon,
  UsersIcon,
} from '../components/ui/Icons'
import {
  buildTrackingLink,
  createAffiliateId,
  readStoredAffiliates,
  type AffiliateRecord,
  type AffiliateStatus,
  type CommissionType,
  writeStoredAffiliates,
} from '../lib/affiliates'
import { isEmailValid, isNonEmpty, isPhoneValid } from '../lib/merchantSetup'

type AffiliateFormState = {
  id?: string
  name: string
  email: string
  phone: string
  trackingCode: string
  commissionType: CommissionType
  commissionRate: string
}

function formatCurrency(amount: number) {
  return `GHC${amount.toLocaleString('en-US')}`
}

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function emptyAffiliateForm(): AffiliateFormState {
  return {
    name: '',
    email: '',
    phone: '',
    trackingCode: `PROMO${String(Date.now()).slice(-5)}`,
    commissionType: '%',
    commissionRate: '10',
  }
}

function formFromAffiliate(affiliate: AffiliateRecord): AffiliateFormState {
  return {
    id: affiliate.id,
    name: affiliate.name,
    email: affiliate.email,
    phone: affiliate.phone,
    trackingCode: affiliate.trackingCode,
    commissionType: affiliate.commissionType,
    commissionRate: String(affiliate.commissionRate),
  }
}

export function AffiliatePage() {
  const [affiliates, setAffiliates] = useState<AffiliateRecord[]>(() => readStoredAffiliates())
  const [search, setSearch] = useState('')
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [form, setForm] = useState<AffiliateFormState>(emptyAffiliateForm)
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateRecord | null>(null)

  useEffect(() => {
    writeStoredAffiliates(affiliates)
  }, [affiliates])

  const loweredSearch = search.trim().toLowerCase()
  const filteredAffiliates = affiliates.filter((affiliate) =>
    [affiliate.name, affiliate.email, affiliate.trackingCode].some((value) => value.toLowerCase().includes(loweredSearch)),
  )

  const activePromoters = affiliates.filter((affiliate) => affiliate.status === 'Active').length
  const totalSales = affiliates.reduce((sum, affiliate) => sum + affiliate.sales, 0)
  const totalRevenue = affiliates.reduce((sum, affiliate) => sum + affiliate.revenue, 0)
  const pendingPayouts = affiliates.reduce((sum, affiliate) => {
    if (affiliate.commissionType === '%') {
      return sum + affiliate.revenue * (affiliate.commissionRate / 100)
    }

    return sum + affiliate.sales * affiliate.commissionRate
  }, 0)

  const emailError = form.email.length > 0 && !isEmailValid(form.email) ? 'Enter a valid email address.' : ''
  const phoneError = form.phone.length > 0 && !isPhoneValid(form.phone) ? 'Use a valid Ghana phone number.' : ''
  const isFormValid =
    isNonEmpty(form.name) &&
    isEmailValid(form.email) &&
    isPhoneValid(form.phone) &&
    isNonEmpty(form.trackingCode) &&
    Number(form.commissionRate) > 0

  function openInviteModal(affiliate?: AffiliateRecord) {
    setForm(affiliate ? formFromAffiliate(affiliate) : emptyAffiliateForm())
    setIsInviteOpen(true)
  }

  function closeInviteModal() {
    setIsInviteOpen(false)
    setForm(emptyAffiliateForm())
  }

  function saveAffiliate() {
    if (!isFormValid) {
      return
    }

    const current = form.id ? affiliates.find((affiliate) => affiliate.id === form.id) : undefined
    const nextAffiliate: AffiliateRecord = {
      id: form.id ?? createAffiliateId(form.name),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      trackingCode: form.trackingCode.trim().toUpperCase(),
      trackingLink: buildTrackingLink(form.trackingCode.trim().toUpperCase()),
      clicks: current?.clicks ?? 0,
      sales: current?.sales ?? 0,
      revenue: current?.revenue ?? 0,
      commissionType: form.commissionType,
      commissionRate: Number(form.commissionRate),
      status: current?.status ?? 'Active',
      badge: current?.badge,
    }

    setAffiliates((currentAffiliates) => {
      const index = currentAffiliates.findIndex((affiliate) => affiliate.id === nextAffiliate.id)

      if (index === -1) {
        return [nextAffiliate, ...currentAffiliates]
      }

      const updated = [...currentAffiliates]
      updated[index] = nextAffiliate
      return updated
    })

    closeInviteModal()
  }

  function toggleStatus(affiliateId: string) {
    setAffiliates((currentAffiliates) =>
      currentAffiliates.map((affiliate) =>
        affiliate.id === affiliateId
          ? { ...affiliate, status: affiliate.status === 'Active' ? 'Paused' : 'Active' satisfies AffiliateStatus }
          : affiliate,
      ),
    )
  }

  async function copyLink(link: string) {
    await navigator.clipboard.writeText(link)
  }

  return (
    <div className="dashboard-page dashboard-page--narrow utility-page">
      <section className="utility-page__header">
        <div>
          <h1>Affiliate</h1>
          <p>Manage your affiliates and promoters and track their performance.</p>
        </div>

        <button className="page-primary-cta page-primary-cta--compact" onClick={() => openInviteModal()} type="button">
          <PlusIcon className="button-icon" />
          <span>Invite Affiliate</span>
        </button>
      </section>

      <section className="affiliate-metrics">
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon"><UsersIcon className="button-icon" /></span>
          </div>
          <span className="detail-metric-card__label">Active Promoters</span>
          <strong className="detail-metric-card__value">{activePromoters}</strong>
        </article>
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon"><TicketIcon className="button-icon" /></span>
          </div>
          <span className="detail-metric-card__label">Total Sales</span>
          <strong className="detail-metric-card__value">{totalSales}</strong>
        </article>
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon"><TrendIcon className="button-icon" /></span>
          </div>
          <span className="detail-metric-card__label">Total Revenue</span>
          <strong className="detail-metric-card__value">{formatCurrency(totalRevenue)}</strong>
        </article>
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon"><DollarIcon className="button-icon" /></span>
          </div>
          <span className="detail-metric-card__label">Pending Payouts</span>
          <strong className="detail-metric-card__value text-accent">{formatCurrency(pendingPayouts)}</strong>
        </article>
      </section>

      <label className="search-bar">
        <SearchIcon className="search-bar__icon" />
        <input onChange={(event) => setSearch(event.target.value)} placeholder="Search promoters by name, email, or tracking code..." value={search} />
      </label>

      <section className="affiliate-list">
        {filteredAffiliates.map((affiliate) => (
          <article key={affiliate.id} className="affiliate-card">
            <div className="affiliate-card__header">
              <div className="affiliate-card__identity">
                <span className="affiliate-card__avatar">{initialsFromName(affiliate.name)}</span>
                <div className="affiliate-card__identity-copy">
                  <div className="affiliate-card__title">
                    <strong>{affiliate.name}</strong>
                    <span className={`status-chip ${affiliate.status === 'Active' ? 'status-chip--success' : 'status-chip--warning'}`}>
                      {affiliate.status.toLowerCase()}
                    </span>
                    {affiliate.badge ? <span className="status-chip status-chip--warning">{affiliate.badge}</span> : null}
                  </div>
                  <span>{affiliate.email} • {affiliate.phone}</span>
                </div>
              </div>

              <div className="affiliate-card__actions">
                <button className="surface-button surface-button--tiny" onClick={() => openInviteModal(affiliate)} type="button">
                  <PencilIcon className="button-icon" />
                  <span>Edit</span>
                </button>
                <button className="surface-button surface-button--tiny" onClick={() => setSelectedAffiliate(affiliate)} type="button">
                  <EyeIcon className="button-icon" />
                  <span>View Details</span>
                </button>
                <button className={affiliate.status === 'Active' ? 'surface-button surface-button--tiny surface-button--warning' : 'surface-button surface-button--tiny surface-button--success'} onClick={() => toggleStatus(affiliate.id)} type="button">
                  <span>{affiliate.status === 'Active' ? 'Pause' : 'Activate'}</span>
                </button>
              </div>
            </div>

            <div className="affiliate-card__link-row">
              <div>
                <span>Tracking Link</span>
                <div className="affiliate-card__link-box">
                  <LinkIcon className="button-icon" />
                  <code>{affiliate.trackingLink}</code>
                </div>
              </div>
              <button className="icon-action-button" onClick={() => copyLink(affiliate.trackingLink)} type="button">
                <CopyIcon className="button-icon button-icon--muted" />
              </button>
            </div>

            <div className="affiliate-card__stats">
              <div>
                <span>Clicks</span>
                <strong>{affiliate.clicks.toLocaleString('en-US')}</strong>
              </div>
              <div>
                <span>Sales</span>
                <strong>{affiliate.sales}</strong>
              </div>
              <div>
                <span>Conv. Rate</span>
                <strong>{Math.max(1, Math.round((affiliate.sales / Math.max(1, affiliate.clicks)) * 100))}%</strong>
              </div>
              <div>
                <span>Commission</span>
                <strong>{affiliate.commissionType === '%' ? `${affiliate.commissionRate}%` : `GHC${affiliate.commissionRate}`}</strong>
              </div>
            </div>
          </article>
        ))}
      </section>

      {isInviteOpen ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={closeInviteModal} type="button">
                Cancel
              </button>
              <button className="page-primary-cta page-primary-cta--compact" disabled={!isFormValid} onClick={saveAffiliate} type="button">
                {form.id ? 'Save Changes' : 'Send Invite'}
              </button>
            </>
          }
          onClose={closeInviteModal}
          title={form.id ? 'Edit Promoter' : 'Invite Promoter'}
        >
          <div className="modal-form-grid">
            <label className="form-field">
              <span>Name</span>
              <input onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} value={form.name} />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} value={form.email} />
              {emailError ? <small className="field-error">{emailError}</small> : null}
            </label>
            <label className="form-field">
              <span>Phone</span>
              <input onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} value={form.phone} />
              {phoneError ? <small className="field-error">{phoneError}</small> : null}
            </label>
            <label className="form-field">
              <span>Tracking Code</span>
              <input onChange={(event) => setForm((current) => ({ ...current, trackingCode: event.target.value.toUpperCase() }))} value={form.trackingCode} />
            </label>
            <label className="form-field">
              <span>Commission Type</span>
              <div className="toggle-pair toggle-pair--embedded">
                <button className={form.commissionType === '%' ? 'toggle-pair__option toggle-pair__option--active' : 'toggle-pair__option'} onClick={() => setForm((current) => ({ ...current, commissionType: '%' }))} type="button">%</button>
                <button className={form.commissionType === 'GHC' ? 'toggle-pair__option toggle-pair__option--active' : 'toggle-pair__option'} onClick={() => setForm((current) => ({ ...current, commissionType: 'GHC' }))} type="button">GHC</button>
              </div>
            </label>
            <label className="form-field">
              <span>Rate</span>
              <input onChange={(event) => setForm((current) => ({ ...current, commissionRate: event.target.value }))} value={form.commissionRate} />
            </label>
          </div>
        </DashboardModal>
      ) : null}

      {selectedAffiliate ? (
        <DashboardModal
          footer={
            <button className="page-primary-cta page-primary-cta--compact" onClick={() => setSelectedAffiliate(null)} type="button">
              Close
            </button>
          }
          onClose={() => setSelectedAffiliate(null)}
          title={selectedAffiliate.name}
        >
          <div className="detail-summary-card">
            <div>
              <span>Tracking Code</span>
              <strong>{selectedAffiliate.trackingCode}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{selectedAffiliate.status}</strong>
            </div>
            <div>
              <span>Revenue</span>
              <strong>{formatCurrency(selectedAffiliate.revenue)}</strong>
            </div>
            <div>
              <span>Commission</span>
              <strong>{selectedAffiliate.commissionType === '%' ? `${selectedAffiliate.commissionRate}%` : `GHC${selectedAffiliate.commissionRate}`}</strong>
            </div>
            <div className="detail-summary-card__full">
              <span>Tracking Link</span>
              <strong>{selectedAffiliate.trackingLink}</strong>
            </div>
          </div>
        </DashboardModal>
      ) : null}
    </div>
  )
}
