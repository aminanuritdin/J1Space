import React, { useState } from 'react';
import { 
  Home, 
  Map, 
  Building2, 
  Users,
  MessageSquare, 
  Compass, 
  Calculator, 
  Plane, 
  PlusCircle, 
  ChevronDown, 
  Sparkles, 
  Globe, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

export type TabType = 
  | 'feed' 
  | 'spaces'
  | 'map' 
  | 'employer_hub' 
  | 'visa' 
  | 'analytics' 
  | 'flight_market'
  | 'employers' 
  | 'roommates' 
  | 'second_job' 
  | 'tax_guide';

interface SidebarNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentUser: User;
  onOpenCreatePost: () => void;
  onOpenProfile: () => void;
  onOpenMessages: () => void;
  unreadMessagesCount: number;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenCreatePost,
  onOpenProfile,
  onOpenMessages,
  unreadMessagesCount,
  language,
  setLanguage,
}) => {
  const [toolsOpen, setToolsOpen] = useState(true);
  const t = TRANSLATIONS[language];

  const mainNavItems = [
    {
      id: 'feed' as TabType,
      label: t.navFeed,
      icon: Home,
      badge: 'Live',
    },
    {
      id: 'spaces' as TabType,
      label: language === 'en' ? 'Communities & Spaces' : language === 'ru' ? 'Сообщества и Группы' : 'Қоғамдастықтар',
      icon: Users,
      badge: 'Hubs',
    },
    {
      id: 'map' as TabType,
      label: t.navMap,
      icon: Map,
      badge: 'Cluster GPS',
    },
    {
      id: 'employer_hub' as TabType,
      label: t.navDirectory,
      icon: Building2,
      badge: 'CIS & US',
    },
  ];

  const studentToolItems = [
    {
      id: 'visa' as TabType,
      label: t.navVisa,
      icon: Compass,
      sublabel: 'Astana / Almaty / Tashkent',
    },
    {
      id: 'analytics' as TabType,
      label: t.navRoi,
      icon: Calculator,
      sublabel: 'Overtime & FICA 7.65%',
    },
    {
      id: 'flight_market' as TabType,
      label: t.navFlightMarket,
      icon: Plane,
      sublabel: 'ALA/TAS -> JFK & Flea Market',
    },
  ];

  return (
    <aside className="w-64 xl:w-72 hidden md:flex flex-col justify-between p-4 border-r border-[#2F3336] bg-[#000000] text-[#E7E9EA] h-screen sticky top-0 overflow-y-auto no-scrollbar z-20">
      
      {/* 1. Header: Brand Logo & 3-Language Selector */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 px-1">
          <div 
            onClick={() => setActiveTab('feed')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#1D9BF0] flex items-center justify-center text-white shadow-lg shadow-[#1D9BF0]/20 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl tracking-wider text-black">𝕏</span>
            </div>
            <div>
              <h1 className="font-black text-lg text-[#E7E9EA] leading-none tracking-tight">
                J1 Connect
              </h1>
              <span className="text-[10px] font-bold text-[#71767B] block mt-0.5">
                CIS to USA Work & Travel
              </span>
            </div>
          </div>
        </div>

        {/* 3-Language Switcher (EN | RU | KK) */}
        <div className="p-1 rounded-xl bg-[#16181C] border border-[#2F3336] mb-5 flex items-center justify-between text-xs font-bold">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              language === 'en'
                ? 'bg-[#1D9BF0] text-white font-black shadow-xs'
                : 'text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ru')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              language === 'ru'
                ? 'bg-[#1D9BF0] text-white font-black shadow-xs'
                : 'text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLanguage('kk')}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              language === 'kk'
                ? 'bg-[#1D9BF0] text-white font-black shadow-xs'
                : 'text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            KK
          </button>
        </div>

        {/* 2. Primary Navigation List (5 Core Items) */}
        <div className="space-y-1 mb-5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#16181C] text-[#E7E9EA] border border-[#2F3336] shadow-sm'
                    : 'text-[#E7E9EA] hover:bg-[#16181C] hover:text-[#1D9BF0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1D9BF0]' : 'text-[#71767B]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-[#1D9BF0]/20 text-[#1D9BF0]'
                        : 'bg-[#202327] text-[#71767B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Direct Messages Button with Automated Document Blur Indicator */}
          <button
            onClick={onOpenMessages}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#E7E9EA] hover:bg-[#16181C] hover:text-[#1D9BF0] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-[#71767B] shrink-0" />
              <span>{t.navMessages}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-[#00BA7C] font-extrabold flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" />
                <span>Blur</span>
              </span>
              {unreadMessagesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#1D9BF0] text-white text-[10px] font-black">
                  {unreadMessagesCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* 3. Grouped Student Toolkit (Dropdown / Accordion) */}
        <div className="pt-3 border-t border-[#2F3336] mb-5">
          <div
            onClick={() => setToolsOpen(!toolsOpen)}
            className="flex items-center justify-between px-2 py-1 text-[11px] font-black text-[#71767B] uppercase tracking-wider cursor-pointer hover:text-[#E7E9EA] select-none mb-1"
          >
            <span>{t.studentToolsTitle}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {toolsOpen && (
            <div className="space-y-1 mt-1">
              {studentToolItems.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#16181C] text-[#1D9BF0] border border-[#2F3336] font-extrabold shadow-xs'
                        : 'text-[#71767B] hover:bg-[#16181C] hover:text-[#E7E9EA] font-semibold'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1D9BF0]' : 'text-[#71767B]'}`} />
                    <div className="min-w-0">
                      <span className="text-xs block leading-tight truncate">{tool.label}</span>
                      <span className="text-[10px] text-[#71767B] block truncate">{tool.sublabel}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. CTA Button: High-visibility "+ Post Update" button */}
        <button
          onClick={onOpenCreatePost}
          className="w-full py-3 px-4 rounded-full bg-[#1D9BF0] hover:bg-sky-400 text-white font-extrabold text-sm shadow-lg shadow-[#1D9BF0]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>{t.postUpdate}</span>
        </button>
      </div>

      {/* 5. User Profile Mini Card at Bottom */}
      <div className="pt-4 border-t border-[#2F3336]">
        <div
          onClick={onOpenProfile}
          className="p-2 rounded-2xl hover:bg-[#16181C] transition-colors flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1D9BF0]/30"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00BA7C] ring-2 ring-[#000000]"></span>
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-xs text-[#E7E9EA] truncate group-hover:text-[#1D9BF0] transition-colors flex items-center gap-1">
                <span>{currentUser.name}</span>
                {currentUser.isVerified && (
                  <CheckCircle2 className="w-3 h-3 text-[#1D9BF0] shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-[#71767B] truncate block">
                @{currentUser.handle} • {currentUser.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
