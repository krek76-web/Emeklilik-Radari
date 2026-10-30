import React, { useState, useMemo } from 'react';
import { KNOWLEDGE_BASE_ITEMS } from '../data/mockData';
import { FaqItem } from '../types';
import { Search, ChevronDown, ChevronUp, Copy, Check, ThumbsUp, ThumbsDown, ArrowRight, ShieldCheck, HelpCircle, FileText, Sparkles } from 'lucide-react';

interface KnowledgeBaseProps {
  onNavigateToCalculator: () => void;
  onNavigateToFactCheck: () => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  onNavigateToCalculator,
  onNavigateToFactCheck
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true
  });
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tüm Konular', count: KNOWLEDGE_BASE_ITEMS.length },
    { id: 'genel', label: '1999–2008 & EYT', count: KNOWLEDGE_BASE_ITEMS.filter(i => i.category === 'genel').length },
    { id: 'borclanma', label: 'Borçlanma & EYT Fırsatı', count: KNOWLEDGE_BASE_ITEMS.filter(i => i.category === 'borclanma').length },
    { id: 'emadder', label: 'EMADDER Tablosu', count: KNOWLEDGE_BASE_ITEMS.filter(i => i.category === 'emadder').length },
    { id: 'mevzuat', label: 'Torba Yasa & Kısmi', count: KNOWLEDGE_BASE_ITEMS.filter(i => i.category === 'mevzuat').length },
    { id: 'staj', label: 'Staj & Çıraklık', count: KNOWLEDGE_BASE_ITEMS.filter(i => i.category === 'staj').length },
    { id: 'bagkur', label: 'Bağ-Kur 7200', count: KNOWLEDGE_BASE_ITEMS.filter(i => i.category === 'bagkur').length },
  ];

  const filteredItems = useMemo(() => {
    return KNOWLEDGE_BASE_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuestion = item.question.toLowerCase().includes(q);
        const matchesShort = item.shortAnswer.toLowerCase().includes(q);
        const matchesDetail = item.detailedAnswer.toLowerCase().includes(q);
        const matchesCitation = item.legalCitation.toLowerCase().includes(q);
        return matchesQuestion || matchesShort || matchesDetail || matchesCitation;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (item: FaqItem) => {
    const textToCopy = `[EmeklilikRadarı Bilgi Bankası]\nSoru: ${item.question}\nCevap: ${item.detailedAnswer}\nHukuki Dayanak: ${item.legalCitation}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackGiven(prev => ({
      ...prev,
      [id]: type
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header section with description and live search */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400 font-semibold">Resmi Bilgi Bankası</span>
              <span aria-hidden="true">·</span>
              <span>Sıkça Sorulan Sorular (SSS)</span>
              <span aria-hidden="true">·</span>
              <span>5510 &amp; 4447 Sayılı Kanun Hükümleri</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Kademeli Emeklilik Bilgi Bankası &amp; Mevzuat Rehberi
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
              İnternetteki spekülatif haberlere karşı; EYT farkı, EMADDER teklifi, askerlik ve doğum borçlanmasıyla sigorta başlangıcını öne çekme kuralları ve torba yasa gerçekleri.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-[#06101e] px-3.5 py-2 rounded-lg border border-sky-200 dark:border-slate-800 shrink-0">
            <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Tüm yanıtlar SGK mevzuat uzmanlarınca onaylanmıştır.</span>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mevzuatta veya sorularda ara (Örn: Askerlik borçlanması, EYT 1 gün farkı, Bağ-Kur 7200, Staj, EMADDER)..."
              className="w-full bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                Temizle ×
              </button>
            )}
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className="font-mono-numbers text-[10px] ml-1.5 opacity-80">
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <div>
          Toplam <span className="font-mono-numbers text-slate-900 dark:text-white font-semibold">{filteredItems.length}</span> resmi soru ve cevap listeleniyor
          {searchQuery && <span> · Arama: &quot;{searchQuery}&quot;</span>}
        </div>
        <div className="text-[11px] text-slate-400 hidden sm:block">
          Cevapları genişletmek için soru başlığına tıklayınız
        </div>
      </div>

      {/* Expandable Q&A Cards List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-bold text-slate-900 dark:text-white">Aradığınız soruya uygun kayıt bulunamadı</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Farklı anahtar kelimeler deneyebilir veya şüpheli haber metnini doğrudan Doğruluk Kontrolü bölümündeki yapay zeka motoruna sorabilirsiniz.
            </p>
            <button
              onClick={onNavigateToFactCheck}
              className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yapay Zeka ile Soruyu Analiz Et</span>
            </button>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isExpanded = !!expandedIds[item.id];
            const feedback = feedbackGiven[item.id];

            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-[#0b162a] border transition-all rounded-xl overflow-hidden shadow-sm ${
                  isExpanded ? 'border-sky-400 dark:border-sky-500/70 ring-1 ring-sky-400/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Clickable Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 md:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono-numbers text-slate-500 dark:text-slate-400 font-semibold">
                        0{index + 1}
                      </span>
                      <span className="text-slate-400 dark:text-slate-600">·</span>
                      <span className="text-sky-600 dark:text-sky-400 font-medium">{item.categoryLabel}</span>
                      {item.isPopular && (
                        <>
                          <span className="text-slate-400 dark:text-slate-600">·</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">Çok Sorulan</span>
                        </>
                      )}
                      {item.relatedArticleCode && (
                        <>
                          <span className="text-slate-400 dark:text-slate-600">·</span>
                          <span className="font-mono-numbers text-[10px] text-slate-500 dark:text-slate-400">
                            Madde: {item.relatedArticleCode}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {item.question}
                    </h3>

                    {/* Short summary always visible for rapid reading */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5 line-clamp-2">
                      {item.shortAnswer}
                    </p>
                  </div>

                  <div className="shrink-0 p-1.5 rounded-lg bg-slate-100 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Detailed Answer & Legal Citations */}
                {isExpanded && (
                  <div className="px-4 md:px-5 pb-5 pt-1 space-y-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#06101e] transition-colors">
                    <div className="space-y-2 pt-3">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Detaylı Mevzuat Açıklaması &amp; Hukuki Gerekçe:
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                        {item.detailedAnswer}
                      </p>
                    </div>

                    {/* Official Legal Citation Box */}
                    <div className="p-3 bg-white dark:bg-[#0b162a] rounded-lg border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs shadow-sm">
                      <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 text-[11px] block">İlgili Resmi Mevzuat &amp; Kanun Referansı:</span>
                        <span className="text-slate-900 dark:text-slate-200 font-medium text-xs">{item.legalCitation}</span>
                      </div>
                    </div>

                    {/* Card Actions: Copy & Feedback */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      {/* Helpful Feedback */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Bu yanıt faydalı oldu mu?</span>
                        <button
                          type="button"
                          onClick={() => handleFeedback(item.id, 'up')}
                          className={`p-1.5 rounded border transition-colors flex items-center gap-1 cursor-pointer text-xs ${
                            feedback === 'up'
                              ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-400 dark:border-emerald-500 text-emerald-700 dark:text-emerald-300'
                              : 'bg-white dark:bg-[#06101e] border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                          title="Faydalı Oldu"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span className="text-[11px]">Evet</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(item.id, 'down')}
                          className={`p-1.5 rounded border transition-colors flex items-center gap-1 cursor-pointer text-xs ${
                            feedback === 'down'
                              ? 'bg-rose-50 dark:bg-rose-950 border-rose-400 dark:border-rose-500 text-rose-700 dark:text-rose-300'
                              : 'bg-white dark:bg-[#06101e] border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                          title="Yetersiz"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span className="text-[11px]">Hayır</span>
                        </button>
                        {feedback && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium ml-1">
                            Geri bildiriminiz kaydedildi ✓
                          </span>
                        )}
                      </div>

                      {/* Copy Answer Button */}
                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400">Kopyalandı</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                            <span>Cevabı Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Cross-Navigation Card */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm transition-colors">
        <div className="space-y-2 p-4 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>Kendi Yaş ve Prim Şartlarınızı Hesaplayın</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Giriş yılınız ve prim gününüze göre hem 5510 sayılı mevcut kanunu hem de EMADDER tablosunu tek tıkla simüle edin.
            </p>
          </div>
          <button
            onClick={onNavigateToCalculator}
            className="mt-3 w-full py-2 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Senaryo Hesaplayıcıyı Aç</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2 p-4 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>Şüpheli Bir Haberi Yapay Zeka ile Sınayın</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              İnternette gördüğünüz &quot;Kademeli emeklilik torbaya girdi&quot; gibi başlıkları mevzuat ve meclis veritabanında teyit edin.
            </p>
          </div>
          <button
            onClick={onNavigateToFactCheck}
            className="mt-3 w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-400 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent"
          >
            <span>Doğruluk Kontrolü (Fact-Check) Aç</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
