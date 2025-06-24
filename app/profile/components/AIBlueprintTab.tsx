'use client';

import React, { useState, useEffect, FC } from 'react';
import { Profile, AgenticBlueprint } from '../../services/types';
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
}

const AIBlueprintTab: FC<AIBlueprintTabProps> = ({ profile, isEditing }) => {
  const [blueprint, setBlueprint] = useState<AgenticBlueprint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

  // Auto-load cached blueprint on component mount
  useEffect(() => {
    if (!hasAttemptedLoad && !isLoading) {
      loadCachedBlueprint();
    }
  }, [hasAttemptedLoad, isLoading]);

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
      console.log('[AIBlueprint] Starting blueprint generation, forceRegenerate:', forceRegenerate);
      
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
      const response = await fetch('/api/profiles/generate-blueprint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          forceRegenerate
        }),
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
          <h4>AI Digital Team Blueprint</h4>
          <p>Your AI Digital Team Blueprint is automatically generated based on your strategic initiatives and business goals. This tab is not directly editable - instead, update your information in the Analysis tab, then return here to generate your custom blueprint.</p>
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
            AI Digital Team Blueprint
          </h3>
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
              Transform your business goals into a clear, actionable AI "digital team" blueprint. See exactly what each AI agent will do, how humans stay in control, and which KPIs will improve.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Click "Generate Blueprint" to create{hasAttemptedLoad ? ' a' : ' your first'} AI digital team strategy.
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

          {/* Digital Team */}
          <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
            <h3>
              <Users size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Your AI Digital Team ({blueprint.digitalTeam.length} Specialists)
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
