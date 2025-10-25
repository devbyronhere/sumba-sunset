---
task_id: ss-29
title: '[Feature] Polish Contact/Booking Pages with Nice UI'
status: not_started
priority: high
estimated_time: '4-5 hours'
actual_time: null
dependencies: [ss-17, ss-12]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-29/feat/polish-pages
pr_number: null
---

[← Previous: SS-28 Activities & Surf Info Page](./ss-28-activities-page.md) | [📋 Index](./index.md) | [Next: SS-30 Mobile-First Responsive Design →](./ss-30-mobile-responsive-design.md)

# [Feature] Polish Contact/Booking Pages with Nice UI

## Overview

Polish the existing contact form (SS-17) and booking page (SS-12 Beds24 widget) with beautiful, consistent UI matching the marketing pages. Add helpful information, improve layouts, and ensure smooth user experience.

**Project Context:**
These are conversion pages—users who reach contact/booking are high-intent. Pages must be polished, trustworthy, and friction-free.

**User Story:**
As a potential guest ready to book, I want a seamless, trustworthy booking experience so that I feel confident completing my reservation.

**Business Value:**

- Reduces booking abandonment
- Builds trust at critical decision moment
- Professional UI increases conversion rates
- Consistent branding reinforces quality

---

## Prerequisites/Dependencies

- [x] SS-17: Contact form implemented (basic version)
- [x] SS-12: Beds24 widget integrated (basic version)
- [x] SS-25: Homepage design patterns established
- [ ] Polished UI components from homepage

---

## Acceptance Criteria

**Contact Page:**

- [ ] **AC1**: Hero section with contact headline and supporting image
- [ ] **AC2**: Contact form with polished UI (matching homepage style)
- [ ] **AC3**: Contact information sidebar (WhatsApp, email, phone)
- [ ] **AC4**: WhatsApp Click-to-Chat button prominent (from SS-19)
- [ ] **AC5**: FAQ section answering common questions
- [ ] **AC6**: Success message after form submission (matches brand)

**Booking Page:**

