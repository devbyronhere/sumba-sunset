---
task_id: ss-8
title: '[Infrastructure] Monitoring Setup - Sentry, GA4, UptimeRobot'
status: not_started
priority: medium
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-1, ss-2, ss-3, ss-4]
created: 2025-01-20
started: null
completed: null
related_docs: ['.claude/docs/architecture.md']
branch: ss-8/infra/monitoring
pr_number: null
---

[← Previous: SS-7 Vercel Blob](./ss-7-vercel-blob-integration.md) | [📋 Index](./index.md) | [Next: SS-10 Beds24 Validation →](./ss-10-beds24-validation.md)

# [Infrastructure] Monitoring Setup - Sentry, GA4, UptimeRobot

## Overview

Set up comprehensive monitoring for the Sumba Sunset website including error tracking (Sentry), analytics (Google Analytics 4), and uptime monitoring (UptimeRobot). This ensures we can track user behavior, catch errors early, and maintain high availability.

**Project Context:**

- Production site needs error monitoring
- Marketing site needs analytics for conversion tracking
- Business needs uptime monitoring for SLA
- Mobile-first means mobile analytics are critical

**Business Value:**

- Catch and fix errors before users report them
- Understand user behavior and improve conversions
- Ensure site availability for bookings
- Track marketing campaign effectiveness
- Data-driven decision making

---

## Prerequisites/Dependencies

- [x] SS-1: Next.js Project Setup completed
- [x] SS-2: Linting & Formatting Setup completed
- [x] SS-3: Domain Configuration (for uptime monitoring)
- [x] SS-4: Credentials Setup (need monitoring service keys)
- [x] User creates accounts for services

---

## Acceptance Criteria

Clear, testable criteria that define "done":

- [ ] **AC1**: Sentry error tracking configured and capturing errors
- [ ] **AC2**: GA4 analytics tracking page views and events
- [ ] **AC3**: UptimeRobot monitoring production domain
- [ ] **AC4**: Privacy-compliant cookie consent implemented
- [ ] **AC5**: Custom events tracked (booking clicks, contact form)
- [ ] **AC6**: Performance monitoring enabled
- [ ] **AC7**: Alerts configured for critical issues
- [ ] **AC8**: Dashboard links documented

---

## Verification Steps

_Note: This is infrastructure - verification instead of unit tests_

### Monitoring Verification

1. **Error Tracking Verification**
   - Test error captured in Sentry
   - Source maps working
   - User context attached
   - Performance data collected

2. **Analytics Verification**
   - Page views tracked
   - Custom events firing
   - Conversion goals set up
   - Mobile vs desktop segmented

3. **Uptime Verification**
   - Monitor configured for domain
   - Alerts set up
   - Status page available
   - Response time tracked

---

## Implementation Steps

### Phase 1: Sentry Error Tracking

- [ ] **Step 1.1**: Install Sentry SDK

  ```bash
  yarn add @sentry/nextjs
  ```

- [ ] **Step 1.2**: Run Sentry wizard

  ```bash
  yarn dlx @sentry/wizard@latest -i nextjs
  ```

  - This creates configuration files
  - Updates Next.js config
  - Sets up source maps

- [ ] **Step 1.3**: Configure Sentry settings

  ```typescript
  // sentry.client.config.ts
  import * as Sentry from '@sentry/nextjs';

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: process.env.NODE_ENV === 'development',
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
  ```

- [ ] **Step 1.4**: Add error boundary

  ```typescript
  // src/app/global-error.tsx
  'use client';

  export default function GlobalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    // Log to Sentry
    // Display user-friendly error
  }
  ```

- [ ] **Step 1.5**: Test error capture
  - Create test error page
  - Trigger error
  - Verify in Sentry dashboard

**Checkpoint:** Sentry capturing errors with source maps

---

### Phase 2: Google Analytics 4

- [ ] **Step 2.1**: Install GA4 package

  ```bash
  yarn add @next/third-parties
  ```

- [ ] **Step 2.2**: Add GA4 to layout

  ```typescript
  // src/app/layout.tsx
  import { GoogleAnalytics } from '@next/third-parties/google'

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        </body>
      </html>
    )
  }
  ```

- [ ] **Step 2.3**: Create analytics utility

  ```typescript
  // src/lib/analytics.ts
  export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };
  ```

- [ ] **Step 2.4**: Track custom events

  ```typescript
  // Track booking widget interactions
  trackEvent('click', 'booking', 'widget_open');

  // Track contact form submissions
  trackEvent('submit', 'contact_form', 'whatsapp');

  // Track navigation
  trackEvent('navigate', 'menu', 'mobile_menu');
  ```

