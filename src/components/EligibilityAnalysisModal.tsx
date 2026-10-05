import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Calendar,
  Building
} from 'lucide-react';
import { EvaluatedScholarshipResult, EligibilityCriterion } from '../types';
import { ReasoningPanel } from './ReasoningPanel';
import { SourceEvidenceDrawer } from './SourceEvidenceDrawer';

interface EligibilityAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EvaluatedScholarshipResult;
}

export const EligibilityAnalysisModal: React.FC<EligibilityAnalysisModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [selectedEvidenceCriterion, setSelectedEvidenceCriterion] = useState<EligibilityCriterion | null>(null);

  if (!isOpen) return null;

  const {
    scholarship,
    overallStatus,
    criteriaSatisfiedCount,
    criteriaFailedCount,
    criteriaReviewCount,
    totalCriteriaCount,
    evaluatedCriteria,
    failedMandatoryCriterion,
    reviewRequiredCriterion,
    summaryText,
  } = result;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-[#F7F9FC] rounded-2xl shadow-2xl border border-[#E2E8F0] w-full max-w-5xl overflow-hidden my-auto animate-fade-in flex flex-col">
        {/* Top Bar Navigation */}
        <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173B67] hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Scholarships</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Source Data
            </span>
            <a
              href={scholarship.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 text-xs font-semibold text-[#173B67] transition-colors"
            >
              <span>Official Source</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Scholarship Meta Header */}
        <div className="bg-white px-6 py-6 border-b border-[#E2E8F0]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#173B67] border border-slate-200">
                  {scholarship.providerType}
                </span>
                <span className="text-xs text-[#64748B]">
                  Scheme ID: <strong className="font-mono text-slate-700">{scholarship.id}</strong>
                </span>
                {scholarship.isDemoData && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-[#2563EB] border border-blue-200">
                    DEMO DATA
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B67] tracking-tight">
                {scholarship.name}
              </h1>
              <p className="text-sm font-medium text-[#64748B] mt-1 flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                <span>{scholarship.provider}</span>
              </p>
            </div>

            {/* Award & Deadline Badge Pill */}
            <div className="flex sm:flex-col items-end justify-between sm:justify-center bg-slate-50 p-3.5 rounded-xl border border-[#E2E8F0] shrink-0">
              <div className="text-right">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                  Award Amount
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#173B67]">
                  {scholarship.awardAmount}
                </span>
              </div>
              <div className="text-right mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Deadline: <strong>{scholarship.deadline}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto">
          {/* =========================================================================
              LARGE RESULT PANEL (Case 1: Eligible | Case 2: Ineligible | Case 3: Review)
             ========================================================================= */}

          {/* CASE 1: POTENTIALLY ELIGIBLE */}
          {overallStatus === 'POTENTIALLY_ELIGIBLE' && (
            <div className="p-6 rounded-2xl bg-[#DCFCE7] border-2 border-[#16A34A] text-[#16A34A] shadow-xs animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#16A34A] text-white text-xs font-bold tracking-wider uppercase">
                      ✓ POTENTIALLY ELIGIBLE
                    </span>
                    <span className="text-xs font-bold text-emerald-900 bg-white/70 px-3 py-1 rounded-full border border-emerald-300">
                      {criteriaSatisfiedCount} / {totalCriteriaCount} Known Criteria Satisfied
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-950 mt-2">
                    Your profile satisfies all currently known mandatory eligibility criteria.
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                    Based on your verified academic scores, financial background, and Karnataka state domicile, you meet the published prerequisites for this scholarship scheme.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: DOES NOT MEET KNOWN CRITERIA */}
          {overallStatus === 'DOES_NOT_MEET' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 rounded-2xl bg-[#FEE2E2] border-2 border-[#DC2626] text-[#DC2626] shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#DC2626] text-white text-xs font-bold tracking-wider uppercase">
                        ✕ DOES NOT MEET KNOWN CRITERIA
                      </span>
                      <span className="text-xs font-bold text-rose-950 bg-white/80 px-3 py-1 rounded-full border border-rose-300">
                        {criteriaFailedCount} Mandatory Requirement Not Satisfied
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-rose-950 mt-2">
                      {summaryText}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-900 mt-1 leading-relaxed">
                      We have analyzed the published scheme norms. Your profile currently falls outside the statutory boundary conditions specified in the official notification.
                    </p>
                  </div>
                </div>
              </div>

              {/* CRITICAL FAILURE BREAKDOWN: WHAT IS REQUIRED vs STUDENT PROFILE vs THE DIFFERENCE vs WHY IT MATTERS */}
              {failedMandatoryCriterion && (
                <div className="bg-white border-2 border-rose-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                    <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                      Failed Mandatory Condition Breakdown: {failedMandatoryCriterion.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {/* What is Required */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        WHAT THE SCHOLARSHIP REQUIRES
                      </span>
                      <p className="text-xs font-bold text-[#173B67] mt-1.5 leading-snug">
                        {failedMandatoryCriterion.requirementText}
                      </p>
                    </div>

                    {/* What Student Contains */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        WHAT YOUR PROFILE CONTAINS
                      </span>
                      <p className="text-xs font-bold text-[#172033] mt-1.5 leading-snug">
                        {failedMandatoryCriterion.studentValueDisplay}
                      </p>
                    </div>

                    {/* The Difference */}
                    <div className="bg-rose-50 p-3.5 rounded-lg border border-rose-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                        THE DIFFERENCE
                      </span>
                      <p className="text-xs font-extrabold text-rose-800 mt-1.5 leading-snug">
                        {failedMandatoryCriterion.differenceText || 'Threshold not satisfied'}
                      </p>
                    </div>

                    {/* Why This Matters */}
                    <div className="bg-blue-50/70 p-3.5 rounded-lg border border-blue-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block">
                        WHY THIS MATTERS
                      </span>
                      <p className="text-xs text-slate-700 mt-1.5 leading-snug">
                        {failedMandatoryCriterion.whyItMatters || 'This criterion is listed as a mandatory eligibility requirement in the scholarship information.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Reasoning: <span className="text-slate-800 font-medium">{failedMandatoryCriterion.reasoning}</span>
                    </p>
                    <button
                      onClick={() => setSelectedEvidenceCriterion(failedMandatoryCriterion)}
                      className="text-xs font-semibold text-[#2563EB] hover:underline shrink-0 ml-3"
                    >
                      View Source Evidence →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CASE 3: REVIEW REQUIRED */}
          {overallStatus === 'REVIEW_REQUIRED' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 rounded-2xl bg-[#FEF3C7] border-2 border-[#D97706] text-[#D97706] shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#D97706] text-white text-xs font-bold tracking-wider uppercase">
                        🟡 REVIEW REQUIRED
                      </span>
                      <span className="text-xs font-bold text-amber-950 bg-white/80 px-3 py-1 rounded-full border border-amber-300">
                        {criteriaReviewCount} Criterion Needs Verification
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-amber-950 mt-2">
                      We couldn't confidently determine your eligibility for one or more criteria.
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                      Scholarship Sathi never converts ambiguity into a fake pass or fail. The available notification circular contains unspecified conditions that require direct verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* UNKNOWN CRITERION BREAKDOWN: WHAT WE KNOW vs WHAT IS UNCLEAR vs WHAT TO DO */}
              {reviewRequiredCriterion && (
                <div className="bg-white border-2 border-amber-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      Ambiguity Investigation: {reviewRequiredCriterion.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* What We Know */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        WHAT WE KNOW
                      </span>
                      <p className="text-xs text-[#172033] mt-1.5 leading-relaxed font-medium">
                        The scholarship requires enrollment in an "approved specialized emerging technology degree."
                      </p>
                    </div>

                    {/* What Is Unclear */}
                    <div className="bg-amber-50/70 p-3.5 rounded-lg border border-amber-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                        WHAT IS UNCLEAR
                      </span>
                      <p className="text-xs text-amber-950 mt-1.5 leading-relaxed">
                        {reviewRequiredCriterion.unclearReason || 'The available scholarship information does not clearly identify whether the student\'s specific course is included.'}
                      </p>
                    </div>

                    {/* What To Do */}
                    <div className="bg-blue-50/70 p-3.5 rounded-lg border border-blue-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block">
                        WHAT TO DO
                      </span>
                      <p className="text-xs text-slate-800 mt-1.5 leading-relaxed font-semibold">
                        {reviewRequiredCriterion.recommendedAction || 'Verify your course against the official scholarship notification.'}
                      </p>
                      <a
                        href={scholarship.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#173B67] hover:bg-[#0B2545] text-white text-xs font-semibold"
                      >
                        <span>Open Official Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              CRITERION-BY-CRITERION ELIGIBILITY BREAKDOWN
             ========================================================================= */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-[#173B67] uppercase tracking-wider">
                  Eligibility Breakdown
                </h3>
                <p className="text-xs text-[#64748B]">
                  Detailed evaluation of every statutory requirement specified by the provider
                </p>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {evaluatedCriteria.length} parameters evaluated
              </span>
            </div>

            <div className="space-y-3">
              {evaluatedCriteria.map(criterion => {
                const isSatisfied = criterion.evaluatedStatus === 'SATISFIED';
                const isNotSatisfied = criterion.evaluatedStatus === 'NOT_SATISFIED';
                const isReview = criterion.evaluatedStatus === 'NEEDS_VERIFICATION';

                return (
                  <div
                    key={criterion.id}
                    className={`bg-white rounded-xl border p-4 sm:p-5 transition-all shadow-xs ${
                      isNotSatisfied
                        ? 'border-rose-300 ring-1 ring-rose-200'
                        : isReview
                        ? 'border-amber-300 ring-1 ring-amber-200'
                        : 'border-[#E2E8F0] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isSatisfied
                            ? 'bg-emerald-100 text-emerald-700'
                            : isNotSatisfied
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isSatisfied && <CheckCircle2 className="w-4 h-4" />}
                          {isNotSatisfied && <XCircle className="w-4 h-4" />}
                          {isReview && <HelpCircle className="w-4 h-4" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-[#173B67]">
                              {criterion.title}
                            </h4>
                            {criterion.isMandatory && (
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                Mandatory
                              </span>
                            )}
                          </div>

                          {/* Requirements & Profile Comparison */}
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                            <div>
                              <span className="text-[#64748B] font-medium">Required: </span>
                              <strong className="text-[#172033]">{criterion.requirementText}</strong>
                            </div>
                            <div>
                              <span className="text-[#64748B] font-medium">Your profile: </span>
                              <strong className="text-[#172033]">{criterion.studentValueDisplay || 'Aarav Sharma'}</strong>
                            </div>
                          </div>

                          {/* Reasoning & Status */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs">
                            <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider block">
                              Reasoning:
                            </span>
                            <p className="text-slate-700 mt-0.5">
                              "{criterion.reasoning}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge & Evidence Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                          isSatisfied
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : isNotSatisfied
                            ? 'bg-[#FEE2E2] text-[#DC2626]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}>
                          {isSatisfied && 'Requirement satisfied'}
                          {isNotSatisfied && 'NOT SATISFIED'}
                          {isReview && 'Needs verification'}
                        </span>

                        <button
                          onClick={() => setSelectedEvidenceCriterion(criterion)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#173B67] hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Source Evidence</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              REASONING PANEL: How did Scholarship Sathi reach this result?
             ========================================================================= */}
          <ReasoningPanel result={result} />

          {/* =========================================================================
              OVERALL ELIGIBILITY SUMMARY (Section 19)
             ========================================================================= */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
            <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">
              YOUR ELIGIBILITY SUMMARY
            </h4>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-5 text-sm font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                  {criteriaSatisfiedCount} Criteria satisfied
                </span>

                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-xs">✕</span>
                  {criteriaFailedCount} Criteria failed
                </span>

                <span className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs">?</span>
                  {criteriaReviewCount} Criteria requiring verification
                </span>
              </div>

              <div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide inline-block ${
                  overallStatus === 'POTENTIALLY_ELIGIBLE'
                    ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/40'
                    : overallStatus === 'DOES_NOT_MEET'
                    ? 'bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/40'
                    : 'bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/40'
                }`}>
                  {overallStatus === 'POTENTIALLY_ELIGIBLE' && '🟢 POTENTIALLY ELIGIBLE'}
                  {overallStatus === 'DOES_NOT_MEET' && '✕ DOES NOT MEET KNOWN CRITERIA'}
                  {overallStatus === 'REVIEW_REQUIRED' && '🟡 REVIEW REQUIRED'}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
              <p>
                <strong>Legal Disclaimer:</strong> Final eligibility is determined by the scholarship provider.
              </p>
              <span className="text-slate-400">
                Last verified: {scholarship.lastVerifiedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="bg-white border-t border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← Back to Opportunities
          </button>

          <div className="flex items-center gap-3">
            <a
              href={scholarship.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#173B67] hover:bg-[#0B2545] text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Sub-drawer for Source Evidence */}
      {selectedEvidenceCriterion && (
        <SourceEvidenceDrawer
          isOpen={true}
          onClose={() => setSelectedEvidenceCriterion(null)}
          scholarshipName={scholarship.name}
          criterionTitle={selectedEvidenceCriterion.title}
          requirementText={selectedEvidenceCriterion.requirementText}
          studentValueDisplay={selectedEvidenceCriterion.studentValueDisplay}
          evaluatedStatus={selectedEvidenceCriterion.evaluatedStatus}
          evidence={selectedEvidenceCriterion.evidence}
        />
      )}
    </div>
  );
};
