import { useDeferredValue, useState } from 'react'

import { Link } from 'react-router-dom'

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

type EventCard = {
  title: string
  slug: string
  date: string
  location: string
  status: string
  monetization: string
  progressLabel: string
  progressValue: string
  progressRatio: number
  footerLabel: string
  footerValue: string
}

type EventStatusFilter = 'All' | 'Live' | 'Draft' | 'Ended' | 'Cancelled'

const cards: EventCard[] = [
  {
    title: 'Afrochella 2026',
    slug: 'afrochella-2026',
    date: 'Dec 28, 2026',
    location: 'El Wak Stadium, Accra',
    status: 'Live',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '1450 / 3000',
    progressRatio: 0.49,
    footerLabel: 'Revenue',
    footerValue: 'GHC435,000',
  },
  {
    title: 'Ghana Tech Summit 2026',
    slug: 'ghana-tech-summit-2026',
    date: 'Aug 22, 2026',
    location: 'Accra International Conference Centre',
    status: 'Live',
    monetization: 'RSVP',
    progressLabel: 'Registration Progress',
    progressValue: '320 / 500',
    progressRatio: 0.64,
    footerLabel: 'Waitlist',
    footerValue: '320 People',
  },
  {
    title: 'Chale Wote Street Art Festival',
    slug: 'chale-wote-street-art-festival',
    date: 'Aug 20, 2026',
    location: 'Jamestown, Accra',
    status: 'Live',
    monetization: 'Free',
    progressLabel: 'Registration Progress',
    progressValue: '185 / 500',
    progressRatio: 0.37,
    footerLabel: 'Registrations',
    footerValue: '185 People',
  },
  {
    title: 'Detty December Concert',
    slug: 'detty-december-concert',
    date: 'Dec 22, 2025',
    location: 'Labadi Beach Hotel, Accra',
    status: 'Ended',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '800 / 800',
    progressRatio: 1,
    footerLabel: 'Revenue',
    footerValue: 'GHC192,000',
  },
  {
    title: 'Panafest 2026',
    slug: 'panafest-2026',
    date: 'Jul 25, 2026',
    location: 'Cape Coast Castle, Cape Coast',
    status: 'Draft',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '0 / 400',
    progressRatio: 0.01,
    footerLabel: 'Revenue',
    footerValue: 'GHC0',
  },
  {
    title: 'Homowo Festival Concert',
    slug: 'homowo-festival-concert',
    date: 'Sep 10, 2026',
    location: 'Black Star Square, Accra',
    status: 'Cancelled',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '150 / 1000',
    progressRatio: 0.15,
    footerLabel: 'Revenue',
    footerValue: 'GHC45,000',
  },
]

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
    default:
      return ''
  }
}

export function EventsManagementPage() {
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>('All')
  const [searchValue, setSearchValue] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const deferredSearch = useDeferredValue(searchValue.trim().toLowerCase())

  const filteredCards = cards.filter((card) => {
    const matchesStatus = statusFilter === 'All' || card.status === statusFilter
    const haystack = [
      card.title,
      card.date,
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
          <article key={card.title} className="event-card">
            <div className="event-card__header">
              <div className="event-card__badges">
                <span className={`event-card__badge ${statusClass(card.status)}`}>
                  {card.status}
                </span>
                <span className={`event-card__badge ${statusClass(card.monetization)}`}>
                  {card.monetization}
                </span>
              </div>
              <button className="icon-ghost-button" type="button">
                <DotMenuIcon className="button-icon" />
              </button>
            </div>

            <Link className="event-card__body" to={`/events/${card.slug}`}>
              <h2 className="event-card__title">{card.title}</h2>
              <div className="event-card__meta">
                <span>
                  <CalendarIcon className="meta-icon" />
                  {card.date}
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
