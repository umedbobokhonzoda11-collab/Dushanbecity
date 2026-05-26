import React from 'react';
import { X } from 'lucide-react';
import { DCLogo } from './Icons';
import { QuickTransferShort } from '../types';

interface QuickTransferProps {
  shortcuts: QuickTransferShort[];
  onRemoveShortcut: (id: string) => void;
  onSelectShortcut: (type: 'phone' | 'card') => void;
}

export const QuickTransfer: React.FC<QuickTransferProps> = ({
  shortcuts,
  onRemoveShortcut,
  onSelectShortcut,
}) => {
  return (
    <div className="px-5 py-1 select-none">
      {/* Horizontal Flex Scroll Container */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.id}
            id={`shortcut-${shortcut.id}`}
            className="relative flex flex-col items-center justify-center w-[96px] min-w-[90px] h-[76px] bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-[14px] p-1.5 text-center transition-all cursor-pointer shadow-xs active:scale-95 duration-200"
            onClick={() => onSelectShortcut(shortcut.type)}
          >
            {/* Round avatar containing DC custom brand logo */}
            <div className="w-7 h-7 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-1 shrink-0">
              <DCLogo className="w-5 h-5" />
            </div>

            {/* Title / Caption label matched perfectly to screenshot */}
            <span className="text-[8.5px] font-extrabold text-[#0D2440] leading-tight tracking-[0.01em] shrink-0">
              {shortcut.title}
            </span>

            {/* Cross 'X' dismiss badge for the card shortcut exactly as shown */}
            {shortcut.type === 'card' && (
              <button
                id="btn-remove-card-shortcut"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering the click on main body
                  onRemoveShortcut(shortcut.id);
                }}
                className="absolute top-1 right-1 p-0.5 bg-slate-100 hover:bg-slate-200 hover:text-red-500 rounded-full text-slate-400 transition-all active:scale-90"
              >
                <X size={8} className="stroke-[2.5]" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
