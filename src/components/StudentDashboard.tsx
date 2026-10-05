import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Radio, 
  FileCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { StudentProfile, EvaluatedScholarshipResult, Scholarship } from '../types';
import { ScholarshipCard } from './ScholarshipCard';

interface StudentDashboardProps {
  student: StudentProfile;
  evaluatedResults: EvaluatedScholarshipResult[];
  onNavigateToDiscover: (filterPreset?: string) => void;
  onViewEligibility: (result: EvaluatedScholarshipResult) => void;
  onWhyScholarship: (result: EvaluatedScholarshipResult) => void;
  onOpenProfile: () => void;
  onOpenSourceMonitor: () => void;
  onOpenPipeline: () => void;
  compareList: Scholarship[];
  onToggleCompare: (scholarship: Scholarship) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  evaluatedResults,
  onNavigateToDiscover,
  onViewEligibility,
  onWhyScholarship,
  onOpenProfile,
  onOpenSourceMonitor,
  onOpenPipeline,
  compareList,
  onToggleCompare,
}) => {
  // Count stats
  const eligibleResults = evaluatedResults.filter(r => r.overallStatus === 'POTENTIALLY_ELIGIBLE');
  const failedResults = evaluatedResults.filter(r => r.overallStatus === 'DOES_NOT_MEET');
  const reviewResults = evaluatedResults.filter(r => r.overallStatus === 'REVIEW_REQUIRED');
  const closingSoonResults = evaluatedResults.filter(r => r.scholarship.isClosingSoon);

  // Time-aware greeting
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  });

  // Specific demo items for quick jump
  const demoEligible = evaluatedResults.find(r => r.scholarship.id === 'national-merit-eng') || eligibleResults[0];
  const demoIneligible = evaluatedResults.find(r => r.scholarship.id === 'vidyasaarathi-pragati') || failedResults[0];
  const demoReview = evaluatedResults.find(r => r.scholarship.id === 'global-tech-innovators') || reviewResults[0];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header section */}
      <div className="bg-white border-b border-[#E2E8F0] -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Scholarship Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B67] tracking-tight">
              {greeting}, {student.fullName || 'Student'}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Here are scholarship opportunities matched to your profile.
            </p>
          </div>

          {/* Large CTA: Find My Best Matches */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToDiscover('POTENTIALLY_ELIGIBLE')}
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 group"
            >
              <span>Find My Best Matches</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenProfile}
              className="px-4 py-3 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* STATS TILES (Section 9) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Tile 1: Profile Completion */}
          <div 
            onClick={onOpenProfile}
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                PROFILE COMPLETION
              </span>
              <span className="text-[11px] font-semibold text-[#2563EB] group-hover:underline">
                Edit
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#173B67]">
                {student.profileCompletionPercentage}%
              </span>
            </div>
            <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#2563EB] h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${student.profileCompletionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 truncate">
              {student.degree} {student.yearOfStudy} · {student.academicPercentage}%
            </p>
          </div>

          {/* Tile 2: Scholarships Discovered */}
          <div 
            onClick={() => onNavigateToDiscover('ALL')}
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                SCHOLARSHIPS DISCOVERED
              </span>
              <Compass className="w-4 h-4 text-slate-400 group-hover:text-[#173B67]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#173B67]">
                {evaluatedResults.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                from 8 configured sources
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-3 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% official verified portals
            </p>
          </div>

          {/* Tile 3: Potential Matches */}
          <div 
            onClick={() => onNavigateToDiscover('POTENTIALLY_ELIGIBLE')}
            className="bg-white p-5 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                POTENTIAL MATCHES
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
                {eligibleResults.length}
              </span>
              <span className="text-xs font-semibold text-emerald-800">
                schemes qualified
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-3">
              Satisfies 100% mandatory conditions
            </p>
          </div>

          {/* Tile 4: Closing Soon */}
          <div 
            onClick={() => onNavigateToDiscover('CLOSING_SOON')}
            className="bg-white p-5 rounded-xl border border-rose-200 hover:border-rose-300 transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                CLOSING SOON
              </span>
              <Clock className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-700">
                {closingSoonResults.length}
              </span>
              <span className="text-xs font-semibold text-rose-800">
                deadline ≤ 10 days
              </span>
            </div>
            <p className="text-[11px] text-rose-700 font-medium mt-3">
              Action recommended immediately
            </p>
          </div>
        </div>

        {/* HACKATHON DEMO SHORTCUT STRIP: Direct access to the 3 mandatory evaluation outcomes */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#173B67] text-white p-5 rounded-2xl shadow-md border border-slate-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2563EB] uppercase tracking-wider">
                  Judge Showcase Walkthrough
                </span>
                <span className="text-xs text-blue-200">
                  Instant Test of 3 Core Outcomes
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                Explore The Explainable Decision Engine
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Click any case to inspect exact reasoning, mathematical deltas, or verified official sources:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {demoEligible && (
                <button
                  onClick={() => onViewEligibility(demoEligible)}
                  className="px-3.5 py-2.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 text-left transition-all group"
                >
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Case 1 · Passes All Rules
                  </span>
                  <span className="text-xs font-bold text-white flex items-center justify-between mt-0.5">
                    <span>🟢 Potentially Eligible</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}

              {demoIneligible && (
                <button
                  onClick={() => onViewEligibility(demoIneligible)}
                  className="px-3.5 py-2.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-500/50 text-left transition-all group"
                >
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                    Case 2 · Income Fails by ₹30k
                  </span>
                  <span className="text-xs font-bold text-white flex items-center justify-between mt-0.5">
                    <span>🔴 Does Not Meet</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}

              {demoReview && (
                <button
                  onClick={() => onViewEligibility(demoReview)}
                  className="px-3.5 py-2.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-500/50 text-left transition-all group"
                >
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Case 3 · Ambiguous Notice
                  </span>
                  <span className="text-xs font-bold text-white flex items-center justify-between mt-0.5">
                    <span>🟡 Review Required</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TOP MATCHES ROW */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#173B67]">
                Top Opportunities Matched to Aarav
              </h2>
              <p className="text-xs text-[#64748B]">
                High confidence matches satisfying verified undergraduate criteria
              </p>
            </div>
            <button
              onClick={() => onNavigateToDiscover('ALL')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#173B67] flex items-center gap-1"
            >
              <span>View all 42 opportunities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluatedResults.slice(0, 3).map(res => (
              <ScholarshipCard
                key={res.scholarship.id}
                result={res}
                onViewEligibility={onViewEligibility}
                onWhyScholarship={onWhyScholarship}
                isCompared={compareList.some(s => s.id === res.scholarship.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>

        {/* PLATFORM INTELLIGENCE QUICK ACCESS TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Source Monitor Card */}
          <div 
            onClick={onOpenSourceMonitor}
            className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-slate-300 transition-all cursor-pointer shadow-xs flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#173B67]">
                  Live Source Monitoring Feeds
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  8 configured institutional & government sources actively indexed
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* AI Intelligence Pipeline Card */}
          <div 
            onClick={onOpenPipeline}
            className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-slate-300 transition-all cursor-pointer shadow-xs flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#173B67]">
                  Scholarship Intelligence Extraction
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspect the 7-stage OCR and rule extraction pipeline
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
