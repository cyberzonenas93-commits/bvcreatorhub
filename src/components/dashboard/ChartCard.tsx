import {
  chartFrame,
  chartMonths,
  registrationSeries,
  revenueSeries,
} from '../../data/dashboard'

type Point = {
  x: number
  y: number
}

function pointsFromSeries(values: number[], maxValue: number): Point[] {
  const plotWidth = chartFrame.width - chartFrame.left - chartFrame.right
  const plotHeight = chartFrame.height - chartFrame.top - chartFrame.bottom

  return values.map((value, index) => {
    const ratioX = index / (values.length - 1)
    const ratioY = value / maxValue

    return {
      x: chartFrame.left + plotWidth * ratioX,
      y: chartFrame.top + plotHeight - plotHeight * ratioY,
    }
  })
}

function smoothPath(points: Point[]): string {
  if (points.length === 0) {
    return ''
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }

    const previous = points[index - 1]
    const deltaX = point.x - previous.x
    const cp1x = previous.x + deltaX * 0.4
    const cp2x = point.x - deltaX * 0.4

    return `${path} C ${cp1x} ${previous.y}, ${cp2x} ${point.y}, ${point.x} ${point.y}`
  }, '')
}

function areaPath(points: Point[]): string {
  if (points.length === 0) {
    return ''
  }

  const baseY = chartFrame.height - chartFrame.bottom
  const linePath = smoothPath(points)
  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]

  return `${linePath} L ${lastPoint.x} ${baseY} L ${firstPoint.x} ${baseY} Z`
}

export function ChartCard() {
  const revenuePoints = pointsFromSeries(revenueSeries, 60000)
  const registrationPoints = pointsFromSeries(registrationSeries, 600)
  const leftAxisLabels = ['$60k', '$45k', '$30k', '$15k', '$0k']
  const rightAxisLabels = ['600', '450', '300', '150', '0']
  const axisY = [5, 82.5, 160, 237.5, 315]

  return (
    <section className="chart-card" aria-labelledby="performance-title">
      <div className="section-heading">
        <div>
          <h2 id="performance-title" className="section-title">
            Performance Over Time
          </h2>
          <p className="section-subtitle">
            Revenue and registrations growth to date
          </p>
        </div>
        <div className="chart-legend" aria-label="Chart legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot--accent" />
            Revenue
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-dot--light" />
            Registrations
          </span>
        </div>
      </div>

      <svg
        className="chart-svg"
        viewBox={`0 0 ${chartFrame.width} ${chartFrame.height}`}
        role="img"
        aria-label="Revenue and registrations increase from January to June."
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(254, 255, 28, 0.5)" />
            <stop offset="100%" stopColor="rgba(254, 255, 28, 0)" />
          </linearGradient>
          <linearGradient id="registrationFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(248, 249, 250, 0.18)" />
            <stop offset="100%" stopColor="rgba(248, 249, 250, 0)" />
          </linearGradient>
        </defs>

        {axisY.map((position) => (
          <line
            key={position}
            className="chart-grid-line"
            x1={chartFrame.left}
            x2={chartFrame.width - chartFrame.right}
            y1={position}
            y2={position}
          />
        ))}

        {leftAxisLabels.map((label, index) => (
          <text
            key={label}
            className="chart-axis-label chart-axis-label--left"
            x={chartFrame.left - 16}
            y={axisY[index] + 4}
          >
            {label}
          </text>
        ))}

        {rightAxisLabels.map((label, index) => (
          <text
            key={label}
            className="chart-axis-label chart-axis-label--right"
            x={chartFrame.width - chartFrame.right + 8}
            y={axisY[index] + 4}
          >
            {label}
          </text>
        ))}

        {chartMonths.map((label, index) => {
          const point = revenuePoints[index]
          return (
            <text
              key={label}
              className="chart-axis-label chart-axis-label--month"
              x={point.x}
              y={chartFrame.height - 10}
            >
              {label}
            </text>
          )
        })}

        <path d={areaPath(registrationPoints)} fill="url(#registrationFill)" />
        <path d={areaPath(revenuePoints)} fill="url(#revenueFill)" />
        <path d={smoothPath(registrationPoints)} className="chart-line chart-line--light" />
        <path d={smoothPath(revenuePoints)} className="chart-line chart-line--accent" />
      </svg>
    </section>
  )
}
