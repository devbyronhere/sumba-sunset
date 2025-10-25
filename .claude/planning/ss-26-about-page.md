---
task_id: ss-26
title: '[Feature] About Page (Surf Camp Story, Team)'
status: not_started
priority: medium
estimated_time: '4-5 hours'
actual_time: null
dependencies: [ss-25]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-26/feat/about-page
pr_number: null
---

[← Previous: SS-25 Homepage](./ss-25-homepage.md) | [📋 Index](./index.md) | [Next: SS-27 Rooms & Accommodation Page →](./ss-27-rooms-page.md)

# [Feature] About Page (Surf Camp Story, Team)

## Overview

Create a compelling About page that tells the Sumba Sunset story, introduces the team, explains the surf camp philosophy, and builds trust with potential guests. This page establishes credibility and emotional connection.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). The About page must:

- 📱 Engage mobile readers with visual storytelling
- 🏄 Convey authenticity and passion for surfing
- 💬 Build trust through team introductions and property history
- 🖼️ Use photos to showcase team and property personality
- 🎯 Support booking decisions by reducing uncertainty

**User Story:**
As a potential guest, I want to learn about the surf camp's story and team so that I feel confident this is a trustworthy, authentic experience run by passionate people.

**Business Value:**

- Builds trust and credibility (reduces booking hesitation)
- Differentiates from competitors through storytelling
- Humanizes the brand (team photos and bios)
- Supports SEO with rich, unique content
- Converts skeptical visitors into bookers

---

## Prerequisites/Dependencies

- [x] SS-25: Homepage (establishes design patterns)
- [ ] SS-5: shadcn/ui components
- [ ] SS-24: Responsive Images
- [ ] Content from user (story, team bios, photos)

---

## Acceptance Criteria

