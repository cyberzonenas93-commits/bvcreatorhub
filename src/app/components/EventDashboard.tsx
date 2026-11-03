import React, { useState, useEffect } from "react";
import {
  Users,
  Ticket,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
  Download,
  ExternalLink,
  CheckCircle2,
  Calendar,
  LayoutDashboard,
  Search,
  Plus,
  ShoppingCart,
  ClipboardList,
  ArrowLeft,
  Copy,
  Check,
  X,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail,
  Send,
  UserPlus,
  Gift,
  Upload,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { toast } from "sonner";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

import { AttendeesList } from "./AttendeesList";
import { TicketsList } from "./TicketsList";
import { CheckInView } from "./CheckInView";
import { OrdersManagementView } from "./OrdersManagementView";
import { PromoterAssignmentModal } from "./PromoterAssignmentModal";

const paidPerformance = [
  {
    type: "Early Bird",
    sold: 500,
    total: 500,
    revenue: 75000,
    color: "#feff1c",
    salesEnd: "Closed",
    waitlist: 38,
    absorbFee: true,
  },
  {
    type: "General Admission",
    sold: 1245,
    total: 2000,
    revenue: 373500,
    color: "#f8f9fa",
    salesEnd: "234 days left",
    waitlist: 0,
    absorbFee: false,
  },
  {
    type: "VIP Experience",
    sold: 180,
    total: 200,
    revenue: 144000,
    color: "#A5A5B6",
    salesEnd: "234 days left",
    waitlist: 12,
    absorbFee: true,
  },
];

const rsvpPerformance = [
  {
    type: "General RSVP",
    sold: 380,
    total: 500,
    waitlist: 45,
    color: "#feff1c",
  },
  {
    type: "VIP/Press",
    sold: 45,
    total: 50,
    waitlist: 0,
    color: "#f8f9fa",
  },
  {
    type: "Staff/Crew",
    sold: 25,
    total: 30,
    waitlist: 0,
    color: "#A5A5B6",
  },
];

const freePerformance = [
  {
    type: "Main Stage",
    sold: 850,
    total: 1000,
    waitlist: 0,
    color: "#feff1c",
  },
  {
    type: "Workshop A",
    sold: 45,
    total: 50,
    waitlist: 12,
    color: "#f8f9fa",
  },
  {
    type: "Workshop B",
    sold: 30,
    total: 50,
    waitlist: 5,
    color: "#A5A5B6",
  },
];

const StatSmall = ({
  title,
  value,
  total,
  change,
  trend,
  icon: Icon,
}: any) => (
  <div className="bg-[#232326] p-5 rounded-xl border border-[#424249] shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 bg-[#121214] rounded-lg">
        <Icon size={18} className="text-[#feff1c]" />
      </div>
      <div
        className={`flex items-center text-xs font-bold ${trend === "up" ? "text-[#feff1c]" : "text-red-500"}`}
      >
        {trend === "up" ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} />
        )}
        {change}
      </div>
    </div>
    <p className="text-[#9caab8] text-sm font-regular">
      {title}
    </p>
    <p className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
      {total ? `${value} / ${total}` : value}
    </p>
  </div>
);

