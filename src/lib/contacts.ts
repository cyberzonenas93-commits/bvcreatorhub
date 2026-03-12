export type ContactSegment = 'VIP' | 'Regular'
export type ContactStatus = 'Active' | 'Inactive'

export interface ContactRecord {
  id: string
  name: string
  email: string
  phone: string
  totalSpent: number
  status: ContactStatus
  segment: ContactSegment
  updatedAt: string
  note: string
}

const CONTACTS_STORAGE_KEY = 'bv-dashboard-contacts'

const defaultContacts: ContactRecord[] = [
  {
    id: 'kwame-asante',
    name: 'Kwame Asante',
    email: 'kwame.asante@gmail.com',
    phone: '+233 24 111 2233',
    totalSpent: 2550,
    status: 'Active',
    segment: 'VIP',
    updatedAt: '2026-03-10',
    note: 'Frequent VIP purchaser',
  },
  {
    id: 'ama-mensah',
    name: 'Ama Mensah',
    email: 'ama.mensah@yahoo.com',
    phone: '+233 20 234 5678',
    totalSpent: 980,
    status: 'Active',
    segment: 'Regular',
    updatedAt: '2026-03-04',
    note: 'Responds well to product updates',
  },
  {
    id: 'kofi-osei',
    name: 'Kofi Osei',
    email: 'kofi.osei@outlook.com',
    phone: '+233 55 345 6789',
    totalSpent: 1800,
    status: 'Active',
    segment: 'VIP',
    updatedAt: '2026-02-20',
    note: 'Prefers direct outreach',
  },
]

function sortContacts(contacts: ContactRecord[]) {
  return [...contacts].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export function readStoredContacts() {
  if (typeof window === 'undefined') {
    return defaultContacts
  }

  try {
    const stored = window.localStorage.getItem(CONTACTS_STORAGE_KEY)

    if (!stored) {
      return defaultContacts
    }

    return sortContacts(JSON.parse(stored) as ContactRecord[])
  } catch {
    return defaultContacts
  }
}

export function writeStoredContacts(contacts: ContactRecord[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(sortContacts(contacts)))
}

export function createContactId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug.length > 0 ? slug : `contact-${Date.now()}`
}

export function upsertStoredContact(nextContact: ContactRecord) {
  const contacts = readStoredContacts()
  const index = contacts.findIndex((contact) => contact.id === nextContact.id)

  if (index === -1) {
    writeStoredContacts([...contacts, nextContact])
    return nextContact
  }

  const updated = [...contacts]
  updated[index] = nextContact
  writeStoredContacts(updated)

  return nextContact
}

export function deleteStoredContact(contactId: string) {
  writeStoredContacts(readStoredContacts().filter((contact) => contact.id !== contactId))
}
