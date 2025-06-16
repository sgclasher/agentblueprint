'use client';

import React, { useState, FC, ChangeEvent } from 'react';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import { supabase } from '../../lib/supabase';

import StrategicInitiativesForm from './StrategicInitiativesForm';
import ProblemsOpportunitiesForm from './ProblemsOpportunitiesForm';
import CompanyOverviewStep from './steps/CompanyOverviewStep';
import ImpactStep from './steps/ImpactStep';
import SolutionStep from './steps/SolutionStep';
import DecisionStep from './steps/DecisionStep';
import AIAssessmentStep from './steps/AIAssessmentStep';
import SummaryStep from './steps/SummaryStep';
import MarkdownImportModal from './MarkdownImportModal';
import ExtractionReview from './ExtractionReview';
import styles from './ProfileWizard.module.css';
import { Profile } from '../../services/types';

const WIZARD_STEPS = [
  { id: 'company', title: 'Company Overview', icon: '🏢' },
  { id: 'summary', title: 'Review & Complete', icon: '✅' }
];

interface ProfileWizardProps {
    onComplete: (profile: Profile) => void;
    onCancel: () => void;
    initialData?: Partial<Profile> | null;
    isEditMode?: boolean;
    onSave?: (profile: Profile) => void;
}

const ProfileWizard: FC<ProfileWizardProps> = ({ onComplete, onCancel, initialData, isEditMode = false, onSave }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Partial<Profile>>(initialData || {
    companyName: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    primaryLocation: '',
    websiteUrl: '',
    strategicInitiatives: []
  });
  
  const [isGeneratingTimeline, setIsGeneratingTimeline] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
  const [showMarkdownImport, setShowMarkdownImport] = useState(false);
  const [extractionResult, setExtractionResult] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const updateProfileData = (path: string, value: any) => {
    setProfileData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayToggle = (path: string, value: string) => {
    const currentArray = getNestedValue(profileData, path) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item: string) => item !== value)
      : [...currentArray, value];
    updateProfileData(path, newArray);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const getStepValidationStatus = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Company Overview
        return {
          isValid: !!(profileData.companyName && profileData.industry),
          requiredFields: ['Company Name', 'Industry']
        };
      case 1: // Review & Complete
        return {
          isValid: true,
          requiredFields: []
        };
      default:
        return { isValid: false, requiredFields: [] };
    }
  };

  const handleComplete = async () => {
    try {
      const criticalValidation = getStepValidationStatus(0);
      if (!criticalValidation.isValid) {
        const proceed = window.confirm(
          `You haven't completed the basic company information (${criticalValidation.requiredFields.join(', ')}). Do you want to save the profile anyway?`
        );
        if (!proceed) return;
      }

      // Use the new consolidated save method
      const savedProfile = await ProfileService.saveCurrentUserProfile(profileData);
      onComplete(savedProfile);

    } catch (error) {
      console.error(`Error saving profile:`, error);
    }
  };

  const generateTimelineFromProfile = async () => {
    try {
      setIsGeneratingTimeline(true);
      
      if (!profileData.companyName) {
        alert('Please enter a company name before generating a timeline.');
        return;
      }
      
      // Ensure we have a saved profile with an ID before redirecting
      const savedProfile = await ProfileService.saveCurrentUserProfile(profileData);
      onComplete(savedProfile); // Update state in the parent component

      if (savedProfile.id) {
         window.location.href = `/timeline`; // The timeline page will now get the profile from the auth store
      } else {
         alert('Could not save profile, cannot generate timeline.');
      }

    } catch (error) {
      console.error('Error generating timeline:', error);
      alert(`Failed to generate timeline: ${(error as Error).message}`);
    } finally {
      setIsGeneratingTimeline(false);
    }
  };

  const handleMarkdownImport = async (markdown: string) => {
    try {
      setIsExtracting(true);
      
      // Get the current session for authentication (matches working pattern from timeline components)
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('❌ Authentication failed for markdown import:', sessionError?.message);
        alert('Please sign in to use the markdown import feature.');
        return;
      }

      // Prepare headers with Authorization token (matches working timeline pattern)
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      console.log('📝 Making authenticated markdown import request...');

      const response = await fetch('/api/profiles/extract-markdown', {
        method: 'POST',
        headers,
        body: JSON.stringify({ markdown }),
        credentials: 'same-origin'
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Extraction failed');
      }

      console.log('✅ Markdown extraction successful');
      setExtractionResult(result.extractionResult);
      setShowMarkdownImport(false);
    } catch (error) {
      console.error('❌ Markdown import error:', error);
      alert(`Failed to extract profile data: ${(error as Error).message}`);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleApplyExtractedData = (extractedProfile: Partial<Profile>) => {
    // Merge extracted data with existing profile data
    const mergedData = {
      ...profileData,
      ...extractedProfile,
      // Preserve ID and metadata
      id: profileData.id,
      createdAt: profileData.createdAt,
      updatedAt: profileData.updatedAt
    };

    setProfileData(mergedData);
    setExtractionResult(null);
    
    // Navigate to the first step to review the imported data
    setCurrentStep(0);
  };

  const handleCancelExtraction = () => {
    setExtractionResult(null);
  };

  const renderCurrentStep = () => {
    const currentStepId = WIZARD_STEPS[currentStep].id;

    switch (currentStepId) {
      case 'company':
        return <CompanyOverviewStep data={profileData} updateData={updateProfileData} />;
      case 'summary':
        return <SummaryStep data={profileData} updateData={updateProfileData} onGenerateTimeline={generateTimelineFromProfile} isGenerating={isGeneratingTimeline} />;
      default:
        return null;
    }
  };

  const markdownPreview = showMarkdownPreview ? markdownService.generateMarkdown(profileData as Profile) : '';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-family)'
    }}>
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2rem',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--spacing-lg)'
        }}>{isEditMode ? 'Edit Client Profile' : 'Create Client Profile'}</h1>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-lg)',
            position: 'relative'
          }}>
            {WIZARD_STEPS.map((step, index) => {
              const validation = getStepValidationStatus(index);
              const isCompleted = index < currentStep && validation.isValid;
              const isCurrent = index === currentStep;
              const isIncomplete = index < currentStep && !validation.isValid;
              
              return (
                <div 
                  key={step.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    transition: 'all var(--transition-normal) ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentStep(index)}
                  title={`${step.title}${!validation.isValid && validation.requiredFields.length > 0 ? '\nMissing: ' + validation.requiredFields.join(', ') : ''}`}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--border-radius-full)',
                    background: isCompleted ? 'var(--accent-green)' : 
                               isCurrent ? 'var(--accent-blue)' : 
                               isIncomplete ? 'var(--accent-yellow)' : 'var(--btn-secondary-bg)',
                    border: `2px solid ${isCurrent ? 'var(--accent-blue)' : 
                                        isCompleted ? 'var(--accent-green)' : 
                                        isIncomplete ? 'var(--accent-yellow)' : 'var(--border-primary)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isCompleted ? '1rem' : '1.2rem',
                    color: (isCompleted || isCurrent || isIncomplete) ? 'white' : 'var(--text-secondary)',
                    marginBottom: 'var(--spacing-sm)',
                    transition: 'all var(--transition-normal) ease',
                    cursor: 'pointer',
                    ...(isCurrent && {
                      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)'
                    })
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (!isCurrent) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (!isCurrent) {
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >{isCompleted ? '✓' : step.icon}</div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 'var(--font-weight-medium)',
                  color: (isCompleted || isCurrent || isIncomplete) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textAlign: 'center',
                  maxWidth: '80px',
                  lineHeight: '1.2'
                }}>{step.title}</span>
              </div>
              );
            })}
          </div>
          <div style={{
            height: '4px',
            background: 'var(--border-primary)',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <div 
              style={{ 
                width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%`,
                height: '100%',
                background: 'var(--accent-blue)',
                transition: 'width var(--transition-normal) ease'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        gap: 'var(--spacing-xl)'
      }}>
        <div style={{
          flex: showMarkdownPreview ? '1' : '1',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xl)',
          border: '1px solid var(--border-primary)'
        }}>
          {renderCurrentStep()}
        </div>

        {showMarkdownPreview && (
          <div style={{
            width: '400px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--border-primary)'
          }}>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-md)'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>Markdown Preview</h3>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(markdownPreview);
                      // Show brief success feedback
                      const button = document.activeElement as HTMLButtonElement;
                      const originalText = button.textContent;
                      button.textContent = 'Copied!';
                      button.style.background = 'var(--accent-green)';
                      setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                      }, 2000);
                    } catch (error) {
                      console.error('Failed to copy to clipboard:', error);
                      alert('Failed to copy to clipboard');
                    }
                  }}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.75rem',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)'
                  }}
                >
                  📋 Copy
                </button>
              </div>
              <pre style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--border-radius)',
                padding: 'var(--spacing-md)',
                fontSize: '0.75rem',
                lineHeight: '1.4',
                color: 'var(--text-secondary)',
                overflow: 'auto',
                maxHeight: '400px',
                fontFamily: 'var(--font-family-mono)'
              }}>{markdownPreview}</pre>
            </div>
          </div>
        )}
      </div>

      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderTop: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)',
        position: 'sticky',
        bottom: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--spacing-lg)'
        }}>
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            alignItems: 'center'
          }}>
            <button 
              type="button" 
              onClick={() => setShowMarkdownImport(true)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <span>📄</span> Import from Markdown
            </button>
            
            <button 
              type="button" 
              onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.875rem'
              }}
            >
              {showMarkdownPreview ? 'Hide Preview' : 'Show Markdown'}
            </button>
            
              
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            alignItems: 'center'
          }}>
            <button 
              type="button" 
              onClick={currentStep === 0 ? onCancel : () => setCurrentStep(currentStep - 1)}
              className="btn btn-secondary"
            >
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </button>

            {currentStep < WIZARD_STEPS.length - 1 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleComplete}
                className="btn btn-success"
              >
                {isEditMode ? 'Update Profile' : 'Save Profile'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Markdown Import Modal */}
      <MarkdownImportModal
        isOpen={showMarkdownImport}
        onClose={() => setShowMarkdownImport(false)}
        onImport={handleMarkdownImport}
        isProcessing={isExtracting}
      />

      {/* Extraction Review Modal */}
      {extractionResult && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: 'var(--spacing-xl)'
        }}>
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--border-radius-xl)',
            width: '90%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: 'var(--spacing-xl)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <ExtractionReview
              extractionResult={extractionResult}
              onApply={handleApplyExtractedData}
              onCancel={handleCancelExtraction}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileWizard;
