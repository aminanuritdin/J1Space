import React, { useState } from 'react';
import { 
  TrendingUp, 
  Compass, 
  ShieldAlert, 
  DollarSign, 
  ChevronRight, 
  Phone, 
  AlertTriangle,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Calculator,
  Users
} from 'lucide-react';
import { VisaEmbassySlot, Language } from '../types';
import { TabType } from './SidebarNav';
import { TRANSLATIONS } from '../i18n/translations';

interface RightWidgetPanelProps {
  trendingTags: { tag: string; count: number }[];
  onSelectTag: (tag: string) => void;
  visaSlots: VisaEmbassySlot[];
  onNavigate: (tab: TabType) => void;
  language: Language;
}

export const RightWidgetPanel: React.FC<RightWidgetPanelProps> = ({
  trendingTags,
  onSelectTag,
  visaSlots,
  onNavigate,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Currency Converter State
  const [usdAmount, setUsdAmount] = useState<number>(16.5);
  const [targetCurrency, setTargetCurrency] = useState<'KZT' | 'UZS' | 'EUR'>('KZT');

  // Realistic exchange rates (CIS context)
  const rates = {
    KZT: 495, // 1 USD = 495 KZT
    UZS: 12850, // 1 USD = 12,850 UZS
    EUR: 0.92, // 1 USD = 0.92 EUR
  };

  const convertedValue = Math.round(usdAmount * rates[targetCurrency]);

  const topLocations = [
    { name: 'Wildwood & Cape May, NJ', tag: 'WildwoodNJ', jobs: 'Lifeguard, Ride Op', wage: '$16.50/hr' },
    { name: 'Wisconsin Dells, WI', tag: 'WisconsinDells', jobs: 'Waterpark, Cook', wage: '$16.00/hr' },
    { name: 'Yellowstone Nat Park, WY', tag: 'Yellowstone', jobs: 'Hospitality, Kitchen', wage: '$15.50/hr' },
    { name: 'Ocean City, MD', tag: 'OceanCityMD', jobs: 'Boardwalk, Food Prep', wage: '$16.25/hr' },
  ];

  return (
    <aside className="w-80 xl:w-88 hidden lg:flex flex-col gap-4 p-4 border-l border-[#2F3336] bg-[#000000] text-[#E7E9EA] h-screen sticky top-0 overflow-y-auto no-scrollbar">
      
      {/* WIDGET 1: EMBASSY VISA RADAR (Real-time appointment slots in CIS) */}
      <div className="p-4 rounded-3xl bg-[#16181C] border border-[#2F3336] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#1D9BF0]/20 text-[#1D9BF0]">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-[#E7E9EA] leading-none">
                {t.visaRadarTitle}
              </h3>
              <span className="text-[10px] text-[#71767B] font-medium">
                {language === 'en' ? 'Live CIS Appointments' : language === 'ru' ? 'Слоты в посольствах СНГ' : 'ТМД елшілік күндері'}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('visa')}
            className="text-[11px] font-bold text-[#1D9BF0] hover:underline cursor-pointer"
          >
            {t.viewAllSlots}
          </button>
        </div>

        <div className="space-y-2">
          {visaSlots.slice(0, 4).map((slot) => (
            <div
              key={slot.id}
              onClick={() => onNavigate('visa')}
              className="p-2.5 rounded-2xl bg-[#202327] border border-[#2F3336] hover:border-[#1D9BF0] transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl">{slot.flag}</span>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#E7E9EA] truncate flex items-center gap-1.5">
                    <span>{slot.city}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                      slot.status === 'open' 
                        ? 'bg-[#00BA7C]/20 text-[#00BA7C] border border-[#00BA7C]/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {slot.status === 'open' ? 'OPEN' : 'LIMITED'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#71767B] font-medium">
                    {t.nextSlot} <strong className="text-[#E7E9EA]">{slot.nextAvailableDate}</strong>
                  </div>
                </div>
              </div>

              <div className="text-right pl-2 shrink-0">
                <span className="text-xs font-black text-[#00BA7C]">
                  {slot.avgApprovalRate}%
                </span>
                <span className="text-[9px] text-[#71767B] block font-semibold">{t.approvalRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WIDGET 2: TRENDING HASHTAGS & SPACES */}
      <div className="p-4 rounded-3xl bg-[#16181C] border border-[#2F3336] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#1D9BF0]/20 text-[#1D9BF0]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-sm text-[#E7E9EA]">
              {t.trendingTagsTitle}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('spaces')}
            className="text-[11px] font-bold text-[#1D9BF0] hover:underline cursor-pointer flex items-center gap-1"
          >
            <Users className="w-3 h-3" />
            <span>Spaces</span>
          </button>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {trendingTags.slice(0, 6).map((item) => (
            <button
              key={item.tag}
              onClick={() => onSelectTag(item.tag)}
              className="px-2.5 py-1 rounded-full bg-[#202327] hover:bg-[#1D9BF0]/20 border border-[#2F3336] text-xs font-bold text-[#E7E9EA] hover:text-[#1D9BF0] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>#{item.tag}</span>
              <span className="text-[10px] text-[#71767B] font-semibold">{item.count}</span>
            </button>
          ))}
        </div>

        {/* Popular locations list */}
        <div className="pt-2 border-t border-[#2F3336] space-y-1.5">
          <span className="text-[11px] font-black text-[#71767B] uppercase tracking-wider block mb-1">
            {t.popularLocationsTitle}
          </span>
          {topLocations.map((loc) => (
            <div
              key={loc.tag}
              onClick={() => onSelectTag(loc.tag)}
              className="p-2 rounded-xl bg-[#202327] border border-[#2F3336] hover:border-[#1D9BF0] flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="min-w-0 pr-1">
                <span className="font-bold text-xs text-[#E7E9EA] block truncate">
                  {loc.name}
                </span>
                <span className="text-[10px] text-[#71767B] block truncate">
                  {loc.jobs}
                </span>
              </div>
              <span className="text-[11px] font-black text-[#00BA7C] shrink-0">
                {loc.wage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WIDGET 3: CURRENCY CONVERTER (Real-time USD to KZT / UZS / EUR) */}
      <div className="p-4 rounded-3xl bg-[#16181C] border border-[#2F3336] shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-500/20 text-[#00BA7C]">
              <DollarSign className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-[#E7E9EA] leading-tight">
                {t.currencyConverterTitle}
              </h3>
              <span className="text-[10px] text-[#71767B] font-medium">
                1 USD ≈ {rates[targetCurrency].toLocaleString()} {targetCurrency}
              </span>
            </div>
          </div>
        </div>

        {/* Currency Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#202327] border border-[#2F3336] mb-3 text-xs font-bold text-center">
          <button
            onClick={() => setTargetCurrency('KZT')}
            className={`py-1 rounded-lg transition-all cursor-pointer ${
              targetCurrency === 'KZT' ? 'bg-[#1D9BF0] text-white font-black' : 'text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            🇰🇿 KZT
          </button>
          <button
            onClick={() => setTargetCurrency('UZS')}
            className={`py-1 rounded-lg transition-all cursor-pointer ${
              targetCurrency === 'UZS' ? 'bg-[#1D9BF0] text-white font-black' : 'text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            🇺🇿 UZS
          </button>
          <button
            onClick={() => setTargetCurrency('EUR')}
            className={`py-1 rounded-lg transition-all cursor-pointer ${
              targetCurrency === 'EUR' ? 'bg-[#1D9BF0] text-white font-black' : 'text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            🇪🇺 EUR
          </button>
        </div>

        {/* Interactive Converter Input & Result */}
        <div className="p-3 rounded-2xl bg-[#202327] border border-[#2F3336] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#71767B]">US Pay / Hourly Rate:</span>
            <div className="flex items-center gap-1">
              <span className="text-[#71767B] font-bold">$</span>
              <input
                type="number"
                step="0.5"
                value={usdAmount}
                onChange={(e) => setUsdAmount(Math.max(1, Number(e.target.value)))}
                className="w-16 px-2 py-0.5 rounded-lg bg-[#000000] border border-[#2F3336] text-right font-black text-[#E7E9EA] text-sm focus:outline-none focus:border-[#1D9BF0]"
              />
              <span className="text-[10px] text-[#71767B] font-bold">/hr</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#2F3336] flex items-center justify-between">
            <span className="text-xs text-[#E7E9EA] font-bold">
              {t.hourlyRateIn} {targetCurrency}:
            </span>
            <span className="text-base font-black text-[#00BA7C]">
              ≈ {convertedValue.toLocaleString()} {targetCurrency === 'KZT' ? '₸' : targetCurrency === 'UZS' ? 'soʻm' : '€'}
            </span>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <button
            onClick={() => setUsdAmount(16.5)}
            className="flex-1 py-1 px-1.5 text-[10px] font-bold rounded-lg bg-[#202327] border border-[#2F3336] text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C] cursor-pointer text-center"
          >
            $16.5 Base
          </button>
          <button
            onClick={() => setUsdAmount(24.75)}
            className="flex-1 py-1 px-1.5 text-[10px] font-bold rounded-lg bg-[#202327] border border-[#2F3336] text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C] cursor-pointer text-center"
          >
            $24.75 OT
          </button>
          <button
            onClick={() => onNavigate('analytics')}
            className="py-1 px-2.5 text-[10px] font-black rounded-lg bg-[#1D9BF0] hover:bg-sky-400 text-white cursor-pointer flex items-center gap-0.5"
          >
            <Calculator className="w-3 h-3" />
            <span>ROI</span>
          </button>
        </div>
      </div>

      {/* WIDGET 4: SCAM ALERT & EMERGENCY SOS CONTACTS */}
      <div className="p-4 rounded-3xl bg-[#16181C] border border-rose-500/30 shadow-md">
        <div className="flex items-center gap-2 mb-2 text-rose-400">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <h3 className="font-extrabold text-sm text-[#E7E9EA]">
            {t.sosTitle}
          </h3>
        </div>

        <p className="text-[11px] text-[#71767B] leading-snug mb-3 font-medium">
          {t.scamWarning}
        </p>

        <div className="p-2.5 rounded-2xl bg-[#202327] border border-[#2F3336] space-y-1.5 mb-2.5">
          <div className="text-[10px] font-bold text-[#71767B] uppercase tracking-wider">
            {t.emergencyHotline}
          </div>
          <div className="flex items-center justify-between font-black text-xs text-[#E7E9EA]">
            <span>+1 (866) 283-9090</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-extrabold border border-rose-500/30">
              24/7 TOLL-FREE
            </span>
          </div>
          <div className="text-[10px] text-[#71767B]">
            Official US Department of State Exchange Visitor Emergency Hotline
          </div>
        </div>

        <a
          href="tel:+18662839090"
          className="w-full py-2 px-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{t.callNow}</span>
        </a>
      </div>
    </aside>
  );
};
