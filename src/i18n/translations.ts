import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  searchPlaceholder: string;
  postUpdate: string;
  createPost: string;
  whatsHappening: string;
  cancel: string;
  publish: string;
  
  // Navigation
  navFeed: string;
  navMap: string;
  navDirectory: string;
  navMessages: string;
  studentToolsTitle: string;
  navVisa: string;
  navRoi: string;
  navFlightMarket: string;
  
  // Feed Filters
  filterAll: string;
  filterOfficial: string;
  filterJobs: string;
  filterHousing: string;
  filterTips: string;
  filterWarnings: string;
  
  // Hashtags
  trendingTagsTitle: string;
  popularLocationsTitle: string;
  
  // Right Sidebar Widgets
  visaRadarTitle: string;
  visaRadarSubtitle: string;
  viewAllSlots: string;
  nextSlot: string;
  approvalRate: string;
  
  currencyConverterTitle: string;
  currencyConverterSubtitle: string;
  usdAmount: string;
  localWageNotice: string;
  hourlyRateIn: string;
  
  sosTitle: string;
  sosSubtitle: string;
  emergencyHotline: string;
  scamWarning: string;
  callNow: string;
  
  // Tabs & Views
  tabAnnouncements: string;
  tabCompanies: string;
  tabAgencies: string;
  applyNow: string;
  viewDetails: string;
  verifiedBadge: string;
  officialAgencyBadge: string;
  
  // Language Switch
  languageLabel: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'J1 Connect',
    appSubtitle: 'CIS to USA J-1 Work & Travel Community',
    searchPlaceholder: 'Search jobs, housing, agencies (#OceanCity, #Wildwood)...',
    postUpdate: '+ Post Update',
    createPost: 'Create Post',
    whatsHappening: 'Share an update, overtime opportunity, or housing tip...',
    cancel: 'Cancel',
    publish: 'Publish Post',
    
    // Navigation
    navFeed: 'Home Feed',
    navMap: 'Discovery Map',
    navDirectory: 'Agencies & Employers',
    navMessages: 'Direct Messages',
    studentToolsTitle: 'STUDENT TOOLS',
    navVisa: 'Visa Radar & Slots',
    navRoi: 'J-1 ROI & Tax Calculator',
    navFlightMarket: 'Flight Buddy & Flea Market',
    
    // Feed Filters
    filterAll: 'All Posts',
    filterOfficial: 'Official Hiring',
    filterJobs: 'Second Jobs',
    filterHousing: 'Housing Alerts',
    filterTips: 'Tips & Guides',
    filterWarnings: 'Scam Warnings',
    
    // Hashtags
    trendingTagsTitle: 'Trending Hashtags',
    popularLocationsTitle: 'Top J-1 Destinations',
    
    // Right Sidebar Widgets
    visaRadarTitle: 'Embassy Visa Radar',
    visaRadarSubtitle: 'Live consular slot availability in CIS',
    viewAllSlots: 'View All Slots',
    nextSlot: 'Next Slot:',
    approvalRate: 'Approval Rate',
    
    currencyConverterTitle: 'Live Currency & Wage Converter',
    currencyConverterSubtitle: 'Convert your US paycheck into home currency',
    usdAmount: 'USD Amount ($)',
    localWageNotice: 'Calculate how much your US hourly wage equals back home:',
    hourlyRateIn: 'Hourly wage in',
    
    sosTitle: 'Safety & SOS Quick Access',
    sosSubtitle: '24/7 Official sponsor support and emergency lines',
    emergencyHotline: 'Department of State 24/7 Hotline',
    scamWarning: '⚠️ Never pay wire transfers for US housing without a video tour or official agency verification.',
    callNow: 'Call Hotline',
    
    // Tabs & Views
    tabAnnouncements: 'Hiring Calls',
    tabCompanies: 'US Employers',
    tabAgencies: 'CIS Agencies',
    applyNow: 'Apply Now',
    viewDetails: 'View Details',
    verifiedBadge: 'Verified Sponsor',
    officialAgencyBadge: 'Official Agency',
    
    languageLabel: 'Language',
  },
  ru: {
    appName: 'J1 Connect',
    appSubtitle: 'Сообщество J-1 Work & Travel из СНГ в США',
    searchPlaceholder: 'Поиск работы, жилья, агентств (#OceanCity, #Wildwood)...',
    postUpdate: '+ Опубликовать',
    createPost: 'Создать пост',
    whatsHappening: 'Поделитесь новостью, овертаймом или жильем...',
    cancel: 'Отмена',
    publish: 'Опубликовать',
    
    // Navigation
    navFeed: 'Главная лента',
    navMap: 'Интерактивная карта',
    navDirectory: 'Агентства и Работодатели',
    navMessages: 'Личные сообщения',
    studentToolsTitle: 'ИНСТРУМЕНТЫ СТУДЕНТА',
    navVisa: 'Визовый радар и Слоты',
    navRoi: 'Калькулятор окупаемости J-1',
    navFlightMarket: 'Попутчики и Барахолка',
    
    // Feed Filters
    filterAll: 'Все посты',
    filterOfficial: 'Набор от работодателей',
    filterJobs: 'Вторая работа',
    filterHousing: 'Поиск жилья',
    filterTips: 'Лайфхаки и Гайды',
    filterWarnings: 'Осторожно, мошенники',
    
    // Hashtags
    trendingTagsTitle: 'Популярные хэштеги',
    popularLocationsTitle: 'Топ локаций J-1',
    
    // Right Sidebar Widgets
    visaRadarTitle: 'Визовый радар посольств',
    visaRadarSubtitle: 'Слоты на собеседования в СНГ',
    viewAllSlots: 'Все слоты',
    nextSlot: 'Ближайшая дата:',
    approvalRate: 'Одобрение',
    
    currencyConverterTitle: 'Конвертер валют и зарплат',
    currencyConverterSubtitle: 'Сравните зарплату в США с домашней валютой',
    usdAmount: 'Сумма в долларах ($)',
    localWageNotice: 'Посчитайте часовую ставку в местной валюте:',
    hourlyRateIn: 'Часовая ставка в',
    
    sosTitle: 'Безопасность и SOS Контакты',
    sosSubtitle: 'Круглосуточная горячая линия спонсоров',
    emergencyHotline: 'Горячая линия Госдепартамента США',
    scamWarning: '⚠️ Никогда не переводите предоплату за жилье без видеозвонка или подтверждения агентства.',
    callNow: 'Позвонить',
    
    // Tabs & Views
    tabAnnouncements: 'Вакансии работодателей',
    tabCompanies: 'Работодатели США',
    tabAgencies: 'Агентства СНГ',
    applyNow: 'Подать заявку',
    viewDetails: 'Подробнее',
    verifiedBadge: 'Проверенный спонсор',
    officialAgencyBadge: 'Официальное агентство',
    
    languageLabel: 'Язык',
  },
  kk: {
    appName: 'J1 Connect',
    appSubtitle: 'ТМД студенттеріне арналған J-1 Work & Travel желісі',
    searchPlaceholder: 'Жұмыс, тұрғын үй, агенттіктерді іздеу (#OceanCity)...',
    postUpdate: '+ Жазба қосу',
    createPost: 'Жазба жариялау',
    whatsHappening: 'Жаңалық, қосымша жұмыс немесе пәтер туралы бөлісіңіз...',
    cancel: 'Болдырмау',
    publish: 'Жариялау',
    
    // Navigation
    navFeed: 'Басты парақша',
    navMap: 'Интерактивті карта',
    navDirectory: 'Агенттіктер мен Жұмыс берушілер',
    navMessages: 'Жеке хабарламалар',
    studentToolsTitle: 'СТУДЕНТ ҚҰРАЛДАРЫ',
    navVisa: 'Виза радары мен Слоты',
    navRoi: 'J-1 табыс пен шығын калькуляторы',
    navFlightMarket: 'Бірге ұшу & Студенттер жәрмеңкесі',
    
    // Feed Filters
    filterAll: 'Барлық жазбалар',
    filterOfficial: 'Ресми бос орындар',
    filterJobs: 'Қосымша жұмыс',
    filterHousing: 'Пәтер іздеу',
    filterTips: 'Кеңестер мен нұсқаулықтар',
    filterWarnings: 'Алаяқтықтан сақтану',
    
    // Hashtags
    trendingTagsTitle: 'Трендтегі хэштегтер',
    popularLocationsTitle: 'Үздік J-1 қалалары',
    
    // Right Sidebar Widgets
    visaRadarTitle: 'Елшілік виза радары',
    visaRadarSubtitle: 'ТМД елдеріндегі кезекке жазылу күндері',
    viewAllSlots: 'Барлық күндер',
    nextSlot: 'Жақын күн:',
    approvalRate: 'Бекіту пайызы',
    
    currencyConverterTitle: 'Валюта және жалақы калькуляторы',
    currencyConverterSubtitle: 'АҚШ табысын ұлттық валютаға шағыңыз',
    usdAmount: 'АҚШ доллары ($)',
    localWageNotice: 'Сағаттық мөлшерлемені теңге/валютамен есептеңіз:',
    hourlyRateIn: 'Сағаттық табыс',
    
    sosTitle: 'Қауіпсіздік & SOS көмек',
    sosSubtitle: 'АҚШ демеушілерінің тәулік бойы шұғыл байланысы',
    emergencyHotline: 'АҚШ Мемлекеттік департаментінің желісі',
    scamWarning: '⚠️ Пәтерге бейнеқоңыраусыз немесе ресми агенттіксіз алдын ала ақша аудармаңыз.',
    callNow: 'Хабарласу',
    
    // Tabs & Views
    tabAnnouncements: 'Бос орындар',
    tabCompanies: 'АҚШ жұмыс берушілері',
    tabAgencies: 'ТМД агенттіктері',
    applyNow: 'Өтініш беру',
    viewDetails: 'Толығырақ',
    verifiedBadge: 'Тексерілген демеуші',
    officialAgencyBadge: 'Ресми агенттік',
    
    languageLabel: 'Тіл',
  },
};
