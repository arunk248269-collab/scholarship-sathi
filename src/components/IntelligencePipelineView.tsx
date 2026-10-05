import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Code2
} from 'lucide-react';
import { MOCK_EXTRACTION_LOGS } from '../data/mockSources';

export const IntelligencePipelineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'json' | 'raw'>('pipeline');

  const pipelineStages = [
    { id: 'S1', title: 'SOURCE FOUND', desc: 'RSS crawler detects gazette release', status: '✓ Complete' },
    { id: 'S2', title: 'DOCUMENT EXTRACTED', desc: 'Bilingual PDF OCR layout parsing', status: '✓ Complete' },
    { id: 'S3', title: 'REQUIREMENTS IDENTIFIED', desc: 'LLM extracts structured eligibility clauses', status: '✓ Complete' },
    { id: 'S4', title: 'DATA VALIDATED', desc: 'Schema and date boundary checks', status: '✓ Complete' },
    { id: 'S5', title: 'DUPLICATE CHECK', desc: 'SHA-256 deduplication against DB', status: '✓ Complete' },
    { id: 'S6', title: 'DATABASE UPDATED', desc: 'Commit to verified scholarship repository', status: '✓ Complete' },
    { id: 'S7', title: 'STUDENT MATCHING', desc: 'Deterministic delta evaluation engine', status: '✓ Complete' },
  ];

  const sampleExtractedJson = {
    scholarship_id: "SCH-GOV-2026-TE-04",
    scholarship_name: "National Merit Scholarship for Technical Education",
    provider: "Department of Higher Education & Central Council",
    source_url: "https://scholarships.gov.in/public/schemes/nm-te-2026",
    gazette_ref: "F.No. 12-4/2026-TE-1",
    deadline: "2026-11-15T23:59:59Z",
    award: {
      amount: 50000,
      currency: "INR",
      frequency: "per_annum"
    },
    structured_criteria: [
      {
        type: "ACADEMIC",
        rule: "MIN_PERCENTAGE",
        cutoff: 60.0,
        is_mandatory: true,
        clause_ref: "Clause 4.1(a)"
      },
      {
        type: "INCOME",
        rule: "MAX_GROSS_FAMILY_INCOME",
        cutoff: 250000,
        is_mandatory: true,
        clause_ref: "Clause 4.3(b)"
      },
      {
        type: "EDUCATION_LEVEL",
        rule: "IN_ARRAY",
        values: ["Undergraduate", "Bachelor"],
        is_mandatory: true,
        clause_ref: "Clause 2.2"
      },
      {
        type: "STATE",
        rule: "DOMICILE_ANY_INDIAN_STATE",
        is_mandatory: true,
        clause_ref: "Clause 1.1"
      }
    ],
    confidence_score: 0.994,
    parser_validation_status: "VERIFIED"
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Admin & Judge Demonstration View</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B67] tracking-tight">
            Scholarship Intelligence Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Observe autonomous document processing: from raw gazette PDF circulars to structured rule engines.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'pipeline' ? 'bg-white text-[#173B67] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pipeline Flow
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'json' ? 'bg-white text-[#173B67] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Structured JSON
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'raw' ? 'bg-white text-[#173B67] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Raw Circular
          </button>
        </div>
      </div>

      {/* 4 Status Checks Bar (Section 23) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-900">✓ Source identified</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-900">✓ Required fields extracted</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-900">✓ Deadline identified</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-900">✓ Criteria structured</span>
        </div>
      </div>

      {/* TAB 1: 7-Stage Pipeline Visualizer */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Visual Step-by-Step Flow */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
            <h3 className="text-xs font-bold text-[#173B67] uppercase tracking-wider mb-4">
              Autonomous Ingestion Architecture
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 relative">
              {pipelineStages.map((stage, idx) => (
                <div key={stage.id} className="bg-slate-50 border border-[#E2E8F0] rounded-lg p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] block">
                      STAGE 0{idx + 1}
                    </span>
                    <h5 className="text-xs font-bold text-[#172033] mt-1 leading-snug">
                      {stage.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                      {stage.status}
                    </span>
                    {idx < 6 && (
                      <span className="hidden md:inline text-slate-300 font-bold">→</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Fields Table (Section 23) */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#173B67] uppercase tracking-wider">
                Extracted Structured Attributes for Rule Matching
              </h3>
              <span className="text-xs font-mono text-[#2563EB] font-semibold">
                Ref: 2026/Tech-Ed-44
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Scholarship Name</span>
                <strong className="text-[#173B67] text-sm mt-0.5 block">National Merit Scholarship for Technical Education</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Provider</span>
                <strong className="text-[#172033] mt-0.5 block">Example Education Foundation & Central Council</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Deadline</span>
                <strong className="text-rose-700 mt-0.5 block">15 November 2026</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Minimum Marks Threshold</span>
                <strong className="text-emerald-700 mt-0.5 block">60.0% Aggregate</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Income Limit</span>
                <strong className="text-[#172033] mt-0.5 block">₹2,50,000 / year</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Education Level</span>
                <strong className="text-[#172033] mt-0.5 block">Undergraduate (B.E. / B.Tech)</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">State Domicile</span>
                <strong className="text-[#172033] mt-0.5 block">Pan-India (All States & UTs)</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Category Quota</span>
                <strong className="text-[#172033] mt-0.5 block">All Categories (General / OBC / SC / ST / EWS)</strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Required Documents</span>
                <strong className="text-slate-800 mt-0.5 block">Income Cert, Marksheets, Bonafide ID</strong>
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#173B67] uppercase tracking-wider">
                Real-Time Autonomous Crawler Logs
              </h3>
              <span className="text-xs text-slate-500">Live Daemon Feed</span>
            </div>

            <div className="p-4 divide-y divide-slate-100 text-xs">
              {MOCK_EXTRACTION_LOGS.map(log => (
                <div key={log.id} className="py-2.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{log.timestamp}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-[#2563EB]">
                        {log.step}
                      </span>
                    </div>
                    <p className="text-slate-700 mt-1 leading-snug">{log.details}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Parsed JSON */}
      {activeTab === 'json' && (
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-3 text-slate-400 text-xs">
            <span className="font-mono flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" /> schema_v2_validated.json
            </span>
            <span className="text-emerald-400 text-xs font-mono">Status: 200 OK</span>
          </div>
          <pre className="font-mono text-xs text-emerald-400 overflow-x-auto p-4 bg-black/40 rounded-lg leading-relaxed">
            {JSON.stringify(sampleExtractedJson, null, 2)}
          </pre>
        </div>
      )}

      {/* TAB 3: Raw Document Extract */}
      {activeTab === 'raw' && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-sm font-bold text-[#173B67]">
              Gazette Notification Extract Preview (English / Hindi Circular)
            </h3>
            <span className="text-xs text-slate-500 font-mono">Ref: F.No. 12-4/2026-TE-1</span>
          </div>

          <div className="font-serif text-xs text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-3">
            <p className="font-bold text-center text-sm uppercase text-[#173B67]">
              GOVERNMENT OF INDIA · MINISTRY OF EDUCATION <br />
              DEPARTMENT OF HIGHER EDUCATION
            </p>
            <p className="text-center italic text-slate-500">New Delhi, dated the 12th August, 2026</p>
            <hr className="my-2" />
            <p>
              <strong>NOTIFICATION:</strong> The Central Government hereby publishes the guidelines for the "National Merit Scholarship for Technical Education" for the academic session 2026–2027. Meritorious students enrolled in accredited bachelor-level degree programs are invited to apply through the configured national scholarship portal.
            </p>
            <p>
              <strong>CLAUSE 4.1 ACADEMIC QUALIFICATION:</strong> Candidates must have secured a minimum of 60% marks in aggregate or equivalent CGPA in the preceding qualifying examination or semester assessment.
            </p>
            <p>
              <strong>CLAUSE 4.3 INCOME CRITERIA:</strong> The total parental/family income from all sources must not exceed ₹2,50,000/- per annum. The income certificate issued by a competent Revenue Authority must be produced.
            </p>
            <p>
              <strong>DEADLINE:</strong> The online portal for submission of applications shall close strictly at 23:59 hours on 15th November, 2026.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
