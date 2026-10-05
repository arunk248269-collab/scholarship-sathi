import React from 'react';
import { X, ExternalLink, Calendar, ShieldCheck, Clock, ArrowDown } from 'lucide-react';
import { SourceEvidence } from '../types';

interface SourceEvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scholarshipName: string;
  criterionTitle: string;
  requirementText: string;
  studentValueDisplay?: string;
  evaluatedStatus?: string;
  evidence: SourceEvidence;
}

export const SourceEvidenceDrawer: React.FC<SourceEvidenceDrawerProps> = ({
  isOpen,
  onClose,
  scholarshipName,
  criterionTitle,
  requirementText,
  studentValueDisplay,
  evaluatedStatus,
  evidence,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E2E8F0] w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#173B67] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold block">
                Source Evidence Audit
              </span>
              <h3 className="text-sm font-bold text-white">
                Verifiable Official Documentation
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
        <div className="p-6 space-y-5 text-sm text-[#172033]">
          {/* Visual Connection Flow: REQUIREMENT -> SOURCE -> STUDENT VALUE -> DECISION */}
          <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
              Traceability Pipeline
            </span>

            {/* Stage 1: Requirement */}
            <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0]">
              <span className="text-[10px] font-bold text-[#64748B] uppercase">01 · Requirement</span>
              <p className="text-xs font-semibold text-[#172033] mt-0.5">{requirementText}</p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Stage 2: Official Source Document */}
            <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200">
              <span className="text-[10px] font-bold text-[#2563EB] uppercase">02 · Official Source Document</span>
              <p className="text-xs font-semibold text-[#173B67] mt-0.5">{evidence.sourceName}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{evidence.sectionReference}</p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Stage 3: Student Profile Value */}
            <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0]">
              <span className="text-[10px] font-bold text-[#64748B] uppercase">03 · Student Verified Value</span>
              <p className="text-xs font-semibold text-[#172033] mt-0.5">
                {studentValueDisplay || 'Aarav Sharma Profile'}
              </p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Stage 4: Decision */}
            <div className={`p-2.5 rounded-lg border ${
              evaluatedStatus === 'SATISFIED' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : evaluatedStatus === 'NOT_SATISFIED'
                ? 'bg-rose-50 border-rose-300 text-rose-800'
                : 'bg-amber-50 border-amber-300 text-amber-800'
            }`}>
              <span className="text-[10px] font-bold uppercase">04 · Decision Outcome</span>
              <p className="text-xs font-bold mt-0.5">
                {evaluatedStatus === 'SATISFIED'
                  ? '✓ Requirement Satisfied'
                  : evaluatedStatus === 'NOT_SATISFIED'
                  ? '✕ Condition Breached / Not Satisfied'
                  : '🟡 Verification Required Against Circular'}
              </p>
            </div>
          </div>

          {/* Scholarship & Criterion Title */}
          <div>
            <span className="text-xs text-[#64748B]">Scholarship:</span>
            <p className="text-xs font-bold text-[#173B67]">{scholarshipName}</p>
            <span className="text-xs text-[#64748B] mt-2 block">Relevant Criterion:</span>
            <p className="text-xs font-semibold text-[#172033]">{criterionTitle}</p>
          </div>

          {/* Exact Clause Blockquote */}
          <div className="border-l-4 border-[#2563EB] pl-3.5 py-1 bg-slate-50 rounded-r-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Extracted Legal Notification Clause
            </span>
            <blockquote className="text-xs font-mono text-[#172033] leading-relaxed italic">
              "{evidence.exactClause}"
            </blockquote>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-[#E2E8F0]">
            <div>
              <span className="text-slate-500 block text-[11px]">Source Category:</span>
              <strong className="text-[#172033]">{evidence.sourceType}</strong>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Published Date:</span>
              <span className="text-[#172033] flex items-center gap-1 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" /> {evidence.publishedDate}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Last Checked by Crawler:</span>
              <span className="text-[#172033] flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3 text-emerald-600" /> {evidence.lastCheckedDate}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Section Reference:</span>
              <strong className="text-[#172033] truncate block">{evidence.sectionReference}</strong>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#E2E8F0] px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close Evidence Audit
          </button>

          <a
            href={evidence.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173B67] hover:bg-[#0B2545] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Open Official Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
