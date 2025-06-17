'use client';

import React, { FC } from 'react';
import { Profile, SystemApplication } from '../../services/types';
import { 
  Server, Database, Cloud, Shield, BarChart, MessageSquare, 
  Code, Truck, Zap, Building2, Users, Settings, Monitor, 
  AlertTriangle, CheckCircle, Clock, LucideIcon 
} from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

interface SystemsTabProps {
  profile: Profile;
  isEditing: boolean;
}

const SystemsTab: FC<SystemsTabProps> = ({ profile, isEditing }) => {
  const systems = profile.systemsAndApplications || [];

  const getCategoryIcon = (category: string): React.ReactNode => {
    const icons: { [key: string]: LucideIcon } = {
      'CRM': Users,
      'ERP': Building2,
      'Cloud Platform': Cloud,
      'Database': Database,
      'Analytics': BarChart,
      'Communication': MessageSquare,
      'Security': Shield,
      'DevOps': Code,
      'Transportation': Truck,
      'Energy': Zap,
      'Other': Settings
    };
    
    const IconComponent = icons[category] || Monitor;
    return <IconComponent size={24} />;
  };

  const getCriticalityBadge = (criticality: string) => {
    const config: { [key: string]: {
      icon: LucideIcon;
      color: string;
      bg: string;
      border: string;
      label: string;
    }} = {
      'High': { 
        icon: AlertTriangle, 
        color: 'text-red-600', 
        bg: 'bg-red-100', 
        border: 'border-red-200',
        label: 'Mission Critical'
      },
      'Medium': { 
        icon: Clock, 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-100', 
        border: 'border-yellow-200',
        label: 'Important'
      },
      'Low': { 
        icon: CheckCircle, 
        color: 'text-green-600', 
        bg: 'bg-green-100', 
        border: 'border-green-200',
        label: 'Supporting'
      }
    };
    
    return config[criticality] || config['Medium'];
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'CRM': 'rgba(59, 130, 246, 0.1)', // Blue
      'ERP': 'rgba(16, 185, 129, 0.1)', // Green
      'Cloud Platform': 'rgba(139, 92, 246, 0.1)', // Purple
      'Database': 'rgba(245, 158, 11, 0.1)', // Orange
      'Analytics': 'rgba(236, 72, 153, 0.1)', // Pink
      'Communication': 'rgba(14, 165, 233, 0.1)', // Sky
      'Security': 'rgba(239, 68, 68, 0.1)', // Red
      'DevOps': 'rgba(34, 197, 94, 0.1)', // Emerald
      'Transportation': 'rgba(168, 85, 247, 0.1)', // Violet
      'Energy': 'rgba(251, 191, 36, 0.1)', // Yellow
      'Other': 'rgba(107, 114, 128, 0.1)' // Gray
    };
    
    return colors[category] || colors['Other'];
  };

  // Group systems by category
  const groupedSystems = systems.reduce((groups, system) => {
    const category = system.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(system);
    return groups;
  }, {} as { [key: string]: SystemApplication[] });

  // Sort categories by importance and system count
  const sortedCategories = Object.keys(groupedSystems).sort((a, b) => {
    const priorityOrder = ['CRM', 'ERP', 'Database', 'Cloud Platform', 'Analytics', 'Security', 'Communication', 'DevOps'];
    const aIndex = priorityOrder.indexOf(a);
    const bIndex = priorityOrder.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return groupedSystems[b].length - groupedSystems[a].length;
  });

  if (systems.length === 0) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.emptyOpportunities}>
          <Server size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Systems & Applications</h3>
          <p>Add information about your technology infrastructure to get insights about integration opportunities and AI readiness.</p>
          {!isEditing && (
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              <Settings size={18} style={{ marginRight: '0.5rem' }} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      {/* Systems Overview */}
      <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>
            <Server size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Technology Infrastructure Overview
          </h3>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {systems.length} System{systems.length !== 1 ? 's' : ''} • {sortedCategories.length} Categories
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          {sortedCategories.map(category => (
            <div key={category} style={{ 
              padding: '1rem', 
              backgroundColor: getCategoryColor(category),
              borderRadius: 'var(--border-radius-lg)',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                {getCategoryIcon(category)}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-semibold)', marginBottom: '0.25rem' }}>
                {category}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {groupedSystems[category].length} system{groupedSystems[category].length !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Systems by Category */}
      {sortedCategories.map(category => (
        <div key={category} className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ marginRight: '0.75rem' }}>
              {getCategoryIcon(category)}
            </span>
            {category} Systems ({groupedSystems[category].length})
          </h3>
          
          <div className={styles.techStack}>
            <div className={styles.techItems}>
              {groupedSystems[category].map((system, index) => {
                const criticalityConfig = getCriticalityBadge(system.criticality || 'Medium');
                const CriticalityIcon = criticalityConfig.icon;
                
                return (
                  <div key={index} className={styles.techItem} style={{ 
                    backgroundColor: getCategoryColor(category),
                    border: `1px solid ${getCategoryColor(category).replace('0.1', '0.3')}`
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'var(--font-weight-semibold)' }}>
                          {system.name}
                        </h4>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.25rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 'var(--border-radius)',
                          fontSize: '0.75rem',
                          fontWeight: 'var(--font-weight-medium)',
                          backgroundColor: 'white',
                          border: `1px solid ${criticalityConfig.border.replace('border-', '')}`
                        }} className={`${criticalityConfig.bg} ${criticalityConfig.color}`}>
                          <CriticalityIcon size={14} />
                          {criticalityConfig.label}
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', fontSize: '0.9rem' }}>
                        {system.vendor && (
                          <div>
                            <strong style={{ color: 'var(--text-muted)' }}>Vendor:</strong>
                            <div>{system.vendor}</div>
                          </div>
                        )}
                        {system.version && (
                          <div>
                            <strong style={{ color: 'var(--text-muted)' }}>Version:</strong>
                            <div>{system.version}</div>
                          </div>
                        )}
                        <div>
                          <strong style={{ color: 'var(--text-muted)' }}>Category:</strong>
                          <div>{system.category}</div>
                        </div>
                      </div>
                      
                      {system.description && (
                        <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                          {system.description}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* System Statistics */}
      <div className={styles.analysisCard}>
        <h3>Infrastructure Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-blue)' }}>
              <BarChart size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Criticality Distribution
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {['High', 'Medium', 'Low'].map(level => {
                const count = systems.filter(s => (s.criticality || 'Medium') === level).length;
                const percentage = systems.length > 0 ? Math.round((count / systems.length) * 100) : 0;
                const config = getCriticalityBadge(level);
                const Icon = config.icon;
                
                return (
                  <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon size={16} className={config.color} />
                    <span style={{ fontSize: '0.9rem', minWidth: '80px' }}>{config.label}:</span>
                    <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{count}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-green)' }}>
              <Building2 size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Top Vendors
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {Object.entries(
                systems.reduce((vendors, system) => {
                  if (system.vendor) {
                    vendors[system.vendor] = (vendors[system.vendor] || 0) + 1;
                  }
                  return vendors;
                }, {} as { [key: string]: number })
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([vendor, count]) => (
                  <div key={vendor} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{vendor}</span>
                    <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{count}</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-purple)' }}>
              <Shield size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Integration Opportunities
            </h4>
            <div style={{ fontSize: '0.9rem', lineHeight: 'var(--line-height)' }}>
              {systems.length >= 5 ? (
                <div style={{ color: 'var(--accent-blue)' }}>
                  <CheckCircle size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  Rich integration potential with {systems.length} systems across {sortedCategories.length} categories
                </div>
              ) : systems.length >= 3 ? (
                <div style={{ color: 'var(--accent-yellow)' }}>
                  <Clock size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  Moderate integration opportunities
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>
                  <AlertTriangle size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  Limited integration data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemsTab; 