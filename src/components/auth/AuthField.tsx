import type { ReactNode } from 'react'

function CheckIcon() {
  return (
    <svg
      aria-hidden
      className="auth-field__check"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

type AuthFieldProps = {
  label: string
  placeholder: string
  helper?: string
  type?: string
  trailing?: ReactNode
  value?: string
  onChange?: (value: string) => void
  valid?: boolean
}

export function AuthField({
  label,
  placeholder,
  helper,
  type = 'text',
  trailing,
  value = '',
  onChange,
  valid,
}: AuthFieldProps) {
  return (
    <label className="auth-field">
      <span className="auth-field__label">
        {label} <span aria-hidden="true">*</span>
      </span>
      <span className="auth-field__control">
        <input
          className={`auth-field__input ${trailing || valid ? 'auth-field__input--with-trailing' : ''}`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          aria-invalid={valid === false && value.length > 0 ? true : undefined}
        />
        <span className="auth-field__trailing">
          {valid === true ? <CheckIcon /> : null}
          {trailing ?? null}
        </span>
      </span>
      {helper ? <span className="auth-field__helper">{helper}</span> : null}
    </label>
  )
}
