export type AlarmLevel = 'KIRMIZI' | 'SARI' | 'MAVİ' | 'BİLDİRİM_GÖNDERİLMEZ';

export interface BureaucraticStage {
  id: number;
  title: string;
  shortTitle: string;
  status: 'completed' | 'current' | 'pending';
  description: string;
  officialRequirement: string;
  lastUpdated: string;
  officialSource: string;
  sourceUrl?: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  time: string;
  timestamp: string;
  title: string;
  summary: string;
  details: string;
  source: 'Resmî Gazete' | 'TBMM' | 'ÇSGB Bakanlığı' | 'SGK Başkanlığı' | 'Uzman Değerlendirmesi';
  alarmLevel: AlarmLevel;
  isVerified: boolean;
  documentType?: 'pdf' | 'video' | 'statement' | 'gazette';
  documentTitle?: string;
  documentSnippet?: string;
  officialRefCode?: string;
}

export interface FactCheckItem {
  id: string;
  fakeClaim: string;
  spreadChannel: string;
  status: 'YALAN' | 'TIKLAMA TUZAĞI' | 'SÖYLENTİ' | 'DOĞRULANMADI';
  clickbaitScore: number;
  officialTruth: string;
  officialProof: string;
  publishedDate: string;
}

export interface CalculatorInput {
  gender: 'kadin' | 'erkek';
  sgkEntryDate: string; // YYYY-MM
  insuranceType: '4A' | '4B' | '4C'; // 4A SSK, 4B Bağkur, 4C Emekli Sandığı
  birthDate: string; // YYYY-MM-DD
  currentDays: number;
  militaryServiceDays: number; // For men (borçlanma)
  maternityChildrenCount: number; // For women (çocuk sayısı)
}

export interface CalculatedResult {
  currentLaw: {
    retirementAge: number;
    requiredDays: number;
    estimatedRetirementYear: number;
    remainingDays: number;
    remainingYears: number;
    statusSummary: string;
  };
  emadderProposal: {
    retirementAge: number;
    requiredDays: number;
    estimatedRetirementYear: number;
    remainingDays: number;
    remainingYears: number;
    advantageYears: number;
    statusSummary: string;
  };
  alternativeModel: {
    retirementAge: number;
    requiredDays: number;
    estimatedRetirementYear: number;
    advantageYears: number;
  };
  partialRetirement: {
    retirementAge: number;
    requiredDays: number;
    statusSummary: string;
  };
  borrowingAdvantage: {
    canPullEntryBack: boolean;
    daysAdded: number;
    monthsPushedBack: number;
    impactSummary: string;
  };
}

export interface ScraperBot {
  id: string;
  name: string;
  interval: string;
  lastRun: string;
  status: string;
  statusType: 'success' | 'warning' | 'standby';
  keywords: string[];
  recentLogs: string[];
}

export interface NotificationSettings {
  onlyRedAlarm: boolean;
  includeYellowAlarm: boolean;
  includeBlueAlarm: boolean;
  soundEnabled: boolean;
  nightQuietHours: boolean;
}

export interface FaqItem {
  id: string;
  category: 'genel' | 'borclanma' | 'emadder' | 'mevzuat' | 'bagkur' | 'staj';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  legalCitation: string;
  isPopular?: boolean;
  relatedArticleCode?: string;
}
