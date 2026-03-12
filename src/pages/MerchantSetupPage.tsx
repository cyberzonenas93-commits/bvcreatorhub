import type { ChangeEvent } from 'react'
import { useEffect, useId, useState } from 'react'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentIcon,
  ImageIcon,
  ShieldCheckIcon,
} from '../components/ui/Icons'

type SetupStepKey = 'account' | 'verification' | 'payout' | 'review'
type RegisteredBusiness = 'yes' | 'no'
type PayoutMethod = 'bank-transfer' | 'mobile-money'

interface MerchantSetupData {
  organizerName: string
  contactPerson: string
  email: string
  phone: string
  businessType: string
  instagram: string
  logoFileName: string
  governmentIdFileName: string
  selfieFileName: string
  isRegisteredBusiness: RegisteredBusiness
  payoutMethod: PayoutMethod
  bankName: string
  accountName: string
  accountNumber: string
  network: string
  payoutPhone: string
  settlementPreference: string
  agreedToPayoutTerms: boolean
  agreesToCompliance: boolean
}

const STORAGE_KEY = 'bv-merchant-setup'

const setupSteps = [
  { id: 'account', label: 'Account' },
  { id: 'verification', label: 'Verification' },
  { id: 'payout', label: 'Payout' },
  { id: 'review', label: 'Review' },
] as const satisfies ReadonlyArray<{ id: SetupStepKey; label: string }>

const businessTypeOptions = [
  'Event Organizer',
  'Festival Producer',
  'Venue Operator',
  'Community Brand',
]

const networkOptions = ['MTN Mobile Money', 'Telecel Cash', 'AirtelTigo Money']

const settlementOptions = ['After event ends', 'Daily settlement', 'Weekly settlement']

const defaultSetupData: MerchantSetupData = {
  organizerName: 'Strictly Soul Ghana',
  contactPerson: 'Yaw Afful',
  email: 'organizer@events.gh',
  phone: '+233 24 123 4567',
  businessType: 'Event Organizer',
  instagram: '@strictlysoulghana',
  logoFileName: '10.0.2.16.png',
  governmentIdFileName: 'ghana-card.pdf',
  selfieFileName: '',
  isRegisteredBusiness: 'no',
  payoutMethod: 'mobile-money',
  bankName: 'GCB Bank',
  accountName: 'Strictly Soul Ghana',
  accountNumber: '0599449113',
  network: 'MTN Mobile Money',
  payoutPhone: '+233 24 123 4567',
  settlementPreference: 'After event ends',
  agreedToPayoutTerms: true,
  agreesToCompliance: true,
}

function readStoredSetupData() {
  if (typeof window === 'undefined') {
    return defaultSetupData
  }

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return defaultSetupData
    }

    return {
      ...defaultSetupData,
      ...JSON.parse(stored),
    } satisfies MerchantSetupData
  } catch {
    return defaultSetupData
  }
}

function SetupFieldLabel({
  label,
  required = true,
  optional = false,
}: {
  label: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <span className="setup-field__label">
      {label}
      {required ? <mark>*</mark> : null}
      {optional ? <em>(Optional)</em> : null}
    </span>
  )
}

function SetupTextField({
  label,
  value,
  placeholder,
  helper,
  type = 'text',
  onChange,
  required = true,
  optional = false,
}: {
  label: string
  value: string
  placeholder?: string
  helper?: string
  type?: 'text' | 'email' | 'tel'
  onChange: (nextValue: string) => void
  required?: boolean
  optional?: boolean
}) {
  const inputId = useId()

  return (
    <label className="setup-field" htmlFor={inputId}>
      <SetupFieldLabel label={label} optional={optional} required={required} />
      <input
        className="setup-input"
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {helper ? <small className="setup-field__helper">{helper}</small> : null}
    </label>
  )
}

function SetupSelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (nextValue: string) => void
}) {
  const inputId = useId()

  return (
    <div className="setup-field">
      <label htmlFor={inputId}>
        <SetupFieldLabel label={label} />
      </label>
      <div className="setup-select">
        <select
          className="setup-input setup-input--select"
          id={inputId}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronRightIcon className="setup-select__icon" />
      </div>
    </div>
  )
}

