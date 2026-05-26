import React, { useState, useEffect } from 'react';
import { Camera, X, Check, QrCode, ClipboardList } from 'lucide-react';

interface ScannerModalProps {
  balance: number;
  onClose: () => void;
  onScanComplete: (scannedData: string, sum: number) => void;
  onAddTransaction: (title: string, amount: number, category: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  balance,
  onClose,
  onScanComplete,
  onAddTransaction,
}) => {
  const [scanState, setScanState] = useState<'scanning' | 'found' | 'insufficient' | 'success'>('scanning');
  const [scannedBill, setScannedBill] = useState({ name: 'Dushanbe Mall Supermarket', sum: 24.50 });

  useEffect(() => {
    // Simulate auto scan in 2 seconds
    const timer = setTimeout(() => {
      setScanState('found');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleApproveScan = () => {
    if (balance < scannedBill.sum) {
      setScanState('insufficient');
      return;
    }
    onScanComplete(scannedBill.name, scannedBill.sum);
    setScanState('success');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 select-none text-slate-800">
      {/* Black backdrop with high opacity */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xs" onClick={onClose} />

      {/* Container widget */}
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl z-10 p-6 text-white min-h-[420px] flex flex-col justify-between">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sky-400">
            <Camera size={20} className="animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-widest uppercase">Сканери рамзи QR</span>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Dynamic viewport renderer based on state */}
        {scanState === 'scanning' && (
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="relative w-56 h-56 border-2 border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
              
              {/* Green targeting brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-sky-400 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-sky-400 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-sky-400 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-sky-400 rounded-br-lg" />
              
              {/* Glowing camera scanning bar laser */}
              <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-md shadow-sky-400 animate-bounce" />

              {/* Central scanning artwork symbol */}
              <QrCode size={56} className="text-zinc-600 animate-pulse" />
            </div>
            
            <p className="text-xs font-medium text-zinc-400 mt-5 text-center px-4 leading-relaxed">
              Рамзи QR-ро ба дохили чорчӯба оред. Сканеркунӣ мустақилона оғоз меёбад...
            </p>
          </div>
        )}

        {scanState === 'found' && (
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-blue-500/10 text-sky-400 rounded-full flex items-center justify-center mb-4 border border-sky-500/20">
              <ClipboardList size={28} />
            </div>
            
            <h4 className="font-extrabold text-white text-base text-center">Пардохти муайяншуда!</h4>
            <p className="text-xs text-sky-300 font-bold mt-1 text-center bg-sky-950/40 border border-sky-500/15 py-1 px-3 rounded-full">{scannedBill.name}</p>

            <div className="bg-white/5 border border-white/5 w-full max-w-xs rounded-2xl p-4 mt-6 text-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Маблағи пардохт</span>
              <div className="text-3xl font-black font-mono tracking-tight text-white mt-1">
                {scannedBill.sum.toFixed(2)} TJS
              </div>
            </div>

            <div className="flex gap-2 w-full mt-6">
              <button 
                onClick={handleApproveScan}
                className="flex-1 bg-sky-500 hover:bg-sky-400 text-black font-extrabold py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Тасдиқи пардохт
              </button>
              <button 
                onClick={() => setScanState('scanning')}
                className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Аз нав
              </button>
            </div>
          </div>
        )}

        {scanState === 'insufficient' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
            <span className="text-4xl mb-3">⚠️</span>
            <h4 className="font-bold text-red-400 text-base">Маблағ кам аст!</h4>
            <p className="text-xs text-zinc-400 mt-2 px-6">
              Барои гузаронидани ин пардохт ({scannedBill.sum} TJS) дар тавозуни Шума маблағи кофӣ мавҷуд нест.
            </p>
            <button 
              onClick={() => setScanState('scanning')}
              className="mt-6 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Қафо
            </button>
          </div>
        )}

        {scanState === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
              <Check size={32} className="animate-bounce" />
            </div>
            <h4 className="font-bold text-emerald-400 text-base">Гузаронида шуд!</h4>
            <p className="text-xs text-zinc-400 mt-2">
              Шумо бомуваффақият пардохтро анҷом додед.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
