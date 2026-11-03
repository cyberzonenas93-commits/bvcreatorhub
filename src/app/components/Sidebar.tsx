import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  TrendingUp,
  Wallet,
  Settings,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import VBLogo from '../../imports/Frame427319586';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  indent?: boolean;
}

const NavItem = ({ icon: Icon, label, active, onClick, indent }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-3 py-2 text-[14px] font-['Kamerik205:Regular_3',sans-serif] transition-colors rounded-lg",
      active 
        ? "bg-[#feff1c] text-[#121214]" 
        : "text-[#f8f9fa] hover:bg-[#232326] hover:text-[#f8f9fa]",
      indent && "pl-10"
    )}
  >
    <Icon size={18} className={cn(active ? "text-[#121214]" : "text-[#A5A5B6]")} />
    <span className="flex-1 text-left">{label}</span>
  </button>
);

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, eventId?: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ currentView, onNavigate, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#121214]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-[261px] bg-[#121214] border-r border-[#424249] z-50 transition-transform lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[42px] relative flex items-center justify-center">
                <VBLogo />
              </div>
              <span className="font-['Kamerik205:Regular_3',sans-serif] text-[16px] text-[#f8f9fa]">Admin Panel</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-[#f8f9fa]">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
            <NavItem 
              icon={LayoutDashboard} 
              label="Overview" 
              active={currentView === 'portfolio'} 
              onClick={() => onNavigate('portfolio')} 
            />

            <NavItem 
              icon={Calendar} 
              label="Events" 
              active={currentView === 'events' || currentView.startsWith('event-')} 
              onClick={() => onNavigate('events')} 
            />

            <NavItem 
              icon={Users} 
              label="Contacts" 
              active={currentView === 'contacts'} 
              onClick={() => onNavigate('contacts')} 
            />

            <NavItem 
              icon={TrendingUp} 
              label="Affiliate" 
              active={currentView === 'promoters'} 
              onClick={() => onNavigate('promoters')} 
            />

            <NavItem 
              icon={Wallet} 
              label="Payments & Payouts" 
              active={currentView === 'payments-payouts'} 
              onClick={() => onNavigate('payments-payouts')} 
            />

            <NavItem 
              icon={Settings} 
              label="Settings" 
              active={currentView === 'settings'} 
              onClick={() => onNavigate('settings')} 
            />
          </div>
        </div>
      </aside>
    </>
  );
};
