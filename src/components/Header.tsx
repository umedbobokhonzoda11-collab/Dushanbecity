import React, { useState } from 'react';
import { Bell, Headphones, Search, X, User, ShieldCheck, Mail, LogOut, FileText, Phone } from 'lucide-react';

interface HeaderProps {
  userEmail: string;
  onOpenNotifications: () => void;
  onOpenSupport: () => void;
  onOpenSearch: () => void;
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = ({
  userEmail,
  onOpenNotifications,
  onOpenSupport,
  onOpenSearch,
  activeTab = 'home',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (activeTab === 'history') {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between px-5 pt-4 pb-2 bg-white select-none">
        {/* Hamburger Menu Trigger */}
        <button
          id="btn-hamburger"
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col justify-between w-6 h-5 cursor-pointer group focus:outline-none transition-transform active:scale-90"
        >
          <span className="w-6 h-[3px] bg-[#1861D5] rounded-full transition-transform"></span>
          <span className="w-4 h-[3px] bg-[#1861D5] rounded-full self-start transition-all group-hover:w-6"></span>
          <span className="w-5 h-[3px] bg-[#1861D5] rounded-full self-start transition-all group-hover:w-6"></span>
        </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-6">
          {/* Notification Button */}
          {activeTab === 'home' && (
            <button
              id="btn-notif"
              onClick={onOpenNotifications}
              className="text-slate-600 hover:text-[#1861D5] active:scale-95 transition-all relative"
            >
              <Bell size={24} className="stroke-[1.8]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          )}

          {/* Support Helpline */}
          {activeTab === 'home' && (
            <button
              id="btn-support"
              onClick={onOpenSupport}
              className="text-slate-600 hover:text-[#1861D5] active:scale-95 transition-all"
            >
              <Headphones size={24} className="stroke-[1.8]" />
            </button>
          )}

          {/* Search tool - only visible on Home (Главная) Tab */}
          {activeTab === 'home' && (
            <button
              id="btn-search"
              onClick={onOpenSearch}
              className="text-[#1861D5] hover:opacity-80 active:scale-95 transition-all animate-fade-in"
            >
              <Search size={24} className="stroke-[2.2]" />
            </button>
          )}
        </div>
      </header>

      {/* Sidebar Drawer Container */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex" id="sidebar-drawer">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Body */}
          <div className="relative flex flex-col w-5/6 max-w-sm h-full bg-white shadow-2xl transition-transform animate-slide-in-left duration-300">
            {/* Drawer Header */}
            <div className="p-6 bg-[#1861D5] text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <User size={32} className="text-white" />
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              <div className="font-semibold text-lg truncate">Умед Бобохонзода</div>
              <div className="text-xs text-white/80 font-mono truncate">{userEmail}</div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium tracking-wide bg-emerald-500 text-white rounded-full">
                <ShieldCheck size={12} /> Идентификатсияшуда (Verified)
              </div>
            </div>

            {/* General menu options */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-6 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Ҳисоб (Account)
              </div>
              <div className="space-y-1">
                <button className="flex items-center gap-4 w-full px-6 py-3 hover:bg-slate-50 text-left text-slate-700 transition-colors">
                  <ShieldCheck size={20} className="text-[#1861D5]" />
                  <div>
                    <div className="text-sm font-medium">Амният ва рамзҳо</div>
                    <div className="text-xs text-slate-400">Security and PINs</div>
                  </div>
                </button>

                <button className="flex items-center gap-4 w-full px-6 py-3 hover:bg-slate-50 text-left text-slate-700 transition-colors">
                  <FileText size={20} className="text-[#1861D5]" />
                  <div>
                    <div className="text-sm font-medium">Шартномаи хизматрасонӣ</div>
                    <div className="text-xs text-slate-400">Service Terms</div>
                  </div>
                </button>

                <button className="flex items-center gap-4 w-full px-6 py-3 hover:bg-slate-50 text-left text-slate-700 transition-colors">
                  <Mail size={20} className="text-[#1861D5]" />
                  <div>
                    <div className="text-sm font-medium">Мактубҳо ва хабарҳо</div>
                    <div className="text-xs text-slate-400">Mail & Announcements</div>
                  </div>
                </button>

                <button className="flex items-center gap-4 w-full px-6 py-3 hover:bg-slate-50 text-left text-slate-700 transition-colors">
                  <Phone size={20} className="text-[#1861D5]" />
                  <div>
                    <div className="text-sm font-medium">Дастгирии мизоҷон</div>
                    <div className="text-xs text-slate-400">+992 44 600 0111</div>
                  </div>
                </button>
              </div>

              <div className="h-px bg-slate-100 my-4 mx-6" />

              <div className="px-6 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Танзимот (Settings)
              </div>
              <div className="space-y-1 px-6">
                <div className="flex justify-between items-center py-2 text-sm text-slate-700">
                  <span>Забон / Язык</span>
                  <span className="font-semibold text-[#1861D5] bg-[#1861D5]/10 px-2.5 py-1 rounded text-xs select-none">Тоҷикӣ</span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm text-slate-700">
                  <span>Макон / Локация</span>
                  <span className="text-xs text-slate-500">Душанбе</span>
                </div>
              </div>
            </div>

            {/* Footer Sign-out info */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium text-sm transition-colors active:scale-95">
                <LogOut size={18} />
                <span>Баромадан (Sign Out)</span>
              </button>
              <div className="text-[10px] text-slate-400 mt-4 text-center">
                Dushanbe City Wallet v5.4.2
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
