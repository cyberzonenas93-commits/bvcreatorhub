import type { ReactNode } from 'react'

export type MerchHeaderAction = {
  label: string
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  onClick?: () => void
}

type MerchPageHeaderProps = {
  title: string
  subtitle: string
  actions?: MerchHeaderAction[]
}

export function MerchPageHeader({
  title,
  subtitle,
  actions = [],
}: MerchPageHeaderProps) {
  return (
    <section className="page-header merch-page-header">
      <div className="page-header__copy">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {actions.length > 0 ? (
        <div className="page-header__actions">
          {actions.map((action) => (
            <button
              key={action.label}
              className={action.variant === 'primary' ? 'primary-button' : 'secondary-button'}
              onClick={action.onClick}
              type="button"
            >
              {action.icon ? (
                <span aria-hidden="true" className="merch-action-button__icon">
                  {action.icon}
                </span>
              ) : null}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}
