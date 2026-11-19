import React, { useState, useMemo } from 'react';
import { TablePagination } from './TablePagination';
import {
  Search,
  Download,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Ban,
  Eye,
  Mail,
  Clock,
  AlertTriangle,
  UserPlus,
  Check,
} from 'lucide-react';
import svgPaths from '../../imports/svg-khchg50gol';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

// ─── Figma SVG Components ───

const CaretUpDown = () => (
  <div className="relative shrink-0 size-[12px]">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
      <g clipPath="url(#clip0_caret_om)">
        <path d="M3.75 8.25L6 10.5L8.25 8.25" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M3.75 3.75L6 1.5L8.25 3.75" stroke="#767686" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_caret_om"><rect fill="white" height="12" width="12" /></clipPath>
      </defs>
    </svg>
  </div>
);

const StatusDot = ({ color }: { color: string }) => (
  <div className="relative shrink-0 size-[6.5px]">
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.5 6.5">
      <path d={svgPaths.pd857200} fill={color} />
    </svg>
  </div>
);

// ─── Types ───

type OrderStatus = 'Completed' | 'Pending' | 'Refunded' | 'Cancelled' | 'Partially Refunded';
type PaymentMethod = 'MTN MoMo' | 'Vodafone Cash' | 'AirtelTigo Money' | 'Visa' | 'Mastercard';
type TicketStatus = 'Active' | 'Used' | 'Cancelled' | 'Transferred';

interface OrderAttendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  ticketStatus: TicketStatus;
  checkedIn: boolean;
  checkinTime?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  ticketType: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  platformFee: number;
  netAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: OrderStatus;
  orderDate: string;
  attendees: OrderAttendee[];
}

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  requestedQty: number;
  joinedDate: string;
  position: number;
  notified: boolean;
}

// ─── Mock Data ───

