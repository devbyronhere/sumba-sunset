---
task_id: ss-31
title: '[Feature] Mobile-First Responsive Design Across All Pages'
status: not_started
priority: high
estimated_time: '6-8 hours'
actual_time: null
dependencies: [ss-26, ss-27, ss-28, ss-29, ss-30]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-31/feat/mobile-responsive-design
pr_number: null
---

[← Previous: SS-30 Polish Contact/Booking Pages](./ss-30-polish-pages.md) | [📋 Index](./index.md) | [Next: SS-32 Unit Tests →](./ss-32-unit-tests.md)

# [Feature] Mobile-First Responsive Design Across All Pages

## Overview

Perform comprehensive mobile-first responsive design review and refinement across all pages (homepage, about, rooms, activities, contact, booking). Ensure consistent breakpoints, touch-friendly interactions, and optimal mobile UX.

**Project Context:**
Mobile devices are the primary user device for Sumba Sunset. Every page must be designed for mobile first, then enhanced for tablet/desktop.

**User Story:**
As a potential guest browsing on mobile, I want every page to look beautiful and work smoothly on my phone so that I can easily explore and book.

**Business Value:**

- Mobile users convert better with mobile-optimized experience
- Better Core Web Vitals = better SEO rankings
- Professional mobile UX differentiates from competitors
- Reduced bounce rate on mobile

---

## Prerequisites/Dependencies

- [x] SS-26: Homepage complete
- [x] SS-27: About page complete
- [x] SS-28: Rooms page complete
- [x] SS-29: Activities page complete
- [x] SS-30: Contact/booking pages polished
- [ ] All pages rendered and accessible

---

## Acceptance Criteria

**All Pages:**

- [ ] **AC1**: Mobile-first breakpoints consistent (640px, 1024px, 1440px)
- [ ] **AC2**: Touch-friendly tap targets (≥44x44px for buttons/links)
- [ ] **AC3**: Readable text sizes on mobile (≥16px body text, no zoom)
- [ ] **AC4**: Proper spacing and padding on mobile (no cramped layouts)
- [ ] **AC5**: Navigation works smoothly on mobile (hamburger menu if needed)
- [ ] **AC6**: Images responsive and optimized for mobile bandwidth
- [ ] **AC7**: Forms easy to fill on mobile (large inputs, clear labels)
- [ ] **AC8**: No horizontal scroll on any viewport size
- [ ] **AC9**: Smooth transitions between breakpoints (no jarring layout shifts)
- [ ] **AC10**: Fast loading on 3G network (mobile performance)

**Specific Checks:**

- [ ] **AC11**: Hero sections full-height on mobile, not cut off
- [ ] **AC12**: Grid layouts stack properly on mobile (1 column)
- [ ] **AC13**: Sidebars move below main content on mobile
- [ ] **AC14**: Font sizes scale appropriately (mobile smaller, desktop larger)
- [ ] **AC15**: Images maintain aspect ratio on all screen sizes

---

## Test Strategy

### Test Files to Create

- `src/__tests__/responsive/breakpoints.test.ts` - Test breakpoint utilities
- `src/__tests__/responsive/mobile-navigation.test.tsx` - Test mobile nav behavior
- `src/__tests__/responsive/touch-targets.test.tsx` - Test touch target sizes

### Test Types

- **Unit Tests**: Test breakpoint utilities and helper functions
- **Component Tests**: Test responsive behavior of components
- **Visual Regression Tests**: Test layouts at different viewport sizes (optional)

### Coverage Target

- **60%** coverage (mostly manual testing required)
- **100%** coverage for breakpoint utilities

### Edge Cases to Test

1. **Extreme viewport sizes**: 320px (small phone), 2560px (ultra-wide monitor)
2. **Landscape orientation**: Mobile landscape mode
3. **Tablet sizes**: iPad, Android tablets
4. **Font scaling**: User has increased OS font size
5. **Zoom levels**: Page zoomed in/out

### Performance Benchmarks (Mobile)

- **3G Network**: Page loads in < 5s
- **LCP**: < 2.5s on mobile
- **CLS**: < 0.1 (no layout shift)
- **FID**: < 100ms (touch response)
- **Page weight**: < 2MB on mobile

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for responsive utilities
- [ ] **Step 1.2**: Write failing tests for breakpoint utilities (AC1)
  - Test mobile breakpoint (< 640px)
  - Test tablet breakpoint (640-1024px)
  - Test desktop breakpoint (> 1024px)
