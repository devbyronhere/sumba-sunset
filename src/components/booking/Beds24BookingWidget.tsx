'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// Extend Window interface to include jQuery
declare global {
  interface Window {
    jQuery?: JQueryStatic;
  }
}

// Define JQueryStatic type for the jQuery function
interface JQueryStatic {
  (selector: string): JQueryElement;
}

// Define JQueryElement type for jQuery objects
interface JQueryElement {
  bookWidget(options: BookWidgetOptions): void;
}

// Define Beds24 widget options
interface BookWidgetOptions {
  propid: string;
  formAction: string;
  widgetLang: string;
  widgetType: string;
}

export default function Beds24BookingWidget() {
  const widgetId = process.env.NEXT_PUBLIC_BEDS24_WIDGET_ID;
  const propertyId = '297772'; // Your property ID from the widget code
  // Use static ID to avoid hydration mismatch
  const widgetDivId = `bookWidget-${widgetId}-${propertyId}-0`;
  const [isClient, setIsClient] = useState(false);
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [widgetScriptLoaded, setWidgetScriptLoaded] = useState(false);

  useEffect(() => {
    // Set client-side flag to avoid hydration issues
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only initialize widget after both scripts are loaded
    if (!isClient || !jQueryLoaded || !widgetScriptLoaded) {
      console.log(
        'Widget initialization waiting:',
        'isClient:',
        isClient,
        'jQuery:',
        jQueryLoaded,
        'widgetScript:',
        widgetScriptLoaded
      );
      return;
    }

    console.log('Initializing Beds24 widget...');

    const initializeWidget = () => {
      if (typeof window !== 'undefined' && window.jQuery) {
        const $ = window.jQuery;
        console.log('jQuery found, calling bookWidget()');
        $(`#${widgetDivId}`).bookWidget({
          propid: propertyId,
          formAction: 'https://beds24.com/booking.php',
          widgetLang: 'en',
          widgetType: 'BookingStrip',
        });
        console.log('bookWidget() called successfully');
      } else {
        console.error('jQuery not found on window object');
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeWidget, 200);
    return () => clearTimeout(timer);
  }, [isClient, jQueryLoaded, widgetScriptLoaded, widgetDivId, propertyId]);

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
    <>
      {/* Load jQuery first (required by Beds24 widget) */}
      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('jQuery loaded');
          setJQueryLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load jQuery');
        }}
      />

      {/* Load jQuery UI (required by Beds24 widget) */}
      <Script
        src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('jQuery UI loaded');
        }}
        onError={() => {
          console.error('Failed to load jQuery UI');
        }}
      />

      {/* Load Beds24 widget script (depends on jQuery) */}
      <Script
        src="https://media.xmlcal.com/widget/1.01/js/bookWidget.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Beds24 widget script loaded');
          setWidgetScriptLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load Beds24 widget script');
        }}
      />

      {/* Widget container */}
      <div className="rounded-lg border p-4">
        <div id={widgetDivId} className="min-h-[200px]">
          {!widgetScriptLoaded && (
            <p className="text-gray-500">Loading booking widget...</p>
          )}
        </div>
      </div>
    </>
  );
}
