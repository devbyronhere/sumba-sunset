import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingErrorBoundary from '@/components/booking/BookingErrorBoundary';

// Mock console.error to suppress error boundary logs in tests
const originalError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalError;
});

// Component that throws an error when shouldThrow is true
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Child component</div>;
}

describe('BookingErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <BookingErrorBoundary>
        <ThrowError shouldThrow={false} />
      </BookingErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('renders error fallback when child component throws', () => {
    render(
      <BookingErrorBoundary>
        <ThrowError shouldThrow={true} />
      </BookingErrorBoundary>
    );

    expect(
      screen.getByText(/booking system temporarily unavailable/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/experiencing technical difficulties/i)
    ).toBeInTheDocument();
  });

  it('shows refresh button in error state', () => {
    render(
      <BookingErrorBoundary>
        <ThrowError shouldThrow={true} />
      </BookingErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument();
  });

  it('shows alternative booking links in error state', () => {
    render(
      <BookingErrorBoundary>
        <ThrowError shouldThrow={true} />
      </BookingErrorBoundary>
    );

    expect(screen.getByText(/book directly on beds24/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us directly/i)).toBeInTheDocument();
  });

  it('calls window.location.reload when refresh button is clicked', () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    render(
      <BookingErrorBoundary>
        <ThrowError shouldThrow={true} />
      </BookingErrorBoundary>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh page/i });
    fireEvent.click(refreshButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <BookingErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </BookingErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(
      screen.queryByText(/booking system temporarily unavailable/i)
    ).not.toBeInTheDocument();
  });
});
