import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownToLine,
  History,
  Download,
  ArrowRightLeft,
  Sparkles,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  AlertCircle,
  DollarSign,
  Send,
  TrendingUp,
  Search,
  Filter,
  Edit,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import svgPaths from '../../imports/svg-jsi5eiabg6';

type TabType = 'payout' | 'history';

interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  destination: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export const PaymentsPayoutsView = () => {
  const [activeTab, setActiveTab] = useState<TabType>('payout');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('mtn');
  const [walletTransferAmount, setWalletTransferAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const availableBalance = 45680.50;
  const walletBalance = 3200.00;
  const pendingBalance = 8500.00;

  const payoutHistory: PayoutRecord[] = [
    {
      id: 'PO-001',
      date: '2026-03-10',
      amount: 12500.00,
      method: 'MTN Mobile Money',
      destination: '+233 24 555 1234',
      status: 'completed',
      reference: 'MTN20260310-12500',
    },
    {
      id: 'PO-002',
      date: '2026-03-08',
      amount: 8750.00,
      method: 'Bank Transfer',
      destination: 'GCB Bank - ****5678',
      status: 'completed',
      reference: 'GCB20260308-8750',
    },
    {
      id: 'PO-003',
      date: '2026-03-05',
      amount: 15200.00,
      method: 'MTN Mobile Money',
      destination: '+233 24 555 1234',
      status: 'pending',
      reference: 'MTN20260305-15200',
    },
    {
      id: 'PO-004',
      date: '2026-03-01',
      amount: 5400.00,
      method: 'Bank Transfer',
      destination: 'GCB Bank - ****5678',
      status: 'failed',
      reference: 'GCB20260301-5400',
    },
  ];

  const handleInitiatePayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (parseFloat(payoutAmount) > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }
    toast.success('Payout initiated successfully!');
    setPayoutAmount('');
  };

  const handleWalletTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletTransferAmount || parseFloat(walletTransferAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (parseFloat(walletTransferAmount) > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }
    toast.success(`GH₵${parseFloat(walletTransferAmount).toLocaleString()} transferred to Promo Wallet!`);
    setWalletTransferAmount('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-2">
            <div className="size-[7px] rounded-full bg-green-500" />
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Completed</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-2">
            <div className="size-[7px] rounded-full bg-amber-500" />
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-2">
            <div className="size-[7px] rounded-full bg-red-500" />
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Kamerik205:Regular_3',sans-serif] text-[32px] leading-[41.6px] text-[#f8f9fa]">
            Payments & Payouts
          </h1>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] leading-[18.2px] text-[#9caab8] mt-2">
            Manage your earnings, initiate payouts, and transfer to your promo wallet
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-[16px] items-start relative w-full">
        <div className="bg-[#232326] flex-[1_0_0] min-h-px min-w-[158px] relative rounded-[8px]">
          <div aria-hidden="true" className="absolute border-[#424249] border border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] not-italic p-[24px] relative text-[#f8f9fa] w-full">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-[#feff1c]" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] relative shrink-0 text-[14px] whitespace-nowrap">Available Balance</p>
            </div>
            <p className="font-['Kamerik205:Regular_3',sans-serif] leading-[31px] min-w-full relative shrink-0 text-[24px] w-[min-content]">GH₵{availableBalance.toLocaleString()}</p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686]">Ready to withdraw</p>
          </div>
        </div>

        <div className="bg-[#232326] flex-[1_0_0] min-h-px min-w-[158px] relative rounded-[8px]">
          <div aria-hidden="true" className="absolute border-[#424249] border border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] not-italic p-[24px] relative text-[#f8f9fa] w-full">
            <div className="flex items-center gap-2">
              <Wallet size={18} className="text-[#feff1c]" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] relative shrink-0 text-[14px] whitespace-nowrap">Promo Wallet</p>
            </div>
            <p className="font-['Kamerik205:Regular_3',sans-serif] leading-[31px] min-w-full relative shrink-0 text-[24px] w-[min-content]">GH₵{walletBalance.toLocaleString()}</p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686]">For promo features</p>
          </div>
        </div>

        <div className="bg-[#232326] flex-[1_0_0] min-h-px min-w-[158px] relative rounded-[8px]">
          <div aria-hidden="true" className="absolute border-[#424249] border border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] not-italic p-[24px] relative text-[#f8f9fa] w-full">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#feff1c]" />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] relative shrink-0 text-[14px] whitespace-nowrap">Pending</p>
            </div>
            <p className="font-['Kamerik205:Regular_3',sans-serif] leading-[31px] min-w-full relative shrink-0 text-[24px] w-[min-content]">GH₵{pendingBalance.toLocaleString()}</p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686]">Processing</p>
          </div>
        </div>
      </div>

      {/* Standalone Tab Navigation */}
      <div className="border-[#424249] border-b-[1px] border-solid relative h-[48px]">
        <div className="relative flex items-start h-full">
          <div
            onClick={() => setActiveTab('payout')}
            className="relative h-full px-[24px] cursor-pointer flex items-center justify-center"
          >
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] whitespace-nowrap ${activeTab === 'payout' ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
              Payout
            </p>
            {activeTab === 'payout' && (
              <div className="absolute bg-[#feff1c] h-[2px] left-0 bottom-0 w-full" />
            )}
          </div>
          <div
            onClick={() => setActiveTab('history')}
            className="relative h-full px-[24px] cursor-pointer flex items-center justify-center"
          >
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] whitespace-nowrap ${activeTab === 'history' ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
              History
            </p>
            {activeTab === 'history' && (
              <div className="absolute bg-[#feff1c] h-[2px] left-0 bottom-0 w-full" />
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'payout' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payout Section */}
            <div className="bg-[#232326] p-6 rounded-[12px] border border-[#424249]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
                  <ArrowDownToLine size={20} />
                </div>
                <div>
                  <h2 className="font-['Kamerik205:Regular_3',sans-serif] text-[18px] leading-[23.4px] text-[#f8f9fa]">
                    Request Payout
                  </h2>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#767686]">
                    Withdraw earnings to your account
                  </p>
                </div>
              </div>

              <form onSubmit={handleInitiatePayout} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Amount (GH₵)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
                  />
                  <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686]">
                    Available: GH₵{availableBalance.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Payout Method
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('mtn')}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        payoutMethod === 'mtn' ? 'bg-[#feff1c]/5 border-[#feff1c]' : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#feff1c] rounded-lg flex items-center justify-center font-bold text-[#121214]">
                          M
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm text-[#f8f9fa]">MTN Mobile Money</p>
                          <p className="text-xs text-[#767686]">+233 24 555 1234</p>
                        </div>
                      </div>
                      {payoutMethod === 'mtn' && <CheckCircle size={18} className="text-[#feff1c]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPayoutMethod('bank')}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        payoutMethod === 'bank' ? 'bg-[#feff1c]/5 border-[#feff1c]' : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                          GCB
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm text-[#f8f9fa]">Bank Transfer</p>
                          <p className="text-xs text-[#767686]">GCB Bank - ****5678</p>
                        </div>
                      </div>
                      {payoutMethod === 'bank' && <CheckCircle size={18} className="text-[#feff1c]" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#feff1c] text-[#121214] px-[24px] py-[12px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowDownToLine size={16} />
                  Request Payout
                </button>
              </form>

              <div className="flex items-start gap-3 p-4 bg-[#121214] border border-[#424249] rounded-xl mt-4">
                <AlertCircle size={16} className="text-[#feff1c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#f8f9fa]">Payout Processing Time</p>
                  <p className="text-[10px] text-[#767686] mt-1 leading-relaxed">
                    MTN Mobile Money: Instant | Bank Transfer: 1-3 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Transfer Section */}
            <div className="bg-[#232326] p-6 rounded-[12px] border border-[#424249]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
                  <ArrowRightLeft size={20} />
                </div>
                <div>
                  <h2 className="font-['Kamerik205:Regular_3',sans-serif] text-[18px] leading-[23.4px] text-[#f8f9fa]">
                    Transfer to Promo Wallet
                  </h2>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#767686]">
                    Buy promo features & boosts
                  </p>
                </div>
              </div>

              <form onSubmit={handleWalletTransfer} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block">
                    Transfer Amount (GH₵)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={walletTransferAmount}
                    onChange={(e) => setWalletTransferAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-[16px] py-[12px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
                  />
                  <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#767686]">
                    Available: GH₵{availableBalance.toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#feff1c] text-[#121214] px-[24px] py-[12px] rounded-[8px] font-['Kamerik205:Regular_3',sans-serif] font-bold text-[14px] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRightLeft size={16} />
                  Transfer to Wallet
                </button>
              </form>

              {/* Promo Features */}
              <div className="mt-6 space-y-3">
                <p className="font-['Inter:Regular',sans-serif] font-bold text-[12px] text-[#9caab8] uppercase tracking-wider">
                  Available Features
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#121214] rounded-lg border border-[#424249]">
                    <div className="flex items-center gap-3">
                      <Sparkles size={18} className="text-[#feff1c]" />
                      <div>
                        <p className="font-bold text-sm text-[#f8f9fa]">Event Boost</p>
                        <p className="text-xs text-[#767686]">Promote your event</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm text-[#f8f9fa]">GH₵500</p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#121214] rounded-lg border border-[#424249]">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={18} className="text-[#feff1c]" />
                      <div>
                        <p className="font-bold text-sm text-[#f8f9fa]">Featured Listing</p>
                        <p className="text-xs text-[#767686]">Top placement</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm text-[#f8f9fa]">GH₵300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Search and Actions Bar */}
          <div className="h-[42px] relative shrink-0 w-full flex items-center justify-between">
            {/* Search Input */}
            <div className="relative w-[448px]">
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
                <Search size={18} className="text-[#767686]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search payouts..."
                className="w-full h-[42px] pl-[40px] pr-[16px] bg-[#232326] rounded-[14px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[rgba(248,249,250,0.5)] focus:outline-none focus:ring-1 focus:ring-[#feff1c] border border-[#424249] transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-[12px]">
              <button className="bg-[#232326] h-[42px] px-[20px] rounded-[14px] border border-[#424249] hover:border-[#767686] transition-all flex items-center gap-2">
                <Filter size={16} className="text-[#f8f9fa]" />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#f8f9fa] text-[14px]">Filters</span>
              </button>
              <button className="bg-[#feff1c] h-[42px] px-[20px] rounded-[14px] hover:opacity-90 transition-all flex items-center gap-2">
                <Download size={16} className="text-[#121214]" />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#121214] text-[14px]">Export</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#232326] rounded-[8px] border border-[#424249] overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#232326] h-[40px] relative shrink-0 w-full border-b border-[#424249]">
              <div className="flex items-center h-full px-[12px]">
                <div className="flex-[0_0_100px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">ID</p>
                </div>
                <div className="flex-[0_0_120px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Date</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Amount</p>
                </div>
                <div className="flex-1 px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Method</p>
                </div>
                <div className="flex-1 px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Destination</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Status</p>
                </div>
                <div className="flex-[0_0_180px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Reference</p>
                </div>
                <div className="flex-[0_0_140px] px-[12px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">Actions</p>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div>
              {payoutHistory.map((payout, index) => (
                <div
                  key={payout.id}
                  className={`h-[56px] flex items-center px-[12px] hover:bg-[#121214]/50 transition-colors ${
                    index !== 0 ? 'border-t border-[#424249]' : ''
                  }`}
                >
                  <div className="flex-[0_0_100px] px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">
                      {payout.id}
                    </p>
                  </div>
                  <div className="flex-[0_0_120px] px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">
                      {new Date(payout.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">
                      GH₵{payout.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-1 px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#f8f9fa] text-[14px]">
                      {payout.method}
                    </p>
                  </div>
                  <div className="flex-1 px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#9caab8] text-[14px]">
                      {payout.destination}
                    </p>
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    {getStatusBadge(payout.status)}
                  </div>
                  <div className="flex-[0_0_180px] px-[12px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] text-[#767686] text-[12px] font-mono">
                      {payout.reference}
                    </p>
                  </div>
                  <div className="flex-[0_0_140px] px-[12px]">
                    <div className="flex items-center gap-[12px]">
                      <button className="hover:opacity-70 transition-opacity" title="Edit">
                        <Edit size={18} className="text-[#9caab8]" />
                      </button>
                      <button className="hover:opacity-70 transition-opacity" title="Delete">
                        <Trash2 size={18} className="text-[#767686]" />
                      </button>
                      <button className="hover:opacity-70 transition-opacity" title="View Details">
                        <FileText size={18} className="text-[#feff1c]" />
                      </button>
                      <button className="hover:opacity-70 transition-opacity" title="Resend">
                        <Send size={18} className="text-green-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#9caab8]">
              Showing 1-4 of 4 payouts
            </p>
            <div className="flex items-center gap-2">
              <button className="w-[32px] h-[32px] rounded-[8px] border border-[#424249] bg-[#232326] flex items-center justify-center hover:border-[#767686] transition-all disabled:opacity-50" disabled>
                <ChevronLeft size={16} className="text-[#f8f9fa]" />
              </button>
              <button className="w-[32px] h-[32px] rounded-[8px] border border-[#feff1c] bg-[#feff1c]/10 flex items-center justify-center">
                <span className="font-['Inter:Regular',sans-serif] text-[14px] text-[#feff1c] font-bold">1</span>
              </button>
              <button className="w-[32px] h-[32px] rounded-[8px] border border-[#424249] bg-[#232326] flex items-center justify-center hover:border-[#767686] transition-all disabled:opacity-50" disabled>
                <ChevronRight size={16} className="text-[#f8f9fa]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
