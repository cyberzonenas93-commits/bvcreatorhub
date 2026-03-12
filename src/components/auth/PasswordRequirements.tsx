const requirements = [
  'At least 8 characters',
  'Uppercase & lowercase letters',
  'At least one number',
]

export function PasswordRequirements() {
  return (
    <div className="password-checklist" aria-label="Password requirements">
      <p className="password-checklist__title">Password must include:</p>
      <ul className="password-checklist__list">
        {requirements.map((requirement) => (
          <li key={requirement}>{requirement}</li>
        ))}
      </ul>
    </div>
  )
}
