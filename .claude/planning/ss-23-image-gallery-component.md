---
task_id: ss-23
title: '[Feature] Image Gallery Component'
status: not_started
priority: medium
estimated_time: '4-5 hours'
actual_time: null
dependencies: [ss-21]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-23/feat/image-gallery-component
pr_number: null
---

[← Previous: SS-22 YouTube Video Embeds](./ss-22-youtube-video-embeds.md) | [📋 Index](./index.md) | [Next: SS-24 Responsive Images →](./ss-24-responsive-images.md)

# [Feature] Image Gallery Component

## Overview

Create a mobile-first image gallery component with lightbox view, thumbnail navigation, and touch/swipe gestures. This gallery will showcase property photos (rooms, activities, surf spots) with optimized loading and smooth interactions.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). The gallery must:

- 📱 Prioritize mobile touch gestures (primary user device)
- 🖼️ Display property images from Vercel Blob storage
- ⚡ Lazy load images for performance
- 🔍 Lightbox view for full-screen image viewing
- 👆 Swipe navigation on mobile, arrow keys on desktop

**User Story:**
As a potential guest, I want to browse property photos in a beautiful gallery so that I can see rooms, activities, and surf spots before booking.

**Business Value:**

- Visual storytelling increases booking conversions
- Professional gallery elevates brand perception
- Mobile-optimized experience matches user behavior
- Reusable component for multiple pages (rooms, activities, gallery)
- Smooth interactions improve user engagement

---

## Prerequisites/Dependencies

- [x] SS-21: Image Upload System (images must be uploaded and available)
- [ ] Images uploaded to Vercel Blob storage
- [ ] OptimizedImage component available from SS-21
- [ ] shadcn/ui Dialog component installed (for lightbox)

---

## Acceptance Criteria

