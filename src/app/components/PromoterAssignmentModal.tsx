import React, { useState } from 'react';
import { X, Check, Search, Users, Copy, LinkIcon, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Promoter {
  id: string;
  name: string;
  email: string;
  trackingCode: string;
  commissionRate: number;
  commissionType: 'percentage' | 'fixed';
  status: 'active' | 'paused';
}

// Mock promoters data - in production this would come from a global state/context
const mockAvailablePromoters: Promoter[] = [
  {
    id: '1',
    name: 'Kwame Osei',
    email: 'kwame.osei@promoter.gh',
    trackingCode: 'KWAME2026',
    commissionRate: 10,
    commissionType: 'percentage',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ama Asante',
    email: 'ama@events.gh',
    trackingCode: 'AMA2026',
    commissionRate: 15,
    commissionType: 'percentage',
    status: 'active',
  },
  {
    id: '3',
    name: 'Kofi Mensah',
    email: 'kofi.mensah@gmail.com',
    trackingCode: 'KOFI2026',
    commissionRate: 50,
    commissionType: 'fixed',
    status: 'paused',
  },
];

interface PromoterAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
  assignedPromoterIds?: string[];
}

export const PromoterAssignmentModal = ({ 
  isOpen, 
  onClose, 
  eventName, 
  eventId,
  assignedPromoterIds = [] 
}: PromoterAssignmentModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPromoters, setSelectedPromoters] = useState<string[]>(assignedPromoterIds);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredPromoters = mockAvailablePromoters.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.trackingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTogglePromoter = (promoterId: string) => {
    setSelectedPromoters(prev =>
      prev.includes(promoterId)
        ? prev.filter(id => id !== promoterId)
        : [...prev, promoterId]
    );
  };

  const handleCopyLink = (trackingCode: string) => {
    // Create event-specific tracking link
    const eventSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    const link = `https://events.gh/${eventSlug}?ref=${trackingCode}`;
    
    const textArea = document.createElement('textarea');
    textArea.value = link;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    
    setCopiedCode(trackingCode);
    setTimeout(() => setCopiedCode(null), 2000);
    toast.success('Event-specific tracking link copied!');
  };

  const handleSave = () => {
    const addedCount = selectedPromoters.filter(id => !assignedPromoterIds.includes(id)).length;
    const removedCount = assignedPromoterIds.filter(id => !selectedPromoters.includes(id)).length;
    
    if (addedCount > 0 || removedCount > 0) {
      toast.success(`Updated promoter assignments: ${addedCount} added, ${removedCount} removed`);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
              Assign Promoters
            </h2>
            <p className="text-sm text-[#9caab8] mt-1">Select promoters for {eventName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search promoters..."
            className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
          />
        </div>

        {/* Promoters List */}
        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
          {filteredPromoters.length === 0 ? (
            <div className="text-center py-8">
              <Users size={48} className="mx-auto text-[#424249] mb-3" />
              <p className="text-[#9caab8] text-sm">
                {searchTerm ? 'No promoters found' : 'No promoters available. Create one from the Promoters page.'}
              </p>
            </div>
          ) : (
            filteredPromoters.map((promoter) => {
              const isSelected = selectedPromoters.includes(promoter.id);
              const eventSlug = eventName.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <div
                  key={promoter.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#feff1c]/5 border-[#feff1c]'
                      : 'bg-[#121214] border-[#424249] hover:border-[#feff1c]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      onClick={() => handleTogglePromoter(promoter.id)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#feff1c]/10 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-[#feff1c]">
                            {promoter.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-[#f8f9fa]">{promoter.name}</p>
                            {promoter.status === 'paused' && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-500/10 text-amber-500 uppercase">
                                Paused
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#9caab8] truncate">{promoter.email}</p>
                        </div>
                        {isSelected && (
                          <Check size={20} className="text-[#feff1c] shrink-0" />
                        )}
                      </div>
                    </button>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-[#424249] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-[#9caab8]">
                          <DollarSign size={12} />
                          <span>Commission: {promoter.commissionType === 'percentage' ? `${promoter.commissionRate}%` : `GH₵${promoter.commissionRate}`}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 px-2 py-1.5 bg-[#232326] border border-[#424249] rounded-lg">
                          <LinkIcon size={12} className="text-[#feff1c] shrink-0" />
                          <code className="text-[10px] text-[#f8f9fa] truncate">
                            events.gh/{eventSlug}?ref={promoter.trackingCode}
                          </code>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(promoter.trackingCode);
                          }}
                          className="p-1.5 bg-[#232326] border border-[#424249] rounded-lg hover:border-[#feff1c] transition-all"
                        >
                          {copiedCode === promoter.trackingCode ? (
                            <Check size={12} className="text-[#feff1c]" />
                          ) : (
                            <Copy size={12} className="text-[#767686]" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Summary */}
        <div className="bg-[#121214] p-4 rounded-xl border border-[#424249] mb-6">
          <p className="text-sm text-[#9caab8]">
            <span className="font-bold text-[#feff1c]">{selectedPromoters.length}</span> promoter{selectedPromoters.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
