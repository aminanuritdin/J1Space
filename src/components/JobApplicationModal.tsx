import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, Calendar, DollarSign, Home, Building2, UserCheck } from 'lucide-react';
import { HiringAnnouncement, User } from '../types';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: HiringAnnouncement | null;
  currentUser: User;
  onApplySubmit: (announcementId: string, details: any) => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  announcement,
  currentUser,
  onApplySubmit,
}) => {
  const [englishLevel, setEnglishLevel] = useState<'Intermediate (B1)' | 'Upper-Intermediate (B2)' | 'Advanced (C1)' | 'Elementary (A2)'>('Intermediate (B1)');
  const [availableFrom, setAvailableFrom] = useState('2025-05-25');
  const [availableTo, setAvailableTo] = useState('2025-09-15');
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !announcement) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySubmit(announcement.id, {
      englishLevel,
      availableFrom,
      availableTo,
      coverNote,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src={announcement.employerLogo}
              alt={announcement.employerName}
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/30"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {announcement.employerName}
                </span>
                {announcement.isVerified && (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
                  </span>
                )}
              </div>
              <h3 className="font-bold text-xs text-sky-600 dark:text-sky-400 mt-0.5">
                {announcement.title}
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-10 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-black text-lg text-slate-900 dark:text-white">
              Application Submitted Successfully!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              The international recruiting team at {announcement.employerName} has received your profile and will review your application within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
            
            {/* Vacancy Summary Card */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Hourly Wage:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  ${announcement.hourlyWage.toFixed(2)}/hr (Overtime: ${announcement.overtimeWage.toFixed(2)}/hr)
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">Housing:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {announcement.housingProvided ? `Provided by employer ($${announcement.housingWeeklyRent}/wk)` : 'Self-arranged'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">Contract Window:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {announcement.dates}
                </span>
              </div>
            </div>

            {/* Applicant details */}
            <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/40"
              />
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {currentUser.name} ({currentUser.badge})
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.university || 'Full-time University Student'} • {currentUser.homeCountry}
                </div>
              </div>
            </div>

            {/* English Level */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Your English Proficiency:
              </label>
              <select
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-none focus:outline-none"
              >
                <option value="Elementary (A2)">Elementary (A2) – Basic, best for kitchen / housekeeping</option>
                <option value="Intermediate (B1)">Intermediate (B1) – Conversational, ride operator / lifeguard</option>
                <option value="Upper-Intermediate (B2)">Upper-Intermediate (B2) – Fluent, front desk / server</option>
                <option value="Advanced (C1)">Advanced (C1) – Native / exceptional professional fluency</option>
              </select>
            </div>

            {/* Dates Available */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Available to start in USA:
                </label>
                <input
                  type="date"
                  required
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Contract end date:
                </label>
                <input
                  type="date"
                  required
                  value={availableTo}
                  onChange={(e) => setAvailableTo(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-medium"
                />
              </div>
            </div>

            {/* Short note to recruiter */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Cover Note to Recruiter:
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Hi! I am a full-time university student very excited to join your team this summer. I have great energy, punctual work habits, and look forward to contributing..."
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white resize-none border-none focus:outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Application</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
