'use client';

export default function Beds24TestWidget() {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl">Beds24 Demo Widget</h2>
      <iframe
        src="https://beds24.com/booking2.php?ownerid=153425&referer=iframe"
        width="800"
        height="2000"
        style={{ maxWidth: '100%', border: 'none', overflow: 'auto' }}
        title="Beds24 Booking Widget"
      />
    </div>
  );
}
