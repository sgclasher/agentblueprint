import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelineContent from '../TimelineContent';

// Mock the ProviderSelector component
jest.mock('../ProviderSelector', () => {
  return function MockProviderSelector({ selectedProvider, onProviderChange, disabled }) {
    return (
      <div data-testid="provider-selector">
        <select
          data-testid="provider-select"
          value={selectedProvider || ''}
          onChange={(e) => onProviderChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select Provider</option>
          <option value="openai">OpenAI GPT-4o</option>
          <option value="gemini">Google Gemini</option>
          <option value="claude">Anthropic Claude</option>
        </select>
      </div>
    );
  };
});

// Mock data
const mockTimelineData = {
  currentState: {
    description: 'Current state description',
    highlights: [
      { label: 'AI Readiness', value: '30%' },
      { label: 'Automation Level', value: '20%' }
    ]
  },
  phases: [
    {
      title: 'Phase 1: Foundation',
      description: 'Building AI readiness',
      highlights: [{ label: 'ROI', value: '150%' }],
      initiatives: [
        {
          title: 'AI Assessment',
          description: 'Evaluate current capabilities',
          impact: 'Improved readiness'
        }
      ],
      technologies: ['Machine Learning', 'Data Analytics'],
      outcomes: [
        {
          metric: 'Efficiency',
          value: '25%',
          description: 'Process efficiency improvement'
        }
      ]
    }
  ],
  futureState: {
    description: 'Future state vision',
    highlights: [
      { label: 'AI Integration', value: '90%' },
      { label: 'Automation Level', value: '75%' }
    ]
  }
};

const mockSections = [
  {
    id: 'current-state',
    year: 'Current',
    title: 'Current State',
    subtitle: 'Where we are today'
  },
  {
    id: 'phase-1',
    year: 'Months 1-6',
    title: 'Foundation Phase',
    subtitle: 'Building AI readiness'
  },
  {
    id: 'future-state',
    year: 'Future',
    title: 'Future State',
    subtitle: 'AI-powered operations'
  }
];

const mockBusinessProfile = {
  companyName: 'Test Company',
  industry: 'Technology',
  companySize: 'medium'
};

const mockSectionRefs = {
  current: {}
};

describe('TimelineContent', () => {
  const defaultProps = {
    sections: mockSections,
    timelineData: mockTimelineData,
    sectionRefs: mockSectionRefs,
    businessProfile: mockBusinessProfile
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders timeline content without provider selector when onProviderChange is not provided', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.queryByTestId('provider-selector')).not.toBeInTheDocument();
      expect(screen.getByText('Current State')).toBeInTheDocument();
      expect(screen.getByText('Foundation Phase')).toBeInTheDocument();
    });

    test('renders all timeline sections correctly', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.getByText('Current State')).toBeInTheDocument();
      expect(screen.getByText('Foundation Phase')).toBeInTheDocument();
      expect(screen.getByText('Future State')).toBeInTheDocument();
      expect(screen.getByText('End of Journey')).toBeInTheDocument();
    });

    test('displays timeline section content correctly', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.getByText('Current state description')).toBeInTheDocument();
      expect(screen.getByText('Building AI readiness')).toBeInTheDocument();
      expect(screen.getByText('AI Assessment')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    });
  });

  describe('Provider Selector Integration', () => {
    const propsWithProvider = {
      ...defaultProps,
      selectedProvider: 'openai',
      onProviderChange: jest.fn(),
      isGenerating: false
    };

    test('renders provider selector when onProviderChange is provided', () => {
      render(<TimelineContent {...propsWithProvider} />);
      
      expect(screen.getByTestId('provider-selector')).toBeInTheDocument();
      expect(screen.getByText('AI Provider Selection')).toBeInTheDocument();
      expect(screen.getByText('Choose your preferred AI provider for timeline generation')).toBeInTheDocument();
    });

    test('passes correct props to ProviderSelector', () => {
      render(<TimelineContent {...propsWithProvider} />);
      
      const providerSelect = screen.getByTestId('provider-select');
      expect(providerSelect).toHaveValue('openai');
      expect(providerSelect).not.toBeDisabled();
    });

    test('disables provider selector when generating', () => {
      render(
        <TimelineContent 
          {...propsWithProvider} 
          isGenerating={true}
        />
      );
      
      const providerSelect = screen.getByTestId('provider-select');
      expect(providerSelect).toBeDisabled();
    });

    test('calls onProviderChange when provider is changed', () => {
      const mockOnProviderChange = jest.fn();
      render(
        <TimelineContent 
          {...propsWithProvider} 
          onProviderChange={mockOnProviderChange}
        />
      );
      
      const providerSelect = screen.getByTestId('provider-select');
      fireEvent.change(providerSelect, { target: { value: 'gemini' } });
      
      expect(mockOnProviderChange).toHaveBeenCalledWith('gemini');
    });
  });

  describe('Provider Header Layout', () => {
    const propsWithProvider = {
      ...defaultProps,
      selectedProvider: 'gemini',
      onProviderChange: jest.fn(),
      isGenerating: false
    };

    test('provider header appears before timeline sections', () => {
      render(<TimelineContent {...propsWithProvider} />);
      
      const providerHeader = screen.getByText('AI Provider Selection').closest('div');
      const firstSection = screen.getByText('Current State').closest('section');
      
      expect(providerHeader).toBeInTheDocument();
      expect(firstSection).toBeInTheDocument();
      
      // Provider header should come before timeline sections in the DOM
      const timelineContent = screen.getByText('AI Provider Selection').closest('[class*="timelineContent"]');
      const children = Array.from(timelineContent.children);
      const providerHeaderIndex = children.findIndex(child => 
        child.querySelector('[data-testid="provider-selector"]')
      );
      const firstSectionIndex = children.findIndex(child => 
        child.tagName === 'SECTION'
      );
      
      expect(providerHeaderIndex).toBeLessThan(firstSectionIndex);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles missing timeline data gracefully', () => {
      const propsWithoutData = {
        ...defaultProps,
        timelineData: {
          currentState: null,
          phases: [],
          futureState: null
        }
      };

      render(<TimelineContent {...propsWithoutData} />);
      
      // Should still render sections but without content
      expect(screen.getByText('Current State')).toBeInTheDocument();
      expect(screen.getByText('End of Journey')).toBeInTheDocument();
    });

    test('handles empty business profile', () => {
      const propsWithEmptyProfile = {
        ...defaultProps,
        businessProfile: {}
      };

      render(<TimelineContent {...propsWithEmptyProfile} />);
      
      expect(screen.getByText('Current State')).toBeInTheDocument();
    });

    test('handles null provider gracefully', () => {
      const propsWithNullProvider = {
        ...defaultProps,
        selectedProvider: null,
        onProviderChange: jest.fn(),
        isGenerating: false
      };

      render(<TimelineContent {...propsWithNullProvider} />);
      
      const providerSelect = screen.getByTestId('provider-select');
      expect(providerSelect).toHaveValue('');
    });
  });

  describe('Timeline Section Content', () => {
    test('displays highlights correctly', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.getByText('AI Readiness')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
      expect(screen.getByText('Automation Level')).toBeInTheDocument();
      expect(screen.getByText('20%')).toBeInTheDocument();
    });

    test('displays initiatives correctly', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.getByText('AI Assessment')).toBeInTheDocument();
      expect(screen.getByText('Evaluate current capabilities')).toBeInTheDocument();
      expect(screen.getByText('Improved readiness')).toBeInTheDocument();
    });

    test('displays technologies correctly', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.getByText('Machine Learning')).toBeInTheDocument();
      expect(screen.getByText('Data Analytics')).toBeInTheDocument();
    });

    test('displays outcomes correctly', () => {
      render(<TimelineContent {...defaultProps} />);
      
      expect(screen.getByText('Efficiency')).toBeInTheDocument();
      expect(screen.getByText('25%')).toBeInTheDocument();
      expect(screen.getByText('Process efficiency improvement')).toBeInTheDocument();
    });
  });
}); 