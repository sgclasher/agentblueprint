import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompanyOverviewStep from '../CompanyOverviewStep';
import { jest } from '@jest/globals';

describe('CompanyOverviewStep - Business Problems Feature', () => {
  const mockUpdateData = jest.fn();
  
  const mockProfileData = {
    companyName: 'Test Corp',
    industry: 'Technology',
    employeeCount: '500',
    annualRevenue: '$100M',
    primaryLocation: 'San Francisco, CA',
    websiteUrl: 'https://testcorp.com',
    strategicInitiatives: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Strategic Initiative with Business Problems', () => {
    test('renders business problems section for each initiative', async () => {
      const user = userEvent.setup();
      const dataWithInitiative = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Digital Transformation',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          },
          businessProblems: []
        }]
      };

      render(<CompanyOverviewStep data={dataWithInitiative} updateData={mockUpdateData} />);
      
      // Check that business problems section is rendered
      expect(screen.getByRole('heading', { name: /business problems/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add problem/i })).toBeInTheDocument();
      expect(screen.getByText('No business problems added yet. Click "Add Problem" to start.')).toBeInTheDocument();
    });

    test('can add business problems to an initiative', async () => {
      const user = userEvent.setup();
      const dataWithInitiative = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Digital Transformation',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          },
          businessProblems: []
        }]
      };

      render(<CompanyOverviewStep data={dataWithInitiative} updateData={mockUpdateData} />);
      
      // Click add problem button
      await user.click(screen.getByRole('button', { name: /add problem/i }));
      
      // Check that updateData was called with correct parameters
      expect(mockUpdateData).toHaveBeenCalledWith('strategicInitiatives', [{
        initiative: 'Digital Transformation',
        contact: {
          name: 'John Doe',
          title: 'CTO',
          email: 'john@testcorp.com',
          linkedin: '',
          phone: ''
        },
        businessProblems: ['']
      }]);
    });

    test('displays existing business problems', () => {
      const dataWithProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Digital Transformation',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          },
          businessProblems: [
            'Manual data entry causing delays',
            'Legacy systems integration issues'
          ]
        }]
      };

      render(<CompanyOverviewStep data={dataWithProblems} updateData={mockUpdateData} />);
      
      // Check that problems are displayed
      const problemInputs = screen.getAllByPlaceholderText(/manual data entry causing delays and errors/i);
      expect(problemInputs).toHaveLength(2);
      
      // Check that remove buttons are present
      const removeButtons = screen.getAllByTitle('Remove problem');
      expect(removeButtons).toHaveLength(2);
    });

    test('can update business problem text', async () => {
      const user = userEvent.setup();
      const dataWithProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Digital Transformation',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          },
          businessProblems: ['Old problem text']
        }]
      };

      render(<CompanyOverviewStep data={dataWithProblems} updateData={mockUpdateData} />);
      
      // Find the problem input and update it
      const problemInput = screen.getByDisplayValue('Old problem text');
      await user.clear(problemInput);
      fireEvent.change(problemInput, { target: { value: 'Updated problem text' } });
      
      // Check that updateData was called with updated text
      expect(mockUpdateData).toHaveBeenCalledWith('strategicInitiatives', [{
        initiative: 'Digital Transformation',
        contact: {
          name: 'John Doe',
          title: 'CTO',
          email: 'john@testcorp.com',
          linkedin: '',
          phone: ''
        },
        businessProblems: ['Updated problem text']
      }]);
    });

    test('can remove business problems', async () => {
      const user = userEvent.setup();
      const dataWithProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Digital Transformation',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          },
          businessProblems: [
            'Problem 1',
            'Problem 2'
          ]
        }]
      };

      render(<CompanyOverviewStep data={dataWithProblems} updateData={mockUpdateData} />);
      
      // Click the first remove button
      const removeButtons = screen.getAllByTitle('Remove problem');
      await user.click(removeButtons[0]);
      
      // Check that updateData was called with the first problem removed
      expect(mockUpdateData).toHaveBeenCalledWith('strategicInitiatives', [{
        initiative: 'Digital Transformation',
        contact: {
          name: 'John Doe',
          title: 'CTO',
          email: 'john@testcorp.com',
          linkedin: '',
          phone: ''
        },
        businessProblems: ['Problem 2']
      }]);
    });

    test('shows helpful tip when problems exist', () => {
      const dataWithProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Digital Transformation',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          },
          businessProblems: ['Some problem']
        }]
      };

      render(<CompanyOverviewStep data={dataWithProblems} updateData={mockUpdateData} />);
      
      expect(screen.getByText(/tip: add specific, measurable outcomes/i)).toBeInTheDocument();
    });

    test('handles multiple initiatives with business problems', () => {
      const dataWithMultipleInitiatives = {
        ...mockProfileData,
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: { name: 'John Doe', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
            businessProblems: ['Problem 1', 'Problem 2']
          },
          {
            initiative: 'AI Implementation',
            contact: { name: 'Jane Smith', title: 'VP Tech', email: 'jane@test.com', linkedin: '', phone: '' },
            businessProblems: ['Problem 3']
          }
        ]
      };

      render(<CompanyOverviewStep data={dataWithMultipleInitiatives} updateData={mockUpdateData} />);
      
      // Should have two business problems sections
      const businessProblemsHeaders = screen.getAllByRole('heading', { name: /business problems/i });
      expect(businessProblemsHeaders).toHaveLength(2);
      
      // Should have correct number of problem inputs
      const problemInputs = screen.getAllByPlaceholderText(/manual data entry causing delays and errors/i);
      expect(problemInputs).toHaveLength(3); // 2 + 1 = 3 total problems
    });
  });

  describe('Backward Compatibility', () => {
    test('handles initiatives without businessProblems field', () => {
      const dataWithoutBusinessProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Legacy Initiative',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          }
          // Note: no businessProblems field
        }]
      };

      render(<CompanyOverviewStep data={dataWithoutBusinessProblems} updateData={mockUpdateData} />);
      
      // Should still render the business problems section
      expect(screen.getByRole('heading', { name: /business problems/i })).toBeInTheDocument();
      expect(screen.getByText('No business problems added yet. Click "Add Problem" to start.')).toBeInTheDocument();
    });

    test('adding problems to initiative without businessProblems field creates the field', async () => {
      const user = userEvent.setup();
      const dataWithoutBusinessProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Legacy Initiative',
          contact: {
            name: 'John Doe',
            title: 'CTO',
            email: 'john@testcorp.com',
            linkedin: '',
            phone: ''
          }
          // Note: no businessProblems field
        }]
      };

      render(<CompanyOverviewStep data={dataWithoutBusinessProblems} updateData={mockUpdateData} />);
      
      // Click add problem button
      await user.click(screen.getByRole('button', { name: /add problem/i }));
      
      // Check that updateData was called with businessProblems field added
      expect(mockUpdateData).toHaveBeenCalledWith('strategicInitiatives', [{
        initiative: 'Legacy Initiative',
        contact: {
          name: 'John Doe',
          title: 'CTO',
          email: 'john@testcorp.com',
          linkedin: '',
          phone: ''
        },
        businessProblems: ['']
      }]);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty strategic initiatives array', () => {
      render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
      
      // Should show add initiative button
      expect(screen.getByRole('button', { name: /add strategic initiative/i })).toBeInTheDocument();
      
      // Should not show any business problems sections
      expect(screen.queryByText('Business Problems')).not.toBeInTheDocument();
    });

    test('handles undefined strategic initiatives', () => {
      const dataWithoutInitiatives = {
        ...mockProfileData,
        strategicInitiatives: undefined
      };

      expect(() => {
        render(<CompanyOverviewStep data={dataWithoutInitiatives} updateData={mockUpdateData} />);
      }).not.toThrow();
    });

    test('handles null businessProblems array', () => {
      const dataWithNullProblems = {
        ...mockProfileData,
        strategicInitiatives: [{
          initiative: 'Test Initiative',
          contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
          businessProblems: null
        }]
      };

      expect(() => {
        render(<CompanyOverviewStep data={dataWithNullProblems} updateData={mockUpdateData} />);
      }).not.toThrow();
      
      expect(screen.getByText('No business problems added yet. Click "Add Problem" to start.')).toBeInTheDocument();
    });
  });
});

