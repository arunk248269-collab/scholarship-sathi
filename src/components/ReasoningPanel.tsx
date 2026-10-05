import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { EvaluatedScholarshipResult } from '../types';

interface ReasoningPanelProps {
  result: EvaluatedScholarshipResult;
}

export const ReasoningPanel: React.FC<ReasoningPanelProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="border border-[#E2E8F0] rounded-xl bg-white overflow-hidden shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#173B67]">
              How did Scholarship Sathi reach this result?
            </h4>
            <p className="text-xs text-[#64748B]">
              Transparent, deterministic evaluation logic based on official criteria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#2563EB] hidden sm:inline">
            {isOpen ? 'Collapse Steps' : 'View Decision Flow'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#64748B]" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {result.decisionSteps.map((step, idx) => (
              <div 
                key={step.stepNumber} 
                className="bg-slate-50 border border-[#E2E8F0] rounded-lg p-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] px-1.5 py-0.5 rounded bg-blue-100/70">
                      STEP {step.stepNumber}
                    </span>
                    {idx < 4 && (
                      <span className="hidden md:inline text-slate-300 text-xs font-bold">→</span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-[#172033] leading-snug">
                    {step.stepTitle}
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.formula && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200">
                    <code className="text-[10px] font-mono text-[#173B67] bg-white px-1.5 py-0.5 rounded border border-slate-200 block truncate">
                      {step.formula}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between text-xs text-slate-600">
            <span>
              <strong>Rule Verification Principle:</strong> No probabilistic hallucination. Every parameter is mathematically compared against published gazette notices.
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#173B67]">
              Certainty Index: 100% Deterministic
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
