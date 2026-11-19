import React from 'react';
import { Bell, X, CheckCircle2, AlertCircle, Info, Ticket, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'sale' | 'alert' | 'info' | 'success';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Ticket Sold',
    message: 'Ama Mensah just purchased 2 VIP tickets for Afrochella 2026.',
    time: '2 mins ago',
    type: 'sale',
    read: false,
  },
  {
    id: '2',
    title: 'Capacity Alert',
    message: 'Ghana Tech Summit 2026 is now at 95% capacity.',
    time: '15 mins ago',
    type: 'alert',
    read: false,
  },
  {
    id: '3',
    title: 'Payout Successful',
    message: 'Your payout of GH₵74,700.00 has been processed via MTN Mobile Money.',
    time: '1 hour ago',
    type: 'success',
    read: true,
  },
  {
    id: '4',
    title: 'New Registration',
    message: 'Someone just registered for your Chale Wote Street Art Festival event.',
    time: '3 hours ago',
    type: 'info',
    read: true,
  }
];

interface NotificationsPopoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPopout = ({ isOpen, onClose }: NotificationsPopoutProps) => {
  if (!isOpen) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'sale': return <Ticket className="text-[#feff1c]" size={18} />;
      case 'alert': return <AlertCircle className="text-amber-500" size={18} />;
      case 'success': return <CheckCircle2 className="text-green-500" size={18} />;
      default: return <Info className="text-[#9caab8]" size={18} />;
    }
  };

  return (
    <>
      {/* Backdrop for mobile to close when clicking outside */}
      <div 
        className="fixed inset-0 z-40 lg:hidden" 
        onClick={onClose}
      />
      
      <div className="absolute top-16 right-4 lg:right-8 w-[calc(100vw-32px)] sm:w-96 bg-[#232326] border border-[#424249] rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-[#424249]">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-[#feff1c]" />
            <h3 className="font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">Notifications</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214] rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {mockNotifications.length > 0 ? (
            <div className="divide-y divide-[#424249]">
              {mockNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-[#121214] transition-colors cursor-pointer relative group ${!notification.read ? 'bg-[#feff1c]/5' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className={`mt-1 p-2 rounded-lg bg-[#121214] border border-[#424249] group-hover:border-[#feff1c]/30 transition-colors`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-bold truncate ${!notification.read ? 'text-[#f8f9fa]' : 'text-[#9caab8]'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-[10px] text-[#767686] whitespace-nowrap ml-2">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#9caab8] leading-relaxed line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#feff1c] rounded-full mt-2 shrink-0"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-[#121214] rounded-full flex items-center justify-center mx-auto mb-3 text-[#767686]">
                <Bell size={24} />
              </div>
              <p className="text-[#9caab8] text-sm font-medium">No new notifications</p>
              <p className="text-[#767686] text-xs mt-1">We'll notify you when something important happens.</p>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-[#424249] bg-[#1a1a1c] rounded-b-2xl">
          <button className="w-full py-2 text-xs font-bold text-[#feff1c] hover:underline flex items-center justify-center gap-1.5">
            <TrendingUp size={14} />
            View all activity
          </button>
        </div>
      </div>
    </>
  );
};