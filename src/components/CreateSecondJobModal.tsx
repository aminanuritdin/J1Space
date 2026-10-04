import React, { useState } from 'react';
import { X, Briefcase, DollarSign, Clock, MapPin, Send } from 'lucide-react';
import { SecondJobPosting, User } from '../types';

interface CreateSecondJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddJob: (job: Partial<SecondJobPosting>) => void;
}

export const CreateSecondJobModal: React.FC<CreateSecondJobModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddJob,
}) => {
  const [title, setTitle] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('NJ');
  const [hourlyWage, setHourlyWage] = useState<number>(16.0);
  const [tipsEstimated, setTipsEstimated] = useState('$50 – $100 / shift cash tips');
  const [shifts, setShifts] = useState('Evening 5:30 PM – 10:30 PM');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [isWalkIn, setIsWalkIn] = useState<boolean>(true);
  const [urgency, setUrgency] = useState<'high' | 'medium' | 'normal'>('high');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('Basic English, valid SSN receipt, comfortable on feet');
  const [contactName, setContactName] = useState('Shift Manager / Mike');
  const [contactMethod, setContactMethod] = useState('Walk-in to back entrance at 4:30 PM or call manager');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !businessName.trim()) return;

    const reqs = requirementsInput
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    onAddJob({
      title: title.trim(),
      businessName: businessName.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      hourlyWage,
      tipsEstimated: tipsEstimated.trim() || undefined,
      shifts,
      hoursPerWeek,
      isWalkIn,
      urgency,
      description: description.trim(),
      requirements: reqs,
      contactName: contactName.trim(),
      contactMethod: contactMethod.trim(),
      createdAt: 'Just now',
      upvotes: 1,
      author: currentUser,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-violet-500" />
            <span>Post a Second Job Opportunity</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Position Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Evening Busser / Runner / Dishwasher"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Establishment (Restaurant, Hotel, Shop):
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Boardwalk Pizzeria / Resort Bistro"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                City & State:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Wildwood"
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
                />
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  placeholder="NJ"
                  className="w-14 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none uppercase text-center font-bold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Hourly Base Rate ($/hr):
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Cash Tips / Extra:
              </label>
              <input
                type="text"
                value={tipsEstimated}
                onChange={(e) => setTipsEstimated(e.target.value)}
                placeholder="$40 - $80 / shift"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Typical Shift Hours:
              </label>
              <input
                type="text"
                value={shifts}
                onChange={(e) => setShifts(e.target.value)}
                placeholder="6:00 PM – 11:00 PM"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Hours Per Week:
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Hiring Urgency:
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              >
                <option value="high">🔥 Immediate Need / Today</option>
                <option value="medium">⚡ This Week</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="walkin"
                checked={isWalkIn}
                onChange={(e) => setIsWalkIn(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded"
              />
              <label htmlFor="walkin" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                Direct Walk-in hiring accepted
              </label>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Description & Work Environment:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Friendly family restaurant, free staff pizza after shift, manager understands primary employer scheduling constraints..."
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none resize-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Contact Person / Role:
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Manager John"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                How to Apply:
              </label>
              <input
                type="text"
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                placeholder="Ask for Chef Dave between 3-5 PM"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-extrabold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Second Job</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
