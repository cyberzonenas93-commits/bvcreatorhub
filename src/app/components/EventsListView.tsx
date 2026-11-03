import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Plus, 
  MapPin, 
  Users, 
  ArrowRight,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  Archive,
  FileText,
  LayoutGrid,
  List,
  ChevronUp,
  ChevronDown,
  XCircle,
  Pencil,
  Trash2,
  Send,
  ExternalLink
} from 'lucide-react';
import { TablePagination } from './TablePagination';

const CaretUpDown = () => (
  <div className="flex flex-col -gap-1 text-[#767686]">
    <ChevronUp size={10} strokeWidth={3} />
    <ChevronDown size={10} strokeWidth={3} />
  </div>
);

const StatusDot = ({ status }: { status: string }) => {
  const color = status === 'Live' ? '#20CC70' : 
                status === 'Draft' ? '#FFD524' : 
                status === 'Ended' ? '#A5A5B6' : '#FF4D4D';
  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[14px] text-[#f8f9fa] font-['Inter:Regular',sans-serif]">{status}</span>
    </div>
  );
};

const eventsData = [
  { 
    id: 'afrochella-2026', 
    name: 'Afrochella 2026', 
    date: 'Dec 28, 2026', 
    location: 'El Wak Stadium, Accra',
    status: 'Live', 
    type: 'Paid',
    sold: 1450, 
    total: 3000, 
    revenue: 435000,
    attendees: 1450
  },
  { 
    id: 'tech-conf', 
    name: 'Ghana Tech Summit 2026', 
    date: 'Aug 22, 2026', 
    location: 'Accra International Conference Centre',
    status: 'Live', 
    type: 'RSVP',
    sold: 320, 
    total: 500, 
    revenue: 0,
    attendees: 320
  },
  { 
    id: 'open-mic', 
    name: 'Chale Wote Street Art Festival', 
    date: 'Aug 20, 2026', 
    location: 'Jamestown, Accra',
    status: 'Live', 
    type: 'Free',
    sold: 185, 
    total: 500, 
    revenue: 0,
    attendees: 185
  },
  { 
    id: 'gala-2026', 
    name: 'Detty December Concert', 
    date: 'Dec 22, 2025', 
    location: 'Labadi Beach Hotel, Accra',
    status: 'Ended', 
    type: 'Paid',
    sold: 800, 
    total: 800, 
    revenue: 192000,
    attendees: 795
  },
  { 
    id: 'draft-event', 
    name: 'Panafest 2026', 
    date: 'Jul 25, 2026', 
    location: 'Cape Coast Castle, Cape Coast',
    status: 'Draft', 
    type: 'Paid',
    sold: 0, 
    total: 400, 
    revenue: 0,
    attendees: 0
  },
  { 
    id: 'cancelled-event', 
    name: 'Homowo Festival Concert', 
    date: 'Sep 10, 2026', 
    location: 'Black Star Square, Accra',
    status: 'Cancelled', 
    type: 'Paid',
    sold: 150, 
    total: 1000, 
    revenue: 45000,
    attendees: 0
  },
];

