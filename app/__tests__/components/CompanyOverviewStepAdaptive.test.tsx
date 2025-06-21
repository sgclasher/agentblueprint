import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompanyOverviewStep from '../../profiles/components/steps/CompanyOverviewStep';
import { Profile } from '../../services/types';

describe('CompanyOverviewStep - Adaptive UI', () => {
  let mockUpdateData: jest.Mock;
  let mockProfileData: Partial<Profile>;

  beforeEach(() => {
    mockUpdateData = jest.fn();
    mockProfileData = {
      companyName: 'Test Company',
      industry: 'Technology',
      companySize: undefined,
      businessObjectives: [],
      businessGoals: [],
      keyChallenges: [],
      strategicInitiatives: []
    };
  });

  describe('Company Size Selection', () => {
    test('should render company size selector', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByLabelText(/company size/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('Select company size')).toBeInTheDocument();
    });

    test('should update company size when selected', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      const sizeSelect = screen.getByLabelText(/company size/i);
      fireEvent.change(sizeSelect, { target: { value: 'SMB' } });
      
      expect(mockUpdateData).toHaveBeenCalledWith('companySize', 'SMB');
    });

    test('should show different UI complexity based on company size', () => {
      const smbData = { ...mockProfileData, companySize: 'SMB' as const };
      const { rerender } = render(<CompanyOverviewStep data={smbData} updateData={mockUpdateData} />);
      
      // SMB should show Business Goals section (use heading specifically)
      expect(screen.getByRole('heading', { name: /business goals/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /key challenges/i })).toBeInTheDocument();
      
      // Switch to Enterprise
      const enterpriseData = { ...mockProfileData, companySize: 'Enterprise' as const };
      rerender(<CompanyOverviewStep data={enterpriseData} updateData={mockUpdateData} />);
      
      // Enterprise should show Business Objectives section
      expect(screen.getByRole('heading', { name: /business objectives/i })).toBeInTheDocument();
      const strategicInitiativesElements = screen.getAllByText(/strategic initiatives/i);
      expect(strategicInitiativesElements.length).toBeGreaterThan(0);
    });
  });

  describe('SMB Mode - Business Goals & Challenges', () => {
    beforeEach(() => {
      mockProfileData.companySize = 'SMB' as const;
    });

    test('should render business goals section for SMB', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByRole('heading', { name: /business goals/i })).toBeInTheDocument();
      expect(screen.getByText(/what are your main business goals/i)).toBeInTheDocument();
    });

    test('should allow adding business goals', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      const addGoalButton = screen.getByText(/add goal/i);
      fireEvent.click(addGoalButton);
      
      expect(mockUpdateData).toHaveBeenCalledWith('businessGoals', ['']);
    });

    test('should allow updating business goals', () => {
      const dataWithGoals = {
        ...mockProfileData,
        businessGoals: ['Reduce costs by 20%']
      };
      
      render(<CompanyOverviewStep data={dataWithGoals} updateData={mockUpdateData} />);
      
      const goalInput = screen.getByPlaceholderText(/reduce production costs/i);
      fireEvent.change(goalInput, { target: { value: 'Increase revenue by 30%' } });
      
      expect(mockUpdateData).toHaveBeenCalledWith('businessGoals', ['Increase revenue by 30%']);
    });

    test('should render key challenges section for SMB', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/key challenges/i)).toBeInTheDocument();
      expect(screen.getByText(/what are your biggest operational challenges/i)).toBeInTheDocument();
    });

    test('should allow adding key challenges', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      const addChallengeButton = screen.getByText(/add challenge/i);
      fireEvent.click(addChallengeButton);
      
      expect(mockUpdateData).toHaveBeenCalledWith('keyChallenges', ['']);
    });

    test('should show strategic initiatives as optional for SMB', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/strategic initiatives \(optional\)/i)).toBeInTheDocument();
      expect(screen.getByText(/we'll help structure these if needed/i)).toBeInTheDocument();
    });

    test('should show auto-generation preview for SMB with goals', () => {
      const dataWithGoals = {
        ...mockProfileData,
        businessGoals: ['Reduce production costs by 20%'],
        keyChallenges: ['Too much manual work']
      };
      
      render(<CompanyOverviewStep data={dataWithGoals} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/ai will help create/i)).toBeInTheDocument();
      expect(screen.getByText(/cost reduction program/i)).toBeInTheDocument();
    });
  });

  describe('Enterprise Mode - Business Objectives & Full Details', () => {
    beforeEach(() => {
      mockProfileData.companySize = 'Enterprise' as const;
    });

    test('should render business objectives section for Enterprise', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/business objectives/i)).toBeInTheDocument();
      expect(screen.getByText(/high-level strategic objectives/i)).toBeInTheDocument();
    });

    test('should allow adding business objectives', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      const addObjectiveButton = screen.getByText(/add objective/i);
      fireEvent.click(addObjectiveButton);
      
      expect(mockUpdateData).toHaveBeenCalledWith('businessObjectives', [{ objective: '', targetMetric: '' }]);
    });

    test('should show full strategic initiatives section for Enterprise', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      // Use getAllByText to handle multiple instances, then check the first one
      const strategicInitiativesElements = screen.getAllByText(/strategic initiatives/i);
      expect(strategicInitiativesElements.length).toBeGreaterThan(0);
      expect(screen.queryByText(/optional/i)).not.toBeInTheDocument();
    });

    test('should show all business intelligence fields for Enterprise', () => {
      const dataWithInitiative = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Test Initiative',
          contact: { name: '', title: '', email: '', linkedin: '', phone: '' },
          businessProblems: []
        }]
      };
      
      render(<CompanyOverviewStep data={dataWithInitiative} updateData={mockUpdateData} />);
      
      // The business intelligence fields should be in the existing strategic initiative
      expect(screen.getByText(/business intelligence/i)).toBeInTheDocument();
      
      // Check for the labels as text (they show as labels within the initiative section)
      const priorityLabels = screen.getAllByText(/priority/i);
      expect(priorityLabels.length).toBeGreaterThan(0);
      
      const statusLabels = screen.getAllByText(/status/i);
      expect(statusLabels.length).toBeGreaterThan(0);
      
      const timelineLabels = screen.getAllByText(/target timeline/i);
      expect(timelineLabels.length).toBeGreaterThan(0);
      
      const budgetLabels = screen.getAllByText(/estimated budget/i);
      expect(budgetLabels.length).toBeGreaterThan(0);
    });
  });

  describe('Progressive Disclosure', () => {
    test('should allow switching between SMB and Enterprise modes', async () => {
      const { rerender } = render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      // Start with no company size selected
      expect(screen.getByText(/select your company size/i)).toBeInTheDocument();
      
      // Select SMB
      const sizeSelect = screen.getByLabelText(/company size/i);
      fireEvent.change(sizeSelect, { target: { value: 'SMB' } });
      
      // Update the component data and rerender
      const smbData = { ...mockProfileData, companySize: 'SMB' as const };
      rerender(<CompanyOverviewStep data={smbData} updateData={mockUpdateData} />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /business goals/i })).toBeInTheDocument();
      });
      
      // Switch to Enterprise
      fireEvent.change(sizeSelect, { target: { value: 'Enterprise' } });
      
      // Update the component data and rerender
      const enterpriseData = { ...mockProfileData, companySize: 'Enterprise' as const };
      rerender(<CompanyOverviewStep data={enterpriseData} updateData={mockUpdateData} />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /business objectives/i })).toBeInTheDocument();
      });
    });

    test('should show mode switch helper text', () => {
      mockProfileData.companySize = 'SMB' as const;
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/need more detailed planning/i)).toBeInTheDocument();
      expect(screen.getByText(/switch to enterprise mode/i)).toBeInTheDocument();
    });
  });

  describe('Data Integration with Normalization', () => {
    test('should integrate with profile normalization pipeline', () => {
      const smbData = {
        ...mockProfileData,
        companySize: 'SMB' as const,
        businessGoals: ['Reduce costs by 20%'],
        keyChallenges: ['Manual processes']
      };
      
      render(<CompanyOverviewStep data={smbData} updateData={mockUpdateData} />);
      
      // Should show preview of what will be auto-generated (fix casing)
      expect(screen.getByText(/Preview:/)).toBeInTheDocument();
      expect(screen.getByText(/Cost Reduction Program/)).toBeInTheDocument();
    });

    test('should preserve existing data when switching modes', () => {
      const dataWithBoth = {
        ...mockProfileData,
        companySize: 'SMB' as const,
        businessGoals: ['Test goal'],
        businessObjectives: [{ objective: 'Test objective', targetMetric: '20%' }],
        strategicInitiatives: [{
          initiative: 'Test initiative',
          contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
          businessProblems: []
        }]
      };
      
      render(<CompanyOverviewStep data={dataWithBoth} updateData={mockUpdateData} />);
      
      // Should show that data is preserved
      expect(screen.getByText(/existing data will be preserved/i)).toBeInTheDocument();
    });
  });

  describe('Validation and Help Text', () => {
    test('should show appropriate help text for each mode', () => {
      // SMB mode
      mockProfileData.companySize = 'SMB' as const;
      const { rerender } = render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/keep it simple/i)).toBeInTheDocument();
      expect(screen.getByText(/we'll structure the details/i)).toBeInTheDocument();
      
      // Enterprise mode
      mockProfileData.companySize = 'Enterprise' as const;
      rerender(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/detailed strategic planning/i)).toBeInTheDocument();
    });

    test('should validate required fields based on mode', () => {
      mockProfileData.companySize = 'SMB' as const;
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      // SMB should require at least one business goal
      expect(screen.getByText(/at least one business goal is recommended/i)).toBeInTheDocument();
    });
  });
}); 