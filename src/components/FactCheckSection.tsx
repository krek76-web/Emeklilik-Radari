import React, { useState, useEffect } from 'react';
import { FACT_CHECK_ITEMS } from '../data/mockData';
import { FactCheckItem } from '../types';
import {
  ShieldAlert,
  Search,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  ArrowRight,
  CornerDownRight,
  RefreshCw,
  Cpu,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  checkDeviceAiAvailability,
  getUserAiQuota,
  consumeUserAiQuota,
  resetUserAiQuota,
  DeviceAiStatus,
  UserAiQuota
} from '../utils/deviceAiDetector';
import { DeviceAiWarningModal } from './DeviceAiWarningModal';

interface AIAnalysisResult {
  isClickbait: boolean;
  clickbaitScore: number;
  verdict: string;
  alertLevel: string;
  shouldPush: boolean;
  manipulationTricks: string[];
  officialFact: string;
  legalReference: string;
  summary: string;
  sourceType?: string;
  quotaUsedFrom?: string;
}

export const FactCheckSection: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Device AI & User Quota state
  const [deviceAiStatus, setDeviceAiStatus] = useState<DeviceAiStatus>({
    isAvailable: false,
    type: 'none',
    label: 'Cihaz Taranıyor...',
    description: 'Cihazınızdaki yapay zeka desteği kontrol ediliyor.',
    hardwareAcceleration: false
  });
  const [userQuota, setUserQuota] = useState<UserAiQuota>({
    totalQuota: 5,
    usedQuota: 0,
    remainingQuota: 5,
    lastResetDate: ''
  });
  const [isCheckingDevice, setIsCheckingDevice] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [pendingTextToAnalyze, setPendingTextToAnalyze] = useState<string>('');

  const sampleHeadlines = [
    'Kademeli emeklilik torba yasaya girdi, Resmi Gazete\'de bu gece yayımlandı!',
    'Bakan Işıkhan\'dan 1999-2008 arası SGK\'lılara flaş müjde: Tarih belli oldu!',
    'TBMM Plan ve Bütçe Komisyonu kademeli emeklilik yaş tablosunu onayladı mı?',
    'Özgür Erdursun açıkladı: Kademeli emeklilikte son durum nedir?'
  ];

  // Component mount: Check device AI capability & retrieve visitor quota
  useEffect(() => {
    setUserQuota(getUserAiQuota());
    checkDevice();
  }, []);

  const checkDevice = async () => {
    setIsCheckingDevice(true);
    try {
      const status = await checkDeviceAiAvailability();
      setDeviceAiStatus(status);
    } finally {
      setIsCheckingDevice(false);
    }
  };

  /**
   * Main analysis trigger
   * Satisfies: "uygulama icindeki yapay zeka kullanimi,siteyi inceleyen kullanicinin kotasindan kullanir.
   * eger yapay zeka uygulamsi cihazinda yoksa uyari verir"
   */
  const handleAnalyze = async (textToAnalyze?: string, bypassDeviceWarning = false) => {
    const text = textToAnalyze || inputText;
    if (!text.trim()) return;

    // 1. Quota check: Does the visitor have remaining quota?
    const currentQuota = getUserAiQuota();
    setUserQuota(currentQuota);

    if (currentQuota.remainingQuota <= 0) {
      setAnalysisError('Günlük kullanıcı yapay zeka kotanız dolmuştur (0/5 hak kaldı). Kotanız her gece 00:00\'da yenilenecektir.');
      return;
    }

    // 2. Device AI check: If device does NOT have on-device AI app and warning not bypassed
    if (!deviceAiStatus.isAvailable && !bypassDeviceWarning) {
      setPendingTextToAnalyze(text);
      setIsWarningModalOpen(true);
      return;
    }

    // 3. Consume 1 unit from visitor's personal quota
    const deduction = consumeUserAiQuota();
    if (!deduction.success) {
      setAnalysisError(deduction.message || 'Kullanıcı kotası yetersiz.');
      return;
    }
    setUserQuota(deduction.quota);

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-clickbait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          clientQuotaRemaining: deduction.quota.remainingQuota,
          deviceAiType: deviceAiStatus.type
        })
      });

      if (!response.ok) {
        throw new Error('Analiz servisine ulaşılamadı.');
      }

      const data = await response.json();
      data.quotaUsedFrom = `Kullanıcı Kotasından Harcandı (-1 Hak) · Kalan Ziyaretçi Kotası: ${deduction.quota.remainingQuota}/5`;
      setAnalysisResult(data);
    } catch (err: unknown) {
      console.error(err);
      setAnalysisError('Doğrulama motoru yanıt veremedi. Lütfen tekrar deneyin.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProceedWithQuotaFallback = () => {
    setIsWarningModalOpen(false);
    if (pendingTextToAnalyze) {
      handleAnalyze(pendingTextToAnalyze, true);
    } else {
      handleAnalyze(inputText, true);
    }
  };

  const handleResetQuotaForTest = () => {
    const reset = resetUserAiQuota();
    setUserQuota(reset);
    setAnalysisError(null);
  };

  return (
    <div className="space-y-6">
      {/* Device AI Warning Modal */}
      <DeviceAiWarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        status={deviceAiStatus}
        quota={userQuota}
        onRecheck={checkDevice}
        onProceedWithQuotaFallback={handleProceedWithQuotaFallback}
        isChecking={isCheckingDevice}
      />

      {/* Header section */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400 font-semibold">Doğruluk Kontrolü (Fact-Check)</span>
              <span aria-hidden="true">·</span>
              <span>Dezenformasyon Taraması</span>
              <span aria-hidden="true">·</span>
              <span>Kullanıcı Kotası &amp; Cihaz Yapay Zekası</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Sahte Haber &amp; Tıklama Tuzağı Dedektörü
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Her gün yüzlerce web sitesi &quot;Kademeli emeklilik çıktı mı? İşte müjde!&quot; başlığıyla asılsız içerik üretir. Bir haber veya sosyal medya metnini yapay zeka ve mevzuat motorumuzla doğrulayın.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2 rounded-lg border border-rose-200 dark:border-rose-900/60 shrink-0">
            <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>Resmi Gazete&apos;de çıkmayan hiçbir haber doğru değildir.</span>
          </div>
        </div>

        {/* User Quota & Device AI Status Bar */}
        <div className="mt-5 p-3.5 bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Cihaz Yapay Zeka Durumu:
              </span>
              {deviceAiStatus.isAvailable ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {deviceAiStatus.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsWarningModalOpen(true)}
                  className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cihazda Bulunamadı (Uyarıyı İncele)</span>
                </button>
              )}
            </div>

            {/* Quota Progress */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-sans">
                  Ziyaretçi Günlük Kotanız:
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono-numbers">
                  {userQuota.remainingQuota} / {userQuota.totalQuota} Kalan Hak
                </span>
              </div>
              <div className="w-16 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    userQuota.remainingQuota > 2
                      ? 'bg-emerald-500'
                      : userQuota.remainingQuota > 0
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${(userQuota.remainingQuota / userQuota.totalQuota) * 100}%` }}
                />
              </div>

              <button
                type="button"
                onClick={handleResetQuotaForTest}
                title="Kotayı sıfırla (Test)"
                className="text-[10px] text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 underline cursor-pointer"
              >
                Sıfırla
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-200/80 dark:border-slate-800/80">
            <Info className="w-3.5 h-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
            <span>
              Yapay zeka analizleri doğrudan siteyi inceleyen kullanıcının kotasından ve cihazından kullanılır.
            </span>
          </div>
        </div>

        {/* Live AI Analysis Input Box */}
        <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Şüphelendiğiniz Haber Başlığını veya Metnini Yapıştırın:
          </label>

          <div className="relative">
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Örnek: 'Kademeli emeklilikte beklenen müjde geldi! 1999-2008 arası için 43-45 yaş tablosu Resmi Gazete'de yayımlandı mı?'"
              className="w-full bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Sample Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 text-[11px]">Örnek Başlıklar:</span>
              {sampleHeadlines.slice(0, 2).map((headline, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(headline);
                    handleAnalyze(headline);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded text-[11px] transition-colors truncate max-w-xs cursor-pointer border border-slate-200 dark:border-slate-700/50"
                >
                  &quot;{headline.slice(0, 35)}...&quot;
                </button>
              ))}
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || !inputText.trim() || userQuota.remainingQuota <= 0}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Kullanıcı Kotasından Taranıyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Yapay Zeka ile Analiz Et (-1 Hak)</span>
                </>
              )}
            </button>
          </div>

          {analysisError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-300 flex items-center justify-between">
              <span>{analysisError}</span>
              {userQuota.remainingQuota <= 0 && (
                <button
                  type="button"
                  onClick={handleResetQuotaForTest}
                  className="ml-2 font-bold underline cursor-pointer text-xs"
                >
                  Kotayı Yenile (Test)
                </button>
              )}
            </div>
          )}

          {/* AI Analysis Result Card */}
          {analysisResult && (
            <div className="mt-4 p-5 bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-700 rounded-xl space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${
                    analysisResult.isClickbait ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Değerlendirme Kararı</div>
                    <div className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {analysisResult.verdict}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white dark:bg-[#0b162a] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Clickbait / Yanıltma Skoru</div>
                    <div className={`text-base font-extrabold font-mono-numbers ${
                      analysisResult.clickbaitScore > 60 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      %{analysisResult.clickbaitScore}
                    </div>
                  </div>
                  <div className="w-12 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${analysisResult.clickbaitScore > 60 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${analysisResult.clickbaitScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quota Attribution Badge */}
              {analysisResult.quotaUsedFrom && (
                <div className="text-[11px] px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 rounded-lg text-sky-800 dark:text-sky-300 font-medium flex items-center justify-between">
                  <span>{analysisResult.quotaUsedFrom}</span>
                  <span className="font-mono-numbers">Kalan Hak: {userQuota.remainingQuota}</span>
                </div>
              )}

              {/* Bot Action: Did it push notification or block it? */}
              <div className="p-3 bg-white dark:bg-[#0b162a] rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Bildirim Sistemi Kararı:</span>
                {analysisResult.shouldPush ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Doğrulanmış Resmi İçerik (Bildirim Gönderildi)
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    Engellendi: Kullanıcılara Bildirim Gönderilmez ❌
                  </span>
                )}
              </div>

              {/* Manipulation Tricks Detected */}
              {analysisResult.manipulationTricks && analysisResult.manipulationTricks.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2">
                    Tespit Edilen Tıklama Tuzağı Taktikleri:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {analysisResult.manipulationTricks.map((trick, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                        <span>{trick}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Fact */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="text-slate-500 dark:text-slate-400 font-medium">Resmi Mevzuat Gerçeği:</div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {analysisResult.officialFact}
                </p>
                <div className="text-[11px] text-sky-600 dark:text-sky-400">
                  Hukuki Referans: {analysisResult.legalReference}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Curated Fact-Checking Warning Cards (Şu Anki Sahte İddialar) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            İnternette Yaygın Olan Sahte İddialar &amp; Gerçekler
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Sürekli Güncellenir</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FACT_CHECK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-5 space-y-3 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  {item.status} (Clickbait Skoru: %{item.clickbaitScore})
                </span>
                <span className="text-[10px] text-slate-500 font-mono-numbers">{item.publishedDate}</span>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Yayılan İddia / Başlık:</div>
                <div className="text-xs font-semibold text-rose-700 dark:text-rose-200 mt-0.5 line-through decoration-rose-500/70">
                  &quot;{item.fakeClaim}&quot;
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Kanal: {item.spreadChannel}</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800/90 space-y-1 text-xs">
                <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Resmi Doğru Durum:
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                  {item.officialTruth}
                </p>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
                  Teyit Kaynağı: {item.officialProof}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
