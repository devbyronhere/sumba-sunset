---
task_id: ss-28
title: '[Feature] Rooms & Accommodation Page'
status: not_started
priority: high
estimated_time: '5-6 hours'
actual_time: null
dependencies: [ss-26, ss-16]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-28/feat/rooms-page
pr_number: null
---

[← Previous: SS-27 About Page](./ss-27-about-page.md) | [📋 Index](./index.md) | [Next: SS-29 Activities & Surf Info Page →](./ss-29-activities-page.md)

# [Feature] Rooms & Accommodation Page

## Overview

Build a polished rooms page showcasing accommodation options with photos, amenities, pricing (in IDR - Indonesian Rupiah), and booking CTAs. This is a key conversion page where guests choose their room type.

**Project Context:**
Mobile-first surf camp website. Rooms page must clearly present accommodation options with visual appeal and pricing transparency using IDR (Indonesian Rupiah) as configured in Milestone 3.

**User Story:**
As a potential guest, I want to compare room options and see what's included so that I can choose the right accommodation and book confidently.

**Business Value:**

- Critical booking decision page
- Clear pricing builds trust
- Visual showcase reduces uncertainty
- Direct path to Beds24 booking widget

---

## Prerequisites/Dependencies

- [x] SS-26: Homepage (design patterns)
- [x] SS-16: Real room info added (awaiting property owner data)
- [ ] SS-24: Image Gallery Component
- [ ] SS-25: Responsive Images
- [ ] Room details from user (names, photos, amenities, pricing)

---

## Acceptance Criteria

