import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelineWidgetContainer from '../TimelineWidgetContainer';

// Mock CSS modules
jest.mock('../TimelineWidgetContainer.module.css', () => ({
  widgetContainer: 'widgetContainer',
  header: 'header',
  title: 'title',
  expandButton: 'expandButton',
  content: 'content',
  expanded: 'expanded',
  collapsed: 'collapsed'
}));

describe('TimelineWidgetContainer', () => {
  const mockChildren = <div data-testid="mock-children">Test Content</div>;

  it('renders with title and expand button', () => {
    render(
      <TimelineWidgetContainer title="Test Widget">
        {mockChildren}
      </TimelineWidgetContainer>
    );

    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByLabelText('Expand')).toBeInTheDocument();
  });

  it('starts collapsed by default', () => {
    render(
      <TimelineWidgetContainer title="Test Widget">
        {mockChildren}
      </TimelineWidgetContainer>
    );

    // Content should not be visible when collapsed
    expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
  });

  it('expands when expand button is clicked', () => {
    render(
      <TimelineWidgetContainer title="Test Widget">
        {mockChildren}
      </TimelineWidgetContainer>
    );

    const expandButton = screen.getByLabelText('Expand');
    fireEvent.click(expandButton);

    // Content should be visible when expanded
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('collapses when expand button is clicked again', () => {
    render(
      <TimelineWidgetContainer title="Test Widget">
        {mockChildren}
      </TimelineWidgetContainer>
    );

    const expandButton = screen.getByLabelText('Expand');
    
    // Expand first
    fireEvent.click(expandButton);
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    
    // Then collapse - label changes to 'Collapse'
    const collapseButton = screen.getByLabelText('Collapse');
    fireEvent.click(collapseButton);
    expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
  });

  it('shows correct expand/collapse icons', () => {
    render(
      <TimelineWidgetContainer title="Test Widget">
        {mockChildren}
      </TimelineWidgetContainer>
    );

    const expandButton = screen.getByLabelText('Expand');
    
    // Should show down arrow when collapsed
    expect(expandButton).toHaveTextContent('▼');
    
    // Should show up arrow when expanded
    fireEvent.click(expandButton);
    const collapseButton = screen.getByLabelText('Collapse');
    expect(collapseButton).toHaveTextContent('▲');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <TimelineWidgetContainer title="Test Widget" className="custom-class">
        {mockChildren}
      </TimelineWidgetContainer>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('supports controlled expanded state', () => {
    const { rerender } = render(
      <TimelineWidgetContainer title="Test Widget" expanded={false}>
        {mockChildren}
      </TimelineWidgetContainer>
    );

    expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();

    rerender(
      <TimelineWidgetContainer title="Test Widget" expanded={true}>
        {mockChildren}
      </TimelineWidgetContainer>
    );

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('calls onToggle when provided', () => {
    const mockOnToggle = jest.fn();
    
    render(
      <TimelineWidgetContainer title="Test Widget" onToggle={mockOnToggle}>
        {mockChildren}
      </TimelineWidgetContainer>
    );

    const expandButton = screen.getByLabelText('Expand');
    fireEvent.click(expandButton);

    expect(mockOnToggle).toHaveBeenCalledWith(true);
  });
}); 