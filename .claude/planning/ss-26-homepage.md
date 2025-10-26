---
task_id: ss-26
title: '[Feature] Homepage with Hero, Features, Gallery, CTA'
status: not_started
priority: high
estimated_time: '6-8 hours'
actual_time: null
dependencies: [ss-22, ss-23, ss-24, ss-25]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-26/feat/homepage
pr_number: null
---

[← Previous: SS-25 Responsive Images](./ss-25-responsive-images.md) | [📋 Index](./index.md) | [Next: SS-27 About Page →](./ss-27-about-page.md)

# [Feature] Homepage with Hero, Features, Gallery, CTA

## Overview

Build a polished, mobile-first homepage with hero section (video/image), feature highlights, photo gallery, testimonials (optional), and strong call-to-action (CTA) driving users to book. This is the primary landing page that must convert visitors into bookers.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). The homepage must:

- 📱 Captivate mobile users immediately (primary device)
- 🏄 Showcase surf camp experience visually (video, photos)
- ⚡ Load fast (< 2.5s LCP) for SEO and conversions
- 💬 Clear CTAs driving to Beds24 booking widget
- 🎨 Establish brand identity and trust

**User Story:**
As a potential guest, I want to immediately understand what Sumba Sunset offers and feel excited to book so that I can experience the surf camp.

**Business Value:**

- Primary conversion funnel entry point
- First impression drives booking decisions
- Visual storytelling reduces booking hesitation
- Clear CTAs reduce friction in booking flow
- SEO landing page for organic search traffic

---

## Prerequisites/Dependencies

- [x] SS-22: Image Upload System (hero and gallery images)
- [x] SS-23: YouTube Video Embeds (optional hero video)
- [x] SS-24: Image Gallery Component (photo gallery section)
- [x] SS-25: Responsive Images (optimized image loading)
- [ ] SS-5: shadcn/ui components (Button, Card, etc.)
- [ ] Content from user (copy, images, videos)
- [ ] Brand colors and fonts defined

---

## Acceptance Criteria

