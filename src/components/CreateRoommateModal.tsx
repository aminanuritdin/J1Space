import React, { useState } from 'react';
import { X, Users, Car, Home, MapPin, Calendar, DollarSign, Send } from 'lucide-react';
import { RoommatePost, User } from '../types';

interface CreateRoommateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddPost: (post: Partial<RoommatePost>) => void;
}

export const CreateRoommateModal: React.FC<CreateRoommateModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddPost,
}) => {
  const [type, setType] = useState<'roommate' | 'travel_buddy'>('travel_buddy');
  const [title, setTitle] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [destinationState, setDestinationState] = useState('');
  const [dateRange, setDateRange] = useState('September 1 – 15, 2025');
  const [budgetPerPerson, setBudgetPerPerson] = useState('$800 – $1,100');
  const [lookingFor, setLookingFor] = useState('');
  const [description, setDescription] = useState('');
  const [routeStopsInput, setRouteStopsInput] = useState('');
  const [contactTelegram, setContactTelegram] = useState('@' + currentUser.handle);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const stops = routeStopsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddPost({
      type,
      title: title.trim(),
      destinationCity: destinationCity.trim(),
      destinationState: destinationState.trim().toUpperCase(),
      dateRange,
      budgetPerPerson,
      lookingFor,
      description: description.trim(),
      routeStops: stops.length > 0 ? stops : undefined,
      contactTelegram: contactTelegram.trim(),
      createdAt: 'Just now',
      tags: [type === 'travel_buddy' ? 'RoadTrip' : 'Housing', destinationState || 'USA'],
      applicantsCount: 0,
      author: currentUser,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-500" />
            <span>Post a Listing (Housing or Travel Buddy)</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Type Switcher */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('travel_buddy')}
              className={`p-3 rounded-xl border text-center font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                type === 'travel_buddy'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>🚗 Travel Buddy (Trip)</span>
            </button>

            <button
              type="button"
              onClick={() => setType('roommate')}
              className={`p-3 rounded-xl border text-center font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                type === 'roommate'
                  ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>🏠 Roommate (Summer Rent)</span>
            </button>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Listing Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'travel_buddy' ? 'Road trip to Yellowstone & Grand Canyon, 2 spots open!' : 'Looking for 2 female roommates in Wildwood, NJ'}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target City:
              </label>
              <input
                type="text"
                required
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="Wildwood / West Yellowstone"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                State (2 letters):
              </label>
              <input
                type="text"
                required
                maxLength={2}
                value={destinationState}
                onChange={(e) => setDestinationState(e.target.value.toUpperCase())}
                placeholder="NJ / WY / WI"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Date Range:
              </label>
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="June 1 – Sept 15"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Est. Budget / Cost:
              </label>
              <input
                type="text"
                value={budgetPerPerson}
                onChange={(e) => setBudgetPerPerson(e.target.value)}
                placeholder="$115/week or $900 trip"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>
          </div>

          {type === 'travel_buddy' && (
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Planned Route Stops (comma-separated):
              </label>
              <input
                type="text"
                value={routeStopsInput}
                onChange={(e) => setRouteStopsInput(e.target.value)}
                placeholder="Denver, Yellowstone, Salt Lake City, Las Vegas, LA"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Details & House Rules / Trip Expectations:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe apartment amenities (WiFi, laundry, AC, bike distance to work) or rental car itinerary and driving license requirements..."
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none resize-none font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Telegram or WhatsApp Contact:
            </label>
            <input
              type="text"
              value={contactTelegram}
              onChange={(e) => setContactTelegram(e.target.value)}
              placeholder="@username or +1..."
              className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none"
            />
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
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
