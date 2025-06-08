'use client';

import React from 'react';

export default function TimelineContent({ sections, timelineData, sectionRefs, businessProfile }) {
  const registerRef = (id, element) => {
    if (element) {
      sectionRefs.current[id] = element;
    }
  };
  
  const getSectionContent = (sectionId) => {
    const contentMap = {
      'current-state': {
        content: timelineData.currentState,
        highlights: [
          { label: 'AI Maturity', value: businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'N/A' },
          { label: 'Industry', value: businessProfile.industry || 'N/A' },
          { label: 'Company Size', value: businessProfile.companySize?.charAt(0).toUpperCase() + businessProfile.companySize?.slice(1) || 'N/A' }
        ]
      },
      'phase-1': {
        content: timelineData.phases[0],
        highlights: timelineData.phases[0]?.highlights || []
      },
      'phase-2': {
        content: timelineData.phases[1],
        highlights: timelineData.phases[1]?.highlights || []
      },
      'phase-3': {
        content: timelineData.phases[2],
        highlights: timelineData.phases[2]?.highlights || []
      },
      'phase-4': {
        content: timelineData.phases[3],
        highlights: timelineData.phases[3]?.highlights || []
      },
      'future-state': {
        content: timelineData.futureState,
        highlights: timelineData.futureState?.highlights || []
      }
    };
    return contentMap[sectionId] || { content: {}, highlights: [] };
  };
  
  return (
    <div className="timeline-content">
      {sections.map((section) => {
        const { content, highlights } = getSectionContent(section.id);
        
        return (
          <section 
            key={section.id}
            id={section.id}
            ref={(el) => registerRef(section.id, el)}
            className="timeline-section"
          >
            <div className="section-header">
              <div className="section-icon">{section.icon}</div>
              <div className="section-meta">
                <div className="section-year">{section.year}</div>
                <h2 className="section-title">{section.title}</h2>
              </div>
            </div>
            
            <div className="section-body">
              {content && (
                <>
                  {content.description && (
                    <div className="section-description">
                      <p>{content.description}</p>
                    </div>
                  )}
                  
                  {highlights && highlights.length > 0 && (
                    <div className="section-highlights">
                      <h3>Key Highlights</h3>
                      <div className="highlights-grid">
                        {highlights.map((highlight, index) => (
                          <div key={index} className="highlight-card">
                            <div className="highlight-label">{highlight.label}</div>
                            <div className="highlight-value">{highlight.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {content.initiatives && content.initiatives.length > 0 && (
                    <div className="section-initiatives">
                      <h3>Key Initiatives</h3>
                      <ul className="initiatives-list">
                        {content.initiatives.map((initiative, index) => (
                          <li key={index} className="initiative-item">
                            <div className="initiative-title">{initiative.title}</div>
                            <div className="initiative-description">{initiative.description}</div>
                            {initiative.impact && (
                              <div className="initiative-impact">
                                <span className="impact-label">Impact:</span> {initiative.impact}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {content.technologies && content.technologies.length > 0 && (
                    <div className="section-technologies">
                      <h3>Technologies & Tools</h3>
                      <div className="tech-tags">
                        {content.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {content.outcomes && content.outcomes.length > 0 && (
                    <div className="section-outcomes">
                      <h3>Expected Outcomes</h3>
                      <div className="outcomes-grid">
                        {content.outcomes.map((outcome, index) => (
                          <div key={index} className="outcome-card">
                            <div className="outcome-metric">{outcome.metric}</div>
                            <div className="outcome-value">{outcome.value}</div>
                            {outcome.description && (
                               <div className="outcome-description">{outcome.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        );
      })}
      
      <div className="timeline-end-card" ref={(el) => registerRef('end-card', el)}>
        <div className="section-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="end-card-title">End of Journey</h3>
        <p className="end-card-text">You've reached the end of the AI transformation roadmap.</p>
      </div>
    </div>
  );
} 