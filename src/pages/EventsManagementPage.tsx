import { useDeferredValue, useEffect, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  ArrowRightIcon,
  CalendarIcon,
  DotMenuIcon,
  FilterIcon,
  GridViewIcon,
  ListViewIcon,
  MapPinIcon,
  PlusIcon,
  SearchIcon,
} from '../components/ui/Icons'
import {
  createEventId,
  formatEventDate,
  formatRecurringSummary,
  readStoredEvents,
  upsertStoredEvent,
  type StoredEvent,
} from '../lib/events'

type EventStatusFilter = 'All' | 'Live' | 'Draft' | 'Ended' | 'Cancelled'

function statusClass(value: string) {
  switch (value.toLowerCase()) {
    case 'live':
      return 'event-card__badge--live'
    case 'ended':
      return 'event-card__badge--ended'
    case 'draft':
      return 'event-card__badge--draft'
    case 'cancelled':
      return 'event-card__badge--cancelled'
    case 'paid':
      return 'event-card__badge--paid'
    case 'rsvp':
      return 'event-card__badge--rsvp'
    case 'free':
      return 'event-card__badge--free'
    case 'recurring':
      return 'event-card__badge--recurring'
    default:
      return ''
  }
}

export function EventsManagementPage() {
  const cards = readStoredEvents()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>('All')
  const [searchValue, setSearchValue] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const deferredSearch = useDeferredValue(searchValue.trim().toLowerCase())

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  function duplicateEvent(card: StoredEvent) {
    const duplicatedTitle = `${card.title} Copy`
    const timestamp = Date.now()

    upsertStoredEvent({
      ...card,
      id: createEventId(`${duplicatedTitle}-${timestamp}`),
      title: duplicatedTitle,
      status: 'Draft',
    })

    setOpenMenuId(null)
  }

  const filteredCards = cards.filter((card) => {
    const matchesStatus = statusFilter === 'All' || card.status === statusFilter
    const haystack = [
      card.title,
      formatEventDate(card.startDate),
      formatRecurringSummary(card),
      card.location,
      card.status,
      card.monetization,
      card.footerLabel,
      card.footerValue,
    ]
      .join(' ')
      .toLowerCase()
    const matchesSearch = deferredSearch.length === 0 || haystack.includes(deferredSearch)

    return matchesStatus && matchesSearch
  })

  return (
    <div className="dashboard-page">
      <section className="events-hero">
        <div>
          <h1 className="events-hero__title">Events Management</h1>
          <p className="events-hero__subtitle">
            View and manage all your events in one place.
          </p>
        </div>

        <Link className="page-primary-cta" to="/events/new">
          <PlusIcon className="button-icon" />
          <span>Create New Event</span>
        </Link>
      </section>

      <section className="events-toolbar">
        <div className="segmented-control">
          {(['All', 'Live', 'Draft', 'Ended', 'Cancelled'] as EventStatusFilter[]).map((item) => (
            <button
              key={item}
              className={`segmented-control__chip${
                statusFilter === item ? ' segmented-control__chip--active' : ''
              }`}
              onClick={() => setStatusFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="events-toolbar__actions">
          <label className="search-bar search-bar--events">
            <SearchIcon className="search-bar__icon" />
            <input
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search events..."
              value={searchValue}
            />
          </label>

          <div className="view-toggle">
            <button
              className={`view-toggle__button${viewMode === 'grid' ? ' view-toggle__button--active' : ''}`}
              onClick={() => setViewMode('grid')}
              type="button"
            >
              <GridViewIcon className="button-icon" />
            </button>
            <button
              className={`view-toggle__button${viewMode === 'list' ? ' view-toggle__button--active' : ''}`}
              onClick={() => setViewMode('list')}
              type="button"
            >
              <ListViewIcon className="button-icon" />
            </button>
          </div>

          <button className="surface-button surface-button--icon" type="button">
            <FilterIcon className="button-icon" />
          </button>
        </div>
      </section>

      <section className={`events-grid${viewMode === 'list' ? ' events-grid--list' : ''}`}>
        {filteredCards.map((card) => (
          <article key={card.id} className="event-card">
            <div className="event-card__header">
              <div className="event-card__badges">
                <span className={`event-card__badge ${statusClass(card.status)}`}>
                  {card.status}
                </span>
                <span className={`event-card__badge ${statusClass(card.monetization)}`}>
                  {card.monetization}
                </span>
                {card.scheduleType === 'recurring' ? (
                  <span className={`event-card__badge ${statusClass('recurring')}`}>
                    Recurring
                  </span>
                ) : null}
              </div>
              <div className="toolbar-dropdown event-card__menu" ref={openMenuId === card.id ? menuRef : null}>
                <button
                  aria-expanded={openMenuId === card.id}
                  aria-haspopup="menu"
                  className="icon-ghost-button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setOpenMenuId((current) => (current === card.id ? null : card.id))
                  }}
                  type="button"
                >
                  <DotMenuIcon className="button-icon" />
                </button>
                {openMenuId === card.id ? (
                  <div className="toolbar-dropdown__menu event-card__menu-panel" role="menu">
                    <button
                      onClick={() => {
                        navigate(`/events/${card.id}`)
                        setOpenMenuId(null)
                      }}
                      type="button"
                    >
                      Open Event
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/events/${card.id}/edit`)
                        setOpenMenuId(null)
                      }}
                      type="button"
                    >
                      Edit Event
                    </button>
                    <button onClick={() => duplicateEvent(card)} type="button">
                      Duplicate Event
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <Link className="event-card__body" to={`/events/${card.id}`}>
              <h2 className="event-card__title">{card.title}</h2>
              <div className="event-card__meta">
                <span>
                  <CalendarIcon className="meta-icon" />
                  {formatEventDate(card.startDate)}
                </span>
                <span>
                  <MapPinIcon className="meta-icon" />
                  {card.location}
                </span>
              </div>

              <div className="event-card__progress">
                <div className="event-card__progress-header">
                  <span>{card.progressLabel}</span>
                  <strong>{card.progressValue}</strong>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${card.progressRatio * 100}%` }} />
                </div>
              </div>

              <div className="event-card__footer">
                <div>
                  <span className="event-card__footer-label">{card.footerLabel}</span>
                  <strong className="event-card__footer-value">{card.footerValue}</strong>
                </div>
                <span className="event-card__launch">
                  <ArrowRightIcon className="button-icon" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
