import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  X, 
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TablePagination } from './TablePagination';
import svgPaths from '../../imports/svg-khchg50gol';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const contacts = [
  { 
    id: 1, 
    name: 'Kwame Asante', 
    email: 'kwame.asante@gmail.com', 
    phone: '+233 24 567 8901', 
    lastEvent: 'Afrochella 2025', 
    joined: 'Oct 2025', 
    image: 'https://images.unsplash.com/photo-1750438920035-e5d213280a78?q=80&w=200&h=200&fit=crop',
    tags: ['VIP', 'Regular'],
    status: 'active',
    isMerged: true,
    totalSpent: 2850.00,
    totalOrders: 3,
    history: [
      { id: 101, event: 'Afrochella 2025', date: '2025-12-28', tickets: 2, amount: 1200.00, status: 'Completed' },
      { id: 102, event: 'Ghana Music Awards 2026', date: '2026-06-15', tickets: 1, amount: 850.00, status: 'Completed' },
      { id: 103, event: 'Detty December Concert', date: '2025-12-22', tickets: 2, amount: 800.00, status: 'Completed' },
    ]
  },
  { 
    id: 2, 
    name: 'Ama Mensah', 
    email: 'ama.mensah@yahoo.com', 
    phone: '+233 50 234 5678', 
    lastEvent: 'Ghana Music Awards 2026', 
    joined: 'Jan 2026', 
    image: 'https://images.unsplash.com/photo-1583590019912-19cdc55ec80e?q=80&w=200&h=200&fit=crop',
    tags: ['Early Bird'],
    status: 'active',
    isMerged: false,
    totalSpent: 600.00,
    totalOrders: 1,
    history: [
      { id: 201, event: 'Ghana Music Awards 2026', date: '2026-06-15', tickets: 1, amount: 600.00, status: 'Completed' },
    ]
  },
  { 
    id: 3, 
    name: 'Kofi Osei', 
    email: 'kofi.osei@outlook.com', 
    phone: '+233 27 891 2345', 
    lastEvent: 'Afrochella 2025', 
    joined: 'Nov 2025', 
    image: '',
    tags: ['VIP'],
    status: 'active',
    isMerged: true,
    totalSpent: 1800.00,
    totalOrders: 1,
    history: [
      { id: 301, event: 'Afrochella 2025', date: '2025-12-28', tickets: 4, amount: 1800.00, status: 'Completed' },
    ]
  }
];

const CaretUpDown = () => (
  <div className="relative shrink-0 size-[12px]">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
      <g clipPath="url(#clip0_caret)">
        <path d="M3.75 8.25L6 10.5L8.25 8.25" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M3.75 3.75L6 1.5L8.25 3.75" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_caret">
          <rect fill="white" height="12" width="12" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

const StatusDot = ({ status }: { status: string }) => {
  const color = status === 'active' ? '#20CC70' : '#FF4D4D';
  return (
    <div className="flex gap-[8px] items-center py-[4px]">
      <div className="relative shrink-0 size-[6.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.5 6.5">
          <path d={svgPaths.pd857200} fill={color} />
        </svg>
      </div>
      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px] capitalize">{status}</span>
    </div>
  );
};

// Figma-style action icons
const FigmaPencil = () => (
  <div className="relative shrink-0 size-[24px] cursor-pointer">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g clipPath="url(#clip_pencil)">
        <path d={svgPaths.p1164200} stroke="#9CAAB8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M20.25 20.25H9" stroke="#9CAAB8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M12.75 6L18 11.25" stroke="#9CAAB8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip_pencil"><rect fill="white" height="24" width="24" /></clipPath>
      </defs>
    </svg>
  </div>
);

