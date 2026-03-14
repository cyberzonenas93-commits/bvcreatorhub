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
  UploadIcon,
} from '../components/ui/Icons'
import {
  businessTypeOptions,
  isEmailValid,
  isNonEmpty,
  isPhoneValid,
  networkOptions,
  settlementOptions,
  setupSteps,
  type MerchantSetupData,
  type SetupStepKey,
  readStoredSetupData,
  writeStoredSetupData,
} from '../lib/merchSetup'

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
  valid,
  invalidHelper,
}: {
  label: string
  value: string
  placeholder?: string
  helper?: string
  type?: 'text' | 'email' | 'tel'
  onChange: (nextValue: string) => void
  required?: boolean
  optional?: boolean
  valid?: boolean
  invalidHelper?: string
}) {
  const inputId = useId()
  const hasValue = value.trim().length > 0
  const isInvalid = valid === false && hasValue
  const isValid = valid === true && hasValue
  const helperText = isInvalid ? invalidHelper ?? helper : helper

  return (
    <label className="setup-field" htmlFor={inputId}>
      <SetupFieldLabel label={label} optional={optional} required={required} />
      <span className="setup-field__control">
        <input
          className={`setup-input${isValid ? ' setup-input--valid setup-input--with-trailing' : ''}${isInvalid ? ' setup-input--invalid' : ''}`}
          id={inputId}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {isValid ? (
          <span className="setup-field__trailing">
            <CheckIcon className="setup-field__check" />
          </span>
        ) : null}
      </span>
      {helperText ? (
        <small className={`setup-field__helper${isInvalid ? ' setup-field__helper--error' : ''}`}>
          {helperText}
        </small>
      ) : null}
    </label>
  )
}

