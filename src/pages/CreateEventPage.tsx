import type { ChangeEvent, ReactNode } from 'react'
import { useId, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  ImageIcon,
  MapPinIcon,
  PaperPlaneIcon,
  PlusIcon,
  SaveIcon,
  ShieldCheckIcon,
  TicketIcon,
  TypeIcon,
  UsersIcon,
} from '../components/ui/Icons'
import {
  createEventId,
  formatRecurringSummary,
  getStoredEvent,
  getWeekdayFromDate,
  type RecurrenceFrequency,
  type StoredEvent,
  type Weekday,
  upsertStoredEvent,
} from '../lib/events'

type EventFormState = {
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  scheduleType: 'one-time' | 'recurring'
  recurrenceFrequency: RecurrenceFrequency
  recurrenceInterval: string
  recurrenceDays: Weekday[]
  recurrenceEndDate: string
  eventType: 'free' | 'rsvp' | 'paid'
  locationType: 'physical' | 'virtual'
  location: string
  eventUrl: string
  bannerFileName: string
  ticketName: string
  ticketPrice: string
  inventoryLimit: string
  salesStartDate: string
  salesEndDate: string
  absorbsFee: boolean
  waitlistEnabled: boolean
}

const weekdayOptions: Array<{ label: string; value: Weekday }> = [
  { label: 'Sun', value: 'sun' },
  { label: 'Mon', value: 'mon' },
  { label: 'Tue', value: 'tue' },
  { label: 'Wed', value: 'wed' },
  { label: 'Thu', value: 'thu' },
  { label: 'Fri', value: 'fri' },
  { label: 'Sat', value: 'sat' },
]

function SectionHeading({
  icon,
  title,
}: {
  icon: ReactNode
  title: string
}) {
  return (
    <div className="form-section__heading">
      <span className="form-section__icon">{icon}</span>
      <h2>{title}</h2>
    </div>
  )
}

function buildInitialFormState(existingEvent?: StoredEvent): EventFormState {
  if (!existingEvent) {
    return {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      scheduleType: 'one-time',
      recurrenceFrequency: 'weekly',
      recurrenceInterval: '1',
      recurrenceDays: [],
      recurrenceEndDate: '',
      eventType: 'paid',
      locationType: 'physical',
      location: '',
      eventUrl: '',
      bannerFileName: '',
      ticketName: 'General',
      ticketPrice: '0.00',
      inventoryLimit: '100',
      salesStartDate: '',
      salesEndDate: '',
      absorbsFee: false,
      waitlistEnabled: false,
    }
  }

  return {
    title: existingEvent.title,
    description: existingEvent.description,
    startDate: existingEvent.startDate,
    endDate: existingEvent.endDate,
    startTime: existingEvent.startTime,
    endTime: existingEvent.endTime,
    scheduleType: existingEvent.scheduleType,
    recurrenceFrequency: existingEvent.recurrenceFrequency,
    recurrenceInterval: String(existingEvent.recurrenceInterval),
    recurrenceDays: existingEvent.recurrenceDays,
    recurrenceEndDate: existingEvent.recurrenceEndDate,
    eventType: existingEvent.eventType,
    locationType: existingEvent.locationType,
    location: existingEvent.location,
    eventUrl: existingEvent.eventUrl,
    bannerFileName: existingEvent.bannerFileName,
    ticketName: existingEvent.ticketName,
    ticketPrice: existingEvent.ticketPrice,
    inventoryLimit: existingEvent.inventoryLimit,
    salesStartDate: existingEvent.salesStartDate,
    salesEndDate: existingEvent.salesEndDate,
    absorbsFee: existingEvent.absorbsFee,
    waitlistEnabled: existingEvent.waitlistEnabled,
  }
}

function eventFooter(eventType: EventFormState['eventType']) {
  if (eventType === 'paid') {
    return { footerLabel: 'Revenue', footerValue: 'GHC0', progressLabel: 'Sales Progress' }
  }

  if (eventType === 'rsvp') {
    return {
      footerLabel: 'Waitlist',
      footerValue: '0 People',
      progressLabel: 'Registration Progress',
    }
  }

  return {
    footerLabel: 'Registrations',
    footerValue: '0 People',
    progressLabel: 'Registration Progress',
  }
}

