import { useEffect, useMemo, useState } from 'react'

import { DashboardModal } from '../components/dashboard/Modal'
import { LogoUploadField } from '../components/settings/LogoUploadField'
import {
  ChevronDownIcon,
  FilterIcon,
  MailIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserPlusIcon,
} from '../components/ui/Icons'
import {
  type MerchantSetupData,
  businessTypeOptions,
  isEmailValid,
  isPhoneValid,
  readStoredSetupData,
  writeStoredSetupData,
} from '../lib/merchantSetup'
import {
  createRoleId,
  createTeamMemberId,
  permissionGroups,
  readStoredRoles,
  readStoredTeamMembers,
  type RoleDefinition,
  type TeamMember,
  type TeamMemberStatus,
  writeStoredRoles,
  writeStoredTeamMembers,
} from '../lib/settings'

type SettingsTab = 'profile' | 'team' | 'roles'
type RoleDraft = {
  id?: string
  name: string
  description: string
  permissions: string[]
}

function emptyRoleDraft(): RoleDraft {
  return {
    name: '',
    description: '',
    permissions: [],
  }
}

function roleDraftFromRole(role: RoleDefinition): RoleDraft {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: role.permissions,
  }
}

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [profileState, setProfileState] = useState<MerchantSetupData>(() => readStoredSetupData())
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => readStoredTeamMembers())
  const [roles, setRoles] = useState<RoleDefinition[]>(() => readStoredRoles())
  const [teamName, setTeamName] = useState('')
  const [teamEmail, setTeamEmail] = useState('')
  const [teamRole, setTeamRole] = useState('Viewer')
  const [teamSearch, setTeamSearch] = useState('')
  const [teamStatusFilter, setTeamStatusFilter] = useState<'All' | TeamMemberStatus>('All')
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [roleDraft, setRoleDraft] = useState<RoleDraft>(emptyRoleDraft)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    events: true,
    tickets: false,
    attendees: false,
    payments: false,
    analytics: false,
    settings: false,
  })
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    writeStoredSetupData(profileState)
  }, [profileState])

  useEffect(() => {
    writeStoredTeamMembers(teamMembers)
  }, [teamMembers])

  useEffect(() => {
    writeStoredRoles(roles)
  }, [roles])

  const roleNames = useMemo(
    () => roles.map((role) => role.name as RoleDefinition['name']).sort(),
    [roles],
  )
  const loweredSearch = teamSearch.trim().toLowerCase()
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesFilter = teamStatusFilter === 'All' || member.status === teamStatusFilter
    const matchesSearch =
      loweredSearch.length === 0 ||
      [member.name, member.email, member.role].some((value) =>
        value.toLowerCase().includes(loweredSearch),
      )

    return matchesFilter && matchesSearch
  })
  const roleCounts = useMemo(
    () =>
      roles.reduce<Record<string, number>>((counts, role) => {
        counts[role.id] = teamMembers.filter((member) => member.role === role.name).length
        return counts
      }, {}),
    [roles, teamMembers],
  )

  const emailError = profileState.email && !isEmailValid(profileState.email) ? 'Enter a valid email address.' : ''
  const phoneError = profileState.phone && !isPhoneValid(profileState.phone) ? 'Use a valid Ghana phone number.' : ''
  const isProfileValid = isEmailValid(profileState.email) && isPhoneValid(profileState.phone)
  const inviteEmailError = teamEmail && !isEmailValid(teamEmail) ? 'Enter a valid email address.' : ''
  const canInviteMember = teamName.trim().length > 0 && isEmailValid(teamEmail)
  const canSaveRole = roleDraft.name.trim().length > 0 && roleDraft.permissions.length > 0

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

  function handleInviteMember() {
    if (!canInviteMember) {
      return
    }

    const nextMember: TeamMember = {
      id: createTeamMemberId(teamName),
      name: teamName.trim(),
      email: teamEmail.trim(),
      role: teamRole,
      status: 'Pending',
      added: '13 Mar 2026',
      assignee: initialsFromName(teamName),
    }

    setTeamMembers((current) => [nextMember, ...current])
    setTeamName('')
    setTeamEmail('')
    setTeamRole('Viewer')
    setSaveMessage('Invitation sent.')
  }

  function togglePermission(permissionId: string) {
    setRoleDraft((current) => ({
      ...current,
      permissions: current.permissions.includes(permissionId)
        ? current.permissions.filter((item) => item !== permissionId)
        : [...current.permissions, permissionId],
    }))
  }

  function openCreateRole() {
    setRoleDraft(emptyRoleDraft())
    setExpandedGroups({
      events: true,
      tickets: false,
      attendees: false,
      payments: false,
      analytics: false,
      settings: false,
    })
    setIsRoleModalOpen(true)
  }

  function openEditRole(role: RoleDefinition) {
    setRoleDraft(roleDraftFromRole(role))
    setExpandedGroups({
      events: true,
      tickets: true,
      attendees: true,
      payments: true,
      analytics: true,
      settings: true,
    })
    setIsRoleModalOpen(true)
  }

  function saveRole() {
    if (!canSaveRole) {
      return
    }

    const nextRole: RoleDefinition = {
      id: roleDraft.id ?? createRoleId(roleDraft.name),
      name: roleDraft.name.trim(),
      description: roleDraft.description.trim() || 'Custom role',
      permissions: roleDraft.permissions,
      color: 'accent',
    }

    setRoles((current) => {
      const index = current.findIndex((role) => role.id === nextRole.id)
      if (index === -1) {
        return [...current, nextRole]
      }

      const updated = [...current]
      updated[index] = nextRole
      return updated
    })
    setIsRoleModalOpen(false)
    setRoleDraft(emptyRoleDraft())
    setSaveMessage(roleDraft.id ? 'Role updated.' : 'Role created.')
  }

  return (
    <div className="dashboard-page dashboard-page--narrow utility-page settings-page">
      <section className="utility-page__header utility-page__header--stacked">
        <div>
          <h1>Settings</h1>
          <p>Manage your business details and team access</p>
        </div>
      </section>

      <div className="settings-tabs">
        {([
          ['profile', 'Profile'],
          ['team', 'Team'],
          ['roles', 'Roles'],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            className={activeTab === value ? 'settings-tabs__link settings-tabs__link--active' : 'settings-tabs__link'}
            onClick={() => setActiveTab(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' ? (
        <section className="settings-panel">
          <header className="settings-panel__header">
            <div className="settings-panel__title">
              <span className="settings-panel__icon"><ShieldCheckIcon className="button-icon" /></span>
              <div>
                <h2>Business Details</h2>
                <p>Update your organization information for compliance</p>
              </div>
            </div>
          </header>

          <div className="modal-form-grid settings-form-grid">
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
            <label className="form-field form-field--full">
              <span>Business Address</span>
              <input onChange={(event) => setProfileState((current) => ({ ...current, businessAddress: event.target.value }))} placeholder="East Legon, Accra" value={profileState.businessAddress} />
            </label>
            <label className="form-field form-field--full">
              <span>Business Type</span>
              <select onChange={(event) => setProfileState((current) => ({ ...current, businessType: event.target.value }))} value={profileState.businessType}>
                <option value="">Select a type</option>
                {businessTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <LogoUploadField
              logoFileName={profileState.logoFileName}
              logoImageUrl={profileState.logoImageUrl}
              onClear={clearLogo}
              onSelectFile={handleLogoFile}
            />
          </div>

          <div className="settings-note">
            <ShieldCheckIcon className="button-icon" />
            <div>
              <strong>Compliance Notice</strong>
              <p>
                Your verified organizer information helps us secure your payouts, verify your identity, and maintain platform compliance.
              </p>
            </div>
          </div>

          <button
            className="page-primary-cta page-primary-cta--full"
            disabled={!isProfileValid}
            onClick={() => setSaveMessage('Business details updated.')}
            type="button"
          >
            Save Changes
          </button>
        </section>
      ) : null}

      {activeTab === 'team' ? (
        <>
          <section className="settings-panel">
            <header className="settings-panel__header">
              <div className="settings-panel__title">
                <span className="settings-panel__icon"><UserPlusIcon className="button-icon" /></span>
                <div>
                  <h2>Add Team Member</h2>
                  <p>Invite new members to access your dashboard</p>
                </div>
              </div>
            </header>

            <div className="settings-team-form">
              <label className="form-field">
                <span>Name</span>
                <input onChange={(event) => setTeamName(event.target.value)} placeholder="e.g. Kofi Mensah" value={teamName} />
              </label>
              <label className="form-field">
                <span>Email Address</span>
                <input onChange={(event) => setTeamEmail(event.target.value)} placeholder="colleague@email.com" value={teamEmail} />
                {inviteEmailError ? <small className="field-error">{inviteEmailError}</small> : null}
              </label>
              <label className="form-field">
                <span>Role</span>
                    <select onChange={(event) => setTeamRole(event.target.value)} value={teamRole}>
                  {roleNames.map((roleName) => (
                    <option key={roleName} value={roleName}>
                      {roleName}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button className="page-primary-cta page-primary-cta--compact" disabled={!canInviteMember} onClick={handleInviteMember} type="button">
              <span>Send Invitation</span>
            </button>

            <div className="settings-role-hints">
              <article><strong>Admin</strong><span>Full access to business and settings</span></article>
              <article><strong>Editor</strong><span>Can create and edit events, not manage roles</span></article>
              <article><strong>Viewer</strong><span>View only access to event details and reports</span></article>
            </div>
          </section>

          <section className="settings-panel settings-panel--table">
            <div className="settings-table-toolbar">
              <label className="search-bar search-bar--compact">
                <SearchIcon className="search-bar__icon" />
                <input onChange={(event) => setTeamSearch(event.target.value)} placeholder="Search team members..." value={teamSearch} />
              </label>

              <div className="toolbar-dropdown">
                <button className="surface-button surface-button--slim" onClick={() => setIsFilterMenuOpen((open) => !open)} type="button">
                  <FilterIcon className="button-icon" />
                  <span>Filters</span>
                </button>
                {isFilterMenuOpen ? (
                  <div className="toolbar-dropdown__menu">
                    {(['All', 'Active', 'Pending'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setTeamStatusFilter(option)
                          setIsFilterMenuOpen(false)
                        }}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td className={`settings-role-text settings-role-text--${member.role.toLowerCase()}`}>{member.role}</td>
                    <td>
                      <span className={`status-dot status-dot--${member.status === 'Active' ? 'success' : 'warning'}`} />
                      {member.status}
                    </td>
                    <td>{member.added}</td>
                    <td className="actions-cell">
                      <button
                        className="icon-action-button"
                        onClick={() => setTeamMembers((current) => current.map((item) => item.id === member.id ? { ...item, role: member.role === 'Admin' ? 'Viewer' : member.role === 'Viewer' ? 'Editor' : 'Admin' } : item))}
                        type="button"
                      >
                        <PencilIcon className="button-icon button-icon--muted" />
                      </button>
                      <button
                        className="icon-action-button"
                        onClick={() => setTeamMembers((current) => current.filter((item) => item.id !== member.id))}
                        type="button"
                      >
                        <TrashIcon className="button-icon button-icon--muted" />
                      </button>
                      <a className="icon-action-button" href={`mailto:${member.email}`}>
                        <MailIcon className="button-icon button-icon--accent" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pager pager--compact">
              <span className="pager__summary">Showing 1-4 of {filteredTeamMembers.length} team members</span>
              <div className="pager__controls">
                <button type="button">‹</button>
                <button className="pager__page pager__page--active" type="button">1</button>
                <button type="button">›</button>
              </div>
            </div>

            <div className="settings-note settings-note--compact">
              <ShieldCheckIcon className="button-icon" />
              <div>
                <strong>Access Control Notice</strong>
                <p>Team member permissions follow their assigned role. Only Admins can create or update roles.</p>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === 'roles' ? (
        <>
          <section className="settings-section-header">
            <div>
              <h2>Role Management</h2>
              <p>Create custom roles and define permissions.</p>
            </div>

            <button className="page-primary-cta page-primary-cta--compact" onClick={openCreateRole} type="button">
              <PlusIcon className="button-icon" />
              <span>Create Role</span>
            </button>
          </section>

          <section className="settings-role-grid">
            {roles.map((role) => (
              <article key={role.id} className={`settings-role-card settings-role-card--${role.color}`}>
                <div>
                  <h3>{role.name}</h3>
                  <p>{role.description}</p>
                </div>
                <div className="settings-role-card__meta">
                  <span>{roleCounts[role.id] ?? 0} Users</span>
                  <span>{role.permissions.length} permissions</span>
                </div>
                <button className="surface-button surface-button--slim" onClick={() => openEditRole(role)} type="button">
                  <PencilIcon className="button-icon" />
                  <span>Edit</span>
                </button>
              </article>
            ))}
          </section>
        </>
      ) : null}

      {isRoleModalOpen ? (
        <DashboardModal
          className="dashboard-modal--wide"
          footer={
            <>
              <button className="surface-button surface-button--wide" onClick={() => setIsRoleModalOpen(false)} type="button">
                Cancel
              </button>
              <button className="page-primary-cta page-primary-cta--compact" disabled={!canSaveRole} onClick={saveRole} type="button">
                {roleDraft.id ? 'Save Changes' : 'Create Role'}
              </button>
            </>
          }
          onClose={() => setIsRoleModalOpen(false)}
          title={roleDraft.id ? `Edit Role: ${roleDraft.name}` : 'Create New Role'}
        >
          <div className="modal-form-grid">
            <label className="form-field form-field--full">
              <span>Role Name</span>
              <input onChange={(event) => setRoleDraft((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Event Manager" value={roleDraft.name} />
            </label>
            <label className="form-field form-field--full">
              <span>Description</span>
              <textarea onChange={(event) => setRoleDraft((current) => ({ ...current, description: event.target.value }))} placeholder="Describe what this role can do..." rows={3} value={roleDraft.description} />
            </label>
          </div>

          <section className="role-permissions">
            <div className="role-permissions__header">
              <span>Permissions ({roleDraft.permissions.length} selected)</span>
            </div>
            {permissionGroups.map((group) => {
              const selectedCount = group.permissions.filter((permission) =>
                roleDraft.permissions.includes(permission.id),
              ).length

              return (
                <article key={group.id} className="role-permissions__group">
                  <button
                    className="role-permissions__group-toggle"
                    onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: !current[group.id] }))}
                    type="button"
                  >
                    <div>
                      <strong>{group.label}</strong>
                      <span>{selectedCount} of {group.permissions.length} selected</span>
                    </div>
                    <ChevronDownIcon className={`button-icon role-permissions__chevron${expandedGroups[group.id] ? ' role-permissions__chevron--open' : ''}`} />
                  </button>

                  {expandedGroups[group.id] ? (
                    <div className="role-permissions__list">
                      {group.permissions.map((permission) => (
                        <label key={permission.id} className="role-permissions__item">
                          <input
                            checked={roleDraft.permissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                            type="checkbox"
                          />
                          <div>
                            <strong>{permission.label}</strong>
                            <span>{permission.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </section>
        </DashboardModal>
      ) : null}

      {saveMessage ? (
        <DashboardModal
          footer={<button className="page-primary-cta page-primary-cta--compact" onClick={() => setSaveMessage(null)} type="button">Done</button>}
          onClose={() => setSaveMessage(null)}
          title="Saved"
        >
          <p className="dashboard-modal__copy">{saveMessage}</p>
        </DashboardModal>
      ) : null}
    </div>
  )
}
