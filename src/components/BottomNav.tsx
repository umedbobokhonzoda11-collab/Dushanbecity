import React from 'react';
import { Home, ArrowRightLeft, Grid, Clock, ScanQrCode } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  onTriggerScanner: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onTriggerScanner,
}) => {
  return (
    <div 
      id="floating-bottom-nav"
      className="absolute bottom-2 left-3.5 right-3.5 z-40 select-none bg-white/95 backdrop-blur-md border border-slate-100/90 rounded-[22px] px-3.5 py-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] flex items-center justify-between"
    >
        {/* Tab 1: Главная (Home) */}
        <button
          onClick={() => onChangeTab('home')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all outline-none cursor-pointer ${
            activeTab === 'home' ? 'text-[#1861D5]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'home' && (
            <span className="absolute inset-x-1.5 inset-y-0.5 bg-[#1861D5]/10 rounded-[14px] z-0 animate-scale-up" />
          )}
          <div className="z-10 flex flex-col items-center">
            <Home size={19} className="stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-0.5 tracking-tight font-sans">Главная</span>
          </div>
        </button>

        {/* Tab 2: Переводы (Transfers) */}
        <button
          onClick={() => onChangeTab('transfers')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all outline-none cursor-pointer ${
            activeTab === 'transfers' ? 'text-[#1861D5]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'transfers' && (
            <span className="absolute inset-x-1.5 inset-y-0.5 bg-[#1861D5]/10 rounded-[14px] z-0 animate-scale-up" />
          )}
          <div className="z-10 flex flex-col items-center">
            <ArrowRightLeft size={19} className="stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-0.5 tracking-tight font-sans">Переводы</span>
          </div>
        </button>

        {/* Tab 3 (Central): Elevated QR Scan button sitting exactly as in image screenshot */}
        <div className="flex-1 flex justify-center -mt-6.5 relative select-none">
          <button
            onClick={onTriggerScanner}
            id="center-qr-scanner-btn"
            className="w-13 h-13 bg-[#1479FF] hover:bg-blue-600 hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-[#1479FF]/30 transition-all border-4 border-white cursor-pointer"
          >
            {/* Square framing brackets representing camera viewfinder targeting scan */}
            <svg viewBox="0 0 100 100" className="w-5.5 h-5.5 fill-none stroke-current stroke-[7]">
              <path d="M15 35V15H35" strokeLinecap="round" />
              <path d="M65 15H85V35" strokeLinecap="round" />
              <path d="M85 65V85H65" strokeLinecap="round" />
              <path d="M35 85H15V65" strokeLinecap="round" />
              {/* Scan point bar inside */}
              <line x1="25" y1="50" x2="75" y2="50" strokeLinecap="round" className="stroke-[9] text-sky-200 animate-pulse" />
            </svg>
          </button>
        </div>

        {/* Tab 4: MiniApps */}
        <button
          onClick={() => onChangeTab('miniapps')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all outline-none cursor-pointer ${
            activeTab === 'miniapps' ? 'text-[#1861D5]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'miniapps' && (
            <span className="absolute inset-x-1.5 inset-y-0.5 bg-[#1861D5]/10 rounded-[14px] z-0 animate-scale-up" />
          )}
          <div className="z-10 flex flex-col items-center">
            <Grid size={19} className="stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-0.5 tracking-tight font-sans">MiniApps</span>
          </div>
        </button>

        {/* Tab 5: История (History logs) */}
        <button
          onClick={() => onChangeTab('history')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all outline-none cursor-pointer ${
            activeTab === 'history' ? 'text-[#1861D5]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'history' && (
            <span className="absolute inset-x-1.5 inset-y-0.5 bg-[#1861D5]/10 rounded-[14px] z-0 animate-scale-up" />
          )}
          <div className="z-10 flex flex-col items-center">
            <Clock size={19} className="stroke-[2.2]" />
            <span className="text-[9.5px] font-bold mt-0.5 tracking-tight font-sans">История</span>
          </div>
        </button>
    </div>
  );
};
