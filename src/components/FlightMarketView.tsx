import React, { useState } from 'react';
import { 
  Plane, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  Users, 
  Send, 
  Plus, 
  Search, 
  Tag, 
  CheckCircle2, 
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { FlightBuddy, MarketItem, User, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FlightMarketViewProps {
  flightBuddies: FlightBuddy[];
  marketItems: MarketItem[];
  currentUser: User;
  language: Language;
  onOpenCreateBuddy?: () => void;
}

export const FlightMarketView: React.FC<FlightMarketViewProps> = ({
  flightBuddies,
  marketItems,
  currentUser,
  language,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'buddies' | 'market'>('buddies');
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  const filteredBuddies = flightBuddies.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.departureCity.toLowerCase().includes(q) ||
      b.arrivalCity.toLowerCase().includes(q) ||
      b.airline.toLowerCase().includes(q) ||
      b.notes.toLowerCase().includes(q)
    );
  });

  const filteredMarket = marketItems.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-white min-h-screen">
      {/* Top Banner with Clean Light Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                <Plane className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {language === 'en' ? 'Flight Buddy & Student Flea Market' : language === 'ru' ? 'Попутчики на рейс и Студенческая Барахолка' : 'Бірге ұшу & Студенттер жәрмеңкесі'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed mt-1">
              {language === 'en'
                ? 'Find fellow students flying from Almaty, Astana, or Tashkent to the US, split airport transit to resort towns, or buy bikes and essentials from returning alumni.'
                : language === 'ru'
                ? 'Найдите попутчиков на рейсы из Алматы, Астаны или Ташкента в США, разделите трансфер до курортов или купите велосипеды и форму у выпускников.'
                : 'Алматы, Астана немесе Ташкенттен АҚШ-қа бірге ұшатын студенттерді табыңыз, трансфер шығынын бөлісіңіз немесе түлектерден велосипед пен қажетті заттар сатып алыңыз.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveSubTab('buddies')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === 'buddies'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Flight Buddies' : language === 'ru' ? 'Попутчики' : 'Бірге ұшу'}</span>
              </button>
              <button
                onClick={() => setActiveSubTab('market')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === 'market'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Flea Market' : language === 'ru' ? 'Барахолка' : 'Жәрмеңке'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeSubTab === 'buddies' ? 'Search airports (ALA, TAS, JFK, ORD)...' : 'Search bikes, SIM cards, uniforms...'}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
          />
        </div>
      </div>

      {/* Buddies Tab Content */}
      {activeSubTab === 'buddies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>{filteredBuddies.length} {language === 'en' ? 'Upcoming Flights & Groups' : language === 'ru' ? 'Запланированных рейсов' : 'Жоспарланған рейстер'}</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified J-1 Students
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBuddies.map((buddy) => (
              <div
                key={buddy.id}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={buddy.author.avatar}
                        alt={buddy.author.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                          <span>{buddy.author.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                            {buddy.author.badge}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {buddy.author.agencyName || buddy.author.sponsor}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                      {buddy.status === 'booked' ? 'Tickets Booked' : 'Searching'}
                    </span>
                  </div>

                  {/* Flight Route Card */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 mb-3 space-y-2">
                    <div className="flex items-center justify-between font-black text-slate-900 text-sm">
                      <div className="text-blue-600">{buddy.departureCity}</div>
                      <div className="text-slate-400 font-normal">➔</div>
                      <div className="text-emerald-600">{buddy.arrivalCity}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{buddy.flightDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Plane className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{buddy.airline}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {buddy.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Contact: <strong className="text-slate-800">{buddy.contactTelegram}</strong>
                  </span>
                  <a
                    href={`https://t.me/${buddy.contactTelegram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Tab Content */}
      {activeSubTab === 'market' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>{filteredMarket.length} {language === 'en' ? 'Items for Sale' : language === 'ru' ? 'Объявлений о продаже' : 'Сатуға қойылған заттар'}</span>
            <span className="text-blue-600">Alumni Verified Items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredMarket.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between overflow-hidden"
              >
                {item.image && (
                  <div className="h-44 w-full bg-slate-200 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-xs font-black backdrop-blur-xs">
                      ${item.price}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 text-slate-800 text-[10px] font-bold">
                      {item.condition}
                    </span>
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      Seller: <strong>{item.author.name}</strong>
                    </div>
                    <a
                      href={`https://t.me/${item.contactTelegram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>Buy / Message</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
