import { useEffect, useMemo, useState } from 'react'

import { payoutBrandLogos } from '../assets/payout'
import { DashboardModal } from '../components/dashboard/Modal'
import {
  CardIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  DocumentIcon,
  DownloadIcon,
  FilterIcon,
  MailIcon,
  SearchIcon,
  TrendIcon,
  WalletIcon,
} from '../components/ui/Icons'
import { readStoredPayments, type PayoutRecord, type PayoutStatus, writeStoredPayments } from '../lib/payments'

type FinanceView = 'payout' | 'history'
type FinanceFilter = 'all' | 'Completed' | 'Pending' | 'Failed'
type PayoutMethod = 'mobile-money' | 'bank-transfer'
type PayoutProvider = {
  id: string
  method: PayoutMethod
  label: string
  helper: string
  logo: string
}

function formatMoney(amount: number) {
  return `GH₵${amount.toLocaleString('en-US', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  })}`
}

function formatPayoutStatus(status: PayoutStatus): Exclude<FinanceFilter, 'all'> {
  if (status === 'Paid') {
    return 'Completed'
  }

  if (status === 'Processing') {
    return 'Pending'
  }

  return 'Failed'
}

function formatPayoutCode(id: string) {
  const digits = id.replace(/\D/g, '')
  return `PO-${(digits.slice(-3) || '1').padStart(3, '0')}`
}

