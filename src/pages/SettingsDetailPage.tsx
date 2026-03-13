import { useState } from 'react'
import type { ReactNode } from 'react'

import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { DashboardModal } from '../components/dashboard/Modal'
import { LogoUploadField } from '../components/settings/LogoUploadField'
import { AlertIcon, CardIcon, CheckIcon, GlobeIcon, MailIcon, ShieldCheckIcon } from '../components/ui/Icons'
import {
  businessTypeOptions,
  type MerchantSetupData,
  networkOptions,
  readStoredSetupData,
  settlementOptions,
  writeStoredSetupData,
} from '../lib/merchantSetup'
import { isEmailValid, isPhoneValid } from '../lib/merchantSetup'
import { readStoredSettingsPreferences, type SettingsPreferences, writeStoredSettingsPreferences } from '../lib/settings'

type SettingsSection = 'profile' | 'payout' | 'email-preferences' | 'security' | 'onboarding' | 'push-notifications'

const sectionMeta: Record<SettingsSection, { title: string; description: string }> = {
  profile: {
    title: 'Profile Settings',
    description: 'Update your business information and contact details',
  },
  payout: {
    title: 'Payout Settings',
    description: 'Manage your account methods and preferences',
  },
  'email-preferences': {
    title: 'Email Preferences',
    description: 'Choose the updates you receive by email',
  },
  security: {
    title: 'Security',
    description: 'Manage passwords and authentication',
  },
  onboarding: {
    title: 'Onboarding',
    description: 'View setup progress connected to your account',
  },
  'push-notifications': {
    title: 'Push Notifications',
    description: 'Control your push notifications',
  },
}

