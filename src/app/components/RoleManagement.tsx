import React, { useState } from 'react';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  Users,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'events' | 'tickets' | 'attendees' | 'payments' | 'analytics' | 'settings';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isCustom: boolean;
  userCount: number;
}

const ALL_PERMISSIONS: Permission[] = [
  // Events
  { id: 'events:view', name: 'View Events', description: 'View all event details', category: 'events' },
  { id: 'events:create', name: 'Create Events', description: 'Create new events', category: 'events' },
  { id: 'events:edit', name: 'Edit Events', description: 'Modify existing events', category: 'events' },
  { id: 'events:delete', name: 'Delete Events', description: 'Remove events', category: 'events' },
  { id: 'events:publish', name: 'Publish Events', description: 'Publish events to go live', category: 'events' },
  
  // Tickets
  { id: 'tickets:view', name: 'View Tickets', description: 'View ticket information', category: 'tickets' },
  { id: 'tickets:create', name: 'Create Tickets', description: 'Create new ticket types', category: 'tickets' },
  { id: 'tickets:edit', name: 'Edit Tickets', description: 'Modify ticket types', category: 'tickets' },
  { id: 'tickets:delete', name: 'Delete Tickets', description: 'Remove ticket types', category: 'tickets' },
  
  // Attendees
  { id: 'attendees:view', name: 'View Attendees', description: 'View attendee lists', category: 'attendees' },
  { id: 'attendees:manage', name: 'Manage Attendees', description: 'Add/edit/remove attendees', category: 'attendees' },
  { id: 'attendees:checkin', name: 'Check-in Attendees', description: 'Perform check-ins', category: 'attendees' },
  { id: 'attendees:export', name: 'Export Attendees', description: 'Export attendee data', category: 'attendees' },
  
  // Payments
  { id: 'payments:view', name: 'View Payments', description: 'View payment history', category: 'payments' },
  { id: 'payments:request', name: 'Request Payouts', description: 'Initiate payout requests', category: 'payments' },
  { id: 'payments:export', name: 'Export Payments', description: 'Export payment data', category: 'payments' },
  
  // Analytics
  { id: 'analytics:view', name: 'View Analytics', description: 'View reports and analytics', category: 'analytics' },
  { id: 'analytics:export', name: 'Export Analytics', description: 'Export analytics data', category: 'analytics' },
  
  // Settings
  { id: 'settings:view', name: 'View Settings', description: 'View organization settings', category: 'settings' },
  { id: 'settings:edit', name: 'Edit Settings', description: 'Modify organization settings', category: 'settings' },
  { id: 'settings:team', name: 'Manage Team', description: 'Manage team members', category: 'settings' },
  { id: 'settings:roles', name: 'Manage Roles', description: 'Create and manage roles', category: 'settings' },
];

