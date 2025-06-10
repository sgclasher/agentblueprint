'use client';

import React, { useState } from 'react';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import { Timeline, Profile } from '../../services/types';
import { supabase } from '../../lib/supabase';

interface TimelineHeaderProps {
    onBackClick: () => void;
    timelineData?: Timeline | null;
    businessProfile?: Partial<Profile>;
}

export default function TimelineHeader({ onBackClick, timelineData, businessProfile }: TimelineHeaderProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!timelineData || !businessProfile) {
      alert('No timeline data available to export');
      return;
    }

    setIsExporting(true);
    
    try {
      // Get the current session for authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('Authentication required. Please sign in to export PDF.');
      }

      const response = await fetch('/api/timeline/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          timelineData,
          businessProfile,
          options: {
            format: 'A4',
            orientation: 'portrait',
            includeMetrics: true
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Export failed');
      }

      // Get the PDF blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response header or generate one
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'AI_Timeline.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <header className="timeline-header">
      <div className="header-content">
        <button 
          className="back-button"
          onClick={onBackClick}
          aria-label="Back to Flow Visualizer"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="header-title-section">
          <h1 className="timeline-title">AI Transformation Timeline</h1>
          <p className="timeline-subtitle">Your personalized roadmap to AI-powered business operations</p>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-secondary btn-icon" aria-label="Share timeline">
            <Share2 size={18} />
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleExportPDF}
            disabled={isExporting || !timelineData}
          >
            <Download size={18} />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </div>
    </header>
  );
} 