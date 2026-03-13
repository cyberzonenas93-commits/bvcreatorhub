import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import brandMark from '../../BV PORTRAIT MARK.png'
import { AuthField } from '../components/auth/AuthField'
import { AuthModeSwitch } from '../components/auth/AuthModeSwitch'
import { PasswordRequirements } from '../components/auth/PasswordRequirements'
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter'
import {
  defaultSetupData,
  isEmailValid,
  isNonEmpty,
  isPhoneValid,
  writeStoredSetupData,
} from '../lib/merchantSetup'

function isPasswordValid(password: string): boolean {
  if (password.length < 8) return false
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) return false
  if (!/\d/.test(password)) return false
  return true
}

type AuthMode = 'signup' | 'login'

function PasswordToggleIcon({ revealed }: { revealed: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="auth-eye-icon"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      {revealed ? (
        <path
          d="M4 4 20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      ) : null}
    </svg>
  )
}

function PasswordToggleButton({
  revealed,
  onToggle,
}: {
  revealed: boolean
  onToggle: () => void
}) {
  return (
    <button
      aria-label={revealed ? 'Hide password' : 'Show password'}
      aria-pressed={revealed}
      className="auth-field__icon-button"
      onClick={onToggle}
      type="button"
    >
      <PasswordToggleIcon revealed={revealed} />
    </button>
  )
}

export function GetStartedPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('signup')
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false)
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false)

  const [signup, setSignup] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    password: '',
  })

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  const isSignupValid =
    isNonEmpty(signup.businessName) &&
    isNonEmpty(signup.contactPerson) &&
    isPhoneValid(signup.phone) &&
    isEmailValid(signup.email) &&
    isPasswordValid(signup.password)

  const isLoginValid = isEmailValid(login.email) && isNonEmpty(login.password)

  function openOnboardingWithSetupData(
    setupOverrides: Partial<typeof defaultSetupData>,
  ) {
    writeStoredSetupData({
      ...defaultSetupData,
      ...setupOverrides,
    })

    navigate('/setup/account')
  }

  function handleCreateAccount() {
    if (!isSignupValid) {
      return
    }

    openOnboardingWithSetupData({
      organizerName: signup.businessName,
      contactPerson: signup.contactPerson,
      email: signup.email,
      phone: signup.phone,
    })
  }

  function handleLogin() {
    if (!isLoginValid) {
      return
    }

    navigate('/dashboard')
  }

  function handleTryDemoAccount() {
    openOnboardingWithSetupData({
      organizerName: 'Strictly Soul Ghana',
      contactPerson: 'Kofi Mensah',
      email: 'organizer@strictlysoul.gh',
      phone: '+233 24 123 4567',
    })
  }

  return (
    <main className="auth-page">
      <div className="auth-page__inner">
        <div className="auth-page__brand">
          <img className="auth-page__brand-icon" src={brandMark} alt="Black Volta logo" />
          <span className="auth-page__brand-text">Merchant Dashboard</span>
        </div>

        <div className="auth-page__hero">
          <h1 className="auth-page__title">{mode === 'login' ? 'Welcome Back' : 'Get Started'}</h1>
          <p className="auth-page__subtitle">
            {mode === 'login'
              ? 'Sign in to access your merchant dashboard and manage your events'
              : 'Create your merchant account to start selling tickets and managing events'}
          </p>
        </div>

        <section className="auth-card" aria-labelledby="merchant-auth-title">
          <h2 id="merchant-auth-title" className="sr-only">
            Merchant authentication
          </h2>

          <AuthModeSwitch mode={mode} onChange={setMode} />

          <form className="auth-form">
            {mode === 'signup' ? (
              <>
                <AuthField
                  label="Business / Organizer Name"
                  placeholder="e.g., Strictly Soul Ghana"
                  value={signup.businessName}
                  onChange={(v) => setSignup((s) => ({ ...s, businessName: v }))}
                  valid={isNonEmpty(signup.businessName)}
                />
                <AuthField
                  label="Contact Person"
                  placeholder="e.g., Kofi Mensah"
                  value={signup.contactPerson}
                  onChange={(v) => setSignup((s) => ({ ...s, contactPerson: v }))}
                  valid={isNonEmpty(signup.contactPerson)}
                />
                <AuthField
                  label="Phone Number"
                  placeholder="024 123 4567"
                  helper={
                    signup.phone.length > 0 && !isPhoneValid(signup.phone)
                      ? 'Enter a valid Ghana phone number, like 024 123 4567 or +233 24 123 4567.'
                      : 'Used for account security and payout notifications'
                  }
                  value={signup.phone}
                  onChange={(v) => setSignup((s) => ({ ...s, phone: v }))}
                  valid={isPhoneValid(signup.phone)}
                />
                <AuthField
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                  helper={
                    signup.email.length > 0 && !isEmailValid(signup.email)
                      ? 'Enter a valid email address, like organizer@events.gh.'
                      : "We'll send event updates and important notifications here"
                  }
                  value={signup.email}
                  onChange={(v) => setSignup((s) => ({ ...s, email: v }))}
                  valid={isEmailValid(signup.email)}
                />
                <AuthField
                  label="Password"
                  placeholder="Create a strong password"
                  type={signupPasswordVisible ? 'text' : 'password'}
                  value={signup.password}
                  onChange={(v) => setSignup((s) => ({ ...s, password: v }))}
                  valid={isPasswordValid(signup.password)}
                  trailing={
                    <PasswordToggleButton
                      revealed={signupPasswordVisible}
                      onToggle={() => setSignupPasswordVisible((current) => !current)}
                    />
                  }
                />
                <PasswordStrengthMeter password={signup.password} />
                <PasswordRequirements />

                <div className="auth-actions">
                  <button
                    className="auth-button auth-button--primary"
                    disabled={!isSignupValid}
                    onClick={handleCreateAccount}
                    type="button"
                  >
                    Create Account
                  </button>
                  <button
                    className="auth-button auth-button--secondary"
                    onClick={handleTryDemoAccount}
                    type="button"
                  >
                    Try Demo Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <AuthField
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                  helper={
                    login.email.length > 0 && !isEmailValid(login.email)
                      ? 'Enter the email in a valid format, like your@email.com.'
                      : 'Use the same email tied to your merchant account'
                  }
                  value={login.email}
                  onChange={(v) => setLogin((s) => ({ ...s, email: v }))}
                  valid={isEmailValid(login.email)}
                />
                <AuthField
                  label="Password"
                  placeholder="Enter your password"
                  type={loginPasswordVisible ? 'text' : 'password'}
                  value={login.password}
                  onChange={(v) => setLogin((s) => ({ ...s, password: v }))}
                  valid={isNonEmpty(login.password)}
                  trailing={
                    <PasswordToggleButton
                      revealed={loginPasswordVisible}
                      onToggle={() => setLoginPasswordVisible((current) => !current)}
                    />
                  }
                />

                <div className="auth-actions">
                  <button
                    className="auth-button auth-button--primary"
                    disabled={!isLoginValid}
                    onClick={handleLogin}
                    type="button"
                  >
                    Sign In
                  </button>
                  <button
                    className="auth-button auth-button--secondary"
                    onClick={() => navigate('/dashboard')}
                    type="button"
                  >
                    Try Demo Login
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="auth-legal">
            By signing up, you agree to our{' '}
            <span className="auth-legal__link">Terms of Service</span> and{' '}
            <span className="auth-legal__link">Privacy Policy</span>
          </p>
        </section>
      </div>
    </main>
  )
}
