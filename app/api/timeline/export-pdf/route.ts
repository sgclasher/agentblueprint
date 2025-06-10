import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { Timeline, Profile } from '../../../services/types';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

interface ExportPDFRequest {
  timelineData: Timeline;
  businessProfile: Partial<Profile>;
  options?: {
    format?: 'A4' | 'Letter';
    orientation?: 'portrait' | 'landscape';
    includeMetrics?: boolean;
  };
}

// Configure chromium for serverless environments
if (typeof chromium.setHeadlessMode === 'function') {
  chromium.setHeadlessMode = true;
}
if (typeof chromium.setGraphicsMode === 'function') {
  chromium.setGraphicsMode = false;
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    let body: ExportPDFRequest;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { timelineData, businessProfile, options = {} } = body;

    // Validate required data
    if (!timelineData || !businessProfile) {
      return NextResponse.json(
        { error: 'Timeline data and business profile are required' },
        { status: 400 }
      );
    }

    // Generate PDF
    const pdfBuffer = await generateTimelinePDF(
      timelineData,
      businessProfile,
      options
    );

    // Generate filename
    const companyName = businessProfile.companyName || 'Timeline';
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_AI_Timeline_${timestamp}.pdf`;

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('PDF export error:', error);
    return NextResponse.json(
      {
        error: 'PDF generation failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function generateTimelinePDF(
  timelineData: Timeline,
  businessProfile: Partial<Profile>,
  options: ExportPDFRequest['options'] = {}
): Promise<Buffer> {
  let browser;
  
  try {
    // Launch browser with appropriate executable
    const isDev = process.env.NODE_ENV === 'development';
    
    let executablePath: string;
    if (isDev) {
      // For development, use locally installed Chrome
      executablePath = process.platform === 'win32' 
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    } else {
      // For production, use chromium from @sparticuz/chromium
      executablePath = await chromium.executablePath();
    }
    
    browser = await puppeteer.launch({
      args: isDev ? ['--no-sandbox', '--disable-setuid-sandbox'] : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: isDev ? true : chromium.headless,
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2, // Higher DPI for better quality
    });

    // Generate HTML content for the timeline
    const htmlContent = generateTimelineHTML(timelineData, businessProfile, options);
    
    // Set the content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: options.format || 'A4',
      landscape: options.orientation === 'landscape',
      printBackground: true,
      margin: {
        top: '1in',
        right: '0.75in',
        bottom: '1in',
        left: '0.75in',
      },
      preferCSSPageSize: true,
    });

    return Buffer.from(pdfBuffer);

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function generateTimelineHTML(
  timelineData: Timeline,
  businessProfile: Partial<Profile>,
  options: ExportPDFRequest['options'] = {}
): string {
  const companyName = businessProfile.companyName || 'Company';
  const industry = businessProfile.industry || 'Industry';
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get sections content using the same logic as the React component
  const getSectionContent = (sectionId: string) => {
    const contentMap: { [key: string]: { content: any, highlights: any[] } } = {
      'current-state': {
        content: timelineData.currentState,
        highlights: [
          { label: 'AI Maturity', value: businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'N/A' },
          { label: 'Industry', value: businessProfile.industry || 'N/A' },
          { label: 'Company Size', value: businessProfile.companySize?.charAt(0).toUpperCase() + businessProfile.companySize?.slice(1) || 'N/A' }
        ]
      },
      'phase-1': { content: timelineData.phases?.[0], highlights: timelineData.phases?.[0]?.highlights || [] },
      'phase-2': { content: timelineData.phases?.[1], highlights: timelineData.phases?.[1]?.highlights || [] },
      'phase-3': { content: timelineData.phases?.[2], highlights: timelineData.phases?.[2]?.highlights || [] },
      'phase-4': { content: timelineData.phases?.[3], highlights: timelineData.phases?.[3]?.highlights || [] },
      'future-state': { content: timelineData.futureState, highlights: timelineData.futureState?.highlights || [] }
    };
    return contentMap[sectionId] || { content: {}, highlights: [] };
  };

  const timelineSections = [
    { id: 'current-state', year: 'Current', title: 'Current State', subtitle: 'Where we are today' },
    { id: 'phase-1', year: 'Months 1-6', title: 'Foundation Phase', subtitle: 'Building AI readiness' },
    { id: 'phase-2', year: 'Months 7-12', title: 'Implementation Phase', subtitle: 'Deploying core solutions' },
    { id: 'phase-3', year: 'Months 13-18', title: 'Expansion Phase', subtitle: 'Scaling successful initiatives' },
    { id: 'phase-4', year: 'Months 19-24', title: 'Optimization Phase', subtitle: 'Advanced AI integration' },
    { id: 'future-state', year: 'Future', title: 'Future State', subtitle: 'AI-powered operations' }
  ];

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI Transformation Timeline - ${companyName}</title>
      <style>
        /* Professional PDF Template Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 12px;
          line-height: 1.5;
          color: #1e293b;
          background: white;
        }
        
        /* Cover Page */
        .cover-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          page-break-after: always;
          padding: 2rem;
          text-align: center;
        }
        
        .cover-header {
          margin-top: 4rem;
          margin-bottom: 3rem;
        }
        
        .main-title {
          font-size: 3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }
        
        .subtitle {
          font-size: 1.25rem;
          color: #64748b;
          font-weight: 400;
        }
        
        .company-section {
          background: #f8fafc;
          border: 2px solid #3b82f6;
          border-radius: 12px;
          padding: 2rem;
          margin: 2rem 0;
          text-align: left;
        }
        
        .company-name {
          font-size: 2rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-item:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          font-weight: 600;
          color: #475569;
        }
        
        .detail-value {
          font-weight: 500;
          color: #1e293b;
        }
        
        .exec-summary {
          background: #f1f5f9;
          border-left: 4px solid #3b82f6;
          padding: 1.5rem;
          margin: 2rem 0;
          text-align: left;
        }
        
        .exec-summary h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .cover-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        /* Timeline Pages */
        .timeline-page {
          min-height: 100vh;
          page-break-before: always;
          page-break-inside: avoid;
          padding: 2rem;
        }
        
        .section-header {
          margin-bottom: 2rem;
          text-align: center;
          padding-bottom: 1rem;
          border-bottom: 2px solid #3b82f6;
        }
        
        .section-year {
          font-size: 0.9rem;
          font-weight: 600;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .section-subtitle {
          font-size: 1rem;
          color: #64748b;
          font-style: italic;
        }
        
        .description {
          background: #f8fafc;
          border-left: 4px solid #3b82f6;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 0 8px 8px 0;
        }
        
        .subsection-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          margin-top: 2rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        /* Highlights */
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .highlight-card {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 1rem;
          text-align: center;
        }
        
        .highlight-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .highlight-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
        }
        
        /* Initiatives */
        .initiative-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #3b82f6;
          border-radius: 0 8px 8px 0;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          break-inside: avoid;
        }
        
        .initiative-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }
        
        .initiative-description {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        
        .initiative-impact {
          font-size: 0.9rem;
          color: #059669;
          background: #d1fae5;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-weight: 500;
        }
        
        /* Technologies */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        
        .tech-tag {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.5rem 0.75rem;
          border-radius: 16px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid #93c5fd;
        }
        
        /* Outcomes */
        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .outcome-card {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }
        
        .outcome-metric {
          font-size: 0.85rem;
          font-weight: 500;
          color: #16a34a;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .outcome-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #15803d;
          margin-bottom: 0.5rem;
        }
        
        .outcome-description {
          font-size: 0.8rem;
          color: #166534;
          line-height: 1.4;
        }
        
        @media print {
          body { font-size: 11px; }
          .cover-page, .timeline-page { page-break-inside: avoid; }
          .initiative-item, .highlight-card, .outcome-card { break-inside: avoid; }
          .main-title { font-size: 2.5rem; }
          .section-title { font-size: 1.75rem; }
        }
        
        @page {
          size: A4;
          margin: 0.75in;
        }
      </style>
    </head>
    <body>
      <!-- Cover Page -->
      <div class="cover-page">
        <div class="cover-header">
          <h1 class="main-title">AI Transformation Timeline</h1>
          <p class="subtitle">Strategic Roadmap for AI-Powered Business Operations</p>
        </div>
        
        <div class="company-section">
          <h2 class="company-name">${companyName}</h2>
          <div class="detail-item">
            <span class="detail-label">Industry:</span>
            <span class="detail-value">${industry}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">AI Maturity:</span>
            <span class="detail-value">${businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'Assessment Required'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Generated:</span>
            <span class="detail-value">${generatedDate}</span>
          </div>
        </div>

        ${timelineData.summary?.description ? `
          <div class="exec-summary">
            <h3>Executive Summary</h3>
            <p>${timelineData.summary.description}</p>
          </div>
        ` : ''}

        <div class="cover-footer">
          <p>Generated by Agent Blueprint</p>
        </div>
      </div>

      <!-- Timeline Sections -->
      ${timelineSections.map((section) => {
        const { content, highlights } = getSectionContent(section.id);
        if (!content || Object.keys(content).length === 0) return '';

        return `
          <div class="timeline-page">
            <div class="section-header">
              <div class="section-year">${section.year}</div>
              <h2 class="section-title">${section.title}</h2>
              <p class="section-subtitle">${section.subtitle}</p>
            </div>

            ${content.description ? `
              <div class="description">
                <p>${content.description}</p>
              </div>
            ` : ''}

            ${highlights && highlights.length > 0 ? `
              <h3 class="subsection-title">Key Highlights</h3>
              <div class="highlights-grid">
                ${highlights.map((highlight: any) => `
                  <div class="highlight-card">
                    <div class="highlight-label">${highlight.label}</div>
                    <div class="highlight-value">${highlight.value}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${content.initiatives && content.initiatives.length > 0 ? `
              <h3 class="subsection-title">Key Initiatives</h3>
              ${content.initiatives.map((initiative: any) => `
                <div class="initiative-item">
                  <h4 class="initiative-title">${initiative.title || 'Key Initiative'}</h4>
                  ${initiative.description ? `<p class="initiative-description">${initiative.description}</p>` : ''}
                  ${initiative.impact ? `<div class="initiative-impact"><strong>Expected Impact:</strong> ${initiative.impact}</div>` : ''}
                </div>
              `).join('')}
            ` : ''}

            ${content.technologies && content.technologies.length > 0 ? `
              <h3 class="subsection-title">Technologies & Tools</h3>
              <div class="tech-tags">
                ${content.technologies.map((tech: string) => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
              </div>
            ` : ''}

            ${content.outcomes && content.outcomes.length > 0 ? `
              <h3 class="subsection-title">Expected Outcomes</h3>
              <div class="outcomes-grid">
                ${content.outcomes.map((outcome: any) => `
                  <div class="outcome-card">
                    <div class="outcome-metric">${outcome.metric}</div>
                    <div class="outcome-value">${outcome.value}</div>
                    ${outcome.description ? `<div class="outcome-description">${outcome.description}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </body>
    </html>
  `;
} 