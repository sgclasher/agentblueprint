'use client';

import React, { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileService } from '../services/profileService';
import { demoDataService } from '../services/demoDataService';
import ProfileWizard from './components/ProfileWizard';
import useAuthStore from '../store/useAuthStore';
import GlobalHeader from '../components/GlobalHeader';
import { Plus, Users, BarChart, Building2, Briefcase, GraduationCap, Home, Truck, Zap, Store, TrendingUp, Eye, Lock, LucideIcon } from 'lucide-react';
import { Profile } from '../services/types';

const AuthRequiredMessage: FC = () => {
  const router = useRouter();
  return (
    <div style={{
      textAlign: 'center',
      padding: 'var(--spacing-xxl)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--backdrop-blur))',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--border-radius-xl)',
      margin: 'var(--spacing-xl) auto',
      maxWidth: '600px'
    }}>
      <Lock size={48} style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }} />
      <h2 style={{
        fontSize: '2rem',
        color: 'var(--text-primary)',
        marginBottom: 'var(--spacing-md)',
        fontWeight: 'var(--font-weight-semibold)'
      }}>Authentication Required</h2>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        marginBottom: 'var(--spacing-xl)',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Please sign in or create an account to manage your client profiles. All your data will be securely stored in the cloud.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary btn-large"
          onClick={() => router.push(`/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`)}
        >
          Sign In
        </button>
        <button 
          className="btn btn-secondary btn-large"
          onClick={() => router.push('/auth/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

interface ProfileCardProps {
    profile: Profile;
    onView: () => void;
    onGenerateTimeline: () => void;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile, onView, onGenerateTimeline }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getIndustryIcon = (industry: string): React.ReactNode => {
        const iconMapping: { [key: string]: LucideIcon } = {
            Technology: Briefcase,
            Healthcare: Building2,
            Finance: BarChart,
            Manufacturing: Building2,
            Retail: Store,
            Education: GraduationCap,
            'Real Estate': Home,
            Transportation: Truck,
            Energy: Zap,
        };
        const Icon = iconMapping[industry] || Store;
        return <Icon size={24} />;
    };

    const getSizeLabel = (size: string): string => {
        const labels: { [key: string]: string } = {
            '1-50 employees': 'Startup',
            '51-200 employees': 'Small',
            '201-1000 employees': 'Medium',
            '1000+ employees': 'Enterprise'
        };
        return labels[size] || size;
    };

    return (
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xl)',
          border: '1px solid var(--border-primary)',
          transition: 'all var(--transition-normal) cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <div style={{
              fontSize: '2.2rem',
              width: '60px',
              height: '60px',
              borderRadius: 'var(--border-radius-lg)',
              background: 'linear-gradient(135deg, rgba(120, 119, 198, 0.3), rgba(255, 119, 198, 0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid var(--border-primary)',
              backdropFilter: 'blur(10px)'
            }}>
              {getIndustryIcon(profile.industry)}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                margin: '0 0 var(--spacing-sm) 0',
                letterSpacing: '-0.01em'
              }}>{profile.companyName}</h3>
              <div style={{ 
                display: 'flex', 
                gap: 'var(--spacing-sm)', 
                flexWrap: 'wrap' 
              }}>
                <span style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--border-radius-lg)',
                  fontSize: '0.8rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--profile-tag-industry-border)',
                  background: 'var(--profile-tag-industry-bg)',
                  color: 'var(--profile-tag-industry-color)'
                }}>{profile.industry}</span>
                <span style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--border-radius-lg)',
                  fontSize: '0.8rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--profile-tag-size-border)',
                  background: 'var(--profile-tag-size-bg)',
                  color: 'var(--profile-tag-size-color)'
                }}>{getSizeLabel(profile.size)}</span>
                {profile._supabaseRecord && (
                  <span style={{
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--border-radius-lg)',
                    fontSize: '0.8rem',
                    fontWeight: 'var(--font-weight-semibold)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#60a5fa'
                  }}>☁️ Cloud</span>
                )}
              </div>
            </div>
          </div>
    
          <div style={{
            marginBottom: 'var(--spacing-lg)',
            paddingBottom: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--border-primary)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--spacing-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 'var(--font-weight-medium)'
                }}>Created</span>
                <span style={{
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}>{formatDate(profile.createdAt)}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--spacing-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 'var(--font-weight-medium)'
                }}>Status</span>
                <span style={{
                  fontWeight: 'var(--font-weight-bold)',
                  color: profile.status === 'draft' ? 'var(--accent-yellow)' : 'var(--accent-green)',
                  fontSize: '1rem'
                }}>
                  {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                </span>
              </div>
            </div>
    
            {profile.valueSellingFramework?.businessIssues?.length > 0 && (
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Key Issues:</span>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--spacing-xs)'
                }}>
                  {profile.valueSellingFramework.businessIssues.slice(0, 2).map((issue: string, index: number) => (
                    <span key={index} style={{
                      padding: '0.3rem 0.75rem',
                      background: 'var(--profile-tag-issue-bg)',
                      color: 'var(--profile-tag-issue-color)',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '0.75rem',
                      fontWeight: 'var(--font-weight-semibold)',
                      border: '1px solid var(--profile-tag-issue-border)',
                      backdropFilter: 'blur(10px)'
                    }}>{issue}</span>
                  ))}
                  {profile.valueSellingFramework.businessIssues.length > 2 && (
                    <span style={{
                      padding: '0.3rem 0.75rem',
                      background: 'var(--profile-tag-more-bg)',
                      color: 'var(--profile-tag-more-color)',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '0.75rem',
                      fontWeight: 'var(--font-weight-semibold)',
                      border: '1px solid var(--profile-tag-more-border)',
                      backdropFilter: 'blur(10px)'
                    }}>+{profile.valueSellingFramework.businessIssues.length - 2} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
    
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'flex-end'
          }}>
            <button 
              className="btn btn-secondary"
              onClick={onView}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              <Eye size={16} />
              View Details
            </button>
            <button 
              className="btn btn-primary"
              onClick={onGenerateTimeline}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              <TrendingUp size={16} />
              AI Timeline
            </button>
          </div>
        </div>
      );
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthenticated) {
        loadProfiles();
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, isAuthLoading]);

  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      const profileList = await ProfileService.getProfiles();
      setProfiles(profileList);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = () => {
    setShowWizard(true);
  };

  const loadDemoProfiles = async () => {
    try {
      const demoProfiles = demoDataService.getDemoProfiles();
      
      for (const demoData of demoProfiles) {
        await ProfileService.createProfile(demoData);
      }
      await loadProfiles();
    } catch (error) {
      console.error('Error loading demo profiles:', error);
    }
  };

  const handleWizardComplete = (profile: Profile) => {
    setProfiles(prev => [...prev, profile]);
    setShowWizard(false);
  };

  const handleWizardCancel = () => {
    setShowWizard(false);
  };

  const handleViewProfile = (profileId: string) => {
    router.push(`/profiles/${profileId}`);
  };

  const handleGenerateTimeline = async (profile: Profile) => {
    router.push(`/timeline?profileId=${profile.id}`);
  };

  if (showWizard) {
    return (
      <ProfileWizard
        onComplete={handleWizardComplete}
        onCancel={handleWizardCancel}
        initialData={{}}
      />
    );
  }

  const renderContent = () => {
    if (isLoading || isAuthLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-xxl)',
          textAlign: 'center',
          minHeight: '50vh'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-secondary)',
            borderTop: '3px solid var(--accent-blue)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: 'var(--spacing-md)'
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading profiles...</p>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <AuthRequiredMessage />;
    }

    if (profiles.length === 0) {
      return (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-xxl)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--border-radius-xl)',
          margin: 'var(--spacing-xl) auto',
          maxWidth: '600px'
        }}>
          <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }} />
          <h2 style={{
            fontSize: '2rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-md)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>No Client Profiles Yet</h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: 'var(--spacing-xl)',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Create your first client profile to start building comprehensive business intelligence and AI transformation roadmaps. Your profiles will be securely stored in your cloud account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              className="btn btn-primary btn-large"
              onClick={handleCreateProfile}
            >
              Create Your First Profile
            </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={loadDemoProfiles}
            >
              <BarChart size={20} style={{ marginRight: '0.5rem' }} /> Load Demo Profiles
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: 'var(--spacing-xl)',
        marginBottom: 'var(--spacing-xxl)'
      }}>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onView={() => handleViewProfile(profile.id)}
            onGenerateTimeline={() => handleGenerateTimeline(profile)}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-lg)'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>Client Profiles</h1>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              color: 'var(--text-secondary)'
            }}>
              {isAuthenticated ? 
                `Welcome back, ${user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}! Manage your client intelligence.` :
                'Manage your client intelligence and AI transformation roadmaps'
              }
            </p>
          </div>
          
          {isAuthenticated && (
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              <button 
                className="btn btn-primary"
                onClick={handleCreateProfile}
              >
                <Plus size={18} />
                New Profile
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}