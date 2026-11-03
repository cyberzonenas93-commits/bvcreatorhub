import React from 'react';
import { Search, Mail, UserPlus, Filter, Pencil, Trash2, FileText, Send, ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { TablePagination } from './TablePagination';

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  // Paid-specific
  orderId?: string;
  ticket?: string;
  purchased?: string;
  // RSVP-specific
  rsvpCategory?: string;
  rsvpDate?: string;
  source?: string;
  // Free-specific
  registeredDate?: string;
  session?: string;
}

const mockPaidAttendees: Attendee[] = [
  { id: '1', name: 'Kwame Asante', email: 'kwame.asante@gmail.com', phone: '+233 24 567 8901', status: 'Active', orderId: '#ORD-9283', ticket: 'VIP Experience', purchased: '2 days ago' },
  { id: '2', name: 'Ama Mensah', email: 'ama.mensah@yahoo.com', phone: '+233 55 234 5678', status: 'Active', orderId: '#ORD-9284', ticket: 'General Admission', purchased: '3 days ago' },
  { id: '3', name: 'Kofi Osei', email: 'kofi.osei@outlook.com', phone: '+233 20 345 6789', status: 'Active', orderId: '#ORD-9285', ticket: 'General Admission', purchased: '5 days ago' },
  { id: '4', name: 'Akosua Boateng', email: 'akosua.b@gmail.com', phone: '+233 24 456 7890', status: 'Active', orderId: '#ORD-9286', ticket: 'Early Bird', purchased: '1 week ago' },
  { id: '5', name: 'Yaw Adjei', email: 'yaw.adjei@yahoo.com', phone: '+233 55 567 8901', status: 'Active', orderId: '#ORD-9287', ticket: 'VIP Experience', purchased: '1 week ago' },
];

const mockRsvpAttendees: Attendee[] = [
  { id: '1', name: 'Nana Aba Anamoah', email: 'nana.aba@gmail.com', phone: '+233 24 111 2233', status: 'Confirmed', rsvpCategory: 'General RSVP', rsvpDate: '2 days ago', source: 'Direct Link' },
  { id: '2', name: 'Berla Mundi', email: 'berla.m@outlook.com', phone: '+233 55 222 3344', status: 'Confirmed', rsvpCategory: 'VIP/Press', rsvpDate: '3 days ago', source: 'Invitation' },
  { id: '3', name: 'KiDi Mensah', email: 'kidi.m@gmail.com', phone: '+233 20 333 4455', status: 'Pending', rsvpCategory: 'General RSVP', rsvpDate: '4 days ago', source: 'Social Media' },
  { id: '4', name: 'Joselyn Dumas', email: 'joselyn.d@yahoo.com', phone: '+233 24 444 5566', status: 'Confirmed', rsvpCategory: 'VIP/Press', rsvpDate: '5 days ago', source: 'Invitation' },
  { id: '5', name: 'Kweku Flick', email: 'kweku.f@gmail.com', phone: '+233 55 555 6677', status: 'Declined', rsvpCategory: 'General RSVP', rsvpDate: '1 week ago', source: 'Direct Link' },
];

const mockFreeAttendees: Attendee[] = [
  { id: '1', name: 'Efua Sutherland', email: 'efua.s@gmail.com', phone: '+233 24 777 8899', status: 'Registered', session: 'Main Stage', registeredDate: '1 day ago', source: 'Event Page' },
  { id: '2', name: 'Kobina Amissah', email: 'kobina.a@outlook.com', phone: '+233 55 888 9900', status: 'Registered', session: 'Workshop A', registeredDate: '2 days ago', source: 'Social Media' },
  { id: '3', name: 'Adwoa Safo', email: 'adwoa.s@yahoo.com', phone: '+233 20 999 0011', status: 'Registered', session: 'Main Stage', registeredDate: '3 days ago', source: 'Referral' },
  { id: '4', name: 'Nii Lante', email: 'nii.l@gmail.com', phone: '+233 24 000 1122', status: 'Cancelled', session: 'Workshop B', registeredDate: '4 days ago', source: 'Event Page' },
  { id: '5', name: 'Akua Donkor', email: 'akua.d@gmail.com', phone: '+233 55 111 2233', status: 'Registered', session: 'Main Stage', registeredDate: '5 days ago', source: 'Direct Link' },
];

const CaretUpDown = () => (
  <div className="flex flex-col -gap-1 text-[#767686]">
    <ChevronUp size={10} strokeWidth={3} />
    <ChevronDown size={10} strokeWidth={3} />
  </div>
);

const StatusDot = ({ status }: { status: string }) => {
  const color =
    status === 'Active' || status === 'Confirmed' || status === 'Registered'
      ? '#20CC70'
      : status === 'Pending'
        ? '#FFD524'
        : '#FF4D4D';
  return (
    <div className="flex items-center gap-2">
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><circle cx="3.25" cy="3.25" r="3.25" fill={color} /></svg>
      <span className="text-[14px] leading-[18.2px] text-[#f8f9fa] font-['Inter:Regular',sans-serif]">{status}</span>
    </div>
  );
};

