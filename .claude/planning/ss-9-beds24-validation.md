---
task_id: ss-10
title: '[Infrastructure] Beds24 Integration Validation - Technical Spike'
status: not_started
priority: high
estimated_time: '30-60 minutes'
actual_time: null
dependencies: [ss-1, ss-2]
created: 2025-01-20
started: null
completed: null
related_docs: ['beds24-feasibility-research.md']
infra_type: validation
branch: ss-9/infra/beds24-validation
pr_number: null
---

[← Previous: SS-9 Monitoring Setup](./ss-9-monitoring-setup.md) | [📋 Index](./index.md) | [Next: SS-11 Beds24 Account Setup →](./ss-11-beds24-setup.md)

**Milestone:** 3 - Beds24 Setup & Integration + Currency Decision

# [Infrastructure] Beds24 Integration Validation - Technical Spike

## Overview

**Quick technical validation to confirm Beds24 widget works in Next.js 15 before committing to full account setup.**

This is a **30-60 minute spike** to de-risk SS-10 (8-12 hour Beds24 account setup). We'll create a test page with a Beds24 demo widget to validate there are no CORS issues, hydration conflicts, or compatibility problems with Next.js 15.

**Infrastructure Type:** Validation / Technical Spike
**Impact:** De-risks SS-10 Beds24 account setup (validates feasibility before time investment)
**Risk Level:** Low (temporary test code, will be deleted after validation)

**⚠️ IMPORTANT: Read First**

- 📋 [Beds24 Feasibility Research](./beds24-feasibility-research.md) - Understand technical concerns (CORS, hydration, Server Components)
- This task validates the concerns are not blockers
- If validation fails, we pivot to Smoobu or custom solution

---

## Prerequisites/Dependencies

- [x] SS-1: Next.js Project Setup (need Next.js 15 running)
- [x] SS-2: Linting & Formatting Setup (optional, but helpful)
- [ ] Beds24 demo widget URL (can use public demo property or create free trial)

---

## Acceptance Criteria

- [ ] **AC1**: Test page created at `/app/test-booking/page.tsx`
- [ ] **AC2**: Beds24 demo widget embedded using Client Component pattern
- [ ] **AC3**: No CORS errors in browser console
- [ ] **AC4**: No hydration warnings in browser console
- [ ] **AC5**: Widget loads and displays correctly
- [ ] **AC6**: Widget is interactive (can click dates, select options)
- [ ] **AC7**: Mobile experience tested on real device (acceptable UX)
- [ ] **AC8**: Validation results documented in this file
- [ ] **AC9**: Test code cleaned up (deleted after validation)

---

## Test Strategy

### Validation Approach

This is a **technical spike**, not production code:

- **No tests required** (temporary validation code)
- **Manual testing only** (browser console, visual inspection, mobile testing)
- **Code will be deleted** after validation (not committed to main)

### What We're Testing

1. **CORS Issues**: Does browser block iframe from `https://beds24.com`?
2. **Hydration Conflicts**: Does Next.js React hydration conflict with Beds24 widget JavaScript?
3. **Server Component Compatibility**: Does `'use client'` directive solve any issues?
4. **Mobile Experience**: Is widget usable on mobile devices (primary user device)?

### Success Criteria

✅ **Pass**: Widget loads, no errors, acceptable mobile UX → Proceed to SS-10
❌ **Fail**: CORS errors, hydration issues, or unusable mobile UX → Investigate or pivot

---

## Implementation Steps

### Phase 1: Setup Test Page (10 minutes)

- [ ] **Step 1.1**: Create test page structure

  ```bash
  mkdir -p src/app/test-booking
  touch src/app/test-booking/page.tsx
  ```

- [ ] **Step 1.2**: Create Server Component test page

  ```typescript
  // src/app/test-booking/page.tsx
  import Beds24TestWidget from '@/components/Beds24TestWidget';

  export default function TestBookingPage() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Beds24 Widget Validation
        </h1>
        <p className="mb-4 text-gray-600">
          Testing Beds24 widget integration with Next.js 15
        </p>
        <Beds24TestWidget />
      </div>
    );
  }
  ```

- [ ] **Step 1.3**: Create Client Component for widget

  ```typescript
  // src/components/Beds24TestWidget.tsx
  'use client';

  export default function Beds24TestWidget() {
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-xl mb-4">Beds24 Demo Widget</h2>
        <iframe
          src="https://beds24.com/booking.php?propid=3578"
          width="100%"
          height="800px"
          className="border-0 rounded-lg"
          title="Beds24 Test Widget"
        />
      </div>
    );
  }
  ```

  **Note:** Using Beds24's demo property (propid=3578) or create free trial account

**Checkpoint:** Test page structure created

---

### Phase 2: Browser Console Testing (5-10 minutes)

- [ ] **Step 2.1**: Start dev server

  ```bash
  yarn dev
  ```

- [ ] **Step 2.2**: Open test page
  - Navigate to: `http://localhost:3000/test-booking`

