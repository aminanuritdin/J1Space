import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Flame, 
  Plus, 
  Check, 
  Sparkles, 
  Search, 
  Compass, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Pin,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SpaceGroup, User } from '../types';

interface SpacesViewProps {
  spaces: SpaceGroup[];
  currentUser: User;
  onToggleJoinSpace: (spaceId: string) => void;
  onViewSpaceFeed: (space: SpaceGroup) => void;
  onOpenChatWithRecruiter?: (recruiterUser: User, contextText: string) => void;
  searchQuery: string;
}

export const SpacesView: React.FC<SpacesViewProps> = ({
  spaces,
  currentUser,
  onToggleJoinSpace,
  onViewSpaceFeed,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cis_hub' | 'us_hub' | 'topic'>('all');

  const filteredSpaces = spaces.filter((sp) => {
    if (selectedCategory !== 'all' && sp.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sp.name.toLowerCase().includes(q);
      const matchDesc = sp.description.toLowerCase().includes(q);
      const matchLoc = sp.location?.toLowerCase().includes(q);
      const matchTag = sp.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchLoc && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6 bg-[#000000] text-[#E7E9EA]">
      
      {/* Banner Card in X Dark Theme */}
      <div className="p-6 rounded-3xl bg-[#16181C] border border-[#2F3336] shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-[#1D9BF0]/20 text-[#1D9BF0] border border-[#1D9BF0]/30 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                Communities & Spaces
              </span>
              <span className="text-xs text-[#71767B] font-semibold">
                ● J-1 2025/2026 Season
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#E7E9EA] tracking-tight">
              Student Communities & City Hubs
            </h2>
            <p className="text-xs sm:text-sm text-[#71767B] max-w-xl mt-1.5 leading-relaxed">
              Connect with fellow students departing from Almaty, Astana, or Tashkent, join resort town work crews (Ocean City, Wildwood, Wisconsin Dells), and get verified advice on tax exemptions and second jobs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3.5 py-2 rounded-2xl bg-[#202327] text-xs font-bold border border-[#2F3336] text-[#E7E9EA]">
              Joined: <strong className="text-[#1D9BF0]">{spaces.filter((s) => s.isJoined).length}</strong> spaces
            </span>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#2F3336]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                : 'bg-[#202327] text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            All Spaces ({spaces.length})
          </button>

          <button
            onClick={() => setSelectedCategory('cis_hub')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'cis_hub'
                ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                : 'bg-[#202327] text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            <span>🍎</span>
            <span>CIS Departure Hubs</span>
          </button>

          <button
            onClick={() => setSelectedCategory('us_hub')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'us_hub'
                ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                : 'bg-[#202327] text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            <span>🏖️</span>
            <span>US Work Crews</span>
          </button>

          <button
            onClick={() => setSelectedCategory('topic')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'topic'
                ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
                : 'bg-[#202327] text-[#71767B] hover:text-[#E7E9EA]'
            }`}
          >
            <span>💼</span>
            <span>Topic & Tax Desks</span>
          </button>
        </div>
      </div>

      {/* Grid of Spaces */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSpaces.map((space) => {
          return (
            <div
              key={space.id}
              className="rounded-3xl bg-[#16181C] border border-[#2F3336] shadow-sm hover:border-[#1D9BF0]/60 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Banner image with overlay */}
                <div className="h-32 w-full relative overflow-hidden bg-[#202327]">
                  <img
                    src={space.banner}
                    alt={space.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16181C] via-[#16181C]/40 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 w-11 h-11 rounded-2xl bg-[#16181C]/90 backdrop-blur-md border border-[#2F3336] flex items-center justify-center text-xl shadow-lg">
                    {space.icon}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#000000]/70 text-[#E7E9EA] border border-[#2F3336] backdrop-blur-xs">
                      {space.category === 'cis_hub' ? 'CIS Hub' : space.category === 'us_hub' ? 'US Work Hub' : 'Topic Space'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-base text-[#E7E9EA] group-hover:text-[#1D9BF0] transition-colors leading-snug">
                        {space.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#71767B] mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate">{space.location}</span>
                        <span>•</span>
                        <span className="font-bold text-[#E7E9EA]">{space.membersCount} members</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleJoinSpace(space.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all shrink-0 cursor-pointer ${
                        space.isJoined
                          ? 'bg-[#202327] text-[#71767B] hover:bg-rose-950/40 hover:text-rose-400 border border-[#2F3336]'
                          : 'bg-[#1D9BF0] hover:bg-sky-400 text-white shadow-xs'
                      }`}
                    >
                      {space.isJoined ? 'Joined ✓' : '+ Join Space'}
                    </button>
                  </div>

                  <p className="text-xs text-[#71767B] leading-relaxed">
                    {space.description}
                  </p>

                  {/* Pinned Admin Announcement if present */}
                  {space.pinnedAnnouncement && (
                    <div className="p-3 rounded-2xl bg-[#202327] border border-[#2F3336] space-y-1">
                      <div className="flex items-center gap-1.5 text-[#1D9BF0] font-black text-xs">
                        <Pin className="w-3.5 h-3.5 rotate-45" />
                        <span>Pinned Admin Notice</span>
                        <span className="text-[10px] text-[#71767B] font-normal ml-auto">
                          {space.pinnedAnnouncement.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#E7E9EA]">
                        {space.pinnedAnnouncement.title}
                      </h4>
                      <p className="text-[11px] text-[#71767B] leading-normal">
                        {space.pinnedAnnouncement.text}
                      </p>
                      <div className="text-[10px] text-slate-500 italic pt-0.5">
                        Posted by: {space.pinnedAnnouncement.authorName}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {space.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#202327] text-[#71767B] border border-[#2F3336]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-[#202327]/60 border-t border-[#2F3336] flex items-center justify-between">
                <span className="text-xs text-[#71767B] font-semibold">
                  {space.isJoined ? 'Active Member' : 'Public Space'}
                </span>

                <button
                  onClick={() => onViewSpaceFeed(space)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1D9BF0] hover:bg-sky-400 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Open Space Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