function SetupSelectField({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  options: string[]
  onChange: (nextValue: string) => void
  placeholder?: string
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
          {placeholder ? (
            <option disabled value="">
              {placeholder}
            </option>
          ) : null}
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
      <input className="sr-only" id={inputId} onChange={onChange} type="file" />
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

function isAccountStepValid(data: MerchantSetupData) {
  return (
    isNonEmpty(data.organizerName) &&
    isNonEmpty(data.contactPerson) &&
    isEmailValid(data.email) &&
    isPhoneValid(data.phone) &&
    isNonEmpty(data.businessType)
  )
}

function isVerificationStepValid(data: MerchantSetupData) {
  if (!isNonEmpty(data.governmentIdFileName)) {
    return false
  }

  if (data.isRegisteredBusiness === 'yes') {
    return isNonEmpty(data.businessRegistrationNumber)
  }

  return true
}

function isPayoutStepValid(data: MerchantSetupData) {
  const hasDestination =
    data.payoutMethod === 'mobile-money'
      ? isNonEmpty(data.network) && isPhoneValid(data.payoutPhone)
      : isNonEmpty(data.bankName) &&
        isNonEmpty(data.accountName) &&
        isNonEmpty(data.accountNumber)

  return hasDestination && isNonEmpty(data.settlementPreference) && data.agreedToPayoutTerms
}

function getHighestUnlockedStepIndex(data: MerchantSetupData) {
  if (!isAccountStepValid(data)) {
    return 0
  }

  if (!isVerificationStepValid(data)) {
    return 1
  }

  if (!isPayoutStepValid(data)) {
    return 2
  }

  return 3
}

export function MerchOnboardingPage() {
  const navigate = useNavigate()
  const { step } = useParams<{ step: SetupStepKey }>()
  const logoUploadId = useId()
  const [setupData, setSetupData] = useState<MerchantSetupData>(readStoredSetupData)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentIndex = setupSteps.findIndex((entry) => entry.id === step)
  const highestUnlockedStepIndex = getHighestUnlockedStepIndex(setupData)

  useEffect(() => {
    writeStoredSetupData(setupData)
  }, [setupData])

  if (currentIndex === -1 || !step) {
    return <Navigate replace to="/merch/setup/account" />
  }

  if (currentIndex > highestUnlockedStepIndex) {
    return <Navigate replace to={`/merch/setup/${setupSteps[highestUnlockedStepIndex].id}`} />
  }

  const currentStep = setupSteps[currentIndex]
  const isCurrentStepValid =
    currentStep.id === 'account'
      ? isAccountStepValid(setupData)
      : currentStep.id === 'verification'
        ? isVerificationStepValid(setupData)
        : currentStep.id === 'payout'
          ? isPayoutStepValid(setupData)
          : setupData.agreesToCompliance

  if (isSubmitted) {
    const payoutDestination =
      setupData.payoutMethod === 'mobile-money' ? setupData.network : setupData.bankName

    return (
      <main className="setup-page">
        <div className="setup-shell setup-shell--success">
          <section className="setup-card setup-card--success">
            <div className="setup-success">
              <span className="setup-success__icon">
                <ShieldCheckIcon className="button-icon" />
              </span>
              <span className="setup-success__badge">Verification In Progress</span>
              <h1>Your Store Is Almost Live</h1>
              <p>
                Your BV Creator Hub store is being verified. We&apos;ll email you as soon as your
                storefront is ready to go live, usually within 24 hours.
              </p>

              <div className="setup-success__summary">
                <div>
                  <span>Brand</span>
                  <strong>{setupData.organizerName}</strong>
                </div>
                <div>
                  <span>Verification</span>
                  <strong>Documents submitted</strong>
                </div>
                <div>
                  <span>Payout method</span>
                  <strong>{payoutDestination}</strong>
                </div>
              </div>

              <button
                className="setup-button setup-button--primary"
                onClick={() => navigate('/merch/analytics')}
                type="button"
              >
                <span>Continue to Your Dashboard</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    )
  }

  function updateField<Key extends keyof MerchantSetupData>(
    field: Key,
    value: MerchantSetupData[Key],
  ) {
    setSetupData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleLogoFile(file: File | null) {
    if (!file || !file.type.startsWith('image/')) {
      return
    }

    updateField('logoFileName', file.name)

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return
      }

      updateField('logoImageUrl', reader.result)
    }
    reader.readAsDataURL(file)
  }

  function handleFileChange(field: 'governmentIdFileName' | 'selfieFileName') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null
      const fileName = file?.name ?? ''

      if (fileName) {
        updateField(field, fileName)
      }
    }
  }

  function goToStep(targetStep: SetupStepKey) {
    navigate(`/merch/setup/${targetStep}`)
  }

  function goBack() {
    if (currentIndex === 0) {
      return
    }

    goToStep(setupSteps[currentIndex - 1].id)
  }

  function goForward() {
    if (!isCurrentStepValid) {
      return
    }

    if (currentIndex === setupSteps.length - 1) {
      const submittedSetupData = {
        ...setupData,
        agreesToCompliance: true,
      }

      writeStoredSetupData(submittedSetupData)
      setSetupData(submittedSetupData)
      setIsSubmitted(true)
      return
    }

    goToStep(setupSteps[currentIndex + 1].id)
  }

  const brandSummaryRows = [
    { label: 'Brand Name', value: setupData.organizerName },
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
          : 'Individual Seller',
    },
    ...(setupData.businessRegistrationNumber
      ? [{ label: 'Registration Number', value: setupData.businessRegistrationNumber }]
      : []),
    ...(setupData.tinNumber ? [{ label: 'TIN', value: setupData.tinNumber }] : []),
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
        <p className="setup-shell__eyebrow">BV Creator Hub</p>

        <nav aria-label="Marketplace onboarding progress" className="setup-stepper">
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
                <h1>Create Your Marketplace Store</h1>
                <p>Set up your storefront identity, compliance profile, and settlement rails for BV Creator Hub.</p>
              </>
            ) : null}
            {currentStep.id === 'verification' ? (
              <>
                <h1>Verify Your Brand</h1>
                <p>This protects shoppers, supports compliance, and unlocks selling privileges.</p>
              </>
            ) : null}
            {currentStep.id === 'payout' ? (
              <>
                <h1>Set Up Settlement Routing</h1>
                <p>This is where we&apos;ll send your payout balance after completed orders settle.</p>
              </>
            ) : null}
            {currentStep.id === 'review' ? (
              <>
                <h1>Review Your Store Details</h1>
                <p>Confirm your compliance, payout, and storefront data before finishing setup.</p>
              </>
            ) : null}
          </header>

          <div className="setup-card__body">
            {currentStep.id === 'account' ? (
              <>
                <SetupTextField
                  label="Brand / Storefront Name"
                  onChange={(value) => updateField('organizerName', value)}
                  placeholder="e.g. Christie Brown"
                  value={setupData.organizerName}
                />
                <SetupTextField
                  label="Contact Person"
                  onChange={(value) => updateField('contactPerson', value)}
                  placeholder="e.g. Ama Owusu"
                  value={setupData.contactPerson}
                />
                <SetupTextField
                  helper="This will receive order, payout, and store verification updates."
                  invalidHelper="Enter a valid email address, like studio@brand.com."
                  label="Email Address"
                  onChange={(value) => updateField('email', value)}
                  placeholder="studio@brand.com"
                  type="email"
                  valid={setupData.email.length === 0 ? undefined : isEmailValid(setupData.email)}
                  value={setupData.email}
                />
                <SetupTextField
                  helper="Used for payout verification and urgent order support."
                  invalidHelper="Enter a valid Ghana phone number, like 024 123 4567 or +233 24 123 4567."
                  label="Phone Number"
                  onChange={(value) => updateField('phone', value)}
                  placeholder="+233 24 123 4567"
                  type="tel"
                  valid={setupData.phone.length === 0 ? undefined : isPhoneValid(setupData.phone)}
                  value={setupData.phone}
                />
                <SetupSelectField
                  label="Business Type"
                  onChange={(value) => updateField('businessType', value)}
                  options={businessTypeOptions}
                  placeholder="Select business type"
                  value={setupData.businessType}
                />
                <SetupTextField
                  helper="Helps us verify your storefront presence and brand history."
                  label="Instagram"
                  onChange={(value) => updateField('instagram', value)}
                  optional
                  placeholder="@yourbrandname"
                  required={false}
                  value={setupData.instagram}
                />
                <div className="setup-field">
                  <span className="setup-field__label">Logo Upload</span>
                  <input
                    accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                    className="sr-only"
                    id={logoUploadId}
                    onChange={(event) => {
                      handleLogoFile(event.target.files?.[0] ?? null)
                      event.target.value = ''
                    }}
                    type="file"
                  />
                  <label className="setup-upload setup-upload--single" htmlFor={logoUploadId}>
                    <span className="setup-upload__icon">
                      <UploadIcon className="button-icon" />
                    </span>
                    <span className="setup-upload__single">
                      {setupData.logoFileName || 'Upload Logo'}
                    </span>
                  </label>
                  <small className="setup-field__helper">Appears on your storefront and collection pages.</small>
                </div>
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
                      helper="Optional, but it helps speed up verification."
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
                  {setupData.isRegisteredBusiness === 'yes' ? (
                    <div className="setup-section__stack">
                      <SetupTextField
                        label="Business Registration Number"
                        onChange={(value) => updateField('businessRegistrationNumber', value)}
                        placeholder="Enter registration number"
                        value={setupData.businessRegistrationNumber}
                      />
                      <SetupTextField
                        label="TIN"
                        onChange={(value) => updateField('tinNumber', value)}
                        optional
                        placeholder="Enter TIN"
                        required={false}
                        value={setupData.tinNumber}
                      />
                    </div>
                  ) : (
                    <div className="setup-inline-note">
                      <span>
                        We&apos;ll register you as an <strong>Individual Seller</strong>.
                      </span>
                    </div>
                  )}
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
                      helper="We&apos;ll send settlements to this number."
                      invalidHelper="Enter a valid Ghana mobile number for payouts."
                      label="Mobile Number"
                      onChange={(value) => updateField('payoutPhone', value)}
                      placeholder="+233 24 123 4567"
                      type="tel"
                      valid={
                        setupData.payoutPhone.length === 0
                          ? undefined
                          : isPhoneValid(setupData.payoutPhone)
                      }
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
                    <span>Seller Agreement</span>
                  </div>
                  <p>
                    Selling fees and payment processing charges apply to each order based on your
                    seller agreement.
                  </p>
                  <label className="setup-check">
                    <input
                      checked={setupData.agreedToPayoutTerms}
                      onChange={(event) => updateField('agreedToPayoutTerms', event.target.checked)}
                      type="checkbox"
                    />
                    <span>I agree to the payout schedule, selling fees, and settlement terms.</span>
                  </label>
                </section>
              </>
            ) : null}

            {currentStep.id === 'review' ? (
              <>
                <SetupSummaryCard rows={brandSummaryRows} title="Brand Details" />
                <SetupSummaryCard rows={verificationSummaryRows} title="Verification Status" />
                <SetupSummaryCard rows={payoutSummaryRows} title="Payout Method" />

                <label className="setup-review-check">
                  <input
                    checked={setupData.agreesToCompliance}
                    onChange={(event) => updateField('agreesToCompliance', event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    I confirm this store complies with local laws plus BV Creator Hub&apos;s fulfillment
                    and refund policies.
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
            <button
              className="setup-button setup-button--primary"
              disabled={!isCurrentStepValid}
              onClick={goForward}
              type="button"
            >
              <span>{currentStep.id === 'review' ? 'Finish Setup' : 'Continue'}</span>
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
