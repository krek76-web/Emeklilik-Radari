/**
 * Cihaz Yapay Zekası & Kullanıcı Kotası Yönetim Motoru
 * Siteyi inceleyen kullanıcının cihazındaki yerel yapay zeka (Chrome Gemini Nano / window.ai)
 * ve kişisel analiz kotasını yönetir.
 */

export interface DeviceAiStatus {
  isAvailable: boolean;
  type: 'chrome_gemini_nano' | 'webnn_npu' | 'none';
  label: string;
  description: string;
  hardwareAcceleration: boolean;
}

export interface UserAiQuota {
  totalQuota: number;
  usedQuota: number;
  remainingQuota: number;
  lastResetDate: string;
}

const QUOTA_STORAGE_KEY = 'er_user_ai_quota_v1';
const DAILY_MAX_QUOTA = 5;

/**
 * Kullanıcının cihazında yerel bir yapay zeka uygulaması veya modeli
 * (Chrome Built-in AI / Gemini Nano, WebNN NPU vb.) olup olmadığını denetler.
 */
export async function checkDeviceAiAvailability(): Promise<DeviceAiStatus> {
  if (typeof window === 'undefined') {
    return {
      isAvailable: false,
      type: 'none',
      label: 'Cihaz Dışı Ortam',
      description: 'Tarayıcı veya cihaz ortamı algılanamadı.',
      hardwareAcceleration: false
    };
  }

  // 1. Chrome Built-in AI (Prompt API / Gemini Nano) denetimi
  const win = window as unknown as {
    ai?: {
      languageModel?: {
        capabilities?: () => Promise<{ available?: string }>;
      };
      assistant?: unknown;
    };
    chrome?: {
      aiOriginTrial?: unknown;
    };
  };

  let hasBuiltInAi = false;
  try {
    if (win.ai?.languageModel) {
      if (typeof win.ai.languageModel.capabilities === 'function') {
        const caps = await win.ai.languageModel.capabilities();
        hasBuiltInAi = caps.available === 'readily' || caps.available === 'after-download';
      } else {
        hasBuiltInAi = true;
      }
    } else if (win.ai) {
      hasBuiltInAi = true;
    }
  } catch {
    hasBuiltInAi = false;
  }

  // 2. WebGPU / Donanım NPU denetimi
  let hasHardwareGpu = false;
  try {
    if ('gpu' in navigator && (navigator as unknown as { gpu?: unknown }).gpu) {
      hasHardwareGpu = true;
    }
  } catch {
    hasHardwareGpu = false;
  }

  // 3. WebNN (Neural Network API) denetimi
  const hasWebNN = 'ml' in navigator;

  if (hasBuiltInAi) {
    return {
      isAvailable: true,
      type: 'chrome_gemini_nano',
      label: 'Cihaz İçi Gemini Nano (Aktif)',
      description: 'Cihazınızdaki yerleşik Chrome AI motoru başarıyla tespit edildi.',
      hardwareAcceleration: hasHardwareGpu
    };
  }

  if (hasWebNN) {
    return {
      isAvailable: true,
      type: 'webnn_npu',
      label: 'Cihaz Donanım Yapay Zeka Hızlandırıcısı (NPU/WebNN)',
      description: 'Cihazınızda yapay zeka işlem birimi (NPU/WebNN) bulundu.',
      hardwareAcceleration: hasHardwareGpu
    };
  }

  // Cihazda yerleşik yapay zeka uygulaması yok
  return {
    isAvailable: false,
    type: 'none',
    label: 'Cihazda Yapay Zeka Uygulaması Yok',
    description: 'Cihazınızda yerleşik yapay zeka (Gemini Nano / window.ai) veya yerel model uygulaması tespit edilemedi.',
    hardwareAcceleration: hasHardwareGpu
  };
}

/**
 * Siteyi inceleyen kullanıcının güncel yapay zeka kotasını getirir.
 */
export function getUserAiQuota(): UserAiQuota {
  const todayStr = new Date().toISOString().slice(0, 10);
  try {
    const raw = localStorage.getItem(QUOTA_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserAiQuota;
      if (parsed.lastResetDate === todayStr) {
        return {
          totalQuota: DAILY_MAX_QUOTA,
          usedQuota: parsed.usedQuota || 0,
          remainingQuota: Math.max(0, DAILY_MAX_QUOTA - (parsed.usedQuota || 0)),
          lastResetDate: todayStr
        };
      }
    }
  } catch {
    // ignore parse error
  }

  // Yeni gün veya ilk kez gelen kullanıcı
  const initialQuota: UserAiQuota = {
    totalQuota: DAILY_MAX_QUOTA,
    usedQuota: 0,
    remainingQuota: DAILY_MAX_QUOTA,
    lastResetDate: todayStr
  };
  try {
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(initialQuota));
  } catch {
    // ignore storage error
  }
  return initialQuota;
}

/**
 * Kullanıcı kotasından 1 analiz hakkı düşer.
 */
export function consumeUserAiQuota(): { success: boolean; quota: UserAiQuota; message?: string } {
  const current = getUserAiQuota();

  if (current.remainingQuota <= 0) {
    return {
      success: false,
      quota: current,
      message: 'Günlük kullanıcı yapay zeka kotanız dolmuştur (0/5 hak kaldı). Gece 00:00\'da kotanız yenilenecektir.'
    };
  }

  const updated: UserAiQuota = {
    ...current,
    usedQuota: current.usedQuota + 1,
    remainingQuota: current.remainingQuota - 1
  };

  try {
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage error
  }

  return {
    success: true,
    quota: updated
  };
}

/**
 * Geliştirici / test amaçlı kotayı sıfırlama yardımcısı
 */
export function resetUserAiQuota(): UserAiQuota {
  const todayStr = new Date().toISOString().slice(0, 10);
  const reset: UserAiQuota = {
    totalQuota: DAILY_MAX_QUOTA,
    usedQuota: 0,
    remainingQuota: DAILY_MAX_QUOTA,
    lastResetDate: todayStr
  };
  try {
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(reset));
  } catch {
    // ignore storage error
  }
  return reset;
}
