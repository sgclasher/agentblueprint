'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import GlobalHeader from '../../components/GlobalHeader';
import { ArrowLeft, FileEdit, TrendingUp, Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap } from 'lucide-react';
import styles from './ProfileDetail.module.css';

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
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimeline = () => {
    window.location.href = `/timeline?profileId=${profileId}`;
  };

  const handleEdit = () => {
    window.location.href = `/profiles/${profileId}/edit`;
  };

  const handleBack = () => {
    window.location.href = '/profiles';
  };

  if (isLoading) {
    return (
      <div className={styles.profilePage}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.profilePage}>
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
      <div className={styles.profilePage}>
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
    <div className={styles.profilePage}>
      <GlobalHeader />
      
      <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <button 
            onClick={handleBack}
            aria-label="Back to Profiles"
            className={`btn btn-secondary ${styles.backButton}`}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className={styles.profileInfo}>
            <div className={styles.profileIcon}>
              {getIndustryIcon(profile.industry)}
            </div>
            <div>
              <h1 className={styles.companyName}>{profile.companyName}</h1>
              <div className={styles.industrySizeStatus}>
                <span className={styles.industry}>{profile.industry}</span>
                <span className={styles.size}>{profile.size}</span>
                <span className={styles.status}>{profile.status}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.editButtons}>
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

      <div className={styles.tabBar}>
        <div className={styles.tabContent}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'analysis' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'opportunities' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('opportunities')}
          >
            AI Opportunities
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'markdown' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('markdown')}
          >
            Markdown
          </button>
        </div>
      </div>

      <div className={styles.content}>
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

      <div className={styles.footer}>
        <div className={styles.footerContent}>
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

