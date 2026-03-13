import { useMemo, useState } from 'react'

import { chartFrame, type PerformancePoint } from '../../data/dashboard'

type Point = {
  x: number
  y: number
}

type ChartCardProps = {
  points: PerformancePoint[]
}

function roundUp(value: number, step: number) {
  return Math.ceil(value / step) * step
}

function pointsFromSeries(values: number[], maxValue: number): Point[] {
  const plotWidth = chartFrame.width - chartFrame.left - chartFrame.right
  const plotHeight = chartFrame.height - chartFrame.top - chartFrame.bottom

  return values.map((value, index) => {
    const ratioX = values.length === 1 ? 1 : index / (values.length - 1)
    const ratioY = maxValue === 0 ? 0 : value / maxValue

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

function tooltipWidth(point: PerformancePoint) {
  return point.month.length > 3 ? 180 : 154
}

export function ChartCard({ points }: ChartCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(Math.max(0, points.length - 1))

  const {
    revenueAxisLabels,
    registrationAxisLabels,
    revenuePoints,
    registrationPoints,
    axisY,
  } = useMemo(() => {
    const maxRevenue = roundUp(
      Math.max(...points.map((point) => point.revenue), 0),
      10000,
    )
    const maxRegistrations = roundUp(
      Math.max(...points.map((point) => point.registrations), 0),
      200,
    )
    const axisY = [5, 82.5, 160, 237.5, 315]
    const revenueAxisLabels = axisY.map((_, index) => {
      const value = maxRevenue - (maxRevenue / 4) * index
      return index === axisY.length - 1 ? 'GH₵0' : `GH₵${Math.round(value / 1000)}k`
    })
    const registrationAxisLabels = axisY.map((_, index) =>
      String(Math.round(maxRegistrations - (maxRegistrations / 4) * index)),
    )

    return {
      revenueAxisLabels,
      registrationAxisLabels,
      revenuePoints: pointsFromSeries(
        points.map((point) => point.revenue),
        maxRevenue,
      ),
      registrationPoints: pointsFromSeries(
        points.map((point) => point.registrations),
        maxRegistrations,
      ),
      axisY,
    }
  }, [points])

  const selectedPoint = points[selectedIndex]
  const selectedRevenuePoint = revenuePoints[selectedIndex]
  const selectedRegistrationPoint = registrationPoints[selectedIndex]

  function getNearestIndex(clientX: number, bounds: DOMRect) {
    const relativeX = ((clientX - bounds.left) / bounds.width) * chartFrame.width
    const nearestIndex = revenuePoints.reduce(
      (bestIndex, point, index) =>
        Math.abs(point.x - relativeX) < Math.abs(revenuePoints[bestIndex].x - relativeX)
          ? index
          : bestIndex,
      0,
    )

    return nearestIndex
  }

  function updateFromClientX(clientX: number, bounds: DOMRect) {
    setSelectedIndex(getNearestIndex(clientX, bounds))
  }

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
        className="chart-svg chart-svg--interactive"
        viewBox={`0 0 ${chartFrame.width} ${chartFrame.height}`}
        role="img"
        aria-label={`Interactive revenue and registration chart. Selected month ${selectedPoint.month}, revenue GH₵${selectedPoint.revenue.toLocaleString('en-US')}, registrations ${selectedPoint.registrations}.`}
        onClick={(event) => updateFromClientX(event.clientX, event.currentTarget.getBoundingClientRect())}
        onMouseMove={(event) => updateFromClientX(event.clientX, event.currentTarget.getBoundingClientRect())}
        onPointerDown={(event) => updateFromClientX(event.clientX, event.currentTarget.getBoundingClientRect())}
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(254, 255, 28, 0.56)" />
            <stop offset="100%" stopColor="rgba(254, 255, 28, 0)" />
          </linearGradient>
          <linearGradient id="registrationFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(72, 242, 100, 0.22)" />
            <stop offset="100%" stopColor="rgba(72, 242, 100, 0)" />
          </linearGradient>
        </defs>

        <rect
          className="chart-hit-area"
          x={chartFrame.left}
          y={chartFrame.top}
          width={chartFrame.width - chartFrame.left - chartFrame.right}
          height={chartFrame.height - chartFrame.top - chartFrame.bottom}
          rx="18"
        />

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

        {revenueAxisLabels.map((label, index) => (
          <text
            key={label}
            className="chart-axis-label chart-axis-label--left"
            x={chartFrame.left - 16}
            y={axisY[index] + 4}
          >
            {label}
          </text>
        ))}

        {registrationAxisLabels.map((label, index) => (
          <text
            key={label}
            className="chart-axis-label chart-axis-label--right"
            x={chartFrame.width - chartFrame.right + 8}
            y={axisY[index] + 4}
          >
            {label}
          </text>
        ))}

        {points.map((point, index) => (
          <text
            key={point.month}
            className="chart-axis-label chart-axis-label--month"
            x={revenuePoints[index].x}
            y={chartFrame.height - 10}
          >
            {point.month}
          </text>
        ))}

        <path d={areaPath(registrationPoints)} fill="url(#registrationFill)" />
        <path d={areaPath(revenuePoints)} fill="url(#revenueFill)" />
        <path d={smoothPath(registrationPoints)} className="chart-line chart-line--success" />
        <path d={smoothPath(revenuePoints)} className="chart-line chart-line--accent" />

        <line
          className="chart-focus-line"
          x1={selectedRevenuePoint.x}
          x2={selectedRevenuePoint.x}
          y1={chartFrame.top}
          y2={chartFrame.height - chartFrame.bottom}
        />
        <circle
          className="chart-focus-point chart-focus-point--accent"
          cx={selectedRevenuePoint.x}
          cy={selectedRevenuePoint.y}
          r="5.5"
        />
        <circle
          className="chart-focus-point chart-focus-point--success"
          cx={selectedRegistrationPoint.x}
          cy={selectedRegistrationPoint.y}
          r="4.5"
        />

        <g
          transform={`translate(${Math.min(
            Math.max(selectedRevenuePoint.x - tooltipWidth(selectedPoint) / 2, chartFrame.left + 18),
            chartFrame.width - chartFrame.right - tooltipWidth(selectedPoint),
          )}, ${Math.max(selectedRevenuePoint.y - 94, chartFrame.top + 8)})`}
        >
          <rect className="chart-tooltip" height="74" rx="10" width={tooltipWidth(selectedPoint)} />
          <text className="chart-tooltip__title" x="14" y="20">
            {selectedPoint.month}
          </text>
          <text className="chart-tooltip__revenue" x="14" y="42">
            Revenue: GH₵{selectedPoint.revenue.toLocaleString('en-US')}
          </text>
          <text className="chart-tooltip__registrations" x="14" y="60">
            Registrations: {selectedPoint.registrations}
          </text>
        </g>
      </svg>
    </section>
  )
}
