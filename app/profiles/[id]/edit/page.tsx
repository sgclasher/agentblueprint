'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProfileService } from '../../../services/profileService';
import ProfileWizard from '../../components/ProfileWizard';
import GlobalHeader from '../../../components/GlobalHeader';
import { Profile } from '../../../services/types';

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.id as string;
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      // Get the current user's profile instead of trying to get by ID
      const profileData = await ProfileService.getCurrentUserProfile();
      
      if (!profileData) {
        setError('Profile not found for current user');
        return;
      }
      
      setProfile(profileData);
    } catch (error: any) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleComplete = (updatedProfile: Profile) => {
    router.push(`/profiles/${updatedProfile.id}`);
  };

  const handleCancel = () => {
    router.push(`/profiles/${profileId}`);
  };

  const handleSave = (savedProfile: Profile) => {
    setProfile(savedProfile);
    // Show a brief success message or feedback
    const message = document.createElement('div');
    message.textContent = 'Profile saved successfully!';
    message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: var(--accent-green); color: white; padding: 12px 20px; border-radius: 8px; z-index: 9999; font-weight: 500;';
    document.body.appendChild(message);
    setTimeout(() => document.body.removeChild(message), 3000);
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-secondary)'
        }}>
          <div className="loading-spinner"></div>
          <p style={{ marginLeft: 'var(--spacing-md)' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--accent-red)', marginBottom: 'var(--spacing-md)' }}>Error</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/profiles')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'var(--btn-primary-bg)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer'
            }}
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--accent-red)', marginBottom: 'var(--spacing-md)' }}>Profile Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>The requested profile could not be found.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/profiles')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'var(--btn-primary-bg)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer'
            }}
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <GlobalHeader />
      <ProfileWizard
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialData={profile}
        isEditMode={true}
        onSave={handleSave}
      />
    </div>
  );
} 