- [ ] **Step 1.3**: Write failing tests for touch target sizes (AC2)
  - Test button min-width and min-height ≥44px
  - Test link tap areas
- [ ] **Step 1.4**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Breakpoint System Implementation

- [ ] **Step 2.1**: Define global breakpoint constants in `src/lib/breakpoints.ts`
  ```typescript
  export const BREAKPOINTS = {
    mobile: '640px',
    tablet: '1024px',
    desktop: '1440px',
  } as const;
  ```
- [ ] **Step 2.2**: Update Tailwind config to use consistent breakpoints
  ```javascript
  module.exports = {
    theme: {
      screens: {
        sm: '640px',
        md: '1024px',
        lg: '1440px',
        xl: '1920px',
      },
    },
  };
  ```
- [ ] **Step 2.3**: Create responsive utility functions
  - `isMobile()`, `isTablet()`, `isDesktop()`
  - `getTouchTargetSize()` helper
- [ ] **Step 2.4**: Verify breakpoint tests pass (AC1)

**Breakpoint Checkpoint:** Consistent breakpoints defined

---

### Phase 3: Mobile-First Review - Homepage

- [ ] **Step 3.1**: Review homepage on mobile (375px, 414px widths)
  - Hero section full-height, not cut off
  - Feature cards stack vertically
  - Gallery responsive
  - CTA buttons ≥44px height
  - Text readable (≥16px)
- [ ] **Step 3.2**: Fix any mobile layout issues
- [ ] **Step 3.3**: Test on real iPhone and Android device
- [ ] **Step 3.4**: Test landscape orientation

**Homepage Checkpoint:** Homepage mobile-optimized

---

### Phase 4: Mobile-First Review - Other Pages

- [ ] **Step 4.1**: Review About page on mobile
  - Story section stacks correctly
  - Team cards stack vertically
  - Images don't overflow
- [ ] **Step 4.2**: Review Rooms page on mobile
  - Room cards stack vertically
  - Pricing easy to read
  - "Book Now" buttons touch-friendly
- [ ] **Step 4.3**: Review Activities page on mobile
  - Activity cards stack vertically
  - YouTube video responsive
  - Surf spot info readable
- [ ] **Step 4.4**: Review Contact page on mobile
  - Form inputs large enough to tap (≥44px height)
  - Labels clearly visible
  - WhatsApp button prominent and touch-friendly
  - Sidebar moves below form on mobile
- [ ] **Step 4.5**: Review Booking page on mobile
  - Beds24 widget usable on mobile
  - Trust signals readable
  - Sidebar moves below widget on mobile
- [ ] **Step 4.6**: Fix any mobile layout issues across all pages

**All Pages Checkpoint:** All pages mobile-optimized

---

### Phase 5: Navigation & Touch Interactions

- [ ] **Step 5.1**: Implement mobile navigation (hamburger menu if needed)
  - Header/nav responsive
  - Menu accessible on mobile
  - Touch-friendly menu items
- [ ] **Step 5.2**: Ensure all buttons ≥44x44px
  - Review all CTA buttons
  - Review all form buttons
  - Review all navigation links
- [ ] **Step 5.3**: Test touch interactions
  - Swipe gestures (if applicable)
  - Tap targets don't overlap
  - Hover states converted to active states on touch devices

**Interaction Checkpoint:** Touch interactions optimized

---

### Phase 6: Performance & Polish

- [ ] **Step 6.1**: Run Lighthouse audits on all pages (mobile profile)
  - Homepage
  - About
  - Rooms
  - Activities
  - Contact
  - Booking
- [ ] **Step 6.2**: Fix performance issues
  - Lazy load below-the-fold content
  - Optimize images for mobile
  - Defer non-critical scripts
- [ ] **Step 6.3**: Test on slow 3G network simulation
- [ ] **Step 6.4**: Ensure no horizontal scroll on any page at any viewport
- [ ] **Step 6.5**: Test font scaling (user has increased OS font size)
- [ ] **Step 6.6**: Run full test suite

**Performance Checkpoint:** All pages fast on mobile

---

### Phase 7: Documentation & Refinement

