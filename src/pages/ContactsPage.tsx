import { useEffect, useState } from 'react'

import {
  DocumentIcon,
  DownloadIcon,
  PaperPlaneIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  UsersIcon,
} from '../components/ui/Icons'
import { DashboardModal } from '../components/dashboard/Modal'
import { createContactId, readStoredContacts, type ContactRecord, type ContactSegment, writeStoredContacts } from '../lib/contacts'
import { isEmailValid, isNonEmpty, isPhoneValid } from '../lib/merchantSetup'

type ContactFilter = 'all' | 'VIP' | 'Regular' | 'recent'

type ContactFormState = {
  id?: string
  name: string
  email: string
  phone: string
  totalSpent: string
  segment: ContactSegment
  note: string
}

const pageSize = 5

function formatCurrency(amount: number) {
  return `GHC${amount.toFixed(2)}`
}

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
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

function buildCsv(contacts: ContactRecord[]) {
  const rows = contacts.map((contact) =>
    [contact.name, contact.email, contact.phone, contact.segment, contact.status, contact.totalSpent.toFixed(2)].join(','),
  )

  return ['Name,Email,Phone,Segment,Status,TotalSpent', ...rows].join('\n')
}

function emptyForm(): ContactFormState {
  return {
    name: '',
    email: '',
    phone: '',
    totalSpent: '0',
    segment: 'Regular',
    note: '',
  }
}

function formFromContact(contact: ContactRecord): ContactFormState {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    totalSpent: String(contact.totalSpent),
    segment: contact.segment,
    note: contact.note,
  }
}

