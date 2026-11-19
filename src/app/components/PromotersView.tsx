import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  TrendingUp, 
  DollarSign,
  Link as LinkIcon,
  Copy,
  Check,
  X,
  Mail,
  Phone,
  ExternalLink,
  BarChart3,
  Eye,
  Ticket,
  UserPlus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface Promoter {
  id: string;
  name: string;
  email: string;
  phone: string;
  commissionRate: number;
  commissionType: 'percentage' | 'fixed';
  totalSales: number;
  totalRevenue: number;
  totalClicks: number;
  conversionRate: number;
  pendingPayout: number;
  totalEarned: number;
  status: 'active' | 'paused';
  joinedDate: string;
  trackingCode: string;
  assignedEvents: string[]; // Event IDs this promoter is assigned to
}

const mockPromoters: Promoter[] = [
  {
    id: '1',
    name: 'Kwame Osei',
    email: 'kwame.osei@promoter.gh',
    phone: '+233 24 123 4567',
    commissionRate: 10,
    commissionType: 'percentage',
    totalSales: 234,
    totalRevenue: 70200,
    totalClicks: 1847,
    conversionRate: 12.7,
    pendingPayout: 7020,
    totalEarned: 18450,
    status: 'active',
    joinedDate: '2025-11-15',
    trackingCode: 'KWAME2026',
    assignedEvents: ['event1', 'event2'],
  },
  {
    id: '2',
    name: 'Ama Asante',
    email: 'ama@events.gh',
    phone: '+233 20 987 6543',
    commissionRate: 15,
    commissionType: 'percentage',
    totalSales: 156,
    totalRevenue: 46800,
    totalClicks: 892,
    conversionRate: 17.5,
    pendingPayout: 7020,
    totalEarned: 12350,
    status: 'active',
    joinedDate: '2025-12-01',
    trackingCode: 'AMA2026',
    assignedEvents: ['event3'],
  },
  {
    id: '3',
    name: 'Kofi Mensah',
    email: 'kofi.mensah@gmail.com',
    phone: '+233 55 246 8024',
    commissionRate: 50,
    commissionType: 'fixed',
    totalSales: 89,
    totalRevenue: 26700,
    totalClicks: 634,
    conversionRate: 14.0,
    pendingPayout: 4450,
    totalEarned: 8200,
    status: 'paused',
    joinedDate: '2026-01-10',
    trackingCode: 'KOFI2026',
    assignedEvents: [],
  },
];

