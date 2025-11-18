// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Sample rate for performance monitoring
  tracesSampleRate: 1.0,

  // Debug mode only in development
  debug: process.env.NODE_ENV === 'development',

  // Session replay for debugging
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Integrations for enhanced error tracking
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Environment detection
  environment: process.env.NODE_ENV,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
