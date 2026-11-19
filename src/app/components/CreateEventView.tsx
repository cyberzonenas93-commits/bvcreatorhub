import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Save, 
  Send, 
  ArrowLeft,
  Clock,
  Ticket,
  Users,
  CheckCircle2,
  XCircle,
  PauseCircle,
  AlertCircle,
  Plus,
  Trash2,
  Repeat,
  ChevronDown,
  ChevronUp,
  Info,
  ListOrdered,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  UserPlus,
  Share2,
  Copy,
  Check,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TicketTier {
  name: string;
  price: number;
  capacity: number;
  salesStartDate: string;
  salesEndDate: string;
  absorbFee: boolean;
  waitlistEnabled: boolean;
}

interface CreateEventForm {
  name: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  locationType: 'physical' | 'virtual';
  location: string;
  eventType: 'free' | 'rsvp' | 'ticketed';
  mediaUrl: string;
  isRecurring: boolean;
  recurrenceFrequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  recurrenceDate?: string;
  ticketTiers: TicketTier[];
  refundPolicy: 'allow' | 'deny' | 'review';
}

interface CreateEventViewProps {
  onBack: () => void;
  onSave: (data: any, status: 'Draft' | 'Live' | 'Ended' | 'Cancelled') => void;
  initialData?: any;
}

