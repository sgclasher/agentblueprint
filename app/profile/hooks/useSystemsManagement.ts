import { useCallback } from 'react';
import { Profile, SystemApplication } from '../../services/types';

export const useSystemsManagement = (profile: Profile | null, updateProfile: (path: string, value: any) => void) => {
  const addSystemApplication = useCallback(() => {
    if (!profile) return;
    
    const currentSystems = profile.systemsAndApplications || [];
    const newSystem: SystemApplication = {
      name: '',
      category: '',
      vendor: '',
      version: '',
      description: '',
      criticality: 'Medium' as const
    };
    updateProfile('systemsAndApplications', [...currentSystems, newSystem]);
  }, [profile, updateProfile]);

  const removeSystemApplication = useCallback((index: number) => {
    if (!profile) return;
    
    const currentSystems = profile.systemsAndApplications || [];
    updateProfile('systemsAndApplications', currentSystems.filter((_, i) => i !== index));
  }, [profile, updateProfile]);

  const updateSystemApplication = useCallback((index: number, field: string, value: any) => {
    if (!profile) return;
    
    const currentSystems = profile.systemsAndApplications || [];
    const updatedSystems = [...currentSystems];
    updatedSystems[index] = {
      ...updatedSystems[index],
      [field]: value
    };
    updateProfile('systemsAndApplications', updatedSystems);
  }, [profile, updateProfile]);

  return {
    addSystemApplication,
    removeSystemApplication,
    updateSystemApplication
  };
}; 