- [ ] **AC1**: Hero section with rooms page headline
- [ ] **AC2**: Room card for each accommodation type (photo, name, description)
- [ ] **AC3**: Amenities list for each room (WiFi, AC, ocean view, etc.)
- [ ] **AC4**: Pricing display in IDR (Indonesian Rupiah)
- [ ] **AC5**: "Book Now" CTA on each room card → `/booking` page
- [ ] **AC6**: Photo gallery for each room (multiple images)
- [ ] **AC7**: Mobile-first responsive layout
- [ ] **AC8**: SEO meta tags optimized for "rooms sumba" queries
- [ ] **AC9**: Fast loading (LCP < 2.5s)
- [ ] **AC10**: Accessibility (semantic HTML, ARIA labels)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/rooms.test.tsx`
- `src/__tests__/components/RoomCard.test.tsx`
- `src/__tests__/components/PricingDisplay.test.tsx`

### Coverage Target

- Minimum **70%** coverage (UI-heavy)
- **100%** coverage for pricing formatting and CTA links

### Edge Cases to Test

1. **Missing room photos**: Fallback image
2. **Long amenity lists**: Overflow handling
3. **Currency formatting**: Test IDR formatting (Rp X,XXX,XXX)
4. **Various room counts**: 2 rooms vs. 5 rooms

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files
- [ ] **Step 1.2**: Write failing tests for RoomCard component (AC2, AC3, AC5)
- [ ] **Step 1.3**: Write failing tests for PricingDisplay (AC4)
  - Test USD formatting: $150/night
  - Test IDR formatting: Rp 2,250,000/night
- [ ] **Step 1.4**: Write failing tests for rooms page (AC1, AC6-AC10)
- [ ] **Step 1.5**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create PricingDisplay component `src/components/ui/PricingDisplay.tsx`
  - Accept `amount` prop (in IDR)
  - Format for IDR: Rp X,XXX,XXX/night
  - Display "per night" or "per person per night"
- [ ] **Step 2.2**: Verify PricingDisplay tests pass (AC4)
- [ ] **Step 2.3**: Create RoomCard component `src/components/sections/RoomCard.tsx`
  - Room photo (hero image)
  - Room name and category
  - Short description (2-3 sentences)
  - Amenities list with icons
  - PricingDisplay component
  - "Book Now" button → `/booking`
- [ ] **Step 2.4**: Verify RoomCard tests pass (AC2, AC3, AC5)
- [ ] **Step 2.5**: Create RoomGallery component (AC6)
  - Integrate ImageGallery from SS-24
  - Show 6-8 photos per room
- [ ] **Step 2.6**: Build rooms page `src/app/rooms/page.tsx`
  - Hero section with headline
  - Grid of RoomCard components
  - Each card expands or links to room details
  - SEO metadata
- [ ] **Step 2.7**: Verify rooms page tests pass (AC1, AC6-AC10)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add room detail modal or expandable sections
  - Click room card → show full details
  - Photo gallery, full amenities, pricing breakdown
- [ ] **Step 3.2**: Add comparison feature (optional)
  - Compare 2-3 rooms side-by-side
  - Highlight differences in amenities and pricing
- [ ] **Step 3.3**: Test on mobile devices
- [ ] **Step 3.4**: Run Lighthouse audit
- [ ] **Step 3.5**: Verify pricing displays correctly in IDR
- [ ] **Step 3.6**: Run full test suite

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md
- [ ] **Step 4.2**: Add JSDoc comments
- [ ] **Step 4.3**: Document room content requirements
- [ ] **Step 4.4**: Create content checklist for user
- [ ] **Step 4.5**: Refactor for code clarity

**Documentation Checkpoint:** Complete

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Formatting passes
- [ ] Code coverage ≥70%
- [ ] All acceptance criteria verified ✅
- [ ] Performance: LCP <2.5s
- [ ] Lighthouse: Performance ≥90, Accessibility ≥95
- [ ] Mobile responsive
- [ ] Currency formatting correct (IDR - Rp X,XXX,XXX)

---

## Post-Implementation Verification

1. **Happy Path Test**
   - Navigate to `/rooms`
   - Verify all room cards render
   - Verify pricing displays in correct currency
   - Click "Book Now" → verify goes to `/booking`

2. **Responsive Testing**
   - Mobile: Cards stack vertically
   - Desktop: Cards in grid (2-3 columns)

3. **Currency Testing**
   - Verify IDR formatting: Rp X,XXX,XXX/night (e.g., Rp 2,250,000/night)

4. **Browser Testing**
   - Chrome, Safari, Firefox

5. **Performance Testing**
   - Run Lighthouse
   - Verify LCP < 2.5s

---

## Rollback Plan

1. Revert commits
2. Remove rooms page and components
3. Update navigation

**Risk Assessment:** Low
**Rollback Difficulty:** Easy

---

## Related Tasks

**Depends On:**

- [SS-26: Homepage](./ss-26-homepage.md)
- [SS-16: Add Real Room Info](./ss-16-real-room-info.md)

**Related:**

- [SS-12: Beds24 Widget](./ss-12-beds24-widget-integration.md) - CTAs link to booking

---

## Notes

**Content Requirements (User to Provide):**

1. **Room Types** (2-4 room categories):
   - Room 1: "Deluxe Ocean View"
     - Photos: 6-8 images
     - Description: 100 words
     - Amenities: WiFi, AC, Ocean View, Private Bathroom, etc.
     - Pricing: Rp 2,250,000/night (IDR)

   - Room 2: "Standard Garden View"
     - Photos: 6-8 images
     - Description: 100 words
     - Amenities: WiFi, AC, Garden View, Shared Bathroom, etc.
     - Pricing: $100/night or Rp 1,500,000/night

2. **Currency Format** (IDR - Indonesian Rupiah):
   - Format: Rp X,XXX,XXX/night (e.g., Rp 2,250,000/night)

3. **Amenities Icons:**
   - WiFi, AC, Ocean/Garden View, Private/Shared Bathroom
   - Breakfast Included, Beach Access, Surf Board Storage

**Placeholder Content:**

- Use stock hotel room photos
- Write generic room descriptions
- Standard amenity list

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
