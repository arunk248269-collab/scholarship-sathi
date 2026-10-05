import React from 'react';
import { ArrowRight, Search, User, Database, Cpu, FileCheck, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onFindScholarships: () => void;
  onExploreScholarships: () => void;
  onLoadDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFindScholarships,
  onExploreScholarships,
  onLoadDemo,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2545] via-[#173B67] to-[#0B2545] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle background technical grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI-Powered Scholarship Discovery & Explainable Eligibility</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Stop searching. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
              Start matching.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Scholarship Sathi discovers scholarship opportunities from configured sources and compares their eligibility requirements with your profile — so you know which opportunities are worth exploring.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onFindScholarships}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Find My Scholarships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreScholarships}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-blue-300" />
              <span>Explore Scholarships (42)</span>
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Evaluating with verified test profile: <span className="text-slate-200 underline cursor-pointer" onClick={onLoadDemo}>Aarav Sharma (B.E. 3rd Year)</span>
          </p>
        </div>

        {/* HERO VISUAL: 5-Stage Conceptual Workflow Pipeline */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-5 sm:p-7 shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                Deterministic Decision Flow
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                How Scholarship Sathi Resolves Eligibility
              </h2>
            </div>

            {/* Workflow steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {/* Step 1 */}
              <div className="bg-[#172033]/70 border border-slate-700/60 rounded-lg p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2.5">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-blue-300 tracking-wider">STAGE 01</span>
                <h4 className="text-sm font-semibold text-white mt-0.5">Student Profile</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Verified degree, marks, income & domicile
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#172033]/70 border border-slate-700/60 rounded-lg p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-indigo-300 tracking-wider">STAGE 02</span>
                <h4 className="text-sm font-semibold text-white mt-0.5">Discovery</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Configured feeds & official notifications
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#172033]/70 border border-slate-700/60 rounded-lg p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2.5">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-cyan-300 tracking-wider">STAGE 03</span>
                <h4 className="text-sm font-semibold text-white mt-0.5">AI Matching</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Deterministic rule parsing & criteria mapping
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#172033]/70 border border-slate-700/60 rounded-lg p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2.5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-amber-300 tracking-wider">STAGE 04</span>
                <h4 className="text-sm font-semibold text-white mt-0.5">Eligibility Analysis</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Clause-by-clause mathematical delta
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-[#172033]/70 border border-emerald-500/40 rounded-lg p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-emerald-300 tracking-wider">STAGE 05</span>
                <h4 className="text-sm font-semibold text-white mt-0.5">Clear Decision</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Eligible, Ineligible, or Review with source proof
                </p>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs font-medium text-slate-300 tracking-wide">
                “One profile. Multiple opportunities. Clear answers.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
