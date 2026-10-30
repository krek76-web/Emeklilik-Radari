import React from 'react';
import { AlertTriangle, Cpu, Sparkles, RefreshCw, X, ShieldAlert, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { UserAiQuota, DeviceAiStatus } from '../utils/deviceAiDetector';

interface DeviceAiWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: DeviceAiStatus;
  quota: UserAiQuota;
  onRecheck: () => void;
  onProceedWithQuotaFallback?: () => void;
  isChecking: boolean;
}

export const DeviceAiWarningModal: React.FC<DeviceAiWarningModalProps> = ({
  isOpen,
  onClose,
  status,
  quota,
  onRecheck,
  onProceedWithQuotaFallback,
  isChecking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl transition-colors max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-300 dark:border-amber-800/80">
              <AlertTriangle className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                <span>Cihaz Denetimi &amp; Kota Uyarısı</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                Cihazınızda Yapay Zeka Uygulaması Bulunamadı!
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Warning Message */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 rounded-xl space-y-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          <p className="font-semibold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            Yapay zeka analizi, siteyi inceleyen kullanıcının kotasından ve cihazından kullanılır.
          </p>
          <p className="text-amber-800/90 dark:text-amber-200/90">
            Sistemimiz sunucu kotası tüketmek yerine, doğrudan ziyaretçinin cihazında yer alan yerel yapay zeka motorunu (Chrome Gemini Nano / On-Device AI) ve kişisel oturum kotasını kullanacak şekilde tasarlanmıştır. Cihazınızda/tarayıcınızda bu yapay zeka uygulaması tespit edilemedi.
          </p>
        </div>

        {/* Quota Strip */}
        <div className="p-3.5 bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono-numbers">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Kişisel Ziyaretçi Kotanız</span>
              <span className="font-bold text-slate-900 dark:text-white font-sans">
                {quota.remainingQuota} / {quota.totalQuota} Analiz Hakkı Kaldı
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-sans block">Yenilenme</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold font-sans">
              Her Gün 00:00
            </span>
          </div>
        </div>

        {/* How to activate On-Device AI */}
        <div className="space-y-2.5 text-xs">
          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Cihazınızda Yapay Zeka Uygulamasını Nasıl Aktif Edersiniz?</span>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-[#06101e] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">1</span>
              <span><strong>Desteklenen Tarayıcı:</strong> Google Chrome (Sürüm 128 veya üstü) veya Edge kullanın.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">2</span>
              <span>Adres çubuğuna <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono-numbers text-[10px]">chrome://flags/#prompt-api-for-gemini-nano</code> yazarak ayarı <strong>Enabled</strong> yapın.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">3</span>
              <span><code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono-numbers text-[10px]">chrome://components</code> altından <strong>Optimization Guide On Device Model</strong> bileşeninin cihazınıza indiğini teyit edin.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            onClick={onRecheck}
            disabled={isChecking}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Cihaz Taranıyor...' : 'Cihazımı Tekrar Tara'}</span>
          </button>

          <div className="flex items-center gap-2">
            {onProceedWithQuotaFallback && quota.remainingQuota > 0 && (
              <button
                onClick={onProceedWithQuotaFallback}
                className="flex-1 sm:flex-initial px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kullanıcı Kotamdan Harca ({quota.remainingQuota}/5)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
