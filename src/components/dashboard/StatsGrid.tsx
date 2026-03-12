import { stats } from '../../data/dashboard'
import { StatCard } from './StatCard'

export function StatsGrid() {
  return (
    <section className="stats-grid" aria-label="Key metrics">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </section>
  )
}
