---
task_id: ss-28
title: '[Feature] Activities & Surf Info Page'
status: not_started
priority: medium
estimated_time: '4-5 hours'
actual_time: null
dependencies: [ss-25]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-28/feat/activities-page
pr_number: null
---

[← Previous: SS-27 Rooms & Accommodation Page](./ss-27-rooms-page.md) | [📋 Index](./index.md) | [Next: SS-29 Polish Contact/Booking Pages →](./ss-29-polish-pages.md)

# [Feature] Activities & Surf Info Page

## Overview

Build an engaging activities page showcasing surf lessons, local experiences, and things to do in Sumba. Includes surf spot information, activity cards with photos, and booking CTAs.

**Project Context:**
Mobile-first surf camp website. Activities page sells the experience beyond accommodation—surfing, culture, adventure.

**User Story:**
As a potential guest, I want to see what activities are available so that I can plan my trip and feel excited about the experience.

**Business Value:**

- Differentiates surf camp from competitors
- Sells the full experience (not just accommodation)
- Increases booking intent through excitement
- Supports higher pricing for all-inclusive packages

---

## Prerequisites/Dependencies

- [x] SS-25: Homepage (design patterns)
- [ ] SS-22: YouTube Video Embeds (surf footage)
- [ ] SS-23: Image Gallery Component
- [ ] Activity content from user (descriptions, photos, videos)

---

## Acceptance Criteria

- [ ] **AC1**: Hero section with activities headline and surf video/image
- [ ] **AC2**: Surf spot information section (wave types, skill levels, best seasons)
- [ ] **AC3**: Activity cards for each offering (lessons, yoga, cultural tours, etc.)
- [ ] **AC4**: Each activity card includes photo, description, duration/difficulty
- [ ] **AC5**: Embedded surf footage video (YouTube from SS-22)
- [ ] **AC6**: Photo gallery of activities and surf spots
- [ ] **AC7**: CTA section → "Book Your Adventure" → `/booking`
- [ ] **AC8**: Mobile-first responsive design
- [ ] **AC9**: SEO meta tags for "surf sumba" queries
- [ ] **AC10**: Fast loading (lazy load videos and images)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/activities.test.tsx`
- `src/__tests__/components/ActivityCard.test.tsx`
- `src/__tests__/components/SurfSpotInfo.test.tsx`

### Coverage Target

- **70%** coverage (UI-heavy)
- **100%** coverage for CTA links

### Edge Cases to Test

1. Missing activity photos
2. Long activity descriptions
3. Various activity counts (3 activities vs. 10 activities)
4. Missing YouTube video ID

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files
- [ ] **Step 1.2**: Write failing tests for ActivityCard (AC3, AC4)
- [ ] **Step 1.3**: Write failing tests for SurfSpotInfo (AC2)
- [ ] **Step 1.4**: Write failing tests for activities page (AC1, AC5-AC10)
- [ ] **Step 1.5**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create ActivityCard component `src/components/sections/ActivityCard.tsx`
  - Activity photo (hero image)
  - Activity name
  - Short description (2-3 sentences)
  - Duration/difficulty badges
  - Optional: pricing if activity has extra cost
- [ ] **Step 2.2**: Verify ActivityCard tests pass (AC3, AC4)
- [ ] **Step 2.3**: Create SurfSpotInfo component `src/components/sections/SurfSpotInfo.tsx`
  - Surf spot name and description
  - Wave type (reef, beach break, point break)
  - Skill level (beginner, intermediate, advanced)
  - Best season (April-October for Sumba)
  - Crowd level, wave size range
- [ ] **Step 2.4**: Verify SurfSpotInfo tests pass (AC2)
- [ ] **Step 2.5**: Build activities page `src/app/activities/page.tsx`
  - Hero section with headline and surf video/image
  - Surf spot information section
  - Grid of ActivityCard components
  - Embedded surf footage video (YouTubeEmbed from SS-22)
  - Photo gallery section (ImageGallery from SS-23)
  - Final CTA section
  - SEO metadata
- [ ] **Step 2.6**: Verify activities page tests pass (AC1, AC5-AC10)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add surf spot map or location info (optional)
- [ ] **Step 3.2**: Add seasonal information (best time to visit)
- [ ] **Step 3.3**: Add activity booking flow (optional: "Book This Activity" → contact form)
- [ ] **Step 3.4**: Test on mobile devices
- [ ] **Step 3.5**: Run Lighthouse audit
- [ ] **Step 3.6**: Run full test suite

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md
- [ ] **Step 4.2**: Add JSDoc comments
- [ ] **Step 4.3**: Document activity content requirements
- [ ] **Step 4.4**: Create content checklist for user
- [ ] **Step 4.5**: Refactor for code clarity

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
- [ ] Mobile responsive

---

## Post-Implementation Verification

1. **Happy Path Test**
   - Navigate to `/activities`
   - Verify all activity cards render
   - Verify surf video plays and loops
   - Click CTA → verify goes to `/booking`

2. **Responsive Testing**
   - Mobile: Cards stack vertically
   - Desktop: Cards in grid

3. **Video Testing**
   - Verify YouTube video loads and loops
   - Verify video is muted by default
   - Verify no ads appear

4. **Browser Testing**
   - Chrome, Safari, Firefox

---

## Rollback Plan

1. Revert commits
2. Remove activities page and components

**Risk Assessment:** Low
**Rollback Difficulty:** Easy

---

## Related Tasks

**Depends On:**

- [SS-25: Homepage](./ss-25-homepage.md)
- [SS-22: YouTube Video Embeds](./ss-22-youtube-video-embeds.md)

---

## Notes

**Content Requirements (User to Provide):**

1. **Surf Spot Information:**
   - Spot name: "Pantai Nihiwatu"
   - Wave type: Reef break
   - Skill level: Intermediate to Advanced
   - Best season: April-October (dry season)
   - Wave size: 4-10 feet
   - Crowd level: Low (remote location)

2. **Activities** (4-6 activities):
   - **Surf Lessons**: Photo, description, duration (2 hours), skill level (beginner)
   - **Yoga Sessions**: Photo, description, duration (1 hour), difficulty (all levels)
   - **Cultural Tours**: Photo, description, duration (half day)
   - **Waterfall Hikes**: Photo, description, duration (3 hours), difficulty (moderate)
   - **Snorkeling**: Photo, description, duration (2 hours)
   - **Sunset Cruises**: Photo, description, duration (2 hours)

3. **Surf Footage Video:**
   - YouTube video ID of surf footage
   - Video should loop and be muted

**Placeholder Content:**

- Use stock surf photos
- Generic activity descriptions
- Stock surf footage video

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
