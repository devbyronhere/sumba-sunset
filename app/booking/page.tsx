import { Metadata } from 'next';
import Beds24IframeWidget from '@/components/booking/Beds24IframeWidget';
import BookingErrorBoundary from '@/components/booking/BookingErrorBoundary';

export const metadata: Metadata = {
  title: 'Book Your Stay | Sumba Sunset Surf Camp',
  description:
    'Check availability and book your surf camp accommodation in Sumba, Indonesia',
};

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Book Your Stay</h1>
        <p className="text-lg text-gray-600">
          Check availability and secure your accommodation at Sumba Sunset Surf
          Camp.
        </p>
      </div>

      <BookingErrorBoundary>
        <Beds24IframeWidget />
      </BookingErrorBoundary>
    </div>
  );
}