- [ ] **AC7**: Hero section with booking headline and trust signals
- [ ] **AC8**: Beds24 widget with custom CSS (mobile-optimized)
- [ ] **AC9**: Booking information sidebar (policies, what's included, pricing transparency)
- [ ] **AC10**: Trust signals (secure payment badge, cancellation policy)
- [ ] **AC11**: FAQ section for booking-specific questions
- [ ] **AC12**: Help section with contact options if user has questions

**Both Pages:**

- [ ] **AC13**: Mobile-first responsive design
- [ ] **AC14**: Fast loading (LCP < 2.5s)
- [ ] **AC15**: Accessibility (form labels, error states, keyboard nav)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/contact-polished.test.tsx`
- `src/__tests__/app/booking-polished.test.tsx`
- `src/__tests__/components/TrustSignals.test.tsx`
- `src/__tests__/components/FAQSection.test.tsx`

### Coverage Target

- **70%** coverage (UI-heavy)
- **100%** coverage for form validation and error states

### Edge Cases to Test

1. Form validation errors display clearly
2. Success message displays after submission
3. WhatsApp button opens correct URL
4. Beds24 widget loads on mobile devices
5. FAQ accordion expands/collapses

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files
- [ ] **Step 1.2**: Write failing tests for polished contact page (AC1-AC6)
- [ ] **Step 1.3**: Write failing tests for polished booking page (AC7-AC12)
- [ ] **Step 1.4**: Write failing tests for shared components (TrustSignals, FAQ)
- [ ] **Step 1.5**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Core Implementation - Contact Page

- [ ] **Step 2.1**: Create ContactHero component
  - Headline: "Get in Touch"
  - Supporting image (beach/sunset scene)
  - Subheading encouraging contact
- [ ] **Step 2.2**: Polish ContactForm component (from SS-17)
  - Match homepage button styles
  - Improved input styling (focus states, labels)
  - Better error message display
  - Success message with animation
- [ ] **Step 2.3**: Create ContactSidebar component
  - Contact information (email, phone, WhatsApp)
  - WhatsApp Click-to-Chat button (prominent)
  - Operating hours
  - Response time expectations
- [ ] **Step 2.4**: Create FAQSection component
  - Accordion UI (expand/collapse questions)
  - 5-7 common questions with answers
  - Reusable for both contact and booking pages
- [ ] **Step 2.5**: Update contact page `/src/app/contact/page.tsx`
  - Add hero section
  - Two-column layout (form + sidebar)
  - Add FAQ section below
  - Improve overall layout and spacing
- [ ] **Step 2.6**: Verify contact page tests pass (AC1-AC6)

**Contact Page Checkpoint:** Contact page polished

---

### Phase 3: Core Implementation - Booking Page

- [ ] **Step 3.1**: Create BookingHero component
  - Headline: "Book Your Stay"
  - Trust signals in hero (secure payment, best price guarantee)
  - Subheading encouraging booking
- [ ] **Step 3.2**: Create TrustSignals component
  - Secure payment badge (Stripe)
  - Cancellation policy summary
  - Money-back guarantee (if applicable)
  - Icons for each trust signal
- [ ] **Step 3.3**: Create BookingSidebar component
  - What's included (meals, activities, etc.)
  - Pricing transparency (deposits, payment schedule)
  - Cancellation policy
  - Contact support link
- [ ] **Step 3.4**: Polish Beds24 widget with custom CSS
  - Match brand colors (ocean blue, sunset orange)
  - Mobile-optimized layout
  - Clear button styles
  - Improved date picker styling
- [ ] **Step 3.5**: Update booking page `/src/app/booking/page.tsx`
  - Add hero section
  - Two-column layout (widget + sidebar on desktop, stacked on mobile)
  - Add trust signals section
  - Add FAQ section
  - Add help section with contact options
- [ ] **Step 3.6**: Verify booking page tests pass (AC7-AC12)

**Booking Page Checkpoint:** Booking page polished

---

### Phase 4: Integration & Polish

- [ ] **Step 4.1**: Ensure consistent styling across both pages
  - Typography, spacing, colors match homepage
  - Button styles consistent
  - Form styles consistent
- [ ] **Step 4.2**: Test mobile experience thoroughly
  - Contact form easy to fill on mobile
  - Beds24 widget usable on mobile
  - Sidebars stack correctly
- [ ] **Step 4.3**: Add micro-interactions
  - Form input focus animations
  - Button hover/active states
  - FAQ accordion smooth transitions
- [ ] **Step 4.4**: Run Lighthouse audits
- [ ] **Step 4.5**: Test on real devices (iOS Safari, Android Chrome)
- [ ] **Step 4.6**: Run full test suite

**Integration Checkpoint:** Both pages fully polished

---

### Phase 5: Documentation & Refinement

- [ ] **Step 5.1**: Update README.md
- [ ] **Step 5.2**: Add JSDoc comments
- [ ] **Step 5.3**: Document FAQ content requirements
- [ ] **Step 5.4**: Refactor for code clarity

**Documentation Checkpoint:** Complete

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Code coverage ≥70%
- [ ] All acceptance criteria verified ✅
- [ ] Performance: LCP <2.5s
- [ ] Lighthouse: Performance ≥90, Accessibility ≥95
- [ ] Mobile responsive and usable
- [ ] Form validation works correctly
- [ ] Success messages display

---

## Post-Implementation Verification

1. **Contact Page Testing**
   - [ ] Navigate to `/contact`
   - [ ] Verify polished UI matches homepage
   - [ ] Fill form with valid data → verify success message
   - [ ] Fill form with invalid data → verify error messages
   - [ ] Click WhatsApp button → verify opens WhatsApp
   - [ ] Expand FAQ questions → verify smooth animation

2. **Booking Page Testing**
   - [ ] Navigate to `/booking`
   - [ ] Verify Beds24 widget loads correctly
   - [ ] Verify trust signals display
   - [ ] Verify booking sidebar shows policies
   - [ ] Test booking flow on mobile device

3. **Responsive Testing**
   - [ ] Mobile: Sidebars stack below main content
   - [ ] Desktop: Two-column layouts work well

4. **Browser Testing**
   - [ ] Chrome, Safari, Firefox

5. **Performance Testing**
   - [ ] Run Lighthouse on both pages
   - [ ] Verify LCP < 2.5s

---

## Rollback Plan

1. Revert commits
2. Restore basic contact/booking pages

**Risk Assessment:** Low (cosmetic improvements mostly)
**Rollback Difficulty:** Easy

---

## Related Tasks

**Depends On:**

- [SS-17: Contact Form](./ss-17-contact-form.md)
- [SS-12: Beds24 Widget](./ss-12-beds24-widget-integration.md)
- [SS-19: WhatsApp Button](./ss-19-whatsapp-button.md)
- [SS-25: Homepage](./ss-25-homepage.md) - Design patterns

---

## Notes

**FAQ Content (User to Provide):**

**Contact Page FAQs:**

1. How quickly will I receive a response?
2. Can I call or WhatsApp instead of using the form?
3. What information should I include in my message?
4. Do you offer custom packages or group bookings?
5. Is there a minimum stay requirement?

**Booking Page FAQs:**

1. What payment methods do you accept?
2. When is payment due?
3. What is your cancellation policy?
4. Is the deposit refundable?
5. What's included in the room rate?
6. Can I modify my booking after confirmation?
7. Do you offer travel insurance?

**Trust Signals:**

- Secure payment (Stripe badge)
- Free cancellation up to X days before arrival
- Best price guarantee
- Instant booking confirmation
- 24/7 customer support

**Beds24 Widget Custom CSS:**

- Brand colors (ocean blue #0EA5E9, sunset orange #F97316)
- Mobile-optimized button sizes (≥44px)
- Clear date picker styling
- Improved form input styling

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
