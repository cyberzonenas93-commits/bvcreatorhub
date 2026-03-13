import { useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { ChartCard } from '../components/dashboard/ChartCard'
import { PageHeader } from '../components/dashboard/PageHeader'
import { RegistrationsTable } from '../components/dashboard/RegistrationsTable'
import { StatsGrid } from '../components/dashboard/StatsGrid'
import { overviewSeries, overviewStats, type OverviewRange } from '../data/dashboard'
import { downloadCsv } from '../lib/download'

const rangeOptions: OverviewRange[] = ['Lifetime', 'Last 30 Days', 'Last 90 Days', 'This Year']

export function OverviewPage() {
  const navigate = useNavigate()
  const [activeRange, setActiveRange] = useState<OverviewRange>('Lifetime')
  const [isRangeMenuOpen, setIsRangeMenuOpen] = useState(false)

  const stats = useMemo(() => overviewStats[activeRange], [activeRange])
  const chartPoints = useMemo(() => overviewSeries[activeRange], [activeRange])

  function exportOverview() {
    downloadCsv('merchant-ticketing-overview.csv', [
      ['Month', 'Revenue', 'Registrations'],
      ...chartPoints.map((point) => [
        point.month,
        String(point.revenue),
        String(point.registrations),
      ]),
    ])
  }

  return (
    <div className="dashboard-page overview-page">
      <div className="overview-page__header">
        <PageHeader
          onCreateEvent={() => navigate('/events/new')}
          onExport={exportOverview}
          onRangeClick={() => setIsRangeMenuOpen((open) => !open)}
          rangeLabel={activeRange}
          showActions
          subtitle="Aggregated performance metrics across 3 active events."
          title="Portfolio Aggregation"
        />

        {isRangeMenuOpen ? (
          <div className="overview-page__menu toolbar-dropdown__menu">
            {rangeOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setActiveRange(option)
                  setIsRangeMenuOpen(false)
                }}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <StatsGrid stats={stats} />
      <ChartCard points={chartPoints} />
      <RegistrationsTable />
    </div>
  )
}