const mockOrders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-2026-0001',
    customerName: 'Kwame Asante',
    customerEmail: 'kwame.asante@gmail.com',
    customerPhone: '+233 24 567 8901',
    ticketType: 'VIP Experience',
    quantity: 2,
    unitPrice: 800,
    totalAmount: 1600,
    platformFee: 80,
    netAmount: 1520,
    paymentMethod: 'MTN MoMo',
    paymentStatus: 'Completed',
    orderDate: '2026-02-10',
    attendees: [
      { id: 'att-1', name: 'Kwame Asante', email: 'kwame.asante@gmail.com', phone: '+233 24 567 8901', ticketType: 'VIP Experience', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-2', name: 'Abena Asante', email: 'abena.asante@gmail.com', phone: '+233 24 567 8902', ticketType: 'VIP Experience', ticketStatus: 'Active', checkedIn: false },
    ],
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-2026-0002',
    customerName: 'Ama Mensah',
    customerEmail: 'ama.mensah@yahoo.com',
    customerPhone: '+233 50 234 5678',
    ticketType: 'General Admission',
    quantity: 4,
    unitPrice: 300,
    totalAmount: 1200,
    platformFee: 60,
    netAmount: 1140,
    paymentMethod: 'Vodafone Cash',
    paymentStatus: 'Completed',
    orderDate: '2026-02-12',
    attendees: [
      { id: 'att-3', name: 'Ama Mensah', email: 'ama.mensah@yahoo.com', phone: '+233 50 234 5678', ticketType: 'General Admission', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-4', name: 'Kofi Mensah', email: 'kofi.m@yahoo.com', phone: '+233 50 234 5679', ticketType: 'General Admission', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-5', name: 'Yaa Mensah', email: 'yaa.m@yahoo.com', phone: '+233 50 234 5680', ticketType: 'General Admission', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-6', name: 'Akua Mensah', email: 'akua.m@yahoo.com', phone: '+233 50 234 5681', ticketType: 'General Admission', ticketStatus: 'Active', checkedIn: false },
    ],
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-2026-0003',
    customerName: 'Kofi Osei',
    customerEmail: 'kofi.osei@outlook.com',
    customerPhone: '+233 27 891 2345',
    ticketType: 'Early Bird',
    quantity: 1,
    unitPrice: 150,
    totalAmount: 150,
    platformFee: 0,
    netAmount: 150,
    paymentMethod: 'MTN MoMo',
    paymentStatus: 'Refunded',
    orderDate: '2026-01-20',
    attendees: [
      { id: 'att-7', name: 'Kofi Osei', email: 'kofi.osei@outlook.com', phone: '+233 27 891 2345', ticketType: 'Early Bird', ticketStatus: 'Cancelled', checkedIn: false },
    ],
  },
  {
    id: 'ord-4',
    orderNumber: 'ORD-2026-0004',
    customerName: 'Akosua Boateng',
    customerEmail: 'akosua.b@gmail.com',
    customerPhone: '+233 20 456 7890',
    ticketType: 'General Admission',
    quantity: 2,
    unitPrice: 300,
    totalAmount: 600,
    platformFee: 30,
    netAmount: 570,
    paymentMethod: 'Mastercard',
    paymentStatus: 'Completed',
    orderDate: '2026-02-15',
    attendees: [
      { id: 'att-8', name: 'Akosua Boateng', email: 'akosua.b@gmail.com', phone: '+233 20 456 7890', ticketType: 'General Admission', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-9', name: 'Nana Agyeman', email: 'nana.a@gmail.com', phone: '+233 20 456 7891', ticketType: 'General Admission', ticketStatus: 'Active', checkedIn: false },
    ],
  },
  {
    id: 'ord-5',
    orderNumber: 'ORD-2026-0005',
    customerName: 'Yaw Adjei',
    customerEmail: 'yaw.adjei@yahoo.com',
    customerPhone: '+233 55 678 9012',
    ticketType: 'VIP Experience',
    quantity: 1,
    unitPrice: 800,
    totalAmount: 800,
    platformFee: 40,
    netAmount: 760,
    paymentMethod: 'Visa',
    paymentStatus: 'Pending',
    orderDate: '2026-02-18',
    attendees: [
      { id: 'att-10', name: 'Yaw Adjei', email: 'yaw.adjei@yahoo.com', phone: '+233 55 678 9012', ticketType: 'VIP Experience', ticketStatus: 'Active', checkedIn: false },
    ],
  },
  {
    id: 'ord-6',
    orderNumber: 'ORD-2026-0006',
    customerName: 'Efua Owusu',
    customerEmail: 'efua.owusu@gmail.com',
    customerPhone: '+233 24 789 0123',
    ticketType: 'Early Bird',
    quantity: 3,
    unitPrice: 150,
    totalAmount: 450,
    platformFee: 0,
    netAmount: 450,
    paymentMethod: 'AirtelTigo Money',
    paymentStatus: 'Completed',
    orderDate: '2026-01-25',
    attendees: [
      { id: 'att-11', name: 'Efua Owusu', email: 'efua.owusu@gmail.com', phone: '+233 24 789 0123', ticketType: 'Early Bird', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-12', name: 'Kweku Owusu', email: 'kweku.o@gmail.com', phone: '+233 24 789 0124', ticketType: 'Early Bird', ticketStatus: 'Transferred', checkedIn: false },
      { id: 'att-13', name: 'Adjoa Frimpong', email: 'adjoa.f@gmail.com', phone: '+233 24 789 0125', ticketType: 'Early Bird', ticketStatus: 'Active', checkedIn: false },
    ],
  },
  {
    id: 'ord-7',
    orderNumber: 'ORD-2026-0007',
    customerName: 'Nana Addo Mensah',
    customerEmail: 'nana.addo@outlook.com',
    customerPhone: '+233 27 345 6789',
    ticketType: 'General Admission',
    quantity: 1,
    unitPrice: 300,
    totalAmount: 300,
    platformFee: 15,
    netAmount: 285,
    paymentMethod: 'MTN MoMo',
    paymentStatus: 'Cancelled',
    orderDate: '2026-02-05',
    attendees: [
      { id: 'att-14', name: 'Nana Addo Mensah', email: 'nana.addo@outlook.com', phone: '+233 27 345 6789', ticketType: 'General Admission', ticketStatus: 'Cancelled', checkedIn: false },
    ],
  },
  {
    id: 'ord-8',
    orderNumber: 'ORD-2026-0008',
    customerName: 'Priscilla Darko',
    customerEmail: 'priscilla.d@gmail.com',
    customerPhone: '+233 50 890 1234',
    ticketType: 'VIP Experience',
    quantity: 2,
    unitPrice: 800,
    totalAmount: 1600,
    platformFee: 80,
    netAmount: 1520,
    paymentMethod: 'MTN MoMo',
    paymentStatus: 'Partially Refunded',
    orderDate: '2026-02-08',
    attendees: [
      { id: 'att-15', name: 'Priscilla Darko', email: 'priscilla.d@gmail.com', phone: '+233 50 890 1234', ticketType: 'VIP Experience', ticketStatus: 'Active', checkedIn: false },
      { id: 'att-16', name: 'Samuel Darko', email: 'samuel.d@gmail.com', phone: '+233 50 890 1235', ticketType: 'VIP Experience', ticketStatus: 'Cancelled', checkedIn: false },
    ],
  },
];

const mockWaitlist: WaitlistEntry[] = [
  { id: 'wl-1', name: 'Abena Kyei', email: 'abena.k@gmail.com', phone: '+233 24 111 2233', ticketType: 'Early Bird', requestedQty: 2, joinedDate: '2026-02-01', position: 1, notified: false },
  { id: 'wl-2', name: 'Kwesi Appiah', email: 'kwesi.a@outlook.com', phone: '+233 55 222 3344', ticketType: 'Early Bird', requestedQty: 1, joinedDate: '2026-02-02', position: 2, notified: false },
  { id: 'wl-3', name: 'Akua Sarpong', email: 'akua.s@yahoo.com', phone: '+233 20 333 4455', ticketType: 'Early Bird', requestedQty: 3, joinedDate: '2026-02-03', position: 3, notified: false },
  { id: 'wl-4', name: 'Yaw Boakye', email: 'yaw.b@gmail.com', phone: '+233 27 444 5566', ticketType: 'VIP Experience', requestedQty: 2, joinedDate: '2026-02-05', position: 1, notified: true },
  { id: 'wl-5', name: 'Esi Quansah', email: 'esi.q@gmail.com', phone: '+233 24 555 6677', ticketType: 'VIP Experience', requestedQty: 1, joinedDate: '2026-02-06', position: 2, notified: false },
  { id: 'wl-6', name: 'Kojo Antwi', email: 'kojo.a@outlook.com', phone: '+233 50 666 7788', ticketType: 'Early Bird', requestedQty: 1, joinedDate: '2026-02-07', position: 4, notified: false },
  { id: 'wl-7', name: 'Adwoa Mensah', email: 'adwoa.m@gmail.com', phone: '+233 55 777 8899', ticketType: 'VIP Experience', requestedQty: 1, joinedDate: '2026-02-10', position: 3, notified: false },
  { id: 'wl-8', name: 'Kofi Adu', email: 'kofi.adu@yahoo.com', phone: '+233 20 888 9900', ticketType: 'Early Bird', requestedQty: 2, joinedDate: '2026-02-12', position: 5, notified: false },
];

// ─── Helpers ───

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getPaymentStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Completed': return '#20CC70';
    case 'Pending': return '#FFD524';
    case 'Refunded': return '#FF4D4D';
    case 'Cancelled': return '#767686';
    case 'Partially Refunded': return '#FF8C42';
    default: return '#9caab8';
  }
};

