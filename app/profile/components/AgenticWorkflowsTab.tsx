'use client';

import React, { useState, useEffect, FC } from 'react';
import { Profile, PersonalizedWorkflow, WorkflowStatus } from '../../services/types';
import { 
  Workflow, 
  Zap, 
  RefreshCw, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Target,
  Shield,
  ArrowRight
} from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

interface AgenticWorkflowsTabProps {
  profile: Profile;
  isEditing: boolean;
}

interface WorkflowAnalysis {
  profileSummary: {
    company: string;
    industry: string;
    size: string;
    initiativesCount: number;
  };
  recommendations: {
    totalWorkflows: number;
    quickWins: number;
    transformational: number;
    averageROI: number;
  };
  implementationGuidance: {
    recommendedSequence: string[];
    totalInvestment: {
      low: number;
      high: number;
    };
    totalAnnualSavings: number;
  };
  riskAssessment: {
    overallRisk: string;
    keyMitigations: string[];
  };
}

interface WorkflowResults {
  workflows: PersonalizedWorkflow[];
  analysis: WorkflowAnalysis;
  generatedAt: string;
  analysisMetadata: {
    provider: string;
    version: string;
    workflowPatterns: number;
    aiGenerated: boolean;
  };
}

const AgenticWorkflowsTab: FC<AgenticWorkflowsTabProps> = ({ profile, isEditing }) => {
  const [workflowResults, setWorkflowResults] = useState<WorkflowResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

  const generateWorkflows = async (forceRegenerate = false) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!profile?.id || !profile?.companyName) {
        throw new Error('Profile is incomplete. Please ensure your profile has required information.');
      }

      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required. Please sign in.');
      }

      const response = await fetch('/api/profiles/generate-agentic-workflows', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ forceRegenerate }),
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Workflow generation failed');
      }

      setWorkflowResults({
        workflows: result.workflows,
        analysis: result.analysis,
        generatedAt: new Date().toISOString(),
        analysisMetadata: {
          provider: result.provider,
          version: '1.0',
          workflowPatterns: result.workflows.length,
          aiGenerated: true
        }
      });
      setIsCached(result.cached);
      setHasAttemptedLoad(true);

    } catch (error: any) {
      console.error('Workflow generation failed:', error);
      setError(error.message || 'Failed to generate workflows');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Process Automation': <Zap size={20} className="text-blue-500" />,
      'Decision Support': <Target size={20} className="text-green-500" />,
      'Customer Experience': <TrendingUp size={20} className="text-purple-500" />,
      'Data Analytics': <Settings size={20} className="text-orange-500" />,
      'Workforce Augmentation': <CheckCircle size={20} className="text-indigo-500" />,
      'Risk Management': <Shield size={20} className="text-red-500" />
    };
    return icons[category] || <Workflow size={20} className="text-gray-500" />;
  };

  const getStatusBadge = (status: WorkflowStatus) => {
    const styles: { [key: string]: string } = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Under Review': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Pilot': 'bg-yellow-100 text-yellow-800',
      'Production': 'bg-emerald-100 text-emerald-800',
      'Paused': 'bg-orange-100 text-orange-800',
      'Archived': 'bg-red-100 text-red-800'
    };
    return styles[status] || styles['Draft'];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isEditing) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.editModeMessage}>
          <Workflow size={48} style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }} />
          <h4>Agentic Workflows</h4>
          <p>Agentic workflows are automatically generated based on your strategic initiatives and systems data. This tab is not directly editable - instead, update your information in the Analysis and Systems tabs, then return here to generate fresh workflow recommendations.</p>
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
            <Workflow size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Agentic Workflow Recommendations
          </h3>
          <button 
            className="btn btn-primary"
            onClick={() => generateWorkflows(false)}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw size={18} className="animate-spin" style={{ marginRight: '0.5rem' }} />
            ) : (
              <Workflow size={18} style={{ marginRight: '0.5rem' }} />
            )}
            {isLoading ? 'Generating...' : workflowResults ? 'Refresh Workflows' : '🤖 Generate Workflows'}
          </button>
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

        {!workflowResults && !isLoading && (
          <div style={{ margin: 0, color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>
              Generate platform-agnostic agentic workflow recommendations based on proven enterprise patterns and your strategic initiatives.
            </p>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: 'var(--border-radius)',
              fontSize: '0.9rem'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>What you'll get:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>5-7 personalized workflow patterns</li>
                <li>ROI analysis and implementation roadmaps</li>
                <li>Risk assessment and governance checkpoints</li>
                <li>Platform-agnostic blueprints ready for technical implementation</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Workflow Results */}
      {workflowResults && (
        <div className={styles.analysisCard}>
          <h3>Generated Workflows ({workflowResults.workflows.length})</h3>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {workflowResults.workflows.map((workflow, index) => (
              <div key={workflow.id} className={styles.opportunityCard}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  {getCategoryIcon(workflow.category)}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.25rem' }}>
                        {workflow.name}
                      </h4>
                      <span className={`badge ${getStatusBadge(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                    
                    <p style={{ margin: '0 0 1rem 0', lineHeight: 'var(--line-height)' }}>
                      {workflow.description}
                    </p>
                    
                    <div style={{ 
                      padding: '0.75rem', 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderRadius: 'var(--border-radius)',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}>
                      <strong>Business Objective:</strong> {workflow.businessObjective}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-green)' }}>
                          <DollarSign size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          ROI Analysis
                        </h5>
                        <div style={{ fontSize: '0.9rem' }}>
                          <div>Annual Savings: {formatCurrency(workflow.roiMetrics?.estimatedCostSavings?.annual || 100000)}</div>
                          <div>Payback: {workflow.roiMetrics?.paybackPeriod || '6-12 months'}</div>
                          <div style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                            3-Year ROI: {workflow.roiMetrics?.roi3Year || 350}%
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-blue)' }}>
                          <Target size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          Implementation
                        </h5>
                        <div style={{ fontSize: '0.9rem' }}>
                          <div>Time to Value: {workflow.timeToValue || '3-6 months'}</div>
                          <div>Complexity: {workflow.complexityScore || 5}/10</div>
                          <div>Risk Level: {workflow.riskAssessment?.overallRiskLevel || 'Medium'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenticWorkflowsTab; 