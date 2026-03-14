import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import brandMark from '../../BV PORTRAIT MARK.png'
import { DashboardModal } from '../components/dashboard/Modal'
import {
  CheckIcon,
  InfoIcon,
  MailIcon,
  XIcon,
} from '../components/ui/Icons'
import {
  defaultSetupData,
  isEmailValid,
  isNonEmpty,
  isPhoneValid,
  writeStoredSetupData,
} from '../lib/merchSetup'

type AuthMode = 'signup' | 'login'
type InfoModalKind = 'terms' | 'privacy' | 'recovery' | null
type SignupField = 'businessName' | 'contactPerson' | 'phone' | 'email' | 'password'
type LoginField = 'email' | 'password'

const REMEMBER_EMAIL_KEY = 'bv-creator-hub-remember-email'

function readRememberedEmail() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(REMEMBER_EMAIL_KEY) ?? ''
}

function writeRememberedEmail(email: string | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (email) {
    window.localStorage.setItem(REMEMBER_EMAIL_KEY, email)
    return
  }

  window.localStorage.removeItem(REMEMBER_EMAIL_KEY)
}

function formatPhoneNumber(value: string) {
  const cleaned = value.replace(/\D/g, '')

  if (cleaned.startsWith('233')) {
    const match = cleaned.match(/^(233)(\d{0,2})(\d{0,3})(\d{0,4})$/)

    if (match) {
      return `+${match[1]}${match[2] ? ` ${match[2]}` : ''}${match[3] ? ` ${match[3]}` : ''}${match[4] ? ` ${match[4]}` : ''}`.trim()
    }
  }

  if (cleaned.startsWith('0')) {
    const match = cleaned.match(/^(0)(\d{0,2})(\d{0,3})(\d{0,4})$/)

    if (match) {
      return `${match[1]}${match[2]}${match[3] ? ` ${match[3]}` : ''}${match[4] ? ` ${match[4]}` : ''}`.trim()
    }
  }

  return value
}

function getPasswordError(password: string) {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter'
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter'
  if (!/\d/.test(password)) return 'Include at least one number'
  return ''
}

function getPasswordStrength(password: string) {
  if (!password) {
    return { percent: 0, label: '', tone: 'empty' as const }
  }

  let score = 0

  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 25
  if (/[a-z]/.test(password)) score += 15
  if (/[A-Z]/.test(password)) score += 15
  if (/\d/.test(password)) score += 10
  if (/[^A-Za-z0-9]/.test(password)) score += 10

  if (score <= 25) {
    return { percent: score, label: 'Weak', tone: 'weak' as const }
  }

  if (score <= 50) {
    return { percent: score, label: 'Fair', tone: 'fair' as const }
  }

  if (score <= 75) {
    return { percent: score, label: 'Good', tone: 'good' as const }
  }

  return { percent: score, label: 'Strong', tone: 'strong' as const }
}

function getSignupFieldError(
  field: SignupField,
  state: {
    businessName: string
    contactPerson: string
    phone: string
    email: string
    password: string
  },
) {
  switch (field) {
    case 'businessName':
      if (!isNonEmpty(state.businessName)) return 'Brand or storefront name is required'
      if (state.businessName.trim().length < 2) return 'Brand or storefront name is too short'
      return ''
    case 'contactPerson':
      if (!isNonEmpty(state.contactPerson)) return 'Contact person is required'
      if (state.contactPerson.trim().length < 2) return 'Contact person name is too short'
      return ''
    case 'phone':
      if (!isNonEmpty(state.phone)) return 'Phone number is required'
      if (!isPhoneValid(state.phone)) {
        return 'Enter a valid Ghana phone number, like 024 123 4567 or +233 24 123 4567.'
      }
      return ''
    case 'email':
      if (!isNonEmpty(state.email)) return 'Email address is required'
      if (!isEmailValid(state.email)) return 'Enter a valid email address, like studio@brand.com.'
      return ''
    case 'password':
      return getPasswordError(state.password)
    default:
      return ''
  }
}

