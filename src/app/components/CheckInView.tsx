import React, { useState } from "react";
import {
  Search,
  QrCode,
  UserCheck,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react";

// Mock data for Paid events
const mockPaidAttendees = [
  {
    id: "1",
    name: "Kwame Asante",
    ticket: "VIP Experience",
    status: "Pending",
    email: "kwame.asante@gmail.com",
    orderId: "#ORD-9283",
  },
  {
    id: "2",
    name: "Ama Mensah",
    ticket: "General Admission",
    status: "Checked In",
    email: "ama.mensah@yahoo.com",
    orderId: "#ORD-9284",
  },
  {
    id: "3",
    name: "Kofi Osei",
    ticket: "General Admission",
    status: "Pending",
    email: "kofi.osei@outlook.com",
    orderId: "#ORD-9285",
  },
  {
    id: "4",
    name: "Akosua Boateng",
    ticket: "Early Bird",
    status: "Pending",
    email: "akosua.b@gmail.com",
    orderId: "#ORD-9286",
  },
  {
    id: "5",
    name: "Yaw Adjei",
    ticket: "VIP Experience",
    status: "Pending",
    email: "yaw.adjei@yahoo.com",
    orderId: "#ORD-9287",
  },
];

// Mock data for RSVP events
const mockRSVPAttendees = [
  {
    id: "1",
    name: "Kwame Asante",
    status: "Pending",
    email: "kwame.asante@gmail.com",
    phone: "+233 24 123 4567",
  },
  {
    id: "2",
    name: "Ama Mensah",
    status: "Checked In",
    email: "ama.mensah@yahoo.com",
    phone: "+233 20 234 5678",
  },
  {
    id: "3",
    name: "Kofi Osei",
    status: "Pending",
    email: "kofi.osei@outlook.com",
    phone: "+233 55 345 6789",
  },
  {
    id: "4",
    name: "Akosua Boateng",
    status: "Pending",
    email: "akosua.b@gmail.com",
    phone: "+233 24 456 7890",
  },
  {
    id: "5",
    name: "Yaw Adjei",
    status: "Pending",
    email: "yaw.adjei@yahoo.com",
    phone: "+233 50 567 8901",
  },
];

export const CheckInView = ({
  eventType = "Paid",
}: {
  eventType?: "Paid" | "RSVP" | "Free";
}) => {
  const mockAttendees =
    eventType === "RSVP"
      ? mockRSVPAttendees
      : mockPaidAttendees;
  const [search, setSearch] = useState("");
  const [attendees, setAttendees] = useState(mockAttendees);
  const [checkedInCount, setCheckedInCount] = useState(1);

  const handleCheckIn = (id: string) => {
    setAttendees((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Checked In" } : a,
      ),
    );
    setCheckedInCount((prev) => prev + 1);
  };

  const filteredAttendees = attendees.filter((a) => {
    const searchLower = search.toLowerCase();
    if (eventType === "Paid") {
      const paidAttendee = a as any;
      return (
        a.name.toLowerCase().includes(searchLower) ||
        a.email.toLowerCase().includes(searchLower) ||
        paidAttendee.orderId?.toLowerCase().includes(searchLower)
      );
    } else {
      const rsvpAttendee = a as any;
      return (
        a.name.toLowerCase().includes(searchLower) ||
        a.email.toLowerCase().includes(searchLower) ||
        rsvpAttendee.phone?.toLowerCase().includes(searchLower)
      );
    }
  });

  // Free events don't have check-in functionality
  if (eventType === "Free") {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] text-center">
          <div className="w-20 h-20 bg-[#121214] rounded-full flex items-center justify-center mx-auto mb-6 text-[#424249]">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
            Check-In Not Available
          </h3>
          <p className="text-[#9caab8] max-w-sm mx-auto mt-2">
            Check-in functionality is not available for free
            events. Guests can attend without verification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] text-[20px]">
            Live Check-In
          </h1>
          <p className="text-[#9caab8]">
            Verify tickets and manage entry for Afrochella 2026
          </p>
        </div>
        <div className="flex items-center gap-6 bg-[#232326] p-4 rounded-2xl border border-[#424249] shadow-sm">
          <div className="text-center px-4 border-r border-[#424249]">
            <p className="text-[10px] text-[#9caab8] font-bold uppercase tracking-wider mb-1">
              Checked In
            </p>
            <p className="text-3xl font-bold text-[#feff1c] font-['Kamerik205:Regular_3',sans-serif]">
              {checkedInCount}
            </p>
          </div>
          <div className="text-center px-4">
            <p className="text-[10px] text-[#9caab8] font-bold uppercase tracking-wider mb-1">
              Remaining
            </p>
            <p className="text-3xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
              {attendees.length - checkedInCount}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9caab8] group-focus-within:text-[#feff1c] transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search name, email, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#232326] border border-[#424249] rounded-2xl text-[#f8f9fa] placeholder-[#767686] focus:outline-none focus:ring-2 focus:ring-[#feff1c]/30 focus:border-[#feff1c] shadow-sm transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#767686] hover:text-[#f8f9fa]"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button className="flex items-center justify-center gap-3 bg-[#feff1c] text-[#121214] px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10">
          <QrCode size={20} />
          Scan QR Code
        </button>
      </div>

      <div className="bg-[#232326] rounded-2xl border border-[#424249] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#424249]">
          {filteredAttendees.length > 0 ? (
            filteredAttendees.map((attendee) => (
              <div
                key={attendee.id}
                className="p-5 flex items-center justify-between hover:bg-[#121214] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-[#f8f9fa] text-lg group-hover:text-[#feff1c] transition-colors">
                        {attendee.name}
                      </h3>
                      {eventType === "Paid" && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#121214] text-[#9caab8] rounded border border-[#424249]">
                          {attendee.ticket}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#9caab8] mt-0.5">
                      {attendee.email} •{" "}
                      <span className="text-[#767686] font-mono">
                        {eventType === "Paid"
                          ? (attendee as any).orderId
                          : (attendee as any).phone}
                      </span>
                    </p>
                  </div>
                </div>

                {attendee.status === "Checked In" ? (
                  <div className="flex items-center gap-2 text-[#feff1c] font-bold text-sm px-4 py-2 bg-[#feff1c]/10 rounded-xl border border-[#feff1c]/20">
                    <CheckCircle2 size={18} />
                    Verified
                  </div>
                ) : (
                  <button
                    onClick={() => handleCheckIn(attendee.id)}
                    className="bg-[#121214] text-[#f8f9fa] border border-[#424249] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#feff1c] hover:text-[#121214] hover:border-[#feff1c] transition-all flex items-center gap-2"
                  >
                    <UserCheck size={18} />
                    Check In
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-[#121214] rounded-full flex items-center justify-center mx-auto mb-6 text-[#424249]">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                No matching attendees
              </h3>
              <p className="text-[#9caab8] max-w-sm mx-auto mt-2">
                We couldn't find anyone matching "{search}".
                Double check the spelling or scan the ticket QR
                code instead.
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-6 text-[#feff1c] font-bold hover:underline"
              >
                Clear search results
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#121214] border border-[#424249] p-5 rounded-2xl flex gap-4">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#f8f9fa] text-sm">
              Offline Mode Ready
            </h4>
            <p className="text-[#9caab8] text-xs mt-1 leading-relaxed">
              Your data is being cached locally. You can
              continue checking in attendees even if your
              connection drops.
            </p>
          </div>
        </div>
        <div className="bg-[#feff1c] p-5 rounded-2xl flex items-center justify-between text-[#121214]">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-[#121214]/10 rounded-xl flex items-center justify-center shrink-0">
              <QrCode size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">
                Smart Scanner
              </h4>
              <p className="opacity-70 text-xs mt-1">
                Supports all TicketFlow QR formats and external
                PDF tickets.
              </p>
            </div>
          </div>
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};