export function SettingsDetailPage() {
  const { section } = useParams<{ section: SettingsSection }>()
  const navigate = useNavigate()
  const [profileState, setProfileState] = useState<MerchantSetupData>(() => readStoredSetupData())
  const [settingsState, setSettingsState] = useState<SettingsPreferences>(() => readStoredSettingsPreferences())
  const [showSaved, setShowSaved] = useState(false)

  if (!section || !(section in sectionMeta)) {
    return <Navigate replace to="/settings" />
  }

  const meta = sectionMeta[section]
  const emailError = profileState.email.length > 0 && !isEmailValid(profileState.email) ? 'Enter a valid email address.' : ''
  const phoneError = profileState.phone.length > 0 && !isPhoneValid(profileState.phone) ? 'Use a valid Ghana phone number.' : ''
  const emailPreferenceItems: Array<{
    key: 'salesEmails' | 'payoutEmails' | 'productEmails'
    label: string
    icon: ReactNode
  }> = [
    { key: 'salesEmails', label: 'Ticket sales updates', icon: <MailIcon className="button-icon" /> },
    { key: 'payoutEmails', label: 'Payout and settlement notices', icon: <CardIcon className="button-icon" /> },
    { key: 'productEmails', label: 'Product announcements', icon: <AlertIcon className="button-icon" /> },
  ]
  const pushPreferenceItems: Array<{
    key: 'pushSales' | 'pushPayouts' | 'pushPromotions'
    label: string
    icon: ReactNode
  }> = [
    { key: 'pushSales', label: 'Sales alerts', icon: <MailIcon className="button-icon" /> },
    { key: 'pushPayouts', label: 'Payout updates', icon: <CardIcon className="button-icon" /> },
    { key: 'pushPromotions', label: 'Promo updates', icon: <AlertIcon className="button-icon" /> },
  ]

  function saveProfile() {
    if (!isEmailValid(profileState.email) || !isPhoneValid(profileState.phone)) {
      return
    }

    writeStoredSetupData(profileState)
    setShowSaved(true)
  }

  function handleLogoFile(file: File | null) {
    if (!file || !file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return
      }

      setProfileState((current) => ({
        ...current,
        logoFileName: file.name,
        logoImageUrl: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  function clearLogo() {
    setProfileState((current) => ({
      ...current,
      logoFileName: '',
      logoImageUrl: '',
    }))
  }

  function savePreferences() {
    writeStoredSettingsPreferences(settingsState)
    setShowSaved(true)
  }

  return (
    <div className="dashboard-page dashboard-page--narrow utility-page">
      <section className="utility-page__header utility-page__header--form">
        <div>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>

        <div className="utility-page__actions">
          <Link className="surface-button surface-button--slim" to="/settings">
            <span>Cancel</span>
          </Link>
        </div>
      </section>

      {section === 'profile' ? (
        <section className="form-section form-section--tight">
          <div className="modal-form-grid">
            <label className="form-field">
              <span>Business / Organizer Name</span>
              <input onChange={(event) => setProfileState((current) => ({ ...current, organizerName: event.target.value }))} value={profileState.organizerName} />
            </label>
            <label className="form-field">
              <span>Contact Person</span>
              <input onChange={(event) => setProfileState((current) => ({ ...current, contactPerson: event.target.value }))} value={profileState.contactPerson} />
            </label>
            <label className="form-field">
              <span>Email Address</span>
              <input onChange={(event) => setProfileState((current) => ({ ...current, email: event.target.value }))} value={profileState.email} />
              {emailError ? <small className="field-error">{emailError}</small> : null}
            </label>
            <label className="form-field">
              <span>Phone Number</span>
              <input onChange={(event) => setProfileState((current) => ({ ...current, phone: event.target.value }))} value={profileState.phone} />
              {phoneError ? <small className="field-error">{phoneError}</small> : null}
            </label>
            <label className="form-field">
              <span>Business Type</span>
              <select onChange={(event) => setProfileState((current) => ({ ...current, businessType: event.target.value }))} value={profileState.businessType}>
                {businessTypeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span>Instagram</span>
              <div className="form-field__with-icon">
                <GlobeIcon className="button-icon" />
                <input onChange={(event) => setProfileState((current) => ({ ...current, instagram: event.target.value }))} value={profileState.instagram} />
              </div>
            </label>
            <LogoUploadField
              label="Logo"
              logoFileName={profileState.logoFileName}
              logoImageUrl={profileState.logoImageUrl}
              onClear={clearLogo}
              onSelectFile={handleLogoFile}
            />
          </div>

          <button className="page-primary-cta page-primary-cta--full" onClick={saveProfile} type="button">
            <CheckIcon className="button-icon" />
            <span>Save Changes</span>
          </button>
        </section>
      ) : null}

      {section === 'payout' ? (
        <section className="form-section form-section--tight">
          <label className="form-field">
            <span>Preferred Payout Method</span>
          </label>
          <div className="toggle-pair">
            <button
              className={profileState.payoutMethod === 'bank-transfer' ? 'toggle-pair__option toggle-pair__option--active' : 'toggle-pair__option'}
              onClick={() => setProfileState((current) => ({ ...current, payoutMethod: 'bank-transfer' }))}
              type="button"
            >
              Bank Transfer
            </button>
            <button
              className={profileState.payoutMethod === 'mobile-money' ? 'toggle-pair__option toggle-pair__option--active' : 'toggle-pair__option'}
              onClick={() => setProfileState((current) => ({ ...current, payoutMethod: 'mobile-money' }))}
              type="button"
            >
              Mobile Money
            </button>
          </div>

          <div className="modal-form-grid">
            {profileState.payoutMethod === 'mobile-money' ? (
              <>
                <label className="form-field">
                  <span>Network</span>
                  <select onChange={(event) => setProfileState((current) => ({ ...current, network: event.target.value }))} value={profileState.network}>
                    {networkOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="form-field">
                  <span>Mobile Number</span>
                  <input onChange={(event) => setProfileState((current) => ({ ...current, payoutPhone: event.target.value }))} value={profileState.payoutPhone} />
                </label>
              </>
            ) : (
              <>
                <label className="form-field">
                  <span>Bank Name</span>
                  <input onChange={(event) => setProfileState((current) => ({ ...current, bankName: event.target.value }))} placeholder="Select bank" value={profileState.bankName} />
                </label>
                <label className="form-field">
                  <span>Account Name</span>
                  <input onChange={(event) => setProfileState((current) => ({ ...current, accountName: event.target.value }))} value={profileState.accountName} />
                </label>
                <label className="form-field form-field--full">
                  <span>Account Number</span>
                  <input onChange={(event) => setProfileState((current) => ({ ...current, accountNumber: event.target.value }))} value={profileState.accountNumber} />
                </label>
              </>
            )}

            <label className="form-field form-field--full">
              <span>Settlement Preference</span>
              <select onChange={(event) => setProfileState((current) => ({ ...current, settlementPreference: event.target.value }))} value={profileState.settlementPreference}>
                {settlementOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <button className="page-primary-cta page-primary-cta--full" onClick={saveProfile} type="button">
            <CheckIcon className="button-icon" />
            <span>Save Changes</span>
          </button>
        </section>
      ) : null}

      {section === 'email-preferences' ? (
        <section className="form-section form-section--tight">
          <div className="settings-toggle-list">
            {emailPreferenceItems.map((item) => (
              <button
                key={item.key}
                className={settingsState[item.key] ? 'toggle-card toggle-card--active' : 'toggle-card'}
                onClick={() => setSettingsState((current) => ({ ...current, [item.key]: !current[item.key] }))}
                type="button"
              >
                <span className="toggle-card__icon">{item.icon}</span>
                <div>
                  <strong>{item.label}</strong>
                  <span>Enabled</span>
                </div>
              </button>
            ))}
          </div>

          <button className="page-primary-cta page-primary-cta--full" onClick={savePreferences} type="button">
            Save Changes
          </button>
        </section>
      ) : null}

      {section === 'security' ? (
        <section className="form-section form-section--tight">
          <div className="settings-toggle-list">
            <button className={settingsState.twoFactorEnabled ? 'toggle-card toggle-card--active' : 'toggle-card'} onClick={() => setSettingsState((current) => ({ ...current, twoFactorEnabled: !current.twoFactorEnabled }))} type="button">
              <span className="toggle-card__icon"><ShieldCheckIcon className="button-icon" /></span>
              <div>
                <strong>Two-Factor Authentication</strong>
                <span>{settingsState.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
            </button>
            <button className={settingsState.loginAlerts ? 'toggle-card toggle-card--active' : 'toggle-card'} onClick={() => setSettingsState((current) => ({ ...current, loginAlerts: !current.loginAlerts }))} type="button">
              <span className="toggle-card__icon"><AlertIcon className="button-icon" /></span>
              <div>
                <strong>Login Alerts</strong>
                <span>{settingsState.loginAlerts ? 'Enabled' : 'Disabled'}</span>
              </div>
            </button>
          </div>

          <button className="page-primary-cta page-primary-cta--full" onClick={savePreferences} type="button">
            Save Changes
          </button>
        </section>
      ) : null}

      {section === 'onboarding' ? (
        <section className="form-section form-section--tight">
            <div className="detail-summary-card">
              <div>
                <span>Account setup</span>
                <strong>Completed</strong>
              </div>
              <div>
                <span>Verification</span>
                <strong>{profileState.governmentIdFileName ? 'Uploaded' : 'Pending'}</strong>
              </div>
              <div>
                <span>Payout method</span>
                <strong>{profileState.payoutMethod === 'mobile-money' ? 'Mobile Money' : 'Bank Transfer'}</strong>
              </div>
            <div className="detail-summary-card__full">
              <span>Review flow</span>
              <strong>Reopen the original merchant setup flow whenever you need to update onboarding documents.</strong>
            </div>
          </div>

          <button className="page-primary-cta page-primary-cta--full" onClick={() => navigate('/setup/review')} type="button">
            Review Onboarding
          </button>
        </section>
      ) : null}

      {section === 'push-notifications' ? (
        <section className="form-section form-section--tight">
          <div className="settings-toggle-list">
            {pushPreferenceItems.map((item) => (
              <button
                key={item.key}
                className={settingsState[item.key] ? 'toggle-card toggle-card--active' : 'toggle-card'}
                onClick={() => setSettingsState((current) => ({ ...current, [item.key]: !current[item.key] }))}
                type="button"
              >
                <span className="toggle-card__icon">{item.icon}</span>
                <div>
                  <strong>{item.label}</strong>
                  <span>{settingsState[item.key] ? 'Enabled' : 'Disabled'}</span>
                </div>
              </button>
            ))}
          </div>

          <button className="page-primary-cta page-primary-cta--full" onClick={savePreferences} type="button">
            Save Changes
          </button>
        </section>
      ) : null}

      {showSaved ? (
        <DashboardModal
          footer={<button className="page-primary-cta page-primary-cta--compact" onClick={() => setShowSaved(false)} type="button">Done</button>}
          onClose={() => setShowSaved(false)}
          title="Saved"
        >
          <p className="dashboard-modal__copy">Your settings were updated successfully.</p>
        </DashboardModal>
      ) : null}
    </div>
  )
}
