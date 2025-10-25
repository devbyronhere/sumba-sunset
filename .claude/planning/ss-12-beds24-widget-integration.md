---
task_id: ss-12
title: '[Feature] Beds24 Widget Integration'
status: not_started
priority: high
estimated_time: '3-4 hours'
actual_time: null
dependencies: [ss-11]
created: 2025-01-20
started: null
completed: null
related_docs: ['./beds24-feasibility-research.md']
branch: ss-12/feat/beds24-widget
pr_number: null
---

[← Previous: SS-11 Beds24 Account Setup](./ss-11-beds24-account-setup.md) | [📋 Index](./index.md) | [Next: SS-13 Payment Configuration →](./ss-13-payment-config.md)

# [Feature] Beds24 Widget Integration

## Overview

Integrate the Beds24 booking widget into the Next.js application, creating a dedicated booking page with the embedded widget. This includes proper styling for mobile-first design, handling widget loading states, and ensuring smooth integration with Next.js 15's App Router.

**Project Context:**
The Beds24 widget provides a complete booking interface including availability calendar, room selection, and guest details form. We need to embed this widget while maintaining site consistency and mobile optimization.

**User Story:**
As a potential guest, I want to check availability and make a booking directly on the website so that I can secure my accommodation without leaving the site.

**Business Value:**

- Direct bookings (no commission to OTAs)
- Real-time availability updates
- Integrated payment processing
- Professional booking experience

---

## Prerequisites/Dependencies

- [x] SS-11: Beds24 account setup completed
- [ ] Beds24 API keys in .env.local
- [ ] Property ID documented
- [ ] Widget embed code available from Beds24

---

## Acceptance Criteria

