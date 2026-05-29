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
  const [lastRefreshedDate, setLastRefreshedDate] = useState('28.05.26 - 23:05:08');
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
        className="flex-1 bg-[#1479FF] text-white rounded-[14px] py-[18px] px-6 shadow-md shadow-[#1479FF]/15 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Subtle decorative vector backdrop glow */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top half: Money status and toggles in dual separate alignment */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-baseline gap-1.5">
            {/* Balance Text */}
            <h2 className="text-[34px] font-bold tracking-tight leading-none">
              {hideBalance ? '••••••' : balance.toFixed(2)}
            </h2>
            <span className="text-[15.5px] font-extrabold text-white/95 leading-none">TJS</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Visibility Indicator Toggle */}
            <button
              id="balance-visibility-btn"
              onClick={onToggleHideBalance}
              className="hover:opacity-80 active:scale-90 transition-all cursor-pointer p-1"
            >
              {hideBalance ? (
                <EyeOff size={23} className="stroke-[2.2] text-white/80" />
              ) : (
                <Eye size={23} className="stroke-[2.2] text-white" />
              )}
            </button>

            {/* Refresh Sync Button */}
            <button
              id="balance-sync-btn"
              onClick={handleRefresh}
              className="hover:opacity-80 active:scale-90 transition-all cursor-pointer p-1"
            >
              <RotateCw 
                size={21} 
                className={`stroke-[2.4] text-white transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} 
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
        className="w-[58px] bg-white border border-slate-100/40 hover:bg-slate-50/50 active:scale-95 transition-all text-[#1479FF] rounded-[14px] flex items-center justify-center cursor-pointer shadow-xs"
      >
        <div id="quick-widget-trigger" className="flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#1479FF]">
            {/* Top-Left Outline block */}
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Bottom-Left Outline block */}
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Top-Right Outline block */}
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Bottom-Right custom QR block resembling tiny digital dots exactly */}
            <rect x="14" y="14" width="3" height="3" rx="0.5" fill="currentColor" />
            <rect x="18" y="18" width="3" height="3" rx="0.5" fill="currentColor" />
            <rect x="18" y="14" width="2" height="2" rx="0.5" fill="currentColor" className="opacity-60" />
            <rect x="14" y="18" width="2" height="2" rx="0.5" fill="currentColor" className="opacity-60" />
          </svg>
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
