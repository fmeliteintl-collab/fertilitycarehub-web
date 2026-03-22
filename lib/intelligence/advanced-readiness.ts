/**
 * Advanced Readiness & Compatibility Intelligence
 * 
 * Provides sophisticated cross-module recommendations including:
 * - Budget-country compatibility analysis
 * - Pathway-country legal compatibility validation
 * - Predictive timeline suggestions
 * - Document readiness gates
 */

import type { UserPlan, UserPlanInput } from "@/types/plan";


// Flexible plan type
type PlanData = UserPlan | UserPlanInput | null | undefined;

// ==================== COUNTRY INTELLIGENCE DATA ====================

export type CountryCode = 
  | "Spain" | "Greece" | "Portugal" | "India" | "Mexico" 
  | "Turkey" | "Czech Republic" | "Costa Rica" | "China" | "UK" | "US";

export type SurrogacyStatus = 
  | "commercial-allowed"      // Commercial surrogacy permitted
  | "altruistic-only"         // Only altruistic (expenses-only) allowed
  | "foreigners-restricted"   // Restricted or banned for foreigners
  | "banned";                 // Completely prohibited

export type DonorStatus =
  | "anonymous-allowed"       // Anonymous donation permitted
  | "known-only"              // Only known/identity-release donors
  | "restricted"              // Limited availability
  | "banned";                 // Prohibited

export type CostTier = "budget" | "mid" | "high" | "premium";

export interface CountryProfile {
  code: CountryCode;
  name: string;
  costTier: CostTier;
  estimatedIVFCostUSD: { min: number; max: number };
  surrogacy: {
    status: SurrogacyStatus;
    foreignerEligible: boolean;
    notes: string;
    courtApprovalRequired?: boolean;
  };
  donor: {
    egg: DonorStatus;
    sperm: DonorStatus;
    embryo: DonorStatus;
    notes: string;
  };
  lgbtqFriendly: boolean;
  singleParentFriendly: boolean;
  popularFor: string[];
  warnings: string[];
}

