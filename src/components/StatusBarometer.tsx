import React, { useState } from 'react';
import { BUREAUCRATIC_STAGES } from '../data/mockData';
import { OfficialVerificationBadge } from './OfficialVerificationBadge';
import { ShieldCheck, ArrowRight, CheckCircle2, Clock, Info } from 'lucide-react';

interface StatusBarometerProps {
  onNavigateToCalculator: () => void;
  onNavigateToFactCheck: () => void;
  onNavigateToBots: () => void;
  onNavigateToFaq?: () => void;
  lastSyncTime?: string;
}

export const StatusBarometer: React.FC<StatusBarometerProps> = ({
  onNavigateToCalculator,
  onNavigateToFactCheck,
  onNavigateToBots,
  onNavigateToFaq,
  lastSyncTime
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const activeStage = BUREAUCRATIC_STAGES.find(s => s.id === selectedStageId) || BUREAUCRATIC_STAGES[0];

  return (
    <div className="space-y-6">
      {/* Top Hero Trust Guarantee */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400 font-semibold">T.C. Mevzuat İzleme Ağı</span>
              <span aria-hidden="true">·</span>
              <span>Resmi Gazete &amp; TBMM Otomasyonu</span>
              <span aria-hidden="true">·</span>
              <span>Son Kontrol: Bugün 08:30</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Kademeli Emeklilik Durum Barometresi
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#06101e] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-slate-700 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Resmi Durum:</span> Yasa Teklifi Bekleniyor (Yürürlükte Değil)
            </div>
          </div>
        </div>

        {/* 5-Stage Bureaucratic Progress Stepper */}
        <div className="pt-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4 tracking-wide uppercase">
            Bürokratik Yasama Süreci Aşamaları
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {BUREAUCRATIC_STAGES.map((stage) => {
              const isSelected = stage.id === selectedStageId;
              const isCurrent = stage.status === 'current';
              const isCompleted = stage.status === 'completed';

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 dark:border-sky-500/80 ring-1 ring-sky-400/40'
                      : isCurrent
                      ? 'bg-amber-50/70 dark:bg-[#0f1f38] border-amber-300 dark:border-amber-500/50 hover:border-slate-300 dark:hover:border-slate-700'
                      : 'bg-slate-50 dark:bg-[#071120] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-numbers text-xs font-semibold text-slate-500 dark:text-slate-400">
                      0{stage.id}
                    </span>
                    {isCurrent ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        <Clock className="w-3 h-3" />
                        Aktif Aşama
                      </span>
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Beklemede</span>
                    )}
                  </div>

                  <div className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight line-clamp-1">
                    {stage.shortTitle}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {stage.title}
                  </div>

                  {isCurrent && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                      <span>Mevcut Durum</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="mt-6 p-4 md:p-5 bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800/90 rounded-lg transition-colors">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-sky-600 dark:text-sky-400">Aşama Detayı: 0{activeStage.id} / 05</span>
                <span aria-hidden="true">·</span>
                <span>{activeStage.title}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStage.lastUpdated}</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                {activeStage.description}
              </p>
            </div>

            <div className="shrink-0 bg-white dark:bg-[#0a182d] p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 min-w-[240px] shadow-sm">
              <div className="text-slate-500 dark:text-slate-400 font-medium mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Resmi İlerleme Şartı
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {activeStage.officialRequirement}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-400 dark:text-slate-400">
                Kaynak: {activeStage.officialSource}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Verified Sources Certification Badge & Logos */}
      <OfficialVerificationBadge lastSyncTime={lastSyncTime} />

      {/* Official Status vs Internet Rumors Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Resmi Gerçek (Ne Var, Ne Yok?) */}
        <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Mevzuat ve Yasa Özeti
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">5510 Sayılı Kanun</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            09.09.1999 ile 30.04.2008 arasında ilk kez sigortalı olan çalışanlar için yürürlükteki kanun kadınlarda 58, erkeklerde 60 yaş ve 7000 gün prim şartı aramaktadır.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-[#071120] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Resmî Gazete Yayını:</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold font-mono-numbers">YOK (0 Hüküm)</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Hükümet Torba Tasarısı:</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold font-mono-numbers">GÜNDEMDE DEĞİL</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Muhalefet Kanun Teklifleri:</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold font-mono-numbers">Komisyonda Bekliyor (14 Teklif)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Dezenformasyon ve Tıklama Tuzağı Kalkanı */}
        <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Clickbait Kalkanı
            </h2>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Otomatik Filtre</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            İnternet medyasındaki her gün çıkan &quot;Kademeli emeklilikte müjde çıktı! İşte o tarihler&quot; haberleri sahte tıklama tuzaklarıdır.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-[#071120] rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Son 24 Saatte Elenen Haber:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono-numbers font-bold">1.428 İçerik</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Metninde resmi kanun numarası veya meclis tutanağı olmayan haberler botlarımız tarafından elenir, push bildirimi atılmaz.
            </div>
            <button
              onClick={onNavigateToFactCheck}
              className="w-full mt-1 py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-400 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent"
            >
              <span>Sahte İddiaları ve AI Kontrolünü Aç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Kişiselleştirilmiş Senaryolar Hızlı Kartı */}
        <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between shadow-sm transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Kendi Durumunuzu Hesaplayın
              </h2>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-mono-numbers">1999 - 2008</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              EMADDER tablosu, masadaki muhalefet formülleri ve mevcut kanun şartlarına göre ne zaman emekli olabileceğinizi simüle edin.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-2">
              <span>Örnek 2000 Girişli Erkek:</span>
              <span className="text-slate-800 dark:text-slate-200 font-mono-numbers">Mevcut: 60 Yaş / Teklif: 45 Yaş</span>
            </div>
            <button
              onClick={onNavigateToCalculator}
              className="w-full py-2 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Senaryo Hesaplayıcıyı Başlat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SSS & Bilgi Bankası Callout Banner */}
      {onNavigateToFaq && (
        <div className="bg-slate-100 dark:bg-[#091527] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-lg shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Aklınıza takılan sorular mı var?</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Askerlik borçlanması ile EYT&apos;ye giriş, staj süresi, Bağ-Kur 7200 ve EMADDER şartlarını interaktif Bilgi Bankası&apos;nda inceleyin.
              </span>
            </div>
          </div>
          <button
            onClick={onNavigateToFaq}
            className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 hover:text-slate-900 dark:hover:text-white rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 border border-slate-300 dark:border-slate-700"
          >
            <span>Bilgi Bankası&apos;na Git</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
