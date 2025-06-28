'use client';

import React, { FC } from 'react';
import { X, Download, BarChart3, Users, TrendingUp, Clock, Zap } from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

// 🆕 PHASE 3.2: Blueprint Comparison Panel Component
// Enables side-by-side comparison of multiple inline blueprints
interface InlineBlueprintComparisonProps {
  selectedBlueprints: Array<{
    opportunityKey: string;
    opportunity: any; // AIOpportunity type
    blueprint: any; // AgenticBlueprint type
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
  }>;
  onClearSelection: () => void;
}

const InlineBlueprintComparison: FC<InlineBlueprintComparisonProps> = ({ 
  selectedBlueprints, 
  onClearSelection 
}) => {
  
  // Don't render if no blueprints selected
  if (selectedBlueprints.length === 0) return null;
  
  const handleExportComparison = () => {
    // Future: Generate PDF comparison report
    console.log('🎯 [Comparison] Export functionality - Phase 4 enhancement');
    
    // For now, create a simple data export
    const comparisonData = selectedBlueprints.map(state => ({
      opportunity: state.opportunity.title,
      pattern: state.blueprint?.selectedPattern,
      roi: state.blueprint?.roiProjection?.roiPercentage || 0,
      agents: state.blueprint?.digitalTeam?.length || 0,
      timeline: state.blueprint?.agenticTimeline?.totalDurationWeeks || 0,
      objective: state.blueprint?.businessObjective
    }));
    
    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `blueprint-comparison-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div 
      className={styles.analysisCard} 
      style={{ 
        position: 'sticky',
        top: '1rem',
        zIndex: 10,
        marginBottom: '2rem',
        borderLeft: '4px solid var(--accent-purple)',
        backgroundColor: 'rgba(124, 58, 237, 0.02)'
      }}
    >
      {/* Comparison Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BarChart3 size={20} className="text-purple-500" />
          <h4 style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            color: 'var(--text-primary)',
            fontWeight: 'bold'
          }}>
            Blueprint Comparison ({selectedBlueprints.length})
          </h4>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary"
            onClick={handleExportComparison}
            style={{ fontSize: '0.875rem' }}
          >
            <Download size={16} style={{ marginRight: '0.5rem' }} />
            Export Comparison
          </button>
          <button 
            className="btn btn-outline"
            onClick={onClearSelection}
            style={{ fontSize: '0.875rem' }}
          >
            <X size={16} style={{ marginRight: '0.5rem' }} />
            Clear All
          </button>
        </div>
      </div>
      
      {/* Comparison Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: selectedBlueprints.length === 1 
          ? '1fr' 
          : selectedBlueprints.length === 2 
            ? '1fr 1fr' 
            : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {selectedBlueprints.map((state, index) => (
          <div 
            key={state.opportunityKey} 
            style={{ 
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-primary)',
              position: 'relative'
            }}
          >
            {/* Blueprint Card Header */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Zap size={16} className="text-blue-500" />
                <h5 style={{ 
                  margin: 0, 
                  fontSize: '1rem', 
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  lineHeight: '1.2'
                }}>
                  {state.opportunity.title}
                </h5>
              </div>
              
              {state.blueprint?.selectedPattern && (
                <span style={{ 
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  color: 'var(--accent-purple)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {state.blueprint.selectedPattern}
                </span>
              )}
            </div>
            
            {/* Key Metrics Comparison */}
            <div style={{ 
              display: 'grid', 
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: 'var(--border-radius)'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)'
                }}>
                  <TrendingUp size={14} className="text-green-500" />
                  ROI
                </span>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  color: 'var(--accent-green)'
                }}>
                  {state.blueprint?.roiProjection?.roiPercentage || 0}%
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: 'var(--border-radius)'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)'
                }}>
                  <Users size={14} className="text-blue-500" />
                  Agents
                </span>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  color: 'var(--accent-blue)'
                }}>
                  {state.blueprint?.digitalTeam?.length || 0}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: 'var(--border-radius)'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)'
                }}>
                  <Clock size={14} className="text-orange-500" />
                  Timeline
                </span>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  color: 'var(--accent-orange)'
                }}>
                  {state.blueprint?.agenticTimeline?.totalDurationWeeks || 0}w
                </span>
              </div>
            </div>
            
            {/* Business Objective Preview */}
            <div style={{ 
              padding: '0.75rem',
              backgroundColor: 'rgba(156, 163, 175, 0.1)',
              borderRadius: 'var(--border-radius)',
              marginBottom: '0.75rem'
            }}>
              <div style={{ 
                fontSize: '0.8rem', 
                fontWeight: 'bold', 
                color: 'var(--text-muted)',
                marginBottom: '0.5rem'
              }}>
                Business Objective:
              </div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-secondary)',
                lineHeight: '1.3',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {state.blueprint?.businessObjective || 'Objective not available'}
              </div>
            </div>
            
            {/* Generation Metadata */}
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <span>Provider: {state.metadata.aiProvider}</span>
              <span>Generated: {new Date(state.generatedAt!).toLocaleString()}</span>
              {state.metadata.generationDuration && (
                <span>Duration: {Math.round(state.metadata.generationDuration / 1000)}s</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Comparison Summary */}
      {selectedBlueprints.length > 1 && (
        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: 'rgba(124, 58, 237, 0.05)',
          borderRadius: 'var(--border-radius)',
          borderLeft: '3px solid var(--accent-purple)'
        }}>
          <div style={{ 
            fontSize: '0.875rem', 
            fontWeight: 'bold', 
            color: 'var(--accent-purple)',
            marginBottom: '0.75rem'
          }}>
            📊 Comparison Insights:
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            <div>
              <strong>Highest ROI:</strong> {Math.max(...selectedBlueprints.map(s => s.blueprint?.roiProjection?.roiPercentage || 0))}%
            </div>
            <div>
              <strong>Fastest Timeline:</strong> {Math.min(...selectedBlueprints.map(s => s.blueprint?.agenticTimeline?.totalDurationWeeks || 999))}w
            </div>
            <div>
              <strong>Most Agents:</strong> {Math.max(...selectedBlueprints.map(s => s.blueprint?.digitalTeam?.length || 0))}
            </div>
            <div>
              <strong>Patterns:</strong> {[...new Set(selectedBlueprints.map(s => s.blueprint?.selectedPattern).filter(Boolean))].join(', ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineBlueprintComparison; 