- [ ] **AC1**: Booking page created at /booking route
- [ ] **AC2**: Beds24 widget loads and displays correctly
- [ ] **AC3**: Widget is responsive and mobile-optimized
- [ ] **AC4**: Loading state shows while widget initializes
- [ ] **AC5**: Error boundary handles widget failures gracefully
- [ ] **AC6**: Widget styling matches site theme
- [ ] **AC7**: Page has proper SEO metadata

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/booking/page.test.tsx` - Booking page component tests
- `src/__tests__/components/BookingWidget.test.tsx` - Widget wrapper tests
- `src/__tests__/integration/booking-flow.test.tsx` - Integration tests

### Test Types

- **Unit Tests**: Component rendering, loading states, error handling
- **Integration Tests**: Widget initialization, script loading
- **E2E Tests**: Full booking flow (manual testing with real widget)

### Coverage Target

- Minimum **80%** coverage for React components
- **100%** coverage for error handling logic

### Edge Cases to Test

1. **Widget script fails to load**: Show error message
2. **Network timeout**: Display timeout message after 10s
3. **Invalid configuration**: Handle missing API keys
4. **Mobile devices**: Ensure touch interactions work
5. **Slow connections**: Progressive loading experience

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test file for booking page component
- [ ] **Step 1.2**: Write failing tests for page rendering
- [ ] **Step 1.3**: Write failing tests for widget loading states
- [ ] **Step 1.4**: Write failing tests for error boundary
- [ ] **Step 1.5**: Write failing tests for mobile responsiveness
- [ ] **Step 1.6**: Write failing tests for SEO metadata
- [ ] **Step 1.7**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create booking page structure:

  ```typescript
  // src/app/booking/page.tsx
  import { Metadata } from 'next';
  import BookingWidget from '@/components/booking/BookingWidget';

  export const metadata: Metadata = {
    title: 'Book Your Stay | Sumba Sunset Surf Camp',
    description:
      'Check availability and book your surf camp accommodation in Sumba, Indonesia',
  };
  ```

- [ ] **Step 2.2**: Create BookingWidget component:

  ```typescript
  // src/components/booking/BookingWidget.tsx
  'use client';

  import { useEffect, useState } from 'react';
  import LoadingSpinner from '@/components/ui/LoadingSpinner';
  import ErrorMessage from '@/components/ui/ErrorMessage';
  ```

- [ ] **Step 2.3**: Implement widget script loader:

  ```typescript
  // Add dynamic script injection for Beds24 widget
  // Handle loading states and timeouts
  ```

- [ ] **Step 2.4**: Add widget configuration:

  ```typescript
  // Use environment variables for API keys
  const widgetConfig = {
    propertyId: process.env.NEXT_PUBLIC_BEDS24_PROPERTY_ID,
    widgetKey: process.env.NEXT_PUBLIC_BEDS24_WIDGET_KEY,
  };
  ```

- [ ] **Step 2.5**: Implement error boundary:

  ```typescript
  // src/components/booking/BookingErrorBoundary.tsx
  // Catch and handle widget errors gracefully
  ```

- [ ] **Step 2.6**: Add loading state UI:

  ```typescript
  // Show skeleton loader while widget initializes
  // Include timeout after 10 seconds
  ```

- [ ] **Step 2.7**: Verify all acceptance criteria tests pass

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Widget Styling & Mobile Optimization

- [ ] **Step 3.1**: Create widget styles module:

  ```css
  /* src/styles/booking-widget.module.css */
  /* Override Beds24 default styles */
  /* Ensure mobile-first responsive design */
  ```

- [ ] **Step 3.2**: Apply brand colors and fonts:

  ```css
  /* Match site theme */
  --beds24-primary: var(--primary-color);
  --beds24-font: var(--font-family);
  ```

- [ ] **Step 3.3**: Optimize for mobile screens:

  ```css
  /* Ensure touch-friendly inputs */
  /* Proper spacing for mobile */
  /* Readable text sizes */
  ```

- [ ] **Step 3.4**: Add CSS injection method:

  ```typescript
  // Inject custom styles after widget loads
  // Use MutationObserver to detect widget DOM
  ```

- [ ] **Step 3.5**: Test on mobile devices:
  - iOS Safari
  - Android Chrome
  - Various screen sizes

- [ ] **Step 3.6**: Implement responsive container:
  ```typescript
  // Ensure widget container is responsive
  // Handle orientation changes
  ```

**Styling Checkpoint:** Widget styled and mobile-optimized

---

### Phase 4: Integration & Polish

- [ ] **Step 4.1**: Add page layout and navigation:

  ```typescript
  // Include header/footer
  // Add breadcrumbs
  // Include help text
  ```

- [ ] **Step 4.2**: Implement widget communication:

  ```typescript
  // Listen for widget events (if available)
  // Track booking initiation in analytics
  ```

- [ ] **Step 4.3**: Add fallback booking method:

  ```typescript
  // Display contact info if widget fails
  // Link to Beds24 direct booking as backup
  ```

- [ ] **Step 4.4**: Create loading skeleton:

  ```typescript
  // Match expected widget layout
  // Prevent layout shift
  ```

- [ ] **Step 4.5**: Add performance monitoring:

  ```typescript
  // Track widget load time
  // Report errors to Sentry
  ```

- [ ] **Step 4.6**: Implement pre-loading strategy:

  ```typescript
  // Preload widget script on homepage
  // Warm up the widget cache
  ```

- [ ] **Step 4.7**: Run full test suite for regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 5: Documentation & Testing

- [ ] **Step 5.1**: Document widget integration:

  ```markdown
  // Add to README.md
  // Document configuration options
  // Include troubleshooting guide
  ```

- [ ] **Step 5.2**: Create widget customization guide:

  ```markdown
  // docs/beds24-widget-customization.md
  // CSS variables available
  // Styling best practices
  ```

- [ ] **Step 5.3**: Add inline code comments:

  ```typescript
  // Document widget lifecycle
  // Explain error handling approach
  ```

- [ ] **Step 5.4**: Manual testing checklist:
  - [ ] Desktop: Chrome, Firefox, Safari
  - [ ] Mobile: iOS Safari, Android Chrome
  - [ ] Slow network simulation
  - [ ] Widget interaction flow

- [ ] **Step 5.5**: Performance testing:
  - [ ] Lighthouse score > 90
  - [ ] Widget loads < 3 seconds
  - [ ] No layout shifts

**Documentation Checkpoint:** All documentation complete

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings
- [ ] Code coverage ≥ 80%
- [ ] Widget loads successfully
- [ ] Mobile responsive verified
- [ ] Error handling works
- [ ] Loading states display correctly
- [ ] SEO metadata present
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Git commits created

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Navigate to /booking
   - [ ] Verify widget loads within 3 seconds
   - [ ] Select dates and room
   - [ ] Fill in guest details
   - [ ] Proceed to payment (test mode)

2. **Error Handling Test**
   - [ ] Block Beds24 domain in DevTools
   - [ ] Verify error message displays
   - [ ] Check fallback content shows
   - [ ] Ensure page doesn't crash

3. **Mobile Testing**
   - [ ] Test on real iPhone
   - [ ] Test on real Android
   - [ ] Verify touch interactions
   - [ ] Check responsive layout
   - [ ] Test in landscape mode

4. **Performance Testing**
   - [ ] Run Lighthouse audit
   - [ ] Check Network tab timing
   - [ ] Verify no memory leaks
   - [ ] Test with slow 3G

5. **Cross-Browser Testing**
   - [ ] Chrome latest
   - [ ] Firefox latest
   - [ ] Safari latest
   - [ ] Edge latest

---

## Rollback Plan

If widget integration fails:

1. **Immediate**: Remove /booking route from navigation
2. **Fallback**: Link to Beds24 direct booking URL
3. **Fix**: Debug integration issues
4. **Alternative**: Consider iframe approach if script fails

**Risk Assessment:** Medium (widget is third-party dependency)
**Rollback Difficulty:** Easy (just remove page)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add booking page description
- [ ] `.env.example` - Add NEXT*PUBLIC_BEDS24*\* variables
- [ ] `src/lib/config.ts` - Add widget configuration
- [ ] Create `docs/beds24-widget-integration.md`

---

## Related Tasks

**Depends On:**

- [SS-11: Beds24 Account Setup](./ss-11-beds24-account-setup.md) - Need account and API keys

**Blocks:**

- [SS-15: Widget CSS Customization](./ss-15-widget-customization.md) - Need widget integrated first

**Related:**

- [SS-13: Payment Configuration](./ss-13-payment-config.md) - Payment flow through widget

---

## Notes

### Widget Loading Strategies

1. **Script Tag Injection**: Dynamically add script tag (recommended)
2. **Iframe Approach**: If script fails, fallback to iframe
3. **API-Based**: Build custom UI with Beds24 API (future enhancement)

### Common Integration Issues

- **CORS**: Widget script may have CORS restrictions
- **CSP**: Update Content Security Policy headers
- **Hydration**: Ensure client-only rendering for widget
- **Memory**: Widget may leak memory on route changes

### Mobile Optimization Priority

Since most users browse on mobile:

- Touch targets minimum 44x44px
- Font size minimum 16px (prevents zoom)
- Form inputs properly labeled
- Calendar easy to navigate with fingers

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
