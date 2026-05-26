import React from 'react';
import { NeruLogo, ParkingLogo, ShohinLogo } from './Icons';
import { Smartphone, Sparkles, MapPin, ShoppingBag, Terminal, ExternalLink } from 'lucide-react';

interface MiniAppsTabProps {
  onSelectPartner: (partnerId: 'neru' | 'parking' | 'shohin') => void;
}

export const MiniAppsTab: React.FC<MiniAppsTabProps> = ({ onSelectPartner }) => {
  const customMiniApps = [
    {
      id: 'neru',
      name: 'Neru автозаправка',
      desc: 'Барқдиҳии мошинҳо дар Душанбе',
      component: () => <NeruLogo className="w-12 h-12" />,
      category: 'Нақлиёт / Экология',
    },
    {
      id: 'parking',
      name: 'Parking танзимкунанда',
      desc: 'Бандкунии ҷойҳои мошин дар кӯчаҳо',
      component: () => <ParkingLogo className="w-12 h-12 animate-pulse" />,
      category: 'Хадамоти шаҳрӣ',
    },
    {
      id: 'shohin',
      name: 'Шохин расонидан',
      desc: 'Фармоиши ғизо ва маҳсулоти миллӣ',
      component: () => <ShohinLogo className="w-12 h-12" />,
      category: 'Маркетплейс / Дӯкон',
    }
  ];

  const genericPartners = [
    { name: 'Somon.tj', desc: 'Эълонҳои бепул дар Тоҷикистон', iconLetter: 'S', color: '#1B5E20' },
    { name: 'Alif Молия', desc: 'Харидории молҳо бо насия', iconLetter: 'A', color: '#D50000' },
    { name: 'Babilon-T', desc: 'Интернет ва алоқаи хонагӣ', iconLetter: 'B', color: '#E65100' },
    { name: 'Асони Дастрас', desc: 'Хизматрасонии коммуналӣ', iconLetter: 'А', color: '#29B6F6' }
  ];

  return (
    <div className="px-5 py-4 select-none space-y-6 animate-scale-up pb-28">
      
      {/* Overview header info block */}
      <div>
        <h2 className="text-xl font-extrabold text-[#0D2440] tracking-tight flex items-center gap-1.5">
          <span>MiniApps Дӯкони Барномаҳо</span>
          <Sparkles size={18} className="text-blue-500 animate-pulse" />
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Гузариш ва истифодаи фаврӣ бе боргирии барномаҳои иловагӣ</p>
      </div>

      {/* Featured partners catalogs */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Барномаҳои фаъол ва созгор</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {customMiniApps.map((app) => (
            <div
              key={app.id}
              onClick={() => onSelectPartner(app.id as any)}
              className="bg-white border border-slate-100 hover:border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-3.5 cursor-pointer hover:shadow-sm active:scale-98 transition-all"
            >
              <div className="shrink-0">{app.component()}</div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">{app.category}</span>
                <h4 className="font-extrabold text-sm text-slate-800 leading-tight mt-0.5">{app.name}</h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">{app.desc}</p>
              </div>
              <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-[#1479FF] transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generic partners grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Шарикони ҳамкор ва хадамот</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {genericPartners.map((gp, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 hover:bg-slate-50 p-4 rounded-2xl flex flex-col justify-between h-[116px] cursor-pointer transition-all active:scale-95"
              onClick={() => {
                alert(`Гузариш ба сомонаи ${gp.name}... Дӯкони барномаҳо мустақилона пайваст мешавад.`);
              }}
            >
              <div className="flex justify-between items-start">
                <span 
                  style={{ backgroundColor: gp.color }}
                  className="w-8 h-8 rounded-lg text-white font-black flex items-center justify-center text-sm shadow-xs"
                >
                  {gp.iconLetter}
                </span>
                <span className="text-[9px] font-extrabold text-slate-400 tracking-wide uppercase">Хамкор</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800 leading-tight">{gp.name}</h4>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{gp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