- [ ] **AC1**: Hero section with full-width image or video background
- [ ] **AC2**: Hero includes headline, subheading, and primary CTA button
- [ ] **AC3**: Features section highlights key offerings (surf lessons, accommodation, activities)
- [ ] **AC4**: Photo gallery section with best property images
- [ ] **AC5**: Testimonials section (optional, can use placeholder)
- [ ] **AC6**: Final CTA section with booking button
- [ ] **AC7**: Mobile-first responsive design (looks great on phone first)
- [ ] **AC8**: Fast loading (LCP < 2.5s, CLS < 0.1)
- [ ] **AC9**: All CTAs link to `/booking` page (Beds24 widget)
- [ ] **AC10**: Smooth scroll animations as user scrolls down page
- [ ] **AC11**: SEO meta tags (title, description, OG tags)
- [ ] **AC12**: Accessibility (semantic HTML, ARIA labels, keyboard nav)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/app/homepage.test.tsx` - Integration tests for homepage rendering
- `src/__tests__/components/Hero.test.tsx` - Component tests for hero section
- `src/__tests__/components/FeaturesSection.test.tsx` - Component tests for features
- `src/__tests__/components/CTASection.test.tsx` - Component tests for CTA

### Test Types

- **Integration Tests**: Test homepage renders all sections correctly
- **Component Tests**: Test individual section components (Hero, Features, CTA)
- **Accessibility Tests**: Test semantic HTML, ARIA labels, keyboard navigation

### Coverage Target

- Minimum **70%** coverage for page and section components (UI-heavy)
- **100%** coverage for CTA link logic and navigation

### Edge Cases to Test

1. **Missing content**: Handle missing images, videos, or copy gracefully
2. **Long text**: Headlines and copy overflow handling
3. **No JavaScript**: Ensure content accessible without JS
4. **Slow network**: Test loading states and placeholders
5. **Various screen sizes**: Mobile, tablet, desktop, ultra-wide
6. **Touch interactions**: CTA buttons are touch-friendly (≥44px)

### Performance Benchmarks

- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms
- Time to Interactive (TTI) < 3.5s
- Hero image/video loads within 1.5s
- Total page weight < 2MB

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for homepage and section components
- [ ] **Step 1.2**: Write failing tests for Hero component (AC1, AC2)
  - Test hero renders with image or video
  - Test headline, subheading, CTA button present
  - Test CTA links to `/booking`
- [ ] **Step 1.3**: Write failing tests for FeaturesSection (AC3)
  - Test feature cards render
  - Test feature icons and text display
- [ ] **Step 1.4**: Write failing tests for Gallery section (AC4)
  - Test gallery component integration
  - Test gallery displays images
- [ ] **Step 1.5**: Write failing tests for CTA section (AC6, AC9)
  - Test final CTA renders
  - Test CTA button links to `/booking`
- [ ] **Step 1.6**: Write failing tests for homepage integration (AC7, AC11, AC12)
  - Test all sections render in correct order
  - Test responsive layout
  - Test SEO meta tags
  - Test accessibility (semantic HTML, ARIA)
- [ ] **Step 1.7**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create Hero component `src/components/sections/Hero.tsx`
  - Full-width background (image or video)
  - Overlay gradient for text readability
  - Headline (h1), subheading (p), CTA button
  - ResponsiveImage or YouTubeEmbed for background
  - Priority loading for hero image
- [ ] **Step 2.2**: Verify Hero component tests pass (AC1, AC2)
- [ ] **Step 2.3**: Create FeaturesSection component `src/components/sections/FeaturesSection.tsx`
  - Grid of feature cards (3-4 features)
  - Icon, heading, description for each feature
  - Responsive layout (1 col mobile, 2 col tablet, 3-4 col desktop)
  - Use shadcn/ui Card component
- [ ] **Step 2.4**: Verify FeaturesSection tests pass (AC3)
- [ ] **Step 2.5**: Create GallerySection component `src/components/sections/GallerySection.tsx`
  - Integrate ImageGallery component from SS-23
  - Section heading and subheading
  - Link to full gallery page (optional)
- [ ] **Step 2.6**: Verify GallerySection tests pass (AC4)
- [ ] **Step 2.7**: Create CTASection component `src/components/sections/CTASection.tsx`
  - Eye-catching heading
  - Persuasive subheading
  - Large, prominent CTA button → `/booking`
  - Optional: secondary CTA → `/contact`
- [ ] **Step 2.8**: Verify CTASection tests pass (AC6, AC9)
- [ ] **Step 2.9**: Build homepage `src/app/page.tsx`
  - Import and render all section components
  - Add SEO metadata (title, description, OG tags)
  - Structure with semantic HTML (header, main, section)
- [ ] **Step 2.10**: Verify homepage integration tests pass (AC7, AC11, AC12)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add scroll animations using CSS or Framer Motion
  - Fade-in effect as sections enter viewport
  - Smooth transitions between sections
  - Avoid excessive animation (performance)
- [ ] **Step 3.2**: Verify animations don't impact performance (AC8)
- [ ] **Step 3.3**: Add loading states for hero image/video
  - Skeleton loader while hero loads
  - Blur placeholder for images
- [ ] **Step 3.4**: Optimize for Core Web Vitals
  - Ensure hero image has priority loading
  - Add width/height to all images (prevent CLS)
  - Lazy load below-the-fold content
- [ ] **Step 3.5**: Add testimonials section (optional, use placeholder)
  - Simple testimonial cards
  - Can be populated post-launch with real reviews
- [ ] **Step 3.6**: Test on real mobile devices (iOS Safari, Android Chrome)
- [ ] **Step 3.7**: Run Lighthouse audit and optimize based on results
- [ ] **Step 3.8**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with homepage structure
- [ ] **Step 4.2**: Add JSDoc comments for section components
- [ ] **Step 4.3**: Document content requirements in architecture.md
  - Hero image/video specifications
  - Feature icons and copy
  - Gallery image count and categories
  - CTA button text and links
- [ ] **Step 4.4**: Create content checklist for user to provide
- [ ] **Step 4.5**: Add usage examples for section components
- [ ] **Step 4.6**: Refactor for code clarity (keep tests green)

**Documentation Checkpoint:** All documentation complete and up-to-date

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings in dev mode
- [ ] Code coverage meets target (≥70%)
- [ ] All acceptance criteria verified ✅
- [ ] Documentation updated (README, JSDoc, architecture.md)
- [ ] Planning doc fully checked off
- [ ] Git commits created with descriptive messages
- [ ] Performance benchmarks met (LCP <2.5s, CLS <0.1)
- [ ] Lighthouse score: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95
- [ ] Accessibility requirements met (semantic HTML, ARIA, keyboard nav)
- [ ] Mobile responsive (looks great on 375px width phone)
- [ ] No regressions in existing features

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Navigate to homepage `/`
   - [ ] Verify hero section displays with image/video
   - [ ] Verify headline, subheading, CTA button render
   - [ ] Click CTA → verify navigates to `/booking`
   - [ ] Scroll down → verify all sections render

2. **Edge Case Testing**
   - [ ] Test with missing hero image → verify fallback displays
   - [ ] Test with very long headline → verify no overflow
   - [ ] Test with slow network → verify loading states
   - [ ] Disable JavaScript → verify content still accessible

3. **Responsive Testing**
   - [ ] Mobile (375px width): All sections stack vertically
   - [ ] Tablet (768px width): Features in 2 columns
   - [ ] Desktop (1440px width): Features in 3-4 columns
   - [ ] Ultra-wide (2560px width): Content max-width constrained

4. **Browser Testing**
   - [ ] Chrome (desktop & mobile)
   - [ ] Safari (desktop & mobile - critical)
   - [ ] Firefox
   - [ ] Edge

5. **Performance Testing (Lighthouse)**
   - [ ] Run Lighthouse audit (mobile + desktop)
   - [ ] Verify LCP < 2.5s
   - [ ] Verify CLS < 0.1
   - [ ] Verify FID < 100ms
   - [ ] Test on slow 3G network simulation
   - [ ] Verify hero image loads within 1.5s

6. **Accessibility Testing**
   - [ ] Keyboard navigation: Tab through all CTAs
   - [ ] Screen reader: All sections announced correctly
   - [ ] Semantic HTML: h1 for hero headline, proper heading hierarchy
   - [ ] Focus indicators visible on all interactive elements
   - [ ] Color contrast meets WCAG AA standards

7. **SEO Testing**
   - [ ] View page source: Verify meta tags present
   - [ ] Verify OG tags for social sharing
   - [ ] Verify structured data (if applicable)
   - [ ] Verify alt text on all images

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Restore default Next.js homepage**: Simple placeholder
3. **Remove section components**: Delete Hero, Features, Gallery, CTA sections
4. **Remove tests**: Delete homepage test files
5. **Update navigation**: Remove homepage links if necessary

**Risk Assessment:** Medium (major user-facing page)
**Rollback Difficulty:** Moderate (many components, content dependencies)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add homepage structure and content requirements
- [ ] `.claude/docs/architecture.md` - Document homepage sections and layout
- [ ] `.claude/docs/coding-standards.md` - Add section component patterns
- [ ] `src/app/page.tsx` - Comprehensive JSDoc and SEO metadata
- [ ] `src/components/sections/*.tsx` - JSDoc for all section components

---

## Related Tasks

**Depends On:**

- [SS-22: Image Upload System](./ss-22-image-upload-system.md) - Homepage uses uploaded images
- [SS-23: YouTube Video Embeds](./ss-23-youtube-video-embeds.md) - Hero may include video
- [SS-24: Image Gallery Component](./ss-24-image-gallery-component.md) - Gallery section uses gallery component
- [SS-25: Responsive Images](./ss-25-responsive-images.md) - All images are responsive

**Blocks:**

- [SS-31: Mobile-First Responsive Design](./ss-31-mobile-responsive-design.md) - Homepage sets design patterns

**Related:**

- [SS-27: About Page](./ss-27-about-page.md) - Similar page structure
- [SS-28: Rooms Page](./ss-28-rooms-page.md) - Similar page structure
- [SS-12: Beds24 Widget](./ss-12-beds24-widget-integration.md) - CTAs link to booking page

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

### Technical Debt Created

-

### Follow-up Tasks Created

- [ ] [SS-X: Task Name](./ss-X-task.md) - Description

---

## Notes

**Content Requirements (User to Provide):**

1. **Hero Section:**
   - Background image or video (1920x1080px recommended)
   - Headline (max 60 characters): "Experience World-Class Surf in Sumba"
   - Subheading (max 120 characters): "Authentic surf camp experience in Indonesia's hidden gem"
   - Primary CTA text: "Book Your Stay" → `/booking`

2. **Features Section:**
   - Feature 1: "Surf Lessons" - Icon, 50-word description
   - Feature 2: "Beachfront Accommodation" - Icon, 50-word description
   - Feature 3: "Local Culture" - Icon, 50-word description
   - Feature 4: "Adventure Activities" - Icon, 50-word description

3. **Gallery Section:**
   - 8-12 best property images
   - Mix of: rooms, surf spots, activities, property views
   - Section heading: "Explore Our Surf Camp"

4. **Testimonials (Optional):**
   - 3 placeholder testimonials (can be replaced with real reviews post-launch)
   - Name, location, star rating, quote

5. **Final CTA:**
   - Headline: "Ready for Your Sumba Adventure?"
   - Subheading: "Book now and save 10% on your first stay"
   - CTA: "Book Now" → `/booking`
   - Secondary CTA: "Contact Us" → `/contact`

**Brand Guidelines:**

- Primary color: Ocean blue (#0EA5E9)
- Secondary color: Sunset orange (#F97316)
- Font: Inter (sans-serif)
- Tone: Adventurous, authentic, welcoming

**Section Order:**

1. Hero (full-screen, priority loading)
2. Features (below the fold, lazy load)
3. Gallery (lazy load)
4. Testimonials (optional, lazy load)
5. Final CTA (sticky or prominent)

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
