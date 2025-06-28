'use client';

import React, { useState, useEffect, FC } from 'react';
import { Profile } from '../../services/types';
import { Brain, Zap, RefreshCw, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Settings, Network, Users, Share2, GitBranch, Target, Workflow } from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';
import InlineBlueprintCard from './InlineBlueprintCard';
import InlineBlueprintComparison from './InlineBlueprintComparison';

interface AIOpportunitiesTabProps {
  profile: Profile;
  isEditing: boolean;
  onNavigateToBlueprint?: (opportunity: AIOpportunity, initiativeIndex?: number) => void;
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
  agenticPattern?: {
    recommendedPattern: string;
    patternRationale: string;
    implementationApproach: string;
    patternComplexity: 'Low' | 'Medium' | 'High';
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

// 🆕 PHASE 1.2: Inline Blueprint State Interface
interface InlineBlueprintState {
  opportunityKey: string;          // `${opportunity.title}-${index}`
  opportunity: AIOpportunity;
  blueprint: any | null;           // AgenticBlueprint from types.ts
  isGenerating: boolean;
  generationProgress: number;      // 0-100
  error: string | null;
  generatedAt: string | null;
  isExpanded: boolean;
  metadata: {
    promptVersion: string;
    aiProvider: string;
    generationDuration?: number;
  };
}

const AIOpportunitiesTab: FC<AIOpportunitiesTabProps> = ({ profile, isEditing, onNavigateToBlueprint }) => {
  // Existing state management
  const [opportunities, setOpportunities] = useState<AIOpportunitiesAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [preferredProvider, setPreferredProvider] = useState<string>('');
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 🆕 PHASE 1.2: Inline Blueprint State Management (builds on existing patterns)
  const [inlineBlueprints, setInlineBlueprints] = useState<Map<string, InlineBlueprintState>>(new Map());
  const [comparisonSelection, setComparisonSelection] = useState<Set<string>>(new Set());

  // Auto-load cached opportunities on component mount (fixes UX issue)
  useEffect(() => {
    if (!hasAttemptedLoad && !isLoading) {
      loadCachedOpportunities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Clear any previous errors and set loading states
    setError(null);
    setIsLoading(true);
    if (forceRegenerate || (opportunities && !forceRegenerate)) {
      setIsRefreshing(true);
    }

    try {
      // Validate profile before making API call
      if (!profile) {
        throw new Error('Profile not found. Please create your profile first.');
      }

      if (!profile.id || !profile.companyName) {
        throw new Error('Profile is incomplete. Please ensure your profile has required information (company name, industry, etc.).');
      }

      console.log('🔄 [AI Opportunities] Starting analysis generation...', { 
        forceRegenerate, 
        hasExistingOpportunities: !!opportunities,
        preferredProvider: preferredProvider || 'auto'
      });

      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required. Please sign in.');
      }

      const requestBody = {
        preferredProvider: preferredProvider || undefined,
        forceRegenerate
      };

      console.log('🚀 [AI Opportunities] Making API request:', requestBody);

      const response = await fetch('/api/profiles/analyze-opportunities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        credentials: 'same-origin'
      });

      console.log('📡 [AI Opportunities] API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ [AI Opportunities] API error:', errorData);
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ [AI Opportunities] API response received:', { 
        success: result.success, 
        cached: result.cached,
        provider: result.provider,
        opportunityCount: result.opportunities?.opportunities?.length || 0
      });

      if (!result.success) {
        throw new Error(result.error || 'Analysis generation failed');
      }

      // Update state with new data
      setOpportunities(result.opportunities);
      setIsCached(result.cached);
      setHasAttemptedLoad(true);
      
      // Track refresh time for user feedback
      if (forceRegenerate || !result.cached) {
        setLastRefreshTime(new Date().toLocaleTimeString());
      }

      console.log('🎉 [AI Opportunities] Analysis updated successfully');

    } catch (error: any) {
      console.error('💥 [AI Opportunities] Analysis generation failed:', error);
      setError(error.message || 'Failed to generate analysis');
      
      // More detailed error messages for better UX
      if (error.message?.includes('Authentication')) {
        setError('Authentication expired. Please refresh the page and sign in again.');
      } else if (error.message?.includes('Profile not found')) {
        setError('Profile not found. Please complete your profile setup first.');
      } else if (error.message?.includes('rate limit')) {
        setError('Too many requests. Please wait a moment and try again.');
      } else if (error.message?.includes('No AI provider')) {
        setError('No AI provider configured. Please configure an AI provider in admin settings.');
      } else {
        setError(error.message || 'Analysis generation failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
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

  const getAgenticPatternIcon = (pattern: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Tool-Use': <Settings size={16} className="text-blue-500" />,
      'ReAct': <Brain size={16} className="text-green-500" />,
      'Self-Reflection': <CheckCircle size={16} className="text-purple-500" />,
      'Plan-and-Execute': <Target size={16} className="text-orange-500" />,
      'Plan-Act-Reflect': <GitBranch size={16} className="text-indigo-500" />,
      'Hierarchical-Planning': <Network size={16} className="text-red-500" />,
      'Manager-Workers': <Users size={16} className="text-blue-600" />,
      'Hierarchical-Hub-Spoke': <Share2 size={16} className="text-green-600" />,
      'Blackboard-Shared-Memory': <Workflow size={16} className="text-purple-600" />,
      'Market-Based-Auction': <TrendingUp size={16} className="text-orange-600" />,
      'Decentralized-Swarm': <Network size={16} className="text-pink-500" />
    };
    return icons[pattern] || <Brain size={16} className="text-gray-500" />;
  };

  // 🆕 PHASE 2.2: Inline Blueprint Generation Logic (builds on existing patterns)
  const generateInlineBlueprint = async (opportunity: AIOpportunity, opportunityIndex: number) => {
    const opportunityKey = `${opportunity.title}-${opportunityIndex}`;
    const startTime = Date.now();
    
    // Import AgenticBlueprintService for logging
    const { AgenticBlueprintService } = await import('../../services/agenticBlueprintService');
    
    // Use existing logging pattern from the service
    AgenticBlueprintService.logInlineGeneration('GENERATION_START', opportunity, { opportunityIndex });
    
    // Initialize inline state
    setInlineBlueprints(prev => new Map(prev).set(opportunityKey, {
      opportunityKey,
      opportunity,
      blueprint: null,
      isGenerating: true,
      generationProgress: 0,
      error: null,
      generatedAt: null,
      isExpanded: false,
      metadata: {
        promptVersion: '3.1',
        aiProvider: 'auto'
      }
    }));
    
    try {
      // Progress simulation (future: real WebSocket/SSE)
      const progressSteps = [
        { progress: 20, phase: 'Analyzing opportunity context' },
        { progress: 40, phase: 'Selecting agentic pattern' },
        { progress: 60, phase: 'Generating specialized agents' },
        { progress: 80, phase: 'Calculating ROI projections' },
        { progress: 100, phase: 'Finalizing blueprint' }
      ];
      
      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setInlineBlueprints(prev => {
          const current = prev.get(opportunityKey);
          return current ? new Map(prev).set(opportunityKey, {
            ...current,
            generationProgress: step.progress
          }) : prev;
        });
        
        AgenticBlueprintService.logInlineBlueprintProgress('PROGRESS_UPDATE', step);
      }
      
      // Get authentication
      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required. Please sign in.');
      }
      
      // Call existing API with inline mode
      const response = await fetch('/api/profiles/generate-blueprint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          opportunityContext: {
            ...opportunity,
            opportunityIndex
          },
          inlineMode: true,
          forceRegenerate: true,
          specialInstructions: `Focus exclusively on implementing the "${opportunity.title}" opportunity using the ${opportunity.agenticPattern?.recommendedPattern} pattern.`
        }),
        credentials: 'same-origin'
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Blueprint generation failed');
      }
      
