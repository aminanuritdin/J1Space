import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Plus, 
  Search, 
  Flame, 
  ThumbsUp, 
  Phone, 
  CheckCircle2, 
  AlertTriangle,
  Building
} from 'lucide-react';
import { SecondJobPosting, User } from '../types';

interface SecondJobFinderViewProps {
  jobs: SecondJobPosting[];
  currentUser: User;
  onOpenCreate: () => void;
  onUpvoteJob: (jobId: string) => void;
  searchQuery: string;
  onSwitchToMap?: () => void;
}

export const SecondJobFinderView: React.FC<SecondJobFinderViewProps> = ({
  jobs,
  currentUser,
  onOpenCreate,
  onUpvoteJob,
  searchQuery,
  onSwitchToMap,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'urgent' | 'tips' | 'walkin'>('all');

  const filteredJobs = jobs.filter((job) => {
    if (filterMode === 'urgent' && job.urgency !== 'high') return false;
    if (filterMode === 'walkin' && !job.isWalkIn) return false;
    if (filterMode === 'tips' && !job.tipsEstimated?.toLowerCase().includes('cash') && !job.tipsEstimated?.toLowerCase().includes('tip')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchBiz = job.businessName.toLowerCase().includes(q);
      const matchCity = job.city.toLowerCase().includes(q);
      const matchState = job.state.toLowerCase().includes(q);
      if (!matchTitle && !matchBiz && !matchCity && !matchState) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 text-white shadow-lg shadow-purple-500/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-amber-300" />
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Second Job Board & Side Gigs
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl leading-relaxed">
              Open shifts and local gigs shared peer-to-peer by fellow J-1 students: evening restaurant bussing, morning prep shifts, night supermarket stocking, and cash tips!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onSwitchToMap && (
              <button
                onClick={onSwitchToMap}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                <span>🗺️</span>
                <span>View on Map</span>
              </button>
            )}

            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Post a Second Job</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            All Openings ({jobs.length})
          </button>

          <button
            onClick={() => setFilterMode('urgent')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterMode === 'urgent'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>🔥 Urgent Need</span>
          </button>

          <button
            onClick={() => setFilterMode('walkin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterMode === 'walkin'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>🚶 Walk-in Hiring</span>
          </button>

          <button
            onClick={() => setFilterMode('tips')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterMode === 'tips'
                ? 'bg-white text-violet-900 shadow-sm'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-300" />
            <span>💵 Direct Cash Tips</span>
          </button>
        </div>
      </div>

      {/* Grid of Job Postings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-violet-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      {job.title}
                    </span>
                    {job.urgency === 'high' && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{job.businessName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {job.city}, {job.state}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    ${job.hourlyWage.toFixed(2)}/hr
                  </div>
                  <span className="text-[10px] text-slate-400">{job.hoursPerWeek} hrs/wk</span>
                </div>
              </div>

              {/* Photo preview if attached */}
              {job.image && (
                <div className="mb-3 rounded-2xl overflow-hidden max-h-40 border border-slate-100 dark:border-slate-800">
                  <img src={job.image} alt={job.title} className="w-full h-40 object-cover" />
                </div>
              )}

              {/* Badges / Shift details */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850">
                <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">{job.shifts}</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <DollarSign className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{job.tipsEstimated || 'Standard pay'}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {job.description}
              </p>

              {/* Requirements */}
              <div className="mb-3 space-y-1">
                {job.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Contact Info & Upvote */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 min-w-0">
                <span className="font-semibold block text-slate-700 dark:text-slate-300 truncate">
                  Contact: {job.contactName}
                </span>
                <span className="text-[11px] truncate block">{job.contactMethod}</span>
              </div>

              <button
                onClick={() => onUpvoteJob(job.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  job.isUpvoted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{job.upvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
