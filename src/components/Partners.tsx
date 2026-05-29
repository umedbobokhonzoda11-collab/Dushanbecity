import React, { useState, useEffect } from 'react';
import { NeruLogo, ParkingLogo, ShohinLogo } from './Icons';
import { ChargeMeter, ParkingMap, ShohinShop } from './MiniApps';

interface PartnersProps {
  balance: number;
  onDeductBalance: (amount: number) => void;
  onAddTransaction: (title: string, amount: number, category: string) => void;
}

export const Partners: React.FC<PartnersProps> = ({
  balance,
  onDeductBalance,
  onAddTransaction,
}) => {
  const [activePartnerApp, setActivePartnerApp] = useState<'neru' | 'parking' | 'shohin' | null>(null);

  return (
    <div className="px-5 py-0.5 select-none">
      {/* Container holding partner bar exactly as shown inside the picture - height reduced further by 20% */}
      <div className="bg-white border border-slate-100 rounded-[14px] py-2 px-3 flex items-center justify-around shadow-xs">
        
        {/* Neru brand logo trigger */}
        <button 
          id="partner-trigger-neru"
          onClick={() => setActivePartnerApp('neru')}
          className="flex items-center gap-1.5 group cursor-pointer active:scale-95 transition-all"
        >
          <NeruLogo className="w-7 h-7 min-w-[28px] transform group-hover:scale-105 transition-transform" />
          <span className="font-bold text-[10px] text-slate-800 tracking-tight">Neru</span>
        </button>

        {/* Separator line */}
        <div className="w-px h-4.5 bg-slate-200" />

        {/* Parking brand logo trigger with red notification badge */}
        <button 
          id="partner-trigger-parking"
          onClick={() => setActivePartnerApp('parking')}
          className="flex items-center gap-1.5 group cursor-pointer active:scale-95 transition-all"
        >
          <ParkingLogo className="w-7 h-7 min-w-[28px] transform group-hover:scale-105 transition-transform" />
          <span className="font-bold text-[10px] text-slate-800 tracking-tight">Parking</span>
        </button>

        {/* Separator line */}
        <div className="w-px h-4.5 bg-slate-200" />

        {/* Shohin brand logo trigger */}
        <button 
          id="partner-trigger-shohin"
          onClick={() => setActivePartnerApp('shohin')}
          className="flex items-center gap-1.5 group cursor-pointer active:scale-95 transition-all"
        >
          <ShohinLogo className="w-7 h-7 min-w-[28px] transform group-hover:scale-105 transition-transform" />
          <span className="font-bold text-[10px] text-slate-800 tracking-tight">Шохин</span>
        </button>
      </div>

      {/* RENDER ACTIVE MINI APP OVERLAYS */}
      {activePartnerApp === 'neru' && (
        <ChargeMeter 
          balance={balance} 
          onClose={() => setActivePartnerApp(null)} 
          onChargePayment={(amount) => {
            onDeductBalance(amount);
            onAddTransaction('Neru: Корти барқгирии мошин', -amount, 'Транспорт');
          }}
        />
      )}

      {activePartnerApp === 'parking' && (
        <ParkingMap 
          balance={balance} 
          onClose={() => setActivePartnerApp(null)} 
          onBookParking={(spotName, price) => {
            onDeductBalance(price);
            onAddTransaction(`Parking: Ҷои мошин - ${spotName}`, -price, 'Транспорт');
          }}
        />
      )}

      {activePartnerApp === 'shohin' && (
        <ShohinShop 
          balance={balance} 
          onClose={() => setActivePartnerApp(null)} 
          onOrderPlaced={(itemName, price) => {
            onDeductBalance(price);
            onAddTransaction(`Шохин: Фармоиши Маҳсулот (${itemName})`, -price, 'Доставка');
          }}
        />
      )}
    </div>
  );
};
