import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Ticket, 
  Users, 
  DollarSign, 
  Plus, 
  Calendar, 
  ArrowRight, 
  Download, 
  ChevronDown,
  ChevronUp,
  Filter,
  MousePointer2,
  Pencil,
  Trash2,
  FileText,
  Send
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 12000, registrations: 150 },
  { name: 'Feb', revenue: 15000, registrations: 200 },
  { name: 'Mar', revenue: 18000, registrations: 280 },
  { name: 'Apr', revenue: 22000, registrations: 350 },
  { name: 'May', revenue: 31000, registrations: 420 },
  { name: 'Jun', revenue: 48250, registrations: 570 },
  { name: 'Jul', revenue: 52000, registrations: 620 },
  { name: 'Aug', revenue: 58000, registrations: 710 },
  { name: 'Sep', revenue: 61000, registrations: 780 },
  { name: 'Oct', revenue: 68000, registrations: 850 },
  { name: 'Nov', revenue: 75000, registrations: 920 },
  { name: 'Dec', revenue: 82000, registrations: 1050 },
];

const recentRegistrations = [
  { id: 1, customer: 'Kwame Asante', event: 'Afrochella 2026', tickets: 2, amount: 'GH₵1,200.00', time: '2 mins ago' },
  { id: 2, customer: 'Ama Mensah', event: 'Ghana Music Awards 2026', tickets: 1, amount: 'GH₵600.00', time: '15 mins ago' },
  { id: 3, customer: 'Kofi Osei', event: 'Afrochella 2026', tickets: 4, amount: 'GH₵1,800.00', time: '1 hour ago' },
  { id: 4, customer: 'Akosua Boateng', event: 'Detty December Concert', tickets: 2, amount: 'GH₵2,400.00', time: '3 hours ago' },
  { id: 5, customer: 'Yaw Adjei', event: 'Afrochella 2026', tickets: 1, amount: 'GH₵450.00', time: '5 hours ago' },
];