export const COUNTRY_PROFILES: Record<CountryCode, CountryProfile> = {
  Spain: {
    code: "Spain",
    name: "Spain",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 6000, max: 9000 },
    surrogacy: {
      status: "banned",
      foreignerEligible: false,
      notes: "Surrogacy is prohibited under Article 10 of Law 14/2006. All forms of surrogacy agreements are null and void.",
    },
    donor: {
      egg: "anonymous-allowed",
      sperm: "anonymous-allowed",
      embryo: "anonymous-allowed",
      notes: "Anonymous donation only. Donor-conceived children can obtain non-identifying information at age 18.",
    },
    lgbtqFriendly: true,
    singleParentFriendly: true,
    popularFor: ["IVF with donor eggs", "Single women", "LGBTQ+ couples", "Anonymous donation"],
    warnings: ["Surrogacy not available", "High demand = waiting lists for donors"],
  },
  
  Greece: {
    code: "Greece",
    name: "Greece",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 4000, max: 6000 },
    surrogacy: {
      status: "altruistic-only",
      foreignerEligible: true,
      courtApprovalRequired: true,
      notes: "Only altruistic surrogacy permitted. Prior court approval required (6+ months). Compensation limited to pregnancy expenses (~€20,000 max).",
    },
    donor: {
      egg: "anonymous-allowed",
      sperm: "anonymous-allowed",
      embryo: "anonymous-allowed",
      notes: "Anonymous donation. Favorable legal framework for donors.",
    },
    lgbtqFriendly: false,
    singleParentFriendly: true,
    popularFor: ["Altruistic surrogacy", "Donor IVF", "Lower costs"],
    warnings: ["Court process adds 6+ months", "Only heterosexual couples for surrogacy", "Altruistic only - no commercial compensation"],
  },
  
  Portugal: {
    code: "Portugal",
    name: "Portugal",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 5000, max: 8000 },
    surrogacy: {
      status: "banned",
      foreignerEligible: false,
      notes: "Surrogacy was briefly permitted but law suspended in 2019. Currently prohibited.",
    },
    donor: {
      egg: "anonymous-allowed",
      sperm: "anonymous-allowed",
      embryo: "anonymous-allowed",
      notes: "Anonymous donation system with good availability.",
    },
    lgbtqFriendly: true,
    singleParentFriendly: true,
    popularFor: ["Donor IVF", "LGBTQ+ friendly", "EU standards"],
    warnings: ["Surrogacy not available", "Limited clinic availability vs Spain"],
  },
  
  India: {
    code: "India",
    name: "India",
    costTier: "budget",
    estimatedIVFCostUSD: { min: 2500, max: 4500 },
    surrogacy: {
      status: "foreigners-restricted",
      foreignerEligible: false,
      notes: "Commercial surrogacy banned for foreigners since 2021. Only altruistic surrogacy for Indian married couples with 5+ years infertility.",
    },
    donor: {
      egg: "anonymous-allowed",
      sperm: "anonymous-allowed",
      embryo: "restricted",
      notes: "Donor programs available but regulations tightened. Anonymous donation permitted.",
    },
    lgbtqFriendly: false,
    singleParentFriendly: false,
    popularFor: ["Low-cost IVF", "High volume experience", "English-speaking"],
    warnings: ["Surrogacy restricted to Indian citizens", "Regulatory changes frequent", "Travel logistics complex"],
  },
  
  Mexico: {
    code: "Mexico",
    name: "Mexico",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 4000, max: 6500 },
    surrogacy: {
      status: "commercial-allowed",
      foreignerEligible: true,
      notes: "Commercial surrogacy permitted in some states (Tabasco, Sinaloa). Legal framework varies by state.",
    },
    donor: {
      egg: "anonymous-allowed",
      sperm: "anonymous-allowed",
      embryo: "anonymous-allowed",
      notes: "Donor programs available. Some clinics cater specifically to international patients.",
    },
    lgbtqFriendly: true,
    singleParentFriendly: true,
    popularFor: ["Commercial surrogacy", "North American proximity", "Lower costs than US"],
    warnings: ["Legal varies by state", "Court rulings may be needed for parentage", "Not all states permit surrogacy"],
  },
  
  Turkey: {
    code: "Turkey",
    name: "Turkey",
    costTier: "budget",
    estimatedIVFCostUSD: { min: 3000, max: 5000 },
    surrogacy: {
      status: "banned",
      foreignerEligible: false,
      notes: "All forms of surrogacy prohibited. Strict ban on egg/sperm/embryo donation and surrogacy.",
    },
    donor: {
      egg: "banned",
      sperm: "banned",
      embryo: "banned",
      notes: "Gamete donation completely prohibited. Only own gametes permitted.",
    },
    lgbtqFriendly: false,
    singleParentFriendly: false,
    popularFor: ["Low-cost IVF with own gametes", "High success rates", "Modern facilities"],
    warnings: ["No donor programs available", "No surrogacy", "Not LGBTQ+ friendly", "Single women restricted"],
  },
  
  "Czech Republic": {
    code: "Czech Republic",
    name: "Czech Republic",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 4500, max: 7000 },
    surrogacy: {
      status: "banned",
      foreignerEligible: false,
      notes: "Surrogacy not permitted. Embryo donation allowed but not surrogacy arrangements.",
    },
    donor: {
      egg: "anonymous-allowed",
      sperm: "anonymous-allowed",
      embryo: "anonymous-allowed",
      notes: "Anonymous donation permitted. Age limit 49 for recipients. Strong donor programs.",
    },
    lgbtqFriendly: false,
    singleParentFriendly: true,
    popularFor: ["Donor IVF", "EU standards", "Affordable quality"],
    warnings: ["No surrogacy available", "Not LGBTQ+ friendly", "Age limit 49"],
  },
  
  "Costa Rica": {
    code: "Costa Rica",
    name: "Costa Rica",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 6000, max: 9000 },
    surrogacy: {
      status: "banned",
      foreignerEligible: false,
      notes: "Surrogacy prohibited. Only IVF with own gametes permitted.",
    },
    donor: {
      egg: "restricted",
      sperm: "restricted",
      embryo: "banned",
      notes: "Donor gametes heavily restricted. Limited availability.",
    },
    lgbtqFriendly: false,
    singleParentFriendly: false,
    popularFor: ["Medical tourism infrastructure", "US proximity"],
    warnings: ["Limited donor options", "No surrogacy", "Higher cost than other Latin American options"],
  },
  
  China: {
    code: "China",
    name: "China",
    costTier: "mid",
    estimatedIVFCostUSD: { min: 5000, max: 8000 },
    surrogacy: {
      status: "banned",
      foreignerEligible: false,
      notes: "Surrogacy banned since 2001. Underground agencies exist but high legal risk.",
    },
    donor: {
      egg: "restricted",
      sperm: "restricted",
      embryo: "restricted",
      notes: "Strict regulations. Limited donor availability. Priority to married Chinese citizens.",
    },
    lgbtqFriendly: false,
    singleParentFriendly: false,
    popularFor: ["Advanced technology", "High volume clinics"],
    warnings: ["Surrogacy illegal", "Donor restrictions", "Not foreigner-friendly", "Language barrier"],
  },
  
  UK: {
    code: "UK",
    name: "United Kingdom",
    costTier: "high",
    estimatedIVFCostUSD: { min: 10000, max: 15000 },
    surrogacy: {
      status: "altruistic-only",
      foreignerEligible: true,
      notes: "Only altruistic surrogacy. Surrogacy agreements unenforceable. Parental order process required.",
    },
    donor: {
      egg: "known-only",
      sperm: "known-only",
      embryo: "known-only",
      notes: "Identity-release donors only. Donor-conceived children can identify donor at age 18.",
    },
    lgbtqFriendly: true,
    singleParentFriendly: true,
    popularFor: ["Legal clarity", "NHS funding (eligibility required)", "Identity-release donors"],
    warnings: ["High costs", "Altruistic surrogacy only", "Complex parental order process", "Long NHS waiting lists"],
  },
  
  US: {
    code: "US",
    name: "United States",
    costTier: "premium",
    estimatedIVFCostUSD: { min: 15000, max: 30000 },
    surrogacy: {
      status: "commercial-allowed",
      foreignerEligible: true,
      notes: "Commercial surrogacy permitted in several states (CA, NV, IL, NY). Strong legal protection. Pre-birth orders available.",
    },
    donor: {
      egg: "known-only",
      sperm: "known-only",
      embryo: "known-only",
      notes: "Identity-release or known donors typical. Strong legal frameworks for donor conception.",
    },
    lgbtqFriendly: true,
    singleParentFriendly: true,
    popularFor: ["Commercial surrogacy", "Highest success rates", "Legal certainty", "LGBTQ+ friendly"],
    warnings: ["Highest costs globally", "Insurance coverage variable", "State laws vary"],
  },
};

