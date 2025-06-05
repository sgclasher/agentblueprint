'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProfileService } from '../../../services/profileService';
import ProfileWizard from '../../components/ProfileWizard';
import GlobalHeader from '../../../components/GlobalHeader';

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.id;
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleComplete = (updatedProfile) => {
    // Navigate back to the profile detail page
    router.push(`/profiles/${updatedProfile.id}`);
  };

  const handleCancel = () => {
    // Navigate back to the profile detail page
    router.push(`/profiles/${profileId}`);
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
      />
    </div>
  );
} 