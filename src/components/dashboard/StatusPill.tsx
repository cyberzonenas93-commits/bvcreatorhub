type StatusPillProps = {
  label: string
  tone?: 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'info'
}

export function StatusPill({ label, tone = 'muted' }: StatusPillProps) {
  return <span className={`status-pill status-pill--${tone}`}>{label}</span>
}
