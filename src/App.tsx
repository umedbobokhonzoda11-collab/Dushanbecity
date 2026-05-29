import { useState, useEffect } from 'react';
import { ActiveTab, QuickTransferShort, Transaction } from './types';
import { INITIAL_SHORTCUTS, INITIAL_TRANSACTIONS } from './data';

// Component imports
import { Header } from './components/Header';
import { BalanceCard } from './components/BalanceCard';
import { QuickTransfer } from './components/QuickTransfer';
import { Banners } from './components/Banners';
import { Partners } from './components/Partners';
import { CategoryGrid } from './components/CategoryGrid';
import { BottomNav } from './components/BottomNav';

// Global Overlay modalkits
import { ScannerModal } from './components/ScannerModal';
import { TransferModal } from './components/TransferModal';
import { SupportModal } from './components/SupportModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SearchModal } from './components/SearchModal';
import { MobilePaymentModal } from './components/MobilePaymentModal';

// Dedicated Tab views
import { TransfersTab } from './components/TransfersTab';
import { MiniAppsTab } from './components/MiniAppsTab';
import { HistoryTab } from './components/HistoryTab';

export default function App() {
  const userEmail = 'umedbobokhonzoda11@gmail.com';

  // Persistence management states
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('dc_balance_v2');
    return saved ? parseFloat(saved) : 1450.61;
  });

  const [hideBalance, setHideBalance] = useState<boolean>(() => {
    return localStorage.getItem('dc_hide_balance') === 'true';
  });

  const [shortcuts, setShortcuts] = useState<QuickTransferShort[]>(() => {
    const saved = localStorage.getItem('dc_shortcuts_v3');
    return saved ? JSON.parse(saved) : INITIAL_SHORTCUTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('dc_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Modal / Overlay states
  const [activeTransferType, setActiveTransferType] = useState<'phone' | 'card' | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showGlobalMobilePay, setShowGlobalMobilePay] = useState(false);

  // Sync state mutations inside browser local caching
  useEffect(() => {
    localStorage.setItem('dc_balance_v2', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('dc_hide_balance', hideBalance.toString());
  }, [hideBalance]);

  useEffect(() => {
    localStorage.setItem('dc_shortcuts_v3', JSON.stringify(shortcuts));
  }, [shortcuts]);

  useEffect(() => {
    localStorage.setItem('dc_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handler functions
  const handleToggleHideBalance = () => {
    setHideBalance((prev) => !prev);
  };

  const handleRefreshBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  const handleRemoveShortcut = (id: string) => {
    setShortcuts((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSelectShortcut = (type: 'phone' | 'card') => {
    setActiveTransferType(type);
  };

  const handleDeductBalance = (amount: number) => {
    setBalance((prev) => +(prev - amount).toFixed(2));
  };

  const handleAddTransaction = (title: string, amount: number, category: string) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title,
      amount,
      currency: 'TJS',
      date: formattedDate,
      type: amount > 0 ? 'transfer_in' : 'payment',
      category,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleScanPaymentDone = (paymentName: string, amount: number) => {
    handleDeductBalance(amount);
    handleAddTransaction(`QR: Пардохт ба ${paymentName}`, -amount, 'Супермаркеты');
  };

  const handleClearHistory = () => {
    setTransactions([]);
  };

  const handleSearchActionSelect = (action: 'payment' | 'neru' | 'parking' | 'shohin' | 'avia' | 'credits') => {
    if (action === 'payment') {
      setShowGlobalMobilePay(true);
    } else if (action === 'neru' || action === 'parking' || action === 'shohin') {
      setActiveTab('miniapps');
      // Simulated tiny delay to give user response feeling
      setTimeout(() => {
        const trigger = document.getElementById(`partner-trigger-${action}`);
        if (trigger) trigger.click();
      }, 300);
    } else if (action === 'credits') {
      // open credits tab
      setActiveTab('home');
      setTimeout(() => {
        const block = document.getElementById('block-cards');
        if (block) block.click(); // Cards/Credits dashboard
      }, 300);
    } else if (action === 'avia') {
      setActiveTab('home');
      setTimeout(() => {
        const flyer = document.getElementById('balance-container');
        if (flyer) flyer.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <div className="h-screen w-screen bg-white md:bg-slate-100 flex items-center justify-center font-sans antialiased text-slate-800 overflow-hidden relative">
      
      {/* 
        PREMIUM RESPONSIVE VIEWPORT CARD WRAPPER
        Draws an exact beautiful mobile layout mock that scales and fits perfectly
      */}
      <div 
        id="phone-device-wrapper"
        className="w-full max-w-[430px] h-full md:h-[840px] bg-white overflow-hidden relative flex flex-col justify-between md:rounded-[40px] md:shadow-[0_24px_50px_rgba(0,0,0,0.15)] md:border-[10px] md:border-slate-900 transition-all duration-300"
      >
        {/* Outer content container with seamless soft canvas background */}
        <div className={`flex-1 pt-0 relative min-h-0 bg-[#F4F6FB] flex flex-col ${
          activeTab === 'home' || activeTab === 'history' ? 'overflow-hidden' : 'overflow-y-auto'
        }`}>
          
          {/* Header toolbar sitting at global view levels inside a premium sticky wrapper */}
          <div className="relative z-20 bg-[#F4F6FB] shrink-0">
            <Header 
              userEmail={userEmail}
              onOpenNotifications={() => setShowNotifications(true)}
              onOpenSupport={() => setShowSupport(true)}
              onOpenSearch={() => setShowSearch(true)}
              activeTab={activeTab}
            />
          </div>

          {/* DYNAMIC TAB MANAGER RENDERER */}
          {activeTab === 'home' && (
            <div className="flex-1 relative min-h-0">
              
              {/* 1. Large Blue Balance card - placed as a static background layer that doesn't scroll */}
              <div className="absolute top-[8px] left-0 right-0 z-0">
                <BalanceCard 
                  balance={balance}
                  hideBalance={hideBalance}
                  onToggleHideBalance={handleToggleHideBalance}
                  onRefreshBalance={handleRefreshBalance}
                />
              </div>

              {/* Scrollable Overlayer Area (Uses pointer-events techniques so background QR/eye buttons are still fully clickable through the transparent spacer region) */}
              <div className="absolute inset-0 z-10 overflow-y-auto pointer-events-none pb-2">
                
                {/* 142px transparent spacer matching the exact shifted position of the smaller-radius BalanceCard */}
                <div className="h-[142px] w-full bg-transparent pointer-events-none" />

                {/* Overlying solid content tray with a premium round radius top that slides over the Balance Card */}
                <div className="bg-white rounded-t-[14px] pt-1.5 pb-28 space-y-1 shadow-[0_-12px_24px_rgba(0,0,0,0.02)] border-t border-slate-200/20 pointer-events-auto relative z-10 min-h-[500px]">
                  
                  {/* 2. Quick Transfer shortcuts */}
                  <QuickTransfer 
                    shortcuts={shortcuts}
                    onRemoveShortcut={handleRemoveShortcut}
                    onSelectShortcut={handleSelectShortcut}
                  />

                  {/* 3. Sliding promotional banner carousel (Avia booking engine) */}
                  <Banners 
                    balance={balance}
                    onDeductBalance={handleDeductBalance}
                    onAddTransaction={handleAddTransaction}
                  />

                  {/* 4. Active partners widget bar (Neru charging system, Parkings maps booking, Shohin products) */}
                  <Partners 
                    balance={balance}
                    onDeductBalance={handleDeductBalance}
                    onAddTransaction={handleAddTransaction}
                  />

                  {/* 5. Main dashboard grid (Mobile recharge cards, deposits calculators) */}
                  <CategoryGrid 
                    balance={balance}
                    onDeductBalance={handleDeductBalance}
                    onAddTransaction={handleAddTransaction}
                  />

                </div>
              </div>

            </div>
          )}

          {activeTab === 'transfers' && (
            <TransfersTab 
              balance={balance}
              onSelectShortcut={handleSelectShortcut}
            />
          )}

          {activeTab === 'miniapps' && (
            <MiniAppsTab 
              onSelectPartner={(partnerId) => {
                // Trigger partner interactive overlay in microapps
                const partnerMap: { [key: string]: string } = {
                  neru: 'partner-trigger-neru',
                  parking: 'partner-trigger-parking',
                  shohin: 'partner-trigger-shohin',
                };
                const id = partnerMap[partnerId];
                if (id) {
                  const element = document.getElementById(id);
                  if (element) element.click();
                }
              }}
            />
          )}

          {activeTab === 'history' && (
            <HistoryTab 
              transactions={transactions}
              onClearHistory={handleClearHistory}
            />
          )}

        </div>

        {/* Global sticky floating bottom command menu */}
        <BottomNav 
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onTriggerScanner={() => setShowScanner(true)}
        />

        {/* ==========================================
            GLOBAL CONTEXTUAL MODALS CONTROLS
           ========================================== */}
        
        {/* 1. Scanner Camera simulator */}
        {showScanner && (
          <ScannerModal 
            balance={balance}
            onClose={() => setShowScanner(false)}
            onScanComplete={handleScanPaymentDone}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {/* 2. Direct internal transfers (phone/card) */}
        {activeTransferType && (
          <TransferModal 
            type={activeTransferType}
            balance={balance}
            onClose={() => setActiveTransferType(null)}
            onTransferComplete={(rec, amt) => {
              handleDeductBalance(amt);
            }}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {/* 3. Support bot chat help module */}
        {showSupport && (
          <SupportModal 
            onClose={() => setShowSupport(false)}
          />
        )}

        {/* 4. Alert/Message feed notifications center */}
        {showNotifications && (
          <NotificationsModal 
            onClose={() => setShowNotifications(false)}
          />
        )}

        {/* 5. Interactive service search widget sheets */}
        {showSearch && (
          <SearchModal 
            onClose={() => setShowSearch(false)}
            onSelectAction={handleSearchActionSelect}
          />
        )}

        {/* 6. Universal direct mobile payment trigger from search */}
        {showGlobalMobilePay && (
          <MobilePaymentModal 
            balance={balance}
            onClose={() => setShowGlobalMobilePay(false)}
            onPay={(provider, phone, amt) => {
              handleDeductBalance(amt);
              handleAddTransaction(`${provider} Пополнение (+992 ${phone})`, -amt, 'Мобильная связь');
            }}
          />
        )}

      </div>
    </div>
  );
}
