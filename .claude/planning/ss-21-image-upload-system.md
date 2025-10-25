---
task_id: ss-21
title: '[Feature] Image Upload System with Vercel Blob'
status: not_started
priority: high
estimated_time: '4-6 hours'
actual_time: null
dependencies: [ss-7]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-21/feat/image-upload-system
pr_number: null
---

[← Previous: SS-20 Rate Limiting](./ss-20-rate-limiting.md) | [📋 Index](./index.md) | [Next: SS-22 YouTube Video Embeds →](./ss-22-youtube-video-embeds.md)

# [Feature] Image Upload System with Vercel Blob

## Overview

Implement a comprehensive image upload system using Vercel Blob storage with pre-optimization, CDN delivery, and responsive image serving. This system will handle all property images (rooms, activities, gallery) with automatic optimization for mobile-first performance.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). The image system must:

- 📱 Prioritize mobile performance (primary user device)
- ⚡ Pre-optimize images before upload to reduce bandwidth
- 🖼️ Serve responsive images with appropriate sizes
- 🚀 Leverage Vercel Blob CDN for fast global delivery
- 📦 Support placeholder images until professional photography available

**User Story:**
As a site administrator, I want to upload and manage property images so that potential guests can view high-quality photos of rooms, activities, and the property while maintaining fast mobile load times.

**Business Value:**

- Visual appeal drives booking conversions
- Fast image loading improves user experience and SEO
- Professional image management system ready for post-launch photography
- Reduced bandwidth costs through optimization
- Scalable solution that grows with property portfolio

---

## Prerequisites/Dependencies

- [x] SS-7: Vercel Blob integration configured (completed)
- [ ] Vercel Blob storage enabled in Vercel dashboard
- [ ] `BLOB_READ_WRITE_TOKEN` environment variable set
- [ ] `@vercel/blob` package installed
- [ ] Next.js Image component understanding

---

## Acceptance Criteria

- [ ] **AC1**: Admin can upload images through a simple interface (drag-and-drop or file picker)
- [ ] **AC2**: Images are pre-optimized before upload (compression, format conversion to WebP)
- [ ] **AC3**: Uploaded images are stored in Vercel Blob with organized folder structure
- [ ] **AC4**: Images are served via CDN with automatic optimization
- [ ] **AC5**: Responsive images generate multiple sizes for different viewports
- [ ] **AC6**: Image metadata stored (filename, URL, dimensions, upload date)
- [ ] **AC7**: Error handling for upload failures, invalid formats, and size limits
- [ ] **AC8**: Loading states during upload with progress indication
- [ ] **AC9**: Image preview before and after upload
- [ ] **AC10**: Alt text input required for accessibility

---

## Test Strategy

### Test Files to Create

- `src/__tests__/lib/imageOptimization.test.ts` - Unit tests for image optimization utilities
- `src/__tests__/lib/blobStorage.test.ts` - Unit tests for Blob storage interactions
- `src/__tests__/api/upload-image.test.ts` - Integration tests for upload API route
- `src/__tests__/components/ImageUpload.test.tsx` - Component tests for upload UI

### Test Types

- **Unit Tests**: Test image optimization functions, Blob API wrappers, validation logic
- **Integration Tests**: Test API route handling file uploads, error scenarios, Blob storage
- **Component Tests**: Test upload UI states (idle, uploading, success, error)

### Coverage Target

- Minimum **80%** coverage for upload logic and optimization utilities
- **100%** coverage for validation and error handling paths

### Edge Cases to Test

1. **File validation**: Invalid formats (PDF, video), oversized files (>10MB)
2. **Network failures**: Blob upload timeout, connection errors
3. **Optimization failures**: Corrupted image files, unsupported formats
4. **Concurrent uploads**: Multiple images uploaded simultaneously
5. **Missing environment variables**: `BLOB_READ_WRITE_TOKEN` not set
6. **Alt text validation**: Empty or missing alt text
7. **Duplicate filenames**: Handle collisions with unique identifiers

### Performance Benchmarks

