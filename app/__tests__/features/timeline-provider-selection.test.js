import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useBusinessProfileStore from '../../store/useBusinessProfileStore';
import TimelineSidebar from '../../timeline/components/TimelineSidebar';

// Mock the entire store
jest.mock('../../store/useBusinessProfileStore');

// Mock the ProviderSelector component
jest.mock('../../timeline/components/ProviderSelector', () => {
  return function MockProviderSelector({ selectedProvider, onProviderChange }) {
    return (
      <div>
        <label htmlFor="provider-select">AI Provider</label>
        <select
          id="provider-select"
          value={selectedProvider}
          onChange={(e) => onProviderChange(e.target.value)}
        >
          <option value="openai">OpenAI</option>
          <option value="gemini">Google Gemini</option>
        </select>
      </div>
    );
  };
});

describe('TimelineSidebar Provider Selection', () => {
  const mockProfile = { id: 'profile-1', companyName: 'Test Inc.' };
  let regenerateTimelineFromProfile;
  let setSelectedProvider;

  beforeEach(() => {
    // Reset mocks before each test
    regenerateTimelineFromProfile = jest.fn();
    setSelectedProvider = jest.fn();

    // Setup the mock implementation for the store hook
    useBusinessProfileStore.mockReturnValue({
      selectedProvider: 'openai',
      regenerateTimelineFromProfile,
      setSelectedProvider,
    });
  });

  test('should call regenerateTimelineFromProfile with the newly selected provider', async () => {
    render(
      <TimelineSidebar
        sections={[]}
        activeSection=""
        onSectionClick={() => {}}
        theme="dark"
        onThemeToggle={() => {}}
        timelineCached={false}
        timelineGeneratedAt={new Date().toISOString()}
        timelineScenarioType="balanced"
        onRegenerateTimeline={regenerateTimelineFromProfile}
        isGenerating={false}
        currentProfile={mockProfile}
        timelineProvider="openai"
      />
    );

    // Find the select dropdown and the button
    const providerSelect = screen.getByLabelText('AI Provider');
    const regenerateButton = screen.getByRole('button', { name: /regenerate timeline/i });

    // Simulate user selecting a new provider
    fireEvent.change(providerSelect, { target: { value: 'gemini' } });
    
    // The component should call setSelectedProvider on change
    expect(setSelectedProvider).toHaveBeenCalledWith('gemini');

    // Simulate clicking the regenerate button
    fireEvent.click(regenerateButton);

    // Verify that the regenerate function was called with the correct parameters
    await waitFor(() => {
      expect(regenerateTimelineFromProfile).toHaveBeenCalledWith(
        mockProfile,
        'balanced', // The scenario type passed in props
        'gemini'     // The newly selected provider
      );
    });
  });
}); 