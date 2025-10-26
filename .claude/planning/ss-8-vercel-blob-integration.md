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
- [ ] SS-4: Credentials Setup (need BLOB_READ_WRITE_TOKEN)
- [ ] Vercel Blob storage created in Vercel dashboard

---

## Acceptance Criteria

Clear, testable criteria that define "done":

- [ ] **AC1**: Vercel Blob client configured and working
- [ ] **AC2**: Image upload utility function created
- [ ] **AC3**: Image display component with optimization
- [ ] **AC4**: Support for multiple image formats (jpg, png, webp)
- [ ] **AC5**: Automatic image optimization before upload
- [ ] **AC6**: Error handling for failed uploads
- [ ] **AC7**: Image URL generation for display
- [ ] **AC8**: Delete functionality for images

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

- [ ] **Step 1.1**: Create test file for blob client

  ```typescript
  // src/lib/blob/client.test.ts
  ```

- [ ] **Step 1.2**: Write failing tests for blob configuration
  - Test client initialization
  - Test token validation
  - Test error when token missing

- [ ] **Step 1.3**: Write failing tests for upload function
  - Test successful upload
  - Test file validation
  - Test error handling

- [ ] **Step 1.4**: Write failing tests for image optimization
  - Test image resizing
  - Test format conversion
  - Test quality settings

- [ ] **Step 1.5**: Write failing component tests
  - Test image rendering
  - Test loading states
  - Test error states

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Install Vercel Blob SDK

  ```bash
  yarn add @vercel/blob
  ```

- [ ] **Step 2.2**: Create blob client configuration

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

- [ ] **Step 2.3**: Implement image optimization utility

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

- [ ] **Step 2.4**: Create upload utility with optimization

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

- [ ] **Step 2.5**: Verify all tests pass

**Implementation Checkpoint:** Core functionality working

---

### Phase 3: Component Creation

- [ ] **Step 3.1**: Create OptimizedImage component

  ```typescript
  // src/components/image/OptimizedImage.tsx
  'use client';

  import Image from 'next/image';

  export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
    // Handle Blob URLs
    // Add loading blur
    // Responsive sizing
  }
  ```

- [ ] **Step 3.2**: Create image upload component

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

- [ ] **Step 3.3**: Create image gallery component

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

- [ ] **Step 3.4**: Verify component tests pass

**Component Checkpoint:** UI components created and tested

---

### Phase 4: API Routes

- [ ] **Step 4.1**: Create upload API route

  ```typescript
  // src/app/api/images/upload/route.ts
  import { uploadImage } from '@/lib/blob/upload';

  export async function POST(request: Request) {
    // Parse multipart form data
    // Validate file
    // Upload to Blob
    // Return URL
  }
  ```

- [ ] **Step 4.2**: Create delete API route

  ```typescript
  // src/app/api/images/delete/route.ts
  import { blobClient } from '@/lib/blob/client';

  export async function DELETE(request: Request) {
    // Parse URL from body
    // Verify ownership (future)
    // Delete from Blob
    // Return success
  }
  ```

- [ ] **Step 4.3**: Create list API route

  ```typescript
  // src/app/api/images/list/route.ts
  import { blobClient } from '@/lib/blob/client';

  export async function GET(request: Request) {
    // Parse query params
    // List images
    // Return URLs
  }
  ```

- [ ] **Step 4.4**: Test API routes

**API Checkpoint:** REST endpoints working

---

### Phase 5: Integration & Polish

- [ ] **Step 5.1**: Create demo page for testing

  ```typescript
  // src/app/image-demo/page.tsx
  // Temporary page to test image features
  ```

- [ ] **Step 5.2**: Add image optimization presets
  - Thumbnail: 150x150
  - Mobile: 640px wide
  - Tablet: 1024px wide
  - Desktop: 1920px wide

- [ ] **Step 5.3**: Add caching headers
  - Set appropriate Cache-Control
  - Use stale-while-revalidate

- [ ] **Step 5.4**: Add monitoring
  - Track upload success/failure
  - Monitor file sizes
  - Log optimization savings

- [ ] **Step 5.5**: Documentation
  - Usage examples
  - Best practices
  - Size recommendations

**Integration Checkpoint:** Feature fully integrated

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
