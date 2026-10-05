import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, X, Layers, Radio } from 'lucide-react';

interface DemoTourBarProps {
  onSelectEligibleDemo: () => void;
  onSelectIneligibleDemo: () => void;
  onSelectReviewDemo: () => void;
  onOpenCompare: () => void;
  onOpenSourceMonitor: () => void;
}

export const DemoTourBar: React.FC<DemoTourBarProps> = ({
  onSelectEligibleDemo,
  onSelectIneligibleDemo,
  onSelectReviewDemo,
  onOpenCompare,
  onOpenSourceMonitor,
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  if (isDismissed) return null;

  return (
    <div className="bg-[#0B2545] text-white border-b border-slate-700/80 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#2563EB] text-white font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Hackathon Demo Tour</span>
          </div>
          <span className="text-slate-300 text-xs hidden sm:inline">
            1-Click Test of Core Explainable Eligibility Outcomes:
          </span>
        </div>

        {/* Quick Click Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Outcome 1: Eligible */}
          <button
            onClick={onSelectEligibleDemo}
            className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 hover:text-emerald-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Inspect 5/5 satisfied criteria on National Merit Technical Scheme"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Potentially Eligible</span>
          </button>

          {/* Outcome 2: Ineligible */}
          <button
            onClick={onSelectIneligibleDemo}
            className="px-2.5 py-1 rounded bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300 hover:text-rose-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Inspect failure delta: income exceeds limit by ₹30,000"
          >
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>2. Does Not Meet (Why?)</span>
          </button>

          {/* Outcome 3: Review Required */}
          <button
            onClick={onSelectReviewDemo}
            className="px-2.5 py-1 rounded bg-amber-950 hover:bg-amber-900 border border-amber-500/50 text-amber-300 hover:text-amber-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Inspect ambiguous course specification in official notification"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Review Required</span>
          </button>

          {/* Compare */}
          <button
            onClick={onOpenCompare}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Compare</span>
          </button>

          {/* Feeds */}
          <button
            onClick={onOpenSourceMonitor}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Source Feeds</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded ml-1"
            title="Dismiss Demo Bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
