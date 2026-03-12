import { useState } from 'react'
import { Link } from 'react-router-dom'

import { logoIcon } from '../assets/figma'
import { AuthField } from '../components/auth/AuthField'
import { AuthModeSwitch } from '../components/auth/AuthModeSwitch'
import { PasswordRequirements } from '../components/auth/PasswordRequirements'

type AuthMode = 'signup' | 'login'

function EyeIcon() {
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
    </svg>
  )
}

export function GetStartedPage() {
  const [mode, setMode] = useState<AuthMode>('signup')

  return (
    <main className="auth-page">
      <div className="auth-page__inner">
        <div className="auth-page__brand">
          <img className="auth-page__brand-icon" src={logoIcon} alt="Black Volta logo" />
          <span className="auth-page__brand-text">Merchant Ticketing</span>
        </div>

        <div className="auth-page__hero">
          <h1 className="auth-page__title">Get Started</h1>
          <p className="auth-page__subtitle">
            Create your merchant account to start selling tickets and managing
            events
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
                />
                <AuthField label="Contact Person" placeholder="e.g., Kofi Mensah" />
                <AuthField
                  label="Phone Number"
                  placeholder="024 123 4567"
                  helper="Used for account security and payout notifications"
                />
                <AuthField
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                  helper="We'll send event updates and important notifications here"
                />
                <AuthField
                  label="Password"
                  placeholder="Create a strong password"
                  type="password"
                  trailing={<EyeIcon />}
                />
                <PasswordRequirements />

                <div className="auth-actions">
                  <button className="auth-button auth-button--primary" type="button">
                    Create Account
                  </button>
                  <Link className="auth-button auth-button--secondary" to="/overview">
                    Try Demo Account
                  </Link>
                </div>
              </>
            ) : (
              <>
                <AuthField
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                  helper="Use the same email tied to your merchant account"
                />
                <AuthField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  trailing={<EyeIcon />}
                />

                <div className="auth-actions">
                  <button className="auth-button auth-button--primary" type="button">
                    Login
                  </button>
                  <Link className="auth-button auth-button--secondary" to="/overview">
                    Try Demo Account
                  </Link>
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