export const CreateEventView = ({ onBack, onSave, initialData }: CreateEventViewProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // In a real app, this would come from the event status
  const hasSales = initialData?.ticketTiers?.some((t: any) => t.sold > 0) || false;

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateEventForm>({
    defaultValues: initialData || {
      locationType: 'physical',
      eventType: 'ticketed',
      isRecurring: false,
      recurrenceFrequency: 'weekly',
      ticketTiers: [{ name: 'General', price: 0, capacity: 100, salesStartDate: '', salesEndDate: '', absorbFee: false, waitlistEnabled: false }],
      refundPolicy: 'review'
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ticketTiers"
  });

  const locationType = watch('locationType');
  const eventType = watch('eventType');
  const isRecurring = watch('isRecurring');
  const eventName = watch('name');

  // Generate event link (mock URL for demonstration)
  const eventLink = `https://events.gh/e/${initialData?.id || 'new-event'}`;

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
      }
    } catch (fallbackErr) {
      console.error('Failed to copy:', fallbackErr);
    }
  };

  const handleShare = (platform: string) => {
    const text = `Check out ${eventName || 'this event'}!`;
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

  const onSubmit = (data: CreateEventForm) => {
    onSave(data, 'Live');
  };

  const handleSaveDraft = () => {
    const data = watch();
    onSave(data, 'Draft');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#232326] rounded-xl transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
              {initialData ? 'Edit Event' : 'Create Event'}
            </h1>
            <p className="text-[#9caab8]">Complete the details below to set up your event.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {initialData && (
            <button 
              onClick={() => setShowShareModal(true)}
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#121214] transition-all"
            >
              <Share2 size={18} />
              Promote
            </button>
          )}
          <button 
            onClick={handleSaveDraft}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-xl font-bold hover:bg-[#121214] transition-all"
          >
            <Save size={18} />
            Save as Draft
          </button>
          <button 
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#feff1c] text-[#121214] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[#feff1c]/10"
          >
            <Send size={18} />
            Publish Event
          </button>
        </div>
      </div>

      <form className="space-y-8">
        {/* Section: Media */}
        <section className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
              <ImageIcon size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Event Media</h2>
          </div>

          <div className="border border-dashed border-[#424249] rounded-2xl p-12 text-center hover:border-[#feff1c]/50 transition-all group cursor-pointer">
            <div className="w-16 h-16 bg-[#121214] rounded-full flex items-center justify-center mx-auto mb-4 text-[#767686] group-hover:text-[#feff1c] transition-colors">
              <ImageIcon size={32} />
            </div>
            <h3 className="font-bold text-[#f8f9fa]">Upload Event Banner</h3>
            <p className="text-[#9caab8] text-sm mt-2">Drag and drop or click to browse (JPG, PNG, max 10MB)</p>
            <p className="text-[#767686] text-xs mt-1">Recommended size: 1200 x 630 pixels</p>
          </div>
        </section>

        {/* Section: Basic Information */}
        <section className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
              <Type size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Event Name</label>
              <input 
                {...register('name', { required: 'Event name is required' })}
                type="text" 
                placeholder="e.g. Afrochella 2026"
                className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all"
              />
              {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Event Description</label>
              <textarea 
                {...register('description', { required: 'Description is required' })}
                rows={4}
                placeholder="Describe your event to potential attendees..."
                className="w-full px-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] focus:ring-1 focus:ring-[#feff1c]/20 transition-all resize-none"
              />
              {errors.description && <p className="text-red-500 text-xs font-bold">{errors.description.message}</p>}
            </div>
          </div>
        </section>

        {/* Section: Date & Time + Recurrence */}
        <section className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
                <Clock size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Date & Time</h2>
            </div>
            
            <div className="bg-[#232326] p-[4px] rounded-[12px] border border-[#424249] flex items-center">
              <button
                type="button"
                onClick={() => setValue('isRecurring', false)}
                className={`flex items-center justify-center px-[16px] py-[8px] rounded-[8px] text-[14px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  !isRecurring ? 'bg-[#424249] text-[#f8f9fa]' : 'text-[#f8f9fa] hover:text-[#f8f9fa]/80'
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => setValue('isRecurring', true)}
                className={`flex items-center justify-center px-[16px] py-[8px] rounded-[8px] text-[14px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isRecurring ? 'bg-[#424249] text-[#f8f9fa]' : 'text-[#f8f9fa] hover:text-[#f8f9fa]/80'
                }`}
              >
                Recurring
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                  <input 
                    {...register('startDate', { required: true })}
                    type="date" 
                    className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                  <input 
                    {...register('startTime', { required: true })}
                    type="time" 
                    className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                  <input 
                    {...register('endDate', { required: true })}
                    type="date" 
                    className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                  <input 
                    {...register('endTime', { required: true })}
                    type="time" 
                    className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                  />
                </div>
              </div>
            </div>

            {isRecurring && (
              <div className="p-6 bg-[#121214] border border-[#424249] rounded-2xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 text-[#feff1c] mb-2">
                  <Repeat size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Recurrence Settings</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['once', 'daily', 'weekly', 'monthly', 'yearly'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setValue('recurrenceFrequency', freq)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        watch('recurrenceFrequency') === freq 
                          ? 'bg-[#feff1c]/5 border-[#feff1c] text-[#f8f9fa]' 
                          : 'bg-[#232326] border-[#424249] text-[#9caab8] hover:border-[#767686]'
                      }`}
                    >
                      <span className="text-sm font-bold capitalize">{freq}</span>
                    </button>
                  ))}
                </div>
                {watch('recurrenceFrequency') === 'once' && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Recurrence Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                      <input 
                        {...register('recurrenceDate', { required: true })}
                        type="date" 
                        className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Section: Event Type & Pricing */}
        <section className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
              <Ticket size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Event Type</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { id: 'free', label: 'Free Event', desc: 'No tickets or cost', icon: Users },
              { id: 'rsvp', label: 'RSVP Only', desc: 'Manage attendance', icon: CheckCircle2 },
              { id: 'ticketed', label: 'Paid Tickets', desc: 'Sell tickets online', icon: Ticket },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setValue('eventType', type.id as any)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  eventType === type.id 
                    ? 'bg-[#feff1c]/5 border-[#feff1c]' 
                    : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                }`}
              >
                <type.icon size={24} className={eventType === type.id ? 'text-[#feff1c]' : 'text-[#767686]'} />
                <h3 className={`font-bold mt-4 ${eventType === type.id ? 'text-[#f8f9fa]' : 'text-[#9caab8]'} text-[16px]`}>{type.label}</h3>
                <p className="text-xs text-[#767686] mt-1">{type.desc}</p>
              </button>
            ))}
          </div>

          {/* Capacity Management for RSVP and Free Events */}
          {(eventType === 'rsvp' || eventType === 'free') && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Event Capacity</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                  <input 
                    {...register('ticketTiers.0.capacity' as const, { required: true, min: 1 })}
                    type="number" 
                    placeholder="e.g. 100"
                    className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                  />
                </div>
                <p className="text-xs text-[#767686]">Set the maximum number of people who can register for this event.</p>
              </div>
              {/* Ensure other tier fields are set to defaults for non-ticketed */}
              <input type="hidden" {...register('ticketTiers.0.name' as const)} value="General" />
              <input type="hidden" {...register('ticketTiers.0.price' as const)} value="0" />
            </div>
          )}

          {/* Ticket Tiers Management for Paid Events */}
          {eventType === 'ticketed' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">Ticket Tiers</h3>
                  <p className="text-xs text-[#767686] mt-1">Configure pricing, inventory, sales windows, and waitlist for each tier.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => append({ name: '', price: 0, capacity: 0, salesStartDate: '', salesEndDate: '', absorbFee: false, waitlistEnabled: false })}
                  className="flex items-center gap-2 text-[#feff1c] text-sm font-bold hover:underline"
                >
                  <Plus size={16} />
                  Add Tier
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => {
                  const tierValues = watch(`ticketTiers.${index}`);
                  const platformFee = tierValues?.price ? (Number(tierValues.price) * 0.05) : 0;
                  
                  return (
                    <div key={field.id} className="bg-[#121214] rounded-xl border border-[#424249] overflow-hidden">
                      {/* Tier Header */}
                      <div className="flex items-center justify-between px-5 py-3 bg-[#232326]/50 border-b border-[#424249]">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#feff1c]" />
                          <span className="text-sm font-bold text-[#f8f9fa]">
                            {tierValues?.name || `Tier ${index + 1}`}
                          </span>
                          {tierValues?.price > 0 && (
                            <span className="text-xs text-[#9caab8] px-2 py-0.5 bg-[#121214] rounded border border-[#424249]">
                              GH₵{Number(tierValues.price).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button 
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1.5 text-[#767686] hover:text-red-500 transition-colors"
                          disabled={fields.length === 1}
                          title="Remove tier"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="p-5 space-y-5">
                        {/* Row 1: Name, Price, Capacity */}
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 sm:col-span-5 space-y-2">
                            <label className="font-bold text-[#767686] uppercase tracking-wider text-[12px]">Ticket Name</label>
                            <input 
                              {...register(`ticketTiers.${index}.name` as const, { required: 'Ticket name is required' })}
                              placeholder="e.g. VIP Access"
                              className="w-full px-3 py-2.5 bg-[#232326] border border-[#424249] rounded-lg text-sm text-[#f8f9fa] focus:border-[#feff1c] outline-none transition-colors"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-4 space-y-2">
                            <label className="font-bold text-[#767686] uppercase tracking-wider text-[12px]">Price (GH₵)</label>
                            <input 
                              {...register(`ticketTiers.${index}.price` as const, { required: true, min: 0, valueAsNumber: true })}
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="w-full px-3 py-2.5 bg-[#232326] border border-[#424249] rounded-lg text-sm text-[#f8f9fa] focus:border-[#feff1c] outline-none transition-colors"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3 space-y-2">
                            <label className="font-bold text-[#767686] uppercase tracking-wider flex items-center gap-1 text-[12px]">
                              Inventory Limit
                              <Info size={12} className="text-[#767686]" />
                            </label>
                            <input 
                              {...register(`ticketTiers.${index}.capacity` as const, { required: 'Required', min: 1, valueAsNumber: true })}
                              type="number"
                              placeholder="100"
                              className="w-full px-3 py-2.5 bg-[#232326] border border-[#424249] rounded-lg text-sm text-[#f8f9fa] focus:border-[#feff1c] outline-none transition-colors"
                            />
                            <p className="text-[10px] text-[#767686]">Sales stop at this limit</p>
                          </div>
                        </div>

                        {/* Row 2: Sales Window */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="font-bold text-[#767686] uppercase tracking-wider text-[12px]">Sales Start Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767686]" size={14} />
                              <input 
                                {...register(`ticketTiers.${index}.salesStartDate` as const)}
                                type="date"
                                className="w-full pl-9 pr-3 py-2.5 bg-[#232326] border border-[#424249] rounded-lg text-sm text-[#f8f9fa] focus:border-[#feff1c] outline-none transition-colors"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="font-bold text-[#767686] uppercase tracking-wider text-[12px]">Sales End Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767686]" size={14} />
                              <input 
                                {...register(`ticketTiers.${index}.salesEndDate` as const)}
                                type="date"
                                className="w-full pl-9 pr-3 py-2.5 bg-[#232326] border border-[#424249] rounded-lg text-sm text-[#f8f9fa] focus:border-[#feff1c] outline-none transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Toggles — Fee Absorption + Waitlist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#424249]/50">
                          {/* Platform Fee Toggle */}
                          <Controller
                            control={control}
                            name={`ticketTiers.${index}.absorbFee`}
                            render={({ field: { value, onChange } }) => (
                              <button
                                type="button"
                                onClick={() => onChange(!value)}
                                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                                  value 
                                    ? 'bg-[#feff1c]/5 border-[#feff1c]/30' 
                                    : 'bg-[#232326]/30 border-[#424249] hover:border-[#767686]'
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {value ? (
                                    <ToggleRight size={22} className="text-[#feff1c]" />
                                  ) : (
                                    <ToggleLeft size={22} className="text-[#767686]" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-[#f8f9fa]">Absorb Platform Fee</p>
                                  <p className="text-[10px] text-[#9caab8] mt-0.5 leading-relaxed">
                                    {value 
                                      ? `You absorb the GH₵${platformFee.toFixed(2)} fee (5%). Attendees pay GH₵${Number(tierValues?.price || 0).toFixed(2)}.`
                                      : `Attendees pay GH₵${(Number(tierValues?.price || 0) + platformFee).toFixed(2)} (includes 5% fee).`
                                    }
                                  </p>
                                </div>
                              </button>
                            )}
                          />

                          {/* Waitlist Toggle */}
                          <Controller
                            control={control}
                            name={`ticketTiers.${index}.waitlistEnabled`}
                            render={({ field: { value, onChange } }) => (
                              <button
                                type="button"
                                onClick={() => onChange(!value)}
                                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                                  value 
                                    ? 'bg-[#feff1c]/5 border-[#feff1c]/30' 
                                    : 'bg-[#232326]/30 border-[#424249] hover:border-[#767686]'
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {value ? (
                                    <ToggleRight size={22} className="text-[#feff1c]" />
                                  ) : (
                                    <ToggleLeft size={22} className="text-[#767686]" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-[#f8f9fa]">Enable Waitlist</p>
                                  <p className="text-[10px] text-[#9caab8] mt-0.5 leading-relaxed">
                                    {value 
                                      ? 'Waitlist is active — guests can join before sales open or when sold out.'
                                      : 'No waitlist — ticket sales close when inventory runs out.'
                                    }
                                  </p>
                                </div>
                              </button>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inventory Enforcement Notice */}
              <div className="flex items-start gap-3 p-4 bg-[#feff1c]/5 border border-[#feff1c]/20 rounded-xl">
                <ShieldCheck size={18} className="text-[#feff1c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#f8f9fa]">Inventory Protection Enabled</p>
                  <p className="text-[10px] text-[#9caab8] mt-0.5 leading-relaxed">
                    Sales are automatically blocked when a tier reaches its inventory limit. 
                    Ticket availability updates in real time on your event dashboard and public page.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section: Location */}
        <section className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
              <MapPin size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Location</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#232326] p-[4px] rounded-[12px] border border-[#424249] flex items-center w-fit">
              <button
                type="button"
                onClick={() => setValue('locationType', 'physical')}
                className={`flex items-center gap-2 px-[16px] py-[8px] rounded-[8px] text-[14px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  locationType === 'physical' ? 'bg-[#424249] text-[#f8f9fa]' : 'text-[#f8f9fa] hover:text-[#f8f9fa]/80'
                }`}
              >
                <MapPin size={16} />
                Physical
              </button>
              <button
                type="button"
                onClick={() => setValue('locationType', 'virtual')}
                className={`flex items-center gap-2 px-[16px] py-[8px] rounded-[8px] text-[14px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  locationType === 'virtual' ? 'bg-[#424249] text-[#f8f9fa]' : 'text-[#f8f9fa] hover:text-[#f8f9fa]/80'
                }`}
              >
                <Globe size={16} />
                Virtual
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#9caab8] uppercase tracking-wider">
                {locationType === 'physical' ? 'Venue Address' : 'Meeting Link'}
              </label>
              <div className="relative">
                {locationType === 'physical' ? (
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                ) : (
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767686]" size={18} />
                )}
                <input 
                  {...register('location', { required: true })}
                  type="text" 
                  placeholder={locationType === 'physical' ? 'e.g. El Wak Stadium, Accra' : 'e.g. https://zoom.us/j/123456'}
                  className="w-full pl-12 pr-4 py-3 bg-[#121214] border border-[#424249] rounded-xl text-[#f8f9fa] focus:outline-none focus:border-[#feff1c] transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Refund Policy */}
        {eventType === 'ticketed' && (
          <section className="bg-[#232326] p-8 rounded-2xl border border-[#424249] shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#feff1c]/10 text-[#feff1c] rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Refund Policy</h2>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-[#9caab8]">
                Set your refund policy to manage attendee expectations and protect your event revenue.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <Controller
                  control={control}
                  name="refundPolicy"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <button
                        type="button"
                        onClick={() => onChange('allow')}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                          value === 'allow' 
                            ? 'bg-[#feff1c]/5 border-[#feff1c]' 
                            : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                        }`}
                      >
                        <div className="mt-1 shrink-0">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            value === 'allow' ? 'border-[#feff1c] bg-[#feff1c]' : 'border-[#424249]'
                          }`}>
                            {value === 'allow' && <Check size={14} className="text-[#121214]" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#f8f9fa] text-sm mb-1">Allow Refunds</h3>
                          <p className="text-xs text-[#9caab8] leading-relaxed">
                            Attendees can request refunds at any time before the event. You'll process refunds directly through the platform.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChange('deny')}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                          value === 'deny' 
                            ? 'bg-[#feff1c]/5 border-[#feff1c]' 
                            : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                        }`}
                      >
                        <div className="mt-1 shrink-0">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            value === 'deny' ? 'border-[#feff1c] bg-[#feff1c]' : 'border-[#424249]'
                          }`}>
                            {value === 'deny' && <Check size={14} className="text-[#121214]" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#f8f9fa] text-sm mb-1">Don't Allow Refunds</h3>
                          <p className="text-xs text-[#9caab8] leading-relaxed">
                            All ticket sales are final. Attendees cannot request refunds. Best for high-demand events with limited capacity.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChange('review')}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                          value === 'review' 
                            ? 'bg-[#feff1c]/5 border-[#feff1c]' 
                            : 'bg-[#121214] border-[#424249] hover:border-[#767686]'
                        }`}
                      >
                        <div className="mt-1 shrink-0">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            value === 'review' ? 'border-[#feff1c] bg-[#feff1c]' : 'border-[#424249]'
                          }`}>
                            {value === 'review' && <Check size={14} className="text-[#121214]" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#f8f9fa] text-sm mb-1">Review on a Case-by-Case Basis</h3>
                          <p className="text-xs text-[#9caab8] leading-relaxed">
                            Attendees can request refunds, and you'll review each request individually. Gives you flexibility while maintaining control.
                          </p>
                        </div>
                      </button>
                    </>
                  )}
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#121214] border border-[#424249] rounded-xl mt-4">
                <Info size={16} className="text-[#feff1c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#f8f9fa]">Refund Policy Disclosure</p>
                  <p className="text-[10px] text-[#9caab8] mt-1 leading-relaxed">
                    Your selected policy will be displayed on the event page and in confirmation emails. Make sure attendees understand your policy before purchasing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Control Actions (Pause/Cancel simulation for editing) */}
        {initialData && (
          <section className="bg-[#121214] p-8 rounded-2xl border border-red-500/20 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                  <AlertCircle size={20} />
                </div>
                <h2 className="text-xl font-bold text-red-500 font-['Kamerik205:Regular_3',sans-serif]">Danger Zone</h2>
              </div>
              {hasSales && (
                <div className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-[10px] font-bold uppercase">
                  Sales have started
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center justify-center gap-2 p-4 border rounded-xl font-bold transition-all ${
                  isPaused 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20' 
                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20'
                }`}
              >
                {isPaused ? <CheckCircle2 size={18} /> : <PauseCircle size={18} />}
                {isPaused ? 'Resume Ticket Sales' : 'Pause Ticket Sales'}
              </button>
              <button 
                type="button" 
                onClick={() => setIsDeleting(true)}
                className="flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold hover:bg-red-500/20 transition-all"
              >
                <XCircle size={18} />
                Cancel Event
              </button>
            </div>

            {isDeleting && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                <p className="text-red-500 text-sm font-bold mb-4">Are you absolutely sure? This will cancel the event and notify all attendees.</p>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsDeleting(false);
                      const data = watch();
                      onSave(data, 'Cancelled');
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition-colors"
                  >
                    Yes, Cancel Event
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsDeleting(false)}
                    className="flex-1 bg-[#232326] text-[#f8f9fa] py-2 rounded-lg font-bold text-sm hover:bg-[#121214] transition-colors"
                  >
                    Nevermind
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </form>

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
    </div>
  );
};