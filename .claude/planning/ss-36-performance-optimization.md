---
task_id: ss-36
title: '[Optimization] Performance Optimization'
status: not_started
priority: high
estimated_time: '4-6 hours'
actual_time: null
dependencies: [ss-31, ss-34]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-35/feat/performance-optimization
pr_number: null
---

[← Previous: SS-34 Mobile Device Testing](./ss-34-mobile-device-testing.md) | [📋 Index](./index.md) | [Next: SS-36 SEO Optimization →](./ss-36-seo-optimization.md)

# [Optimization] Performance Optimization

## Overview

Optimize site performance based on Lighthouse audits to achieve ≥90 performance scores on mobile and desktop. Focus on Core Web Vitals (LCP, CLS, FID), image optimization, bundle size reduction, and perceived performance.

**User Story:**
As a potential guest, I want pages to load quickly so that I don't get frustrated waiting and leave the site.

**Business Value:**

- Better SEO rankings (Core Web Vitals are ranking factors)
- Higher conversion rates (faster sites convert better)
- Reduced bounce rate
- Better user experience

---

## Acceptance Criteria

- [ ] **AC1**: Lighthouse performance score ≥90 on mobile for all pages
- [ ] **AC2**: Lighthouse performance score ≥95 on desktop for all pages
- [ ] **AC3**: LCP < 2.5s on mobile
- [ ] **AC4**: CLS < 0.1 on all pages
- [ ] **AC5**: FID < 100ms
- [ ] **AC6**: Total bundle size < 300KB (excluding images)
- [ ] **AC7**: Images optimized and lazy loaded
- [ ] **AC8**: Third-party scripts optimized or deferred
- [ ] **AC9**: Fonts optimized (preload, display swap)
- [ ] **AC10**: Caching strategies implemented

---

## Implementation Steps

### Phase 1: Performance Audit

- [ ] **Step 1.1**: Run Lighthouse audits on all pages (mobile profile)
  - Homepage
  - About
  - Rooms
  - Activities
  - Contact
  - Booking
- [ ] **Step 1.2**: Document baseline scores
- [ ] **Step 1.3**: Identify top performance issues
  - Slow LCP elements
  - Layout shift sources
  - Large bundle size culprits
  - Unoptimized images
- [ ] **Step 1.4**: Prioritize optimizations by impact

### Phase 2: Core Web Vitals Optimization

**LCP (Largest Contentful Paint):**

- [ ] **Step 2.1**: Identify LCP elements on each page (usually hero image)
- [ ] **Step 2.2**: Add `priority` prop to hero images (disables lazy loading)
- [ ] **Step 2.3**: Preload hero images in `<head>`
  ```html
  <link rel="preload" as="image" href="/hero.webp" />
  ```
- [ ] **Step 2.4**: Ensure hero images use WebP/AVIF formats
- [ ] **Step 2.5**: Reduce hero image file size (target < 300KB)

**CLS (Cumulative Layout Shift):**

- [ ] **Step 2.6**: Add explicit width/height to all images
- [ ] **Step 2.7**: Reserve space for lazy-loaded content
- [ ] **Step 2.8**: Avoid inserting content above existing content
- [ ] **Step 2.9**: Use `aspect-ratio` CSS for responsive images

**FID (First Input Delay):**

- [ ] **Step 2.10**: Minimize JavaScript execution time
- [ ] **Step 2.11**: Break up long tasks (code splitting)
- [ ] **Step 2.12**: Defer non-critical JavaScript

### Phase 3: Image Optimization

- [ ] **Step 3.1**: Audit all images for size and format
- [ ] **Step 3.2**: Convert remaining JPEG/PNG to WebP/AVIF
- [ ] **Step 3.3**: Ensure all images have srcset for responsive sizes
- [ ] **Step 3.4**: Implement blur placeholders for below-fold images
- [ ] **Step 3.5**: Lazy load all images except hero (already done in SS-25)
- [ ] **Step 3.6**: Use Vercel Blob CDN for all images

### Phase 4: Bundle Size Optimization