function downloadFile(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

export function PaymentsPayoutsPage() {
  const [payments, setPayments] = useState(() => readStoredPayments())
  const [activeView, setActiveView] = useState<FinanceView>('payout')
  const [filter, setFilter] = useState<FinanceFilter>('all')
  const [search, setSearch] = useState('')
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [detailsText, setDetailsText] = useState<string | null>(null)
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod>('mobile-money')
  const [selectedProviderId, setSelectedProviderId] = useState('mtn-mobile-money')
  const [payoutAmount, setPayoutAmount] = useState('100')
  const [walletTransferAmount, setWalletTransferAmount] = useState('100')

  useEffect(() => {
    writeStoredPayments(payments)
  }, [payments])

  const loweredSearch = search.trim().toLowerCase()
  const completedRevenue = payments.transactions
    .filter((transaction) => transaction.status === 'Completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const pendingPayoutBalance = payments.payouts
    .filter((payout) => payout.status === 'Processing')
    .reduce((sum, payout) => sum + payout.amount, 0)

  const totalRevenue = completedRevenue + 98580.5
  const totalPaidOut = payments.payouts
    .filter((payout) => payout.status !== 'Failed')
    .reduce((sum, payout) => sum + payout.amount, 0)
  const promoWallet = 3200
  const availableBalance = totalRevenue - totalPaidOut

  const filteredPayouts = payments.payouts.filter((payout) => {
    const formattedStatus = formatPayoutStatus(payout.status)
    const matchesFilter = filter === 'all' ? true : formattedStatus === filter
    const matchesSearch =
      loweredSearch.length === 0 ||
      [
        formatPayoutCode(payout.id),
        payout.requestedOn,
        payout.beneficiary,
        payout.destination,
        payout.method,
        payout.reference,
        formattedStatus,
      ].some((value) => value.toLowerCase().includes(loweredSearch))

    return matchesFilter && matchesSearch
  })

  const availableFeatures = [
    { label: 'Event Boost', helper: 'Promote your event', value: 'GH₵500' },
    { label: 'Featured Listing', helper: 'Top placement', value: 'GH₵300' },
  ]

  const payoutOptions = useMemo(
    () => [
      {
        id: 'mobile-money',
        label: 'Mobile Money',
        helper: 'Send funds to a verified mobile wallet',
        logo: payoutBrandLogos.mtn,
      },
      {
        id: 'bank-transfer',
        label: 'Bank Transfer',
        helper: 'Settle directly to a bank account',
        logo: payoutBrandLogos.gcb,
      },
    ],
    [],
  )

  const payoutProviders = useMemo<PayoutProvider[]>(
    () => [
      {
        id: 'mtn-mobile-money',
        method: 'mobile-money',
        label: 'MTN Mobile Money',
        helper: '+233 24 555 1234',
        logo: payoutBrandLogos.mtn,
      },
      {
        id: 'telecel-cash',
        method: 'mobile-money',
        label: 'Telecel Cash',
        helper: '+233 20 456 2211',
        logo: payoutBrandLogos.telecel,
      },
      {
        id: 'gcb-bank',
        method: 'bank-transfer',
        label: 'GCB Bank',
        helper: 'GCB Bank • ****5678',
        logo: payoutBrandLogos.gcb,
      },
      {
        id: 'ecobank-ghana',
        method: 'bank-transfer',
        label: 'Ecobank Ghana',
        helper: 'Ecobank • ****1007',
        logo: payoutBrandLogos.ecobank,
      },
      {
        id: 'calbank',
        method: 'bank-transfer',
        label: 'CalBank',
        helper: 'CalBank • ****6118',
        logo: payoutBrandLogos.calbank,
      },
      {
        id: 'stanbic-bank-ghana',
        method: 'bank-transfer',
        label: 'Stanbic Bank Ghana',
        helper: 'Stanbic • ****3029',
        logo: payoutBrandLogos.stanbic,
      },
    ],
    [],
  )

  const visibleProviders = useMemo(
    () => payoutProviders.filter((provider) => provider.method === payoutMethod),
    [payoutMethod, payoutProviders],
  )

  const selectedProvider =
    payoutProviders.find((provider) => provider.id === selectedProviderId) ?? payoutProviders[0]

  function exportTable(type: 'csv' | 'pdf') {
    setIsExportOpen(false)

    const rows = filteredPayouts.map((item) =>
      [
        formatPayoutCode(item.id),
        item.requestedOn,
        item.amount,
        item.method,
        item.destination,
        formatPayoutStatus(item.status),
        item.reference,
      ].join(','),
    )

    downloadFile(
      `payout-history.${type === 'csv' ? 'csv' : 'pdf'}`,
      rows.join('\n'),
      type === 'csv' ? 'text/csv;charset=utf-8' : 'application/pdf',
    )
  }

  function openDetails(payout: PayoutRecord) {
    setDetailsText(
      `${formatPayoutCode(payout.id)}\nDate: ${payout.requestedOn}\nAmount: ${formatMoney(payout.amount)}\nMethod: ${payout.method}\nDestination: ${payout.destination}\nStatus: ${formatPayoutStatus(payout.status)}\nReference: ${payout.reference}`,
    )
  }

  function requestPayout() {
    const amount = Number(payoutAmount)
    if (!Number.isFinite(amount) || amount <= 0 || amount > availableBalance) {
      return
    }

    const nextPayout: PayoutRecord = {
      id: `pay-${Date.now()}`,
      beneficiary: selectedProvider.label,
      destination: selectedProvider.helper,
      method: payoutMethod === 'mobile-money' ? 'Mobile Money' : 'Bank Transfer',
      requestedOn: '13 Mar, 2026',
      status: 'Processing',
      amount,
      reference: `${selectedProvider.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)}-${Date.now()}`,
    }

    setPayments((current) => ({
      ...current,
      payouts: [nextPayout, ...current.payouts],
    }))
    setPayoutAmount('100')
    setActiveView('history')
  }

  function selectPayoutMethod(nextMethod: PayoutMethod) {
    setPayoutMethod(nextMethod)
    const firstProvider = payoutProviders.find((provider) => provider.method === nextMethod)
    if (firstProvider) {
      setSelectedProviderId(firstProvider.id)
    }
  }

  function transferToWallet() {
    const amount = Number(walletTransferAmount)
    if (!Number.isFinite(amount) || amount <= 0 || amount > availableBalance) {
      return
    }

    setPayments((current) => ({
      ...current,
      transactions: [
        {
          id: `promo-${Date.now()}`,
          title: 'Promo Wallet Transfer',
          category: 'Promo Wallet',
          date: '13 Mar, 2026',
          status: 'Completed',
          amount,
          reference: `PROMO-${Date.now()}`,
        },
        ...current.transactions,
      ],
    }))
    setWalletTransferAmount('100')
  }

  return (
    <div className="dashboard-page dashboard-page--narrow utility-page payments-page">
      <section className="utility-page__header utility-page__header--stacked">
        <div>
          <h1>Payments &amp; Payouts</h1>
          <p>Manage your earnings, initiate payouts, and transfer to your promo wallet</p>
        </div>
      </section>

      <section className="affiliate-metrics">
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon">
              <CardIcon className="button-icon" />
            </span>
          </div>
          <span className="detail-metric-card__label">Available Balance</span>
          <strong className="detail-metric-card__value">{formatMoney(availableBalance)}</strong>
          <small>Ready to withdraw</small>
        </article>
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon">
              <WalletIcon className="button-icon" />
            </span>
          </div>
          <span className="detail-metric-card__label">Promo Wallet</span>
          <strong className="detail-metric-card__value">GH₵{promoWallet.toLocaleString('en-US')}</strong>
          <small>For event promotions</small>
        </article>
        <article className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon">
              <ClockIcon className="button-icon" />
            </span>
          </div>
          <span className="detail-metric-card__label">Pending</span>
          <strong className="detail-metric-card__value">{formatMoney(pendingPayoutBalance)}</strong>
          <small>Processing</small>
        </article>
      </section>

      <div className="finance-view-tabs">
        <button
          className={activeView === 'payout' ? 'finance-view-tabs__tab finance-view-tabs__tab--active' : 'finance-view-tabs__tab'}
          onClick={() => setActiveView('payout')}
          type="button"
        >
          Payout
        </button>
        <button
          className={activeView === 'history' ? 'finance-view-tabs__tab finance-view-tabs__tab--active' : 'finance-view-tabs__tab'}
          onClick={() => setActiveView('history')}
          type="button"
        >
          History
        </button>
      </div>

      {activeView === 'payout' ? (
        <section className="payments-payout-grid">
          <article className="payments-card">
            <div className="payments-card__title">
              <span className="detail-metric-card__icon"><DownloadIcon className="button-icon" /></span>
              <div>
                <h2>Request Payout</h2>
                <p>Withdraw funds to your account</p>
              </div>
            </div>

            <label className="form-field">
              <span>Amount (GH₵)</span>
              <input onChange={(event) => setPayoutAmount(event.target.value)} value={payoutAmount} />
              <small>Available: {formatMoney(availableBalance)}</small>
            </label>

            <div className="payments-method-list">
              {payoutOptions.map((option) => (
                <button
                  key={option.id}
                  className={payoutMethod === option.id ? 'payments-method-card payments-method-card--active' : 'payments-method-card'}
                  onClick={() => selectPayoutMethod(option.id as PayoutMethod)}
                  type="button"
                >
                  <span className="payments-method-card__avatar">
                    <img alt="" className="payments-method-card__avatar-image" src={option.logo} />
                  </span>
                  <div>
                    <strong>{option.label}</strong>
                    <span>{option.helper}</span>
                  </div>
                  {payoutMethod === option.id ? <CheckIcon className="button-icon" /> : null}
                </button>
              ))}
            </div>

            <div className="payments-provider-grid" role="list" aria-label={payoutMethod === 'mobile-money' ? 'Select mobile money network' : 'Select bank'}>
              {visibleProviders.map((provider) => (
                <button
                  key={provider.id}
                  className={selectedProviderId === provider.id ? 'payments-provider-card payments-provider-card--active' : 'payments-provider-card'}
                  onClick={() => setSelectedProviderId(provider.id)}
                  type="button"
                >
                  <span className="payments-provider-card__logo">
                    <img alt="" className="payments-provider-card__logo-image" src={provider.logo} />
                  </span>
                  <span className="payments-provider-card__copy">
                    <strong>{provider.label}</strong>
                    <span>{provider.helper}</span>
                  </span>
                </button>
              ))}
            </div>

            <button className="page-primary-cta page-primary-cta--full" onClick={requestPayout} type="button">
              <span>Request Payout</span>
            </button>

            <div className="settings-note settings-note--compact">
              <TrendIcon className="button-icon" />
              <div>
                <strong>Payout Processing Time</strong>
                <p>MTN Mobile Money: 1-2 hours | Bank Transfer: 1-3 business days</p>
              </div>
            </div>
          </article>

          <article className="payments-card">
            <div className="payments-card__title">
              <span className="detail-metric-card__icon"><CardIcon className="button-icon" /></span>
              <div>
                <h2>Transfer to Promo Wallet</h2>
                <p>Use promo balance for event ads</p>
              </div>
            </div>

            <label className="form-field">
              <span>Transfer Amount (GH₵)</span>
              <input onChange={(event) => setWalletTransferAmount(event.target.value)} value={walletTransferAmount} />
              <small>Available: {formatMoney(availableBalance)}</small>
            </label>

            <button className="page-primary-cta page-primary-cta--full" onClick={transferToWallet} type="button">
              <span>Transfer to Wallet</span>
            </button>

            <div className="payments-feature-list">
              <span>Available Features</span>
              {availableFeatures.map((feature) => (
                <div key={feature.label}>
                  <div>
                    <strong>{feature.label}</strong>
                    <span>{feature.helper}</span>
                  </div>
                  <strong>{feature.value}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      {activeView === 'history' ? (
        <section className="table-shell finance-shell">
          <div className="finance-shell__toolbar">
            <label className="search-bar search-bar--compact">
              <SearchIcon className="search-bar__icon" />
              <input onChange={(event) => setSearch(event.target.value)} placeholder="Search payouts..." value={search} />
            </label>

            <div className="utility-page__actions">
              <div className="toolbar-dropdown">
                <button className="surface-button surface-button--slim" onClick={() => setIsFilterMenuOpen((open) => !open)} type="button">
                  <FilterIcon className="button-icon" />
                  <span>Filters</span>
                </button>
                {isFilterMenuOpen ? (
                  <div className="toolbar-dropdown__menu">
                    {(['all', 'Completed', 'Pending', 'Failed'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFilter(option)
                          setIsFilterMenuOpen(false)
                        }}
                        type="button"
                      >
                        {option === 'all' ? 'All statuses' : option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="toolbar-dropdown">
                <button className="page-primary-cta page-primary-cta--compact" onClick={() => setIsExportOpen((open) => !open)} type="button">
                  <DownloadIcon className="button-icon" />
                  <span>Export</span>
                </button>
                {isExportOpen ? (
                  <div className="toolbar-dropdown__menu">
                    <button onClick={() => exportTable('csv')} type="button">Export as CSV</button>
                    <button onClick={() => exportTable('pdf')} type="button">Export as PDF</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => {
                const status = formatPayoutStatus(payout.status)
                const statusClass =
                  status === 'Completed'
                    ? 'status-dot'
                    : status === 'Pending'
                      ? 'status-dot status-dot--pending'
                      : 'status-dot status-dot--danger'

                return (
                  <tr key={payout.id}>
                    <td>{formatPayoutCode(payout.id)}</td>
                    <td>{payout.requestedOn}</td>
                    <td>{formatMoney(payout.amount)}</td>
                    <td>{payout.method}</td>
                    <td>{payout.destination}</td>
                    <td>
                      <span className={statusClass} />
                      {status}
                    </td>
                    <td>{payout.reference}</td>
                    <td className="actions-cell">
                      <button className="icon-action-button" onClick={() => openDetails(payout)} type="button">
                        <DocumentIcon className="button-icon button-icon--muted" />
                      </button>
                      <button className="icon-action-button" onClick={() => navigator.clipboard.writeText(payout.reference)} type="button">
                        <CopyIcon className="button-icon button-icon--muted" />
                      </button>
                      <button className="icon-action-button" onClick={() => downloadFile(`${payout.id}.txt`, `${payout.beneficiary}\n${payout.reference}`, 'text/plain')} type="button">
                        <DownloadIcon className="button-icon button-icon--accent" />
                      </button>
                      <button className="icon-action-button" onClick={() => (window.location.href = `mailto:?subject=${encodeURIComponent('Payout update')}&body=${encodeURIComponent(payout.reference)}`)} type="button">
                        <MailIcon className="button-icon button-icon--accent" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="pager pager--compact">
            <span className="pager__summary">
              {filteredPayouts.length === 0
                ? 'Showing 0-0 of 0 payouts'
                : `Showing 1-${filteredPayouts.length} of ${filteredPayouts.length} payouts`}
            </span>
            <div className="pager__controls">
              <button type="button">‹</button>
              <button className="pager__page pager__page--active" type="button">1</button>
              <button type="button">›</button>
            </div>
          </div>
        </section>
      ) : null}

      {detailsText ? (
        <DashboardModal
          footer={<button className="page-primary-cta page-primary-cta--compact" onClick={() => setDetailsText(null)} type="button">Close</button>}
          onClose={() => setDetailsText(null)}
          title="Details"
        >
          <pre className="dashboard-modal__copy dashboard-modal__copy--pre">{detailsText}</pre>
        </DashboardModal>
      ) : null}
    </div>
  )
}
