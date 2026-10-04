import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { VisaEmbassySlot, NewsArticle } from '../types';

interface VisaRadarViewProps {
  slots: VisaEmbassySlot[];
  news: NewsArticle[];
}

export const VisaRadarView: React.FC<VisaRadarViewProps> = ({ slots, news }) => {
  const [selectedSlot, setSelectedSlot] = useState<VisaEmbassySlot | null>(slots[0]);
  const [activeInterviewQuestion, setActiveInterviewQuestion] = useState<number>(0);

  // Embassy Interview Practice Simulation Questions
  const interviewQuestions = [
    {
      q: 'Why did you choose this specific program and employer in the US?',
      badAnswer: '❌ "I want to earn dollars, buy an iPhone, and maybe stay in America."',
      goodAnswer: '✅ "I want to improve my spoken English in an authentic native environment, experience American customer service standards, and gain hospitality experience that will help my career in international tourism after I graduate from my university."',
      tip: 'Never state that your primary purpose is making money. For the US Department of State, J-1 is strictly a Cultural Exchange program.'
    },
    {
      q: 'What is your university major and what year are you currently studying?',
      badAnswer: '❌ "I graduated last month or I took a gap year."',
      goodAnswer: '✅ "I am a 3rd year full-time undergraduate student majoring in Computer Science at ENU. I have one full academic year left and I will return in September for my senior year."',
      tip: 'The consular officer evaluates non-immigrant intent under INA Section 214(b). You must demonstrate strong ties and a return commitment.'
    },
    {
      q: 'Who is funding your initial Work and Travel program costs?',
      badAnswer: '❌ "I took an informal loan from a money lender."',
      goodAnswer: '✅ "My parents are funding my program initial expenses, and I contributed a portion from my savings."',
      tip: 'Show family financial stability and verified funding sources.'
    },
    {
      q: 'What will you do if your employer has slow days or weather delays?',
      badAnswer: '❌ "I will just take a bus to NYC and work off the books."',
      goodAnswer: '✅ "I will immediately contact my designated sponsor (e.g. InterExchange / CIEE) on their 24/7 hotline so they can coordinate with the employer or assist with vetting an authorized second job according to DS-7002 regulations."',
      tip: 'Demonstrates deep knowledge of visa compliance and sponsor support protocols.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            J-1 Visa Radar & Embassy Interview Slots
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real-time embassy appointment availability, consular approval rates, and interactive mock interview simulator.
        </p>
      </div>

      {/* Embassy Slots Live Table */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Embassy Interview Status (Central Asia & Europe)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Updated 10 minutes ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            return (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <span className="text-lg">{slot.flag}</span>
                    <span>{slot.city}, {slot.country}</span>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      slot.status === 'open'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : slot.status === 'limited'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {slot.statusText}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Next Open Date:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">{slot.nextAvailableDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Approval Rate:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{slot.avgApprovalRate}%</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Wait Time:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{slot.waitDays} days</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 line-clamp-2">
                  {slot.recentNotes}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mock Interview Practice Simulator */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            Consul Interview Simulation & DS-160 Prep
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {interviewQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveInterviewQuestion(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeInterviewQuestion === idx
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Question #{idx + 1}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            Consul: "{interviewQuestions[activeInterviewQuestion].q}"
          </div>

          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs text-rose-700 dark:text-rose-300">
            <span className="font-bold block mb-1">Common Pitfall / Risk Answer:</span>
            {interviewQuestions[activeInterviewQuestion].badAnswer}
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-emerald-800 dark:text-emerald-300">
            <span className="font-bold block mb-1">Recommended Response:</span>
            {interviewQuestions[activeInterviewQuestion].goodAnswer}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
            💡 Strategy Note: {interviewQuestions[activeInterviewQuestion].tip}
          </div>
        </div>
      </div>

      {/* Official State Dept News & Updates */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            Official Regulatory Updates & Safety Notices
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {news.map((item) => (
            <div key={item.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>
              <div className="text-[11px] text-slate-400">
                Source: {item.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
