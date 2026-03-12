type Strength = 'weak' | 'fair' | 'good' | 'strong'

function getPasswordStrength(password: string): { level: 0 | 1 | 2 | 3 | 4; label: Strength } {
  if (!password.length) return { level: 0, label: 'weak' }
  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  const labels: Strength[] = ['weak', 'fair', 'good', 'strong']
  const label = labels[Math.min(score, 3)] as Strength
  const level = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4
  return { level, label }
}

type PasswordStrengthMeterProps = {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { level, label } = getPasswordStrength(password)
  if (!password.length) return null

  return (
    <div className="password-strength" aria-live="polite" aria-label={`Password strength: ${label}`}>
      <div className="password-strength__bars">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`password-strength__bar password-strength__bar--${i <= level ? label : 'empty'}`}
          />
        ))}
      </div>
      <span className={`password-strength__label password-strength__label--${label}`}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
    </div>
  )
}
