import React, { useState } from 'react';
import { Transaction } from '../types';
import { Share2, Download, Star, RefreshCw, X } from 'lucide-react';

interface HistoryTabProps {
  transactions: Transaction[];
  onClearHistory: () => void;
}

// Logo inside the receipt exactly matching the visual layout of "DC City Dushanbe"
const DCReceiptLogo: React.FC<{ className?: string }> = ({ className = 'w-[125px] h-[44px]' }) => {
  return (
    <svg viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Dynamic slanted D & C overlap from branding */}
      <path d="M12 10H34C48 10 56 18 56 34C56 50 48 58 34 58H12V10ZM30 46H33C39 46 42 43 42 34C42 25 39 22 33 22H30V46Z" fill="#1176F2" />
      <path d="M54 21C58 14 66 11 74.5 13C76 13.5 76.5 15.5 75.5 17C75 18 73 18.5 71.5 18C65.5 16.5 61.5 20 60 25.5C58 33.5 62.5 41.5 70.5 42C72.5 42 74.5 43.5 75 45.5C75.5 47.5 74 49.5 72 49.5C61 48.5 52.5 39 52.5 28C52.5 24.5 53 22 54 21Z" fill="#FD7235" />
      {/* Text block: CITY DUSHANBE inside receipt with precise layout positioning */}
      <text x="82" y="32" fill="#1176F2" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" letterSpacing="0.04em">CITY</text>
      <text x="82" y="52" fill="#1176F2" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="19" letterSpacing="0.03em">DUSHANBE</text>
    </svg>
  );
};

// High fidelity mock statement transaction values matching the uploaded screenshot exactly
const statementGroups = [
  {
    group: 'Сегодня',
    items: [
      {
        id: 'st-1',
        topLine1: 'DCWallet*DCWallet**TAJIKISTAN',
        topLine2: '--781110204-Anor',
        cardNo: '9762 0000 0539 9372',
        bottomLabel: 'Списание / операция по счету',
        amount: '-1.00',
        time: '06:24:11',
        date: '25.05.2026',
        opNumber: '1781110204',
        provider: 'Anor',
        sender: '9762 0000 0539 9372',
        receiver: '781110204',
      }
    ]
  },
  {
    group: 'Вчера',
    items: [
      {
        id: 'st-2',
        topLine1: 'DCWallet*WDC0000**TAJIKISTAN',
        topLine2: '992988479974-992003633535-',
        cardNo: '9762 0000 0539 9372',
        bottomLabel: 'Дебетная часть P2P/операции',
        amount: '-2.50',
        time: '18:51:05',
        date: '24.05.2026',
        opNumber: '1730605655',
        provider: 'DC (по номеру телефона)',
        sender: '9762 0000 0539 9372',
        receiver: '992003633535',
      },
      {
        id: 'st-3',
        topLine1: 'DCWallet*DCWallet**TAJIKISTAN',
        topLine2: '--781110204-Anor',
        cardNo: '9762 0000 0539 9372',
        bottomLabel: 'Списание / операция по счету',
        amount: '-65.00',
        time: '07:53:34',
        date: '24.05.2026',
        opNumber: '1781110205',
        provider: 'Anor',
        sender: '9762 0000 0539 9372',
        receiver: '781110204',
      }
    ]
  },
  {
    group: '23.05.2026',
    items: [
      {
        id: 'st-4',
        topLine1: '*DCWallet**TAJIKISTAN',
        topLine2: '--939631818-«Алиф Банк», alif mo',
        cardNo: '9762 0000 0539 9372',
        bottomLabel: 'Списание / операция по счету',
        amount: '-12.00',
        time: '21:00:14',
        date: '23.05.2026',
        opNumber: '1793963182',
        provider: 'Алиф Банк',
        sender: '9762 0000 0539 9372',
        receiver: '939631818',
      }
    ]
  }
];

