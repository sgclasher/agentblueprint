'use client';

import React, { useState, FC, ChangeEvent } from 'react';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import { demoDataService } from '../../services/demoDataService';
import StrategicInitiativesForm from './StrategicInitiativesForm';
import ProblemsOpportunitiesForm from './ProblemsOpportunitiesForm';
import CompanyOverviewStep from './steps/CompanyOverviewStep';
import ImpactStep from './steps/ImpactStep';
import SolutionStep from './steps/SolutionStep';
import DecisionStep from './steps/DecisionStep';
import AIAssessmentStep from './steps/AIAssessmentStep';
import SummaryStep from './steps/SummaryStep';
import styles from './ProfileWizard.module.css';
import { Profile } from '../../services/types';

const WIZARD_STEPS = [
  { id: 'company', title: 'Company Overview', icon: '🏢' },
  { id: 'strategic-initiatives', title: 'Strategic Initiatives', icon: '🎯' },
  { id: 'problems', title: 'Problems & Opportunities', icon: '⚠️' },
  { id: 'impact', title: 'Impact Analysis', icon: '💰' },
  { id: 'solution', title: 'Solution Requirements', icon: '🔧' },
  { id: 'decision', title: 'Decision Process', icon: '👥' },
  { id: 'ai-assessment', title: 'AI Opportunities', icon: '🤖' },
  { id: 'summary', title: 'Summary & Next Steps', icon: '📋' }
];

interface ProfileWizardProps {
    onComplete: (profile: Profile) => void;
    onCancel: () => void;
    initialData?: Profile | null;
    isEditMode?: boolean;
}

