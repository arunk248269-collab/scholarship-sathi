import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { EvaluatedScholarshipResult } from '../types';

interface WhyScholarshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EvaluatedScholarshipResult;
}

export const WhyScholarshipModal: React.FC<WhyScholarshipModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen) return null;

  const { scholarship, whyThisScholarshipBullets, overallStatus } = result;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E2E8F0] w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#173B67] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-300" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold block">
                Match Intelligence
              </span>
              <h3 className="text-sm font-bold text-white">
                Why This Scholarship?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-[#172033]">
          <div>
            <h4 className="text-base font-bold text-[#173B67] leading-snug">
              {scholarship.name}
            </h4>
            <p className="text-xs text-[#64748B] mt-0.5">
              Provided by {scholarship.provider} · {scholarship.awardAmount}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
            <p className="text-xs font-semibold text-[#173B67] mb-3">
              {overallStatus === 'POTENTIALLY_ELIGIBLE'
                ? 'You appear to be a strong profile match because:'
                : overallStatus === 'DOES_NOT_MEET'
                ? 'While parts of your academic profile align, mandatory criteria are unfulfilled:'
                : 'Your profile has partial alignment, but critical ambiguity exists in the circular:'}
            </p>

            <ul className="space-y-2">
              {whyThisScholarshipBullets.length > 0 ? (
                whyThisScholarshipBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>General undergraduate degree standing verified in active semester.</span>
                </li>
              )}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Important:</strong> You should still verify the official notification before applying. Final award determinations remain at the sole discretion of the scholarship provider.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2E8F0] px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          <a
            href={scholarship.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
          >
            <span>Official Notification</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
