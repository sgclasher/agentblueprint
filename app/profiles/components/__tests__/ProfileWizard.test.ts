import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileWizard from '../ProfileWizard';

// Mock the child components to isolate the wizard's functionality
jest.mock('../steps/CompanyOverviewStep', () => () => <div>CompanyOverviewStep</div>);
jest.mock('../steps/SummaryStep', () => () => <div>SummaryStep</div>);
jest.mock('../MarkdownImportModal', () => () => <div>MarkdownImportModal</div>);

describe('ProfileWizard', () => {
  const mockOnComplete = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Navigation and Steps', () => {
    it('renders the first step (Company Overview) by default', () => {
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      expect(screen.getByText('CompanyOverviewStep')).toBeInTheDocument();
      // Check for the step indicators
      expect(screen.getByText('Company Overview')).toBeInTheDocument();
      expect(screen.getByText('Review & Complete')).toBeInTheDocument();
    });

    it('navigates to the next step when "Next" is clicked and data is valid', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      // Simulate valid data by directly setting it in the wizard's state via a prop if possible,
      // or by relying on the mock component's simplicity. For this test, we assume data becomes valid.
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(screen.getByText('SummaryStep')).toBeInTheDocument();
      // The first step should no longer be visible
      expect(screen.queryByText('CompanyOverviewStep')).not.toBeInTheDocument();
    });

    it('navigates back to the previous step when "Back" is clicked', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);

      // Go to the second step
      await user.click(screen.getByRole('button', { name: /next/i }));
      expect(screen.getByText('SummaryStep')).toBeInTheDocument();

      // Go back
      await user.click(screen.getByRole('button', { name: /back/i }));
      expect(screen.getByText('CompanyOverviewStep')).toBeInTheDocument();
    });

    it('calls onCancel when the "Cancel" button is clicked', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);
      
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Completion and Saving', () => {
    it('calls onComplete when "Create Profile" is clicked on the final step', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} onCancel={mockOnCancel} />);

      // Navigate to final step
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      const createButton = screen.getByRole('button', { name: /create profile/i });
      await user.click(createButton);

      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });

    it('displays and calls onSave when in edit mode', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard 
        isEditMode={true} 
        onComplete={mockOnComplete} 
        onCancel={mockOnCancel}
        onSave={mockOnSave}
      />);

      const saveButton = screen.getByRole('button', { name: /save/i });
      expect(saveButton).toBeInTheDocument();

      await user.click(saveButton);
      expect(mockOnSave).toHaveBeenCalledTimes(1);
    });
  });
}); 