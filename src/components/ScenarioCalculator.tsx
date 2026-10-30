import React, { useState, useMemo } from 'react';
import { CalculatorInput } from '../types';
import { calculateRetirementScenarios } from '../utils/calculatorEngine';
import { EMADDER_TABLE } from '../data/mockData';
import { Calculator, Sparkles, AlertCircle, FileText, Check, HelpCircle } from 'lucide-react';

interface ScenarioCalculatorProps {
  onOpenProReport?: (data: ReturnType<typeof calculateRetirementScenarios>, input: CalculatorInput) => void;
}

export const ScenarioCalculator: React.FC<ScenarioCalculatorProps> = ({ onOpenProReport }) => {
  const [gender, setGender] = useState<'kadin' | 'erkek'>('erkek');
  const [entryYear, setEntryYear] = useState<number>(2000);
  const [entryMonth, setEntryMonth] = useState<number>(6);
  const [insuranceType, setInsuranceType] = useState<'4A' | '4B' | '4C'>('4A');
  const [birthYear, setBirthYear] = useState<number>(1980);
  const [birthMonth, setBirthMonth] = useState<number>(3);
  const [currentDays, setCurrentDays] = useState<number>(6200);
  const [militaryDays, setMilitaryDays] = useState<number>(0);
  const [maternityChildren, setMaternityChildren] = useState<number>(0);
  const [showTableModal, setShowTableModal] = useState<boolean>(false);

  const input: CalculatorInput = useMemo(() => ({
    gender,
    sgkEntryDate: `${entryYear}-${String(entryMonth).padStart(2, '0')}`,
    insuranceType,
    birthDate: `${birthYear}-${String(birthMonth).padStart(2, '0')}-15`,
    currentDays: Number(currentDays) || 0,
    militaryServiceDays: gender === 'erkek' ? (Number(militaryDays) || 0) : 0,
    maternityChildrenCount: gender === 'kadin' ? (Number(maternityChildren) || 0) : 0
  }), [gender, entryYear, entryMonth, insuranceType, birthYear, birthMonth, currentDays, militaryDays, maternityChildren]);

  const results = useMemo(() => calculateRetirementScenarios(input), [input]);

  // Calculations for display
  const effectiveDays = input.currentDays + results.borrowingAdvantage.daysAdded;
  const currentLawPercent = Math.min(100, Math.round((effectiveDays / results.currentLaw.requiredDays) * 100));
  const emadderPercent = Math.min(100, Math.round((effectiveDays / results.emadderProposal.requiredDays) * 100));

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400 font-semibold">Kişisel Simülasyon Motoru</span>
              <span aria-hidden="true">·</span>
              <span>1999–2008 Kademeli Formüller</span>
              <span aria-hidden="true">·</span>
              <span>SGK &amp; EMADDER Kıyaslaması</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Kişiselleştirilmiş Emeklilik Senaryo Hesaplayıcı
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
              SGK başlangıcınız, prim gününüz ve yaşınıza göre hem yürürlükteki 5510 sayılı kanunun şartlarını hem de meclise sunulan EMADDER kademeli yaş formüllerini karşılaştırın.
            </p>
          </div>

          <button
            onClick={() => setShowTableModal(!showTableModal)}
            className="self-start md:self-auto px-3 py-2 text-xs font-medium text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>EMADDER Yaş Tablosunu İncele</span>
          </button>
        </div>

        {/* EMADDER Reference Grid Collapse/Modal */}
        {showTableModal && (
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-300">
                EMADDER Kademeli Emeklilik Talep Tablosu (1999 - 2008)
              </div>
              <button
                onClick={() => setShowTableModal(false)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
              >
                Kapat ×
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-50 dark:bg-[#06101e] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2 px-3">SGK Giriş Yılı</th>
                    <th className="py-2 px-3">Kapsam</th>
                    <th className="py-2 px-3">Kadın Yaşı</th>
                    <th className="py-2 px-3">Erkek Yaşı</th>
                    <th className="py-2 px-3">İstenen Prim Günü</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono-numbers">
                  {EMADDER_TABLE.map((row) => (
                    <tr
                      key={row.year}
                      className={row.year === entryYear ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800/30'}
                    >
                      <td className="py-2 px-3">{row.year}</td>
                      <td className="py-2 px-3 font-sans text-[11px] text-slate-500 dark:text-slate-400">{row.sub}</td>
                      <td className="py-2 px-3">{row.femaleAge} Yaş</td>
                      <td className="py-2 px-3">{row.maleAge} Yaş</td>
                      <td className="py-2 px-3">{row.days.toLocaleString('tr-TR')} Gün</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Two-Column Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Calculator className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Sigorta Bilgileriniz</span>
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Tüm Bilgiler Gizlidir</span>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Cinsiyet
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 dark:bg-[#06101e] rounded-lg border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setGender('kadin')}
                className={`py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  gender === 'kadin'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Kadın
              </button>
              <button
                type="button"
                onClick={() => setGender('erkek')}
                className={`py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  gender === 'erkek'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Erkek
              </button>
            </div>
          </div>

          {/* SGK Entry Date (Year & Month) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                İlk SGK Giriş Yılı
              </label>
              <select
                value={entryYear}
                onChange={(e) => setEntryYear(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-mono-numbers"
              >
                <option value={1998}>1998 (EYT Kapsamı)</option>
                <option value={1999}>1999 (09.09 Sonrası)</option>
                <option value={2000}>2000</option>
                <option value={2001}>2001</option>
                <option value={2002}>2002</option>
                <option value={2003}>2003</option>
                <option value={2004}>2004</option>
                <option value={2005}>2005</option>
                <option value={2006}>2006</option>
                <option value={2007}>2007</option>
                <option value={2008}>2008 (Nisan Öncesi)</option>
                <option value={2009}>2009 ve Sonrası</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Giriş Ayı
              </label>
              <select
                value={entryMonth}
                onChange={(e) => setEntryMonth(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}. Ay ({['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][m - 1]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Insurance Category (4A, 4B, 4C) */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Sigorta Kolu (Statü)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '4A', label: '4A (SSK)', desc: 'İşçi / Hizmet Akdi' },
                { id: '4B', label: '4B (Bağkur)', desc: 'Esnaf / Şirket Ortağı' },
                { id: '4C', label: '4C (Emekli Sandığı)', desc: 'Memur / Kamu' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInsuranceType(item.id as '4A' | '4B' | '4C')}
                  className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                    insuranceType === item.id
                      ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 dark:border-sky-500 text-sky-700 dark:text-sky-300'
                      : 'bg-slate-50 dark:bg-[#06101e] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Birth Year & Month */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Doğum Yılı
              </label>
              <input
                type="number"
                min={1950}
                max={2005}
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Mevcut Prim Gün Sayınız
              </label>
              <input
                type="number"
                min={0}
                max={15000}
                step={50}
                value={currentDays}
                onChange={(e) => setCurrentDays(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-mono-numbers"
              />
            </div>
          </div>

          {/* Borçlanma Alanı */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {gender === 'erkek' ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Askerlik Borçlanması (Gün)
                  </label>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">Sigortadan önce yapıldıysa</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={540}
                    step={30}
                    value={militaryDays}
                    onChange={(e) => setMilitaryDays(Number(e.target.value))}
                    className="flex-1 bg-slate-50 dark:bg-[#06101e] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-mono-numbers"
                    placeholder="Örn: 540 gün (18 ay)"
                  />
                  <button
                    type="button"
                    onClick={() => setMilitaryDays(540)}
                    className="px-2.5 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap border border-slate-200 dark:border-transparent"
                  >
                    18 Ay (540)
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  İlk sigorta tarihinden önce yapılan askerlik borçlanması başlangıcı geriye çeker.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Doğum Borçlanması (Çocuk Sayısı)
                  </label>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">Maksimum 3 Çocuk (2160 Gün)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMaternityChildren(num)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        maternityChildren === num
                          ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 dark:border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                          : 'bg-slate-50 dark:bg-[#06101e] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {num === 0 ? 'Yok' : `${num} Çocuk (${num * 720} G)`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Comparative Results & Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Critical Opportunity / Alert Banner if Applicable */}
          {results.borrowingAdvantage.canPullEntryBack && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/70 rounded-xl p-4 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-rose-700 dark:text-rose-300 text-sm">
                  Kritik EYT Fırsatı Tespit Edildi!
                </div>
                <p className="leading-relaxed">
                  {results.borrowingAdvantage.impactSummary}
                </p>
              </div>
            </div>
          )}

          {/* Primary Comparison Card: Mevcut Kanun vs EMADDER Teklifi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Mevcut Kanun (5510) */}
            <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-sm transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Mevcut Yürürlükteki Kanun
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-numbers">5510 Sayılı</span>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono-numbers tracking-tight">
                  {results.currentLaw.retirementAge} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">Yaş</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tahmini Yıl: <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono-numbers">{results.currentLaw.estimatedRetirementYear}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Gereken Prim:</span>
                  <span className="font-mono-numbers text-slate-800 dark:text-slate-200 font-medium">
                    {results.currentLaw.requiredDays.toLocaleString('tr-TR')} Gün
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Eksik Priminiz:</span>
                  <span className="font-mono-numbers text-amber-600 dark:text-amber-400 font-medium">
                    {results.currentLaw.remainingDays > 0 ? `${results.currentLaw.remainingDays.toLocaleString('tr-TR')} Gün` : 'Tamamlandı'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>Prim İlerlemesi</span>
                  <span className="font-mono-numbers">{currentLawPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#06101e] h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div
                    className="bg-slate-500 dark:bg-slate-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLawPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Box 2: EMADDER Teklifi (Kademeli Emeklilik) */}
            <div className="bg-sky-50/70 dark:bg-[#0c1f3d] border border-sky-300 dark:border-sky-500/60 rounded-xl p-5 space-y-3 relative overflow-hidden shadow-sm transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  EMADDER Teklifi
                </span>
                <span className="text-[10px] text-sky-800 dark:text-sky-300/80 bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded font-mono-numbers">
                  Taslak Formül
                </span>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-sky-800 dark:text-sky-300 font-mono-numbers tracking-tight">
                  {results.emadderProposal.retirementAge} <span className="text-sm font-normal text-sky-700/80 dark:text-sky-400/80">Yaş</span>
                </div>
                <div className="text-xs text-sky-900/90 dark:text-sky-200/90 mt-0.5">
                  Tahmini Yıl: <span className="font-semibold text-slate-900 dark:text-white font-mono-numbers">{results.emadderProposal.estimatedRetirementYear}</span>
                  {results.emadderProposal.advantageYears > 0 && (
                    <span className="ml-2 text-emerald-700 dark:text-emerald-400 font-bold font-mono-numbers">
                      ({results.emadderProposal.advantageYears} YIL ERKEN)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-sky-200 dark:border-sky-800/60 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Gereken Prim:</span>
                  <span className="font-mono-numbers text-slate-900 dark:text-white font-medium">
                    {results.emadderProposal.requiredDays.toLocaleString('tr-TR')} Gün
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Eksik Priminiz:</span>
                  <span className="font-mono-numbers text-amber-700 dark:text-amber-300 font-medium">
                    {results.emadderProposal.remainingDays > 0 ? `${results.emadderProposal.remainingDays.toLocaleString('tr-TR')} Gün` : 'Tamamlandı'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[11px] text-sky-800/80 dark:text-sky-200/80 mb-1">
                  <span>Prim İlerlemesi</span>
                  <span className="font-mono-numbers">{emadderPercent}%</span>
                </div>
                <div className="w-full bg-sky-100 dark:bg-[#071324] h-2 rounded-full overflow-hidden border border-sky-200 dark:border-sky-900">
                  <div
                    className="bg-sky-500 dark:bg-sky-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${emadderPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Models */}
          <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs shadow-sm transition-colors">
            <div className="space-y-1 p-3 bg-slate-50 dark:bg-[#071120] rounded-lg border border-slate-200 dark:border-slate-800/80">
              <div className="text-slate-500 dark:text-slate-400 font-medium">Alternatif Yıllık Kademe Modeli</div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono-numbers">
                {results.alternativeModel.retirementAge} Yaş · {results.alternativeModel.requiredDays.toLocaleString('tr-TR')} Gün
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                1999 sonrasını her yıl 1&apos;er yaş artıran meclis teklifi modeli.
              </div>
            </div>

            <div className="space-y-1 p-3 bg-slate-50 dark:bg-[#071120] rounded-lg border border-slate-200 dark:border-slate-800/80">
              <div className="text-slate-500 dark:text-slate-400 font-medium">Yaştan Kısmi Emeklilik (4500 Gün)</div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono-numbers">
                {results.partialRetirement.retirementAge} Yaş · {results.partialRetirement.requiredDays} Gün
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                25 yıl sigortalılık süresi ve 4500 gün (Bağ-Kur 5400 gün) ile yaştan emeklilik.
              </div>
            </div>
          </div>

          {/* Borçlanma Etki Raporu */}
          <div className="bg-slate-50 dark:bg-[#071120] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs space-y-2 transition-colors">
            <div className="font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              Borçlanma ve Prim Analiz Özeti
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {results.borrowingAdvantage.impactSummary}
            </p>
          </div>

          {/* Action: Open Dossier / Pro Report */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              *Tüm hesaplamalar resmi mevzuat ve meclise sunulan teklif tabloları baz alınarak yapılmıştır.
            </div>
            {onOpenProReport && (
              <button
                onClick={() => onOpenProReport(results, input)}
                className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Detaylı PDF Raporu Oluştur</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
