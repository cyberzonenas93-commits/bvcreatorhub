import { useDeferredValue, useState } from 'react'
import type { ReactNode } from 'react'

import { Link, NavLink, Navigate, useParams } from 'react-router-dom'

import { DashboardModal } from '../components/dashboard/Modal'
import {
  ArrowLeftIcon,
  BanIcon,
  CalendarIcon,
  CardIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ClockIcon,
  DocumentIcon,
  DollarIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  MailIcon,
  MapPinIcon,
  PaperPlaneIcon,
  PencilIcon,
  PlusIcon,
  QrIcon,
  RefreshIcon,
  SearchIcon,
  ShareIcon,
  ShieldCheckIcon,
  TagIcon,
  TicketIcon,
  TrendIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from '../components/ui/Icons'
import {
  formatEventDate,
  formatRecurringSummary,
  getStoredEvent,
  type EventStatus,
  type StoredEvent,
} from '../lib/events'

type EventId = string

type EventShell = {
  tabs: string[]
}

const eventShells: Record<string, EventShell> = {
  'afrochella-2026': {
    tabs: ['overview', 'orders', 'attendees', 'tickets', 'waitlist', 'check-in'],
  },
  'ghana-tech-summit-2026': {
    tabs: ['overview', 'guestlist', 'capacity', 'waitlist', 'check-in'],
  },
  'chale-wote-street-art-festival': {
    tabs: ['overview', 'guestlist'],
  },
  'detty-december-concert': {
    tabs: ['overview'],
  },
  'panafest-2026': {
    tabs: ['overview'],
  },
  'homowo-festival-concert': {
    tabs: ['overview'],
  },
}

const tabLabels: Record<string, string> = {
  overview: 'Overview',
  orders: 'Orders',
  attendees: 'Attendees',
  tickets: 'Tickets',
  waitlist: 'Waitlist',
  'check-in': 'Check-In',
  guestlist: 'Guestlist',
  capacity: 'Capacity',
}

type SearchControls = {
  query: string
  searchValue: string
  onSearchChange: (value: string) => void
}

type DetailEvent = {
  title: string
  date: string
  location: string
  scheduleSummary: string | null
  status: EventStatus
  tabs: string[]
}

function getTabsForEvent(storedEvent: StoredEvent, eventId: string) {
  const configuredTabs = eventShells[eventId]?.tabs

  if (configuredTabs) {
    return configuredTabs
  }

  if (storedEvent.eventType === 'paid') {
    return ['overview', 'orders', 'attendees', 'tickets', 'waitlist', 'check-in']
  }

  if (storedEvent.eventType === 'rsvp') {
    return ['overview', 'guestlist', 'capacity', 'waitlist', 'check-in']
  }

  return ['overview', 'guestlist']
}

function buildDetailEvent(storedEvent: StoredEvent, eventId: string): DetailEvent {
  return {
    title: storedEvent.title,
    date: formatEventDate(storedEvent.startDate),
    location: storedEvent.location,
    scheduleSummary:
      storedEvent.scheduleType === 'recurring' ? formatRecurringSummary(storedEvent) : null,
    status: storedEvent.status,
    tabs: getTabsForEvent(storedEvent, eventId),
  }
}

function formatStatusLabel(status: EventStatus) {
  return status === 'Live' ? 'Live now' : status
}

function normalizeEventTab(tab: string | undefined) {
  if (tab === 'dashboard') {
    return 'overview'
  }

  return tab
}

function matchesQuery(query: string, values: Array<string | number | undefined>) {
  if (query.length === 0) {
    return true
  }

  return values.some((value) => String(value ?? '').toLowerCase().includes(query))
}

function formatPagerLabel(count: number, noun: string) {
  if (count <= 0) {
    return `0 of 0 ${noun}`
  }

  const leading = String(count).padStart(2, '0')
  return `1-${leading} of ${count} ${noun}`
}

function ActionButton({
  icon,
  children,
  className = '',
  to,
  onClick,
}: {
  icon: ReactNode
  children: ReactNode
  className?: string
  to?: string
  onClick?: () => void
}) {
  const classes = `surface-button surface-button--detail ${className}`.trim()

  if (to) {
    return (
      <Link className={classes} to={to}>
        {icon}
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {icon}
      <span>{children}</span>
    </button>
  )
}

function DetailShell({
  eventId,
  event,
  tab,
  children,
  onInvite,
  onPromote,
  onAssignPromoters,
}: {
  eventId: EventId
  event: DetailEvent
  tab: string
  children: ReactNode
  onInvite: () => void
  onPromote: () => void
  onAssignPromoters: () => void
}) {
  return (
    <div className="dashboard-page detail-page">
      <section className="detail-hero">
        <div className="detail-hero__left">
          <Link className="back-link" to="/events">
            <ArrowLeftIcon className="button-icon" />
            <span>Back to Events</span>
          </Link>

          <div className="detail-hero__title-row">
            <div>
              <h1>{event.title}</h1>
              <div className="detail-hero__meta">
                <span>
                  <CalendarIcon className="meta-icon" />
                  {event.date}
                </span>
                <span className="detail-hero__dot" />
                <span>
                  <MapPinIcon className="meta-icon" />
                  {event.location}
                </span>
                {event.scheduleSummary ? (
                  <>
                    <span className="detail-hero__dot" />
                    <span>{event.scheduleSummary}</span>
                  </>
                ) : null}
              </div>
            </div>
            <span className="live-badge">{formatStatusLabel(event.status)}</span>
          </div>
        </div>

        <div className="detail-hero__actions">
          <ActionButton icon={<PlusIcon className="button-icon" />} to={`/events/${eventId}/edit`}>
            Edit Event
          </ActionButton>
          <ActionButton icon={<UserPlusIcon className="button-icon" />} onClick={onInvite}>Invite</ActionButton>
          <ActionButton icon={<ShareIcon className="button-icon" />} onClick={onPromote}>Promote</ActionButton>
          <ActionButton icon={<UsersIcon className="button-icon" />} onClick={onAssignPromoters}>Assign Promoters</ActionButton>
        </div>
      </section>

      <nav className="detail-tabs" aria-label="Event tabs">
        {event.tabs.map((item) => (
          <NavLink
            key={item}
            className={`detail-tabs__link${tab === item ? ' detail-tabs__link--active' : ''}`}
            to={`/events/${eventId}/${item}`}
          >
            {tabLabels[item]}
          </NavLink>
        ))}
      </nav>

      {children}
    </div>
  )
}

function MetricsRow({
  items,
}: {
  items: Array<{ icon: ReactNode; label: string; value: string; delta?: string; tone?: string }>
}) {
  return (
    <section className="detail-metrics">
      {items.map((item) => (
        <article key={item.label} className="detail-metric-card">
          <div className="detail-metric-card__topline">
            <span className="detail-metric-card__icon">{item.icon}</span>
            {item.delta ? (
              <span className={`delta-chip delta-chip--${item.tone ?? 'accent'}`}>{item.delta}</span>
            ) : null}
          </div>
          <span className="detail-metric-card__label">{item.label}</span>
          <strong className="detail-metric-card__value">{item.value}</strong>
        </article>
      ))}
    </section>
  )
}

function TrendPanel({
  title,
  bars,
  summaries,
}: {
  title: string
  bars: Array<{ label: string; value: number; tone: string }>
  summaries: Array<{ label: string; value: string; footer: string; ratio: string; sub?: string }>
}) {
  return (
    <div className="trend-panel">
      <h2 className="trend-panel__title">{title}</h2>

      <div className="trend-panel__bars">
        {bars.map((bar) => (
          <div key={bar.label} className="trend-bar">
            <span className="trend-bar__label">{bar.label}</span>
            <div className="trend-bar__track">
              <span className={`trend-bar__fill trend-bar__fill--${bar.tone}`} style={{ width: `${bar.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="trend-summary">
        {summaries.map((item) => (
          <div key={item.label} className="trend-summary__item">
            <span className="trend-summary__label">{item.label}</span>
            <strong className="trend-summary__value">{item.value}</strong>
            <div className="trend-summary__meta">
              <span className="trend-summary__progress">
                <span style={{ width: item.ratio }} />
              </span>
              <span>{item.ratio}</span>
            </div>
            <small>{item.footer}</small>
            {item.sub ? <span className="trend-summary__sub">{item.sub}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function TrackingCard({
  centerLabel,
  stats,
  buttonLabel,
  extraCard,
}: {
  centerLabel: string
  stats: Array<{ label: string; value: string; accent?: boolean }>
  buttonLabel: string
  extraCard?: ReactNode
}) {
  return (
    <div className="overview-side">
      <section className="tracking-card">
        <h2>Attendee Tracking</h2>
        <div className="tracking-donut">
          <div className="tracking-donut__ring" />
          <div className="tracking-donut__center">
            <strong>84%</strong>
            <span>{centerLabel}</span>
          </div>
        </div>

        <dl className="tracking-stats">
          {stats.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd className={item.accent ? 'text-accent' : undefined}>{item.value}</dd>
            </div>
          ))}
        </dl>

        <button className="panel-primary-button" type="button">
          {buttonLabel}
        </button>
      </section>

      {extraCard}
    </div>
  )
}

function SearchToolbar({
  placeholder,
  actions,
  value,
  onChange,
}: {
  placeholder: string
  actions?: ReactNode
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="detail-toolbar">
      <label className="search-bar">
        <SearchIcon className="search-bar__icon" />
        <input onChange={(event) => onChange(event.target.value)} placeholder={placeholder} value={value} />
      </label>
      {actions ? <div className="detail-toolbar__actions">{actions}</div> : null}
    </div>
  )
}

function Pager({ label }: { label: string }) {
  return (
    <div className="pager">
      <span className="pager__summary">{label}</span>
      <div className="pager__controls">
        <button type="button">
          <ChevronsLeftIcon className="button-icon" />
        </button>
        <button type="button">
          <ChevronLeftIcon className="button-icon" />
        </button>
        <button className="pager__page pager__page--active" type="button">
          1
        </button>
        <button className="pager__page" type="button">
          2
        </button>
        <button className="pager__page" type="button">
          3
        </button>
        <button className="pager__page" type="button">
          4
        </button>
        <button className="pager__page" type="button">
          5
        </button>
        <button type="button">
          <ChevronRightIcon className="button-icon" />
        </button>
        <button type="button">
          <ChevronsRightIcon className="button-icon" />
        </button>
      </div>
      <div className="pager__size">
        <button type="button">5</button>
        <span>Items per page</span>
      </div>
    </div>
  )
}

function renderOverview(eventId: EventId) {
  const config =
    eventId === 'afrochella-2026'
      ? {
          metrics: [
            { icon: <DollarIcon className="button-icon" />, label: 'Total Revenue', value: 'GHC180,000', delta: '12%', tone: 'accent' },
            { icon: <TicketIcon className="button-icon" />, label: 'Tickets Sold', value: '380 / 450', delta: '8%', tone: 'accent' },
            { icon: <EyeIcon className="button-icon" />, label: 'Page Views', value: '2,840', delta: '-4%', tone: 'danger' },
            { icon: <CheckIcon className="button-icon" />, label: 'Check-ins', value: '0 / 380', delta: '0%', tone: 'accent' },
          ],
          panelTitle: 'Ticket Performance',
          bars: [
            { label: 'Early Bird', value: 36, tone: 'accent' },
            { label: 'General Admission', value: 88, tone: 'light' },
            { label: 'VIP Experience', value: 13, tone: 'muted' },
          ],
          summaries: [
            { label: 'Early Bird', value: 'GHC75,000', ratio: '100%', footer: '500 / 500 sold', sub: '+38 waitlisted • Closed' },
            { label: 'General Admission', value: 'GHC373,500', ratio: '62%', footer: '1245 / 2000 sold', sub: '234 days left' },
            { label: 'VIP Experience', value: 'GHC144,000', ratio: '90%', footer: '180 / 200 sold', sub: '+12 waitlisted • 234 days left' },
          ],
          tracking: {
            centerLabel: 'Sold Out',
            stats: [
              { label: 'Total Capacity', value: '450' },
              { label: 'Expected Attendees', value: '380' },
              { label: 'Refund Policy Active', value: 'Yes', accent: true },
            ],
            buttonLabel: 'Manage Guestlist',
            extraCard: (
              <section className="quick-card quick-card--premium">
                <h2>EventShield Premium</h2>
                <p>Your event is fully protected. Weather and cancellation coverage is currently active.</p>
                <button className="quick-card__button quick-card__button--dark" type="button">
                  <span>Manage Policy</span>
                </button>
              </section>
            ),
          },
        }
      : eventId === 'chale-wote-street-art-festival'
        ? {
            metrics: [
              { icon: <EyeIcon className="button-icon" />, label: 'Page Views', value: '2,840', delta: '-4%', tone: 'danger' },
              { icon: <UsersIcon className="button-icon" />, label: 'Registrations', value: '380 / 450', delta: '8%', tone: 'accent' },
              { icon: <UsersIcon className="button-icon" />, label: 'Waitlist Active', value: '12', delta: '5%', tone: 'accent' },
              { icon: <CheckIcon className="button-icon" />, label: 'Check-ins', value: '0 / 380', delta: '0%', tone: 'accent' },
            ],
            panelTitle: 'Registration Trends',
            bars: [
              { label: 'Main Stage', value: 85, tone: 'accent' },
              { label: 'Workshop A', value: 5, tone: 'light' },
              { label: 'Workshop B', value: 3, tone: 'muted' },
            ],
            summaries: [
              { label: 'Main Stage', value: '850 of 1000 Registered', ratio: '85%', footer: '150 spots remaining' },
              { label: 'Workshop A', value: '45 of 50 Registered', ratio: '90%', footer: '+12 on waitlist' },
              { label: 'Workshop B', value: '30 of 50 Registered', ratio: '60%', footer: '+5 on waitlist' },
            ],
            tracking: {
              centerLabel: 'Capacity',
              stats: [
                { label: 'Total Capacity', value: '450' },
                { label: 'Expected Attendees', value: '380' },
                { label: 'Auto-Confirm Active', value: 'Yes', accent: true },
              ],
              buttonLabel: 'View Guestlist',
              extraCard: (
                <section className="quick-card">
                  <h2>Quick Invite</h2>
                  <p>Send a direct registration link to your VIP guests or speakers.</p>
                  <button className="quick-card__button" type="button">
                    <ShareIcon className="button-icon" />
                    <span>Share Link</span>
                  </button>
                </section>
              ),
            },
          }
        : {
            metrics: [
              { icon: <EyeIcon className="button-icon" />, label: 'Page Views', value: '2,840', delta: '-4%', tone: 'danger' },
              { icon: <UsersIcon className="button-icon" />, label: 'Registrations', value: '380 / 450', delta: '8%', tone: 'accent' },
              { icon: <UsersIcon className="button-icon" />, label: 'Waitlist Active', value: '12', delta: '5%', tone: 'accent' },
              { icon: <CheckIcon className="button-icon" />, label: 'Check-ins', value: '0 / 380', delta: '0%', tone: 'accent' },
            ],
            panelTitle: 'Registration Trends',
            bars: [
              { label: 'General RSVP', value: 100, tone: 'accent' },
              { label: 'VIP/Press', value: 12, tone: 'light' },
              { label: 'Staff/Crew', value: 7, tone: 'muted' },
            ],
            summaries: [
              { label: 'General RSVP', value: '380 of 500 Confirmed', ratio: '76%', footer: '+45 on waitlist' },
              { label: 'VIP/Press', value: '45 of 50 Confirmed', ratio: '90%', footer: '5 spots open' },
              { label: 'Staff/Crew', value: '25 of 30 Confirmed', ratio: '83%', footer: '5 spots open' },
            ],
            tracking: {
              centerLabel: 'Capacity',
              stats: [
                { label: 'Total Capacity', value: '450' },
                { label: 'Expected Attendees', value: '380' },
                { label: 'Auto-Confirm Active', value: 'Yes', accent: true },
              ],
              buttonLabel: 'View Guestlist',
              extraCard: (
                <section className="quick-card">
                  <h2>Quick Invite</h2>
                  <p>Send a direct registration link to your VIP guests or speakers.</p>
                  <button className="quick-card__button" type="button">
                    <ShareIcon className="button-icon" />
                    <span>Share Link</span>
                  </button>
                </section>
              ),
            },
          }

  return (
    <>
      <MetricsRow items={config.metrics} />
      <section className="overview-grid">
        <TrendPanel title={config.panelTitle} bars={config.bars} summaries={config.summaries} />
        <TrackingCard
          centerLabel={config.tracking.centerLabel}
          stats={config.tracking.stats}
          buttonLabel={config.tracking.buttonLabel}
          extraCard={config.tracking.extraCard}
        />
      </section>
    </>
  )
}

function renderGuestlist(search: SearchControls) {
  const rows = [
    ['Nana Aba Anamoah', 'nana.aba@gmail.com', '+233 24 111 2233', 'Direct Link', '2 days ago'],
    ['Berla Mundi', 'berla.m@outlook.com', '+233 55 222 3344', 'Invitation', '3 days ago'],
    ['KiDi Mensah', 'kidi.m@gmail.com', '+233 20 333 4455', 'Social Media', '4 days ago'],
    ['Joselyn Dumas', 'joselyn.d@yahoo.com', '+233 24 444 5566', 'Invitation', '5 days ago'],
    ['Kweku Flick', 'kweku.f@gmail.com', '+233 55 555 6677', 'Direct Link', '1 week ago'],
  ]
  const filteredRows = rows.filter((row) => matchesQuery(search.query, row))

  return (
    <>
      <SearchToolbar
        placeholder="Search guests..."
        onChange={search.onSearchChange}
        actions={
          <>
            <button className="surface-button surface-button--wide" type="button">
              <FilterIcon className="button-icon" />
              <span>Filters</span>
            </button>
            <button className="page-primary-cta page-primary-cta--compact" type="button">
              <PlusIcon className="button-icon" />
              <span>Invite Guests</span>
            </button>
          </>
        }
        value={search.searchValue}
      />

      <section className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Source</th>
              <th>RSVP&apos;d</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td className="actions-cell">
                  <PencilIcon className="button-icon button-icon--muted" />
                  <TrashIcon className="button-icon button-icon--muted" />
                  <DocumentIcon className="button-icon button-icon--accent" />
                  <PaperPlaneIcon className="button-icon button-icon--accent" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager label={formatPagerLabel(filteredRows.length, 'guests')} />
      </section>
    </>
  )
}

function renderCapacity() {
  return (
    <>
      <section className="detail-header-block detail-header-block--stacked">
        <div>
          <h2>Capacity Management</h2>
          <p>Manage registration limits and availability.</p>
        </div>
      </section>

      <section className="capacity-card">
        <div className="capacity-card__icon">
          <UsersIcon className="button-icon" />
        </div>
        <button className="icon-ghost-button capacity-card__edit" type="button">
          <PencilIcon className="button-icon" />
        </button>
        <span className="capacity-card__label">Total Event Capacity</span>
        <strong className="capacity-card__value">450 Spots</strong>

        <div className="capacity-card__progress">
          <div className="capacity-card__progress-labels">
            <span>Registration Progress</span>
            <strong>380 / 450</strong>
          </div>
          <div className="progress-bar progress-bar--wide">
            <span style={{ width: '84%' }} />
          </div>
        </div>

        <span className="small-state-badge">Open for RSVP</span>
      </section>
    </>
  )
}

function renderWaitlist(search: SearchControls) {
  const rows = [
    ['1', 'Abena Kyei', 'AK', '+233 24 111 2233', 'abena.k@gmail.com', 'Early Bird', '2', '1 Feb 2026', 'Waiting'],
    ['2', 'Kwesi Appiah', 'KA', '+233 55 222 3344', 'kwesi.a@outlook.com', 'Early Bird', '1', '2 Feb 2026', 'Waiting'],
    ['3', 'Akua Sarpong', 'AS', '+233 20 333 4455', 'akua.s@yahoo.com', 'Early Bird', '3', '3 Feb 2026', 'Waiting'],
    ['1', 'Yaw Boakye', 'YB', '+233 27 444 5566', 'yaw.b@gmail.com', 'VIP Experience', '2', '5 Feb 2026', 'Notified'],
    ['2', 'Esi Quansah', 'EQ', '+233 24 555 6677', 'esi.q@gmail.com', 'VIP Experience', '1', '6 Feb 2026', 'Waiting'],
    ['4', 'Kojo Antwi', 'KA', '+233 50 666 7788', 'kojo.a@outlook.com', 'Early Bird', '1', '7 Feb 2026', 'Waiting'],
    ['3', 'Adwoa Mensah', 'AM', '+233 55 777 8899', 'adwoa.m@gmail.com', 'VIP Experience', '1', '10 Feb 2026', 'Waiting'],
    ['5', 'Kofi Adu', 'KA', '+233 20 888 9900', 'kofi.adu@yahoo.com', 'Early Bird', '2', '12 Feb 2026', 'Waiting'],
  ]
  const filteredRows = rows.filter((row) => matchesQuery(search.query, row))

  return (
    <>
      <SearchToolbar
        placeholder="Search waitlist by name or email..."
        onChange={search.onSearchChange}
        actions={
          <>
            <button className="surface-button surface-button--olive" type="button">
              <UsersIcon className="button-icon" />
              <span>Release Tickets (0)</span>
            </button>
            <button className="surface-button surface-button--danger" type="button">
              <TrashIcon className="button-icon" />
              <span>Remove</span>
            </button>
            <button className="surface-button surface-button--wide" type="button">
              <DownloadIcon className="button-icon" />
              <span>Export</span>
            </button>
          </>
        }
        value={search.searchValue}
      />

      <section className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Ticket Type</th>
              <th>Qty</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={`${row[0]}-${row[1]}`}>
                <td>{row[0]}</td>
                <td>
                  <div className="person-cell">
                    <span className="avatar-chip">{row[2]}</span>
                    <div className="name-stack">
                      <strong>{row[1]}</strong>
                      <span>{row[3]}</span>
                    </div>
                  </div>
                </td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
                <td>{row[6]}</td>
                <td>{row[7]}</td>
                <td>
                  <span className={`status-chip${row[8] === 'Notified' ? ' status-chip--accent' : ''}`}>
                    {row[8]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager label={formatPagerLabel(filteredRows.length, 'waitlist entries')} />
      </section>
    </>
  )
}

function renderCheckIn(eventId: EventId, search: SearchControls) {
  const isGuestListMode = eventId === 'ghana-tech-summit-2026'
  const rows = isGuestListMode
    ? [
        ['Kwame Asante', 'kwame.asante@gmail.com', '+233 24 123 4567', undefined, 'Check In'],
        ['Ama Mensah', 'ama.mensah@yahoo.com', '+233 20 234 5678', undefined, 'Verified'],
        ['Kofi Osei', 'kofi.osei@outlook.com', '+233 55 345 6789', undefined, 'Check In'],
        ['Akosua Boateng', 'akosua.b@gmail.com', '+233 24 456 7890', undefined, 'Check In'],
        ['Yaw Adjei', 'yaw.adjei@yahoo.com', '+233 50 567 8901', undefined, 'Check In'],
      ]
    : [
        ['Kwame Asante', 'kwame.asante@gmail.com', '#ORD-9283', 'VIP Experience', 'Check In'],
        ['Ama Mensah', 'ama.mensah@yahoo.com', '#ORD-9284', 'General Admission', 'Verified'],
        ['Kofi Osei', 'kofi.osei@outlook.com', '#ORD-9285', 'General Admission', 'Check In'],
        ['Akosua Boateng', 'akosua.b@gmail.com', '#ORD-9286', 'Early Bird', 'Check In'],
        ['Yaw Adjei', 'yaw.adjei@yahoo.com', '#ORD-9287', 'VIP Experience', 'Check In'],
      ]
  const filteredRows = rows.filter((row) => matchesQuery(search.query, row))

  return (
    <>
      <section className="checkin-intro">
        <div>
          <h2>Live Check-In</h2>
          <p>
            Verify tickets and manage entry for{' '}
            {eventId === 'ghana-tech-summit-2026' ? 'Ghana Tech Summit 2026' : 'Afrochella 2026'}
          </p>
        </div>
        <div className="checkin-summary">
          <div>
            <span>Checked In</span>
            <strong>1</strong>
          </div>
          <div>
            <span>Remaining</span>
            <strong>4</strong>
          </div>
        </div>
      </section>

      <SearchToolbar
        placeholder="Search name, email, or order ID..."
        onChange={search.onSearchChange}
        actions={
          <button className="page-primary-cta page-primary-cta--compact" type="button">
            <QrIcon className="button-icon" />
            <span>Scan QR Code</span>
          </button>
        }
        value={search.searchValue}
      />

      <section className="checkin-list">
        {filteredRows.map((row) => (
          <article key={row[0]} className="checkin-row">
            <div className="checkin-row__info">
              <div className="checkin-row__title">
                <strong>{row[0]}</strong>
                {!isGuestListMode && row[3] ? <span className="ticket-chip">{row[3]}</span> : null}
              </div>
              <p>
                {row[1]}
                <span className="checkin-separator">•</span>
                {row[2]}
              </p>
            </div>

            {row[4] === 'Verified' ? (
              <span className="verified-chip">
                <CheckIcon className="button-icon" />
                Verified
              </span>
            ) : (
              <button className="surface-button surface-button--checkin" type="button">
                <UsersIcon className="button-icon" />
                <span>Check In</span>
              </button>
            )}
          </article>
        ))}
      </section>

      <section className="checkin-footer-cards">
        <article className="offline-card">
          <div className="offline-card__icon">
            <ClockIcon className="button-icon" />
          </div>
          <div>
            <h3>Offline Mode Ready</h3>
            <p>
              Your data is being cached locally. You can continue checking in
              attendees even if your connection drops.
            </p>
          </div>
        </article>
        <article className="scanner-card">
          <div className="scanner-card__icon">
            <QrIcon className="button-icon" />
          </div>
          <div>
            <h3>Smart Scanner</h3>
            <p>Supports all TicketFlow QR formats and external PDF tickets.</p>
          </div>
          <ChevronRightIcon className="button-icon scanner-card__arrow" />
        </article>
      </section>
    </>
  )
}

function renderAttendees(search: SearchControls) {
  const rows = [
    ['Kwame Asante', 'kwame.asante@gmail.com', 'VIP Experience', 'Active', '2 days ago'],
    ['Ama Mensah', 'ama.mensah@yahoo.com', 'General Admission', 'Active', '3 days ago'],
    ['Kofi Osei', 'kofi.osei@outlook.com', 'General Admission', 'Active', '5 days ago'],
    ['Akosua Boateng', 'akosua.b@gmail.com', 'Early Bird', 'Active', '1 week ago'],
    ['Yaw Adjei', 'yaw.adjei@yahoo.com', 'VIP Experience', 'Active', '1 week ago'],
  ]
  const filteredRows = rows.filter((row) => matchesQuery(search.query, row))

  return (
    <>
      <SearchToolbar
        placeholder="Search attendees..."
        onChange={search.onSearchChange}
        actions={
          <>
            <button className="surface-button surface-button--wide" type="button">
              <FilterIcon className="button-icon" />
              <span>Filters</span>
            </button>
            <button className="page-primary-cta page-primary-cta--compact" type="button">
              <PlusIcon className="button-icon" />
              <span>Add Attendee</span>
            </button>
          </>
        }
        value={search.searchValue}
      />
      <section className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Ticket Type</th>
              <th>Status</th>
              <th>Purchased</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>
                  <span className="status-dot" />
                  {row[3]}
                </td>
                <td>{row[4]}</td>
                <td className="actions-cell">
                  <PencilIcon className="button-icon button-icon--muted" />
                  <TrashIcon className="button-icon button-icon--muted" />
                  <DocumentIcon className="button-icon button-icon--accent" />
                  <PaperPlaneIcon className="button-icon button-icon--accent" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager label={formatPagerLabel(filteredRows.length, 'attendees')} />
      </section>
    </>
  )
}

function renderOrders(search: SearchControls) {
  const metrics = [
    { icon: <TicketIcon className="button-icon" />, label: 'Total Orders', value: '8' },
    { icon: <DollarIcon className="button-icon" />, label: 'Net Revenue', value: 'GHC6,250' },
    { icon: <UsersIcon className="button-icon" />, label: 'Active Attendees', value: '12' },
    { icon: <UsersIcon className="button-icon" />, label: 'On Waitlist', value: '8' },
  ]
  const rows = [
    {
      order: '#0005',
      customer: 'Yaw Adjei',
      email: 'yaw.adjei@yahoo.com',
      ticketType: 'VIP Experience',
      qty: '1',
      amount: 'GHC800',
      fee: 'Fee: GHC40',
      payment: 'Visa',
      status: 'Pending',
      tone: 'pending',
      actions: ['ban', 'mail'],
    },
    {
      order: '#0004',
      customer: 'Akosua Boateng',
      email: 'akosua.b@gmail.com',
      ticketType: 'General Admission',
      qty: '2',
      amount: 'GHC600',
      fee: 'Fee: GHC30',
      payment: 'Mastercard',
      status: 'Completed',
      tone: 'success',
      actions: ['refresh', 'mail'],
    },
    {
      order: '#0002',
      customer: 'Ama Mensah',
      email: 'ama.mensah@yahoo.com',
      ticketType: 'General Admission',
      qty: '4',
      amount: 'GHC1,200',
      fee: 'Fee: GHC60',
      payment: 'Vodafone Cash',
      status: 'Completed',
      tone: 'success',
      actions: ['refresh', 'mail'],
    },
    {
      order: '#0001',
      customer: 'Kwame Asante',
      email: 'kwame.asante@gmail.com',
      ticketType: 'VIP Experience',
      qty: '2',
      amount: 'GHC1,600',
      fee: 'Fee: GHC80',
      payment: 'MTN MoMo',
      status: 'Completed',
      tone: 'success',
      actions: ['refresh', 'mail'],
    },
    {
      order: '#0008',
      customer: 'Priscilla Darko',
      email: 'priscilla.d@gmail.com',
      ticketType: 'VIP Experience',
      qty: '2',
      amount: 'GHC1,600',
      fee: 'Fee: GHC80',
      payment: 'MTN MoMo',
      status: 'Partially Refunded',
      tone: 'warning',
      actions: ['refresh', 'mail'],
    },
    {
      order: '#0007',
      customer: 'Nana Addo Mensah',
      email: 'nana.addo@outlook.com',
      ticketType: 'General Admission',
      qty: '1',
      amount: 'GHC300',
      fee: 'Fee: GHC15',
      payment: 'MTN MoMo',
      status: 'Cancelled',
      tone: 'muted',
      actions: ['mail'],
    },
    {
      order: '#0006',
      customer: 'Efua Owusu',
      email: 'efua.owusu@gmail.com',
      ticketType: 'Early Bird',
      qty: '3',
      amount: 'GHC450',
      fee: 'Fee: GHC22.5',
      payment: 'AirtelTigo Money',
      status: 'Completed',
      tone: 'success',
      actions: ['refresh', 'mail'],
    },
    {
      order: '#0003',
      customer: 'Kofi Osei',
      email: 'kofi.osei@outlook.com',
      ticketType: 'Early Bird',
      qty: '1',
      amount: 'GHC150',
      fee: 'Fee: GHC7.5',
      payment: 'MTN MoMo',
      status: 'Refunded',
      tone: 'danger',
      actions: ['mail'],
    },
  ]
  const filteredRows = rows.filter((row) =>
    matchesQuery(search.query, [
      row.order,
      row.customer,
      row.email,
      row.ticketType,
      row.payment,
      row.status,
      row.amount,
    ]),
  )

  return (
    <>
      <MetricsRow items={metrics} />
      <div className="detail-toolbar detail-toolbar--single">
        <label className="search-bar search-bar--compact">
          <SearchIcon className="search-bar__icon" />
          <input
            onChange={(event) => search.onSearchChange(event.target.value)}
            placeholder="Search by order #, name, or email..."
            value={search.searchValue}
          />
        </label>
        <button className="surface-button surface-button--wide" type="button">
          <DownloadIcon className="button-icon" />
          <span>Export</span>
        </button>
      </div>
      <section className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Ticket Type</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.order}>
                <td className="text-accent">{row.order}</td>
                <td>
                  <div className="name-stack">
                    <strong>{row.customer}</strong>
                    <span>{row.email}</span>
                  </div>
                </td>
                <td>{row.ticketType}</td>
                <td>{row.qty}</td>
                <td>
                  <div className="name-stack">
                    <strong>{row.amount}</strong>
                    <span>{row.fee}</span>
                  </div>
                </td>
                <td>{row.payment}</td>
                <td>
                  <span className={`status-dot status-dot--${row.tone}`} />
                  {row.status}
                </td>
                <td className="actions-cell">
                  {row.actions.includes('ban') ? (
                    <BanIcon className="button-icon button-icon--muted" />
                  ) : null}
                  {row.actions.includes('refresh') ? (
                    <RefreshIcon className="button-icon button-icon--muted" />
                  ) : null}
                  <MailIcon className="button-icon button-icon--muted" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager label={formatPagerLabel(filteredRows.length, 'orders')} />
      </section>
    </>
  )
}

function renderTickets(onCreatePromoCode: () => void) {
  const metrics = [
    { icon: <DollarIcon className="button-icon" />, label: 'Total Revenue', value: 'GHC592,500' },
    { icon: <TicketIcon className="button-icon" />, label: 'Tickets Sold', value: '1,925 / 2,700' },
    { icon: <UsersIcon className="button-icon" />, label: 'Active Tiers', value: '2 of 3' },
    { icon: <UsersIcon className="button-icon" />, label: 'On Waitlists', value: '50' },
  ]

  const tiers = [
    {
      name: 'Early Bird',
      price: 'GHC150',
      state: 'Sold Out',
      tone: 'danger',
      count: '500 / 500',
      pct: '100%',
      progress: 1,
      alert: 'Sales blocked - inventory limit reached',
      waitlist: '38 on waitlist',
      meta: ['1 Jun 2026', 'to 30 Sept 2026', 'Opens in 10 days'],
      platform: ['Absorbed by you', 'You pay GHC7.50 per ticket (5%)', 'Attendee pays: GHC150.00'],
      revenue: ['GHC75,000', 'Net: GHC71,250', '500 x GHC150'],
    },
    {
      name: 'General Admission',
      price: 'GHC300',
      state: 'Active',
      tone: 'success',
      count: '1,245 / 2,000',
      pct: '62%',
      progress: 0.62,
      waitlist: 'Disabled',
      meta: ['15 Jul 2026', 'to 27 Dec 2026', 'Opens in 145 days'],
      platform: ['Passed to attendee', 'Attendee pays: GHC315.00', 'Includes GHC15.00 fee (5%)'],
      revenue: ['GHC373,500', 'Full amount to you', '1245 x GHC300'],
    },
    {
      name: 'VIP Experience',
      price: 'GHC800',
      state: 'Almost Sold Out',
      tone: 'warning',
      count: '180 / 200',
      pct: '90%',
      progress: 0.9,
      alert: 'Only 20 tickets remaining',
      waitlist: '12 on waitlist',
      meta: ['15 Jul 2026', 'to 27 Dec 2026', 'Opens in 145 days'],
      platform: ['Absorbed by you', 'You pay GHC40.00 per ticket (5%)', 'Attendee pays: GHC800.00'],
      revenue: ['GHC144,000', 'Net: GHC136,800', '180 x GHC800'],
    },
  ]

  return (
    <>
      <section className="detail-header-block">
        <div>
          <h2>Ticket Tiers</h2>
          <p>Manage pricing, inventory, and sales windows for your event.</p>
        </div>
        <div className="detail-toolbar__actions">
          <button className="surface-button surface-button--wide" onClick={onCreatePromoCode} type="button">
            <TagIcon className="button-icon" />
            <span>Create Promo Code</span>
          </button>
          <button className="page-primary-cta page-primary-cta--compact" type="button">
            <PlusIcon className="button-icon" />
            <span>Create Tier</span>
          </button>
        </div>
      </section>
      <MetricsRow items={metrics} />
      <section className="ticket-tier-list">
        {tiers.map((tier) => (
          <article key={tier.name} className="ticket-tier-card">
            <div className="ticket-tier-card__header">
              <div className="ticket-tier-card__title">
                <span className="ticket-tier-card__icon">
                  <TicketIcon className="button-icon" />
                </span>
                <div>
                  <div className="ticket-tier-card__name-row">
                    <h3>{tier.name}</h3>
                    <span className={`state-pill state-pill--${tier.tone}`}>{tier.state}</span>
                  </div>
                  <strong>{tier.price}</strong>
                </div>
              </div>
              <div className="actions-cell">
                <PencilIcon className="button-icon button-icon--muted" />
                <TrashIcon className="button-icon button-icon--muted" />
              </div>
            </div>

            <div className="ticket-tier-card__progress">
              <div className="ticket-tier-card__progress-row">
                <span>Inventory</span>
                <strong>
                  {tier.count} <small>({tier.pct})</small>
                </strong>
              </div>
              <div className="progress-bar progress-bar--wide">
                <span
                  className={`progress-bar__fill progress-bar__fill--${tier.tone}`}
                  style={{ width: `${tier.progress * 100}%` }}
                />
              </div>
              {tier.alert ? <span className={`inline-alert inline-alert--${tier.tone}`}>{tier.alert}</span> : null}
            </div>

            <div className="ticket-tier-card__grid">
              <div className="detail-mini-card">
                <CalendarIcon className="detail-mini-card__icon" />
                <span className="detail-mini-card__label">Sales Window</span>
                <strong>{tier.meta[0]}</strong>
                <span>{tier.meta[1]}</span>
                <small>{tier.meta[2]}</small>
              </div>
              <div className="detail-mini-card">
                <TrendIcon className="detail-mini-card__icon" />
                <span className="detail-mini-card__label">Platform Fee</span>
                <strong>{tier.platform[0]}</strong>
                <span>{tier.platform[1]}</span>
                <small>{tier.platform[2]}</small>
              </div>
              <div className="detail-mini-card">
                <CardIcon className="detail-mini-card__icon" />
                <span className="detail-mini-card__label">Revenue</span>
                <strong>{tier.revenue[0]}</strong>
                <span>{tier.revenue[1]}</span>
                <small>{tier.revenue[2]}</small>
              </div>
              <div className="detail-mini-card detail-mini-card--olive">
                <UsersIcon className="detail-mini-card__icon" />
                <span className="detail-mini-card__label">Waitlist</span>
                <strong>{tier.waitlist}</strong>
                <small>
                  {tier.waitlist === 'Disabled'
                    ? 'Enable to allow signups before sales open or after sellout'
                    : 'Accepting waitlist signups'}
                </small>
              </div>
            </div>
          </article>
        ))}

        <article className="promo-card">
          <div>
            <h3>Promo Codes</h3>
            <p>Create discounts and special offers for your attendees.</p>
          </div>
          <button className="surface-button surface-button--wide" onClick={onCreatePromoCode} type="button">
            <span>Manage Coupons</span>
          </button>
        </article>

        <article className="notice-card">
          <ShieldCheckIcon className="button-icon" />
          <div>
            <strong>Inventory Protection Active</strong>
            <p>
              Ticket sales are automatically blocked when a tier reaches its inventory
              limit. Availability is updated in real time across your dashboard and
              public event page.
            </p>
          </div>
        </article>
      </section>
    </>
  )
}

export function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId
  const [searchValues, setSearchValues] = useState<Record<string, string>>({})
  const [activeModal, setActiveModal] = useState<'invite' | 'promote' | 'assign' | 'promo' | null>(null)
  const [inviteValue, setInviteValue] = useState('')
  const [promoCode, setPromoCode] = useState('AFRO10')
  const [promoDiscount, setPromoDiscount] = useState('10')
  const [promoterName, setPromoterName] = useState('Kwame Osei')
  const [promoterEmail, setPromoterEmail] = useState('kwame.osei@promoter.gh')
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)

  const storedEvent = eventId ? getStoredEvent(eventId) : undefined
  const event = eventId && storedEvent ? buildDetailEvent(storedEvent, eventId) : undefined
  const requestedTab = normalizeEventTab(params.tab)
  const tab =
    event && requestedTab && event.tabs.includes(requestedTab)
      ? requestedTab
      : event?.tabs[0]
  const searchKey = `${eventId ?? 'unknown'}:${tab ?? 'unknown'}`
  const searchValue = searchValues[searchKey] ?? ''
  const deferredSearch = useDeferredValue(searchValue.trim().toLowerCase())

  if (!eventId || !event || !tab) {
    return <Navigate replace to="/events" />
  }

  const search = {
    query: deferredSearch,
    searchValue,
    onSearchChange: (value: string) =>
      setSearchValues((current) => ({
        ...current,
        [searchKey]: value,
      })),
  }

  const content = (() => {
    switch (tab) {
      case 'overview':
        return renderOverview(eventId)
      case 'guestlist':
        return renderGuestlist(search)
      case 'capacity':
        return renderCapacity()
      case 'waitlist':
        return renderWaitlist(search)
      case 'check-in':
        return renderCheckIn(eventId, search)
      case 'attendees':
        return renderAttendees(search)
      case 'orders':
        return renderOrders(search)
      case 'tickets':
        return renderTickets(() => setActiveModal('promo'))
      default:
        return renderOverview(eventId)
    }
  })()

  return (
    <>
      <DetailShell
        event={event}
        eventId={eventId}
        onAssignPromoters={() => setActiveModal('assign')}
        onInvite={() => setActiveModal('invite')}
        onPromote={() => setActiveModal('promote')}
        tab={tab}
      >
        {content}
      </DetailShell>

      {activeModal === 'invite' ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={() => setActiveModal(null)} type="button">
                Cancel
              </button>
              <button
                className="page-primary-cta page-primary-cta--compact"
                onClick={() => {
                  setActiveModal(null)
                  setConfirmationMessage('Invitation link prepared.')
                  window.location.href = `mailto:?subject=${encodeURIComponent(`Invitation to ${event.title}`)}&body=${encodeURIComponent(`Join ${event.title}: ${inviteValue || 'guest@example.com'}`)}`
                }}
                type="button"
              >
                Send Invite
              </button>
            </>
          }
          onClose={() => setActiveModal(null)}
          title="Invite Guests"
        >
          <label className="form-field form-field--full">
            <span>Email Address</span>
            <input onChange={(inputEvent) => setInviteValue(inputEvent.target.value)} placeholder="guest@email.com" value={inviteValue} />
          </label>
        </DashboardModal>
      ) : null}

      {activeModal === 'promote' ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={() => setActiveModal(null)} type="button">
                Cancel
              </button>
              <button
                className="page-primary-cta page-primary-cta--compact"
                onClick={() => {
                  navigator.clipboard.writeText(`https://events.blackvolta.com/${eventId}`)
                  setActiveModal(null)
                  setConfirmationMessage('Promotional event link copied.')
                }}
                type="button"
              >
                Copy Event Link
              </button>
            </>
          }
          onClose={() => setActiveModal(null)}
          title="Promote Event"
        >
          <p className="dashboard-modal__copy">
            Copy your live event link and share it across email, socials, or partner channels.
          </p>
          <label className="form-field form-field--full">
            <span>Share Link</span>
            <input readOnly value={`https://events.blackvolta.com/${eventId}`} />
          </label>
        </DashboardModal>
      ) : null}

      {activeModal === 'assign' ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={() => setActiveModal(null)} type="button">
                Cancel
              </button>
              <button
                className="page-primary-cta page-primary-cta--compact"
                onClick={() => {
                  setActiveModal(null)
                  setConfirmationMessage(`Promoter assigned to ${event.title}.`)
                }}
                type="button"
              >
                Assign Promoter
              </button>
            </>
          }
          onClose={() => setActiveModal(null)}
          title="Assign Promoter"
        >
          <div className="modal-form-grid">
            <label className="form-field">
              <span>Promoter Name</span>
              <input onChange={(inputEvent) => setPromoterName(inputEvent.target.value)} value={promoterName} />
            </label>
            <label className="form-field">
              <span>Email Address</span>
              <input onChange={(inputEvent) => setPromoterEmail(inputEvent.target.value)} value={promoterEmail} />
            </label>
          </div>
        </DashboardModal>
      ) : null}

      {activeModal === 'promo' ? (
        <DashboardModal
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={() => setActiveModal(null)} type="button">
                Cancel
              </button>
              <button
                className="page-primary-cta page-primary-cta--compact"
                onClick={() => {
                  setActiveModal(null)
                  setConfirmationMessage(`Promo code ${promoCode.toUpperCase()} saved.`)
                }}
                type="button"
              >
                Save Promo Code
              </button>
            </>
          }
          onClose={() => setActiveModal(null)}
          title="Create Promo Code"
        >
          <div className="modal-form-grid">
            <label className="form-field">
              <span>Promo Code</span>
              <input onChange={(inputEvent) => setPromoCode(inputEvent.target.value.toUpperCase())} value={promoCode} />
            </label>
            <label className="form-field">
              <span>Discount (%)</span>
              <input onChange={(inputEvent) => setPromoDiscount(inputEvent.target.value)} value={promoDiscount} />
            </label>
          </div>
        </DashboardModal>
      ) : null}

      {confirmationMessage ? (
        <DashboardModal
          footer={<button className="page-primary-cta page-primary-cta--compact" onClick={() => setConfirmationMessage(null)} type="button">Done</button>}
          onClose={() => setConfirmationMessage(null)}
          title="Configured"
        >
          <p className="dashboard-modal__copy">{confirmationMessage}</p>
        </DashboardModal>
      ) : null}
    </>
  )
}
