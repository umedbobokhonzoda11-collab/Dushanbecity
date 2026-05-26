import React, { useState } from 'react';
import { X, Check, CreditCard, Smartphone } from 'lucide-react';

interface TransferModalProps {
  type: 'phone' | 'card';
  balance: number;
  onClose: () => void;
  onTransferComplete: (recipientName: string, amount: number) => void;
  onAddTransaction: (title: string, amount: number, category: string) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  type,
  balance,
  onClose,
  onTransferComplete,
  onAddTransaction,
}) => {
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  const [sumStr, setSumStr] = useState('');
  const [status, setStatus] = useState<'form' | 'confirm' | 'success'>('form');
  const [errorStr, setErrorStr] = useState('');
  const [recipient, setRecipient] = useState('');

  // Sample recipient suggestions based on input sequence
  const getSimulatedRecipient = () => {
    if (type === 'phone') {
      return 'Азизхон Ш. (фаъол)';
    } else {
      return 'Комилҷон Б. (корти милли)';
    }
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    // Format date as DD.MM.YY
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear().toString().slice(-2);
    const formattedDate = `${day}.${month}.${year}`;
    
    // Format time as HH:MM:SS
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    return { date: formattedDate, time: formattedTime };
  };

  const handleExecute = () => {
    const val = +sumStr;
    setErrorStr('');

    if (type === 'phone' && (!phone || phone.length < 9)) {
      setErrorStr('Лутфан рақами телефони қабулкунандаро ворид кунед (9 рақам).');
      return;
    }

    if (type === 'card' && (!card || card.replace(/\s/g, '').length < 16)) {
      setErrorStr('Лутфан рақами корти қабулкунандаро ворид созед (16 рақам).');
      return;
    }

    if (isNaN(val) || val <= 0) {
      setErrorStr('Нархи гузаронидашавандаро дуруст ворид созед.');
      return;
    }

    if (balance < val) {
      setErrorStr('Маблағ дар тавозун кофӣ нест!');
      return;
    }

    const rec = getSimulatedRecipient();
    setRecipient(rec);
    setStatus('confirm');
  };

  const handleConfirmPay = () => {
    const val = +sumStr;
    const rec = recipient || getSimulatedRecipient();

    // Create operation
    const prefix = phone.startsWith('992') ? '' : '992';
    const txTitle = type === 'phone' 
      ? `${prefix}${phone}`
      : `Интиқол ба корт **** ${card.slice(-4)}`;

    onTransferComplete(rec, val);
    onAddTransaction(txTitle, -val, 'Переводы');
    setStatus('success');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#07162C]/35 z-50 flex items-start justify-center p-0 sm:items-center sm:p-4 animate-fade-in text-slate-800 select-none">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Container Card */}
      <div className="relative w-full sm:max-w-[430px] bg-white rounded-none overflow-hidden shadow-2xl z-10 flex flex-col justify-between h-screen sm:h-auto sm:max-h-[92vh] animate-slide-up border border-slate-100">
        
        {/* Header matching screenshot 100% */}
        <div className="bg-[#1479FF] text-white px-4 py-4 flex items-center justify-between shadow-sm shrink-0">
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-[17px] tracking-wide">
            {type === 'phone' ? 'DC (по номеру телефона)' : 'DC (по номеру карты)'}
          </span>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5.5 h-5.5 text-white/95">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.24.588 1.81l-3.97 2.887a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.887a1 1 0 00-1.17 0l-3.971 2.887c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.887c-.772-.57-.373-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" fill="currentColor" />
            </svg>
          </button>
        </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col justify-between relative">
            <div className="space-y-4">
              
              {/* Recipients Form Fields */}
              {type === 'phone' ? (
                <div className="space-y-3.5">
                   {/* Phone Input Card element styled perfectly like the image */}
                  <div className="bg-white rounded-[16px] border border-slate-100/80 flex items-center justify-between px-4 py-3.5 shadow-xs">
                    <input 
                      type="tel"
                      inputMode="numeric"
                      maxLength={9}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Номер телефона получ..."
                      className="bg-transparent text-slate-800 font-medium text-[15px] outline-none flex-1 w-full placeholder-slate-400/80"
                    />
                    <div className="flex items-center gap-3.5 text-[#1479FF] shrink-0 pl-2">
                      {/* Clock Icon */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {/* Contact book Profile Icon */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                  </div>

                  {/* "Проверить номер/счет" checking button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (phone.length >= 9) {
                        setRecipient('Азизхон Ш. (фаъол)');
                      }
                    }}
                    className="w-full border border-[#1479FF]/35 bg-transparent hover:bg-blue-50/40 text-[#1479FF] text-sm font-semibold py-3.5 px-4 rounded-[18px] transition-all cursor-pointer text-center select-none"
                  >
                    Проверить номер/счет
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="bg-white rounded-[16px] border border-slate-100/80 flex items-center justify-between px-4 py-3.5 shadow-xs">
                    <input 
                      type="tel"
                      inputMode="numeric"
                      maxLength={19}
                      value={card}
                      onChange={(e) => setCard(formatCardNumber(e.target.value))}
                      placeholder="Номер карты получателя..."
                      className="bg-transparent text-slate-800 font-medium text-[15px] outline-none flex-1 w-full placeholder-slate-400/80"
                    />
                    <div className="text-[#1479FF] shrink-0 pl-2">
                      <CreditCard size={18} className="opacity-80" />
                    </div>
                  </div>

                  <div className="w-full text-center text-[11px] text-slate-400 font-medium">
                    Интиқоли байнибонкӣ тариқи Корти Миллӣ
                  </div>
                </div>
              )}

              {/* Sum input with currency label */}
              <div className="bg-white rounded-[16px] border border-slate-100/80 flex items-center px-4 py-3.5 shadow-xs font-sans">
                <span className="text-slate-400 font-medium text-[15.5px] mr-2 select-none">TJS</span>
                <input 
                  type="tel"
                  inputMode="decimal"
                  value={sumStr}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
                    const parts = cleaned.split('.');
                    if (parts.length > 2) return;
                    setSumStr(cleaned);
                  }}
                  placeholder="Сумма"
                  className="bg-transparent text-slate-800 font-bold text-[15.5px] outline-none flex-1 w-full"
                />
              </div>

              {/* Comment Input */}
              <div className="bg-white rounded-[16px] border border-slate-100/80 px-4 py-3.5 shadow-xs font-sans">
                <input 
                  type="text"
                  placeholder="Комментарий"
                  className="bg-transparent text-slate-800 font-medium text-[15px] outline-none w-full placeholder-slate-400/80"
                />
              </div>

              {/* Min amount info exactly aligned */}
              <div className="text-right text-[11.5px] text-slate-400/90 font-medium select-none pr-1">
                Мин. сумма: 1.00 TJS
              </div>

              {/* Account Cards row 100% resembling screenshot */}
              <div className="py-2.5">
                <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-none">
                  
                  {/* Card 1: Main DBC Card */}
                  <div className="min-w-[116px] w-[116px] bg-[#1479FF] text-white p-3 rounded-[15px] shadow-sm flex flex-col justify-between h-[72px] shrink-0 relative overflow-hidden">
                    <div className="absolute top-[-30px] right-[-30px] w-14 h-14 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <span className="text-[9px] uppercase font-bold tracking-tight text-white/80 block">DBC****9372</span>
                    <div className="space-y-px">
                      <div className="text-xs font-black tracking-tight font-mono whitespace-nowrap">{balance.toFixed(2)} TJS</div>
                    </div>
                  </div>

                  {/* Card 2: Credits Card with NEW label */}
                  <div className="min-w-[116px] w-[116px] bg-gradient-to-tr from-[#1A5AE5] via-[#4382FC] to-[#FFC53D] text-white p-3 rounded-[15px] shadow-sm flex flex-col justify-between h-[72px] shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 px-1.5 py-0.5 rounded-bl-lg text-[6px] font-extrabold uppercase tracking-widest text-white shadow-xs">
                      NEW
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-tight text-white/90 block font-semibold font-sans">КРЕДИТЫ</span>
                    <div className="space-y-px">
                      <div className="text-xs font-black font-mono leading-none">-</div>
                    </div>
                  </div>

                  {/* Card 3: Babilon cards option */}
                  <div className="min-w-[116px] w-[116px] bg-white border border-slate-100 text-slate-800 p-3 rounded-[15px] shadow-xs flex flex-col justify-between h-[72px] shrink-0 select-none">
                    <span className="text-[9px] font-bold text-slate-400 tracking-tight block">BAB****....</span>
                    <div className="space-y-px">
                      <div className="text-xs font-extrabold font-mono text-slate-300 leading-none">...</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Informative description paragraph under items */}
              <p className="text-[10.5px] leading-relaxed text-slate-500 font-medium px-1 antialiased text-justify font-sans">
                Для перевода на карту Душанбе Сити укажите номер кошелька и введите сумму перевода. Без комиссии. Если вы отправили деньги не тому человеку, обратитесь к получателю перевода. Деньги может вернуть только получатель.
              </p>

              {errorStr && (
                <p className="text-center font-bold text-xs text-red-500 animate-pulse">{errorStr}</p>
              )}

            </div>

            {/* Submit layout wrapper for orange "Далее" button placement */}
            <div className="pt-4 pb-2">
              <button
                type="button"
                onClick={handleExecute}
                className="w-full bg-[#FF7020] hover:bg-[#E05E12] text-white font-black py-4 rounded-[20px] text-[15.5px] tracking-wide transition-all cursor-pointer text-center select-none shadow-md shadow-orange-500/10 active:scale-[0.98] duration-100"
              >
                Далее
              </button>
            </div>

            {/* CONFIRMATION OVERLAY WITH EXACT ACCENTS AS PORTRAYED IN SCREENSHOT 2 */}
            {status === 'confirm' && (
              <div className="absolute inset-x-0 bottom-0 top-0 bg-[#07162C]/40 z-30 flex flex-col justify-end animate-fade-in duration-200">
                <div className="absolute inset-0" onClick={() => setStatus('form')} />
                
                {/* Drawer bottom container */}
                <div className="relative bg-white rounded-t-[30px] shadow-2xl z-40 px-5 pt-3.5 pb-6 animate-slide-up flex flex-col w-full border-t border-slate-100">
                  
                  {/* Handle indicator bar */}
                  <div className="w-11 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-4.5 shrink-0" />

                  {/* Info Header Box in light blue */}
                  <div className="bg-[#EDF5FF] border border-[#D5E6FF]/60 rounded-[18px] py-4.5 px-4 text-center mb-4.5 shrink-0">
                    <span className="text-[#6C8DAE] text-[12.5px] font-medium tracking-wide block">
                      Подтверждение платежа
                    </span>
                    <span className="text-[#1479FF] text-[31px] font-black tracking-tight block mt-1 leading-none font-sans">
                      {Number(sumStr || 0).toFixed(2)} TJS
                    </span>
                  </div>

                  {/* Gray rows container with complete alignment */}
                  <div className="bg-[#F8F9FA] rounded-[24px] p-4 space-y-3 mb-6 shrink-0 border border-slate-100/40">
                    
                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans">
                      <span className="text-[#8B9DAE] font-medium">Поставщик:</span>
                      <span className="text-slate-800 font-extrabold text-right max-w-[65%] truncate">
                        {type === 'phone' ? 'DC (по номеру телефона)' : 'DC (по номеру карты)'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/10">
                      <span className="text-[#8B9DAE] font-medium">Номер/Счет</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">{phone || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/10">
                      <span className="text-[#8B9DAE] font-medium">Способ оплаты:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">9762 **** **** 9372</span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/10">
                      <span className="text-[#8B9DAE] font-medium">Сумма зачисления:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">{Number(sumStr || 0).toFixed(2)} TJS</span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/10">
                      <span className="text-[#8B9DAE] font-medium">Комиссия:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">0.00 TJS</span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-2 border-t border-slate-200/50">
                      <span className="text-[#8B9DAE] font-bold">Сумма списания:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right text-[13.5px]">
                        {Number(sumStr || 0).toFixed(2)} TJS
                      </span>
                    </div>

                  </div>

                  {/* The big orange submit wrapper */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={handleConfirmPay}
                      className="w-full bg-[#FF7020] hover:bg-[#E05E12] text-white font-extrabold py-4 rounded-[20px] text-[16px] tracking-wide transition-all cursor-pointer text-center select-none shadow-md shadow-orange-500/10 active:scale-[0.98] duration-100"
                    >
                      Подтверждаю
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* SUCCESS SCREEN OVERLAY - EXTREMELY EXACT MATCH OF SCREENSHOT 2 */}
          {status === 'success' && (
            <div className="absolute inset-x-0 bottom-0 top-0 bg-[#07162C]/40 z-30 flex flex-col justify-end animate-fade-in duration-200">
              <div className="absolute inset-0" onClick={onClose} />
              
              {/* Drawer bottom container */}
              <div className="relative bg-white rounded-t-[30px] shadow-2xl z-40 px-5 pt-3.5 pb-6 animate-slide-up flex flex-col w-full border-t border-slate-100">
                
                {/* Handle indicator bar */}
                <div className="w-11 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-5 shrink-0" />

                {/* Checked Circle from Screenshot */}
                <div className="flex justify-center mt-1 mb-3.5 select-none">
                  <div className="w-[74px] h-[74px] bg-[#E5F9F6] rounded-full flex items-center justify-center">
                    <div className="w-[32px] h-[32px] rounded-full border-[2.2px] border-[#20C997] bg-[#E5F9F6] flex items-center justify-center text-[#20C997]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px]">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Dynamic Title with Bright Blue color */}
                <h2 className="text-[#1479FF] font-bold text-[22.5px] text-center tracking-tight mb-5 font-sans leading-none">
                  Платеж выполнен
                </h2>

                {/* White-gray card container with exact options matching screenshot */}
                <div className="bg-[#F8F9FA] rounded-[24px] p-5 space-y-4 mb-6 shrink-0 border border-slate-100/40 text-[13.5px] leading-tight font-sans">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B9DAE] font-medium">Поставщик:</span>
                    <span className="text-slate-800 font-extrabold pr-0.5">DC (по номеру телефона)</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                    <span className="text-[#8B9DAE] font-medium">Получатель:</span>
                    <span className="text-slate-800 font-extrabold font-mono">{phone || '781110204'}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                    <span className="text-[#8B9DAE] font-medium">К зачислению:</span>
                    <span className="text-slate-800 font-extrabold font-mono text-right">
                      {sumStr ? Number(sumStr).toString() : '1'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                    <span className="text-[#8B9DAE] font-medium">Комиссия:</span>
                    <span className="text-slate-800 font-extrabold font-mono text-right">0.00</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                    <span className="text-[#8B9DAE] font-medium">Дата:</span>
                    <span className="text-slate-800 font-extrabold font-mono text-right">
                      {getFormattedDateTime().date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                    <span className="text-[#8B9DAE] font-medium">Время:</span>
                    <span className="text-slate-800 font-extrabold font-mono text-right">
                      {getFormattedDateTime().time}
                    </span>
                  </div>

                </div>

                {/* Perfect Blue Home Button inside "На главную" */}
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-[#1479FF] hover:bg-[#0c66db] text-white font-extrabold py-4 rounded-[20px] text-[16.5px] tracking-wide transition-all cursor-pointer text-center select-none shadow-md shadow-blue-500/10 active:scale-[0.98] duration-100 font-sans"
                  >
                    На главную
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
  );
};
