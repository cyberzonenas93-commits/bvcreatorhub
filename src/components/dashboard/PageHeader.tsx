import {
  chevronDownIcon,
  createEventIcon,
  exportIcon,
  filterIcon,
} from '../../assets/figma'

type PageHeaderProps = {
  title: string
  subtitle: string
  showActions?: boolean
}

export function PageHeader({
  title,
  subtitle,
  showActions = false,
}: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header__copy">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {showActions ? (
        <div className="page-header__actions">
          <button className="secondary-button" type="button">
            <img src={filterIcon} alt="" aria-hidden="true" />
            <span>Lifetime</span>
            <img src={chevronDownIcon} alt="" aria-hidden="true" />
          </button>

          <button className="secondary-button" type="button">
            <img src={exportIcon} alt="" aria-hidden="true" />
            <span>Export</span>
          </button>

          <button className="primary-button" type="button">
            <img src={createEventIcon} alt="" aria-hidden="true" />
            <span>Create Event</span>
          </button>
        </div>
      ) : null}
    </section>
  )
}