      // Update state with generated blueprint
      setInlineBlueprints(prev => new Map(prev).set(opportunityKey, {
        opportunityKey,
        opportunity,
        blueprint: result.blueprint,
        isGenerating: false,
        generationProgress: 100,
        error: null,
        generatedAt: new Date().toISOString(),
        isExpanded: true, // Auto-expand on success
        metadata: {
          promptVersion: result.blueprint.promptVersion || '3.1',
          aiProvider: result.provider,
          generationDuration: Date.now() - startTime
        }
      }));
      
      AgenticBlueprintService.logInlineGeneration('GENERATION_SUCCESS', opportunity, {
        blueprintId: result.blueprint.id,
        provider: result.provider
      });
      
    } catch (error: any) {
      AgenticBlueprintService.logInlineBlueprintError('GENERATION_ERROR', error, opportunity, { 
        opportunityIndex,
        duration: Date.now() - startTime
      });
      
      setInlineBlueprints(prev => new Map(prev).set(opportunityKey, {
        opportunityKey,
        opportunity,
        blueprint: null,
        isGenerating: false,
        generationProgress: 0,
        error: error.message,
        generatedAt: null,
        isExpanded: false,
        metadata: {
          promptVersion: '3.1',
          aiProvider: 'error'
        }
      }));
    }
  };

  const findRelevantInitiativeIndex = (opportunity: AIOpportunity): number | undefined => {
    if (!profile.strategicInitiatives || !opportunity.relevantInitiatives || !opportunity.relevantInitiatives.length) {
      return undefined;
    }

    // Find the first strategic initiative that matches any of the opportunity's relevant initiatives
    const initiativeIndex = profile.strategicInitiatives.findIndex(initiative =>
      opportunity.relevantInitiatives.some(relevantName =>
        initiative.initiative.toLowerCase().includes(relevantName.toLowerCase()) ||
        relevantName.toLowerCase().includes(initiative.initiative.toLowerCase())
      )
    );

    return initiativeIndex >= 0 ? initiativeIndex : undefined;
  };

  // 🆕 PHASE 3.3: Inline Blueprint Management Functions
  const handleToggleComparison = (opportunityKey: string) => {
    setComparisonSelection(prev => {
      const newSet = new Set(prev);
      if (newSet.has(opportunityKey)) {
        newSet.delete(opportunityKey);
      } else {
        newSet.add(opportunityKey);
      }
      return newSet;
    });
  };

  const handleToggleExpansion = (opportunityKey: string) => {
    setInlineBlueprints(prev => {
      const current = prev.get(opportunityKey);
      if (!current) return prev;
      
      return new Map(prev).set(opportunityKey, {
        ...current,
        isExpanded: !current.isExpanded
      });
    });
  };

  const selectedBlueprintsForComparison = Array.from(comparisonSelection)
    .map(key => inlineBlueprints.get(key))
    .filter(state => state?.blueprint) as InlineBlueprintState[];

  const handleGenerateBlueprint = (opportunity: AIOpportunity) => {
    if (!onNavigateToBlueprint) return;
    
    const initiativeIndex = findRelevantInitiativeIndex(opportunity);
    onNavigateToBlueprint(opportunity, initiativeIndex);
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
                    {lastRefreshTime && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
                        (Updated at {lastRefreshTime})
                      </span>
                    )}
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
              onClick={() => generateAnalysis(!!opportunities)}
              disabled={isLoading}
              style={{ position: 'relative' }}
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" style={{ marginRight: '0.5rem' }} />
              ) : (
                <Brain size={18} style={{ marginRight: '0.5rem' }} />
              )}
              {isLoading ? (
                isRefreshing ? 'Refreshing Analysis...' : 'Analyzing...'
              ) : (
                opportunities ? '🔄 Refresh Analysis' : '🤖 Generate Analysis'
              )}
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
              Generate an AI-powered analysis of business opportunities tailored to your company&apos;s strategic initiatives and technology infrastructure.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              💡 {hasAttemptedLoad ? 'No cached analysis found. ' : ''}Click &quot;Generate Analysis&quot; to create{hasAttemptedLoad ? ' a' : ' your first'} AI-powered assessment.
            </p>
          </div>
        )}
      </div>

      {/* 🆕 PHASE 3.3: Blueprint Comparison Panel - Sticky Position */}
      <InlineBlueprintComparison 
        selectedBlueprints={selectedBlueprintsForComparison}
        onClearSelection={() => setComparisonSelection(new Set())}
      />

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

          {/* Opportunities Grid with Inline Blueprints */}
          <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
            <h3>AI Opportunities with Inline Blueprints ({opportunities.opportunities.length})</h3>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {opportunities.opportunities.map((opportunity, index) => {
                const opportunityKey = `${opportunity.title}-${index}`;
                const blueprintState = inlineBlueprints.get(opportunityKey);
                
                return (
                <div key={index} style={{ 
                  display: 'grid', 
                  gap: '1rem',
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-primary)'
                }}>
                  {/* Original Opportunity Card */}
                  <div className={styles.opportunityCard}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    {getCategoryIcon(opportunity.category)}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1.25rem', flex: 1 }}>
                          {typeof opportunity.title === 'string' ? opportunity.title : 'Untitled Opportunity'}
                        </h4>
                        {onNavigateToBlueprint && (
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleGenerateBlueprint(opportunity)}
                            style={{ 
                              fontSize: '0.875rem', 
                              padding: '0.5rem 1rem',
                              marginLeft: '1rem',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <Zap size={16} style={{ marginRight: '0.5rem' }} />
                            Generate Blueprint
                          </button>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: 'var(--border-radius)', 
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: 'var(--accent-blue)'
                        }}>
                          {typeof opportunity.category === 'string' ? opportunity.category : 'Unknown Category'}
                        </span>
                        <span className={`badge ${getConfidenceBadge(typeof opportunity.businessImpact.confidenceLevel === 'string' ? opportunity.businessImpact.confidenceLevel : 'Medium')}`}>
                          {typeof opportunity.businessImpact.confidenceLevel === 'string' ? opportunity.businessImpact.confidenceLevel : 'Medium'} Confidence
                        </span>
                        <span className={`badge ${getComplexityBadge(typeof opportunity.implementation.complexity === 'string' ? opportunity.implementation.complexity : 'Medium')}`}>
                          {typeof opportunity.implementation.complexity === 'string' ? opportunity.implementation.complexity : 'Medium'} Complexity
                        </span>
                        {opportunity.relevantInitiatives && opportunity.relevantInitiatives.length > 0 && (
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: 'var(--border-radius)', 
                            fontSize: '0.75rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: 'var(--accent-green)'
                          }}>
                            📋 {opportunity.relevantInitiatives.length} Initiative{opportunity.relevantInitiatives.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0 0 1rem 0', lineHeight: 'var(--line-height)' }}>
                        {typeof opportunity.description === 'string' ? opportunity.description : 'Description not available'}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: opportunity.agenticPattern ? '1fr 1fr 1fr' : '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-green)' }}>
                        <DollarSign size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                        Business Impact
                      </h5>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {opportunity.businessImpact.primaryMetrics && Array.isArray(opportunity.businessImpact.primaryMetrics) ? (
                          opportunity.businessImpact.primaryMetrics.map((metric, i) => (
                            <li key={i} style={{ marginBottom: '0.25rem' }}>{metric}</li>
                          ))
                        ) : (
                          <li style={{ marginBottom: '0.25rem' }}>Primary metrics not available</li>
                        )}
                      </ul>
                      <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <strong>ROI:</strong> {typeof opportunity.businessImpact.estimatedROI === 'string' ? opportunity.businessImpact.estimatedROI : 'Not available'}<br/>
                        <strong>Time to Value:</strong> {typeof opportunity.businessImpact.timeToValue === 'string' ? opportunity.businessImpact.timeToValue : 'Not available'}
                      </div>
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-blue)' }}>
                        <Settings size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                        Implementation
                      </h5>
                      <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                        <strong>Timeframe:</strong> {typeof opportunity.implementation.timeframe === 'string' ? opportunity.implementation.timeframe : 'Not specified'}
                      </div>
                      {opportunity.implementation.prerequisites && opportunity.implementation.prerequisites.length > 0 && (
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
                    {opportunity.agenticPattern ? (
                      <div>
                        <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-purple)' }}>
                          {getAgenticPatternIcon(opportunity.agenticPattern.recommendedPattern)}
                          <span style={{ marginLeft: '0.25rem' }}>Agentic Pattern</span>
                        </h5>
                        <div style={{ 
                          padding: '0.5rem', 
                          backgroundColor: 'rgba(124, 58, 237, 0.1)', 
                          borderRadius: 'var(--border-radius)',
                          marginBottom: '0.75rem'
                        }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                            {typeof opportunity.agenticPattern.recommendedPattern === 'string' ? opportunity.agenticPattern.recommendedPattern : 'Pattern not available'}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {typeof opportunity.agenticPattern.patternRationale === 'string' ? opportunity.agenticPattern.patternRationale : 'Rationale not available'}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>
                          <strong>Complexity:</strong>
                          <span className={`badge ${getComplexityBadge(typeof opportunity.agenticPattern.patternComplexity === 'string' ? opportunity.agenticPattern.patternComplexity : 'Medium')}`} style={{ marginLeft: '0.5rem' }}>
                            {typeof opportunity.agenticPattern.patternComplexity === 'string' ? opportunity.agenticPattern.patternComplexity : 'Medium'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--text-muted)' }}>
                          <Brain size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          Legacy Analysis
                        </h5>
                        <div style={{ 
                          padding: '0.5rem', 
                          backgroundColor: 'rgba(156, 163, 175, 0.1)', 
                          borderRadius: 'var(--border-radius)',
                          marginBottom: '0.75rem'
                        }}>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Refresh analysis to see agentic pattern recommendations
                          </div>
                        </div>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => generateAnalysis(true)}
                          style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                        >
                          <RefreshCw size={14} style={{ marginRight: '0.25rem' }} />
                          Update Analysis
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Agentic Implementation Approach */}
                  {opportunity.agenticPattern && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <Network size={16} style={{ marginRight: '0.5rem', color: 'var(--accent-purple)' }} />
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Implementation Approach:</strong>
                      </div>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.9rem', 
                        lineHeight: '1.4',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        paddingLeft: '1.5rem'
                      }}>
                        {typeof opportunity.agenticPattern.implementationApproach === 'string' ? opportunity.agenticPattern.implementationApproach : 'Implementation approach not available'}
                      </p>
                    </div>
                  )}

                  {opportunity.aiTechnologies && opportunity.aiTechnologies.length > 0 && (
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
                
                {/* 🆕 PHASE 3.3: Inline Blueprint Section */}
                <div style={{ 
                  borderTop: '2px solid var(--border-primary)',
                  paddingTop: '1rem'
                }}>
                  {!blueprintState ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                      <button 
                        className="btn btn-primary"
                        onClick={() => generateInlineBlueprint(opportunity, index)}
                        style={{ 
                          fontSize: '1rem',
                          padding: '1rem 1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          margin: '0 auto',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Zap size={20} />
                          Generate AI Digital Team Blueprint
                        </div>
                        {opportunity.agenticPattern?.recommendedPattern && (
                          <span style={{ 
                            fontSize: '0.85rem',
                            opacity: 0.9,
                            fontStyle: 'italic'
                          }}>
                            Using {opportunity.agenticPattern.recommendedPattern} pattern
                          </span>
                        )}
                      </button>
                    </div>
                  ) : (
                    <InlineBlueprintCard 
                      blueprintState={blueprintState}
                      onToggleExpansion={() => handleToggleExpansion(opportunityKey)}
                      onToggleComparison={() => handleToggleComparison(opportunityKey)}
                      isSelectedForComparison={comparisonSelection.has(opportunityKey)}
                    />
                  )}
                </div>
              </div>
                );
              })}
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