- Image optimization < 2 seconds for typical 5MB photo
- Upload to Blob storage < 5 seconds for optimized image
- Image CDN delivery < 200ms (first byte)
- Responsive image generation < 1 second
- Max file size: 10MB (pre-optimization)
- Target optimized size: < 500KB for full-size image

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test file structure for image utilities, API routes, and components
- [ ] **Step 1.2**: Write failing tests for image validation (AC1, AC7)
  - Test valid formats (JPEG, PNG, WebP)
  - Test invalid formats and size limits
  - Test missing files
- [ ] **Step 1.3**: Write failing tests for image optimization (AC2)
  - Test WebP conversion
  - Test compression quality settings
  - Test dimension resizing for responsive images
- [ ] **Step 1.4**: Write failing tests for Blob storage upload (AC3, AC4)
  - Test successful upload with metadata
  - Test organized folder structure
  - Test URL generation
- [ ] **Step 1.5**: Write failing tests for upload API route (AC7, AC8)
  - Test successful upload flow
  - Test error scenarios (network, validation, storage)
  - Test multipart form data parsing
- [ ] **Step 1.6**: Write failing tests for ImageUpload component (AC1, AC8, AC9, AC10)
  - Test file picker interaction
  - Test drag-and-drop functionality
  - Test loading states
  - Test preview display
  - Test alt text input
- [ ] **Step 1.7**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create image validation utilities in `src/lib/imageValidation.ts`
  - Implement file format validation
  - Implement file size validation
  - Add descriptive error messages
- [ ] **Step 2.2**: Verify validation tests pass (AC1, AC7)
- [ ] **Step 2.3**: Create image optimization utilities in `src/lib/imageOptimization.ts`
  - Implement WebP conversion using `sharp` or browser-based compression
  - Implement quality compression (80-85% quality)
  - Generate responsive image sizes (thumbnail, small, medium, large)
- [ ] **Step 2.4**: Verify optimization tests pass (AC2, AC5)
- [ ] **Step 2.5**: Create Blob storage wrapper in `src/lib/blobStorage.ts`
  - Implement upload function with organized paths (`/images/rooms/`, `/images/activities/`, etc.)
  - Implement metadata storage (filename, dimensions, upload date)
  - Generate CDN URLs for uploaded images
- [ ] **Step 2.6**: Verify Blob storage tests pass (AC3, AC4, AC6)
- [ ] **Step 2.7**: Create upload API route `src/app/api/upload-image/route.ts`
  - Parse multipart form data
  - Validate uploaded file
  - Optimize image
  - Upload to Blob storage
  - Return image metadata and URLs
- [ ] **Step 2.8**: Verify API route tests pass (AC7, AC8)
- [ ] **Step 2.9**: Create ImageUpload component `src/components/forms/ImageUpload.tsx`
  - Implement file picker with drag-and-drop
  - Show image preview
  - Display upload progress
  - Handle loading and error states
  - Require alt text input
- [ ] **Step 2.10**: Verify component tests pass (AC1, AC8, AC9, AC10)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Create reusable `OptimizedImage` component wrapping Next.js Image
  - Accept Blob URLs and generate srcset for responsive images
  - Implement lazy loading by default
  - Add blur placeholder support
- [ ] **Step 3.2**: Add TypeScript types for image metadata in `src/types/image.ts`
  ```typescript
  export type ImageMetadata = {
    id: string;
    url: string;
    filename: string;
    altText: string;
    width: number;
    height: number;
    uploadedAt: string;
    category: 'rooms' | 'activities' | 'gallery' | 'hero';
  };
  ```
- [ ] **Step 3.3**: Add admin upload page at `src/app/admin/upload/page.tsx` (basic UI)
  - Use ImageUpload component
  - Display uploaded images list
  - Allow bulk uploads
- [ ] **Step 3.4**: Add loading states with skeleton loaders during optimization
- [ ] **Step 3.5**: Add accessibility attributes (ARIA labels, focus management)
- [ ] **Step 3.6**: Implement error boundaries for upload failures
- [ ] **Step 3.7**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with image upload instructions
- [ ] **Step 4.2**: Add JSDoc comments for image utilities and API routes
- [ ] **Step 4.3**: Document Blob storage folder structure in architecture.md
- [ ] **Step 4.4**: Add usage examples for OptimizedImage component
- [ ] **Step 4.5**: Document environment variables needed (`BLOB_READ_WRITE_TOKEN`)
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
- [ ] Performance benchmarks met (image optimization < 2s, upload < 5s)
- [ ] Accessibility requirements met (alt text required, keyboard navigation)
- [ ] Mobile responsive (drag-and-drop works on mobile)
- [ ] No regressions in existing features

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Navigate to `/admin/upload`
   - [ ] Upload a JPEG image (5MB) with alt text
   - [ ] Verify image optimizes and uploads successfully
   - [ ] Verify preview displays correctly
   - [ ] Verify uploaded image appears in list with metadata

