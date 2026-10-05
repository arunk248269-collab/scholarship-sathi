import React from 'react';
import { 
  Building, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Clock
} from 'lucide-react';
import { Scholarship, EvaluatedScholarshipResult } from '../types';

interface ScholarshipCardProps {
  result: EvaluatedScholarshipResult;
  onViewEligibility: (result: EvaluatedScholarshipResult) => void;
  onWhyScholarship: (result: EvaluatedScholarshipResult) => void;
  isCompared: boolean;
  onToggleCompare: (scholarship: Scholarship) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  result,
  onViewEligibility,
  onWhyScholarship,
  isCompared,
  onToggleCompare,
}) => {
  const { scholarship, overallStatus, criteriaSatisfiedCount, criteriaFailedCount, criteriaReviewCount, totalCriteriaCount } = result;

  const isEligible = overallStatus === 'POTENTIALLY_ELIGIBLE';
  const isFailed = overallStatus === 'DOES_NOT_MEET';
  const isReview = overallStatus === 'REVIEW_REQUIRED';

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden relative group ${
      isEligible 
        ? 'border-emerald-200/80 hover:border-emerald-300' 
        : isFailed 
        ? 'border-rose-200/80 hover:border-rose-300' 
        : 'border-amber-200/80 hover:border-amber-300'
    }`}>
      {/* Top Header & Tag Row */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-[#173B67] border border-slate-200">
              {scholarship.providerType}
            </span>
            {scholarship.isClosingSoon && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                <Clock className="w-3 h-3 text-rose-600" />
                {scholarship.daysRemaining} days left
              </span>
            )}
          </div>

          {/* Profile Match Percentage Badge */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Profile Match
            </span>
            <span className={`text-xs font-extrabold ${
              scholarship.matchScore >= 85 ? 'text-emerald-700' : scholarship.matchScore >= 70 ? 'text-amber-700' : 'text-slate-700'
            }`}>
              {scholarship.matchScore}%
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewEligibility(result)}
          className="text-base font-bold text-[#173B67] hover:text-[#2563EB] cursor-pointer transition-colors leading-snug line-clamp-2"
        >
          {scholarship.name}
        </h3>

        {/* Provider */}
        <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1.5 truncate">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{scholarship.provider}</span>
        </p>

        {/* Key Metrics: Amount & Deadline */}
        <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
              Award Amount
            </span>
            <span className="text-sm font-extrabold text-[#173B67]">
              {scholarship.awardAmount}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
              Deadline
            </span>
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3 text-slate-400" />
              {scholarship.deadline}
            </span>
          </div>
        </div>

        {/* Status Badge Box */}
        <div className="mt-4">
          {isEligible && (
            <div className="bg-[#DCFCE7] border border-[#16A34A]/30 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 text-[#16A34A] font-bold text-xs uppercase tracking-wide">
                <span>🟢</span>
                <span>POTENTIALLY ELIGIBLE</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                {criteriaSatisfiedCount} / {totalCriteriaCount} known mandatory criteria satisfied
              </p>
            </div>
          )}

          {isFailed && (
            <div className="bg-[#FEE2E2] border border-[#DC2626]/30 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 text-[#DC2626] font-bold text-xs uppercase tracking-wide">
                <span>🔴</span>
                <span>DOES NOT MEET KNOWN CRITERIA</span>
              </div>
              <p className="text-[11px] text-rose-800 font-medium mt-0.5">
                {criteriaFailedCount} mandatory criterion not satisfied
              </p>
            </div>
          )}

          {isReview && (
            <div className="bg-[#FEF3C7] border border-[#D97706]/30 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 text-[#D97706] font-bold text-xs uppercase tracking-wide">
                <span>🟡</span>
                <span>REVIEW REQUIRED</span>
              </div>
              <p className="text-[11px] text-amber-900 font-medium mt-0.5">
                {criteriaReviewCount} criterion needs verification
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions & Footer */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Left: View Eligibility / See Why / Review */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewEligibility(result)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
              isEligible
                ? 'bg-[#16A34A] hover:bg-emerald-700 text-white'
                : isFailed
                ? 'bg-[#DC2626] hover:bg-rose-700 text-white'
                : 'bg-[#D97706] hover:bg-amber-700 text-white'
            }`}
          >
            {isEligible && 'View Eligibility'}
            {isFailed && 'See Why'}
            {isReview && 'Review Eligibility'}
          </button>

          <button
            onClick={() => onWhyScholarship(result)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 hover:text-[#173B67] transition-colors"
            title="Why this scholarship?"
          >
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
          </button>
        </div>

        {/* Right: Compare Toggle & Source */}
        <div className="flex items-center gap-2">
          <label 
            className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer select-none"
            title="Compare up to 3 scholarships side by side"
          >
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(scholarship)}
              className="rounded text-[#2563EB] focus:ring-[#2563EB] w-3.5 h-3.5"
            />
            <span className="hidden sm:inline">Compare</span>
          </label>

          <a
            href={scholarship.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            title="Open official source URL"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
