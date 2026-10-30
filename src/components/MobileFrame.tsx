import React from 'react';
import { Wifi, Battery, Signal, Compass, Calculator, Clock, ShieldCheck, Cpu, BookOpen } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExitMobileFrame: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTab,
  setActiveTab,
  onExitMobileFrame
}) => {
  return (
    <div className="py-6 px-3 flex flex-col items-center justify-center min-h-[calc(100vh-65px)]">
      {/* Top Banner explaining mobile simulator view */}
      <div className="mb-4 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3 bg-white dark:bg-[#0b162a] px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-sky-600 dark:text-sky-400 font-semibold">📱 Mobil Uygulama Simülatörü</span>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
        <span>iOS &amp; Android Tek Kod Tabanı</span>
        <button
          onClick={onExitMobileFrame}
          className="ml-2 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white underline cursor-pointer"
        >
          Masaüstü Görünüme Dön
        </button>
      </div>

      {/* Phone Hardware Mockup Shell */}
      <div className="relative w-full max-w-[420px] bg-slate-50 dark:bg-[#070e1b] rounded-[48px] border-[8px] border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden ring-1 ring-slate-400/40 dark:ring-slate-700/60 flex flex-col h-[840px]">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-0 left-0 right-0 z-50 pt-2 pb-1 px-6 flex items-center justify-between text-slate-800 dark:text-white text-[11px] font-mono-numbers bg-transparent pointer-events-none">
          <span>09:41</span>
          <div className="w-24 h-4 bg-slate-900 dark:bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Mobile Viewport */}
        <div className="flex-1 overflow-y-auto pt-10 pb-20 px-3.5 space-y-4">
          {children}
        </div>

        {/* Fixed Mobile Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#070e1b]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800/90 grid grid-cols-6 items-center h-16 px-1">
          <button
            onClick={() => setActiveTab('barometer')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === 'barometer' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-1">Barometre</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === 'calculator' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-1">Hesapla</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === 'timeline' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-1">Meclis</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === 'faq' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-1">SSS</span>
          </button>

          <button
            onClick={() => setActiveTab('factcheck')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === 'factcheck' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-1">Teyit</span>
          </button>

          <button
            onClick={() => setActiveTab('bots')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              activeTab === 'bots' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-1">Botlar</span>
          </button>
        </div>

        {/* Home Indicator line */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full pointer-events-none z-50" />
      </div>
    </div>
  );
};
