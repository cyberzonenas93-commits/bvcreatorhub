type AuthMode = 'signup' | 'login'

type AuthModeSwitchProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthModeSwitch({ mode, onChange }: AuthModeSwitchProps) {
  return (
    <div className="auth-mode-switch" role="tablist" aria-label="Authentication mode">
      <button
        aria-selected={mode === 'signup'}
        className={`auth-mode-switch__option${
          mode === 'signup' ? ' auth-mode-switch__option--active' : ''
        }`}
        role="tab"
        type="button"
        onClick={() => onChange('signup')}
      >
        Sign Up
      </button>
      <button
        aria-selected={mode === 'login'}
        className={`auth-mode-switch__option${
          mode === 'login' ? ' auth-mode-switch__option--active' : ''
        }`}
        role="tab"
        type="button"
        onClick={() => onChange('login')}
      >
        Login
      </button>
    </div>
  )
}
