import Beds24IframeWidget from '@/components/booking/Beds24IframeWidget';

export default function BookingPage() {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Beds24 Booking Widget</h1>
        <Beds24IframeWidget />
      </div>
    </div>
  );
}
