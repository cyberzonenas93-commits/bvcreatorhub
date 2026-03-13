import type { Stat } from '../../data/dashboard'
import { CalendarIcon, DollarIcon, TicketIcon } from '../ui/Icons'

type StatCardProps = {
  stat: Stat
}

function StatIcon({ stat }: { stat: Stat }) {
  if (stat.label.toLowerCase().includes('sales')) {
    return <DollarIcon className="stat-card__icon-svg" aria-hidden="true" />
  }

  if (stat.label.toLowerCase().includes('ticket')) {
    return <TicketIcon className="stat-card__icon-svg" aria-hidden="true" />
  }

  if (stat.label.toLowerCase().includes('event')) {
    return <CalendarIcon className="stat-card__icon-svg" aria-hidden="true" />
  }

  return <img src={stat.icon} alt="" />
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__icon" aria-hidden="true">
          <StatIcon stat={stat} />
        </span>
        {stat.delta ? <span className="stat-card__delta">{stat.delta}</span> : null}
      </div>
      <div className="stat-card__body">
        <p className="stat-card__label">{stat.label}</p>
        <p className="stat-card__value">{stat.value}</p>
        <p className="stat-card__helper">{stat.helper}</p>
      </div>
    </article>
  )
}
