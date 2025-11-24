'use client';

import Script from 'next/script';

/**
 * Google Analytics component for tracking user behavior and analytics.
 * This component loads the GA4 tracking script and initializes tracking.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 *
 * Usage:
 * - Add this component to your root layout (app/layout.tsx)
 * - Ensure NEXT_PUBLIC_GA_MEASUREMENT_ID is set in your environment variables
 * - Only renders in production to avoid tracking development traffic
 */
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't load GA in development or if measurement ID is not set
  if (!measurementId || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Load the Google Analytics script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      {/* Initialize Google Analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
