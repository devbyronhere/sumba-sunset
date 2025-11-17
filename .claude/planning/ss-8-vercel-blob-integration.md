---
task_id: ss-7
title: '[Feature] Vercel Blob Storage Integration for Images'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-1, ss-2, ss-4]
created: 2025-01-20
started: null
completed: null
related_docs: ['.claude/docs/architecture.md']
branch: ss-7/feat/vercel-blob
pr_number: null
---

[← Previous: SS-6 Vitest Setup](./ss-6-vitest-setup.md) | [📋 Index](./index.md) | [Next: SS-8 Monitoring Setup →](./ss-8-monitoring-setup.md)

# [Feature] Vercel Blob Storage Integration for Images

## Overview

Integrate Vercel Blob storage for image uploads and management. This provides CDN-backed image storage with automatic optimization, essential for the media-heavy surf camp website.

**Project Context:**

- Mobile-first design requires optimized images
- Site will have many high-quality surf/accommodation photos
- Need CDN delivery for global performance
- Images should load fast on mobile connections
- Must support user uploads (future admin features)

**User Story:**
As a site administrator, I want to upload images that are automatically optimized and served via CDN, so that the site loads quickly for mobile users worldwide.

**Business Value:**

- Fast image loading improves user experience
- Reduced bandwidth costs with optimization
- Global CDN ensures fast loads worldwide
- Simplified image management vs. custom solution
- Automatic format conversion (WebP, AVIF)

---

## Prerequisites/Dependencies

- [x] SS-1: Next.js Project Setup completed
- [x] SS-2: Linting & Formatting Setup completed
- [x] SS-4: Credentials Setup (need BLOB_READ_WRITE_TOKEN)
- [x] Vercel Blob storage created in Vercel dashboard

---

## Acceptance Criteria

Clear, testable criteria that define "done":

- [x] **AC1**: Vercel Blob client configured and working
- [x] **AC2**: Image upload utility function created
- [x] **AC3**: Image display component with optimization
- [x] **AC4**: Support for multiple image formats (jpg, png, webp)
- [x] **AC5**: Automatic image optimization before upload
- [x] **AC6**: Error handling for failed uploads
- [x] **AC7**: Image URL generation for display
- [x] **AC8**: Delete functionality for images

---

## Test Strategy

### Test Files to Create

- `src/lib/blob/client.test.ts` - Blob client configuration tests
- `src/lib/blob/upload.test.ts` - Upload utility tests
- `src/lib/blob/optimize.test.ts` - Image optimization tests
- `src/components/image/OptimizedImage.test.tsx` - Component tests

### Test Types

- **Unit Tests**: Test upload/delete functions with mocks
- **Integration Tests**: Test actual Blob API (if token available)
- **Component Tests**: Test image display component
- **Error Tests**: Test failure scenarios

### Coverage Target

- Minimum **80%** coverage for blob utilities
- **100%** coverage for error handling paths

### Edge Cases to Test

1. **Large files**: Files over size limit
2. **Invalid formats**: Non-image files
3. **Network errors**: Upload failures
4. **Missing token**: No BLOB_READ_WRITE_TOKEN
5. **Corrupt images**: Invalid image data
6. **Concurrent uploads**: Multiple simultaneous uploads

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [x] **Step 1.1**: Create test file for blob client (✅ 2025-01-20 - Completed)

  ```typescript
  // src/lib/blob/client.test.ts
  ```

- [x] **Step 1.2**: Write failing tests for blob configuration (✅ 2025-01-20 - Completed)
  - Test client initialization
  - Test token validation
  - Test error when token missing

- [x] **Step 1.3**: Write failing tests for upload function (✅ 2025-01-20 - Completed)
  - Test successful upload
  - Test file validation
  - Test error handling

- [x] **Step 1.4**: Write failing tests for image optimization (✅ 2025-01-20 - Completed)
  - Test image resizing
  - Test format conversion
  - Test quality settings

- [x] **Step 1.5**: Write failing component tests (✅ 2025-01-20 - Removed OptimizedImage.test.tsx as it tested third-party library)
  - Test image rendering
  - Test loading states
  - Test error states

**TDD Checkpoint:** All tests written and failing as expected ✅

---

### Phase 2: Core Implementation

- [x] **Step 2.1**: Install Vercel Blob SDK (✅ 2025-01-20 - Completed)

  ```bash
  yarn add @vercel/blob
  ```

- [x] **Step 2.2**: Create blob client configuration (✅ 2025-01-20 - Completed)

  ```typescript
  // src/lib/blob/client.ts
  import { put, del, list } from '@vercel/blob';

  export const blobClient = {
    upload: async (file: File, pathname?: string) => {
      // Implementation to pass tests
    },
    delete: async (url: string) => {
      // Implementation to pass tests
    },
    list: async (prefix?: string) => {
      // Implementation to pass tests
    },
  };
  ```

