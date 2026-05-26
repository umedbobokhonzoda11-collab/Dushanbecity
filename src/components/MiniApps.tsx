import React, { useState, useEffect } from 'react';
import { Power, Car, BatteryCharging, ChevronRight, X, Sparkles, MapPin, Check, ShoppingBag, ShoppingCart } from 'lucide-react';

// ==========================================
// 1. NERU EV CHARGER SIMULATOR
// ==========================================
interface ChargeMeterProps {
  balance: number;
  onClose: () => void;
  onChargePayment: (amount: number) => void;
}

export const ChargeMeter: React.FC<ChargeMeterProps> = ({ balance, onClose, onChargePayment }) => {
  const [batteryLevel, setBatteryLevel] = useState(18);
  const [chargingSpeed, setChargingSpeed] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [selectedStation, setSelectedStation] = useState('Хуҷанд - Рудакӣ 45');
  const [costSelected, setCostSelected] = useState(25);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCharging) {
      setChargingSpeed(11.2);
      interval = setInterval(() => {
        setBatteryLevel((prev) => {
          if (prev >= 100) {
            setIsCharging(false);
            setChargingSpeed(0);
            setNotification('Нерудиҳӣ ба охир расид! Муҳаррики мошин омода аст.');
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    } else {
      setChargingSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isCharging]);

  const handleStartCharging = () => {
    if (balance < costSelected) {
      setNotification('Маблағ нокифоя аст!');
      return;
    }
    if (batteryLevel >= 100) {
      setBatteryLevel(18);
    }
    onChargePayment(costSelected);
    setIsCharging(true);
    setNotification('Неругирӣ оғоз шуд! Интизор шавед.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0d140e]/75 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#141E15] to-[#0A0F0A] text-white rounded-[28px] p-6 shadow-2xl border border-emerald-500/20 z-10 animate-scale-up select-none">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles size={18} />
            <span className="font-bold text-xs uppercase tracking-wider">Neru Энергия</span>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Battery widget */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative w-28 h-48 border-4 border-emerald-500/30 rounded-2xl p-1.5 flex flex-col justify-end overflow-hidden mb-4">
            {/* Battery head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-emerald-500 rounded-b-md" />
            
            {/* Liquid charge status bar */}
            <div 
              style={{ height: `${batteryLevel}%` }}
              className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-xl transition-all duration-300 flex items-center justify-center relative"
            >
              {isCharging && (
                <div className="absolute inset-x-0 bottom-0 top-0 bg-white/20 animate-pulse" />
              )}
            </div>

            {/* Float percent tag */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {isCharging ? (
                <BatteryCharging className="w-8 h-8 text-emerald-400 animate-bounce mb-1" />
              ) : (
                <Car className="w-8 h-8 text-emerald-100 opacity-80 mb-1" />
              )}
              <span className="text-3xl font-extrabold font-mono tracking-tight leading-none text-emerald-50">
                {batteryLevel}%
              </span>
              {chargingSpeed > 0 && (
                <span className="text-[10px] text-emerald-300 font-mono mt-1">{chargingSpeed} kW/s</span>
              )}
            </div>
          </div>
          <span className="text-xs text-emerald-200/50">Пуршавии барқи нақлиёт</span>
        </div>

        {/* Info panel */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3 mb-6">
          <div>
            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1">Макони заправка</label>
            <select 
              value={selectedStation} 
              onChange={(e) => setSelectedStation(e.target.value)} 
              className="w-full bg-transparent text-sm font-semibold text-emerald-300 outline-none cursor-pointer"
            >
              <option value="Хуҷанд - Рудакӣ 45" className="bg-zinc-900 text-white">Душанбе - Кӯчаи Рӯдакӣ 45</option>
              <option value="Душанбе - Садриддин Айнӣ" className="bg-zinc-900 text-white">Душанбе - Кӯчаи С. Айнӣ (Садбарг)</option>
              <option value="Хатлон - Бохтар Марказ" className="bg-zinc-900 text-white">Бохтар - Шоҳроҳи марказӣ</option>
            </select>
          </div>

          <div className="h-px bg-white/5" />

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-1.5">Миқдори маблағ барои заправка</label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 25, 50].map((sum) => (
                <button
                  key={sum}
                  onClick={() => setCostSelected(sum)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    costSelected === sum 
                      ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-md shadow-emerald-500/20' 
                      : 'bg-[#182619] text-emerald-200/80 border-white/5'
                  }`}
                >
                  {sum} TJS
                </button>
              ))}
            </div>
          </div>
        </div>

        {notification && (
          <p className="text-center font-semibold text-xs text-yellow-400 mb-4 animate-pulse">{notification}</p>
        )}

        <button
          onClick={handleStartCharging}
          disabled={isCharging}
          className={`w-full py-4 rounded-2xl font-bold text-sm select-none transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
            isCharging 
              ? 'bg-emerald-990 border border-emerald-500/20 text-emerald-400/80 cursor-not-allowed' 
              : 'bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-black'
          }`}
        >
          <Power size={18} />
          <span>{isCharging ? 'Неругирӣ рафта истодааст...' : 'Интиқоли неруро сар кун!'}</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 2. PARKING SLOT SCHEDULER
// ==========================================
interface ParkingMapProps {
  balance: number;
  onClose: () => void;
  onBookParking: (spotName: string, price: number) => void;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({ balance, onClose, onBookParking }) => {
  const [selectedZone, setSelectedZone] = useState('Айнӣ / Садбарг');
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [bookedSpots, setBookedSpots] = useState<string[]>(['A-2', 'B-1']);
  const [notification, setNotification] = useState('');

  const spots = [
    { name: 'A-1', label: 'Ҷой 01' },
    { name: 'A-2', label: 'Ҷой 02' },
    { name: 'B-1', label: 'Ҷой 03' },
    { name: 'B-2', label: 'Ҷой 04' },
    { name: 'C-1', label: 'Ҷой 05' },
    { name: 'C-2', label: 'Ҷой 06' }
  ];

  const handleBook = () => {
    if (!selectedSpot) {
      setNotification('Лутфан аввал ягон ҷойи холиро интихоб кунед.');
      return;
    }
    if (balance < 5) {
      setNotification('Маблағи корт нокифоя аст (Паркинг 5 TJS аст).');
      return;
    }
    onBookParking(`${selectedZone} [${selectedSpot}]`, 5);
    setBookedSpots((prev) => [...prev, selectedSpot]);
    setSelectedSpot(null);
    setNotification('Ҷой муваффақият фармоиш шуд!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0c131d]/75 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#111924] to-[#0A0D12] text-white rounded-[28px] p-6 shadow-2xl border border-blue-500/20 z-10 animate-scale-up select-none">
        
        {/* Header Toolbar */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 text-[#1861D5]">
            <MapPin size={18} />
            <span className="font-bold text-xs uppercase tracking-wider">Парковкам Душанбе</span>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Location selectors */}
        <div className="mb-4">
          <label className="block text-[10px] text-slate-400 font-bold mb-1.5 uppercase">Маркази парковка</label>
          <div className="flex gap-2">
            {['Айнӣ / Садбарг', 'Опера-Балет'].map((z) => (
              <button
                key={z}
                onClick={() => {
                  setSelectedZone(z);
                  setSelectedSpot(null);
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  selectedZone === z 
                    ? 'bg-[#1861D5] border-[#1861D5] text-white font-extrabold' 
                    : 'bg-white/5 border-white/5 text-slate-300'
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Grid scheme */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-5">
          <h4 className="text-center text-xs text-slate-400 mb-4 font-bold uppercase tracking-wider">Харитаи ҷойҳои мошин</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {spots.map((spot) => {
              const isOccupiedByOthers = bookedSpots.includes(spot.name) && spot.name !== 'A-2';
              const isOccupiedByMe = bookedSpots.includes(spot.name) && spot.name === 'A-2';
              const isCurrentSelection = selectedSpot === spot.name;

              return (
                <button
                  key={spot.name}
                  disabled={isOccupiedByOthers || isOccupiedByMe}
                  onClick={() => {
                    setSelectedSpot(spot.name);
                    setNotification('');
                  }}
                  className={`py-3.5 px-4 rounded-xl text-center border transition-all flex flex-col items-center gap-1.5 select-none ${
                    isOccupiedByOthers 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400/50 cursor-not-allowed' 
                      : isOccupiedByMe 
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
                      : isCurrentSelection 
                      ? 'bg-[#1861D5] border-blue-400 text-white animate-pulse' 
                      : 'bg-slate-900/60 border-white/5 hover:bg-slate-800 hover:border-white/10 text-slate-300'
                  }`}
                >
                  <Car size={16} className={isOccupiedByOthers ? 'opacity-30' : 'opacity-100'} />
                  <span className="text-xs font-mono font-bold">{spot.label}</span>
                  <span className="text-[9px] uppercase font-bold tracking-tight">
                    {isOccupiedByOthers 
                      ? 'Бандшуда' 
                      : isOccupiedByMe 
                      ? 'Ҷои Шумо' 
                      : isCurrentSelection 
                      ? 'Шумо' 
                      : 'Холӣ'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing notice */}
        <div className="flex justify-between items-center text-xs bg-white/5 p-3 rounded-xl border border-white/5 mb-4">
          <span className="text-slate-400">Нархи 1 соат таваққуф:</span>
          <span className="font-bold text-[#1861D5]">5.00 TJS</span>
        </div>

        {notification && (
          <p className="text-center font-bold text-xs text-yellow-400 mb-4 animate-pulse">{notification}</p>
        )}

        {/* Action Button */}
        <button
          onClick={handleBook}
          id="btn-confirm-parking"
          className="w-full bg-[#1861D5] hover:bg-blue-600 active:scale-95 text-white py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-md shadow-blue-500/10 cursor-pointer"
        >
          Ҳозир банд кун!
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. SHOHIN MARKETPLACE
// ==========================================
interface ShohinShopProps {
  balance: number;
  onClose: () => void;
  onOrderPlaced: (itemName: string, price: number) => void;
}

export const ShohinShop: React.FC<ShohinShopProps> = ({ balance, onClose, onOrderPlaced }) => {
  const [notification, setNotification] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const catalog = [
    { id: 'item1', name: 'Самбусаи Танӯрӣ (дошт)', price: 8, emoji: '🥟', desc: 'Самбусаи анъанавии тоҷикӣ бо гӯшти гӯсфанд' },
    { id: 'item2', name: 'Шашлыки Гӯсфандӣ (1 сих)', price: 25, emoji: '🍢', desc: 'Гӯшти резашудаи зуд омодагардида' },
    { id: 'item3', name: 'Дӯғи деҳотӣ (1л)', price: 7, emoji: '🥛', desc: 'Оби ташнагии ҳаловатбахш бо кабудӣ' },
    { id: 'item4', name: 'Халвои сурхи Самарқандӣ', price: 18, emoji: '🍬', desc: 'Халвои лазизи суннатии машҳур' }
  ];

  const handleBuy = (item: typeof catalog[0]) => {
    if (balance < item.price) {
      setNotification(`Маблағи корт барои хариди ${item.name} кам аст!`);
      return;
    }
    onOrderPlaced(item.name, item.price);
    setCartCount((c) => c + 1);
    setNotification(`Кабули фармоиш: ${item.name}! Курьер ба роҳ баромад.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#250d02]/75 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#2B1104] to-[#120701] text-white rounded-[28px] p-6 shadow-2xl border border-orange-500/20 z-10 animate-scale-up select-none max-h-[90vh] overflow-y-auto">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 text-orange-400">
            <ShoppingBag size={18} />
            <span className="font-bold text-xs uppercase tracking-wider">Шохин Маркетплейс</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative bg-orange-500/20 text-orange-400 py-1 px-2.5 rounded-full text-xs font-bold flex items-center gap-1">
              <ShoppingCart size={14} />
              <span>{cartCount}</span>
            </div>
            <button onClick={onClose} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4.5 mb-5 text-center">
          <span className="text-xl">🚀</span>
          <h4 className="font-extrabold text-[#FFA26E] text-sm mt-1">Тезтарин курьерҳои кишвар</h4>
          <p className="text-[11px] text-orange-200/60 mt-0.5">Ҳамаи хӯрокҳо ва ғизоҳои миллӣ дар 15 дақиқа ба хонаи шумо</p>
        </div>

        {/* Content list */}
        <div className="space-y-3.5 mb-5">
          {catalog.map((item) => (
            <div 
              key={item.id}
              className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 hover:bg-white/[0.06] transition-colors"
            >
              <div className="text-2xl p-2 bg-white/5 rounded-xl">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-xs text-white truncate leading-tight">{item.name}</h5>
                <p className="text-[10px] text-orange-200/40 truncate leading-normal mt-0.5">{item.desc}</p>
                <span className="text-xs text-orange-400 font-extrabold font-mono tracking-tight block mt-0.5">{item.price}.00 TJS</span>
              </div>
              <button 
                onClick={() => handleBuy(item)}
                className="bg-orange-500 hover:bg-orange-400 text-white text-xs font-extrabold py-2 px-3.5 rounded-xl active:scale-90 transition-all cursor-pointer select-none"
              >
                Харидан
              </button>
            </div>
          ))}
        </div>

        {notification && (
          <p className="text-center font-semibold text-xs text-amber-300 mt-2 animate-pulse">{notification}</p>
        )}
      </div>
    </div>
  );
};
