import type { Stat } from '../../data/dashboard'
import { StatCard } from './StatCard'

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="stats-grid" aria-label="Key metrics">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </section>
  )
}
