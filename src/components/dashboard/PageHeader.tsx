import {
  CalendarIcon,
  ChevronDownIcon,
  DownloadIcon,
  PlusIcon,
} from '../ui/Icons'

type PageHeaderProps = {
  title: string
  subtitle: string
  showActions?: boolean
  rangeLabel?: string
  onRangeClick?: () => void
  onExport?: () => void
  onCreateEvent?: () => void
}

export function PageHeader({
  title,
  subtitle,
  showActions = false,
  rangeLabel = 'Lifetime',
  onRangeClick,
  onExport,
  onCreateEvent,
}: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header__copy">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {showActions ? (
        <div className="page-header__actions">
          <button className="secondary-button" onClick={onRangeClick} type="button">
            <CalendarIcon className="button-icon" aria-hidden="true" />
            <span>{rangeLabel}</span>
            <ChevronDownIcon className="button-icon button-icon--small" aria-hidden="true" />
          </button>

          <button className="secondary-button" onClick={onExport} type="button">
            <DownloadIcon className="button-icon" aria-hidden="true" />
            <span>Export</span>
          </button>

          <button className="primary-button" onClick={onCreateEvent} type="button">
            <PlusIcon className="button-icon" aria-hidden="true" />
            <span>Create Event</span>
          </button>
        </div>
      ) : null}
    </section>
  )
}