export function CreateEventPage() {
  const navigate = useNavigate()
  const { eventId } = useParams<{ eventId: string }>()
  const existingEvent = eventId ? getStoredEvent(eventId) : undefined
  const isEditing = Boolean(existingEvent)
  const bannerInputId = useId()
  const [form, setForm] = useState<EventFormState>(() => buildInitialFormState(existingEvent))

  const canSaveDraft = form.title.trim().length > 0
  const recurrenceInterval = Number.parseInt(form.recurrenceInterval, 10)
  const hasLocation =
    form.locationType === 'physical' ? form.location.trim().length > 0 : form.eventUrl.trim().length > 0
  const hasRecurringDays = form.recurrenceFrequency !== 'weekly' || form.recurrenceDays.length > 0
  const hasValidRecurrence =
    form.scheduleType === 'one-time' ||
    (Number.isFinite(recurrenceInterval) &&
      recurrenceInterval > 0 &&
      form.recurrenceEndDate.length > 0 &&
      form.recurrenceEndDate >= form.startDate &&
      hasRecurringDays)
  const canPublish =
    form.title.trim().length > 0 &&
    form.startDate.length > 0 &&
    form.endDate.length > 0 &&
    form.startTime.length > 0 &&
    form.endTime.length > 0 &&
    hasLocation &&
    hasValidRecurrence

  function updateField<Key extends keyof EventFormState>(field: Key, value: EventFormState[Key]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function updateScheduleType(scheduleType: EventFormState['scheduleType']) {
    setForm((current) => {
      if (scheduleType === 'one-time') {
        return {
          ...current,
          scheduleType,
        }
      }

      const recurringDay =
        current.recurrenceDays.length > 0 ? current.recurrenceDays : current.startDate ? [getWeekdayFromDate(current.startDate)].filter(Boolean) as Weekday[] : []

      return {
        ...current,
        scheduleType,
        recurrenceDays: recurringDay,
        recurrenceEndDate: current.recurrenceEndDate || current.endDate || current.startDate,
      }
    })
  }

  function updateStartDate(startDate: string) {
    setForm((current) => {
      const defaultDay = getWeekdayFromDate(startDate)

      return {
        ...current,
        startDate,
        recurrenceDays:
          current.scheduleType === 'recurring' &&
          current.recurrenceFrequency === 'weekly' &&
          current.recurrenceDays.length === 0 &&
          defaultDay
            ? [defaultDay]
            : current.recurrenceDays,
        recurrenceEndDate:
          current.scheduleType === 'recurring' && !current.recurrenceEndDate
            ? current.endDate || startDate
            : current.recurrenceEndDate,
      }
    })
  }

  function toggleRecurringDay(day: Weekday) {
    setForm((current) => ({
      ...current,
      recurrenceDays: current.recurrenceDays.includes(day)
        ? current.recurrenceDays.filter((item) => item !== day)
        : weekdayOptions
            .map((option) => option.value)
            .filter((option) => [...current.recurrenceDays, day].includes(option)),
    }))
  }

  function handleBannerChange(event: ChangeEvent<HTMLInputElement>) {
    const fileName = event.target.files?.[0]?.name ?? ''

    if (fileName) {
      updateField('bannerFileName', fileName)
    }
  }

  function saveEvent(status: StoredEvent['status']) {
    if (status === 'Draft' && !canSaveDraft) {
      return
    }

    if (status !== 'Draft' && !canPublish) {
      return
    }

    const nextId = existingEvent?.id ?? createEventId(form.title)
    const { footerLabel, footerValue, progressLabel } = eventFooter(form.eventType)
    const inventory = Number.parseInt(form.inventoryLimit, 10)
    const safeInventory = Number.isFinite(inventory) && inventory > 0 ? inventory : 100

    upsertStoredEvent({
      id: nextId,
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      startTime: form.startTime,
      endTime: form.endTime,
      location:
        form.locationType === 'physical'
          ? form.location
          : form.eventUrl || 'Virtual event',
      locationType: form.locationType,
      eventUrl: form.eventUrl,
      scheduleType: form.scheduleType,
      recurrenceFrequency: form.recurrenceFrequency,
      recurrenceInterval:
        Number.isFinite(recurrenceInterval) && recurrenceInterval > 0 ? recurrenceInterval : 1,
      recurrenceDays: form.recurrenceDays,
      recurrenceEndDate:
        form.scheduleType === 'recurring' ? form.recurrenceEndDate : '',
      eventType: form.eventType,
      status,
      monetization:
        form.eventType === 'paid' ? 'Paid' : form.eventType === 'rsvp' ? 'RSVP' : 'Free',
      progressLabel,
      progressValue: `0 / ${safeInventory}`,
      progressRatio: 0,
      footerLabel,
      footerValue,
      bannerFileName: form.bannerFileName,
      ticketName: form.ticketName,
      ticketPrice: form.ticketPrice,
      inventoryLimit: String(safeInventory),
      salesStartDate: form.salesStartDate,
      salesEndDate: form.salesEndDate,
      absorbsFee: form.absorbsFee,
      waitlistEnabled: form.waitlistEnabled,
    })

    navigate(`/events/${nextId}`)
  }

  return (
    <div className="dashboard-page create-event-page">
      <section className="detail-hero detail-hero--create">
        <div className="detail-hero__left">
          <Link className="back-link" to={isEditing ? `/events/${eventId}` : '/overview'}>
            <ArrowLeftIcon className="button-icon" />
            <span>{isEditing ? 'Back to Event' : 'Back to Overview'}</span>
          </Link>

          <div className="detail-hero__title-row detail-hero__title-row--create">
            <ArrowLeftIcon className="detail-back-icon" />
            <div>
              <h1>{isEditing ? 'Edit Event' : 'Create Event'}</h1>
              <p>
                {isEditing
                  ? 'Update your event details and keep the dashboard in sync.'
                  : 'Complete the details below to set up your event.'}
              </p>
            </div>
          </div>
        </div>

        <div className="detail-hero__actions">
          <button
            className="surface-button surface-button--wide"
            disabled={!canSaveDraft}
            onClick={() => saveEvent('Draft')}
            type="button"
          >
            <SaveIcon className="button-icon" />
            <span>{isEditing ? 'Save Changes' : 'Save as Draft'}</span>
          </button>
          <button
            className="page-primary-cta page-primary-cta--compact"
            disabled={!canPublish}
            onClick={() => saveEvent('Live')}
            type="button"
          >
            <PaperPlaneIcon className="button-icon" />
            <span>{isEditing ? 'Update Event' : 'Publish Event'}</span>
          </button>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<ImageIcon className="button-icon" />} title="Event Media" />
        <input
          className="sr-only"
          id={bannerInputId}
          onChange={handleBannerChange}
          type="file"
        />
        <label className="upload-panel upload-panel--interactive" htmlFor={bannerInputId}>
          <div className="upload-panel__icon">
            <ImageIcon className="button-icon" />
          </div>
          <h3>{form.bannerFileName || 'Upload Event Banner'}</h3>
          <p>Drag and drop or click to browse (JPG, PNG, max 10MB)</p>
          <span>Recommended size: 1200 x 630 pixels</span>
        </label>
      </section>

      <section className="form-section">
        <SectionHeading icon={<TypeIcon className="button-icon" />} title="Basic Information" />
        <div className="field-stack">
          <label className="form-field">
            <span>Event Name</span>
            <input
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="e.g. Afrochella 2026"
              value={form.title}
            />
          </label>
          <label className="form-field">
            <span>Event Description</span>
            <textarea
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Describe your event to potential attendees..."
              rows={4}
              value={form.description}
            />
          </label>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<ClockIcon className="button-icon" />} title="Date & Time" />
        <div className="toggle-pair">
          <button
            className={`toggle-pair__option${form.scheduleType === 'one-time' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => updateScheduleType('one-time')}
            type="button"
          >
            One-time
          </button>
          <button
            className={`toggle-pair__option${form.scheduleType === 'recurring' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => updateScheduleType('recurring')}
            type="button"
          >
            Recurring
          </button>
        </div>
        <div className="form-grid form-grid--dates">
          <label className="form-field">
            <span>Start Date</span>
            <div className="form-field__with-icon">
              <CalendarIcon className="button-icon" />
              <input
                onChange={(event) => updateStartDate(event.target.value)}
                type="date"
                value={form.startDate}
              />
            </div>
          </label>
          <label className="form-field">
            <span>Start Time</span>
            <div className="form-field__with-icon">
              <ClockIcon className="button-icon" />
              <input
                onChange={(event) => updateField('startTime', event.target.value)}
                type="time"
                value={form.startTime}
              />
            </div>
          </label>
          <label className="form-field">
            <span>End Date</span>
            <div className="form-field__with-icon">
              <CalendarIcon className="button-icon" />
              <input
                onChange={(event) => updateField('endDate', event.target.value)}
                type="date"
                value={form.endDate}
              />
            </div>
          </label>
          <label className="form-field">
            <span>End Time</span>
            <div className="form-field__with-icon">
              <ClockIcon className="button-icon" />
              <input
                onChange={(event) => updateField('endTime', event.target.value)}
                type="time"
                value={form.endTime}
              />
            </div>
          </label>
        </div>

        {form.scheduleType === 'recurring' ? (
          <div className="recurrence-panel">
            <div className="form-grid recurrence-grid">
              <label className="form-field">
                <span>Repeats</span>
                <select
                  onChange={(event) =>
                    updateField('recurrenceFrequency', event.target.value as RecurrenceFrequency)
                  }
                  value={form.recurrenceFrequency}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              <label className="form-field">
                <span>Every</span>
                <input
                  min="1"
                  onChange={(event) => updateField('recurrenceInterval', event.target.value)}
                  type="number"
                  value={form.recurrenceInterval}
                />
                <small>
                  {form.recurrenceFrequency === 'daily'
                    ? 'day(s)'
                    : form.recurrenceFrequency === 'weekly'
                      ? 'week(s)'
                      : 'month(s)'}
                </small>
              </label>

              <label className="form-field">
                <span>Repeats Until</span>
                <div className="form-field__with-icon">
                  <CalendarIcon className="button-icon" />
                  <input
                    min={form.startDate || undefined}
                    onChange={(event) => updateField('recurrenceEndDate', event.target.value)}
                    type="date"
                    value={form.recurrenceEndDate}
                  />
                </div>
              </label>
            </div>

            {form.recurrenceFrequency === 'weekly' ? (
              <div className="recurrence-days">
                <span className="recurrence-days__label">Repeat On</span>
                <div className="recurrence-days__options">
                  {weekdayOptions.map((day) => (
                    <button
                      key={day.value}
                      className={`recurrence-day${form.recurrenceDays.includes(day.value) ? ' recurrence-day--active' : ''}`}
                      onClick={() => toggleRecurringDay(day.value)}
                      type="button"
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="recurrence-panel__summary">
              {formatRecurringSummary({
                scheduleType: form.scheduleType,
                recurrenceFrequency: form.recurrenceFrequency,
                recurrenceInterval:
                  Number.isFinite(recurrenceInterval) && recurrenceInterval > 0 ? recurrenceInterval : 1,
                recurrenceDays: form.recurrenceDays,
                recurrenceEndDate: form.recurrenceEndDate,
              })}
            </p>
          </div>
        ) : null}
      </section>

      <section className="form-section">
        <SectionHeading icon={<TicketIcon className="button-icon" />} title="Event Type" />
        <div className="event-type-grid">
          <button
            className={`choice-card${form.eventType === 'free' ? ' choice-card--selected' : ''}`}
            onClick={() => updateField('eventType', 'free')}
            type="button"
          >
            <UsersIcon className="button-icon" />
            <strong>Free Event</strong>
            <span>No tickets or cost</span>
          </button>
          <button
            className={`choice-card${form.eventType === 'rsvp' ? ' choice-card--selected' : ''}`}
            onClick={() => updateField('eventType', 'rsvp')}
            type="button"
          >
            <ShieldCheckIcon className="button-icon" />
            <strong>RSVP Only</strong>
            <span>Manage attendance</span>
          </button>
          <button
            className={`choice-card${form.eventType === 'paid' ? ' choice-card--selected' : ''}`}
            onClick={() => updateField('eventType', 'paid')}
            type="button"
          >
            <TicketIcon className="button-icon" />
            <strong>Paid Tickets</strong>
            <span>Sell tickets online</span>
          </button>
        </div>

        <div className="ticket-editor">
          <div className="ticket-editor__topline">
            <div>
              <span className="ticket-editor__label">Ticket Tiers</span>
              <p>Configure pricing, inventory, sales windows, and waitlist for each tier.</p>
            </div>
            <button className="inline-action" type="button">
              <PlusIcon className="button-icon" />
              <span>Add Tier</span>
            </button>
          </div>

          <div className="ticket-editor__panel">
            <div className="ticket-editor__panel-header">
              <span className="ticket-editor__dot" />
              <strong>{form.ticketName || 'General'}</strong>
            </div>

            <div className="ticket-editor__fields">
              <label className="form-field">
                <span>Ticket Name</span>
                <input
                  onChange={(event) => updateField('ticketName', event.target.value)}
                  placeholder="e.g. VIP Access"
                  value={form.ticketName}
                />
              </label>
              <label className="form-field">
                <span>Price (GHC)</span>
                <input
                  onChange={(event) => updateField('ticketPrice', event.target.value)}
                  value={form.ticketPrice}
                />
              </label>
              <label className="form-field">
                <span>Inventory Limit</span>
                <input
                  onChange={(event) => updateField('inventoryLimit', event.target.value)}
                  value={form.inventoryLimit}
                />
                <small>Sales stop at this limit</small>
              </label>
              <label className="form-field">
                <span>Sales Start Date</span>
                <div className="form-field__with-icon">
                  <CalendarIcon className="button-icon" />
                  <input
                    onChange={(event) => updateField('salesStartDate', event.target.value)}
                    type="date"
                    value={form.salesStartDate}
                  />
                </div>
              </label>
              <label className="form-field">
                <span>Sales End Date</span>
                <div className="form-field__with-icon">
                  <CalendarIcon className="button-icon" />
                  <input
                    onChange={(event) => updateField('salesEndDate', event.target.value)}
                    type="date"
                    value={form.salesEndDate}
                  />
                </div>
              </label>
            </div>

            <div className="ticket-editor__toggles">
              <button
                className={`toggle-card${form.absorbsFee ? ' toggle-card--active' : ''}`}
                onClick={() => updateField('absorbsFee', !form.absorbsFee)}
                type="button"
              >
                <span className={`toggle-card__icon${form.absorbsFee ? ' toggle-card__icon--active' : ''}`} />
                <div>
                  <strong>Absorb Platform Fee</strong>
                  <span>
                    {form.absorbsFee
                      ? 'You cover the platform fee so attendees pay the listed ticket price.'
                      : 'Attendees pay GHC0.00 (includes 5% fee).'}
                  </span>
                </div>
              </button>
              <button
                className={`toggle-card${form.waitlistEnabled ? ' toggle-card--active' : ''}`}
                onClick={() => updateField('waitlistEnabled', !form.waitlistEnabled)}
                type="button"
              >
                <span className={`toggle-card__icon${form.waitlistEnabled ? ' toggle-card__icon--active' : ''}`} />
                <div>
                  <strong>Enable Waitlist</strong>
                  <span>
                    {form.waitlistEnabled
                      ? 'Waitlist is active so guests can join after inventory runs out.'
                      : 'No waitlist - ticket sales close when inventory runs out.'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="ticket-editor__notice">
            <ShieldCheckIcon className="button-icon" />
            <div>
              <strong>Inventory Protection Enabled</strong>
              <p>
                Sales are automatically blocked when a tier reaches its inventory
                limit. Ticket availability updates in real time on your event
                dashboard and public page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<MapPinIcon className="button-icon" />} title="Location" />
        <div className="toggle-pair toggle-pair--left">
          <button
            className={`toggle-pair__option${form.locationType === 'physical' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => updateField('locationType', 'physical')}
            type="button"
          >
            <MapPinIcon className="button-icon" />
            <span>Physical</span>
          </button>
          <button
            className={`toggle-pair__option${form.locationType === 'virtual' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => updateField('locationType', 'virtual')}
            type="button"
          >
            <GlobeIcon className="button-icon" />
            <span>Virtual</span>
          </button>
        </div>
        <label className="form-field">
          <span>{form.locationType === 'physical' ? 'Venue Address' : 'Event URL'}</span>
          <div className="form-field__with-icon">
            {form.locationType === 'physical' ? (
              <MapPinIcon className="button-icon" />
            ) : (
              <GlobeIcon className="button-icon" />
            )}
            <input
              onChange={(event) =>
                form.locationType === 'physical'
                  ? updateField('location', event.target.value)
                  : updateField('eventUrl', event.target.value)
              }
              placeholder={
                form.locationType === 'physical'
                  ? 'e.g. El Wak Stadium, Accra'
                  : 'e.g. https://events.blackvolta.com/live'
              }
              value={form.locationType === 'physical' ? form.location : form.eventUrl}
            />
          </div>
        </label>
      </section>
    </div>
  )
}
