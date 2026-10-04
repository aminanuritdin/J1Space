import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShieldAlert, ShieldX, Building2, MapPin, DollarSign, Send } from 'lucide-react';
import { EmployerReview, EmployerListType, User } from '../types';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddReview: (review: Partial<EmployerReview>) => void;
}

export const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddReview,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('NJ');
  const [industry, setIndustry] = useState<'Hospitality' | 'Amusement Park' | 'Food Service' | 'National Park' | 'Lifeguard' | 'Retail' | 'Housekeeping'>('Amusement Park');
  const [overallRating, setOverallRating] = useState<number>(5);
  
  // Criteria ratings
  const [ratingHousing, setRatingHousing] = useState<number>(4);
  const [ratingOvertime, setRatingOvertime] = useState<number>(5);
  const [ratingPayRate, setRatingPayRate] = useState<number>(4);
  const [ratingManagement, setRatingManagement] = useState<number>(4);

  const [hourlyWage, setHourlyWage] = useState<number>(16.5);
  const [housingCostWeekly, setHousingCostWeekly] = useState<number>(115);
  const [housingType, setHousingType] = useState('Shared Student Apartments');
  const [hasOvertime, setHasOvertime] = useState<boolean>(true);
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [recommend, setRecommend] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !reviewText.trim()) return;

    let listType: EmployerListType = 'white';
    if (overallRating <= 2.5) listType = 'black';
    else if (overallRating < 4.0) listType = 'gray';

    const tags: string[] = [];
    if (hasOvertime) tags.push('Overtime Available');
    if (ratingHousing <= 2) tags.push('Poor Housing');
    else if (ratingHousing >= 4) tags.push('Clean Housing');
    if (overallRating <= 2) tags.push('Paystub Delays');
    if (ratingManagement >= 4.5) tags.push('Great Management');

    onAddReview({
      companyName: companyName.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      industry,
      listType,
      overallRating,
      ratings: {
        housing: ratingHousing,
        overtime: ratingOvertime,
        payRate: ratingPayRate,
        management: ratingManagement,
      },
      hourlyWage,
      housingCostWeekly,
      housingType,
      hasOvertime,
      overtimeRate: hasOvertime ? Number((hourlyWage * 1.5).toFixed(2)) : undefined,
      pros: pros.trim() || 'Steady hours and friendly staff',
      cons: cons.trim() || 'Fast pace during peak summer season',
      reviewText: reviewText.trim(),
      tags: tags.length > 0 ? tags : ['J1Experience'],
      recommend,
      isAnonymous,
      author: currentUser,
      createdAt: 'Just now',
      helpfulCount: 1,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Write US Employer Review
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {/* Company & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Employer / Business Name:
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Morey's Piers, Kalahari, Xanterra"
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-none focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                State:
              </label>
              <input
                type="text"
                required
                maxLength={2}
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                placeholder="NJ, WI, WY"
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-none focus:outline-none text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                City / Town:
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Wildwood"
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium border-none focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Industry:
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-none focus:outline-none"
              >
                <option value="Amusement Park">Amusement Park & Attractions</option>
                <option value="Hospitality">Resorts & Hotels</option>
                <option value="Food Service">Restaurants & Food Service</option>
                <option value="National Park">National Park Lodges</option>
                <option value="Lifeguard">Beachfront / Pool Lifeguard</option>
                <option value="Retail">Retail & Supermarkets</option>
              </select>
            </div>
          </div>

          {/* Rating Criteria Sliders */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 block text-xs">
              Rate Performance Criteria (1 to 5 Stars):
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-500">Overall Rating:</span>
                  <span className="font-bold text-amber-500">⭐ {overallRating} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={overallRating}
                  onChange={(e) => setOverallRating(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-500">Housing:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">⭐ {ratingHousing} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={ratingHousing}
                  onChange={(e) => setRatingHousing(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-500">Overtime Availability:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">⭐ {ratingOvertime} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={ratingOvertime}
                  onChange={(e) => setRatingOvertime(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-500">Management Culture:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">⭐ {ratingManagement} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={ratingManagement}
                  onChange={(e) => setRatingManagement(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Wages and Housing details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Hourly Base Wage ($):
              </label>
              <input
                type="number"
                step="0.25"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Weekly Rent Cost ($):
              </label>
              <input
                type="number"
                step="5"
                value={housingCostWeekly}
                onChange={(e) => setHousingCostWeekly(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          {/* Pros & Cons */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Pros (Advantages):
            </label>
            <input
              type="text"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="e.g. Plenty of overtime hours, friendly supervisor, beach passes"
              className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Cons / Warnings:
            </label>
            <input
              type="text"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="e.g. Hot outdoor shifts, deposit refund requires patience"
              className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Detailed Review Text */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Full Student Review:
            </label>
            <textarea
              required
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share honest details about shifts, supervisors, housing hygiene, paycheck accuracy, and tips..."
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white resize-none border-none focus:outline-none font-medium"
            />
          </div>

          {/* Anonymous toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-850">
            <span className="text-slate-700 dark:text-slate-300 font-semibold">Post anonymously?</span>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Review to Database</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