// ==================== BUDGET ANALYSIS ====================

export type BudgetRange = 
  | "Under $10,000"
  | "$10,000 - $25,000"
  | "$25,000 - $50,000"
  | "$50,000 - $100,000"
  | "Over $100,000"
  | "Not sure yet";

export function parseBudgetRange(budget: string | null | undefined): { min: number; max: number } | null {
  if (!budget) return null;
  
  switch (budget) {
    case "Under $10,000": return { min: 0, max: 10000 };
    case "$10,000 - $25,000": return { min: 10000, max: 25000 };
    case "$25,000 - $50,000": return { min: 25000, max: 50000 };
    case "$50,000 - $100,000": return { min: 50000, max: 100000 };
    case "Over $100,000": return { min: 100000, max: Infinity };
    default: return null;
  }
}

export interface BudgetCompatibilityResult {
  country: CountryCode;
  compatible: boolean;
  riskLevel: "low" | "medium" | "high" | "critical";
  message: string;
  estimatedTotalMin: number;
  estimatedTotalMax: number;
  budgetGap?: string;
}

export function analyzeBudgetCompatibility(
  plan: PlanData,
  countryCode: CountryCode
): BudgetCompatibilityResult {
  const profile = COUNTRY_PROFILES[countryCode];
  const budgetRange = parseBudgetRange(plan?.budget_range);
  
  // Base IVF cost
  let estimatedMin = profile.estimatedIVFCostUSD.min;
  let estimatedMax = profile.estimatedIVFCostUSD.max;
  
  // Add pathway-specific costs
  if (plan?.surrogate_needed) {
    if (profile.surrogacy.status === "commercial-allowed") {
      estimatedMin += 80000; // US commercial surrogacy
      estimatedMax += 150000;
    } else if (profile.surrogacy.status === "altruistic-only") {
      estimatedMin += 20000; // Expenses-only
      estimatedMax += 40000;
    }
  }
  
  if (plan?.donor_needed) {
    if (profile.donor.egg !== "banned") {
      estimatedMin += 5000;
      estimatedMax += 10000;
    }
  }
  
  // Travel costs for international
  estimatedMin += 2000;
  estimatedMax += 5000;
  
  // Determine compatibility
  let compatible = true;
  let riskLevel: "low" | "medium" | "high" | "critical" = "low";
  let message = "Budget appears compatible";
  let budgetGap: string | undefined;
  
  if (!budgetRange) {
    compatible = true;
    riskLevel = "medium";
    message = "No budget specified - cannot assess compatibility";
  } else if (estimatedMin > budgetRange.max) {
    compatible = false;
    riskLevel = "critical";
    message = `Estimated costs (${formatCurrency(estimatedMin)}-${formatCurrency(estimatedMax)}) exceed your budget ceiling`;
    budgetGap = formatCurrency(estimatedMin - budgetRange.max);
  } else if (estimatedMax > budgetRange.max) {
    compatible = true;
    riskLevel = "high";
    message = `Upper cost range may exceed budget. Base IVF fits, but add-ons could push over limit.`;
    budgetGap = formatCurrency(estimatedMax - budgetRange.max);
  } else if (estimatedMax > budgetRange.max * 0.8) {
    riskLevel = "medium";
    message = "Costs within budget but limited buffer for complications or additional cycles";
  }
  
  return {
    country: countryCode,
    compatible,
    riskLevel,
    message,
    estimatedTotalMin: estimatedMin,
    estimatedTotalMax: estimatedMax,
    budgetGap,
  };
}

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
  return `$${amount}`;
}

