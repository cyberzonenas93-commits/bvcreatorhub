import type { ReactNode } from 'react'

type AuthFieldProps = {
  label: string
  placeholder: string
  helper?: string
  type?: string
  trailing?: ReactNode
}

export function AuthField({
  label,
  placeholder,
  helper,
  type = 'text',
  trailing,
}: AuthFieldProps) {
  return (
    <label className="auth-field">
      <span className="auth-field__label">
        {label} <span aria-hidden="true">*</span>
      </span>
      <span className="auth-field__control">
        <input className="auth-field__input" placeholder={placeholder} type={type} />
        {trailing ? <span className="auth-field__trailing">{trailing}</span> : null}
      </span>
      {helper ? <span className="auth-field__helper">{helper}</span> : null}
    </label>
  )
}
