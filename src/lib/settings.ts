export interface SettingsPreferences {
  salesEmails: boolean
  payoutEmails: boolean
  productEmails: boolean
  twoFactorEnabled: boolean
  loginAlerts: boolean
  onboardingChecklistDone: boolean
  pushSales: boolean
  pushPayouts: boolean
  pushPromotions: boolean
}

const SETTINGS_STORAGE_KEY = 'bv-dashboard-settings'

export const defaultSettingsPreferences: SettingsPreferences = {
  salesEmails: true,
  payoutEmails: true,
  productEmails: false,
  twoFactorEnabled: false,
  loginAlerts: true,
  onboardingChecklistDone: true,
  pushSales: true,
  pushPayouts: true,
  pushPromotions: false,
}

export function readStoredSettingsPreferences() {
  if (typeof window === 'undefined') {
    return defaultSettingsPreferences
  }

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY)

    if (!stored) {
      return defaultSettingsPreferences
    }

    return {
      ...defaultSettingsPreferences,
      ...JSON.parse(stored),
    } satisfies SettingsPreferences
  } catch {
    return defaultSettingsPreferences
  }
}

export function writeStoredSettingsPreferences(preferences: SettingsPreferences) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(preferences))
}