- [x] **Step 2.3**: Implement image optimization utility (✅ 2025-01-20 - Completed with Sharp server-side optimization + enhanced error handling)

  ```typescript
  // src/lib/blob/optimize.ts
  export async function optimizeImage(
    file: File,
    maxWidth = 1920,
    quality = 0.85
  ): Promise<Blob> {
    // Canvas-based optimization
    // Convert to WebP if supported
    // Maintain aspect ratio
  }
  ```

- [x] **Step 2.4**: Create upload utility with optimization (✅ 2025-01-20 - Completed)

  ```typescript
  // src/lib/blob/upload.ts
  import { optimizeImage } from './optimize';
  import { blobClient } from './client';

  export async function uploadImage(file: File, options?: UploadOptions) {
    // Validate file type
    // Optimize image
    // Upload to Blob
    // Return URL
  }
  ```

- [x] **Step 2.5**: Verify all tests pass (✅ 2025-01-20 - Completed)

**Implementation Checkpoint:** Core functionality working ✅

---

### Phase 3: Component Creation

- [x] **Step 3.1**: Create OptimizedImage component (✅ 2025-01-20 - Removed, using next/image directly instead)

  ```typescript
  // src/components/image/OptimizedImage.tsx
  // REMOVED: Unnecessary wrapper around next/image
  // Now using next/image directly in ImageGallery
  ```

- [x] **Step 3.2**: Create image upload component (✅ 2025-01-20 - Completed with drag-and-drop, removed progress bar)

  ```typescript
  // src/components/image/ImageUploader.tsx
  'use client';

  export function ImageUploader({
    onUpload,
    maxSize = 10 * 1024 * 1024, // 10MB
  }: ImageUploaderProps) {
    // File input
    // Drag and drop
    // Progress indicator
    // Error display
  }
  ```

- [x] **Step 3.3**: Create image gallery component (✅ 2025-01-20 - Completed with responsive grid using cn())

  ```typescript
  // src/components/image/ImageGallery.tsx
  export function ImageGallery({
    images,
    columns = { mobile: 1, tablet: 2, desktop: 3 },
  }: ImageGalleryProps) {
    // Responsive grid
    // Lazy loading
    // Lightbox on click
  }
  ```

- [x] **Step 3.4**: Verify component tests pass (✅ 2025-01-20 - Completed)

**Component Checkpoint:** UI components created and tested ✅

---

### Phase 4: API Routes

- [x] **Step 4.1**: Create upload API route (✅ 2025-01-20 - Completed)

  ```typescript
  // app/api/images/upload/route.ts
  import { uploadImage } from '@/lib/blob/upload';

  export async function POST(request: Request) {
    // Parse multipart form data
    // Validate file
    // Upload to Blob
    // Return URL
  }
  ```

- [x] **Step 4.2**: Create delete API route (✅ 2025-01-20 - Completed)

  ```typescript
  // app/api/images/delete/route.ts
  import { blobClient } from '@/lib/blob/client';

  export async function DELETE(request: Request) {
    // Parse URL from body
    // Verify ownership (future)
    // Delete from Blob
    // Return success
  }
  ```

- [x] **Step 4.3**: Create list API route (✅ 2025-01-20 - Completed)

  ```typescript
  // app/api/images/list/route.ts
  import { blobClient } from '@/lib/blob/client';

  export async function GET(request: Request) {
    // Parse query params
    // List images
    // Return URLs
  }
  ```

- [x] **Step 4.4**: Test API routes (✅ 2025-01-20 - Completed in demo page)

**API Checkpoint:** REST endpoints working ✅

---

### Phase 5: Integration & Polish

- [x] **Step 5.1**: Create demo page for testing (✅ 2025-01-20 - Completed at app/image-demo/page.tsx)

  ```typescript
  // app/image-demo/page.tsx
  // Temporary page to test image features
  ```

- [ ] **Step 5.2**: Add image optimization presets (Deferred - not needed for MVP)
  - Thumbnail: 150x150
  - Mobile: 640px wide
  - Tablet: 1024px wide
  - Desktop: 1920px wide

- [ ] **Step 5.3**: Add caching headers (Deferred - Vercel handles this automatically)
  - Set appropriate Cache-Control
  - Use stale-while-revalidate

- [ ] **Step 5.4**: Add monitoring (Deferred - will be handled by SS-9 Monitoring Setup)
  - Track upload success/failure
  - Monitor file sizes
  - Log optimization savings