- [ ] **Step 4.1**: Run bundle analyzer: `yarn build && yarn analyze`
- [ ] **Step 4.2**: Identify large dependencies
- [ ] **Step 4.3**: Remove unused dependencies
- [ ] **Step 4.4**: Code split large routes (if applicable)
- [ ] **Step 4.5**: Tree-shake unused code
- [ ] **Step 4.6**: Use dynamic imports for heavy components
  ```typescript
  const HeavyComponent = dynamic(() => import('./HeavyComponent'));
  ```

### Phase 5: Third-Party Script Optimization

- [ ] **Step 5.1**: Audit third-party scripts (GA4, Sentry, etc.)
- [ ] **Step 5.2**: Load third-party scripts with Next.js Script component
  ```typescript
  <Script src="..." strategy="afterInteractive" />
  ```
- [ ] **Step 5.3**: Defer non-critical scripts (analytics, etc.)
- [ ] **Step 5.4**: Consider removing heavy third-party scripts if not critical

### Phase 6: Font Optimization

- [ ] **Step 6.1**: Use Next.js font optimization (next/font)
- [ ] **Step 6.2**: Preload critical fonts
- [ ] **Step 6.3**: Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- [ ] **Step 6.4**: Subset fonts to include only used characters (if possible)

### Phase 7: Caching & CDN

- [ ] **Step 7.1**: Verify Vercel Edge caching working
- [ ] **Step 7.2**: Set appropriate cache headers for static assets
- [ ] **Step 7.3**: Verify Vercel Blob CDN serving images
- [ ] **Step 7.4**: Enable stale-while-revalidate for dynamic content

### Phase 8: Perceived Performance

- [ ] **Step 8.1**: Add skeleton loaders for slow-loading content
- [ ] **Step 8.2**: Implement optimistic UI updates
- [ ] **Step 8.3**: Add loading states with progress indicators
- [ ] **Step 8.4**: Prefetch critical routes on hover

### Phase 9: Re-audit & Verify

- [ ] **Step 9.1**: Run Lighthouse audits again on all pages
- [ ] **Step 9.2**: Verify performance scores ≥90 (mobile) / ≥95 (desktop)
- [ ] **Step 9.3**: Verify Core Web Vitals in green range
- [ ] **Step 9.4**: Document improvements
- [ ] **Step 9.5**: Create performance monitoring plan

---

## Quality Gates

- [ ] Lighthouse Performance ≥90 (mobile) for all pages
- [ ] Lighthouse Performance ≥95 (desktop) for all pages
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] Bundle size < 300KB
- [ ] All images WebP/AVIF
- [ ] No performance regressions after changes

---

## Post-Implementation Verification

1. **Run Lighthouse Audits:**
   - [ ] Homepage (mobile + desktop)
   - [ ] About (mobile + desktop)
   - [ ] Rooms (mobile + desktop)
   - [ ] Activities (mobile + desktop)
   - [ ] Contact (mobile + desktop)
   - [ ] Booking (mobile + desktop)

2. **Verify Core Web Vitals:**
   - [ ] LCP < 2.5s (green)
   - [ ] CLS < 0.1 (green)
   - [ ] FID < 100ms (green)

3. **Test on Real Devices:**
   - [ ] iPhone on 4G network
   - [ ] Android on 4G network

4. **Compare Before/After:**
   - Document baseline scores
   - Document optimized scores
   - Calculate improvement percentage

---

## Notes

**Lighthouse Scoring Weights:**

- LCP: 25%
- Total Blocking Time: 30%
- CLS: 15%
- Speed Index: 10%
- Time to Interactive: 10%
- First Contentful Paint: 10%

**Performance Budget:**

- **Total bundle**: < 300KB (excluding images)
- **Hero image**: < 300KB
- **Other images**: < 200KB each
- **Fonts**: < 50KB total
- **Third-party scripts**: < 100KB

**Quick Wins:**

1. Add `priority` to hero images (immediate LCP improvement)
2. Add width/height to all images (immediate CLS improvement)
3. Defer third-party scripts (immediate TBT improvement)
4. Convert images to WebP/AVIF (file size reduction)

**Tools:**

- Lighthouse (Chrome DevTools)
- WebPageTest.org
- Vercel Speed Insights
- Next.js Bundle Analyzer
- Chrome DevTools Performance tab

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
