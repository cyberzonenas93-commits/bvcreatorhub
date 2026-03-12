import { useEffect, useState } from 'react'

import { DashboardModal } from '../components/dashboard/Modal'
import {
  CopyIcon,
  DocumentIcon,
  DownloadIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
} from '../components/ui/Icons'
import { readStoredPayments, type PayoutRecord, type TransactionRecord, writeStoredPayments } from '../lib/payments'

type FinanceTab = 'transactions' | 'payouts'
type FinanceFilter = 'all' | 'Completed' | 'Pending' | 'Failed' | 'Processing' | 'Paid'

type PayoutFormState = {
  beneficiary: string
  method: string
  amount: string
}

function formatMoney(amount: number) {
  return `GH₵${amount.toLocaleString('en-US', { minimumFractionDigits: amount % 1 === 0 ? 0 : 1, maximumFractionDigits: 1 })}`
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

function emptyPayoutForm(): PayoutFormState {
  return {
    beneficiary: 'MTN Mobile Money',
    method: 'Mobile Money',
    amount: '5000',
  }
}

export function PaymentsPayoutsPage() {
  const [payments, setPayments] = useState(() => readStoredPayments())
  const [activeTab, setActiveTab] = useState<FinanceTab>('transactions')
  const [filter, setFilter] = useState<FinanceFilter>('all')
  const [search, setSearch] = useState('')
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isPayoutOpen, setIsPayoutOpen] = useState(false)
  const [payoutForm, setPayoutForm] = useState<PayoutFormState>(emptyPayoutForm)
  const [detailsText, setDetailsText] = useState<string | null>(null)

  useEffect(() => {
    writeStoredPayments(payments)
  }, [payments])

  const loweredSearch = search.trim().toLowerCase()
  const completedRevenue = payments.transactions
    .filter((transaction) => transaction.status === 'Completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalRevenue = completedRevenue + 98580.5
  const availableBalance =
    totalRevenue -
    payments.payouts.filter((payout) => payout.status !== 'Failed').reduce((sum, payout) => sum + payout.amount, 0)
  const promoWallet = 3200

  const filteredTransactions = payments.transactions.filter((transaction) => {
    const matchesFilter = filter === 'all' ? true : transaction.status === filter
    const matchesSearch =
      loweredSearch.length === 0 ||
      [transaction.title, transaction.category, transaction.reference].some((value) => value.toLowerCase().includes(loweredSearch))

    return matchesFilter && matchesSearch
  })

  const filteredPayouts = payments.payouts.filter((payout) => {
    const matchesFilter = filter === 'all' ? true : payout.status === filter
    const matchesSearch =
      loweredSearch.length === 0 ||
      [payout.beneficiary, payout.method, payout.reference].some((value) => value.toLowerCase().includes(loweredSearch))

    return matchesFilter && matchesSearch
  })

  function exportTable(type: 'csv' | 'pdf') {
    setIsExportOpen(false)
    const rows =
      activeTab === 'transactions'
        ? filteredTransactions.map((item) => `${item.title},${item.category},${item.date},${item.status},${item.amount},${item.reference}`)
        : filteredPayouts.map((item) => `${item.beneficiary},${item.method},${item.requestedOn},${item.status},${item.amount},${item.reference}`)

    downloadFile(
      activeTab === 'transactions' ? `transactions.${type === 'csv' ? 'csv' : 'pdf'}` : `payouts.${type === 'csv' ? 'csv' : 'pdf'}`,
      rows.join('\n'),
      type === 'csv' ? 'text/csv;charset=utf-8' : 'application/pdf',
    )
  }

  function openDetails(item: TransactionRecord | PayoutRecord) {
    const label = 'title' in item ? item.title : item.beneficiary
    setDetailsText(`${label}\nReference: ${item.reference}\nAmount: ${formatMoney(item.amount)}\nStatus: ${item.status}`)
  }

  function createPayout() {
    const amount = Number(payoutForm.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      return
    }

    const nextPayout: PayoutRecord = {
      id: `pay-${Date.now()}`,
      beneficiary: payoutForm.beneficiary,
      method: payoutForm.method,
      requestedOn: '12 Mar, 2026',
      status: 'Processing',
      amount,
      reference: `PAYOUT-${Date.now()}`,
    }

    setPayments((current) => ({
      ...current,
      payouts: [nextPayout, ...current.payouts],
    }))
    setIsPayoutOpen(false)
    setPayoutForm(emptyPayoutForm())
    setActiveTab('payouts')
  }

  const filters =
    activeTab === 'transactions'
      ? (['all', 'Completed', 'Pending', 'Failed'] as FinanceFilter[])
      : (['all', 'Processing', 'Paid', 'Failed'] as FinanceFilter[])

  return (
    <div className="dashboard-page dashboard-page--narrow utility-page">
      <section className="utility-page__header">
        <div>
          <h1>Payments &amp; Payouts</h1>
          <p>Manage your earnings, payouts, and transaction history.</p>
        </div>
      </section>

      <section className="affiliate-metrics">
        <article className="detail-metric-card">
          <span className="detail-metric-card__label">Total Revenue</span>
          <strong className="detail-metric-card__value">{formatMoney(totalRevenue)}</strong>
        </article>
        <article className="detail-metric-card">
          <span className="detail-metric-card__label">Available Balance</span>
          <strong className="detail-metric-card__value">{formatMoney(availableBalance)}</strong>
        </article>
        <article className="detail-metric-card">
          <span className="detail-metric-card__label">Promo Wallet</span>
          <strong className="detail-metric-card__value">GH₵{promoWallet.toLocaleString('en-US')}</strong>
        </article>
      </section>

      <section className="table-shell finance-shell">
        <div className="finance-shell__tabs">
          <button
            className={activeTab === 'transactions' ? 'finance-shell__tab finance-shell__tab--active' : 'finance-shell__tab'}
            onClick={() => {
              setActiveTab('transactions')
              setFilter('all')
            }}
            type="button"
          >
            Transactions
          </button>
          <button
            className={activeTab === 'payouts' ? 'finance-shell__tab finance-shell__tab--active' : 'finance-shell__tab'}
            onClick={() => {
              setActiveTab('payouts')
              setFilter('all')
            }}
            type="button"
          >
            Payouts
          </button>
        </div>

        <div className="finance-shell__toolbar">
          <div className="segmented-control segmented-control--compact">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? 'segmented-control__option segmented-control__option--active' : 'segmented-control__option'}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="utility-page__actions">
            <label className="search-bar search-bar--compact">
              <SearchIcon className="search-bar__icon" />
              <input onChange={(event) => setSearch(event.target.value)} placeholder="Search" value={search} />
            </label>

            <div className="toolbar-dropdown">
              <button className="surface-button surface-button--slim" onClick={() => setIsExportOpen((open) => !open)} type="button">
                <span>Export</span>
                <DownloadIcon className="button-icon" />
              </button>
              {isExportOpen ? (
                <div className="toolbar-dropdown__menu">
                  <button onClick={() => exportTable('csv')} type="button">Export as CSV</button>
                  <button onClick={() => exportTable('pdf')} type="button">Export as PDF</button>
                </div>
              ) : null}
            </div>

            <button className="page-primary-cta page-primary-cta--compact" onClick={() => setIsPayoutOpen(true)} type="button">
              <PlusIcon className="button-icon" />
              <span>Create payout</span>
            </button>
          </div>
        </div>

        {activeTab === 'transactions' ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.date}</td>
                  <td><span className="status-dot" />{transaction.status}</td>
                  <td>{formatMoney(transaction.amount)}</td>
                  <td>{transaction.reference}</td>
                  <td className="actions-cell">
                    <button className="icon-action-button" onClick={() => openDetails(transaction)} type="button">
                      <DocumentIcon className="button-icon button-icon--muted" />
                    </button>
                    <button className="icon-action-button" onClick={() => navigator.clipboard.writeText(transaction.reference)} type="button">
                      <CopyIcon className="button-icon button-icon--muted" />
                    </button>
                    <button className="icon-action-button" onClick={() => downloadFile(`${transaction.id}.txt`, `${transaction.title}\n${transaction.reference}`, 'text/plain')} type="button">
                      <DownloadIcon className="button-icon button-icon--accent" />
                    </button>
                    <button className="icon-action-button" onClick={() => (window.location.href = `mailto:?subject=${encodeURIComponent(transaction.title)}&body=${encodeURIComponent(transaction.reference)}`)} type="button">
                      <MailIcon className="button-icon button-icon--accent" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Beneficiary</th>
                <th>Method</th>
                <th>Requested</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr key={payout.id}>
                  <td>{payout.beneficiary}</td>
                  <td>{payout.method}</td>
                  <td>{payout.requestedOn}</td>
                  <td><span className="status-dot" />{payout.status}</td>
                  <td>{formatMoney(payout.amount)}</td>
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
              ))}
            </tbody>
          </table>
        )}

        <div className="pager pager--compact">
          <span className="pager__summary">
            {activeTab === 'transactions'
              ? `Showing 1 to ${filteredTransactions.length} of ${filteredTransactions.length} entries`
              : `Showing 1 to ${filteredPayouts.length} of ${filteredPayouts.length} entries`}
          </span>
          <div className="pager__controls">
            <button type="button">‹</button>
            <button className="pager__page pager__page--active" type="button">1</button>
            <button type="button">›</button>
          </div>
        </div>
      </section>

      {isPayoutOpen ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={() => setIsPayoutOpen(false)} type="button">
                Cancel
              </button>
              <button className="page-primary-cta page-primary-cta--compact" onClick={createPayout} type="button">
                Create payout
              </button>
            </>
          }
          onClose={() => setIsPayoutOpen(false)}
          title="Create payout"
        >
          <div className="modal-form-grid">
            <label className="form-field">
              <span>Beneficiary</span>
              <input onChange={(event) => setPayoutForm((current) => ({ ...current, beneficiary: event.target.value }))} value={payoutForm.beneficiary} />
            </label>
            <label className="form-field">
              <span>Method</span>
              <select onChange={(event) => setPayoutForm((current) => ({ ...current, method: event.target.value }))} value={payoutForm.method}>
                <option>Mobile Money</option>
                <option>Bank Transfer</option>
              </select>
            </label>
            <label className="form-field form-field--full">
              <span>Amount</span>
              <input onChange={(event) => setPayoutForm((current) => ({ ...current, amount: event.target.value }))} value={payoutForm.amount} />
            </label>
          </div>
        </DashboardModal>
      ) : null}

      {detailsText ? (
        <DashboardModal
          footer={<button className="page-primary-cta page-primary-cta--compact" onClick={() => setDetailsText(null)} type="button">Close</button>}
          onClose={() => setDetailsText(null)}
          title="Details"
        >
          <pre className="dashboard-pre">{detailsText}</pre>
        </DashboardModal>
      ) : null}
    </div>
  )
}
