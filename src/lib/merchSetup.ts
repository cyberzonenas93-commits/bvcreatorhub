import {
  defaultSetupData as defaultMerchantSetupData,
  type MerchantSetupData,
  type PayoutMethod,
  type RegisteredBusiness,
  type SetupStepKey,
  isEmailValid,
  isNonEmpty,
  isPhoneValid,
} from './merchantSetup'

export type { MerchantSetupData, PayoutMethod, RegisteredBusiness, SetupStepKey }

export const STORAGE_KEY = 'bv-merch-setup'

export const setupSteps = [
  { id: 'account', label: 'Account' },
  { id: 'verification', label: 'Verification' },
  { id: 'payout', label: 'Payout' },
  { id: 'review', label: 'Review' },
] as const satisfies ReadonlyArray<{ id: SetupStepKey; label: string }>

export const businessTypeOptions = [
  'Fashion Brand',
  'Streetwear Label',
  'Designer Studio',
  'Creator Merch',
  'Accessories Brand',
  'Marketplace Seller',
]

export const networkOptions = ['MTN Mobile Money', 'Telecel Cash', 'AirtelTigo Money']

export const settlementOptions = [
  'Weekly rolling settlement',
  'Twice monthly settlement',
  'Custom schedule (subject to approval)',
]

export const defaultSetupData: MerchantSetupData = {
  ...defaultMerchantSetupData,
  settlementPreference: 'Weekly rolling settlement',
}

export { isEmailValid, isNonEmpty, isPhoneValid }

export function readStoredSetupData() {
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

export function writeStoredSetupData(data: MerchantSetupData) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
