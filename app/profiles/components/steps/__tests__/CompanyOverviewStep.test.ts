import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompanyOverviewStep from '../CompanyOverviewStep';
import { Profile } from '../../../services/types';

describe('CompanyOverviewStep', () => {
  const mockUpdateData = jest.fn();

  const baseMockProfile: Partial<Profile> = {
    id: '123',
    companyName: 'Test Corp',
    industry: 'Technology',
    strategicInitiatives: [],
    systemsAndApplications: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Business Intelligence & Problems Tests ---

  test('renders all business intelligence sections for an initiative', () => {
    const testData = {
      ...baseMockProfile,
      strategicInitiatives: [{
        initiative: 'Digital Transformation',
        contact: { name: 'John Doe', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
        businessProblems: [],
        expectedOutcomes: [],
        successMetrics: [],
      }]
    };
    render(<CompanyOverviewStep data={testData as Profile} updateData={mockUpdateData} />);
    
    expect(screen.getByRole('heading', { name: /Business Intelligence/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Business Problems/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Expected Outcomes/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Success Metrics/i })).toBeInTheDocument();
  });

  test('can add a business problem', async () => {
    const user = userEvent.setup();
    const testData = {
        ...baseMockProfile,
        strategicInitiatives: [{
            initiative: 'Digital Transformation',
            contact: { name: 'John Doe', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
            businessProblems: [],
        }]
    };
    render(<CompanyOverviewStep data={testData as Profile} updateData={mockUpdateData} />);
    
    const addProblemButton = screen.getByRole('button', { name: /Add Problem/i });
    await user.click(addProblemButton);
    
    expect(mockUpdateData).toHaveBeenCalledWith('strategicInitiatives', [
      expect.objectContaining({
        businessProblems: ['']
      })
    ]);
  });

  test('can update a business problem', async () => {
      const user = userEvent.setup();
      const testData = {
          ...baseMockProfile,
          strategicInitiatives: [{
              initiative: 'Digital Transformation',
              contact: { name: 'John Doe', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
              businessProblems: ['Initial problem'],
          }]
      };
      render(<CompanyOverviewStep data={testData as Profile} updateData={mockUpdateData} />);
      
      const problemInput = screen.getByDisplayValue('Initial problem');
      await user.clear(problemInput);
      await user.type(problemInput, 'Updated problem');

      const lastCall = mockUpdateData.mock.calls.find(call => call[0] === 'strategicInitiatives');
      expect(lastCall[1][0].businessProblems[0]).toBe('Updated problem');
  });

  test('can remove a business problem', async () => {
      const user = userEvent.setup();
      const testData = {
          ...baseMockProfile,
          strategicInitiatives: [{
            initiative: 'Digital Transformation',
            contact: { name: 'John Doe', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
              businessProblems: ['Problem to remove'],
          }]
      };
      render(<CompanyOverviewStep data={testData as Profile} updateData={mockUpdateData} />);

      const removeButton = screen.getByTestId('remove-problem-0-0');
      await user.click(removeButton);

      expect(mockUpdateData).toHaveBeenCalledWith('strategicInitiatives', [
          expect.objectContaining({
            businessProblems: []
          })
      ]);
  });

  // --- Systems & Applications Tests ---

  test('renders the systems & applications section', () => {
      render(<CompanyOverviewStep data={baseMockProfile as Profile} updateData={mockUpdateData} />);
      expect(screen.getByRole('heading', {name: 'Systems & Applications'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add system\/application/i })).toBeInTheDocument();
  });

  test('can add a new system/application', async () => {
    const user = userEvent.setup();
    render(<CompanyOverviewStep data={baseMockProfile as Profile} updateData={mockUpdateData} />);
    
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

  test('can update a system name', async () => {
    const user = userEvent.setup();
    const testData = {
      ...baseMockProfile,
      systemsAndApplications: [{ name: '', category: '' }]
    };
    render(<CompanyOverviewStep data={testData as Profile} updateData={mockUpdateData} />);

    const nameInput = screen.getByPlaceholderText('e.g., Salesforce CRM, SAP ERP');
    await user.type(nameInput, 'Salesforce CRM');

    const lastCall = mockUpdateData.mock.calls.find(call => call[0] === 'systemsAndApplications');
    expect(lastCall[1][0].name).toBe('Salesforce CRM');
  });

  test('can remove a system/application', async () => {
    const user = userEvent.setup();
    const testData = {
      ...baseMockProfile,
      systemsAndApplications: [{ name: 'Test System', category: 'CRM' }]
    };
    render(<CompanyOverviewStep data={testData as Profile} updateData={mockUpdateData} />);

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);

    expect(mockUpdateData).toHaveBeenCalledWith('systemsAndApplications', []);
  });
}); 