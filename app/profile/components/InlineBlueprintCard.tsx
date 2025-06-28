'use client';

import React, { FC } from 'react';
import { RefreshCw, AlertTriangle, Zap, Users, TrendingUp, Clock, ChevronDown, Share2 } from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

// 🆕 PHASE 3.1: Inline Blueprint Card Component
// Leverages existing design patterns from ProfileDetail.module.css
interface InlineBlueprintCardProps {
  blueprintState: {
    opportunityKey: string;
    opportunity: any; // AIOpportunity type
    blueprint: any | null; // AgenticBlueprint type
    isGenerating: boolean;
    generationProgress: number;
    error: string | null;
    generatedAt: string | null;
    isExpanded: boolean;
    metadata: {
      promptVersion: string;
      aiProvider: string;
      generationDuration?: number;
    };
  };
  onToggleExpansion: () => void;
  onToggleComparison: () => void;
  isSelectedForComparison: boolean;
}

const InlineBlueprintCard: FC<InlineBlueprintCardProps> = ({
  blueprintState,
  onToggleExpansion,
  onToggleComparison,
  isSelectedForComparison
}) => {
  const { opportunity, blueprint, isGenerating, generationProgress, error, isExpanded } = blueprintState;
  
  // Loading State - Blueprint Generation in Progress
  if (isGenerating) {
    return (
      <div className={styles.analysisCard} style={{ 
        marginTop: '1rem',
        borderLeft: '4px solid var(--accent-blue)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1rem',
          gap: '0.75rem'
        }}>
          <RefreshCw size={20} className="animate-spin text-blue-500" />
          <span style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold',
            color: 'var(--text-primary)'
          }}>
            Generating specialized AI team for &quot;{opportunity.title}&quot;...
          </span>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                width: `${generationProgress}%`,
                height: '100%',
                backgroundColor: 'var(--accent-blue)',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}>
            <span>{generationProgress}% complete</span>
            <span>Estimated: {Math.max(1, 3 - Math.floor(generationProgress / 33))} min remaining</span>
          </div>
        </div>
        
        {/* Generation Steps */}
        <div style={{ 
          display: 'grid', 
          gap: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: generationProgress >= 20 ? 'var(--accent-green)' : 'var(--text-muted)'
          }}>
            {generationProgress >= 20 ? '✓' : '⟳'} Analyzing opportunity context
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: generationProgress >= 40 ? 'var(--accent-green)' : 'var(--text-muted)'
          }}>
            {generationProgress >= 40 ? '✓' : '⧖'} Selecting agentic pattern
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: generationProgress >= 60 ? 'var(--accent-green)' : 'var(--text-muted)'
          }}>
            {generationProgress >= 60 ? '✓' : '⧖'} Generating specialized agents
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: generationProgress >= 80 ? 'var(--accent-green)' : 'var(--text-muted)'
          }}>
            {generationProgress >= 80 ? '✓' : '⧖'} Calculating ROI projections
          </div>
        </div>
      </div>
    );
  }
  
  // Error State - Blueprint Generation Failed
  if (error) {
    return (
      <div className={styles.analysisCard} style={{ 
        marginTop: '1rem',
        borderLeft: '4px solid var(--accent-red)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <AlertTriangle size={20} className="text-red-500" />
          <span style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold',
            color: 'var(--text-primary)'
          }}>
            Blueprint generation failed
          </span>
        </div>
        <p style={{ 
          margin: '0 0 1rem 0', 
          color: 'var(--text-secondary)',
          lineHeight: 'var(--line-height)'
        }}>
          {error}
        </p>
        <button 
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
          style={{ fontSize: '0.875rem' }}
        >
          <RefreshCw size={16} style={{ marginRight: '0.5rem' }} />
          Try Again
        </button>
      </div>
    );
  }
  
  // No Blueprint State
  if (!blueprint) return null;
  
  // Success State - Blueprint Generated
  return (
    <div className={styles.analysisCard} style={{ 
      marginTop: '1rem',
      borderLeft: '4px solid var(--accent-green)'
    }}>
      {/* Blueprint Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Zap size={18} className="text-blue-500" />
            <span style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold',
              color: 'var(--text-primary)'
            }}>
              AI Digital Team Blueprint
            </span>
            {blueprint.selectedPattern && (
              <span style={{ 
                padding: '0.25rem 0.5rem',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: 'var(--accent-purple)',
                borderRadius: 'var(--border-radius)',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {blueprint.selectedPattern}
              </span>
            )}
          </div>
          
          {/* Generation Metadata */}
          <div style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)',
            display: 'flex',
            gap: '1rem'
          }}>
            <span>Provider: {blueprintState.metadata.aiProvider}</span>
            <span>Generated: {new Date(blueprintState.generatedAt!).toLocaleTimeString()}</span>
            {blueprintState.metadata.generationDuration && (
              <span>Duration: {Math.round(blueprintState.metadata.generationDuration / 1000)}s</span>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${isSelectedForComparison ? 'btn-primary' : 'btn-outline'}`}
            onClick={onToggleComparison}
            style={{ fontSize: '0.8rem', padding: '0.5rem' }}
          >
            <Share2 size={14} />
            {isSelectedForComparison ? 'Added' : 'Compare'}
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={onToggleExpansion}
            style={{ fontSize: '0.8rem', padding: '0.5rem' }}
          >
            {isExpanded ? 'Collapse' : 'Details'}
            <ChevronDown 
              size={14} 
              style={{ 
                marginLeft: '0.25rem',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} 
            />
          </button>
        </div>
      </div>
      
      {/* Blueprint Summary - Always Visible */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius)'
        }}>
          <Users size={16} className="text-blue-500" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {blueprint.digitalTeam?.length || 0}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Agents</div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius)'
        }}>
          <TrendingUp size={16} className="text-green-500" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {blueprint.roiProjection?.roiPercentage || 0}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ROI</div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius)'
        }}>
          <Clock size={16} className="text-orange-500" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {blueprint.agenticTimeline?.totalDurationWeeks || 0}w
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Timeline</div>
          </div>
        </div>
      </div>
      
      {/* Business Objective */}
      <div style={{ 
        padding: '1rem',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderRadius: 'var(--border-radius)',
        borderLeft: '3px solid var(--accent-blue)',
        marginBottom: isExpanded ? '1rem' : '0'
      }}>
        <div style={{ 
          fontSize: '0.875rem', 
          fontWeight: 'bold', 
          color: 'var(--accent-blue)',
          marginBottom: '0.5rem'
        }}>
          Business Objective:
        </div>
        <div style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-primary)',
          lineHeight: 'var(--line-height)'
        }}>
          {blueprint.businessObjective}
        </div>
      </div>
      
      {/* Expandable Details */}
      {isExpanded && (
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius)'
        }}>
          <div style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: 'var(--text-primary)'
          }}>
            📋 Full Blueprint Details
          </div>
          
          {/* This would integrate with existing BlueprintExecutiveSummary component */}
          <div style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)',
            fontStyle: 'italic'
          }}>
            Detailed blueprint view coming in Phase 3.2 - will reuse existing BlueprintExecutiveSummary component
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineBlueprintCard; 