2. **Edge Case Testing**
   - [ ] Upload invalid file format (PDF) → verify error message
   - [ ] Upload oversized file (15MB) → verify rejection
   - [ ] Upload corrupted image → verify graceful error handling
   - [ ] Upload without alt text → verify validation error
   - [ ] Upload multiple images simultaneously → verify all succeed
   - [ ] Test drag-and-drop on desktop
   - [ ] Test file picker on mobile

3. **Integration Testing**
   - [ ] Use OptimizedImage component with uploaded image URL
   - [ ] Verify responsive images load correctly (check Network tab for srcset)
   - [ ] Verify lazy loading works (images load as scrolled into view)
   - [ ] Verify CDN URLs are generated correctly
   - [ ] Test upload with missing `BLOB_READ_WRITE_TOKEN` → verify error

4. **Browser Testing**
   - [ ] Chrome (desktop & mobile)
   - [ ] Safari (desktop & mobile)
   - [ ] Firefox

5. **Performance Testing**
   - [ ] Check Network tab: optimized image size < 500KB
   - [ ] Check Performance tab: optimization completes < 2s
   - [ ] Verify CDN delivery < 200ms (check Response headers for cache)
   - [ ] Test with slow 3G network simulation

6. **Accessibility Testing**
   - [ ] Keyboard navigation works (tab through upload form)
   - [ ] Screen reader announces upload states correctly
   - [ ] Alt text input is clearly labeled
   - [ ] Focus indicators visible on file picker

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Remove uploaded images**: Clear Vercel Blob storage via dashboard (optional)
3. **Remove test files**: Delete image upload test files
4. **Restore dependencies**: Run `yarn install` if packages were added
5. **Update documentation**: Revert doc changes
6. **Notify stakeholders**: Communicate rollback and reason

**Risk Assessment:** Medium (integrates with external service, requires env vars)
**Rollback Difficulty:** Easy (no database changes, just file storage)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add image upload setup instructions
- [ ] `.claude/docs/architecture.md` - Document Blob storage folder structure
- [ ] `.claude/docs/coding-standards.md` - Add OptimizedImage usage pattern
- [ ] `.env.example` - Ensure `BLOB_READ_WRITE_TOKEN` is documented
- [ ] `package.json` - Add any new dependencies (sharp, @vercel/blob utilities)

---

## Related Tasks

**Depends On:**

- [SS-7: Vercel Blob Integration](./ss-7-vercel-blob-integration.md) - Blob storage must be configured first

**Blocks:**

- [SS-23: Image Gallery Component](./ss-23-image-gallery-component.md) - Gallery needs image upload system
- [SS-24: Responsive Images](./ss-24-responsive-images.md) - Responsive system uses uploaded images

**Related:**

- [SS-22: YouTube Video Embeds](./ss-22-youtube-video-embeds.md) - Complementary media system

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

**Placeholder Images Strategy:**

- Use stock photos or AI-generated images initially
- Organize by category (rooms, activities, gallery, hero)
- Professional photographer will replace placeholders post-launch
- Ensure consistent aspect ratios (16:9 for hero, 4:3 for rooms, 1:1 for gallery thumbnails)

**Image Optimization Settings:**

- Format: WebP with JPEG fallback
- Quality: 80-85% (balance quality/size)
- Sizes: thumbnail (200w), small (400w), medium (800w), large (1200w), full (1920w)
- Max file size before optimization: 10MB
- Target file size after optimization: <500KB

**Folder Structure in Vercel Blob:**

```
/images
  /rooms
    /deluxe-ocean-view
    /standard-garden
  /activities
    /surfing
    /yoga
  /gallery
  /hero
```

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
