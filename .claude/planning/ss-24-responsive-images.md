---
task_id: ss-24
title: '[Feature] Responsive Images for Mobile/Desktop'
status: not_started
priority: high
estimated_time: '3-4 hours'
actual_time: null
dependencies: [ss-21]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-24/feat/responsive-images
pr_number: null
---

[← Previous: SS-23 Image Gallery Component](./ss-23-image-gallery-component.md) | [📋 Index](./index.md) | [Next: SS-25 Homepage →](./ss-25-homepage.md)

# [Feature] Responsive Images for Mobile/Desktop

## Overview

Implement a comprehensive responsive image strategy using Next.js Image component with automatic srcset generation, optimal format selection (WebP/AVIF), and device-appropriate sizing. This ensures fast loading on mobile devices while maintaining quality on desktop.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). Responsive images are critical for:

- 📱 Mobile performance (primary user device, often on limited bandwidth)
- ⚡ Fast Core Web Vitals scores (LCP, CLS)
- 🖼️ Automatic format selection (WebP for modern browsers, JPEG fallback)
- 📐 Device-appropriate image sizes (don't send desktop images to mobile)
- 🚀 SEO benefits from performance optimization

**User Story:**
As a potential guest browsing on mobile, I want images to load quickly and look sharp so that I can view property photos without waiting or consuming excessive data.

**Business Value:**

- Faster mobile experience improves conversion rates
- Reduced bandwidth costs (smaller images for mobile)
- Better SEO rankings from performance optimization
- Improved Core Web Vitals scores
- Professional mobile experience matches user expectations

---

## Prerequisites/Dependencies

- [x] SS-21: Image Upload System (images uploaded to Vercel Blob)
- [ ] Next.js Image component configured in `next.config.ts`
- [ ] Vercel Blob domain added to Next.js image domains
- [ ] Understanding of responsive image sizes and breakpoints

---

## Acceptance Criteria

- [ ] **AC1**: Next.js Image component configured with Vercel Blob domain
- [ ] **AC2**: Images automatically generate srcset for multiple sizes
- [ ] **AC3**: Browser selects optimal image size based on viewport width
- [ ] **AC4**: Images automatically convert to WebP/AVIF when supported
- [ ] **AC5**: Images include width/height attributes (prevent layout shift)
- [ ] **AC6**: Images lazy load by default (only load when in viewport)
- [ ] **AC7**: Above-the-fold images use priority loading (hero images)
- [ ] **AC8**: Blur placeholder displays while images load
- [ ] **AC9**: Images maintain aspect ratio on all devices
- [ ] **AC10**: Alt text required for all images (accessibility & SEO)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/lib/imageConfig.test.ts` - Unit tests for image size calculations
- `src/__tests__/components/ResponsiveImage.test.tsx` - Component tests for image wrapper
- `src/__tests__/integration/imageLoading.integration.test.ts` - Integration tests for loading behavior

### Test Types

- **Unit Tests**: Test image size calculation functions, srcset generation logic
- **Integration Tests**: Test Next.js Image component integration with Vercel Blob
- **Component Tests**: Test ResponsiveImage wrapper props and rendering

### Coverage Target

- Minimum **80%** coverage for image utilities and wrapper components
- **100%** coverage for size calculation and validation logic

### Edge Cases to Test

1. **Missing dimensions**: Images without width/height attributes
2. **Invalid URLs**: Broken Vercel Blob URLs
3. **Unsupported formats**: Non-image files
4. **Extreme aspect ratios**: Very wide or very tall images
5. **Missing alt text**: Ensure validation catches missing alt text
6. **Priority images**: Verify priority prop disables lazy loading
7. **Blur placeholder**: Verify placeholder displays correctly

### Performance Benchmarks

- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1 (no layout shift from images)
- Mobile image size < 300KB (optimized for 3G)
- Desktop image size < 800KB
- Image format: WebP for 95%+ of modern browsers
- Lazy load images load within 500ms of entering viewport

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for image config and wrapper component
- [ ] **Step 1.2**: Write failing tests for image size calculations (AC2, AC3)
  - Test breakpoint-based size calculations
  - Test srcset generation for mobile/tablet/desktop
- [ ] **Step 1.3**: Write failing tests for Next.js Image configuration (AC1, AC4)
  - Test Vercel Blob domain is allowed
  - Test format optimization (WebP/AVIF)
- [ ] **Step 1.4**: Write failing tests for ResponsiveImage component (AC5-AC10)
  - Test width/height attributes present
  - Test lazy loading enabled by default
  - Test priority prop disables lazy loading
  - Test blur placeholder
  - Test alt text validation
- [ ] **Step 1.5**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Configure Next.js Image in `next.config.ts`
  - Add Vercel Blob domain to `images.remotePatterns`
  - Enable `formats: ['image/avif', 'image/webp']`
  - Set device sizes: `[640, 750, 828, 1080, 1200, 1920, 2048, 3840]`
  - Set image sizes: `[16, 32, 48, 64, 96, 128, 256, 384]`
  ```typescript
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
  ```
- [ ] **Step 2.2**: Verify Next.js Image configuration tests pass (AC1, AC4)
- [ ] **Step 2.3**: Create image size utility in `src/lib/imageConfig.ts`
  - Define breakpoints (mobile: 640px, tablet: 1024px, desktop: 1920px)
  - Function to calculate appropriate image sizes for each breakpoint
  - Generate srcset string for responsive images
- [ ] **Step 2.4**: Verify image size calculation tests pass (AC2, AC3)
- [ ] **Step 2.5**: Create ResponsiveImage component `src/components/media/ResponsiveImage.tsx`
  - Wrap Next.js Image component with project defaults
  - Require width, height, alt props (TypeScript)
  - Set lazy loading by default (unless priority prop)
  - Add blur placeholder support
  - Calculate appropriate sizes based on layout (full-width, half-width, etc.)
- [ ] **Step 2.6**: Verify ResponsiveImage component tests pass (AC5-AC10)
- [ ] **Step 2.7**: Update OptimizedImage component from SS-21 to use ResponsiveImage
  - Refactor to use new ResponsiveImage wrapper
  - Ensure backward compatibility
- [ ] **Step 2.8**: Verify integration with existing image components

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add TypeScript types in `src/types/image.ts`
  ```typescript
  export type ImageLayout = 'fill' | 'responsive' | 'intrinsic' | 'fixed';
  export type ImageSizes = {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  export type ResponsiveImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
    sizes?: string;
    className?: string;
    blurDataURL?: string;
  };
  ```
- [ ] **Step 3.2**: Create helper function to generate blur placeholders
  - Use Next.js built-in blur data URL generation
  - Or use placeholder service for external images
- [ ] **Step 3.3**: Add image presets for common use cases
  - Hero image: full-width, priority
  - Gallery thumbnail: fixed size, lazy load
  - Room photo: responsive, lazy load
  - Logo: fixed size, priority
- [ ] **Step 3.4**: Update all existing Image components to use ResponsiveImage
- [ ] **Step 3.5**: Test on real mobile devices (iOS Safari, Android Chrome)
- [ ] **Step 3.6**: Verify no layout shift (CLS) during image load
- [ ] **Step 3.7**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with responsive image usage
- [ ] **Step 4.2**: Add JSDoc comments for ResponsiveImage component and utilities
- [ ] **Step 4.3**: Add usage examples in comments

  ```typescript
  // Example 1: Hero image (full-width, priority loading)
  <ResponsiveImage
    src={heroImageUrl}
    alt="Sumba Sunset Surf Camp"
    width={1920}
    height={1080}
    priority
    sizes="100vw"
  />

  // Example 2: Gallery thumbnail (fixed size, lazy load)
  <ResponsiveImage
    src={thumbnailUrl}
    alt="Ocean view room"
    width={400}
    height={300}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />

  // Example 3: Room photo (responsive, lazy load with blur)
  <ResponsiveImage
    src={roomPhotoUrl}
    alt="Deluxe ocean view room"
    width={1200}
    height={900}
    blurDataURL={blurPlaceholder}
    sizes="(max-width: 640px) 100vw, 50vw"
  />
  ```

- [ ] **Step 4.4**: Document image size strategy in architecture.md
- [ ] **Step 4.5**: Add performance optimization guidelines
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
- [ ] Code coverage meets target (≥80%)
- [ ] All acceptance criteria verified ✅
- [ ] Documentation updated (README, JSDoc, architecture.md)
- [ ] Planning doc fully checked off
- [ ] Git commits created with descriptive messages
- [ ] Performance benchmarks met (LCP <2.5s, CLS <0.1)
- [ ] Accessibility requirements met (alt text required)
- [ ] Mobile responsive (appropriate image sizes served)
- [ ] No regressions in existing features
- [ ] Core Web Vitals pass (test with Lighthouse)

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Create test page with various image sizes
   - [ ] Verify images load with appropriate sizes for viewport
   - [ ] Verify WebP format served in Chrome (check Network tab)
   - [ ] Verify no layout shift during image load

2. **Edge Case Testing**
   - [ ] Test with very large image (4K) → verify scaled down for mobile
   - [ ] Test with missing alt text → verify TypeScript error
   - [ ] Test with invalid Vercel Blob URL → verify error handling
   - [ ] Test with extreme aspect ratio → verify maintains aspect ratio
   - [ ] Test priority image → verify loads immediately (no lazy load)

3. **Responsive Testing**
   - [ ] Resize browser from mobile to desktop width
   - [ ] Verify appropriate image size loads at each breakpoint
   - [ ] Check Network tab: mobile loads ~300KB images, desktop loads ~800KB
   - [ ] Verify srcset attribute includes multiple sizes

4. **Browser Testing**
   - [ ] Chrome (desktop & mobile) - should serve AVIF
   - [ ] Safari (desktop & mobile) - should serve WebP
   - [ ] Firefox - should serve WebP
   - [ ] Edge - should serve AVIF

5. **Performance Testing (Lighthouse)**
   - [ ] Run Lighthouse audit on mobile
   - [ ] Verify LCP < 2.5s
   - [ ] Verify CLS < 0.1 (no layout shift)
   - [ ] Verify lazy loading working (check coverage)
   - [ ] Test on slow 3G network simulation

6. **Accessibility Testing**
   - [ ] Verify all images have descriptive alt text
   - [ ] Screen reader announces alt text correctly
   - [ ] Verify no missing alt attributes (TypeScript prevents this)

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Restore Next.js config**: Revert `next.config.ts` changes
3. **Remove ResponsiveImage**: Delete wrapper component
4. **Restore OptimizedImage**: Revert to previous version
5. **Update components**: Replace ResponsiveImage usage with basic Next.js Image

**Risk Assessment:** Medium (affects all images site-wide)
**Rollback Difficulty:** Moderate (requires reverting multiple files)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add responsive image usage instructions
- [ ] `.claude/docs/architecture.md` - Document image size strategy and breakpoints
- [ ] `.claude/docs/coding-standards.md` - Add responsive image best practices
- [ ] `next.config.ts` - Document image configuration
- [ ] `src/components/media/ResponsiveImage.tsx` - Comprehensive JSDoc

---

## Related Tasks

**Depends On:**

- [SS-21: Image Upload System](./ss-21-image-upload-system.md) - Responsive images use uploaded images

**Blocks:**

- [SS-25: Homepage](./ss-25-homepage.md) - Homepage uses responsive hero images
- [SS-27: Rooms Page](./ss-27-rooms-page.md) - Rooms page uses responsive room photos
- [SS-28: Activities Page](./ss-28-activities-page.md) - Activities page uses responsive images

**Related:**

- [SS-23: Image Gallery Component](./ss-23-image-gallery-component.md) - Gallery uses responsive images
- [SS-34: Performance Optimization](./ss-34-performance-optimization.md) - Responsive images improve performance

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

**Image Size Strategy:**

**Breakpoints:**

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Image Sizes by Layout:**

1. **Full-width hero images:**
   - Mobile: 640w
   - Tablet: 1024w
   - Desktop: 1920w
   - Sizes: `100vw`

2. **Half-width images (2-col grid):**
   - Mobile: 640w (full-width on mobile)
   - Tablet: 512w (50% of 1024px)
   - Desktop: 960w (50% of 1920px)
   - Sizes: `(max-width: 640px) 100vw, 50vw`

3. **Third-width images (3-col grid):**
   - Mobile: 640w (full-width on mobile)
   - Tablet: 341w (33% of 1024px)
   - Desktop: 640w (33% of 1920px)
   - Sizes: `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`

4. **Fixed-size thumbnails:**
   - All devices: 400w
   - Sizes: `400px`

**Format Priority:**

1. AVIF (best compression, modern browsers)
2. WebP (good compression, wide support)
3. JPEG (fallback for old browsers)

**Blur Placeholder:**

- Use Next.js automatic blur data URL generation
- Or use placeholder service for external images
- Improves perceived performance

**Priority Loading:**

- Use for above-the-fold images only (hero, logo)
- Disables lazy loading
- Loads immediately on page load

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
