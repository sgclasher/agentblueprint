import React from 'react';
import { Timeline, Profile } from '../../services/types';
import styles from './TimelinePDFTemplate.module.css';

interface TimelinePDFTemplateProps {
  timelineData: Timeline;
  businessProfile: Partial<Profile>;
  options?: {
    includeMetrics?: boolean;
    format?: 'A4' | 'Letter';
    orientation?: 'portrait' | 'landscape';
  };
}

interface TimelineSection {
  id: string;
  year: string;
  title: string;
  subtitle: string;
}

const TimelinePDFTemplate: React.FC<TimelinePDFTemplateProps> = ({
  timelineData,
  businessProfile,
  options = {}
}) => {
  // Define timeline sections structure
  const timelineSections: TimelineSection[] = [
    { id: 'current-state', year: 'Current', title: 'Current State', subtitle: 'Where we are today' },
    { id: 'phase-1', year: 'Months 1-6', title: 'Foundation Phase', subtitle: 'Building AI readiness' },
    { id: 'phase-2', year: 'Months 7-12', title: 'Implementation Phase', subtitle: 'Deploying core solutions' },
    { id: 'phase-3', year: 'Months 13-18', title: 'Expansion Phase', subtitle: 'Scaling successful initiatives' },
    { id: 'phase-4', year: 'Months 19-24', title: 'Optimization Phase', subtitle: 'Advanced AI integration' },
    { id: 'future-state', year: 'Future', title: 'Future State', subtitle: 'AI-powered operations' }
  ];

  const getSectionContent = (sectionId: string) => {
    const contentMap: { [key: string]: { content: any, highlights: any[] } } = {
      'current-state': {
        content: timelineData.currentState,
        highlights: [
          { label: 'AI Maturity', value: businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'N/A' },
          { label: 'Industry', value: businessProfile.industry || 'N/A' },
          { label: 'Company Size', value: businessProfile.companySize?.charAt(0).toUpperCase() + businessProfile.companySize?.slice(1) || 'N/A' }
        ]
      },
      'phase-1': {
        content: timelineData.phases?.[0],
        highlights: timelineData.phases?.[0]?.highlights || []
      },
      'phase-2': {
        content: timelineData.phases?.[1],
        highlights: timelineData.phases?.[1]?.highlights || []
      },
      'phase-3': {
        content: timelineData.phases?.[2],
        highlights: timelineData.phases?.[2]?.highlights || []
      },
      'phase-4': {
        content: timelineData.phases?.[3],
        highlights: timelineData.phases?.[3]?.highlights || []
      },
      'future-state': {
        content: timelineData.futureState,
        highlights: timelineData.futureState?.highlights || []
      }
    };
    return contentMap[sectionId] || { content: {}, highlights: [] };
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMetrics = () => {
    if (!timelineData.summary) return null;
    
    return {
      totalInvestment: timelineData.summary.totalInvestment || 'TBD',
      expectedROI: timelineData.summary.expectedROI || 'TBD',
      timeToValue: timelineData.summary.timeToValue || 'TBD',
      riskLevel: timelineData.summary.riskLevel || 'Medium'
    };
  };

  const companyName = businessProfile.companyName || 'Company';
  const industry = businessProfile.industry || 'Industry';
  const generatedDate = formatDate(new Date());
  const metrics = getMetrics();

  return (
    <div className={styles.pdfDocument}>
      {/* Cover Page */}
      <div className={styles.coverPage}>
        <div className={styles.coverHeader}>
          <h1 className={styles.mainTitle}>AI Transformation Timeline</h1>
          <p className={styles.subtitle}>Strategic Roadmap for AI-Powered Business Operations</p>
        </div>
        
        <div className={styles.companySection}>
          <h2 className={styles.companyName}>{companyName}</h2>
          <div className={styles.companyDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Industry:</span>
              <span className={styles.detailValue}>{industry}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>AI Maturity:</span>
              <span className={styles.detailValue}>
                {businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'Assessment Required'}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Generated:</span>
              <span className={styles.detailValue}>{generatedDate}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary on Cover */}
        {timelineData.summary?.description && (
          <div className={styles.execSummary}>
            <h3>Executive Summary</h3>
            <p>{timelineData.summary.description}</p>
          </div>
        )}

        <div className={styles.coverFooter}>
          <p>Generated by Agent Blueprint</p>
        </div>
      </div>

      {/* Key Metrics Page */}
      {options.includeMetrics && metrics && (
        <div className={styles.metricsPage}>
          <h2 className={styles.pageTitle}>Key Metrics & Projections</h2>
          
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Total Investment</h3>
              <div className={styles.metricValue}>{metrics.totalInvestment}</div>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Expected ROI</h3>
              <div className={styles.metricValue}>{metrics.expectedROI}</div>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Time to Value</h3>
              <div className={styles.metricValue}>{metrics.timeToValue}</div>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.metricTitle}>Risk Level</h3>
              <div className={styles.metricValue}>{metrics.riskLevel}</div>
            </div>
          </div>

          {/* Goals and Objectives */}
          {businessProfile.primaryGoals && businessProfile.primaryGoals.length > 0 && (
            <div className={styles.goalsSection}>
              <h3>Primary Business Goals</h3>
              <ul className={styles.goalsList}>
                {(businessProfile.primaryGoals as string[]).map((goal, index) => (
                  <li key={index} className={styles.goalItem}>{goal}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Timeline Sections */}
      <div className={styles.timelinePages}>
        {timelineSections.map((section) => {
          const { content, highlights } = getSectionContent(section.id);
          
          if (!content || Object.keys(content).length === 0) return null;

          return (
            <div key={section.id} className={styles.timelinePage}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionMeta}>
                  <div className={styles.sectionYear}>{section.year}</div>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <p className={styles.sectionSubtitle}>{section.subtitle}</p>
                </div>
              </div>

              <div className={styles.sectionContent}>
                {/* Description */}
                {content.description && (
                  <div className={styles.description}>
                    <p>{content.description}</p>
                  </div>
                )}

                {/* Key Highlights */}
                {highlights && highlights.length > 0 && (
                  <div className={styles.highlightsSection}>
                    <h3 className={styles.subsectionTitle}>Key Highlights</h3>
                    <div className={styles.highlightsGrid}>
                      {highlights.map((highlight: any, index: number) => (
                        <div key={index} className={styles.highlightCard}>
                          <div className={styles.highlightLabel}>{highlight.label}</div>
                          <div className={styles.highlightValue}>{highlight.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Initiatives */}
                {content.initiatives && content.initiatives.length > 0 && (
                  <div className={styles.initiativesSection}>
                    <h3 className={styles.subsectionTitle}>Key Initiatives</h3>
                    <div className={styles.initiativesList}>
                      {content.initiatives.map((initiative: any, index: number) => (
                        <div key={index} className={styles.initiativeItem}>
                          <h4 className={styles.initiativeTitle}>
                            {initiative.title || `Initiative ${index + 1}`}
                          </h4>
                          {initiative.description && (
                            <p className={styles.initiativeDescription}>{initiative.description}</p>
                          )}
                          {initiative.impact && (
                            <div className={styles.initiativeImpact}>
                              <strong>Expected Impact:</strong> {initiative.impact}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies & Tools */}
                {content.technologies && content.technologies.length > 0 && (
                  <div className={styles.technologiesSection}>
                    <h3 className={styles.subsectionTitle}>Technologies & Tools</h3>
                    <div className={styles.techTags}>
                      {content.technologies.map((tech: string, index: number) => (
                        <span key={index} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expected Outcomes */}
                {content.outcomes && content.outcomes.length > 0 && (
                  <div className={styles.outcomesSection}>
                    <h3 className={styles.subsectionTitle}>Expected Outcomes</h3>
                    <div className={styles.outcomesGrid}>
                      {content.outcomes.map((outcome: any, index: number) => (
                        <div key={index} className={styles.outcomeCard}>
                          <div className={styles.outcomeMetric}>{outcome.metric}</div>
                          <div className={styles.outcomeValue}>{outcome.value}</div>
                          {outcome.description && (
                            <div className={styles.outcomeDescription}>{outcome.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk Factors & Recommendations */}
      {timelineData.riskFactors && timelineData.riskFactors.length > 0 && (
        <div className={styles.riskPage}>
          <h2 className={styles.pageTitle}>Risk Factors & Mitigation</h2>
          <div className={styles.risksList}>
            {timelineData.riskFactors.map((risk: any, index: number) => (
              <div key={index} className={styles.riskItem}>
                <h4 className={styles.riskTitle}>{risk.type || `Risk ${index + 1}`}</h4>
                <div className={styles.riskLevel}>Risk Level: {risk.level || 'Medium'}</div>
                <p className={styles.riskDescription}>{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with branding */}
      <div className={styles.documentFooter}>
        <p>This AI Transformation Timeline was generated by Agent Blueprint • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default TimelinePDFTemplate; 