export function ContactsPage() {
  const [contacts, setContacts] = useState<ContactRecord[]>(() => readStoredContacts())
  const [filter, setFilter] = useState<ContactFilter>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [form, setForm] = useState<ContactFormState>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null)

  useEffect(() => {
    writeStoredContacts(contacts)
  }, [contacts])

  const loweredSearch = search.trim().toLowerCase()
  const filteredContacts = contacts.filter((contact) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'recent'
          ? new Date(contact.updatedAt).getTime() >= new Date('2026-03-01').getTime()
          : contact.segment === filter
    const matchesSearch =
      loweredSearch.length === 0 ||
      [contact.name, contact.email, contact.phone].some((value) => value.toLowerCase().includes(loweredSearch))

    return matchesFilter && matchesSearch
  })

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const emailError =
    form.email.length > 0 && !isEmailValid(form.email) ? 'Enter a valid email address.' : ''
  const phoneError =
    form.phone.length > 0 && !isPhoneValid(form.phone) ? 'Use a valid Ghana phone number.' : ''
  const isFormValid =
    isNonEmpty(form.name) &&
    isEmailValid(form.email) &&
    isPhoneValid(form.phone) &&
    Number.isFinite(Number(form.totalSpent))

  function openAddModal() {
    setEditingId(null)
    setForm(emptyForm())
    setIsContactModalOpen(true)
  }

  function openEditModal(contact: ContactRecord) {
    setEditingId(contact.id)
    setForm(formFromContact(contact))
    setIsContactModalOpen(true)
  }

  function closeModal() {
    setIsContactModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  function saveContact() {
    if (!isFormValid) {
      return
    }

    const nextContact: ContactRecord = {
      id: editingId ?? createContactId(form.name),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      totalSpent: Number(form.totalSpent),
      status: 'Active',
      segment: form.segment,
      updatedAt: '2026-03-12',
      note: form.note.trim(),
    }

    setContacts((current) => {
      const index = current.findIndex((contact) => contact.id === nextContact.id)

      if (index === -1) {
        return [nextContact, ...current]
      }

      const updated = [...current]
      updated[index] = nextContact
      return updated
    })

    closeModal()
  }

  function exportContacts(format: 'csv' | 'pdf' | 'excel') {
    setIsExportOpen(false)

    if (format === 'csv') {
      downloadFile('contacts.csv', buildCsv(filteredContacts), 'text/csv;charset=utf-8')
      return
    }

    if (format === 'excel') {
      downloadFile('contacts.xls', buildCsv(filteredContacts), 'application/vnd.ms-excel')
      return
    }

    const lines = filteredContacts.map(
      (contact) => `${contact.name} | ${contact.email} | ${contact.phone} | ${formatCurrency(contact.totalSpent)}`,
    )
    downloadFile('contacts.pdf', lines.join('\n'), 'application/pdf')
  }

  return (
    <div className="dashboard-page dashboard-page--narrow utility-page">
      <section className="utility-page__header">
        <div>
          <h1>Contacts</h1>
          <p>Manage your attendees and customer base.</p>
        </div>

        <div className="utility-page__actions">
          <label className="search-bar search-bar--compact">
            <SearchIcon className="search-bar__icon" />
            <input
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search"
              value={search}
            />
          </label>

          <div className="toolbar-dropdown">
            <button className="surface-button surface-button--slim" onClick={() => setIsExportOpen((open) => !open)} type="button">
              <span>Export</span>
              <DownloadIcon className="button-icon" />
            </button>
            {isExportOpen ? (
              <div className="toolbar-dropdown__menu">
                <button onClick={() => exportContacts('csv')} type="button">Export as CSV</button>
                <button onClick={() => exportContacts('pdf')} type="button">Export as PDF</button>
                <button onClick={() => exportContacts('excel')} type="button">Export as Excel</button>
              </div>
            ) : null}
          </div>

          <button className="page-primary-cta page-primary-cta--compact" onClick={openAddModal} type="button">
            <PlusIcon className="button-icon" />
            <span>Add Contact</span>
          </button>
        </div>
      </section>

      <div className="segmented-control segmented-control--compact">
        {[
          ['all', 'All'],
          ['VIP', 'VIP'],
          ['Regular', 'Regular'],
          ['recent', 'Recent'],
        ].map(([value, label]) => (
          <button
            key={value}
            className={filter === value ? 'segmented-control__option segmented-control__option--active' : 'segmented-control__option'}
            onClick={() => {
              setFilter(value as ContactFilter)
              setPage(1)
            }}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <section className="table-shell utility-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Email</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageContacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <div className="person-cell">
                    <span className="avatar-chip">{initialsFromName(contact.name)}</span>
                    <div className="name-stack">
                      <strong>{contact.name}</strong>
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </td>
                <td>{contact.email}</td>
                <td>{formatCurrency(contact.totalSpent)}</td>
                <td>
                  <span className="status-dot" />
                  {contact.status}
                </td>
                <td className="actions-cell">
                  <button className="icon-action-button" onClick={() => openEditModal(contact)} type="button">
                    <PencilIcon className="button-icon button-icon--muted" />
                  </button>
                  <button className="icon-action-button" onClick={() => setSelectedContact(contact)} type="button">
                    <UsersIcon className="button-icon button-icon--muted" />
                  </button>
                  <button
                    className="icon-action-button"
                    onClick={() => downloadFile(`${contact.id}.csv`, buildCsv([contact]), 'text/csv;charset=utf-8')}
                    type="button"
                  >
                    <DocumentIcon className="button-icon button-icon--accent" />
                  </button>
                  <button className="icon-action-button" onClick={() => (window.location.href = `mailto:${contact.email}`)} type="button">
                    <PaperPlaneIcon className="button-icon button-icon--accent" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pager pager--compact">
          <span className="pager__summary">
            {filteredContacts.length === 0
              ? '0-0 of 0 contacts'
              : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredContacts.length)} of ${filteredContacts.length} contacts`}
          </span>
          <div className="pager__controls">
            <button disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">
              ‹
            </button>
            <button className="pager__page pager__page--active" type="button">
              {currentPage}
            </button>
            <button disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button">
              ›
            </button>
          </div>
          <div className="pager__size">
            <button type="button">5</button>
            <span>Items per page</span>
          </div>
        </div>
      </section>

      {isContactModalOpen ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={closeModal} type="button">
                Cancel
              </button>
              <button className="page-primary-cta page-primary-cta--compact" disabled={!isFormValid} onClick={saveContact} type="button">
                {editingId ? 'Save Changes' : 'Add Contact'}
              </button>
            </>
          }
          onClose={closeModal}
          title={editingId ? 'Edit Contact' : 'Add Contact'}
        >
          <div className="modal-form-grid">
            <label className="form-field">
              <span>Full Name</span>
              <input onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} value={form.name} />
            </label>
            <label className="form-field">
              <span>Email Address</span>
              <input onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} value={form.email} />
              {emailError ? <small className="field-error">{emailError}</small> : null}
            </label>
            <label className="form-field">
              <span>Phone Number</span>
              <input onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} value={form.phone} />
              {phoneError ? <small className="field-error">{phoneError}</small> : null}
            </label>
            <label className="form-field">
              <span>Total Spent (GHC)</span>
              <input onChange={(event) => setForm((current) => ({ ...current, totalSpent: event.target.value }))} value={form.totalSpent} />
            </label>
            <label className="form-field">
              <span>Contact Segment</span>
              <select onChange={(event) => setForm((current) => ({ ...current, segment: event.target.value as ContactSegment }))} value={form.segment}>
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
              </select>
            </label>
            <label className="form-field form-field--full">
              <span>Notes</span>
              <textarea onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} rows={3} value={form.note} />
            </label>
          </div>
        </DashboardModal>
      ) : null}

      {selectedContact ? (
        <DashboardModal
          footer={
            <button className="page-primary-cta page-primary-cta--compact" onClick={() => setSelectedContact(null)} type="button">
              Close
            </button>
          }
          onClose={() => setSelectedContact(null)}
          title={selectedContact.name}
        >
          <div className="detail-summary-card">
            <div>
              <span>Email</span>
              <strong>{selectedContact.email}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{selectedContact.phone}</strong>
            </div>
            <div>
              <span>Total Spent</span>
              <strong>{formatCurrency(selectedContact.totalSpent)}</strong>
            </div>
            <div>
              <span>Segment</span>
              <strong>{selectedContact.segment}</strong>
            </div>
            <div className="detail-summary-card__full">
              <span>Notes</span>
              <strong>{selectedContact.note || 'No notes yet.'}</strong>
            </div>
          </div>
        </DashboardModal>
      ) : null}
    </div>
  )
}