interface AttendeesListProps {
  eventType?: 'Paid' | 'RSVP' | 'Free';
}

export const AttendeesList = ({ eventType = 'Paid' }: AttendeesListProps) => {
  const attendees =
    eventType === 'RSVP' ? mockRsvpAttendees :
    eventType === 'Free' ? mockFreeAttendees :
    mockPaidAttendees;

  const totalCount = eventType === 'Paid' ? 450 : eventType === 'RSVP' ? 380 : 850;

  // Column definitions per event type
  const columns =
    eventType === 'Paid'
      ? [
          { key: 'name', label: 'Customer' },
          { key: 'email', label: 'Email' },
          { key: 'ticket', label: 'Ticket Type' },
          { key: 'status', label: 'Status' },
          { key: 'purchased', label: 'Purchased' },
        ]
      : eventType === 'RSVP'
        ? [
            { key: 'name', label: 'Guest' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'source', label: 'Source' },
            { key: 'rsvpDate', label: 'RSVP\'d' },
          ]
        : [
            { key: 'name', label: 'Guest' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'status', label: 'Status' },
            { key: 'source', label: 'Source' },
            { key: 'registeredDate', label: 'Registered' },
          ];

  const getCellValue = (attendee: Attendee, key: string) => {
    return (attendee as any)[key] || '—';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
          <input
            type="text"
            placeholder={
              eventType === 'Paid' ? 'Search attendees...' :
              eventType === 'RSVP' ? 'Search guests...' :
              'Search registrants...'
            }
            className="w-full pl-10 pr-4 py-2.5 bg-[#232326] border border-[#424249] rounded-xl text-[#f8f9fa] text-sm focus:outline-none focus:border-[#feff1c] transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-xl hover:bg-[#121214] transition-all">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-[#feff1c] text-[#121214] rounded-xl hover:opacity-90 transition-all">
            <Plus size={16} />
            {eventType === 'Paid' ? 'Add Attendee' : 'Invite Guests'}
          </button>
        </div>
      </div>

      <div className="bg-[#121214] rounded-2xl border border-[#424249] overflow-hidden">
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="flex items-center w-full bg-[#232326]">
            {columns.map((col) => (
              <div key={col.key} className="flex-1 min-w-[120px] px-[12px] py-[8px]">
                <div className="flex items-center gap-[4px] cursor-pointer">
                  <span className="text-[14px] leading-[18.2px] text-[#f8f9fa] font-['Inter:Regular',sans-serif]">{col.label}</span>
                  <CaretUpDown />
                </div>
              </div>
            ))}
            <div className="w-[140px] shrink-0 px-[12px] py-[8px]">
              <span className="text-[14px] leading-[18.2px] text-[#f8f9fa] font-['Inter:Regular',sans-serif]">Actions</span>
            </div>
          </div>

          {/* Body */}
          {attendees.map((attendee) => (
            <div key={attendee.id} className="relative w-full hover:bg-[#232326]/50 transition-colors group">
              <div aria-hidden="true" className="absolute border-[#424249] border-solid border-t inset-0 pointer-events-none" />
              <div className="flex items-center w-full pt-px">
                {columns.map((col) => (
                  <div key={col.key} className="flex-1 min-w-[120px] px-[12px] py-[8px]">
                    {col.key === 'status' ? (
                      <StatusDot status={getCellValue(attendee, col.key)} />
                    ) : col.key === 'email' ? (
                      <span className="text-[14px] leading-[18.2px] text-[#9caab8] font-['Inter:Regular',sans-serif]">{getCellValue(attendee, col.key)}</span>
                    ) : (
                      <span className="text-[14px] leading-[18.2px] text-[#f8f9fa] font-['Inter:Regular',sans-serif]">{getCellValue(attendee, col.key)}</span>
                    )}
                  </div>
                ))}
                <div className="w-[140px] shrink-0 px-[12px] py-[8px]">
                  <div className="flex items-center gap-3">
                    <button className="text-[#9caab8] hover:text-[#f8f9fa] transition-colors"><Pencil size={18} /></button>
                    <button className="text-[#767686] hover:text-[#f8f9fa] transition-colors"><Trash2 size={18} /></button>
                    {eventType === 'Paid' && (
                      <button className="text-[#feff1c] hover:text-[#feff1c]/80 transition-colors" title="View Ticket"><FileText size={18} /></button>
                    )}
                    <button className="text-[#20CC70] hover:text-[#20CC70]/80 transition-colors" title={eventType === 'Paid' ? 'Send Receipt' : 'Send Reminder'}><Send size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TablePagination 
          totalItems={totalCount} 
          itemLabel={eventType === 'Paid' ? 'attendees' : eventType === 'RSVP' ? 'guests' : 'registrants'} 
        />
      </div>
    </div>
  );
};