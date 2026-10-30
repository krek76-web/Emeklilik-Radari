import React, { useState } from 'react';
import { NotificationSettings, AlarmLevel } from '../types';
import { playAlertSound } from '../utils/audioAlert';
import { Bell, Volume2, ShieldAlert, Sparkles, Smartphone, VolumeX, Moon, X, Flame } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    onlyRedAlarm: false,
    includeYellowAlarm: true,
    includeBlueAlarm: true,
    soundEnabled: true,
    nightQuietHours: true
  });

  const [activeSimulation, setActiveSimulation] = useState<{
    level: AlarmLevel;
    title: string;
    body: string;
    time: string;
    source: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulateAlert = (level: AlarmLevel) => {
    if (settings.soundEnabled) {
      playAlertSound(level as 'KIRMIZI' | 'SARI' | 'MAVİ');
    }

    if (level === 'KIRMIZI') {
      setActiveSimulation({
        level: 'KIRMIZI',
        title: '🔴 T.C. Resmî Gazete: Kademeli Emeklilik Yayımlandı!',
        body: '32910 Sayılı Resmî Gazete mükerrer sayısında 5510 sayılı kanuna eklenen geçici madde yürürlüğe girdi. 1999-2008 kademe şartları onaylandı.',
        time: 'Şimdi',
        source: 'T.C. Resmî Gazete Doğrulama Botu'
      });
    } else if (level === 'SARI') {
      setActiveSimulation({
        level: 'SARI',
        title: '🟡 TBMM: Kanun Teklifi Komisyon Gündemine Alındı',
        body: 'TBMM Plan ve Bütçe Komisyonu, 1999 sonrası kademeli yaş düzenlemesi içeren kanun maddesini yarınki gündemine ekledi.',
        time: 'Şimdi',
        source: 'TBMM Tutanak & Komisyon Portalı'
      });
    } else {
      setActiveSimulation({
        level: 'MAVİ',
        title: '🔵 Uzman Analiz Bülteni: Haftalık Kademeli Raporu',
        body: 'Sosyal Güvenlik Uzmanı Özgür Erdursun\'un yeni aktüeryal simülasyon tablosu ve meclis kulis özeti yayımlandı.',
        time: 'Şimdi',
        source: 'EmeklilikRadarı Analiz Servisi'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0b162a] border border-slate-200 dark:border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Akıllı Bildirim Sistemi (Kritiklik Seviyeleri)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kullanıcıyı bildirim yağmuruna tutmayan 3 aşamalı hiyerarşi
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

        {/* 3-Tier Alert Hierarchy Cards */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Bildirim Seviyeleri ve Tetiklenme Kuralları:
          </div>

          {/* Red Alert */}
          <div className="bg-slate-50 dark:bg-[#06101e] border border-rose-300 dark:border-rose-900/60 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600 dark:text-rose-500" />
                🔴 Kırmızı Alarm (Acil / Resmi)
              </span>
              <button
                onClick={() => handleSimulateAlert('KIRMIZI')}
                className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800/80 rounded text-[11px] font-medium transition-colors cursor-pointer"
              >
                Test Bildirimi Gönder
              </button>
            </div>
            <div className="text-[11px] text-slate-800 dark:text-slate-300 font-medium">
              Yüksek Öncelikli Push Bildirimi (Sesli &amp; Titreşimli)
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Tetiklenme:</strong> Yalnızca Resmî Gazete&apos;de yayımlandığında veya Torba Yasa metnine kademeli emeklilik maddesi resmen eklendiğinde çalar.
            </p>
          </div>

          {/* Yellow Alert */}
          <div className="bg-slate-50 dark:bg-[#06101e] border border-amber-300 dark:border-amber-900/60 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                🟡 Sarı Alarm (Siyasi / Meclis)
              </span>
              <button
                onClick={() => handleSimulateAlert('SARI')}
                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 rounded text-[11px] font-medium transition-colors cursor-pointer"
              >
                Test Bildirimi Gönder
              </button>
            </div>
            <div className="text-[11px] text-slate-800 dark:text-slate-300 font-medium">
              Standart Push Bildirimi
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Tetiklenme:</strong> TBMM Plan ve Bütçe Komisyonu&apos;nda görüşülmeye başlandığında veya Çalışma Bakanı açık bir yasal takvim verdiğinde gönderilir.
            </p>
          </div>

          {/* Blue Alert */}
          <div className="bg-slate-50 dark:bg-[#06101e] border border-sky-300 dark:border-sky-900/60 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                🔵 Mavi Alarm (Analiz / Bülten)
              </span>
              <button
                onClick={() => handleSimulateAlert('MAVİ')}
                className="px-2.5 py-1 bg-sky-100 hover:bg-sky-200 dark:bg-sky-950/80 dark:hover:bg-sky-900 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800/80 rounded text-[11px] font-medium transition-colors cursor-pointer"
              >
                Test Bildirimi Gönder
              </button>
            </div>
            <div className="text-[11px] text-slate-800 dark:text-slate-300 font-medium">
              Sessiz Bildirim (Silent Push)
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Tetiklenme:</strong> Sosyal güvenlik uzmanlarının simülasyon tabloları ve haftalık durum özetleri için kullanıcıyı rahatsız etmeden gönderilir.
            </p>
          </div>
        </div>

        {/* User Configuration Toggles */}
        <div className="bg-slate-50 dark:bg-[#06101e] border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Kişisel Bildirim Tercihleriniz:
          </div>

          {/* Only Red Alarm Toggle */}
          <div className="flex items-center justify-between text-xs py-1">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Yalnızca Kırmızı Alarm Bildirimlerini Al</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Sadece kesinleşen resmi yasa ve Resmî Gazete gelişmelerinde uyandırır.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSettings(s => ({ ...s, onlyRedAlarm: !s.onlyRedAlarm }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.onlyRedAlarm ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                settings.onlyRedAlarm ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Sound Enabled */}
          <div className="flex items-center justify-between text-xs py-1 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Sesli ve Titreşimli Uyarılar
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Kırmızı ve Sarı alarmlarda telefon sesiyle dikkat çeker.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.soundEnabled ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Night Quiet Hours */}
          <div className="flex items-center justify-between text-xs py-1 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                Gece Sessizlik Filtresi (00:00 - 08:00)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Gece yarısı yalnızca olağanüstü Kırmızı Alarm bildirimleri çalar.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSettings(s => ({ ...s, nightQuietHours: !s.nightQuietHours }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.nightQuietHours ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                settings.nightQuietHours ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Simulated Mobile Lockscreen Push Banner */}
        {activeSimulation && (
          <div className="bg-slate-100 dark:bg-[#040810] border border-sky-400 dark:border-sky-500/80 rounded-xl p-4 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400">
                <Smartphone className="w-3.5 h-3.5" />
                Mobil Kilit Ekranı Bildirimi (Simülasyon)
              </span>
              <button
                onClick={() => setActiveSimulation(null)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                Kapat ×
              </button>
            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700/80 rounded-lg p-3 text-xs space-y-1 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900 dark:text-white">{activeSimulation.title}</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-numbers">{activeSimulation.time}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {activeSimulation.body}
              </p>
              <div className="pt-1 text-[10px] text-slate-500">
                Doğrulayan: {activeSimulation.source}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500">
            Firebase Cloud Messaging (FCM) &amp; APNs protokolü
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Kaydet ve Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
