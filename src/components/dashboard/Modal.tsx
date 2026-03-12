import type { ReactNode } from 'react'

import { XIcon } from '../ui/Icons'

export function DashboardModal({
  title,
  children,
  onClose,
  footer,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}) {
  return (
    <div className="dashboard-modal-overlay" role="presentation" onClick={onClose}>
      <section
        aria-modal="true"
        className="dashboard-modal"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="dashboard-modal__header">
          <h2>{title}</h2>
          <button aria-label="Close" className="dashboard-modal__close" onClick={onClose} type="button">
            <XIcon className="button-icon" />
          </button>
        </header>
        <div className="dashboard-modal__body">{children}</div>
        {footer ? <footer className="dashboard-modal__footer">{footer}</footer> : null}
      </section>
    </div>
  )
}
