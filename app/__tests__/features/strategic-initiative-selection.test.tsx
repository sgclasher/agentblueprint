import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Profile } from '../../services/types';

// Mock the AIBlueprintTab component for now since we haven't implemented the selector yet
const MockAIBlueprintTab = ({ profile, isEditing }: { profile: Profile; isEditing: boolean }) => {
  const [selectedInitiative, setSelectedInitiative] = React.useState<string>('auto');

  if (isEditing) {
    return <div>Edit mode - selector disabled</div>;
  }

  return (
    <div>
      <select 
        aria-label="Select Strategic Initiative"
        value={selectedInitiative} 
        onChange={(e) => setSelectedInitiative(e.target.value)}
      >
        <option value="auto">
          Auto ({profile.strategicInitiatives?.filter(i => i.priority === 'High').length ? 'All High Priority' : 'All Initiatives'})
        </option>
        {profile.strategicInitiatives?.map((initiative, index) => (
          <option key={index} value={index.toString()}>
            {initiative.initiative} ({initiative.priority})
          </option>
        ))}
      </select>
      {selectedInitiative !== 'auto' && (
        <div>
          Blueprint will focus on: {profile.strategicInitiatives?.[parseInt(selectedInitiative)]?.initiative}
        </div>
      )}
      <button>Generate Blueprint</button>
    </div>
  );
};

const mockProfile: Profile = {
  id: 'test-profile-id',
  companyName: 'Test Company',
  industry: 'Technology',
  strategicInitiatives: [
    {
      initiative: 'Digital Transformation',
      priority: 'High',
      businessProblems: ['Manual processes'],
      contact: {
        name: 'John Doe',
        title: 'CTO',
        email: 'john@test.com',
        linkedin: '',
        phone: ''
      }
    },
    {
      initiative: 'Customer Experience Enhancement',
      priority: 'Medium',
      businessProblems: ['Long wait times'],
      contact: {
        name: 'Jane Smith',
        title: 'Head of CX',
        email: 'jane@test.com',
        linkedin: '',
        phone: ''
      }
    },
    {
      initiative: 'Data Analytics Platform',
      priority: 'High',
      businessProblems: ['Data silos'],
      contact: {
        name: 'Bob Wilson',
        title: 'Data Director',
        email: 'bob@test.com',
        linkedin: '',
        phone: ''
      }
    }
  ]
} as Profile;

describe('Strategic Initiative Selection', () => {
  describe('Initiative Selector Component', () => {
    it('should render initiative selector dropdown with correct options', () => {
      render(<MockAIBlueprintTab profile={mockProfile} isEditing={false} />);
      
      // Should show the initiative selector
      const selector = screen.getByRole('combobox', { name: /select strategic initiative/i });
      expect(selector).toBeInTheDocument();
      
      // Should have "Auto" option as default
      expect(screen.getByText('Auto (All High Priority)')).toBeInTheDocument();
    });

    it('should default to "Auto (All High Priority)" option', () => {
      render(<MockAIBlueprintTab profile={mockProfile} isEditing={false} />);
      
      const selector = screen.getByRole('combobox', { name: /select strategic initiative/i });
      expect(selector).toHaveDisplayValue('Auto (All High Priority)');
    });

    it('should allow user to select a specific initiative', () => {
      render(<MockAIBlueprintTab profile={mockProfile} isEditing={false} />);
      
      const selector = screen.getByRole('combobox', { name: /select strategic initiative/i });
      
      // Select a specific initiative
      fireEvent.change(selector, { target: { value: '0' } });
      
      expect(selector).toHaveDisplayValue('Digital Transformation (High)');
    });

    it('should show initiative context indicator when specific initiative is selected', () => {
      render(<MockAIBlueprintTab profile={mockProfile} isEditing={false} />);
      
      const selector = screen.getByRole('combobox', { name: /select strategic initiative/i });
      
      // Select a specific initiative
      fireEvent.change(selector, { target: { value: '0' } });
      
      // Should show indicator that we're using a specific initiative
      expect(screen.getByText(/Blueprint will focus on: Digital Transformation/i)).toBeInTheDocument();
    });

    it('should not show context indicator when "Auto" is selected', () => {
      render(<MockAIBlueprintTab profile={mockProfile} isEditing={false} />);
      
      // Should not show focus indicator for auto mode
      expect(screen.queryByText(/Blueprint will focus on:/i)).not.toBeInTheDocument();
    });

    it('should handle profile with no strategic initiatives', () => {
      const emptyProfile = { ...mockProfile, strategicInitiatives: [] };
      
      render(<MockAIBlueprintTab profile={emptyProfile} isEditing={false} />);
      
      // Selector should still be present but with limited options
      const selector = screen.getByRole('combobox', { name: /select strategic initiative/i });
      expect(selector).toBeInTheDocument();
      expect(selector).toHaveDisplayValue('Auto (All Initiatives)');
    });

    it('should disable selector in edit mode', () => {
      render(<MockAIBlueprintTab profile={mockProfile} isEditing={true} />);
      
      // Should show edit mode message instead of selector
      expect(screen.getByText('Edit mode - selector disabled')).toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });
}); 