const ProfileWizard: FC<ProfileWizardProps> = ({ onComplete, onCancel, initialData, isEditMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Profile>(initialData || {
    id: '',
    companyName: '',
    industry: '',
    size: '',
    annualRevenue: '',
    employeeCount: '',
    primaryLocation: '',
    expectedOutcome: {
      strategicInitiatives: [],
      businessObjectives: ''
    },
    problems: {
      businessProblems: [],
      agenticOpportunities: []
    },
    solutions: {
      capabilities: [],
      differentiators: [],
      competitorGaps: []
    },
    value: {
      businessValue: {},
      personalValue: {}
    },
    currentArchitecture: {
      coreSystems: [],
      integrations: '',
      dataQuality: '',
      technicalDebt: '',
      aiReadiness: ''
    },
    valueSellingFramework: {
      businessIssues: [],
      problems: {
        finance: {},
        hr: {},
        it: {},
        customerService: {},
        operations: {}
      },
      impact: {},
      solutionCapabilities: [],
      decisionMakers: {},
      buyingProcess: {},
      risksOfInaction: {}
    },
    aiOpportunityAssessment: {
      currentTechnology: {},
      aiReadinessScore: 5,
      opportunities: [],
      quickWins: [],
      strategicInitiatives: [],
      futureOpportunities: []
    },
    summary: {
      nextSteps: []
    }
  });
  
  const [isGeneratingTimeline, setIsGeneratingTimeline] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);

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
      case 0:
        return {
          isValid: !!(profileData.companyName && profileData.industry && profileData.size),
          requiredFields: ['Company Name', 'Industry', 'Company Size']
        };
      case 1:
        return {
          isValid: !!(profileData.expectedOutcome?.strategicInitiatives && profileData.expectedOutcome.strategicInitiatives.length > 0),
          requiredFields: ['At least one Strategic Initiative']
        };
      case 2:
        return {
          isValid: !!((profileData.problems?.businessProblems && profileData.problems.businessProblems.length > 0) || (profileData.problems?.agenticOpportunities && profileData.problems.agenticOpportunities.length > 0)),
          requiredFields: ['Business Problems or AI Opportunities']
        };
      case 3:
        return {
          isValid: !!getNestedValue(profileData, 'valueSellingFramework.impact.totalAnnualImpact'),
          requiredFields: ['Total Annual Impact']
        };
      case 4:
        return {
          isValid: !!(getNestedValue(profileData, 'valueSellingFramework.solutionCapabilities')?.length > 0),
          requiredFields: ['Solution Capabilities']
        };
      case 5:
        return {
          isValid: !!getNestedValue(profileData, 'valueSellingFramework.decisionMakers.economicBuyer.name'),
          requiredFields: ['Economic Buyer Name']
        };
      case 6:
        return {
          isValid: !!profileData.aiOpportunityAssessment?.aiReadinessScore,
          requiredFields: ['AI Readiness Score']
        };
      case 7:
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

      let profile;
      if (isEditMode && initialData?.id) {
        profile = await ProfileService.updateProfile(initialData.id, profileData);
      } else {
        profile = await ProfileService.createProfile(profileData);
      }
      onComplete(profile);
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} profile:`, error);
    }
  };

  const generateTimelineFromProfile = async () => {
    try {
      setIsGeneratingTimeline(true);
      
      if (!profileData.companyName) {
        alert('Please enter a company name before generating a timeline.');
        return;
      }
      
      await ProfileService.generateTimelineFromProfile(profileData);
      
      if (!profileData.id) {
        window.location.href = `/timeline`;
      } else {
        window.location.href = `/timeline?profileId=${profileData.id}`;
      }
    } catch (error) {
      console.error('Error generating timeline:', error);
      alert(`Failed to generate timeline: ${(error as Error).message}`);
    } finally {
      setIsGeneratingTimeline(false);
    }
  };

  const loadDemoData = (demoType: string) => {
    const demoProfile = demoDataService.getDemoProfile(demoType);
    if(demoProfile) {
        setProfileData(demoProfile);
    }
    setCurrentStep(0);
  };

  const renderCurrentStep = () => {
    const currentStepId = WIZARD_STEPS[currentStep].id;

    switch (currentStepId) {
      case 'company':
        return <CompanyOverviewStep data={profileData} updateData={updateProfileData} />;
      case 'strategic-initiatives':
        return <StrategicInitiativesForm data={profileData} onChange={setProfileData} />;
      case 'problems':
        return <ProblemsOpportunitiesForm data={profileData} onChange={setProfileData} />;
      case 'impact':
        return <ImpactStep data={profileData} updateData={updateProfileData} />;
      case 'solution':
        return <SolutionStep data={profileData} updateData={updateProfileData} onToggle={handleArrayToggle} />;
      case 'decision':
        return <DecisionStep data={profileData} updateData={updateProfileData} />;
      case 'ai-assessment':
        return <AIAssessmentStep data={profileData} updateData={updateProfileData} />;
      case 'summary':
        return <SummaryStep data={profileData} updateData={updateProfileData} onGenerateTimeline={generateTimelineFromProfile} isGenerating={isGeneratingTimeline} />;
      default:
        return null;
    }
  };

  const markdownPreview = showMarkdownPreview ? markdownService.generateMarkdown(profileData) : '';

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
              <h3 style={{
                margin: '0 0 var(--spacing-md) 0',
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>Markdown Preview</h3>
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
              onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.875rem'
              }}
            >
              {showMarkdownPreview ? 'Hide Preview' : 'Show Markdown'}
            </button>
            
                          {!isEditMode && (
                <select 
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => e.target.value && loadDemoData(e.target.value)}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: 'var(--btn-secondary-bg)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)'
                  }}
                >
                  <option value="">Load Demo Data</option>
                  <option value="tech-startup">TechFlow Solutions (SaaS)</option>
                  <option value="manufacturing">PrecisionParts Manufacturing</option>
                  <option value="healthcare">Regional Medical Center</option>
                  <option value="finance">Community Trust Bank</option>
                </select>
              )}
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
                {isEditMode ? 'Update Profile' : 'Create Profile'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileWizard;
