import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Send, 
  Plus, 
  Compass, 
  Search, 
  MessageCircle, 
  Phone,
  Car,
  Home
} from 'lucide-react';
import { RoommatePost, User } from '../types';

interface RoommatesFinderViewProps {
  posts: RoommatePost[];
  currentUser: User;
  onOpenCreate: () => void;
  onApply: (postId: string) => void;
  searchQuery: string;
  onSwitchToMap?: () => void;
}

export const RoommatesFinderView: React.FC<RoommatesFinderViewProps> = ({
  posts,
  currentUser,
  onOpenCreate,
  onApply,
  searchQuery,
  onSwitchToMap,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'roommate' | 'travel_buddy'>('all');
  const [appliedPosts, setAppliedPosts] = useState<Record<string, boolean>>({});

  const handleApplyClick = (id: string, contactTelegram?: string) => {
    setAppliedPosts((prev) => ({ ...prev, [id]: true }));
    onApply(id);
  };

  const filteredPosts = posts.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCity = item.destinationCity.toLowerCase().includes(q);
      const matchState = item.destinationState.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCity && !matchState && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-rose-500/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Housing & Travel Buddy Finder
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-pink-100 max-w-xl leading-relaxed">
              Find reliable roommates to split high summer rent in resort towns, or organize a road trip team for the September travel month.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onSwitchToMap && (
              <button
                onClick={onSwitchToMap}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                <span>🗺️</span>
                <span>View on Map</span>
              </button>
            )}

            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-rose-600 font-extrabold text-xs sm:text-sm shadow-md hover:bg-pink-50 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create Listing</span>
            </button>
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            All Postings ({posts.length})
          </button>

          <button
            onClick={() => setFilterType('roommate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'roommate'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Apartments & Roommates ({posts.filter((p) => p.type === 'roommate').length})</span>
          </button>

          <button
            onClick={() => setFilterType('travel_buddy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'travel_buddy'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Travel Buddies & Roadtrips ({posts.filter((p) => p.type === 'travel_buddy').length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Postings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map((post) => {
          const isApplied = appliedPosts[post.id];
          return (
            <div
              key={post.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-pink-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500/20"
                    />
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {post.author.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        @{post.author.handle} • {post.author.badge}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      post.type === 'roommate'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {post.type === 'roommate' ? '🏠 Housing' : '🚗 Roadtrip'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Photo if available */}
                {post.image && (
                  <div className="mb-3 rounded-2xl overflow-hidden max-h-48 border border-slate-100 dark:border-slate-800">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  </div>
                )}

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{post.destinationCity}, {post.destinationState}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{post.dateRange}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold col-span-2">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span>Estimated budget: {post.budgetPerPerson}</span>
                  </div>
                </div>

                {/* Route stops if roadtrip */}
                {post.routeStops && post.routeStops.length > 0 && (
                  <div className="mb-3 p-2.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs">
                    <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">Planned Route:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {post.routeStops.join(' ➔ ')}
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleApplyClick(post.id, post.contactTelegram)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xs'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isApplied ? 'Application Sent ✓' : 'Join / Apply'}</span>
                </button>

                {post.contactPhone && (
                  <a
                    href={`tel:${post.contactPhone}`}
                    className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
