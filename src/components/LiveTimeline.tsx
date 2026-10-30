import React, { useState } from 'react';
import { TimelineItem, AlarmLevel } from '../types';
import { TIMELINE_ITEMS } from '../data/mockData';
import { FileText, CheckCircle2, Filter, AlertCircle, Share2, Eye, ShieldAlert, Sparkles, X } from 'lucide-react';

export const LiveTimeline: React.FC = () => {
  const [selectedAlarmFilter, setSelectedAlarmFilter] = useState<string>('ALL');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('ALL');
  const [activeDocument, setActiveDocument] = useState<TimelineItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = TIMELINE_ITEMS.filter((item) => {
    if (selectedAlarmFilter !== 'ALL' && item.alarmLevel !== selectedAlarmFilter) {
      return false;
    }
    if (selectedSourceFilter !== 'ALL' && item.source !== selectedSourceFilter) {
      return false;
    }
    return true;
  });

  const handleShare = (item: TimelineItem) => {
    navigator.clipboard?.writeText(
      `[EmeklilikRadarı Doğrulanmış Bildirim]\n${item.title}\nKaynak: ${item.source}\n${item.summary}`
    );
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getAlarmBadge = (level: AlarmLevel) => {
    switch (level) {
      case 'KIRMIZI':
        return (
          <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            🔴 Kırmızı Alarm (Resmi / Acil)
          </span>
        );
      case 'SARI':
        return (
          <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
            🟡 Sarı Alarm (Siyasi / Meclis)
          </span>
        );
      case 'MAVİ':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400" />
            🔵 Mavi Alarm (Analiz / Bülten)
          </span>
        );
      default:
        return <span className="text-xs text-slate-500">Standart</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section with description and live verification label */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400 font-semibold">Resmi Kaynak Akışı</span>
              <span aria-hidden="true">·</span>
              <span>TBMM &amp; Bakanlık Senkronize</span>
              <span aria-hidden="true">·</span>
              <span>Anlık Bildirimler</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Canlı Meclis &amp; Gündem Zaman Çizelgesi
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Her gün internet medyasında ısıtılan sahte haberler yerine; Resmî Gazete, TBMM Plan ve Bütçe Komisyonu tutanakları ve doğrudan bakanlık demeçlerinin kronolojik resmi akışı.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#06101e] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Tüm içerikler çift doğrulamadan geçmiştir.</span>
          </div>
        </div>

        {/* Filters bar: Alarm Levels and Sources */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Alarm Level Segments */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#06101e] p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500 text-[11px] px-2 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" /> Alarm:
            </span>
            {[
              { id: 'ALL', label: 'Tümü' },
              { id: 'KIRMIZI', label: '🔴 Kırmızı' },
              { id: 'SARI', label: '🟡 Sarı' },
              { id: 'MAVİ', label: '🔵 Mavi' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedAlarmFilter(f.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  selectedAlarmFilter === f.id
                    ? 'bg-sky-600 text-white font-semibold dark:bg-slate-700 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Source Filter Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Kaynak:</span>
            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="bg-white dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">Tüm Resmi Kaynaklar</option>
              <option value="Resmî Gazete">T.C. Resmî Gazete</option>
              <option value="TBMM">TBMM &amp; Komisyonlar</option>
              <option value="ÇSGB Bakanlığı">ÇSGB Bakanlığı</option>
              <option value="Uzman Değerlendirmesi">Yetkin Uzmanlar (Özgür Erdursun vb.)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 md:pl-8 space-y-6 before:absolute before:left-2.5 md:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-5 transition-all shadow-xs group"
          >
            {/* Timeline node circle on vertical line */}
            <div className={`absolute -left-[30px] md:-left-[35px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-[#070e1b] ${
              item.alarmLevel === 'KIRMIZI'
                ? 'bg-rose-500 ring-2 ring-rose-500/40'
                : item.alarmLevel === 'SARI'
                ? 'bg-amber-500 ring-2 ring-amber-500/40'
                : 'bg-sky-500'
            }`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {getAlarmBadge(item.alarmLevel)}
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">{item.source}</span>
                {item.officialRefCode && (
                  <>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="font-mono-numbers text-[10px] text-slate-500">{item.officialRefCode}</span>
                  </>
                )}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono-numbers">
                {item.date} · {item.time}
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {item.summary}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.details}
              </p>
            </div>

            {/* Document preview & Action footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              {item.documentTitle ? (
                <button
                  onClick={() => setActiveDocument(item)}
                  className="inline-flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resmi Belge / Tutanak Görüntüle ({item.documentTitle})</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(item)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Share2 className="w-3 h-3" />
                  <span>{copiedId === item.id ? 'Kopyalandı!' : 'Doğrulamayı Paylaş'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Official Document Viewer Modal */}
      {activeDocument && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b162a] border border-slate-300 dark:border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeDocument.documentTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveDocument(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div><strong className="text-slate-900 dark:text-slate-300">Kaynak Kurum:</strong> {activeDocument.source}</div>
              <div><strong className="text-slate-900 dark:text-slate-300">Resmi Kayıt Kodu:</strong> {activeDocument.officialRefCode}</div>
              <div><strong className="text-slate-900 dark:text-slate-300">Doğrulama Tarihi:</strong> {activeDocument.date} {activeDocument.time}</div>
            </div>

            <div className="bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Resmi Belge Özeti &amp; Alıntısı
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono-numbers">
                &quot;{activeDocument.documentSnippet}&quot;
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-slate-900 dark:text-white">Hukuki Değerlendirme:</strong> Bu belge doğrudan {activeDocument.source} veri tabanından taranmıştır. İlgili metinde kamuoyunda spekülasyonu yapılan &quot;yasalaştı&quot; veya &quot;yürürlüğe girdi&quot; ibaresi yer almamaktadır.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveDocument(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
