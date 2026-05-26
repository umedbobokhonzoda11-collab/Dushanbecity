import React, { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectAction: (actionType: 'payment' | 'neru' | 'parking' | 'shohin' | 'avia' | 'credits') => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectAction }) => {
  const [query, setQuery] = useState('');

  const searchableItems = [
    { title: 'Алоқаи мобилӣ (Пардохти симкорт)', category: 'Оплата услуг', action: 'payment' },
    { title: 'Neru (Барқдиҳии мошин)', category: 'MiniApps', action: 'neru' },
    { title: 'Parking (Бандкунии ҷойи мошин)', category: 'MiniApps', action: 'parking' },
    { title: 'Шохин (Фармоиши хӯрок ва интиқол)', category: 'MiniApps', action: 'shohin' },
    { title: 'Avia DC (Харидории авиачиптаҳо)', category: 'Авиабилеты', action: 'avia' },
    { title: 'Пешниҳоди қарзҳои хурд (Кредитҳо)', category: 'Финансы', action: 'credits' },
  ];

  const filteredItems = searchableItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 select-none text-slate-800">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl z-10 animate-scale-up h-[460px] flex flex-col justify-between">
        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          
          {/* Header block with search text input */}
          <div className="flex justify-between items-center gap-3 shrink-0">
            <div className="flex-1 flex items-center gap-2 bg-slate-100 border border-slate-200/20 px-4 py-2.5 rounded-2xl">
              <Search size={16} className="text-[#1861D5]" />
              <input 
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ҷустуҷӯи хизматрасониҳо..."
                className="bg-transparent text-xs font-semibold text-slate-800 outline-none flex-1 w-full"
              />
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-2xl cursor-pointer text-slate-500 hover:text-slate-700 font-semibold"
            >
              <X size={15} />
            </button>
          </div>

          {/* Results list dynamic filter */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                Ҳеҷ чиз ёфт нашуд
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectAction(item.action as any);
                    onClose();
                  }}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-150 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-colors active:scale-98"
                >
                  <div className="min-w-0">
                    <span className="text-[9px] font-black text-[#1861D5] uppercase tracking-wider block">{item.category}</span>
                    <h4 className="font-extrabold text-xs text-slate-800 leading-snug mt-1 truncate">{item.title}</h4>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Suggestion notice at the bottom */}
        <div className="text-[10px] text-slate-400 text-center pt-2 grow-0 shrink-0 select-none border-t border-slate-100 mt-3">
          Тайп кунед, то хизматрасониҳои бештар пайдо шавад.
        </div>
      </div>
    </div>
  );
};
