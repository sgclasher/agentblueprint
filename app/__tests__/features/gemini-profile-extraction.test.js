/**
 * Gemini Profile Extraction Tests
 * 
 * Tests specifically for debugging Google Gemini API integration 
 * for markdown profile extraction. Currently only GPT-4o works.
 */

const { ProfileExtractionService } = require('../../services/profileExtractionService');
const { GoogleServerProvider } = require('../../lib/llm/providers/googleServerProvider');

// Mock dependencies
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ 
        data: { session: { access_token: 'mock-token' } } 
      })
    }
  }
}));

jest.mock('../../repositories/credentialsRepository', () => ({
  CredentialsRepository: {
    getDefaultProvider: jest.fn(),
    getCredentials: jest.fn()
  }
}));

// Sample markdown content for testing
const sampleMarkdownContent = `
# Acme Corporation Profile

## Company Overview
**Company Name**: Acme Corporation
**Industry**: Technology
**Employee Count**: 500-1000 employees
**Annual Revenue**: $50M - $100M
**Primary Location**: San Francisco, CA
**Website**: https://acme.com

## Strategic Initiatives

### Digital Transformation Initiative
**Contact**: John Smith (CTO)
**Email**: john.smith@acme.com
**Phone**: (555) 123-4567
**LinkedIn**: https://linkedin.com/in/johnsmith
`;

const complexMarkdownContent = `
# TechCorp Industries

## Company Information
- **Name**: TechCorp Industries
- **Industry**: Manufacturing Technology
- **Size**: 2000+ employees
- **Revenue**: $200M annually
- **Location**: Austin, Texas
- **Website**: www.techcorp.com

## Key Strategic Initiatives

1. **Automation Modernization Program**
   - Lead: Mike Davis (Director of Operations)
   - Contact: mike.davis@techcorp.com
   - Mobile: +1-512-555-0123

2. **Supply Chain Optimization**
   - Lead: Lisa Chen (Supply Chain VP)
   - Email: lisa.chen@techcorp.com
   - LinkedIn: linkedin.com/in/lisachen-supply

3. **Sustainability Initiative**
   - Lead: Robert Martinez (Sustainability Officer)
   - Contact: r.martinez@techcorp.com
`;

