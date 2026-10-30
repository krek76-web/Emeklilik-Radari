import { BureaucraticStage, TimelineItem, FactCheckItem, ScraperBot, FaqItem } from '../types';

export const BUREAUCRATIC_STAGES: BureaucraticStage[] = [
  {
    id: 1,
    title: 'Taslak & Siyasi Beklenti',
    shortTitle: 'Taslak Bekleniyor',
    status: 'current',
    description: 'Şu anda kademeli emeklilik konusunda hükümet veya Çalışma Bakanlığı tarafından hazırlanmış resmi bir kanun tasarısı bulunmamaktadır. Muhalefet partileri ve EMADDER derneği tarafından sunulan kanun teklifleri meclis arşivindedir ancak hükümet kanadında resmi çalışma başlatılmamıştır.',
    officialRequirement: 'Çalışma ve Sosyal Güvenlik Bakanlığı\'nın etki analizi hazırlayıp kanun teklifi taslağını TBMM\'ye sunması gerekir.',
    lastUpdated: 'Bugün 08:30 (Resmi Teyit)',
    officialSource: 'ÇSGB Basın Açıklamaları & TBMM Kanun Teklifleri Veri Tabanı'
  },
  {
    id: 2,
    title: 'TBMM Komisyonu',
    shortTitle: 'Komisyonda',
    status: 'pending',
    description: 'TBMM Plan ve Bütçe Komisyonu veya Sağlık, Aile, Çalışma ve Sosyal İşler Komisyonu\'na bir kanun maddesi henüz sevk edilmemiştir. Torba yasa tekliflerinde kademeli emeklilik maddesi yer almamaktadır.',
    officialRequirement: 'Kanun teklifinin komisyon gündemine alınıp maddeler halinde oylanması ve komisyon raporunun yazılması.',
    lastUpdated: 'Son Komisyon Oturumu: Tutanaklar tarandı',
    officialSource: 'TBMM Plan ve Bütçe Komisyonu Tutanakları'
  },
  {
    id: 3,
    title: 'TBMM Genel Kurulu',
    shortTitle: 'Genel Kurul Oylaması',
    status: 'pending',
    description: 'Teklif komisyondan geçtikten sonra Meclis Genel Kurulu\'nda milletvekilleri tarafından görüşülür ve salt çoğunlukla kabul edilir.',
    officialRequirement: 'Genel Kurul\'da açık oylama ile kabul edilip kanun numarası alması.',
    lastUpdated: 'Beklemede',
    officialSource: 'TBMM Genel Kurul Gündemi'
  },
  {
    id: 4,
    title: 'Cumhurbaşkanı İmzası',
    shortTitle: 'Cumhurbaşkanı Onayı',
    status: 'pending',
    description: 'TBMM\'den geçen kanun Cumhurbaşkanlığı Külliyesi\'ne gönderilir. 15 gün içinde imzalanıp Resmî Gazete\'ye sevk edilir veya veto edilerek meclise iade edilir.',
    officialRequirement: 'Cumhurbaşkanlığı Kararnamesi / Kanun Onay Yazısı.',
    lastUpdated: 'Beklemede',
    officialSource: 'T.C. Cumhurbaşkanlığı İletişim Başkanlığı'
  },
  {
    id: 5,
    title: 'Resmî Gazete (Yürürlük)',
    shortTitle: 'Resmî Gazete İlanı',
    status: 'pending',
    description: 'Kanunun yürürlük maddesine göre yayımlandığı gün veya belirtilen tarihte yürürlüğe girer. SGK genelgesi ile uygulama esasları belirlenir.',
    officialRequirement: 'T.C. Resmî Gazete\'de sayı numarasıyla yayımlanması.',
    lastUpdated: '30.10.2026 Sayı: 32900 (Mevzuat Temiz)',
    officialSource: 'resmigazete.gov.tr'
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'tl-1',
    date: '30 Ekim 2026',
    time: '00:01',
    timestamp: '2026-10-30T00:01:00Z',
    title: 'T.C. Resmî Gazete Günlük Taraması Tamamlandı',
    summary: '32900 sayılı olağan Resmî Gazete metninde kademeli emeklilik, 5510 sayılı kanunda yaş düzenlemesi veya torba yasa maddesi yer almadı.',
    details: 'Resmi Gazete Botumuz gece 00:00 yayını itibarıyla tüm kanun, kararname ve yönetmelikleri taramıştır. 5510, 4447 ve geçici emeklilik maddeleri taranmış olup herhangi bir kademeli emeklilik hükmü bulunmamaktadır.',
    source: 'Resmî Gazete',
    alarmLevel: 'MAVİ',
    isVerified: true,
    documentType: 'gazette',
    documentTitle: 'Resmî Gazete Sayı 32900',
    documentSnippet: 'Mevzuat bilgi sisteminde 1999-2008 arası sigortalılık şartlarını değiştiren bir yasa ilanı bulunmamaktadır.',
    officialRefCode: 'RG-32900-20261030'
  },
  {
    id: 'tl-2',
    date: '28 Ekim 2026',
    time: '14:20',
    timestamp: '2026-10-28T14:20:00Z',
    title: 'Bakan Işıkhan: "Kademeli Emeklilik Gündemimizde Yok"',
    summary: 'Çalışma ve Sosyal Güvenlik Bakanı Prof. Dr. Vedat Işıkhan, gazetecilerin sorusu üzerine hükümetin mevcut bir kademeli emeklilik çalışması olmadığını yineledi.',
    details: 'Bakan Işıkhan TBMM kulisinde yaptığı açıklamada: "Sosyal güvenlik sistemimizin aktüeryal dengesini korumak zorundayız. EYT düzenlemesinin bütçeye getirdiği yük devam ederken, şu aşamada 1999 sonrası için bir yaş indirimi veya kademe çalışmamız bulunmuyor." dedi.',
    source: 'ÇSGB Bakanlığı',
    alarmLevel: 'SARI',
    isVerified: true,
    documentType: 'statement',
    documentTitle: 'Bakanlık Basın Açıklaması Tutanakları',
    documentSnippet: '"Gündemimizde kademeli emeklilik veya 1999-2008 arası yaş düzenlemesi çalışması bulunmamaktadır."',
    officialRefCode: 'CSGB-BYS-2026-88'
  },
  {
    id: 'tl-3',
    date: '24 Ekim 2026',
    time: '16:45',
    timestamp: '2026-10-24T16:45:00Z',
    title: 'TBMM\'ye Yeni Kanun Teklifi Sunuldu (Muhalefet)',
    summary: 'Bir milletvekili tarafından 5510 sayılı kanuna ek geçici madde eklenmesi hakkında kanun teklifi Başkanlığa sunuldu.',
    details: 'Teklif, 09.09.1999 - 30.04.2008 arası sigortalılar için kadınlarda 43-50, erkeklerde 45-52 yaş kademesi getirilmesini öngörüyor. Teklif henüz Plan ve Bütçe Komisyonu gündemine alınmadı (Geçmiş benzer 14 teklif gibi komisyonda beklemede).',
    source: 'TBMM',
    alarmLevel: 'SARI',
    isVerified: true,
    documentType: 'pdf',
    documentTitle: 'TBMM Esas No: 2/2418 Kanun Teklifi Metni',
    documentSnippet: 'Sosyal Sigortalar ve Genel Sağlık Sigortası Kanununda Değişiklik Yapılmasına Dair Kanun Teklifi (İmza: Milletvekili Teklifi - Hükümet Tasarısı Değildir)',
    officialRefCode: 'TBMM-KN-2-2418'
  },
  {
    id: 'tl-4',
    date: '20 Ekim 2026',
    time: '11:15',
    timestamp: '2026-10-20T11:15:00Z',
    title: 'Sosyal Güvenlik Uzmanı Özgür Erdursun: "Aktüeryal Dengeler ve Olası Senaryolar"',
    summary: 'Erdursun, 2028 genel seçimleri öncesinde bir kademelendirme beklentisinin siyaseten gündeme gelebileceğini, ancak şu an kamuoyunda dolaşan "müjde" haberlerinin gerçeği yansıtmadığını açıkladı.',
    details: 'Uzman analizi: "Vatandaşlarımız her gün internetteki sahte manşetlerle umutlandırılıyor. Kanun teklifi meclisten geçmedikçe ve Resmi Gazete\'de çıkmadıkça kimse emeklilik hayali kurmasın. Masada hükümetin bir çalışması yok."',
    source: 'Uzman Değerlendirmesi',
    alarmLevel: 'MAVİ',
    isVerified: true,
    documentType: 'video',
    documentTitle: 'Uzman Değerlendirme Özeti & Aktüeryal Simülasyon',
    documentSnippet: 'Haber sitelerindeki "torba yasaya girdi" haberleri tamamen tık avcılığıdır.',
    officialRefCode: 'UZM-OE-20261020'
  },
  {
    id: 'tl-5',
    date: '15 Ekim 2026',
    time: '18:00',
    timestamp: '2026-10-15T18:00:00Z',
    title: 'EMADDER Heyeti TBMM Ziyareti Raporu',
    summary: 'Emeklilikte Adalete Takılanlar Derneği, siyasi parti grup başkanvekillerini ziyaret ederek kademe tablosunu sundu.',
    details: 'EMADDER yönetimi, 1 günlük farkla (08.09.1999 vs 09.09.1999) 17 yıl geç emekli olunmasının yarattığı mağduriyeti aktararak 43-52 yaş arası adil kademelendirme talebini iletti.',
    source: 'TBMM',
    alarmLevel: 'MAVİ',
    isVerified: true,
    documentType: 'statement',
    documentTitle: 'EMADDER TBMM Görüşme Bildirisi',
    documentSnippet: '1999-2008 arası çalışanlar için kademeli yaş tablosu talebi meclise sunuldu.',
    officialRefCode: 'EMADDER-2026-TBMM'
  }
];