export const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full access to all features and settings',
      permissions: ALL_PERMISSIONS.map(p => p.id),
      isCustom: false,
      userCount: 1,
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Can create and edit events, manage tickets and attendees',
      permissions: [
        'events:view', 'events:create', 'events:edit', 'events:publish',
        'tickets:view', 'tickets:create', 'tickets:edit',
        'attendees:view', 'attendees:manage', 'attendees:checkin',
        'analytics:view',
        'settings:view',
      ],
      isCustom: false,
      userCount: 2,
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'View-only access to events and reports',
      permissions: [
        'events:view',
        'tickets:view',
        'attendees:view',
        'payments:view',
        'analytics:view',
        'settings:view',
      ],
      isCustom: false,
      userCount: 1,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['events']);
  
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleCreateRole = () => {
    if (!newRole.name.trim()) {
      toast.error('Please enter a role name');
      return;
    }
    if (!newRole.description.trim()) {
      toast.error('Please enter a role description');
      return;
    }
    if (newRole.permissions.length === 0) {
      toast.error('Please select at least one permission');
      return;
    }

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      isCustom: true,
      userCount: 0,
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowCreateModal(false);
    toast.success(`Role "${role.name}" created successfully!`);
  };

  const handleUpdateRole = () => {
    if (!editingRole) return;

    setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
    setEditingRole(null);
    toast.success(`Role "${editingRole.name}" updated successfully!`);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    if (role.userCount > 0) {
      toast.error(`Cannot delete "${role.name}" - ${role.userCount} user(s) assigned to this role`);
      return;
    }

    setRoles(roles.filter(r => r.id !== roleId));
    toast.success(`Role "${role.name}" deleted successfully!`);
  };

  const togglePermission = (permissionId: string, forEditing = false) => {
    if (forEditing && editingRole) {
      const hasPermission = editingRole.permissions.includes(permissionId);
      setEditingRole({
        ...editingRole,
        permissions: hasPermission
          ? editingRole.permissions.filter(p => p !== permissionId)
          : [...editingRole.permissions, permissionId],
      });
    } else {
      const hasPermission = newRole.permissions.includes(permissionId);
      setNewRole({
        ...newRole,
        permissions: hasPermission
          ? newRole.permissions.filter(p => p !== permissionId)
          : [...newRole.permissions, permissionId],
      });
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const getCategoryPermissions = (category: string) => {
    return ALL_PERMISSIONS.filter(p => p.category === category);
  };

  const getPermissionCount = (role: Role) => {
    return role.permissions.length;
  };

  const getRoleColor = (roleName: string) => {
    if (roleName === 'Admin') return 'text-purple-400';
    if (roleName === 'Editor') return 'text-blue-400';
    if (roleName === 'Viewer') return 'text-[#767686]';
    return 'text-green-400';
  };

  const renderPermissionCheckboxes = (forEditing = false) => {
    const categories = ['events', 'tickets', 'attendees', 'payments', 'analytics', 'settings'] as const;
    const currentPermissions = forEditing && editingRole ? editingRole.permissions : newRole.permissions;

    return (
      <div className="space-y-3">
        {categories.map(category => {
          const categoryPerms = getCategoryPermissions(category);
          const allSelected = categoryPerms.every(p => currentPermissions.includes(p.id));
          const someSelected = categoryPerms.some(p => currentPermissions.includes(p.id)) && !allSelected;

          return (
            <div key={category} className="bg-[#121214] rounded-lg border border-[#424249] overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-[#232326]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-[#feff1c]" />
                  <div className="text-left">
                    <p className="font-bold text-sm text-[#f8f9fa] capitalize">{category}</p>
                    <p className="text-xs text-[#767686]">
                      {categoryPerms.filter(p => currentPermissions.includes(p.id)).length} of {categoryPerms.length} selected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {someSelected && <div className="w-2 h-2 rounded-full bg-[#feff1c]" />}
                  {allSelected && <Check size={16} className="text-green-500" />}
                  {expandedCategories.includes(category) ? (
                    <ChevronUp size={18} className="text-[#767686]" />
                  ) : (
                    <ChevronDown size={18} className="text-[#767686]" />
                  )}
                </div>
              </button>

              {expandedCategories.includes(category) && (
                <div className="p-4 pt-0 space-y-2 border-t border-[#424249]">
                  {categoryPerms.map(permission => (
                    <label
                      key={permission.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#232326]/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={currentPermissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id, forEditing)}
                        className="mt-0.5 w-4 h-4 accent-[#feff1c] cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-[#f8f9fa]">{permission.name}</p>
                        <p className="text-xs text-[#767686]">{permission.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Kamerik205:Regular_3',sans-serif] text-[24px] leading-[31.2px] text-[#f8f9fa]">
            Role Management
          </h2>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#9caab8] mt-1">
            Create custom roles and define permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#feff1c] text-[#121214] px-[20px] py-[10px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          Create Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(role => (
          <div key={role.id} className="bg-[#232326] rounded-xl border border-[#424249] overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-lg ${getRoleColor(role.name)}`}>
                      {role.name}
                    </h3>
                    {!role.isCustom && (
                      <Lock size={14} className="text-[#767686]" />
                    )}
                  </div>
                  <p className="text-sm text-[#767686]">{role.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#767686]" />
                  <span className="text-xs text-[#767686]">{role.userCount} user{role.userCount !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#767686]" />
                  <span className="text-xs text-[#767686]">{getPermissionCount(role)} permissions</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingRole(role)}
                  className="flex-1 bg-[#121214] text-[#f8f9fa] px-[16px] py-[8px] rounded-[8px] text-sm hover:bg-[#1a1a1d] transition-all flex items-center justify-center gap-2 border border-[#424249]"
                >
                  <Edit size={14} />
                  Edit
                </button>
                {role.isCustom && (
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    disabled={role.userCount > 0}
                    className="flex-1 bg-[#121214] text-red-500 px-[16px] py-[8px] rounded-[8px] text-sm hover:bg-[#1a1a1d] transition-all flex items-center justify-center gap-2 border border-[#424249] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] rounded-xl border border-[#424249] max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#424249] flex items-center justify-between">
              <div>
                <h2 className="font-['Kamerik205:Regular_3',sans-serif] text-[20px] text-[#f8f9fa]">
                  Create New Role
                </h2>
                <p className="text-sm text-[#767686] mt-1">Define permissions for the new role</p>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewRole({ name: '', description: '', permissions: [] });
                }}
                className="text-[#767686] hover:text-[#f8f9fa] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="e.g., Event Manager"
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Description *
                  </label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    placeholder="Describe what this role can do..."
                    rows={2}
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Permissions * ({newRole.permissions.length} selected)
                  </label>
                  {renderPermissionCheckboxes(false)}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#424249] flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewRole({ name: '', description: '', permissions: [] });
                }}
                className="bg-[#121214] text-[#f8f9fa] px-[20px] py-[10px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:bg-[#1a1a1d] transition-all border border-[#424249]"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRole}
                className="bg-[#feff1c] text-[#121214] px-[20px] py-[10px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:opacity-90 transition-all"
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editingRole && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] rounded-xl border border-[#424249] max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#424249] flex items-center justify-between">
              <div>
                <h2 className="font-['Kamerik205:Regular_3',sans-serif] text-[20px] text-[#f8f9fa]">
                  Edit Role: {editingRole.name}
                </h2>
                <p className="text-sm text-[#767686] mt-1">Modify role permissions</p>
              </div>
              <button
                onClick={() => setEditingRole(null)}
                className="text-[#767686] hover:text-[#f8f9fa] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                    disabled={!editingRole.isCustom}
                    placeholder="e.g., Event Manager"
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Description *
                  </label>
                  <textarea
                    value={editingRole.description}
                    onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                    disabled={!editingRole.isCustom}
                    placeholder="Describe what this role can do..."
                    rows={2}
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {!editingRole.isCustom && (
                  <div className="flex items-start gap-3 p-4 bg-[#121214] border border-[#424249] rounded-xl">
                    <AlertCircle size={16} className="text-[#feff1c] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#f8f9fa]">System Role</p>
                      <p className="text-[10px] text-[#767686] mt-1 leading-relaxed">
                        This is a system-defined role. You can modify permissions but cannot change the name or description.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Permissions * ({editingRole.permissions.length} selected)
                  </label>
                  {renderPermissionCheckboxes(true)}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#424249] flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingRole(null)}
                className="bg-[#121214] text-[#f8f9fa] px-[20px] py-[10px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:bg-[#1a1a1d] transition-all border border-[#424249]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                className="bg-[#feff1c] text-[#121214] px-[20px] py-[10px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:opacity-90 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
