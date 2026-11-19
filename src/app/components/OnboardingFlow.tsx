import React, { useState } from 'react';
import {
  Upload,
  Building2,
  User,
  Mail,
  Phone,
  Instagram,
  Shield,
  Wallet,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Check,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

type OnboardingStep = 'account' | 'verification' | 'payout' | 'review';

interface AccountData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  instagram: string;
  logo: File | null;
}

interface VerificationData {
  governmentId: File | null;
  selfie: File | null;
  isRegisteredBusiness: boolean;
  registrationNumber: string;
  tin: string;
}

interface PayoutData {
  payoutMethod: 'bank' | 'momo';
  bankName: string;
  accountName: string;
  accountNumber: string;
  momoNetwork: string;
  momoNumber: string;
  settlementPreference: string;
  agreedToTerms: boolean;
}

interface SignupData {
  email: string;
  businessName: string;
  contactPerson: string;
  phone: string;
}

interface OnboardingFlowProps {
  onComplete?: () => void;
  signupData?: SignupData;
}

export const OnboardingFlow = ({ onComplete, signupData }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('account');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-populate account data from signup
  const [accountData, setAccountData] = useState<AccountData>({
    businessName: signupData?.businessName || '',
    contactPerson: signupData?.contactPerson || '',
    email: signupData?.email || '',
    phone: signupData?.phone || '',
    businessType: '',
    instagram: '',
    logo: null,
  });

  const [verificationData, setVerificationData] = useState<VerificationData>({
    governmentId: null,
    selfie: null,
    isRegisteredBusiness: false,
    registrationNumber: '',
    tin: '',
  });

  const [payoutData, setPayoutData] = useState<PayoutData>({
    payoutMethod: 'momo',
    bankName: '',
    accountName: '',
    accountNumber: '',
    momoNetwork: 'MTN',
    momoNumber: '',
    settlementPreference: 'after-event',
    agreedToTerms: false,
  });

  const steps: { key: OnboardingStep; label: string; icon: React.ReactNode }[] = [
    { key: 'account', label: 'Account', icon: <User size={16} /> },
    { key: 'verification', label: 'Verification', icon: <Shield size={16} /> },
    { key: 'payout', label: 'Payout', icon: <Wallet size={16} /> },
    { key: 'review', label: 'Review', icon: <CheckCircle size={16} /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  const handleContinue = () => {
    if (currentStep === 'account') {
      if (!accountData.businessName || !accountData.contactPerson || !accountData.email || !accountData.phone || !accountData.businessType) {
        toast.error('Please fill in all required fields');
        return;
      }
      setCurrentStep('verification');
    } else if (currentStep === 'verification') {
      if (!verificationData.governmentId) {
        toast.error('Please upload your Government ID');
        return;
      }
      setCurrentStep('payout');
    } else if (currentStep === 'payout') {
      if (!payoutData.agreedToTerms) {
        toast.error('Please agree to the payout and service fee terms');
        return;
      }
      if (payoutData.payoutMethod === 'bank' && (!payoutData.bankName || !payoutData.accountName || !payoutData.accountNumber)) {
        toast.error('Please fill in all bank details');
        return;
      }
      if (payoutData.payoutMethod === 'momo' && (!payoutData.momoNetwork || !payoutData.momoNumber)) {
        toast.error('Please fill in all Mobile Money details');
        return;
      }
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep === 'verification') setCurrentStep('account');
    else if (currentStep === 'payout') setCurrentStep('verification');
    else if (currentStep === 'review') setCurrentStep('payout');
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast.success('Your account has been submitted for approval!');
    if (onComplete) onComplete();
  };

  const handleFileUpload = (field: keyof VerificationData | 'logo', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'logo') {
        setAccountData(prev => ({ ...prev, logo: file }));
        toast.success('Logo uploaded successfully');
      } else {
        setVerificationData(prev => ({ ...prev, [field]: file }));
        toast.success(`${field === 'governmentId' ? 'Government ID' : 'Selfie'} uploaded successfully`);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#121214] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-[#232326] rounded-2xl border border-[#424249] p-12 text-center">
          <div className="w-20 h-20 bg-[#feff1c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-[#feff1c]" />
          </div>
          <h1 className="text-3xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mb-4">
            You're Almost Live
          </h1>
          <p className="text-[#9caab8] text-lg mb-6">
            Your account is under review. You'll receive approval within 24 hours.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <AlertCircle size={16} className="text-amber-500" />
            <span className="text-amber-500 text-sm font-bold">Under Review</span>
          </div>
          <div className="mt-8 pt-8 border-t border-[#424249]">
            <p className="text-[#767686] text-sm mb-4">
              We'll send a confirmation email to <span className="text-[#feff1c]">{accountData.email}</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:border-[#feff1c] transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121214] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      index < currentStepIndex
                        ? 'bg-[#feff1c] border-[#feff1c] text-[#121214]'
                        : index === currentStepIndex
                        ? 'bg-[#feff1c]/10 border-[#feff1c] text-[#feff1c]'
                        : 'bg-[#232326] border-[#424249] text-[#767686]'
                    }`}
                  >
                    {index < currentStepIndex ? <Check size={20} /> : step.icon}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      index <= currentStepIndex ? 'text-[#f8f9fa]' : 'text-[#767686]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[1px] mb-6 transition-all ${
                      index < currentStepIndex ? 'bg-[#feff1c]' : 'bg-[#424249]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#232326] rounded-2xl border border-[#424249] p-8">
          {/* SCREEN 1: Account Setup */}
          {currentStep === 'account' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mb-2">
                  Create Your Organizer Account
                </h1>
                <p className="text-[#9caab8]">
                  Start selling in minutes. We'll guide you through setup and payouts.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Business / Organizer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={accountData.businessName}
                    onChange={(e) => setAccountData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="e.g. Strictly Soul Ghana"
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={accountData.contactPerson}
                    onChange={(e) => setAccountData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="organizer@events.gh"
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                  <p className="text-xs text-[#767686] mt-1">This will receive ticket sales notifications.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={accountData.phone}
                    onChange={(e) => setAccountData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+233 24 123 4567"
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  />
                  <p className="text-xs text-[#767686] mt-1">Used for payout and security verification.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={accountData.businessType}
                    onChange={(e) => setAccountData(prev => ({ ...prev, businessType: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  >
                    <option value="">Select business type</option>
                    <option value="event-organizer">Event Organizer</option>
                    <option value="venue">Venue</option>
                    <option value="promoter">Promoter</option>
                    <option value="festival">Festival</option>
                    <option value="corporate">Corporate Host</option>
                    <option value="community">Community / Club</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Instagram (Optional)
                  </label>
                  <div className="relative">
                    <Instagram size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" />
                    <input
                      type="text"
                      value={accountData.instagram}
                      onChange={(e) => setAccountData(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="@yourusername"
                      className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                    />
                  </div>
                  <p className="text-xs text-[#767686] mt-1">Helps us verify your audience and event history.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Logo Upload
                  </label>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] hover:border-[#feff1c] transition-all cursor-pointer">
                    <Upload size={18} className="text-[#feff1c]" />
                    <span className="font-bold text-sm">
                      {accountData.logo ? accountData.logo.name : 'Upload Logo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('logo', e)}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-[#767686] mt-1">Appears on your event pages.</p>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: Verification */}
          {currentStep === 'verification' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mb-2">
                  Verify Your Identity
                </h1>
                <p className="text-[#9caab8]">
                  This protects your buyers and ensures smooth payouts.
                </p>
              </div>

              <div className="space-y-6">
                {/* Identity Upload */}
                <div>
                  <h3 className="text-sm font-bold text-[#f8f9fa] mb-4">Identity</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Upload Government ID <span className="text-red-500">*</span>
                      </label>
                      <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] hover:border-[#feff1c] transition-all cursor-pointer">
                        <Upload size={18} className="text-[#feff1c]" />
                        <span className="font-bold text-sm">
                          {verificationData.governmentId ? verificationData.governmentId.name : 'Upload ID'}
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('governmentId', e)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-[#767686] mt-1">Ghana Card, Passport, or Driver's License.</p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Optional Selfie Upload
                      </label>
                      <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] hover:border-[#feff1c] transition-all cursor-pointer">
                        <Upload size={18} className="text-[#feff1c]" />
                        <span className="font-bold text-sm">
                          {verificationData.selfie ? verificationData.selfie.name : 'Upload Selfie'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('selfie', e)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-[#767686] mt-1">Helps speed up approval.</p>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <h3 className="text-sm font-bold text-[#f8f9fa] mb-4">Business Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Are you a registered business?
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setVerificationData(prev => ({ ...prev, isRegisteredBusiness: true }))}
                          className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                            verificationData.isRegisteredBusiness
                              ? 'bg-[#feff1c] text-[#121214]'
                              : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setVerificationData(prev => ({ ...prev, isRegisteredBusiness: false }))}
                          className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                            !verificationData.isRegisteredBusiness
                              ? 'bg-[#feff1c] text-[#121214]'
                              : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {verificationData.isRegisteredBusiness ? (
                      <>
                        <div>
                          <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                            Business Registration Number
                          </label>
                          <input
                            type="text"
                            value={verificationData.registrationNumber}
                            onChange={(e) => setVerificationData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                            placeholder="Enter registration number"
                            className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                            TIN (Optional)
                          </label>
                          <input
                            type="text"
                            value={verificationData.tin}
                            onChange={(e) => setVerificationData(prev => ({ ...prev, tin: e.target.value }))}
                            placeholder="Enter TIN"
                            className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="p-4 bg-[#121214] border border-[#424249] rounded-xl">
                        <p className="text-sm text-[#9caab8]">
                          We'll register you as an <span className="text-[#feff1c] font-bold">Individual Organizer</span>.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-[#feff1c]/5 border border-[#feff1c]/20 rounded-xl">
                  <p className="text-sm text-[#9caab8]">
                    <AlertCircle size={16} className="inline mr-2 text-[#feff1c]" />
                    Verification typically takes less than 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: Payout Setup */}
          {currentStep === 'payout' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mb-2">
                  Set Up Your Payout Method
                </h1>
                <p className="text-[#9caab8]">
                  This is where we'll send your ticket revenue.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Preferred Payout Method
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPayoutData(prev => ({ ...prev, payoutMethod: 'bank' }))}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                        payoutData.payoutMethod === 'bank'
                          ? 'bg-[#feff1c] text-[#121214]'
                          : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                      }`}
                    >
                      Bank Transfer
                    </button>
                    <button
                      onClick={() => setPayoutData(prev => ({ ...prev, payoutMethod: 'momo' }))}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                        payoutData.payoutMethod === 'momo'
                          ? 'bg-[#feff1c] text-[#121214]'
                          : 'bg-[#121214] text-[#f8f9fa] border border-[#424249]'
                      }`}
                    >
                      Mobile Money
                    </button>
                  </div>
                </div>

                {payoutData.payoutMethod === 'bank' ? (
                  <>
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={payoutData.bankName}
                        onChange={(e) => setPayoutData(prev => ({ ...prev, bankName: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                      >
                        <option value="">Select bank</option>
                        <option value="gcb">GCB Bank</option>
                        <option value="ecobank">Ecobank Ghana</option>
                        <option value="access">Access Bank</option>
                        <option value="fidelity">Fidelity Bank</option>
                        <option value="absa">Absa Bank Ghana</option>
                        <option value="stanbic">Stanbic Bank</option>
                        <option value="zenith">Zenith Bank</option>
                        <option value="calbank">CalBank</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Account Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={payoutData.accountName}
                        onChange={(e) => setPayoutData(prev => ({ ...prev, accountName: e.target.value }))}
                        placeholder="Account holder name"
                        className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={payoutData.accountNumber}
                        onChange={(e) => setPayoutData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        placeholder="Enter account number"
                        className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Network <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={payoutData.momoNetwork}
                        onChange={(e) => setPayoutData(prev => ({ ...prev, momoNetwork: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                      >
                        <option value="MTN">MTN Mobile Money</option>
                        <option value="Vodafone">Vodafone Cash</option>
                        <option value="AirtelTigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={payoutData.momoNumber}
                        onChange={(e) => setPayoutData(prev => ({ ...prev, momoNumber: e.target.value }))}
                        placeholder="+233 24 123 4567"
                        className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] placeholder:text-[#767686] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs font-bold text-[#9caab8] uppercase tracking-wider block mb-2">
                    Settlement Preference
                  </label>
                  <select
                    value={payoutData.settlementPreference}
                    onChange={(e) => setPayoutData(prev => ({ ...prev, settlementPreference: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
                  >
                    <option value="after-event">After event ends</option>
                    <option value="weekly">Weekly rolling settlement</option>
                    <option value="custom">Custom (subject to approval)</option>
                  </select>
                </div>

                <div className="p-4 bg-[#121214] border border-[#424249] rounded-xl">
                  <h3 className="text-sm font-bold text-[#f8f9fa] mb-2">Service Fee Agreement</h3>
                  <p className="text-sm text-[#9caab8] mb-3">
                    BlacVolta charges <span className="text-[#feff1c] font-bold">2.5%</span> per ticket sold.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payoutData.agreedToTerms}
                      onChange={(e) => setPayoutData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                      className="mt-1 w-4 h-4 accent-[#feff1c]"
                    />
                    <span className="text-sm text-[#f8f9fa]">
                      I agree to the payout and service fee terms.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: Review & Submit */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif] mb-2">
                  Review Your Details
                </h1>
                <p className="text-[#9caab8]">
                  Please confirm all information is correct before submitting.
                </p>
              </div>

              <div className="space-y-4">
                {/* Organizer Summary */}
                <div className="bg-[#121214] border border-[#424249] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#f8f9fa] mb-3 flex items-center gap-2">
                    <Building2 size={16} className="text-[#feff1c]" />
                    Organizer Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Business Name:</span>
                      <span className="text-[#f8f9fa] font-bold">{accountData.businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Contact Person:</span>
                      <span className="text-[#f8f9fa]">{accountData.contactPerson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Email:</span>
                      <span className="text-[#f8f9fa]">{accountData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Phone:</span>
                      <span className="text-[#f8f9fa]">{accountData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Business Type:</span>
                      <span className="text-[#f8f9fa] capitalize">
                        {accountData.businessType.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification Summary */}
                <div className="bg-[#121214] border border-[#424249] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#f8f9fa] mb-3 flex items-center gap-2">
                    <Shield size={16} className="text-[#feff1c]" />
                    Verification Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#767686]">Government ID:</span>
                      <span className="text-green-500 flex items-center gap-1">
                        <Check size={14} />
                        Uploaded
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#767686]">Business Status:</span>
                      <span className="text-[#f8f9fa]">
                        {verificationData.isRegisteredBusiness ? 'Registered Business' : 'Individual Organizer'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payout Summary */}
                <div className="bg-[#121214] border border-[#424249] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#f8f9fa] mb-3 flex items-center gap-2">
                    <Wallet size={16} className="text-[#feff1c]" />
                    Payout Method
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Method:</span>
                      <span className="text-[#f8f9fa] font-bold capitalize">
                        {payoutData.payoutMethod === 'bank' ? 'Bank Transfer' : 'Mobile Money'}
                      </span>
                    </div>
                    {payoutData.payoutMethod === 'bank' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-[#767686]">Bank:</span>
                          <span className="text-[#f8f9fa]">{payoutData.bankName.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#767686]">Account:</span>
                          <span className="text-[#f8f9fa]">{payoutData.accountNumber}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-[#767686]">Network:</span>
                          <span className="text-[#f8f9fa]">{payoutData.momoNetwork}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#767686]">Number:</span>
                          <span className="text-[#f8f9fa]">{payoutData.momoNumber}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#767686]">Settlement:</span>
                      <span className="text-[#f8f9fa] capitalize">
                        {payoutData.settlementPreference.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#121214] border border-[#424249] rounded-xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 accent-[#feff1c]"
                      required
                    />
                    <span className="text-sm text-[#f8f9fa]">
                      I confirm this business complies with local laws and refund policies.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-[#424249]">
            {currentStep !== 'account' && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-[#121214] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#232326] transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleContinue}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
            >
              {currentStep === 'review' ? 'Submit for Approval' : 'Continue'}
              
            </button>
          </div>

          {/* Security Reassurance */}
          {currentStep === 'account' && (
            <div className="mt-6 pt-6 border-t border-[#424249] flex items-center justify-center gap-2 text-sm text-[#767686]">
              <Lock size={14} className="text-[#feff1c]" />
              Secure onboarding. Your information is encrypted and protected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};