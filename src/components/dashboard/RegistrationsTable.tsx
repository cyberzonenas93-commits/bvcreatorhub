import { useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { registrations, type Registration } from '../../data/dashboard'
import { ArrowRightIcon, PaperPlaneIcon, PencilIcon, SortArrowsIcon } from '../ui/Icons'

type SortKey = 'customer' | 'event' | 'tickets' | 'amount'

function sortRegistrations(items: Registration[], key: SortKey | null) {
  if (!key) {
    return [...items]
  }

  return [...items].sort((left, right) => {
    switch (key) {
      case 'tickets':
        return right.tickets - left.tickets
      case 'amount':
        return right.amount - left.amount
      default:
        return left[key].localeCompare(right[key])
    }
  })
}

function SortHeader({
  label,
  sortKey,
  activeKey,
  onClick,
}: {
  label: string
  sortKey: SortKey
  activeKey: SortKey | null
  onClick: (sortKey: SortKey) => void
}) {
  return (
    <button
      className={`registrations-table__sort${activeKey === sortKey ? ' registrations-table__sort--active' : ''}`}
      onClick={() => onClick(sortKey)}
      type="button"
    >
      <span>{label}</span>
      <SortArrowsIcon className="registrations-table__sort-icon" />
    </button>
  )
}

export function RegistrationsTable() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)

  const sortedRegistrations = useMemo(() => sortRegistrations(registrations, sortKey), [sortKey])

  function handleSort(nextSortKey: SortKey) {
    setSortKey((current) => (current === nextSortKey ? null : nextSortKey))
  }

  return (
    <section className="table-card" aria-labelledby="registrations-title">
      <div className="table-card__header">
        <h2 id="registrations-title" className="section-title">
          Recent Registrations
        </h2>
        <Link className="table-card__link" to="/contacts">
          <span>View All</span>
          <ArrowRightIcon className="table-card__link-icon" aria-hidden="true" />
        </Link>
      </div>

      <div className="registrations-table__mobile-sort" aria-label="Sort recent registrations">
        <SortHeader activeKey={sortKey} label="Customer" onClick={handleSort} sortKey="customer" />
        <SortHeader activeKey={sortKey} label="Event" onClick={handleSort} sortKey="event" />
        <SortHeader activeKey={sortKey} label="Tickets" onClick={handleSort} sortKey="tickets" />
        <SortHeader activeKey={sortKey} label="Amount" onClick={handleSort} sortKey="amount" />
      </div>

      <div className="table-scroll">
        <table className="registrations-table">
          <thead>
            <tr>
              <th>
                <SortHeader activeKey={sortKey} label="Customer" onClick={handleSort} sortKey="customer" />
              </th>
              <th>
                <SortHeader activeKey={sortKey} label="Event" onClick={handleSort} sortKey="event" />
              </th>
              <th>
                <SortHeader activeKey={sortKey} label="Tickets" onClick={handleSort} sortKey="tickets" />
              </th>
              <th>
                <SortHeader activeKey={sortKey} label="Amount" onClick={handleSort} sortKey="amount" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRegistrations.map((registration) => (
              <tr key={`${registration.customer}-${registration.date}`}>
                <td data-label="Customer">
                  <div className="customer-cell">
                    <span className="customer-cell__avatar">{registration.initials}</span>
                    <span className="customer-cell__name">{registration.customer}</span>
                  </div>
                </td>
                <td data-label="Event">{registration.event}</td>
                <td data-label="Tickets">{registration.tickets}</td>
                <td className="registrations-table__amount" data-label="Amount">
                  {registration.amountLabel}
                </td>
                <td className="actions-cell" data-label="Actions">
                  <Link className="icon-action-button" to={`/events/${registration.eventId}/${registration.tab}`}>
                    <PencilIcon className="button-icon button-icon--muted" />
                  </Link>
                  <a className="icon-action-button" href={`mailto:${registration.contactEmail}`}>
                    <PaperPlaneIcon className="button-icon button-icon--accent" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
