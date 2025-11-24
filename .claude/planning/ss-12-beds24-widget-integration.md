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
- [x] Beds24 API keys in .env.local
- [x] Property ID documented. See env
- [x] Widget embed code available from Beds24. See Beds24IframeWidget component

---

## Acceptance Criteria

- [x] **AC1**: Booking page created at /booking route
- [x] **AC2**: Beds24 widget loads and displays correctly
- [x] **AC3**: Widget is responsive and mobile-optimized
- [x] **AC4**: Loading state shows while widget initializes
- [x] **AC5**: Error boundary handles widget failures gracefully
- [x] **AC6**: Widget styling matches site theme
- [x] **AC7**: Page has proper SEO metadata

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/booking/page.test.tsx` - Booking page component tests
- `src/__tests__/components/booking/Beds24IframeWidget.test.tsx` - Widget component tests
- `src/__tests__/components/booking/BookingErrorBoundary.test.tsx` - Error boundary tests

### Test Types

- **Unit Tests Only**: Test our code, not third-party Beds24 functionality
  - Component rendering and structure
  - Loading state management
  - Error boundary behavior
  - Configuration error handling

### Coverage Target

- Minimum **80%** coverage for our React components
- **100%** coverage for our error handling logic
- **0%** coverage expected for third-party Beds24 widget behavior

### What We Test (Our Code)

1. **Component Rendering**: Our components render with correct structure
2. **Loading States**: Our loading state shows/hides appropriately
3. **Error Handling**: Our error boundary catches errors and shows fallback
4. **Configuration**: Missing environment variables show proper error message
5. **Component Integration**: Components work together correctly

### What We DON'T Test (Third-Party)

1. **Widget Loading**: Whether Beds24 script actually loads from their servers
2. **Booking Functionality**: Date selection, room booking, payment processing
3. **Network Issues**: Beds24 API timeouts or failures
4. **Widget UI**: Mobile responsiveness, touch interactions within widget
5. **Cross-Browser**: Beds24's cross-browser compatibility

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [x] **Step 1.1**: Create test file for booking page component
- [x] **Step 1.2**: Write failing tests for page rendering
- [x] **Step 1.3**: Write failing tests for widget loading states
- [x] **Step 1.4**: Write failing tests for error boundary
- [x] **Step 1.5**: Write failing tests for mobile responsiveness
- [x] **Step 1.6**: Write failing tests for SEO metadata
- [x] **Step 1.7**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [x] **Step 2.1**: Create booking page structure:

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

- [x] **Step 2.2**: Create BookingWidget component:

  ```typescript
  // src/components/booking/BookingWidget.tsx
  'use client';

  import { useEffect, useState } from 'react';
  import LoadingSpinner from '@/components/ui/LoadingSpinner';
  import ErrorMessage from '@/components/ui/ErrorMessage';
  ```

- [x] **Step 2.3**: Implement widget script loader:

  ```typescript
  // Add dynamic script injection for Beds24 widget
  // Handle loading states and timeouts
  ```

- [x] **Step 2.4**: Add widget configuration:

  ```typescript
  // Use environment variables for API keys
  const widgetConfig = {
    propertyId: process.env.NEXT_PUBLIC_BEDS24_PROPERTY_ID,
    widgetKey: process.env.NEXT_PUBLIC_BEDS24_WIDGET_KEY,
  };
  ```

- [x] **Step 2.5**: Implement error boundary:

  ```typescript
  // src/components/booking/BookingErrorBoundary.tsx
  // Catch and handle widget errors gracefully
  ```

- [x] **Step 2.6**: Add loading state UI:

  ```typescript
  // Show skeleton loader while widget initializes
  // Include timeout after 10 seconds
  ```

- [x] **Step 2.7**: Verify all acceptance criteria tests pass

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

- [x] **Step 3.3**: Optimize for mobile screens:

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

- [x] **Step 3.5**: Test on mobile devices:
  - iOS Safari
  - Android Chrome
  - Various screen sizes

- [x] **Step 3.6**: Implement responsive container:
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

- [x] **Step 4.3**: Add fallback booking method:

  ```typescript
  // Display contact info if widget fails
  // Link to Beds24 direct booking as backup
  ```

- [ ] **Step 4.4**: Create loading skeleton:

  ```typescript
  // Match expected widget layout
  // Prevent layout shift
  ```

- [ ] **Step 4.5**: Run full test suite for regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings in our components
- [ ] Code coverage ≥ 80% for our components
- [ ] Our error boundary component works correctly
- [ ] Our loading states display correctly
- [ ] Configuration error handling works
- [ ] Components can be imported without errors

---

## Post-Implementation Verification

### Manual Testing Steps

**Note: These are manual user verification steps, not automated tests**

1. **Basic Functionality Test**
   - [x] Navigate to /booking
   - [x] Verify page loads without errors
   - [x] Check that loading state appears briefly
   - [x] Confirm widget eventually loads (if environment is configured)

2. **Error Handling Test**
   - [x] Test with missing environment variables
   - [x] Verify error boundary shows fallback UI
   - [x] Check that error messages are user-friendly
   - [x] Ensure page doesn't crash or show console errors

3. **Component Integration Test**
   - [x] Check page structure and layout
   - [x] Confirm error boundary wraps widget correctly
   - [x] Test refresh functionality in error state

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
