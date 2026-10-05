import React, { useState } from 'react';
import { X, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [activeSection, setActiveSection] = useState<'data' | 'documents' | 'matching' | 'account'>('data');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(student, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scholarship_sathi_profile_${student.fullName.replace(/\s+/g, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExportNotice('Export complete. Downloaded encrypted JSON profile.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E2E8F0] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#173B67] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold block">
                Responsible AI & Ethics
              </span>
              <h3 className="text-base font-bold text-white">
                Privacy Center
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

        {/* Responsible Core Principles Strip (Section 24) */}
        <div className="bg-slate-50 border-b border-[#E2E8F0] px-6 py-3 text-xs text-[#173B67] space-y-1">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
            <span>Your profile is used strictly to identify relevant scholarship opportunities.</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
            <span>Only information required for matching should be collected.</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
            <span>Final scholarship decisions are made by scholarship providers.</span>
          </p>
        </div>

        {/* Section Tabs */}
        <div className="border-b border-[#E2E8F0] flex items-center px-6 bg-white gap-4 text-xs font-semibold">
          {[
            { id: 'data', label: 'Your Data' },
            { id: 'documents', label: 'Documents' },
            { id: 'matching', label: 'Matching Information' },
            { id: 'account', label: 'Account' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`py-3 border-b-2 transition-colors ${
                activeSection === tab.id
                  ? 'border-[#2563EB] text-[#173B67]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs text-slate-700 space-y-4">
          {activeSection === 'data' && (
            <div className="space-y-3 animate-fade-in">
              <h4 className="font-bold text-sm text-[#173B67]">Data Retention & Usage</h4>
              <p>
                Scholarship Sathi maintains student demographic and academic records in localized client storage during demo sessions. We do not transmit your contact details to third-party ad networks or unsolicited loan marketers.
              </p>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="font-bold text-[#172033] block mb-1">Stored Attributes for Matching:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Full Name: {student.fullName}</li>
                  <li>Institution: {student.college}</li>
                  <li>Academic Performance: {student.academicPercentage}%</li>
                  <li>Reported Income Bracket: {student.incomeRange}</li>
                  <li>State Domicile: {student.state}</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="space-y-3 animate-fade-in">
              <h4 className="font-bold text-sm text-[#173B67]">Document Confidentiality</h4>
              <p>
                When uploading income certificates or grade sheets, files are kept strictly for client-side field validation.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>No unnecessary display:</strong> Sensitive documents such as income certificates are summarized as verified indicators rather than rendering private details openly on screen.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'matching' && (
            <div className="space-y-3 animate-fade-in">
              <h4 className="font-bold text-sm text-[#173B67]">Explainability & Rule Processing</h4>
              <p>
                Our system uses deterministic comparison engines rather than ungrounded generative guesses.
              </p>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <p>
                  ✓ <strong>No fabricated scholarships:</strong> Every scheme matches an authenticated circular ID.
                </p>
                <p>
                  ✓ <strong>No fabricated deadlines:</strong> All calendar dates reflect official gazettes.
                </p>
                <p>
                  ✓ <strong>No false certainty:</strong> If an annexure is ambiguous, we explicitly designate the status as "Review Required".
                </p>
              </div>
            </div>
          )}

          {activeSection === 'account' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold text-sm text-[#173B67]">Student Data Controls</h4>
              <p>
                You retain complete control over your demo profile. You can export a portable JSON copy or reset all parameters at any time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download My Profile JSON</span>
                </button>
              </div>

              {exportNotice && (
                <div className="p-2.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                  {exportNotice}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2E8F0] px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Responsible AI & Privacy Policy v1.4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-[#172033] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
