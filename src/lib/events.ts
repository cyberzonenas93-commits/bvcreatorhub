export type EventStatus = 'Live' | 'Draft' | 'Ended' | 'Cancelled'
export type EventMonetization = 'Paid' | 'RSVP' | 'Free'
export type EventScheduleType = 'one-time' | 'recurring'
export type EventLocationType = 'physical' | 'virtual'
export type EventType = 'free' | 'rsvp' | 'paid'
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly'
export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export interface StoredEvent {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  locationType: EventLocationType
  eventUrl: string
  scheduleType: EventScheduleType
  recurrenceFrequency: RecurrenceFrequency
  recurrenceInterval: number
  recurrenceDays: Weekday[]
  recurrenceEndDate: string
  eventType: EventType
  status: EventStatus
  monetization: EventMonetization
  progressLabel: string
  progressValue: string
  progressRatio: number
  footerLabel: string
  footerValue: string
  bannerFileName: string
  ticketName: string
  ticketPrice: string
  inventoryLimit: string
  salesStartDate: string
  salesEndDate: string
  absorbsFee: boolean
  waitlistEnabled: boolean
}

const EVENTS_STORAGE_KEY = 'bv-dashboard-events'
const weekdayOrder: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function defaultRecurrence() {
  return {
    recurrenceFrequency: 'weekly' as const,
    recurrenceInterval: 1,
    recurrenceDays: [] as Weekday[],
    recurrenceEndDate: '',
  }
}

const defaultEvents: StoredEvent[] = [
  {
    id: 'afrochella-2026',
    title: 'Afrochella 2026',
    description: 'A flagship culture, music, and lifestyle experience in Accra.',
    startDate: '2026-12-28',
    endDate: '2026-12-28',
    startTime: '18:00',
    endTime: '23:45',
    location: 'El Wak Stadium, Accra',
    locationType: 'physical',
    eventUrl: '',
    scheduleType: 'one-time',
    ...defaultRecurrence(),
    eventType: 'paid',
    status: 'Live',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '1450 / 3000',
    progressRatio: 0.49,
    footerLabel: 'Revenue',
    footerValue: 'GHC435,000',
    bannerFileName: '',
    ticketName: 'General Admission',
    ticketPrice: '300',
    inventoryLimit: '3000',
    salesStartDate: '2026-07-15',
    salesEndDate: '2026-12-27',
    absorbsFee: false,
    waitlistEnabled: true,
  },
  {
    id: 'ghana-tech-summit-2026',
    title: 'Ghana Tech Summit 2026',
    description: 'A multi-day summit for founders, builders, and ecosystem leaders.',
    startDate: '2026-08-22',
    endDate: '2026-08-22',
    startTime: '09:00',
    endTime: '17:30',
    location: 'Accra Intl. Conference Centre',
    locationType: 'physical',
    eventUrl: '',
    scheduleType: 'one-time',
    ...defaultRecurrence(),
    eventType: 'rsvp',
    status: 'Live',
    monetization: 'RSVP',
    progressLabel: 'Registration Progress',
    progressValue: '320 / 500',
    progressRatio: 0.64,
    footerLabel: 'Waitlist',
    footerValue: '320 People',
    bannerFileName: '',
    ticketName: 'General RSVP',
    ticketPrice: '0',
    inventoryLimit: '500',
    salesStartDate: '2026-05-01',
    salesEndDate: '2026-08-21',
    absorbsFee: false,
    waitlistEnabled: true,
  },
  {
    id: 'chale-wote-street-art-festival',
    title: 'Chale Wote Street Art Festival',
    description: 'A public arts festival with immersive installations and street culture.',
    startDate: '2026-08-20',
    endDate: '2026-08-20',
    startTime: '12:00',
    endTime: '22:00',
    location: 'Jamestown, Accra',
    locationType: 'physical',
    eventUrl: '',
    scheduleType: 'one-time',
    ...defaultRecurrence(),
    eventType: 'free',
    status: 'Live',
    monetization: 'Free',
    progressLabel: 'Registration Progress',
    progressValue: '185 / 500',
    progressRatio: 0.37,
    footerLabel: 'Registrations',
    footerValue: '185 People',
    bannerFileName: '',
    ticketName: 'Free Access',
    ticketPrice: '0',
    inventoryLimit: '500',
    salesStartDate: '2026-05-20',
    salesEndDate: '2026-08-19',
    absorbsFee: false,
    waitlistEnabled: false,
  },
  {
    id: 'detty-december-concert',
    title: 'Detty December Concert',
    description: 'A seasonal beach concert with live performances and afterparties.',
    startDate: '2025-12-22',
    endDate: '2025-12-22',
    startTime: '20:00',
    endTime: '23:00',
    location: 'Labadi Beach Hotel, Accra',
    locationType: 'physical',
    eventUrl: '',
    scheduleType: 'one-time',
    ...defaultRecurrence(),
    eventType: 'paid',
    status: 'Ended',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '800 / 800',
    progressRatio: 1,
    footerLabel: 'Revenue',
    footerValue: 'GHC192,000',
    bannerFileName: '',
    ticketName: 'Detty Pass',
    ticketPrice: '240',
    inventoryLimit: '800',
    salesStartDate: '2025-10-01',
    salesEndDate: '2025-12-21',
    absorbsFee: true,
    waitlistEnabled: false,
  },
  {
    id: 'panafest-2026',
    title: 'Panafest 2026',
    description: 'A heritage event celebrating culture, memory, and pan-African identity.',
    startDate: '2026-07-25',
    endDate: '2026-07-25',
    startTime: '10:00',
    endTime: '18:00',
    location: 'Cape Coast Castle, Cape Coast',
    locationType: 'physical',
    eventUrl: '',
    scheduleType: 'one-time',
    ...defaultRecurrence(),
    eventType: 'paid',
    status: 'Draft',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '0 / 400',
    progressRatio: 0.01,
    footerLabel: 'Revenue',
    footerValue: 'GHC0',
    bannerFileName: '',
    ticketName: 'Festival Access',
    ticketPrice: '100',
    inventoryLimit: '400',
    salesStartDate: '2026-04-01',
    salesEndDate: '2026-07-24',
    absorbsFee: false,
    waitlistEnabled: true,
  },
  {
    id: 'homowo-festival-concert',
    title: 'Homowo Festival Concert',
    description: 'A concert built around the Homowo season with heritage programming.',
    startDate: '2026-09-10',
    endDate: '2026-09-10',
    startTime: '17:00',
    endTime: '23:00',
    location: 'Black Star Square, Accra',
    locationType: 'physical',
    eventUrl: '',
    scheduleType: 'one-time',
    ...defaultRecurrence(),
    eventType: 'paid',
    status: 'Cancelled',
    monetization: 'Paid',
    progressLabel: 'Sales Progress',
    progressValue: '150 / 1000',
    progressRatio: 0.15,
    footerLabel: 'Revenue',
    footerValue: 'GHC45,000',
    bannerFileName: '',
    ticketName: 'Concert Access',
    ticketPrice: '300',
    inventoryLimit: '1000',
    salesStartDate: '2026-06-01',
    salesEndDate: '2026-09-09',
    absorbsFee: false,
    waitlistEnabled: false,
  },
]

