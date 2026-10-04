import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Star, 
  Plus, 
  Search, 
  Building2, 
  MapPin, 
  ThumbsUp, 
  AlertTriangle, 
  Home, 
  Clock, 
  DollarSign, 
  Award,
  Lock,
  ChevronDown
} from 'lucide-react';
import { EmployerReview, EmployerListType } from '../types';

interface EmployerReviewsViewProps {
  employers: EmployerReview[];
  onOpenAddReview: () => void;
  onVoteHelpful: (reviewId: string) => void;
  searchQuery: string;
}

export const EmployerReviewsView: React.FC<EmployerReviewsViewProps> = ({
  employers,
  onOpenAddReview,
  onVoteHelpful,
  searchQuery,
}) => {
  const [selectedList, setSelectedList] = useState<'all' | EmployerListType>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Extract unique states & industries
  const uniqueStates = Array.from(new Set(employers.map((e) => e.state))).sort();
  const uniqueIndustries = Array.from(new Set(employers.map((e) => e.industry))).sort();

  // Filter employers
  const filteredEmployers = employers.filter((emp) => {
    if (selectedList !== 'all' && emp.listType !== selectedList) return false;
    if (selectedIndustry !== 'all' && emp.industry !== selectedIndustry) return false;
    if (selectedState !== 'all' && emp.state !== selectedState) return false;

    const term = (searchQuery || localSearch).trim().toLowerCase();
    if (term) {
      const matchName = emp.companyName.toLowerCase().includes(term);
      const matchCity = emp.city.toLowerCase().includes(term);
      const matchState = emp.state.toLowerCase().includes(term);
      const matchTags = emp.tags.some((t) => t.toLowerCase().includes(term));
      const matchText = emp.reviewText.toLowerCase().includes(term);
      if (!matchName && !matchCity && !matchState && !matchTags && !matchText) return false;
    }

    return true;
  });

  const getListBadge = (type: EmployerListType) => {
    switch (type) {
      case 'white':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> WHITELIST (RECOMMENDED)
          </span>
        );
      case 'gray':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <ShieldAlert className="w-3.5 h-3.5" /> GRAYLIST (MIXED REVIEWS)
          </span>
        );
      case 'black':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <ShieldX className="w-3.5 h-3.5" /> BLACKLIST (UNSAFE / SCAM)
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white border-b border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                US Employer Reviews & Ratings Database
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Unfiltered, genuine reviews by real J-1 exchange students. Verify actual overtime hours, housing deposit refunds, hourly pay rates, and management culture before signing your contract.
            </p>
          </div>

          <button
            onClick={onOpenAddReview}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Quick Filter Counters */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5">
          <button
            onClick={() => setSelectedList('white')}
            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedList === 'white'
                ? 'bg-emerald-500/20 border-emerald-400 text-white'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Whitelist</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg sm:text-2xl font-black mt-1">
              {employers.filter((e) => e.listType === 'white').length} companies
            </div>
            <span className="text-[10px] text-slate-300 font-medium">Plentiful overtime & reliable housing</span>
          </button>

          <button
            onClick={() => setSelectedList('gray')}
            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedList === 'gray'
                ? 'bg-slate-500/30 border-slate-300 text-white'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase">Graylist</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg sm:text-2xl font-black mt-1">
              {employers.filter((e) => e.listType === 'gray').length} companies
            </div>
            <span className="text-[10px] text-slate-300 font-medium">Moderate or mixed experiences</span>
          </button>

          <button
            onClick={() => setSelectedList('black')}
            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedList === 'black'
                ? 'bg-rose-500/20 border-rose-400 text-white'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-400 uppercase">Blacklist</span>
              <ShieldX className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-lg sm:text-2xl font-black mt-1">
              {employers.filter((e) => e.listType === 'black').length} companies
            </div>
            <span className="text-[10px] text-rose-300 font-medium">Wage theft, deposit scams, cut hours</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name (Morey's, Xanterra, Kalahari, Cedar Point)..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* List switcher */}
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value as any)}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none focus:outline-none cursor-pointer"
          >
            <option value="all">All Lists</option>
            <option value="white">🟢 Whitelist</option>
            <option value="gray">⚪ Graylist</option>
            <option value="black">🔴 Blacklist</option>
          </select>

          {/* Industry switcher */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none focus:outline-none cursor-pointer"
          >
            <option value="all">All Industries</option>
            {uniqueIndustries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          {/* State switcher */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none focus:outline-none cursor-pointer"
          >
            <option value="all">All States</option>
            {uniqueStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {(selectedList !== 'all' || selectedIndustry !== 'all' || selectedState !== 'all' || localSearch) && (
            <button
              onClick={() => {
                setSelectedList('all');
                setSelectedIndustry('all');
                setSelectedState('all');
                setLocalSearch('');
              }}
              className="text-xs text-rose-500 hover:underline font-bold px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        {filteredEmployers.length > 0 ? (
          filteredEmployers.map((emp) => (
            <div
              key={emp.id}
              className={`p-5 rounded-3xl border transition-all ${
                emp.listType === 'black'
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                  : emp.listType === 'white'
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              {/* Header: Company & Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-black text-lg text-slate-900 dark:text-white">
                      {emp.companyName}
                    </h3>
                    {getListBadge(emp.listType)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {emp.city}, {emp.state}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{emp.industry}</span>
                  </div>
                </div>

                {/* Overall Rating Score */}
                <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-2xl">
                  <div className="flex items-center gap-0.5 text-amber-500 font-black text-base">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{emp.overallRating.toFixed(1)}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">/ 5.0</span>
                </div>
              </div>

              {/* Sub-ratings Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 text-xs">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-semibold">Housing Condition:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ⭐ {emp.ratings.housing} / 5.0
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">${emp.housingCostWeekly}/wk</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-semibold">Overtime Access:</span>
                  <span className={`font-bold ${emp.hasOvertime ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                    {emp.hasOvertime ? `✅ Yes (${emp.ratings.overtime}/5)` : '❌ None'}
                  </span>
                  {emp.overtimeRate && (
                    <span className="text-[10px] text-slate-500">${emp.overtimeRate}/hr (1.5x)</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-semibold">Hourly Base Pay:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ${emp.hourlyWage}/hr
                  </span>
                  <span className="text-[10px] text-slate-500">Rating: {emp.ratings.payRate}/5</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-semibold">Management Quality:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ⭐ {emp.ratings.management} / 5.0
                  </span>
                  <span className="text-[10px] text-slate-500">Fair treatment</span>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                  <span className="font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-1">
                    👍 Pros:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {emp.pros}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                  <span className="font-black text-rose-700 dark:text-rose-400 flex items-center gap-1 mb-1">
                    👎 Cons / Cautions:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {emp.cons}
                  </p>
                </div>
              </div>

              {/* Detailed Student Commentary */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 italic">
                "{emp.reviewText}"
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {emp.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Footer: Author & Helpful Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {emp.isAnonymous ? 'Anonymous Student' : emp.author.name}
                  </span>
                  <span>•</span>
                  <span>{emp.createdAt}</span>
                </div>

                <button
                  onClick={() => onVoteHelpful(emp.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    emp.isHelpful
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({emp.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400">
            No reviews match the selected filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