function getLoginFieldError(
  field: LoginField,
  state: {
    email: string
    password: string
  },
) {
  if (field === 'email') {
    if (!isNonEmpty(state.email)) return 'Email address is required'
    if (!isEmailValid(state.email)) return 'Enter the email in a valid format, like studio@brand.com.'
    return ''
  }

  if (!isNonEmpty(state.password)) return 'Password is required'
  return ''
}

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
      className="creator-auth-field__toggle"
      onClick={onToggle}
      type="button"
    >
      <PasswordToggleIcon revealed={revealed} />
    </button>
  )
}

function CreatorAuthField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  helper,
  error,
  touched,
  trailing,
}: {
  label: string
  value: string
  onChange: (nextValue: string) => void
  onBlur: () => void
  placeholder: string
  type?: string
  helper?: string
  error?: string
  touched?: boolean
  trailing?: ReactNode
}) {
  const showError = Boolean(touched && error)
  const showSuccess = Boolean(touched && value.trim().length > 0 && !error)
  const showValidation = Boolean(touched && value.trim().length > 0)

  return (
    <label className="creator-auth-field">
      <span className="creator-auth-field__label">
        {label} <span aria-hidden="true">*</span>
      </span>
      <span className="creator-auth-field__control">
        <input
          aria-invalid={showError ? true : undefined}
          className={`creator-auth-field__input${showError ? ' creator-auth-field__input--error' : ''}${showSuccess ? ' creator-auth-field__input--valid' : ''}${trailing ? ' creator-auth-field__input--with-toggle' : ''}`}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {showValidation ? (
          <span className={`creator-auth-field__status${trailing ? ' creator-auth-field__status--offset' : ''}`}>
            {showError ? (
              <XIcon className="creator-auth-field__status-icon creator-auth-field__status-icon--error" />
            ) : (
              <CheckIcon className="creator-auth-field__status-icon creator-auth-field__status-icon--success" />
            )}
          </span>
        ) : null}
        {trailing ? <span className="creator-auth-field__trailing">{trailing}</span> : null}
      </span>
      {helper || showError ? (
        <span className={`creator-auth-field__helper${showError ? ' creator-auth-field__helper--error' : ''}`}>
          {showError ? error : helper}
        </span>
      ) : null}
    </label>
  )
}

function CreatorAuthButton({
  variant,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary'
}) {
  return (
    <button
      className={`creator-auth-button creator-auth-button--${variant}`}
      {...props}
      type={props.type ?? 'button'}
    >
      <span>{children}</span>
    </button>
  )
}

