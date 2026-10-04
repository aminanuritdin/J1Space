import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  Plus, 
  Flame, 
  Compass, 
  ShieldAlert, 
  Calculator, 
  Plane, 
  Map, 
  MessageSquare, 
  Globe,
  Tag,
  Users
} from 'lucide-react';
import { TabType } from './SidebarNav';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentUser: User;
  onOpenCreatePost: () => void;
  onOpenProfile: () => void;
  onOpenMessages: () => void;
  unreadMessagesCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectTag?: (tag: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenCreatePost,
  onOpenProfile,
  onOpenMessages,
  unreadMessagesCount,
  searchQuery,
  setSearchQuery,
  onSelectTag,
  mobileMenuOpen,
  setMobileMenuOpen,
  language,
  setLanguage,
}) => {
  const [showNotificationsToast, setShowNotificationsToast] = useState(false);
  const t = TRANSLATIONS[language];

  const quickHashtags = [
    'OceanCity',
    'Lifeguard',
    'SecondJob',
    'WildwoodNJ',
    'WisconsinDells',
    'Yellowstone',
    'SSN'
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'feed':
        return t.navFeed;
      case 'spaces':
        return language === 'en' ? 'Communities & Spaces Hub' : language === 'ru' ? 'Хаб Сообществ и Групп' : 'Қоғамдастықтар орталығы';
      case 'map':
        return t.navMap + ' (Clustered)';
      case 'employer_hub':
        return t.navDirectory;
      case 'visa':
        return t.navVisa;
      case 'analytics':
        return t.navRoi;
      case 'flight_market':
        return t.navFlightMarket;
      case 'employers':
        return 'Employer Reviews & Ratings';
      case 'roommates':
        return 'Housing & Travel Companion Finder';
      case 'second_job':
        return 'Second Job Board & Side Gigs';
      case 'tax_guide':
        return 'SSN, Bank & FICA Tax Exemption Guide';
      default:
        return 'J1 Connect';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#000000]/90 backdrop-blur-md border-b border-[#2F3336] text-[#E7E9EA]">
      {/* Top Main Row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        
        {/* Mobile Brand & Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#71767B] hover:bg-[#16181C] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

          <div onClick={() => setActiveTab('feed')} className="flex items-center gap-1.5 cursor-pointer">
            <span className="w-7 h-7 rounded-lg bg-[#1D9BF0] text-black font-black flex items-center justify-center text-xs">
              𝕏
            </span>
            <span className="font-extrabold text-sm text-[#E7E9EA]">
              J1 Connect
            </span>
          </div>
        </div>

        {/* Current Active Title (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <h2 className="text-base font-extrabold text-[#E7E9EA] tracking-tight">
            {getTabTitle()}
          </h2>
        </div>

        {/* Search Input Box in X Dark Mode */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-[#71767B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-full bg-[#202327] hover:bg-[#202327]/80 focus:bg-[#000000] text-xs sm:text-sm text-[#E7E9EA] placeholder-[#71767B] border border-[#2F3336] focus:border-[#1D9BF0] focus:outline-none transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-[#71767B] hover:text-[#E7E9EA] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons: Language Toggle & Notifications & User */}
        <div className="flex items-center gap-2">
          
          {/* Top Header 3-Language Selector */}
          <div className="flex p-0.5 rounded-full bg-[#202327] border border-[#2F3336] text-[11px] font-bold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                  : 'text-[#71767B] hover:text-[#E7E9EA]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'ru'
                  ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                  : 'text-[#71767B] hover:text-[#E7E9EA]'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('kk')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'kk'
                  ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                  : 'text-[#71767B] hover:text-[#E7E9EA]'
              }`}
            >
              KK
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsToast(!showNotificationsToast)}
              className="p-2 rounded-full text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327] relative transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1D9BF0] ring-2 ring-[#000000]"></span>
            </button>

            {showNotificationsToast && (
              <div className="absolute right-0 mt-2 w-72 p-3 bg-[#16181C] rounded-2xl shadow-2xl border border-[#2F3336] z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#2F3336] mb-2">
                  <span className="font-extrabold text-xs text-[#E7E9EA]">Notifications</span>
                  <button onClick={() => setShowNotificationsToast(false)} className="text-[#71767B] hover:text-[#E7E9EA]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#202327] border border-[#2F3336] text-[#E7E9EA]">
                    <span className="font-bold text-[#1D9BF0] block">Morey's Piers Hiring</span>
                    New lifeguard positions posted for Wildwood, NJ ($16.50/hr).
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#202327] border border-[#2F3336] text-[#E7E9EA]">
                    <span className="font-bold text-[#00BA7C] block">Astana Visa Radar</span>
                    3 new interview slots opened for May 14.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Profile Trigger */}
          <button
            onClick={onOpenProfile}
            className="md:hidden p-0.5 rounded-full ring-2 ring-[#1D9BF0]/30 cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Hashtag Chips Bar */}
      <div className="px-4 pb-2.5 sm:px-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[11px] font-bold text-[#71767B] shrink-0 flex items-center gap-1">
          <Tag className="w-3 h-3 text-[#1D9BF0]" />
          <span>Trending:</span>
        </span>
        {quickHashtags.map((ht) => (
          <button
            key={ht}
            onClick={() => {
              if (onSelectTag) onSelectTag(ht);
              setSearchQuery(ht);
            }}
            className="px-3 py-0.5 rounded-full bg-[#202327] hover:bg-[#16181C] text-[#E7E9EA] hover:text-[#1D9BF0] font-bold text-[11px] border border-[#2F3336] transition-all shrink-0 cursor-pointer"
          >
            #{ht}
          </button>
        ))}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2F3336] bg-[#000000] p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('feed'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'feed' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            🏠 {t.navFeed}
          </button>
          <button
            onClick={() => { setActiveTab('spaces'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'spaces' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            👨‍👩‍👧‍👦 {language === 'en' ? 'Communities & Spaces' : 'Сообщества и Группы'}
          </button>
          <button
            onClick={() => { setActiveTab('map'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'map' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            🗺️ {t.navMap} (Clustered)
          </button>
          <button
            onClick={() => { setActiveTab('employer_hub'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'employer_hub' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            🏢 {t.navDirectory}
          </button>
          <button
            onClick={() => { setActiveTab('visa'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'visa' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            🎟️ {t.navVisa}
          </button>
          <button
            onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'analytics' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            🧮 {t.navRoi}
          </button>
          <button
            onClick={() => { setActiveTab('flight_market'); setMobileMenuOpen(false); }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs text-left ${activeTab === 'flight_market' ? 'bg-[#1D9BF0] text-white' : 'text-[#E7E9EA] hover:bg-[#16181C]'}`}
          >
            ✈️ {t.navFlightMarket}
          </button>
          <button
            onClick={() => { onOpenMessages(); setMobileMenuOpen(false); }}
            className="w-full p-2.5 rounded-xl font-bold text-xs text-left text-[#E7E9EA] hover:bg-[#16181C] flex items-center justify-between"
          >
            <span>💬 {t.navMessages}</span>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#1D9BF0] text-white text-[10px] font-black">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
