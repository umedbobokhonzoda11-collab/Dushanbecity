import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';

interface MobilePaymentModalProps {
  balance: number;
  onClose: () => void;
  onPay: (providerName: string, accountOrPhone: string, amount: number) => void;
  onGoHome?: () => void;
}

interface CategoryItem {
  id: string;
  name: string;
  iconType: 'phone' | 'globe' | 'ngn' | 'tv' | 'communal' | 'sim' | 'wallet' | 'game' | 'bank' | 'taxi';
}

const CATEGORIES: CategoryItem[] = [
  { id: 'mobile', name: 'Мобильная связь', iconType: 'phone' },
  { id: 'internet', name: 'Интернет', iconType: 'globe' },
  { id: 'ngn', name: 'NGN и Телефония', iconType: 'ngn' },
  { id: 'tv', name: 'ТВ, Радио', iconType: 'tv' },
  { id: 'communal', name: 'Коммунальные услуги', iconType: 'communal' },
  { id: 'overseas', name: 'Зарубежные операторы', iconType: 'sim' },
  { id: 'e-money', name: 'Электронные деньги', iconType: 'wallet' },
  { id: 'games', name: 'Игры и социальные сети', iconType: 'game' },
  { id: 'banks', name: 'Банки', iconType: 'bank' },
  { id: 'taxi', name: 'Такси', iconType: 'taxi' },
];

const SUB_PROVIDERS: Record<string, { id: string; name: string; color: string; prefix?: string; placeholder: string }[]> = {
  internet: [
    { id: 'babilon_t', name: 'Babilon-T Home', color: '#D32F2F', placeholder: 'ID шартнома (M-91823)' },
    { id: 'tojnet', name: 'TojNet (ТТ-Мобайл)', color: '#6A1B9A', placeholder: 'Рақами ҳисоб (019318)' },
    { id: 'eastera', name: 'Eastera Telecom', color: '#00A859', placeholder: 'Номер договора (1001923)' },
    { id: 'intercom', name: 'Intercom Internet', color: '#1479FF', placeholder: 'Логин / Номер аккаунта' }
  ],
  ngn: [
    { id: 'bab_ngn', name: 'Babilon-T NGN', color: '#D32F2F', prefix: '992440', placeholder: 'Рақами SIP (6 рақам)' },
    { id: 'int_sip', name: 'Intercom SIP', color: '#1479FF', prefix: '992880', placeholder: 'Рақами SIP' },
    { id: 'next_sip', name: 'Next SIP', color: '#6A1B9A', prefix: '992330', placeholder: 'Рақами SIP' }
  ],
  tv: [
    { id: 'mavji_somon', name: 'Mavji Somon TV', color: '#FBC02D', placeholder: 'Рақами корт / ID' },
    { id: 'somon_tv', name: 'Somon TV Cable', color: '#FF9800', placeholder: 'ID муштари' },
    { id: 'aln_tv', name: 'ALN Digital Direct', color: '#E91E63', placeholder: 'Рақами шартнома' }
  ],
  communal: [
    { id: 'barqi_tojik', name: 'Барқи Тоҷик (Энерго)', color: '#3AA757', placeholder: 'Ҳисоби инфиродӣ (12 рақам)' },
    { id: 'ob_korez', name: 'Обу Корез (Водоканал)', color: '#1861D5', placeholder: 'Рақами хона ва ҳисоб' },
    { id: 'hmk', name: 'Хизматрасонии коммуналӣ', color: '#795548', placeholder: 'ID шартнома' }
  ],
  overseas: [
    { id: 'beeline_ru', name: 'Beeline Россия', color: '#FFD600', prefix: '+7', placeholder: 'Номер телефона (10 знаков)' },
    { id: 'mts_ru', name: 'МТС Россия', color: '#D32F2F', prefix: '+7', placeholder: 'Номер телефона' },
    { id: 'megafon_ru', name: 'МегаФон Россия', color: '#00A859', prefix: '+7', placeholder: 'Номер телефона' },
    { id: 'tele2_ru', name: 'Tele2 Россия', color: '#1F2937', prefix: '+7', placeholder: 'Номер телефона' }
  ],
  'e-money': [
    { id: 'qiwi', name: 'Qiwi Кошелек', color: '#FF8F00', placeholder: 'Рақами ҳамён (телефон)' },
    { id: 'yoomoney', name: 'ЮMoney (Яндекс)', color: '#7E57C2', placeholder: '41001xxxxxxxxxx' },
    { id: 'webmoney', name: 'WebMoney TJS/WMZ', color: '#0288D1', placeholder: 'Zxxxxxxxxxxxx' }
  ],
  games: [
    { id: 'steam', name: 'Steam Wallet TJS', color: '#171a21', placeholder: 'Steam Account Login' },
    { id: 'freefire', name: 'Free Fire Diamonds', color: '#E15A14', placeholder: 'Player ID (UID)' },
    { id: 'pubg', name: 'PUBG Mobile UC', color: '#f3ca20', placeholder: 'Character ID' },
    { id: 'psn', name: 'PlayStation Network', color: '#003087', placeholder: 'Email ё ID суратҳисоб' }
  ],
  banks: [
    { id: 'dc_bank', name: 'Душанбе Сити Банк', color: '#1479FF', placeholder: 'Рақами қарз / Ҳисоб' },
    { id: 'alif_repay', name: 'Алиф Банк (Погашение)', color: '#00BFA5', placeholder: 'ID шартномаи Насиба' },
    { id: 'oryon', name: 'Ориёнбанк Хизматрасонӣ', color: '#1E3A8A', placeholder: 'Счёт / ИД' }
  ],
  taxi: [
    { id: 'rakhsh', name: 'Rakhsh Taxi (3333)', color: '#1479FF', placeholder: 'ИД-и ронанда ё Рақами телефон' },
    { id: 'yak', name: 'Yak Taxi (1111)', color: '#1861D5', placeholder: 'Рақами ронанда' },
    { id: 'max_taxi', name: 'Max Taxi (5555)', color: '#7C3AED', placeholder: 'ИД-и ронанда' }
  ]
};

