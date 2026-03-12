import type { Stat } from '../../data/dashboard'

type StatCardProps = {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-card__header">
        <div className="stat-card__label">
          <img src={stat.icon} alt="" aria-hidden="true" />
          <span>{stat.label}</span>
        </div>
        {stat.delta ? <span className="stat-card__delta">{stat.delta}</span> : null}
      </div>
      <p className="stat-card__value">{stat.value}</p>
      <p className="stat-card__helper">{stat.helper}</p>
    </article>
  )
}
