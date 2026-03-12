import { PageHeader } from '../components/dashboard/PageHeader'

type PlaceholderPageProps = {
  title: string
  description: string
  bullets: string[]
}

export function PlaceholderPage({
  title,
  description,
  bullets,
}: PlaceholderPageProps) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, '-')}-heading`

  return (
    <div className="dashboard-page">
      <PageHeader title={title} subtitle={description} />

      <section className="placeholder-card" aria-labelledby={headingId}>
        <span className="placeholder-card__eyebrow">Next Pass Ready</span>
        <h2 id={headingId} className="section-title">
          {title} route is wired into the shell
        </h2>
        <p className="placeholder-card__copy">
          This page now lives inside the shared dashboard layout, so we can grow it
          into a full workflow without reworking navigation or chrome.
        </p>
        <ul className="placeholder-list">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
