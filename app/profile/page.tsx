'use client';

import React, { useState, useEffect, FC, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../components/GlobalHeader';
import useAuthStore from '../store/useAuthStore';
import ProfileWizard from '../profiles/components/ProfileWizard';
import { Profile } from '../services/types';
import { 
  User, Mail, Calendar, Shield, Settings, Database, LogOut, Edit, Save, X,
  Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap, LucideIcon, TrendingUp, FileEdit, Info, BrainCircuit, Users as ContactsIcon, Code, FileText, Server, Brain
} from 'lucide-react';
import styles from '../profiles/[id]/ProfileDetail.module.css';
import { markdownService } from '../services/markdownService';

// Import new tab components
import AIOpportunitiesTab from './components/AIOpportunitiesTab';
import SystemsTab from './components/SystemsTab';

// ====================================================================
// Tab Components (Adapted from the old [id]/page.tsx)
// ====================================================================

interface ProfileTabProps {
    profile: Profile;
    isEditing: boolean;
    updateProfile: (path: string, value: any) => void;
}

// NOTE: For this refactoring, we'll only bring over the 'Overview' tab functionality.
// The other tabs (Analysis, Contacts, Systems, etc.) can be brought over
// in the same way if needed, but are omitted here for brevity.

const ProfileOverviewTab: FC<ProfileTabProps> = ({ profile, isEditing, updateProfile }) => {
    if (!profile) return null;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateProfile(e.target.name, e.target.value);
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.overviewGrid}>
                <div className={styles.infoCard}>
                    <h3>Company Information</h3>
                    <div className={styles.infoGrid}>
                        {Object.entries({
                            companyName: 'Company Name',
                            industry: 'Industry',
                            employeeCount: 'Employee Count',
                            annualRevenue: 'Annual Revenue',
                            primaryLocation: 'Primary Location',
                            websiteUrl: 'Website'
                        }).map(([key, label]) => (
                            <div className={styles.infoItem} key={key}>
                                <label>{label}</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name={key}
                                        value={(profile as any)[key] || ''}
                                        onChange={handleChange}
                                        className={styles.editableInput}
                                    />
                                ) : (
                                    <span>{(profile as any)[key] || 'Not specified'}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                 <div className={styles.infoCard}>
                    <h3>Profile Summary</h3>
                    {isEditing ? (
                        <div style={{padding: 'var(--spacing-md)'}}>
                            <label>Notes</label>
                            <textarea
                                name="notes"
                                value={profile.notes || ''}
                                onChange={handleChange}
                                className={styles.editableTextarea}
                                rows={5}
                            />
                        </div>
                    ) : (
                        <div style={{ padding: 'var(--spacing-md)' }}>
                            <p>{profile.notes || 'No additional notes.'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// ====================================================================
// Main Profile Page Component
// ====================================================================

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, signOut, isLoading, updateUserAndProfile, setProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [editableProfile, setEditableProfile] = useState<Profile | null>(null);
  const [editableUser, setEditableUser] = useState({ displayName: '' });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (profile) {
      setEditableProfile(JSON.parse(JSON.stringify(profile)));
    } else {
      setEditableProfile(null);
    }
    if (user) {
      setEditableUser({ displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || '' });
    }
  }, [profile, user]);
  
  const updateEditableProfile = (path: string, value: any) => {
    setEditableProfile(prev => {
        if (!prev) return null;
        const newData = { ...prev };
        (newData as any)[path] = value;
        return newData;
    });
  };

  const handleSave = async () => {
    if (!editableProfile || !editableUser) return;
    
    try {
        await updateUserAndProfile(
            { full_name: editableUser.displayName },
            editableProfile
        );
        setIsEditing(false);
    } catch(error) {
        console.error("Failed to update profile", error);
        alert('Failed to save changes. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    if (profile) setEditableProfile(JSON.parse(JSON.stringify(profile)));
    if (user) setEditableUser({ displayName: user.user_metadata?.full_name || '' });
    setIsEditing(false);
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleProfileCreated = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const handleDebugProfiles = async () => {
    try {
      const { supabase } = await import('../lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Not authenticated');
        return;
      }

      const response = await fetch('/api/debug-profiles', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      });

      const result = await response.json();
      console.log('🔍 [DEBUG] Database state:', result);
      alert(`Debug Results:\n\nProfiles found: ${result.allProfilesCount}\nCheck console for details`);
    } catch (error) {
      console.error('Debug failed:', error);
      alert('Debug failed - check console');
    }
  };
  
  const getIndustryIcon = (industry: string | undefined): React.ReactNode => {
    if (!industry) return <Briefcase size={24} />;
    const icons: { [key: string]: LucideIcon } = {
      'Technology': Briefcase, 'Healthcare': Building2, 'Finance': BarChart,
      'Manufacturing': Building2, 'Retail': Store, 'Education': GraduationCap,
      'Real Estate': Home, 'Transportation': Truck, 'Energy': Zap, 'Other': Store
    };
    const Icon = icons[industry] || Store;
    return <Icon size={24} />;
  };

  if (isLoading || (!isAuthenticated && typeof window !== 'undefined')) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div className="loading-container"><div className="loading-spinner"></div></div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled by useEffect
  }
  
  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          <button className="btn" onClick={handleDebugProfiles} style={{ fontSize: '12px', padding: '4px 8px' }}>
            🔍 Debug DB
          </button>
        </div>
        <ProfileWizard
          onComplete={handleProfileCreated}
          onCancel={() => alert("You'll need to create a profile to use the app's features.")}
          initialData={{
            id: '',
            companyName: '', industry: '', employeeCount: '', annualRevenue: '',
            primaryLocation: '', websiteUrl: '', strategicInitiatives: []
          } as Profile}
        />
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <GlobalHeader />
      
      <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.profileInfo}>
            <div className={styles.profileIcon}>{getIndustryIcon(profile.industry)}</div>
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
            {isEditing ? (
              <>
                <button className="btn btn-secondary" onClick={handleCancelEdit}><X size={18} /> Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}><Save size={18} /> Save Changes</button>
              </>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={() => setIsEditing(true)}><FileEdit size={18} /> Edit Profile</button>
                <button className="btn btn-primary" onClick={() => router.push('/timeline')}><TrendingUp size={18} /> AI Timeline</button>
                <button className="btn" onClick={handleDebugProfiles} style={{marginLeft: '8px'}}>🔍 Debug DB</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabNavigation}>
          <button className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`} onClick={() => setActiveTab('overview')}><Info size={16}/> Overview</button>
          <button className={`${styles.tabButton} ${activeTab === 'opportunities' ? styles.activeTab : ''}`} onClick={() => setActiveTab('opportunities')}><Brain size={16}/> AI Opportunities</button>
          <button className={`${styles.tabButton} ${activeTab === 'systems' ? styles.activeTab : ''}`} onClick={() => setActiveTab('systems')}><Server size={16}/> Systems</button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'overview' && editableProfile && (
          <ProfileOverviewTab profile={editableProfile} isEditing={isEditing} updateProfile={updateEditableProfile} />
        )}
        {activeTab === 'opportunities' && editableProfile && (
          <AIOpportunitiesTab profile={editableProfile} isEditing={isEditing} />
        )}
        {activeTab === 'systems' && editableProfile && (
          <SystemsTab profile={editableProfile} isEditing={isEditing} />
        )}
      </div>
    </div>
  );
}