export function MerchGetStartedPage() {
  const navigate = useNavigate()
  const rememberedEmail = readRememberedEmail()
  const [mode, setMode] = useState<AuthMode>('signup')
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false)
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail))
  const [infoModal, setInfoModal] = useState<InfoModalKind>(null)

  const [signup, setSignup] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    password: '',
  })
  const [login, setLogin] = useState({
    email: rememberedEmail,
    password: '',
  })

  const [signupTouched, setSignupTouched] = useState<Record<SignupField, boolean>>({
    businessName: false,
    contactPerson: false,
    phone: false,
    email: false,
    password: false,
  })
  const [loginTouched, setLoginTouched] = useState<Record<LoginField, boolean>>({
    email: false,
    password: false,
  })

  const signupErrors: Record<SignupField, string> = {
    businessName: getSignupFieldError('businessName', signup),
    contactPerson: getSignupFieldError('contactPerson', signup),
    phone: getSignupFieldError('phone', signup),
    email: getSignupFieldError('email', signup),
    password: getSignupFieldError('password', signup),
  }
  const loginErrors: Record<LoginField, string> = {
    email: getLoginFieldError('email', login),
    password: getLoginFieldError('password', login),
  }

  const signupIsValid = Object.values(signupErrors).every((error) => !error)
  const loginIsValid = Object.values(loginErrors).every((error) => !error)
  const passwordStrength = getPasswordStrength(signup.password)
  const passwordChecks = {
    length: signup.password.length >= 8,
    case: /[a-z]/.test(signup.password) && /[A-Z]/.test(signup.password),
    number: /\d/.test(signup.password),
  }

  function openOnboardingWithSetupData(setupOverrides: Partial<typeof defaultSetupData>) {
    writeStoredSetupData({
      ...defaultSetupData,
      ...setupOverrides,
    })

    navigate('/merch/setup/account')
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setSignupTouched({
      businessName: false,
      contactPerson: false,
      phone: false,
      email: false,
      password: false,
    })
    setLoginTouched({
      email: false,
      password: false,
    })
  }

  function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSignupTouched({
      businessName: true,
      contactPerson: true,
      phone: true,
      email: true,
      password: true,
    })

    if (!signupIsValid) {
      return
    }

    openOnboardingWithSetupData({
      organizerName: signup.businessName,
      contactPerson: signup.contactPerson,
      email: signup.email,
      phone: signup.phone,
    })
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoginTouched({
      email: true,
      password: true,
    })

    if (!loginIsValid) {
      return
    }

    writeRememberedEmail(rememberMe ? login.email : null)
    navigate('/merch/analytics')
  }

  function handleTryDemoAccount() {
    openOnboardingWithSetupData({
      organizerName: 'Christie Brown Studio',
      contactPerson: 'Ama Owusu',
      email: 'studio@christiebrown.test',
      phone: '+233 24 444 7788',
      businessType: 'Designer Studio',
      instagram: '@christiebrownofficial',
    })
  }

  function handleTryDemoLogin() {
    writeRememberedEmail(rememberMe ? 'studio@christiebrown.test' : null)
    navigate('/merch/analytics')
  }

  return (
    <main className="auth-page auth-page--creator">
      <div className="auth-page__inner">
        <div className="auth-page__brand">
          <img className="auth-page__brand-icon" src={brandMark} alt="Blacvolta logo" />
          <span className="auth-page__brand-text">BV Creator Hub</span>
        </div>

        <div className="auth-page__hero">
          <h1 className="auth-page__title">{mode === 'login' ? 'Welcome Back' : 'Get Started'}</h1>
          <p className="auth-page__subtitle">
            {mode === 'login'
              ? 'Sign in to manage your storefront, products, orders, and payouts through BV Creator Hub.'
              : 'Create your merchant account to sell across the Blacvolta app and web platform.'}
          </p>
        </div>

        <section className="creator-auth-card" aria-labelledby="creator-auth-title">
          <h2 id="creator-auth-title" className="sr-only">
            BV Creator Hub vendor authentication
          </h2>

          <div className="creator-auth-toggle" role="tablist" aria-label="Authentication mode">
            <button
              aria-selected={mode === 'signup'}
              className={`creator-auth-toggle__button${mode === 'signup' ? ' creator-auth-toggle__button--active' : ''}`}
              onClick={() => switchMode('signup')}
              role="tab"
              type="button"
            >
              Sign Up
            </button>
            <button
              aria-selected={mode === 'login'}
              className={`creator-auth-toggle__button${mode === 'login' ? ' creator-auth-toggle__button--active' : ''}`}
              onClick={() => switchMode('login')}
              role="tab"
              type="button"
            >
              Login
            </button>
          </div>

          {mode === 'signup' ? (
            <form className="creator-auth-form" noValidate onSubmit={handleCreateAccount}>
              <CreatorAuthField
                error={signupErrors.businessName}
                helper={undefined}
                label="Brand / Storefront Name"
                onBlur={() => setSignupTouched((current) => ({ ...current, businessName: true }))}
                onChange={(value) => setSignup((current) => ({ ...current, businessName: value }))}
                placeholder="e.g., Christie Brown"
                touched={signupTouched.businessName}
                value={signup.businessName}
              />

              <CreatorAuthField
                error={signupErrors.contactPerson}
                helper={undefined}
                label="Contact Person"
                onBlur={() => setSignupTouched((current) => ({ ...current, contactPerson: true }))}
                onChange={(value) => setSignup((current) => ({ ...current, contactPerson: value }))}
                placeholder="e.g., Ama Owusu"
                touched={signupTouched.contactPerson}
                value={signup.contactPerson}
              />

              <CreatorAuthField
                error={signupErrors.phone}
                helper="Used for account security and payout notifications."
                label="Phone Number"
                onBlur={() => setSignupTouched((current) => ({ ...current, phone: true }))}
                onChange={(value) =>
                  setSignup((current) => ({
                    ...current,
                    phone: formatPhoneNumber(value),
                  }))
                }
                placeholder="024 123 4567"
                touched={signupTouched.phone}
                value={signup.phone}
              />

              <CreatorAuthField
                error={signupErrors.email}
                helper="We'll send order updates and store verification notices here."
                label="Email Address"
                onBlur={() => setSignupTouched((current) => ({ ...current, email: true }))}
                onChange={(value) => setSignup((current) => ({ ...current, email: value }))}
                placeholder="studio@brand.com"
                touched={signupTouched.email}
                type="email"
                value={signup.email}
              />

              <div className="creator-auth-password-block">
                <CreatorAuthField
                  error={signupErrors.password}
                  label="Password"
                  onBlur={() => setSignupTouched((current) => ({ ...current, password: true }))}
                  onChange={(value) => setSignup((current) => ({ ...current, password: value }))}
                  placeholder="Create a strong password"
                  touched={signupTouched.password}
                  trailing={
                    <PasswordToggleButton
                      revealed={signupPasswordVisible}
                      onToggle={() => setSignupPasswordVisible((current) => !current)}
                    />
                  }
                  type={signupPasswordVisible ? 'text' : 'password'}
                  value={signup.password}
                />

                {signup.password ? (
                  <div className="creator-auth-password-strength" aria-live="polite">
                    <div className="creator-auth-password-strength__track">
                      <span
                        className={`creator-auth-password-strength__fill creator-auth-password-strength__fill--${passwordStrength.tone}`}
                        style={{ width: `${passwordStrength.percent}%` }}
                      />
                    </div>
                    <span className={`creator-auth-password-strength__label creator-auth-password-strength__label--${passwordStrength.tone}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                ) : null}

                <div className="creator-auth-password-requirements" aria-label="Password requirements">
                  <p className="creator-auth-password-requirements__title">Password must include:</p>
                  <ul className="creator-auth-password-requirements__list">
                    <li className={passwordChecks.length ? 'is-complete' : ''}>
                      {passwordChecks.length ? <CheckIcon className="creator-auth-password-requirements__icon" /> : <span className="creator-auth-password-requirements__bullet">•</span>}
                      <span>At least 8 characters</span>
                    </li>
                    <li className={passwordChecks.case ? 'is-complete' : ''}>
                      {passwordChecks.case ? <CheckIcon className="creator-auth-password-requirements__icon" /> : <span className="creator-auth-password-requirements__bullet">•</span>}
                      <span>Uppercase & lowercase letters</span>
                    </li>
                    <li className={passwordChecks.number ? 'is-complete' : ''}>
                      {passwordChecks.number ? <CheckIcon className="creator-auth-password-requirements__icon" /> : <span className="creator-auth-password-requirements__bullet">•</span>}
                      <span>At least one number</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="creator-auth-actions">
                <CreatorAuthButton type="submit" variant="primary">
                  Create Storefront
                </CreatorAuthButton>
                <CreatorAuthButton onClick={handleTryDemoAccount} variant="secondary">
                  Try Demo Account
                </CreatorAuthButton>
              </div>

              <p className="creator-auth-legal">
                By signing up, you agree to our{' '}
                <button className="creator-auth-link-button" onClick={() => setInfoModal('terms')} type="button">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="creator-auth-link-button" onClick={() => setInfoModal('privacy')} type="button">
                  Privacy Policy
                </button>
              </p>
            </form>
          ) : (
            <form className="creator-auth-form" noValidate onSubmit={handleLogin}>
              <CreatorAuthField
                error={loginErrors.email}
                label="Email Address"
                onBlur={() => setLoginTouched((current) => ({ ...current, email: true }))}
                onChange={(value) => setLogin((current) => ({ ...current, email: value }))}
                placeholder="studio@brand.com"
                touched={loginTouched.email}
                type="email"
                value={login.email}
              />

              <CreatorAuthField
                error={loginErrors.password}
                label="Password"
                onBlur={() => setLoginTouched((current) => ({ ...current, password: true }))}
                onChange={(value) => setLogin((current) => ({ ...current, password: value }))}
                placeholder="Enter your password"
                touched={loginTouched.password}
                trailing={
                  <PasswordToggleButton
                    revealed={loginPasswordVisible}
                    onToggle={() => setLoginPasswordVisible((current) => !current)}
                  />
                }
                type={loginPasswordVisible ? 'text' : 'password'}
                value={login.password}
              />

              <div className="creator-auth-login-row">
                <label className="creator-auth-checkbox">
                  <input
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  className="creator-auth-link-button"
                  onClick={() => setInfoModal('recovery')}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              <div className="creator-auth-actions">
                <CreatorAuthButton type="submit" variant="primary">
                  Sign In
                </CreatorAuthButton>
                <CreatorAuthButton onClick={handleTryDemoLogin} variant="secondary">
                  Try Demo Login
                </CreatorAuthButton>
              </div>
            </form>
          )}
        </section>
      </div>

      {infoModal === 'terms' ? (
        <DashboardModal
          onClose={() => setInfoModal(null)}
          title="Terms of Service"
          footer={
            <button className="primary-button" onClick={() => setInfoModal(null)} type="button">
              Close
            </button>
          }
        >
          <div className="creator-auth-modal-copy">
            <p>
              BV Creator Hub helps approved vendors manage storefronts, products, orders, payouts,
              and customer activity across Blacvolta commerce surfaces.
            </p>
            <ul className="feature-list">
              <li>You are responsible for accurate product, pricing, and fulfillment information.</li>
              <li>Payouts follow the settlement method and verification details connected to your store.</li>
              <li>Accounts that breach marketplace, refund, or compliance rules may be paused for review.</li>
            </ul>
          </div>
        </DashboardModal>
      ) : null}

      {infoModal === 'privacy' ? (
        <DashboardModal
          onClose={() => setInfoModal(null)}
          title="Privacy Policy"
          footer={
            <button className="primary-button" onClick={() => setInfoModal(null)} type="button">
              Close
            </button>
          }
        >
          <div className="creator-auth-modal-copy">
            <p>
              Your onboarding and store account details are used to verify your business, route
              payouts, protect customer transactions, and support order communication.
            </p>
            <ul className="feature-list">
              <li>Contact details are used for order alerts, account security, and payout updates.</li>
              <li>Verification documents are reviewed only for onboarding and compliance checks.</li>
              <li>Store analytics are surfaced inside your vendor dashboard to help you operate your shop.</li>
            </ul>
          </div>
        </DashboardModal>
      ) : null}

      {infoModal === 'recovery' ? (
        <DashboardModal
          onClose={() => setInfoModal(null)}
          title="Password Help"
          footer={
            <button className="primary-button" onClick={() => setInfoModal(null)} type="button">
              Close
            </button>
          }
        >
          <div className="creator-auth-modal-copy">
            <p>
              Password reset flows will plug into the live authentication backend when database auth
              is connected. For now, use the email tied to your store and continue with the demo login if
              you need to preview the dashboard.
            </p>
            <div className="creator-auth-modal-note">
              <InfoIcon className="creator-auth-modal-note__icon" />
              <span>Your live reset experience will be connected in the production auth integration.</span>
            </div>
            <div className="creator-auth-modal-note">
              <MailIcon className="creator-auth-modal-note__icon" />
              <span>Keep your main store email current so recovery can be routed correctly once auth goes live.</span>
            </div>
          </div>
        </DashboardModal>
      ) : null}
    </main>
  )
}
