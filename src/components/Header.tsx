import React from 'react';
import { Bell, Smartphone, Monitor, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenNotifications: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMobileFrame,
  setIsMobileFrame,
  onOpenNotifications,
  theme,
  onToggleTheme,
  unreadCount = 2
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#070e1b]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no decorative pills) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('barometer')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors whitespace-nowrap">
              EmeklilikRadarı
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 tracking-normal hidden sm:block whitespace-nowrap">
              Söylenti Değil, Resmi Gelişme
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links (single line, subtle hover) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('barometer')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'barometer' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Durum Barometresi
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'calculator' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Senaryo Hesapla
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'timeline' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Meclis &amp; Gündem
          </button>
          <button
            onClick={() => setActiveTab('factcheck')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'factcheck' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Doğruluk Kontrolü
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'faq' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Bilgi Bankası (SSS)
          </button>
          <button
            onClick={() => setActiveTab('bots')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'bots' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Botlar
          </button>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Day / Night Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            title={theme === 'dark' ? 'Gündüz Moduna Geç' : 'Gece Moduna Geç'}
            aria-label="Tema Değiştir"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Gündüz</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden sm:inline">Gece</span>
              </>
            )}
          </button>

          {/* Frame View Switcher (Desktop vs Mobile Preview) */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            title={isMobileFrame ? 'Masaüstü Tam Ekrana Geç' : 'Mobil Uygulama Çerçevesine Geç'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                <span>Masaüstü</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                <span>Mobil Simülatör</span>
              </>
            )}
          </button>

          {/* Notification Center Trigger */}
          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <Bell className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">Alarmlar</span>
            {unreadCount > 0 && (
              <span className="font-mono-numbers ml-0.5 px-1 py-0.2 bg-slate-950 text-sky-300 text-[10px] rounded font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
