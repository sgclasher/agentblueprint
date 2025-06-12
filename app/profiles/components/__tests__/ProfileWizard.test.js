import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileWizard from '../ProfileWizard';
import { jest } from '@jest/globals';

// Mock encryption utilities before importing services
jest.mock('../../../utils/encryption', () => ({
  encrypt: jest.fn(),
  decrypt: jest.fn()
}));

// Mock the AI service
jest.mock('../../../services/aiService', () => ({
  aiService: {
    generateJson: jest.fn()
  }
}));

// Now import the service after mocks are set up
import { ProfileExtractionService } from '../../../services/profileExtractionService';
import { aiService } from '../../../services/aiService';

// Mock the markdownService
jest.mock('../../../services/markdownService', () => ({
  markdownService: {
    generateMarkdown: jest.fn().mockReturnValue('# Mock Markdown Content')
  }
}));

// Mock the profileService
jest.mock('../../../services/profileService', () => ({
  ProfileService: {
    generateTimelineFromProfile: jest.fn()
  }
}));

describe('ProfileWizard MVP (2-Step Version)', () => {
  const mockOnComplete = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    test('renders first step (Company Profile) correctly', () => {
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      expect(screen.getByText('Company Profile')).toBeInTheDocument();
      expect(screen.getByText('Enter the essential information about your client company.')).toBeInTheDocument();
      
      // Check for required fields
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
      
      // Check for optional fields
      expect(screen.getByLabelText(/employee count/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/annual revenue/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/primary location/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/website url/i)).toBeInTheDocument();
    });

    test('shows strategic initiatives section', () => {
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      expect(screen.getByText('Strategic Initiatives')).toBeInTheDocument();
      expect(screen.getByText('Add key business initiatives and their primary contacts.')).toBeInTheDocument();
      expect(screen.getByText('+ Add Strategic Initiative')).toBeInTheDocument();
    });

    test('can add and remove strategic initiatives', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Add a strategic initiative
      await user.click(screen.getByText('+ Add Strategic Initiative'));
      
      expect(screen.getByText('Initiative 1')).toBeInTheDocument();
      expect(screen.getByText('Remove')).toBeInTheDocument();
      
      // Remove the initiative
      await user.click(screen.getByText('Remove'));
      
      expect(screen.queryByText('Initiative 1')).not.toBeInTheDocument();
    });

    test('navigates to second step (Review & Complete)', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Fill required fields
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.selectOptions(screen.getByLabelText(/industry/i), 'Technology');
      
      // Navigate to next step
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      expect(screen.getByText('Review & Complete')).toBeInTheDocument();
      expect(screen.getByText('Review your client profile information before creating the profile.')).toBeInTheDocument();
    });

    test('shows company information in review step', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Fill out form
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.selectOptions(screen.getByLabelText(/industry/i), 'Technology');
      await user.type(screen.getByLabelText(/employee count/i), '500');
      
      // Navigate to review step
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      expect(screen.getByText('Test Corp')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    test('can navigate back from review step', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Fill required fields and navigate to review
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.selectOptions(screen.getByLabelText(/industry/i), 'Technology');
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      // Go back
      await user.click(screen.getByRole('button', { name: /back/i }));
      
      expect(screen.getByText('Company Profile')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Corp')).toBeInTheDocument();
    });

    test('shows progress indicator (2 steps)', () => {
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Check for 2-step progress indicator
      const stepElements = screen.getAllByText(/Company Overview|Review & Complete/);
      expect(stepElements).toHaveLength(2);
    });

    test('completes profile creation', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Fill required fields
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.selectOptions(screen.getByLabelText(/industry/i), 'Technology');
      
      // Navigate to review and complete
      await user.click(screen.getByRole('button', { name: /next/i }));
      await user.click(screen.getByRole('button', { name: /create profile/i }));
      
      expect(mockOnComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          companyName: 'Test Corp',
          industry: 'Technology'
        })
      );
    });

    test('shows validation errors for required fields', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Try to navigate without filling required fields
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      // Should show validation state (yellow indicator)
      const stepIndicator = screen.getByTitle(/Company Overview.*Missing: Company Name, Industry/);
      expect(stepIndicator).toBeInTheDocument();
    });
  });

  describe('Import from Markdown', () => {
    test('shows import button', () => {
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      expect(screen.getByText('📄 Import from Markdown')).toBeInTheDocument();
    });

    test('can toggle markdown preview', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      await user.click(screen.getByText('Show Markdown'));
      
      expect(screen.getByText('Markdown Preview')).toBeInTheDocument();
    });
  });
});

