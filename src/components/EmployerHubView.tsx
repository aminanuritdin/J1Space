import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Send, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Home, 
  Clock, 
  ExternalLink, 
  MessageSquare, 
  Users, 
  Sparkles, 
  Flame, 
  Search, 
  Filter, 
  Check,
  Phone,
  Mail,
  GraduationCap,
  Globe,
  Award,
  ChevronRight
} from 'lucide-react';
import { EmployerProfile, HiringAnnouncement, AgencyProfile, User } from '../types';
import { JobApplicationModal } from './JobApplicationModal';

interface EmployerHubViewProps {
  employers: EmployerProfile[];
  announcements: HiringAnnouncement[];
  agencies: AgencyProfile[];
  currentUser: User;
  onApplyToJob: (announcementId: string, details: any) => void;
  onFollowEmployer: (employerId: string) => void;
  onOpenChatWithRecruiter: (recruiterUser: User, contextText: string) => void;
  searchQuery: string;
}

export const EmployerHubView: React.FC<EmployerHubViewProps> = ({
  employers,
  announcements,
  agencies,
  currentUser,
  onApplyToJob,
  onFollowEmployer,
  onOpenChatWithRecruiter,
  searchQuery,
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'companies' | 'agencies'>('announcements');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<HiringAnnouncement | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Filter announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    if (selectedIndustry !== 'all' && ann.industry !== selectedIndustry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ann.title.toLowerCase().includes(q);
      const matchEmp = ann.employerName.toLowerCase().includes(q);
      const matchCity = ann.city.toLowerCase().includes(q);
      const matchDesc = ann.description.toLowerCase().includes(q);
      if (!matchTitle && !matchEmp && !matchCity && !matchDesc) return false;
    }
    return true;
  });

  // Filter companies
  const filteredCompanies = employers.filter((emp) => {
    if (selectedIndustry !== 'all' && emp.industry !== selectedIndustry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = emp.name.toLowerCase().includes(q);
      const matchCity = emp.city.toLowerCase().includes(q);
      const matchDesc = emp.description.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchDesc) return false;
    }
    return true;
  });

  // Filter agencies
  const filteredAgencies = agencies.filter((agency) => {
    if (selectedCountry !== 'all' && agency.country !== selectedCountry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = agency.name.toLowerCase().includes(q);
      const matchCity = agency.city.toLowerCase().includes(q);
      const matchCountry = agency.country.toLowerCase().includes(q);
      const matchDesc = agency.description.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchCountry && !matchDesc) return false;
    }
    return true;
  });

  const handleApplyClick = (ann: HiringAnnouncement) => {
    setSelectedAnnouncement(ann);
    setIsApplyModalOpen(true);
  };

  const handleRecruiterChat = (ann: HiringAnnouncement) => {
    const empProfile = employers.find((e) => e.id === ann.employerId);
    const recruiterUser: User = {
      id: `recruiter_${ann.employerId}`,
      name: empProfile?.recruiterName || `${ann.employerName} HR`,
      handle: `${ann.employerId}_recruiter`,
      avatar: empProfile?.recruiterAvatar || ann.employerLogo,
      badge: 'Alumni',
      homeCountry: 'USA',
      location: `${ann.city}, ${ann.state}`,
      sponsor: ann.employerName,
      isVerified: true,
      joinedDate: 'Official Recruiter',
    };

    onOpenChatWithRecruiter(
      recruiterUser,
      `Hello! I am a J-1 participant interested in the position: "${ann.title}" at ${ann.employerName}. Could you please confirm if contract dates are still open for application?`
    );
  };

  const handleAgencyChat = (agency: AgencyProfile) => {
    const agencyRepUser: User = {
      id: `rep_${agency.id}`,
      name: agency.representativeName,
      handle: `${agency.id}_advisor`,
      avatar: agency.representativeAvatar,
      badge: 'Agency Rep',
      homeCountry: agency.country,
      location: `${agency.city}, ${agency.country}`,
      sponsor: agency.accreditedSponsors[0] || 'Designated Sponsor',
      agencyName: agency.name,
      isVerified: true,
      joinedDate: 'Official Representative',
    };

    onOpenChatWithRecruiter(
      agencyRepUser,
      `Hello ${agency.representativeName}! I am interested in applying through ${agency.name} for the upcoming J-1 season. Could I receive more details regarding DS-2019 issuance and your partner job offers?`
    );
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-56 h-56 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Partners Hub
              </span>
              <span className="text-xs text-sky-200 font-medium">
                ● Direct US Hiring & Accredited DS-2019 Agencies
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Employers & Agencies Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mt-1.5 leading-relaxed">
              Explore official US employers, direct summer hiring bulletins, and verified regional recruitment agencies across Central Asia and Europe for DS-2019 processing and visa prep.
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'announcements'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Job Alerts ({announcements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'companies'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>US Employers ({employers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('agencies')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'agencies'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Agencies ({agencies.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        {activeTab !== 'agencies' ? (
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/15">
            <span className="text-xs font-bold text-slate-300 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-sky-400" /> Industry:
            </span>
            {['all', 'Amusement Park', 'Hospitality', 'National Park', 'Official Sponsor'].map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedIndustry === ind
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {ind === 'all'
                  ? 'All Sectors'
                  : ind === 'Amusement Park'
                  ? '🎡 Water & Theme Parks'
                  : ind === 'Hospitality'
                  ? '🏨 Resorts & Hotels'
                  : ind === 'National Park'
                  ? '🐻 National Parks'
                  : '🇺🇸 Official Sponsors'}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/15">
            <span className="text-xs font-bold text-slate-300 mr-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Country:
            </span>
            {['all', 'Kazakhstan', 'Uzbekistan', 'Poland'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCountry === c
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {c === 'all' ? 'All Partner Countries' : c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: HIRING ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>Open Seasonal Positions</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {filteredAnnouncements.length} Verified Offers
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-sky-500/50 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Employer Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={ann.employerLogo}
                        alt={ann.employerName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                            {ann.employerName}
                          </span>
                          {ann.isVerified && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            {ann.city}, {ann.state}
                          </span>
                          <span>•</span>
                          <span>{ann.postedDate}</span>
                        </div>
                      </div>
                    </div>

                    {ann.isUrgent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1 shrink-0 animate-pulse">
                        <Flame className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-black text-base text-slate-900 dark:text-white mb-2.5 leading-snug">
                    {ann.title}
                  </h4>

                  {/* Highlight Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Wage & Overtime:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        ${ann.hourlyWage.toFixed(2)}/hr
                      </span>
                      <span className="text-[10px] text-slate-500 ml-1">
                        (OT: ${ann.overtimeWage.toFixed(2)})
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Housing:</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">
                        {ann.housingProvided ? `$${ann.housingWeeklyRent}/wk` : 'Self-arranged'}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {ann.housingDescription}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 line-clamp-3">
                    {ann.description}
                  </p>

                  {/* Contract Dates & Open Count */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      {ann.dates}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-teal-500" />
                      {ann.openPositionsCount} spots open ({ann.applicantsCount} applied)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleApplyClick(ann)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </button>

                  <button
                    onClick={() => handleRecruiterChat(ann)}
                    title="Send direct message to recruiter"
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-sky-500" />
                    <span className="hidden sm:inline">Message HR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIED US EMPLOYERS & SPONSORS */}
      {activeTab === 'companies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>Verified US Employers & Sponsors</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                {filteredCompanies.length} Profiles
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCompanies.map((emp) => (
              <div
                key={emp.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden hover:border-sky-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Banner */}
                  <div className="h-28 w-full relative">
                    <img
                      src={emp.banner}
                      alt={emp.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-4 flex items-center gap-1.5 text-xs text-white/90">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{emp.city}, {emp.state}</span>
                    </div>
                  </div>

                  {/* Header Content */}
                  <div className="p-5 pt-3">
                    <div className="flex items-start justify-between gap-3 -mt-10 mb-3">
                      <img
                        src={emp.logo}
                        alt={emp.name}
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md bg-white"
                      />
                      <button
                        onClick={() => onFollowEmployer(emp.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          emp.isFollowed
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        }`}
                      >
                        {emp.isFollowed ? 'Following' : '+ Follow'}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-black text-base text-slate-900 dark:text-white">
                        {emp.name}
                      </h4>
                      {emp.isVerified && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          {emp.verifiedBadgeType === 'sponsor' ? 'Official Sponsor' : 'Verified Employer'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 mb-3 leading-relaxed">
                      {emp.description}
                    </p>

                    {/* Stats Pill grid */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-850 text-center text-xs mb-3 border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Rating:</span>
                        <span className="font-extrabold text-amber-500 flex items-center justify-center gap-0.5 text-xs">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {emp.overallRating}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Housing:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                          {emp.housingProvided ? 'Available' : 'Assisted'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Overtime:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                          {emp.overtimeAllowed ? '1.5x Overtime' : 'Standard'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recruiter & Link */}
                <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={emp.recruiterAvatar}
                      alt={emp.recruiterName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] truncate max-w-[170px]">
                      {emp.recruiterName}
                    </span>
                  </div>

                  <a
                    href={emp.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sky-600 hover:text-sky-500 dark:text-sky-400 font-bold"
                  >
                    <span>Careers Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REGIONAL AGENCIES DIRECTORY */}
      {activeTab === 'agencies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>Regional Recruitment Agencies (Kazakhstan, CIS & Europe)</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {filteredAgencies.length} Accredited Partners
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAgencies.map((agency) => (
              <div
                key={agency.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Banner */}
                  <div className="h-28 w-full relative">
                    <img
                      src={agency.banner}
                      alt={agency.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-4 flex items-center gap-1.5 text-xs text-white/90">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{agency.city}, {agency.country}</span>
                    </div>
                  </div>

                  {/* Header Info */}
                  <div className="p-5 pt-3">
                    <div className="flex items-start justify-between gap-3 -mt-10 mb-3">
                      <img
                        src={agency.logo}
                        alt={agency.name}
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md bg-white"
                      />
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {agency.visaSuccessRate}% Approval
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-black text-base text-slate-900 dark:text-white">
                        {agency.name}
                      </h4>
                      {agency.isVerified && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Agency
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {agency.address}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 mb-3 leading-relaxed">
                      {agency.description}
                    </p>

                    {/* Services Checklist */}
                    <div className="mb-3 space-y-1 bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Provided Student Services:
                      </span>
                      {agency.services.slice(0, 3).map((srv, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{srv}</span>
                        </div>
                      ))}
                    </div>

                    {/* Accredited Sponsors */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="text-[11px] text-slate-400 font-semibold mr-1">Designated Sponsors:</span>
                      {agency.accreditedSponsors.map((sp) => (
                        <span key={sp} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={agency.representativeAvatar}
                        alt={agency.representativeName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/30"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {agency.representativeName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {agency.representativeRole}
                        </div>
                      </div>
                    </div>

                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAgencyChat(agency)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request DS-2019 Consultation</span>
                    </button>

                    <a
                      href={`tel:${agency.phone}`}
                      title={agency.phone}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">Call Office</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Application */}
      <JobApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        announcement={selectedAnnouncement}
        currentUser={currentUser}
        onApplySubmit={onApplyToJob}
      />
    </div>
  );
};
