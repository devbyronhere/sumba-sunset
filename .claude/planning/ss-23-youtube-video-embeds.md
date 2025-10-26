---
task_id: ss-23
title: '[Feature] YouTube Video Embeds (Loop, No Ads)'
status: not_started
priority: medium
estimated_time: '2-3 hours'
actual_time: null
dependencies: []
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-23/feat/youtube-video-embeds
pr_number: null
---

[← Previous: SS-22 Image Upload System](./ss-22-image-upload-system.md) | [📋 Index](./index.md) | [Next: SS-24 Image Gallery Component →](./ss-24-image-gallery-component.md)

# [Feature] YouTube Video Embeds (Loop, No Ads)

## Overview

Create a reusable YouTube video embed component that loops videos, prevents ads, and provides an optimized viewing experience for property tour videos, surf footage, and activity highlights. Videos will be hosted on a de-monetized YouTube channel with no background music.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). Video embeds must:

- 📱 Work seamlessly on mobile devices (primary user device)
- 🔁 Loop automatically for ambient property footage
- 🚫 Prevent ads and suggested videos from appearing
- ⚡ Lazy load to avoid slowing page load times
- 🎬 Provide clean, branded video experience

**User Story:**
As a potential guest, I want to watch looping property and activity videos so that I can get an immersive feel for the surf camp experience without ads or distractions.

**Business Value:**

- Video content increases engagement and booking conversions
- Looping ambient footage creates emotional connection
- No ads = professional, branded experience
- Lazy loading maintains fast page performance
- Scalable solution for multiple property videos

---

## Prerequisites/Dependencies

- [ ] De-monetized YouTube channel created (user task)
- [ ] Property videos uploaded to YouTube (can use placeholders)
- [ ] YouTube video IDs available
- [ ] Understanding of YouTube IFrame Player API parameters

---

## Acceptance Criteria

- [ ] **AC1**: Component accepts YouTube video ID as prop
- [ ] **AC2**: Videos loop automatically without user interaction
- [ ] **AC3**: Videos muted by default (autoplay compliance)
- [ ] **AC4**: No ads or suggested videos display after playback
- [ ] **AC5**: Videos lazy load (only load when scrolled into view)
- [ ] **AC6**: Responsive embed maintains 16:9 aspect ratio on all devices
- [ ] **AC7**: User can unmute and control volume
- [ ] **AC8**: Optional props: autoplay, controls visibility, start time
- [ ] **AC9**: Fallback for users with JavaScript disabled
- [ ] **AC10**: Loading placeholder shown before video loads

---

## Test Strategy

### Test Files to Create

- `src/__tests__/components/YouTubeEmbed.test.tsx` - Component tests for YouTube embed
- `src/__tests__/lib/youtubeHelpers.test.ts` - Unit tests for URL generation and validation

### Test Types

- **Unit Tests**: Test YouTube URL construction, video ID validation, parameter generation
- **Component Tests**: Test embed rendering, lazy loading, prop variations, error states

### Coverage Target

- Minimum **80%** coverage for component and helper functions
- **100%** coverage for video ID validation and URL construction

### Edge Cases to Test

1. **Invalid video IDs**: Malformed IDs, empty strings, special characters
2. **Network failures**: YouTube API unavailable, slow loading
3. **Browser compatibility**: iOS Safari (autoplay restrictions), Chrome, Firefox
4. **Lazy loading**: Component loads only when in viewport
5. **Missing props**: Default behavior when optional props not provided
6. **Multiple embeds**: Multiple videos on same page don't interfere

### Performance Benchmarks

- Lazy load video only when within 200px of viewport
- Video placeholder displays < 100ms
- IFrame loads within 2 seconds on 4G connection
- No layout shift during video load (reserved space)
- Component bundle size < 10KB

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for YouTube helpers and component
- [ ] **Step 1.2**: Write failing tests for video ID validation (AC1)
  - Test valid YouTube video IDs
  - Test invalid IDs (empty, malformed, special chars)
