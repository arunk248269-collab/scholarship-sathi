import React from 'react';
import { 
  Compass, 
  Layers, 
  Clock, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  student: StudentProfile;
  onOpenProfile: () => void;
  onLoadDemoAarav: () => void;
  compareCount: number;
  onOpenPrivacy: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  student,
  onOpenProfile,
  onLoadDemoAarav,
  compareCount,
  onOpenPrivacy,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Top Banner Notice */}
      <div className="bg-[#0B2545] text-white text-xs px-4 py-1.5 flex items-center justify-between font-sans">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#2563EB] text-white uppercase tracking-wider">
            Demo Mode Active
          </span>
          <span className="text-slate-300">
            Evaluating against verified student profile: <strong className="text-white font-medium">{student.fullName}</strong> ({student.degree} {student.yearOfStudy}, {student.state})
          </span>
          <span className="hidden md:inline text-slate-400 text-[11px] ml-auto">
            Configured sources last synced: Today, 09:20 AM IST
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-[#173B67] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0B2545] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#173B67] leading-none">
                  SCHOLARSHIP
                </span>
                <span className="font-bold text-lg tracking-tight text-[#2563EB] leading-none">
                  SATHI
                </span>
              </div>
              <p className="text-[10px] font-medium text-[#64748B] tracking-wide mt-0.5">
                Know your opportunities. Understand your eligibility.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentTab === 'dashboard'
                  ? 'text-[#173B67] bg-slate-100 font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setCurrentTab('discover')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'discover'
                  ? 'text-[#173B67] bg-slate-100 font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Opportunities</span>
              <span className="text-[11px] bg-slate-200 text-[#172033] font-semibold px-1.5 py-0.2 rounded-full">
                42
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('compare')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'compare'
                  ? 'text-[#173B67] bg-slate-100 font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="text-[11px] bg-[#2563EB] text-white font-semibold px-1.5 py-0.2 rounded-full">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('deadlines')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'deadlines'
                  ? 'text-[#173B67] bg-slate-100 font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Deadlines</span>
            </button>

            <button
              onClick={() => setCurrentTab('sources')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'sources'
                  ? 'text-[#173B67] bg-slate-100 font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>Sources</span>
            </button>

            <button
              onClick={() => setCurrentTab('pipeline')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'pipeline'
                  ? 'text-[#173B67] bg-slate-100 font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#2563EB]" />
              <span>AI Intelligence</span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Reset / Demo Aarav Button */}
            <button
              onClick={onLoadDemoAarav}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#2563EB]/40 bg-[#2563EB]/5 text-[#2563EB] hover:bg-[#2563EB]/10 transition-colors shadow-xs"
              title="Reload official hackathon demo student profile: Aarav Sharma"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>TRY DEMO</span>
            </button>

            {/* Privacy Center */}
            <button
              onClick={onOpenPrivacy}
              className="p-2 text-[#64748B] hover:text-[#172033] hover:bg-slate-100 rounded-md transition-colors"
              title="Privacy Center & Data Transparency"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            {/* Profile Avatar & Progress */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-full bg-[#173B67] text-white flex items-center justify-center text-xs font-bold">
                {student.fullName ? student.fullName.slice(0, 2).toUpperCase() : 'AS'}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-[#172033] leading-none">
                  {student.fullName || 'Student'}
                </p>
                <p className="text-[10px] text-emerald-600 font-medium leading-none mt-0.5">
                  {student.profileCompletionPercentage}% Profile
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
