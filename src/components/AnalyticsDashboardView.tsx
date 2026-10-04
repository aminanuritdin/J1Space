import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  PiggyBank, 
  Percent, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AnalyticsDashboardView: React.FC = () => {
  // Pre-trip costs
  const [agencyFee, setAgencyFee] = useState<number>(2250);
  const [consularFee, setConsularFee] = useState<number>(185);
  const [sevisFee, setSevisFee] = useState<number>(35);
  const [flightCost, setFlightCost] = useState<number>(1150);
  const [pocketMoney, setPocketMoney] = useState<number>(550);

  // Work & Earnings
  const [mainHourly, setMainHourly] = useState<number>(16.5);
  const [mainWeeklyHours, setMainWeeklyHours] = useState<number>(40);
  
  const [otWeeklyHours, setOtWeeklyHours] = useState<number>(10);
  const [otRateMultiplier, setOtRateMultiplier] = useState<number>(1.5);
  
  const [hasSecondJob, setHasSecondJob] = useState<boolean>(true);
  const [secondHourly, setSecondHourly] = useState<number>(15.0);
  const [secondWeeklyHours, setSecondWeeklyHours] = useState<number>(15);

  const [seasonWeeks, setSeasonWeeks] = useState<number>(14);

  // US Living Costs
  const [weeklyRent, setWeeklyRent] = useState<number>(115);
  const [weeklyFood, setWeeklyFood] = useState<number>(85);
  const [weeklyMisc, setWeeklyMisc] = useState<number>(40);

  // Tax settings
  const [ficaExempt, setFicaExempt] = useState<boolean>(true);
  const [incomeTaxRate, setIncomeTaxRate] = useState<number>(10); // Federal + State ~10%

  // Calculations
  const totalPreTripCost = agencyFee + consularFee + sevisFee + flightCost + pocketMoney;

  const weeklyMainRegularGross = mainWeeklyHours * mainHourly;
  const weeklyOtGross = otWeeklyHours * (mainHourly * otRateMultiplier);
  const weeklySecondGross = hasSecondJob ? secondWeeklyHours * secondHourly : 0;
  const totalWeeklyGross = weeklyMainRegularGross + weeklyOtGross + weeklySecondGross;

  const totalSeasonGross = totalWeeklyGross * seasonWeeks;

  // Taxes
  const effectiveTaxRate = (incomeTaxRate + (ficaExempt ? 0 : 7.65)) / 100;
  const seasonTaxes = totalSeasonGross * effectiveTaxRate;
  const ficaSavings = totalSeasonGross * 0.0765;

  const totalWeeklyLivingCost = weeklyRent + weeklyFood + weeklyMisc;
  const totalSeasonLivingCost = totalWeeklyLivingCost * seasonWeeks;

  // Net earnings
  const netEarningsAfterLivingAndTax = totalSeasonGross - seasonTaxes - totalSeasonLivingCost;
  const finalBalanceOnHand = netEarningsAfterLivingAndTax + pocketMoney - (agencyFee + consularFee + sevisFee + flightCost);

  // Payback period
  const weeklyNetSaved = totalWeeklyGross * (1 - effectiveTaxRate) - totalWeeklyLivingCost;
  const weeksToPayoff = weeklyNetSaved > 0 ? (totalPreTripCost / weeklyNetSaved).toFixed(1) : 'N/A';
  const roiPercentage = totalPreTripCost > 0 ? Math.round(((finalBalanceOnHand) / totalPreTripCost) * 100) : 0;

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              J-1 Work & Travel USA ROI Calculator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Simulate agency fees, overtime wages, second jobs, FICA tax savings, and projected net profit in your pocket.
          </p>
        </div>

        <button
          onClick={triggerCelebration}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:opacity-95 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Payoff! 🎉</span>
        </button>
      </div>

      {/* Primary KPI Results Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Gross Income */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Season Gross
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            ${Math.round(totalSeasonGross).toLocaleString()}
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5 block">
            ~${Math.round(totalWeeklyGross)} / week
          </span>
        </div>

        {/* Total Program Cost */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Initial Pre-Trip Costs
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
            ${totalPreTripCost.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            Agency + Visa + Flight
          </span>
        </div>

        {/* Net Profit in Pocket */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/20">
          <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider block">
            Net Savings in Pocket
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1">
            ${Math.round(finalBalanceOnHand).toLocaleString()}
          </div>
          <span className="text-xs text-emerald-100 font-medium mt-0.5 block">
            After all living costs & taxes!
          </span>
        </div>

        {/* Weeks to Pay Off & ROI */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Program Payback Period
          </span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {weeksToPayoff} <span className="text-sm font-normal text-slate-400">weeks</span>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 block">
            Net ROI: +{roiPercentage}% return
          </span>
        </div>
      </div>

      {/* FICA Exemption Notice Card */}
      <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shrink-0 shadow-sm">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-emerald-900 dark:text-emerald-200">
              FICA Tax Exemption Benefit: +${Math.round(ficaSavings)} saved!
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">
              J-1 nonresident students are exempt from the 7.65% Social Security & Medicare tax under IRC § 3121(b)(19). Verify your paystub to ensure your employer does not withhold these funds.
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none shrink-0 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-2xl border border-emerald-300 dark:border-emerald-800 shadow-xs">
          <input
            type="checkbox"
            checked={ficaExempt}
            onChange={(e) => setFicaExempt(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
            FICA Exempt (Legal)
          </span>
        </label>
      </div>

      {/* Interactive Controls & Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Column 1: Pre-trip Program Costs */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-rose-500" />
              1. Pre-Departure Investments
            </h3>
            <span className="text-xs font-black text-rose-500">${totalPreTripCost}</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Agency Program Fee (DS-2019):</span>
              <span className="text-slate-900 dark:text-white font-bold">${agencyFee}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={3500}
              step={50}
              value={agencyFee}
              onChange={(e) => setAgencyFee(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Roundtrip Flights:</span>
              <span className="text-slate-900 dark:text-white font-bold">${flightCost}</span>
            </div>
            <input
              type="range"
              min={600}
              max={2000}
              step={50}
              value={flightCost}
              onChange={(e) => setFlightCost(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Embassy MRV Fee:</span>
              <span className="text-slate-900 dark:text-white font-bold">${consularFee}</span>
            </div>
            <span className="text-[10px] text-slate-400">Fixed Department of State fee ($185)</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">SEVIS I-901 Fee:</span>
              <span className="text-slate-900 dark:text-white font-bold">${sevisFee}</span>
            </div>
            <span className="text-[10px] text-slate-400">Fixed Department of Homeland Security fee ($35)</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">First Week Emergency Cash:</span>
              <span className="text-slate-900 dark:text-white font-bold">${pocketMoney}</span>
            </div>
            <input
              type="range"
              min={200}
              max={1200}
              step={50}
              value={pocketMoney}
              onChange={(e) => setPocketMoney(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Column 2: Work, Hourly Rate, Overtime & Second Job */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              2. Work Hours & Wages
            </h3>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">${Math.round(totalWeeklyGross)} / wk</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Primary Job Base Pay:</span>
              <span className="text-slate-900 dark:text-white font-bold">${mainHourly.toFixed(2)}/hr</span>
            </div>
            <input
              type="range"
              min={12}
              max={25}
              step={0.5}
              value={mainHourly}
              onChange={(e) => setMainHourly(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Primary Regular Hours:</span>
              <span className="text-slate-900 dark:text-white font-bold">{mainWeeklyHours} hrs/wk</span>
            </div>
            <input
              type="range"
              min={30}
              max={40}
              step={1}
              value={mainWeeklyHours}
              onChange={(e) => setMainWeeklyHours(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Overtime Hours (1.5x Pay):</span>
              <span className="text-slate-900 dark:text-white font-bold">{otWeeklyHours} hrs/wk</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={otWeeklyHours}
              onChange={(e) => setOtWeeklyHours(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">OT Rate: ${(mainHourly * otRateMultiplier).toFixed(2)}/hr</span>
          </div>

          {/* Second Job Toggle & Details */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-3">
            <label className="flex items-center justify-between cursor-pointer select-none">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                Include Second Job?
              </span>
              <input
                type="checkbox"
                checked={hasSecondJob}
                onChange={(e) => setHasSecondJob(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 cursor-pointer"
              />
            </label>

            {hasSecondJob && (
              <>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">2nd Job Pay (or tips):</span>
                    <span className="font-bold text-slate-900 dark:text-white">${secondHourly.toFixed(2)}/hr</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={25}
                    step={0.5}
                    value={secondHourly}
                    onChange={(e) => setSecondHourly(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">2nd Job Weekly Hours:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{secondWeeklyHours} hrs/wk</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    step={1}
                    value={secondWeeklyHours}
                    onChange={(e) => setSecondWeeklyHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Column 3: Living Costs & Season Length */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              3. Living Costs in the USA
            </h3>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">${totalWeeklyLivingCost} / wk</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Total Contract Weeks:</span>
              <span className="text-slate-900 dark:text-white font-bold">{seasonWeeks} weeks</span>
            </div>
            <input
              type="range"
              min={10}
              max={18}
              step={1}
              value={seasonWeeks}
              onChange={(e) => setSeasonWeeks(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Standard season: 12-15 weeks</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Weekly Rent Cost:</span>
              <span className="text-slate-900 dark:text-white font-bold">${weeklyRent}/wk</span>
            </div>
            <input
              type="range"
              min={50}
              max={250}
              step={5}
              value={weeklyRent}
              onChange={(e) => setWeeklyRent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Groceries & Meals:</span>
              <span className="text-slate-900 dark:text-white font-bold">${weeklyFood}/wk</span>
            </div>
            <input
              type="range"
              min={40}
              max={200}
              step={5}
              value={weeklyFood}
              onChange={(e) => setWeeklyFood(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Sim Card, Transport, Misc:</span>
              <span className="text-slate-900 dark:text-white font-bold">${weeklyMisc}/wk</span>
            </div>
            <input
              type="range"
              min={15}
              max={100}
              step={5}
              value={weeklyMisc}
              onChange={(e) => setWeeklyMisc(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-400">Est. Income Tax (Federal + State):</span>
              <span className="text-slate-900 dark:text-white font-bold">{incomeTaxRate}%</span>
            </div>
            <span className="text-[10px] text-slate-400 block">Nonresidents file 1040-NR each spring</span>
          </div>
        </div>
      </div>

      {/* State ROI Comparison & Tax Advantage Table */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <span>State Net Earnings Benchmark (Real Alumni Data)</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Season Comparison
          </span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          States without state income tax (Alaska, Wyoming, Florida, Texas) or resort areas with subsidized employer housing allow participants to save substantially more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Alaska (Denali/Anchorage)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">0% State Tax</span>
            </div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              $8,500 – $12,500
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Very low living costs ($75/wk with all meals). High savings rate!
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Wyoming (Yellowstone)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">0% State Tax</span>
            </div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              $6,800 – $9,200
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Subsidized housing and food ($72/wk total). Zero commercial distractions.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">New Jersey (Wildwood)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600">High Overtime</span>
            </div>
            <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
              $7,000 – $10,500
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              55-65 hrs/week in July/August. Second jobs plentiful on boardwalk.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Wisconsin (The Dells)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600">Indoor Resorts</span>
            </div>
            <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">
              $6,500 – $9,800
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Rain never cancels indoor shifts. Great dining discounts for staff.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
