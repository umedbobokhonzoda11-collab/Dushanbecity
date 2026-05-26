import { QuickTransferShort, Partner, Transaction } from './types';

export const INITIAL_SHORTCUTS: QuickTransferShort[] = [
  {
    id: 'phone',
    type: 'phone',
    title: 'DC (по номеру телефона)',
    caption: 'DC (по номеру телефона)'
  },
  {
    id: 'card',
    type: 'card',
    title: 'DC (по номеру карты)',
    caption: 'DC (по номеру карты)'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'neru',
    name: 'Neru',
    iconType: 'neru',
    color: '#3AA757'
  },
  {
    id: 'parking',
    name: 'Parking',
    iconType: 'parking',
    color: '#1861D5'
  },
  {
    id: 'shohin',
    name: 'Шохин',
    iconType: 'shohin',
    color: '#F27E2B'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    title: 'Перевод от Алишер Р.',
    amount: 150.00,
    currency: 'TJS',
    date: '2026-05-23 14:15:22',
    type: 'transfer_in',
    category: 'Переводы'
  },
  {
    id: 'tx2',
    title: 'Babilon-M Мобильная связь',
    amount: -45.00,
    currency: 'TJS',
    date: '2026-05-22 18:30:10',
    type: 'payment',
    category: 'Мобильная связь'
  },
  {
    id: 'tx3',
    title: 'Начисление кэшбэка',
    amount: 9.38,
    currency: 'TJS',
    date: '2026-05-21 12:00:00',
    type: 'refund',
    category: 'Бонусы'
  },
  {
    id: 'tx4',
    title: 'Шохин Доставка еды',
    amount: -32.00,
    currency: 'TJS',
    date: '2026-05-20 20:11:45',
    type: 'payment',
    category: 'Рестораны'
  },
  {
    id: 'tx5',
    title: 'Neru Электрозаправка',
    amount: -25.00,
    currency: 'TJS',
    date: '2026-05-19 15:40:02',
    type: 'payment',
    category: 'Транспорт'
  }
];

export const MOBILE_PROVIDERS = [
  { id: 'tcell', name: 'Tcell', color: '#6A1B9A', logo: 'T' },
  { id: 'megafon', name: 'МегаФон Таджикистан', color: '#00A859', logo: 'М' },
  { id: 'babilon', name: 'Babilon-M', color: '#D32F2F', logo: 'B' },
  { id: 'zet', name: 'Zet-Mobile', color: '#FBC02D', logo: 'Z' }
];
