// Dua library data
export interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
}

export const duaCategories = [
  "Morning Duas",
  "Evening Duas",
  "Before Sleep",
  "After Prayer",
  "Travel Duas",
  "Protection Duas",
  "Gratitude Duas",
] as const;

export const duas: Dua[] = [
  {
    id: "1",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillahi wal hamdu lillah",
    translation: "We have entered the morning and the dominion belongs to Allah, and all praise is for Allah.",
    category: "Morning Duas",
  },
  {
    id: "2",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan nushur",
    translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
    category: "Morning Duas",
  },
  {
    id: "3",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal mulku lillahi wal hamdu lillah",
    translation: "We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.",
    category: "Evening Duas",
  },
  {
    id: "4",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal masir",
    translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.",
    category: "Evening Duas",
  },
  {
    id: "5",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live.",
    category: "Before Sleep",
  },
  {
    id: "6",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
    translation: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
    category: "Before Sleep",
  },
  {
    id: "7",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka antas Samee'ul Aleem",
    translation: "Our Lord, accept from us. Indeed You are the All-Hearing, the All-Knowing.",
    category: "After Prayer",
  },
  {
    id: "8",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha al-'Azeem alladhi la ilaha illa huwal Hayyul Qayyumu wa atubu ilayh",
    translation: "I seek forgiveness from Allah the Almighty, whom there is no deity but He, the Living, the Sustainer, and I repent to Him.",
    category: "After Prayer",
  },
  {
    id: "9",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil qabri wa a'udhu bika min fitnatil masihid dajjal",
    translation: "O Allah, I seek refuge in You from the punishment of the grave and I seek refuge in You from the trial of the False Messiah.",
    category: "Protection Duas",
  },
  {
    id: "10",
    arabic: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'un fil ardi wa la fis sama'i wa huwas Samee'ul Aleem",
    translation: "In the name of Allah, with whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, All-Knowing.",
    category: "Protection Duas",
  },
  {
    id: "11",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
    transliteration: "SubhanAllahi wa bihamdihi 'adada khalqihi wa rida nafsihi wa zinata 'arshihi wa midada kalimatihi",
    translation: "Glory be to Allah and praise Him, as many times as the number of His creation, His pleasure, the weight of His Throne and the ink of His words.",
    category: "Gratitude Duas",
  },
  {
    id: "12",
    arabic: "اللَّهُمَّ لَكَ الْحَمْدُ كُلُّهُ وَلَكَ الشُّكْرُ كُلُّهُ",
    transliteration: "Allahumma lakal hamdu kulluhu wa lakash shukru kulluhu",
    translation: "O Allah, to You belongs all praise and to You belongs all gratitude.",
    category: "Gratitude Duas",
  },
  {
    id: "13",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا السَّفَرِ",
    transliteration: "Allahumma inni as'aluka khayra hadhas safar",
    translation: "O Allah, I ask You for the goodness of this journey.",
    category: "Travel Duas",
  },
  {
    id: "14",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    transliteration: "Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin",
    translation: "Glory be to Him who has subjected this to us, for we could never have accomplished it by ourselves.",
    category: "Travel Duas",
  },
];

export const islamicQuotes = [
  "Indeed, with hardship comes ease. — Quran 94:6",
  "And He found you lost and guided you. — Quran 93:7",
  "So verily, with hardship, there is relief. — Quran 94:5",
  "Allah does not burden a soul beyond that it can bear. — Quran 2:286",
  "And whoever puts their trust in Allah, He will be enough for them. — Quran 65:3",
  "My mercy encompasses all things. — Quran 7:156",
  "Remember Me, and I will remember you. — Quran 2:152",
  "He is with you wherever you are. — Quran 57:4",
  "And your Lord says: Call upon Me, I will respond to you. — Quran 40:60",
  "The best among you are those who have the best character. — Prophet Muhammad ﷺ",
];

export const islamicEvents = [
  { name: "Ramadan", hijriMonth: 9, hijriDay: 1, duration: 30 },
  { name: "Eid al-Fitr", hijriMonth: 10, hijriDay: 1, duration: 3 },
  { name: "Eid al-Adha", hijriMonth: 12, hijriDay: 10, duration: 4 },
  { name: "Ashura", hijriMonth: 1, hijriDay: 10, duration: 1 },
  { name: "Laylatul Qadr", hijriMonth: 9, hijriDay: 27, duration: 1 },
  { name: "Mawlid an-Nabi", hijriMonth: 3, hijriDay: 12, duration: 1 },
  { name: "Isra wal Mi'raj", hijriMonth: 7, hijriDay: 27, duration: 1 },
];
