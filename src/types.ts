export interface QuickTransferShort {
  id: string;
  type: 'phone' | 'card';
  title: string;
  caption: string;
  brand?: 'dc' | 'alif' | 'anor';
  canDismiss?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  iconType: 'neru' | 'parking' | 'shohin';
  color: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  currency: string;
  date: string;
  type: 'payment' | 'transfer_in' | 'transfer_out' | 'refund';
  category?: string;
  receiver?: string;
}

export type ActiveTab = 'home' | 'transfers' | 'miniapps' | 'history';
