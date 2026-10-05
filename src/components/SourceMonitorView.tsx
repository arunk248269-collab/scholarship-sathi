import React, { useState } from 'react';
import { 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Database,
  Building2,
  GraduationCap
} from 'lucide-react';
import { MOCK_SOURCES } from '../data/mockSources';

export const SourceMonitorView: React.FC = () => {
  const sources = MOCK_SOURCES;
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusText, setSyncStatusText] = useState<string>('All 8 feeds synchronized with latest gazette updates');

  const handleManualSync = () => {
    setIsSyncing(true);
    setSyncStatusText('Polling endpoint RSS feeds and government gazette portals...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusText('Synchronization complete. 7 new scholarship records verified.');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Autonomous Ingestion Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B67] tracking-tight mt-1">
            SOURCE MONITOR
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Real-time feed indexing and integrity tracking. <strong className="text-slate-700">Scholarships discovered from configured sources.</strong>
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#173B67] hover:bg-[#0B2545] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Feeds...' : 'Sync Configured Feeds'}</span>
        </button>
      </div>

      {/* Stats Bar (Section 22) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
            Sources Monitored
          </span>
          <span className="text-2xl font-extrabold text-[#173B67] mt-1 block">8</span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">● 100% Operational</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
            New Scholarships This Week
          </span>
          <span className="text-2xl font-extrabold text-[#2563EB] mt-1 block">7</span>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">Verified from gazettes</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
            Updated Scholarships
          </span>
          <span className="text-2xl font-extrabold text-[#173B67] mt-1 block">12</span>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">Deadlines & quotas checked</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
            Records Requiring Review
          </span>
          <span className="text-2xl font-extrabold text-amber-600 mt-1 block">2</span>
          <span className="text-[10px] text-amber-700 font-medium mt-1 block">Annexures pending parser</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
            Last Synchronization
          </span>
          <span className="text-sm font-extrabold text-[#173B67] mt-1.5 block">Today, 09:20 AM</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Automated Cron</span>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 flex items-center justify-between text-xs text-blue-900">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
          <span>{syncStatusText}</span>
        </span>
        <span className="text-[11px] font-mono text-slate-500">sha256:7f9a2b8...</span>
      </div>

      {/* Monitored Feeds Grid By Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Government Sources', icon: Building2, status: 'Active', count: '3 Feeds' },
          { title: 'University Sources', icon: GraduationCap, status: 'Active', count: '2 Feeds' },
          { title: 'Institutional Sources', icon: Database, status: 'Active', count: '1 Feed' },
          { title: 'Foundation Sources', icon: Globe, status: 'Active', count: '2 Feeds' },
        ].map((cat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#173B67] flex items-center justify-center">
                <cat.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#173B67]">{cat.title}</h4>
                <span className="text-[11px] text-slate-500">{cat.count}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span className="text-[10px] font-bold text-emerald-800 uppercase">{cat.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Configured Feeds Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#173B67] uppercase tracking-wider">
            Active Ingestion Feeds Roster
          </h3>
          <span className="text-xs text-slate-500">
            Validated HTTPS Endpoints Only
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="p-3.5 font-bold">Source Name</th>
                <th className="p-3.5 font-bold">Category</th>
                <th className="p-3.5 font-bold">Endpoint Domain</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Discovered Schemes</th>
                <th className="p-3.5 font-bold">Reliability Score</th>
                <th className="p-3.5 font-bold">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {sources.map(src => (
                <tr key={src.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-[#173B67]">
                    {src.name}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {src.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-[#2563EB]">
                    {src.domain}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      {src.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    {src.totalDiscovered} records ({src.verifiedCount} verified)
                  </td>
                  <td className="p-3.5">
                    <span className="text-xs font-bold text-[#173B67]">
                      {src.reliabilityScore}%
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">
                    {src.lastSync}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
