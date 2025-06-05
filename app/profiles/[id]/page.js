'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import GlobalHeader from '../../components/GlobalHeader';
import { ArrowLeft, FileEdit, TrendingUp, Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap } from 'lucide-react';

export default function ProfileDetailPage() {
  const params = useParams();
  const profileId = params.id;
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await ProfileService.getProfile(profileId);
      
      if (!profileData) {
        setError('Profile not found');
        return;
      }
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimeline = () => {
    window.location.href = `/timeline?profileId=${profileId}`;
  };

  const handleEdit = () => {
    // For now, redirect to profiles page
    // In the future, this could open the wizard in edit mode
    window.location.href = '/profiles';
  };

  const handleBack = () => {
    window.location.href = '/profiles';
  };

  if (isLoading) {
    return (
      <div className="profile-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-detail-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-detail-page">
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>The requested profile could not be found.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIndustryIcon = (industry) => {
    const icons = {
      'Technology': <Briefcase size={24} />,
      'Healthcare': <Building2 size={24} />,
      'Finance': <BarChart size={24} />,
      'Manufacturing': <Building2 size={24} />,
      'Retail': <Store size={24} />,
      'Education': <GraduationCap size={24} />,
      'Real Estate': <Home size={24} />,
      'Transportation': <Truck size={24} />,
      'Energy': <Zap size={24} />,
      'Other': <Store size={24} />
    };
    return icons[industry] || <Store size={24} />;
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      {/* Profile Header */}
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-lg)'
        }}>
          <button 
            onClick={handleBack}
            aria-label="Back to Profiles"
            className="btn btn-secondary"
            style={{
              padding: 'var(--spacing-sm)',
              minWidth: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-md)',
            flex: 1
          }}>
            <div style={{
              fontSize: '2.2rem',
              width: '60px',
              height: '60px',
              borderRadius: 'var(--border-radius-lg)',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {getIndustryIcon(profile.industry)}
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '2rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)'
              }}>{profile.companyName}</h1>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'var(--accent-blue)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.85rem',
                  fontWeight: 'var(--font-weight-medium)'
                }}>{profile.industry}</span>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--accent-green)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.85rem',
                  fontWeight: 'var(--font-weight-medium)'
                }}>{profile.size}</span>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(245, 158, 11, 0.1)',
                  color: 'var(--accent-yellow)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.85rem',
                  fontWeight: 'var(--font-weight-medium)'
                }}>{profile.status}</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button 
              className="btn btn-secondary"
              onClick={handleEdit}
            >
              <FileEdit size={18} />
              Edit Profile
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleGenerateTimeline}
            >
              <TrendingUp size={18} />
              Generate AI Timeline
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        borderBottom: '1px solid var(--border-primary)',
        background: 'var(--bg-secondary)',
        padding: '0 var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: 'var(--spacing-lg)'
        }}>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'overview' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'overview' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'analysis' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'analysis' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis
          </button>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'opportunities' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'opportunities' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('opportunities')}
          >
            AI Opportunities
          </button>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'markdown' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'markdown' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('markdown')}
          >
            Markdown
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)'
      }}>
        {activeTab === 'overview' && (
          <ProfileOverviewTab profile={profile} />
        )}
        
        {activeTab === 'analysis' && (
          <ProfileAnalysisTab profile={profile} />
        )}
        
        {activeTab === 'opportunities' && (
          <ProfileOpportunitiesTab profile={profile} />
        )}
        
        {activeTab === 'markdown' && (
          <ProfileMarkdownTab profile={profile} />
        )}
      </div>

      {/* Footer Info */}
      <div style={{
        borderTop: '1px solid var(--border-primary)',
        background: 'var(--bg-secondary)',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        marginTop: 'var(--spacing-xxl)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: 'var(--spacing-lg)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          justifyContent: 'center'
        }}>
          <span>Created: {formatDate(profile.createdAt)}</span>
          <span>•</span>
          <span>Updated: {formatDate(profile.updatedAt)}</span>
          <span>•</span>
          <span>ID: {profile.id}</span>
        </div>
      </div>
    </div>
  );
}

