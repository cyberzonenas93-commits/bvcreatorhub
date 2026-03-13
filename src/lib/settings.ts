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
const TEAM_STORAGE_KEY = 'bv-dashboard-team'
const ROLES_STORAGE_KEY = 'bv-dashboard-roles'

export type TeamRoleName = 'Admin' | 'Editor' | 'Viewer'
export type TeamMemberStatus = 'Active' | 'Pending'

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: TeamMemberStatus
  added: string
  assignee: string
}

export interface RolePermissionGroup {
  id: string
  label: string
  permissions: Array<{ id: string; label: string; description: string }>
}

export interface RoleDefinition {
  id: string
  name: string
  description: string
  permissions: string[]
  color: 'accent' | 'info' | 'muted'
}

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

export const permissionGroups: RolePermissionGroup[] = [
  {
    id: 'events',
    label: 'Events',
    permissions: [
      { id: 'events:view', label: 'View Events', description: 'View event details' },
      { id: 'events:create', label: 'Create Events', description: 'Create new events' },
      { id: 'events:edit', label: 'Edit Events', description: 'Modify existing events' },
      { id: 'events:delete', label: 'Delete Events', description: 'Remove events' },
      { id: 'events:publish', label: 'Publish Events', description: 'Publish events to go live' },
    ],
  },
  {
    id: 'tickets',
    label: 'Tickets',
    permissions: [
      { id: 'tickets:view', label: 'View Tickets', description: 'View ticket tiers' },
      { id: 'tickets:create', label: 'Create Tiers', description: 'Add ticket tiers' },
      { id: 'tickets:edit', label: 'Edit Tiers', description: 'Update ticket tiers' },
      { id: 'tickets:promo', label: 'Manage Promo Codes', description: 'Create and edit coupons' },
    ],
  },
  {
    id: 'attendees',
    label: 'Attendees',
    permissions: [
      { id: 'attendees:view', label: 'View Attendees', description: 'Access attendee records' },
      { id: 'attendees:invite', label: 'Invite Guests', description: 'Send guest invitations' },
      { id: 'attendees:checkin', label: 'Manage Check-In', description: 'Check in attendees on site' },
      { id: 'attendees:export', label: 'Export Attendees', description: 'Download attendee lists' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    permissions: [
      { id: 'payments:view', label: 'View Payments', description: 'View transactions and payouts' },
      { id: 'payments:payout', label: 'Request Payouts', description: 'Request account settlements' },
      { id: 'payments:wallet', label: 'Manage Promo Wallet', description: 'Transfer promo credits' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    permissions: [
      { id: 'analytics:view', label: 'View Overview', description: 'Access business analytics' },
      { id: 'analytics:reports', label: 'Export Reports', description: 'Download analytics reports' },
      { id: 'analytics:revenue', label: 'View Revenue Trends', description: 'See revenue over time' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    permissions: [
      { id: 'settings:profile', label: 'Manage Profile', description: 'Update business profile' },
      { id: 'settings:team', label: 'Manage Team', description: 'Invite and edit team members' },
      { id: 'settings:roles', label: 'Manage Roles', description: 'Create and update roles' },
      { id: 'settings:payouts', label: 'Manage Payout Settings', description: 'Update payout preferences' },
    ],
  },
]

export const defaultRoles: RoleDefinition[] = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full access to all features and settings.',
    permissions: permissionGroups.flatMap((group) => group.permissions.map((permission) => permission.id)),
    color: 'accent',
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit events, manage tickets and attendees.',
    permissions: [
      'events:view',
      'events:create',
      'events:edit',
      'events:publish',
      'tickets:view',
      'tickets:create',
      'tickets:edit',
      'attendees:view',
      'attendees:invite',
      'attendees:checkin',
      'analytics:view',
    ],
    color: 'info',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'View-only access to events and reports.',
    permissions: ['events:view', 'tickets:view', 'attendees:view', 'payments:view', 'analytics:view'],
    color: 'muted',
  },
]

export const defaultTeamMembers: TeamMember[] = [
  {
    id: 'team-kofi-mensah',
    name: 'Kofi Mensah',
    email: 'kofi@strictlysoul.gh',
    role: 'Admin',
    status: 'Active',
    added: '15 Jan 2025',
    assignee: 'KM',
  },
  {
    id: 'team-ama-osei',
    name: 'Ama Osei',
    email: 'ama@strictlysoul.gh',
    role: 'Editor',
    status: 'Active',
    added: '10 Feb 2025',
    assignee: 'AO',
  },
  {
    id: 'team-kwame-asante',
    name: 'Kwame Asante',
    email: 'kwame.promoter@strictlysoul.gh',
    role: 'Viewer',
    status: 'Pending',
    added: '5 Mar 2026',
    assignee: 'KA',
  },
  {
    id: 'team-akua-darko',
    name: 'Akua Darko',
    email: 'akua@strictlysoul.gh',
    role: 'Editor',
    status: 'Active',
    added: '20 Feb 2026',
    assignee: 'AD',
  },
]

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

export function readStoredTeamMembers() {
  if (typeof window === 'undefined') {
    return defaultTeamMembers
  }

  try {
    const stored = window.localStorage.getItem(TEAM_STORAGE_KEY)

    if (!stored) {
      return defaultTeamMembers
    }

    return JSON.parse(stored) as TeamMember[]
  } catch {
    return defaultTeamMembers
  }
}

export function writeStoredTeamMembers(teamMembers: TeamMember[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamMembers))
}

export function readStoredRoles() {
  if (typeof window === 'undefined') {
    return defaultRoles
  }

  try {
    const stored = window.localStorage.getItem(ROLES_STORAGE_KEY)

    if (!stored) {
      return defaultRoles
    }

    return JSON.parse(stored) as RoleDefinition[]
  } catch {
    return defaultRoles
  }
}

export function writeStoredRoles(roles: RoleDefinition[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles))
}

export function createTeamMemberId(name: string) {
  return `team-${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || Date.now()}`
}

export function createRoleId(name: string) {
  return `role-${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || Date.now()}`
}