export const FACT_CHECK_ITEMS: FactCheckItem[] = [
  {
    id: 'fc-1',
    fakeClaim: 'Kademeli emeklilik torba yasaya girdi, Resmi Gazete\'de bu gece yayımlandı! İşte yaş tablosu müjdesi!',
    spreadChannel: 'Haber Portalları, Google Keşfet & Sosyal Medya',
    status: 'YALAN',
    clickbaitScore: 98,
    officialTruth: 'Resmî Gazete\'de kademeli emekliliğe ilişkin hiçbir kanun veya madde yayımlanmamıştır. Bu başlıklar tamamen reklam ve tık almak için üretilmiş dezenformasyondur.',
    officialProof: 'T.C. Resmî Gazete 32900 sayılı nüsha ve TBMM kanunlar fihristi kontrol edilmiştir.',
    publishedDate: 'Bugün İncelendi'
  },
  {
    id: 'fc-2',
    fakeClaim: 'Cumhurbaşkanı Erdoğan kademeli emeklilik müjdesini açıkladı: 1999-2008 arasına erken emeklilik kapısı açıldı!',
    spreadChannel: 'YouTube & TikTok Dezenformasyon Kanalları',
    status: 'TIKLAMA TUZAĞI',
    clickbaitScore: 95,
    officialTruth: 'Cumhurbaşkanı\'nın böyle bir açıklaması yoktur. Eski tarihlerdeki EYT veya genel ekonomi açıklamalarından kesilen görüntüler bağlamından koparılarak montajlanmıştır.',
    officialProof: 'T.C. İletişim Başkanlığı Dezenformasyonla Mücadele Merkezi teyidi.',
    publishedDate: 'Dün İncelendi'
  },
  {
    id: 'fc-3',
    fakeClaim: 'Bakan Vedat Işıkhan tarih verdi: 2026 sonuna kadar kademeli emeklilik yasalaşacak!',
    spreadChannel: 'Sosyal Güvenlik Forumları & WhatsApp Grupları',
    status: 'YALAN',
    clickbaitScore: 92,
    officialTruth: 'Bakan Vedat Işıkhan tam aksine "Gündemimizde kademeli emeklilik yok" ifadesini kullanmıştır. İfade çarpıtılarak tam tersi anlamda servis edilmiştir.',
    officialProof: 'Çalışma ve Sosyal Güvenlik Bakanlığı resmi basın bültenleri.',
    publishedDate: '3 Gün Önce'
  },
  {
    id: 'fc-4',
    fakeClaim: 'EMADDER tablosu kabul edildi, 2000 girişliler 43 yaşında emekli olabilecek!',
    spreadChannel: 'X (Twitter) & Facebook Grupları',
    status: 'SÖYLENTİ',
    clickbaitScore: 84,
    officialTruth: 'EMADDER tablosu bir sivil toplum kuruluşu teklifidir. Hükümet veya TBMM tarafından kabul edilmiş bir yasa tasarısı değildir.',
    officialProof: 'TBMM Yasama Bölümü Kanun Teklifleri arşivi.',
    publishedDate: '1 Hafta Önce'
  }
];