export const PromotersView = () => {
  const [promoters, setPromoters] = useState<Promoter[]>(mockPromoters);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPromoter, setSelectedPromoter] = useState<Promoter | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [newPromoter, setNewPromoter] = useState({
    name: '',
    email: '',
    phone: '',
    commissionRate: 10,
    commissionType: 'percentage' as 'percentage' | 'fixed',
    trackingCode: '',
  });

  const [editPromoter, setEditPromoter] = useState({
    name: '',
    email: '',
    phone: '',
    commissionRate: 10,
    commissionType: 'percentage' as 'percentage' | 'fixed',
    trackingCode: '',
  });

  const filteredPromoters = promoters.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.trackingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    activePromoters: promoters.filter(p => p.status === 'active').length,
    totalSales: promoters.reduce((sum, p) => sum + p.totalSales, 0),
    totalRevenue: promoters.reduce((sum, p) => sum + p.totalRevenue, 0),
    pendingPayouts: promoters.reduce((sum, p) => sum + p.pendingPayout, 0),
  };

  const handleCopyTrackingLink = (code: string) => {
    const link = `https://events.gh/afrochella-2026?ref=${code}`;
    const textArea = document.createElement('textarea');
    textArea.value = link;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast.success('Tracking link copied to clipboard!');
  };

  const handleToggleStatus = (id: string) => {
    setPromoters(prev => prev.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'active' ? 'paused' : 'active';
        toast.success(`Promoter ${p.name} ${newStatus === 'active' ? 'activated' : 'paused'}`);
        return { ...p, status: newStatus as 'active' | 'paused' };
      }
      return p;
    }));
  };

  const handleInvitePromoter = () => {
    if (!newPromoter.name || !newPromoter.email) {
      toast.error('Please fill in name and email');
      return;
    }

    const promoter: Promoter = {
      id: Date.now().toString(),
      name: newPromoter.name,
      email: newPromoter.email,
      phone: newPromoter.phone,
      commissionRate: newPromoter.commissionRate,
      commissionType: newPromoter.commissionType,
      totalSales: 0,
      totalRevenue: 0,
      totalClicks: 0,
      conversionRate: 0,
      pendingPayout: 0,
      totalEarned: 0,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      trackingCode: newPromoter.trackingCode || newPromoter.name.split(' ')[0].toUpperCase() + '2026',
      assignedEvents: [],
    };

    setPromoters(prev => [...prev, promoter]);
    toast.success(`Invitation sent to ${promoter.name}!`);
    setShowInviteModal(false);
    setNewPromoter({
      name: '',
      email: '',
      phone: '',
      commissionRate: 10,
      commissionType: 'percentage',
      trackingCode: '',
    });
  };

  const handleEditPromoter = () => {
    if (!editPromoter.name || !editPromoter.email) {
      toast.error('Please fill in name and email');
      return;
    }

    setPromoters(prev => prev.map(p => {
      if (p.id === selectedPromoter?.id) {
        const updatedPromoter: Promoter = {
          ...p,
          name: editPromoter.name,
          email: editPromoter.email,
          phone: editPromoter.phone,
          commissionRate: editPromoter.commissionRate,
          commissionType: editPromoter.commissionType,
          trackingCode: editPromoter.trackingCode || editPromoter.name.split(' ')[0].toUpperCase() + '2026',
        };
        toast.success(`Promoter ${updatedPromoter.name} updated!`);
        return updatedPromoter;
      }
      return p;
    }));
    setShowEditModal(false);
    setEditPromoter({
      name: '',
      email: '',
      phone: '',
      commissionRate: 10,
      commissionType: 'percentage',
      trackingCode: '',
    });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] text-[24px]">
            Affiliate
          </h1>
          <p className="text-[#9caab8] text-sm mt-1">
            Manage your affiliates and promoters and track their performance
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
        >
          <UserPlus size={18} />
          Invite Affiliate
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#232326] p-5 rounded-xl border border-[#424249]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#121214] rounded-lg">
              <Users size={18} className="text-[#feff1c]" />
            </div>
            <p className="text-[#9caab8] text-sm">Active Promoters</p>
          </div>
          <p className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
            {totalStats.activePromoters}
          </p>
        </div>

        <div className="bg-[#232326] p-5 rounded-xl border border-[#424249]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#121214] rounded-lg">
              <Ticket size={18} className="text-[#feff1c]" />
            </div>
            <p className="text-[#9caab8] text-sm">Total Sales</p>
          </div>
          <p className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
            {totalStats.totalSales}
          </p>
        </div>

        <div className="bg-[#232326] p-5 rounded-xl border border-[#424249]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#121214] rounded-lg">
              <TrendingUp size={18} className="text-[#feff1c]" />
            </div>
            <p className="text-[#9caab8] text-sm">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
            GH₵{totalStats.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#232326] p-5 rounded-xl border border-[#424249]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#121214] rounded-lg">
              <DollarSign size={18} className="text-[#feff1c]" />
            </div>
            <p className="text-[#9caab8] text-sm">Pending Payouts</p>
          </div>
          <p className="text-2xl font-bold text-[#feff1c] font-['Kamerik205:Regular_3',sans-serif]">
            GH₵{totalStats.pendingPayouts.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search promoters by name, email, or tracking code..."
          className="w-full pl-12 pr-4 py-3 bg-[#232326] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
        />
      </div>

      {/* Promoters List */}
      <div className="space-y-3">
        {filteredPromoters.length === 0 ? (
          <div className="text-center py-12 bg-[#232326] rounded-xl border border-[#424249]">
            <Users size={48} className="mx-auto text-[#424249] mb-4" />
            <p className="text-[#9caab8] text-sm">
              {searchTerm ? 'No promoters found matching your search' : 'No promoters yet. Invite one to get started!'}
            </p>
          </div>
        ) : (
          filteredPromoters.map((promoter) => (
            <div
              key={promoter.id}
              className="bg-[#232326] p-6 rounded-xl border border-[#424249] hover:border-[#feff1c]/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Promoter Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#feff1c]/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-[#feff1c]">
                        {promoter.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-[#f8f9fa]">{promoter.name}</h3>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${
                          promoter.status === 'active'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                          {promoter.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#9caab8]">
                        <div className="flex items-center gap-1">
                          <Mail size={12} />
                          {promoter.email}
                        </div>
                        {promoter.phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={12} />
                            {promoter.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tracking Link */}
                  <div className="mb-4">
                    <p className="text-xs text-[#767686] font-bold uppercase tracking-wider mb-2">Tracking Link</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#121214] border border-[#424249] rounded-lg">
                        <LinkIcon size={14} className="text-[#feff1c]" />
                        <code className="text-xs text-[#f8f9fa] truncate">
                          https://events.gh/event?ref={promoter.trackingCode}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopyTrackingLink(promoter.trackingCode)}
                        className="px-3 py-2 bg-[#121214] border border-[#424249] rounded-lg hover:border-[#feff1c] transition-all"
                        title="Copy tracking link"
                      >
                        {copiedCode === promoter.trackingCode ? (
                          <Check size={14} className="text-[#feff1c]" />
                        ) : (
                          <Copy size={14} className="text-[#767686]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#121214] p-3 rounded-lg border border-[#424249]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Eye size={12} className="text-[#767686]" />
                        <p className="text-[10px] text-[#767686] font-bold uppercase">Clicks</p>
                      </div>
                      <p className="text-sm font-bold text-[#f8f9fa]">{promoter.totalClicks.toLocaleString()}</p>
                    </div>

                    <div className="bg-[#121214] p-3 rounded-lg border border-[#424249]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Ticket size={12} className="text-[#767686]" />
                        <p className="text-[10px] text-[#767686] font-bold uppercase">Sales</p>
                      </div>
                      <p className="text-sm font-bold text-[#f8f9fa]">{promoter.totalSales}</p>
                    </div>

                    <div className="bg-[#121214] p-3 rounded-lg border border-[#424249]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <BarChart3 size={12} className="text-[#767686]" />
                        <p className="text-[10px] text-[#767686] font-bold uppercase">Conv. Rate</p>
                      </div>
                      <p className="text-sm font-bold text-[#feff1c]">{promoter.conversionRate}%</p>
                    </div>

                    <div className="bg-[#121214] p-3 rounded-lg border border-[#424249]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <DollarSign size={12} className="text-[#767686]" />
                        <p className="text-[10px] text-[#767686] font-bold uppercase">Commission</p>
                      </div>
                      <p className="text-sm font-bold text-[#feff1c]">
                        {promoter.commissionType === 'percentage'
                          ? `${promoter.commissionRate}%`
                          : `GH₵${promoter.commissionRate}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedPromoter(promoter);
                      setEditPromoter({
                        name: promoter.name,
                        email: promoter.email,
                        phone: promoter.phone,
                        commissionRate: promoter.commissionRate,
                        commissionType: promoter.commissionType,
                        trackingCode: promoter.trackingCode,
                      });
                      setShowEditModal(true);
                    }}
                    className="flex-1 lg:flex-none px-4 py-2 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-lg hover:border-[#feff1c] transition-all text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPromoter(promoter);
                      setShowDetailsModal(true);
                    }}
                    className="flex-1 lg:flex-none px-4 py-2 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-lg hover:border-[#feff1c] transition-all text-sm font-bold"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleToggleStatus(promoter.id)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                      promoter.status === 'active'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20'
                        : 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20'
                    }`}
                  >
                    {promoter.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invite Promoter Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-lg w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                Invite Promoter
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPromoter.name}
                  onChange={(e) => setNewPromoter(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Kwame Osei"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newPromoter.email}
                  onChange={(e) => setNewPromoter(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="kwame.osei@promoter.gh"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newPromoter.phone}
                  onChange={(e) => setNewPromoter(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+233 24 123 4567"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Tracking Code
                </label>
                <input
                  type="text"
                  value={newPromoter.trackingCode}
                  onChange={(e) => setNewPromoter(prev => ({ ...prev, trackingCode: e.target.value.toUpperCase() }))}
                  placeholder="KWAME2026"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
                <p className="text-xs text-[#767686] mt-1">Leave blank to auto-generate</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Commission Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNewPromoter(prev => ({ ...prev, commissionType: 'percentage' }))}
                      className={`flex-1 px-3 py-2 rounded-lg font-bold text-xs transition-all ${
                        newPromoter.commissionType === 'percentage'
                          ? 'bg-[#feff1c] text-[#121214]'
                          : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                      }`}
                    >
                      %
                    </button>
                    <button
                      onClick={() => setNewPromoter(prev => ({ ...prev, commissionType: 'fixed' }))}
                      className={`flex-1 px-3 py-2 rounded-lg font-bold text-xs transition-all ${
                        newPromoter.commissionType === 'fixed'
                          ? 'bg-[#feff1c] text-[#121214]'
                          : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                      }`}
                    >
                      GH₵
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    {newPromoter.commissionType === 'percentage' ? 'Rate (%)' : 'Amount (GH₵)'}
                  </label>
                  <input
                    type="number"
                    value={newPromoter.commissionRate}
                    onChange={(e) => setNewPromoter(prev => ({ ...prev, commissionRate: parseInt(e.target.value) || 0 }))}
                    min="1"
                    max={newPromoter.commissionType === 'percentage' ? '100' : undefined}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvitePromoter}
                  className="flex-1 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Promoter Modal */}
      {showEditModal && selectedPromoter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-lg w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                Edit Promoter
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editPromoter.name}
                  onChange={(e) => setEditPromoter(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Kwame Osei"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={editPromoter.email}
                  onChange={(e) => setEditPromoter(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="kwame.osei@promoter.gh"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editPromoter.phone}
                  onChange={(e) => setEditPromoter(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+233 24 123 4567"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Tracking Code
                </label>
                <input
                  type="text"
                  value={editPromoter.trackingCode}
                  onChange={(e) => setEditPromoter(prev => ({ ...prev, trackingCode: e.target.value.toUpperCase() }))}
                  placeholder="KWAME2026"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
                <p className="text-xs text-[#767686] mt-1">Leave blank to auto-generate</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Commission Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditPromoter(prev => ({ ...prev, commissionType: 'percentage' }))}
                      className={`flex-1 px-3 py-2 rounded-lg font-bold text-xs transition-all ${
                        editPromoter.commissionType === 'percentage'
                          ? 'bg-[#feff1c] text-[#121214]'
                          : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                      }`}
                    >
                      %
                    </button>
                    <button
                      onClick={() => setEditPromoter(prev => ({ ...prev, commissionType: 'fixed' }))}
                      className={`flex-1 px-3 py-2 rounded-lg font-bold text-xs transition-all ${
                        editPromoter.commissionType === 'fixed'
                          ? 'bg-[#feff1c] text-[#121214]'
                          : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                      }`}
                    >
                      GH₵
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    {editPromoter.commissionType === 'percentage' ? 'Rate (%)' : 'Amount (GH₵)'}
                  </label>
                  <input
                    type="number"
                    value={editPromoter.commissionRate}
                    onChange={(e) => setEditPromoter(prev => ({ ...prev, commissionRate: parseInt(e.target.value) || 0 }))}
                    min="1"
                    max={editPromoter.commissionType === 'percentage' ? '100' : undefined}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditPromoter}
                  className="flex-1 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
                >
                  Update Promoter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promoter Details Modal */}
      {showDetailsModal && selectedPromoter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                {selectedPromoter.name}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                <h3 className="text-sm font-bold text-[#f8f9fa] mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#9caab8]">
                    <Mail size={14} />
                    {selectedPromoter.email}
                  </div>
                  {selectedPromoter.phone && (
                    <div className="flex items-center gap-2 text-[#9caab8]">
                      <Phone size={14} />
                      {selectedPromoter.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[#9caab8]">
                    <Users size={14} />
                    Joined {formatDate(selectedPromoter.joinedDate)}
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div>
                <h3 className="text-sm font-bold text-[#f8f9fa] mb-3">Performance Overview</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                    <p className="text-xs text-[#767686] font-bold uppercase">Total Clicks</p>
                    <p className="text-2xl font-bold text-[#f8f9fa] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                      {selectedPromoter.totalClicks.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                    <p className="text-xs text-[#767686] font-bold uppercase">Total Sales</p>
                    <p className="text-2xl font-bold text-[#f8f9fa] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                      {selectedPromoter.totalSales}
                    </p>
                  </div>
                  <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                    <p className="text-xs text-[#767686] font-bold uppercase">Conversion Rate</p>
                    <p className="text-2xl font-bold text-[#feff1c] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                      {selectedPromoter.conversionRate}%
                    </p>
                  </div>
                  <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                    <p className="text-xs text-[#767686] font-bold uppercase">Revenue Generated</p>
                    <p className="text-2xl font-bold text-[#feff1c] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                      GH₵{selectedPromoter.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div>
                <h3 className="text-sm font-bold text-[#f8f9fa] mb-3">Earnings</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#feff1c]/5 p-4 rounded-xl border border-[#feff1c]/20">
                    <p className="text-xs text-[#feff1c] font-bold uppercase">Pending Payout</p>
                    <p className="text-2xl font-bold text-[#feff1c] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                      GH₵{selectedPromoter.pendingPayout.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                    <p className="text-xs text-[#767686] font-bold uppercase">Total Earned</p>
                    <p className="text-2xl font-bold text-[#f8f9fa] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                      GH₵{selectedPromoter.totalEarned.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    toast.success(`Payout of GH₵${selectedPromoter.pendingPayout.toLocaleString()} processed for ${selectedPromoter.name}`);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
                >
                  Process Payout
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};