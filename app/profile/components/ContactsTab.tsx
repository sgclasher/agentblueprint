'use client';

import React, { FC, useMemo } from 'react';
import { Profile, StrategicInitiative } from '../../services/types';
import { 
  Users, User, Mail, Phone, Linkedin, Building2, 
  Calendar, Target, Settings, Search, Filter,
  ExternalLink, MessageCircle, UserCheck
} from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

interface ContactsTabProps {
  profile: Profile;
  isEditing: boolean;
}

interface ContactWithInitiatives {
  contact: StrategicInitiative['contact'];
  initiatives: Array<{
    name: string;
    priority?: string;
    status?: string;
    targetTimeline?: string;
  }>;
}

const ContactsTab: FC<ContactsTabProps> = ({ profile, isEditing }) => {
  const initiatives = useMemo(() => profile.strategicInitiatives || [], [profile.strategicInitiatives]);

  // Extract and deduplicate contacts by email/name
  const contactsWithInitiatives = useMemo(() => {
    const contactMap = new Map<string, ContactWithInitiatives>();

    initiatives.forEach(initiative => {
      if (initiative.contact && initiative.contact.name) {
        // Use email as primary key, fallback to name for deduplication
        const contactKey = initiative.contact.email || initiative.contact.name.toLowerCase();
        
        if (contactMap.has(contactKey)) {
          // Add this initiative to existing contact
          const existing = contactMap.get(contactKey)!;
          existing.initiatives.push({
            name: initiative.initiative,
            priority: initiative.priority,
            status: initiative.status,
            targetTimeline: initiative.targetTimeline
          });
        } else {
          // Create new contact entry
          contactMap.set(contactKey, {
            contact: initiative.contact,
            initiatives: [{
              name: initiative.initiative,
              priority: initiative.priority,
              status: initiative.status,
              targetTimeline: initiative.targetTimeline
            }]
          });
        }
      }
    });

    return Array.from(contactMap.values());
  }, [initiatives]);

  if (isEditing) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.editModeMessage}>
          <Users size={48} style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }} />
          <h4>Business Contacts</h4>
          <p>Business contacts are automatically extracted from your strategic initiatives. This tab is not directly editable - instead, update contact information in the Initiatives tab within each strategic initiative.</p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High': return 'var(--accent-red)';
      case 'Medium': return 'var(--accent-yellow)';
      case 'Low': return 'var(--accent-green)';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Planning': return 'var(--accent-blue)';
      case 'In Progress': return '#ea580c';
      case 'On Hold': return 'var(--text-muted)';
      case 'Completed': return 'var(--accent-green)';
      default: return 'var(--text-muted)';
    }
  };

  const renderContactCard = (contactData: ContactWithInitiatives, index: number) => {
    const { contact, initiatives: contactInitiatives } = contactData;

    return (
      <div key={index} className={styles.analysisCard} style={{ 
        height: 'fit-content',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        backgroundColor: 'rgba(59, 130, 246, 0.02)'
      }}>
        {/* Contact Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'var(--font-weight-bold)'
              }}>
                {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'var(--font-weight-semibold)' }}>
                  {contact.name}
                </h3>
                {contact.title && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {contact.title}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div style={{ 
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--border-radius)',
            fontSize: '0.75rem',
            fontWeight: 'var(--font-weight-medium)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: 'var(--accent-blue)'
          }}>
            {contactInitiatives.length} Initiative{contactInitiatives.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Contact Information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ 
            margin: '0 0 0.75rem 0', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--text-primary)',
            fontSize: '1rem'
          }}>
            <MessageCircle size={16} />
            Contact Information
          </h4>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {contact.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                <a 
                  href={`mailto:${contact.email}`} 
                  style={{ 
                    color: 'var(--accent-blue)', 
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {contact.email}
                </a>
              </div>
            )}
            
            {contact.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                <a 
                  href={`tel:${contact.phone}`} 
                  style={{ 
                    color: 'var(--accent-green)', 
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {contact.phone}
                </a>
              </div>
            )}
            
            {contact.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Linkedin size={16} style={{ color: '#0077b5', flexShrink: 0 }} />
                <a 
                  href={contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#0077b5', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  LinkedIn Profile <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Associated Initiatives */}
        <div>
          <h4 style={{ 
            margin: '0 0 0.75rem 0', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--text-primary)',
            fontSize: '1rem'
          }}>
            <Target size={16} />
            Strategic Initiatives
          </h4>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {contactInitiatives.map((initiative, idx) => (
              <div key={idx} style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid rgba(59, 130, 246, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'var(--font-weight-medium)' }}>
                    {initiative.name}
                  </h5>
                  {initiative.targetTimeline && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Calendar size={12} />
                      {initiative.targetTimeline}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {initiative.priority && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      color: getPriorityColor(initiative.priority)
                    }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%',
                        backgroundColor: getPriorityColor(initiative.priority)
                      }} />
                      {initiative.priority} Priority
                    </div>
                  )}
                  
                  {initiative.status && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      color: getStatusColor(initiative.status)
                    }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(initiative.status)
                      }} />
                      {initiative.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (contactsWithInitiatives.length === 0) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.emptyOpportunities}>
          <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Business Contacts</h3>
          <p>Contact information will appear here when you add strategic initiatives with contact details to your profile.</p>
          {!isEditing && (
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              <Settings size={18} style={{ marginRight: '0.5rem' }} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      {/* Contacts Overview */}
      <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>
            <Users size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Business Contacts Overview
          </h3>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {contactsWithInitiatives.length} Contact{contactsWithInitiatives.length !== 1 ? 's' : ''} • {initiatives.length} Initiative{initiatives.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {/* Contact Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-blue)' }}>
              <UserCheck size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Contact Distribution
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Contacts:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{contactsWithInitiatives.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>With Email:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {contactsWithInitiatives.filter(c => c.contact.email).length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>With Phone:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {contactsWithInitiatives.filter(c => c.contact.phone).length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>With LinkedIn:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {contactsWithInitiatives.filter(c => c.contact.linkedin).length}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-green)' }}>
              <Building2 size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Initiative Ownership
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Single Initiative:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {contactsWithInitiatives.filter(c => c.initiatives.length === 1).length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Multiple Initiatives:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {contactsWithInitiatives.filter(c => c.initiatives.length > 1).length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Max per Contact:</span>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {Math.max(...contactsWithInitiatives.map(c => c.initiatives.length))}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-purple)' }}>
              <Target size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Contact Completeness
            </h4>
            <div style={{ fontSize: '0.9rem' }}>
              {(() => {
                const completeContacts = contactsWithInitiatives.filter(c => 
                  c.contact.name && c.contact.email && (c.contact.phone || c.contact.linkedin)
                ).length;
                const percentage = contactsWithInitiatives.length > 0 ? 
                  Math.round((completeContacts / contactsWithInitiatives.length) * 100) : 0;
                
                return (
                  <div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>{completeContacts}</strong> of {contactsWithInitiatives.length} contacts have complete information
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Completeness: {percentage}%
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {contactsWithInitiatives.map((contactData, index) => 
          renderContactCard(contactData, index)
        )}
      </div>
    </div>
  );
};

export default ContactsTab; 