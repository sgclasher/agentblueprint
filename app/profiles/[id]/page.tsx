'use client';

import React, { useState, useEffect, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import GlobalHeader from '../../components/GlobalHeader';
import { ArrowLeft, FileEdit, TrendingUp, Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap, LucideIcon } from 'lucide-react';
import styles from './ProfileDetail.module.css';
import { Profile } from '../../services/types';

type ActiveTab = 'overview' | 'analysis' | 'opportunities' | 'markdown';

interface ProfileTabProps {
    profile: Profile;
}

const ProfileOverviewTab: FC<ProfileTabProps> = ({ profile }) => {
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
                  <label>Employee Count</label>
                  <span>{profile.employeeCount || 'Not specified'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Annual Revenue</label>
                  <span>{profile.annualRevenue ? `$${profile.annualRevenue}` : 'Not specified'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Primary Location</label>
                  <span>{profile.primaryLocation || 'Not specified'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Website</label>
                  <span>
                    {profile.websiteUrl ? (
                      <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>
                        {profile.websiteUrl}
                      </a>
                    ) : 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
    
            {profile.strategicInitiatives && profile.strategicInitiatives.length > 0 && (
              <div className={styles.infoCard}>
                <h3>Strategic Initiatives ({profile.strategicInitiatives.length})</h3>
                <div className={styles.initiativesList}>
                  {profile.strategicInitiatives.map((initiative: any, index: number) => (
                    <div key={index} className={styles.initiativeItem}>
                      <div className={styles.initiativeDescription}>{initiative.initiative || `Initiative ${index + 1}`}</div>
                      {initiative.contact && (
                        <div className={styles.initiativeContact}>
                          <strong>{initiative.contact.name}</strong>
                          {initiative.contact.title && ` (${initiative.contact.title})`}
                          {initiative.contact.email && (
                            <>
                              <br />
                              <a href={`mailto:${initiative.contact.email}`} style={{ color: 'var(--accent-blue)' }}>
                                {initiative.contact.email}
                              </a>
                            </>
                          )}
                          {initiative.contact.phone && (
                            <>
                              <br />
                              <a href={`tel:${initiative.contact.phone}`} style={{ color: 'var(--accent-blue)' }}>
                                {initiative.contact.phone}
                              </a>
                            </>
                          )}
                          {initiative.contact.linkedin && (
                            <>
                              <br />
                              <a href={initiative.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>
                                LinkedIn Profile
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) && (
              <div className={styles.infoCard}>
                <h3>Strategic Initiatives</h3>
                <div style={{
                  padding: 'var(--spacing-lg)',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  No strategic initiatives have been added yet. You can add them by editing this profile.
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

const ProfileAnalysisTab: FC<ProfileTabProps> = ({ profile }) => {
    return (
        <div className={styles.tabContent}>
          <div className={styles.analysisSections}>
            {profile.strategicInitiatives && profile.strategicInitiatives.length > 0 && (
              <div className={styles.analysisCard}>
                <h3>Strategic Initiative Contacts</h3>
                <div className={styles.contactsGrid}>
                  {profile.strategicInitiatives.map((initiative: any, index: number) => (
                    initiative.contact && (
                      <div key={index} className={styles.contactCard}>
                        <h4>{initiative.contact.name || 'Contact Name Not Available'}</h4>
                        <p className={styles.contactTitle}>{initiative.contact.title || 'Title Not Specified'}</p>
                        <p className={styles.contactInitiative}><strong>Initiative:</strong> {initiative.initiative || `Initiative ${index + 1}`}</p>
                        <div className={styles.contactDetails}>
                          {initiative.contact.email && (
                            <p><strong>Email:</strong> <a href={`mailto:${initiative.contact.email}`}>{initiative.contact.email}</a></p>
                          )}
                          {initiative.contact.phone && (
                            <p><strong>Phone:</strong> <a href={`tel:${initiative.contact.phone!}`}>{initiative.contact.phone}</a></p>
                          )}
                          {initiative.contact.linkedin && (
                            <p><strong>LinkedIn:</strong> <a href={initiative.contact.linkedin!} target="_blank" rel="noopener noreferrer">{initiative.contact.linkedin}</a></p>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {(!profile.strategicInitiatives || profile.strategicInitiatives.length === 0 || !profile.strategicInitiatives.some((init: any) => init.contact)) && (
              <div className={styles.analysisCard}>
                <h3>Strategic Initiative Contacts</h3>
                <div style={{
                  padding: 'var(--spacing-xl)',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  <p>No contact information available for strategic initiatives.</p>
                  <p style={{ marginTop: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                    Add strategic initiatives with contact details by editing this profile to see key stakeholder information here.
                  </p>
                </div>
              </div>
            )}

            <div className={styles.analysisCard}>
              <h3>Profile Summary</h3>
              <div style={{ padding: 'var(--spacing-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)' }}>Company</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>{profile.companyName}</p>
                  </div>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)' }}>Industry</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>{profile.industry}</p>
                  </div>
                </div>
                <div>
                  <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)' }}>Total Strategic Initiatives</label>
                  <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>
                    {profile.strategicInitiatives?.length || 0} initiative{(profile.strategicInitiatives?.length || 0) === 1 ? '' : 's'} identified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

const ProfileOpportunitiesTab: FC<ProfileTabProps> = ({ profile }) => {
    return (
      <div className={styles.tabContent}>
        <div className={styles.opportunitiesPlaceholder}>
          <h3>AI Opportunity Analysis</h3>
          <div style={{
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--border-radius-lg)',
            margin: 'var(--spacing-lg) 0'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: 'var(--spacing-lg)',
              opacity: 0.5 
            }}>🤖</div>
            <h4 style={{ 
              color: 'var(--text-primary)', 
              marginBottom: 'var(--spacing-md)',
              fontSize: '1.5rem'
            }}>AI Opportunities Coming Soon</h4>
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-lg) auto'
            }}>
              This section will analyze your company's strategic initiatives and profile information to identify specific AI transformation opportunities tailored to your business context.
            </p>
            <div style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--border-radius)',
              padding: 'var(--spacing-md)',
              margin: 'var(--spacing-lg) auto',
              maxWidth: '500px'
            }}>
              <h5 style={{ 
                color: 'var(--text-primary)', 
                marginBottom: 'var(--spacing-sm)',
                fontSize: '1.1rem'
              }}>What we'll analyze:</h5>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--text-secondary)',
                paddingLeft: 'var(--spacing-lg)'
              }}>
                <li>Strategic initiatives and business priorities</li>
                <li>Industry-specific AI use cases</li>
                <li>Company size and resource considerations</li>
                <li>Potential ROI and implementation roadmap</li>
              </ul>
            </div>
          </div>
        </div>

        {profile.strategicInitiatives && profile.strategicInitiatives.length > 0 && (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-lg)'
          }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
              Current Strategic Context
            </h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
              Based on your {profile.strategicInitiatives.length} strategic initiative{profile.strategicInitiatives.length === 1 ? '' : 's'}, we'll identify AI opportunities that align with your business priorities.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
              {profile.strategicInitiatives.map((initiative: any, index: number) => (
                <span 
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {initiative.initiative || `Initiative ${index + 1}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

const ProfileMarkdownTab: FC<ProfileTabProps> = ({ profile }) => {
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

export default function ProfileDetailPage() {
  const params = useParams();
  const profileId = params.id as string;
  const router = useRouter();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

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
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimeline = () => {
    router.push(`/timeline?profileId=${profileId}`);
  };

  const handleEdit = () => {
    router.push(`/profiles/${profileId}/edit`);
  };

  const handleBack = () => {
    router.push('/profiles');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIndustryIcon = (industry: string): React.ReactNode => {
    const icons: { [key: string]: LucideIcon } = {
      'Technology': Briefcase,
      'Healthcare': Building2,
      'Finance': BarChart,
      'Manufacturing': Building2,
      'Retail': Store,
      'Education': GraduationCap,
      'Real Estate': Home,
      'Transportation': Truck,
      'Energy': Zap,
      'Other': Store
    };
    const Icon = icons[industry] || Store;
    return <Icon size={24} />;
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
        <div className={styles.tabNavigation}>
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
          <span>Created: {formatDate(profile.createdAt || '')}</span>
          <span>•</span>
          <span>Updated: {formatDate(profile.updatedAt || '')}</span>
          <span>•</span>
          <span>ID: {profile.id}</span>
        </div>
      </div>
    </div>
  );
}