const getTicketStatusColor = (status: TicketStatus) => {
  switch (status) {
    case 'Active': return '#20CC70';
    case 'Used': return '#767686';
    case 'Cancelled': return '#FF4D4D';
    case 'Transferred': return '#4DA6FF';
    default: return '#9caab8';
  }
};

// ─── Sub-tabs ───

type SubTab = 'orders' | 'attendees' | 'waitlist';

// ─── Component ───

export function OrdersManagementView({ initialTab = 'orders' }: { initialTab?: SubTab }) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketFilter, setTicketFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedWaitlistIds, setSelectedWaitlistIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('orderDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [actionConfirm, setActionConfirm] = useState<{ type: 'refund' | 'cancel'; orderId: string } | null>(null);
  const [waitlistActionConfirm, setWaitlistActionConfirm] = useState<{ type: 'release' | 'remove'; ids: string[] } | null>(null);

  const ticketTypes = ['All', 'Early Bird', 'General Admission', 'VIP Experience'];
  const dateRanges = ['All', 'Today', 'Last 7 Days', 'Last 30 Days', 'This Month'];
  const statuses = ['All', 'Completed', 'Pending', 'Refunded', 'Cancelled', 'Partially Refunded'];

  // ─── Stats ───
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.filter(o => o.paymentStatus !== 'Refunded' && o.paymentStatus !== 'Cancelled').reduce((s, o) => s + o.totalAmount, 0);
  const totalAttendees = mockOrders.flatMap(o => o.attendees).filter(a => a.ticketStatus === 'Active').length;
  const totalWaitlisted = mockWaitlist.length;

  // ─── Filtered Orders ───
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTicket = ticketFilter === 'All' || order.ticketType === ticketFilter;

      let matchesDate = true;
      if (dateFilter !== 'All') {
        const orderDate = new Date(order.orderDate);
        const now = new Date('2026-02-24');
        if (dateFilter === 'Today') matchesDate = order.orderDate === '2026-02-24';
        if (dateFilter === 'Last 7 Days') matchesDate = (now.getTime() - orderDate.getTime()) <= 7 * 86400000;
        if (dateFilter === 'Last 30 Days') matchesDate = (now.getTime() - orderDate.getTime()) <= 30 * 86400000;
        if (dateFilter === 'This Month') matchesDate = orderDate.getMonth() === 1 && orderDate.getFullYear() === 2026;
      }

      const matchesStatus = statusFilter === 'All' || order.paymentStatus === statusFilter;

      return matchesSearch && matchesTicket && matchesDate && matchesStatus;
    }).sort((a, b) => {
      if (sortField === 'orderDate') {
        return sortDir === 'desc'
          ? new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          : new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      }
      if (sortField === 'totalAmount') {
        return sortDir === 'desc' ? b.totalAmount - a.totalAmount : a.totalAmount - b.totalAmount;
      }
      if (sortField === 'customerName') {
        return sortDir === 'desc' ? b.customerName.localeCompare(a.customerName) : a.customerName.localeCompare(b.customerName);
      }
      return 0;
    });
  }, [searchTerm, ticketFilter, dateFilter, statusFilter, sortField, sortDir]);

  // ─── All Attendees from orders ───
  const allAttendees = useMemo(() => {
    return mockOrders.flatMap(order =>
      order.attendees.map(att => ({
        ...att,
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        paymentStatus: order.paymentStatus,
        customerName: order.customerName,
      }))
    ).filter(att => {
      const matchesSearch =
        att.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        att.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        att.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTicket = ticketFilter === 'All' || att.ticketType === ticketFilter;

      return matchesSearch && matchesTicket;
    });
  }, [searchTerm, ticketFilter]);

  // ─── Filtered Waitlist ───
  const filteredWaitlist = useMemo(() => {
    return mockWaitlist.filter(entry => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTicket = ticketFilter === 'All' || entry.ticketType === ticketFilter;

      return matchesSearch && matchesTicket;
    });
  }, [searchTerm, ticketFilter]);

  const waitlistByTier = useMemo(() => {
    const map: Record<string, number> = {};
    mockWaitlist.forEach(e => {
      map[e.ticketType] = (map[e.ticketType] || 0) + 1;
    });
    return map;
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const toggleWaitlistSelection = (id: string) => {
    setSelectedWaitlistIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAllWaitlist = () => {
    if (selectedWaitlistIds.length === filteredWaitlist.length) {
      setSelectedWaitlistIds([]);
    } else {
      setSelectedWaitlistIds(filteredWaitlist.map(e => e.id));
    }
  };

  const subTabs = [
    { id: 'orders' as SubTab, label: 'Orders', count: totalOrders },
    { id: 'attendees' as SubTab, label: 'Attendees', count: totalAttendees },
    { id: 'waitlist' as SubTab, label: 'Waitlist', count: totalWaitlisted },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Stats Summary — hidden on standalone waitlist tab */}
      {activeSubTab !== 'waitlist' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular mb-1 text-[12px]">Total Orders</p>
            <p className="text-2xl text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">{totalOrders}</p>
          </div>
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular mb-1 text-[12px]">Net Revenue</p>
            <p className="text-2xl text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">GH₵{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular mb-1 text-[12px]">Active Attendees</p>
            <p className="text-2xl text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">{totalAttendees}</p>
          </div>
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular mb-1 text-[12px]">On Waitlist</p>
            <p className="text-2xl font-['Kamerik205:Regular_3',sans-serif] text-[#f8f9fa]">{totalWaitlisted}</p>
          </div>
        </div>
      )}

      {/* Sub-tab Bar */}
      

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="bg-[#232326] flex gap-[8px] items-center px-[16px] py-[8px] rounded-[8px] w-full sm:w-[360px] border border-[#424249] focus-within:border-[#feff1c] transition-all">
          <Search size={18} className="text-[#9caab8]" />
          <input
            type="text"
            placeholder={
              activeSubTab === 'orders' ? 'Search by order #, name, or email...' :
              activeSubTab === 'attendees' ? 'Search by name, email, or order #...' :
              'Search waitlist by name or email...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-[#f8f9fa] text-[14px] w-full placeholder-[#9caab8]"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-[#767686] hover:text-[#f8f9fa]">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Ticket Type Filter */}
          <div className="relative">
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#232326] border border-[#424249] rounded-xl shadow-2xl z-50 overflow-hidden">
                {ticketTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => { setTicketFilter(type); setIsFilterOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm hover:bg-[#121214] transition-colors",
                      ticketFilter === type && "text-[#feff1c]"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeSubTab === 'orders' && (
            <>
              {/* Date Filter */}
              

              {/* Status Filter */}
              
            </>
          )}

          {activeSubTab === 'waitlist' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWaitlistActionConfirm({ type: 'release', ids: selectedWaitlistIds })}
                disabled={selectedWaitlistIds.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] bg-[#feff1c] text-[#121214] rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40"
              >
                <UserPlus size={14} />
                Release Tickets ({selectedWaitlistIds.length})
              </button>
              <button
                onClick={() => setWaitlistActionConfirm({ type: 'remove', ids: selectedWaitlistIds })}
                disabled={selectedWaitlistIds.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] bg-[#232326] text-red-400 border border-red-500/20 rounded-lg font-bold hover:bg-red-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#232326]"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          )}

          <button className="flex items-center gap-2 px-3 py-2 text-[13px] bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-lg hover:bg-[#121214] transition-all">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* ─── ORDERS TAB ─── */}
      {activeSubTab === 'orders' && (
        <div className="bg-[#121214] rounded-2xl border border-[#424249] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Header */}
              <div className="bg-[#232326] w-full">
                <div className="flex items-center w-full">
                  <div className="w-[140px] shrink-0 content-stretch flex gap-[4px] items-center p-[12px] cursor-pointer" onClick={() => handleSort('orderDate')}>
                    <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Order #</span>
                    <CaretUpDown />
                  </div>
                  <div className="flex-[1.3_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px] cursor-pointer" onClick={() => handleSort('customerName')}>
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Customer</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[1_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Ticket Type</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="w-[60px] shrink-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Qty</span>
                    </div>
                  </div>
                  <div className="flex-[0.8_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px] cursor-pointer" onClick={() => handleSort('totalAmount')}>
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Amount</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[0.8_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Payment</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[0.8_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Status</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="w-[100px] shrink-0">
                    <div className="content-stretch flex items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Actions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-[#9caab8] text-sm">No orders match your search criteria.</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id}>
                    {/* Order Row */}
                    <div
                      className={cn(
                        "relative w-full hover:bg-[#232326]/50 transition-colors cursor-pointer group",
                        expandedOrder === order.id && "bg-[#232326]/30"
                      )}
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div aria-hidden="true" className="absolute border-[#424249] border-solid border-t inset-0 pointer-events-none" />
                      <div className="flex items-center w-full pt-px">
                        {/* Order # */}
                        <div className="w-[140px] shrink-0 flex items-center gap-2 px-[12px] py-[8px]">
                          <div className={cn(
                            "transition-transform duration-200",
                            expandedOrder === order.id && "rotate-180"
                          )}>
                            <ChevronDown size={14} className="text-[#767686]" />
                          </div>
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#feff1c] text-[13px]">{order.orderNumber.replace('ORD-2026-', '#')}</span>
                        </div>
                        {/* Customer */}
                        <div className="flex-[1.3_0_0] min-w-0 px-[12px] py-[8px]">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] truncate group-hover:text-[#feff1c] transition-colors">{order.customerName}</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#767686] text-[12px] truncate">{order.customerEmail}</p>
                        </div>
                        {/* Ticket */}
                        <div className="flex-[1_0_0] min-w-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">{order.ticketType}</span>
                        </div>
                        {/* Qty */}
                        <div className="w-[60px] shrink-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">{order.quantity}</span>
                        </div>
                        {/* Amount */}
                        <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">GH₵{order.totalAmount.toLocaleString()}</p>
                          {order.platformFee > 0 && (
                            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686]">Fee: GH₵{order.platformFee}</p>
                          )}
                        </div>
                        {/* Payment */}
                        <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#9caab8] text-[13px]">{order.paymentMethod}</span>
                        </div>
                        {/* Status */}
                        <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                          <div className="flex gap-[8px] items-center">
                            <StatusDot color={getPaymentStatusColor(order.paymentStatus)} />
                            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[13px]">{order.paymentStatus}</span>
                          </div>
                        </div>
                        {/* Actions */}
                        <div className="w-[100px] shrink-0 px-[12px] py-[8px]" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            {(order.paymentStatus === 'Completed' || order.paymentStatus === 'Partially Refunded') && (
                              <button
                                onClick={() => setActionConfirm({ type: 'refund', orderId: order.id })}
                                className="p-1.5 text-[#9caab8] hover:text-[#FF4D4D] hover:bg-[#FF4D4D]/10 rounded-md transition-all"
                                title="Refund Order"
                              >
                                <RotateCcw size={16} />
                              </button>
                            )}
                            {order.paymentStatus === 'Pending' && (
                              <button
                                onClick={() => setActionConfirm({ type: 'cancel', orderId: order.id })}
                                className="p-1.5 text-[#9caab8] hover:text-[#FF4D4D] hover:bg-[#FF4D4D]/10 rounded-md transition-all"
                                title="Cancel Order"
                              >
                                <Ban size={16} />
                              </button>
                            )}
                            <button className="p-1.5 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#424249]/30 rounded-md transition-all" title="Resend Confirmation">
                              <Mail size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Attendees */}
                    {expandedOrder === order.id && (
                      <div className="bg-[#1a1a1d] border-t border-[#424249]/50 animate-in slide-in-from-top-1 duration-200">
                        <div className="px-6 py-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <h4 className="text-[13px] font-bold text-[#9caab8] uppercase tracking-wider">Order Details</h4>
                              <span className="text-[11px] text-[#767686]">{formatDate(order.orderDate)}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-[12px] text-[#9caab8]">Net: <span className="text-[#f8f9fa] font-bold">GH₵{order.netAmount.toLocaleString()}</span></p>
                              <p className="text-[11px] text-[#767686]">{order.paymentMethod} • {order.customerPhone}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {order.attendees.map((att, idx) => (
                              <div key={att.id} className="flex items-center gap-4 px-4 py-2.5 bg-[#232326]/50 rounded-lg">
                                <span className="text-[11px] text-[#767686] w-4">{idx + 1}</span>
                                <div className="w-7 h-7 rounded-full bg-[#424249] flex items-center justify-center text-[10px] font-bold text-[#f8f9fa] shrink-0">
                                  {att.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#f8f9fa] truncate">{att.name}</p>
                                  <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686] truncate">{att.email}</p>
                                </div>
                                <span className="font-['Inter:Regular',sans-serif] text-[12px] text-[#9caab8]">{att.ticketType}</span>
                                <div className="flex gap-[6px] items-center">
                                  <StatusDot color={getTicketStatusColor(att.ticketStatus)} />
                                  <span className="font-['Inter:Regular',sans-serif] text-[12px] text-[#f8f9fa]">{att.ticketStatus}</span>
                                </div>
                                {att.checkedIn ? (
                                  <span className="text-[11px] text-[#20CC70] flex items-center gap-1"><Check size={12} /> Checked In</span>
                                ) : (
                                  <span className="text-[11px] text-[#767686]">Not checked in</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <TablePagination totalItems={filteredOrders.length} itemLabel="orders" />
        </div>
      )}

      {/* ─── ATTENDEES TAB ─── */}
      {activeSubTab === 'attendees' && (
        <div className="bg-[#121214] rounded-2xl border border-[#424249] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="bg-[#232326] w-full">
                <div className="flex items-center w-full">
                  <div className="w-[220px] shrink-0 content-stretch flex gap-[4px] items-center p-[12px]">
                    <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Attendee</span>
                    <CaretUpDown />
                  </div>
                  <div className="flex-[1_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Email</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[0.8_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Order #</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[0.8_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Ticket Type</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[0.6_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Ticket Status</span>
                      <CaretUpDown />
                    </div>
                  </div>
                  <div className="flex-[0.6_0_0] min-w-0">
                    <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Check-In</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              {allAttendees.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-[#9caab8] text-sm">No attendees match your search criteria.</p>
                </div>
              ) : (
                allAttendees.map(att => (
                  <div key={att.id} className="relative w-full hover:bg-[#232326]/50 transition-colors group">
                    <div aria-hidden="true" className="absolute border-[#424249] border-solid border-t inset-0 pointer-events-none" />
                    <div className="flex items-center w-full pt-px">
                      {/* Attendee */}
                      <div className="w-[220px] shrink-0 flex items-center gap-3 px-[12px] py-[8px]">
                        <div className="w-8 h-8 rounded-full bg-[#424249] flex items-center justify-center text-[11px] font-bold text-[#f8f9fa] shrink-0">
                          {att.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] truncate group-hover:text-[#feff1c] transition-colors">{att.name}</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#767686] text-[11px]">{att.phone}</p>
                        </div>
                      </div>
                      {/* Email */}
                      <div className="flex-[1_0_0] min-w-0 px-[12px] py-[8px]">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] truncate">{att.email}</p>
                      </div>
                      {/* Order # */}
                      <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#feff1c] text-[13px]">{att.orderNumber.replace('ORD-2026-', '#')}</span>
                      </div>
                      {/* Ticket Type */}
                      <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">{att.ticketType}</span>
                      </div>
                      {/* Ticket Status */}
                      <div className="flex-[0.6_0_0] min-w-0 px-[12px] py-[8px]">
                        <div className="flex gap-[8px] items-center">
                          <StatusDot color={getTicketStatusColor(att.ticketStatus)} />
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[13px]">{att.ticketStatus}</span>
                        </div>
                      </div>
                      {/* Check-In */}
                      <div className="flex-[0.6_0_0] min-w-0 px-[12px] py-[8px]">
                        {att.checkedIn ? (
                          <span className="text-[12px] text-[#20CC70] flex items-center gap-1"><Check size={12} /> Checked In</span>
                        ) : (
                          <span className="text-[12px] text-[#767686]">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <TablePagination totalItems={allAttendees.length} itemLabel="attendees" />
        </div>
      )}

      {/* ─── WAITLIST TAB ─── */}
      {activeSubTab === 'waitlist' && (
        <>
          {/* Waitlist Summary Cards */}
          

          <div className="bg-[#121214] rounded-2xl border border-[#424249] overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[750px]">
                {/* Header */}
                <div className="bg-[#232326] w-full">
                  <div className="flex items-center w-full">
                    <div className="w-[40px] shrink-0 flex items-center justify-center p-[12px]">
                      <input
                        type="checkbox"
                        checked={selectedWaitlistIds.length === filteredWaitlist.length && filteredWaitlist.length > 0}
                        onChange={selectAllWaitlist}
                        className="w-4 h-4 accent-[#feff1c] cursor-pointer"
                      />
                    </div>
                    <div className="w-[50px] shrink-0 content-stretch flex gap-[4px] items-center p-[12px]">
                      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">#</span>
                    </div>
                    <div className="flex-[1.2_0_0] min-w-0">
                      <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Name</span>
                        <CaretUpDown />
                      </div>
                    </div>
                    <div className="flex-[1_0_0] min-w-0">
                      <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Email</span>
                        <CaretUpDown />
                      </div>
                    </div>
                    <div className="flex-[0.8_0_0] min-w-0">
                      <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Ticket Type</span>
                        <CaretUpDown />
                      </div>
                    </div>
                    <div className="w-[60px] shrink-0">
                      <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Qty</span>
                      </div>
                    </div>
                    <div className="flex-[0.8_0_0] min-w-0">
                      <div className="content-stretch flex gap-[4px] items-center p-[12px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Joined</span>
                        <CaretUpDown />
                      </div>
                    </div>
                    <div className="w-[80px] shrink-0">
                      <div className="content-stretch flex items-center p-[12px]">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Status</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                {filteredWaitlist.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-[#9caab8] text-sm">No waitlist entries match your criteria.</p>
                  </div>
                ) : (
                  filteredWaitlist.map(entry => (
                    <div key={entry.id} className={cn(
                      "relative w-full hover:bg-[#232326]/50 transition-colors group",
                      selectedWaitlistIds.includes(entry.id) && "bg-[#feff1c]/5"
                    )}>
                      <div aria-hidden="true" className="absolute border-[#424249] border-solid border-t inset-0 pointer-events-none" />
                      <div className="flex items-center w-full pt-px">
                        {/* Checkbox */}
                        <div className="w-[40px] shrink-0 flex items-center justify-center px-[12px] py-[8px]">
                          <input
                            type="checkbox"
                            checked={selectedWaitlistIds.includes(entry.id)}
                            onChange={() => toggleWaitlistSelection(entry.id)}
                            className="w-4 h-4 accent-[#feff1c] cursor-pointer"
                          />
                        </div>
                        {/* Position */}
                        <div className="w-[50px] shrink-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#767686] text-[14px]">{entry.position}</span>
                        </div>
                        {/* Name */}
                        <div className="flex-[1.2_0_0] min-w-0 flex items-center gap-3 px-[12px] py-[8px]">
                          <div className="w-7 h-7 rounded-full bg-[#424249] flex items-center justify-center text-[10px] font-bold text-[#f8f9fa] shrink-0">
                            {entry.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] truncate group-hover:text-[#feff1c] transition-colors">{entry.name}</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#767686] text-[11px]">{entry.phone}</p>
                          </div>
                        </div>
                        {/* Email */}
                        <div className="flex-[1_0_0] min-w-0 px-[12px] py-[8px]">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px] truncate">{entry.email}</p>
                        </div>
                        {/* Ticket Type */}
                        <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">{entry.ticketType}</span>
                        </div>
                        {/* Qty */}
                        <div className="w-[60px] shrink-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">{entry.requestedQty}</span>
                        </div>
                        {/* Joined */}
                        <div className="flex-[0.8_0_0] min-w-0 px-[12px] py-[8px]">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#9caab8] text-[13px]">{formatDate(entry.joinedDate)}</span>
                        </div>
                        {/* Status */}
                        <div className="w-[80px] shrink-0 px-[12px] py-[8px]">
                          {entry.notified ? (
                            <span className="text-[11px] text-[#feff1c] bg-[#feff1c]/10 px-2 py-1 rounded font-bold">Notified</span>
                          ) : (
                            <span className="text-[11px] text-[#9caab8] bg-[#424249]/30 px-2 py-1 rounded">Waiting</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pagination */}
            <TablePagination totalItems={totalWaitlisted} itemLabel="waitlist entries" />
          </div>
        </>
      )}

      {/* ─── Refund/Cancel Confirmation Modal ─── */}
      {actionConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setActionConfirm(null)}>
          <div className="bg-[#232326] rounded-2xl border border-[#424249] p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#FF4D4D]/10 rounded-lg">
                <AlertTriangle size={20} className="text-[#FF4D4D]" />
              </div>
              <h3 className="text-lg font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                {actionConfirm.type === 'refund' ? 'Confirm Refund' : 'Cancel Order'}
              </h3>
            </div>
            {(() => {
              const order = mockOrders.find(o => o.id === actionConfirm.orderId);
              if (!order) return null;
              return (
                <>
                  <div className="bg-[#121214] rounded-xl p-4 mb-4 border border-[#424249]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[#9caab8]">{order.orderNumber}</span>
                      <span className="text-[13px] font-bold text-[#f8f9fa]">GH₵{order.totalAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-[14px] text-[#f8f9fa]">{order.customerName}</p>
                    <p className="text-[12px] text-[#767686]">{order.quantity}× {order.ticketType} • {order.paymentMethod}</p>
                  </div>
                  <p className="text-[13px] text-[#9caab8] mb-6 leading-relaxed">
                    {actionConfirm.type === 'refund'
                      ? `This will refund GH₵${order.totalAmount.toLocaleString()} to the customer's ${order.paymentMethod} account. All ${order.quantity} ticket(s) will be cancelled and inventory returned.`
                      : `This will cancel the order and release ${order.quantity} ticket(s) back to inventory. The pending payment will not be processed.`
                    }
                  </p>
                </>
              );
            })()}
            <div className="flex gap-3">
              <button
                onClick={() => setActionConfirm(null)}
                className="flex-1 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-black transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setActionConfirm(null)}
                className="flex-1 py-3 bg-[#FF4D4D] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                {actionConfirm.type === 'refund' ? 'Process Refund' : 'Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Waitlist Release/Remove Modal ─── */}
      {waitlistActionConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setWaitlistActionConfirm(null)}>
          <div className="bg-[#232326] rounded-2xl border border-[#424249] p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                "p-2.5 rounded-lg",
                waitlistActionConfirm.type === 'release' ? "bg-[#feff1c]/10" : "bg-[#FF4D4D]/10"
              )}>
                {waitlistActionConfirm.type === 'release' 
                  ? <UserPlus size={20} className="text-[#feff1c]" />
                  : <X size={20} className="text-[#FF4D4D]" />
                }
              </div>
              <h3 className="text-lg font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                {waitlistActionConfirm.type === 'release' ? 'Release Tickets' : 'Remove from Waitlist'}
              </h3>
            </div>

            <div className="bg-[#121214] rounded-xl p-4 mb-4 border border-[#424249] max-h-40 overflow-y-auto space-y-2">
              {waitlistActionConfirm.ids.map(id => {
                const entry = mockWaitlist.find(e => e.id === id);
                if (!entry) return null;
                return (
                  <div key={id} className="flex items-center justify-between">
                    <span className="text-[13px] text-[#f8f9fa]">{entry.name}</span>
                    <span className="text-[12px] text-[#9caab8]">{entry.requestedQty}× {entry.ticketType}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[13px] text-[#9caab8] mb-6 leading-relaxed">
              {waitlistActionConfirm.type === 'release'
                ? `This will send purchase invitations to ${waitlistActionConfirm.ids.length} people on the waitlist. They will have 24 hours to complete their purchase.`
                : `This will remove ${waitlistActionConfirm.ids.length} people from the waitlist. They will be notified by email.`
              }
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setWaitlistActionConfirm(null)}
                className="flex-1 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-black transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { setWaitlistActionConfirm(null); setSelectedWaitlistIds([]); }}
                className={cn(
                  "flex-1 py-3 rounded-xl font-bold hover:opacity-90 transition-all",
                  waitlistActionConfirm.type === 'release'
                    ? "bg-[#feff1c] text-[#121214]"
                    : "bg-[#FF4D4D] text-white"
                )}
              >
                {waitlistActionConfirm.type === 'release' ? 'Send Invitations' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