// Tab Components
function ProfileOverviewTab({ profile }) {
  return (
    <div className="tab-content overview-tab">
      <div className="overview-grid">
        {/* Company Information */}
        <div className="info-card">
          <h3>Company Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Company Name</label>
              <span>{profile.companyName}</span>
            </div>
            <div className="info-item">
              <label>Industry</label>
              <span>{profile.industry}</span>
            </div>
            <div className="info-item">
              <label>Size</label>
              <span>{profile.size}</span>
            </div>
            <div className="info-item">
              <label>Annual Revenue</label>
              <span>{profile.annualRevenue ? `$${profile.annualRevenue}` : 'Not specified'}</span>
            </div>
            <div className="info-item">
              <label>Employee Count</label>
              <span>{profile.employeeCount || 'Not specified'}</span>
            </div>
            <div className="info-item">
              <label>Location</label>
              <span>{profile.primaryLocation || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Strategic Initiatives */}
        {profile.expectedOutcome?.strategicInitiatives?.length > 0 && (
          <div className="info-card">
            <h3>Strategic Initiatives</h3>
            <div className="initiatives-list">
              {profile.expectedOutcome.strategicInitiatives.map((initiative, index) => (
                <div key={index} className="initiative-item">
                  <div className="initiative-description">{initiative.initiative}</div>
                  {initiative.contact && (
                    <div className="initiative-contact">
                      <strong>{initiative.contact.name}</strong> ({initiative.contact.title})
                      <br />
                      <a href={`mailto:${initiative.contact.email}`}>{initiative.contact.email}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Business Problems & Opportunities */}
        {(profile.problems?.businessProblems?.length > 0 || profile.problems?.agenticOpportunities?.length > 0) && (
          <div className="info-card">
            <h3>Problems & Agentic AI Opportunities</h3>
            {profile.problems.businessProblems?.length > 0 && (
              <div className="problems-section">
                <h4>Current Problems:</h4>
                <ul>
                  {profile.problems.businessProblems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>
            )}
            {profile.problems.agenticOpportunities?.length > 0 && (
              <div className="opportunities-section">
                <h4>Agentic Opportunities:</h4>
                <ul>
                  {profile.problems.agenticOpportunities.map((opportunity, index) => (
                    <li key={index}>{opportunity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Business Value */}
        {profile.value?.businessValue && (
          <div className="info-card">
            <h3>Business Value</h3>
            <div className="value-content">
              {profile.value.businessValue.totalAnnualImpact && (
                <div className="metric-item highlight">
                  <label>Total Annual Impact</label>
                  <span className="metric-value">{profile.value.businessValue.totalAnnualImpact}</span>
                </div>
              )}
              {profile.value.businessValue.revenueImpact && (
                <div className="value-item">
                  <strong>Revenue Impact:</strong> {profile.value.businessValue.revenueImpact}
                </div>
              )}
              {profile.value.businessValue.costReduction && (
                <div className="value-item">
                  <strong>Cost Reduction:</strong> {profile.value.businessValue.costReduction}
                </div>
              )}
              {profile.value.businessValue.operationalEfficiency && (
                <div className="value-item">
                  <strong>Operational Efficiency:</strong> {profile.value.businessValue.operationalEfficiency}
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Readiness */}
        {profile.aiOpportunityAssessment && (
          <div className="info-card">
            <h3>AI Readiness</h3>
            <div className="ai-readiness-display">
              <div className="readiness-score">
                <span className="score-value">{profile.aiOpportunityAssessment.aiReadinessScore || profile.aiReadinessScore || 'N/A'}</span>
                <span className="score-label">/ 10</span>
              </div>
              {profile.aiOpportunityAssessment.currentTechnology && (
                <div className="tech-stack">
                  <label>Current Technology</label>
                  <div className="tech-items">
                    {Object.entries(profile.aiOpportunityAssessment.currentTechnology).map(([key, value]) => (
                      value && (
                        <div key={key} className="tech-item">
                          <span className="tech-label">{key}:</span>
                          <span className="tech-value">{value}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileAnalysisTab({ profile }) {
  return (
    <div className="tab-content analysis-tab">
      <div className="analysis-sections">
        {/* Key Contacts */}
        {profile.expectedOutcome?.strategicInitiatives?.length > 0 && (
          <div className="analysis-card">
            <h3>Key Executive Contacts</h3>
            <div className="contacts-grid">
              {profile.expectedOutcome.strategicInitiatives.map((initiative, index) => (
                initiative.contact && (
                  <div key={index} className="contact-card">
                    <h4>{initiative.contact.name}</h4>
                    <p className="contact-title">{initiative.contact.title}</p>
                    <p className="contact-initiative"><strong>Initiative:</strong> {initiative.initiative}</p>
                    <div className="contact-details">
                      <p><strong>Email:</strong> <a href={`mailto:${initiative.contact.email}`}>{initiative.contact.email}</a></p>
                      {initiative.contact.phone && (
                        <p><strong>Phone:</strong> <a href={`tel:${initiative.contact.phone}`}>{initiative.contact.phone}</a></p>
                      )}
                      {initiative.contact.linkedin && (
                        <p><strong>LinkedIn:</strong> <a href={`https://${initiative.contact.linkedin}`} target="_blank" rel="noopener noreferrer">{initiative.contact.linkedin}</a></p>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Solutions & Capabilities */}
        {(profile.solutions?.capabilities?.length > 0 || profile.solutions?.differentiators?.length > 0) && (
          <div className="analysis-card">
            <h3>Solutions & Capabilities</h3>
            {profile.solutions.capabilities?.length > 0 && (
              <div className="capabilities-section">
                <h4>Required Capabilities:</h4>
                <div className="capabilities-list">
                  {profile.solutions.capabilities.map((capability, index) => (
                    <div key={index} className="capability-item">
                      <span className="capability-icon">✓</span>
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {profile.solutions.differentiators?.length > 0 && (
              <div className="differentiators-section">
                <h4>Key Differentiators:</h4>
                <div className="differentiators-list">
                  {profile.solutions.differentiators.map((differentiator, index) => (
                    <div key={index} className="differentiator-item">
                      <span className="differentiator-icon">⭐</span>
                      <span>{differentiator}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ROI Expectations */}
        {profile.valueSellingFramework?.roiExpectations && (
          <div className="analysis-card">
            <h3>ROI Expectations</h3>
            <div className="roi-grid">
              {Object.entries(profile.valueSellingFramework.roiExpectations).map(([key, value]) => (
                value && (
                  <div key={key} className="roi-item">
                    <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                    <span>{value}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileOpportunitiesTab({ profile }) {
  const businessProblems = profile.problems?.businessProblems || [];
  const agenticOpportunities = profile.problems?.agenticOpportunities || [];
  const currentArchitecture = profile.currentArchitecture || {};

  return (
    <div className="tab-content opportunities-tab">
      {(businessProblems.length > 0 || agenticOpportunities.length > 0) && (
        <div className="problems-opportunities-section">
          <div className="problems-opportunities-grid">
            {businessProblems.length > 0 && (
              <div className="problems-section">
                <h3>Current Business Problems</h3>
                <div className="problems-list">
                  {businessProblems.map((problem, index) => (
                    <div key={index} className="problem-card">
                      <div className="problem-text">{problem}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {agenticOpportunities.length > 0 && (
              <div className="opportunities-section">
                <h3>Agentic AI Opportunities</h3>
                <div className="opportunities-list">
                  {agenticOpportunities.map((opportunity, index) => (
                    <div key={index} className="opportunity-card">
                      <div className="opportunity-text">{opportunity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Current Architecture */}
      {(currentArchitecture.coreSystems?.length > 0 || currentArchitecture.aiReadiness) && (
        <div className="architecture-section">
          <h3>Current Architecture & AI Readiness</h3>
          <div className="architecture-content">
            {currentArchitecture.coreSystems?.length > 0 && (
              <div className="systems-list">
                <h4>Core Systems:</h4>
                <ul>
                  {currentArchitecture.coreSystems.map((system, index) => (
                    <li key={index}>{system}</li>
                  ))}
                </ul>
              </div>
            )}
            {currentArchitecture.aiReadiness && (
              <div className="readiness-assessment">
                <h4>AI Readiness:</h4>
                <p>{currentArchitecture.aiReadiness}</p>
              </div>
            )}
            {currentArchitecture.technicalDebt && (
              <div className="technical-debt">
                <h4>Technical Debt:</h4>
                <p>{currentArchitecture.technicalDebt}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {businessProblems.length === 0 && agenticOpportunities.length === 0 && (
        <div className="empty-opportunities">
          <p>No problems or agentic AI opportunities identified yet. Complete the Problems & Opportunities section to see the analysis.</p>
        </div>
      )}
    </div>
  );
}

function ProfileMarkdownTab({ profile }) {
  const markdown = profile.markdown || markdownService.generateMarkdown(profile);

  return (
    <div className="tab-content markdown-tab">
      <div className="markdown-container">
        <div className="markdown-header">
          <h3>Profile Markdown</h3>
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => navigator.clipboard.writeText(markdown)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className="markdown-content">
          {markdown}
        </pre>
      </div>
    </div>
  );
} 