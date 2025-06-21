import React from 'react';
import GlobalHeader from '../components/GlobalHeader';
import { 
  TrendingUp, 
  Workflow, 
  DollarSign, 
  BarChart3, 
  CheckCircle,
  Clock,
  Sparkles,
  AlertTriangle,
  Users,
  Zap,
  Brain,
  Shield,
  Target,
  ArrowRight,
  Download,
  Calendar,
  Bot,
  Database,
  MessageSquare,
  FileText,
  Search,
  Settings,
  LucideIcon,
  Bell,
  TrendingDown,
  Award,
  Activity,
  Gauge
} from 'lucide-react';
import styles from './ExecutiveSummary.module.css';

// ===================================================================
// BUSINESS IMPACT COMPONENTS (REPLACES TECHNICAL AGENT WORKFLOW)
// ===================================================================

/**
 * Business Impact Card - Focuses on operational outcomes and business value
 * Replaces technical agent workflow with executive-focused content
 * 
 * @param opportunity - Strategic opportunity with business impact metrics
 * @param showDetails - Whether to display detailed operational metrics
 * 
 * @example
 * <BusinessImpactCard 
 *   opportunity={{
 *     title: "Quality Process Automation",
 *     operationalOutcomes: ["75% reduction in inspection time", "90% accuracy improvement"],
 *     keyMetrics: { efficiencyGain: "75%", costReduction: "$240K annually" }
 *   }}
 *   showDetails={true}
 * />
 */
interface BusinessImpactCardProps {
  opportunity: {
    title: string;
    category: string;
    roi: string;
    timeframe: string;
    investment: string;
    annualSavings: string;
    confidence: string;
  };
  showDetails?: boolean;
}

