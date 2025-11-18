import Beds24TestWidget from '@/components/Beds24TestWidget';

export default function TestBookingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Beds24 Widget Validation</h1>
      <p className="mb-4 text-gray-600">
        Testing Beds24 widget integration with Next.js 15
      </p>
      <Beds24TestWidget />
    </div>
  );
}
