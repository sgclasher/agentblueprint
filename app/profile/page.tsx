'use client';

import React, { useState, useEffect, FC, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../components/GlobalHeader';
import useAuthStore from '../store/useAuthStore';
import ProfileWizard from '../profiles/components/ProfileWizard';
import { Profile } from '../services/types';
import { 
  User, Mail, Calendar, Shield, Settings, Database, LogOut, Edit, Save, X,
  Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap, LucideIcon, TrendingUp, FileEdit, Info, BrainCircuit, Users as ContactsIcon, Code, FileText, Server, Brain, BarChart3, Users, Workflow
} from 'lucide-react';
import styles from '../profiles/[id]/ProfileDetail.module.css';
import { markdownService } from '../services/markdownService';

// Import new tab components
import AIOpportunitiesTab from './components/AIOpportunitiesTab';
import SystemsTab from './components/SystemsTab';
import AnalysisTab from './components/AnalysisTab';
import ContactsTab from './components/ContactsTab';
import AIBlueprintTab from './components/AIBlueprintTab';

// Import custom hooks
import { useStrategicInitiatives } from './hooks/useStrategicInitiatives';
import { useSystemsManagement } from './hooks/useSystemsManagement';

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
    // Use custom hooks for form management (must be called unconditionally)
    const strategicInitiatives = useStrategicInitiatives(profile, updateProfile);
    const systemsManagement = useSystemsManagement(profile, updateProfile);
    
    if (!profile) return null;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateProfile(e.target.name, e.target.value);
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.overviewGrid}>
                {/* Company Information Card */}
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

                {/* Strategic Initiatives Card */}
                <div className={styles.infoCard}>
                    <h3>Strategic Initiatives {isEditing && profile.strategicInitiatives && `(${profile.strategicInitiatives.length})`}</h3>
                    {isEditing ? (
                        <div>
                            {(profile.strategicInitiatives || []).map((initiative, index) => (
                                <div key={index} style={{
                                    border: '1px solid var(--border-primary)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    background: 'var(--bg-secondary)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Initiative {index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => strategicInitiatives.removeStrategicInitiative(index)}
                                            style={{
                                                background: 'var(--accent-red)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div>
                                            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                Initiative Name
                                            </label>
                                            <input
                                                type="text"
                                                className={styles.editableInput}
                                                value={initiative.initiative}
                                                onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'initiative', e.target.value)}
                                                placeholder="e.g., Digital Transformation Program"
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Priority
                                                </label>
                                                <select
                                                    className={styles.editableSelect}
                                                    value={initiative.priority || 'Medium'}
                                                    onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'priority', e.target.value)}
                                                >
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Status
                                                </label>
                                                <select
                                                    className={styles.editableSelect}
                                                    value={initiative.status || 'Planning'}
                                                    onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'status', e.target.value)}
                                                >
                                                    <option value="Planning">Planning</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="On Hold">On Hold</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', padding: '0.75rem' }}>
                                            <h5 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Contact Information</h5>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                <div>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Name</label>
                                                    <input
                                                        type="text"
                                                        className={styles.editableInput}
                                                        value={initiative.contact?.name || ''}
                                                        onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'contact.name', e.target.value)}
                                                        placeholder="Contact name"
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Title</label>
                                                    <input
                                                        type="text"
                                                        className={styles.editableInput}
                                                        value={initiative.contact?.title || ''}
                                                        onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'contact.title', e.target.value)}
                                                        placeholder="Job title"
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email</label>
                                                    <input
                                                        type="email"
                                                        className={styles.editableInput}
                                                        value={initiative.contact?.email || ''}
                                                        onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'contact.email', e.target.value)}
                                                        placeholder="email@company.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone</label>
                                                    <input
                                                        type="text"
                                                        className={styles.editableInput}
                                                        value={initiative.contact?.phone || ''}
                                                        onChange={(e) => strategicInitiatives.updateStrategicInitiative(index, 'contact.phone', e.target.value)}
                                                        placeholder="Phone number"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Problems */}
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Business Problems
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => strategicInitiatives.addArrayItem(index, 'businessProblems')}
                                                    style={{
                                                        background: 'var(--accent-blue)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '0.25rem 0.5rem',
                                                        fontSize: '0.8rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    + Add Problem
                                                </button>
                                            </div>
                                            {(initiative.businessProblems || []).map((problem, pIndex) => (
                                                <div key={pIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <input
                                                        type="text"
                                                        className={styles.editableInput}
                                                        value={problem}
                                                        onChange={(e) => strategicInitiatives.updateArrayItem(index, 'businessProblems', pIndex, e.target.value)}
                                                        placeholder="Describe a business problem"
                                                        style={{ flex: 1 }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => strategicInitiatives.removeArrayItem(index, 'businessProblems', pIndex)}
                                                        style={{
                                                            background: 'var(--accent-red)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            padding: '0.5rem',
                                                            cursor: 'pointer',
                                                            minWidth: '32px'
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <button
                                type="button"
                                onClick={strategicInitiatives.addStrategicInitiative}
                                style={{
                                    background: 'var(--accent-blue)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                + Add Strategic Initiative
                            </button>
                        </div>
                    ) : (
                        <div>
                            {(profile.strategicInitiatives || []).length === 0 ? (
                                <p style={{ color: 'var(--text-muted)' }}>No strategic initiatives defined.</p>
                            ) : (
                                (profile.strategicInitiatives || []).map((initiative, index) => (
                                    <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{initiative.initiative}</h4>
                                        <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            Contact: {initiative.contact?.name || 'N/A'} ({initiative.contact?.title || 'N/A'})
                                        </p>
                                        {initiative.businessProblems && initiative.businessProblems.length > 0 && (
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <small style={{ color: 'var(--text-muted)' }}>Problems: {initiative.businessProblems.length}</small>
                                            </div>
                                        )}
                                        
                                        {/* 🆕 ROI Summary Display */}
                                        {(initiative.processMetrics || initiative.investmentContext) && (
                                            <div style={{ 
                                                marginTop: '0.75rem', 
                                                padding: '1rem', 
                                                background: 'rgba(59, 130, 246, 0.02)', 
                                                borderRadius: '6px',
                                                border: '1px solid rgba(59, 130, 246, 0.08)'
                                            }}>
                                                <div style={{ 
                                                    fontSize: '0.85rem', 
                                                    fontWeight: '600', 
                                                    color: 'var(--text-primary)', 
                                                    marginBottom: '0.75rem',
                                                    paddingBottom: '0.5rem',
                                                    borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
                                                }}>
                                                    💰 ROI Context
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', fontSize: '0.8rem' }}>
                                                    {initiative.processMetrics?.currentCycleTime && (
                                                        <div style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.2rem' }}>Cycle Time</div>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.processMetrics.currentCycleTime}</div>
                                                        </div>
                                                    )}
                                                    {initiative.processMetrics?.currentCost && (
                                                        <div style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.2rem' }}>Cost Level</div>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                                                {initiative.processMetrics.currentCost === 'low' ? 'Low Cost' :
                                                                 initiative.processMetrics.currentCost === 'medium' ? 'Medium Cost' :
                                                                 initiative.processMetrics.currentCost === 'high' ? 'High Cost' :
                                                                 initiative.processMetrics.currentCost === 'very high' ? 'Very High Cost' :
                                                                 initiative.processMetrics.currentCost}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {initiative.investmentContext?.budgetRange && (
                                                        <div style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.2rem' }}>Budget</div>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.investmentContext.budgetRange}</div>
                                                        </div>
                                                    )}
                                                    {initiative.investmentContext?.timeframePreference && (
                                                        <div style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.2rem' }}>Timeline</div>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.investmentContext.timeframePreference}</div>
                                                        </div>
                                                    )}
                                                    {initiative.investmentContext?.implementationReadiness && (
                                                        <div style={{ padding: '0.4rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.2rem' }}>Readiness</div>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.investmentContext.implementationReadiness}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Systems & Applications Card */}
                <div className={styles.infoCard}>
                    <h3>Systems & Applications {isEditing && profile.systemsAndApplications && `(${profile.systemsAndApplications.length})`}</h3>
                    {isEditing ? (
                        <div>
                            {(profile.systemsAndApplications || []).map((system, index) => (
                                <div key={index} style={{
                                    border: '1px solid var(--border-primary)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    background: 'var(--bg-secondary)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem' }}>System {index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => systemsManagement.removeSystemApplication(index)}
                                            style={{
                                                background: 'var(--accent-red)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    System Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className={styles.editableInput}
                                                    value={system.name}
                                                    onChange={(e) => systemsManagement.updateSystemApplication(index, 'name', e.target.value)}
                                                    placeholder="e.g., Salesforce CRM"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Category
                                                </label>
                                                <select
                                                    className={styles.editableSelect}
                                                    value={system.category}
                                                    onChange={(e) => systemsManagement.updateSystemApplication(index, 'category', e.target.value)}
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="CRM">CRM</option>
                                                    <option value="ERP">ERP</option>
                                                    <option value="Cloud Platform">Cloud Platform</option>
                                                    <option value="Database">Database</option>
                                                    <option value="Analytics">Analytics</option>
                                                    <option value="Communication">Communication</option>
                                                    <option value="Security">Security</option>
                                                    <option value="DevOps">DevOps</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Vendor
                                                </label>
                                                <input
                                                    type="text"
                                                    className={styles.editableInput}
                                                    value={system.vendor || ''}
                                                    onChange={(e) => systemsManagement.updateSystemApplication(index, 'vendor', e.target.value)}
                                                    placeholder="e.g., Salesforce"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Version
                                                </label>
                                                <input
                                                    type="text"
                                                    className={styles.editableInput}
                                                    value={system.version || ''}
                                                    onChange={(e) => systemsManagement.updateSystemApplication(index, 'version', e.target.value)}
                                                    placeholder="e.g., Enterprise"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                    Criticality
                                                </label>
                                                <select
                                                    className={styles.editableSelect}
                                                    value={system.criticality || 'Medium'}
                                                    onChange={(e) => systemsManagement.updateSystemApplication(index, 'criticality', e.target.value)}
                                                >
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
                                                Description
                                            </label>
                                            <textarea
                                                className={styles.editableTextarea}
                                                value={system.description || ''}
                                                onChange={(e) => systemsManagement.updateSystemApplication(index, 'description', e.target.value)}
                                                placeholder="Brief description of how this system is used"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <button
                                type="button"
                                onClick={systemsManagement.addSystemApplication}
                                style={{
                                    background: 'var(--accent-blue)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                + Add System/Application
                            </button>
                        </div>
                    ) : (
                        <div>
                            {(profile.systemsAndApplications || []).length === 0 ? (
                                <p style={{ color: 'var(--text-muted)' }}>No systems and applications defined.</p>
                            ) : (
                                (profile.systemsAndApplications || []).map((system, index) => (
                                    <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{system.name}</h4>
                                        <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            {system.category} • {system.vendor || 'N/A'} • {system.criticality || 'Medium'} Priority
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Profile Summary Card */}
                <div className={styles.infoCard}>
                    <h3>Profile Notes</h3>
                    {isEditing ? (
                        <div style={{padding: 'var(--spacing-md)'}}>
                            <label>Additional Notes</label>
                            <textarea
                                name="notes"
                                value={profile.notes || ''}
                                onChange={handleChange}
                                className={styles.editableTextarea}
                                rows={5}
                                placeholder="Add any additional notes about this business profile..."
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
        console.log('🔄 Starting save operation...');
        console.log('📊 Profile data structure:', {
          strategicInitiativesCount: editableProfile.strategicInitiatives?.length || 0,
          hasProcessMetrics: editableProfile.strategicInitiatives?.some(init => init.processMetrics) || false,
          hasInvestmentContext: editableProfile.strategicInitiatives?.some(init => init.investmentContext) || false,
          profileKeys: Object.keys(editableProfile),
        });

        // Check for any potential serialization issues
        try {
          JSON.stringify(editableProfile);
          console.log('✅ Profile data serialization check passed');
        } catch (serializationError) {
          console.error('❌ Profile data serialization failed:', serializationError);
          alert('Error: Profile data contains invalid values that cannot be saved. Please check your input fields.');
          return;
        }

        console.log('📤 Calling updateUserAndProfile...');
        const result = await updateUserAndProfile(
            { full_name: editableUser.displayName },
            editableProfile
        );
        
        console.log('📥 Save result:', result);
        
        if (result.success) {
          console.log('✅ Save completed successfully');
          setIsEditing(false);
        } else {
          console.error('❌ Save failed:', result.error);
          alert(`Failed to save changes: ${result.error}`);
        }
    } catch(error) {
        console.error("💥 Save operation failed:", error);
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
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabNavigation}>
          <button className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`} onClick={() => setActiveTab('overview')}><Info size={16}/> Overview</button>
          <button className={`${styles.tabButton} ${activeTab === 'analysis' ? styles.activeTab : ''}`} onClick={() => setActiveTab('analysis')}><BarChart3 size={16}/> Initiatives</button>
          <button className={`${styles.tabButton} ${activeTab === 'opportunities' ? styles.activeTab : ''}`} onClick={() => setActiveTab('opportunities')}><Brain size={16}/> AI Opportunities</button>
                      <button className={`${styles.tabButton} ${activeTab === 'blueprint' ? styles.activeTab : ''}`} onClick={() => setActiveTab('blueprint')}><Workflow size={16}/> Agent Blueprint</button>
          <button className={`${styles.tabButton} ${activeTab === 'systems' ? styles.activeTab : ''}`} onClick={() => setActiveTab('systems')}><Server size={16}/> Systems</button>
          <button className={`${styles.tabButton} ${activeTab === 'contacts' ? styles.activeTab : ''}`} onClick={() => setActiveTab('contacts')}><Users size={16}/> Contacts</button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'overview' && editableProfile && (
          <ProfileOverviewTab profile={editableProfile} isEditing={isEditing} updateProfile={updateEditableProfile} />
        )}
        {activeTab === 'analysis' && editableProfile && (
          <AnalysisTab profile={editableProfile} isEditing={isEditing} updateProfile={updateEditableProfile} />
        )}
        {activeTab === 'opportunities' && editableProfile && (
          <AIOpportunitiesTab profile={editableProfile} isEditing={isEditing} />
        )}
        {activeTab === 'blueprint' && editableProfile && (
          <AIBlueprintTab profile={editableProfile} isEditing={isEditing} />
        )}
        {activeTab === 'systems' && editableProfile && (
          <SystemsTab profile={editableProfile} isEditing={isEditing} updateProfile={updateEditableProfile} />
        )}
        {activeTab === 'contacts' && editableProfile && (
          <ContactsTab profile={editableProfile} isEditing={isEditing} />
        )}
      </div>
    </div>
  );
}
