import React from 'react';
import { X, Bell, Award, CheckCircle, ShieldAlert } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const alerts = [
    {
      id: 'n1',
      title: 'Интиқолҳои Сбербанк фаъол шуд!',
      desc: 'Акнун Шумо метавонед ба Русия бе комиссия маблағ фиристед. Бахши "Переводы"-ро санҷед.',
      time: 'ИМРӮЗ',
      type: 'promo',
      icon: <Award className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'n2',
      title: 'Идентификатсияи бомуваффақият',
      desc: 'Ҳамёни электронии Шумо бо муваффақият тасдиқ гардид. Ҳамаи лимитҳо ва гузаронидани маблағҳо кушода шудаанд.',
      time: 'ДИРӮЗ',
      type: 'success',
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'n3',
      title: 'Огоҳии амниятӣ',
      desc: 'Рамзи PIN-коди ҳамёни худро ба ягон шахси бегона нагӯед. Намояндагони DC ҳеҷ гоҳ рамзи Шуморо намепурсанд.',
      time: '3 РӮЗ ПЕШ',
      type: 'alert',
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 select-none text-slate-800">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl z-10 animate-scale-up h-[480px] flex flex-col justify-between">
        
        {/* Header bar */}
        <div className="flex justify-between items-center mb-5 shrink-0">
          <div className="flex items-center gap-2 text-[#1861D5]">
            <Bell size={20} className="stroke-[2.2] animate-swing" />
            <span className="font-extrabold text-sm uppercase tracking-wider">Маркази паёмҳо</span>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1">
          {alerts.map((alt) => (
            <div 
              key={alt.id}
              className="bg-slate-50 border border-slate-100/10 p-4 rounded-2xl flex items-start gap-3.5 hover:bg-slate-100/50 transition-colors"
            >
              <div className="p-2.5 bg-white border border-slate-100 rounded-xl shrink-0">
                {alt.icon}
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{alt.time}</span>
                <h4 className="font-extrabold text-xs text-slate-800 leading-snug">{alt.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{alt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Clear/Dismiss footer button */}
        <button 
          onClick={onClose}
          className="w-full mt-4 bg-[#1861D5] hover:opacity-90 active:scale-95 text-white py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center"
        >
          Ҳамаро хондашуда ҳисоб кун
        </button>
      </div>
    </div>
  );
};