describe('CompanyOverviewStep - Systems & Applications Feature', () => {
  const mockUpdateData = jest.fn();
  
  const mockProfileData = {
    companyName: 'Test Corp',
    industry: 'Technology',
    strategicInitiatives: [],
    systemsAndApplications: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the systems & applications section', () => {
    render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
    
    expect(screen.getByText('Systems & Applications')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add system\/application/i })).toBeInTheDocument();
  });

  test('can add a new system/application', async () => {
    const user = userEvent.setup();
    render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
    
    await user.click(screen.getByRole('button', { name: /add system\/application/i }));
    
    expect(mockUpdateData).toHaveBeenCalledWith('systemsAndApplications', [
      {
        name: '',
        category: '',
        vendor: '',
        version: '',
        description: '',
        criticality: undefined,
      },
    ]);
  });

  test('can update a system/application\'s fields', async () => {
    const user = userEvent.setup();
    const dataWithSystem = {
      ...mockProfileData,
      systemsAndApplications: [{
        name: '',
        category: '',
        vendor: '',
        version: '',
        description: '',
        criticality: undefined,
      }]
    };
    render(<CompanyOverviewStep data={dataWithSystem} updateData={mockUpdateData} />);

    const nameInput = screen.getByPlaceholderText('e.g., Salesforce CRM, SAP ERP');
    fireEvent.change(nameInput, { target: { value: 'Salesforce CRM' } });

    expect(mockUpdateData).toHaveBeenCalledWith('systemsAndApplications', [
      expect.objectContaining({ name: 'Salesforce CRM' })
    ]);

    const categorySelect = screen.getByDisplayValue('Select category');
    await user.selectOptions(categorySelect, 'CRM');

    expect(mockUpdateData).toHaveBeenCalledWith('systemsAndApplications', [
      expect.objectContaining({ category: 'CRM' })
    ]);
  });

  test('can remove a system/application', async () => {
    const user = userEvent.setup();
    const dataWithSystem = {
      ...mockProfileData,
      systemsAndApplications: [{ name: 'Test System', category: 'CRM' }]
    };
    render(<CompanyOverviewStep data={dataWithSystem} updateData={mockUpdateData} />);

    expect(screen.getByText('System 1')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);

    expect(mockUpdateData).toHaveBeenCalledWith('systemsAndApplications', []);
  });

  test('handles an empty systemsAndApplications array', () => {
    render(<CompanyOverviewStep data={mockProfileData} updateData={mockUpdateData} />);
    expect(screen.queryByText('System 1')).not.toBeInTheDocument();
  });

  test('handles undefined systemsAndApplications property gracefully', () => {
    const dataWithoutSystems = { ...mockProfileData, systemsAndApplications: undefined };
    render(<CompanyOverviewStep data={dataWithoutSystems} updateData={mockUpdateData} />);
    
    expect(screen.getByRole('button', { name: /add system\/application/i })).toBeInTheDocument();
    expect(screen.queryByText('System 1')).not.toBeInTheDocument();
  });
}); 