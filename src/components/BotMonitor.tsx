import React, { useState } from 'react';
import { SCRAPER_BOTS } from '../data/mockData';
import { Terminal, RefreshCw, CheckCircle2, ShieldCheck, Activity, Search, AlertCircle, Database } from 'lucide-react';

interface BotMonitorProps {
  lastSyncTime?: string;
  totalScansToday?: number;
  blockedCount?: number;
  onTriggerSync?: () => void;
  isSyncing?: boolean;
}

export const BotMonitor: React.FC<BotMonitorProps> = ({
  lastSyncTime,
  totalScansToday = 4840,
  blockedCount = 1432,
  onTriggerSync,
  isSyncing = false
}) => {
  const [bots, setBots] = useState(SCRAPER_BOTS);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanMessage, setLastScanMessage] = useState<string | null>(null);

  const handleManualScan = () => {
    if (onTriggerSync) {
      onTriggerSync();
    }
    setIsScanning(true);
    setLastScanMessage(null);

    setTimeout(() => {
      setIsScanning(false);
      setLastScanMessage('T.C. Resmî Gazete ve TBMM portalları anlık tarandı: 0 yeni kademeli emeklilik mevzuatı tespit edildi (Süreç stabil).');

      setBots(prev => prev.map(bot => ({
        ...bot,
        lastRun: `Son Otomatik Çekim: ${new Date().toLocaleTimeString('tr-TR')}`,
        recentLogs: [
          `${new Date().toLocaleTimeString('tr-TR')} - Otomatik API ve HTML taraması tamamlandı.`,
          `${new Date().toLocaleTimeString('tr-TR')} - HTTP 200 OK: Veri tabanı senkronize edildi.`,
          `${new Date().toLocaleTimeString('tr-TR')} - 5510 & 4447 taranan kelimeler: Kırmızı Alarm tetiklenmedi.`,
          ...bot.recentLogs.slice(0, 3)
        ]
      })));
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400 font-semibold">Otonom Doğrulama Motoru</span>
              <span aria-hidden="true">·</span>
              <span>Resmi Scraper &amp; LLM Filtre Mimarisi</span>
              <span aria-hidden="true">·</span>
              <span>Kesintisiz 7/24</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Resmi Kaynak Botları &amp; Clickbait Filtre Durumu
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Uygulamanın kalbi, internetteki haber kirliliğini eleyen ve resmi süreçleri tarayan otonom bot sistemidir. Somut kanun numarası veya meclis tutanağı içermeyen hiçbir iddia kullanıcılara iletilmez.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              onClick={handleManualScan}
              disabled={isScanning || isSyncing}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning || isSyncing ? 'animate-spin' : ''}`} />
              <span>{isScanning || isSyncing ? 'Veriler Taranıyor...' : 'Şimdi Veri Çek & Tara'}</span>
            </button>
          </div>
        </div>

        {/* Real-time stats strip */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-numbers">
          <div className="bg-slate-50 dark:bg-[#06101e] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Otomatik Senkron</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Aktif (20sn)
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-[#06101e] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Son Veri Çekimi</span>
            <span className="text-slate-900 dark:text-white font-bold mt-0.5 block">{lastSyncTime || 'Az Önce'}</span>
          </div>
          <div className="bg-slate-50 dark:bg-[#06101e] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Bugünkü Otomatik Tarama</span>
            <span className="text-sky-600 dark:text-sky-300 font-bold mt-0.5 block">{totalScansToday.toLocaleString('tr-TR')} Sorgu</span>
          </div>
          <div className="bg-slate-50 dark:bg-[#06101e] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Engellenen Clickbait</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold mt-0.5 block">{blockedCount.toLocaleString('tr-TR')} İçerik</span>
          </div>
        </div>

        {lastScanMessage && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{lastScanMessage}</span>
          </div>
        )}
      </div>

      {/* 4 Bot Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3.5 shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 rounded-lg">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    {bot.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-numbers">
                    Periyot: {bot.interval} · Son Tarama: {bot.lastRun}
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono-numbers">
                AKTİF
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Güncel Durum: </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">{bot.status}</span>
            </div>

            {/* Target Keywords */}
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                Taranan Anahtar Kelimeler:
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                {bot.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 dark:bg-[#06101e] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-mono-numbers text-slate-600 dark:text-slate-400"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Mini Terminal Logs */}
            <div className="bg-slate-900 dark:bg-[#040810] border border-slate-800/80 rounded-lg p-3 font-mono-numbers text-[10px] text-slate-300 dark:text-slate-400 space-y-1 shadow-inner">
              <div className="flex items-center gap-1.5 text-slate-400 font-sans text-[11px] border-b border-slate-800 pb-1 mb-1">
                <Terminal className="w-3 h-3 text-sky-400" />
                <span>Canlı Tutanak / Bot Logları</span>
              </div>
              {bot.recentLogs.map((log, idx) => (
                <div key={idx} className="truncate text-slate-300 dark:text-slate-400">
                  {log}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Spec Info Box */}
      <div className="bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Veri Toplama ve Clickbait Filtresi Mimarisi</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3 bg-white dark:bg-[#0b162a] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <strong className="text-sky-700 dark:text-sky-300 font-semibold">1. Resmi Kaynak Scraper&apos;ı:</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              T.C. Resmî Gazete her gece 00:00&apos;da yayınlandığı an metin taraması yapar; TBMM Kanun Teklifleri portalı ise 15 dakikada bir komisyon gündemlerini çeker.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-[#0b162a] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <strong className="text-sky-700 dark:text-sky-300 font-semibold">2. Yapay Zeka LLM Filtresi:</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Web ve haber sitelerindeki metinleri analiz eder. Metinde somut kanun numarası veya bakanın doğrudan demeci yoksa içeriği &quot;Söylenti / Tıklama Tuzağı&quot; olarak etiketler.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-[#0b162a] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
            <strong className="text-sky-700 dark:text-sky-300 font-semibold">3. 3 Kademeli Push Dağıtımı:</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Kullanıcılar spam bildirimlere boğulmaz. Yalnızca onaylanmış Kırmızı/Sarı/Mavi alarm kriterlerini sağlayan resmi olaylar kullanıcılara iletilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