- [ ] **Step 2.3**: Open browser DevTools
  - Chrome: F12 or Cmd+Option+I
  - Check Console tab

- [ ] **Step 2.4**: Check for CORS errors
  - ❌ Look for: "Cross-Origin Request Blocked" or "CORS policy" errors
  - ✅ If no CORS errors → Widget embedding is allowed

- [ ] **Step 2.5**: Check for hydration warnings
  - ❌ Look for: "Hydration mismatch" or "server HTML" warnings
  - ✅ If no hydration warnings → React hydration is compatible

- [ ] **Step 2.6**: Check for JavaScript errors
  - ❌ Look for: Any red errors in console
  - ✅ If no JS errors → Widget loads cleanly

- [ ] **Step 2.7**: Document findings
  - Screenshot console (if errors)
  - Note any warnings or errors in validation results section

**Checkpoint:** Browser console validated

---

### Phase 3: Widget Functionality Testing (5-10 minutes)

- [ ] **Step 3.1**: Test widget loads
  - ✅ Widget iframe displays (not blank/broken)
  - ✅ Beds24 content visible inside iframe
  - ✅ Loading completes (no infinite spinners)

- [ ] **Step 3.2**: Test date selection
  - Click on calendar dates
  - Select check-in and check-out dates
  - ✅ Date selection works

- [ ] **Step 3.3**: Test room selection (if applicable)
  - Browse available rooms
  - Click on room options
  - ✅ Room selection works

- [ ] **Step 3.4**: Test guest details form (if accessible)
  - Click through to guest details
  - ✅ Form fields are interactive

- [ ] **Step 3.5**: Test pricing display
  - ✅ Prices are visible and readable
  - ✅ Currency displays correctly

- [ ] **Step 3.6**: Document findings
  - Note any functionality issues
  - Screenshot widget appearance

**Checkpoint:** Widget functionality validated

---

### Phase 4: Mobile Device Testing (10-15 minutes)

- [ ] **Step 4.1**: Get local dev server URL

  ```bash
  # Find your local IP address
  # macOS/Linux:
  ifconfig | grep "inet " | grep -v 127.0.0.1
  # Windows:
  ipconfig
  ```

  - Example: `http://192.168.1.100:3000/test-booking`

- [ ] **Step 4.2**: Open on mobile device
  - Connect mobile to same WiFi network
  - Open URL in mobile browser (Safari iOS or Chrome Android)

- [ ] **Step 4.3**: Test mobile widget layout
  - ✅ Widget fits screen (no horizontal scroll)
  - ✅ Text is readable (font size adequate)
  - ⚠️ If layout breaks, note issues (acceptable if we plan CSS customization)

- [ ] **Step 4.4**: Test mobile touch targets
  - Try tapping dates on calendar
  - Try tapping buttons
  - ✅ Touch targets are large enough (44x44px minimum recommended)
  - ⚠️ If touch targets too small, note (acceptable if we plan CSS customization)

- [ ] **Step 4.5**: Test mobile scrolling
  - Scroll within widget
  - Scroll page with widget
  - ✅ Scrolling works smoothly