const BusinessImpactCard: React.FC<BusinessImpactCardProps> = ({ 
  opportunity, 
  showDetails = true 
}) => {
  // Generate business-focused operational outcomes based on category
  const getOperationalOutcomes = (category: string, title: string) => {
    const outcomeMap: Record<string, string[]> = {
      "Process Automation": [
        "75% reduction in manual processing time",
        "90% improvement in accuracy and consistency", 
        "50% faster completion of routine tasks",
        "Elimination of human errors in repetitive processes"
      ],
      "Customer Experience": [
        "80% faster customer response times",
        "95% improvement in customer satisfaction scores",
        "60% reduction in service delivery costs",
        "24/7 automated customer support availability"
      ],
      "Data Analytics": [
        "85% improvement in forecast accuracy",
        "60% faster insights generation and reporting",
        "40% better strategic decision outcomes",
        "Real-time performance monitoring and alerts"
      ]
    };

    return outcomeMap[category] || outcomeMap["Process Automation"];
  };

  // Generate key business metrics
  const getKeyMetrics = (opportunity: any) => {
    const roiNum = parseInt(opportunity.roi.replace(/[^0-9]/g, '')) || 250;
    const savingsNum = parseInt(opportunity.annualSavings.replace(/[^0-9]/g, '')) || 200;
    
    return {
      efficiencyGain: `${Math.min(Math.round(roiNum / 4), 75)}%`,
      costReduction: opportunity.annualSavings,
      revenueImpact: `${Math.round(roiNum / 10)}% revenue uplift`,
      qualityImprovement: "95% accuracy improvement"
    };
  };

  const operationalOutcomes = getOperationalOutcomes(opportunity.category, opportunity.title);
  const keyMetrics = getKeyMetrics(opportunity);

  return (
    <div className={styles.businessImpactCard}>
      <div className={styles.impactHeader}>
        <div className={styles.impactTitle}>
          <h4>Business Impact Analysis</h4>
          <span className={styles.impactSubtitle}>Operational outcomes and efficiency gains</span>
        </div>
        <div className={styles.confidenceIndicator}>
          <div className={`${styles.confidenceBadge} ${styles[opportunity.confidence.toLowerCase()]}`}>
            <Award size={16} />
            {opportunity.confidence} Confidence
          </div>
        </div>
      </div>

      {/* Executive-focused metrics */}
      <div className={styles.executiveMetrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>ROI</span>
            <span className={styles.metricValue}>{opportunity.roi}</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Clock size={20} />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Payback</span>
            <span className={styles.metricValue}>{opportunity.timeframe}</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <DollarSign size={20} />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Annual Savings</span>
            <span className={styles.metricValue}>{opportunity.annualSavings}</span>
          </div>
        </div>
      </div>

      {/* Business outcomes (NOT technical implementation) */}
      <div className={styles.businessOutcomes}>
        <h5 className={styles.outcomesTitle}>
          <Activity size={18} />
          Operational Outcomes
        </h5>
        <div className={styles.outcomesList}>
          {operationalOutcomes.map((outcome, index) => (
            <div key={index} className={styles.outcomeItem}>
              <CheckCircle className={styles.outcomeCheck} size={16} />
              <span className={styles.outcomeText}>{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {showDetails && (
        <div className={styles.detailedMetrics}>
          <h5 className={styles.metricsTitle}>
            <Gauge size={18} />
            Key Performance Improvements
          </h5>
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Efficiency Gain</span>
              <span className={styles.metricItemValue}>{keyMetrics.efficiencyGain}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Cost Reduction</span>
              <span className={styles.metricItemValue}>{keyMetrics.costReduction}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Revenue Impact</span>
              <span className={styles.metricItemValue}>{keyMetrics.revenueImpact}</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricItemLabel}>Quality Improvement</span>
              <span className={styles.metricItemValue}>{keyMetrics.qualityImprovement}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Competitive Advantage Card - Highlights market differentiation and strategic positioning
 * Shows how AI implementation creates competitive advantage
 * 
 * @param opportunity - Strategic opportunity with competitive implications
 * 
 * @example
 * <CompetitiveAdvantageCard 
 *   opportunity={{
 *     title: "AI-Powered Customer Support",
 *     category: "Customer Experience"
 *   }}
 * />
 */
interface CompetitiveAdvantageCardProps {
  opportunity: {
    title: string;
    category: string;
    timeframe: string;
  };
}

const CompetitiveAdvantageCard: React.FC<CompetitiveAdvantageCardProps> = ({ opportunity }) => {
  const getCompetitiveAdvantages = (category: string) => {
    const advantageMap: Record<string, { advantages: string[], timeToAdvantage: string }> = {
      "Process Automation": {
        advantages: [
          "Industry-leading operational efficiency",
          "Lowest cost structure in market segment",
          "Fastest service delivery times",
          "Highest quality consistency"
        ],
        timeToAdvantage: "6-9 months"
      },
      "Customer Experience": {
        advantages: [
          "Superior customer satisfaction scores",
          "24/7 instant customer service",
          "Personalized customer interactions",
          "Proactive issue resolution"
        ],
        timeToAdvantage: "4-6 months"
      },
      "Data Analytics": {
        advantages: [
          "Predictive market intelligence",
          "Data-driven strategic decisions",
          "Real-time competitive insights",
          "Optimized resource allocation"
        ],
        timeToAdvantage: "8-12 months"
      }
    };

    return advantageMap[category] || advantageMap["Process Automation"];
  };

  const competitiveData = getCompetitiveAdvantages(opportunity.category);

  return (
    <div className={styles.competitiveAdvantageCard}>
      <div className={styles.advantageHeader}>
        <div className={styles.advantageTitle}>
          <Shield size={20} />
          <h5>Competitive Advantage</h5>
        </div>
        <div className={styles.timeToAdvantage}>
          <span>Market leadership in {competitiveData.timeToAdvantage}</span>
        </div>
      </div>

      <div className={styles.advantagesList}>
        {competitiveData.advantages.map((advantage, index) => (
          <div key={index} className={styles.advantageItem}>
            <Target size={14} />
            <span>{advantage}</span>
          </div>
        ))}
      </div>

      <div className={styles.marketPosition}>
        <div className={styles.positionIndicator}>
          <span className={styles.positionLabel}>Market Position</span>
          <div className={styles.positionBar}>
            <div className={styles.currentPosition}></div>
            <div className={styles.projectedPosition}></div>
          </div>
          <span className={styles.positionText}>Top 15% projected</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Risk Assessment Card - Implementation risk analysis with mitigation strategies
 * Shows comprehensive risk evaluation for executive decision-making
 * 
 * @param opportunity - Strategic opportunity with associated risks
 * 
 * @example
 * <RiskAssessmentCard 
 *   opportunity={{
 *     title: "Process Automation Initiative",
 *     category: "Process Automation"
 *   }}
 * />
 */
interface RiskAssessmentCardProps {
  opportunity: {
    title: string;
    category: string;
    timeframe: string;
  };
}

const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ opportunity }) => {
  const getRiskAssessment = (category: string) => {
    const riskMap: Record<string, { 
      level: 'Low' | 'Medium' | 'High',
      risks: Array<{ risk: string, mitigation: string }>,
      overallRisk: string 
    }> = {
      "Process Automation": {
        level: "Medium",
        risks: [
          { 
            risk: "Integration complexity with existing systems",
            mitigation: "Phased rollout with pilot testing"
          },
          {
            risk: "Staff resistance to process changes",
            mitigation: "Comprehensive training and change management"
          },
          {
            risk: "Initial productivity dip during transition",
            mitigation: "Parallel systems during implementation"
          }
        ],
        overallRisk: "Well-managed with proven mitigation strategies"
      },
      "Customer Experience": {
        level: "Low",
        risks: [
          {
            risk: "Customer adaptation to AI-powered service",
            mitigation: "Gradual rollout with human backup"
          },
          {
            risk: "Service quality during implementation",
            mitigation: "Extensive testing and monitoring"
          }
        ],
        overallRisk: "Low risk with high upside potential"
      },
      "Data Analytics": {
        level: "Medium",
        risks: [
          {
            risk: "Data quality and availability",
            mitigation: "Data audit and cleansing process"
          },
          {
            risk: "Model accuracy and bias",
            mitigation: "Continuous monitoring and validation"
          }
        ],
        overallRisk: "Manageable risks with standard data practices"
      }
    };

    return riskMap[category] || riskMap["Process Automation"];
  };

  const riskData = getRiskAssessment(opportunity.category);

  return (
    <div className={styles.riskAssessmentCard}>
      <div className={styles.riskHeader}>
        <div className={styles.riskTitle}>
          <AlertTriangle size={20} />
          <h5>Risk Assessment</h5>
        </div>
        <div className={`${styles.riskLevel} ${styles[riskData.level.toLowerCase()]}`}>
          {riskData.level} Risk
        </div>
      </div>

      <div className={styles.risksList}>
        {riskData.risks.map((riskItem, index) => (
          <div key={index} className={styles.riskItem}>
            <div className={styles.riskDescription}>
              <span className={styles.riskText}>{riskItem.risk}</span>
            </div>
            <div className={styles.mitigationStrategy}>
              <Shield size={14} />
              <span className={styles.mitigationText}>{riskItem.mitigation}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.overallRiskAssessment}>
        <div className={styles.assessmentIcon}>
          <CheckCircle size={16} />
        </div>
        <span className={styles.assessmentText}>{riskData.overallRisk}</span>
      </div>
    </div>
  );
};

/**
 * Strategic Alignment Card - Shows how AI initiatives tie to business objectives
 * Demonstrates strategic value and alignment with company goals
 * 
 * @param opportunity - Strategic opportunity with business alignment
 * 
 * @example
 * <StrategicAlignmentCard 
 *   opportunity={{
 *     title: "Customer Experience Enhancement",
 *     category: "Customer Experience"
 *   }}
 * />
 */
interface StrategicAlignmentCardProps {
  opportunity: {
    title: string;
    category: string;
  };
}

const StrategicAlignmentCard: React.FC<StrategicAlignmentCardProps> = ({ opportunity }) => {
  const getStrategicAlignment = (category: string) => {
    const alignmentMap: Record<string, {
      strategicObjectives: string[],
      businessPriorities: string[],
      alignmentScore: number
    }> = {
      "Process Automation": {
        strategicObjectives: [
          "Operational excellence and efficiency",
          "Cost optimization and margin improvement",
          "Quality consistency and reliability",
          "Scalable growth foundation"
        ],
        businessPriorities: [
          "Reduce operational costs",
          "Improve service quality",
          "Scale operations efficiently"
        ],
        alignmentScore: 95
      },
      "Customer Experience": {
        strategicObjectives: [
          "Customer satisfaction leadership",
          "Market differentiation strategy", 
          "Revenue growth through retention",
          "Brand value enhancement"
        ],
        businessPriorities: [
          "Enhance customer satisfaction",
          "Increase customer loyalty",
          "Differentiate from competitors"
        ],
        alignmentScore: 92
      },
      "Data Analytics": {
        strategicObjectives: [
          "Data-driven decision making",
          "Predictive business intelligence",
          "Competitive market insights",
          "Strategic planning optimization"
        ],
        businessPriorities: [
          "Improve decision quality",
          "Gain market insights",
          "Optimize strategic planning"
        ],
        alignmentScore: 88
      }
    };

    return alignmentMap[category] || alignmentMap["Process Automation"];
  };

  const alignmentData = getStrategicAlignment(opportunity.category);

  return (
    <div className={styles.strategicAlignmentCard}>
      <div className={styles.alignmentHeader}>
        <div className={styles.alignmentTitle}>
          <Target size={20} />
          <h5>Strategic Alignment</h5>
        </div>
        <div className={styles.alignmentScore}>
          <span className={styles.scoreLabel}>Alignment Score</span>
          <span className={styles.scoreValue}>{alignmentData.alignmentScore}%</span>
        </div>
      </div>

      <div className={styles.objectivesSection}>
        <h6 className={styles.objectivesTitle}>
          <Brain size={16} />
          Strategic Objectives
        </h6>
        <div className={styles.objectivesList}>
          {alignmentData.strategicObjectives.map((objective, index) => (
            <div key={index} className={styles.objectiveItem}>
              <CheckCircle size={14} />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.prioritiesSection}>
        <h6 className={styles.prioritiesTitle}>
          <Zap size={16} />
          Business Priorities Addressed
        </h6>
        <div className={styles.prioritiesList}>
          {alignmentData.businessPriorities.map((priority, index) => (
            <div key={index} className={styles.priorityItem}>
              <ArrowRight size={14} />
              <span>{priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===================================================================
// MAIN EXECUTIVE SUMMARY PAGE
// ===================================================================

export default function ExecutiveSummaryPage() {
  // Demo data representing a typical mid-market manufacturing company
  const demoData = {
    company: "MedTech Innovations",
    industry: "Medical Device Manufacturing",
    revenue: "$200M",
    employees: "500",
    readinessScore: 78,
    totalRoi: "1.2M",
    paybackMonths: 4,
    investmentRequired: "350K",
    opportunities: [
      {
        title: "Intelligent Quality Orchestration",
        category: "Process Automation", 
        roi: "320%",
        timeframe: "6-8 months",
        investment: "$75K-$125K",
        annualSavings: "$240K-$400K",
        confidence: "High"
      },
      {
        title: "AI-Powered Customer Support",
        category: "Customer Experience",
        roi: "280%", 
        timeframe: "4-6 months",
        investment: "$50K-$85K",
        annualSavings: "$140K-$240K",
        confidence: "High"
      },
      {
        title: "Predictive Demand Planning",
        category: "Data Analytics",
        roi: "250%",
        timeframe: "8-12 months", 
        investment: "$100K-$150K",
        annualSavings: "$250K-$375K",
        confidence: "Medium"
      }
    ]
  };

  const roiTimeline = [
    { month: 0, investment: 0, savings: 0, netRoi: 0, x: 50, y: 150 },
    { month: 3, investment: 150, savings: 45, netRoi: -105, x: 110, y: 145 },
    { month: 6, investment: 300, savings: 150, netRoi: -150, x: 170, y: 135 },
    { month: 12, investment: 350, savings: 520, netRoi: 170, x: 230, y: 100 },
    { month: 18, investment: 350, savings: 780, netRoi: 430, x: 290, y: 70 },
    { month: 24, investment: 350, savings: 1200, netRoi: 850, x: 350, y: 40 }
  ];

  const quickWins = [
    {
      title: "Quality Process Automation",
      impact: "75% reduction in inspection time",
      timeline: "90 days",
      investment: "$25K"
    },
    {
      title: "Customer Support AI",
      impact: "70% of tickets automated", 
      timeline: "60 days",
      investment: "$15K"
    }
  ];

  // Enhanced ROI Chart Component
  const ROIChart = () => {
    const pathData = roiTimeline.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    const areaPath = `${pathData} L 350 160 L 50 160 Z`;

    return (
      <div className={styles.chartContainer}>
        <svg viewBox="0 0 400 200" className={styles.chart}>
          <defs>
            <linearGradient id="roiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="var(--accent-green)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-blue)"/>
              <stop offset="50%" stopColor="var(--accent-green)"/>
              <stop offset="100%" stopColor="var(--accent-green)"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Grid lines */}
          <g className={styles.gridLines}>
            {[60, 100, 140].map(y => (
              <line key={y} x1="50" y1={y} x2="350" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2"/>
            ))}
            {roiTimeline.slice(1).map((point, index) => (
              <line key={index} x1={point.x} y1="40" x2={point.x} y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2"/>
            ))}
          </g>
          
          {/* Area fill */}
          <path 
            d={areaPath}
            fill="url(#roiGradient)"
            className={styles.areaFill}
          />
          
          {/* Main line */}
          <path 
            d={pathData}
            stroke="url(#lineGradient)" 
            strokeWidth="3" 
            fill="none"
            filter="url(#glow)"
            className={styles.roiLine}
          />
          
          {/* Data points */}
          {roiTimeline.map((point, index) => (
            <g key={index} className={styles.dataPointGroup}>
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="6" 
                fill="var(--accent-green)"
                stroke="white"
                strokeWidth="2"
                filter="url(#glow)"
                className={styles.dataPoint}
              />
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="12" 
                fill="transparent"
                className={styles.dataPointHover}
              />
              {/* Tooltip on hover */}
              <g className={styles.tooltip} opacity="0">
                <rect x={point.x - 30} y={point.y - 35} width="60" height="25" rx="4" fill="rgba(0,0,0,0.8)"/>
                <text x={point.x} y={point.y - 20} textAnchor="middle" fill="white" fontSize="10">
                  ${Math.abs(point.netRoi)}K
                </text>
                <text x={point.x} y={point.y - 10} textAnchor="middle" fill="white" fontSize="8">
                  Month {point.month}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <main className={styles.main}>
        {/* Hero Section with Financial Impact */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.companyHeader}>
              <h1 className={styles.companyTitle}>{demoData.company}</h1>
              <p className={styles.companySubtitle}>AI Transformation Executive Summary</p>
            </div>
            
            <div className={styles.financialHighlights}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>${demoData.totalRoi}M</div>
                <div className={styles.metricLabel}>Annual ROI Potential</div>
                <div className={styles.metricGrowth}>+340% by Year 2</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{demoData.paybackMonths}</div>
                <div className={styles.metricLabel}>Month Payback</div>
                <div className={styles.metricGrowth}>Industry: 12 months</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>${demoData.investmentRequired}</div>
                <div className={styles.metricLabel}>Total Investment</div>
                <div className={styles.metricGrowth}>Phased approach</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{demoData.readinessScore}</div>
                <div className={styles.metricLabel}>AI Readiness Score</div>
                <div className={styles.metricGrowth}>Above average</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {/* Executive Summary */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Executive Summary</h2>
            <div className={styles.summaryCard}>
              <p className={styles.summaryText}>
                <strong>{demoData.company}</strong> is positioned for exceptional AI transformation success with an AI readiness score of {demoData.readinessScore}/100. 
                Our analysis identifies <strong>5 high-impact agentic AI opportunities</strong> that can deliver <strong>${demoData.totalRoi}M in annual ROI</strong> within 18 months, 
                requiring a total investment of ${demoData.investmentRequired}. The manufacturing industry average payback period is 12 months—your company 
                can achieve payback in just <strong>{demoData.paybackMonths} months</strong> due to strong operational foundations and clear process automation opportunities.
              </p>
              <div className={styles.summaryActions}>
                <button className={styles.downloadBtn}>
                  <Download size={18} />
                  Download Full Report
                </button>
                <button className={styles.scheduleBtn}>
                  <Calendar size={18} />
                  Schedule Board Presentation
                </button>
              </div>
            </div>
          </div>

          {/* Strategic AI Opportunities - MOVED UP FOR EXECUTIVE PRIORITY */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Strategic AI Opportunities</h2>
            <div className={styles.opportunitiesGrid}>
              {demoData.opportunities.map((opp, index) => (
                <div key={index} className={styles.opportunityCard}>
                  <div className={styles.oppHeader}>
                    <div className={styles.oppTitle}>{opp.title}</div>
                    <div className={styles.oppCategory}>{opp.category}</div>
                  </div>
                  
                  <div className={styles.oppMetrics}>
                    <div className={styles.oppMetric}>
                      <span className={styles.metricLabel}>ROI</span>
                      <span className={styles.metricValue}>{opp.roi}</span>
                    </div>
                    <div className={styles.oppMetric}>
                      <span className={styles.metricLabel}>Timeline</span>
                      <span className={styles.metricValue}>{opp.timeframe}</span>
                    </div>
                    <div className={styles.oppMetric}>
                      <span className={styles.metricLabel}>Investment</span>
                      <span className={styles.metricValue}>{opp.investment}</span>
                    </div>
                  </div>

                  {/* BUSINESS IMPACT COMPONENTS REPLACE AGENT WORKFLOW */}
                  <div className={styles.businessAnalysisContainer}>
                    <BusinessImpactCard opportunity={opp} showDetails={true} />
                    
                    <div className={styles.analysisGrid}>
                      <CompetitiveAdvantageCard opportunity={opp} />
                      <RiskAssessmentCard opportunity={opp} />
                      <StrategicAlignmentCard opportunity={opp} />
                    </div>
                  </div>

                  <div className={styles.oppFooter}>
                    <div className={styles.oppSavings}>
                      Annual Savings: {opp.annualSavings}
                    </div>
                    <button className={styles.detailsButton}>
                      <ArrowRight size={16} />
                      View Implementation Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 90-Day Quick Wins - MOVED UP FOR EXECUTIVE CONFIDENCE */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>90-Day Quick Wins</h2>
            <div className={styles.quickWinsGrid}>
              {quickWins.map((win, index) => (
                <div key={index} className={styles.quickWinCard}>
                  <div className={styles.quickWinIcon}>
                    <Zap />
                  </div>
                  <div className={styles.quickWinContent}>
                    <h4>{win.title}</h4>
                    <p>{win.impact}</p>
                    <div className={styles.quickWinMeta}>
                      <span>{win.timeline}</span>
                      <span>{win.investment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Impact Projection - MOVED DOWN AFTER OPPORTUNITIES */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Financial Impact Projection</h2>
            <div className={styles.roiSection}>
              <div className={styles.roiChart}>
                <h3 className={styles.chartTitle}>24-Month ROI Timeline</h3>
                <ROIChart />
                <div className={styles.chartLabels}>
                  <span>Start</span>
                  <span>Q2</span>
                  <span>Year 1</span>
                  <span>18 Mo</span>
                  <span>Year 2</span>
                </div>
              </div>
              
              <div className={styles.roiBreakdown}>
                <div className={styles.breakdownCard}>
                  <h4>Investment Breakdown</h4>
                  <div className={styles.costItem}>
                    <span>Phase 1 (Months 1-6)</span>
                    <span>$200K</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>Phase 2 (Months 7-12)</span>
                    <span>$100K</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>Phase 3 (Months 13-18)</span>
                    <span>$50K</span>
                  </div>
                  <div className={styles.costItem}>
                    <strong>Total Investment</strong>
                    <strong>${demoData.investmentRequired}</strong>
                  </div>
                </div>
                
                <div className={styles.breakdownCard}>
                  <h4>Annual Returns</h4>
                  <div className={styles.costItem}>
                    <span>Year 1 Savings</span>
                    <span>$520K</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>Year 2 Savings</span>
                    <span>$1.2M</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>5-Year Total</span>
                    <span>$4.8M</span>
                  </div>
                  <div className={styles.costItem}>
                    <strong>Net 5-Year ROI</strong>
                    <strong>1,271%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Readiness */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Implementation Readiness Assessment</h2>
            <div className={styles.readinessGrid}>
              <div className={styles.readinessCard}>
                <div className={styles.readinessIcon}>
                  <CheckCircle className={styles.successIcon} />
                </div>
                <h4>Strengths</h4>
                <ul>
                  <li>Strong data infrastructure (SAP ERP integration)</li>
                  <li>Clear process documentation</li>
                  <li>Executive sponsorship aligned</li>
                  <li>Proven change management capability</li>
                </ul>
              </div>
              
              <div className={styles.readinessCard}>
                <div className={styles.readinessIcon}>
                  <AlertTriangle className={styles.warningIcon} />
                </div>
                <h4>Preparation Areas</h4>
                <ul>
                  <li>Data quality standardization needed</li>
                  <li>Staff AI literacy training required</li>
                  <li>Legacy system integration planning</li>
                  <li>Change management communication strategy</li>
                </ul>
              </div>
              
              <div className={styles.readinessCard}>
                <div className={styles.readinessIcon}>
                  <Target className={styles.targetIcon} />
                </div>
                <h4>Success Factors</h4>
                <ul>
                  <li>Phased implementation approach</li>
                  <li>Pilot program with quality team</li>
                  <li>Executive dashboard monitoring</li>
                  <li>Quarterly progress reviews</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Competitive Advantage - MOVED UP FOR STRATEGIC CONTEXT */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Agentic AI vs. Traditional Automation</h2>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonGrid}>
                <div className={styles.comparisonItem}>
                  <h5>Traditional Automation</h5>
                  <ul>
                    <li>Fixed rule-based workflows</li>
                    <li>Requires extensive programming</li>
                    <li>Breaks when exceptions occur</li>
                    <li>Limited learning capability</li>
                  </ul>
                </div>
                
                <div className={styles.comparisonItem}>
                  <h5>Agentic AI (Our Approach)</h5>
                  <ul>
                    <li>Intelligent decision-making agents</li>
                    <li>Self-configuring workflows</li>
                    <li>Handles exceptions autonomously</li>
                    <li>Continuous learning and improvement</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.resultHighlight}>
                <strong>Result:</strong> Companies implementing agentic AI see 2.3x higher ROI than traditional automation 
                and achieve full value realization 6 months faster.
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Recommended Next Steps</h2>
            <div className={styles.nextStepsCard}>
              <div className={styles.stepsTimeline}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h5>Board Approval (Week 1-2)</h5>
                    <p>Present executive summary to board for Phase 1 funding approval ($200K)</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h5>Team Assembly (Week 3-4)</h5>
                    <p>Form AI transformation team with quality, IT, and operations leads</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h5>Pilot Launch (Month 2)</h5>
                    <p>Begin with Intelligent Quality Orchestration pilot program</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h5>Scale & Expand (Month 6+)</h5>
                    <p>Deploy additional AI agents across customer service and supply chain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={styles.cta}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Ready to Transform Your Operations?</h3>
              <p className={styles.ctaDescription}>
                This analysis is based on your company profile and strategic initiatives. 
                Take the next step to begin your AI transformation journey.
              </p>
              <div className={styles.ctaButtons}>
                <button className={styles.primaryButton}>
                  Schedule Implementation Call
                </button>
                <button className={styles.secondaryButton}>
                  View Detailed Timeline
                </button>
                <button className={styles.tertiaryButton}>
                  Export Board Presentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 