- [x] **Step 5.5**: Documentation (✅ 2025-01-20 - Documented in planning doc and code comments)
  - Usage examples
  - Best practices
  - Size recommendations

**Integration Checkpoint:** Core feature integrated, optional enhancements deferred ✅

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors in dev mode
- [ ] Code coverage ≥80% for blob utilities
- [ ] Image upload works in demo
- [ ] Image display optimized
- [ ] Error handling tested
- [ ] Documentation complete
- [ ] Planning doc fully checked off
- [ ] Git commits created

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Upload Testing**
   - [ ] Upload JPEG image
   - [ ] Upload PNG image
   - [ ] Upload large image (>5MB)
   - [ ] Try invalid file type
   - [ ] Verify optimization applied

2. **Display Testing**
   - [ ] Images load quickly
   - [ ] Responsive sizing works
   - [ ] Lazy loading works
   - [ ] Blur placeholder shows

3. **Error Testing**
   - [ ] Upload without token
   - [ ] Upload oversized file
   - [ ] Network disconnection
   - [ ] Verify error messages

4. **Performance Testing**
   - [ ] Check image load times
   - [ ] Verify CDN delivery
   - [ ] Check optimization savings
   - [ ] Test on slow connection

5. **Mobile Testing**
   - [ ] Test on real device
   - [ ] Verify touch interactions
   - [ ] Check data usage
   - [ ] Test offline behavior

---

## Rollback Plan

If Vercel Blob integration fails:

1. **Remove Blob SDK**: `yarn remove @vercel/blob`
2. **Delete blob utilities**: `rm -rf src/lib/blob`
3. **Remove API routes**: `rm -rf src/app/api/images`
4. **Fallback options**:
   - Use public directory for static images
   - Consider Cloudinary as alternative
   - Use Next.js Image with external URLs

**Risk Assessment:** Medium - Feature can be disabled
**Rollback Difficulty:** Easy - Remove feature flag
**Alternative:** Static images in public/

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add Vercel Blob to tech stack
- [ ] `.env.example` - Document BLOB_READ_WRITE_TOKEN
- [ ] `.claude/docs/architecture.md` - Add image strategy
- [ ] Create `docs/IMAGES.md` - Image guidelines

---

## Related Tasks

**Depends On:**

- [SS-4: Credentials Setup](./ss-4-credentials-setup.md) - Need Blob token

**Blocks:**

- SS-21: Image upload system
- SS-23: Image gallery component
- SS-24: Responsive images

**Related:**

- SS-25-28: Marketing pages need images
- SS-22: YouTube embeds (media strategy)

---

## Image Optimization Strategy

### Upload Optimization

**Before Upload:**

- Resize to max 1920px width
- Convert to WebP if supported
- Compress to 85% quality
- Strip metadata

**File Size Targets:**

- Hero images: < 200KB
- Gallery images: < 150KB
- Thumbnails: < 50KB

### Display Optimization

**Responsive Sizes:**

```typescript
const imageSizes = {
  thumbnail: 150,
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
};
```

**Next.js Image Config:**

```typescript
// next.config.ts
images: {
  domains: ['*.blob.vercel-storage.com'],
  deviceSizes: [640, 768, 1024, 1280, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
}
```

---

## Troubleshooting

### Common Issues

**Issue: BLOB_READ_WRITE_TOKEN not found**

- Solution: Check .env.local has token
- Verify token in Vercel dashboard
- Restart dev server

**Issue: Upload fails with 413**

- Solution: File too large
- Implement client-side validation
- Increase Vercel limits if needed

**Issue: Images not displaying**

- Solution: Check domain config
- Verify CORS settings
- Check Next.js image domains

**Issue: Slow uploads**

- Solution: Optimize before upload
- Use progress indicators
- Consider chunked uploads

---

## Notes

### Why Vercel Blob?

- **Integrated**: Works seamlessly with Vercel
- **Fast**: Global CDN included
- **Simple**: Minimal configuration
- **Optimized**: Automatic image optimization
- **Affordable**: Included in Vercel plan

### Alternatives Considered

- **Cloudinary**: More features but complex
- **AWS S3**: Requires more setup
- **Local storage**: Not scalable
- **GitHub**: Not for user uploads

### Future Enhancements

- Add image cropping tool
- Implement face detection
- Add watermarking
- Create image presets
- Add EXIF data handling

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

### Performance Metrics

- Average upload time: \_\_\_ms
- Average optimization savings: \_\_\_%
- CDN cache hit rate: \_\_\_%

### Follow-up Tasks Created

- [ ] Add image cropping
- [ ] Create admin dashboard
- [ ] Add batch upload

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ⏸️ Not Started
