import React, { useState } from 'react';
import {
  User,
  Mail,
  ChevronRight,
  Building2,
  Phone,
  Save,
  UserPlus,
  Trash2,
  Shield,
  AlertCircle,
  Users,
  Search,
  Filter,
  Edit,
  FileText,
  Send,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Plus,
  Check,
  X,
  Lock,
  Unlock,
} from 'lucide-react';
import { toast } from 'sonner';
import { FormLabel, FormInput, FormButton } from './shared/FormComponents';
import { RoleManagement } from './RoleManagement';

interface SettingsViewProps {
  onNavigate: (view: string) => void;
}

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

interface TeamMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'Active' | 'Pending';
  addedDate: string;
}

type TabType = 'profile' | 'team' | 'roles';

export const SettingsView = ({ onNavigate }: SettingsViewProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  
  // Business Details State
  const [businessData, setBusinessData] = useState({
    businessName: 'Strictly Soul Ghana',
    contactPerson: 'Kofi Mensah',
    email: 'kofi@strictlysoul.gh',
    phone: '+233 24 555 1234',
    businessType: 'event-organizer',
    address: 'East Legon, Accra',
  });

  // Team Members State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Kofi Mensah',
      email: 'kofi@strictlysoul.gh',
      roleId: 'admin',
      status: 'Active',
      addedDate: '2025-01-15',
    },
    {
      id: '2',
      name: 'Ama Osei',
      email: 'ama@strictlysoul.gh',
      roleId: 'editor',
      status: 'Active',
      addedDate: '2025-02-10',
    },
    {
      id: '3',
      name: 'Kwame Asante',
      email: 'kwame@strictlysoul.gh',
      roleId: 'viewer',
      status: 'Pending',
      addedDate: '2026-03-05',
    },
    {
      id: '4',
      name: 'Abena Darko',
      email: 'abena@strictlysoul.gh',
      roleId: 'editor',
      status: 'Active',
      addedDate: '2026-02-20',
    },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Editor' | 'Viewer'>('Viewer');

  const handleSaveBusinessDetails = () => {
    toast.success('Business details updated successfully!');
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) {
      toast.error('Please enter a name');
      return;
    }
    if (!newMemberEmail) {
      toast.error('Please enter an email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMemberEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail,
      roleId: newMemberRole.toLowerCase(),
      status: 'Pending',
      addedDate: new Date().toISOString().split('T')[0],
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('Viewer');
    toast.success(`Invitation sent to ${newMemberEmail}`);
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast.success('Team member removed');
  };

  const handleRoleChange = (memberId: string, newRole: 'Admin' | 'Editor' | 'Viewer') => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, roleId: newRole.toLowerCase() } : member
    ));
    setEditingRoleId(null);
    toast.success(`Role updated to ${newRole}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <div className="flex items-center gap-2">
            <div className="size-[7px] rounded-full bg-green-500" />
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Active</span>
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center gap-2">
            <div className="size-[7px] rounded-full bg-amber-500" />
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-['Kamerik205:Regular_3',sans-serif] text-[32px] leading-[41.6px] text-[#f8f9fa]">
          Settings
        </h1>
        <p className="font-['Inter:Regular',sans-serif] text-[14px] leading-[18.2px] text-[#9caab8] mt-2">
          Manage your business details and team access
        </p>
      </div>

      {/* Standalone Tab Navigation */}
      <div className="border-[#424249] border-b-[1px] border-solid relative h-[48px]">
        <div className="relative flex items-start h-full">
          <div
            onClick={() => setActiveTab('profile')}
            className="relative h-full px-[24px] cursor-pointer flex items-center justify-center"
          >
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] whitespace-nowrap ${activeTab === 'profile' ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
              Profile
            </p>
            {activeTab === 'profile' && (
              <div className="absolute bg-[#feff1c] h-[2px] left-0 bottom-0 w-full" />
            )}
          </div>
          <div
            onClick={() => setActiveTab('team')}
            className="relative h-full px-[24px] cursor-pointer flex items-center justify-center"
          >
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] whitespace-nowrap ${activeTab === 'team' ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
              Team
            </p>
            {activeTab === 'team' && (
              <div className="absolute bg-[#feff1c] h-[2px] left-0 bottom-0 w-full" />
            )}
          </div>
          <div
            onClick={() => setActiveTab('roles')}
            className="relative h-full px-[24px] cursor-pointer flex items-center justify-center"
          >
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] whitespace-nowrap ${activeTab === 'roles' ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
              Roles
            </p>
            {activeTab === 'roles' && (
              <div className="absolute bg-[#feff1c] h-[2px] left-0 bottom-0 w-full" />
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-[#232326] p-6 rounded-xl border border-[#424249]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                  Business Details
                </h2>
                <p className="text-sm text-[#767686]">Update your organization information for compliance</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel required>Business / Organizer Name</FormLabel>
                  <FormInput
                    type="text"
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                    placeholder="e.g., Strictly Soul Ghana"
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel required>Contact Person</FormLabel>
                  <FormInput
                    type="text"
                    value={businessData.contactPerson}
                    onChange={(e) => setBusinessData({ ...businessData, contactPerson: e.target.value })}
                    placeholder="e.g., Kofi Mensah"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel required>Email Address</FormLabel>
                  <FormInput
                    type="email"
                    value={businessData.email}
                    onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel required>Phone Number</FormLabel>
                  <FormInput
                    type="tel"
                    value={businessData.phone}
                    onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                    placeholder="+233 24 123 4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel>Business Address</FormLabel>
                <FormInput
                  type="text"
                  value={businessData.address}
                  onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                  placeholder="e.g., East Legon, Accra"
                />
              </div>

              <div className="space-y-2">
                <FormLabel required>Business Type</FormLabel>
                <select
                  value={businessData.businessType}
                  onChange={(e) => setBusinessData({ ...businessData, businessType: e.target.value })}
                  className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
                >
                  <option value="event-organizer">Event Organizer</option>
                  <option value="venue">Venue</option>
                  <option value="promoter">Promoter</option>
                  <option value="artist">Artist/Performer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#121214] border border-[#424249] rounded-xl">
                <AlertCircle size={16} className="text-[#feff1c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#f8f9fa]">Compliance Notice</p>
                  <p className="text-[10px] text-[#767686] mt-1 leading-relaxed">
                    If your merchant application was rejected, please review and update the required information above. Ensure all details are accurate and comply with our merchant requirements before resubmitting.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#424249]">
                <FormButton onClick={handleSaveBusinessDetails} variant="primary">
                  Save Changes
                </FormButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Add Team Member Form */}
          <div className="bg-[#232326] p-6 rounded-xl border border-[#424249]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
                <UserPlus size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                  Add Team Member
                </h2>
                <p className="text-sm text-[#767686]">Invite new members to access your dashboard</p>
              </div>
            </div>

            <form onSubmit={handleAddTeamMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <FormLabel required>Name</FormLabel>
                  <FormInput
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="e.g., Kofi Mensah"
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel required>Email Address</FormLabel>
                  <FormInput
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="colleague@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel required>Role</FormLabel>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as 'Admin' | 'Editor' | 'Viewer')}
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#feff1c] text-[#121214] px-[20px] py-[10px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:opacity-90 transition-all flex items-center gap-2"
              >
                <UserPlus size={16} />
                Send Invitation
              </button>
            </form>

            {/* Role Descriptions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-[#121214] rounded-lg border border-[#424249]">
                <p className="font-bold text-xs text-[#f8f9fa] mb-1">Admin</p>
                <p className="text-[10px] text-[#767686] leading-relaxed">Full access to all features and settings</p>
              </div>
              <div className="p-3 bg-[#121214] rounded-lg border border-[#424249]">
                <p className="font-bold text-xs text-[#f8f9fa] mb-1">Editor</p>
                <p className="text-[10px] text-[#767686] leading-relaxed">Can create and edit events, view reports</p>
              </div>
              <div className="p-3 bg-[#121214] rounded-lg border border-[#424249]">
                <p className="font-bold text-xs text-[#f8f9fa] mb-1">Viewer</p>
                <p className="text-[10px] text-[#767686] leading-relaxed">View-only access to events and reports</p>
              </div>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div className="h-[42px] relative shrink-0 w-full flex items-center justify-between">
            {/* Search Input */}
            <div className="relative w-[448px]">
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
                <Search size={18} className="text-[#767686]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team members..."
                className="w-full h-[42px] pl-[40px] pr-[16px] bg-[#232326] rounded-[14px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[rgba(248,249,250,0.5)] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-[12px]">
              <button className="bg-[#232326] h-[42px] px-[20px] rounded-[14px] border border-[#424249] hover:border-[#767686] transition-all flex items-center gap-2">
                <Filter size={16} className="text-[#f8f9fa]" />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f8f9fa] text-[14px]">Filters</span>
              </button>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="bg-[#232326] rounded-[8px] border border-[#424249] overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#232326] h-[40px] relative shrink-0 w-full border-b border-[#424249]">
              <div className="flex items-center h-full px-[12px]">
                <div className="flex-1 px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Name</p>
                </div>
                <div className="flex-1 px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Email</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Role</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Status</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Added</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Actions</p>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div>
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`h-[56px] flex items-center px-[12px] hover:bg-[#121214]/50 transition-colors ${
                    index !== 0 ? 'border-t border-[#424249]' : ''
                  }`}
                >
                  <div className="flex-1 px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">
                      {member.name}
                    </p>
                  </div>
                  <div className="flex-1 px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#9caab8] text-[14px]">
                      {member.email}
                    </p>
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    {editingRoleId === member.id ? (
                      <select
                        value={member.roleId}
                        onChange={(e) => handleRoleChange(member.id, e.target.value as 'Admin' | 'Editor' | 'Viewer')}
                        onBlur={() => setEditingRoleId(null)}
                        autoFocus
                        className="w-full px-[12px] py-[6px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
                      >
                        <option value="Viewer">Viewer</option>
                        <option value="Editor">Editor</option>
                        <option value="Admin">Admin</option>
                      </select>
                    ) : (
                      <button
                        onClick={() => setEditingRoleId(member.id)}
                        className={`font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[14px] hover:underline transition-all ${
                          member.roleId === 'admin' ? 'text-purple-400' : 
                          member.roleId === 'editor' ? 'text-blue-400' : 
                          'text-[#767686]'
                        }`}
                      >
                        {member.roleId.charAt(0).toUpperCase() + member.roleId.slice(1)}
                      </button>
                    )}
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    {getStatusBadge(member.status)}
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">
                      {new Date(member.addedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    <div className="flex items-center gap-[12px]">
                      <button className="hover:opacity-70 transition-opacity" title="Edit">
                        <Edit size={18} className="text-[#9caab8]" />
                      </button>
                      {member.roleId !== 'admin' && (
                        <button 
                          className="hover:opacity-70 transition-opacity" 
                          title="Remove"
                          onClick={() => handleRemoveTeamMember(member.id)}
                        >
                          <Trash2 size={18} className="text-[#767686]" />
                        </button>
                      )}
                      {member.status === 'Pending' && (
                        <button className="hover:opacity-70 transition-opacity" title="Resend Invitation">
                          <Send size={18} className="text-[#feff1c]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#9caab8]">
              Showing 1-{teamMembers.length} of {teamMembers.length} team members
            </p>
            <div className="flex items-center gap-2">
              <button className="w-[32px] h-[32px] rounded-[8px] border border-[#424249] bg-[#232326] flex items-center justify-center hover:border-[#767686] transition-all disabled:opacity-50" disabled>
                <ChevronLeft size={16} className="text-[#f8f9fa]" />
              </button>
              <button className="w-[32px] h-[32px] rounded-[8px] border border-[#feff1c] bg-[#feff1c]/10 flex items-center justify-center">
                <span className="font-['Inter:Regular',sans-serif] text-[14px] text-[#feff1c] font-bold">1</span>
              </button>
              <button className="w-[32px] h-[32px] rounded-[8px] border border-[#424249] bg-[#232326] flex items-center justify-center hover:border-[#767686] transition-all disabled:opacity-50" disabled>
                <ChevronRight size={16} className="text-[#f8f9fa]" />
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-[#232326] border border-[#424249] rounded-xl">
            <AlertCircle size={16} className="text-[#feff1c] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#f8f9fa]">Access Control Notice</p>
              <p className="text-[10px] text-[#767686] mt-1 leading-relaxed">
                Team members will receive an email invitation. They must accept the invitation and create an account to access your dashboard. Only Admins can modify business settings and manage team members.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <RoleManagement />
        </div>
      )}
    </div>
  );
};