- [ ] **Step 2.5**: Set up conversion goals
  - Contact form submission
  - Booking widget interaction
  - WhatsApp click
  - Phone number click

**Checkpoint:** GA4 tracking page views and custom events

---

### Phase 3: Cookie Consent (GDPR/Privacy)

- [ ] **Step 3.1**: Create cookie consent component

  ```typescript
  // src/components/CookieConsent.tsx
  'use client';

  export function CookieConsent() {
    // Show banner on first visit
    // Store preference in localStorage
    // Only load analytics if consented
  }
  ```

- [ ] **Step 3.2**: Implement consent management

  ```typescript
  // src/lib/consent.ts
  export const hasConsent = () => {
    return localStorage.getItem('cookie-consent') === 'accepted';
  };

  export const grantConsent = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    // Load analytics scripts
  };

  export const denyConsent = () => {
    localStorage.setItem('cookie-consent', 'denied');
    // Disable analytics
  };
  ```

- [ ] **Step 3.3**: Conditionally load analytics
  - Only load GA4 if consent granted
  - Respect user privacy choices
  - Provide way to change preference

- [ ] **Step 3.4**: Add privacy policy page
  - Explain data collection
  - List third-party services
  - Provide contact information

**Checkpoint:** Privacy-compliant analytics implementation

---

### Phase 4: UptimeRobot Monitoring

**Note: This requires domain to be live (SS-3)**

- [ ] **Step 4.1**: Create UptimeRobot account (USER)
  - Sign up at uptimerobot.com
  - Free plan includes 50 monitors

- [ ] **Step 4.2**: Configure monitor (USER)
  - Monitor Type: HTTP(s)
  - URL: https://sumbasunset.com
  - Interval: 5 minutes
  - Timeout: 30 seconds

- [ ] **Step 4.3**: Set up alerts (USER)
  - Email alerts
  - Optional: SMS (paid feature)
  - Optional: Webhook to Slack

- [ ] **Step 4.4**: Create status page
  - Public status page URL
  - Add to site footer
  - Show uptime percentage

- [ ] **Step 4.5**: Add additional monitors
  - API health check endpoint
  - Booking widget availability
  - Contact form endpoint

**Checkpoint:** Uptime monitoring active with alerts

---

### Phase 5: Performance Monitoring

- [ ] **Step 5.1**: Enable Web Vitals tracking

  ```typescript
  // src/app/layout.tsx
  import { sendToAnalytics } from '@/lib/analytics';

  export function reportWebVitals(metric: any) {
    // Send to GA4
    sendToAnalytics(metric);

    // Send to Sentry
    if (metric.label === 'web-vital') {
      Sentry.captureMessage(`Web Vital: ${metric.name}`, {
        level: 'info',
        extra: metric,
      });
    }
  }
  ```

- [ ] **Step 5.2**: Add Vercel Analytics

  ```bash
  yarn add @vercel/analytics
  ```

  ```typescript
  // src/app/layout.tsx
  import { Analytics } from '@vercel/analytics/react';

  // Add <Analytics /> component
  ```

- [ ] **Step 5.3**: Configure performance budgets
  - First Contentful Paint: < 1.8s
  - Time to Interactive: < 3.9s
  - Cumulative Layout Shift: < 0.1

- [ ] **Step 5.4**: Set up performance alerts
  - Alert if Core Web Vitals degrade
  - Monitor mobile performance specifically

**Checkpoint:** Performance monitoring configured

---

### Phase 6: Documentation & Dashboards

- [ ] **Step 6.1**: Document dashboard URLs
  - Sentry: [URL]
  - GA4: [URL]
  - UptimeRobot: [URL]
  - Vercel Analytics: [URL]

- [ ] **Step 6.2**: Document alert recipients
  - Who receives error alerts
  - Who receives downtime alerts
  - Escalation procedures

- [ ] **Step 6.3**: Create monitoring runbook
  - How to respond to alerts
  - Common issues and fixes
  - Contact information

- [ ] **Step 6.4**: Set up monthly reporting
  - Traffic trends
  - Error rates
  - Uptime statistics
  - Performance metrics

**Checkpoint:** Monitoring fully documented

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] Sentry SDK installed and configured
- [ ] GA4 tracking code added
- [ ] Cookie consent implemented
- [ ] UptimeRobot monitor created
- [ ] Custom events tracked
- [ ] Performance monitoring enabled
- [ ] No console errors
- [ ] Privacy compliant
- [ ] Alerts configured
- [ ] Documentation complete
- [ ] Planning doc checked off
- [ ] Git commits created

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Error Tracking Test**
   - [ ] Trigger test error
   - [ ] Check Sentry dashboard
   - [ ] Verify source maps work
   - [ ] Check user context attached

