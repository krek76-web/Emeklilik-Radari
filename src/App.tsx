import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StatusBarometer } from './components/StatusBarometer';
import { ScenarioCalculator } from './components/ScenarioCalculator';
import { LiveTimeline } from './components/LiveTimeline';
import { FactCheckSection } from './components/FactCheckSection';
import { KnowledgeBase } from './components/KnowledgeBase';
import { BotMonitor } from './components/BotMonitor';
import { NotificationCenter } from './components/NotificationCenter';
import { ProMembershipModal } from './components/ProMembershipModal';
import { MobileFrame } from './components/MobileFrame';
import { CalculatedResult, CalculatorInput } from './types';
import { ShieldCheck, ChevronRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('barometer');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProReportOpen, setIsProReportOpen] = useState<boolean>(false);
  const [reportData, setReportData] = useState<{
    results: CalculatedResult;
    input: CalculatorInput;
  } | null>(null);

  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('er_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('er_theme', theme);
    } catch (e) {
      console.debug('Theme storage error:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Real-time automatic data collection & polling state
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('tr-TR'));
  const [countdown, setCountdown] = useState<number>(20);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [totalScansToday, setTotalScansToday] = useState<number>(4842);
  const [blockedCount, setBlockedCount] = useState<number>(1432);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Quick banner notification state
  const [bannerAlert, setBannerAlert] = useState<{
    text: string;
    level: string;
  }>({
    text: 'Resmî Gazete Sayı 32900 tarandı: Kademeli emeklilik henüz yasalaşmamıştır. İnternetteki "Müjde çıktı" iddialarına itibar etmeyiniz.',
    level: 'official'
  });

  // Automated Real-Time Data Fetcher
  const fetchLiveData = useCallback(async (isManual = false) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        const nowStr = new Date().toLocaleTimeString('tr-TR');
        setLastSyncTime(nowStr);
        if (data.totalScansToday) setTotalScansToday(data.totalScansToday);
        if (data.blockedFakeNewsCount) setBlockedCount(data.blockedFakeNewsCount);
        if (data.currentBureaucraticStage?.lastOfficialVerification) {
          setBannerAlert({
            text: `${data.currentBureaucraticStage.lastOfficialVerification} Kademeli emeklilik torbada veya Resmi Gazete'de yoktur.`,
            level: 'official'
          });
        }

        if (isManual) {
          setSyncToast(`[${nowStr}] Canlı veri çekildi: Resmî Gazete ve TBMM portalları güncel.`);
          setTimeout(() => setSyncToast(null), 3000);
        }
      }
    } catch (err) {
      console.warn('Otomatik senkronizasyon kontrolü:', err);
    } finally {
      setIsSyncing(false);
      setCountdown(20);
    }
  }, []);

  // Timer loop: Automatic live polling every 20 seconds
  useEffect(() => {
    // Initial fetch
    fetchLiveData();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchLiveData();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchLiveData]);

  const handleOpenProReport = (results: CalculatedResult, input: CalculatorInput) => {
    setReportData({ results, input });
    setIsProReportOpen(true);
  };

  // Render the active view
  const renderContent = () => {
    switch (activeTab) {
      case 'barometer':
        return (
          <StatusBarometer
            onNavigateToCalculator={() => setActiveTab('calculator')}
            onNavigateToFactCheck={() => setActiveTab('factcheck')}
            onNavigateToBots={() => setActiveTab('bots')}
            onNavigateToFaq={() => setActiveTab('faq')}
            lastSyncTime={lastSyncTime}
          />
        );
      case 'calculator':
        return <ScenarioCalculator onOpenProReport={handleOpenProReport} />;
      case 'timeline':
        return <LiveTimeline />;
      case 'factcheck':
        return <FactCheckSection />;
      case 'faq':
        return (
          <KnowledgeBase
            onNavigateToCalculator={() => setActiveTab('calculator')}
            onNavigateToFactCheck={() => setActiveTab('factcheck')}
          />
        );
      case 'bots':
        return (
          <BotMonitor
            lastSyncTime={lastSyncTime}
            totalScansToday={totalScansToday}
            blockedCount={blockedCount}
            onTriggerSync={() => fetchLiveData(true)}
            isSyncing={isSyncing}
          />
        );
      default:
        return (
          <StatusBarometer
            onNavigateToCalculator={() => setActiveTab('calculator')}
            onNavigateToFactCheck={() => setActiveTab('factcheck')}
            onNavigateToBots={() => setActiveTab('bots')}
            onNavigateToFaq={() => setActiveTab('faq')}
            lastSyncTime={lastSyncTime}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070e1b] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950 transition-colors">
      {/* Top Bar adhering to strict Top Bar Contract with Theme switch */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Real-Time Automated Data Collection Status Bar */}
      <div className="bg-slate-100 dark:bg-[#050b14] border-b border-slate-200 dark:border-slate-800/90 py-2 px-4 text-xs transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 truncate">
            {/* Live pulsating green dot */}
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
              Canlı Otomatik Çekim:
            </span>
            <span className="truncate text-slate-700 dark:text-slate-300">
              T.C. Resmî Gazete &amp; TBMM veri akışı anlık taranıyor (Son Çekim: <strong className="font-mono-numbers text-slate-900 dark:text-white">{lastSyncTime}</strong>)
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <span className="text-slate-500 dark:text-slate-400 font-mono-numbers hidden md:inline">
              Yeni Taramaya: <strong className="text-sky-600 dark:text-sky-400">{countdown}sn</strong>
            </span>
            <button
              onClick={() => fetchLiveData(true)}
              disabled={isSyncing}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 hover:text-slate-900 dark:hover:text-white rounded border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Portalları şimdi anlık tara"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-sky-500' : ''}`} />
              <span>{isSyncing ? 'Çekiliyor...' : 'Anlık Veri Çek'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Status Notice Banner */}
      <aside aria-label="Resmi Durum Bildirisi" className="bg-sky-50/70 dark:bg-[#091527] border-b border-sky-100 dark:border-slate-800/90 py-2 px-4 text-xs transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 truncate">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shrink-0" />
            <strong className="text-sky-700 dark:text-sky-300 shrink-0">Resmi Durum:</strong>
            <span className="truncate text-slate-700 dark:text-slate-300">{bannerAlert.text}</span>
          </div>
          <button
            onClick={() => setActiveTab('factcheck')}
            className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium shrink-0 flex items-center gap-1 cursor-pointer whitespace-nowrap text-[11px]"
          >
            <span>Detaylı Doğrulama</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </aside>

      {/* Manual Sync Toast Notice */}
      {syncToast && (
        <div className="bg-emerald-50 dark:bg-emerald-950/90 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Main Content Area: Responsive Desktop or Simulated Mobile App Frame */}
      <main className="flex-1">
        {isMobileFrame ? (
          <MobileFrame
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onExitMobileFrame={() => setIsMobileFrame(false)}
          >
            {renderContent()}
          </MobileFrame>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {renderContent()}
          </div>
        )}
      </main>

      {/* Notification Center Modal */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Pro Membership & Personalized PDF Report Modal */}
      <ProMembershipModal
        isOpen={isProReportOpen}
        onClose={() => setIsProReportOpen(false)}
        reportData={reportData}
      />

      {/* Alt Bar (Footer) with explicit Site Sahibi: Özkan Gürel */}
      <footer className="bg-slate-100 dark:bg-[#050b14] border-t border-slate-200 dark:border-slate-800 py-8 px-4 md:px-8 text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Footer Nav & Brand Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                <span>EmeklilikRadarı</span>
                <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal text-xs">Resmi Kademeli Emeklilik Takip &amp; Doğrulama Ağı</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                &quot;Söylenti Değil, Resmi Gelişme: Kademeli Emeklilikte İlk Sizin Haberiniz Olsun.&quot; T.C. Resmî Gazete ve TBMM tutanakları 7/24 otonom botlarla çekilir ve anlık güncellenir.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-xs text-slate-600 dark:text-slate-400">
              <button
                onClick={() => setActiveTab('barometer')}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                Barometre
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                Senaryolar
              </button>
              <button
                onClick={() => setActiveTab('factcheck')}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                Doğruluk Kontrolü
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                Bilgi Bankası (SSS)
              </button>
              <button
                onClick={() => setActiveTab('bots')}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                Bot Durumu
              </button>
              <button
                onClick={() => setIsProReportOpen(true)}
                className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer text-sky-600 dark:text-sky-400 font-medium"
              >
                Reklamsız Model &amp; Pro Rapor
              </button>
            </div>
          </div>

          {/* Prominent Site Sahibi & Platform Ownership Banner in Alt Bar */}
          <div className="p-4 bg-white dark:bg-[#081222] border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-sky-500 dark:bg-sky-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Platform Sahibi ve Kurucu:
                </span>
                <span className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">
                  Site Sahibi: Özkan Gürel
                </span>
              </div>
            </div>

            <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-right">
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center sm:justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Anlık Otomatik Veri Çekme Motoru Aktif
              </div>
              <span className="text-[11px] text-slate-500 block">
                Veriler T.C. Resmî Gazete ve TBMM sistemlerinden 20 saniyede bir otomatik yenilenmektedir.
              </span>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
            <div>
              © 2026 EmeklilikRadarı · <strong className="text-slate-800 dark:text-slate-200">Site Sahibi: Özkan Gürel</strong> · 5510 &amp; 4447 Sayılı Kanunlar Açık Veri Portalı.
            </div>
            <div className="flex items-center gap-3">
              <span>Sıfır Reklam Politikası</span>
              <span aria-hidden="true">·</span>
              <span>Çift Doğrulama Garantisi</span>
              <span aria-hidden="true">·</span>
              <span>Son Senkron: {lastSyncTime}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
