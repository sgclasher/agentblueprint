// ============================================================================
// BUSINESS PROFILE DATA CONTRACT
// ============================================================================
// This file defines the "Perfect Data Contract" for the Business Profile page.
// All UI components will be built against these interfaces.

// ============================================================================
// CORE BUSINESS PROFILE
// ============================================================================

export interface BusinessProfile {
  id: string;
  companyName: string;
  industry: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  revenue: string;
  description: string;
  strategicInitiatives: StrategicInitiative[];
  aiReadinessScore: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export interface StrategicInitiative {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  budget: string;
  timeline: string;
  expectedOutcomes: string[];
  keyMetrics: string[];
}

// ============================================================================
// AI OPPORTUNITIES TAB
// ============================================================================

export interface AIOpportunity {
  id: string;
  title: string;
  description: string;
  category: AIOpportunityCategory;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Identified' | 'Analyzing' | 'Approved' | 'In Development' | 'Implemented';
  estimatedROI: string;
  timeToImplement: string;
  complexityLevel: 'Low' | 'Medium' | 'High';
  requiredResources: string[];
  businessImpact: BusinessImpact;
  recommendedPattern: AgenticPattern;
  riskLevel: 'Low' | 'Medium' | 'High';
  successMetrics: string[];
}

export type AIOpportunityCategory = 
  | 'Process Automation'
  | 'Decision Support'
  | 'Customer Experience'
  | 'Data Analytics'
  | 'Workforce Augmentation'
  | 'Risk Management';

export interface BusinessImpact {
  costSavings: string;
  efficiencyGains: string;
  revenueIncrease: string;
  riskReduction: string;
  qualityImprovement: string;
}

export type AgenticPattern = 
  | 'Manager-Workers'
  | 'Plan-and-Execute'
  | 'ReAct'
  | 'Tool-Use'
  | 'Multi-Agent'
  | 'Hierarchical';

// ============================================================================
// AI BLUEPRINT TAB
// ============================================================================

export interface AIBlueprint {
  id: string;
  title: string;
  description: string;
  opportunityId: string; // Links to specific AI Opportunity
  agenticPattern: AgenticPattern;
  executiveSummary: ExecutiveSummary;
  digitalTeam: DigitalTeamMember[];
  implementation: ImplementationPlan;
  riskAssessment: RiskAssessment;
  successCriteria: SuccessCriteria;
  specialInstructions?: string;
  createdAt: string;
}

export interface ExecutiveSummary {
  overview: string;
  keyBenefits: string[];
  investmentRequired: string;
  expectedROI: ROIProjection;
  recommendedAction: string;
  confidenceLevel: 'High' | 'Medium' | 'Low';
}

export interface ROIProjection {
  totalInvestment: string;
  annualValue: string;
  roiPercentage: number;
  paybackMonths: number;
  processCostSavings: string;
  laborReallocation: string;
  riskAvoidance: string;
  keyAssumptions: string[];
}

export interface DigitalTeamMember {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  capabilities: string[];
  tools: string[];
  interactionPattern: string;
}

export interface ImplementationPlan {
  phases: ImplementationPhase[];
  totalDurationWeeks: number;
  humanCheckpoints: HumanCheckpoint[];
  prerequisites: string[];
  risks: string[];
}

export interface ImplementationPhase {
  id: string;
  name: string;
  description: string;
  durationWeeks: number;
  deliverables: string[];
  successCriteria: string[];
  dependencies: string[];
}

export interface HumanCheckpoint {
  phase: string;
  description: string;
  approvalRequired: boolean;
  escalationCriteria: string[];
  reviewers: string[];
}

export interface RiskAssessment {
  technicalRisks: Risk[];
  businessRisks: Risk[];
  mitigationStrategies: string[];
  contingencyPlans: string[];
}

export interface Risk {
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface SuccessCriteria {
  kpis: KPI[];
  milestones: Milestone[];
  qualitativeMetrics: string[];
}

export interface KPI {
  name: string;
  baseline: string;
  target: string;
  timeframe: string;
  measurementMethod: string;
}

export interface Milestone {
  name: string;
  description: string;
  targetDate: string;
  dependencies: string[];
}

// ============================================================================
// ANALYSIS TAB
// ============================================================================

export interface AnalysisData {
  aiReadinessScore: AIReadinessScore;
  maturityAssessment: MaturityAssessment;
  capabilityGaps: CapabilityGap[];
  recommendations: Recommendation[];
  benchmarkData: BenchmarkData;
}

export interface AIReadinessScore {
  overall: number; // 0-100
  breakdown: {
    dataReadiness: number;
    technicalInfrastructure: number;
    organizationalReadiness: number;
    skillsAndTalent: number;
    governanceAndEthics: number;
    changeManagement: number;
  };
  industryComparison: number; // percentile
}

export interface MaturityAssessment {
  currentLevel: 'Beginner' | 'Developing' | 'Advancing' | 'Leading';
  targetLevel: 'Beginner' | 'Developing' | 'Advancing' | 'Leading';
  gapAnalysis: string[];
  timeToTarget: string;
}

export interface CapabilityGap {
  area: string;
  currentState: string;
  desiredState: string;
  priority: 'High' | 'Medium' | 'Low';
  effortRequired: string;
  recommendations: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Technical' | 'Organizational' | 'Strategic' | 'Skills';
  timeframe: 'Immediate' | 'Short-term' | 'Medium-term' | 'Long-term';
  effort: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
}

export interface BenchmarkData {
  industryAverage: number;
  topPerformers: number;
  yourPosition: number;
  improvementOpportunity: string;
}

// ============================================================================
// SYSTEMS TAB
// ============================================================================

export interface SystemInventory {
  systems: System[];
  integrationMap: Integration[];
  dataFlows: DataFlow[];
  recommendations: SystemRecommendation[];
}

export interface System {
  id: string;
  name: string;
  category: SystemCategory;
  vendor: string;
  version: string;
  description: string;
  users: number;
  criticality: 'Low' | 'Medium' | 'High' | 'Critical';
  aiReadiness: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  integrationCapability: string[];
  dataQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  lastUpdated: string;
}

export type SystemCategory = 
  | 'ERP'
  | 'CRM'
  | 'HRM'
  | 'Financial'
  | 'Operations'
  | 'Analytics'
  | 'Communication'
  | 'Security'
  | 'Other';

export interface Integration {
  id: string;
  sourceSystem: string;
  targetSystem: string;
  type: 'API' | 'Database' | 'File Transfer' | 'Real-time' | 'Batch';
  frequency: string;
  dataVolume: string;
  status: 'Active' | 'Inactive' | 'Planned' | 'Issues';
}

export interface DataFlow {
  id: string;
  name: string;
  source: string;
  destination: string;
  dataType: string;
  frequency: string;
  quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  aiPotential: 'Low' | 'Medium' | 'High';
}

export interface SystemRecommendation {
  system: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  benefit: string;
  aiEnablement: string;
}

// ============================================================================
// CONTACTS TAB
// ============================================================================

export interface ContactDirectory {
  contacts: Contact[];
  teams: Team[];
  stakeholderMap: StakeholderMapping[];
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone?: string;
  role: ContactRole;
  aiEngagement: 'Champion' | 'Supporter' | 'Neutral' | 'Skeptical' | 'Unknown';
  influence: 'High' | 'Medium' | 'Low';
  expertise: string[];
  responsibilities: string[];
  lastContact: string;
}

export type ContactRole = 
  | 'Executive Sponsor'
  | 'Project Manager'
  | 'Technical Lead'
  | 'Business Analyst'
  | 'End User'
  | 'IT Administrator'
  | 'Data Steward'
  | 'Compliance Officer'
  | 'Other';

export interface Team {
  id: string;
  name: string;
  department: string;
  purpose: string;
  members: string[]; // Contact IDs
  lead: string; // Contact ID
  aiRelevance: 'High' | 'Medium' | 'Low';
  readinessLevel: 'Ready' | 'Needs Training' | 'Resistant' | 'Unknown';
}

export interface StakeholderMapping {
  contactId: string;
  influence: 'High' | 'Medium' | 'Low';
  interest: 'High' | 'Medium' | 'Low';
  strategy: 'Manage Closely' | 'Keep Satisfied' | 'Keep Informed' | 'Monitor';
  engagementPlan: string;
}

// ============================================================================
// OVERVIEW TAB (DASHBOARD SUMMARY)
// ============================================================================

export interface OverviewData {
  summary: ProfileSummary;
  quickStats: QuickStats;
  recentActivity: ActivityItem[];
  upcomingMilestones: Milestone[];
  alerts: Alert[];
  progressIndicators: ProgressIndicator[];
}

export interface ProfileSummary {
  completionPercentage: number;
  lastUpdated: string;
  totalOpportunities: number;
  activeBlueprints: number;
  implementationProgress: number;
}

export interface QuickStats {
  aiReadinessScore: number;
  totalROIPotential: string;
  averageImplementationTime: string;
  systemsAnalyzed: number;
  stakeholdersEngaged: number;
}

export interface ActivityItem {
  id: string;
  type: 'Opportunity Created' | 'Blueprint Generated' | 'Analysis Updated' | 'System Added' | 'Contact Updated';
  description: string;
  timestamp: string;
  relatedItem?: string;
}

export interface Alert {
  id: string;
  type: 'Info' | 'Warning' | 'Error' | 'Success';
  title: string;
  message: string;
  actionRequired: boolean;
  actionText?: string;
  timestamp: string;
}

export interface ProgressIndicator {
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'Up' | 'Down' | 'Stable';
  status: 'On Track' | 'At Risk' | 'Behind' | 'Ahead';
} 