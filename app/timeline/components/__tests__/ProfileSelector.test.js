import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileSelector from '../ProfileSelector';
import { ProfileService } from '../../../services/profileService';

// Mock ProfileService
jest.mock('../../../services/profileService', () => ({
  ProfileService: {
    getProfiles: jest.fn()
  }
}));

// Mock CSS modules
jest.mock('../ProfileSelector.module.css', () => ({
  profileSelector: 'profileSelector',
  label: 'label',
  select: 'select',
  loading: 'loading',
  error: 'error',
  noProfiles: 'noProfiles',
  selectedInfo: 'selectedInfo'
}));

const mockProfiles = [
  {
    id: 'profile-1',
    companyName: 'Acme Corp',
    industry: 'Technology',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'profile-2', 
    companyName: 'Wellspring Health',
    industry: 'Healthcare',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'profile-3',
    companyName: 'Global Manufacturing',
    industry: null, // Test missing industry
    createdAt: '2024-01-03T00:00:00Z'
  }
];

describe('ProfileSelector', () => {
  const mockOnProfileSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    ProfileService.getProfiles.mockResolvedValue(mockProfiles);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Profile Loading', () => {
    it('shows loading state initially', async () => {
      ProfileService.getProfiles.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockProfiles), 100))
      );

      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      expect(screen.getByText('Loading profiles...')).toBeInTheDocument();
      expect(screen.getByText('Client Profile')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText('Loading profiles...')).not.toBeInTheDocument();
      });
    });

    it('loads and displays profiles correctly', async () => {
      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(ProfileService.getProfiles).toHaveBeenCalledTimes(1);
      });

      // Check that select dropdown is rendered
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      // Check that all profiles are in options
      expect(screen.getByText('Acme Corp (Technology)')).toBeInTheDocument();
      expect(screen.getByText('Wellspring Health (Healthcare)')).toBeInTheDocument();
      expect(screen.getByText('Global Manufacturing')).toBeInTheDocument(); // No industry
    });

    it('handles profile loading errors gracefully', async () => {
      const errorMessage = 'Failed to load profiles';
      ProfileService.getProfiles.mockRejectedValue(new Error(errorMessage));

      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
      });

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });

  describe('Profile Selection', () => {
    beforeEach(async () => {
      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });
    });

    it('calls onProfileSelect when a profile is selected', async () => {
      const select = screen.getByRole('combobox');
      
      fireEvent.change(select, { target: { value: 'profile-1' } });

      expect(mockOnProfileSelect).toHaveBeenCalledWith(mockProfiles[0]);
    });

    it('calls onProfileSelect with null when "Select a profile..." is chosen', async () => {
      const select = screen.getByRole('combobox');
      
      // First select a profile
      fireEvent.change(select, { target: { value: 'profile-1' } });
      expect(mockOnProfileSelect).toHaveBeenCalledWith(mockProfiles[0]);

      // Then deselect
      fireEvent.change(select, { target: { value: '' } });
      expect(mockOnProfileSelect).toHaveBeenCalledWith(null);
    });

    it('displays selected profile info when a profile is selected', async () => {
      render(
        <ProfileSelector 
          selectedProfileId="profile-1"
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      });
    });

    it('handles invalid selectedProfileId gracefully', async () => {
      render(
        <ProfileSelector 
          selectedProfileId="invalid-profile-id"
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(mockOnProfileSelect).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('Edge Cases', () => {
    it('shows helpful message when no profiles exist', async () => {
      ProfileService.getProfiles.mockResolvedValue([]);

      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/No profiles found/)).toBeInTheDocument();
        expect(screen.getByText('Create a profile')).toBeInTheDocument();
      });

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('handles profiles with missing company names', async () => {
      const profilesWithMissingNames = [
        { id: 'profile-1', companyName: '', industry: 'Technology' },
        { id: 'profile-2', companyName: null, industry: 'Healthcare' }
      ];
      
      ProfileService.getProfiles.mockResolvedValue(profilesWithMissingNames);

      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Unnamed Profile (Technology)')).toBeInTheDocument();
        expect(screen.getByText('Unnamed Profile (Healthcare)')).toBeInTheDocument();
      });
    });

    it('disables select when disabled prop is true', async () => {
      render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
          disabled={true}
        />
      );

      await waitFor(() => {
        const select = screen.getByRole('combobox');
        expect(select).toBeDisabled();
      });
    });
  });

  describe('Component State Management', () => {
    it('re-fetches profiles when selectedProfileId changes', async () => {
      const { rerender } = render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(ProfileService.getProfiles).toHaveBeenCalledTimes(1);
      });

      // Change selectedProfileId
      rerender(
        <ProfileSelector 
          selectedProfileId="profile-1"
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(ProfileService.getProfiles).toHaveBeenCalledTimes(2);
      });
    });

    it('handles onProfileSelect prop changes gracefully', async () => {
      const newOnProfileSelect = jest.fn();
      
      const { rerender } = render(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={mockOnProfileSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      rerender(
        <ProfileSelector 
          selectedProfileId={null}
          onProfileSelect={newOnProfileSelect}
        />
      );

      // Wait for rerender to complete
      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'profile-1' } });

      expect(newOnProfileSelect).toHaveBeenCalledWith(mockProfiles[0]);
      expect(mockOnProfileSelect).not.toHaveBeenCalled();
    });
  });
}); 