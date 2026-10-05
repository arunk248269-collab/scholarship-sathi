import { StudentProfile, Scholarship, EligibilityCriterion, EvaluatedScholarshipResult, EligibilityStatus } from '../types';

export function evaluateScholarship(scholarship: Scholarship, student: StudentProfile): EvaluatedScholarshipResult {
  const evaluatedCriteria: EligibilityCriterion[] = [];
  let satisfiedCount = 0;
  let failedCount = 0;
  let reviewCount = 0;
  let failedMandatory: EligibilityCriterion | undefined;
  let reviewMandatory: EligibilityCriterion | undefined;
  const whyBullets: string[] = [];

  for (const criterion of scholarship.criteria) {
    const copy: EligibilityCriterion = { ...criterion };

    switch (criterion.ruleType) {
      case 'min_academic': {
        const minReq = Number(criterion.targetValue);
        copy.studentValueDisplay = `${student.academicPercentage}%`;
        if (student.academicPercentage >= minReq) {
          copy.evaluatedStatus = 'SATISFIED';
          copy.reasoning = `Your academic score of ${student.academicPercentage}% is above the minimum requirement of ${minReq}%.`;
          satisfiedCount++;
          whyBullets.push(`Your academic score (${student.academicPercentage}%) comfortably exceeds the minimum required (${minReq}%).`);
        } else {
          copy.evaluatedStatus = 'NOT_SATISFIED';
          const diff = minReq - student.academicPercentage;
          copy.differenceText = `${diff.toFixed(1)}% below the minimum required`;
          copy.whyItMatters = 'This academic threshold is a mandatory prerequisite specified in the official scheme guidelines.';
          copy.reasoning = `Your academic score of ${student.academicPercentage}% does not meet the minimum required ${minReq}%.`;
          failedCount++;
          if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
        }
        break;
      }

      case 'max_income': {
        const maxIncome = Number(criterion.targetValue);
        const formatRupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
        copy.studentValueDisplay = formatRupees(student.annualFamilyIncome);
        if (student.annualFamilyIncome <= maxIncome) {
          copy.evaluatedStatus = 'SATISFIED';
          copy.reasoning = `Your reported family income of ${formatRupees(student.annualFamilyIncome)} is within the stated threshold of ${formatRupees(maxIncome)}.`;
          satisfiedCount++;
          whyBullets.push(`Your reported income (${formatRupees(student.annualFamilyIncome)}) is within the ${formatRupees(maxIncome)} ceiling.`);
        } else {
          copy.evaluatedStatus = 'NOT_SATISFIED';
          const diff = student.annualFamilyIncome - maxIncome;
          copy.differenceText = `${formatRupees(diff)} above the stated limit`;
          copy.whyItMatters = 'Family income ceiling is a statutory mandatory condition established for financial aid distribution.';
          copy.reasoning = `Your reported annual family income of ${formatRupees(student.annualFamilyIncome)} exceeds the stated maximum income limit of ${formatRupees(maxIncome)} by ${formatRupees(diff)}.`;
          failedCount++;
          if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
        }
        break;
      }

      case 'exact_state': {
        const allowedStates = Array.isArray(criterion.targetValue) ? criterion.targetValue : [String(criterion.targetValue)];
        copy.studentValueDisplay = student.stateDomicile || student.state;
        const isMatched = allowedStates.includes('All India') || allowedStates.includes(student.stateDomicile) || allowedStates.includes(student.state);
        
        if (isMatched) {
          copy.evaluatedStatus = 'SATISFIED';
          copy.reasoning = `Your state of domicile (${student.state}) matches the stated geographical eligibility requirement (${allowedStates.join(', ')}).`;
          satisfiedCount++;
          whyBullets.push(`Your state of domicile (${student.state}) qualifies for this regional scheme.`);
        } else {
          copy.evaluatedStatus = 'NOT_SATISFIED';
          copy.differenceText = `Domiciled in ${student.state}, but scholarship is restricted to ${allowedStates.join(', ')}`;
          copy.whyItMatters = 'State-specific quota or state government budgetary allocation requires legal residency/domicile in designated state.';
          copy.reasoning = `The scholarship is restricted to applicants from ${allowedStates.join(', ')}. Your domicile is listed as ${student.state}.`;
          failedCount++;
          if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
        }
        break;
      }

      case 'education_level': {
        const allowedLevels = Array.isArray(criterion.targetValue) ? criterion.targetValue : [String(criterion.targetValue)];
        copy.studentValueDisplay = `${student.degree} ${student.educationLevel} (${student.yearOfStudy})`;
        const isLevelMatch = allowedLevels.includes(student.educationLevel) || allowedLevels.includes('Any');
        
        if (isLevelMatch) {
          copy.evaluatedStatus = 'SATISFIED';
          copy.reasoning = `Your current education level (${student.educationLevel}) matches the stated requirement (${allowedLevels.join(', ')}).`;
          satisfiedCount++;
          whyBullets.push(`Your education level (${student.degree} ${student.educationLevel}) aligns with eligible applicant criteria.`);
        } else {
          copy.evaluatedStatus = 'NOT_SATISFIED';
          copy.differenceText = `Currently pursuing ${student.educationLevel}, requirement specifies ${allowedLevels.join(', ')}`;
          copy.whyItMatters = 'Program funds are earmarked strictly for approved degree or education cohorts.';
          copy.reasoning = `This opportunity requires candidates to be in ${allowedLevels.join(', ')}. Your level is ${student.educationLevel}.`;
          failedCount++;
          if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
        }
        break;
      }

      case 'course_in': {
        const eligibleCourses = Array.isArray(criterion.targetValue) ? criterion.targetValue : [String(criterion.targetValue)];
        copy.studentValueDisplay = `${student.course} (${student.degree})`;
        
        // Check for ambiguous match case
        if (eligibleCourses.includes('VERIFY_REQUIRED')) {
          copy.evaluatedStatus = 'NEEDS_VERIFICATION';
          copy.unclearReason = 'The scholarship notification requires enrollment in an "approved specialized emerging technology degree", but the notification annexure does not explicitly list standard B.E./B.Tech Computer Science branches.';
          copy.recommendedAction = 'Verify your course against Annexure IV of the official scholarship notification with your college registrar.';
          copy.reasoning = 'Verification required: Course eligibility list contains university-specific conditions not completely specified in the circular.';
          reviewCount++;
          if (!reviewMandatory) reviewMandatory = copy;
        } else {
          const matched = eligibleCourses.some(c => 
            c === 'Any' || 
            student.course.toLowerCase().includes(c.toLowerCase()) || 
            c.toLowerCase().includes(student.degree.toLowerCase())
          );
          if (matched) {
            copy.evaluatedStatus = 'SATISFIED';
            copy.reasoning = `Your course (${student.course}) matches the approved eligible disciplines.`;
            satisfiedCount++;
            whyBullets.push(`Your specialization (${student.course}) is on the approved disciplines roster.`);
          } else {
            copy.evaluatedStatus = 'NOT_SATISFIED';
            copy.differenceText = `Enrolled in ${student.course}, which is outside the specified disciplines (${eligibleCourses.join(', ')})`;
            copy.whyItMatters = 'Scheme grants are targeted to students of designated technical, medical, or humanities faculties.';
            copy.reasoning = `This scholarship is restricted to students pursuing ${eligibleCourses.join(', ')}.`;
            failedCount++;
            if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
          }
        }
        break;
      }

      case 'category_in': {
        const allowedCategories = Array.isArray(criterion.targetValue) ? criterion.targetValue : [String(criterion.targetValue)];
        copy.studentValueDisplay = `Category: ${student.category}`;
        if (allowedCategories.includes('All') || allowedCategories.includes(student.category)) {
          copy.evaluatedStatus = 'SATISFIED';
          copy.reasoning = `Your social category (${student.category}) is eligible for this category reservation quota.`;
          satisfiedCount++;
          whyBullets.push(`Your category (${student.category}) qualifies for this scholarship track.`);
        } else {
          copy.evaluatedStatus = 'NOT_SATISFIED';
          copy.differenceText = `Profile category is ${student.category}; scholarship is designated for ${allowedCategories.join(', ')}`;
          copy.whyItMatters = 'This is an affirmative action scheme statutory fund reserved for specified communities.';
          copy.reasoning = `The scholarship is reserved for students belonging to ${allowedCategories.join(', ')}.`;
          failedCount++;
          if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
        }
        break;
      }

      case 'gender_specific': {
        const targetGender = String(criterion.targetValue);
        copy.studentValueDisplay = `Gender: ${student.gender}`;
        if (targetGender === 'Any' || student.gender === targetGender) {
          copy.evaluatedStatus = 'SATISFIED';
          copy.reasoning = `Gender requirement satisfied (${student.gender}).`;
          satisfiedCount++;
        } else {
          copy.evaluatedStatus = 'NOT_SATISFIED';
          copy.differenceText = `Program reserved for ${targetGender} applicants; profile indicates ${student.gender}`;
          copy.whyItMatters = 'Dedicated women empowerment or minority gender endowment fund.';
          copy.reasoning = `This scholarship is exclusively open to ${targetGender} students.`;
          failedCount++;
          if (criterion.isMandatory && !failedMandatory) failedMandatory = copy;
        }
        break;
      }

      case 'custom_verify':
      default: {
        copy.studentValueDisplay = 'Requires Institution Verification';
        copy.evaluatedStatus = 'NEEDS_VERIFICATION';
        copy.unclearReason = 'The scholarship notification requires institutional endorsement and verified non-receipt of concurrent central scholarships.';
        copy.recommendedAction = 'Check with your college scholarship desk if you currently hold any competing statutory stipends.';
        copy.reasoning = 'Institution-specific confirmation needed regarding concurrent grants.';
        reviewCount++;
        if (!reviewMandatory) reviewMandatory = copy;
        break;
      }
    }

    evaluatedCriteria.push(copy);
  }

  // Determine overall status based on strict rules:
  // 1. If ANY mandatory criterion failed -> DOES_NOT_MEET
  // 2. If NO mandatory criteria failed, but at least 1 requires verification -> REVIEW_REQUIRED
  // 3. If ALL mandatory criteria satisfied and 0 failed -> POTENTIALLY_ELIGIBLE
  let overallStatus: EligibilityStatus = 'POTENTIALLY_ELIGIBLE';
  let summaryText = '';

  if (failedCount > 0) {
    overallStatus = 'DOES_NOT_MEET';
    summaryText = `${failedCount} mandatory requirement${failedCount > 1 ? 's are' : ' is'} not satisfied.`;
  } else if (reviewCount > 0) {
    overallStatus = 'REVIEW_REQUIRED';
    summaryText = "We couldn't confidently determine your eligibility for one or more criteria.";
  } else {
    overallStatus = 'POTENTIALLY_ELIGIBLE';
    summaryText = 'Your profile satisfies all currently known mandatory eligibility criteria.';
  }

  // Generate transparent decision steps (verifiable mathematical & factual logic, no hidden model hallucination):
  const decisionSteps = [
    {
      stepNumber: '01',
      stepTitle: 'Requirement Identification',
      description: `Structured rule engine loaded ${evaluatedCriteria.length} mandatory and non-mandatory clauses from the configured scholarship notification.`,
      formula: `Rules count = ${evaluatedCriteria.length}`,
    },
    {
      stepNumber: '02',
      stepTitle: 'Student Profile Extraction',
      description: `Retrieved verified student attributes: Marks (${student.academicPercentage}%), Income (₹${student.annualFamilyIncome.toLocaleString('en-IN')}), State (${student.state}), Level (${student.educationLevel}), Course (${student.course}).`,
      formula: `Aarav Sharma · RVCE Bengaluru`,
    },
    {
      stepNumber: '03',
      stepTitle: 'Deterministic Comparison',
      description: failedMandatory 
        ? `Criterion [${failedMandatory.title}] failed: Profile (${failedMandatory.studentValueDisplay}) did not satisfy condition (${failedMandatory.requirementText}).`
        : reviewMandatory 
        ? `Ambiguity detected on [${reviewMandatory.title}]: Notification circular contains unspecified annexure conditions.`
        : `All criteria verified against numerical thresholds and geographic domains.`,
      formula: failedMandatory 
        ? `Result: Violation of clause [${failedMandatory.id}]`
        : `Result: Positive delta across all evaluated parameters`,
    },
    {
      stepNumber: '04',
      stepTitle: 'Result Synthesis',
      description: `${satisfiedCount} satisfied · ${failedCount} failed · ${reviewCount} requiring verification.`,
      formula: `Status: ${overallStatus}`,
    },
    {
      stepNumber: '05',
      stepTitle: 'Explainable Decision Support',
      description: overallStatus === 'POTENTIALLY_ELIGIBLE'
        ? 'All known mandatory criteria satisfied. Recommended to proceed with official application.'
        : overallStatus === 'DOES_NOT_MEET'
        ? 'Application is not recommended as mandatory thresholds are breached.'
        : 'Student verification recommended against official circular before submitting application fee.',
    },
  ];

  return {
    scholarship,
    overallStatus,
    criteriaSatisfiedCount: satisfiedCount,
    criteriaFailedCount: failedCount,
    criteriaReviewCount: reviewCount,
    totalCriteriaCount: evaluatedCriteria.length,
    evaluatedCriteria,
    failedMandatoryCriterion: failedMandatory,
    reviewRequiredCriterion: reviewMandatory,
    summaryText,
    whyThisScholarshipBullets: whyBullets,
    decisionSteps,
  };
}
