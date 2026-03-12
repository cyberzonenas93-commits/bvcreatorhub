import type { ReactNode } from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

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

export function CreateEventPage() {
  const [scheduleType, setScheduleType] = useState<'one-time' | 'recurring'>('one-time')
  const [eventType, setEventType] = useState<'free' | 'rsvp' | 'paid'>('paid')
  const [locationType, setLocationType] = useState<'physical' | 'virtual'>('physical')
  const [absorbsFee, setAbsorbsFee] = useState(false)
  const [waitlistEnabled, setWaitlistEnabled] = useState(false)

  return (
    <div className="dashboard-page create-event-page">
      <section className="detail-hero detail-hero--create">
        <div className="detail-hero__left">
          <Link className="back-link" to="/overview">
            <ArrowLeftIcon className="button-icon" />
            <span>Back to Overview</span>
          </Link>

          <div className="detail-hero__title-row detail-hero__title-row--create">
            <ArrowLeftIcon className="detail-back-icon" />
            <div>
              <h1>Create Event</h1>
              <p>Complete the details below to set up your event.</p>
            </div>
          </div>
        </div>

        <div className="detail-hero__actions">
          <button className="surface-button surface-button--wide" type="button">
            <SaveIcon className="button-icon" />
            <span>Save as Draft</span>
          </button>
          <button className="page-primary-cta page-primary-cta--compact" type="button">
            <PaperPlaneIcon className="button-icon" />
            <span>Publish Event</span>
          </button>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<ImageIcon className="button-icon" />} title="Event Media" />
        <div className="upload-panel">
          <div className="upload-panel__icon">
            <ImageIcon className="button-icon" />
          </div>
          <h3>Upload Event Banner</h3>
          <p>Drag and drop or click to browse (JPG, PNG, max 10MB)</p>
          <span>Recommended size: 1200 x 630 pixels</span>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<TypeIcon className="button-icon" />} title="Basic Information" />
        <div className="field-stack">
          <label className="form-field">
            <span>Event Name</span>
            <input defaultValue="" placeholder="e.g. Afrochella 2026" />
          </label>
          <label className="form-field">
            <span>Event Description</span>
            <textarea placeholder="Describe your event to potential attendees..." rows={4} />
          </label>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<ClockIcon className="button-icon" />} title="Date & Time" />
        <div className="toggle-pair">
          <button
            className={`toggle-pair__option${scheduleType === 'one-time' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => setScheduleType('one-time')}
            type="button"
          >
            One-time
          </button>
          <button
            className={`toggle-pair__option${scheduleType === 'recurring' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => setScheduleType('recurring')}
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
              <input defaultValue="" placeholder="" />
            </div>
          </label>
          <label className="form-field">
            <span>Start Time</span>
            <div className="form-field__with-icon">
              <ClockIcon className="button-icon" />
              <input defaultValue="" placeholder="" />
            </div>
          </label>
          <label className="form-field">
            <span>End Date</span>
            <div className="form-field__with-icon">
              <CalendarIcon className="button-icon" />
              <input defaultValue="" placeholder="" />
            </div>
          </label>
          <label className="form-field">
            <span>End Time</span>
            <div className="form-field__with-icon">
              <ClockIcon className="button-icon" />
              <input defaultValue="" placeholder="" />
            </div>
          </label>
        </div>
      </section>

      <section className="form-section">
        <SectionHeading icon={<TicketIcon className="button-icon" />} title="Event Type" />
        <div className="event-type-grid">
          <button
            className={`choice-card${eventType === 'free' ? ' choice-card--selected' : ''}`}
            onClick={() => setEventType('free')}
            type="button"
          >
            <UsersIcon className="button-icon" />
            <strong>Free Event</strong>
            <span>No tickets or cost</span>
          </button>
          <button
            className={`choice-card${eventType === 'rsvp' ? ' choice-card--selected' : ''}`}
            onClick={() => setEventType('rsvp')}
            type="button"
          >
            <ShieldCheckIcon className="button-icon" />
            <strong>RSVP Only</strong>
            <span>Manage attendance</span>
          </button>
          <button
            className={`choice-card${eventType === 'paid' ? ' choice-card--selected' : ''}`}
            onClick={() => setEventType('paid')}
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
              <strong>General</strong>
            </div>

            <div className="ticket-editor__fields">
              <label className="form-field">
                <span>Ticket Name</span>
                <input defaultValue="" placeholder="e.g. VIP Access" />
              </label>
              <label className="form-field">
                <span>Price (GHC)</span>
                <input defaultValue="0.00" />
              </label>
              <label className="form-field">
                <span>Inventory Limit</span>
                <input defaultValue="100" />
                <small>Sales stop at this limit</small>
              </label>
              <label className="form-field">
                <span>Sales Start Date</span>
                <div className="form-field__with-icon">
                  <CalendarIcon className="button-icon" />
                  <input defaultValue="" />
                </div>
              </label>
              <label className="form-field">
                <span>Sales End Date</span>
                <div className="form-field__with-icon">
                  <CalendarIcon className="button-icon" />
                  <input defaultValue="" />
                </div>
              </label>
            </div>

            <div className="ticket-editor__toggles">
              <button
                className={`toggle-card${absorbsFee ? ' toggle-card--active' : ''}`}
                onClick={() => setAbsorbsFee((current) => !current)}
                type="button"
              >
                <span className={`toggle-card__icon${absorbsFee ? ' toggle-card__icon--active' : ''}`} />
                <div>
                  <strong>Absorb Platform Fee</strong>
                  <span>
                    {absorbsFee
                      ? 'You cover the platform fee so attendees pay the listed ticket price.'
                      : 'Attendees pay GHC0.00 (includes 5% fee).'}
                  </span>
                </div>
              </button>
              <button
                className={`toggle-card${waitlistEnabled ? ' toggle-card--active' : ''}`}
                onClick={() => setWaitlistEnabled((current) => !current)}
                type="button"
              >
                <span className={`toggle-card__icon${waitlistEnabled ? ' toggle-card__icon--active' : ''}`} />
                <div>
                  <strong>Enable Waitlist</strong>
                  <span>
                    {waitlistEnabled
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
            className={`toggle-pair__option${locationType === 'physical' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => setLocationType('physical')}
            type="button"
          >
            <MapPinIcon className="button-icon" />
            <span>Physical</span>
          </button>
          <button
            className={`toggle-pair__option${locationType === 'virtual' ? ' toggle-pair__option--active' : ''}`}
            onClick={() => setLocationType('virtual')}
            type="button"
          >
            <GlobeIcon className="button-icon" />
            <span>Virtual</span>
          </button>
        </div>
        <label className="form-field">
          <span>{locationType === 'physical' ? 'Venue Address' : 'Event URL'}</span>
          <div className="form-field__with-icon">
            {locationType === 'physical' ? (
              <MapPinIcon className="button-icon" />
            ) : (
              <GlobeIcon className="button-icon" />
            )}
            <input
              defaultValue=""
              placeholder={
                locationType === 'physical'
                  ? 'e.g. El Wak Stadium, Accra'
                  : 'e.g. https://events.blackvolta.com/live'
              }
            />
          </div>
        </label>
      </section>
    </div>
  )
}
