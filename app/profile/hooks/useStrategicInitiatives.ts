import { useCallback } from 'react';
import { Profile, StrategicInitiative } from '../../services/types';

export const useStrategicInitiatives = (profile: Profile | null, updateProfile: (path: string, value: any) => void) => {
  const addStrategicInitiative = useCallback(() => {
    if (!profile) return;
    
    const currentInitiatives = profile.strategicInitiatives || [];
    const newInitiative: StrategicInitiative = {
      initiative: '',
      contact: {
        name: '',
        title: '',
        email: '',
        linkedin: '',
        phone: ''
      },
      businessProblems: [],
      expectedOutcomes: [],
      successMetrics: [],
      priority: 'Medium' as const,
      status: 'Planning' as const,
      targetTimeline: '',
      estimatedBudget: ''
    };
    updateProfile('strategicInitiatives', [...currentInitiatives, newInitiative]);
  }, [profile, updateProfile]);

  const removeStrategicInitiative = useCallback((index: number) => {
    if (!profile) return;
    
    const currentInitiatives = profile.strategicInitiatives || [];
    updateProfile('strategicInitiatives', currentInitiatives.filter((_, i) => i !== index));
  }, [profile, updateProfile]);

  const updateStrategicInitiative = useCallback((index: number, field: string, value: any) => {
    if (!profile) return;
    
    const currentInitiatives = profile.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    
    if (field.startsWith('contact.')) {
      const contactField = field.replace('contact.', '');
      updatedInitiatives[index] = {
        ...updatedInitiatives[index],
        contact: {
          ...updatedInitiatives[index].contact,
          [contactField]: value
        }
      };
    } else {
      updatedInitiatives[index] = {
        ...updatedInitiatives[index],
        [field]: value
      };
    }
    updateProfile('strategicInitiatives', updatedInitiatives);
  }, [profile, updateProfile]);

  const addArrayItem = useCallback((initiativeIndex: number, arrayField: 'businessProblems' | 'expectedOutcomes' | 'successMetrics') => {
    if (!profile) return;
    
    const currentInitiatives = profile.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentArray = (updatedInitiatives[initiativeIndex][arrayField] || []) as string[];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      [arrayField]: [...currentArray, '']
    };
    updateProfile('strategicInitiatives', updatedInitiatives);
  }, [profile, updateProfile]);

  const removeArrayItem = useCallback((initiativeIndex: number, arrayField: 'businessProblems' | 'expectedOutcomes' | 'successMetrics', itemIndex: number) => {
    if (!profile) return;
    
    const currentInitiatives = profile.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentArray = (updatedInitiatives[initiativeIndex][arrayField] || []) as string[];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      [arrayField]: currentArray.filter((_, i) => i !== itemIndex)
    };
    updateProfile('strategicInitiatives', updatedInitiatives);
  }, [profile, updateProfile]);

  const updateArrayItem = useCallback((initiativeIndex: number, arrayField: 'businessProblems' | 'expectedOutcomes' | 'successMetrics', itemIndex: number, value: string) => {
    if (!profile) return;
    
    const currentInitiatives = profile.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentArray = [...((updatedInitiatives[initiativeIndex][arrayField] || []) as string[])];
    currentArray[itemIndex] = value;
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      [arrayField]: currentArray
    };
    updateProfile('strategicInitiatives', updatedInitiatives);
  }, [profile, updateProfile]);

  return {
    addStrategicInitiative,
    removeStrategicInitiative,
    updateStrategicInitiative,
    addArrayItem,
    removeArrayItem,
    updateArrayItem
  };
}; 