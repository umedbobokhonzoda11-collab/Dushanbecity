import React, { useState } from 'react';
import { Smartphone, CreditCard, Send, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface TransfersTabProps {
  balance: number;
  onSelectShortcut: (type: 'phone' | 'card') => void;
}

export const TransfersTab: React.FC<TransfersTabProps> = ({ balance, onSelectShortcut }) => {
  const [activeAbroad, setActiveAbroad] = useState<'russia' | 'uzbekistan' | 'kazakhstan'>('russia');
  const [abroadPhone, setAbroadPhone] = useState('');
  const [abroadSum, setAbroadSum] = useState('100');
  const [transferDone, setTransferDone] = useState(false);

  const handleAbroadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abroadPhone || +abroadSum <= 0) return;
    setTransferDone(true);
    setTimeout(() => {
      setTransferDone(false);
      setAbroadPhone('');
    }, 2500);
  };

  return (
    <div className="px-5 py-4 select-none space-y-6 animate-scale-up pb-28">
      
      {/* Block title */}
      <div>
        <h2 className="text-xl font-extrabold text-[#0D2440] tracking-tight">Интиқолҳо ва интиқолдиҳӣ</h2>
        <p className="text-xs text-slate-400 mt-0.5">Гузаронидани маблағҳо бе фоиз ба ҳамаи самтҳо</p>
      </div>

      {/* Internal Transfers Selectors */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelectShortcut('phone')}
          className="bg-white border border-slate-100/80 hover:bg-slate-50 p-5 rounded-2xl text-left space-y-3 cursor-pointer transition-all active:scale-95"
        >
          <div className="p-3 bg-blue-50 text-[#1479FF] rounded-xl w-fit">
            <Smartphone size={20} />
          </div>
          <div>
            <span className="font-bold text-sm block text-slate-850">Бо рақами телефон</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Ба муштариёни DC</p>
          </div>
        </button>

        <button
          onClick={() => onSelectShortcut('card')}
          className="bg-white border border-slate-100/80 hover:bg-slate-50 p-5 rounded-2xl text-left space-y-3 cursor-pointer transition-all active:scale-95"
        >
          <div className="p-3 bg-blue-50 text-[#1479FF] rounded-xl w-fit">
            <CreditCard size={20} />
          </div>
          <div>
            <span className="font-bold text-sm block text-slate-850">Бо рақами корт</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Ҳамаи бонкҳои ҷумҳурӣ</p>
          </div>
        </button>
      </div>

      {/* Campaign promotion banner - International segment available again */}
      <div className="bg-gradient-to-r from-[#1861D5] to-[#0A84FF] text-white p-4 rounded-[18px] shadow-sm relative overflow-hidden">
        <div className="z-10 relative space-y-0.5">
          <span className="text-[7.5px] uppercase font-bold tracking-widest text-[#E3F2FD] bg-white/20 px-2 py-0.5 rounded-full w-fit">Хизматрасонӣ</span>
          <h4 className="font-black text-xs pt-0.5">Интиқоли фаврӣ ба хориҷа боз фаъол гардид!</h4>
          <p className="text-[8.5px] text-blue-100 max-w-[200px] leading-snug">Акнун Шумо метавонед ба кортҳои Сбербанк, Tinkoff ва суратҳисобҳо бе восита маблағ гузаронед.</p>
        </div>
        <div className="absolute right-[-10px] bottom-[-10px] w-20 h-20 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Forms Segment: Transfers abroad */}
      <div className="bg-white border border-slate-100 p-5 rounded-[22px] space-y-4">
        <div>
          <h4 className="font-extrabold text-sm text-slate-800">Интиқол ба давлатҳои хориҷӣ</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Қабулкунанда маблағро дар ارز ҷории деҳот мегирад</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-center">
          {['russia', 'uzbekistan', 'kazakhstan'].map((ctry) => (
            <button
              key={ctry}
              onClick={() => setActiveAbroad(ctry as any)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize select-none cursor-pointer transition-all ${
                activeAbroad === ctry 
                  ? 'bg-white text-slate-800 shadow-xs' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {ctry === 'russia' ? 'Россия' : ctry === 'uzbekistan' ? 'Ӯзбекистон' : 'Қазоқистон'}
            </button>
          ))}
        </div>

        {transferDone ? (
          <div className="py-6 text-center text-emerald-600 space-y-2">
            <span className="text-3xl">✈️</span>
            <h5 className="font-bold text-xs">Интиқоли байналмилалӣ дар ҳоли коркард!</h5>
            <p className="text-[10px] text-slate-400">Пардохти хориҷӣ фиристода шуд.</p>
          </div>
        ) : (
          <form onSubmit={handleAbroadSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Рақами телефони қабулкунанда</label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 font-mono text-xs">
                <span className="text-slate-500 font-bold">
                  {activeAbroad === 'russia' ? '+7' : activeAbroad === 'uzbekistan' ? '+998' : '+7'}
                </span>
                <input 
                  type="text"
                  value={abroadPhone}
                  onChange={(e) => setAbroadPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="900000000"
                  required
                  className="bg-transparent text-slate-800 font-bold outline-none flex-1 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase">Миқдори маблағ (TJS)</label>
              <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 font-mono text-xs relative">
                <input 
                  type="text"
                  value={abroadSum}
                  onChange={(e) => setAbroadSum(e.target.value.replace(/\D/g, ''))}
                  placeholder="0"
                  required
                  className="bg-transparent text-slate-850 font-bold outline-none flex-1 w-full"
                />
                <span className="absolute right-4 text-slate-400 font-mono font-bold">TJS</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1479FF] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Интиқоли фаврӣ ба хориҷа</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>

      {/* Safety info footer inside transfers */}
      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
        <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Ҳамаи амалиётҳои байналмилалӣ дар сояи қоидаҳои амниятии Бонки Миллии Тоҷикистон таҳти рамзгузории муосир тафтиш карда мешаванд.
        </p>
      </div>
    </div>
  );
};
