'use client';

import React, { useState, useEffect, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import GlobalHeader from '../../components/GlobalHeader';
import { ArrowLeft, FileEdit, TrendingUp, Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap, LucideIcon } from 'lucide-react';
import styles from './ProfileDetail.module.css';
import { Profile } from '../../services/types';

type ActiveTab = 'overview' | 'analysis' | 'contacts' | 'systems' | 'opportunities' | 'markdown';

interface ProfileTabProps {
    profile: Profile;
}

const ProfileOverviewTab: FC<ProfileTabProps> = ({ profile }) => {
    return (
        <div className={styles.tabContent}>
          <div className={styles.overviewGrid}>
            <div className={styles.infoCard}>
              <h3>Company Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Company Name</label>
                  <span>{profile.companyName}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Industry</label>
                  <span>{profile.industry}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Employee Count</label>
                  <span>{profile.employeeCount || 'Not specified'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Annual Revenue</label>
                  <span>{profile.annualRevenue || 'Not specified'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Primary Location</label>
                  <span>{profile.primaryLocation || 'Not specified'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Website</label>
                  <span>
                    {profile.websiteUrl ? (
                      <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>
                        {profile.websiteUrl}
                      </a>
                    ) : 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
    
              <div className={styles.infoCard}>
              <h3>Profile Summary</h3>
              <div style={{ padding: 'var(--spacing-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Strategic Initiatives</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {profile.strategicInitiatives?.length || 0} initiative{(profile.strategicInitiatives?.length || 0) === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Business Problems</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {(() => {
                        const totalProblems = (profile.strategicInitiatives || [])
                          .reduce((total: number, initiative: any) => 
                            total + (initiative.businessProblems?.length || 0), 0);
                        return `${totalProblems} problem${totalProblems === 1 ? '' : 's'}`;
                      })()}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Key Contacts</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {(() => {
                        const contactCount = (profile.strategicInitiatives || [])
                          .filter((initiative: any) => initiative.contact?.name).length;
                        return `${contactCount} contact${contactCount === 1 ? '' : 's'}`;
                      })()}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Systems & Apps</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {profile.systemsAndApplications?.length || 0} system{(profile.systemsAndApplications?.length || 0) === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Profile Status</label>
                    <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {(profile.status || 'draft').charAt(0).toUpperCase() + (profile.status || 'draft').slice(1)}
                    </p>
                  </div>
                </div>
                
                {profile.notes && (
                  <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-secondary)' }}>
                    <label style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Notes</label>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                      {profile.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
}

const ProfileAnalysisTab: FC<ProfileTabProps> = ({ profile }) => {
    return (
        <div className={styles.tabContent}>
          <div className={styles.analysisSections}>
            {profile.strategicInitiatives && profile.strategicInitiatives.length > 0 ? (
              <div className={styles.analysisCard}>
                <h3>Strategic Initiatives & Business Problems</h3>
                <div className={styles.initiativesList}>
                  {profile.strategicInitiatives.map((initiative: any, index: number) => (
                    <div key={index} style={{ 
                      background: 'var(--bg-secondary)', 
                      border: '1px solid var(--border-primary)', 
                      borderRadius: 'var(--border-radius-lg)', 
                      padding: 'var(--spacing-lg)',
                      marginBottom: 'var(--spacing-lg)'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-md)'
                      }}>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '1.25rem', 
                          color: 'var(--text-primary)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}>
                          {initiative.initiative || `Initiative ${index + 1}`}
                        </h4>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                          {initiative.priority && (
                            <span style={{
                              background: initiative.priority === 'High' ? 'var(--accent-red)' : 
                                         initiative.priority === 'Medium' ? 'var(--accent-yellow)' : 'var(--accent-blue)',
                              color: 'white',
                              borderRadius: 'var(--border-radius)',
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              {initiative.priority === 'High' ? '🔥' : initiative.priority === 'Medium' ? '⚡' : '📋'} {initiative.priority}
                            </span>
                          )}
                          {initiative.status && (
                            <span style={{
                              background: initiative.status === 'Completed' ? 'var(--accent-green)' : 
                                         initiative.status === 'In Progress' ? 'var(--accent-blue)' : 
                                         initiative.status === 'Planning' ? 'var(--accent-yellow)' : 'var(--text-secondary)',
                              color: 'white',
                              borderRadius: 'var(--border-radius)',
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              {initiative.status === 'Completed' ? '✅' : 
                               initiative.status === 'In Progress' ? '🚀' : 
                               initiative.status === 'Planning' ? '📝' : 
                               initiative.status === 'On Hold' ? '⏸️' : ''} {initiative.status}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Timeline and Budget Information */}
                      {(initiative.targetTimeline || initiative.estimatedBudget) && (
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                          gap: 'var(--spacing-md)',
                          marginBottom: 'var(--spacing-lg)',
                          padding: 'var(--spacing-md)',
                          background: 'var(--bg-primary)',
                          borderRadius: 'var(--border-radius)',
                          border: '1px solid var(--border-secondary)'
                        }}>
                          {initiative.targetTimeline && (
                            <div>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>🗓️ Timeline: </span>
                              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{initiative.targetTimeline}</span>
                            </div>
                          )}
                          {initiative.estimatedBudget && (
                            <div>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>💰 Budget: </span>
                              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{initiative.estimatedBudget}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Business Problems Section */}
                      {initiative.businessProblems && initiative.businessProblems.length > 0 ? (
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                          <h5 style={{ 
                            fontSize: '1rem', 
                            fontWeight: '600', 
                            color: 'var(--text-primary)', 
                            marginBottom: 'var(--spacing-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                          }}>
                            🚨 Business Problems ({initiative.businessProblems.length})
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {initiative.businessProblems.map((problem: string, problemIndex: number) => (
                              <div 
                                key={problemIndex}
                                style={{
                                  background: 'var(--accent-red-bg, rgba(239, 68, 68, 0.05))',
                                  border: '1px solid var(--accent-red-border, rgba(239, 68, 68, 0.2))',
                                  borderRadius: 'var(--border-radius)',
                                  padding: 'var(--spacing-md)',
                                  position: 'relative'
                                }}
                              >
                                <div style={{
                                  position: 'absolute',
                                  top: 'var(--spacing-sm)',
                                  right: 'var(--spacing-sm)',
                                  background: 'var(--accent-red)',
                                  color: 'white',
                                  borderRadius: 'var(--border-radius-full)',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 'var(--font-weight-bold)'
                                }}>
                                  {problemIndex + 1}
                                </div>
                                <p style={{
                                  margin: 0,
                                  color: 'var(--text-primary)',
                                  fontSize: '0.95rem',
                                  lineHeight: '1.5',
                                  paddingRight: 'var(--spacing-lg)'
                                }}>
                                  {problem}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div style={{ 
                          marginBottom: 'var(--spacing-lg)',
                          padding: 'var(--spacing-md)',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-secondary)',
                          borderRadius: 'var(--border-radius)',
                          textAlign: 'center'
                        }}>
                          <p style={{ 
                            margin: 0, 
                            color: 'var(--text-secondary)', 
                            fontStyle: 'italic',
                            fontSize: '0.9rem'
                          }}>
                            No business problems identified for this initiative yet.
                          </p>
                        </div>
                      )}

                      {/* Expected Outcomes Section */}
                      {initiative.expectedOutcomes && initiative.expectedOutcomes.length > 0 ? (
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                          <h5 style={{ 
                            fontSize: '1rem', 
                            fontWeight: '600', 
                            color: 'var(--text-primary)', 
                            marginBottom: 'var(--spacing-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                          }}>
                            🎯 Expected Outcomes ({initiative.expectedOutcomes.length})
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {initiative.expectedOutcomes.map((outcome: string, outcomeIndex: number) => (
                              <div 
                                key={outcomeIndex}
                                style={{
                                  background: 'var(--accent-blue-bg, rgba(59, 130, 246, 0.05))',
                                  border: '1px solid var(--accent-blue-border, rgba(59, 130, 246, 0.2))',
                                  borderRadius: 'var(--border-radius)',
                                  padding: 'var(--spacing-md)',
                                  position: 'relative'
                                }}
                              >
                                <div style={{
                                  position: 'absolute',
                                  top: 'var(--spacing-sm)',
                                  right: 'var(--spacing-sm)',
                                  background: 'var(--accent-blue)',
                                  color: 'white',
                                  borderRadius: 'var(--border-radius-full)',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 'var(--font-weight-bold)'
                                }}>
                                  {outcomeIndex + 1}
                                </div>
                                <p style={{
                                  margin: 0,
                                  color: 'var(--text-primary)',
                                  fontSize: '0.95rem',
                                  lineHeight: '1.5',
                                  paddingRight: 'var(--spacing-lg)'
                                }}>
                                  {outcome}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* Success Metrics Section */}
                      {initiative.successMetrics && initiative.successMetrics.length > 0 ? (
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                          <h5 style={{ 
                            fontSize: '1rem', 
                            fontWeight: '600', 
                            color: 'var(--text-primary)', 
                            marginBottom: 'var(--spacing-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                          }}>
                            📈 Success Metrics ({initiative.successMetrics.length})
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {initiative.successMetrics.map((metric: string, metricIndex: number) => (
                              <div 
                                key={metricIndex}
                                style={{
                                  background: 'var(--accent-purple-bg, rgba(139, 92, 246, 0.05))',
                                  border: '1px solid var(--accent-purple-border, rgba(139, 92, 246, 0.2))',
                                  borderRadius: 'var(--border-radius)',
                                  padding: 'var(--spacing-md)',
                                  position: 'relative'
                                }}
                              >
                                <div style={{
                                  position: 'absolute',
                                  top: 'var(--spacing-sm)',
                                  right: 'var(--spacing-sm)',
                                  background: 'var(--accent-purple, #8b5cf6)',
                                  color: 'white',
                                  borderRadius: 'var(--border-radius-full)',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 'var(--font-weight-bold)'
                                }}>
                                  {metricIndex + 1}
                                </div>
                                <p style={{
                                  margin: 0,
                                  color: 'var(--text-primary)',
                                  fontSize: '0.95rem',
                                  lineHeight: '1.5',
                                  paddingRight: 'var(--spacing-lg)'
                                }}>
                                  {metric}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* Contact Information Summary */}
                      {initiative.contact?.name && (
                        <div style={{ 
                          paddingTop: 'var(--spacing-md)', 
                          borderTop: '1px solid var(--border-secondary)' 
                        }}>
                          <h5 style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: '600', 
                            color: 'var(--text-secondary)', 
                            marginBottom: 'var(--spacing-sm)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Initiative Lead
                          </h5>
                          <p style={{ 
                            margin: 0, 
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem'
                          }}>
                          <strong>{initiative.contact.name}</strong>
                            {initiative.contact.title && ` • ${initiative.contact.title}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.analysisCard}>
                <h3>Strategic Initiatives & Business Problems</h3>
                <div style={{
                  padding: 'var(--spacing-xl)',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)', opacity: 0.5 }}>📊</div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
                    No Strategic Initiatives Yet
                  </h4>
                  <p>Add strategic initiatives with their associated business problems by editing this profile to see detailed analysis here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

const ProfileContactsTab: FC<ProfileTabProps> = ({ profile }) => {
    const contactsWithInitiatives = (profile.strategicInitiatives || [])
      .map((initiative: any, index: number) => ({
        ...initiative.contact,
        initiatives: [{ name: initiative.initiative || `Initiative ${index + 1}`, index }]
      }))
      .filter((contact: any) => contact.name);

    // Group contacts by name (in case same person leads multiple initiatives)
    const groupedContacts = contactsWithInitiatives.reduce((acc: any[], contact: any) => {
      const existing = acc.find(c => c.name === contact.name && c.email === contact.email);
      if (existing) {
        existing.initiatives.push(...contact.initiatives);
      } else {
        acc.push(contact);
      }
      return acc;
    }, []);

    return (
        <div className={styles.tabContent}>
          <div className={styles.analysisSections}>
            {groupedContacts.length > 0 ? (
              <div className={styles.analysisCard}>
                <h3>Strategic Initiative Contacts ({groupedContacts.length})</h3>
                <div className={styles.contactsGrid}>
                  {groupedContacts.map((contact: any, index: number) => (
                      <div key={index} className={styles.contactCard}>
                      <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <h4 style={{ 
                          margin: '0 0 var(--spacing-xs) 0',
                          fontSize: '1.25rem',
                          color: 'var(--text-primary)'
                        }}>
                          {contact.name}
                        </h4>
                        <p className={styles.contactTitle} style={{ 
                          margin: 0,
                          fontSize: '1rem',
                          color: 'var(--text-secondary)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          {contact.title || 'Title Not Specified'}
                        </p>
                      </div>

                      {/* Related Strategic Initiatives */}
                      <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <h5 style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600', 
                          color: 'var(--text-secondary)', 
                          marginBottom: 'var(--spacing-sm)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Leads {contact.initiatives.length} Initiative{contact.initiatives.length === 1 ? '' : 's'}
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                          {contact.initiatives.map((initiative: any, initIndex: number) => (
                            <span 
                              key={initIndex}
                              style={{
                                padding: '0.5rem 0.75rem',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--border-radius)',
                                fontSize: '0.875rem',
                                color: 'var(--text-primary)',
                                fontWeight: 'var(--font-weight-medium)'
                              }}
                            >
                              {initiative.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className={styles.contactDetails} style={{ 
                        paddingTop: 'var(--spacing-md)', 
                        borderTop: '1px solid var(--border-secondary)' 
                      }}>
                        {contact.email && (
                          <p style={{ margin: '0 0 var(--spacing-sm) 0' }}>
                            <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email:</strong><br />
                            <a href={`mailto:${contact.email}`} style={{ color: 'var(--accent-blue)', fontSize: '0.95rem' }}>
                              {contact.email}
                            </a>
                          </p>
                        )}
                        {contact.phone && (
                          <p style={{ margin: '0 0 var(--spacing-sm) 0' }}>
                            <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Phone:</strong><br />
                            <a href={`tel:${contact.phone}`} style={{ color: 'var(--accent-blue)', fontSize: '0.95rem' }}>
                              {contact.phone}
                            </a>
                          </p>
                        )}
                        {contact.linkedin && (
                          <p style={{ margin: '0 0 var(--spacing-sm) 0' }}>
                            <strong style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>LinkedIn:</strong><br />
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', fontSize: '0.95rem' }}>
                              View Profile
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.analysisCard}>
                <h3>Strategic Initiative Contacts</h3>
                <div style={{
                  padding: 'var(--spacing-xl)',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)', opacity: 0.5 }}>👥</div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
                    No Contacts Available
                  </h4>
                  <p style={{ maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
                    Add strategic initiatives with contact information by editing this profile to see key stakeholder details here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

const ProfileSystemsTab: FC<ProfileTabProps> = ({ profile }) => {
    const systemsByCategory = (profile.systemsAndApplications || []).reduce((acc: any, system: any) => {
        const category = system.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(system);
        return acc;
    }, {});

    const categories = Object.keys(systemsByCategory).sort();

    return (
        <div className={styles.tabContent}>
          <div className={styles.analysisSections}>
            {profile.systemsAndApplications && profile.systemsAndApplications.length > 0 ? (
              <div className={styles.analysisCard}>
                <h3>Systems & Applications ({profile.systemsAndApplications.length})</h3>
                
                {categories.map((category) => (
                  <div key={category} style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)', 
                      marginBottom: 'var(--spacing-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      paddingBottom: 'var(--spacing-sm)',
                      borderBottom: '1px solid var(--border-primary)'
                    }}>
                      {category === 'CRM' ? '🤝' : 
                       category === 'ERP' ? '🏭' : 
                       category === 'Cloud Platform' ? '☁️' : 
                       category === 'Database' ? '🗄️' : 
                       category === 'Analytics' ? '📊' : 
                       category === 'Communication' ? '💬' : 
                       category === 'Security' ? '🔒' : 
                       category === 'DevOps' ? '⚙️' : '📱'} {category} ({systemsByCategory[category].length})
                    </h4>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                      gap: 'var(--spacing-lg)' 
                    }}>
                      {systemsByCategory[category].map((system: any, index: number) => (
                        <div 
                          key={index}
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: 'var(--border-radius-lg)',
                            padding: 'var(--spacing-lg)',
                            position: 'relative'
                          }}
                        >
                          {/* Criticality Badge */}
                          {system.criticality && (
                            <div style={{
                              position: 'absolute',
                              top: 'var(--spacing-md)',
                              right: 'var(--spacing-md)',
                              background: system.criticality === 'High' ? 'var(--accent-red)' : 
                                         system.criticality === 'Medium' ? 'var(--accent-yellow)' : 'var(--accent-blue)',
                              color: 'white',
                              borderRadius: 'var(--border-radius)',
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              {system.criticality === 'High' ? '🔥' : 
                               system.criticality === 'Medium' ? '⚡' : '📋'} {system.criticality}
                            </div>
                          )}

                          <h5 style={{ 
                            margin: '0 0 var(--spacing-md) 0',
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            fontWeight: 'var(--font-weight-semibold)',
                            paddingRight: system.criticality ? 'var(--spacing-xxl)' : '0'
                          }}>
                            {system.name || 'Unnamed System'}
                          </h5>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {system.vendor && (
                              <div>
                                <span style={{ 
                                  color: 'var(--text-secondary)', 
                                  fontSize: '0.8rem', 
                                  fontWeight: '600',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em'
                                }}>Vendor: </span>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{system.vendor}</span>
                              </div>
                            )}
                            
                            {system.version && (
                              <div>
                                <span style={{ 
                                  color: 'var(--text-secondary)', 
                                  fontSize: '0.8rem', 
                                  fontWeight: '600',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em'
                                }}>Version: </span>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{system.version}</span>
                              </div>
                            )}
                            
                            {system.description && (
                              <div style={{ marginTop: 'var(--spacing-sm)' }}>
                                <span style={{ 
                                  color: 'var(--text-secondary)', 
                                  fontSize: '0.8rem', 
                                  fontWeight: '600',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  display: 'block',
                                  marginBottom: 'var(--spacing-xs)'
                                }}>Description:</span>
                                <p style={{ 
                                  margin: 0, 
                                  color: 'var(--text-primary)', 
                                  fontSize: '0.9rem',
                                  lineHeight: '1.5',
                                  fontStyle: 'italic'
                                }}>
                                  {system.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.analysisCard}>
                <h3>Systems & Applications</h3>
                <div style={{
                  padding: 'var(--spacing-xl)',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)', opacity: 0.5 }}>💻</div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
                    No Systems & Applications Yet
                  </h4>
                  <p style={{ maxWidth: '500px', margin: '0 auto', lineHeight: '1.5' }}>
                    Add systems and applications used by this client by editing the profile to see a comprehensive technology overview here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

const ProfileOpportunitiesTab: FC<ProfileTabProps> = ({ profile }) => {
    return (
      <div className={styles.tabContent}>
        <div className={styles.opportunitiesPlaceholder}>
          <h3>AI Opportunity Analysis</h3>
          <div style={{
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--border-radius-lg)',
            margin: 'var(--spacing-lg) 0'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: 'var(--spacing-lg)',
              opacity: 0.5 
            }}>🤖</div>
            <h4 style={{ 
              color: 'var(--text-primary)', 
              marginBottom: 'var(--spacing-md)',
              fontSize: '1.5rem'
            }}>AI Opportunities Coming Soon</h4>
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-lg) auto'
            }}>
              This section will analyze your company's strategic initiatives and profile information to identify specific AI transformation opportunities tailored to your business context.
            </p>
            <div style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--border-radius)',
              padding: 'var(--spacing-md)',
              margin: 'var(--spacing-lg) auto',
              maxWidth: '500px'
            }}>
              <h5 style={{ 
                color: 'var(--text-primary)', 
                marginBottom: 'var(--spacing-sm)',
                fontSize: '1.1rem'
              }}>What we'll analyze:</h5>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--text-secondary)',
                paddingLeft: 'var(--spacing-lg)'
              }}>
                <li>Strategic initiatives and business priorities</li>
                <li>Industry-specific AI use cases</li>
                <li>Company size and resource considerations</li>
                <li>Potential ROI and implementation roadmap</li>
              </ul>
            </div>
          </div>
        </div>

        {profile.strategicInitiatives && profile.strategicInitiatives.length > 0 && (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-lg)'
          }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>
              Current Strategic Context
            </h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
              Based on your {profile.strategicInitiatives.length} strategic initiative{profile.strategicInitiatives.length === 1 ? '' : 's'}, we'll identify AI opportunities that align with your business priorities.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
              {profile.strategicInitiatives.map((initiative: any, index: number) => (
                <span 
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {initiative.initiative || `Initiative ${index + 1}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

const ProfileMarkdownTab: FC<ProfileTabProps> = ({ profile }) => {
    const markdown = profile.markdown || markdownService.generateMarkdown(profile);
  
    return (
      <div className={styles.tabContent}>
        <div className={styles.markdownContainer}>
          <div className={styles.markdownHeader}>
            <h3>Profile Markdown</h3>
            <button 
              className="btn btn-secondary btn-small"
              onClick={() => navigator.clipboard.writeText(markdown)}
            >
              Copy to Clipboard
            </button>
          </div>
          <pre className={styles.markdownContent}>
            {markdown}
          </pre>
        </div>
      </div>
    );
}

export default function ProfileDetailPage() {
  const params = useParams();
  const profileId = params.id as string;
  const router = useRouter();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

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
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimeline = () => {
    router.push(`/timeline?profileId=${profileId}`);
  };

  const handleEdit = () => {
    router.push(`/profiles/${profileId}/edit`);
  };

  const handleBack = () => {
    router.push('/profiles');
  };

  if (isLoading) {
    return (
      <div className={styles.profilePage}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.profilePage}>
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.profilePage}>
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>The requested profile could not be found.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIndustryIcon = (industry: string): React.ReactNode => {
    const icons: { [key: string]: LucideIcon } = {
      'Technology': Briefcase,
      'Healthcare': Building2,
      'Finance': BarChart,
      'Manufacturing': Building2,
      'Retail': Store,
      'Education': GraduationCap,
      'Real Estate': Home,
      'Transportation': Truck,
      'Energy': Zap,
      'Other': Store
    };
    const Icon = icons[industry] || Store;
    return <Icon size={24} />;
  };

  return (
    <div className={styles.profilePage}>
      <GlobalHeader />
      
      <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <button 
            onClick={handleBack}
            aria-label="Back to Profiles"
            className={`btn btn-secondary ${styles.backButton}`}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className={styles.profileInfo}>
            <div className={styles.profileIcon}>
              {getIndustryIcon(profile.industry)}
            </div>
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
            <button 
              className="btn btn-secondary"
              onClick={handleEdit}
            >
              <FileEdit size={18} />
              Edit Profile
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleGenerateTimeline}
            >
              <TrendingUp size={18} />
              Generate AI Timeline
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'analysis' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'contacts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'systems' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('systems')}
          >
            Systems
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'opportunities' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('opportunities')}
          >
            AI Opportunities
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'markdown' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('markdown')}
          >
            Markdown
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <ProfileOverviewTab profile={profile} />
        )}
        
        {activeTab === 'analysis' && (
          <ProfileAnalysisTab profile={profile} />
        )}
        
        {activeTab === 'contacts' && (
          <ProfileContactsTab profile={profile} />
        )}
        
        {activeTab === 'systems' && (
          <ProfileSystemsTab profile={profile} />
        )}
        
        {activeTab === 'opportunities' && (
          <ProfileOpportunitiesTab profile={profile} />
        )}
        
        {activeTab === 'markdown' && (
          <ProfileMarkdownTab profile={profile} />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <span>Created: {formatDate(profile.createdAt || '')}</span>
          <span>•</span>
          <span>Updated: {formatDate(profile.updatedAt || '')}</span>
          <span>•</span>
          <span>ID: {profile.id}</span>
        </div>
      </div>
    </div>
  );
}
