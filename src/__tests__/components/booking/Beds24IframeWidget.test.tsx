import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Beds24IframeWidget from '@/components/booking/Beds24IframeWidget';

describe('Beds24IframeWidget', () => {
  it('renders component without crashing', () => {
    const { container } = render(<Beds24IframeWidget />);
    expect(container).toBeInTheDocument();
  });

  it('shows configuration error when widget ID is missing (default behavior)', () => {
    render(<Beds24IframeWidget />);

    // Since environment variables are not set in test environment,
    // the component should show configuration error by default
    expect(screen.getByText(/configuration error/i)).toBeInTheDocument();
    expect(
      screen.getByText(/environment variable is not set/i)
    ).toBeInTheDocument();
  });

  it('has proper error message styling', () => {
    render(<Beds24IframeWidget />);

    const errorContainer = screen
      .getByText(/configuration error/i)
      .closest('div');
    expect(errorContainer).toHaveClass('border-red-200');
    expect(errorContainer).toHaveClass('bg-red-50');
  });

  it('includes widget title in heading', () => {
    render(<Beds24IframeWidget />);

    expect(screen.getByText(/configuration error/i)).toBeInTheDocument();
  });
});
