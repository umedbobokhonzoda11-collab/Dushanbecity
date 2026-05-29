import React, { useState } from 'react';
import { PaymentIllustration, CreditCardIllustration } from './Icons';
import { Landmark, TrendingUp, Home, ChevronRight, X, Phone, DollarSign, Sparkles } from 'lucide-react';
import { MobilePaymentModal } from './MobilePaymentModal';

interface CategoryGridProps {
  balance: number;
  onDeductBalance: (amount: number) => void;
  onAddTransaction: (title: string, amount: number, category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  balance,
  onDeductBalance,
  onAddTransaction,
}) => {
  const [activeModal, setActiveModal] = useState<'payment' | 'cards' | 'credits' | 'deposits' | 'homes' | 'documents' | 'citycard' | 'news' | null>(null);
  const [cityCardBalance, setCityCardBalance] = useState(12.50);
  const [cityCardTopup, setCityCardTopup] = useState('10');
  
  // Custom Card states
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [cardLimit, setCardLimit] = useState(5000);

  // Credit Tool States
  const [borrowSum, setBorrowSum] = useState(1500);
  const [months, setMonths] = useState(6);
  const [creditRequested, setCreditRequested] = useState(false);

  // Deposit States
  const [depositSum, setDepositSum] = useState(5000);
  const [depositPlan, setDepositPlan] = useState(24);

  // Communal States
  const [electricityPaid, setElectricityPaid] = useState(false);

  return (
    <div className="px-5 py-2 select-none">
      
      {/* HIGH FIDELITY 8-CARD GRID CORRESPONDING EXACTLY TO TELEGRAM SCREENSHOT */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* CARD 1: Оплата услуг (Spans 2 columns) */}
        <div 
          onClick={() => setActiveModal('payment')}
          id="block-services-payment"
          className="col-span-2 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-tight">
              Оплата услуг
            </h3>
            <span className="text-[11px] font-semibold text-[#8B9AA8] mt-1 block">
              Мобильная связь
            </span>
          </div>

          {/* Precise High-Fidelity blue pouch icon representation aligned at bottom right */}
          <div className="absolute bottom-2.5 right-3.5 pointer-events-none select-none">
            <div className="relative w-[50px] h-[38px] flex items-center justify-center">
              {/* Back flap */}
              <div className="absolute bottom-0 right-[4px] w-[38px] h-[30px] bg-[#93C5FD] rounded-[10px]" />
              {/* Overlapping flap card */}
              <div className="absolute bottom-[3px] right-[10px] w-[34px] h-[28px] bg-[#1479FF] rounded-[8px] rotate-[-8deg] flex items-center justify-center shadow-xs">
                <div className="w-[4px] h-3 bg-white/30 rounded-full" />
              </div>
              {/* Front wallet pouch body */}
              <div className="absolute bottom-0 right-0 w-[42px] h-[26px] bg-[#BFDBFE] rounded-[9px] border border-white/20" />
            </div>
          </div>
        </div>

        {/* CARD 2: Карты (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('cards')}
          id="block-cards"
          className="col-span-1 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-tight">
              Карты
            </h3>
          </div>

          {/* Precise yellow card icon representation aligned at bottom right */}
          <div className="absolute bottom-3 right-3 pointer-events-none select-none">
            <div className="w-[38px] h-[26px] bg-[#FACC15] rounded-[6px] relative overflow-hidden flex flex-col justify-between p-1 shadow-xs border border-[#EAB308]/20">
              <div className="w-full h-[3.5px] bg-[#EAB308] rounded-xs mt-0.5" />
              <div className="flex gap-0.5 mt-2">
                <div className="w-1 h-[2px] bg-[#EAB308] rounded-2xs" />
                <div className="w-1.5 h-[2px] bg-[#EAB308] rounded-2xs" />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Кредиты (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('credits')}
          className="col-span-1 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-tight">
              Кредиты
            </h3>
          </div>

          {/* Pink check-purse icon aligned at bottom right */}
          <div className="absolute bottom-2.5 right-3 pointer-events-none select-none">
            <div className="relative w-[38px] h-[34px] flex items-center justify-center">
              {/* Silver/pink buckle */}
              <div className="w-4 h-3.5 border-t-[2.5px] border-x-[2.5px] border-[#DB2777] rounded-t-full absolute top-[1px]" />
              {/* Purse body */}
              <div className="w-[38px] h-[24px] bg-[#FBCFE8] rounded-[7px] absolute bottom-0 shadow-2xs flex items-center justify-center">
                <div className="w-[11px] h-[11px] rounded-full bg-[#DB2777] flex items-center justify-center text-white scale-[0.85] font-black leading-none">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Депозиты (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('deposits')}
          className="col-span-1 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-tight">
              Депозиты
            </h3>
          </div>

          {/* Green folders with I+I aligned at bottom right */}
          <div className="absolute bottom-2.5 right-3 pointer-events-none select-none">
            <div className="relative w-[36px] h-[32px] flex items-center justify-center">
              {/* Back folder */}
              <div className="absolute bottom-0 right-0 w-[28px] h-[25px] bg-[#15803D] rounded-[7px] rotate-[8deg]" />
              {/* Front folder */}
              <div className="absolute bottom-[2px] right-[4px] w-[28px] h-[25px] bg-[#86EFAC] rounded-[7px] shadow-2xs flex items-center justify-center border border-[#4ADE80]/10">
                <span className="text-[9.5px] font-black text-[#15803D] leading-none select-none tracking-tight">
                  I+I
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: Мои дома (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('homes')}
          className="col-span-1 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-semibold text-[#111827] tracking-tight leading-tight">
              Мои дома
            </h3>
          </div>

          {/* Solid blue house icon aligned at bottom right */}
          <div className="absolute bottom-3 right-3 pointer-events-none select-none text-[#1479FF]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[30px] h-[30px]">
              <path d="M19 21H15V15H9V21H5V10L12 3L19 10V21Z" />
            </svg>
          </div>
        </div>

        {/* CARD 6: Документы (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('documents')}
          className="col-span-1 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            {/* Forced word wrap as shown in screenshot */}
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              Документ<br/>ы
            </h3>
          </div>

          {/* Gray files capsule indicator at bottom right */}
          <div className="absolute bottom-3 right-3 pointer-events-none select-none">
            <div className="w-[34px] h-[25px] bg-[#94A3B8] rounded-[6px] relative overflow-hidden flex flex-col justify-end p-1 gap-0.5 shadow-2xs">
              <div className="w-[18px] h-[2px] bg-[#475569] rounded-full mx-auto" />
              <div className="w-[18px] h-[2px] bg-[#475569] rounded-full mx-auto" />
            </div>
          </div>
        </div>

        {/* CARD 7: CityCard (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('citycard')}
          className="col-span-1 bg-white border border-slate-100/75 hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-tight">
              CityCard
            </h3>
          </div>

          {/* Beautiful high quality CityCard monogram SVG logo bottom right */}
          <div className="absolute bottom-2.5 right-1.5 pointer-events-none select-none">
            <div className="flex items-center gap-0.5">
              {/* Outer logo circle */}
              <div className="w-[26px] h-[26px] rounded-full border-[1.8px] border-[#1479FF] flex items-center justify-center relative shrink-0">
                {/* Dushanbe monument silhouette sketch inside */}
                <div className="w-[8px] h-3.5 flex flex-col items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-[#1479FF]" />
                  <div className="w-[2px] h-[6px] bg-[#1479FF]" />
                  <div className="w-1.5 h-[1.5px] bg-[#1479FF]" />
                </div>
              </div>
              <div className="flex flex-col items-start leading-[0.9] text-[#1479FF] tracking-tighter shrink-0 select-none font-bold">
                <span className="text-[10px] font-black -mb-0.5">ity</span>
                <span className="text-[8.5px] font-bold opacity-80">ard</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 8: Новости (Spans 1 column) */}
        <div 
          onClick={() => setActiveModal('news')}
          className="col-span-1 bg-white border border-[#F1F5F9] hover:bg-slate-50/40 rounded-[20px] p-4 h-[100px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-[0.97] transition-all duration-200"
        >
          <div className="z-10 text-left">
            <h3 className="text-[14.5px] font-extrabold text-[#111827] tracking-tight leading-tight">
              Новости
            </h3>
          </div>

          {/* Gray folder / newsletter page with a tiny blue ribbon tag aligned bottom right */}
          <div className="absolute bottom-2.5 right-3.5 pointer-events-none select-none">
            <div className="relative w-[30px] h-[34px] bg-[#CBD5E1] rounded-[5px] flex flex-col justify-end p-1 shadow-2xs border border-slate-300/30">
              {/* Bookmark hanger blue decoration */}
              <div className="absolute top-0 right-1 w-[8px] h-4 bg-[#1479FF] rounded-b-[2px]" />
              {/* Layout line representation */}
              <div className="w-2.5 h-[2px] bg-slate-500 rounded-full mb-0.5 opacity-60" />
              <div className="w-[14px] h-[2px] bg-slate-500 rounded-full opacity-60" />
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          INTERACTIVE OVERLAYS FOR THE GRID
         ========================================== */}

      {/* 1. MOBILE PAYMENT DIALOG */}
      {activeModal === 'payment' && (
        <MobilePaymentModal 
          balance={balance} 
          onClose={() => setActiveModal(null)} 
          onPay={(providerName, phone, amount) => {
            onDeductBalance(amount);
            onAddTransaction(`${providerName} Пополнение (+992 ${phone})`, -amount, 'Мобильная связь');
          }}
        />
      )}

      {/* 2. CARDS MANAGEMENT */}
      {activeModal === 'cards' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-800">Мудири кортҳо</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            {/* Simulated primary Korti Milli bank card */}
            <div className={`w-full h-44 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 ${isCardFrozen ? 'bg-zinc-600 opacity-85 saturate-[0.2]' : 'bg-gradient-to-br from-indigo-900 to-indigo-700'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 tracking-widest">Korti Milli</span>
                  <p className="text-sm font-semibold tracking-wide">Корти Дастрасӣ (DC)</p>
                </div>
                {/* Micro chip in silver */}
                <div className="w-10 h-8 bg-zinc-300 opacity-90 rounded-md shadow-xs border border-zinc-400/30" />
              </div>

              <div>
                <span className="text-xl font-mono tracking-widest">•••• •••• •••• 4823</span>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs opacity-75">Умед Бобохонзода</span>
                  <span className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded">UnionPay</span>
                </div>
              </div>
            </div>

            {/* Interactive Card Controls */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Ях кунонии корт / Заморозка</span>
                  <span className="text-[10px] text-slate-400">Кортро муваққатан ғайрифаъол созед</span>
                </div>
                <button 
                  onClick={() => setIsCardFrozen(!isCardFrozen)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${isCardFrozen ? 'bg-teal-500' : 'bg-slate-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isCardFrozen ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="py-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                  <span>Лимити харидории шабонарӯзӣ</span>
                  <span className="text-[#1479FF] font-mono">{cardLimit} TJS</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={cardLimit} 
                  onChange={(e) => setCardLimit(+e.target.value)}
                  className="w-full accent-[#1479FF] cursor-pointer"
                />
              </div>

              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-[#1479FF] hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl text-xs transition-all cursor-pointer"
              >
                Тайёр аст (Save Settings)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CREDITS LOAN CALCULATOR */}
      {activeModal === 'credits' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-800">Микро-кредитҳои фаврӣ</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            {creditRequested ? (
              <div className="text-center py-6">
                <span className="text-4xl animate-bounce inline-block">🎉</span>
                <h4 className="font-bold text-emerald-600 mt-2 mb-1 text-sm">Дархост қабул гардид!</h4>
                <p className="text-xs text-slate-500 px-3 max-w-xs leading-relaxed">
                  Кумитаи молиявии DC дархости қарзиро дар давоми 5 дақиқа дида баромада ба рақами мобилии Шумо хабар медиҳад.
                </p>
                <button 
                  onClick={() => {
                    setCreditRequested(false);
                    setActiveModal(null);
                  }}
                  className="mt-6 px-6 py-2.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl"
                >
                  Бастан
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100/50">
                  <div className="flex justify-between mb-1 text-xs">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Маблағи зарурии қарз</span>
                    <span className="font-mono font-bold text-slate-800">{borrowSum} TJS</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="15000" 
                    step="500"
                    value={borrowSum} 
                    onChange={(e) => setBorrowSum(+e.target.value)}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                    <span>500 TJS</span>
                    <span>15,000 TJS</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100/50">
                  <div className="flex justify-between mb-1 text-xs">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Мӯҳлати пардохт (моҳҳо)</span>
                    <span className="font-mono font-bold text-slate-800">{months} моҳ</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" 
                    max="24" 
                    step="3"
                    value={months} 
                    onChange={(e) => setMonths(+e.target.value)}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                    <span>3 моҳ</span>
                    <span>24 моҳ</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100/30 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Фоизи солона:</span>
                    <span className="font-bold text-emerald-600">14% (Korti Milli спец)</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-800 font-bold">
                    <span>Пардохти моҳона:</span>
                    <span className="text-[#1479FF]">
                      {((borrowSum * 1.14) / months).toFixed(2)} TJS / моҳ
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setCreditRequested(true)}
                  className="w-full bg-[#1479FF] hover:bg-blue-600 text-white font-semibold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Landmark size={14} />
                  <span>Ирсол кардани дархост</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SAVINGS DEPOSITS */}
      {activeModal === 'deposits' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-800">Депозитҳои даромаднок</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold">Пешниҳоди ҷолиб!</span>
                  <p className="mt-0.5 opacity-90">Манфиати солона то 12.5% бо кафолати давлатии суратҳисобҳо.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Суммаи сармоя (TJS)</label>
                <input 
                  type="number"
                  value={depositSum}
                  onChange={(e) => setDepositSum(+e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Мӯҳлати пасандоз</label>
                <div className="grid grid-cols-3 gap-2">
                  {[6, 12, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setDepositPlan(m)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        depositPlan === m 
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/10' 
                          : 'bg-slate-50 text-slate-600 border-slate-100'
                      }`}
                    >
                      {m} моҳ
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Фоизи муайяншуда:</span>
                  <span className="font-bold text-emerald-600">{depositPlan === 24 ? '12.5%' : '10.0%'} солона</span>
                </div>
                <div className="h-px bg-slate-200/50 my-1" />
                <div className="flex justify-between text-sm text-slate-800 font-bold">
                  <span>Даромади соф (Profit):</span>
                  <span className="text-emerald-600">
                    {((depositSum * (depositPlan === 24 ? 0.125 : 0.10) * depositPlan) / 12).toFixed(2)} TJS
                  </span>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert(`Ҳисоби Депозитӣ барои ${depositSum} TJS бомуваффақият кушода шуд!`);
                  onDeductBalance(depositSum);
                  onAddTransaction('Сармоягузории Депозитӣ', -depositSum, 'Депозиты');
                  setActiveModal(null);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl text-xs transition-all cursor-pointer"
              >
                Кушодани суратҳисоб
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MY HOMES (COMMUNAL PAYMENTS) */}
      {activeModal === 'homes' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-800">Макони ман (Мусолиҳа)</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50/50 border border-blue-50 p-4 rounded-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-slate-800">Барқи Душанбе (Ширкати барқ)</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Ҳисоби инфиродӣ: № 34/24912</span>
                  </div>
                  <span className={`text-[10px] font-bold py-0.5 px-2.5 rounded-full ${electricityPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {electricityPaid ? 'Пардохташуд' : 'Боқимонда'}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-slate-500">Маблағи қарз:</span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    {electricityPaid ? '0.00 TJS' : '65.20 TJS'}
                  </span>
                </div>
              </div>

              {!electricityPaid && (
                <button 
                  onClick={() => {
                    const price = 65.20;
                    if (balance < price) {
                      alert('Барои пардохти нерӯи барқ маблағ кам аст!');
                      return;
                    }
                    onDeductBalance(price);
                    onAddTransaction('Пардохти Барқи Душанбе (Коммуналӣ)', -price, 'Коммунальные');
                    setElectricityPaid(true);
                  }}
                  className="w-full bg-[#1479FF] hover:bg-blue-600 text-white font-bold py-3 rounded-2xl text-xs transition-all cursor-pointer"
                >
                  Пардохт кардан (65.20 TJS)
                </button>
              )}

              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-2xl text-xs transition-all cursor-pointer"
              >
                Баргаштан ба қафо
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. DOCUMENTS MODAL */}
      {activeModal === 'documents' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-800">Ҳуҷҷатҳои электронӣ</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              
              {/* ID-CARD */}
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-bold text-slate-400">FA'OL</span>
                </div>

                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-bold text-[#1479FF] uppercase tracking-wider block">ID-Карта гражданина РТ</span>
                  <span className="text-xs font-black text-slate-800">Бобохонзода Умед</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Рақами шиноснома</span>
                    <span className="font-bold text-slate-700 font-mono">A11928341</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">ПИНФЛ</span>
                    <span className="font-bold text-slate-700 font-mono">1100319985</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Дода шуд</span>
                    <span className="font-bold text-slate-700">12.05.2023</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Мӯҳлат то</span>
                    <span className="font-bold text-slate-700">12.05.2033</span>
                  </div>
                </div>
              </div>

              {/* DRIVER LICENSE */}
              <div className="bg-gradient-to-r from-blue-50/50 to-blue-50/20 border border-blue-100 p-4.5 rounded-2xl space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-bold text-slate-400">FA'OL</span>
                </div>

                <div className="border-b border-blue-100 pb-2">
                  <span className="text-[10px] font-bold text-[#1479FF] uppercase tracking-wider block">Водительское удостоверение</span>
                  <span className="text-xs font-black text-slate-800">Бобохонзода Умед</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Категорияҳо</span>
                    <span className="font-bold text-slate-700 font-mono">B, C</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Рақами ҳуҷҷат</span>
                    <span className="font-bold text-slate-700 font-mono">DL-9381204</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Дода шуд</span>
                    <span className="font-bold text-slate-700">18.11.2022</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Мӯҳлат то</span>
                    <span className="font-bold text-slate-700 font-mono">18.11.2032</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-2xl text-xs transition-all cursor-pointer mt-2"
              >
                Бастан
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. CITYCARD MODAL */}
      {activeModal === 'citycard' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-slate-800">CityCard Душанбе</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            <div className="space-y-4">
              
              {/* Virtual physical RFID Card graphic */}
              <div className="w-full h-40 bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-4.5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-30px] w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-80 block">Хидмати Нақлиёт</span>
                    <span className="text-xs font-black">Шаҳри Душанбе</span>
                  </div>
                  {/* Monogram logo nested */}
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black tracking-tighter">CC</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] block opacity-75">Рақами корт</span>
                    <span className="font-mono text-sm tracking-wider font-bold">0424 9381 2049</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block opacity-75">Баланси корт</span>
                    <span className="text-lg font-mono font-black">{cityCardBalance.toFixed(2)} TJS</span>
                  </div>
                </div>
              </div>

              {/* Top-up Form */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Пополнить CityCard аз ҳамёни асосӣ</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={cityCardTopup}
                    onChange={(e) => setCityCardTopup(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-semibold outline-none text-slate-800 font-mono"
                    placeholder="Сумма (TJS)"
                  />
                  <button
                    onClick={() => {
                      const amountVal = parseFloat(cityCardTopup);
                      if (isNaN(amountVal) || amountVal <= 0) {
                        alert('Лутфан маблағи дурустро ворид кунед!');
                        return;
                      }
                      if (balance < amountVal) {
                        alert('Дар ҳамёни Шумо маблағ нокифоя аст!');
                        return;
                      }
                      onDeductBalance(amountVal);
                      setCityCardBalance(prev => prev + amountVal);
                      onAddTransaction(`Пополнение CityCard (Транспорт)`, -amountVal, 'Транспорт');
                      alert(`CityCard бомуваффақият ба маблағи ${amountVal} TJS пополнить шуд!`);
                    }}
                    className="bg-[#1479FF] hover:bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Пардохт
                  </button>
                </div>
                <div className="flex gap-1.5 justify-start">
                  {['5', '10', '20', '50'].map(val => (
                    <button
                      key={val}
                      onClick={() => setCityCardTopup(val)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                        cityCardTopup === val 
                          ? 'bg-[#E4ECF6] text-[#1479FF] border-[#1479FF]/30' 
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      +{val} TJS
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-2xl text-xs transition-all cursor-pointer text-center"
              >
                Баргаштан ба қафо
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. NEWS MODAL */}
      {activeModal === 'news' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-lg text-[#111827]">Навигариҳои DC Wallet</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"><X size={16} /></button>
            </div>

            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] uppercase font-mono font-bold text-[#1479FF] block mb-1">ФИНТЕХ (25.05.2026)</span>
                <h4 className="font-black text-slate-800 text-xs mb-1">Интиқол аз Русия бо Сифрфоиз (0% комиссия)!</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Акнун бо кортҳои Сбербанк, Т-Банк ё ВТБ мустақиман ба ҳамёни DC Wallet маблағро бе ягон фоиз ва бо қурби беҳтарин интиқол намоед. Наздикони худро шод кунед!
                </p>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 block mb-1">КЕШБЭКИ ДӮСТОНА (24.05.2026)</span>
                <h4 className="font-black text-slate-850 text-xs mb-1">3% Кешбэк дар супермаркетҳои шаҳр</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ҳангоми харидорӣ дар супермаркетҳои Ашан ва Пайкар, тавассути DC Wallet бо QR-код пардохт намоед ва 3% маблағро фавран ба таври кешбэк ба даст оред!
                </p>
              </div>

              <div className="pb-1">
                <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 block mb-1">КОРТИ ХОНАВӢ (20.05.2026)</span>
                <h4 className="font-black text-slate-850 text-xs mb-1">Citycard бо ҳамёни умумӣ дастрас шуд</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Акнун метавонед ба осонӣ тавассути замимаи мо Citycard-ҳои кӯдакон ё волидони худро пайваст ва идора кунед.
                </p>
              </div>

              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-[#1479FF] text-white font-bold py-3.5 rounded-2xl text-xs transition-all cursor-pointer text-center"
              >
                Олӣ (Fҳмидам)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
