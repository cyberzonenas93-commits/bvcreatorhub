export type SetupStepKey = 'account' | 'verification' | 'payout' | 'review'
export type RegisteredBusiness = 'yes' | 'no'
export type PayoutMethod = 'bank-transfer' | 'mobile-money'

export interface MerchantSetupData {
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

export const STORAGE_KEY = 'bv-merchant-setup'

export const setupSteps = [
  { id: 'account', label: 'Account' },
  { id: 'verification', label: 'Verification' },
  { id: 'payout', label: 'Payout' },
  { id: 'review', label: 'Review' },
] as const satisfies ReadonlyArray<{ id: SetupStepKey; label: string }>

export const businessTypeOptions = [
  'Event Organizer',
  'Festival Producer',
  'Venue Operator',
  'Community Brand',
]

export const networkOptions = ['MTN Mobile Money', 'Telecel Cash', 'AirtelTigo Money']

export const settlementOptions = [
  'After event ends',
  'Daily settlement',
  'Weekly settlement',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const defaultSetupData: MerchantSetupData = {
  organizerName: '',
  contactPerson: '',
  email: '',
  phone: '',
  businessType: '',
  instagram: '',
  logoFileName: '',
  governmentIdFileName: '',
  selfieFileName: '',
  isRegisteredBusiness: 'no',
  payoutMethod: 'mobile-money',
  bankName: '',
  accountName: '',
  accountNumber: '',
  network: 'MTN Mobile Money',
  payoutPhone: '',
  settlementPreference: 'After event ends',
  agreedToPayoutTerms: false,
  agreesToCompliance: false,
}

export function isNonEmpty(value: string) {
  return value.trim().length > 0
}

export function isEmailValid(email: string) {
  return EMAIL_REGEX.test(email.trim())
}

export function getPhoneDigits(phone: string) {
  return phone.replace(/\D/g, '')
}

export function isPhoneValid(phone: string) {
  const digits = getPhoneDigits(phone)

  return /^0\d{9}$/.test(digits) || /^233\d{9}$/.test(digits)
}

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
