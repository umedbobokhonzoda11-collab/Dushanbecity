import React from 'react';
import { X } from 'lucide-react';
import { DCLogo, AlifLogo, AnorLogo } from './Icons';
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
    <div className="px-5 py-0.5 select-none">
      {/* Horizontal Flex Scroll Container */}
      <div className="flex gap-4 overflow-x-auto pb-1.5 scrollbar-none">
        {shortcuts.map((shortcut) => {
          const isPhone = shortcut.id === 'phone' || shortcut.id === 'alif';
          const typeToSelect = shortcut.type;

          return (
            <div
              key={shortcut.id}
              id={`shortcut-${shortcut.id}`}
              className="relative flex flex-col items-center justify-center bg-white border border-slate-100/90 hover:border-slate-200/95 hover:bg-slate-50/50 rounded-[12px] text-center transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 duration-200 w-[72px] min-w-[72px] h-[66px] p-1"
              onClick={() => onSelectShortcut(typeToSelect)}
            >
              {/* Logo representation corresponding to each brand */}
              <div className="w-[30px] h-[30px] flex items-center justify-center mb-0.5 shrink-0">
                {shortcut.brand === 'alif' ? (
                  <AlifLogo className="w-[30px] h-[30px]" />
                ) : shortcut.brand === 'anor' ? (
                  <AnorLogo className="w-[30px] h-[30px]" />
                ) : (
                  <div className="w-[30px] h-[30px] rounded-full bg-[#f1f5f9] flex items-center justify-center">
                    <DCLogo className="w-[21px] h-[21px]" />
                  </div>
                )}
              </div>

              {/* Title / Caption label matched perfectly to screenshot */}
              <span className="text-[7.2px] leading-[1.1] font-semibold text-slate-800 tracking-tight shrink-0 text-center whitespace-pre-line flex-1 flex items-center justify-center w-full">
                {shortcut.title}
              </span>

              {/* Cross 'X' dismiss badge for custom brand shortcuts exactly as shown inside the picture */}
              {shortcut.canDismiss && (
                <button
                  id={`btn-remove-shortcut-${shortcut.id}`}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering the click on main body
                    onRemoveShortcut(shortcut.id);
                  }}
                  className="absolute top-1.5 right-1.5 p-0.5 text-slate-400 hover:text-red-500 rounded-full transition-all active:scale-90"
                >
                  <X size={9} className="stroke-[2.2]" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