export const SCRAPER_BOTS: ScraperBot[] = [
  {
    id: 'resmi_gazete',
    name: 'T.C. Resmî Gazete Botu',
    interval: 'Her gece 00:00 ve mükerrer sayılar',
    lastRun: 'Bugün 00:01 (Otomatik)',
    status: 'Aktif - Eşleşme Yok (Temiz)',
    statusType: 'success',
    keywords: ['5510', 'emeklilik yaşı', 'kademeli', 'geçici madde', 'sigortalılık süresi'],
    recentLogs: [
      '00:01:04 - 32900 sayılı Resmî Gazete HTML & PDF çekildi.',
      '00:01:12 - Metin indekslendi: 14 yönetmelik, 2 atama kararı tarandı.',
      '00:01:18 - "5510 sayılı Kanun", "Kademeli Emeklilik" kelimeleri 0 eşleşme verdi.',
      '00:01:20 - Kırmızı Alarm tetiklenmedi. Durum: Temiz.'
    ]
  },
  {
    id: 'tbmm_kanun',
    name: 'TBMM Kanun Teklifleri Portalı',
    interval: '15 dakikada bir senkronizasyon',
    lastRun: '8 dakika önce',
    status: 'Aktif - Komisyonda Görüşme Yok',
    statusType: 'standby',
    keywords: ['Plan ve Bütçe Komisyonu', 'kademeli emeklilik', 'yaş şartı düzenlemesi'],
    recentLogs: [
      '08:25:00 - TBMM komisyon gündemleri tarandı.',
      '08:25:05 - Torba Yasa görüşme tutanaklarında 1999-2008 yaş indirimi maddesi bulunamadı.',
      '08:25:10 - Muhalefet teklifi 2/2418 komisyonda bekleyenler listesinde.'
    ]
  },
  {
    id: 'bakanlik_sgk',
    name: 'Bakanlık & SGK Duyuru Taraması',
    interval: 'Anlık Basın Akışı (Webhook)',
    lastRun: '15 dakika önce',
    status: 'Aktif - Resmi Bildiri Bekleniyor',
    statusType: 'standby',
    keywords: ['Bakan Vedat Işıkhan', 'Sosyal Güvenlik Kurumu', 'Basın Duyurusu'],
    recentLogs: [
      '08:18:20 - csgb.gov.tr ve sgk.gov.tr basın odası taranıyor.',
      '08:18:25 - Yeni basın bildirisi yok. Son açıklama: "Gündemde kademeli emeklilik yok."'
    ]
  },
  {
    id: 'clickbait_shield',
    name: 'AI Clickbait & Dezenformasyon Filtresi',
    interval: '7/24 Kesintisiz Gerçek Zamanlı',
    lastRun: 'Sürekli Aktif',
    status: 'Son 24 Saatte 1.428 Haber Elendi',
    statusType: 'success',
    keywords: ['Müjde', 'Şok', 'Tarih Belli Oldu', 'Torba Yasaya Girdi mi?'],
    recentLogs: [
      '08:32:10 - 24 haber sitesi taranıyor (Sabah, Hürriyet, Milliyet, Yeni Şafak, Sözcü vb.).',
      '08:32:14 - "Kademeli emeklilikte son dakika müjdesi" başlıklı haber yakalandı.',
      '08:32:16 - AI Analiz: Metinde resmi kanun no yok, soru işaretiyle merak üretilmiş.',
      '08:32:17 - Karar: Clickbait skoru %96. Push bildirimi BLOKE EDİLDİ.'
    ]
  }
];