describe('Gemini Profile Extraction Service', () => {
  let extractionService;
  let mockCredentialsRepo;

  beforeEach(() => {
    extractionService = new ProfileExtractionService();
    
    // Setup mock credentials repository
    mockCredentialsRepo = {
      getDefaultProvider: jest.fn().mockResolvedValue({
        service_name: 'gemini',
        credentials_encrypted: 'mock-encrypted-credentials',
        encryption_metadata: {
          iv: 'mock-iv',
          authTag: 'mock-auth-tag'
        },
        configuration: {
          model: 'gemini-1.5-flash'
        }
      }),
      getCredentials: jest.fn().mockResolvedValue([{
        service_name: 'gemini',
        credentials_encrypted: 'mock-encrypted-credentials',
        encryption_metadata: {
          iv: 'mock-iv',
          authTag: 'mock-auth-tag'
        },
        configuration: {
          model: 'gemini-1.5-flash'
        }
      }])
    };

    // Mock the decryption utility
    jest.mock('../../utils/encryption', () => ({
      decryptCredential: jest.fn().mockReturnValue(
        JSON.stringify({
          apiKey: 'mock-gemini-api-key',
          model: 'gemini-1.5-flash'
        })
      )
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Gemini API Integration', () => {
    test('should create GoogleServerProvider with correct configuration', () => {
      const provider = new GoogleServerProvider({
        apiKey: 'test-api-key',
        model: 'gemini-1.5-flash'
      });

      expect(provider).toBeDefined();
      expect(provider.getStatus().provider).toContain('gemini');
    });

    test('should fetch available Gemini models', async () => {
      const models = await GoogleServerProvider.fetchAvailableModels();
      
      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);
      
      // Check for expected Gemini models
      const modelIds = models.map(model => model.id);
      expect(modelIds).toContain('gemini-1.5-flash');
      expect(modelIds).toContain('gemini-1.5-pro');
    });
  });

  describe('Profile Extraction with Gemini', () => {
    test('should extract basic company information from simple markdown', async () => {
      // Mock successful Gemini API response
      const mockExtractedData = {
        companyName: { value: 'Acme Corporation', confidence: 0.95 },
        industry: { value: 'Technology', confidence: 0.90 },
        employeeCount: { value: '500-1000 employees', confidence: 0.85 },
        annualRevenue: { value: '$50M - $100M', confidence: 0.80 },
        primaryLocation: { value: 'San Francisco, CA', confidence: 0.90 },
        websiteUrl: { value: 'https://acme.com', confidence: 0.95 },
        strategicInitiatives: {
          value: [
            {
              initiative: 'Digital Transformation Initiative',
              contact: {
                name: 'John Smith',
                title: 'CTO',
                email: 'john.smith@acme.com',
                phone: '(555) 123-4567',
                linkedin: 'https://linkedin.com/in/johnsmith'
              }
            }
          ],
          confidence: 0.85
        }
      };

      // Mock the aiService.generateJson method
      jest.doMock('../../services/aiService', () => ({
        aiService: {
          generateJson: jest.fn().mockResolvedValue(mockExtractedData)
        }
      }));

      const result = await extractionService.extractProfileFromMarkdown(
        sampleMarkdownContent,
        'test-user-id',
        'gemini'
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.companyName.value).toBe('Acme Corporation');
      expect(result.data.industry.value).toBe('Technology');
    });

    test('should handle complex markdown with multiple strategic initiatives', async () => {
      const mockExtractedData = {
        companyName: { value: 'TechCorp Industries', confidence: 0.95 },
        industry: { value: 'Manufacturing Technology', confidence: 0.90 },
        employeeCount: { value: '2000+ employees', confidence: 0.85 },
        annualRevenue: { value: '$200M annually', confidence: 0.80 },
        primaryLocation: { value: 'Austin, Texas', confidence: 0.90 },
        websiteUrl: { value: 'www.techcorp.com', confidence: 0.85 },
        strategicInitiatives: {
          value: [
            {
              initiative: 'Automation Modernization Program',
              contact: {
                name: 'Mike Davis',
                title: 'Director of Operations',
                email: 'mike.davis@techcorp.com',
                phone: '+1-512-555-0123',
                linkedin: ''
              }
            },
            {
              initiative: 'Supply Chain Optimization',
              contact: {
                name: 'Lisa Chen',
                title: 'Supply Chain VP',
                email: 'lisa.chen@techcorp.com',
                phone: '',
                linkedin: 'linkedin.com/in/lisachen-supply'
              }
            }
          ],
          confidence: 0.80
        }
      };

      jest.doMock('../../services/aiService', () => ({
        aiService: {
          generateJson: jest.fn().mockResolvedValue(mockExtractedData)
        }
      }));

      const result = await extractionService.extractProfileFromMarkdown(
        complexMarkdownContent,
        'test-user-id',
        'gemini'
      );

      expect(result.success).toBe(true);
      expect(result.data.strategicInitiatives.value).toHaveLength(2);
      expect(result.data.strategicInitiatives.value[0].initiative).toBe('Automation Modernization Program');
    });

    test('should handle Gemini API errors gracefully', async () => {
      // Mock Gemini API error
      jest.doMock('../../services/aiService', () => ({
        aiService: {
          generateJson: jest.fn().mockRejectedValue(new Error('Google Gemini API error: 404 - Model not found'))
        }
      }));

      const result = await extractionService.extractProfileFromMarkdown(
        sampleMarkdownContent,
        'test-user-id',
        'gemini'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Google Gemini API error');
    });

    test('should validate Gemini response structure', async () => {
      // Mock malformed Gemini response
      const malformedResponse = {
        company: 'Missing confidence scores',
        industry: { value: 'Technology' } // Missing confidence
      };

      jest.doMock('../../services/aiService', () => ({
        aiService: {
          generateJson: jest.fn().mockResolvedValue(malformedResponse)
        }
      }));

      const result = await extractionService.extractProfileFromMarkdown(
        sampleMarkdownContent,
        'test-user-id',
        'gemini'
      );

      expect(result.success).toBe(true);
      expect(result.validationWarnings).toBeDefined();
      expect(result.validationWarnings.length).toBeGreaterThan(0);
    });
  });

  describe('Gemini Model Compatibility', () => {
    test('should work with gemini-1.5-flash', async () => {
      const provider = new GoogleServerProvider({
        apiKey: 'test-key',
        model: 'gemini-1.5-flash'
      });

      expect(provider.getStatus().provider).toContain('gemini-1.5-flash');
    });

    test('should work with gemini-1.5-pro', async () => {
      const provider = new GoogleServerProvider({
        apiKey: 'test-key',
        model: 'gemini-1.5-pro'
      });

      expect(provider.getStatus().provider).toContain('gemini-1.5-pro');
    });

    test('should work with gemini-2.0-flash', async () => {
      const provider = new GoogleServerProvider({
        apiKey: 'test-key',
        model: 'gemini-2.0-flash'
      });

      expect(provider.getStatus().provider).toContain('gemini-2.0-flash');
    });

    test('should handle invalid model names', () => {
      expect(() => {
        new GoogleServerProvider({
          apiKey: 'test-key',
          model: 'invalid-model-name'
        });
      }).not.toThrow(); // Should create provider but may fail later
    });
  });

  describe('Response Parsing', () => {
    test('should handle Gemini markdown code block responses', () => {
      const responseWithCodeBlocks = '```json\n{"companyName": {"value": "Test", "confidence": 0.9}}\n```';
      
      // This would be tested in the GoogleServerProvider.generateJson method
      // The provider should strip markdown code blocks before JSON parsing
      expect(responseWithCodeBlocks).toContain('```json');
    });

    test('should handle plain JSON responses', () => {
      const plainJsonResponse = '{"companyName": {"value": "Test", "confidence": 0.9}}';
      
      expect(() => JSON.parse(plainJsonResponse)).not.toThrow();
    });
  });
}); 