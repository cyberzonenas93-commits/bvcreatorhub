import type { ReactNode } from 'react'

export type DashboardMetric = {
  label: string
  value: string
  helper: string
  delta?: string
  icon: ReactNode
  tone?: 'accent' | 'success' | 'warning' | 'info'
}

export function MetricsGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <section className="stats-grid metrics-grid" aria-label="Key metrics">
      {metrics.map((metric) => (
        <article key={metric.label} className={`stat-card metric-card metric-card--${metric.tone ?? 'accent'}`}>
          <div className="stat-card__header">
            <div className="stat-card__label">
              <span aria-hidden="true" className="metric-card__icon">
                {metric.icon}
              </span>
              <span>{metric.label}</span>
            </div>
            {metric.delta ? <span className="stat-card__delta">{metric.delta}</span> : null}
          </div>
          <p className="stat-card__value">{metric.value}</p>
          <p className="stat-card__helper">{metric.helper}</p>
        </article>
      ))}
    </section>
  )
}