// ==================== PATHWAY-COUNTRY COMPATIBILITY ====================

export interface PathwayCompatibilityResult {
  country: CountryCode;
  compatible: boolean;
  blockingIssues: string[];
  warnings: string[];
  recommendations: string[];
}

export function analyzePathwayCompatibility(
  plan: PlanData,
  countryCode: CountryCode
): PathwayCompatibilityResult {
  const profile = COUNTRY_PROFILES[countryCode];
  const blockingIssues: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Surrogacy check
  if (plan?.surrogate_needed) {
    if (profile.surrogacy.status === "banned") {
      blockingIssues.push(`Surrogacy is prohibited in ${profile.name}. Consider ${getAlternativeSurrogacyCountries().join(", ")} instead.`);
    } else if (profile.surrogacy.status === "foreigners-restricted") {
      blockingIssues.push(`Surrogacy in ${profile.name} is restricted to citizens/residents.`);
    } else if (profile.surrogacy.status === "altruistic-only") {
      warnings.push(`Only altruistic surrogacy available in ${profile.name}. No commercial compensation permitted.`);
      if (profile.surrogacy.courtApprovalRequired) {
        warnings.push(`Court approval required - adds 6+ months to timeline.`);
      }
    }
  }
  
  // Donor check
  if (plan?.donor_needed) {
    if (profile.donor.egg === "banned" && profile.donor.sperm === "banned") {
      blockingIssues.push(`Gamete donation is prohibited in ${profile.name}. Only own gametes permitted.`);
    } else if (profile.donor.egg === "restricted" || profile.donor.sperm === "restricted") {
      warnings.push(`Donor availability is limited in ${profile.name}. Waiting lists possible.`);
    }
  }
  
  // Family structure check
  if (plan?.family_structure?.toLowerCase().includes("same") || 
      plan?.family_structure?.toLowerCase().includes("lgbt")) {
    if (!profile.lgbtqFriendly) {
      blockingIssues.push(`${profile.name} is not LGBTQ+ friendly for fertility treatment.`);
    }
  }
  
  if (plan?.family_structure?.toLowerCase().includes("single")) {
    if (!profile.singleParentFriendly) {
      blockingIssues.push(`${profile.name} restricts fertility treatment for single parents.`);
    }
  }
  
  // Budget-pathway mismatch
  if (plan?.surrogate_needed && plan?.budget_range === "Under $10,000") {
    blockingIssues.push("Surrogacy requires minimum $50k-150k budget. Current budget insufficient.");
  }
  
  // Generate recommendations
  if (blockingIssues.length > 0) {
    recommendations.push(...getAlternativeCountries(plan, countryCode));
  }
  
  if (warnings.length > 0 && blockingIssues.length === 0) {
    recommendations.push("Legal framework compatible but with restrictions. Review details carefully.");
  }
  
  return {
    country: countryCode,
    compatible: blockingIssues.length === 0,
    blockingIssues,
    warnings,
    recommendations,
  };
}

function getAlternativeSurrogacyCountries(): string[] {
  return ["US (commercial)", "Mexico (select states)", "Georgia", "Ukraine (if eligible)"];
}

