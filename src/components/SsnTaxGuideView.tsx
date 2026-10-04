import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  CreditCard, 
  Send, 
  Building2, 
  Calendar, 
  DollarSign,
  Download
} from 'lucide-react';
import { User } from '../types';

interface SsnTaxGuideViewProps {
  currentUser: User;
}

export const SsnTaxGuideView: React.FC<SsnTaxGuideViewProps> = ({ currentUser }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);

  // FICA Exemption Letter customizer
  const [studentFullName, setStudentFullName] = useState<string>(currentUser.name);
  const [employerName, setEmployerName] = useState<string>('Morey’s Piers / Kalahari / Xanterra HR Department');
  const [programDates, setProgramDates] = useState<string>('May 25, 2025 – September 15, 2025');

  // Interactive Checklist states
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    sevis_validated: true,
    i94_printed: true,
    ds2019_original: true,
    passport_valid: true,
    sponsor_letter: false,
    ss5_form: false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ficaLetterTemplate = `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

To: Payroll / Human Resources Department
Employer: ${employerName}

From: ${studentFullName}
Visa Status: J-1 Exchange Visitor (Summer Work Travel)
Dates of Program: ${programDates}

Subject: Exemption from Social Security (OASDI) and Medicare Taxes (FICA) pursuant to Internal Revenue Code (IRC) Section 3121(b)(19)

Dear Payroll Administrator,

I am writing to formally request that Social Security and Medicare taxes (FICA) NOT be withheld from my paycheck.

As an exchange visitor temporarily present in the United States on a non-immigrant J-1 visa under Section 101(a)(15)(J) of the Immigration and Nationality Act, I am classified as a "Non-Resident Alien" for federal tax purposes.

Under Internal Revenue Code (IRC) Section 3121(b)(19) and IRS Publication 519 (U.S. Tax Guide for Aliens), services performed by non-resident alien exchange visitors on a J-1 visa to carry out the purpose for which they entered the United States are EXEMPT from Social Security and Medicare taxes (FICA and FUTA).

IRS Reference:
"Services performed by a non-immigrant alien holding an F-1, J-1, M-1, or Q-1 visa are exempt from Social Security and Medicare taxes if the services are performed to carry out the purpose for which the alien was admitted to the United States." (IRS Publication 519, Chapter 8).

Attached please find copies of:
1. Form DS-2019 (Certificate of Eligibility for Exchange Visitor Status)
2. Form I-94 (Arrival/Departure Record)
3. Form W-4 (Employee's Withholding Certificate) completed in accordance with IRS Notice 1392

Thank you very much for your assistance and proper configuration of my payroll profile.

Sincerely,

${studentFullName}
Signature: _______________________
`;

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(ficaLetterTemplate);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            SSN, Bank Accounts & Tax Exemption Guide
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete walkthrough of US paperwork: obtaining your Social Security card, opening fee-free bank accounts, claiming your legal FICA tax exemption, and filing Form 1040-NR.
        </p>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 1, label: '1. Obtaining Your SSN', icon: ShieldCheck },
          { id: 2, label: '2. FICA Tax Exemption (Letter Generator)', icon: DollarSign },
          { id: 3, label: '3. US Bank Account Setup', icon: CreditCard },
          { id: 4, label: '4. Form W-2 & 1040-NR Tax Return', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveStep(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeStep === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: SOCIAL SECURITY NUMBER */}
      {activeStep === 1 && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
              Social Security Administration (SSA) Office Checklist
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              <strong>CRITICAL RULE:</strong> Wait at least 3-5 business days after your sponsor validates your SEVIS record before visiting the SSA office. If you go too early, DHS and SSA databases will not have synced, causing your application to undergo manual Homeland Security review (delaying your card by 4-6 weeks!).
            </p>

            {/* Interactive Checklist */}
            <div className="space-y-2.5 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Required Documents Checklist for SSA:
              </span>

              {[
                { id: 'sevis_validated', text: 'SEVIS Validated Status confirmed in sponsor portal (Active)' },
                { id: 'ds2019_original', text: 'Original Form DS-2019 signed in blue ink' },
                { id: 'passport_valid', text: 'Passport with valid J-1 visa foil stamp' },
                { id: 'i94_printed', text: 'Printed electronic Form I-94 retrieved from i94.cbp.dhs.gov' },
                { id: 'sponsor_letter', text: 'Sponsor Support Letter / Job Placement Agreement' },
                { id: 'ss5_form', text: 'Completed Form SS-5 (Application for Social Security Card)' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none"
                >
                  {checkedItems[item.id] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className={checkedItems[item.id] ? 'line-through text-slate-400' : 'font-medium'}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
              <strong>Can you start working before your card arrives?</strong> YES! Under SSA Publication 05-10107, you can begin legally working immediately upon presenting your SSA receipt letter to your employer. Employers cannot withhold pay due to a pending SSN card.
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: FICA EXEMPTION LETTER GENERATOR */}
      {activeStep === 2 && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Official FICA Exemption HR Letter Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Generate and customize a legal formal notice citing IRC Section 3121(b)(19) to hand to payroll.
                </p>
              </div>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
              >
                {copiedLetter ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLetter ? 'Copied to Clipboard!' : 'Copy Formal Letter'}</span>
              </button>
            </div>

            {/* Customizer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Student Full Name:
                </label>
                <input
                  type="text"
                  value={studentFullName}
                  onChange={(e) => setStudentFullName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Employer / HR Name:
                </label>
                <input
                  type="text"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Program Dates:
                </label>
                <input
                  type="text"
                  value={programDates}
                  onChange={(e) => setProgramDates(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold"
                />
              </div>
            </div>

            {/* Letter Preview Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
              {ficaLetterTemplate}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: US BANK ACCOUNTS */}
      {activeStep === 3 && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Opening a US Bank Account (No SSN Required Initially)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Most major banks allow J-1 exchange students to open checking accounts with direct deposit using your Passport, DS-2019, and US residential address before your physical Social Security card arrives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">Chase Bank (Total Checking)</div>
                <p className="text-xs text-slate-500 mb-2">Very high branch density across the US. Requires Passport, DS-2019, and $25 minimum opening deposit.</p>
                <span className="text-[10px] font-bold text-emerald-600">✓ Fee waived with direct deposit $500+/mo</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">Bank of America (Advantage Plus)</div>
                <p className="text-xs text-slate-500 mb-2">Accepts international students under age 25 with student waiver for monthly service fees.</p>
                <span className="text-[10px] font-bold text-emerald-600">✓ Free debit card issued on the spot</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">PNC Bank / Local Credit Unions</div>
                <p className="text-xs text-slate-500 mb-2">Popular in New Jersey, Pennsylvania, and Wisconsin. Very friendly to seasonal resort workers.</p>
                <span className="text-[10px] font-bold text-emerald-600">✓ No fee checking options</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: TAX RETURN GUIDE */}
      {activeStep === 4 && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Filing Your Federal 1040-NR & State Tax Return
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every January following your summer program, your employer will mail or email you <strong>Form W-2</strong> reporting your total earnings and withheld taxes.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">⚠️ DO NOT use standard TurboTax or H&R Block resident portals!</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  TurboTax defaults to resident alien Form 1040 and illegally claims the $14,600 standard deduction, which violates J-1 visa terms and can trigger permanent US visa bans. Always file <strong>Form 1040-NR (Nonresident Alien)</strong> using accredited software like Sprintax or your local agency tax department.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Average Federal Refund Amount:</span>
                <p className="text-emerald-700 dark:text-emerald-400">
                  Most J-1 participants receive between $350 and $900 back in federal and state tax refunds direct-deposited into their US or home bank accounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