const StatCard = ({ title, value, change, icon: Icon, color, subtext }: any) => (
  <div className="bg-[#232326] p-6 rounded-xl border border-[#424249] shadow-sm flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-[#121214]" />
      </div>
      {change && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-[#feff1c]/10 text-[#feff1c]' : 'bg-red-500/10 text-red-500'}`}>
          {change}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-[#9caab8] text-sm font-medium">{title}</h3>
      <p className="font-bold text-[#f8f9fa] mt-1 font-['Kamerik205:Regular_3',sans-serif] text-[24px]">{value}</p>
      {subtext && <p className="text-[10px] text-[#767686] mt-1 font-bold uppercase tracking-wider">{subtext}</p>}
    </div>
  </div>
);

const CaretUpDown = () => (
  <div className="flex flex-col text-[#767686]">
    <ChevronUp size={10} strokeWidth={3} />
    <ChevronDown size={10} strokeWidth={3} />
  </div>
);

export const PortfolioDashboard = ({ onNavigate }: { onNavigate: (view: string, id?: string | null) => void }) => {
  const [period, setPeriod] = useState('Lifetime');
  const [chartMounted, setChartMounted] = useState(false);

  // Delay chart rendering to ensure container has proper dimensions
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] text-[24px]">Portfolio Aggregation</h1>
          <p className="text-[#9caab8]">Aggregated performance metrics across 3 active events.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 bg-[#232326] text-[#f8f9fa] border border-[#424249] px-4 py-2 rounded-lg font-bold hover:bg-[#121214] transition-all">
              <Calendar size={18} />
              {period}
              <ChevronDown size={14} className="text-[#9caab8]" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-[#232326] border border-[#424249] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              {['Lifetime', 'Last 30 Days', 'Last 90 Days', 'This Year'].map((p) => (
                <button 
                  key={p} 
                  onClick={() => setPeriod(p)}
                  className="w-full text-left px-4 py-2 text-sm text-[#f8f9fa] hover:bg-[#feff1c] hover:text-[#121214] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#232326] text-[#f8f9fa] border border-[#424249] px-4 py-2 rounded-lg font-bold hover:bg-[#121214] transition-all">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={() => onNavigate('create-event')}
            className="flex items-center gap-2 bg-[#feff1c] text-[#121214] px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
          >
            <Plus size={18} />
            Create Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Net Sales" value="GH₵289,500.00" change="+12.5%" icon={DollarSign} color="bg-[#feff1c]" subtext="Across all events" />
        <StatCard title="Average Ticket Price" value="GH₵508.00" icon={Ticket} color="bg-[#feff1c]" subtext="Weighted average" />
        <StatCard title="Total Events Organized" value="3" icon={Calendar} color="bg-[#feff1c]" subtext="2 Active, 1 Ended" />
      </div>

      <div className="bg-[#232326] rounded-xl border border-[#424249] shadow-sm p-[16px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="font-bold text-[#f8f9fa] text-xl font-['Kamerik205:Regular_3',sans-serif]">Performance Over Time</h3>
            <p className="text-sm text-[#9caab8]">Revenue and registrations growth to date</p>
          </div>
        </div>
        <div className="w-full h-[350px] min-w-0 min-h-[350px]">
          {chartMounted && (
            <ResponsiveContainer width="100%" height="100%" minHeight={350} minWidth={300} aspect={undefined} key="portfolio-chart">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#feff1c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#feff1c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#20CC70" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#20CC70" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#424249" />
                <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9caab8', fontSize: 12 }} />
                <YAxis key="yaxis-left" yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#9caab8', fontSize: 12 }} />
                <YAxis key="yaxis-right" yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#9caab8', fontSize: 12 }} />
                <Tooltip 
                  key="tooltip"
                  contentStyle={{ backgroundColor: '#121214', border: '1px solid #424249', borderRadius: '12px', color: '#f8f9fa' }}
                  formatter={(value: any, name: string) => {
                    if (name === 'revenue') return [`GH₵${value.toLocaleString()}`, 'Revenue'];
                    if (name === 'registrations') return [value, 'Registrations'];
                    return [value, name];
                  }}
                />
                <Area key="area-revenue" yAxisId="left" type="monotone" dataKey="revenue" stroke="#feff1c" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area key="area-registrations" yAxisId="right" type="monotone" dataKey="registrations" stroke="#20CC70" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-[#121214] rounded-xl border border-[#424249] shadow-sm overflow-hidden">
        <div className="p-6 bg-[#232326] border-b border-[#424249] flex items-center justify-between">
          <h3 className="font-bold text-[#f8f9fa] text-xl font-['Kamerik205:Regular_3',sans-serif]">Recent Registrations</h3>
          <button 
            onClick={() => onNavigate('contacts')}
            className="text-[#feff1c] text-sm font-bold hover:underline flex items-center gap-1 transition-all"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#232326]">
                <th className="px-6 py-4 text-[14px] font-normal text-[#f8f9fa]">Customer <CaretUpDown /></th>
                <th className="px-6 py-4 text-[14px] font-normal text-[#f8f9fa]">Event <CaretUpDown /></th>
                <th className="px-6 py-4 text-[14px] font-normal text-[#f8f9fa]">Tickets <CaretUpDown /></th>
                <th className="px-6 py-4 text-[14px] font-normal text-[#f8f9fa]">Amount <CaretUpDown /></th>
                <th className="px-6 py-4 text-[14px] font-normal text-[#f8f9fa]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#424249]">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-[#232326]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#121214] border border-[#424249] flex items-center justify-center text-[10px] font-bold group-hover:border-[#feff1c]">
                        {reg.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-sm">{reg.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#9caab8]">{reg.event}</td>
                  <td className="px-6 py-4 text-sm text-[#f8f9fa] font-bold">{reg.tickets}</td>
                  <td className="px-6 py-4 text-sm text-[#feff1c] font-bold">{reg.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-[#9caab8] hover:text-[#f8f9fa] transition-colors"><Pencil size={18} /></button>
                      <button className="text-[#20CC70] hover:text-[#20CC70]/80 transition-colors"><Send size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};