- [ ] **Step 7.1**: Document breakpoint system in coding-standards.md
- [ ] **Step 7.2**: Document touch target requirements
- [ ] **Step 7.3**: Create responsive design checklist for future pages
- [ ] **Step 7.4**: Add usage examples for responsive utilities
- [ ] **Step 7.5**: Refactor for code clarity

**Documentation Checkpoint:** Complete

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Code coverage ≥60%
- [ ] All acceptance criteria verified ✅
- [ ] Lighthouse mobile audits: Performance ≥90, Accessibility ≥95
- [ ] Tested on real devices (iOS Safari, Android Chrome)
- [ ] No horizontal scroll at any viewport
- [ ] All touch targets ≥44x44px
- [ ] Text readable without zoom (≥16px body text)

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Device Testing**
   - [ ] iPhone SE (375px width)
   - [ ] iPhone 12/13 Pro (390px width)
   - [ ] iPhone 12/13 Pro Max (428px width)
   - [ ] Android phone (various sizes)
   - [ ] iPad (810px width)
   - [ ] Desktop (1440px+ width)

2. **Orientation Testing**
   - [ ] All pages work in portrait mode
   - [ ] All pages work in landscape mode (mobile)

3. **Breakpoint Testing**
   - [ ] Test homepage at: 375px, 640px, 1024px, 1440px, 1920px
   - [ ] Verify smooth transitions between breakpoints
   - [ ] No jarring layout shifts

4. **Touch Target Testing**
   - [ ] Tap all buttons on mobile → verify easy to tap
   - [ ] Tap all links → verify no mis-taps
   - [ ] Test form inputs → verify easy to focus

5. **Performance Testing**
   - [ ] Run Lighthouse mobile audits on all pages
   - [ ] Test on slow 3G network
   - [ ] Verify LCP < 2.5s on mobile

6. **Accessibility Testing**
   - [ ] Text readable without zoom
   - [ ] Proper heading hierarchy on mobile
   - [ ] Form labels visible and associated

7. **Browser Testing**
   - [ ] iOS Safari (critical - most users)
   - [ ] Chrome Mobile
   - [ ] Firefox Mobile
   - [ ] Safari Desktop
   - [ ] Chrome Desktop

---

## Rollback Plan

1. Revert commits
2. Restore previous responsive styles

**Risk Assessment:** Medium (affects all pages)
**Rollback Difficulty:** Moderate (many files affected)

---

## Related Tasks

**Depends On:**

- [SS-26: Homepage](./ss-26-homepage.md)
- [SS-27: About Page](./ss-27-about-page.md)
- [SS-28: Rooms Page](./ss-28-rooms-page.md)
- [SS-29: Activities Page](./ss-29-activities-page.md)
- [SS-30: Polish Contact/Booking](./ss-30-polish-pages.md)

**Blocks:**

- [SS-32: Unit Tests](./ss-32-unit-tests.md) - Can proceed in parallel
- [SS-35: Performance Optimization](./ss-35-performance-optimization.md) - Further optimizations

---

## Notes

**Responsive Breakpoints:**

- **Mobile**: < 640px (sm breakpoint)
- **Tablet**: 640px - 1024px (md breakpoint)
- **Desktop**: > 1024px (lg breakpoint)
- **Large Desktop**: > 1440px (xl breakpoint)

**Touch Target Guidelines (iOS/Android):**

- **Minimum size**: 44x44px (iOS) / 48x48px (Android)
- **Recommended**: 48x48px for both
- **Spacing**: 8px between touch targets

**Mobile Font Sizes:**

- **Body text**: 16px minimum (prevents auto-zoom on iOS)
- **Headings**: Scale appropriately (e.g., h1: 32px mobile, 48px desktop)
- **Small text**: 14px minimum (for captions, labels)

**Common Mobile Layout Patterns:**

- **Stacking**: Multi-column layouts become single-column on mobile
- **Collapsing**: Sidebars move below main content on mobile
- **Hiding**: Non-essential content can be hidden on mobile (sparingly)
- **Reordering**: Flexbox/Grid order property for mobile layout changes

**Testing Devices (Minimum):**

- iPhone (iOS Safari) - most critical
- Android phone (Chrome) - second most critical
- iPad (Safari) - tablet testing
- Desktop browser (Chrome/Safari) - desktop testing

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
