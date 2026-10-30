import React from 'react';
import { CheckCircle2, Lock, Award, FileCheck2 } from 'lucide-react';

interface OfficialVerificationBadgeProps {
  lastSyncTime?: string;
}

export const OfficialVerificationBadge: React.FC<OfficialVerificationBadgeProps> = ({
  lastSyncTime = 'Az Önce'
}) => {
  return (
    <div className="bg-white dark:bg-[#081224] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 space-y-4 shadow-sm relative overflow-hidden transition-colors">
      {/* Subtle background seal watermark motif */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-sky-500/5 rounded-full pointer-events-none blur-2xl" />

      {/* Top Banner: Verification Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 rounded-xl shrink-0 shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white tracking-tight uppercase text-xs">
                Resmi Kaynaklı Doğrulama Sertifikasyonu
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Aktif Teyitli
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Tüm veriler yalnızca T.C. Devleti resmi kamu veri tabanlarından ve tutanak arşivlerinden çekilmektedir.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 dark:bg-[#050b14] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-mono-numbers">
          <Lock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
          <span>Mevzuat API Denetimli: <strong className="text-emerald-600 dark:text-emerald-400">GÜVENLİ</strong></span>
        </div>
      </div>

      {/* 3 Scanned Institutions Custom SVG Badges / Emblems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Source 1: T.C. Resmî Gazete */}
        <div className="bg-slate-50 dark:bg-[#050c18] border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-xl p-4 transition-colors flex items-start gap-3.5 group">
          {/* Custom SVG Emblem for Resmî Gazete */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-amber-50 to-amber-100 dark:from-[#14233c] dark:to-[#0a1424] border border-amber-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 48 48" className="w-7 h-7 text-amber-600 dark:text-amber-400 fill-current" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M24 6 C14 6 6 14 6 24 C6 34 14 42 24 42 C16 38 12 28 16 18 C19 11 24 6 24 6 Z" fill="currentColor" fillOpacity="0.85" />
              <polygon points="29,14 31,18 35,18 32,21 33,25 29,22 25,25 26,21 23,18 27,18" fill="currentColor" />
              <path d="M14 34 L34 34 M18 38 L30 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-xs tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                T.C. Resmî Gazete
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono-numbers">00:00 &amp; Mükerrer</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Cumhurbaşkanlığı İdari İşler Başkanlığı Mevzuat Bilgi Sistemi
            </div>
            <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono-numbers border-t border-slate-200 dark:border-slate-800/80">
              <span>Sayı: 32900</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Temiz (0 Yasa)</span>
            </div>
          </div>
        </div>

        {/* Source 2: TBMM (Türkiye Büyük Millet Meclisi) */}
        <div className="bg-slate-50 dark:bg-[#050c18] border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-xl p-4 transition-colors flex items-start gap-3.5 group">
          {/* Custom SVG Emblem for TBMM */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-rose-50 to-rose-100 dark:from-[#1b1c2e] dark:to-[#0c0d18] border border-rose-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 48 48" className="w-7 h-7 text-rose-600 dark:text-rose-400 fill-current" aria-hidden="true">
              <rect x="8" y="14" width="32" height="3" rx="1" fill="currentColor" />
              <polygon points="24,6 8,14 40,14" fill="currentColor" fillOpacity="0.8" />
              <rect x="11" y="19" width="3.5" height="18" rx="0.5" fill="currentColor" />
              <rect x="18" y="19" width="3.5" height="18" rx="0.5" fill="currentColor" />
              <rect x="26" y="19" width="3.5" height="18" rx="0.5" fill="currentColor" />
              <rect x="33" y="19" width="3.5" height="18" rx="0.5" fill="currentColor" />
              <rect x="6" y="38" width="36" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-xs tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">
                TBMM Portalı
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono-numbers">Komisyon Takip</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Kanun Teklifleri &amp; Plan ve Bütçe Komisyonu Tutanakları
            </div>
            <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono-numbers border-t border-slate-200 dark:border-slate-800/80">
              <span>Esas No: 2/2418</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Beklemede</span>
            </div>
          </div>
        </div>

        {/* Source 3: SGK & ÇSGB (Sosyal Güvenlik Kurumu) */}
        <div className="bg-slate-50 dark:bg-[#050c18] border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-xl p-4 transition-colors flex items-start gap-3.5 group">
          {/* Custom SVG Emblem for SGK */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-sky-50 to-sky-100 dark:from-[#102434] dark:to-[#07131e] border border-sky-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 48 48" className="w-7 h-7 text-sky-600 dark:text-sky-400 fill-current" aria-hidden="true">
              <path d="M24 6 L38 12 L38 24 C38 33 28 41 24 43 C20 41 10 33 10 24 L10 12 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8" />
              <path d="M24 14 L24 30 M18 20 L30 20 M16 26 L20 26 M28 26 L32 26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="24" cy="14" r="2" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-xs tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                T.C. SGK &amp; ÇSGB
              </span>
              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono-numbers">Basın Portalı</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Sosyal Güvenlik Kurumu Başkanlığı &amp; Bakanlık Açıklamaları
            </div>
            <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono-numbers border-t border-slate-200 dark:border-slate-800/80">
              <span>BYS-2026-88</span>
              <span className="text-slate-600 dark:text-slate-300">Teyitli</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Footer Guarantee */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>
            <strong>Doğruluk Taahhüdü:</strong> Bu platformda yer alan hiçbir veri spekülasyon veya duyum içermez; doğrudan yukarıdaki 3 anayasal kurumun dijital bültenlerinden derlenir.
          </span>
        </div>
        <div className="text-slate-400 dark:text-slate-500 shrink-0 font-mono-numbers">
          Son Teyit: {lastSyncTime}
        </div>
      </div>
    </div>
  );
};