- [ ] **AC1**: Hero section with about headline and background image
- [ ] **AC2**: Story section explaining surf camp origins and philosophy
- [ ] **AC3**: Team section with photos and bios of key staff
- [ ] **AC4**: Mission/values section (optional)
- [ ] **AC5**: Gallery of property and team photos
- [ ] **AC6**: CTA section linking to booking or contact page
- [ ] **AC7**: Mobile-first responsive design
- [ ] **AC8**: SEO meta tags optimized for "about" queries
- [ ] **AC9**: Accessibility (semantic HTML, readable text, alt text)
- [ ] **AC10**: Fast loading (reuse components from homepage for consistency)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/about.test.tsx` - Integration tests for about page rendering
- `src/__tests__/components/TeamCard.test.tsx` - Component tests for team member cards
- `src/__tests__/components/StorySection.test.tsx` - Component tests for story section

### Test Types

- **Integration Tests**: Test about page renders all sections correctly
- **Component Tests**: Test team card component with various props
- **Accessibility Tests**: Test semantic HTML, alt text, keyboard navigation

### Coverage Target

- Minimum **70%** coverage for page and components (UI-heavy)
- **100%** coverage for CTA links and navigation

### Edge Cases to Test

1. **Missing content**: Handle missing team photos or bios gracefully
2. **Long bios**: Text overflow handling in team cards
3. **Various team sizes**: 2 team members vs. 10 team members
4. **Missing images**: Fallback for missing team/property photos

### Performance Benchmarks

- LCP < 2.5s
- CLS < 0.1
- Page weight < 1.5MB
- All images lazy loaded except hero

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for about page and components
- [ ] **Step 1.2**: Write failing tests for AboutHero component (AC1)
- [ ] **Step 1.3**: Write failing tests for StorySection (AC2)
- [ ] **Step 1.4**: Write failing tests for TeamSection (AC3)
  - Test team grid renders
  - Test team cards display photos and bios
- [ ] **Step 1.5**: Write failing tests for about page integration (AC6-AC10)
- [ ] **Step 1.6**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create AboutHero component `src/components/sections/AboutHero.tsx`
  - Reuse Hero component from homepage with different content
  - Headline: "About Sumba Sunset"
  - Subheading: Short tagline about surf camp
- [ ] **Step 2.2**: Verify AboutHero tests pass (AC1)
- [ ] **Step 2.3**: Create StorySection component `src/components/sections/StorySection.tsx`
  - Two-column layout (text + image on desktop, stacked on mobile)
  - Heading, multiple paragraphs of story text
  - Side image of property or surf break
- [ ] **Step 2.4**: Verify StorySection tests pass (AC2)
- [ ] **Step 2.5**: Create TeamCard component `src/components/ui/TeamCard.tsx`
  - Team member photo (circular or square)
  - Name, role/title
  - Short bio (2-3 sentences)
  - Optional: social media links
- [ ] **Step 2.6**: Create TeamSection component `src/components/sections/TeamSection.tsx`
  - Grid of TeamCard components
  - Responsive layout (1 col mobile, 2 col tablet, 3-4 col desktop)
  - Section heading: "Meet The Team"
- [ ] **Step 2.7**: Verify TeamSection tests pass (AC3)
- [ ] **Step 2.8**: Build about page `src/app/about/page.tsx`
  - Import and render all sections
  - Add SEO metadata
  - Semantic HTML structure
- [ ] **Step 2.9**: Verify about page tests pass (AC6-AC10)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add optional Mission/Values section (AC4)
  - Icon + heading + text for each value
  - Grid layout similar to features section
- [ ] **Step 3.2**: Add photo gallery section (AC5)
  - Reuse GallerySection from homepage
  - Show team and property photos
- [ ] **Step 3.3**: Add final CTA section
  - Reuse CTASection from homepage
  - Text: "Ready to Join Us?" → `/booking`
- [ ] **Step 3.4**: Test on mobile devices
- [ ] **Step 3.5**: Run Lighthouse audit
- [ ] **Step 3.6**: Run full test suite

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with about page structure
- [ ] **Step 4.2**: Add JSDoc comments for components
- [ ] **Step 4.3**: Document content requirements
- [ ] **Step 4.4**: Create content checklist for user
- [ ] **Step 4.5**: Refactor for code clarity

**Documentation Checkpoint:** All documentation complete

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Formatting passes
- [ ] No console errors
- [ ] Code coverage ≥70%
- [ ] All acceptance criteria verified ✅
- [ ] Documentation updated
- [ ] Planning doc fully checked off
- [ ] Git commits created
- [ ] Performance: LCP <2.5s, CLS <0.1
- [ ] Lighthouse: Performance ≥90, Accessibility ≥95
- [ ] Accessibility: Semantic HTML, ARIA, keyboard nav
- [ ] Mobile responsive

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Navigate to `/about`
   - [ ] Verify all sections render correctly
   - [ ] Verify team photos and bios display
   - [ ] Click CTA → verify navigates to `/booking`

2. **Responsive Testing**
   - [ ] Mobile: All sections stack vertically
   - [ ] Tablet: Team cards in 2 columns
   - [ ] Desktop: Team cards in 3-4 columns

3. **Browser Testing**
   - [ ] Chrome, Safari, Firefox, Edge

4. **Performance Testing**
   - [ ] Run Lighthouse audit
   - [ ] Verify LCP < 2.5s

5. **Accessibility Testing**
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces correctly
   - [ ] All images have alt text

---

## Rollback Plan

1. **Revert commit(s)**
2. **Remove about page** and components
3. **Remove tests**
4. **Update navigation** (remove About link)

**Risk Assessment:** Low
**Rollback Difficulty:** Easy

---

## Documentation Updates

- [ ] `README.md`
- [ ] `.claude/docs/architecture.md`
- [ ] Component JSDoc

---

## Related Tasks

**Depends On:**

- [SS-25: Homepage](./ss-25-homepage.md) - Design patterns established

**Related:**

- [SS-27: Rooms Page](./ss-27-rooms-page.md) - Similar page structure
- [SS-28: Activities Page](./ss-28-activities-page.md) - Similar page structure

---

## Retrospective

_(Fill out after completion)_

### What Went Well

-

### What Could Improve

-

### Key Learnings

- ***

## Notes

**Content Requirements (User to Provide):**

1. **Story Section:**
   - Origin story (200-300 words)
   - Surf camp philosophy
   - What makes Sumba Sunset unique
   - 1-2 property/surf photos

2. **Team Section:**
   - Team member 1: Photo, name, role, bio (50 words)
   - Team member 2: Photo, name, role, bio (50 words)
   - Team member 3+: (as many as needed)

3. **Mission/Values (Optional):**
   - Value 1: Authenticity
   - Value 2: Sustainability
   - Value 3: Community

**Placeholder Content:**

- Use AI-generated team photos initially
- Write placeholder bios that can be replaced
- Use stock property photos

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
