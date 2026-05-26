import React, { useState } from 'react';
import { Eye, EyeOff, RotateCw, Grid, CheckCircle } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  hideBalance: boolean;
  onToggleHideBalance: () => void;
  onRefreshBalance: (newBalance: number) => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  hideBalance,
  onToggleHideBalance,
  onRefreshBalance,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedDate, setLastRefreshedDate] = useState('22.05.26 - 21:48:05');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    // Simulate query delay
    setTimeout(() => {
      setIsRefreshing(false);
      
      // Update with premium feedback
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const d = pad(now.getDate());
      const m = pad(now.getMonth() + 1);
      const y = now.getFullYear().toString().slice(-2);
      const h = pad(now.getHours());
      const min = pad(now.getMinutes());
      const s = pad(now.getSeconds());
      
      setLastRefreshedDate(`${d}.${m}.${y} - ${h}:${min}:${s}`);
      
      // Introduce subtle random fluctuation to balance for realistic sandbox demo
      const fluctuate = +(balance + (Math.random() * 2 - 1)).toFixed(2);
      onRefreshBalance(fluctuate);
    }, 700);
  };

  const handleCopyQr = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="px-5 py-1.5 select-none flex items-stretch gap-1.5">
      {/* Primary Balance Display Card */}
      <div 
        id="balance-container"
        className="flex-1 bg-[#1479FF] text-white rounded-[24px] py-[18px] px-6 shadow-md shadow-[#1479FF]/15 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Subtle decorative vector backdrop glow */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top half: Money status and toggles */}
        <div>
          <div className="flex items-center gap-3">
            {/* Balance Text */}
            <h2 className="text-[27px] font-bold tracking-tight leading-none">
              {hideBalance ? '••••••' : balance.toFixed(2)}
            </h2>
            <span className="text-[14.4px] font-bold text-white/90 leading-none pt-2">TJS</span>

            {/* Visibility Indicator Toggle */}
            <button
              id="balance-visibility-btn"
              onClick={onToggleHideBalance}
              className="ml-2 hover:opacity-80 active:scale-90 transition-all cursor-pointer p-1"
            >
              {hideBalance ? (
                <EyeOff size={22} className="stroke-[2.2] text-white/80" />
              ) : (
                <Eye size={22} className="stroke-[2.2] opacity-95" />
              )}
            </button>

            {/* Refresh Sync Button */}
            <button
              id="balance-sync-btn"
              onClick={handleRefresh}
              className="hover:opacity-80 active:scale-90 transition-all cursor-pointer p-1"
            >
              <RotateCw 
                size={20} 
                className={`stroke-[2.5] transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} 
              />
            </button>
          </div>
        </div>

        {/* Bottom half: Last transaction timestamp exactly matching layout */}
        <div className="mt-4">
          <p className="text-[10.4px] font-mono tracking-wider text-white/70 antialiased">
            {lastRefreshedDate}
          </p>
        </div>
      </div>

      {/* Auxiliary Grid shortcut white box on the right */}
      <div 
        onClick={() => setShowQrModal(true)}
        className="w-[58px] bg-white border border-slate-100 hover:border-slate-200 active:scale-95 transition-all text-[#1479FF] rounded-[24px] flex items-center justify-center cursor-pointer shadow-xs"
      >
        <div id="quick-widget-trigger" className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#f1f5f9] rounded-xl text-[#1479FF]">
            <div className="w-2.5 h-2.5 rounded-[2px] border-2 border-[#1479FF]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1479FF]" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1479FF]" />
            <div className="w-2.5 h-2.5 rounded-[2px] border-2 border-[#1479FF]" />
          </div>
        </div>
      </div>

      {/* QR MODAL POPUP */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setShowQrModal(false)}
          />

          {/* Dialog Card */}
          <div className="relative w-full max-w-sm bg-white rounded-[28px] overflow-hidden shadow-2xl animate-scale-up z-10 p-6 text-center select-none">
            <h3 className="font-semibold text-lg text-slate-800">QR-коди шахсии ман</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">Барои қабули интиқолҳо ин кодро нишон диҳед</p>

            {/* Beautiful styled QR Code vector graphic container */}
            <div className="inline-block p-4 bg-slate-50 rounded-2xl border border-slate-100 relative mb-6">
              <svg viewBox="0 0 100 100" className="w-48 h-48 text-slate-800" fill="currentColor">
                {/* Outer anchor squares */}
                <path d="M5 5h20v20H5V5zm4 4v12h12V9H9z" />
                <path d="M11 11h8v8h-8v-8z" />
                
                <path d="M75 5h20v20H75V5zm4 4v12h12V9H79z" />
                <path d="M81 11h8v8h-8v-8z" />
                
                <path d="M5 75h20v20H5V75zm4 4v12h12V79H9z" />
                <path d="M11 81h8v8h-8v-8z" />

                {/* Simulated random QR dots pattern */}
                <rect x="35" y="5" width="8" height="8" rx="1" />
                <rect x="50" y="8" width="12" height="4" rx="1" />
                <rect x="65" y="15" width="6" height="6" rx="1" />
                <rect x="35" y="25" width="15" height="4" rx="1" />
                <rect x="40" y="40" width="8" height="8" rx="1" />
                <rect x="60" y="35" width="12" height="8" rx="1" />
                
                <rect x="5" y="35" width="20" height="4" rx="1" />
                <rect x="15" y="45" width="8" height="15" rx="1" />
                <rect x="5" y="65" width="8" height="6" rx="1" />
                
                <rect x="75" y="35" width="16" height="4" rx="1" />
                <rect x="85" y="45" width="10" height="10" rx="1" />
                <rect x="75" y="60" width="8" height="10" rx="1" />
                
                <rect x="35" y="55" width="24" height="6" rx="1" fill="#1479FF" />
                <rect x="35" y="65" width="10" height="15" rx="1" />
                <rect x="50" y="75" width="15" height="6" rx="1" />
                
                <rect x="75" y="75" width="15" height="4" rx="1" />
                <rect x="85" y="85" width="10" height="10" rx="1" />
                
                {/* Small central DC wallet identifier logo dot */}
                <rect x="44" y="44" width="12" height="12" rx="3" fill="#1479FF" />
                <circle cx="50" cy="50" r="3" fill="white" />
              </svg>
            </div>

            <div className="font-semibold text-slate-700 font-mono text-sm tracking-wide bg-slate-50 border border-slate-100/50 py-2.5 px-4 rounded-xl mb-6">
              umedbobokhonzoda11@gmail.com
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleCopyQr}
                className="flex-1 bg-[#1479FF] hover:bg-[#1069DD] active:scale-95 text-white font-medium py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <CheckCircle size={16} /> Копи шуд!
                  </>
                ) : (
                  'Копи кардани ID'
                )}
              </button>
              <button 
                onClick={() => setShowQrModal(false)}
                className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-3 rounded-2xl text-sm transition-all cursor-pointer"
              >
                Бастан
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