- [ ] **Step 1.3**: Write failing tests for YouTube URL generation (AC2, AC3, AC4)
  - Test URL includes loop parameter
  - Test URL includes mute parameter
  - Test URL disables related videos and ads
- [ ] **Step 1.4**: Write failing tests for YouTubeEmbed component (AC1-AC10)
  - Test component renders with video ID
  - Test lazy loading behavior
  - Test responsive aspect ratio
  - Test fallback for no JavaScript
  - Test loading placeholder
- [ ] **Step 1.5**: Write failing tests for optional props (AC7, AC8)
  - Test autoplay prop
  - Test controls visibility prop
  - Test start time prop
- [ ] **Step 1.6**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create YouTube helper utilities in `src/lib/youtubeHelpers.ts`
  - Implement video ID validation
  - Implement YouTube embed URL generator with parameters:
    - `loop=1` - Loop video
    - `mute=1` - Muted by default
    - `autoplay=1` - Autoplay when loaded (requires mute)
    - `controls=1` - Show controls
    - `modestbranding=1` - Minimal YouTube branding
    - `rel=0` - Disable related videos
    - `playlist={videoId}` - Required for looping single video
- [ ] **Step 2.2**: Verify helper tests pass (AC1, AC2, AC3, AC4)
- [ ] **Step 2.3**: Create YouTubeEmbed component `src/components/media/YouTubeEmbed.tsx`
  - Accept props: `videoId`, `autoplay`, `controls`, `startTime`, `title`
  - Render IFrame with generated YouTube URL
  - Implement 16:9 aspect ratio container
- [ ] **Step 2.4**: Verify component rendering tests pass (AC1, AC6)
- [ ] **Step 2.5**: Implement lazy loading using Intersection Observer API
  - Only load IFrame when component enters viewport
  - Show loading placeholder until IFrame loads
- [ ] **Step 2.6**: Verify lazy loading tests pass (AC5, AC10)
- [ ] **Step 2.7**: Add noscript fallback for JavaScript disabled users
  - Display static link to YouTube video
- [ ] **Step 2.8**: Verify fallback tests pass (AC9)
- [ ] **Step 2.9**: Implement optional props (autoplay, controls, startTime)
- [ ] **Step 2.10**: Verify optional prop tests pass (AC7, AC8)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add TypeScript types in `src/types/youtube.ts`
  ```typescript
  export type YouTubeEmbedProps = {
    videoId: string;
    title: string;
    autoplay?: boolean;
    controls?: boolean;
    startTime?: number;
    className?: string;
  };
  ```
- [ ] **Step 3.2**: Create loading placeholder with skeleton loader
  - Match 16:9 aspect ratio of video
  - Show play button icon
- [ ] **Step 3.3**: Add error state for invalid video IDs or load failures
- [ ] **Step 3.4**: Ensure IFrame has proper accessibility attributes
  - `title` attribute for screen readers
  - `loading="lazy"` attribute
- [ ] **Step 3.5**: Test on iOS Safari (autoplay restrictions apply)
- [ ] **Step 3.6**: Add JSDoc comments for component props
- [ ] **Step 3.7**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with YouTube embed usage
- [ ] **Step 4.2**: Add usage examples in JSDoc comments

  ```typescript
  // Example 1: Basic looping video (muted autoplay)
  <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Property Tour" />

  // Example 2: With controls and unmuted
  <YouTubeEmbed
    videoId="dQw4w9WgXcQ"
    title="Surf Lessons"
    autoplay={false}
    controls={true}
  />
  ```