2. **Analytics Test**
   - [ ] Visit site in incognito
   - [ ] Accept cookies
   - [ ] Navigate pages
   - [ ] Check GA4 real-time
   - [ ] Verify events firing

3. **Consent Test**
   - [ ] Clear localStorage
   - [ ] Visit site
   - [ ] See consent banner
   - [ ] Test accept/decline
   - [ ] Verify analytics blocked if declined

4. **Uptime Test**
   - [ ] Check UptimeRobot dashboard
   - [ ] Verify monitor active
   - [ ] Test alert (pause/unpause)
   - [ ] Check status page

5. **Performance Test**
   - [ ] Run Lighthouse audit
   - [ ] Check Web Vitals
   - [ ] Verify metrics tracked
   - [ ] Check mobile scores

---

## Rollback Plan

If monitoring causes issues:

1. **Disable Sentry**:
   - Remove Sentry.init calls
   - Remove sentry config files
   - Uninstall package

2. **Disable GA4**:
   - Remove GoogleAnalytics component
   - Remove tracking code

3. **Remove consent banner**:
   - Hide CookieConsent component
   - Clear localStorage

**Risk Assessment:** Low - Monitoring is passive
**Rollback Difficulty:** Easy - Just remove code
**Impact:** Loss of monitoring, not functionality

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.env.example` - Add monitoring variables
- [ ] `README.md` - Add monitoring section
- [ ] Create `docs/MONITORING.md` - Runbook
- [ ] Create `docs/PRIVACY.md` - Privacy policy

---

## Related Tasks

**Depends On:**

- [SS-3: Domain Config](./ss-3-domain-configuration.md) - For uptime monitoring
- [SS-4: Credentials](./ss-4-credentials-setup.md) - For API keys

**Enables:**

- Production deployment confidence
- Data-driven improvements
- Error resolution workflow
- Marketing effectiveness tracking

**Related:**

- SS-34: Performance optimization
- SS-35: SEO optimization

---

## Monitoring Strategy

### Error Tracking (Sentry)

**What to Track:**

- JavaScript errors
- API errors
- Performance issues
- User sessions

**Alert Thresholds:**

- Error rate > 1%
- New error types
- Performance regression

### Analytics (GA4)

**Key Metrics:**

- Unique visitors
- Bounce rate
- Conversion rate
- Traffic sources
- Device types

**Custom Events:**

- `booking_widget_open`
- `booking_widget_close`
- `contact_form_submit`
- `whatsapp_click`
- `phone_click`
- `gallery_view`

### Uptime (UptimeRobot)

**Monitors:**

- Main domain (5 min interval)
- API health (15 min interval)
- Booking widget (30 min interval)

**Response Time Targets:**

- Homepage: < 2s
- API: < 500ms
- Images: < 3s

---

## Privacy Considerations

### Data Collection

**We collect:**

- Page views (anonymized IP)
- Click events
- Error logs
- Performance metrics

**We DON'T collect:**

- Personal information
- Form data in analytics
- Payment information
- Session recordings with PII

### Compliance

- GDPR compliant consent
- Clear privacy policy
- Data retention limits
- Right to deletion

---

## Notes

### Service Selection Rationale

**Sentry:**

- Best error tracking
- Great Next.js integration
- Generous free tier
- Performance monitoring included

**GA4:**

- Industry standard
- Free
- Mobile app if needed
- Integration with Google Ads

**UptimeRobot:**

- Simple and reliable
- Free tier sufficient
- Good alert options
- Public status page

### Alternatives Considered

- **LogRocket**: Too expensive
- **Mixpanel**: Overkill for marketing site
- **Pingdom**: More expensive than UptimeRobot
- **New Relic**: Too complex

### Future Enhancements

- Add heatmap tracking
- Implement A/B testing
- Add real user monitoring
- Create custom dashboards
- Add automated reports

---

## Retrospective

_(Fill out after completion)_

### What Went Well

-

### What Could Improve

-

### Unexpected Challenges

-

### Key Learnings

-

### Metrics Baseline

- Initial page load time: \_\_\_s
- Error rate: \_\_\_%
- Uptime target: 99.9%

### Follow-up Tasks Created

- [ ] Create custom dashboard
- [ ] Set up weekly reports
- [ ] Add more custom events

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ⏸️ Not Started