function sortEvents(events: StoredEvent[]) {
  return [...events].sort((left, right) => {
    if (left.startDate === right.startDate) {
      return left.title.localeCompare(right.title)
    }

    return left.startDate < right.startDate ? 1 : -1
  })
}

function normalizeWeekdays(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as Weekday[]
  }

  const days = value.filter((item): item is Weekday => weekdayOrder.includes(item as Weekday))
  return [...days].sort((left, right) => weekdayOrder.indexOf(left) - weekdayOrder.indexOf(right))
}

function normalizeEvent(event: StoredEvent | Partial<StoredEvent>) {
  const recurrence = defaultRecurrence()
  const recurrenceInterval = Number.parseInt(String(event.recurrenceInterval ?? recurrence.recurrenceInterval), 10)

  return {
    ...event,
    recurrenceFrequency: event.recurrenceFrequency ?? recurrence.recurrenceFrequency,
    recurrenceInterval:
      Number.isFinite(recurrenceInterval) && recurrenceInterval > 0
        ? recurrenceInterval
        : recurrence.recurrenceInterval,
    recurrenceDays: normalizeWeekdays(event.recurrenceDays),
    recurrenceEndDate: event.recurrenceEndDate ?? recurrence.recurrenceEndDate,
  } as StoredEvent
}

export function formatEventDate(date: string) {
  if (!date) {
    return 'Date TBD'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

export function getWeekdayFromDate(date: string): Weekday | null {
  if (!date) {
    return null
  }

  const weekdayIndex = new Date(`${date}T12:00:00`).getDay()
  return weekdayOrder[weekdayIndex] ?? null
}

export function formatRecurringSummary(event: Pick<StoredEvent, 'scheduleType' | 'recurrenceFrequency' | 'recurrenceInterval' | 'recurrenceDays' | 'recurrenceEndDate'>) {
  if (event.scheduleType !== 'recurring') {
    return 'One-time event'
  }

  const interval = Math.max(1, event.recurrenceInterval)
  const intervalLabel = interval === 1 ? 'Every' : `Every ${interval}`

  if (event.recurrenceFrequency === 'daily') {
    return `${intervalLabel} ${interval === 1 ? 'day' : 'days'}`
  }

  if (event.recurrenceFrequency === 'monthly') {
    return `${intervalLabel} ${interval === 1 ? 'month' : 'months'}`
  }

  const dayLabels = event.recurrenceDays
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3))
    .join(', ')

  return `${intervalLabel} ${interval === 1 ? 'week' : 'weeks'}${dayLabels ? ` on ${dayLabels}` : ''}${
    event.recurrenceEndDate ? ` until ${formatEventDate(event.recurrenceEndDate)}` : ''
  }`
}

export function readStoredEvents() {
  if (typeof window === 'undefined') {
    return defaultEvents.map(normalizeEvent)
  }

  try {
    const stored = window.localStorage.getItem(EVENTS_STORAGE_KEY)

    if (!stored) {
      return defaultEvents.map(normalizeEvent)
    }

    return sortEvents((JSON.parse(stored) as StoredEvent[]).map(normalizeEvent))
  } catch {
    return defaultEvents.map(normalizeEvent)
  }
}

export function writeStoredEvents(events: StoredEvent[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(sortEvents(events)))
}

export function getStoredEvent(eventId: string) {
  return readStoredEvents().find((event) => event.id === eventId)
}

export function createEventId(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug.length > 0 ? slug : `event-${Date.now()}`
}

export function upsertStoredEvent(nextEvent: StoredEvent) {
  const events = readStoredEvents()
  const existingIndex = events.findIndex((event) => event.id === nextEvent.id)

  if (existingIndex === -1) {
    writeStoredEvents([...events, nextEvent])
    return nextEvent
  }

  const updated = [...events]
  updated[existingIndex] = nextEvent
  writeStoredEvents(updated)

  return nextEvent
}