const EventCard = ({ event, onClick }: { event: any, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-[#232326] rounded-2xl border border-[#424249] p-6 hover:border-[#feff1c] transition-all cursor-pointer group flex flex-col justify-between"
  >
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider",
            event.status === 'Live' ? "bg-green-500/10 text-green-500" :
            event.status === 'Draft' ? "bg-amber-500/10 text-amber-500" :
            event.status === 'Cancelled' ? "bg-red-500/10 text-red-500" :
            "bg-slate-500/10 text-slate-400"
          )}>
            {event.status}
          </div>
          <div className={cn(
            "px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider",
            event.type === 'Free' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
            event.type === 'RSVP' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
            "bg-[#feff1c]/10 text-[#feff1c] border border-[#feff1c]/20"
          )}>
            {event.type}
          </div>
        </div>
        <button className="text-[#767686] hover:text-[#f8f9fa] transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>
      <h3 className="text-xl font-bold text-[#f8f9fa] mb-2 font-['Kamerik205:Regular_3',sans-serif] group-hover:text-[#feff1c] transition-colors">{event.name}</h3>
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-[#9caab8]">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#9caab8]">
          <MapPin size={14} />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#9caab8]">
          {event.type === 'Paid' ? 'Sales Progress' : 'Registration Progress'}
        </span>
        <span className="font-bold text-[#f8f9fa]">{event.sold} / {event.total}</span>
      </div>
      <div className="h-1.5 w-full bg-[#121214] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#feff1c]" 
          style={{ width: `${(event.sold / event.total) * 100}%` }} 
        />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[#424249]">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#767686] font-bold uppercase">
            {event.type === 'Paid' ? 'Revenue' : event.type === 'RSVP' ? 'Waitlist' : 'Registrations'}
          </span>
          <span className="text-lg font-bold text-[#f8f9fa]">
            {event.type === 'Paid' ? `GH₵${event.revenue.toLocaleString()}` : `${event.sold} People`}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#121214] flex items-center justify-center text-[#feff1c] group-hover:bg-[#feff1c] group-hover:text-[#121214] transition-all">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  </div>
);

const EventTable = ({ events, onNavigate }: { events: any[], onNavigate: (view: string, id?: string | null) => void }) => (
  <div className="bg-[#121214] rounded-2xl border border-[#424249] overflow-hidden">
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Header */}
        <div className="bg-[#232326] w-full">
          <div className="flex items-center w-full">
            <div className="flex-[1.5_0_0] min-w-0">
              <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Event Name</span>
                <CaretUpDown />
              </div>
            </div>
            <div className="flex-[1.3_0_0] min-w-0">
              <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Date & Location</span>
                <CaretUpDown />
              </div>
            </div>
            <div className="flex-[0.6_0_0] min-w-0">
              <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Type</span>
                <CaretUpDown />
              </div>
            </div>
            <div className="flex-[0.7_0_0] min-w-0">
              <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Status</span>
                <CaretUpDown />
              </div>
            </div>
            <div className="flex-[1_0_0] min-w-0">
              <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Sales / Progress</span>
                <CaretUpDown />
              </div>
            </div>
            <div className="flex-[0.8_0_0] min-w-0">
              <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Revenue</span>
                <CaretUpDown />
              </div>
            </div>
            <div className="w-[140px] shrink-0">
              <div className="content-stretch flex items-center p-[12px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Actions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onNavigate('event-dashboard', event.id)}
            className="relative w-full hover:bg-[#232326]/50 transition-colors group cursor-pointer"
          >
            <div aria-hidden="true" className="absolute border-[#424249] border-solid border-t inset-0 pointer-events-none" />
            <div className="flex items-center w-full pt-px">
              {/* Event Name */}
              <div className="flex-[1.5_0_0] min-w-0 px-[12px] py-[8px]">
                <span className="font-['Kamerik205:Regular_3',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] font-bold group-hover:text-[#feff1c] transition-colors">
                  {event.name}
                </span>
              </div>
              {/* Date & Location */}
              <div className="flex-[1.3_0_0] min-w-0 px-[12px] py-[8px]">
                <div className="flex flex-col gap-0.5">
                  <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">{event.date}</span>
                  <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#9caab8] text-[12px]">{event.location}</span>
                </div>
              </div>
              {/* Type */}
              <div className="flex-[0.6_0_0] min-w-0 px-[12px] py-[8px]">
                <div className={cn(
                  "inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider",
                  event.type === 'Free' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                  event.type === 'RSVP' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                  "bg-[#feff1c]/10 text-[#feff1c] border border-[#feff1c]/20"
                )}>
                  {event.type}
                </div>
              </div>
              {/* Status */}
              <div className="flex-[0.7_0_0] min-w-0 px-[12px] py-[8px]">
                <StatusDot status={event.status} />
              </div>
              {/* Sales/Progress */}
              <div className="flex-[1_0_0] min-w-0 px-[12px] py-[8px]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="font-['Inter:Regular',sans-serif] text-[#9caab8]">{event.sold} / {event.total}</span>
                    <span className="font-['Inter:Regular',sans-serif] text-[#f8f9fa]">{Math.round((event.sold / event.total) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-[#121214] rounded-full overflow-hidden">
                    <div className="h-full bg-[#feff1c]" style={{ width: `${(event.sold / event.total) * 100}%` }} />
                  </div>
                </div>
              </div>
              {/* Revenue */}
              <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] font-bold">
                  {event.type === 'Paid' ? `GH₵${event.revenue.toLocaleString()}` : '—'}
                </span>
              </div>
              {/* Actions */}
              <div className="w-[140px] shrink-0 px-[12px] py-[8px]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3">
                  <button className="text-[#9caab8] hover:text-[#f8f9fa] transition-colors" title="Edit"><Pencil size={18} /></button>
                  <button className="text-[#767686] hover:text-[#f8f9fa] transition-colors" title="Delete"><Trash2 size={18} /></button>
                  <button className="text-[#feff1c] hover:text-[#feff1c]/80 transition-colors" title="View Public Page"><ExternalLink size={18} /></button>
                  <button className="text-[#20CC70] hover:text-[#20CC70]/80 transition-colors" title="Send Notifications"><Send size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <TablePagination totalItems={events.length} itemLabel="events" />
  </div>
);

export const EventsListView = ({ onNavigate }: { onNavigate: (view: string, id?: string | null) => void }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tabs = [
    { name: 'All', icon: Calendar },
    { name: 'Live', icon: CheckCircle2 },
    { name: 'Draft', icon: FileText },
    { name: 'Ended', icon: Archive },
    { name: 'Cancelled', icon: XCircle },
  ];

  const filteredEvents = eventsData.filter(event => {
    const matchesTab = activeTab === 'All' || event.status === activeTab;
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] text-[24px]">Events Management</h1>
          <p className="text-[#9caab8]">View and manage all your events in one place.</p>
        </div>
        <button 
          onClick={() => onNavigate('create-event')}
          className="flex items-center justify-center gap-2 bg-[#feff1c] text-[#121214] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
        >
          <Plus size={20} />
          Create New Event
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto overflow-x-auto">
          <div className="bg-[#232326] flex items-center p-[4px] rounded-[12px] border border-[#424249]">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={cn(
                    "flex items-center justify-center px-[16px] py-[8px] rounded-[8px] text-[14px] font-['Inter:Regular',sans-serif] transition-all whitespace-nowrap cursor-pointer",
                    activeTab === tab.name 
                      ? "bg-[#424249] text-[#f8f9fa]" 
                      : "text-[#f8f9fa] hover:text-[#f8f9fa]/80"
                  )}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686] group-focus-within:text-[#feff1c] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#232326] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
            />
          </div>
          
          <div className="bg-[#232326] flex items-center p-[4px] rounded-[12px] border border-[#424249]">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 px-3 rounded-[8px] transition-all cursor-pointer",
                viewMode === 'grid' ? "bg-[#424249] text-[#f8f9fa]" : "text-[#f8f9fa] hover:bg-[#424249]/30"
              )}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 px-3 rounded-[8px] transition-all cursor-pointer",
                viewMode === 'list' ? "bg-[#424249] text-[#f8f9fa]" : "text-[#f8f9fa] hover:bg-[#424249]/30"
              )}
            >
              <List size={18} />
            </button>
          </div>

          <button className="p-3 bg-[#232326] border border-[#424249] rounded-xl text-[#f8f9fa] hover:bg-[#121214] transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="pb-12">
        {filteredEvents.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => onNavigate('event-dashboard', event.id)} 
                />
              ))}
            </div>
          ) : (
            <EventTable events={filteredEvents} onNavigate={onNavigate} />
          )
        ) : (
          <div className="py-24 text-center bg-[#232326] rounded-3xl border border-[#424249] border-dashed">
            <div className="w-16 h-16 bg-[#121214] rounded-full flex items-center justify-center mx-auto mb-4 text-[#424249]">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#f8f9fa]">No events found</h3>
            <p className="text-[#9caab8] mt-2">Adjust your filters or search terms and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}