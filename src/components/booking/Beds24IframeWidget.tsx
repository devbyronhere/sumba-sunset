'use client';

import { useState } from 'react';

export default function Beds24IframeWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-xl">Beds24 Demo Widget</h2>

      {isLoading && (
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="text-gray-600">Loading booking widget...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="mb-2 text-lg text-red-800">Widget Loading Error</h3>
          <p className="mb-4 text-red-700">
            Unable to load the booking widget. Please try refreshing the page.
          </p>
          <div className="space-y-2 text-sm text-red-600">
            <p>Alternative booking options:</p>
            <ul className="list-disc pl-5">
              <li>
                <a
                  href={`https://beds24.com/booking.php?propid=${widgetId}&referer=direct`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Book directly on Beds24
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Contact us directly
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <iframe
        src={`https://beds24.com/booking2.php?ownerid=${widgetId}&referer=iframe`}
        width="100%"
        height="2000"
        style={{
          maxWidth: '100%',
          border: 'none',
          overflow: 'auto',
          display: isLoading || hasError ? 'none' : 'block',
        }}
        title="Beds24 Booking Widget"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
}