function ProfileOverviewTab({ profile }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.overviewGrid}>
        <div className={styles.infoCard}>
          <h3>Company Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Company Name</label>
              <span>{profile.companyName}</span>
            </div>
            <div className={styles.infoItem}>
              <label>Industry</label>
              <span>{profile.industry}</span>
            </div>
            <div className={styles.infoItem}>
              <label>Size</label>
              <span>{profile.size}</span>
            </div>
            <div className={styles.infoItem}>
              <label>Annual Revenue</label>
              <span>{profile.annualRevenue ? `$${profile.annualRevenue}` : 'Not specified'}</span>
            </div>
            <div className={styles.infoItem}>
              <label>Employee Count</label>
              <span>{profile.employeeCount || 'Not specified'}</span>
            </div>
            <div className={styles.infoItem}>
              <label>Location</label>
              <span>{profile.primaryLocation || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {profile.expectedOutcome?.strategicInitiatives?.length > 0 && (
          <div className={styles.infoCard}>
            <h3>Strategic Initiatives</h3>
            <div className={styles.initiativesList}>
              {profile.expectedOutcome.strategicInitiatives.map((initiative, index) => (
                <div key={index} className={styles.initiativeItem}>
                  <div className={styles.initiativeDescription}>{initiative.initiative}</div>
                  {initiative.contact && (
                    <div className={styles.initiativeContact}>
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

        {(profile.problems?.businessProblems?.length > 0 || profile.problems?.agenticOpportunities?.length > 0) && (
          <div className={styles.infoCard}>
            <h3>Problems & Agentic AI Opportunities</h3>
            {profile.problems.businessProblems?.length > 0 && (
              <div className={styles.problemsSection}>
                <h4>Current Problems:</h4>
                <ul>
                  {profile.problems.businessProblems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>
            )}
            {profile.problems.agenticOpportunities?.length > 0 && (
              <div className={styles.opportunitiesSection}>
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

        {profile.value?.businessValue && (
          <div className={styles.infoCard}>
            <h3>Business Value</h3>
            <div className={styles.valueContent}>
              {profile.value.businessValue.totalAnnualImpact && (
                <div className={`${styles.metricItem} ${styles.highlight}`}>
                  <label>Total Annual Impact</label>
                  <span className={styles.metricValue}>{profile.value.businessValue.totalAnnualImpact}</span>
                </div>
              )}
              {profile.value.businessValue.revenueImpact && (
                <div className={styles.valueItem}>
                  <strong>Revenue Impact:</strong> {profile.value.businessValue.revenueImpact}
                </div>
              )}
              {profile.value.businessValue.costReduction && (
                <div className={styles.valueItem}>
                  <strong>Cost Reduction:</strong> {profile.value.businessValue.costReduction}
                </div>
              )}
              {profile.value.businessValue.operationalEfficiency && (
                <div className={styles.valueItem}>
                  <strong>Operational Efficiency:</strong> {profile.value.businessValue.operationalEfficiency}
                </div>
              )}
            </div>
          </div>
        )}

        {profile.aiOpportunityAssessment && (
          <div className={styles.infoCard}>
            <h3>AI Readiness</h3>
            <div className={styles.aiReadinessDisplay}>
              <div className={styles.readinessScore}>
                <span className={styles.scoreValue}>{profile.aiOpportunityAssessment.aiReadinessScore || profile.aiReadinessScore || 'N/A'}</span>
                <span className={styles.scoreLabel}>/ 10</span>
              </div>
              {profile.aiOpportunityAssessment.currentTechnology && (
                <div className={styles.techStack}>
                  <label>Current Technology</label>
                  <div className={styles.techItems}>
                    {Object.entries(profile.aiOpportunityAssessment.currentTechnology).map(([key, value]) => (
                      value && (
                        <div key={key} className={styles.techItem}>
                          <span className={styles.techLabel}>{key}:</span>
                          <span className={styles.techValue}>{value}</span>
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
    <div className={styles.tabContent}>
      <div className={styles.analysisSections}>
        {profile.expectedOutcome?.strategicInitiatives?.length > 0 && (
          <div className={styles.analysisCard}>
            <h3>Key Executive Contacts</h3>
            <div className={styles.contactsGrid}>
              {profile.expectedOutcome.strategicInitiatives.map((initiative, index) => (
                initiative.contact && (
                  <div key={index} className={styles.contactCard}>
                    <h4>{initiative.contact.name}</h4>
                    <p className={styles.contactTitle}>{initiative.contact.title}</p>
                    <p className={styles.contactInitiative}><strong>Initiative:</strong> {initiative.initiative}</p>
                    <div className={styles.contactDetails}>
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

        {(profile.solutions?.capabilities?.length > 0 || profile.solutions?.differentiators?.length > 0) && (
          <div className={styles.analysisCard}>
            <h3>Solutions & Capabilities</h3>
            {profile.solutions.capabilities?.length > 0 && (
              <div className={styles.capabilitiesSection}>
                <h4>Required Capabilities:</h4>
                <div className={styles.capabilitiesList}>
                  {profile.solutions.capabilities.map((capability, index) => (
                    <div key={index} className={styles.capabilityItem}>
                      <span className={styles.capabilityIcon}>✓</span>
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {profile.solutions.differentiators?.length > 0 && (
              <div className={styles.differentiatorsSection}>
                <h4>Key Differentiators:</h4>
                <div className={styles.differentiatorsList}>
                  {profile.solutions.differentiators.map((differentiator, index) => (
                    <div key={index} className={styles.differentiatorItem}>
                      <span className={styles.differentiatorIcon}>⭐</span>
                      <span>{differentiator}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {profile.valueSellingFramework?.roiExpectations && (
          <div className={styles.analysisCard}>
            <h3>ROI Expectations</h3>
            <div className={styles.roiGrid}>
              {Object.entries(profile.valueSellingFramework.roiExpectations).map(([key, value]) => (
                value && (
                  <div key={key} className={styles.roiItem}>
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
    <div className={styles.tabContent}>
      {(businessProblems.length > 0 || agenticOpportunities.length > 0) && (
        <div className={styles.problemsOpportunitiesSection}>
          <div className={styles.problemsOpportunitiesGrid}>
            {businessProblems.length > 0 && (
              <div className={styles.problemsSection}>
                <h3>Current Business Problems</h3>
                <div className={styles.problemsList}>
                  {businessProblems.map((problem, index) => (
                    <div key={index} className={styles.problemCard}>
                      <div className={styles.problemText}>{problem}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {agenticOpportunities.length > 0 && (
              <div className={styles.opportunitiesSection}>
                <h3>Agentic AI Opportunities</h3>
                <div className={styles.opportunitiesList}>
                  {agenticOpportunities.map((opportunity, index) => (
                    <div key={index} className={styles.opportunityCard}>
                      <div className={styles.opportunityText}>{opportunity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {(currentArchitecture.coreSystems?.length > 0 || currentArchitecture.aiReadiness) && (
        <div className={styles.architectureSection}>
          <h3>Current Architecture & AI Readiness</h3>
          <div className={styles.architectureContent}>
            {currentArchitecture.coreSystems?.length > 0 && (
              <div className={styles.systemsList}>
                <h4>Core Systems:</h4>
                <ul>
                  {currentArchitecture.coreSystems.map((system, index) => (
                    <li key={index}>{system}</li>
                  ))}
                </ul>
              </div>
            )}
            {currentArchitecture.aiReadiness && (
              <div className={styles.readinessAssessment}>
                <h4>AI Readiness:</h4>
                <p>{currentArchitecture.aiReadiness}</p>
              </div>
            )}
            {currentArchitecture.technicalDebt && (
              <div className={styles.technicalDebt}>
                <h4>Technical Debt:</h4>
                <p>{currentArchitecture.technicalDebt}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {businessProblems.length === 0 && agenticOpportunities.length === 0 && (
        <div className={styles.emptyOpportunities}>
          <p>No problems or agentic AI opportunities identified yet. Complete the Problems & Opportunities section to see the analysis.</p>
        </div>
      )}
    </div>
  );
}

function ProfileMarkdownTab({ profile }) {
  const markdown = profile.markdown || markdownService.generateMarkdown(profile);

  return (
    <div className={styles.tabContent}>
      <div className={styles.markdownContainer}>
        <div className={styles.markdownHeader}>
          <h3>Profile Markdown</h3>
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => navigator.clipboard.writeText(markdown)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className={styles.markdownContent}>
          {markdown}
        </pre>
      </div>
    </div>
  );
} 