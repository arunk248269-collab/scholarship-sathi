import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <div className="border-y border-[#E2E8F0] bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#172033]">
              Source-backed information
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#172033]">
              Explainable eligibility
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#172033]">
              Personalized matching
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#172033]">
              Student-controlled decisions
            </span>
          </div>
        </div>

        {/* Small disclaimer */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[11px] text-[#64748B]">
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
            <strong>Important notice:</strong> Eligibility results are based on available information. Final eligibility is determined by the scholarship provider.
          </p>
          <span className="text-[10px] tracking-wide text-slate-400">
            Rule engine v2.4 · Deterministic logic verification
          </span>
        </div>
      </div>
    </div>
  );
};