const FigmaTrash = () => (
  <div className="relative shrink-0 size-[24px] cursor-pointer">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g clipPath="url(#clip_trash)">
        <path d="M20.25 5.25H3.75" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M9.75 9.75V15.75" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M14.25 9.75V15.75" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p23bdb780} stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p38c78bc0} stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip_trash"><rect fill="white" height="24" width="24" /></clipPath>
      </defs>
    </svg>
  </div>
);

const FigmaFileArchive = () => (
  <div className="relative shrink-0 size-[24px] cursor-pointer">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g clipPath="url(#clip_file)">
        <path d="M14.25 3V8.25H19.5" stroke="#FFDB43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p38b0c1c0} stroke="#FFDB43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M9.75 21V10.5" stroke="#FFDB43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M8.25 15H11.25" stroke="#FFDB43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M8.25 12H11.25" stroke="#FFDB43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M8.25 18H11.25" stroke="#FFDB43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip_file"><rect fill="white" height="24" width="24" /></clipPath>
      </defs>
    </svg>
  </div>
);

const FigmaPaperPlane = () => (
  <div className="relative shrink-0 size-[24px] cursor-pointer">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g clipPath="url(#clip_plane)">
        <path d="M10.125 13.875L15 9" stroke="#20CC70" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p352b9880} stroke="#20CC70" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip_plane"><rect fill="white" height="24" width="24" /></clipPath>
      </defs>
    </svg>
  </div>
);

