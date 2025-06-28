import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIBlueprintTab from '../../profile/components/AIBlueprintTab';
import { Profile } from '../../services/types';

// Mock the Supabase module
jest.mock('../../lib/supabase', () => ({
  getUser: jest.fn(),
  supabase: {
    auth: {
      getSession: jest.fn()
    }
  }
}));

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Blueprint Context Flow', () => {
  const mockProfile: Profile = {
    id: 'test-profile-id',
    companyName: 'Test Company',
    industry: 'Technology',
    strategicInitiatives: [
      {
        initiative: 'Digital Transformation',
        priority: 'High',
        businessProblems: ['Legacy system integration', 'Process automation'],
        contact: { 
          name: 'John Doe', 
          title: 'CTO',
          email: 'john.doe@test.com',
          linkedin: '',
          phone: ''
        }
      },
      {
        initiative: 'Customer Experience Enhancement',
        priority: 'Medium',
        businessProblems: ['Response time improvement', 'Customer data fragmentation'],
        contact: { 
          name: 'Jane Smith', 
          title: 'VP Customer Success',
          email: 'jane.smith@test.com',
          linkedin: '',
          phone: ''
        }
      }
    ],
    systemsAndApplications: [
      { name: 'CRM', category: 'Customer Management' },
      { name: 'ERP', category: 'Enterprise Resource Planning' }
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  };

  const mockOpportunity = {
    title: 'Automated Customer Support Workflow',
    description: 'Implement AI-powered customer support agents to handle tier-1 support requests and route complex issues to human agents.',
    category: 'Process Automation',
    businessImpact: {
      primaryMetrics: ['Response time reduction: 75%', 'Support ticket resolution: 60% automation'],
      estimatedROI: '240% over 18 months',
      timeToValue: '3-4 months',
      confidenceLevel: 'High' as const
    },
    implementation: {
      complexity: 'Medium' as const,
      timeframe: '4-6 months',
      prerequisites: ['CRM integration', 'Knowledge base setup'],
      riskFactors: ['Customer satisfaction during transition']
    },
    agenticPattern: {
      recommendedPattern: 'Manager-Workers',
      patternRationale: 'Customer support requires clear coordination between routing, resolution, and escalation agents with human oversight for complex cases.',
      implementationApproach: 'Deploy a coordinator agent that routes tickets to specialized support agents (FAQ, technical, billing) with escalation workflows to human agents.',
      patternComplexity: 'Medium' as const
    },
    relevantInitiatives: ['Digital Transformation'],
    aiTechnologies: ['Natural Language Processing', 'Intent Classification', 'Automated Routing']
  };

  const mockSession = {
    access_token: 'mock-token'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful auth session
    require('../../lib/supabase').supabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null
    });
  });

  describe('Opportunity Context Processing', () => {
    it('should pass opportunity context to blueprint API when context is provided', async () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0,
        initiativeSpecialInstructions: 'Focus on customer satisfaction metrics and ensure seamless handoff to human agents for complex technical issues.'
      };

      // Mock successful blueprint generation response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          blueprint: {
            id: 'test-blueprint-id',
            businessObjective: 'Implement automated customer support system with Manager-Workers pattern',
            digitalTeam: [
              {
                role: 'coordinator',
                title: 'Support Coordinator Agent',
                coreJob: 'Route customer support tickets to appropriate specialist agents',
                toolsUsed: ['CRM API', 'Ticket Classification System'],
                oversightLevel: 'policy-checked',
                oversightDescription: 'Automated routing with human review for escalations'
              }
            ],
            humanCheckpoints: [],
            agenticTimeline: { phases: [], totalDurationWeeks: 16 },
            kpiImprovements: [],
            createdAt: new Date().toISOString()
          },
          cached: false
        })
      });

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Wait for the component to process the context and make API call
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/profiles/generate-blueprint', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mockSession.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            forceRegenerate: true,
            selectedInitiativeIndex: 0,
            specialInstructions: 'Focus on customer satisfaction metrics and ensure seamless handoff to human agents for complex technical issues.'
          }),
          credentials: 'same-origin'
        });
      }, { timeout: 3000 });
    });

    it('should display opportunity context indicator when context is provided', async () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0
      };

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Should show the opportunity context indicator
      expect(screen.getByText(/From Opportunity.*Automated Customer Support Workflow/i)).toBeInTheDocument();
    });

    it('should set initiative selector to correct index when context provides initiative', () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 1  // Second initiative
      };

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // The initiative selector should be set to the second initiative
      const initiativeSelector = screen.getByDisplayValue(/Customer Experience Enhancement/i);
      expect(initiativeSelector).toBeInTheDocument();
    });

    it('should populate special instructions from opportunity context', () => {
      const specialInstructions = 'Focus on multilingual support and integrate with existing ticketing system';
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0,
        initiativeSpecialInstructions: specialInstructions
      };

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Special instructions field should be populated
      const instructionsField = screen.getByDisplayValue(specialInstructions);
      expect(instructionsField).toBeInTheDocument();
    });
  });

  describe('Context-Specific Blueprint Generation', () => {
    it('should generate blueprint focused on specific opportunity workflow', async () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0
      };

      // Mock the API response that would come from opportunity-specific generation
      const expectedBlueprint = {
        id: 'test-blueprint-id',
        businessObjective: 'Implement automated customer support system using Manager-Workers pattern for Automated Customer Support Workflow',
        digitalTeam: [
          {
            role: 'coordinator',
            title: 'Support Routing Coordinator',
            coreJob: 'Classify incoming support tickets and route to appropriate specialist agents',
            toolsUsed: ['CRM API', 'Natural Language Processing', 'Intent Classification Engine'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Human review for escalations and complex routing decisions',
            linkedKPIs: ['Response time reduction', 'First-contact resolution rate']
          },
          {
            role: 'specialist',
            title: 'FAQ Resolution Agent',
            coreJob: 'Handle frequently asked questions and common support requests',
            toolsUsed: ['Knowledge Base API', 'FAQ Database', 'Response Templates'],
            oversightLevel: 'full-autonomy',
            oversightDescription: 'Automated responses for standard questions with quality monitoring',
            linkedKPIs: ['FAQ resolution rate', 'Customer satisfaction scores']
          }
        ],
        humanCheckpoints: [
          {
            stage: 'Escalation Review',
            description: 'Human agent reviews complex cases before escalation',
            triggerConditions: ['Customer sentiment negative', 'Complex technical issue'],
            approvalRequired: true
          }
        ],
        agenticTimeline: {
          phases: [
            { name: 'Foundation', weeks: 4, description: 'Setup basic routing and FAQ handling' },
            { name: 'Enhancement', weeks: 6, description: 'Add specialized support agents' },
            { name: 'Optimization', weeks: 6, description: 'Optimize routing and add advanced features' }
          ],
          totalDurationWeeks: 16
        },
        kpiImprovements: [
          {
            category: 'Customer Support',
            metric: 'First Response Time',
            currentValue: '4 hours',
            targetValue: '1 hour',
            improvementPercentage: 75,
            timeframeWeeks: 12
          }
        ],
        createdAt: new Date().toISOString()
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          blueprint: expectedBlueprint,
          cached: false
        })
      });

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Wait for blueprint to be generated and displayed
      await waitFor(() => {
        expect(screen.getByText(/Support Routing Coordinator/i)).toBeInTheDocument();
      });

      // Verify the blueprint is focused on the specific opportunity
      expect(screen.getByText(/automated customer support system using Manager-Workers pattern/i)).toBeInTheDocument();
      expect(screen.getByText(/FAQ Resolution Agent/i)).toBeInTheDocument();
      expect(screen.getByText(/Natural Language Processing/i)).toBeInTheDocument();
    });

    it('should not generate generic company-wide blueprint when opportunity context exists', async () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0
      };

      // Mock a response that would indicate generic blueprint generation
      const genericBlueprint = {
        id: 'test-blueprint-id',
        businessObjective: 'Implement comprehensive AI strategy for company-wide digital transformation',
        digitalTeam: [
          {
            role: 'coordinator',
            title: 'AI Strategy Coordinator',
            coreJob: 'Coordinate various AI initiatives across the organization',
            toolsUsed: ['Strategic Planning Tools', 'Project Management Systems'],
            oversightLevel: 'human-approval',
            oversightDescription: 'Strategic decisions require executive approval'
          }
        ],
        humanCheckpoints: [],
        agenticTimeline: { phases: [], totalDurationWeeks: 24 },
        kpiImprovements: [],
        createdAt: new Date().toISOString()
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          blueprint: genericBlueprint,
          cached: false
        })
      });

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Wait for any blueprint generation
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      // This test would fail if we get a generic blueprint instead of opportunity-specific one
      // The blueprint should NOT mention generic "company-wide" language when we have specific opportunity context
      expect(screen.queryByText(/company-wide digital transformation/i)).not.toBeInTheDocument();
    });
  });

  describe('Context Clearing and State Management', () => {
    it('should clear context when user clicks clear button', async () => {
      const onClearContext = jest.fn();
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0
      };

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
          onClearContext={onClearContext}
        />
      );

      // Find and click the clear context button (✕)
      const clearButton = screen.getByTitle('Clear opportunity context');
      fireEvent.click(clearButton);

      expect(onClearContext).toHaveBeenCalled();
    });

    it('should prevent processing the same context twice', async () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          blueprint: { id: 'test' },
          cached: false
        })
      });

      const { rerender } = render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Wait for first API call
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      // Re-render with same context - should not trigger another API call
      rerender(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Give it time to potentially make another call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Should still only have been called once
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling with Context', () => {
    it('should handle API errors gracefully when context is provided', async () => {
      const blueprintContext = {
        opportunity: mockOpportunity,
        initiativeIndex: 0
      };

      // Mock API error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Blueprint generation failed for opportunity-specific request' })
      });

      render(
        <AIBlueprintTab 
          profile={mockProfile} 
          isEditing={false} 
          blueprintContext={blueprintContext}
        />
      );

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/Blueprint generation failed/i)).toBeInTheDocument();
      });

      // Context indicator should still be visible
      expect(screen.getByText(/From Opportunity.*Automated Customer Support Workflow/i)).toBeInTheDocument();
    });
  });
}); 