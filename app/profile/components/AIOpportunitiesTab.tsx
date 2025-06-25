'use client';

import React, { useState, useEffect, FC } from 'react';
import { Profile } from '../../services/types';
import { Brain, Zap, RefreshCw, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

interface AIOpportunitiesTabProps {
  profile: Profile;
  isEditing: boolean;
}

interface AIOpportunity {
  title: string;
  description: string;
  category: string;
  businessImpact: {
    primaryMetrics: string[];
    estimatedROI: string;
    timeToValue: string;
    confidenceLevel: 'High' | 'Medium' | 'Low';
  };
  implementation: {
    complexity: 'Low' | 'Medium' | 'High';
    timeframe: string;
    prerequisites: string[];
    riskFactors: string[];
  };
  relevantInitiatives: string[];
  aiTechnologies: string[];
}

interface AIOpportunitiesAnalysis {
  executiveSummary: string;
  opportunities: AIOpportunity[];
  priorityRecommendations: string[];
  industryContext: string;
  overallReadinessScore: number;
  nextSteps: string[];
  generatedAt: string;
  analysisMetadata: {
    initiativeCount: number;
    problemCount: number;
    systemCount: number;
    industryFocus: string;
    companySize: string;
    provider?: string;
  };
}

const AIOpportunitiesTab: FC<AIOpportunitiesTabProps> = ({ profile, isEditing }) => {
  const [opportunities, setOpportunities] = useState<AIOpportunitiesAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [preferredProvider, setPreferredProvider] = useState<string>('');
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

  // Auto-load cached opportunities on component mount (fixes UX issue)
  useEffect(() => {
    if (!hasAttemptedLoad && !isLoading) {
      loadCachedOpportunities();
    }
  }, [hasAttemptedLoad, isLoading]); // Only run when hasAttemptedLoad or isLoading changes

  // Load cached opportunities from server
  const loadCachedOpportunities = async () => {
    if (hasAttemptedLoad) return; // Prevent multiple loads
    
    try {
      setIsLoading(true);
      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch('/api/profiles/analyze-opportunities', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.hasOpportunities) {
          setOpportunities(result.opportunities);
          setIsCached(result.cached);
        }
      }
      setHasAttemptedLoad(true);
    } catch (error) {
      console.error('Failed to load cached opportunities:', error);
      setHasAttemptedLoad(true);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAnalysis = async (forceRegenerate = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate profile before making API call
      if (!profile) {
        throw new Error('Profile not found. Please create your profile first.');
      }

      if (!profile.id || !profile.companyName) {
        throw new Error('Profile is incomplete. Please ensure your profile has required information (company name, industry, etc.).');
      }

      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required. Please sign in.');
      }

      const response = await fetch('/api/profiles/analyze-opportunities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferredProvider: preferredProvider || undefined,
          forceRegenerate
        }),
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Analysis generation failed');
      }

      setOpportunities(result.opportunities);
      setIsCached(result.cached);
      setHasAttemptedLoad(true);

    } catch (error: any) {
      console.error('Analysis generation failed:', error);
      setError(error.message || 'Failed to generate analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Process Automation': <Zap size={24} className="text-blue-500" />,
      'Decision Support': <Brain size={24} className="text-green-500" />,
      'Customer Experience': <TrendingUp size={24} className="text-purple-500" />,
      'Data Analytics': <Settings size={24} className="text-orange-500" />,
      'Workforce Augmentation': <CheckCircle size={24} className="text-indigo-500" />,
      'Risk Management': <AlertTriangle size={24} className="text-red-500" />
    };
    return icons[category] || <Brain size={24} className="text-gray-500" />;
  };

  const getConfidenceBadge = (level: string) => {
    const colors: { [key: string]: string } = {
      'High': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-red-100 text-red-800'
    };
    return colors[level] || colors['Medium'];
  };

  const getComplexityBadge = (complexity: string) => {
    const colors: { [key: string]: string } = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors[complexity] || colors['Medium'];
  };

  if (isEditing) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.editModeMessage}>
          <Brain size={48} style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }} />
          <h4>AI Opportunities Analysis</h4>
                      <p>AI opportunities analysis is automatically generated based on your strategic initiatives and systems data. This tab is not directly editable - instead, update your information in the Initiatives and Systems tabs, then return here to generate fresh insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      {/* Header with Generation Button */}
      <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>
            <Brain size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            AI Business Opportunities Analysis
          </h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {opportunities && (
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {isCached ? (
                  <span style={{ color: 'var(--accent-blue)' }}>
                    <Clock size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    Cached ({new Date(opportunities.generatedAt).toLocaleDateString()})
                  </span>
                ) : (
                  <span style={{ color: 'var(--accent-green)' }}>
                    <CheckCircle size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    Fresh Analysis
                  </span>
                )}
              </div>
            )}
            {!opportunities && !hasAttemptedLoad && (
              <button 
                className="btn btn-secondary"
                onClick={loadCachedOpportunities}
                disabled={isLoading}
                style={{ marginRight: '0.5rem' }}
              >
                {isLoading ? (
                  <RefreshCw size={18} className="animate-spin" style={{ marginRight: '0.5rem' }} />
                ) : (
                  <Clock size={18} style={{ marginRight: '0.5rem' }} />
                )}
                {isLoading ? 'Loading...' : 'Load Cached'}
              </button>
            )}
            <button 
              className="btn btn-primary"
              onClick={() => generateAnalysis(false)}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" style={{ marginRight: '0.5rem' }} />
              ) : (
                <Brain size={18} style={{ marginRight: '0.5rem' }} />
              )}
              {isLoading ? 'Analyzing...' : opportunities ? 'Refresh Analysis' : '🤖 Generate Analysis'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--border-radius)',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            <AlertTriangle size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            {error}
          </div>
        )}

        {!opportunities && !isLoading && (
          <div style={{ margin: 0, color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>
              Generate an AI-powered analysis of business opportunities tailored to your company's strategic initiatives and technology infrastructure.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              💡 {hasAttemptedLoad ? 'No cached analysis found. ' : ''}Click "Generate Analysis" to create{hasAttemptedLoad ? ' a' : ' your first'} AI-powered assessment.
            </p>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {opportunities && (
        <>
          {/* Executive Summary & Readiness Score */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className={styles.analysisCard}>
              <h3>Executive Summary</h3>
              <p style={{ lineHeight: 'var(--line-height)', margin: 0 }}>
                {opportunities.executiveSummary}
              </p>
            </div>
            <div className={styles.analysisCard}>
              <h3>AI Readiness Score</h3>
              <div className={styles.readinessScore}>
                <span className={styles.scoreValue}>{opportunities.overallReadinessScore}</span>
                <span className={styles.scoreLabel}>/100</span>
              </div>
              <p style={{ margin: '1rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Based on {opportunities.analysisMetadata.initiativeCount} initiatives, {opportunities.analysisMetadata.systemCount} systems
              </p>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
            <h3>AI Opportunities ({opportunities.opportunities.length})</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {opportunities.opportunities.map((opportunity, index) => (
                <div key={index} className={styles.opportunityCard}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    {getCategoryIcon(opportunity.category)}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                        {opportunity.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: 'var(--border-radius)', 
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: 'var(--accent-blue)'
                        }}>
                          {opportunity.category}
                        </span>
                        <span className={`badge ${getConfidenceBadge(opportunity.businessImpact.confidenceLevel)}`}>
                          {opportunity.businessImpact.confidenceLevel} Confidence
                        </span>
                        <span className={`badge ${getComplexityBadge(opportunity.implementation.complexity)}`}>
                          {opportunity.implementation.complexity} Complexity
                        </span>
                      </div>
                      <p style={{ margin: '0 0 1rem 0', lineHeight: 'var(--line-height)' }}>
                        {opportunity.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-green)' }}>
                        <DollarSign size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                        Business Impact
                      </h5>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {opportunity.businessImpact.primaryMetrics.map((metric, i) => (
                          <li key={i} style={{ marginBottom: '0.25rem' }}>{metric}</li>
                        ))}
                      </ul>
                      <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <strong>ROI:</strong> {opportunity.businessImpact.estimatedROI}<br/>
                        <strong>Time to Value:</strong> {opportunity.businessImpact.timeToValue}
                      </div>
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-blue)' }}>
                        <Settings size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                        Implementation
                      </h5>
                      <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                        <strong>Timeframe:</strong> {opportunity.implementation.timeframe}
                      </div>
                      {opportunity.implementation.prerequisites.length > 0 && (
                        <div style={{ fontSize: '0.9rem' }}>
                          <strong>Prerequisites:</strong>
                          <ul style={{ margin: '0.25rem 0 0 0', paddingLeft: '1.5rem' }}>
                            {opportunity.implementation.prerequisites.map((prereq, i) => (
                              <li key={i} style={{ marginBottom: '0.25rem' }}>{prereq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {opportunity.aiTechnologies.length > 0 && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AI Technologies:</strong>
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {opportunity.aiTechnologies.map((tech, i) => (
                          <span key={i} style={{ 
                            padding: '0.25rem 0.5rem', 
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: 'var(--border-radius)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Priority Recommendations & Next Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className={styles.analysisCard}>
              <h3>Priority Recommendations</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {opportunities.priorityRecommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '0.75rem', lineHeight: 'var(--line-height)' }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.analysisCard}>
              <h3>Next Steps</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {opportunities.nextSteps.map((step, index) => (
                  <li key={index} style={{ marginBottom: '0.75rem', lineHeight: 'var(--line-height)' }}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIOpportunitiesTab; 