export function ContactsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const segments = ['All', 'VIP', 'Regular', 'Recent'];

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesSegment = true;
      if (selectedSegment === 'VIP') matchesSegment = c.tags.includes('VIP');
      if (selectedSegment === 'Regular') matchesSegment = c.tags.includes('Regular');
      if (selectedSegment === 'Recent') matchesSegment = c.joined.includes('2026');

      return matchesSearch && matchesSegment;
    });
  }, [searchTerm, selectedSegment]);

  return (
    <div className="relative flex flex-col gap-8 animate-in fade-in duration-500 min-h-[calc(100vh-12rem)]">
      {/* Header Section */}
      <div>
        <h1 className="text-24px font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Contacts</h1>
        <p className="text-[#9caab8]">Manage your attendees and customer base.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="bg-[#232326] flex items-center p-[4px] rounded-[12px] w-full lg:w-auto overflow-x-auto shrink-0 border border-[#424249]">
          {segments.map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={cn(
                "px-[16px] py-[8px] rounded-[8px] text-[14px] font-['Inter:Regular',sans-serif] transition-all whitespace-nowrap cursor-pointer",
                selectedSegment === seg ? "bg-[#424249] text-[#f8f9fa]" : "text-[#f8f9fa] hover:text-[#f8f9fa]/80"
              )}
            >
              {seg}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-[10px] w-full lg:w-auto">
          <div className="bg-[#232326] flex gap-[8px] items-center px-[16px] py-[8px] rounded-[8px] w-full sm:w-[316px] border border-[#424249] focus-within:border-[#feff1c] transition-all">
            <Search size={20} className="text-[#9caab8]" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-[#f8f9fa] text-[14px] w-full placeholder-[#9caab8]"
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-[8px] border border-[#767686] text-[#f8f9fa] text-[14px] hover:bg-[#121214] transition-all"
            >
              Export <Download size={16} />
            </button>
            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#232326] border border-[#424249] rounded-xl shadow-2xl z-50">
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#121214] rounded-t-xl">Export as CSV</button>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#121214]">Export as PDF</button>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#121214] rounded-b-xl">Export as Excel</button>
              </div>
            )}
          </div>

          <button className="bg-[#feff1c] flex gap-[8px] items-center px-[16px] py-[8px] rounded-[8px] text-[#121214] font-bold hover:opacity-90">
            <Plus size={16} /> Add Contact
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className={cn("flex-1 transition-all", selectedContact ? "lg:w-2/3" : "w-full")}>
          <div className="bg-[#121214] rounded-2xl border border-[#424249] overflow-hidden m-[0px]">
            <div className="overflow-x-auto min-w-[700px]">
              {/* Header Row */}
              <div className="bg-[#232326] w-full">
                <div className="flex items-center w-full">
                  <div className="w-[200px] shrink-0 content-stretch flex gap-[4px] items-center p-[12px]">
                    <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px]">Contact</span>
                    <CaretUpDown />
                  </div>
                  <div className="flex-[1_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px]">Email</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[1_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px]">Total Spent</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[1_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px]">Status</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[1_0_0] min-w-0">
                    <div className="content-stretch flex items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px]">Actions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Rows */}
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={cn(
                    "relative w-full hover:bg-[#232326]/50 transition-colors cursor-pointer group",
                    selectedContact?.id === contact.id && "bg-[#feff1c]/5"
                  )}
                >
                  <div aria-hidden="true" className="absolute border-[#424249] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex items-center w-full pt-px">
                    {/* Contact */}
                    <div className="w-[200px] shrink-0 flex items-center gap-3 px-[12px] py-[8px]">
                      <div className="w-10 h-10 rounded-full bg-[#232326] border border-[#424249] overflow-hidden flex items-center justify-center font-bold shrink-0">
                        {contact.image ? (
                          <ImageWithFallback src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[#f8f9fa]">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px] group-hover:text-[#feff1c] transition-colors truncate">{contact.name}</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#9caab8] text-[12px]">#{1000 + contact.id}</p>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="flex-[1_0_0] min-w-0 flex flex-col justify-center px-[12px] py-[8px]">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px] truncate">{contact.email}</p>
                    </div>
                    {/* Total Spent */}
                    <div className="flex-[1_0_0] min-w-0 flex flex-col justify-center px-[12px] py-[8px]">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic text-[#f8f9fa] text-[14px]">GH₵{contact.totalSpent.toFixed(2)}</p>
                    </div>
                    {/* Status */}
                    <div className="flex-[1_0_0] min-w-0 flex items-center px-[12px] py-[8px]">
                      <StatusDot status={contact.status} />
                    </div>
                    {/* Actions */}
                    <div className="flex-[1_0_0] min-w-0 flex items-center px-[12px] py-[8px]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-[8px]">
                        <FigmaPencil />
                        <FigmaTrash />
                        <FigmaFileArchive />
                        <FigmaPaperPlane />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <TablePagination totalItems={filteredContacts.length} itemLabel="contacts" />
        </div>

        {selectedContact && (
          <div className="lg:w-1/3 bg-[#232326] rounded-2xl border border-[#424249] p-6 h-fit sticky top-24 animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold font-['Kamerik205:Regular_3',sans-serif]">Contact Details</h3>
              <button onClick={() => setSelectedContact(null)} className="p-1 hover:bg-[#121214] rounded-full"><X size={20} /></button>
            </div>
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#121214] border border-[#feff1c] mx-auto mb-4 overflow-hidden">
                {selectedContact.image ? (
                  <ImageWithFallback src={selectedContact.image} alt={selectedContact.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold flex items-center justify-center h-full">{selectedContact.name.split(' ').map((n: string) => n[0]).join('')}</span>
                )}
              </div>
              <h4 className="text-xl font-bold">{selectedContact.name}</h4>
              <p className="text-[#9caab8] text-sm">{selectedContact.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                <p className="text-[10px] text-[#9caab8] font-bold uppercase mb-1">Total Spent</p>
                <p className="text-xl font-bold">GH₵{selectedContact.totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                <p className="text-[10px] text-[#9caab8] font-bold uppercase mb-1">Orders</p>
                <p className="text-xl font-bold">{selectedContact.totalOrders}</p>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-[#feff1c] text-[#121214] py-3 rounded-xl font-bold hover:opacity-90">Send Email</button>
              <button className="w-full bg-[#121214] text-[#f8f9fa] border border-[#424249] py-3 rounded-xl font-bold hover:bg-black">View Purchase History</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}