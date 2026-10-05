import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  FileText, 
  HelpCircle, 
  Info, 
  CheckCircle2
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onSaveProfile,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<StudentProfile>({ ...student });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (!isOpen) return null;

  const steps = [
    { number: '01', title: 'Personal' },
    { number: '02', title: 'Education' },
    { number: '03', title: 'Financial' },
    { number: '04', title: 'Eligibility' },
    { number: '05', title: 'Documents' },
    { number: '06', title: 'Review' },
  ];

  const handleInputChange = (field: keyof StudentProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIncomeRangeSelect = (range: StudentProfile['incomeRange'], approxVal: number) => {
    setFormData(prev => ({
      ...prev,
      incomeRange: range,
      annualFamilyIncome: approxVal,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        incomeCertificateUploaded: true,
        incomeCertificateFileName: file.name,
      }));
    }
  };

  const handleSaveAndFinish = () => {
    // calculate profile completion
    let filled = 0;
    const total = 10;
    if (formData.fullName) filled++;
    if (formData.state) filled++;
    if (formData.degree) filled++;
    if (formData.course) filled++;
    if (formData.academicPercentage > 0) filled++;
    if (formData.annualFamilyIncome > 0) filled++;
    if (formData.incomeCertificateUploaded) filled++;
    if (formData.category) filled++;
    if (formData.stateDomicile) filled++;
    if (formData.college) filled++;

    const completion = Math.min(100, Math.round((filled / total) * 100));
    onSaveProfile({
      ...formData,
      profileCompletionPercentage: completion,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E2E8F0] w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#173B67] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-blue-300 font-semibold tracking-wider uppercase">
              Student Profile Setup
            </span>
            <h3 className="text-lg font-bold text-white">
              Configure Your Academic & Demographic Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="border-b border-[#E2E8F0] bg-slate-50/70 px-6 py-3">
          <div className="grid grid-cols-6 gap-2">
            {steps.map(step => {
              const stepNum = parseInt(step.number, 10);
              const isPassed = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <button
                  key={step.number}
                  onClick={() => setCurrentStep(stepNum)}
                  className={`text-left group transition-all pb-1 border-b-2 ${
                    isCurrent
                      ? 'border-[#2563EB] text-[#173B67]'
                      : isPassed
                      ? 'border-emerald-500 text-slate-700'
                      : 'border-transparent text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-[#2563EB]' : isPassed ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {isPassed ? '✓' : step.number}
                    </span>
                    <span className="text-xs font-semibold truncate hidden sm:inline">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-[#172033]">
          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3.5 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="text-xs text-[#173B67]">
                  <p className="font-semibold">Your privacy is respected</p>
                  <p className="text-slate-600 mt-0.5">
                    Your information is used strictly to identify scholarships relevant to your profile. No data is sold or shared with commercial marketers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#172033]">
                      Date of Birth
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(activeTooltip === 'dob' ? null : 'dob')}
                      className="text-[11px] text-[#2563EB] hover:underline flex items-center gap-0.5"
                    >
                      <HelpCircle className="w-3 h-3" /> Why do we ask this?
                    </button>
                  </div>
                  {activeTooltip === 'dob' && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded mb-1 border border-slate-200">
                      Several scholarship programs have strict upper age boundaries (typically under 25 or 28 years).
                    </p>
                  )}
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={e => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Gender (where relevant for schemes)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => handleInputChange('gender', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female (Unlocks AICTE Pragati, Kotak Kanya, etc.)</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    State of Residence / Domicile *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => {
                      handleInputChange('state', e.target.value);
                      handleInputChange('stateDomicile', e.target.value);
                    }}
                    placeholder="e.g. Karnataka"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={e => handleInputChange('district', e.target.value)}
                    placeholder="e.g. Bengaluru Urban"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="student@example.edu.in"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Education Level *
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={e => handleInputChange('educationLevel', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Undergraduate">Undergraduate (B.E., B.Tech, MBBS, B.Sc)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech, M.S., MBA, M.Sc)</option>
                    <option value="Diploma">Diploma / Polytechnic</option>
                    <option value="Doctorate">PhD / Doctoral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={e => handleInputChange('degree', e.target.value)}
                    placeholder="e.g. B.E. / B.Tech"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Course / Branch *
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={e => handleInputChange('course', e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    College / University Institution *
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={e => handleInputChange('college', e.target.value)}
                    placeholder="e.g. R.V. College of Engineering, Bengaluru"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Year of Study
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={e => handleInputChange('yearOfStudy', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={e => handleInputChange('graduationYear', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Current Aggregate Marks / Percentage (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.academicPercentage}
                    onChange={e => handleInputChange('academicPercentage', Number(e.target.value))}
                    placeholder="e.g. 78"
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Active Backlogs
                  </label>
                  <input
                    type="number"
                    value={formData.backlogs}
                    onChange={e => handleInputChange('backlogs', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FINANCIAL DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-[#173B67]">
                  Financial Background
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Need-based scholarships require verified income brackets to compute exact eligibility limits.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-2">
                  Select Annual Family Income Range *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { range: 'Below ₹1 Lakh', approx: 90000 },
                    { range: '₹1–2 Lakh', approx: 180000 },
                    { range: '₹2–3 Lakh', approx: 250000 },
                    { range: '₹3–5 Lakh', approx: 400000 },
                    { range: '₹5–8 Lakh', approx: 650000 },
                    { range: 'Above ₹8 Lakh', approx: 950000 },
                  ].map(item => (
                    <button
                      key={item.range}
                      type="button"
                      onClick={() => handleIncomeRangeSelect(item.range as any, item.approx)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        formData.incomeRange === item.range
                          ? 'border-[#2563EB] bg-blue-50/60 ring-2 ring-[#2563EB]/20 font-semibold text-[#173B67]'
                          : 'border-[#E2E8F0] hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{item.range}</span>
                        {formData.incomeRange === item.range && (
                          <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">
                  Reported Annual Family Income (INR)
                </label>
                <input
                  type="number"
                  value={formData.annualFamilyIncome}
                  onChange={e => handleInputChange('annualFamilyIncome', Number(e.target.value))}
                  placeholder="e.g. 180000"
                  className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              {/* Income Certificate Upload (Optional) */}
              <div className="border border-dashed border-[#E2E8F0] rounded-lg p-4 bg-slate-50/50">
                <label className="block text-xs font-semibold text-[#172033] mb-1">
                  Income Certificate (Optional verification document)
                </label>
                <p className="text-[11px] text-slate-500 mb-3">
                  Upload official Tahsildar / Revenue Department income certificate. We do not display sensitive document contents unnecessarily.
                </p>

                {formData.incomeCertificateUploaded ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold">
                        ✓ Income Certificate added ({formData.incomeCertificateFileName || 'verified_doc.pdf'})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange('incomeCertificateUploaded', false)}
                      className="text-xs text-slate-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-3 border border-slate-300 rounded-lg cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                    <Upload className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-xs font-medium text-[#173B67]">
                      Choose PDF / Image file
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: ELIGIBILITY ATTRIBUTES (Dynamic) */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-600">
                  <strong className="text-[#173B67]">Dynamic Eligibility Fields:</strong> We do not force students to provide information irrelevant to the scholarships being considered. Only provide details that apply to your situation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Social Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => handleInputChange('category', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="General">General / Open Merit</option>
                    <option value="OBC">OBC (Other Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Disability Status
                  </label>
                  <select
                    value={formData.disabilityStatus}
                    onChange={e => handleInputChange('disabilityStatus', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="None">None</option>
                    <option value="Locomotor">Locomotor Disability (40%+)</option>
                    <option value="Visual">Visual Impairment</option>
                    <option value="Hearing">Hearing Impairment</option>
                    <option value="Other">Other Specific Disability</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.minorityStatus}
                    onChange={e => handleInputChange('minorityStatus', e.target.checked)}
                    className="rounded text-[#2563EB] focus:ring-[#2563EB] w-4 h-4"
                  />
                  <span className="text-xs text-slate-700">
                    Belong to Religious Minority Community (Christian, Muslim, Jain, Sikh, Parsi, Buddhist)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.firstGenerationLearner}
                    onChange={e => handleInputChange('firstGenerationLearner', e.target.checked)}
                    className="rounded text-[#2563EB] focus:ring-[#2563EB] w-4 h-4"
                  />
                  <span className="text-xs text-slate-700">
                    First-Generation College Learner in family
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: DOCUMENTS CHECKLIST */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-base font-bold text-[#173B67]">
                Document Readiness Checklist
              </h4>
              <p className="text-xs text-slate-500">
                Ensure you have digital copies ready when proceeding to provider portals.
              </p>

              <div className="space-y-2.5">
                {[
                  { title: 'Income Certificate (Tahsildar / Revenue Dept)', ready: formData.incomeCertificateUploaded },
                  { title: 'Academic Marksheets (10th, 12th & Semester Grade Cards)', ready: true },
                  { title: 'State Domicile Certificate / Bonafide Residency Proof', ready: true },
                  { title: 'College ID Card / Current Bonafide Study Certificate', ready: true },
                  { title: 'Category / Caste Certificate (if applicable for OBC/SC/ST)', ready: formData.category !== 'General' },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] bg-slate-50">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#2563EB]" />
                      <span className="text-xs font-medium text-slate-800">{doc.title}</span>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      doc.ready ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {doc.ready ? '✓ On File' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Profile Verification Ready
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your details will be used to compute deterministic match percentages against all configured scholarships.
                  </p>
                </div>
                <span className="text-lg font-bold text-emerald-800">
                  92%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-lg border border-[#E2E8F0]">
                <div>
                  <span className="text-slate-500 block">Student:</span>
                  <strong className="text-[#172033]">{formData.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Course & Degree:</span>
                  <strong className="text-[#172033]">{formData.degree} in {formData.course}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">College:</span>
                  <strong className="text-[#172033]">{formData.college}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Academic Score:</span>
                  <strong className="text-emerald-700 font-bold">{formData.academicPercentage}%</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Family Income:</span>
                  <strong className="text-[#172033]">₹{formData.annualFamilyIncome.toLocaleString('en-IN')} ({formData.incomeRange})</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">State & Category:</span>
                  <strong className="text-[#172033]">{formData.state} · {formData.category}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="border-t border-[#E2E8F0] px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white flex items-center gap-1 shadow-xs"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAndFinish}
                className="px-6 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-sm"
              >
                <Check className="w-4 h-4" /> Save & Match Scholarships
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
