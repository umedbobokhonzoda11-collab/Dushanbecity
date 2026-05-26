import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { MOBILE_PROVIDERS } from '../data';

interface MobilePaymentModalProps {
  balance: number;
  onClose: () => void;
  onPay: (providerName: string, phone: string, amount: number) => void;
}

export const MobilePaymentModal: React.FC<MobilePaymentModalProps> = ({
  balance,
  onClose,
  onPay,
}) => {
  const [selectedProvider, setSelectedProvider] = useState(MOBILE_PROVIDERS[1]); // MegaFon default
  const [phoneNumber, setPhoneNumber] = useState('901458899'); // realistic last digits
  const [payAmount, setPayAmount] = useState('50');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleExecutePayment = () => {
    const val = +payAmount;
    if (!phoneNumber || phoneNumber.length < 9) {
      setErrorMessage('Лутфан рақами телефонро дуруст ворид созед (9 рақам).');
      return;
    }
    if (isNaN(val) || val <= 0) {
      setErrorMessage('Миқдори маблағро дуруст ворид кунед.');
      return;
    }
    if (balance < val) {
      setErrorMessage('Маблағ дар тавозун кофӣ нест!');
      return;
    }

    setErrorMessage('');
    onPay(selectedProvider.name, phoneNumber, val);
    setPaymentSuccess(true);

    setTimeout(() => {
      setPaymentSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      {/* Backdrop backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      {/* Modal element */}
      <div className="relative w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl z-10 animate-scale-up select-none">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-lg text-slate-800">Пардохти алоқаи мобилӣ</h3>
          <button onClick={onClose} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer transition-colors">
            <X size={16} />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-500/10">
              <Check className="w-8 h-8 text-emerald-500 animate-bounce" />
            </div>
            <h4 className="font-extrabold text-emerald-600 text-base">Пардохт бомуваффақият гузашт!</h4>
            <p className="text-xs text-slate-500 mt-1">
              Ба рақами +992 {phoneNumber} маблағи {payAmount} TJS ворид карда шуд.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Operator selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Оператори алоқа</label>
              <div className="grid grid-cols-4 gap-2">
                {MOBILE_PROVIDERS.map((prov) => (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvider(prov)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                      selectedProvider.id === prov.id
                        ? 'border-blue-500 bg-blue-50/50 scale-102 outline-none'
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span 
                      style={{ backgroundColor: prov.color }}
                      className="w-7 h-7 rounded-lg text-white font-black flex items-center justify-center text-xs"
                    >
                      {prov.logo}
                    </span>
                    <span className="text-[9px] font-bold text-slate-700 truncate w-full">{prov.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Рақами телефон</label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-mono text-sm">
                <span className="text-slate-400 font-bold">+992</span>
                <input 
                  type="text" 
                  maxLength={9}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="900000000"
                  className="bg-transparent text-slate-800 font-bold outline-none flex-1 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Маблағи воридшаванда (TJS)</label>
              <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-mono text-sm relative">
                <input 
                  type="text" 
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value.replace(/\D/g, ''))}
                  placeholder="0.00"
                  className="bg-transparent text-slate-800 font-extrabold outline-none w-full"
                />
                <span className="absolute right-4 text-slate-400 font-bold text-xs select-none">TJS</span>
              </div>
            </div>

            <div className="bg-blue-50/40 p-3 rounded-2xl flex justify-between items-center text-xs text-slate-600 border border-blue-100/30">
              <span>Хизматрасонии бе фоиз</span>
              <span className="font-bold text-[#1479FF]">0.0% Комиссия</span>
            </div>

            {errorMessage && (
              <p className="text-center font-bold text-xs text-red-500 mb-2 animate-pulse">{errorMessage}</p>
            )}

            <button
              onClick={handleExecutePayment}
              className="w-full bg-[#1479FF] hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Пардохти фаврӣ ({payAmount || 0} TJS)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
