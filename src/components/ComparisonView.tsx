import React from 'react';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft,
  Building,
  Calendar
} from 'lucide-react';
import { Scholarship, EvaluatedScholarshipResult } from '../types';

interface ComparisonViewProps {
  compareList: Scholarship[];
  evaluatedResults: EvaluatedScholarshipResult[];
  onClose: () => void;
  onRemoveFromCompare: (id: string) => void;
  onViewEligibility: (result: EvaluatedScholarshipResult) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  compareList,
  evaluatedResults,
  onClose,
  onRemoveFromCompare,
  onViewEligibility,
}) => {
  // Map compared scholarships to their evaluated results
  const items = compareList.map(sch => {
    return evaluatedResults.find(r => r.scholarship.id === sch.id)!;
  }).filter(Boolean);

  const getCriterionValue = (res: EvaluatedScholarshipResult, type: string) => {
    const crit = res.evaluatedCriteria.find(c => c.type === type);
    if (!crit) return { text: 'Not Specified', status: 'NOT_SPECIFIED' };
    return {
      text: crit.requirementText,
      status: crit.evaluatedStatus || 'SATISFIED',
    };
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex items-center justify-between">
        <div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#173B67] mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Opportunities
          </button>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2563EB]" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#173B67]">
              Compare Opportunities
            </h1>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Side-by-side comparison of up to 3 selected scholarship schemes against Aarav Sharma's profile.
          </p>
        </div>

        <span className="text-xs font-bold bg-slate-100 text-[#173B67] px-3 py-1.5 rounded-lg border border-slate-200">
          {items.length} / 3 Selected
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center space-y-3">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-[#173B67]">No scholarships selected for comparison</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse scholarship opportunities and click the "Compare" checkbox on up to 3 cards to compare them here.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold"
          >
            Browse Opportunities
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-[#E2E8F0]">
                <th className="p-4 font-bold text-[#173B67] w-48 uppercase tracking-wider text-[11px]">
                  Attributes
                </th>
                {items.map(item => (
                  <th key={item.scholarship.id} className="p-4 min-w-[260px] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          {item.scholarship.providerType}
                        </span>
                        <h4 className="text-sm font-bold text-[#173B67] leading-snug mt-0.5">
                          {item.scholarship.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-slate-400" />
                          {item.scholarship.provider}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(item.scholarship.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-100"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2E8F0]">
              {/* Row: Profile Match */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Profile Match
                </td>
                {items.map(item => (
                  <td key={item.scholarship.id} className="p-4">
                    <span className="text-sm font-extrabold text-[#173B67]">
                      {item.scholarship.matchScore}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Status */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Eligibility Status
                </td>
                {items.map(item => (
                  <td key={item.scholarship.id} className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block ${
                      item.overallStatus === 'POTENTIALLY_ELIGIBLE'
                        ? 'bg-[#DCFCE7] text-[#16A34A]'
                        : item.overallStatus === 'DOES_NOT_MEET'
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : 'bg-[#FEF3C7] text-[#D97706]'
                    }`}>
                      {item.overallStatus === 'POTENTIALLY_ELIGIBLE' && '🟢 Potential Match'}
                      {item.overallStatus === 'DOES_NOT_MEET' && '✕ Not Eligible'}
                      {item.overallStatus === 'REVIEW_REQUIRED' && '🟡 Review Required'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Award */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Award Amount
                </td>
                {items.map(item => (
                  <td key={item.scholarship.id} className="p-4 font-bold text-slate-800 text-sm">
                    {item.scholarship.awardAmount}
                  </td>
                ))}
              </tr>

              {/* Row: Deadline */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Deadline
                </td>
                {items.map(item => (
                  <td key={item.scholarship.id} className="p-4 text-slate-700">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.scholarship.deadline}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Academic Requirement */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Academic Requirement
                </td>
                {items.map(item => {
                  const crit = getCriterionValue(item, 'ACADEMIC');
                  return (
                    <td key={item.scholarship.id} className="p-4">
                      <div className="flex items-start gap-1.5">
                        {crit.status === 'SATISFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NOT_SATISFIED' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NEEDS_VERIFICATION' && <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                        <span className="text-slate-700">{crit.text}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Income Requirement */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Income Requirement
                </td>
                {items.map(item => {
                  const crit = getCriterionValue(item, 'INCOME');
                  return (
                    <td key={item.scholarship.id} className="p-4">
                      <div className="flex items-start gap-1.5">
                        {crit.status === 'SATISFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NOT_SATISFIED' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NEEDS_VERIFICATION' && <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                        <span className="text-slate-700">{crit.text}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: State Requirement */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  State Eligibility
                </td>
                {items.map(item => {
                  const crit = getCriterionValue(item, 'STATE');
                  return (
                    <td key={item.scholarship.id} className="p-4">
                      <div className="flex items-start gap-1.5">
                        {crit.status === 'SATISFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NOT_SATISFIED' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NEEDS_VERIFICATION' && <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                        <span className="text-slate-700">{crit.text}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Category / Target */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Social Category
                </td>
                {items.map(item => {
                  const crit = getCriterionValue(item, 'CATEGORY');
                  return (
                    <td key={item.scholarship.id} className="p-4">
                      <div className="flex items-start gap-1.5">
                        {crit.status === 'SATISFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NOT_SATISFIED' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                        {crit.status === 'NEEDS_VERIFICATION' && <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                        <span className="text-slate-700">{crit.text}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Action Row */}
              <tr>
                <td className="p-4 font-semibold text-[#172033] bg-slate-50/50">
                  Actions
                </td>
                {items.map(item => (
                  <td key={item.scholarship.id} className="p-4">
                    <button
                      onClick={() => onViewEligibility(item)}
                      className="w-full px-3 py-2 rounded-lg bg-[#173B67] hover:bg-[#0B2545] text-white text-xs font-bold transition-colors"
                    >
                      View Full Analysis
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
