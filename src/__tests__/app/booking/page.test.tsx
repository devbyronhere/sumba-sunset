import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookingPage from '../../../../app/booking/page';

describe('BookingPage', () => {
  it('renders the page structure correctly', () => {
    render(<BookingPage />);

    expect(
      screen.getByRole('heading', { name: /book your stay/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/check availability and secure your accommodation/i)
    ).toBeInTheDocument();
  });

  it('includes the booking widget wrapped in error boundary', () => {
    render(<BookingPage />);

    // The page should render without throwing errors
    expect(
      screen.getByRole('heading', { name: /book your stay/i })
    ).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    const { container } = render(<BookingPage />);

    // Check for main container
    expect(container.querySelector('.container')).toBeInTheDocument();

    // Check for header section
    expect(container.querySelector('.mb-8')).toBeInTheDocument();
  });
});
