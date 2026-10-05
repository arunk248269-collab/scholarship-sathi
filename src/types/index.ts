export type EligibilityStatus = 'POTENTIALLY_ELIGIBLE' | 'DOES_NOT_MEET' | 'REVIEW_REQUIRED';

export type CriterionType = 
  | 'ACADEMIC' 
  | 'INCOME' 
  | 'EDUCATION_LEVEL' 
  | 'COURSE' 
  | 'STATE' 
  | 'CATEGORY' 
  | 'GENDER' 
  | 'DISABILITY' 
  | 'AGE' 
  | 'OTHER';

export type CriterionEvaluationStatus = 'SATISFIED' | 'NOT_SATISFIED' | 'NEEDS_VERIFICATION';

export interface SourceEvidence {
  sourceName: string;
  sourceUrl: string;
  sourceType: 'Government Portal' | 'University Circular' | 'Institutional Notification' | 'Foundation Official Website';
  publishedDate: string;
  lastCheckedDate: string;
  exactClause: string;
  sectionReference: string;
}

export interface EligibilityCriterion {
  id: string;
  title: string;
  type: CriterionType;
  isMandatory: boolean;
  requirementText: string;
  ruleType: 'min_academic' | 'max_income' | 'exact_state' | 'education_level' | 'course_in' | 'category_in' | 'gender_specific' | 'custom_verify';
  targetValue: string | number | string[];
  evidence: SourceEvidence;
  // Dynamic fields when evaluated against student:
  evaluatedStatus?: CriterionEvaluationStatus;
  studentValueDisplay?: string;
  reasoning?: string;
  differenceText?: string;
  whyItMatters?: string;
  unclearReason?: string;
  recommendedAction?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  providerType: 'Government' | 'University' | 'Institutional' | 'Foundation';
  awardAmount: string;
  awardAmountNum: number;
  awardFrequency: string; // e.g. "/ year" or "one-time"
  deadline: string;
  daysRemaining: number;
  isClosingSoon: boolean;
  officialSourceUrl: string;
  sourceVerified: boolean;
  lastVerifiedDate: string;
  description: string;
  stateEligible: string[]; // e.g. ["Karnataka", "All India"]
  educationLevel: string[]; // e.g. ["Undergraduate", "Postgraduate"]
  criteria: EligibilityCriterion[];
  matchScore: number; // calculated profile match percentage 0-100
  tags: string[];
  isDemoData: boolean;
}

export interface StudentProfile {
  // Personal
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  state: string;
  district: string;
  email: string;
  phone: string;
  
  // Education
  educationLevel: string; // e.g. "Undergraduate"
  degree: string; // e.g. "B.E."
  course: string; // e.g. "Computer Science & Engineering"
  specialization: string;
  college: string;
  yearOfStudy: string; // e.g. "3rd Year"
  graduationYear: number;
  academicPercentage: number; // e.g. 78
  tenthMarksPercentage: number;
  twelfthMarksPercentage: number;
  backlogs: number;

  // Financial
  annualFamilyIncome: number; // e.g. 180000
  incomeRange: 'Below ₹1 Lakh' | '₹1–2 Lakh' | '₹2–3 Lakh' | '₹3–5 Lakh' | '₹5–8 Lakh' | 'Above ₹8 Lakh';
  incomeCertificateUploaded: boolean;
  incomeCertificateFileName?: string;

  // Eligibility Attributes
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  isEws: boolean;
  disabilityStatus: 'None' | 'Locomotor' | 'Visual' | 'Hearing' | 'Other';
  minorityStatus: boolean;
  firstGenerationLearner: boolean;
  stateDomicile: string;
  profileCompletionPercentage: number;
}

export interface EvaluatedScholarshipResult {
  scholarship: Scholarship;
  overallStatus: EligibilityStatus;
  criteriaSatisfiedCount: number;
  criteriaFailedCount: number;
  criteriaReviewCount: number;
  totalCriteriaCount: number;
  evaluatedCriteria: EligibilityCriterion[];
  failedMandatoryCriterion?: EligibilityCriterion;
  reviewRequiredCriterion?: EligibilityCriterion;
  summaryText: string;
  whyThisScholarshipBullets: string[];
  decisionSteps: {
    stepNumber: string;
    stepTitle: string;
    description: string;
    formula?: string;
  }[];
}

export interface SourceFeed {
  id: string;
  category: 'Government' | 'University' | 'Institutional' | 'Foundation';
  name: string;
  domain: string;
  status: 'Active' | 'Syncing' | 'Needs Review';
  lastSync: string;
  totalDiscovered: number;
  verifiedCount: number;
  reviewCount: number;
  reliabilityScore: number;
}

export interface ExtractionLog {
  id: string;
  timestamp: string;
  documentTitle: string;
  sourceDomain: string;
  step: 'SOURCE FOUND' | 'DOCUMENT EXTRACTED' | 'REQUIREMENTS IDENTIFIED' | 'DATA VALIDATED' | 'DUPLICATE CHECK' | 'DATABASE UPDATED' | 'STUDENT MATCHING';
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NEEDS_VERIFICATION';
  details: string;
}
