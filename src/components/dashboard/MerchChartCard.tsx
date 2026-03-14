import { useMemo, useState } from 'react'

type ChartPoint = {
  label: string
  primary: number
  secondary: number
}

type Point = {
  x: number
  y: number
}

type MerchChartCardProps = {
  title: string
  subtitle: string
  points: ChartPoint[]
  primaryLabel: string
  secondaryLabel: string
  primaryStep: number
  secondaryStep: number
  formatPrimaryTick: (value: number) => string
  formatSecondaryTick: (value: number) => string
  formatPrimaryValue: (value: number) => string
  formatSecondaryValue: (value: number) => string
}

const chartFrame = {
  width: 1065,
  height: 350,
  left: 92,
  right: 72,
  top: 5,
  bottom: 35,
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

function smoothPath(points: Point[]) {
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

function areaPath(points: Point[]) {
  if (points.length === 0) {
    return ''
  }

  const baseY = chartFrame.height - chartFrame.bottom
  const linePath = smoothPath(points)
  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]

  return `${linePath} L ${lastPoint.x} ${baseY} L ${firstPoint.x} ${baseY} Z`
}

function tooltipWidth(point: ChartPoint) {
  return point.label.length > 7 ? 196 : 172
}

export function MerchChartCard({
  title,
  subtitle,
  points,
  primaryLabel,
  secondaryLabel,
  primaryStep,
  secondaryStep,
  formatPrimaryTick,
  formatSecondaryTick,
  formatPrimaryValue,
  formatSecondaryValue,
}: MerchChartCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(Math.max(0, points.length - 1))

  const {
    primaryAxisLabels,
    secondaryAxisLabels,
    primaryPoints,
    secondaryPoints,
    axisY,
  } = useMemo(() => {
    const maxPrimary = roundUp(Math.max(...points.map((point) => point.primary), 0), primaryStep)
    const maxSecondary = roundUp(
      Math.max(...points.map((point) => point.secondary), 0),
      secondaryStep,
    )
    const axisY = [5, 82.5, 160, 237.5, 315]

    return {
      primaryAxisLabels: axisY.map((_, index) =>
        formatPrimaryTick(maxPrimary - (maxPrimary / 4) * index),
      ),
      secondaryAxisLabels: axisY.map((_, index) =>
        formatSecondaryTick(maxSecondary - (maxSecondary / 4) * index),
      ),
      primaryPoints: pointsFromSeries(
        points.map((point) => point.primary),
        maxPrimary,
      ),
      secondaryPoints: pointsFromSeries(
        points.map((point) => point.secondary),
        maxSecondary,
      ),
      axisY,
    }
  }, [
    formatPrimaryTick,
    formatSecondaryTick,
    points,
    primaryStep,
    secondaryStep,
  ])

  const safeIndex = Math.min(selectedIndex, Math.max(0, points.length - 1))
  const selectedPoint = points[safeIndex]
  const selectedPrimaryPoint = primaryPoints[safeIndex]
  const selectedSecondaryPoint = secondaryPoints[safeIndex]

  function getNearestIndex(clientX: number, bounds: DOMRect) {
    const relativeX = ((clientX - bounds.left) / bounds.width) * chartFrame.width

    return primaryPoints.reduce(
      (bestIndex, point, index) =>
        Math.abs(point.x - relativeX) < Math.abs(primaryPoints[bestIndex].x - relativeX)
          ? index
          : bestIndex,
      0,
    )
  }

  function updateFromClientX(clientX: number, bounds: DOMRect) {
    setSelectedIndex(getNearestIndex(clientX, bounds))
  }

  if (points.length === 0 || !selectedPoint || !selectedPrimaryPoint || !selectedSecondaryPoint) {
    return null
  }

  return (
    <section className="chart-card" aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}>
      <div className="section-heading">
        <div>
          <h2 id={`${title.toLowerCase().replace(/\s+/g, '-')}-title`} className="section-title">
            {title}
          </h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="chart-legend" aria-label="Chart legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot--accent" />
            {primaryLabel}
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-dot--success" />
            {secondaryLabel}
          </span>
        </div>
      </div>

      <svg
        className="chart-svg chart-svg--interactive"
        viewBox={`0 0 ${chartFrame.width} ${chartFrame.height}`}
        role="img"
        aria-label={`Interactive ${title}. Selected ${selectedPoint.label}; ${primaryLabel} ${formatPrimaryValue(selectedPoint.primary)}; ${secondaryLabel} ${formatSecondaryValue(selectedPoint.secondary)}.`}
        onClick={(event) =>
          updateFromClientX(event.clientX, event.currentTarget.getBoundingClientRect())
        }
        onMouseMove={(event) =>
          updateFromClientX(event.clientX, event.currentTarget.getBoundingClientRect())
        }
        onPointerDown={(event) =>
          updateFromClientX(event.clientX, event.currentTarget.getBoundingClientRect())
        }
      >
        <defs>
          <linearGradient id="chartPrimaryFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(254, 255, 28, 0.56)" />
            <stop offset="100%" stopColor="rgba(254, 255, 28, 0)" />
          </linearGradient>
          <linearGradient id="chartSecondaryFill" x1="0" y1="0" x2="0" y2="1">
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

        {primaryAxisLabels.map((label, index) => (
          <text
            key={`primary-${label}-${index}`}
            className="chart-axis-label chart-axis-label--left"
            x={chartFrame.left - 16}
            y={axisY[index] + 4}
          >
            {label}
          </text>
        ))}

        {secondaryAxisLabels.map((label, index) => (
          <text
            key={`secondary-${label}-${index}`}
            className="chart-axis-label chart-axis-label--right"
            x={chartFrame.width - chartFrame.right + 8}
            y={axisY[index] + 4}
          >
            {label}
          </text>
        ))}

        {points.map((point, index) => (
          <text
            key={point.label}
            className="chart-axis-label chart-axis-label--month"
            x={primaryPoints[index].x}
            y={chartFrame.height - 10}
          >
            {point.label}
          </text>
        ))}

        <path d={areaPath(secondaryPoints)} fill="url(#chartSecondaryFill)" />
        <path d={areaPath(primaryPoints)} fill="url(#chartPrimaryFill)" />
        <path d={smoothPath(secondaryPoints)} className="chart-line chart-line--success" />
        <path d={smoothPath(primaryPoints)} className="chart-line chart-line--accent" />

        <line
          className="chart-focus-line"
          x1={selectedPrimaryPoint.x}
          x2={selectedPrimaryPoint.x}
          y1={chartFrame.top}
          y2={chartFrame.height - chartFrame.bottom}
        />
        <circle
          className="chart-focus-point chart-focus-point--accent"
          cx={selectedPrimaryPoint.x}
          cy={selectedPrimaryPoint.y}
          r="5.5"
        />
        <circle
          className="chart-focus-point chart-focus-point--success"
          cx={selectedSecondaryPoint.x}
          cy={selectedSecondaryPoint.y}
          r="4.5"
        />

        <g
          transform={`translate(${Math.min(
            Math.max(selectedPrimaryPoint.x - tooltipWidth(selectedPoint) / 2, chartFrame.left + 18),
            chartFrame.width - chartFrame.right - tooltipWidth(selectedPoint),
          )}, ${Math.max(selectedPrimaryPoint.y - 94, chartFrame.top + 8)})`}
        >
          <rect className="chart-tooltip" height="74" rx="10" width={tooltipWidth(selectedPoint)} />
          <text className="chart-tooltip__title" x="14" y="20">
            {selectedPoint.label}
          </text>
          <text className="chart-tooltip__revenue" x="14" y="42">
            {primaryLabel}: {formatPrimaryValue(selectedPoint.primary)}
          </text>
          <text className="chart-tooltip__registrations" x="14" y="60">
            {secondaryLabel}: {formatSecondaryValue(selectedPoint.secondary)}
          </text>
        </g>
      </svg>
    </section>
  )
}
