import { CalculatorInput, CalculatedResult } from '../types';
import { EMADDER_TABLE } from '../data/mockData';

export function calculateRetirementScenarios(input: CalculatorInput): CalculatedResult {
  const [entryYearStr, entryMonthStr] = input.sgkEntryDate.split('-');
  const entryYear = parseInt(entryYearStr || '2001', 10);
  const entryMonth = parseInt(entryMonthStr || '1', 10);

  const [birthYearStr, birthMonthStr] = input.birthDate.split('-');
  const birthYear = parseInt(birthYearStr || '1980', 10);
  const birthMonth = parseInt(birthMonthStr || '1', 10);

  const currentYear = 2026;
  const currentAge = currentYear - birthYear;

  // 1. Current Law (5510 Sayılı Kanun)
  // For entries between 09.09.1999 and 30.04.2008:
  // 4A: Women 58, Men 60; 7000 days
  // 4B/4C: Women 58, Men 60; 9000 days (or 7200 for women in some public schemes, standard 9000)
  const isBeforeEYT = entryYear < 1999 || (entryYear === 1999 && entryMonth <= 8);
  const isAfter2008Reform = entryYear > 2008 || (entryYear === 2008 && entryMonth > 4);

  let currentLawAge = input.gender === 'kadin' ? 58 : 60;
  let currentLawRequiredDays = input.insuranceType === '4A' ? 7000 : 9000;

  if (isBeforeEYT) {
    // EYT applies: No age limit
    currentLawAge = input.gender === 'kadin' ? 43 : 45; // effectively age reached
    currentLawRequiredDays = input.gender === 'kadin' ? 5825 : 5900;
  } else if (isAfter2008Reform) {
    // Post 2008 gradual increase up to 65
    currentLawAge = input.gender === 'kadin' ? 61 : 63;
    currentLawRequiredDays = 7200;
  }

  const currentLawRetirementYear = birthYear + currentLawAge;
  const currentLawRemainingDays = Math.max(0, currentLawRequiredDays - input.currentDays);
  const currentLawRemainingYears = Math.max(0, currentLawAge - currentAge);

  // 2. EMADDER Proposal
  let emadderAge = input.gender === 'kadin' ? 48 : 50;
  let emadderRequiredDays = 6600;

  if (isBeforeEYT) {
    emadderAge = input.gender === 'kadin' ? 43 : 45;
    emadderRequiredDays = 5000;
  } else if (isAfter2008Reform) {
    emadderAge = input.gender === 'kadin' ? 52 : 54;
    emadderRequiredDays = 7000;
  } else {
    // Look up in EMADDER table
    const match = EMADDER_TABLE.find(item => item.year === entryYear);
    if (match) {
      emadderAge = input.gender === 'kadin' ? match.femaleAge : match.maleAge;
      emadderRequiredDays = match.days;
    }
  }

  const emadderRetirementYear = birthYear + emadderAge;
  const emadderRemainingDays = Math.max(0, emadderRequiredDays - input.currentDays);
  const emadderRemainingYears = Math.max(0, emadderAge - currentAge);
  const advantageYears = Math.max(0, currentLawAge - emadderAge);

  // 3. Alternative 1-Year Step Model
  const offsetFrom1999 = Math.max(0, entryYear - 1999);
  const altAgeBase = input.gender === 'kadin' ? 46 : 48;
  const altAge = Math.min(input.gender === 'kadin' ? 58 : 60, altAgeBase + offsetFrom1999);
  const altDays = 6000 + (offsetFrom1999 * 100);

  // 4. Partial Retirement (Yaştan Kısmi Emeklilik)
  const partialAge = input.gender === 'kadin' ? 58 : 60;
  const partialDays = input.insuranceType === '4A' ? 4500 : 5400;

  // 5. Borçlanma Analizi (Military / Maternity)
  let canPullEntryBack = false;
  let monthsPushedBack = 0;
  let daysAdded = 0;
  let impactSummary = '';

  if (input.gender === 'erkek' && input.militaryServiceDays > 0) {
    daysAdded = input.militaryServiceDays;
    monthsPushedBack = Math.round(input.militaryServiceDays / 30);

    // If entry was in 1999 or 2000, can military service pull entry date before 09.09.1999?
    const entryDateObj = new Date(entryYear, entryMonth - 1, 15);
    const pulledBackDate = new Date(entryDateObj.getTime() - (input.militaryServiceDays * 24 * 60 * 60 * 1000));
    const eytCutoff = new Date(1999, 8, 8); // 8 Sept 1999

    if (pulledBackDate <= eytCutoff && entryDateObj > eytCutoff) {
      canPullEntryBack = true;
      impactSummary = `🚨 KRİTİK FIRSAT: ${input.militaryServiceDays} günlük askerlik borçlanması ile sigorta başlangıcınız 08.09.1999 öncesine çekilebilir! Bu durumda doğrudan EYT KAPSAMINA GİREBİLİR ve kademeli emekliliği beklemeden yaş şartsız emekli olabilirsiniz!`;
    } else {
      impactSummary = `${input.militaryServiceDays} gün askerlik borçlanması prim gün sayınıza eklenerek eksik priminizi ${daysAdded} gün azaltır.`;
    }
  } else if (input.gender === 'kadin' && input.maternityChildrenCount > 0) {
    daysAdded = Math.min(2160, input.maternityChildrenCount * 720);
    impactSummary = `${input.maternityChildrenCount} çocuk için doğum borçlanması yaparak toplamda ${daysAdded} gün prim kazanabilirsiniz. (Doğum borçlanması SGK başlangıcını geriye çekmez, eksik prim gününü tamamlar).`;
  } else {
    impactSummary = 'Borçlanma seçilmedi. İsteğe bağlı borçlanma simülasyonu için gün/çocuk bilgisi giriniz.';
  }

  return {
    currentLaw: {
      retirementAge: currentLawAge,
      requiredDays: currentLawRequiredDays,
      estimatedRetirementYear: currentLawRetirementYear,
      remainingDays: currentLawRemainingDays,
      remainingYears: currentLawRemainingYears,
      statusSummary: `${currentLawAge} Yaş / ${currentLawRequiredDays.toLocaleString('tr-TR')} Gün`
    },
    emadderProposal: {
      retirementAge: emadderAge,
      requiredDays: emadderRequiredDays,
      estimatedRetirementYear: emadderRetirementYear,
      remainingDays: emadderRemainingDays,
      remainingYears: emadderRemainingYears,
      advantageYears,
      statusSummary: `${emadderAge} Yaş / ${emadderRequiredDays.toLocaleString('tr-TR')} Gün (${advantageYears} Yıl Erken)`
    },
    alternativeModel: {
      retirementAge: altAge,
      requiredDays: altDays,
      estimatedRetirementYear: birthYear + altAge,
      advantageYears: Math.max(0, currentLawAge - altAge)
    },
    partialRetirement: {
      retirementAge: partialAge,
      requiredDays: partialDays,
      statusSummary: `${partialDays} Gün ile ${partialAge} Yaşında Kısmi Emeklilik`
    },
    borrowingAdvantage: {
      canPullEntryBack,
      daysAdded,
      monthsPushedBack,
      impactSummary
    }
  };
}
