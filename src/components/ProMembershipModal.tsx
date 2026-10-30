import React, { useState } from 'react';
import { CalculatedResult, CalculatorInput } from '../types';
import { FileText, ShieldCheck, Printer, Check, X, Download, Sparkles } from 'lucide-react';

interface ProMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData?: {
    results: CalculatedResult;
    input: CalculatorInput;
  } | null;
}

export const ProMembershipModal: React.FC<ProMembershipModalProps> = ({
  isOpen,
  onClose,
  reportData
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      window.print?.();
    }, 800);
  };

  const results = reportData?.results;
  const input = reportData?.input;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Kişiselleştirilmiş Emeklilik &amp; Prim Raporu
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reklamsız Pro Danışmanlık ve Resmi Mevzuat Dosyası
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guarantee Banner */}
        <div className="bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 p-3 rounded-lg flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Reklamsız Deneyim:</strong> EmeklilikRadarı&apos;nda hiçbir zaman yanıltıcı pop-up, aldatıcı tık reklamları veya clickbait bulunmaz.
          </span>
        </div>

        {/* Report Content */}
        {results && input ? (
          <div className="space-y-4 text-xs">
            {/* Dossier Header Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800 font-mono-numbers">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Sigorta Statüsü</span>
                <span className="font-bold text-slate-900 dark:text-white">{input.insuranceType} ({input.gender === 'kadin' ? 'Kadın' : 'Erkek'})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">İlk SGK Girişi</span>
                <span className="font-bold text-slate-900 dark:text-white">{input.sgkEntryDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Mevcut Prim</span>
                <span className="font-bold text-slate-900 dark:text-white">{input.currentDays.toLocaleString('tr-TR')} Gün</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Doğum Tarihi</span>
                <span className="font-bold text-slate-900 dark:text-white">{input.birthDate}</span>
              </div>
            </div>

            {/* Scenario Breakdown Matrix */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-100 dark:bg-[#06101e] px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                Mevzuat Senaryoları Kıyaslama Tablosu
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-[#071120]">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">1. Yürürlükteki 5510 Sayılı Kanun (Mevcut Durum)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Yasa değişmediği sürece geçerli olan yasal emeklilik yaşı</div>
                  </div>
                  <div className="text-right font-mono-numbers font-bold text-slate-800 dark:text-slate-200">
                    {results.currentLaw.retirementAge} Yaş · {results.currentLaw.requiredDays.toLocaleString('tr-TR')} Gün
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between bg-sky-50 dark:bg-sky-950/20">
                  <div>
                    <div className="font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      2. EMADDER Kademeli Emeklilik Taslağı
                    </div>
                    <div className="text-[11px] text-sky-600 dark:text-sky-400/80">TBMM&apos;ye sunulan adil kademelendirme teklifi</div>
                  </div>
                  <div className="text-right font-mono-numbers font-bold text-sky-700 dark:text-sky-300">
                    {results.emadderProposal.retirementAge} Yaş · {results.emadderProposal.requiredDays.toLocaleString('tr-TR')} Gün
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">3. Kısmi Emeklilik (Yaştan)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">25 yıl sigortalılık süresi ile</div>
                  </div>
                  <div className="text-right font-mono-numbers font-bold text-slate-800 dark:text-slate-300">
                    {results.partialRetirement.retirementAge} Yaş · {results.partialRetirement.requiredDays} Gün
                  </div>
                </div>
              </div>
            </div>

            {/* Borçlanma Analizi */}
            <div className="p-3 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="font-semibold text-slate-800 dark:text-slate-300">Borçlanma ve İntibak Tavsiyesi:</div>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {results.borrowingAdvantage.impactSummary}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 dark:bg-[#06101e] rounded-lg text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <p>
              Senaryo hesaplayıcı sekmesinden kendi bilgilerinizi girdiğinizde bu alanda kişiselleştirilmiş resmi danışmanlık özetiniz ve PDF raporunuz oluşturulur.
            </p>
          </div>
        )}

        {/* Pro features list */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="font-semibold text-slate-800 dark:text-slate-300">Pro Üyelik &amp; Özel Danışmanlık Ayrıcalıkları:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Reklamsız ve sade arayüz garantisi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Resmi Gazete gece 00:00 anlık SMS bildirimi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Askerlik &amp; doğum borçlanması maliyet cetveli</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>İmzalı PDF mevzuat analiz raporu</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            Kapat
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Rapor Yazdırılıyor...</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>Raporu Yazdır / PDF İndir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