function getAlternativeCountries(plan: PlanData, excludeCountry: CountryCode): string[] {
  const alternatives: string[] = [];
  
  (Object.keys(COUNTRY_PROFILES) as CountryCode[]).forEach(code => {
    if (code === excludeCountry) return;
    
    const profile = COUNTRY_PROFILES[code];
    let suitable = true;
    
    if (plan?.surrogate_needed && profile.surrogacy.status === "banned") suitable = false;
    if (plan?.donor_needed && profile.donor.egg === "banned") suitable = false;
    
    if (suitable) alternatives.push(profile.name);
  });
  
  return alternatives.slice(0, 3);
}

// ==================== DOCUMENT READINESS GATES ====================

export interface DocumentReadinessGate {
  timelineStepId: string;
  timelineStepTitle: string;
  requiredDocumentTypes: string[];
  missingDocuments: string[];
  blocking: boolean;
  message: string;
}

export function checkDocumentReadinessGates(
  plan: PlanData,
  documentTypes: string[] // e.g., ["passport", "medical_records", "semen_analysis"]
): DocumentReadinessGate[] {
  const gates: DocumentReadinessGate[] = [];
  const timelineItems = plan?.timeline_items ?? [];
  
  // Define gates based on timeline categories
  const categoryRequirements: Record<string, string[]> = {
    "Legal": ["passport", "marriage_certificate", "criminal_background"],
    "Medical": ["medical_records", "semen_analysis", "hormone_panel", "genetic_screening"],
    "Logistics": ["passport", "travel_insurance", "accommodation_booking"],
    "Execution": ["signed_contracts", "payment_confirmation", "medical_clearance"],
  };
  
  timelineItems.forEach(item => {
    const requirements = categoryRequirements[item.category];
    if (!requirements) return;
    
    const missing = requirements.filter(req => !documentTypes.includes(req));
    
    if (missing.length > 0 && (item.status === "In Progress" || item.status === "Completed")) {
      gates.push({
        timelineStepId: item.id,
        timelineStepTitle: item.title,
        requiredDocumentTypes: requirements,
        missingDocuments: missing,
        blocking: item.category === "Legal" || item.category === "Execution",
        message: `${item.category} step "${item.title}" requires: ${missing.join(", ")}`,
      });
    }
  });
  
  return gates;
}

// ==================== PREDICTIVE TIMELINE SUGGESTIONS ====================

export interface TimelineSuggestion {
  type: "add" | "modify" | "reorder";
  targetStepId?: string;
  suggestion: string;
  reason: string;
  priority: "high" | "medium" | "low";
}

export function generatePredictiveTimelineSuggestions(
  plan: PlanData
): TimelineSuggestion[] {
  const suggestions: TimelineSuggestion[] = [];
  const countries = plan?.shortlisted_countries ?? [];
  const timelineItems = plan?.timeline_items ?? [];
  
  // Check for missing legal step if surrogacy selected
  if (plan?.surrogate_needed) {
    const hasLegalStep = timelineItems.some(i => 
      i.category === "Legal" && i.title.toLowerCase().includes("surrogacy")
    );
    
    if (!hasLegalStep) {
      suggestions.push({
        type: "add",
        suggestion: "Add 'Secure surrogacy legal framework' step",
        reason: "Surrogacy pathway requires legal clearance before medical procedures",
        priority: "high",
      });
    }
  }
  
  // Check for court approval step if Greece shortlisted
  if (countries.includes("Greece") && plan?.surrogate_needed) {
    const hasCourtStep = timelineItems.some(i => 
      i.title.toLowerCase().includes("court") || i.title.toLowerCase().includes("judicial")
    );
    
    if (!hasCourtStep) {
      suggestions.push({
        type: "add",
        suggestion: "Add 'Greece court approval application' step (6+ months)",
        reason: "Greece requires judicial authorization before surrogacy can begin",
        priority: "high",
      });
    }
  }
  
  // Check for donor matching step if donor needed
  if (plan?.donor_needed) {
    const hasDonorStep = timelineItems.some(i => 
      i.category === "Medical" && i.title.toLowerCase().includes("donor")
    );
    
    if (!hasDonorStep) {
      suggestions.push({
        type: "add",
        suggestion: "Add 'Donor selection and matching' step",
        reason: "Donor pathway requires donor availability confirmation",
        priority: "medium",
      });
    }
  }
  
  // Check for travel planning if multiple countries shortlisted
  if (countries.length >= 2) {
    const hasTravelComparison = timelineItems.some(i => 
      i.category === "Research" && i.title.toLowerCase().includes("travel")
    );
    
    if (!hasTravelComparison) {
      suggestions.push({
        type: "add",
        suggestion: "Add 'Compare travel logistics across shortlisted countries' step",
        reason: "Multiple countries require travel cost and logistics comparison",
        priority: "medium",
      });
    }
  }
  
  // Reorder suggestion: Legal before Medical for surrogacy
  const legalIndex = timelineItems.findIndex(i => i.category === "Legal");
  const medicalIndex = timelineItems.findIndex(i => i.category === "Medical");
  
  if (plan?.surrogate_needed && legalIndex > medicalIndex && legalIndex !== -1 && medicalIndex !== -1) {
    suggestions.push({
      type: "reorder",
      targetStepId: timelineItems[legalIndex].id,
      suggestion: "Move Legal steps before Medical steps",
      reason: "Surrogacy requires legal clearance before embryo transfer",
      priority: "high",
    });
  }
  
  return suggestions;
}

