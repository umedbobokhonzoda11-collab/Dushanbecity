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
  const [activeModal, setActiveModal] = useState<'payment' | 'cards' | 'credits' | 'deposits' | 'homes' | null>(null);
  
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
    <div className="px-5 py-1.5 select-none space-y-3">
      
      {/* ROW 1: TWO MAIN BENTO BLOCKS WITH HEIGHT REDUCED BY 25% AND PAYMENT STRETCHED 30% RIGHT */}
      <div className="flex gap-3">
        
        {/* BLOCK 1: Оплата услуг (Mobile payment) with style-based flex 1.45 */}
        <div 
          onClick={() => setActiveModal('payment')}
          id="block-services-payment"
          style={{ flex: '1.45 1 0%' }}
          className="bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-[20px] p-3 h-[90px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-98 transition-all duration-200"
        >
          <div className="z-10 animate-fade-in text-left">
            <h3 className="text-[13px] font-black text-slate-800 tracking-tight leading-none mb-0.5">
              Оплата услуг
            </h3>
            <span className="text-[9px] font-medium text-slate-400">
              Мобильная связь
            </span>
          </div>

          {/* Icon vector aligned to the bottom right of the card */}
          <div className="absolute bottom-0 right-0 pointer-events-none">
            <PaymentIllustration className="w-11 h-11 opacity-95" />
          </div>
        </div>

        {/* BLOCK 2: Карты (Cards manager) with style-based flex 0.55 */}
        <div 
          onClick={() => setActiveModal('cards')}
          id="block-cards"
          style={{ flex: '0.55 1 0%' }}
          className="bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-[20px] p-3 h-[90px] flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs active:scale-98 transition-all duration-200"
        >
          <div className="z-10 animate-fade-in text-left">
            <h3 className="text-[13px] font-black text-slate-800 tracking-tight leading-none">
              Карты
            </h3>
          </div>

          {/* Yellow Credit Card graphic aligned to bottom right */}
          <div className="absolute bottom-0.5 right-0.5 pointer-events-none">
            <CreditCardIllustration className="w-[48px] h-[34px] opacity-100" />
          </div>
        </div>
      </div>

      {/* ROW 2: THREE SMALL PILLS Grid */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* BLOCK 3: Кредиты */}
        <div 
          onClick={() => setActiveModal('credits')}
          className="bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-[22px] py-3.5 px-4 text-left flex flex-col justify-between h-[84px] cursor-pointer shadow-xs active:scale-95 transition-all duration-200"
        >
          <Landmark size={18} className="text-[#1479FF]" />
          <span className="text-[13px] font-semibold text-slate-700 tracking-tight">
            Кредиты
          </span>
        </div>

        {/* BLOCK 4: Депозиты */}
        <div 
          onClick={() => setActiveModal('deposits')}
          className="bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-[22px] py-3.5 px-4 text-left flex flex-col justify-between h-[84px] cursor-pointer shadow-xs active:scale-95 transition-all duration-200"
        >
          <TrendingUp size={18} className="text-[#1479FF]" />
          <span className="text-[13px] font-semibold text-slate-700 tracking-tight">
            Депозиты
          </span>
        </div>

        {/* BLOCK 5: Мои дома */}
        <div 
          onClick={() => setActiveModal('homes')}
          className="bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-[22px] py-3.5 px-4 text-left flex flex-col justify-between h-[84px] cursor-pointer shadow-xs active:scale-95 transition-all duration-200"
        >
          <Home size={18} className="text-[#1479FF]" />
          <span className="text-[13px] font-semibold text-slate-700 tracking-tight">
            Мои дома
          </span>
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

    </div>
  );
};
