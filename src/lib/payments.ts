export type TransactionStatus = 'Completed' | 'Pending' | 'Failed'
export type PayoutStatus = 'Processing' | 'Paid' | 'Failed'

export interface TransactionRecord {
  id: string
  title: string
  category: string
  date: string
  status: TransactionStatus
  amount: number
  reference: string
}

export interface PayoutRecord {
  id: string
  beneficiary: string
  method: string
  requestedOn: string
  status: PayoutStatus
  amount: number
  reference: string
}

export interface PaymentsData {
  transactions: TransactionRecord[]
  payouts: PayoutRecord[]
}

const PAYMENTS_STORAGE_KEY = 'bv-dashboard-payments'

const defaultPayments: PaymentsData = {
  transactions: [
    {
      id: 'txn-01',
      title: 'Strictly Soul Accra - VIP Ticket Sales',
      category: 'Ticket Sales',
      date: '10 Mar, 2026',
      status: 'Completed',
      amount: 12500,
      reference: 'MTN20260310-12500',
    },
    {
      id: 'txn-02',
      title: 'Afro Funk Night - General Admission',
      category: 'Ticket Sales',
      date: '06 Mar, 2026',
      status: 'Completed',
      amount: 8750,
      reference: 'GCB20260306-8750',
    },
    {
      id: 'txn-03',
      title: 'Sunset at Labadi - Early Bird Tickets',
      category: 'Ticket Sales',
      date: '05 Mar, 2026',
      status: 'Pending',
      amount: 5200,
      reference: 'MTN20260305-5200',
    },
    {
      id: 'txn-04',
      title: 'Poetry Night - Door Sales',
      category: 'Walk-In',
      date: '01 Mar, 2026',
      status: 'Completed',
      amount: 5400,
      reference: 'CASH20260301-5400',
    },
    {
      id: 'txn-05',
      title: 'Cultural Festival - Group Booking',
      category: 'Bulk Purchase',
      date: '28 Feb, 2026',
      status: 'Failed',
      amount: 4200,
      reference: 'BANK20260228-2400',
    },
  ],
  payouts: [
    {
      id: 'pay-01',
      beneficiary: 'MTN Mobile Money',
      method: 'Mobile Money',
      requestedOn: '11 Mar, 2026',
      status: 'Processing',
      amount: 24000,
      reference: 'PAYOUT-20260311-24000',
    },
    {
      id: 'pay-02',
      beneficiary: 'GCB Bank',
      method: 'Bank Transfer',
      requestedOn: '07 Mar, 2026',
      status: 'Paid',
      amount: 18500,
      reference: 'PAYOUT-20260307-18500',
    },
  ],
}

export function readStoredPayments() {
  if (typeof window === 'undefined') {
    return defaultPayments
  }

  try {
    const stored = window.localStorage.getItem(PAYMENTS_STORAGE_KEY)

    if (!stored) {
      return defaultPayments
    }

    return JSON.parse(stored) as PaymentsData
  } catch {
    return defaultPayments
  }
}

export function writeStoredPayments(data: PaymentsData) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(data))
}

export function upsertStoredPayout(nextPayout: PayoutRecord) {
  const data = readStoredPayments()
  const index = data.payouts.findIndex((payout) => payout.id === nextPayout.id)

  if (index === -1) {
    writeStoredPayments({
      ...data,
      payouts: [nextPayout, ...data.payouts],
    })
    return nextPayout
  }

  const updated = [...data.payouts]
  updated[index] = nextPayout
  writeStoredPayments({
    ...data,
    payouts: updated,
  })

  return nextPayout
}
