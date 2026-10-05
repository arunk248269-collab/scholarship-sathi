import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw,
  Layers
} from 'lucide-react';
import { EvaluatedScholarshipResult, Scholarship } from '../types';
import { ScholarshipCard } from './ScholarshipCard';

interface DiscoveryPageProps {
  evaluatedResults: EvaluatedScholarshipResult[];
  onViewEligibility: (result: EvaluatedScholarshipResult) => void;
  onWhyScholarship: (result: EvaluatedScholarshipResult) => void;
  compareList: Scholarship[];
  onToggleCompare: (scholarship: Scholarship) => void;
  onOpenCompareView: () => void;
  initialFilter?: string;
}

export const DiscoveryPage: React.FC<DiscoveryPageProps> = ({
  evaluatedResults,
  onViewEligibility,
  onWhyScholarship,
  compareList,
  onToggleCompare,
  onOpenCompareView,
  initialFilter = 'ALL',
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>(initialFilter);
  const [providerTypeFilter, setProviderTypeFilter] = useState<string>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [closingSoonOnly, setClosingSoonOnly] = useState<boolean>(initialFilter === 'CLOSING_SOON');

  // Filtered list computation
  const filteredResults = useMemo(() => {
    return evaluatedResults.filter(item => {
      const sch = item.scholarship;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = sch.name.toLowerCase().includes(query);
        const matchesProvider = sch.provider.toLowerCase().includes(query);
        const matchesTags = sch.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesProvider && !matchesTags) return false;
      }

      // Status filter
      if (statusFilter === 'POTENTIALLY_ELIGIBLE' && item.overallStatus !== 'POTENTIALLY_ELIGIBLE') return false;
      if (statusFilter === 'DOES_NOT_MEET' && item.overallStatus !== 'DOES_NOT_MEET') return false;
      if (statusFilter === 'REVIEW_REQUIRED' && item.overallStatus !== 'REVIEW_REQUIRED') return false;

      // Closing soon toggle
      if (closingSoonOnly && !sch.isClosingSoon) return false;

      // Provider type filter
      if (providerTypeFilter !== 'ALL' && sch.providerType !== providerTypeFilter) return false;

      // State filter
      if (stateFilter !== 'ALL') {
        const hasState = sch.stateEligible.includes('All India') || sch.stateEligible.includes(stateFilter);
        if (!hasState) return false;
      }

      return true;
    });
  }, [evaluatedResults, searchTerm, statusFilter, providerTypeFilter, stateFilter, closingSoonOnly]);

  const potentialMatchesCount = evaluatedResults.filter(r => r.overallStatus === 'POTENTIALLY_ELIGIBLE').length;
  const closingSoonCount = evaluatedResults.filter(r => r.scholarship.isClosingSoon).length;

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setProviderTypeFilter('ALL');
    setStateFilter('ALL');
    setClosingSoonOnly(false);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Discovered Counts */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block">
              Configured Repositories
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B67] tracking-tight">
              Scholarship Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Opportunities discovered from our configured scholarship sources.
            </p>
          </div>

          {/* Quick Metrics Badges (Section 10) */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
              <strong className="text-[#173B67] font-bold">{evaluatedResults.length}</strong> Scholarships Found
            </div>

            <div 
              onClick={() => { setStatusFilter('POTENTIALLY_ELIGIBLE'); setClosingSoonOnly(false); }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            >
              <strong className="text-emerald-700 font-bold">{potentialMatchesCount}</strong> Potential Matches
            </div>

            <div 
              onClick={() => setClosingSoonOnly(!closingSoonOnly)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                closingSoonOnly 
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <strong className={closingSoonOnly ? 'text-white' : 'text-rose-700'}>{closingSoonCount}</strong> Closing Soon
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search scholarships by title, provider, field, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E8F0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-slate-50/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Provider Type Filter */}
            <select
              value={providerTypeFilter}
              onChange={e => setProviderTypeFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="ALL">All Provider Types</option>
              <option value="Government">Government Schemes</option>
              <option value="Foundation">Philanthropic Foundations</option>
              <option value="Institutional">PSU & Corporate CSR</option>
              <option value="University">University Fellowships</option>
            </select>

            {/* State Filter */}
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="ALL">All States / National</option>
              <option value="Karnataka">Karnataka (Student Domicile)</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {/* Status Tabs Row (Section 10) */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'ALL', label: 'All Opportunities', count: evaluatedResults.length },
                { id: 'POTENTIALLY_ELIGIBLE', label: 'Potentially Eligible', count: potentialMatchesCount },
                { id: 'DOES_NOT_MEET', label: 'Not Eligible', count: evaluatedResults.filter(r => r.overallStatus === 'DOES_NOT_MEET').length },
                { id: 'REVIEW_REQUIRED', label: 'Review Required', count: evaluatedResults.filter(r => r.overallStatus === 'REVIEW_REQUIRED').length },
              ].map(tab => {
                const isActive = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setStatusFilter(tab.id); setClosingSoonOnly(false); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#173B67] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {(searchTerm || statusFilter !== 'ALL' || providerTypeFilter !== 'ALL' || stateFilter !== 'ALL' || closingSoonOnly) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#2563EB] hover:text-[#173B67] font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
        <span>Showing <strong>{filteredResults.length}</strong> of <strong>{evaluatedResults.length}</strong> discovered opportunities</span>
        <span>Deterministic Rule Evaluation v2.4</span>
      </div>

      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center space-y-3">
          <Filter className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-[#173B67]">No scholarships matched these filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your keyword query, state selector, or status filter to view additional schemes.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(item => (
            <ScholarshipCard
              key={item.scholarship.id}
              result={item}
              onViewEligibility={onViewEligibility}
              onWhyScholarship={onWhyScholarship}
              isCompared={compareList.some(s => s.id === item.scholarship.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}

      {/* Floating Compare Tray (Section 20) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#0B2545] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-300" />
            <span className="text-xs font-semibold">
              <strong>{compareList.length} / 3</strong> Selected to Compare
            </span>
          </div>

          <div className="flex items-center gap-1.5 hidden sm:flex">
            {compareList.map(sch => (
              <span key={sch.id} className="text-[11px] bg-white/10 px-2 py-0.5 rounded truncate max-w-[120px]">
                {sch.name}
              </span>
            ))}
          </div>

          <button
            onClick={onOpenCompareView}
            className="px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Compare Now →
          </button>
        </div>
      )}
    </div>
  );
};