- [ ] **Step 4.3**: Document YouTube channel setup requirements in architecture.md
- [ ] **Step 4.4**: Add note about de-monetized channel requirement (no ads)
- [ ] **Step 4.5**: Document IFrame parameters used for looping/no-ads
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
- [ ] Performance benchmarks met (lazy load, <10KB bundle)
- [ ] Accessibility requirements met (title attribute, keyboard controls)
- [ ] Mobile responsive (works on iOS Safari, Android Chrome)
- [ ] No regressions in existing features

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Add YouTubeEmbed component to a test page
   - [ ] Verify video loads when scrolled into view (lazy loading)
   - [ ] Verify video loops automatically
   - [ ] Verify video is muted by default
   - [ ] Verify no ads or suggested videos appear

2. **Edge Case Testing**
   - [ ] Test with invalid video ID → verify error state
   - [ ] Test with empty video ID → verify validation error
   - [ ] Scroll page without reaching video → verify video doesn't load
   - [ ] Add multiple video embeds on same page → verify all work independently
   - [ ] Test with JavaScript disabled → verify fallback link appears

3. **Integration Testing**
   - [ ] Embed video on homepage hero section
   - [ ] Embed video in activities page
   - [ ] Verify lazy loading doesn't interfere with page scroll performance
   - [ ] Verify aspect ratio remains 16:9 on different screen sizes

4. **Browser Testing**
   - [ ] Chrome (desktop & mobile) - autoplay works
   - [ ] Safari (desktop & mobile) - autoplay restrictions apply, video still loops
   - [ ] Firefox
   - [ ] iOS Safari (critical - most users)

5. **Performance Testing**
   - [ ] Check Network tab: IFrame loads only when in viewport
   - [ ] Check Performance tab: no layout shift during video load
   - [ ] Test with slow 3G network simulation
   - [ ] Verify video placeholder displays instantly

6. **Accessibility Testing**
   - [ ] Keyboard navigation: can tab to video, use controls
   - [ ] Screen reader announces video title correctly
   - [ ] Focus indicator visible on video controls
   - [ ] Verify IFrame has descriptive title attribute

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Remove component**: Delete YouTubeEmbed component and tests
3. **Remove dependencies**: No external packages added
4. **Update documentation**: Revert doc changes
5. **Replace with static images**: Use screenshots of videos as placeholders

**Risk Assessment:** Low (self-contained component, no external dependencies)
**Rollback Difficulty:** Easy (no database, no migrations, just remove component)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add YouTube embed usage instructions
- [ ] `.claude/docs/architecture.md` - Document YouTube channel requirements
- [ ] `src/components/media/YouTubeEmbed.tsx` - Add comprehensive JSDoc
- [ ] `.claude/docs/coding-standards.md` - Add video embed best practices

---

## Related Tasks

**Depends On:**

- None (standalone feature)

**Blocks:**

- [SS-26: Homepage](./ss-26-homepage.md) - Homepage may include hero video
- [SS-29: Activities Page](./ss-29-activities-page.md) - Activities page includes surf footage

**Related:**

- [SS-22: Image Upload System](./ss-22-image-upload-system.md) - Complementary media system

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

**YouTube IFrame Parameters for Looping & No Ads:**

```
https://www.youtube.com/embed/{VIDEO_ID}?
  loop=1
  &mute=1
  &autoplay=1
  &controls=1
  &modestbranding=1
  &rel=0
  &playlist={VIDEO_ID}
```

**Key Parameters:**

- `loop=1` - Loop video indefinitely
- `mute=1` - Required for autoplay to work on mobile
- `autoplay=1` - Start playing when loaded (requires mute)
- `controls=1` - Show playback controls (user can unmute)
- `modestbranding=1` - Minimal YouTube branding
- `rel=0` - Don't show related videos after playback
- `playlist={VIDEO_ID}` - Required for loop to work with single video

**iOS Safari Autoplay Restrictions:**

- Videos must be muted to autoplay
- User interaction may be required in some cases
- Component handles this gracefully by showing controls

**De-Monetized Channel:**

- User must create YouTube channel
- Disable monetization in YouTube Studio settings
- No ads will appear on de-monetized videos

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
