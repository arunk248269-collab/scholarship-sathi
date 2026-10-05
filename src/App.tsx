import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';

import { StudentProfile, Scholarship, EvaluatedScholarshipResult } from './types';
import { DEMO_STUDENT_AARAV } from './data/mockStudent';
import { MOCK_SCHOLARSHIPS } from './data/mockScholarships';
import { evaluateScholarship } from './services/eligibilityEngine';

import { Navbar } from './components/Navbar';
import { DemoTourBar } from './components/DemoTourBar';
import { TrustStrip } from './components/TrustStrip';
import { HeroSection } from './components/HeroSection';
import { StudentDashboard } from './components/StudentDashboard';
import { DiscoveryPage } from './components/DiscoveryPage';
import { ComparisonView } from './components/ComparisonView';
import { DeadlineIntelligence } from './components/DeadlineIntelligence';
import { SourceMonitorView } from './components/SourceMonitorView';
import { IntelligencePipelineView } from './components/IntelligencePipelineView';
import { EligibilityAnalysisModal } from './components/EligibilityAnalysisModal';
import { WhyScholarshipModal } from './components/WhyScholarshipModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { PrivacyCenterModal } from './components/PrivacyCenterModal';

export function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Student Profile State (defaults to official demo student Aarav Sharma)
  const [student, setStudent] = useState<StudentProfile>(DEMO_STUDENT_AARAV);

  // Comparison List State (defaults to 3 contrasting scholarships for instant demo)
  const [compareList, setCompareList] = useState<Scholarship[]>([
    MOCK_SCHOLARSHIPS[0], // National Merit (Eligible)
    MOCK_SCHOLARSHIPS[1], // Vidyasaarathi Pragati (Ineligible - Income ceiling)
    MOCK_SCHOLARSHIPS[2], // Global Tech (Review Required - Course ambiguous)
  ]);

  // Modal States
  const [selectedAnalysisResult, setSelectedAnalysisResult] = useState<EvaluatedScholarshipResult | null>(null);
  const [selectedWhyResult, setSelectedWhyResult] = useState<EvaluatedScholarshipResult | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [discoveryPresetFilter, setDiscoveryPresetFilter] = useState<string>('ALL');

  // Dynamically evaluate all 42 scholarships whenever student profile changes
  const evaluatedResults = useMemo(() => {
    return MOCK_SCHOLARSHIPS.map(sch => evaluateScholarship(sch, student));
  }, [student]);

  // Handler to toggle scholarship in comparison tray
  const handleToggleCompare = (scholarship: Scholarship) => {
    setCompareList(prev => {
      const exists = prev.some(s => s.id === scholarship.id);
      if (exists) {
        return prev.filter(s => s.id !== scholarship.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 scholarships simultaneously.');
          return prev;
        }
        return [...prev, scholarship];
      }
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(s => s.id !== id));
  };

  // Handler to reload Aarav Sharma demo profile
  const handleLoadDemoAarav = () => {
    setStudent(DEMO_STUDENT_AARAV);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.2 },
    });
  };

  // Quick jump actions for hackathon demo showcase
  const openDemoEligible = () => {
    const target = evaluatedResults.find(r => r.scholarship.id === 'national-merit-eng') || evaluatedResults[0];
    setSelectedAnalysisResult(target);
  };

  const openDemoIneligible = () => {
    const target = evaluatedResults.find(r => r.scholarship.id === 'vidyasaarathi-pragati') || evaluatedResults[1];
    setSelectedAnalysisResult(target);
  };

  const openDemoReview = () => {
    const target = evaluatedResults.find(r => r.scholarship.id === 'global-tech-innovators') || evaluatedResults[2];
    setSelectedAnalysisResult(target);
  };

  const handleNavigateToDiscover = (filterPreset: string = 'ALL') => {
    setDiscoveryPresetFilter(filterPreset);
    setCurrentTab('discover');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] flex flex-col font-sans selection:bg-[#2563EB]/15 selection:text-[#173B67]">
      {/* 1-Click Interactive Hackathon Demo Tour Bar */}
      <DemoTourBar
        onSelectEligibleDemo={openDemoEligible}
        onSelectIneligibleDemo={openDemoIneligible}
        onSelectReviewDemo={openDemoReview}
        onOpenCompare={() => setCurrentTab('compare')}
        onOpenSourceMonitor={() => setCurrentTab('sources')}
      />

      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        student={student}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onLoadDemoAarav={handleLoadDemoAarav}
        compareCount={compareList.length}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
      />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Main Body Routing */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <div className="space-y-12">
            <HeroSection
              onFindScholarships={() => handleNavigateToDiscover('POTENTIALLY_ELIGIBLE')}
              onExploreScholarships={() => handleNavigateToDiscover('ALL')}
              onLoadDemo={handleLoadDemoAarav}
            />
            {/* Landing page preview of dashboard items */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Real-World Intelligence
                </span>
                <h2 className="text-2xl font-bold text-[#173B67] mt-1">
                  Active Matched Opportunities
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Live preview of schemes currently evaluated against the test student profile.
                </p>
              </div>

              <StudentDashboard
                student={student}
                evaluatedResults={evaluatedResults}
                onNavigateToDiscover={handleNavigateToDiscover}
                onViewEligibility={res => setSelectedAnalysisResult(res)}
                onWhyScholarship={res => setSelectedWhyResult(res)}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onOpenSourceMonitor={() => setCurrentTab('sources')}
                onOpenPipeline={() => setCurrentTab('pipeline')}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
              />
            </div>
          </div>
        )}

        {currentTab === 'dashboard' && (
          <div className="pt-6">
            <StudentDashboard
              student={student}
              evaluatedResults={evaluatedResults}
              onNavigateToDiscover={handleNavigateToDiscover}
              onViewEligibility={res => setSelectedAnalysisResult(res)}
              onWhyScholarship={res => setSelectedWhyResult(res)}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              onOpenSourceMonitor={() => setCurrentTab('sources')}
              onOpenPipeline={() => setCurrentTab('pipeline')}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />
          </div>
        )}

        {currentTab === 'discover' && (
          <div className="pt-6">
            <DiscoveryPage
              evaluatedResults={evaluatedResults}
              onViewEligibility={res => setSelectedAnalysisResult(res)}
              onWhyScholarship={res => setSelectedWhyResult(res)}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              onOpenCompareView={() => setCurrentTab('compare')}
              initialFilter={discoveryPresetFilter}
            />
          </div>
        )}

        {currentTab === 'compare' && (
          <div className="pt-6">
            <ComparisonView
              compareList={compareList}
              evaluatedResults={evaluatedResults}
              onClose={() => setCurrentTab('discover')}
              onRemoveFromCompare={handleRemoveFromCompare}
              onViewEligibility={res => setSelectedAnalysisResult(res)}
            />
          </div>
        )}

        {currentTab === 'deadlines' && (
          <div className="pt-6">
            <DeadlineIntelligence
              evaluatedResults={evaluatedResults}
              onViewEligibility={res => setSelectedAnalysisResult(res)}
            />
          </div>
        )}

        {currentTab === 'sources' && (
          <div className="pt-6">
            <SourceMonitorView />
          </div>
        )}

        {currentTab === 'pipeline' && (
          <div className="pt-6">
            <IntelligencePipelineView />
          </div>
        )}
      </main>

      {/* =========================================================================
          GLOBAL MODALS
         ========================================================================= */}

      {/* 1. ELIGIBILITY ANALYSIS MODAL (THE MOST IMPORTANT SCREEN) */}
      {selectedAnalysisResult && (
        <EligibilityAnalysisModal
          isOpen={true}
          onClose={() => setSelectedAnalysisResult(null)}
          result={selectedAnalysisResult}
        />
      )}

      {/* 2. WHY THIS SCHOLARSHIP MODAL */}
      {selectedWhyResult && (
        <WhyScholarshipModal
          isOpen={true}
          onClose={() => setSelectedWhyResult(null)}
          result={selectedWhyResult}
        />
      )}

      {/* 3. STUDENT PROFILE SETUP MODAL */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        student={student}
        onSaveProfile={updated => {
          setStudent(updated);
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.3 },
          });
        }}
      />

      {/* 4. PRIVACY CENTER MODAL */}
      <PrivacyCenterModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        student={student}
      />

      {/* Premium Professional Footer */}
      <footer className="bg-[#0B2545] text-white border-t border-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  SCHOLARSHIP
                </span>
                <span className="font-extrabold text-xl tracking-tight text-[#2563EB]">
                  SATHI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Know your opportunities. Understand your eligibility.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-300 flex-wrap">
              <button onClick={() => setCurrentTab('dashboard')} className="hover:text-white">Dashboard</button>
              <button onClick={() => setCurrentTab('discover')} className="hover:text-white">Opportunities (42)</button>
              <button onClick={() => setCurrentTab('compare')} className="hover:text-white">Compare Matrix</button>
              <button onClick={() => setCurrentTab('sources')} className="hover:text-white">Source Monitor</button>
              <button onClick={() => setCurrentTab('pipeline')} className="hover:text-white">AI Extraction</button>
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white">Privacy Center</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p className="text-[11px] leading-relaxed max-w-2xl">
              <strong>Responsible AI Statement:</strong> Scholarship Sathi discovers scholarship opportunities from configured sources and evaluates eligibility against published criteria. Final eligibility is determined by the scholarship provider.
            </p>
            <div className="text-right text-[11px] text-slate-500 shrink-0">
              <span>Hackathon Presentation Build · 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
