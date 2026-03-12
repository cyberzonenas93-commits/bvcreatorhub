import { ChartCard } from '../components/dashboard/ChartCard'
import { PageHeader } from '../components/dashboard/PageHeader'
import { RegistrationsTable } from '../components/dashboard/RegistrationsTable'
import { StatsGrid } from '../components/dashboard/StatsGrid'

export function OverviewPage() {
  return (
    <div className="dashboard-page">
      <PageHeader
        title="Overview"
        subtitle="Aggregated performance metrics across 3 active events."
        showActions
      />
      <StatsGrid />
      <ChartCard />
      <RegistrationsTable />
    </div>
  )
}