describe('Markdown Profile Import', () => {
  let extractionService;

  beforeEach(() => {
    jest.clearAllMocks();
    aiService.generateJson = jest.fn();
    extractionService = new ProfileExtractionService();
  });

  describe('ProfileExtractionService', () => {
    describe('extractProfileFromMarkdown', () => {
      it('should extract basic company information with confidence scores', async () => {
        const markdown = `
# Acme Corporation Profile

**Company**: Acme Corporation
**Industry**: Manufacturing
**Employee Count**: 2500
**Annual Revenue**: $500M
**Primary Location**: San Francisco, CA
**Website**: https://acme.com
        `;

        const mockAIResponse = {
          companyName: { value: 'Acme Corporation', confidence: 0.95 },
          industry: { value: 'Manufacturing', confidence: 0.90 },
          employeeCount: { value: '2500', confidence: 0.88 },
          annualRevenue: { value: '$500M', confidence: 0.92 },
          primaryLocation: { value: 'San Francisco, CA', confidence: 0.93 },
          websiteUrl: { value: 'https://acme.com', confidence: 0.90 }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.data.companyName.value).toBe('Acme Corporation');
        expect(result.data.companyName.confidence).toBe(0.95);
      });

      it('should extract strategic initiatives with proper structure', async () => {
        const markdown = `
## Strategic Initiatives

1. **Digital Transformation**
   - Contact: John Smith, CTO
   - Email: john.smith@acme.com
   - LinkedIn: linkedin.com/in/johnsmith
   - Phone: +1-555-0123

2. **Market Expansion**
   - Contact: Jane Doe, VP Sales
        `;

        const mockAIResponse = {
          strategicInitiatives: {
            value: [
              {
                initiative: 'Digital Transformation',
                contact: {
                  name: 'John Smith',
                  title: 'CTO',
                  email: 'john.smith@acme.com',
                  linkedin: 'linkedin.com/in/johnsmith',
                  phone: '+1-555-0123'
                }
              },
              {
                initiative: 'Market Expansion',
                contact: {
                  name: 'Jane Doe',
                  title: 'VP Sales',
                  email: '',
                  linkedin: '',
                  phone: ''
                }
              }
            ],
            confidence: 0.87
          }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.data.strategicInitiatives.value).toHaveLength(2);
        expect(result.data.strategicInitiatives.value[0].initiative).toBe('Digital Transformation');
      });

      it('should handle extraction errors gracefully', async () => {
        const markdown = 'Invalid markdown content';

        aiService.generateJson.mockRejectedValue(new Error('AI extraction failed'));

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(false);
        expect(result.error).toBe('AI extraction failed');
        expect(result.data).toBeNull();
      });

      it('should handle partial extraction with low confidence scores', async () => {
        const markdown = `
# Company Profile

Some vague information about a company...
        `;

        const mockAIResponse = {
          companyName: { value: 'Unknown Company', confidence: 0.25 },
          industry: { value: '', confidence: 0.10 }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.hasLowConfidenceFields).toBe(true);
        expect(result.lowConfidenceFields).toContain('industry');
      });

      it('should validate extracted data structure', async () => {
        const markdown = `# Test Profile`;

        const mockAIResponse = {
          companyName: { value: 'Test Company', confidence: 0.90 },
          strategicInitiatives: {
            value: 'not-an-array', // Invalid structure - should be array
            confidence: 0.80
          }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.validationWarnings).toContain('strategicInitiatives should be an array of strategic initiative objects');
      });

      // ===== SIMPLIFIED MVP FIELD EXTRACTION TESTS =====
      describe('MVP Field Extraction', () => {
        it('should extract all MVP fields from comprehensive markdown', async () => {
          const markdown = `
# TechFlow Solutions Profile

## Company Information
**Name**: TechFlow Solutions
**Industry**: Manufacturing Technology
**Employee Count**: 2500
**Annual Revenue**: $500M
**Primary Location**: Austin, Texas
**Website**: https://techflow.com

## Strategic Initiatives

### Digital Operations Program
- **Leader**: Jennifer Walsh, COO
- **Email**: j.walsh@techflow.com
- **Phone**: 555-0123

### Market Research Initiative  
- **Lead**: David Kim, Strategy Director
- **LinkedIn**: linkedin.com/in/david-kim-strategy
          `;

          const mockAIResponse = {
            companyName: { value: 'TechFlow Solutions', confidence: 0.95 },
            industry: { value: 'Manufacturing Technology', confidence: 0.90 },
            employeeCount: { value: '2500', confidence: 0.88 },
            annualRevenue: { value: '$500M', confidence: 0.92 },
            primaryLocation: { value: 'Austin, Texas', confidence: 0.93 },
            websiteUrl: { value: 'https://techflow.com', confidence: 0.85 },
            strategicInitiatives: {
              value: [
                {
                  initiative: 'Digital Operations Program',
                  contact: {
                    name: 'Jennifer Walsh',
                    title: 'COO',
                    email: 'j.walsh@techflow.com',
                    linkedin: '',
                    phone: '555-0123'
                  }
                },
                {
                  initiative: 'Market Research Initiative',
                  contact: {
                    name: 'David Kim',
                    title: 'Strategy Director',
                    email: '',
                    linkedin: 'linkedin.com/in/david-kim-strategy',
                    phone: ''
                  }
                }
              ],
              confidence: 0.82
            }
          };

          aiService.generateJson.mockResolvedValue(mockAIResponse);

          const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

          expect(result.success).toBe(true);
          
          // Verify all MVP fields are extracted
          expect(result.data.companyName.value).toBe('TechFlow Solutions');
          expect(result.data.industry.value).toBe('Manufacturing Technology');
          expect(result.data.employeeCount.value).toBe('2500');
          expect(result.data.annualRevenue.value).toBe('$500M');
          expect(result.data.primaryLocation.value).toBe('Austin, Texas');
          expect(result.data.websiteUrl.value).toBe('https://techflow.com');
          expect(result.data.strategicInitiatives.value).toHaveLength(2);
          
          // Verify strategic initiatives structure
          expect(result.data.strategicInitiatives.value[0].initiative).toBe('Digital Operations Program');
          expect(result.data.strategicInitiatives.value[0].contact.phone).toBe('555-0123');
          expect(result.data.strategicInitiatives.value[1].contact.linkedin).toBe('linkedin.com/in/david-kim-strategy');
        });

        it('should extract simplified field paths correctly in mapToProfileSchema', () => {
          const extractedData = {
            companyName: {
              value: 'Test Company',
              confidence: 0.90
            },
            industry: {
              value: 'Technology',
              confidence: 0.85
            },
            strategicInitiatives: {
              value: [
                {
                  initiative: 'Initiative 1',
                  contact: { name: 'John Doe', title: 'Manager' }
                }
              ],
              confidence: 0.85
            }
          };

          const mappedProfile = extractionService.mapToProfileSchema(extractedData);

          // Verify simplified structure mapping
          expect(mappedProfile.companyName).toBe('Test Company');
          expect(mappedProfile.industry).toBe('Technology');
          
          expect(mappedProfile.strategicInitiatives).toHaveLength(1);
          expect(mappedProfile.strategicInitiatives[0].initiative).toBe('Initiative 1');
          expect(mappedProfile.strategicInitiatives[0].contact.name).toBe('John Doe');
        });
      });
    });

    describe('mapToProfileSchema', () => {
      it('should map extracted data to profile schema correctly', () => {
        const extractedData = {
          companyName: { value: 'Test Corp', confidence: 0.90 },
          industry: { value: 'Technology', confidence: 0.85 },
          annualRevenue: { value: '$100M', confidence: 0.80 }
        };

        const mappedProfile = extractionService.mapToProfileSchema(extractedData);

        expect(mappedProfile.companyName).toBe('Test Corp');
        expect(mappedProfile.industry).toBe('Technology');
        expect(mappedProfile.annualRevenue).toBe('$100M');
      });

      it('should skip fields with low confidence', () => {
        const extractedData = {
          companyName: { value: 'Test Corp', confidence: 0.90 },
          industry: { value: 'Unknown', confidence: 0.20 } // Low confidence
        };

        const mappedProfile = extractionService.mapToProfileSchema(extractedData, 0.30);

        expect(mappedProfile.companyName).toBe('Test Corp');
        expect(mappedProfile.industry).toBeUndefined();
      });
    });
  });

  describe('API Integration', () => {
    it('should call extraction API endpoint with markdown content', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            companyName: { value: 'Test Corp', confidence: 0.90 }
          }
        })
      });

      const response = await fetch('/api/profiles/extract-markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          markdown: '# Test Profile',
          userId: 'user123'
        })
      });

      const result = await response.json();

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/profiles/extract-markdown',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });

    describe('Authentication Flow', () => {
      it('should include Authorization header in API request', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            success: true,
            extractionResult: {
              success: true,
              data: {
                companyName: { value: 'Test Corp', confidence: 0.90 }
              }
            }
          })
        });

        const response = await fetch('/api/profiles/extract-markdown', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-access-token'
          },
          body: JSON.stringify({ markdown: '# Test Profile' })
        });

        const result = await response.json();

        expect(result.success).toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/profiles/extract-markdown',
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer test-access-token'
            })
          })
        );
      });

      it('should handle 401 authentication errors gracefully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          status: 401,
          json: async () => ({
            success: false,
            error: 'Authentication required. Please sign in to use this feature.'
          })
        });

        const response = await fetch('/api/profiles/extract-markdown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ markdown: '# Test Profile' })
        });

        const result = await response.json();

        expect(response.status).toBe(401);
        expect(result.success).toBe(false);
        expect(result.error).toContain('Authentication required');
      });
    });
  });
}); 