import { DashboardModal } from './Modal'

export type ActionSummarySection = {
  title: string
  items: string[]
}

type ActionSummaryModalProps = {
  title: string
  description: string
  sections: ActionSummarySection[]
  onClose: () => void
  primaryActionLabel?: string
  onPrimaryAction?: () => void
}

export function ActionSummaryModal({
  title,
  description,
  sections,
  onClose,
  primaryActionLabel,
  onPrimaryAction,
}: ActionSummaryModalProps) {
  const footer = (
    <>
      <button className="secondary-button" onClick={onClose} type="button">
        Close
      </button>
      {primaryActionLabel && onPrimaryAction ? (
        <button className="primary-button" onClick={onPrimaryAction} type="button">
          {primaryActionLabel}
        </button>
      ) : null}
    </>
  )

  return (
    <DashboardModal footer={footer} onClose={onClose} title={title}>
      <p className="section-subtitle">{description}</p>

      {sections.map((section) => (
        <section key={section.title}>
          <p className="insight-card__eyebrow">{section.title}</p>
          <ul className="feature-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </DashboardModal>
  )
}
