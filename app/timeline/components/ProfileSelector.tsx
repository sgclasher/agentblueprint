'use client';

import React, { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import styles from './ProfileSelector.module.css';
import { ProfileService } from '../../services/profileService';
import { Profile } from '../../services/types';

interface ProfileSelectorProps {
  selectedProfileId: string | null;
  onProfileSelect: (profile: Profile | null) => void;
  disabled?: boolean;
}

const ProfileSelector: FC<ProfileSelectorProps> = ({ 
  selectedProfileId, 
  onProfileSelect, 
  disabled = false 
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const userProfiles = await ProfileService.getProfiles();
        setProfiles(userProfiles);
        
        // If there's a selectedProfileId but no matching profile, clear selection
        if (selectedProfileId && !userProfiles.find(p => p.id === selectedProfileId)) {
          onProfileSelect(null);
        }
      } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load profiles';
        setError(errorMessage);
        console.error('Error fetching profiles:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [selectedProfileId, onProfileSelect]);

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const profileId = event.target.value;
    
    if (profileId === '') {
      onProfileSelect(null);
    } else {
      const selectedProfile = profiles.find(p => p.id === profileId);
      if (selectedProfile) {
        onProfileSelect(selectedProfile);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.profileSelector}>
        <label className={styles.label}>Client Profile</label>
        <div className={styles.loading}>Loading profiles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.profileSelector}>
        <label className={styles.label}>Client Profile</label>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className={styles.profileSelector}>
        <label className={styles.label}>Client Profile</label>
        <div className={styles.noProfiles}>
          No profiles found. <Link href="/profiles" className={styles.createLink}>Create a profile</Link> to get started.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileSelector}>
      <label htmlFor="profile-select" className={styles.label}>
        Client Profile
      </label>
      <select
        id="profile-select"
        value={selectedProfileId || ''}
        onChange={handleProfileChange}
        disabled={disabled}
        className={styles.select}
      >
        <option value="">Select a profile...</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.companyName || 'Unnamed Profile'}
            {profile.industry ? ` (${profile.industry})` : ''}
          </option>
        ))}
      </select>
      {selectedProfileId && (
        <div className={styles.selectedInfo}>
          {profiles.find(p => p.id === selectedProfileId)?.companyName || 'Selected Profile'}
        </div>
      )}
    </div>
  );
};

export default ProfileSelector; 