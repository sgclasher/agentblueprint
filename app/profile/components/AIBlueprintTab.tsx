'use client';

import React, { useState, useEffect, FC } from 'react';
import { Profile, AgenticBlueprint } from '../../services/types';
import BlueprintExecutiveSummary from './BlueprintExecutiveSummary';
import { 
  Users, 
  Target, 
  Workflow, 
  Shield, 
  TrendingUp, 
  RefreshCw, 
  Clock, 
  CheckCircle,
  Brain,
  AlertTriangle,
  User,
  Settings,
  Zap
} from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

interface AIBlueprintTabProps {
  profile: Profile;
  isEditing: boolean;
  blueprintContext?: {
    opportunity?: any;
    initiativeIndex?: number;
    initiativeSpecialInstructions?: string;
  } | null;
  onClearContext?: () => void;
}

const AIBlueprintTab: FC<AIBlueprintTabProps> = ({ profile, isEditing, blueprintContext, onClearContext }) => {
  const [blueprint, setBlueprint] = useState<AgenticBlueprint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<string>('auto');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [hasProcessedContext, setHasProcessedContext] = useState<string | null>(null);

  // Reset initiative selection and special instructions when profile changes
  useEffect(() => {
    setSelectedInitiative('auto');
    setSpecialInstructions('');
  }, [profile?.id]);

  // Debug blueprint state changes
  useEffect(() => {
    console.log('[AIBlueprint] Blueprint state changed:', {
      hasBlueprint: !!blueprint,
      businessObjective: blueprint?.businessObjective?.slice(0, 50) + '...',
      digitalTeamSize: blueprint?.digitalTeam?.length
    });
  }, [blueprint]);

  // Handle blueprint context from AI Opportunities navigation and auto-generate
  useEffect(() => {
    if (blueprintContext && blueprintContext.opportunity && !isLoading) {
      const contextId = `${blueprintContext.opportunity.title}-${blueprintContext.initiativeIndex || 'auto'}`;
      
      // Prevent processing the same context twice
      if (hasProcessedContext === contextId) {
        return;
      }
      
      console.log('[AIBlueprint] 🎯 Processing new opportunity context:', blueprintContext.opportunity.title);
      
      // Set the initiative if provided
      if (blueprintContext.initiativeIndex !== undefined) {
        setSelectedInitiative(blueprintContext.initiativeIndex.toString());
      }
      
      // Set special instructions from opportunity context
      if (blueprintContext.initiativeSpecialInstructions) {
        setSpecialInstructions(blueprintContext.initiativeSpecialInstructions);
      }
      
      // Mark this context as processed
      setHasProcessedContext(contextId);
      
      // Force regenerate with opportunity context (not cached)
      setTimeout(() => {
        console.log('[AIBlueprint] Force generating with opportunity context...');
        generateBlueprint(true); // Force regenerate
      }, 200);
      
      // Clear context after processing
      setTimeout(() => {
        if (onClearContext) {
          onClearContext();
        }
      }, 1000);
    }
  }, [blueprintContext, isLoading]);

  // Auto-load cached blueprint on component mount (but not if we have opportunity context)
  useEffect(() => {
    if (!hasAttemptedLoad && !isLoading && profile?.id && !blueprintContext) {
      console.log('[AIBlueprint] Auto-loading cached blueprint for profile:', profile.id);
      loadCachedBlueprint();
    }
  }, [hasAttemptedLoad, isLoading, profile?.id, blueprintContext]);

  // Load cached blueprint from server
  const loadCachedBlueprint = async () => {
    if (hasAttemptedLoad) return;
    
    try {
      setIsLoading(true);
      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch('/api/profiles/generate-blueprint', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.hasBlueprint) {
          setBlueprint(result.blueprint);
          setIsCached(result.cached);
        }
      }
      setHasAttemptedLoad(true);
    } catch (error) {
      console.error('Failed to load cached blueprint:', error);
      setHasAttemptedLoad(true);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBlueprint = async (forceRegenerate = false) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[AIBlueprint] Generating blueprint...');
      
      // Validate profile before making API call
      if (!profile) {
        throw new Error('Profile not found. Please create your profile first.');
      }

      if (!profile.id || !profile.companyName) {
        throw new Error('Profile is incomplete. Please ensure your profile has required information.');
      }

      const { supabase } = await import('../../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required. Please sign in.');
      }

      console.log('[AIBlueprint] Making API call to generate blueprint...');
      
      // Prepare request body with optional initiative selection and special instructions
      const requestBody: any = { forceRegenerate };
      
      if (selectedInitiative !== 'auto') {
        requestBody.selectedInitiativeIndex = parseInt(selectedInitiative);
      }
      
      if (specialInstructions.trim()) {
        requestBody.specialInstructions = specialInstructions.trim();
      }
      
      const response = await fetch('/api/profiles/generate-blueprint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        credentials: 'same-origin'
      });

      console.log('[AIBlueprint] API response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('[AIBlueprint] API error:', errorData);
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('[AIBlueprint] API result:', { success: result.success, hasBlueprint: !!result.blueprint, cached: result.cached });

      if (!result.success) {
        throw new Error(result.error || 'Blueprint generation failed');
      }

      console.log('[AIBlueprint] Setting blueprint in state...');
      setBlueprint(result.blueprint);
      setIsCached(result.cached);
      setHasAttemptedLoad(true);
      
      console.log('[AIBlueprint] Blueprint generation completed successfully');
      console.log('[AIBlueprint] Blueprint state now has:', result.blueprint ? 'blueprint data' : 'no blueprint');

    } catch (error: any) {
      console.error('[AIBlueprint] Blueprint generation failed:', error);
      setError(error.message || 'Failed to generate blueprint');
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentIcon = (role: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'coordinator': <Users size={24} className="text-purple-500" />,
      'researcher': <Brain size={24} className="text-blue-500" />,
      'analyst': <Settings size={24} className="text-green-500" />,
      'quality-checker': <Shield size={24} className="text-orange-500" />,
      'actuator': <Zap size={24} className="text-red-500" />
    };
    return icons[role] || <User size={24} className="text-gray-500" />;
  };

  const getOversightBadge = (level: string) => {
    const colors: { [key: string]: string } = {
      'human-approval': 'bg-red-100 text-red-800',
      'policy-checked': 'bg-yellow-100 text-yellow-800',
      'full-autonomy': 'bg-green-100 text-green-800'
    };
    return colors[level] || colors['policy-checked'];
  };

  if (isEditing) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.editModeMessage}>
          <Workflow size={48} style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }} />
          <h4>Agent Digital Team Blueprint</h4>
          <p>Your Agent Digital Team Blueprint is automatically generated based on your strategic initiatives and business goals. This tab is not directly editable - instead, update your information in the Initiatives tab, then return here to generate your custom blueprint.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      {/* Header with Generation Button */}
      <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>
                <Workflow size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Agent Digital Team Blueprint
              </h3>
              
              {/* Opportunity Context Indicator */}
              {blueprintContext?.opportunity && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: isLoading ? 'rgba(34, 197, 94, 0.1)' : 'rgba(124, 58, 237, 0.1)',
                  border: isLoading ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(124, 58, 237, 0.2)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.875rem'
                }}>
                  {isLoading ? (
                    <RefreshCw size={16} className="animate-spin" style={{ color: 'var(--accent-green)' }} />
                  ) : (
                    <Zap size={16} style={{ color: 'var(--accent-purple)' }} />
                  )}
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {isLoading ? 'Generating blueprint from' : 'From Opportunity'}: {blueprintContext.opportunity.title}
                  </span>
                  {onClearContext && !isLoading && (
                    <button 
                      onClick={onClearContext}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '2px',
                        fontSize: '0.75rem'
                      }}
                      title="Clear opportunity context"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Strategic Initiative Selector */}
            <div style={{ marginBottom: '1rem' }}>
              <label 
                htmlFor="initiative-selector" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'var(--font-weight-medium)', 
                  color: 'var(--text-muted)', 
                  marginBottom: '0.5rem' 
                }}
              >
                Strategic Initiative Focus:
              </label>
              <select 
                id="initiative-selector"
                aria-label="Select Strategic Initiative"
                value={selectedInitiative} 
                onChange={(e) => setSelectedInitiative(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  minWidth: '240px'
                }}
                disabled={isLoading}
              >
                <option value="auto">
                  Auto ({profile?.strategicInitiatives?.filter(i => i.priority === 'High').length ? 'All High Priority' : 'All Initiatives'})
                </option>
                {profile?.strategicInitiatives?.map((initiative, index) => (
                  <option key={index} value={index.toString()}>
                    {initiative.initiative} ({initiative.priority})
                  </option>
                ))}
              </select>
              
              {/* Initiative Context Indicator */}
              {selectedInitiative !== 'auto' && profile?.strategicInitiatives && (
                <div style={{ 
                  marginTop: '0.5rem', 
                  padding: '0.5rem 0.75rem', 
                  backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: 'var(--border-radius)', 
                  fontSize: '0.8rem',
                  color: 'var(--accent-blue)'
                }}>
                  <Target size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  Blueprint will focus on: <strong>{profile.strategicInitiatives[parseInt(selectedInitiative)]?.initiative}</strong>
                </div>
              )}
            </div>

            {/* Special Instructions Field */}
            <div style={{ marginBottom: '1rem' }}>
              <label 
                htmlFor="special-instructions" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'var(--font-weight-medium)', 
                  color: 'var(--text-muted)', 
                  marginBottom: '0.5rem' 
                }}
              >
                Special Instructions (Optional):
              </label>
              <textarea 
                id="special-instructions"
                aria-label="Special Instructions for Blueprint Generation"
                placeholder="Add any specific requirements, constraints, or focus areas for your AI blueprint. For example: 'Focus on HIPAA compliance requirements' or 'Prioritize integration with Salesforce CRM' or 'Consider remote team collaboration needs'..."
                value={specialInstructions} 
                onChange={(e) => setSpecialInstructions(e.target.value)}
                maxLength={500}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                disabled={isLoading}
              />
              <div style={{ 
                marginTop: '0.25rem', 
                fontSize: '0.75rem', 
                color: 'var(--text-muted)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Help AI tailor the blueprint to your specific needs and industry requirements</span>
                <span style={{ color: specialInstructions.length > 450 ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                  {specialInstructions.length}/500
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {blueprint && (
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {isCached ? (
                  <span style={{ color: 'var(--accent-blue)' }}>
                    <Clock size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    Cached ({new Date(blueprint.createdAt).toLocaleDateString()})
                  </span>
                ) : (
                  <span style={{ color: 'var(--accent-green)' }}>
                    <CheckCircle size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    Fresh Blueprint
                  </span>
                )}
              </div>
            )}
            {!blueprint && !hasAttemptedLoad && (
              <button 
                className="btn btn-secondary"
                onClick={loadCachedBlueprint}
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
              onClick={() => generateBlueprint(blueprint ? true : false)}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" style={{ marginRight: '0.5rem' }} />
              ) : (
                <Workflow size={18} style={{ marginRight: '0.5rem' }} />
              )}
              {isLoading ? 'Generating...' : blueprint ? 'Refresh Blueprint' : 'Generate Blueprint'}
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

        {!blueprint && !isLoading && (
          <div style={{ margin: 0, color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>
              Transform your business goals into a clear, actionable AI &ldquo;digital team&rdquo; blueprint. See exactly what each AI agent will do, how humans stay in control, and which KPIs will improve.
            </p>
            {blueprintContext?.opportunity ? (
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Your blueprint will be automatically generated based on the selected opportunity. No additional action needed!
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Click &ldquo;Generate Blueprint&rdquo; to create{hasAttemptedLoad ? ' a' : ' your first'} AI digital team strategy.
              </p>
            )}
          </div>
        )}

        {isLoading && blueprintContext?.opportunity && (
          <div style={{ 
            margin: 0, 
            color: 'var(--text-muted)', 
            textAlign: 'center',
            padding: '2rem',
            background: 'rgba(34, 197, 94, 0.05)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid rgba(34, 197, 94, 0.1)'
          }}>
            <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--accent-green)', marginBottom: '1rem' }} />
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
              Generating Your AI Blueprint
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Creating a custom blueprint for "{blueprintContext.opportunity.title}" using {blueprintContext.opportunity.agenticPattern?.recommendedPattern || 'optimized'} patterns...
            </p>
          </div>
        )}
      </div>

      {/* Blueprint Results */}
      {blueprint && (
        <>
          {/* Business Objective */}
          <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
            <h3>
              <Target size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Business Objective
            </h3>
            <p style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: 'var(--accent-blue)', 
              margin: 0,
              lineHeight: 'var(--line-height)'
            }}>
              {blueprint.businessObjective}
            </p>
          </div>

          {/* ROI Executive Summary */}
          {blueprint.roiProjection && (
            <BlueprintExecutiveSummary roiProjection={blueprint.roiProjection} />
          )}

          {/* Digital Team */}
          <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
            <h3>
              <Users size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Your AI Digital Team ({blueprint.digitalTeam.length} Specialist Agents)
            </h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {blueprint.digitalTeam.map((agent, index) => (
                <div key={index} className={styles.opportunityCard}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    {getAgentIcon(agent.role)}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                        {agent.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: 'var(--border-radius)', 
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: 'var(--accent-blue)',
                          textTransform: 'capitalize'
                        }}>
                          {agent.role.replace('-', ' ')}
                        </span>
                        <span className={`badge ${getOversightBadge(agent.oversightLevel)}`}>
                          {agent.oversightLevel.replace('-', ' ')}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 1rem 0', lineHeight: 'var(--line-height)' }}>
                        {agent.coreJob}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-green)' }}>
                        <Zap size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                        Tools & Systems
                      </h5>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {agent.toolsUsed.map((tool, i) => (
                          <li key={i} style={{ marginBottom: '0.25rem' }}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--accent-blue)' }}>
                        <Shield size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                        Human Oversight
                      </h5>
                      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 'var(--line-height)' }}>
                        {agent.oversightDescription}
                      </p>
                    </div>
                  </div>

                  {agent.linkedKPIs && agent.linkedKPIs.length > 0 && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Linked KPIs:</strong>
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {agent.linkedKPIs.map((kpi, i) => (
                          <span key={i} style={{ 
                            padding: '0.25rem 0.5rem', 
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: 'var(--border-radius)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)'
                          }}>
                            {kpi}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIBlueprintTab;
