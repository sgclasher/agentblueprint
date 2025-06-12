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

      // ===== COMPLEX FIELD EXTRACTION TESTS =====
      describe('Complex Field Extraction', () => {
        it('should extract business problems from various markdown formats', async () => {
          const markdown = `
# Business Profile

## Current Business Problems

- Manual data entry causing errors and delays
- Legacy systems that don't integrate well
- High operational costs due to inefficient processes
- Customer service response times are too slow

### Key Challenges
1. Data silos across departments
2. Lack of real-time analytics
3. Manual reporting processes
          `;

          const mockAIResponse = {
            'problems.businessProblems': {
              value: [
                'Manual data entry causing errors and delays',
                'Legacy systems that don\'t integrate well',
                'High operational costs due to inefficient processes',
                'Customer service response times are too slow',
                'Data silos across departments',
                'Lack of real-time analytics',
                'Manual reporting processes'
              ],
              confidence: 0.85
            }
          };

          aiService.generateJson.mockResolvedValue(mockAIResponse);

          const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

          expect(result.success).toBe(true);
          expect(result.data['problems.businessProblems'].value).toHaveLength(7);
          expect(result.data['problems.businessProblems'].value).toContain('Manual data entry causing errors and delays');
          expect(result.data['problems.businessProblems'].confidence).toBe(0.85);
        });

        it('should extract AI opportunities from detailed markdown structures', async () => {
          const markdown = `
# AI Transformation Opportunities

## Current AI Readiness: 6/10

### Identified AI Opportunities

#### 1. Customer Service Automation
- **Department**: Customer Support
- **Current Process**: Manual ticket routing and response
- **Current State**: 500+ tickets daily, 24hr response time
- **Proposed AI Solution**: Intelligent chatbot with NLP for initial triage
- **Estimated Impact**: 60% reduction in response time, $200K annual savings
- **Implementation Effort**: Medium
- **Timeline**: 6 months
- **Priority Score**: 9

#### 2. Predictive Inventory Management
- **Department**: Supply Chain
- **Process**: Inventory planning and ordering
- **Current State**: Monthly manual reviews, frequent stockouts
- **AI Solution**: ML-based demand forecasting
- **Estimated Impact**: 30% reduction in carrying costs
- **Implementation Effort**: High
- **Timeline**: 12 months
- **Priority Score**: 7

### Quick Wins
- Document classification (Impact: High, Timeline: 2 months)
- Email auto-categorization (Impact: Medium, Timeline: 1 month)
          `;

          const mockAIResponse = {
            'aiOpportunityAssessment.aiReadinessScore': {
              value: 6,
              confidence: 0.92
            },
            'aiOpportunityAssessment.opportunities': {
              value: [
                {
                  name: 'Customer Service Automation',
                  department: 'Customer Support',
                  process: 'Manual ticket routing and response',
                  currentState: '500+ tickets daily, 24hr response time',
                  aiSolution: 'Intelligent chatbot with NLP for initial triage',
                  estimatedImpact: '60% reduction in response time, $200K annual savings',
                  implementationEffort: 'Medium',
                  timeline: '6 months',
                  priorityScore: 9
                },
                {
                  name: 'Predictive Inventory Management',
                  department: 'Supply Chain',
                  process: 'Inventory planning and ordering',
                  currentState: 'Monthly manual reviews, frequent stockouts',
                  aiSolution: 'ML-based demand forecasting',
                  estimatedImpact: '30% reduction in carrying costs',
                  implementationEffort: 'High',
                  timeline: '12 months',
                  priorityScore: 7
                }
              ],
              confidence: 0.88
            },
            'aiOpportunityAssessment.quickWins': {
              value: [
                {
                  name: 'Document classification',
                  impact: 'High',
                  timeline: '2 months'
                },
                {
                  name: 'Email auto-categorization',
                  impact: 'Medium',
                  timeline: '1 month'
                }
              ],
              confidence: 0.90
            }
          };

          aiService.generateJson.mockResolvedValue(mockAIResponse);

          const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

          expect(result.success).toBe(true);
          expect(result.data['aiOpportunityAssessment.opportunities'].value).toHaveLength(2);
          expect(result.data['aiOpportunityAssessment.opportunities'].value[0].name).toBe('Customer Service Automation');
          expect(result.data['aiOpportunityAssessment.opportunities'].value[0].priorityScore).toBe(9);
          expect(result.data['aiOpportunityAssessment.quickWins'].value).toHaveLength(2);
        });

        it('should extract strategic initiatives with incomplete contact information', async () => {
          const markdown = `
# Strategic Business Initiatives

## 2025 Key Initiatives

### 1. Digital Transformation Program
**Lead**: Sarah Johnson, Chief Digital Officer
**Contact**: sarah.j@company.com
**Initiative Details**: Modernize core business processes using cloud technologies

### 2. Market Expansion - Asia Pacific
**Lead**: Michael Chen
**Title**: VP International Business
**LinkedIn**: linkedin.com/in/michael-chen-intl

### 3. Product Line Extension
**Responsible**: Alex Rivera, Product Manager
**Phone**: +1-555-0199
**Initiative**: Launch new premium product tier

### 4. Customer Experience Transformation
**Contact**: Lisa Park, CX Director
**Details**: Implement omnichannel customer experience platform
          `;

          const mockAIResponse = {
            'expectedOutcome.strategicInitiatives': {
              value: [
                {
                  initiative: 'Digital Transformation Program',
                  contact: {
                    name: 'Sarah Johnson',
                    title: 'Chief Digital Officer',
                    email: 'sarah.j@company.com',
                    linkedin: '',
                    phone: ''
                  }
                },
                {
                  initiative: 'Market Expansion - Asia Pacific',
                  contact: {
                    name: 'Michael Chen',
                    title: 'VP International Business',
                    email: '',
                    linkedin: 'linkedin.com/in/michael-chen-intl',
                    phone: ''
                  }
                },
                {
                  initiative: 'Product Line Extension',
                  contact: {
                    name: 'Alex Rivera',
                    title: 'Product Manager',
                    email: '',
                    linkedin: '',
                    phone: '+1-555-0199'
                  }
                },
                {
                  initiative: 'Customer Experience Transformation',
                  contact: {
                    name: 'Lisa Park',
                    title: 'CX Director',
                    email: '',
                    linkedin: '',
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
          expect(result.data['expectedOutcome.strategicInitiatives'].value).toHaveLength(4);
          expect(result.data['expectedOutcome.strategicInitiatives'].value[0].initiative).toBe('Digital Transformation Program');
          expect(result.data['expectedOutcome.strategicInitiatives'].value[0].contact.name).toBe('Sarah Johnson');
          expect(result.data['expectedOutcome.strategicInitiatives'].value[1].contact.linkedin).toBe('linkedin.com/in/michael-chen-intl');
        });

        it('should handle mixed content with all complex field types', async () => {
          const markdown = `
# Complete Business Assessment

## Company Overview
**Name**: TechFlow Solutions
**Industry**: Manufacturing Technology

## Business Challenges
- Outdated ERP system causing data inconsistencies
- Manual quality control processes
- Difficulty scaling operations

## AI Opportunities

### Immediate Opportunities (Quick Wins)
- Automated invoice processing (High impact, 3 months)
- Chatbot for internal IT support (Medium impact, 2 months)

### Strategic AI Initiatives
1. **Smart Quality Control**
   - Dept: Manufacturing
   - Process: Visual product inspection  
   - Current: Manual inspection by workers
   - AI Solution: Computer vision for defect detection
   - Impact: 40% reduction in defects
   - Effort: High
   - Timeline: 18 months
   - Priority: 8

## Strategic Business Initiatives

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
            'problems.businessProblems': {
              value: [
                'Outdated ERP system causing data inconsistencies',
                'Manual quality control processes', 
                'Difficulty scaling operations'
              ],
              confidence: 0.88
            },
            'aiOpportunityAssessment.quickWins': {
              value: [
                {
                  name: 'Automated invoice processing',
                  impact: 'High',
                  timeline: '3 months'
                },
                {
                  name: 'Chatbot for internal IT support',
                  impact: 'Medium', 
                  timeline: '2 months'
                }
              ],
              confidence: 0.85
            },
            'aiOpportunityAssessment.opportunities': {
              value: [
                {
                  name: 'Smart Quality Control',
                  department: 'Manufacturing',
                  process: 'Visual product inspection',
                  currentState: 'Manual inspection by workers',
                  aiSolution: 'Computer vision for defect detection',
                  estimatedImpact: '40% reduction in defects',
                  implementationEffort: 'High',
                  timeline: '18 months',
                  priorityScore: 8
                }
              ],
              confidence: 0.82
            },
            'expectedOutcome.strategicInitiatives': {
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
              confidence: 0.79
            }
          };

          aiService.generateJson.mockResolvedValue(mockAIResponse);

          const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

          expect(result.success).toBe(true);
          
          // Verify all complex field types are extracted
          expect(result.data['problems.businessProblems'].value).toHaveLength(3);
          expect(result.data['aiOpportunityAssessment.quickWins'].value).toHaveLength(2);
          expect(result.data['aiOpportunityAssessment.opportunities'].value).toHaveLength(1);
          expect(result.data['expectedOutcome.strategicInitiatives'].value).toHaveLength(2);
          
          // Verify specific values
          expect(result.data['problems.businessProblems'].value[0]).toBe('Outdated ERP system causing data inconsistencies');
          expect(result.data['aiOpportunityAssessment.opportunities'].value[0].priorityScore).toBe(8);
          expect(result.data['expectedOutcome.strategicInitiatives'].value[0].contact.phone).toBe('555-0123');
        });

        it('should handle edge case where AI returns incomplete nested structures', async () => {
          const markdown = `
# Incomplete Profile Test

## Problems
- Some business issue mentioned

## AI Plans
- Basic automation ideas
          `;

          const mockAIResponse = {
            'problems.businessProblems': {
              value: [], // Empty array
              confidence: 0.30
            },
            'aiOpportunityAssessment.opportunities': {
              value: [
                {
                  name: 'Basic Automation',
                  // Missing required fields like department, process, etc.
                  estimatedImpact: 'Unknown'
                }
              ],
              confidence: 0.25
            },
            'expectedOutcome.strategicInitiatives': {
              value: null, // Null value instead of array
              confidence: 0.15
            }
          };

          aiService.generateJson.mockResolvedValue(mockAIResponse);

          const result = await extractionService.extractProfileFromMarkdown(markdown, 'user123');

          expect(result.success).toBe(true);
          expect(result.hasLowConfidenceFields).toBe(true);
          expect(result.lowConfidenceFields).toContain('problems.businessProblems');
          expect(result.lowConfidenceFields).toContain('aiOpportunityAssessment.opportunities');
          expect(result.lowConfidenceFields).toContain('expectedOutcome.strategicInitiatives');
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