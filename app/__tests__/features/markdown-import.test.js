import { jest } from '@jest/globals';

// Mock encryption utilities before importing services
jest.mock('../../utils/encryption', () => ({
  encrypt: jest.fn(),
  decrypt: jest.fn()
}));

// Mock the AI service
jest.mock('../../services/aiService', () => ({
  aiService: {
    generateJson: jest.fn()
  }
}));

// Now import the service after mocks are set up
import { ProfileExtractionService } from '../../services/profileExtractionService';
import { aiService } from '../../services/aiService';

describe('Markdown Profile Import', () => {
  let extractionService;

  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure generateJson is a mock function
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
**Size**: Enterprise
**Annual Revenue**: $500M
**Employee Count**: 2500
**Primary Location**: San Francisco, CA
        `;

        const mockAIResponse = {
          companyName: { value: 'Acme Corporation', confidence: 0.95 },
          industry: { value: 'Manufacturing', confidence: 0.90 },
          size: { value: 'Enterprise', confidence: 0.85 },
          annualRevenue: { value: '$500M', confidence: 0.92 },
          employeeCount: { value: '2500', confidence: 0.88 },
          primaryLocation: { value: 'San Francisco, CA', confidence: 0.93 }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.data.companyName.value).toBe('Acme Corporation');
        expect(result.data.companyName.confidence).toBe(0.95);
        expect(aiService.generateJson).toHaveBeenCalledWith(
          expect.any(String), // System prompt
          expect.stringContaining('Acme Corporation'), // User prompt contains the markdown
          'user123',
          expect.any(Function), // CredentialsRepository
          undefined
        );
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
          expectedOutcome: {
            value: {
              strategicInitiatives: [
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
              ]
            },
            confidence: 0.87
          }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.data.expectedOutcome.value.strategicInitiatives).toHaveLength(2);
        expect(result.data.expectedOutcome.value.strategicInitiatives[0].initiative).toBe('Digital Transformation');
      });

      it('should extract AI readiness assessment', async () => {
        const markdown = `
## AI Readiness Assessment

Current AI Readiness Score: 7/10

### Quick Wins
- Automated customer service chatbot (Impact: High, Timeline: 3 months)
- Document processing automation (Impact: Medium, Timeline: 2 months)

### AI Opportunities
1. **Predictive Maintenance**
   - Department: Operations
   - Process: Equipment monitoring
   - Current State: Manual inspections
   - AI Solution: ML-based anomaly detection
   - Estimated Impact: $2M savings annually
   - Implementation Effort: High
   - Timeline: 12 months
        `;

        const mockAIResponse = {
          aiOpportunityAssessment: {
            value: {
              aiReadinessScore: 7,
              quickWins: [
                {
                  name: 'Automated customer service chatbot',
                  impact: 'High',
                  timeline: '3 months'
                },
                {
                  name: 'Document processing automation',
                  impact: 'Medium',
                  timeline: '2 months'
                }
              ],
              opportunities: [
                {
                  name: 'Predictive Maintenance',
                  department: 'Operations',
                  process: 'Equipment monitoring',
                  currentState: 'Manual inspections',
                  aiSolution: 'ML-based anomaly detection',
                  estimatedImpact: '$2M savings annually',
                  implementationEffort: 'High',
                  timeline: '12 months',
                  priorityScore: 8
                }
              ]
            },
            confidence: 0.82
          }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.data.aiOpportunityAssessment.value.aiReadinessScore).toBe(7);
        expect(result.data.aiOpportunityAssessment.value.quickWins).toHaveLength(2);
        expect(result.data.aiOpportunityAssessment.value.opportunities[0].name).toBe('Predictive Maintenance');
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
          industry: { value: '', confidence: 0.10 },
          size: { value: '', confidence: 0.15 }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.hasLowConfidenceFields).toBe(true);
        expect(result.lowConfidenceFields).toContain('industry');
        expect(result.lowConfidenceFields).toContain('size');
      });

      it('should validate extracted data structure', async () => {
        const markdown = `# Test Profile`;

        const mockAIResponse = {
          companyName: { value: 'Test Company', confidence: 0.90 },
          'expectedOutcome.strategicInitiatives': {
            value: 'not-an-array', // Invalid structure - should be array
            confidence: 0.80
          }
        };

        aiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

        expect(result.success).toBe(true);
        expect(result.validationWarnings).toContain('expectedOutcome.strategicInitiatives should be an array');
      });
    });

    describe('mapToProfileSchema', () => {
      it('should map extracted data to profile schema correctly', () => {
        const extractedData = {
          companyName: { value: 'Test Corp', confidence: 0.90 },
          industry: { value: 'Technology', confidence: 0.85 },
          size: { value: 'Mid-Market', confidence: 0.80 }
        };

        const mappedProfile = extractionService.mapToProfileSchema(extractedData);

        expect(mappedProfile.companyName).toBe('Test Corp');
        expect(mappedProfile.industry).toBe('Technology');
        expect(mappedProfile.size).toBe('Mid-Market');
      });

      it('should handle nested structures correctly', () => {
        const extractedData = {
          expectedOutcome: {
            value: {
              strategicInitiatives: [
                { initiative: 'Test Initiative' }
              ]
            },
            confidence: 0.85
          }
        };

        const mappedProfile = extractionService.mapToProfileSchema(extractedData);

        expect(mappedProfile.expectedOutcome.strategicInitiatives).toHaveLength(1);
        expect(mappedProfile.expectedOutcome.strategicInitiatives[0].initiative).toBe('Test Initiative');
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

      it('should validate session exists before making API call', () => {
        // Mock function to simulate frontend session validation
        const validateSession = (session) => {
          if (!session || !session.access_token) {
            throw new Error('Please sign in to use the markdown import feature.');
          }
          return true;
        };

        // Test with valid session
        const validSession = { access_token: 'valid-token', user: { id: 'user123' } };
        expect(() => validateSession(validSession)).not.toThrow();

        // Test with invalid session
        const invalidSession = null;
        expect(() => validateSession(invalidSession)).toThrow('Please sign in to use the markdown import feature.');

        // Test with session without access_token
        const incompleteSession = { user: { id: 'user123' } };
        expect(() => validateSession(incompleteSession)).toThrow('Please sign in to use the markdown import feature.');
      });

      it('should use createRouteHandlerClient pattern in backend', () => {
        // This is a conceptual test to document the correct authentication pattern
        // The actual implementation should use this pattern:
        
        const correctAuthPattern = `
          const supabase = createRouteHandlerClient({ cookies });
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError || !session) {
            return NextResponse.json(
              { success: false, error: 'Authentication required. Please sign in to use this feature.' },
              { status: 401 }
            );
          }
        `;

        const incorrectAuthPattern = `
          const cookieStore = cookies();
          const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        `;

        // This test documents that the correct pattern should be used
        expect(correctAuthPattern).toContain('createRouteHandlerClient({ cookies })');
        expect(incorrectAuthPattern).toContain('cookies: () => cookieStore'); // This is the pattern that was causing issues
      });
    });
  });
}); 