// EMADDER Proposed Grid (Emeklilikte Adalete Takılanlar Derneği Teklifi)
export const EMADDER_TABLE = [
  { year: 1999, sub: '09.09 Sonrası', femaleAge: 43, maleAge: 45, days: 6250 },
  { year: 2000, sub: 'Tüm Yıl', femaleAge: 43, maleAge: 45, days: 6325 },
  { year: 2001, sub: 'Tüm Yıl', femaleAge: 44, maleAge: 46, days: 6400 },
  { year: 2002, sub: 'Tüm Yıl', femaleAge: 45, maleAge: 47, days: 6475 },
  { year: 2003, sub: 'Tüm Yıl', femaleAge: 46, maleAge: 48, days: 6550 },
  { year: 2004, sub: 'Tüm Yıl', femaleAge: 47, maleAge: 49, days: 6625 },
  { year: 2005, sub: 'Tüm Yıl', femaleAge: 48, maleAge: 50, days: 6700 },
  { year: 2006, sub: 'Tüm Yıl', femaleAge: 49, maleAge: 51, days: 6775 },
  { year: 2007, sub: 'Tüm Yıl', femaleAge: 50, maleAge: 52, days: 6850 },
  { year: 2008, sub: '30 Nisan\'a Kadar', femaleAge: 50, maleAge: 52, days: 6925 }
];