- [ ] **AC1**: Gallery displays grid of thumbnail images (responsive columns)
- [ ] **AC2**: Clicking thumbnail opens lightbox with full-size image
- [ ] **AC3**: Lightbox supports swipe gestures on mobile (left/right)
- [ ] **AC4**: Lightbox supports keyboard navigation (arrow keys, Escape to close)
- [ ] **AC5**: Lightbox shows image counter (e.g., "3 / 12")
- [ ] **AC6**: Lightbox includes close button (accessible)
- [ ] **AC7**: Gallery lazy loads images (only load when in viewport)
- [ ] **AC8**: Smooth animations for opening/closing lightbox
- [ ] **AC9**: Alt text displays for accessibility
- [ ] **AC10**: Gallery handles empty state gracefully (no images)
- [ ] **AC11**: Touch-friendly thumbnail sizing (min 44x44px tap target)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/components/ImageGallery.test.tsx` - Component tests for gallery grid
- `src/__tests__/components/ImageLightbox.test.tsx` - Component tests for lightbox
- `src/__tests__/hooks/useSwipeGesture.test.ts` - Unit tests for swipe detection hook

### Test Types

- **Unit Tests**: Test swipe gesture detection logic, navigation functions
- **Component Tests**: Test gallery rendering, thumbnail clicks, lightbox behavior, keyboard navigation

### Coverage Target

- Minimum **80%** coverage for gallery and lightbox components
- **100%** coverage for swipe gesture hook and navigation logic

### Edge Cases to Test

1. **Empty gallery**: No images provided, show empty state
2. **Single image**: Gallery with only one image (no navigation needed)
3. **Large galleries**: 50+ images (test performance and lazy loading)
4. **Invalid image URLs**: Broken images, handle gracefully with fallback
5. **Keyboard navigation**: Arrow keys, Escape key, Tab key (accessibility)
6. **Touch gestures**: Swipe left, swipe right, vertical scroll (shouldn't trigger swipe)
7. **Lightbox open state**: Prevent body scroll, focus trap

### Performance Benchmarks

- Thumbnail grid renders < 500ms for 20 images
- Lazy load images within 300ms of entering viewport
- Lightbox opens < 200ms (smooth animation)
- Swipe gesture response < 50ms
- Component bundle size < 15KB (excluding images)
- No layout shift during image lazy loading

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for gallery, lightbox, and swipe hook
- [ ] **Step 1.2**: Write failing tests for ImageGallery component (AC1, AC7, AC10, AC11)
  - Test grid rendering with multiple images
  - Test responsive column layout
  - Test lazy loading behavior
  - Test empty state
- [ ] **Step 1.3**: Write failing tests for ImageLightbox component (AC2, AC5, AC6, AC8, AC9)
  - Test lightbox opens on thumbnail click
  - Test close button functionality
  - Test image counter display
  - Test alt text accessibility
- [ ] **Step 1.4**: Write failing tests for keyboard navigation (AC4)
  - Test arrow key navigation
  - Test Escape key closes lightbox
  - Test focus trap in lightbox
- [ ] **Step 1.5**: Write failing tests for swipe gestures (AC3)
  - Test swipe left advances to next image
  - Test swipe right goes to previous image
  - Test vertical scroll doesn't trigger navigation
- [ ] **Step 1.6**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create useSwipeGesture hook in `src/hooks/useSwipeGesture.ts`
  - Detect touch start, move, and end events
  - Calculate swipe direction (left/right)
  - Ignore vertical scrolls
  - Return callbacks for onSwipeLeft and onSwipeRight
- [ ] **Step 2.2**: Verify swipe gesture hook tests pass (AC3)
- [ ] **Step 2.3**: Create ImageGallery component `src/components/media/ImageGallery.tsx`
  - Accept images array with metadata (url, altText, id)
  - Render responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
  - Use OptimizedImage component for thumbnails
  - Implement lazy loading with Intersection Observer
  - Handle empty state
- [ ] **Step 2.4**: Verify gallery rendering tests pass (AC1, AC7, AC10, AC11)
- [ ] **Step 2.5**: Create ImageLightbox component `src/components/media/ImageLightbox.tsx`
  - Use shadcn/ui Dialog for modal functionality
  - Display full-size image with OptimizedImage
  - Show image counter (current / total)
  - Add close button with accessible label
  - Implement body scroll lock when open
- [ ] **Step 2.6**: Verify lightbox rendering tests pass (AC2, AC5, AC6, AC8, AC9)
- [ ] **Step 2.7**: Implement keyboard navigation in lightbox
  - Left/Right arrow keys navigate images
  - Escape key closes lightbox
  - Tab key focuses only lightbox elements (focus trap)
- [ ] **Step 2.8**: Verify keyboard navigation tests pass (AC4)
- [ ] **Step 2.9**: Integrate swipe gestures with lightbox
  - Attach useSwipeGesture hook to lightbox
  - Swipe left → next image
  - Swipe right → previous image
- [ ] **Step 2.10**: Verify swipe gesture tests pass (AC3)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add TypeScript types in `src/types/gallery.ts`

  ```typescript
  export type GalleryImage = {
    id: string;
    url: string;
    altText: string;
    width: number;
    height: number;
    category?: string;
  };

  export type ImageGalleryProps = {
    images: GalleryImage[];
    columns?: { mobile: number; tablet: number; desktop: number };
    emptyStateMessage?: string;
  };
  ```

- [ ] **Step 3.2**: Add smooth animations for lightbox open/close
  - Fade in/out backdrop
  - Scale/fade image transition
  - Use CSS transitions or Framer Motion
- [ ] **Step 3.3**: Add loading skeleton for thumbnails while lazy loading
- [ ] **Step 3.4**: Add image preloading (preload next/previous images in lightbox)
- [ ] **Step 3.5**: Ensure accessibility attributes complete
  - ARIA labels for navigation buttons
  - Focus trap in lightbox
  - Keyboard navigation instructions
- [ ] **Step 3.6**: Test on touch devices (iOS Safari, Android Chrome)
- [ ] **Step 3.7**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with gallery usage instructions
- [ ] **Step 4.2**: Add JSDoc comments for components and hooks
- [ ] **Step 4.3**: Add usage examples in comments

  ```typescript
  // Example: Basic gallery
  <ImageGallery images={propertyImages} />

  // Example: Custom columns
  <ImageGallery
    images={roomImages}
    columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  />

  // Example: Empty state
  <ImageGallery
    images={[]}
    emptyStateMessage="No photos available yet"
  />
  ```

- [ ] **Step 4.4**: Document swipe gesture implementation in architecture.md
- [ ] **Step 4.5**: Add note about touch device testing requirements
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
- [ ] Performance benchmarks met (grid renders <500ms, lightbox <200ms)
- [ ] Accessibility requirements met (keyboard nav, focus trap, ARIA labels)
- [ ] Mobile responsive (touch gestures work, tap targets ≥44px)
- [ ] No regressions in existing features

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Create test page with ImageGallery component and 12 images
   - [ ] Verify grid displays with responsive columns
   - [ ] Click thumbnail → verify lightbox opens with full-size image
   - [ ] Verify image counter shows "1 / 12"
   - [ ] Click close button → verify lightbox closes

2. **Edge Case Testing**
   - [ ] Test with empty images array → verify empty state message
   - [ ] Test with single image → verify no navigation arrows
   - [ ] Test with 50+ images → verify lazy loading works
   - [ ] Test with broken image URL → verify fallback displays
   - [ ] Test with very long alt text → verify no overflow

3. **Navigation Testing**
   - [ ] **Desktop keyboard:**
     - [ ] Right arrow → next image
     - [ ] Left arrow → previous image
     - [ ] Escape → close lightbox
     - [ ] Tab → focus trap within lightbox
   - [ ] **Mobile touch:**
     - [ ] Swipe left → next image
     - [ ] Swipe right → previous image
     - [ ] Swipe up/down → no effect (allows scrolling)
     - [ ] Pinch to zoom → no effect on navigation

4. **Browser Testing**
   - [ ] Chrome (desktop & mobile)
   - [ ] Safari (desktop & mobile - critical for touch)
   - [ ] Firefox
   - [ ] iOS Safari (primary user device)
   - [ ] Android Chrome

5. **Performance Testing**
   - [ ] Check Network tab: images lazy load only when in viewport
   - [ ] Check Performance tab: lightbox opens smoothly (<200ms)
   - [ ] Test with slow 3G network simulation
   - [ ] Verify no layout shift during lazy loading
   - [ ] Test rapid swipe gestures (no lag or missed swipes)

6. **Accessibility Testing**
   - [ ] Keyboard navigation works without mouse
   - [ ] Screen reader announces image counter and alt text
   - [ ] Focus trap keeps focus inside lightbox when open
   - [ ] Close button has accessible label
   - [ ] Tap targets ≥44x44px on mobile

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Remove components**: Delete ImageGallery, ImageLightbox, useSwipeGesture files
3. **Remove tests**: Delete gallery test files
4. **Update dependencies**: Remove any gallery-specific packages (Framer Motion if added)
5. **Replace with simple grid**: Use basic image grid without lightbox temporarily

**Risk Assessment:** Low (self-contained component, no external dependencies)
**Rollback Difficulty:** Easy (no database, no migrations)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add gallery usage instructions
- [ ] `.claude/docs/architecture.md` - Document swipe gesture implementation
- [ ] `.claude/docs/coding-standards.md` - Add gallery component best practices
- [ ] `src/components/media/ImageGallery.tsx` - Comprehensive JSDoc
- [ ] `src/hooks/useSwipeGesture.ts` - Comprehensive JSDoc

---

## Related Tasks

**Depends On:**

- [SS-21: Image Upload System](./ss-21-image-upload-system.md) - Gallery needs uploaded images

**Blocks:**

- [SS-25: Homepage](./ss-25-homepage.md) - Homepage includes photo gallery
- [SS-27: Rooms Page](./ss-27-rooms-page.md) - Rooms page uses gallery for room photos
- [SS-28: Activities Page](./ss-28-activities-page.md) - Activities page uses gallery

**Related:**

- [SS-24: Responsive Images](./ss-24-responsive-images.md) - Responsive images enhance gallery performance

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

**Swipe Gesture Detection:**

- Track touch start position (x, y)
- Track touch move position to detect direction
- Calculate distance and velocity on touch end
- Threshold: >50px horizontal movement to trigger navigation
- Ignore if vertical movement > horizontal (allow scrolling)

**Responsive Grid Columns:**

- Mobile (< 640px): 1 column
- Tablet (640-1024px): 2 columns
- Desktop (> 1024px): 3-4 columns
- Use CSS Grid or Tailwind grid utilities

**Lightbox Focus Trap:**

- When lightbox opens: focus first interactive element (close button)
- Tab/Shift+Tab: cycle focus within lightbox only
- Escape: close lightbox and restore focus to thumbnail

**Image Preloading:**

- When lightbox opens, preload next and previous images
- Improves perceived performance when navigating
- Use Image `priority` prop or manual preload

**Empty State:**

- Display when images array is empty
- Show placeholder icon and message
- Provide call-to-action (e.g., "Upload photos")

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
