import React from 'react';
import { Clock, Calendar, ExternalLink, ArrowRight, Building } from 'lucide-react';
import { EvaluatedScholarshipResult } from '../types';

interface DeadlineIntelligenceProps {
  evaluatedResults: EvaluatedScholarshipResult[];
  onViewEligibility: (result: EvaluatedScholarshipResult) => void;
}

export const DeadlineIntelligence: React.FC<DeadlineIntelligenceProps> = ({
  evaluatedResults,
  onViewEligibility,
}) => {
  // Sort by daysRemaining ascending (most urgent first)
  const sorted = [...evaluatedResults].sort((a, b) => a.scholarship.daysRemaining - b.scholarship.daysRemaining);

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-rose-600" />
          <h1 className="text-2xl font-bold text-[#173B67]">
            Deadline Intelligence
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Opportunities prioritized automatically by calendar expiration urgency. Never miss a funding round.
        </p>
      </div>

      {/* Deadlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map(res => {
          const sch = res.scholarship;
          const days = sch.daysRemaining;

          // Urgency badge styling per prompt Section 25:
          // 🔴 2 days left (critical)
          // 🟠 8 days left (warning)
          // 🟢 21 days left (normal)
          const isCritical = days <= 5;
          const isWarning = days > 5 && days <= 14;

          return (
            <div
              key={sch.id}
              className={`bg-white rounded-xl border p-5 transition-all shadow-xs flex flex-col justify-between ${
                isCritical 
                  ? 'border-rose-300 ring-1 ring-rose-200' 
                  : isWarning 
                  ? 'border-amber-300 ring-1 ring-amber-200' 
                  : 'border-[#E2E8F0] hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {/* Urgency Pill */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                    isCritical
                      ? 'bg-[#FEE2E2] text-[#DC2626]'
                      : isWarning
                      ? 'bg-[#FEF3C7] text-[#D97706]'
                      : 'bg-[#DCFCE7] text-[#16A34A]'
                  }`}>
                    <span>{isCritical ? '🔴' : isWarning ? '🟠' : '🟢'}</span>
                    <span>{days} days left</span>
                  </span>

                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {sch.awardAmount}
                  </span>
                </div>

                <h3 
                  onClick={() => onViewEligibility(res)}
                  className="text-base font-bold text-[#173B67] hover:text-[#2563EB] cursor-pointer transition-colors leading-snug line-clamp-2"
                >
                  {sch.name}
                </h3>

                <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{sch.provider}</span>
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Closing Date:
                  </span>
                  <strong className="text-slate-800">{sch.deadline}</strong>
                </div>

                {/* Status Indicator */}
                <div className="mt-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-block ${
                    res.overallStatus === 'POTENTIALLY_ELIGIBLE'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : res.overallStatus === 'DOES_NOT_MEET'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {res.overallStatus === 'POTENTIALLY_ELIGIBLE' && '✓ Potentially Eligible'}
                    {res.overallStatus === 'DOES_NOT_MEET' && '✕ Does Not Meet Known Criteria'}
                    {res.overallStatus === 'REVIEW_REQUIRED' && '🟡 Needs Verification'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onViewEligibility(res)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#173B67] hover:bg-[#0B2545] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>View Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={sch.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                  title="Open official portal"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