export const KNOWLEDGE_BASE_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'genel',
    categoryLabel: '1999–2008 Kapsamı & EYT Farkı',
    question: 'Kademeli Emeklilik tam olarak nedir ve kimleri kapsar?',
    shortAnswer: '09.09.1999 ile 30.04.2008 tarihleri arasında ilk kez sigortalı olan ve EYT yasasının getirdiği 1 günlük farkla 17 yıla varan geç emeklilik farkından etkilenen çalışanları kapsar.',
    detailedAnswer: '03.03.2023 tarihinde yürürlüğe giren 7438 sayılı EYT kanunu, yalnızca 08.09.1999 ve öncesi sigorta girişi olan çalışanlarda yaş şartını tamamen kaldırmıştır. Ancak 09.09.1999 tarihinde sigortalı olan bir vatandaş, 1 gün fark nedeniyle kadınlarda 58, erkeklerde 60 yaşa tabi kalmıştır (17 yıla varan uçurum). Kademeli emeklilik talebi; bu keskin sınırın kaldırılıp, 1999-2008 arasındaki giriş yıllarına göre yaşın kademeli olarak (kadınlarda 43\'ten 50\'ye, erkeklerde 45\'ten 52\'ye) artırılmasını hedefler.',
    legalCitation: '5510 Sayılı Kanun Madde 28 ve 4447 Sayılı Kanun Geçici 81. Madde',
    isPopular: true,
    relatedArticleCode: '5510-M28'
  },
  {
    id: 'faq-2',
    category: 'mevzuat',
    categoryLabel: 'Resmi Süreç & Torba Yasa',
    question: 'Kademeli emeklilik şu anda yasalaştı mı veya meclis torba yasasında var mı?',
    shortAnswer: 'HAYIR. Kademeli emeklilik yasalaşmamıştır, Resmi Gazete\'de çıkmamıştır ve şu anki hükümet torba yasa metninde yer almamaktadır.',
    detailedAnswer: 'Mevzuat Bilgi Sistemi ve TBMM Kanunlar Fihristi\'nde 1999-2008 arası yaş şartını düşüren hiçbir kanun veya KHK bulunmamaktadır. Çalışma ve Sosyal Güvenlik Bakanı Prof. Dr. Vedat Işıkhan, resmi açıklamalarında bütçe aktüeryal dengeleri nedeniyle hükümetin gündeminde kademeli emeklilik çalışması bulunmadığını açıkça ifade etmiştir. Muhalefet partilerinin meclise sunduğu kanun teklifleri ise Plan ve Bütçe Komisyonu\'nda beklemededir.',
    legalCitation: 'T.C. Resmî Gazete 32900 Sayılı Nüsha & TBMM Komisyon Kayıtları',
    isPopular: true,
    relatedArticleCode: 'TBMM-2-2418'
  },
  {
    id: 'faq-3',
    category: 'emadder',
    categoryLabel: 'EMADDER & Yaş Tabloları',
    question: 'EMADDER (Emeklilikte Adalete Takılanlar) teklifi nedir, yaş şartı kaça düşüyor?',
    shortAnswer: 'EMADDER formülü; 1999 sonrası girişliler için kadınlarda 43-50, erkeklerde 45-52 yaş ve 6.250-6.925 prim günü ile adil bir kademelendirme önerir.',
    detailedAnswer: 'EMADDER teklifine göre: 1999 (09.09 sonrası) ve 2000 girişliler için Kadın 43 / Erkek 45 yaş (6.250-6.325 gün); 2001 girişliler için 44/46 yaş; 2002 için 45/47 yaş... şeklinde 2008\'e kadar her yıl kademeli olarak artmaktadır. Bu teklif, EYT\'den sonra ortaya çıkan "1 günle 17 yıl geç emeklilik" anayasal eşitlik ihlalini gidermeyi amaçlayan sivil toplum önerisidir.',
    legalCitation: 'EMADDER Kanun Teklifi Taslağı ve TBMM Dilekçe Komisyonu Başvuruları',
    isPopular: true,
    relatedArticleCode: 'EMADDER-FORMUL'
  },
  {
    id: 'faq-4',
    category: 'borclanma',
    categoryLabel: 'Borçlanma & İntibak',
    question: 'Askerlik borçlanması ile sigorta başlangıcı 08.09.1999 öncesine çekilebilir mi?',
    shortAnswer: 'EVET, eğer askerlik ilk sigorta tescil tarihinden ÖNCE yapılmışsa borçlanılan süre kadar sigorta başlangıcı geriye çekilir ve EYT\'ye dahil olunabilir.',
    detailedAnswer: '5510 sayılı kanunun 41. maddesine göre, er/erbaş olarak veya yedek subay okulunda geçen süreler borçlanılabilir. En kritik nokta şudur: Askerlik sigortalı olmadan ÖNCE yapılmışsa, ödenen prim gün sayısı kadar sigorta başlangıç tarihi takvim olarak geriye gider. Örneğin; 15.01.2000 SGK girişli bir erkek çalışan, sigortadan önce 18 ay (540 gün) askerlik yapmışsa, borçlanma ile başlangıcını Temmuz 1998\'e çekebilir. Bu durumda KADEMELİ EMEKLİLİĞİ BEKLEMEDEN doğrudan EYT (yaş şartsız) emeklilik hakkı kazanır!',
    legalCitation: '5510 Sayılı Kanun 41. Madde (b) Bendi ve SGK 2013/11 Sayılı Genelge',
    isPopular: true,
    relatedArticleCode: '5510-M41'
  },
  {
    id: 'faq-5',
    category: 'borclanma',
    categoryLabel: 'Borçlanma & İntibak',
    question: 'Kadınlarda doğum borçlanması sigorta başlangıç tarihini geriye çeker mi?',
    shortAnswer: 'Kural olarak HAYIR. Doğum borçlanması yalnızca eksik prim gününü tamamlar, sigorta başlangıç tarihini geriye çekmez (İstisna: Staj sonrası doğum).',
    detailedAnswer: 'Kadın çalışanlar en fazla 3 çocuk için her çocuk başına 720 gün (toplam 2.160 gün) doğum borçlanması yapabilir. Doğumun ilk sigorta tescilinden sonra gerçekleşmiş olması şarttır ve bu borçlanma giriş tarihini geriye çekmez, sadece prim gün sayısını artırır. TEK İSTİSNA: Staj veya çıraklık sigortası yapılmış, ardından doğum gerçekleşmiş ve normal sigorta daha sonra başlamışsa; Yargıtay ve SGK içtihatlarına göre staj ile normal sigorta arasındaki doğumlar borçlanıldığında başlangıç tarihi geriye çekilebilmektedir.',
    legalCitation: '5510 Sayılı Kanun 41. Madde (a) Bendi ve Yargıtay Hukuk Genel Kurulu Kararları',
    isPopular: false,
    relatedArticleCode: '5510-M41-A'
  },
  {
    id: 'faq-6',
    category: 'staj',
    categoryLabel: 'Staj & Çıraklık Sigortası',
    question: 'Staj ve çıraklık sigortası emeklilikte ilk işe giriş tarihi sayılır mı?',
    shortAnswer: 'Mevcut yasaya göre HAYIR. Staj döneminde sadece iş kazası ve meslek hastalığı primi yatırıldığı için uzun vadeli emeklilik başlangıcı sayılmaz.',
    detailedAnswer: 'Meslek lisesi, çıraklık okulları veya üniversite stajlarında adınıza SGK numarası verilse de işverenler yalnızca \'kısa vadeli sigorta kolları\' (iş kazası, meslek hastalığı) primi yatırmıştır. Yaşlılık, malullük ve ölüm sigortası primi yatmadığından 5510 ve 506 sayılı kanunlar staj tarihini emeklilik başlangıcı kabul etmez. TBMM\'de staj mağdurlarının bu süreyi borçlanarak başlangıç saydırmasına yönelik kanun teklifleri sunulmuş olup henüz yasalaşmamıştır.',
    legalCitation: '3308 Sayılı Mesleki Eğitim Kanunu ve 5510 Sayılı Kanun Madde 5',
    isPopular: true,
    relatedArticleCode: '3308-STAJ'
  },
  {
    id: 'faq-7',
    category: 'bagkur',
    categoryLabel: 'Bağ-Kur & SSK Eşitlemesi',
    question: 'Bağ-Kur 7200 prim günü düzenlemesi ne zaman çıkacak, kimleri kapsayacak?',
    shortAnswer: 'Hükümetin seçim vaatleri arasında yer alan düzenleme, küçük esnafın prim gün şartını 9000\'den 7200\'e (SSK ile eşit) indirmeyi hedefler; torba yasa takvimindedir.',
    detailedAnswer: 'Mevcut sistemde 4B (Bağ-Kur) sigortalıları emekli olmak için 9000 gün (25 yıl) prim ödemek zorundadır; bu durum 4A (SSK) çalışanlarının 7000-7200 gün şartına göre 5 yıl daha fazla prim anlamına gelir. Çalışma Bakanlığı\'nın üzerinde çalıştığı taslakta; bakkal, berber, kuaför, tamirci gibi 10 veya daha az çalışanı olan mikro esnaf için prim gününün 7200\'e düşürülmesi planlanmaktadır. Yasa henüz Meclis Genel Kurulu\'na gelmemiştir.',
    legalCitation: '5510 Sayılı Kanun Geçici Maddeler ve ÇSGB Reform Programı',
    isPopular: true,
    relatedArticleCode: 'BAGKUR-7200'
  },
  {
    id: 'faq-8',
    category: 'mevzuat',
    categoryLabel: 'Kısmi (Yaştan) Emeklilik',
    question: 'Kısmi emeklilik (yaştan emeklilik) şartları 1999-2008 arası için nedir?',
    shortAnswer: '4A (SSK) için 4.500 gün prim + 25 yıl sigortalılık süresi + Kadın 58, Erkek 60 yaş; 4B (Bağ-Kur) için ise 5.400 gündür.',
    detailedAnswer: '7000 prim gününü dolduramayan 1999-2008 arası SSK sigortalıları, en az 4.500 gün prim ödemiş olmak ve ilk işe giriş tarihinden itibaren 25 yıllık sigortalılık süresini tamamlamak kaydıyla yaştan kısmi emekli olabilir. Burada yaş şartı kadınlarda 58, erkeklerde 60\'tır. Bağ-Kur ve Emekli Sandığı mensupları için kısmi emeklilik prim günü 5.400 gündür (15 tam yıl).',
    legalCitation: '5510 Sayılı Kanun Madde 28 Kısmi Emeklilik Hükümleri',
    isPopular: false,
    relatedArticleCode: '5510-M28-KISMI'
  },
  {
    id: 'faq-9',
    category: 'genel',
    categoryLabel: 'Medyadaki Dezenformasyon',
    question: 'Haber sitelerindeki "Müjde! Kademeli emeklilik çıktı" haberlerine neden inanmamalıyız?',
    shortAnswer: 'Haber siteleri Google arama trafiği ve reklam geliri elde etmek için her gün aynı spekülatif başlıkları soru işaretiyle ısıtıp tık avcılığı yapar.',
    detailedAnswer: 'İnternet medyasında her gün yayımlanan "Kademeli emeklilikte flaş gelişme! İşte o tablo" başlıklı haberlerin %99\'u içeriklerinde hiçbir yeni somut bilgi barındırmaz. Metnin en sonuna soru işareti koyarak (örn. \'Resmi Gazete\'de çıktı mı?\') hukuki sorumluluktan kaçarlar. Bir düzenlemenin gerçek sayılabilmesi için T.C. Resmî Gazete\'de sayı numarası alması şarttır. EmeklilikRadarı, yapay zeka clickbait filtresi ile bu haberleri kullanıcıya bildirim atmadan otomatik engeller.',
    legalCitation: '5651 Sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Kanunu',
    isPopular: true,
    relatedArticleCode: 'DEZENFORMASYON-CALI'
  }
];