export const HistoryTab: React.FC<HistoryTabProps> = ({
  transactions,
  onClearHistory,
}) => {
  const [subTab, setSubTab] = useState<'operations' | 'statement'>('operations');

  // Receipt modal states
  const [selectedReceipt, setSelectedReceipt] = useState<{
    date: string;
    time: string;
    opNumber: string;
    provider: string;
    sender: string;
    receiver: string;
    amount: string;
    fee: string;
    status: string;
  } | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const generateOpNumber = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(1730000000 + (hash % 9999999)).toString();
  };

  // Hardcoded screenshot transactions to preserve exact match as requested
  const screenshotTransactions = [
    {
      id: 'sc-1',
      cardName: '9762***9372',
      number: '992003633535',
      label: 'DC (по номеру телефона)',
      amount: '2.50',
      time: '18:51:18',
    },
    {
      id: 'sc-2',
      cardName: '9762***9372',
      number: '781110204',
      label: 'Anor',
      amount: '65.00',
      time: '07:53:47',
    }
  ];

  const handleSelectStatic = (item: typeof screenshotTransactions[0]) => {
    if (item.id === 'sc-1') {
      setSelectedReceipt({
        date: '24.05.2026',
        time: item.time,
        opNumber: '1730605655',
        provider: 'DC (по номеру телефона)',
        sender: item.cardName,
        receiver: item.number,
        amount: item.amount,
        fee: '0.00',
        status: 'Успешный',
      });
    } else {
      setSelectedReceipt({
        date: '24.05.2026',
        time: item.time,
        opNumber: '1730605680', // matches receipt screenshot 100%!
        provider: 'Anor',
        sender: item.cardName,
        receiver: item.number,
        amount: item.amount,
        fee: '0.00',
        status: 'Успешный',
      });
    }
    setIsFavorite(false);
  };

  const handleSelectDynamic = (tx: Transaction) => {
    const parts = tx.title.split(': ');
    const displayTitle = parts[1] || tx.title;
    const formattedDateOnly = tx.date.split(' ')[0] || '24.05.2026';
    const formattedTimeOnly = tx.date.split(' ')[1] || '12:00:00';
    const isPhoneTx = /^\d+$/.test(tx.title);

    setSelectedReceipt({
      date: formattedDateOnly,
      time: formattedTimeOnly,
      opNumber: generateOpNumber(tx.id),
      provider: isPhoneTx ? 'DC (по номеру телефона)' : (tx.category === 'Мобильная связь' ? 'Мобильная связь' : (tx.category || 'DC перевод')),
      sender: '9762***9372',
      receiver: displayTitle,
      amount: Math.abs(tx.amount).toFixed(2),
      fee: '0.00',
      status: 'Успешный',
    });
    setIsFavorite(false);
  };

  const handleSelectStatementItem = (item: typeof statementGroups[0]['items'][0]) => {
    setSelectedReceipt({
      date: item.date,
      time: item.time,
      opNumber: item.opNumber,
      provider: item.provider,
      sender: item.sender,
      receiver: item.receiver,
      amount: String(Math.abs(parseFloat(item.amount)).toFixed(2)),
      fee: '0.00',
      status: 'Успешный',
    });
    setIsFavorite(false);
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col pt-0 relative select-none min-h-0">
      
      {/* 1. Header Navigation sub-tabs - shrink-0 ensures it stays statically fixed at the top */}
      <div className="flex bg-white w-full border-b border-slate-100 shrink-0">
        <button 
          onClick={() => setSubTab('operations')}
          className={`flex-1 text-center py-4 font-black text-[15px] tracking-tight transition-all border-b-[2.5px] ${
            subTab === 'operations' 
              ? 'text-[#005FF7] border-[#005FF7]' 
              : 'text-slate-500 border-transparent hover:text-slate-700'
          }`}
        >
          Операции
        </button>
        <button 
          onClick={() => setSubTab('statement')}
          className={`flex-1 text-center py-4 font-semibold text-[15px] tracking-tight transition-all border-b-[2.5px] ${
            subTab === 'statement' 
              ? 'text-[#005FF7] border-[#005FF7]' 
              : 'text-slate-500 border-transparent hover:text-slate-700'
          }`}
        >
          Выписка
        </button>
      </div>

      {subTab === 'operations' ? (
        <div className="flex-1 overflow-y-auto pb-32 pt-1 flex flex-col select-none animate-scale-up">
          
          {/* 2. "Обновлено: 24.05.26 - 23:13" & circular checkmark icon */}
          <div className="flex items-center justify-center gap-1 text-[#8B9AA8] text-[11px] font-bold mt-4 select-none">
            <span>Обновлено: 24.05.26 - 23:13</span>
            <div className="w-[13px] h-[13px] rounded-full border border-[#005FF7] flex items-center justify-center text-[7.5px] font-black text-[#005FF7] leading-none select-none ml-0.5 shrink-0">
              ✓
            </div>
          </div>

          {/* 3. Center pill-badge "Сегодня" */}
          <div className="flex justify-center mt-3 mb-2">
            <span className="bg-[#E4ECF6] text-[#3D5A80] text-[10.5px] font-extrabold px-4.5 py-1 rounded-full select-none tracking-tight">
              Сегодня
            </span>
          </div>

          {/* 4. White container card with list items mapped precisely */}
          <div className="mx-4.5 bg-white border border-slate-100 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.015)] px-4.5 py-3 divide-y divide-slate-100/70">
            
            {/* Real-time Dynamic payments prepend at the top inside clean styling */}
            {transactions.map((tx) => {
              // Extract a visual label and subtitle based on transaction logic
              const parts = tx.title.split(': ');
              const displayTitle = parts[1] || tx.title;
              const formattedTime = tx.date.split(' ')[1] || '12:00:00';

              return (
                <div 
                  key={tx.id} 
                  onClick={() => handleSelectDynamic(tx)}
                  className="py-3 flex items-start justify-between cursor-pointer hover:bg-slate-50/80 active:scale-[0.99] transition-all duration-150 rounded-xl px-2 -mx-2"
                >
                  <div className="space-y-0.5 text-left">
                    <div className="text-[10px] text-slate-400 font-mono font-medium tracking-tight">9762***9372</div>
                    <div className="text-[16.5px] font-extrabold text-[#0D2440] tracking-tight leading-tight py-0.5 truncate max-w-[190px]">
                      {tx.category === 'Мобильная связь' ? displayTitle : tx.title}
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      {/^\d+$/.test(tx.title) ? 'DC (по номеру телефона)' : (tx.category || 'DC перевод')}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1 pt-1">
                      <span className={`text-[16.5px] font-black font-sans ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {tx.amount > 0 ? '+' : ''}{Math.abs(tx.amount).toFixed(2)}
                      </span>
                      <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[#0FC18A] bg-white flex items-center justify-center text-[8.5px] font-black text-[#0FC18A] leading-none shrink-0 select-none">
                        ✓
                      </div>
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-mono mt-0.5 font-medium">{formattedTime}</div>
                  </div>
                </div>
              );
            })}

            {/* Static screenshot items */}
            {screenshotTransactions.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleSelectStatic(item)}
                className="py-3.5 flex items-start justify-between cursor-pointer hover:bg-slate-50/80 active:scale-[0.99] transition-all duration-150 rounded-xl px-2 -mx-2 first:pt-1.5 last:pb-1.5"
              >
                <div className="space-y-0.5 text-left">
                  <div className="text-[10px] text-slate-400 font-mono font-medium tracking-tight">{item.cardName}</div>
                  <div className="text-[16.5px] font-extrabold text-[#0D2440] tracking-tight leading-tight py-0.5">
                    {item.number}
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-medium">{item.label}</div>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-[16.5px] font-black text-slate-800 font-sans">{item.amount}</span>
                    <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[#0FC18A] bg-white flex items-center justify-center text-[8.5px] font-black text-[#0FC18A] leading-none shrink-0 select-none">
                      ✓
                    </div>
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-mono mt-0.5 font-medium">{item.time}</div>
                </div>
              </div>
            ))}

          </div>

          {/* 5. Orange-coral "Загрузить ещё" button */}
          <div className="px-4.5 mt-4 select-none">
            <button 
              onClick={() => {}}
              className="w-full bg-[#FD7235] hover:bg-[#E25C22] active:scale-98 transition-all duration-200 text-white text-[14px] font-extrabold py-3.5 rounded-[18px] shadow-sm shadow-[#FD7235]/15 tracking-[0.01em]"
            >
              Загрузить ещё
            </button>
          </div>

        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-32 pt-1 flex flex-col select-none animate-scale-up">
          
          {/* 1. "Обновлено: 25.05.26 - 06:29" & circular checkmark icon as seen on the screenshot */}
          <div className="flex items-center justify-center gap-1 text-[#8B9AA8] text-[11px] font-bold mt-4 select-none">
            <span>Обновлено: 25.05.26 - 06:29</span>
            <div className="w-[13px] h-[13px] rounded-full border border-[#005FF7] flex items-center justify-center text-[7.5px] font-black text-[#005FF7] leading-none select-none ml-0.5 shrink-0">
              ✓
            </div>
          </div>

          {/* Render Groups precisely */}
          {statementGroups.map((group) => (
            <div key={group.group} className="flex flex-col mt-4">
              
              {/* Group Pill Badge (Сегодня, Вчера, 23.05.2026) */}
              <div className="flex justify-center mb-2.5">
                <span className="bg-[#E4ECF6] text-[#3D5A80] text-[10.5px] font-extrabold px-4.5 py-1 rounded-full select-none tracking-tight">
                  {group.group}
                </span>
              </div>

              {/* White Container Card holding group items */}
              <div className="mx-4.5 bg-white border border-slate-100 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] px-4.5 py-1 divide-y divide-slate-100/70">
                {group.items.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectStatementItem(item)}
                    className="flex justify-between items-start py-4 cursor-pointer hover:bg-slate-50/50 active:scale-[0.99] transition-all rounded-2xl px-2.5 -mx-2.5"
                  >
                    <div className="flex-1 text-left pr-2 space-y-0.5">
                      <div className="text-[10px] text-[#8B9AA8] font-bold font-sans tracking-tight uppercase leading-snug">
                        {item.topLine1}
                      </div>
                      <div className="text-[10px] text-[#8B9AA8] font-bold font-sans tracking-tight uppercase leading-snug">
                        {item.topLine2}
                      </div>
                      <div className="text-[16px] font-black text-slate-900 tracking-wide mt-1.5 mb-1.5 font-sans">
                        {item.cardNo}
                      </div>
                      <div className="text-[11.5px] text-[#8B9AA8] font-medium font-sans">
                        {item.bottomLabel}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end pt-1 shrink-0">
                      <span className="text-[17px] font-black text-slate-800 font-sans tracking-tight">
                        {item.amount}
                      </span>
                      <span className="text-[11px] text-[#8B9AA8] font-medium font-mono mt-1">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      )}

      {/* 6. Floating blue action icon button ( = ) in the bottom right corner */}
      <div className="absolute bottom-24 right-5.5 z-20">
        <button 
          id="history-filter-menu"
          className="w-13 h-13 bg-[#1176F2] hover:bg-[#005FF7] active:scale-92 transition-all cursor-pointer text-white flex flex-col gap-1 items-center justify-center rounded-[18px] shadow-lg shadow-[#1176F2]/30"
        >
          <div className="w-5 h-0.75 bg-white rounded-full" />
          <div className="w-4.5 h-0.75 bg-white rounded-full" />
        </button>
      </div>

      {/* 7. HIGH-FIDELITY RECEIPT MODALS ATTACHED DIRECTLY MATCHING THE USER'S PHOTO 100% */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-[#07162C]/35 z-50 flex items-end justify-center pb-0 px-0 sm:items-center sm:p-4 animate-fade-in text-slate-800">
          <div className="bg-white w-full sm:max-w-[365px] rounded-none overflow-hidden shadow-2xl flex flex-col justify-between h-[calc(100vh-56px)] sm:h-auto sm:max-h-[92vh] animate-slide-up border border-slate-100">
            
            {/* Top sheet drag handle */}
            <div className="w-10 h-0.75 bg-[#E2E8F0] rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

            {/* Scrollable Receipt Area */}
            <div className="flex-1 overflow-y-auto px-4.5 pb-4 pt-2.5 scrollbar-none">
              
              {/* Header block with Logo and Company info side-by-side exactly like the photo */}
              <div className="flex items-center justify-between gap-2 mb-2 select-none">
                <div className="flex items-center shrink-0">
                  <div className="flex items-center gap-1">
                    {/* High-Fidelity DC Brand Vector Mark with accurate overlapping D and C curves */}
                    <svg viewBox="0 0 100 100" fill="none" className="w-[34px] h-[34px] shrink-0">
                      <path 
                        d="M12 20H44C66 20 78 32 78 50C78 68 66 80 44 80H12V20ZM34 68H41C52 68 58 62 58 50C58 38 52 32 41 32H34V68Z" 
                        fill="#1176F2" 
                      />
                      <path 
                        d="M84 35C79 25 70 22 60 23.5C58.5 24 58 25.5 59 27C60 28.5 61.5 29 63.5 28.5C69.5 27 74 30 75.5 36C77 44 72 52.5 64 53C62 53 60.5 54.5 59.5 56C59 57.5 60 59.5 61.5 59.5C72.5 58 82 49 82 38.5C82 37 81.5 35.5 81 35H84Z" 
                        fill="#FD7235" 
                      />
                      <rect x="34" y="46" width="9" height="6" rx="1" fill="#FD7235" />
                    </svg>
                    {/* Text block: CITY DUSHANBE inside receipt with precise layout positioning */}
                    <div className="flex flex-col select-none text-left">
                      <span className="text-[#1176F2] font-[900] text-[15.5px] leading-[0.95] tracking-[0.02em] font-sans">
                        DC
                      </span>
                      <span className="text-[#1176F2] font-[900] text-[8.5px] leading-[0.95] tracking-[0.1em] font-sans uppercase">
                        CITY
                      </span>
                      <span className="text-[#1176F2] font-[800] text-[8.5px] leading-[0.95] tracking-[0.03em] font-sans uppercase">
                        DUSHANBE
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-[9px] text-[#8E9AA0] font-medium leading-[1.25] tracking-normal select-none">
                  <div>ЗАО "Душанбе Сити Банк"</div>
                  <div>ИНН: 510022404</div>
                  <div>Таджикистан, г. Душанбе</div>
                </div>
              </div>

              {/* Horizontal divider */}
              <div className="h-px bg-slate-100 w-full my-3" />

              {/* Transaction Key-Value metadata fields matching the photo */}
              <div className="space-y-2 text-[12.5px] select-text">
                
                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Дата операции:</span>
                  <span className="font-extrabold text-[#0D2440] text-right">
                    {selectedReceipt.date}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Время операции:</span>
                  <span className="font-extrabold text-[#0D2440] text-right font-sans">
                    {selectedReceipt.time}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Номер операции:</span>
                  <span className="font-black text-[#0D2440] text-right font-sans select-all">
                    {selectedReceipt.opNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Поставщик:</span>
                  <span className="font-extrabold text-[#0D2440] text-right">
                    {selectedReceipt.provider}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Счет отправителя:</span>
                  <span className="font-black text-[#0D2440] text-right font-sans">
                    {selectedReceipt.sender}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Счет получателя:</span>
                  <span className="font-black text-[#0D2440] text-right font-sans select-all">
                    {selectedReceipt.receiver}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Сумма операции:</span>
                  <span className="font-black text-[#0D2440] text-right font-sans text-[13px]">
                    {selectedReceipt.amount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Комиссия::</span>
                  <span className="font-black text-[#0D2440] text-right font-sans">
                    {selectedReceipt.fee}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8393A1] font-medium">Статус:</span>
                  <span className="font-black text-[#22C55E] text-right text-[13px]">
                    {selectedReceipt.status}
                  </span>
                </div>

              </div>

              {/* Horizontal divider */}
              <div className="h-px bg-slate-100 w-full my-3.5" />

              {/* Precise Blue Seal/Stamp representing Completed Operation */}
              <div className="flex justify-center select-none my-3">
                <div className="border-[1.5px] border-[#1176F2] rounded-[4px] px-6 py-1.5 text-center text-[#1176F2] font-black max-w-[210px] uppercase">
                  <div className="font-bold text-[8px] normal-case tracking-normal mb-0.5 text-[#1176F2]/90">
                    ЗАО «Душанбе Сити Банк»
                  </div>
                  <div className="font-black text-[10.5px] tracking-[0.05em] leading-none pb-0.5">ОПЕРАЦИЯ</div>
                  <div className="font-black text-[13px] tracking-[0.05em] leading-none">ВЫПОЛНЕНА</div>
                </div>
              </div>

              {/* Row of four high-quality custom interactive actions exactly like receipt apps */}
              <div className="grid grid-cols-4 gap-1.5 mt-4 select-none">
                
                {/* 1. Поделиться */}
                <button 
                  onClick={() => triggerToast('Чек отправлен в буфер обмена!')}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="w-12 h-12 bg-[#F2F6FA] hover:bg-slate-200 text-[#1176F2] rounded-[16px] flex items-center justify-center transition-colors">
                    <svg className="w-5.5 h-5.5 text-[#1176F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <circle cx="9" cy="15" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="13" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="17" r="1.5" fill="currentColor" />
                      <line x1="10.5" y1="14.5" x2="12.5" y2="13.5" strokeWidth="1.5" />
                      <line x1="10.5" y1="15.5" x2="12.5" y2="16.5" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <span className="text-[9.5px] font-bold text-[#5c6e88] tracking-tight mt-1.5 text-center leading-tight">
                    Поделиться
                  </span>
                </button>

                {/* 2. Сохранить */}
                <button 
                  onClick={() => triggerToast('Чек успешно сохранен на устройство!')}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="w-12 h-12 bg-[#F2F6FA] hover:bg-slate-200 text-[#1176F2] rounded-[16px] flex items-center justify-center transition-colors">
                    <svg className="w-5.5 h-5.5 text-[#1176F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="11" x2="12" y2="17" strokeWidth="2.5" />
                      <polyline points="9 14 12 17 15 14" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <span className="text-[9.5px] font-bold text-[#5c6e88] tracking-tight mt-1.5 text-center leading-tight">
                    Сохранить
                  </span>
                </button>

                {/* 3. В избранные */}
                <button 
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    triggerToast(!isFavorite ? 'Добавлено в избранные шаблоны!' : 'Удалено из избранных!');
                  }}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-colors ${
                    isFavorite ? 'bg-[#FFF9E6] text-[#FFC107] hover:bg-[#FFF3CD]' : 'bg-[#F2F6FA] hover:bg-slate-200 text-[#1176F2]'
                  }`}>
                    <svg className={`w-5.5 h-5.5 ${isFavorite ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#1176F2]'}`} viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <span className="text-[9.5px] font-bold text-[#5c6e88] tracking-tight mt-1.5 text-center leading-tight">
                    В избранные
                  </span>
                </button>

                {/* 4. Повторить */}
                <button 
                  onClick={() => {
                    triggerToast('Повторный платеж инициирован!');
                    setTimeout(() => {
                      setSelectedReceipt(null);
                    }, 800);
                  }}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="w-12 h-12 bg-[#F2F6FA] hover:bg-slate-200 text-[#1176F2] rounded-[16px] flex items-center justify-center transition-colors">
                    <svg className="w-5.5 h-5.5 text-[#1176F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-5v5h5" />
                      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
                    </svg>
                  </div>
                  <span className="text-[9.5px] font-bold text-[#5c6e88] tracking-tight mt-1.5 text-center leading-tight">
                    Повторить
                  </span>
                </button>

              </div>

              {/* Main Blue "Закрыть" Button with bold centered typography */}
              <div className="mt-5 shrink-0">
                <button 
                  onClick={() => setSelectedReceipt(null)}
                  className="w-full bg-[#1176F2] hover:bg-[#005FF7] active:scale-98 transition-all duration-200 text-white font-extrabold text-[14.5px] py-3 rounded-[18px] shadow-sm shadow-[#1176F2]/10"
                >
                  Закрыть
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Floating interactive toast confirmation */}
      {toastMessage && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-[#0D2440] text-white font-extrabold text-[12px] px-5 py-2.5 rounded-full shadow-lg z-50 animate-scale-up border border-slate-800 tracking-tight">
          {toastMessage}
        </div>
      )}

    </div>
  );
};