// ==================== COMPREHENSIVE ANALYSIS ====================

export interface ComprehensiveReadinessReport {
  overallScore: number;
  budgetAnalysis: BudgetCompatibilityResult[];
  pathwayAnalysis: PathwayCompatibilityResult[];
  documentGates: DocumentReadinessGate[];
  timelineSuggestions: TimelineSuggestion[];
  criticalBlockers: string[];
  warnings: string[];
  nextBestAction: string;
}

export function generateComprehensiveReadinessReport(
  plan: PlanData,
  documentTypes: string[]
): ComprehensiveReadinessReport {
  const countries = (plan?.shortlisted_countries ?? []) as CountryCode[];
  
  // Run all analyses
  const budgetAnalysis = countries.map(c => analyzeBudgetCompatibility(plan, c));
  const pathwayAnalysis = countries.map(c => analyzePathwayCompatibility(plan, c));
  const documentGates = checkDocumentReadinessGates(plan, documentTypes);
  const timelineSuggestions = generatePredictiveTimelineSuggestions(plan);
  
  // Aggregate critical blockers
  const criticalBlockers: string[] = [];
  pathwayAnalysis.forEach(pa => {
    if (!pa.compatible) {
      criticalBlockers.push(...pa.blockingIssues);
    }
  });
  
  budgetAnalysis.forEach(ba => {
    if (ba.riskLevel === "critical") {
      criticalBlockers.push(`${ba.country}: ${ba.message}`);
    }
  });
  
  // Aggregate warnings
  const warnings: string[] = [];
  pathwayAnalysis.forEach(pa => warnings.push(...pa.warnings));
  budgetAnalysis.forEach(ba => {
    if (ba.riskLevel === "high" || ba.riskLevel === "medium") {
      warnings.push(`${ba.country}: ${ba.message}`);
    }
  });
  
  // Calculate overall score
  let score = 0;
  if (countries.length > 0) score += 20;
  if (countries.length >= 2 && countries.length <= 4) score += 20;
  
  const compatibleCountries = pathwayAnalysis.filter(pa => pa.compatible).length;
  score += (compatibleCountries / Math.max(countries.length, 1)) * 30;
  
  const budgetCompatible = budgetAnalysis.filter(ba => ba.compatible && ba.riskLevel === "low").length;
  score += (budgetCompatible / Math.max(countries.length, 1)) * 20;
  
  if (documentGates.filter(g => g.blocking).length === 0) score += 10;
  
  // Determine next best action
  let nextBestAction = "Review your planning context";
  if (criticalBlockers.length > 0) {
    nextBestAction = "Resolve critical pathway/budget incompatibilities before proceeding";
  } else if (warnings.length > 0) {
    nextBestAction = "Review warnings and adjust country shortlist or budget expectations";
  } else if (timelineSuggestions.length > 0) {
    nextBestAction = "Implement recommended timeline adjustments";
  } else if (documentGates.length > 0) {
    nextBestAction = "Upload missing documents to unblock timeline steps";
  } else {
    nextBestAction = "Your plan is structurally sound. Consider advisory consultation.";
  }
  
  return {
    overallScore: Math.round(score),
    budgetAnalysis,
    pathwayAnalysis,
    documentGates,
    timelineSuggestions,
    criticalBlockers: [...new Set(criticalBlockers)],
    warnings: [...new Set(warnings)],
    nextBestAction,
  };
}