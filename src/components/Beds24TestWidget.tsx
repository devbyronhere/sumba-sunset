'use client';

export default function Beds24TestWidget() {
  const widgetId = process.env.NEXT_PUBLIC_BEDS24_WIDGET_ID;

  if (!widgetId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="mb-2 text-xl text-red-800">Configuration Error</h2>
        <p className="text-red-700">
          NEXT_PUBLIC_BEDS24_WIDGET_ID environment variable is not set.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl">Beds24 Demo Widget</h2>
      <iframe
        src={`https://beds24.com/booking2.php?ownerid=${widgetId}&referer=iframe`}
        width="800"
        height="2000"
        style={{ maxWidth: '100%', border: 'none', overflow: 'auto' }}
        title="Beds24 Booking Widget"
      />
    </div>
  );
}
