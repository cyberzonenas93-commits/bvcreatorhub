import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Tag,
  Ticket as TicketIcon,
  Users,
  Calendar,
  Clock,
  ShieldCheck,
  UserPlus,
  ToggleRight,
  ToggleLeft,
  AlertTriangle,
  TrendingUp,
  X,
  Copy,
  Check,
  Percent,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

interface TicketTierData {
  id: string;
  name: string;
  price: number;
  sold: number;
  capacity: number;
  salesStart: string;
  salesEnd: string;
  absorbFee: boolean;
  waitlistEnabled: boolean;
  waitlistCount: number;
  status:
    | "Scheduled"
    | "Active"
    | "Almost Sold Out"
    | "Sold Out"
    | "Sales Ended"
    | "Paused";
}

const ticketTiers: TicketTierData[] = [
  {
    id: "1",
    name: "Early Bird",
    price: 150,
    sold: 500,
    capacity: 500,
    salesStart: "2026-06-01",
    salesEnd: "2026-09-30",
    absorbFee: true,
    waitlistEnabled: true,
    waitlistCount: 38,
    status: "Sold Out",
  },
  {
    id: "2",
    name: "General Admission",
    price: 300,
    sold: 1245,
    capacity: 2000,
    salesStart: "2026-07-15",
    salesEnd: "2026-12-27",
    absorbFee: false,
    waitlistEnabled: false,
    waitlistCount: 0,
    status: "Active",
  },
  {
    id: "3",
    name: "VIP Experience",
    price: 800,
    sold: 180,
    capacity: 200,
    salesStart: "2026-07-15",
    salesEnd: "2026-12-27",
    absorbFee: true,
    waitlistEnabled: true,
    waitlistCount: 12,
    status: "Almost Sold Out",
  },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getSalesWindowLabel = (tier: TicketTierData) => {
  const now = new Date("2026-02-20");
  const start = new Date(tier.salesStart);
  const end = new Date(tier.salesEnd);

  if (now < start) {
    const daysUntil = Math.ceil(
      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return {
      label: `Opens in ${daysUntil} days`,
      color: "text-[#9caab8]",
    };
  }
  if (now > end) {
    return {
      label: "Sales window closed",
      color: "text-[#767686]",
    };
  }
  const daysLeft = Math.ceil(
    (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return {
    label: `${daysLeft} days left`,
    color: "text-[#feff1c]",
  };
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Almost Sold Out":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "Sold Out":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "Scheduled":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Sales Ended":
      return "bg-[#424249]/10 text-[#767686] border-[#424249]/20";
    case "Paused":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    default:
      return "bg-green-500/10 text-green-500 border-green-500/20";
  }
};

export const TicketsList = ({
  eventType = "Paid",
  capacity = 1000,
  registrations = 450,
}: {
  eventType?: string;
  capacity?: number;
  registrations?: number;
}) => {
  const isRSVP = eventType === "RSVP" || eventType === "Free";
  const [tiers, setTiers] =
    useState<TicketTierData[]>(ticketTiers);
  const [showDiscountModal, setShowDiscountModal] =
    useState(false);
  const [showCreateCodeModal, setShowCreateCodeModal] =
    useState(false);
  const [discountCodes, setDiscountCodes] = useState([
    {
      id: "1",
      code: "EARLYBIRD20",
      type: "percentage" as "percentage" | "fixed",
      value: 20,
      appliesTo: ["1", "2"], // Tier IDs
      redemptions: 147,
      limit: 500,
      expiresAt: "2026-09-30",
      status: "active" as "active" | "paused" | "expired",
    },
    {
      id: "2",
      code: "VIP50OFF",
      type: "fixed" as "percentage" | "fixed",
      value: 50,
      appliesTo: ["3"],
      redemptions: 23,
      limit: 100,
      expiresAt: "2026-12-27",
      status: "active" as "active" | "paused" | "expired",
    },
  ]);
  const [codeCopied, setCodeCopied] = useState<string | null>(
    null,
  );

  // New code form state
  const [newCode, setNewCode] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 10,
    appliesTo: [] as string[],
    limit: 100,
    expiresAt: "2026-12-31",
  });

  const totalSold = tiers.reduce((sum, t) => sum + t.sold, 0);
  const totalCapacity = tiers.reduce(
    (sum, t) => sum + t.capacity,
    0,
  );
  const totalRevenue = tiers.reduce(
    (sum, t) => sum + t.sold * t.price,
    0,
  );
  const totalWaitlist = tiers.reduce(
    (sum, t) => sum + t.waitlistCount,
    0,
  );

  const handleToggleWaitlist = (id: string) => {
    setTiers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newVal = !t.waitlistEnabled;
          toast.success(
            `Waitlist ${newVal ? "enabled" : "disabled"} for ${t.name}`,
          );
          return { ...t, waitlistEnabled: newVal };
        }
        return t;
      }),
    );
  };

  const handleCopyCode = (code: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    setCodeCopied(code);
    setTimeout(() => setCodeCopied(null), 2000);
    toast.success("Promo code copied to clipboard!");
  };

  const handleToggleCodeStatus = (id: string) => {
    setDiscountCodes((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newStatus =
            c.status === "active" ? "paused" : "active";
          toast.success(
            `Code ${c.code} ${newStatus === "active" ? "activated" : "paused"}`,
          );
          return {
            ...c,
            status: newStatus as
              | "active"
              | "paused"
              | "expired",
          };
        }
        return c;
      }),
    );
  };

  const handleCreateCode = () => {
    if (!newCode.code.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    if (newCode.appliesTo.length === 0) {
      toast.error("Please select at least one ticket tier");
      return;
    }

    const newCodeEntry = {
      id: Date.now().toString(),
      code: newCode.code.toUpperCase().replace(/\s/g, ""),
      type: newCode.type,
      value: newCode.value,
      appliesTo: newCode.appliesTo,
      redemptions: 0,
      limit: newCode.limit,
      expiresAt: newCode.expiresAt,
      status: "active" as "active" | "paused" | "expired",
    };

    setDiscountCodes((prev) => [...prev, newCodeEntry]);
    toast.success(
      `Promo code ${newCodeEntry.code} created successfully!`,
    );
    setShowCreateCodeModal(false);
    setNewCode({
      code: "",
      type: "percentage",
      value: 10,
      appliesTo: [],
      limit: 100,
      expiresAt: "2026-12-31",
    });
  };

  const handleDeleteCode = (id: string) => {
    const code = discountCodes.find((c) => c.id === id);
    if (code) {
      setDiscountCodes((prev) =>
        prev.filter((c) => c.id !== id),
      );
      toast.success(`Promo code ${code.code} deleted`);
    }
  };

  const handleTierToggle = (tierId: string) => {
    setNewCode((prev) => ({
      ...prev,
      appliesTo: prev.appliesTo.includes(tierId)
        ? prev.appliesTo.filter((id) => id !== tierId)
        : [...prev.appliesTo, tierId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
            {isRSVP ? "Capacity Management" : "Ticket Tiers"}
          </h3>
          <p className="text-[#9caab8] text-sm mt-1">
            {isRSVP
              ? "Manage registration limits and availability."
              : "Manage pricing, inventory, and sales windows for your event."}
          </p>
        </div>
        {!isRSVP && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateCodeModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#121214] transition-all text-[14px]"
            >
              <Tag size={18} />
              Create Promo Code
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10 text-[14px]">
              <Plus size={18} />
              Create Tier
            </button>
          </div>
        )}
      </div>

      {/* Aggregate Stats Bar (Paid only) */}
      {!isRSVP && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular text-[14px]">
              Total Revenue
            </p>
            <p className="font-regular text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mt-1 text-[24px]">
              GH₵{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular text-[14px]">
              Tickets Sold
            </p>
            <p className="font-regular text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mt-1 text-[24px]">
              {totalSold.toLocaleString()} /{" "}
              {totalCapacity.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular text-[14px]">
              Active Tiers
            </p>
            <p className="font-regular text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mt-1 text-[24px]">
              {
                tiers.filter(
                  (t) =>
                    t.status === "Active" ||
                    t.status === "Almost Sold Out",
                ).length
              }{" "}
              of {tiers.length}
            </p>
          </div>
          <div className="bg-[#232326] p-4 rounded-xl border border-[#424249]">
            <p className="text-[#9caab8] font-regular text-[14px]">
              On Waitlists
            </p>
            <p className="font-regular text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mt-1 text-[24px]">
              {totalWaitlist}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {isRSVP ? (
          <div className="bg-[#232326] p-6 rounded-2xl hover:border-[#feff1c]/50 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[#121214] rounded-lg">
                <Users size={20} className="text-[#feff1c]" />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-[#767686] hover:text-[#f8f9fa] transition-colors">
                  <Edit2 size={14} />
                </button>
              </div>
            </div>

            <h4 className="text-[#f8f9fa] group-hover:text-[#feff1c] transition-colors">
              Total Event Capacity
            </h4>
            <p className="text-2xl font-bold text-[#f8f9fa] mt-1">
              {capacity} Spots
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9caab8]">
                  Registration Progress
                </span>
                <span className="text-[#f8f9fa] font-bold">
                  {registrations} / {capacity}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#121214] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#feff1c]"
                  style={{
                    width: `${(registrations / capacity) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider bg-green-500/10 text-green-500">
                  Open for RSVP
                </span>
              </div>
            </div>
          </div>
        ) : (
          tiers.map((tier) => {
            const fillPct = (tier.sold / tier.capacity) * 100;
            const salesWindow = getSalesWindowLabel(tier);
            const feeAmount = tier.price * 0.05;

            return (
              <div
                key={tier.id}
                className="bg-[#232326] rounded-2xl border border-[#424249] hover:border-[#feff1c]/30 transition-all overflow-hidden group"
              >
                {/* Tier Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-[#424249]">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-[#121214] rounded-xl">
                      <TicketIcon
                        size={22}
                        className="text-[#feff1c]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-[#f8f9fa] group-hover:text-[#feff1c] transition-colors text-[14px]">
                          {tier.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${getStatusStyle(tier.status)}`}
                        >
                          {tier.status}
                        </span>
                      </div>
                      <p className="text-2xl font-regular text-[#f8f9fa] mt-0.5 font-['Kamerik205:Regular_3',sans-serif]">
                        GH₵{tier.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#767686] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-lg transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-[#767686] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-5">
                  {/* Inventory Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#9caab8] font-bold">
                        Inventory
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#f8f9fa] font-bold">
                          {tier.sold.toLocaleString()} /{" "}
                          {tier.capacity.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#9caab8]">
                          ({fillPct.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-[#121214] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ease-out ${
                          fillPct >= 100
                            ? "bg-red-500"
                            : fillPct >= 90
                              ? "bg-amber-500"
                              : "bg-[#feff1c]"
                        }`}
                        style={{
                          width: `${Math.min(fillPct, 100)}%`,
                        }}
                      />
                    </div>
                    {tier.sold >= tier.capacity && (
                      <div className="flex items-center gap-2 mt-2">
                        <ShieldCheck
                          size={14}
                          className="text-red-500"
                        />
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                          Sales blocked — inventory limit
                          reached
                        </span>
                      </div>
                    )}
                    {tier.sold >= tier.capacity * 0.9 &&
                      tier.sold < tier.capacity && (
                        <div className="flex items-center gap-2 mt-2">
                          <AlertTriangle
                            size={14}
                            className="text-amber-500"
                          />
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                            Only {tier.capacity - tier.sold}{" "}
                            tickets remaining
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sales Window */}
                    <div className="bg-[#121214] p-3.5 rounded-xl border border-[#424249]">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar
                          size={14}
                          className="text-[#767686]"
                        />
                        <span className="text-[10px] font-bold text-[#767686] uppercase tracking-wider">
                          Sales Window
                        </span>
                      </div>
                      <p className="text-xs text-[#f8f9fa] font-bold">
                        {formatDate(tier.salesStart)}
                      </p>
                      <p className="text-[10px] text-[#9caab8]">
                        to {formatDate(tier.salesEnd)}
                      </p>
                      <p
                        className={`text-[10px] font-bold mt-1.5 ${salesWindow.color}`}
                      >
                        {salesWindow.label}
                      </p>
                    </div>

                    {/* Fee Handling */}
                    <div className="bg-[#121214] p-3.5 rounded-xl border border-[#424249]">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp
                          size={14}
                          className="text-[#767686]"
                        />
                        <span className="text-[10px] font-bold text-[#767686] uppercase tracking-wider">
                          Platform Fee
                        </span>
                      </div>
                      {tier.absorbFee ? (
                        <>
                          <p className="text-xs font-bold text-[#f8f9fa]">
                            Absorbed by you
                          </p>
                          <p className="text-[10px] text-[#9caab8] mt-0.5">
                            You pay GH₵{feeAmount.toFixed(2)}{" "}
                            per ticket (5%)
                          </p>
                          <p className="text-[10px] text-[#9caab8]">
                            Attendee pays: GH₵
                            {tier.price.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-[#f8f9fa] font-bold">
                            Passed to attendee
                          </p>
                          <p className="text-[10px] text-[#9caab8] mt-0.5">
                            Attendee pays: GH₵
                            {(tier.price + feeAmount).toFixed(
                              2,
                            )}
                          </p>
                          <p className="text-[10px] text-[#9caab8]">
                            Includes GH₵{feeAmount.toFixed(2)}{" "}
                            fee (5%)
                          </p>
                        </>
                      )}
                    </div>

                    {/* Revenue */}
                    <div className="bg-[#121214] p-3.5 rounded-xl border border-[#424249]">
                      <div className="flex items-center gap-2 mb-2">
                        <TicketIcon
                          size={14}
                          className="text-[#767686]"
                        />
                        <span className="text-[10px] font-bold text-[#767686] uppercase tracking-wider">
                          Revenue
                        </span>
                      </div>
                      <p className="text-xs text-[#f8f9fa] font-bold">
                        GH₵
                        {(
                          tier.sold * tier.price
                        ).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#9caab8] mt-0.5">
                        {tier.absorbFee
                          ? `Net: GH₵${(tier.sold * (tier.price - feeAmount)).toLocaleString()}`
                          : `Full amount to you`}
                      </p>
                      <p className="text-[10px] text-[#9caab8]">
                        {tier.sold} × GH₵{tier.price}
                      </p>
                    </div>

                    {/* Waitlist */}
                    <div
                      className={`p-3.5 rounded-xl border ${
                        tier.waitlistEnabled
                          ? "bg-[#feff1c]/5 border-[#feff1c]/20"
                          : "bg-[#121214] border-[#424249]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <UserPlus
                            size={14}
                            className={
                              tier.waitlistEnabled
                                ? "text-[#feff1c]"
                                : "text-[#767686]"
                            }
                          />
                          <span className="text-[10px] font-bold text-[#767686] uppercase tracking-wider">
                            Waitlist
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleToggleWaitlist(tier.id)
                          }
                          className="transition-colors"
                          title={
                            tier.waitlistEnabled
                              ? "Disable waitlist"
                              : "Enable waitlist"
                          }
                        >
                          {tier.waitlistEnabled ? (
                            <ToggleRight
                              size={20}
                              className="text-[#feff1c]"
                            />
                          ) : (
                            <ToggleLeft
                              size={20}
                              className="text-[#767686] hover:text-[#9caab8]"
                            />
                          )}
                        </button>
                      </div>
                      {tier.waitlistEnabled ? (
                        <>
                          <p className="text-xs text-[#feff1c] font-bold">
                            {tier.waitlistCount} on waitlist
                          </p>
                          <p className="text-[10px] text-[#9caab8] mt-0.5">
                            {tier.status === "Sold Out"
                              ? "Accepting waitlist signups"
                              : "Pre-sale waitlist active"}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-[#767686] font-bold">
                            Disabled
                          </p>
                          <p className="text-[10px] text-[#9caab8] mt-0.5">
                            Enable to allow signups before sales
                            open or after sellout
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Promo Codes Section */}
      {!isRSVP && (
        <div className="bg-[#121214] p-6 rounded-2xl border border-[#424249] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#feff1c]/10 rounded-2xl flex items-center justify-center text-[#feff1c]">
              <Tag size={24} />
            </div>
            <div>
              <h4 className="font-bold text-[#f8f9fa]">
                Promo Codes
              </h4>
              <p className="text-[#9caab8] text-sm">
                Create discounts and special offers for your
                attendees.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDiscountModal(true)}
            className="px-6 py-2.5 bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#121214] transition-all"
          >
            Manage Coupons
          </button>
        </div>
      )}

      {/* Inventory Protection Footer */}
      {!isRSVP && (
        <div className="flex items-start gap-3 p-4 bg-[#232326] border border-[#424249] rounded-xl">
          <ShieldCheck
            size={18}
            className="text-[#feff1c] shrink-0 mt-0.5"
          />
          <div>
            <p className="text-xs font-bold text-[#f8f9fa]">
              Inventory Protection Active
            </p>
            <p className="text-[10px] text-[#9caab8] mt-0.5 leading-relaxed">
              Ticket sales are automatically blocked when a tier
              reaches its inventory limit. Availability is
              updated in real time across your dashboard and
              public event page. Waitlist-enabled tiers continue
              accepting signups even after sellout.
            </p>
          </div>
        </div>
      )}

      {/* Discount Codes Management Modal */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                  Promo Codes
                </h2>
                <p className="text-sm text-[#9caab8] mt-1">
                  Create and manage discount codes for your
                  event
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDiscountModal(false)}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                <p className="text-xs text-[#767686] font-bold uppercase tracking-wider">
                  Active Codes
                </p>
                <p className="text-2xl font-bold text-[#f8f9fa] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                  {
                    discountCodes.filter(
                      (c) => c.status === "active",
                    ).length
                  }
                </p>
              </div>
              <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                <p className="text-xs text-[#767686] font-bold uppercase tracking-wider">
                  Total Redemptions
                </p>
                <p className="text-2xl font-bold text-[#f8f9fa] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                  {discountCodes.reduce(
                    (sum, c) => sum + c.redemptions,
                    0,
                  )}
                </p>
              </div>
              <div className="bg-[#121214] p-4 rounded-xl border border-[#424249]">
                <p className="text-xs text-[#767686] font-bold uppercase tracking-wider">
                  Discount Revenue
                </p>
                <p className="text-2xl font-bold text-[#feff1c] mt-1 font-['Kamerik205:Regular_3',sans-serif]">
                  GH₵12,450
                </p>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={() => {
                setShowCreateCodeModal(true);
                setShowDiscountModal(false);
              }}
              className="w-full mb-6 flex items-center justify-center gap-2 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
            >
              <Plus size={18} />
              Create New Promo Code
            </button>

            {/* Codes List */}
            <div className="space-y-3">
              {discountCodes.length === 0 ? (
                <div className="text-center py-12">
                  <Tag
                    size={48}
                    className="mx-auto text-[#424249] mb-4"
                  />
                  <p className="text-[#9caab8] text-sm">
                    No promo codes yet. Create one to get
                    started!
                  </p>
                </div>
              ) : (
                discountCodes.map((code) => {
                  const tierNames = code.appliesTo
                    .map(
                      (id) =>
                        tiers.find((t) => t.id === id)?.name ||
                        "",
                    )
                    .filter(Boolean)
                    .join(", ");
                  const usagePct =
                    (code.redemptions / code.limit) * 100;

                  return (
                    <div
                      key={code.id}
                      className="bg-[#121214] p-5 rounded-xl border border-[#424249] hover:border-[#feff1c]/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#232326] border border-[#424249] rounded-lg">
                              <Tag
                                size={14}
                                className="text-[#feff1c]"
                              />
                              <code className="text-sm font-bold text-[#f8f9fa]">
                                {code.code}
                              </code>
                            </div>
                            <button
                              onClick={() =>
                                handleCopyCode(code.code)
                              }
                              className="p-1.5 text-[#767686] hover:text-[#feff1c] hover:bg-[#232326] rounded-lg transition-all"
                            >
                              {codeCopied === code.code ? (
                                <Check size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${
                                code.status === "active"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : code.status === "paused"
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                              }`}
                            >
                              {code.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                            <div>
                              <p className="text-[10px] text-[#767686] font-bold uppercase tracking-wider">
                                Discount
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                {code.type === "percentage" ? (
                                  <Percent
                                    size={14}
                                    className="text-[#feff1c]"
                                  />
                                ) : (
                                  <DollarSign
                                    size={14}
                                    className="text-[#feff1c]"
                                  />
                                )}
                                <p className="text-sm font-bold text-[#f8f9fa]">
                                  {code.type === "percentage"
                                    ? `${code.value}%`
                                    : `GH₵${code.value}`}{" "}
                                  off
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#767686] font-bold uppercase tracking-wider">
                                Usage
                              </p>
                              <p className="text-sm font-bold text-[#f8f9fa] mt-0.5">
                                {code.redemptions} /{" "}
                                {code.limit}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#767686] font-bold uppercase tracking-wider">
                                Expires
                              </p>
                              <p className="text-sm font-bold text-[#f8f9fa] mt-0.5">
                                {formatDate(code.expiresAt)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#767686] font-bold uppercase tracking-wider">
                                Applies To
                              </p>
                              <p
                                className="text-xs text-[#9caab8] mt-0.5 truncate"
                                title={tierNames}
                              >
                                {tierNames}
                              </p>
                            </div>
                          </div>

                          {/* Usage Progress */}
                          <div>
                            <div className="h-1.5 w-full bg-[#232326] rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all ${usagePct >= 90 ? "bg-amber-500" : "bg-[#feff1c]"}`}
                                style={{
                                  width: `${Math.min(usagePct, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleToggleCodeStatus(code.id)
                            }
                            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                              code.status === "active"
                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20"
                                : "bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20"
                            }`}
                          >
                            {code.status === "active"
                              ? "Pause"
                              : "Activate"}
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCode(code.id)
                            }
                            className="p-2 text-[#767686] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Code Modal */}
      {showCreateCodeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
                Create Promo Code
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowCreateCodeModal(false);
                }}
                className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Code Input */}
              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                  Promo Code{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCode.code}
                  onChange={(e) =>
                    setNewCode((prev) => ({
                      ...prev,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="SUMMER2026"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                />
                <p className="text-xs text-[#767686] mt-1">
                  Customers will enter this code at checkout
                </p>
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Discount Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setNewCode((prev) => ({
                          ...prev,
                          type: "percentage",
                        }))
                      }
                      className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                        newCode.type === "percentage"
                          ? "bg-[#feff1c] text-[#121214]"
                          : "bg-[#121214] text-[#f8f9fa] border border-[#424249] hover:border-[#feff1c]/30"
                      }`}
                    >
                      Percentage
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewCode((prev) => ({
                          ...prev,
                          type: "fixed",
                        }))
                      }
                      className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                        newCode.type === "fixed"
                          ? "bg-[#feff1c] text-[#121214]"
                          : "bg-[#121214] text-[#f8f9fa] border border-[#424249] hover:border-[#feff1c]/30"
                      }`}
                    >
                      Fixed Amount
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    {newCode.type === "percentage"
                      ? "Percentage Off"
                      : "Amount Off (GH₵)"}
                  </label>
                  <input
                    type="number"
                    value={newCode.value}
                    onChange={(e) =>
                      setNewCode((prev) => ({
                        ...prev,
                        value: parseInt(e.target.value) || 0,
                      }))
                    }
                    min="1"
                    max={
                      newCode.type === "percentage"
                        ? "100"
                        : undefined
                    }
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>
              </div>

              {/* Applies To */}
              <div>
                <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-3">
                  Apply To Ticket Tiers{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleTierToggle(tier.id)}
                      className={`w-full px-4 py-3 rounded-xl border text-left transition-all ${
                        newCode.appliesTo.includes(tier.id)
                          ? "bg-[#feff1c]/5 border-[#feff1c]"
                          : "bg-[#121214] border-[#424249] hover:border-[#feff1c]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#f8f9fa]">
                            {tier.name}
                          </p>
                          <p className="text-xs text-[#9caab8] mt-0.5">
                            GH₵{tier.price}
                          </p>
                        </div>
                        {newCode.appliesTo.includes(
                          tier.id,
                        ) && (
                          <Check
                            size={18}
                            className="text-[#feff1c]"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Usage Limit & Expiry */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    value={newCode.limit}
                    onChange={(e) =>
                      setNewCode((prev) => ({
                        ...prev,
                        limit: parseInt(e.target.value) || 0,
                      }))
                    }
                    min="1"
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newCode.expiresAt}
                    onChange={(e) =>
                      setNewCode((prev) => ({
                        ...prev,
                        expiresAt: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateCodeModal(false)}
                  className="flex-1 px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateCode}
                  className="flex-1 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
                >
                  Create Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};