export const EventDashboard = ({
  eventId,
  onNavigate,
}: {
  eventId: string;
  onNavigate: (view: any, id?: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPaused, setIsPaused] = useState(false);
  const [capacity, setCapacity] = useState(450);
  const [registrations, setRegistrations] = useState(380);
  const [isAddingCapacity, setIsAddingCapacity] =
    useState(false);
  const [additionalSpots, setAdditionalSpots] = useState(50);
  const [chartMounted, setChartMounted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [isComplimentary, setIsComplimentary] = useState(false);
  const [showPromoterModal, setShowPromoterModal] = useState(false);

  // Mock function to determine event type based on ID
  // In a real app, this data would come from a database/API
  const getEventType = (id: string) => {
    if (id === "tech-conf") return "RSVP";
    if (id === "open-mic") return "Free";
    return "Paid";
  };

  // Mock function to determine event status based on ID
  const getEventStatus = (id: string) => {
    if (id === "draft-event") return "Draft";
    if (id === "cancelled-event") return "Cancelled";
    if (id === "gala-2026") return "Ended";
    return "Live";
  };

  const eventStatus = getEventStatus(eventId);
  const eventType = getEventType(eventId);
  const eventName =
    eventId === "tech-conf"
      ? "Ghana Tech Summit 2026"
      : eventId === "open-mic"
        ? "Chale Wote Street Art Festival"
        : eventId === "draft-event"
          ? "Panafest 2026"
          : eventId === "cancelled-event"
            ? "Homowo Festival Concert"
            : "Afrochella 2026";

  const handleAddCapacity = () => {
    setCapacity((prev) => prev + additionalSpots);
    setIsAddingCapacity(false);
    toast.success(
      `Successfully added ${additionalSpots} spots to capacity.`,
    );
  };

  // Generate event link (mock URL for demonstration)
  const eventLink = `https://events.gh/e/${eventId}`;

  const handleCopyLink = async () => {
    // Use fallback method directly for iframe environments
    try {
      const textArea = document.createElement('textarea');
      textArea.value = eventLink;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      textArea.remove();
      
      if (successful) {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
        toast.success('Event link copied to clipboard!');
      } else {
        toast.error('Failed to copy link. Please copy manually.');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link. Please copy manually.');
    }
  };

  const handleShare = (platform: string) => {
    const text = `Check out ${eventName}!`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(eventLink);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleSendInvites = () => {
    const emailList = inviteEmails.split(',').map(e => e.trim()).filter(Boolean);
    
    if (emailList.length === 0) {
      toast.error('Please enter at least one email address');
      return;
    }

    if (eventType === 'Paid' && isComplimentary && !selectedTier) {
      toast.error('Please select a ticket tier for complimentary tickets');
      return;
    }

    // Mock invite sending
    const inviteType = eventType === 'Paid' 
      ? (isComplimentary ? `complimentary ${selectedTier} ticket` : 'invitation to purchase')
      : 'registration link';

    toast.success(
      `Sent ${inviteType}${inviteType.includes('ticket') ? 's' : ''} to ${emailList.length} ${emailList.length === 1 ? 'person' : 'people'}!`
    );

    // Reset form
    setInviteEmails('');
    setInviteMessage('');
    setSelectedTier('');
    setIsComplimentary(false);
    setShowInviteModal(false);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const csvContent = 'Email,Name\nkwame.osei@gmail.com,Kwame Osei\nama.asante@email.com,Ama Asante\nkofi.mensah@company.gh,Kofi Mensah\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'invite-template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Template downloaded successfully!');
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      // Skip header row and extract emails
      const emails = lines.slice(1).map(line => {
        const columns = line.split(',');
        return columns[0]?.trim(); // First column is email
      }).filter(email => email && email.includes('@'));

      if (emails.length === 0) {
        toast.error('No valid email addresses found in CSV');
        return;
      }

      // Append to existing emails or replace
      const existingEmails = inviteEmails.trim() ? inviteEmails.split(',').map(e => e.trim()) : [];
      const allEmails = [...new Set([...existingEmails, ...emails])]; // Remove duplicates
      
      setInviteEmails(allEmails.join(', '));
      toast.success(`Added ${emails.length} email${emails.length !== 1 ? 's' : ''} from CSV!`);
    };

    reader.onerror = () => {
      toast.error('Failed to read CSV file');
    };

    reader.readAsText(file);
    
    // Reset input so the same file can be uploaded again
    event.target.value = '';
  };

  const tabs = [
    {
      id: "Overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    ...(eventType === "Paid"
      ? [{ id: "Orders", label: "Orders", icon: ShoppingCart }]
      : []),
    {
      id: "Attendees",
      label: eventType === "Paid" ? "Attendees" : "Guestlist",
      icon: Users,
    },
    {
      id: "Tickets",
      label: eventType === "Paid" ? "Tickets" : "Capacity",
      icon: Ticket,
    },
    ...(eventType !== "Free"
      ? [
          {
            id: "Waitlist",
            label: "Waitlist",
            icon: ClipboardList,
          },
        ]
      : []),
    ...(eventType !== "Free"
      ? [
          {
            id: "Check-in",
            label: "Check-In",
            icon: CheckCircle2,
          },
        ]
      : []),
  ];

  const chartData =
    eventType === "Paid"
      ? paidPerformance
      : eventType === "RSVP"
        ? rsvpPerformance
        : freePerformance;

  // Delay chart rendering to ensure container has proper dimensions
  useEffect(() => {
    setChartMounted(false);
    const timer = setTimeout(() => {
      setChartMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [eventType]);

  const renderContent = () => {
    switch (activeTab) {
      case "Orders":
        return <OrdersManagementView />;
      case "Waitlist":
        return <OrdersManagementView initialTab="waitlist" />;
      case "Attendees":
        return (
          <AttendeesList
            eventType={eventType as "Paid" | "RSVP" | "Free"}
          />
        );
      case "Tickets":
        return (
          <TicketsList
            eventType={eventType}
            capacity={capacity}
            registrations={registrations}
          />
        );
      case "Check-in":
        return (
          <CheckInView
            eventType={eventType as "Paid" | "RSVP" | "Free"}
          />
        );
      case "Overview":
      default:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventType === "Paid" ? (
                <StatSmall
                  title="Total Revenue"
                  value="GH₵180,000"
                  change="12%"
                  trend="up"
                  icon={DollarSign}
                />
              ) : (
                <StatSmall
                  title="Page Views"
                  value="2,840"
                  change="4%"
                  trend="down"
                  icon={Eye}
                />
              )}

              <StatSmall
                title={
                  eventType === "Paid"
                    ? "Tickets Sold"
                    : "Registrations"
                }
                value={registrations.toString()}
                total={capacity.toString()}
                change="8%"
                trend="up"
                icon={eventType === "Paid" ? Ticket : Users}
              />

              {eventType === "Paid" ? (
                <StatSmall
                  title="Page Views"
                  value="2,840"
                  change="4%"
                  trend="down"
                  icon={Eye}
                />
              ) : (
                <StatSmall
                  title="Waitlist Active"
                  value="12"
                  change="5%"
                  trend="up"
                  icon={Users}
                />
              )}

              <StatSmall
                title="Check-ins"
                value={`0 / ${registrations}`}
                change="0%"
                trend="up"
                icon={CheckCircle2}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#232326] p-6 rounded-xl border border-[#424249] shadow-sm">
                <h3 className="font-bold text-[#f8f9fa] text-xl mb-6 font-['Kamerik205:Regular_3',sans-serif]">
                  {eventType === "Paid"
                    ? "Ticket Performance"
                    : "Registration Trends"}
                </h3>
                <div
                  className="w-full h-[300px] min-w-0 min-h-[300px]"
                  style={{
                    width: "100%",
                    height: "300px",
                    minHeight: "300px",
                    minWidth: "300px",
                  }}
                >
                  {chartMounted && (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      minHeight={300}
                      minWidth={300}
                      aspect={undefined}
                      debounce={50}
                      key={`chart-${eventType}`}
                    >
                      <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 40 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={false}
                          stroke="#424249"
                        />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="type"
                          type="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#9caab8",
                            fontSize: 12,
                          }}
                        />
                        <Tooltip
                          cursor={{ fill: "#121214" }}
                          contentStyle={{
                            backgroundColor: "#121214",
                            border: "1px solid #424249",
                            borderRadius: "8px",
                            color: "#f8f9fa",
                          }}
                          labelStyle={{
                            color: "#f8f9fa",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                          itemStyle={{
                            color: "#f8f9fa",
                          }}
                          formatter={(
                            value: any,
                            name: string,
                            props: any,
                          ) => {
                            if (name === "sold")
                              return [
                                value,
                                eventType === "Paid"
                                  ? "Tickets Sold"
                                  : "Registrations",
                              ];
                            if (name === "revenue")
                              return [
                                `GH₵${value.toLocaleString()}`,
                                "Revenue",
                              ];
                            if (name === "waitlist")
                              return [value, "On Waitlist"];
                            return [value, name];
                          }}
                        />
                        <Bar
                          dataKey="sold"
                          radius={[0, 4, 4, 0]}
                          barSize={32}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#424249]">
                  {chartData.map((entry: any) => (
                    <div key={entry.type}>
                      <p className="text-[10px] text-[#9caab8] font-bold uppercase mb-1 tracking-tight">
                        {entry.type}
                      </p>
                      <p className="text-sm font-bold text-[#f8f9fa]">
                        {eventType === "Paid"
                          ? `GH₵${entry.revenue?.toLocaleString()}`
                          : eventType === "RSVP"
                            ? `${entry.sold} of ${entry.total} Confirmed`
                            : `${entry.sold} of ${entry.total} Registered`}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex-1 h-1 bg-[#121214] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              entry.sold / entry.total >= 1
                                ? "bg-[#20CC70]"
                                : entry.sold / entry.total >=
                                    0.8
                                  ? "bg-[#feff1c]"
                                  : "bg-[#9caab8]"
                            }`}
                            style={{
                              width: `${(entry.sold / entry.total) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-[#9caab8]">
                          {(
                            (entry.sold / entry.total) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                      {eventType === "Paid" && (
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-[10px] text-[#9caab8]">
                            {entry.sold} / {entry.total} sold
                          </span>
                          {entry.waitlist > 0 && (
                            <span className="text-[10px] text-amber-500">
                              +{entry.waitlist} waitlisted
                            </span>
                          )}
                          {entry.salesEnd && (
                            <span
                              className={`text-[10px] ${entry.salesEnd === "Closed" ? "text-[#767686]" : "text-[#feff1c]"}`}
                            >
                              • {entry.salesEnd}
                            </span>
                          )}
                        </div>
                      )}
                      {eventType === "RSVP" &&
                        entry.waitlist > 0 && (
                          <p className="text-[10px] text-amber-500 mt-1">
                            +{entry.waitlist} on waitlist
                          </p>
                        )}
                      {eventType === "RSVP" &&
                        entry.waitlist === 0 &&
                        entry.sold < entry.total && (
                          <p className="text-[10px] text-[#9caab8] mt-1">
                            {entry.total - entry.sold} spots
                            open
                          </p>
                        )}
                      {eventType === "Free" &&
                        entry.waitlist > 0 && (
                          <p className="text-[10px] text-amber-500 mt-1">
                            +{entry.waitlist} on waitlist
                          </p>
                        )}
                      {eventType === "Free" &&
                        entry.sold >= entry.total && (
                          <p className="text-[10px] text-[#20CC70] mt-1">
                            Fully booked
                          </p>
                        )}
                      {eventType === "Free" &&
                        entry.sold < entry.total &&
                        entry.waitlist === 0 && (
                          <p className="text-[10px] text-[#9caab8] mt-1">
                            {entry.total - entry.sold} spots
                            remaining
                          </p>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#232326] p-6 rounded-xl border border-[#424249] shadow-sm">
                  <h3 className="font-bold text-[#f8f9fa] text-xl mb-4 font-['Kamerik205:Regular_3',sans-serif]">
                    Attendee Tracking
                  </h3>
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          className="text-[#121214]"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={364.4}
                          strokeDashoffset={
                            364.4 *
                            (1 - registrations / capacity)
                          }
                          className="text-[#feff1c] transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-bold text-[#f8f9fa]">
                          {Math.round(
                            (registrations / capacity) * 100,
                          )}
                          %
                        </span>
                        <span className="text-[10px] text-[#9caab8] uppercase font-bold">
                          {eventType === "Paid"
                            ? "Sold Out"
                            : "Capacity"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 w-full space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9caab8]">
                          Total Capacity
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#f8f9fa]">
                            {capacity}
                          </span>
                          {(eventType === "RSVP" ||
                            eventType === "Free") && (
                            <button
                              onClick={() =>
                                setIsAddingCapacity(true)
                              }
                              className="p-1 hover:bg-[#121214] text-[#feff1c] rounded transition-colors"
                              title="Increase Capacity"
                            >
                              <Plus size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9caab8]">
                          Expected Attendees
                        </span>
                        <span className="font-bold text-[#f8f9fa]">
                          {registrations}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9caab8]">
                          {eventType === "Paid"
                            ? "Refund Policy Active"
                            : "Auto-Confirm Active"}
                        </span>
                        <span className="font-bold text-[#feff1c]">
                          Yes
                        </span>
                      </div>
                    </div>
                  </div>

                  {isAddingCapacity && (
                    <div className="mt-4 p-4 bg-[#121214] border border-[#feff1c]/20 rounded-xl animate-in zoom-in-95 duration-200">
                      <p className="text-xs font-bold text-[#f8f9fa] mb-3 uppercase tracking-wider">
                        Increase Capacity
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={additionalSpots}
                          onChange={(e) =>
                            setAdditionalSpots(
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="flex-1 bg-[#232326] border border-[#424249] rounded-lg px-3 py-2 text-sm text-[#f8f9fa] outline-none focus:border-[#feff1c]"
                        />
                        <button
                          onClick={handleAddCapacity}
                          className="bg-[#feff1c] text-[#121214] px-4 py-2 rounded-lg text-sm font-bold"
                        >
                          Add
                        </button>
                        <button
                          onClick={() =>
                            setIsAddingCapacity(false)
                          }
                          className="bg-[#232326] text-[#9caab8] px-3 py-2 rounded-lg text-sm font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setActiveTab("Attendees")}
                    className="w-full mt-6 bg-[#feff1c] text-[#121214] py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                  >
                    {eventType === "Paid"
                      ? "Manage Guestlist"
                      : "View Guestlist"}
                  </button>
                </div>

                {eventType === "Paid" ? (
                  <div className="bg-[#feff1c] p-6 rounded-xl border border-[#feff1c] shadow-sm text-[#121214]">
                    <h3 className="font-bold text-lg mb-2 font-['Kamerik205:Regular_3',sans-serif]">
                      EventShield Premium
                    </h3>
                    <p className="opacity-80 text-sm mb-6 leading-relaxed">
                      Your event is fully protected. Weather and
                      cancellation coverage is currently active.
                    </p>
                    <button className="w-full bg-[#121214] text-[#f8f9fa] py-2 rounded-lg text-sm font-bold hover:bg-black transition-all">
                      Manage Policy
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#232326] p-6 rounded-xl border border-[#424249] shadow-sm">
                    <h3 className="font-bold text-[#f8f9fa] text-lg mb-2 font-['Kamerik205:Regular_3',sans-serif]">
                      Quick Invite
                    </h3>
                    <p className="text-[#9caab8] text-sm mb-6 leading-relaxed">
                      Send a direct registration link to your
                      VIP guests or speakers.
                    </p>
                    <button className="w-full bg-[#121214] text-[#f8f9fa] py-2 border border-[#424249] rounded-lg text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Share Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Event Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] text-[24px]">
              {eventName}
            </h1>
            <span
              className={cn(
                "px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wider",
                eventStatus === "Live"
                  ? "bg-[#feff1c]/10 text-[#feff1c] border-[#feff1c]/20"
                  : eventStatus === "Draft"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    : eventStatus === "Cancelled"
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : "bg-[#424249]/10 text-[#9caab8] border-[#424249]/20",
              )}
            >
              {eventStatus === "Live"
                ? "Live Now"
                : eventStatus}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#9caab8] text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {eventId === "tech-conf"
                  ? "Aug 22, 2026"
                  : eventId === "open-mic"
                    ? "Aug 20, 2026"
                    : "Dec 28, 2026"}
              </span>
            </div>
            <div className="w-1 h-1 bg-[#424249] rounded-full"></div>
            <span>
              {eventId === "tech-conf"
                ? "Accra Intl. Conference Centre"
                : eventId === "open-mic"
                  ? "Jamestown, Accra"
                  : "El Wak Stadium, Accra"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("create-event", eventId)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-lg hover:bg-[#121214] transition-all"
          >
            <Plus size={16} />
            Edit Event
          </button>
          <button 
            onClick={() => {
              setShowInviteModal(true);
              // Set default tier for Paid events
              if (eventType === 'Paid' && paidPerformance.length > 0) {
                setSelectedTier(paidPerformance[0].type);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-lg hover:bg-[#121214] transition-all"
          >
            <UserPlus size={16} />
            Invite
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-lg hover:bg-[#121214] transition-all"
          >
            <Share2 size={16} />
            Promote
          </button>
          <button
            onClick={() => setShowPromoterModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-lg hover:bg-[#121214] transition-all"
          >
            <Users size={16} />
            Assign Promoters
          </button>
        </div>
      </div>

      {/* Tabs System - Based on Figma Design */}
      <div className="flex items-center gap-8 border-b border-[#424249] pt-2 mx-[0px] mt-[0px] mb-[16px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-bold transition-all relative ${activeTab === tab.id ? "text-[#f8f9fa]" : "text-[#9caab8] hover:text-[#f8f9fa]"} px-[4px] pt-[0px] pb-[12px]`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#feff1c]" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="mt-6">{renderContent()}</div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Promote Event</h2>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Event Link Section */}
            <div className="mb-6 p-4 bg-[#121214] border border-[#424249] rounded-xl">
              <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider mb-2 block">Event Link</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={eventLink} 
                  readOnly
                  className="flex-1 px-3 py-2 bg-[#232326] border border-[#424249] rounded-lg text-sm text-[#f8f9fa] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 bg-[#feff1c] text-[#121214] rounded-lg font-bold text-sm hover:opacity-90 transition-all"
                >
                  {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                  {linkCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider mb-2 block">Share via</label>
              
              <button
                type="button"
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 p-3 bg-[#121214] border border-[#424249] rounded-xl hover:border-[#3b5998] hover:bg-[#3b5998]/10 transition-all group"
              >
                <div className="w-10 h-10 bg-[#3b5998] rounded-lg flex items-center justify-center shrink-0">
                  <Facebook size={20} className="text-white" />
                </div>
                <span className="font-bold text-[#f8f9fa] text-sm">Share on Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 p-3 bg-[#121214] border border-[#424249] rounded-xl hover:border-[#1da1f2] hover:bg-[#1da1f2]/10 transition-all group"
              >
                <div className="w-10 h-10 bg-[#1da1f2] rounded-lg flex items-center justify-center shrink-0">
                  <Twitter size={20} className="text-white" />
                </div>
                <span className="font-bold text-[#f8f9fa] text-sm">Share on Twitter</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 p-3 bg-[#121214] border border-[#424249] rounded-xl hover:border-[#25d366] hover:bg-[#25d366]/10 transition-all group"
              >
                <div className="w-10 h-10 bg-[#25d366] rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <span className="font-bold text-[#f8f9fa] text-sm">Share on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-3 p-3 bg-[#121214] border border-[#424249] rounded-xl hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all group"
              >
                <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center shrink-0">
                  <Linkedin size={20} className="text-white" />
                </div>
                <span className="font-bold text-[#f8f9fa] text-sm">Share on LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-lg w-full animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Invite Attendees</h2>
              <button
                type="button"
                onClick={() => {
                  setShowInviteModal(false);
                  setInviteEmails('');
                  setInviteMessage('');
                  setSelectedTier('');
                  setIsComplimentary(false);
                }}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider">Email Addresses</label>
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121214] border border-[#424249] rounded-lg text-xs font-bold text-[#f8f9fa] hover:border-[#feff1c] hover:text-[#feff1c] transition-all"
                  >
                    <Download size={14} />
                    CSV Template
                  </button>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-[#767686]" size={18} />
                  <textarea
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                    placeholder="kwame.osei@gmail.com, ama.asante@email.com, ..."
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all resize-none"
                  />
                </div>
                
                {/* CSV Upload Section */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-xs text-[#767686]">Separate multiple emails with commas</div>
                  <label className="flex items-center gap-2 px-3 py-2 bg-[#121214] border border-[#424249] rounded-lg text-xs font-bold text-[#f8f9fa] hover:border-[#feff1c] hover:text-[#feff1c] transition-all cursor-pointer">
                    <Upload size={14} />
                    Upload CSV
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Ticket Tier Selection for Paid Events */}
              {eventType === 'Paid' && (
                <div className="space-y-4">
                  {/* Complimentary Toggle */}
                  <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-[#f8f9fa]">Give Complimentary Tickets?</p>
                        <p className="text-xs text-[#767686] mt-1">
                          {isComplimentary 
                            ? 'Invitees will receive free tickets. No payment required.'
                            : 'Invitees will receive an invitation link to purchase tickets.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsComplimentary(!isComplimentary)}
                        className={`relative w-14 h-8 rounded-full transition-all ${
                          isComplimentary ? 'bg-[#feff1c]' : 'bg-[#424249]'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                            isComplimentary ? 'right-1' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    {isComplimentary && (
                      <div className="pt-3 border-t border-[#424249] flex items-center gap-2 text-xs">
                        <Gift size={14} className="text-[#feff1c]" />
                        <span className="text-[#feff1c] font-bold">Complimentary tickets will be issued automatically</span>
                      </div>
                    )}
                  </div>

                  {/* Tier Selection - Only show if complimentary */}
                  {isComplimentary && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">Select Ticket Tier</label>
                      <div className="grid grid-cols-1 gap-2">
                        {paidPerformance.map((tier) => (
                          <button
                            key={tier.type}
                            type="button"
                            onClick={() => setSelectedTier(tier.type)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              selectedTier === tier.type
                                ? 'bg-[#feff1c]/5 border-[#feff1c]'
                                : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className={`font-bold text-sm ${selectedTier === tier.type ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
                                  {tier.type}
                                </h4>
                                <p className="text-xs text-[#767686] mt-1">
                                  {tier.sold < tier.total 
                                    ? `${tier.total - tier.sold} spots available`
                                    : tier.salesEnd === 'Closed' ? 'Sold out' : 'Limited availability'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`font-bold ${selectedTier === tier.type ? 'text-[#feff1c]' : 'text-[#9caab8]'}`}>
                                  GH₵{(tier.revenue / tier.sold).toFixed(0)}
                                </p>
                                <p className="text-xs text-[#767686]">per ticket</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Personal Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider">
                  Personal Message <span className="text-[#767686] font-normal">(Optional)</span>
                </label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder={`Hi! I'd love for you to join us at ${eventName}. Hope to see you there!`}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all resize-none"
                />
              </div>

              {/* Summary Banner */}
              {inviteEmails && (
                <div className="p-4 bg-[#121214] border border-[#feff1c]/20 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#feff1c]/10 rounded-lg shrink-0">
                      <UserPlus size={18} className="text-[#feff1c]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#f8f9fa]">Invitation Summary</p>
                      <p className="text-xs text-[#9caab8] mt-1">
                        Sending {eventType === 'Paid' 
                          ? (isComplimentary ? 'complimentary ' : '') + selectedTier + ' ticket' + (isComplimentary ? 's' : ' invitations')
                          : 'registration link'} to{' '}
                        {inviteEmails.split(',').filter(e => e.trim()).length} recipient{inviteEmails.split(',').filter(e => e.trim()).length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteEmails('');
                    setInviteMessage('');
                    setSelectedTier('');
                    setIsComplimentary(false);
                  }}
                  className="flex-1 px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendInvites}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
                >
                  <Send size={18} />
                  Send Invites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promoter Assignment Modal */}
      {showPromoterModal && (
        <PromoterAssignmentModal
          isOpen={showPromoterModal}
          eventId={eventId}
          eventName={eventName}
          onClose={() => setShowPromoterModal(false)}
          assignedPromoterIds={[]}
        />
      )}
    </div>
  );
};