- [ ] **Step 4.6**: Rate mobile UX
  - Score: \_\_\_ / 10
  - Pass threshold: 6/10 or higher (we'll improve with CSS in SS-17)
  - Notes: \_\_\_

**Checkpoint:** Mobile experience validated

---

### Phase 5: Alternative Embed Method (Optional - if issues found)

**If iframe has issues, try script-based embed:**

- [ ] **Step 5.1**: Update Client Component

  ```typescript
  // src/components/Beds24TestWidget.tsx
  'use client';

  import Script from 'next/script';

  export default function Beds24TestWidget() {
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-xl mb-4">Beds24 Demo Widget (Script)</h2>

        {/* Next.js Script component handles loading safely */}
        <Script
          src="https://beds24.com/widget.js?propid=3578"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Beds24 widget script loaded');
          }}
          onError={(e) => {
            console.error('Beds24 widget script failed:', e);
          }}
        />

        <div id="beds24-widget-container" />
      </div>
    );
  }
  ```

- [ ] **Step 5.2**: Repeat Phase 2-4 testing
  - Check console for errors
  - Test functionality
  - Test on mobile

- [ ] **Step 5.3**: Document which method works better
  - iframe vs. script comparison
  - Recommendation for SS-15 implementation

**Checkpoint:** Alternative embed method tested (if needed)

---

### Phase 6: Cleanup & Documentation (5 minutes)

- [ ] **Step 6.1**: Document validation results (see section below)

- [ ] **Step 6.2**: Delete test code

  ```bash
  rm -rf src/app/test-booking
  rm src/components/Beds24TestWidget.tsx
  ```

- [ ] **Step 6.3**: Commit cleanup (if needed)

  ```bash
  git status # Ensure test files are deleted
  # No commit needed if test files were never committed
  ```

- [ ] **Step 6.4**: Update this planning doc
  - Mark all steps complete
  - Fill in validation results section
  - Add final recommendation

**Checkpoint:** Validation complete, test code cleaned up

---

## Validation Results

### Console Errors

**CORS Errors:**

- ❌ / ✅ (Circle one)
- Details: \_\_\_

**Hydration Warnings:**

- ❌ / ✅ (Circle one)
- Details: \_\_\_

**JavaScript Errors:**

- ❌ / ✅ (Circle one)
- Details: \_\_\_

### Widget Functionality

**Date Selection:**

- ❌ / ✅ (Circle one)
- Notes: \_\_\_

**Room Selection:**

- ❌ / ✅ / N/A (Circle one)
- Notes: \_\_\_

**Guest Details:**

- ❌ / ✅ / N/A (Circle one)
- Notes: \_\_\_

**Pricing Display:**

- ❌ / ✅ (Circle one)
- Notes: \_\_\_

### Mobile Experience

**Device Tested:** **\_ (e.g., iPhone 12, Samsung Galaxy S21)
**Browser:** \_** (e.g., Safari, Chrome)

**Layout:**

- ❌ / ✅ (Circle one)
- Notes: \_\_\_

**Touch Targets:**

- ❌ / ✅ (Circle one)
- Notes: \_\_\_

**Scrolling:**

- ❌ / ✅ (Circle one)
- Notes: \_\_\_

**Mobile UX Score:** \_\_\_ / 10

### Embed Method

**iframe:**

- ❌ / ✅ (Circle one)
- Notes: \_\_\_

**Script-based (if tested):**

- ❌ / ✅ / Not tested (Circle one)
- Notes: \_\_\_

**Recommended method for SS-11:** \_\_\_

---

## Final Recommendation

### Decision: GO / NO-GO / INVESTIGATE

**Rationale:**

---

**If GO:**

- ✅ Proceed to SS-10 (Beds24 Account Setup)
- CSS customization needed? (Yes / No / Maybe)
- Estimated CSS work: \_\_\_ hours

**If NO-GO:**

- ❌ Do not proceed with Beds24
- Next steps: \_\_\_
- Alternative: Smoobu / Custom solution / Other

**If INVESTIGATE:**

- ⚠️ Issues found, but may be solvable
- What to investigate: \_\_\_
- Who to contact: Beds24 support / Next.js community / Other

---

## Quality Gates Checklist

**Claude MUST verify ALL items:**

- [ ] Test page created and functional
- [ ] Browser console checked (CORS, hydration, errors)
- [ ] Widget functionality tested
- [ ] Mobile device testing completed
- [ ] Validation results documented in this file
- [ ] Test code cleaned up (deleted)
- [ ] Final recommendation provided (GO/NO-GO/INVESTIGATE)
- [ ] Planning doc fully checked off
- [ ] SS-10 unblocked (if validation passes)

---

## Post-Implementation Verification

**Manual Testing Steps:**

None required - validation IS the testing for this task.

---

## Rollback Plan

No rollback needed - test code is temporary and will be deleted.

---

## Documentation Updates

Files that need updating after this task:

- [x] This file - Add validation results
- [ ] [SS-10 Beds24 Account Setup](./ss-10-beds24-setup.md) - Unblock if validation passes
- [ ] [Planning Index](./index.md) - Update task status

---

## Related Tasks

**Depends On:**

- [SS-1: Next.js Setup](./ss-1-nextjs-setup.md) - Need Next.js 15 running
- [SS-2: Linting Setup](./ss-2-linting-setup.md) - Code quality (optional)

**Blocks:**

- [SS-10: Beds24 Account Setup](./ss-10-beds24-setup.md) - Cannot proceed without validation
- [SS-11: Beds24 Widget Integration](./ss-11-beds24-widget.md) - Future implementation

**Related:**

- [Beds24 Feasibility Research](./beds24-feasibility-research.md) - Context and analysis

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

### Technical Decisions Made

- **Embed method**: iframe vs. script-based
- **Mobile UX acceptable?**: Yes / No
- **CSS customization needed?**: Yes / No / How much

### Follow-up Tasks Created

- [ ] SS-10: Beds24 Account Setup (if validation passes)
- [ ] SS-14: Beds24 Widget CSS Customization (if mobile UX needs work)

---

## Notes

**Beds24 Demo Property:**

- Property ID: 3578 (Beds24's public demo property)
- URL: `https://beds24.com/booking.php?propid=3578`
- If demo property doesn't work, create free trial at [beds24.com](https://beds24.com)

**Alternative Demo URLs:**

- Widget documentation: [beds24.com/widgets](https://beds24.com/widgets)
- API documentation: [beds24.com/api](https://beds24.com/api)

**Expected Outcome:**

- **Most likely**: ✅ Widget works fine, proceed to SS-10
- **Less likely**: ⚠️ CSS customization heavily needed (acceptable, plan for SS-14)
- **Unlikely**: ❌ CORS or hydration blockers (fallback to script or API integration)

---

**Completion Date:** TBD
**Actual Time Spent:** TBD
**Final Status:** Not Started