function SetupUploadField({
  label,
  fileName,
  helper,
  buttonLabel,
  icon,
  optional = false,
  required = true,
  onChange,
}: {
  label: string
  fileName: string
  helper?: string
  buttonLabel: string
  icon: 'document' | 'image'
  optional?: boolean
  required?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const inputId = useId()
  const Icon = icon === 'image' ? ImageIcon : DocumentIcon

  return (
    <div className="setup-field">
      <label htmlFor={inputId}>
        <SetupFieldLabel label={label} optional={optional} required={required} />
      </label>
      <input
        className="sr-only"
        id={inputId}
        onChange={onChange}
        type="file"
      />
      <label className="setup-upload" htmlFor={inputId}>
        <span className="setup-upload__icon">
          <Icon className="button-icon" />
        </span>
        <span className="setup-upload__copy">
          <strong>{fileName || buttonLabel}</strong>
          <small>{fileName ? 'Tap to replace file' : buttonLabel}</small>
        </span>
      </label>
      {helper ? <small className="setup-field__helper">{helper}</small> : null}
    </div>
  )
}

function SetupSummaryCard({
  title,
  rows,
}: {
  title: string
  rows: ReadonlyArray<{ label: string; value: string; tone?: 'success' | 'accent' }>
}) {
  return (
    <section className="setup-summary-card">
      <div className="setup-summary-card__title">
        <span className="setup-summary-card__dot" />
        <h2>{title}</h2>
      </div>
      <dl className="setup-summary-list">
        {rows.map((row) => (
          <div key={row.label} className="setup-summary-list__row">
            <dt>{row.label}</dt>
            <dd
              className={
                row.tone ? `setup-summary-list__value setup-summary-list__value--${row.tone}` : 'setup-summary-list__value'
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function MerchantSetupPage() {
  const navigate = useNavigate()
  const { step } = useParams<{ step: SetupStepKey }>()
  const [setupData, setSetupData] = useState<MerchantSetupData>(readStoredSetupData)

  const currentIndex = setupSteps.findIndex((entry) => entry.id === step)

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(setupData))
  }, [setupData])

  if (currentIndex === -1 || !step) {
    return <Navigate replace to="/setup/account" />
  }

  const currentStep = setupSteps[currentIndex]

  function updateField<Key extends keyof MerchantSetupData>(
    field: Key,
    value: MerchantSetupData[Key],
  ) {
    setSetupData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleFileChange(field: 'logoFileName' | 'governmentIdFileName' | 'selfieFileName') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const fileName = event.target.files?.[0]?.name ?? ''

      if (fileName) {
        updateField(field, fileName)
      }
    }
  }

  function goToStep(targetStep: SetupStepKey) {
    navigate(`/setup/${targetStep}`)
  }

  function goBack() {
    if (currentIndex === 0) {
      return
    }

    goToStep(setupSteps[currentIndex - 1].id)
  }

  function goForward() {
    if (currentIndex === setupSteps.length - 1) {
      navigate('/overview')
      return
    }

    goToStep(setupSteps[currentIndex + 1].id)
  }

  const organizerSummaryRows = [
    { label: 'Business Name', value: setupData.organizerName },
    { label: 'Contact Person', value: setupData.contactPerson },
    { label: 'Email', value: setupData.email },
    { label: 'Phone', value: setupData.phone },
    { label: 'Business Type', value: setupData.businessType },
  ]

  const verificationSummaryRows = [
    {
      label: 'Government ID',
      value: setupData.governmentIdFileName ? 'Uploaded' : 'Pending upload',
      tone: setupData.governmentIdFileName ? 'success' : undefined,
    },
    {
      label: 'Selfie',
      value: setupData.selfieFileName ? 'Uploaded' : 'Not provided',
    },
    {
      label: 'Business Status',
      value:
        setupData.isRegisteredBusiness === 'yes'
          ? 'Registered Business'
          : 'Individual Organizer',
    },
  ] as const

  const payoutSummaryRows =
    setupData.payoutMethod === 'mobile-money'
      ? [
          { label: 'Method', value: 'Mobile Money' },
          { label: 'Network', value: setupData.network },
          { label: 'Number', value: setupData.payoutPhone },
          { label: 'Settlement', value: setupData.settlementPreference },
        ]
      : [
          { label: 'Method', value: 'Bank Transfer' },
          { label: 'Bank', value: setupData.bankName },
          { label: 'Account Name', value: setupData.accountName },
          { label: 'Account Number', value: setupData.accountNumber },
        ]

  return (
    <main className="setup-page">
      <div className="setup-shell">
        <p className="setup-shell__eyebrow">Merchant Ticketing Dashboard</p>

        <nav aria-label="Merchant setup progress" className="setup-stepper">
          {setupSteps.map((setupStep, index) => {
            const state =
              index < currentIndex
                ? 'completed'
                : index === currentIndex
                  ? 'current'
                  : 'upcoming'

            return (
              <div className="setup-stepper__item" key={setupStep.id}>
                <button
                  className={`setup-stepper__button setup-stepper__button--${state}`}
                  onClick={() => goToStep(setupStep.id)}
                  type="button"
                >
                  <span className="setup-stepper__circle" aria-hidden="true">
                    {state === 'completed' ? (
                      <CheckIcon className="setup-stepper__check" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="setup-stepper__label">{setupStep.label}</span>
                </button>
                {index < setupSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`setup-stepper__line${index < currentIndex ? ' setup-stepper__line--active' : ''}`}
                  />
                ) : null}
              </div>
            )
          })}
        </nav>

        <section className="setup-card">
          <header className="setup-card__header">
            {currentStep.id === 'account' ? (
              <>
                <h1>Create Your Organizer Account</h1>
                <p>
                  Start selling in minutes. We&apos;ll guide you through setup and
                  payouts.
                </p>
              </>
            ) : null}
            {currentStep.id === 'verification' ? (
              <>
                <h1>Verify Your Identity</h1>
                <p>This protects your buyers and ensures smooth payouts.</p>
              </>
            ) : null}
            {currentStep.id === 'payout' ? (
              <>
                <h1>Set Up Your Payout Method</h1>
                <p>This is where we&apos;ll send your ticket revenue.</p>
              </>
            ) : null}
            {currentStep.id === 'review' ? (
              <>
                <h1>Review Your Details</h1>
                <p>Please confirm all information is correct before submitting.</p>
              </>
            ) : null}
          </header>

          <div className="setup-card__body">
            {currentStep.id === 'account' ? (
              <>
                <SetupTextField
                  label="Business / Organizer Name"
                  onChange={(value) => updateField('organizerName', value)}
                  placeholder="e.g. Strictly Soul Ghana"
                  value={setupData.organizerName}
                />
                <SetupTextField
                  label="Contact Person"
                  onChange={(value) => updateField('contactPerson', value)}
                  placeholder="e.g. Kofi Mensah"
                  value={setupData.contactPerson}
                />
                <SetupTextField
                  label="Email Address"
                  onChange={(value) => updateField('email', value)}
                  placeholder="organizer@events.gh"
                  type="email"
                  value={setupData.email}
                />
                <SetupTextField
                  helper="Used for login, ticket support, and payout alerts."
                  label="Phone Number"
                  onChange={(value) => updateField('phone', value)}
                  placeholder="+233 24 123 4567"
                  type="tel"
                  value={setupData.phone}
                />
                <SetupSelectField
                  label="Business Type"
                  onChange={(value) => updateField('businessType', value)}
                  options={businessTypeOptions}
                  value={setupData.businessType}
                />
                <SetupTextField
                  helper="Helps us verify your brand and event history."
                  label="Instagram"
                  onChange={(value) => updateField('instagram', value)}
                  optional
                  placeholder="@yourbrandname"
                  required={false}
                  value={setupData.instagram}
                />
                <SetupUploadField
                  buttonLabel="Upload Logo"
                  fileName={setupData.logoFileName}
                  helper="Appears on your event pages."
                  icon="image"
                  label="Logo Upload"
                  onChange={handleFileChange('logoFileName')}
                />
              </>
            ) : null}

            {currentStep.id === 'verification' ? (
              <>
                <div className="setup-section">
                  <span className="setup-section__label">Identity</span>
                  <div className="setup-section__stack">
                    <SetupUploadField
                      buttonLabel="Upload ID"
                      fileName={setupData.governmentIdFileName}
                      helper="Ghana Card, Passport, or Driver&apos;s License."
                      icon="document"
                      label="Upload Government ID"
                      onChange={handleFileChange('governmentIdFileName')}
                    />
                    <SetupUploadField
                      buttonLabel="Upload Selfie"
                      fileName={setupData.selfieFileName}
                      helper="Helps us verify ownership."
                      icon="image"
                      label="Optional Selfie Upload"
                      onChange={handleFileChange('selfieFileName')}
                      optional
                      required={false}
                    />
                  </div>
                </div>

                <div className="setup-section">
                  <span className="setup-section__label">Business Details</span>
                  <div className="setup-field">
                    <SetupFieldLabel label="Are You a Registered Business?" />
                    <div className="setup-pill-row">
                      <button
                        className={`setup-pill-button${setupData.isRegisteredBusiness === 'yes' ? ' setup-pill-button--active' : ''}`}
                        onClick={() => updateField('isRegisteredBusiness', 'yes')}
                        type="button"
                      >
                        Yes
                      </button>
                      <button
                        className={`setup-pill-button${setupData.isRegisteredBusiness === 'no' ? ' setup-pill-button--active' : ''}`}
                        onClick={() => updateField('isRegisteredBusiness', 'no')}
                        type="button"
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="setup-inline-note">
                    <span>
                      We&apos;ll register you as an{' '}
                      <strong>
                        {setupData.isRegisteredBusiness === 'yes'
                          ? 'Official Business'
                          : 'Individual Organizer'}
                      </strong>
                      .
                    </span>
                  </div>
                  <div className="setup-status-note">
                    <ShieldCheckIcon className="button-icon" />
                    <span>Verification typically takes less than 24 hours.</span>
                  </div>
                </div>
              </>
            ) : null}

            {currentStep.id === 'payout' ? (
              <>
                <div className="setup-field">
                  <SetupFieldLabel label="Preferred Payout Method" />
                  <div className="setup-pill-row">
                    <button
                      className={`setup-pill-button${setupData.payoutMethod === 'bank-transfer' ? ' setup-pill-button--active' : ''}`}
                      onClick={() => updateField('payoutMethod', 'bank-transfer')}
                      type="button"
                    >
                      Bank Transfer
                    </button>
                    <button
                      className={`setup-pill-button${setupData.payoutMethod === 'mobile-money' ? ' setup-pill-button--active' : ''}`}
                      onClick={() => updateField('payoutMethod', 'mobile-money')}
                      type="button"
                    >
                      Mobile Money
                    </button>
                  </div>
                </div>

                {setupData.payoutMethod === 'mobile-money' ? (
                  <>
                    <SetupSelectField
                      label="Network"
                      onChange={(value) => updateField('network', value)}
                      options={networkOptions}
                      value={setupData.network}
                    />
                    <SetupTextField
                      label="Mobile Number"
                      onChange={(value) => updateField('payoutPhone', value)}
                      placeholder="+233 24 123 4567"
                      type="tel"
                      value={setupData.payoutPhone}
                    />
                  </>
                ) : (
                  <>
                    <SetupTextField
                      label="Bank Name"
                      onChange={(value) => updateField('bankName', value)}
                      placeholder="e.g. GCB Bank"
                      value={setupData.bankName}
                    />
                    <SetupTextField
                      label="Account Name"
                      onChange={(value) => updateField('accountName', value)}
                      placeholder="Business account name"
                      value={setupData.accountName}
                    />
                    <SetupTextField
                      label="Account Number"
                      onChange={(value) => updateField('accountNumber', value)}
                      placeholder="0123456789"
                      value={setupData.accountNumber}
                    />
                  </>
                )}

                <SetupSelectField
                  label="Settlement Preference"
                  onChange={(value) => updateField('settlementPreference', value)}
                  options={settlementOptions}
                  value={setupData.settlementPreference}
                />

                <section className="setup-fee-card">
                  <div className="setup-fee-card__title">
                    <ClockIcon className="button-icon" />
                    <span>Service Fee Agreement</span>
                  </div>
                  <p>
                    Black Volta charges <strong>2.5%</strong> per ticket sold.
                  </p>
                  <label className="setup-check">
                    <input
                      checked={setupData.agreedToPayoutTerms}
                      onChange={(event) => updateField('agreedToPayoutTerms', event.target.checked)}
                      type="checkbox"
                    />
                    <span>I agree to the payout and service fee terms.</span>
                  </label>
                </section>
              </>
            ) : null}

            {currentStep.id === 'review' ? (
              <>
                <SetupSummaryCard rows={organizerSummaryRows} title="Organizer Details" />
                <SetupSummaryCard rows={verificationSummaryRows} title="Verification Status" />
                <SetupSummaryCard rows={payoutSummaryRows} title="Payout Method" />

                <label className="setup-review-check">
                  <input
                    checked={setupData.agreesToCompliance}
                    onChange={(event) => updateField('agreesToCompliance', event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    I confirm this business complies with local laws and refund
                    policies.
                  </span>
                </label>
              </>
            ) : null}
          </div>

          <footer
            className={`setup-actions${currentStep.id === 'account' ? ' setup-actions--single' : ''}`}
          >
            {currentStep.id === 'account' ? null : (
              <button className="setup-button setup-button--secondary" onClick={goBack} type="button">
                <ArrowLeftIcon className="button-icon" />
                <span>Back</span>
              </button>
            )}
            <button className="setup-button setup-button--primary" onClick={goForward} type="button">
              <span>{currentStep.id === 'review' ? 'Submit for Approval' : 'Continue'}</span>
            </button>
          </footer>

          {currentStep.id === 'account' ? (
            <p className="setup-footer-note">
              <ShieldCheckIcon className="button-icon" />
              <span>Secure onboarding. Your information is encrypted and protected.</span>
            </p>
          ) : null}
        </section>
      </div>
    </main>
  )
}