interface SubProviderItem {
  id: string;
  name: string;
  color: string;
  prefix?: string;
  placeholder: string;
  renderLogo?: () => React.ReactNode;
}

export const MobilePaymentModal: React.FC<MobilePaymentModalProps> = ({
  balance,
  onClose,
  onPay,
  onGoHome,
}) => {
  const [page, setPage] = useState<'categories' | 'operators' | 'form'>('categories');
  const [formStep, setFormStep] = useState<'entry' | 'confirm' | 'loading' | 'success'>('entry');
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Unified Form state
  const [selectedSub, setSelectedSub] = useState<SubProviderItem | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [randomTxId, setRandomTxId] = useState('');
  const [isSuccessCompleted, setIsSuccessCompleted] = useState(false);

  const getMobileSubProviders = (): SubProviderItem[] => {
    return [
      {
        id: 'megafon',
        name: 'МегаФон',
        color: '#00B556',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-[#00B556] flex items-center justify-center text-white shadow-xs">
            <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="8" cy="12" r="3" />
              <path d="M15 8c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
              <path d="M15 16c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
              <circle cx="12" cy="12" r="1.3" />
            </svg>
          </div>
        )
      },
      {
        id: 'zet',
        name: 'ZET-MOBILE',
        color: '#F58220',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
              <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" fill="#1C1B1F" stroke="#F58220" strokeWidth="1.3" />
              <text x="12" y="15.5" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="950" fontFamily="sans-serif">Z</text>
            </svg>
          </div>
        )
      },
      {
        id: 'tcell',
        name: 'Tcell',
        color: '#8E24AA',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-[#8E24AA] flex items-center justify-center text-white shadow-xs">
            <svg className="w-8.5 h-8.5" viewBox="0 0 24 24" fill="none">
              <path d="M12 4C7.58 4 4 7.58 4 12c0 1.72.54 3.3 1.46 4.6L4.5 20c-.1.3.1.6.4.5l3.4-.96C9.6 20.1 10.77 20.4 12 20.4c4.42 0 8-3.58 8-8s-3.58-8-8-8z" fill="white" />
              <circle cx="12" cy="10" r="1.3" fill="#8E24AA" />
              <circle cx="12" cy="13" r="1.3" fill="#8E24AA" />
              <circle cx="12" cy="16" r="1.3" fill="#8E24AA" />
              <circle cx="9" cy="10" r="1.3" fill="#8E24AA" />
              <circle cx="15" cy="10" r="1.3" fill="#8E24AA" />
            </svg>
          </div>
        )
      },
      {
        id: 'tojik_mobile',
        name: 'Точик Мобайл',
        color: '#2E5B94',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-white border border-slate-200/90 flex items-center justify-center overflow-hidden shadow-xs">
            <svg className="w-10.5 h-10.5" viewBox="0 0 32 32" fill="none">
              <path d="M8 12c1-.5 2 0 3-.5s1.5-1 2.5-1c2 0 3 1.5 5 1s2.5.5 3.5 0c1-.5 1-2 2-1s1.5.5 2-.5-1-1.5 0-2 2 .5 2.5-1C28 6 25 7 24 6c-2 0-3-1-5-1s-3 1.5-5 1.5-2-.5-3.5 0C9 7 8 8 7 8s-2 1-2 2.5 1.5 2 3 1.5z" fill="#71D4F4" opacity="0.8" />
              <path d="M5 16.5c1.5-.5 2.5 1 4 .5s1.5-.5 3 0c1 .4 1.5.8 2.5.2s2.5.5 3.5 0 2-.5 3 .5 1.5-.2 2.5.5c1 .7.5 1.3 1.5 2 1.5 1 2.5 3 4 2.5l1-1v4c-1 0-2 1-3.5 1-2 0-3-1.5-4.5-1.5s-2.5 1-4 1-3.5-1.5-5.5-1-1.5-1-3-1-3 1-3.5 0-1.5-3.5.5-5.5z" fill="#F03D3D" opacity="0.2" />
              <text x="16" y="16.5" textAnchor="middle" fill="#2E5B94" fontSize="5" fontWeight="950" fontFamily="sans-serif">ТОЧИК</text>
              <text x="16" y="21.5" textAnchor="middle" fill="#E83030" fontSize="4.5" fontWeight="950" fontFamily="sans-serif">МОБАЙЛ</text>
            </svg>
          </div>
        )
      },
      {
        id: 'omobile',
        name: 'OMobile',
        color: '#E31E24',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs">
            <svg className="w-[38px] h-[38px]" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#E31E24" />
              <circle cx="16" cy="16" r="8" fill="white" />
              <path d="M16 4C9.37 4 4 9.37 4 16c0 3.3.67 6.4 1.8 9.3L16 16V4z" fill="#BE1116" />
              <text x="16" y="19" textAnchor="middle" fill="#E31E24" fontSize="8" fontWeight="950" fontFamily="sans-serif">O</text>
            </svg>
          </div>
        )
      },
      {
        id: 'anor',
        name: 'Анор',
        color: '#1155A5',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-[#1155A5] flex items-center justify-center text-white shadow-xs">
            <svg className="w-8.5 h-8.5" viewBox="0 0 24 24" fill="none">
              <path d="M12 3a1 1 0 0 1 .9.5l1.6 2.3A7.5 7.5 0 0 1 19.5 13a7.5 7.5 0 0 1-15 0 7.5 7.5 0 0 1 5-7.2L11.1 3.5A1 1 0 0 1 12 3z" fill="white" />
              <path d="M12 9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" fill="#1155A5" />
              <rect x="11.2" y="11" width="1.6" height="3" rx="0.5" fill="white" />
            </svg>
          </div>
        )
      },
      {
        id: 'combined_operators',
        name: 'Мобильные операторы связи (Вавилон-М,МегаФон,ZET-',
        color: '#CC1E29',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full overflow-hidden border border-slate-200 shadow-xs flex flex-col">
            <div className="h-[31%] bg-[#CC1E29] w-full" />
            <div className="h-[38%] bg-white w-full flex flex-col items-center justify-center relative">
              <svg className="w-5.5 h-5.5 text-[#E0A818] absolute inset-0 m-auto" viewBox="0 0 24 24" fill="currentColor">
                <rect x="10" y="12.5" width="4" height="0.8" rx="0.1" />
                <path d="M9.5 10.5l1.5 2h2l1.5-2-.8 1.8h-3.4z" />
                <circle cx="9.5" cy="10" r="0.4" />
                <circle cx="12" cy="9.2" r="0.5" />
                <circle cx="14.5" cy="10" r="0.4" />
                <circle cx="8" cy="8.5" r="0.25" />
                <circle cx="9.2" cy="7.7" r="0.25" />
                <circle cx="10.6" cy="7.2" r="0.25" />
                <circle cx="12" cy="7" r="0.3" />
                <circle cx="13.4" cy="7.2" r="0.25" />
                <circle cx="14.8" cy="7.7" r="0.25" />
                <circle cx="16" cy="8.5" r="0.25" />
              </svg>
            </div>
            <div className="h-[31%] bg-[#128E46] w-full" />
          </div>
        )
      },
      {
        id: 'babilon_m',
        name: 'Вавилон-М',
        color: '#FC9E23',
        prefix: '+992',
        placeholder: 'Номер телефона (9 знаков)',
        renderLogo: () => (
          <div className="w-[49px] h-[49px] rounded-full bg-[#FC9E23] flex items-center justify-center border border-[#FC9E23] shadow-xs">
            <svg className="w-8.5 h-8.5 text-purple-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="8" strokeWidth="1.8" />
              <path d="M4 12h16" strokeWidth="1.2" />
              <path d="M12 4v16" strokeWidth="1.2" />
              <path d="M12 4c2.5 2 4 5 4 8s-1.5 6-4 8" strokeWidth="1.2" />
              <path d="M12 4C9.5 6 8 9 8 12s1.5 6 4 8" strokeWidth="1.2" />
              <ellipse cx="12" cy="12" rx="8" ry="3" strokeWidth="1.2" />
            </svg>
          </div>
        )
      },
    ];
  };

  const getSubProvidersForCategory = (catId: string): SubProviderItem[] => {
    if (catId === 'mobile') {
      return getMobileSubProviders();
    }
    const subs = SUB_PROVIDERS[catId] || [];
    return subs.map(v => ({
      id: v.id,
      name: v.name,
      color: v.color,
      prefix: v.prefix,
      placeholder: v.placeholder,
    }));
  };

  const renderLogoOfSub = (sub: SubProviderItem) => {
    if (sub.renderLogo) {
      return sub.renderLogo();
    }
    return (
      <div 
        className="w-[49px] h-[49px] rounded-full flex items-center justify-center text-white font-extrabold shadow-xs text-lg uppercase leading-none"
        style={{ backgroundColor: sub.color }}
      >
        {sub.name[0]}
      </div>
    );
  };

  const handleCategorySelect = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setErrorMessage('');
    setPage('operators');
  };

  const handleSubProviderSelect = (sub: SubProviderItem) => {
    setSelectedSub(sub);
    setFormStep('entry');
    setAccountNumber('');
    setPayAmount('');
    setErrorMessage('');
    setPage('form');
  };

  const handleProceedToConfirm = () => {
    const val = parseFloat(payAmount);

    if (isNaN(val) || val <= 0) {
      setErrorMessage('Микдори маблағро дуруст ворид кунед.');
      return;
    }
    if (balance < val) {
      setErrorMessage('Маблағ дар тавозуни ҳамён кофӣ нест!');
      return;
    }
    if (!accountNumber.trim()) {
      setErrorMessage('Лутфан рақами суратҳисоб, корт ё ID-ро ворид созед.');
      return;
    }

    if (selectedCategory?.id === 'mobile' && accountNumber.length < 9) {
      setErrorMessage('Лутфан рақами телефонро дуруст ворид созед (9 рақам).');
      return;
    }

    setErrorMessage('');
    setFormStep('confirm');
  };

  const handleConfirmAndExecute = () => {
    const val = FloatWithClamp(payAmount);
    setIsSuccessCompleted(false);
    setFormStep('success');
    setRandomTxId(Math.floor(10000000 + Math.random() * 90000000).toString());
    
    setTimeout(() => {
      onPay(selectedCategory?.name + ': ' + (selectedSub?.name || 'Платеж'), (selectedSub?.prefix || '') + accountNumber, val);
      setIsSuccessCompleted(true);
    }, 1200);
  };

  const FloatWithClamp = (s: string) => {
    const parsed = parseFloat(s);
    return isNaN(parsed) ? 10 : Math.max(1, parsed);
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

  const handleBack = () => {
    if (page === 'form') {
      if (formStep === 'confirm') {
        setFormStep('entry');
      } else if (formStep === 'success') {
        // Return to categories
        setPage('categories');
        setFormStep('entry');
        setIsSuccessCompleted(false);
      } else {
        setPage('operators');
      }
    } else if (page === 'operators') {
      setPage('categories');
    } else {
      onClose();
    }
  };

  const activeSubList = selectedCategory ? getSubProvidersForCategory(selectedCategory.id) : [];

  const filteredCategories = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubList = activeSubList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIcon = (type: CategoryItem['iconType']) => {
    switch (type) {
      case 'phone':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <circle cx="12" cy="18" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'globe':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        );
      case 'ngn':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px] relative animate-none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            <path d="M12 4h9v6.5h-9z" fill="white" stroke="none" />
            <path d="M12 4h9v6.5h-9z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="13.2" y="9.2" fill="#1479FF" fontSize="5" fontWeight="black" fontFamily="sans-serif" stroke="none">sip</text>
          </svg>
        );
      case 'tv':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <rect x="2" y="6" width="20" height="13" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="19" x2="12" y2="21" />
          </svg>
        );
      case 'communal':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <path d="M12 2v2M5 12H3m18 0h-2M7.3 7.3L5.8 5.8m12.4 12.4l-1.5-1.5M18.2 7.3l1.5-1.5M5.8 18.2l1.5-1.5" strokeWidth="1.8" />
            <path d="M9 15c0-1.7 1.3-3 3-3s3 1.3 3 3c0 2-2 3.5-3 4.5" />
            <line x1="10" y1="22" x2="14" y2="22" />
          </svg>
        );
      case 'sim':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
            <path d="M5 2h9l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            <rect x="9" y="11" width="6" height="6" rx="1" />
            <line x1="9" y1="14" x2="15" y2="14" />
            <line x1="12" y1="11" x2="12" y2="17" />
          </svg>
        );
      case 'wallet':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M21 11H17a2 2 0 0 0 0 4h4" />
            <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'game':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px]">
            <rect x="2" y="6" width="20" height="12" rx="3" />
            <path d="M6 12h4M8 10v4" />
            <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="17" cy="12" r="1" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'bank':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <path d="M12 2L2 7H22L12 2z" />
            <line x1="5" y1="11" x2="5" y2="18" strokeWidth="2" />
            <line x1="10" y1="11" x2="10" y2="18" strokeWidth="2" />
            <line x1="14" y1="11" x2="14" y2="18" strokeWidth="2" />
            <line x1="19" y1="11" x2="19" y2="18" strokeWidth="2" />
            <line x1="2" y1="21" x2="22" y2="21" strokeWidth="2" />
          </svg>
        );
      case 'taxi':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 12 10s-6.7.6-8.5 1.2C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2m14 0c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2m14 0H5" />
            <circle cx="7" cy="14" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="17" cy="14" r="1.1" fill="currentColor" stroke="none" />
            <rect x="9" y="6" width="6" height="4" rx="1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`absolute inset-x-0 bottom-0 top-0 z-50 flex flex-col justify-between animate-fade-in select-none ${
        (page === 'operators' || page === 'form') ? 'bg-[#F4F8FC]' : 'bg-[#F5F6F8]'
      }`}
    >
      
      {/* HEADER RENDERING */}
      {page === 'form' ? (
        /* HEADER MATCHING TRANSFERMODAL 100% */
        <div className="bg-[#1479FF] text-white px-4 py-4 flex items-center justify-between shadow-sm shrink-0">
          <button 
            onClick={handleBack} 
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            id="mobile-payment-back-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="font-semibold text-[17px] tracking-wide truncate max-w-[70%]">
            {selectedSub?.name}
          </span>

          <button className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5.5 h-5.5 text-white/95">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.24.588 1.81l-3.97 2.887a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.887a1 1 0 00-1.17 0l-3.971 2.887c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.887c-.772-.57-.373-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" fill="currentColor" />
            </svg>
          </button>
        </div>
      ) : page === 'operators' ? (
        /* TRANSLUCENT SLATE BLUE HEADER (SCREENSHOT 2 STYLE) */
        <div className="pt-5 pb-4 px-5.5 shrink-0 flex items-center justify-between bg-[#1479FF] text-white shadow-md">
          <button 
            onClick={handleBack} 
            className="p-1.5 hover:bg-white/15 rounded-full transition-all cursor-pointer -ml-1 text-white active:scale-95"
            id="operators-back-btn"
          >
            <ChevronLeft size={27} strokeWidth={2.8} />
          </button>
          
          <h2 className="text-[19.5px] font-bold tracking-tight text-center flex-1 pr-8 font-sans">
            {selectedCategory?.name}
          </h2>
        </div>
      ) : (
        /* SOLID BLUE VIBRANT HEADER FOR CATEGORIES LIST */
        <div className="bg-[#1479FF] text-white pt-4 pb-4 px-5 shrink-0 flex flex-col gap-3.5 relative shadow-md">
          <div className="flex items-center justify-between row">
            <button 
              onClick={onClose} 
              className="p-1.5 hover:bg-white/10 rounded-full transition-all cursor-pointer -ml-1 text-white active:scale-95"
              id="payment-back-btn"
            >
              <ChevronLeft size={25} strokeWidth={2.5} />
            </button>
            
            <h2 className="text-[19px] font-bold tracking-tight text-center flex-1 pr-8 font-sans">
              Платежи
            </h2>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 text-[15.5px] font-sans placeholder-slate-400 rounded-full py-2.5 px-4.5 outline-none border-none select-text shadow-sm"
              id="payment-search"
            />
            <div className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-300">
              <Search size={18} strokeWidth={2.4} />
            </div>
          </div>
        </div>
      )}

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto w-full">
        {page === 'categories' ? (
          /* "ПЛАТЕЖИ" CATEGORIES LIST VIEW */
          <div className="flex flex-col bg-[#F4F8FC] py-1.5">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  id={`payment-category-${cat.id}`}
                  onClick={() => handleCategorySelect(cat)}
                  className="flex items-center gap-4.5 py-4.5 px-6 hover:bg-slate-100/45 cursor-pointer transition-colors active:bg-slate-200/40"
                >
                  <div className="w-[48px] h-[48px] bg-[#1479FF] rounded-full flex items-center justify-center text-white shrink-0 shadow-xs transition-transform hover:scale-105 active:scale-95">
                    {renderIcon(cat.iconType)}
                  </div>
                  <span className="text-[16px] font-bold text-[#475569] tracking-tight hover:text-[#1479FF] transition-colors leading-snug">
                    {cat.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-4xl text-slate-300">🔍</span>
                <span className="text-slate-400 font-bold text-xs">Ҳеҷ чиз ёфт нашуд...</span>
              </div>
            )}
          </div>
        ) : page === 'operators' ? (
          /* UNIFIED LIST OF PROVIDERS/OPERATORS - EXACTLY TIGHTER SPACING CHOSEN */
          <div className="flex flex-col bg-[#F4F8FC] py-1 px-1.5">
            {filteredSubList.length > 0 ? (
              filteredSubList.map((op) => (
                <div
                  key={op.id}
                  id={`operator-item-${op.id}`}
                  onClick={() => handleSubProviderSelect(op)}
                  className="flex items-center gap-3 py-2 px-4 hover:bg-slate-200/35 cursor-pointer transition-all active:bg-slate-200/60 rounded-xl my-0.5"
                >
                  {/* Circular dynamic Logo */}
                  <div className="shrink-0 transition-transform active:scale-95">
                    {renderLogoOfSub(op)}
                  </div>

                  {/* Title */}
                  <span className="text-[15.5px] font-bold text-[#5B6D7A] tracking-tight hover:text-[#1479FF] transition-colors leading-normal whitespace-pre-line flex-1">
                    {op.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-4xl text-slate-300">🔍</span>
                <span className="text-slate-400 font-bold text-xs">Провайдер ёфт нашуд...</span>
              </div>
            )}
          </div>
        ) : (
          /* page === 'form' RENDERS THE UNIFIED TRANSACTIONS AND LOADING FLOW MATCHING TRANSFERMODAL */
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col justify-between relative min-h-0 bg-white">
            
            <div className="space-y-4">
              
              {/* FIELD 1: Account / phone selector (Very rounded card container matching TransferModal) */}
              <div className="bg-white rounded-[16px] border border-slate-100/80 flex items-center justify-between px-4 py-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 flex-1 w-full">
                  {selectedSub?.prefix && (
                    <span className="text-slate-400 font-bold tracking-tight text-[15.5px] pr-1 font-mono select-none">
                      {selectedSub.prefix}
                    </span>
                  )}
                  <input 
                    type="tel"
                    inputMode="numeric"
                    placeholder={selectedSub?.placeholder || "Номер/Счет"}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                    className="bg-transparent text-slate-800 font-medium text-[15px] outline-none flex-1 w-full placeholder-slate-400/80 select-text"
                    id="unified-phone-account-replicant"
                  />
                </div>
                <div className="flex items-center gap-3.5 text-[#1479FF] shrink-0 pl-2">
                  {/* history */}
                  <button className="p-0.5 hover:bg-slate-100 rounded-full transition-all active:scale-95 cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </button>
                  {/* contacts */}
                  <button className="p-0.5 hover:bg-slate-100 rounded-full transition-all active:scale-95 cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* FIELD 2: Sum component */}
              <div className="bg-white rounded-[16px] border border-slate-100/80 flex items-center px-4 py-3.5 shadow-xs font-sans">
                <span className="text-slate-400 font-medium text-[15.5px] mr-2 select-none">TJS</span>
                <input 
                  type="tel"
                  inputMode="decimal"
                  placeholder="Сумма"
                  value={payAmount}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
                    const parts = cleaned.split('.');
                    if (parts.length > 2) return;
                    setPayAmount(cleaned);
                  }}
                  className="bg-transparent text-slate-800 font-bold text-[15.5px] outline-none flex-1 w-full select-text"
                  id="unified-amount-replicant"
                />
              </div>

              {/* FIELD 3: Comment Input */}
              <div className="bg-white rounded-[16px] border border-slate-100/80 px-4 py-3.5 shadow-xs font-sans">
                <input 
                  type="text"
                  placeholder="Комментарий"
                  className="bg-transparent text-slate-800 font-medium text-[15px] outline-none w-full placeholder-slate-400/80"
                />
              </div>

              {/* Helper text minimum amount */}
              <div className="text-right text-[11.5px] text-slate-400/90 font-medium select-none pr-1">
                Мин. сумма: {selectedCategory?.id === 'mobile' ? '1.00 TJS' : '0.00 TJS'}
              </div>

              {/* UNIVERSAL HORIZONTAL CARDS SLIDER (TRANSFER STYLE) */}
              <div className="py-2.5">
                <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-none">
                  {/* Card 1: DBC balance card */}
                  <div className="min-w-[116px] w-[116px] bg-[#1479FF] text-white p-3 rounded-[15px] shadow-sm flex flex-col justify-between h-[72px] shrink-0 relative overflow-hidden">
                    <div className="absolute top-[-30px] right-[-30px] w-14 h-14 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <span className="text-[9px] uppercase font-bold tracking-tight text-white/85 block">DBC****9372</span>
                    <div>
                      <span className="text-xs font-black font-mono tracking-tight whitespace-nowrap">{balance.toFixed(2)} TJS</span>
                    </div>
                  </div>

                  {/* Card 2: KREDITY with red NEW badge */}
                  <div className="min-w-[116px] w-[116px] bg-gradient-to-tr from-[#1A5AE5] via-[#4382FC] to-[#FFC53D] text-white p-3 rounded-[15px] shadow-sm flex flex-col justify-between h-[72px] shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 px-1.5 py-0.5 rounded-bl-lg text-[6px] font-extrabold uppercase tracking-widest text-white shadow-xs">
                      NEW
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-tight text-white/95 block font-semibold font-sans">КРЕДИТЫ</span>
                    <div>
                      <span className="text-xs font-black font-mono leading-none">-</span>
                    </div>
                  </div>

                  {/* Card 3: Dynamic specific brand card */}
                  <div className="min-w-[116px] w-[116px] bg-white border border-slate-100 text-slate-800 p-3 rounded-[15px] shadow-xs flex flex-col justify-between h-[72px] shrink-0 select-none">
                    <span className="text-[9px] font-bold text-slate-400 tracking-tight block uppercase truncate">
                      {(selectedSub?.name || 'ПАР').slice(0, 3).toUpperCase()}****
                    </span>
                    <div>
                      <span className="text-xs font-extrabold font-mono text-slate-300 leading-none">...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative description paragraph under items matching TransferModal style */}
              <p className="text-[10.5px] leading-relaxed text-slate-500 font-medium px-1 antialiased text-justify font-sans">
                Для пополнения {selectedSub?.name || 'услуги'} укажите корректный номер договора или телефон получателя сотового оператора и введите сумму. Зачисление без комиссии. Если вы отправили деньги не туда, обратитесь к получателю платежа или в поддержку. Манибэк возможен только по согласию получателя.
              </p>

              {errorMessage && (
                <p className="text-center font-bold text-xs text-red-500 animate-pulse">
                  {errorMessage}
                </p>
              )}

            </div>

            {/* BOTTOM ACTION BUTTON: "ДАЛЕЕ" */}
            <div className="pt-4 pb-2">
              <button
                type="button"
                onClick={handleProceedToConfirm}
                className="w-full bg-[#FF7020] hover:bg-[#E05E12] text-white font-black py-4 rounded-[20px] text-[15.5px] tracking-wide transition-all cursor-pointer text-center select-none shadow-md shadow-orange-500/10 active:scale-[0.98] duration-100"
                id="unified-pay-dalee-btn"
              >
                Далее
              </button>
            </div>

            {/* ==========================================
                CONFIRMATION DRAWER (EXACT REPLICA)
               ========================================== */}
            {formStep === 'confirm' && (
              <div className="absolute inset-x-0 bottom-0 top-0 bg-[#07162C]/40 z-30 flex flex-col justify-end animate-fade-in duration-200">
                <div className="absolute inset-0" onClick={() => setFormStep('entry')} />
                
                {/* Drawer bottom container */}
                <div className="relative bg-white rounded-t-[30px] shadow-2xl z-40 px-5 pt-3.5 pb-6 animate-slide-up flex flex-col w-full border-t border-slate-100">
                  
                  {/* Handle indicator bar */}
                  <div className="w-11 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-4.5 shrink-0" />

                  {/* Info Header Box in light blue */}
                  <div className="bg-[#EDF5FF] border border-[#D5E6FF]/60 rounded-[18px] py-4.5 px-4 text-center mb-4.5 shrink-0">
                    <span className="text-[#6C8DAE] text-[12.5px] font-medium tracking-wide block font-sans">
                      Подтверждение платежа
                    </span>
                    <span className="text-[#1479FF] text-[31px] font-black tracking-tight block mt-1 leading-none font-sans">
                      {Number(payAmount || 0).toFixed(2)} TJS
                    </span>
                  </div>

                  {/* Gray rows container with complete alignment */}
                  <div className="bg-[#F8F9FA] rounded-[24px] p-4 space-y-3 mb-6 shrink-0 border border-slate-100/40">
                    
                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans">
                      <span className="text-[#8B9DAE] font-medium">Хизматрасонӣ:</span>
                      <span className="text-slate-800 font-extrabold text-right max-w-[65%] truncate">
                        {selectedCategory?.name || 'Пардохтҳо'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/5 font-sans">
                      <span className="text-[#8B9DAE] font-medium">Поставщик:</span>
                      <span className="text-slate-800 font-extrabold text-right max-w-[65%] truncate font-sans">
                        {selectedSub?.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/5">
                      <span className="text-[#8B9DAE] font-medium">Номер/Счет</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">
                        {selectedSub?.prefix ? `${selectedSub.prefix} ` : ''}{accountNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-1 border-t border-slate-200/5">
                      <span className="text-[#8B9DAE] font-medium">Способ оплаты:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">9762 **** **** 9372</span>
                    </div>

                    <div className="flex items-center justify-between text-[13px] leading-tight font-sans pt-2 border-t border-slate-200/50">
                      <span className="text-[#8B9DAE] font-bold">Сумма списания:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right text-[13.5px]">
                        {Number(payAmount || 0).toFixed(2)} TJS
                      </span>
                    </div>

                  </div>

                  {/* The big orange submit wrapper */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={handleConfirmAndExecute}
                      className="w-full bg-[#FF7020] hover:bg-[#E05E12] text-white font-extrabold py-4 rounded-[20px] text-[16px] tracking-wide transition-all cursor-pointer text-center select-none shadow-md shadow-orange-500/10 active:scale-[0.98] duration-100"
                    >
                      Подтверждаю
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* ==========================================
                SUCCESS RECEIPT DRAWER (EXACT 100% REPLICA)
               ========================================== */}
            {formStep === 'success' && (
              <div className="absolute inset-x-0 bottom-0 top-0 bg-[#07162C]/40 z-30 flex flex-col justify-end animate-fade-in duration-200">
                <div className="absolute inset-0" onClick={isSuccessCompleted ? handleBack : undefined} />
                
                {/* Drawer bottom container */}
                <div className="relative bg-white rounded-t-[30px] shadow-2xl z-40 px-5 pt-3.5 pb-6 animate-slide-up flex flex-col w-full border-t border-slate-100">
                  
                  {/* Handle indicator bar */}
                  <div className="w-11 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-5 shrink-0" />

                  {/* Clock or Check Badge */}
                  <div className="flex justify-center mt-1 mb-3.5 select-none animate-scale-up">
                    {isSuccessCompleted ? (
                      <div className="w-[74px] h-[74px] bg-[#E5F9F6] rounded-full flex items-center justify-center">
                        <div className="w-[32px] h-[32px] rounded-full border-[2.2px] border-[#20C997] bg-[#E5F9F6] flex items-center justify-center text-[#20C997]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px]">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-[74px] h-[74px] bg-[#FFF2E2] rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-[32px] h-[32px] stroke-[#C36C30]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <polyline points="12 7 12 12 15 12" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Success Mode Title */}
                  <h2 className={`font-bold text-[22.5px] text-center tracking-tight mb-5 font-sans leading-none transition-colors duration-300 ${
                    isSuccessCompleted ? 'text-[#1479FF]' : 'text-[#C56C2B]'
                  }`}>
                    {isSuccessCompleted ? 'Платеж выполнен' : 'Выполняется'}
                  </h2>

                  {/* Receipt facts card */}
                  <div className="bg-[#F8F9FA] rounded-[24px] p-5 space-y-4 mb-6 shrink-0 border border-slate-100/40 text-[13.5px] leading-tight font-sans">
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B9DAE] font-medium font-sans">Хизматрасонӣ:</span>
                      <span className="text-slate-800 font-extrabold pr-0.5 max-w-[60%] truncate font-sans">
                        {selectedCategory?.name || 'Пардохти хизмати'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/5 font-sans">
                      <span className="text-[#8B9DAE] font-medium font-sans">Поставщик:</span>
                      <span className="text-slate-800 font-extrabold pr-0.5 max-w-[60%] truncate font-sans">
                        {selectedSub?.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                      <span className="text-[#8B9DAE] font-medium">Получатель:</span>
                      <span className="text-slate-800 font-extrabold font-mono">
                        {selectedSub?.prefix ? `${selectedSub.prefix} ` : ''}{accountNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/5">
                      <span className="text-[#8B9DAE] font-medium">К зачислению:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">
                        {payAmount ? Number(payAmount).toFixed(2) : '1.00'} TJS
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/5 font-sans">
                      <span className="text-[#8B9DAE] font-medium font-sans">Дата & Время:</span>
                      <span className="text-slate-800 font-extrabold font-mono text-right">
                        {getFormattedDateTime().date}, {getFormattedDateTime().time}
                      </span>
                    </div>

                  </div>

                  {/* Return Button */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      disabled={!isSuccessCompleted}
                      onClick={() => {
                        if (onGoHome) {
                          onGoHome();
                        } else {
                          handleBack();
                        }
                      }}
                      className="w-full bg-[#1479FF] hover:bg-[#0c66db] text-white font-extrabold py-4 rounded-[20px] text-[16.5px] tracking-wide transition-all text-center select-none shadow-md shadow-blue-500/10 duration-200 font-sans cursor-pointer active:scale-[0.98] disabled:opacity-50"
                    >
                      На главную
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
