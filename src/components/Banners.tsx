import React, { useState } from 'react';
import { Plane, Calendar, User, CheckCircle2, Globe } from 'lucide-react';

interface BannersProps {
  balance: number;
  onDeductBalance: (amount: number) => void;
  onAddTransaction: (title: string, amount: number, category: string) => void;
}

export const Banners: React.FC<BannersProps> = ({
  balance,
  onDeductBalance,
  onAddTransaction,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isBookerOpen, setIsBookerOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('Istanbul (IST)');
  const [ticketClass, setTicketClass] = useState('Economy');
  const [isBooked, setIsBooked] = useState(false);

  const destinations = [
    { name: 'Стамбул (IST)', price: 3450 },
    { name: 'Дубай (DXB)', price: 4100 },
    { name: 'Москва (DME)', price: 2900 },
    { name: 'Ташкент (TAS)', price: 1200 },
  ];

  const handleBookTicket = () => {
    const destinationDetail = destinations.find(d => d.name === selectedDestination) || destinations[0];
    const price = destinationDetail.price;
    
    if (balance < price) {
      alert('Барои харидории чипта маблағ нокифоя аст!');
      return;
    }

    onDeductBalance(price);
    onAddTransaction(`Авиачипта: ${destinationDetail.name} (${ticketClass})`, -price, 'Авиабилеты');
    setIsBooked(true);

    setTimeout(() => {
      setIsBooked(false);
      setIsBookerOpen(false);
    }, 2500);
  };

  return (
    <div className="px-5 py-1.5 select-none">
      {/* Scrollable Container with horizontal friction and snaps */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1">
        
        {/* Banner 1: AVIA DC Ticket Booker exactly matching the photo */}
        <div 
          onClick={() => setIsBookerOpen(true)}
          className="snap-start flex-none w-[205px] h-[91px] bg-gradient-to-r from-[#D7E9FA] via-[#EAF3FA] to-[#C1DFFA] rounded-[16px] overflow-hidden relative border border-blue-100 flex items-center justify-between p-2.5 cursor-pointer hover:shadow-xs active:scale-98 transition-all"
        >
          {/* Main textual campaign content */}
          <div className="flex flex-col justify-between h-full z-10 w-[58%]">
            <div>
              <span className="text-[9px] font-black text-[#1479FF] tracking-wider uppercase leading-none block">
                БО AVIA DC
              </span>
              <h4 className="text-[10px] font-extrabold text-[#0D2440] leading-tight tracking-tight mt-0.5">
                ЧИПТАҲОРО ЗУД ВА ОСОН ГИРЕД
              </h4>
            </div>
            {/* Domain address stamp at bottom exactly as in photo */}
            <div className="flex items-center gap-1 text-[#1479FF] mt-0.5 bg-white/60 hover:bg-white/90 backdrop-blur-xs py-0.5 px-1.5 rounded-full w-fit text-[7.5px] font-bold transition-colors duration-200">
              <Globe size={8} className="stroke-[2.5]" />
              <span>avia.dc.tj</span>
            </div>
          </div>

          {/* Right graphics section capturing the travel suitcase and modern smartphone layouts */}
          <div className="relative w-[42%] h-full flex items-end justify-center">
            {/* Mini decorative clouds */}
            <div className="absolute top-0.5 right-1.5 w-7 h-2 bg-white/60 rounded-full blur-[1px]" />
            <div className="absolute top-4 left-0 w-5 h-1.5 bg-white/40 rounded-full blur-[1.5px]" />

            {/* Simulated Suitcase Vector minimized further by 20% */}
            <div className="absolute bottom-0.5 right-0.5 w-[35px] h-[61px] bg-white rounded-md shadow-xs border border-slate-200 flex flex-col justify-between items-center p-0.5 z-10 transform -rotate-[5deg]">
              {/* Suitcase handle */}
              <div className="w-3.5 h-3 border-t-[2px] border-x-[2px] border-slate-300 rounded-t-xs -mt-2.5 mb-0.5" />
              {/* Suitcase stripe details */}
              <div className="w-full flex-1 bg-slate-50 border border-slate-100/80 rounded-sm flex flex-col justify-around items-center pt-0.5">
                <div className="w-5.5 h-[1px] bg-[#1479FF] rounded-full" />
                {/* DC Logo mark on suitcase */}
                <div className="text-[5.5px] font-black text-[#FF7E00] scale-90 leading-none">
                  <span className="text-[#1479FF]">DC</span> Avia
                </div>
                <div className="w-5.5 h-[1px] bg-[#1479FF] rounded-full" />
              </div>
              {/* Spinner wheels */}
              <div className="w-full flex justify-between px-0.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
              </div>
            </div>

            {/* Simulated smartphone vector overlapping suitcase minimized further by 20% */}
            <div className="absolute bottom-0 right-[38px] w-[28px] h-[54px] bg-slate-800 rounded-sm p-0.5 border border-slate-600 shadow-sm transform rotate-[8deg] z-20">
              {/* Smartphone notch and screen */}
              <div className="w-full h-full bg-sky-100 rounded-[2px] flex flex-col items-center justify-between p-0.5 relative overflow-hidden">
                <div className="w-2.5 h-0.5 bg-slate-800 rounded-full mb-0.5" />
                <div className="flex-1 w-full bg-[#1479FF] rounded-[1.5px] p-0.5 flex flex-col justify-between text-[3px] text-white">
                  <div className="font-bold scale-75 origin-left">Fly DC</div>
                  <div className="w-full bg-white/20 h-0.5 rounded-full" />
                  <div className="w-full bg-[#FF7E00] h-1 rounded-xxs text-[2.5px] font-bold text-center leading-none flex items-center justify-center">BOOK</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner 2: Transfers Abroad available again */}
        <div className="snap-start flex-none w-[205px] h-[91px] bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-white rounded-[16px] overflow-hidden relative flex items-center justify-between p-3 cursor-pointer hover:shadow-xs active:scale-98 transition-all">
          <div className="flex flex-col justify-between h-full z-10 w-2/3">
            <div>
              <span className="text-[7.5px] font-bold tracking-wider text-[#5B2E05] uppercase bg-amber-200/45 px-1.5 py-0.5 rounded-full w-fit">
                ХИЗМАТРАСОНИИ НАВ
              </span>
              <h4 className="text-[10px] font-black text-[#4E2405] leading-tight mt-1 uppercase antialiased">
                Интиқол ба хориҷа боз дастрас шуд
              </h4>
            </div>
            <p className="text-[7.5px] text-[#5C2B04] font-medium leading-tight">Бе фоиз ба Русия, Қазоқистон ва Ӯзбекистон</p>
          </div>

          <div className="w-1/3 h-full flex items-center justify-center relative">
            {/* Spinning Coin vector in gold / amber scaled down further */}
            <div className="w-12 h-12 bg-amber-100/30 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-amber-500 rounded-full border-[2px] border-amber-300 flex items-center justify-center shadow-xs transform rotate-12">
                <span className="font-black text-white text-[9px] font-serif">TJS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TICKET BOOKING MODAL */}
      {isBookerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsBookerOpen(false)} />
          
          <div className="relative w-full max-w-sm bg-white rounded-[30px] overflow-hidden shadow-2xl z-10 animate-scale-up p-6">
            <div className="text-center mb-5">
              <div className="inline-flex p-3 bg-blue-50 text-[#1479FF] rounded-full mb-3">
                <Plane className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Харидории авиачиптаҳо</h3>
              <p className="text-xs text-slate-400 mt-1">Хидмати мустақими Avia DC</p>
            </div>

            {isBooked ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                </div>
                <h4 className="font-bold text-emerald-600 text-base">Чипта бомуваффақият харидорӣ шуд!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed px-4">
                  Маблағи чипта аз ҷониби DC Wallet супорида шуд. Нусхаи электронӣ ба почтаи шумо фиристода шуд.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Flight destinations selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Самти парвоз (Destination)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {destinations.map((dest) => (
                      <button
                        key={dest.name}
                        onClick={() => setSelectedDestination(dest.name)}
                        className={`py-2.5 px-3 text-left rounded-xl transition-all border text-xs font-semibold flex flex-col justify-between ${
                          selectedDestination === dest.name
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/10'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-100'
                        }`}
                      >
                        <span>{dest.name}</span>
                        <span className={`text-[10px] mt-1 ${selectedDestination === dest.name ? 'text-white/85' : 'text-slate-500'}`}>
                          {dest.price} TJS
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Return or date info mock */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Рӯзи парвоз</label>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 py-2 px-3 rounded-xl text-xs text-slate-600">
                      <Calendar size={14} className="text-[#1479FF]" />
                      <span>Имрӯз, 24 Май</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Класси чипта</label>
                    <div className="relative">
                      <select 
                        value={ticketClass}
                        onChange={(e) => setTicketClass(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 py-2 px-3 rounded-xl text-xs text-slate-600 focus:outline-none cursor-pointer"
                      >
                        <option value="Economy">Эконом</option>
                        <option value="Business">Бизнес (+1200 TJS)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bill payment summary */}
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Нархи асосӣ:</span>
                    <span className="font-semibold text-slate-700">
                      {(destinations.find(d => d.name === selectedDestination)?.price || 0)} TJS
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Интихоби класс:</span>
                    <span className="font-semibold text-slate-700">
                      {ticketClass === 'Business' ? '+1200 TJS' : '0 TJS'}
                    </span>
                  </div>
                  <div className="h-px bg-slate-200/50 my-1" />
                  <div className="flex justify-between items-center font-bold text-sm">
                    <span className="text-slate-800">Ҳамагӣ барои пардохт:</span>
                    <span className="text-[#1479FF]">
                      {(destinations.find(d => d.name === selectedDestination)?.price || 0) + (ticketClass === 'Business' ? 1200 : 0)} TJS
                    </span>
                  </div>
                </div>

                {/* Execute button */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={handleBookTicket}
                    className="flex-1 bg-[#1479FF] hover:bg-[#1069DD] active:scale-95 text-white font-semibold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#1479FF]/10"
                  >
                    <span>Пардохти фаврӣ</span>
                  </button>
                  <button
                    onClick={() => setIsBookerOpen(false)}
                    className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3.5 rounded-2xl text-xs transition-all cursor-pointer"
                  >
                    Бекор кардан
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
