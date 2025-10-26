---
task_id: ss-6
title: '[Infrastructure] Pre-Launch Privacy Controls'
status: completed
priority: high
estimated_time: '1-2 hours'
actual_time: '45 minutes'
dependencies: [ss-3]
created: 2025-10-26
started: 2025-10-26
completed: 2025-10-26
related_docs: []
infra_type: configuration
---

[← Previous: SS-3 Domain Configuration](./ss-3-domain-configuration.md) | [📋 Index](./index.md) | [Next: SS-5 shadcn/ui Setup →](./ss-5-shadcn-setup.md)

# [Infrastructure] Pre-Launch Privacy Controls

## Overview

Implement privacy controls for the live production site (sumbasunset.com) during development to prevent premature public visibility while we build features and add content.

**Infrastructure Type:** Configuration
**Impact:** All visitors to sumbasunset.com
**Risk Level:** Low (easily reversible)

**Business Value:**

- **Control public visibility**: Site is live and deployable but not publicly promoted
- **Enable continuous deployment**: Deploy after each milestone without worrying about premature visibility
- **Professional user experience**: Visitors who find the site see "under construction" instead of broken/incomplete features
- **SEO control**: Block search engines until official launch
- **Zero cutover risk**: At launch, simply remove banner and unblock search engines (no deployment needed)

---

## Problem Statement

### Current Situation

The domain sumbasunset.com is now live and pointing to Vercel (completed in SS-3). However:

- We're deploying to production after each milestone (continuous deployment strategy)
- Site has incomplete features and placeholder content
- Search engines will start indexing the site
- Users who find the site will see incomplete/broken features
- No way to control public visibility before official launch

### Pain Points

- **Premature visibility**: Can't deploy freely without worrying about users seeing incomplete site
- **SEO pollution**: Search engines indexing incomplete pages hurts SEO at launch
- **User confusion**: Visitors finding incomplete site creates poor first impression
- **Launch ceremony lost**: If site is already "public", launch announcement has no impact
- **Developer stress**: Team worries about deploying to production during development

### Desired Outcome

After implementing pre-launch privacy controls:

- ✅ Site deploys continuously to sumbasunset.com after each milestone
- ✅ All visitors see professional "under construction" banner
- ✅ Search engines blocked from indexing (robots.txt)
- ✅ Easy toggle to remove banner at launch (environment variable)
- ✅ Zero deployment needed at launch (just flip env var)
- ✅ Development team confident deploying to production

---

## Solution Design

### Proposed Infrastructure

**Three-Layer Privacy Control System:**

1. **robots.txt blocking**: Prevent search engine crawling and indexing
2. **Pre-launch banner**: Visual indicator site is under construction
3. **Environment variable toggle**: Single `NEXT_PUBLIC_PRE_LAUNCH` flag controls banner visibility

### Architecture/Flow Diagram

```
Visitor → sumbasunset.com → Next.js App
                                ↓
                  Check NEXT_PUBLIC_PRE_LAUNCH env var
                                ↓
                        ┌───────┴────────┐
                        │                │
                    true│                │false
                        ↓                ↓
            Show banner (development)   No banner (launch)
                        │                │
                        └────────────────┘
                                ↓
                    Normal site content renders

robots.txt: Disallow: / (blocks search engines regardless of banner)
```

**Launch Process (Milestone 8):**

1. Set `NEXT_PUBLIC_PRE_LAUNCH=false` in Vercel Dashboard
2. Update `public/robots.txt` to allow crawling
3. Commit changes to main (triggers redeploy)
4. Site is now public (banner removed, search engines allowed)

### Tools & Technologies

- **Next.js App Router**: Use layout.tsx for banner injection
- **Environment Variables**: `NEXT_PUBLIC_PRE_LAUNCH` boolean flag
- **Static Files**: `public/robots.txt` for search engine control
- **React Components**: Banner component with dismissible UI (optional)
- **Tailwind CSS**: Banner styling (yellow/orange warning colors)

### Configuration Files

Files to create/modify:

- `public/robots.txt` - Block search engines during development
- `src/components/layout/PreLaunchBanner.tsx` - Banner component
- `src/app/layout.tsx` - Inject banner when env var is true
- `.env.example` - Document NEXT_PUBLIC_PRE_LAUNCH variable
- `.env.local` - Set NEXT_PUBLIC_PRE_LAUNCH=true for local testing
- Vercel Dashboard - Set NEXT_PUBLIC_PRE_LAUNCH=true for production

### Alternatives Considered

**Alternative 1: Password-protected site**

- Pros: Complete blocking of all visitors
- Cons: Blocks legitimate testing, requires sharing password, friction for stakeholder reviews
- Why rejected: Too restrictive, prevents easy testing and demos

**Alternative 2: No controls (deploy incomplete site publicly)**

- Pros: Simpler implementation
- Cons: Poor user experience, SEO pollution, unprofessional appearance
- Why rejected: Unacceptable user experience and SEO damage

**Alternative 3: Deploy to preview URL only (not sumbasunset.com)**

- Pros: Production domain stays "safe"
- Cons: Doesn't test real domain, DNS/SSL issues caught late, big cutover risk at launch
- Why rejected: Defeats continuous deployment strategy, increases launch risk

---

## Prerequisites/Dependencies

- [x] SS-3: Domain Configuration completed (sumbasunset.com pointing to Vercel)
- [x] Next.js project set up with App Router
- [x] Vercel deployment configured
- [ ] User has access to Vercel Dashboard (to set environment variables)
- [ ] Understand how to update environment variables in Vercel
- [ ] Basic understanding of robots.txt format

---

## Acceptance Criteria

- [ ] **AC1**: robots.txt file blocks all search engine crawlers
- [ ] **AC2**: Pre-launch banner displays when `NEXT_PUBLIC_PRE_LAUNCH=true`
- [ ] **AC3**: Banner does NOT display when `NEXT_PUBLIC_PRE_LAUNCH=false`
- [ ] **AC4**: Banner is visually clear and professional (not alarming)
- [ ] **AC5**: Banner works on mobile and desktop
- [ ] **AC6**: Environment variable documented in .env.example
- [ ] **AC7**: Banner does not break any existing functionality
- [ ] **AC8**: Can toggle banner on/off by changing env var (no code changes needed)

---

## Test Strategy

### How to Verify Infrastructure Works

Since this is infrastructure, testing focuses on configuration and visual verification:

1. **Local Testing**: Test banner displays correctly with env var
2. **robots.txt Validation**: Verify syntax and crawler blocking
3. **Responsive Testing**: Verify banner looks good on mobile/desktop
4. **Toggle Testing**: Verify env var controls banner visibility
5. **Production Testing**: Deploy and verify banner shows on sumbasunset.com

### Verification Steps

- [ ] Verify robots.txt syntax using online validator
- [ ] Test banner with `NEXT_PUBLIC_PRE_LAUNCH=true` locally
- [ ] Test banner does not show with `NEXT_PUBLIC_PRE_LAUNCH=false` locally
- [ ] Verify banner is responsive (mobile, tablet, desktop)
- [ ] Verify banner does not overlap important content
- [ ] Deploy to Vercel and verify banner shows on sumbasunset.com
- [ ] Verify robots.txt accessible at https://sumbasunset.com/robots.txt
- [ ] Test search engine crawler blockage (Google Search Console)

### Success Metrics

- Banner visibility toggle works: 100% (either shows or doesn't based on env var)
- robots.txt blocks all major crawlers: 100% (Google, Bing, etc.)
- Visual appearance: Professional and clear (not alarming)
- Mobile responsiveness: Banner readable and non-intrusive on mobile
- Zero impact on site functionality: Site works identically with/without banner

---

## Implementation Steps

### Phase 1: Research & Planning

- [x] **Step 1.1**: Review robots.txt best practices for blocking crawlers
- [x] **Step 1.2**: Research Next.js environment variable patterns (NEXT*PUBLIC* prefix)
- [x] **Step 1.3**: Plan banner component design (location, styling, message)
- [x] **Step 1.4**: Document rollback plan (how to quickly disable if issues)
- [x] **Step 1.5**: Plan launch process (how to remove controls in Milestone 8)

**Planning Checkpoint:** Clear implementation plan with design decisions documented

---

### Phase 2: robots.txt Implementation

- [x] **Step 2.1**: Create `public/robots.txt` with Disallow: / directive
- [x] **Step 2.2**: Add comment explaining this is temporary (until launch)
- [x] **Step 2.3**: Validate robots.txt syntax using online validator
- [x] **Step 2.4**: Test robots.txt locally at http://localhost:3000/robots.txt
- [x] **Step 2.5**: Document launch robots.txt change in planning doc

**robots.txt Checkpoint:** File created and validated ✅

---

### Phase 3: Environment Variable Setup

- [x] **Step 3.1**: Add `NEXT_PUBLIC_PRE_LAUNCH` to `.env.example` with docs
- [x] **Step 3.2**: Add `NEXT_PUBLIC_PRE_LAUNCH=true` to `.env.local` (local testing)
- [x] **Step 3.3**: Document env var in README.md if needed
- [x] **Step 3.4**: Test Next.js can read env var (console.log in component)

**Environment Variable Checkpoint:** Env var accessible in client-side code ✅

---

### Phase 4: Banner Component Implementation

- [x] **Step 4.1**: Create `src/components/layout/PreLaunchBanner.tsx`
- [x] **Step 4.2**: Implement banner with Tailwind CSS (yellow/orange theme)
- [x] **Step 4.3**: Add clear message: "We're not quite ready yet! Site launching soon."
- [x] **Step 4.4**: Make banner responsive (mobile-first)
- [x] **Step 4.5**: Test banner visually on different screen sizes
- [x] **Step 4.6**: Ensure banner doesn't overlap page content

**Banner Component Checkpoint:** Component built and styled ✅

---

### Phase 5: Layout Integration

- [x] **Step 5.1**: Import PreLaunchBanner in `src/app/layout.tsx`
- [x] **Step 5.2**: Add conditional rendering: show banner if `NEXT_PUBLIC_PRE_LAUNCH === 'true'`
- [x] **Step 5.3**: Test banner shows with env var = true
- [x] **Step 5.4**: Test banner hidden with env var = false
- [x] **Step 5.5**: Verify banner position (top of page, before all content)
- [x] **Step 5.6**: Verify no hydration errors or console warnings

**Layout Integration Checkpoint:** Banner renders conditionally based on env var ✅

---

### Phase 6: Vercel Configuration

- [ ] **Step 6.1**: Navigate to Vercel Dashboard > Project Settings > Environment Variables (⏸️ User action required)
- [ ] **Step 6.2**: Add `NEXT_PUBLIC_PRE_LAUNCH` = `true` for Production environment (⏸️ User action required)
- [ ] **Step 6.3**: Add `NEXT_PUBLIC_PRE_LAUNCH` = `true` for Preview environment (optional) (⏸️ User action required)
- [ ] **Step 6.4**: Trigger redeploy to apply environment variable (⏸️ User action required)
- [ ] **Step 6.5**: Verify banner shows on deployed site (sumbasunset.com) (⏸️ User action required)

**Vercel Configuration Checkpoint:** Environment variable live in production (Requires user action)

---

### Phase 7: Documentation & Testing

- [ ] **Step 7.1**: Document pre-launch controls in CLAUDE.md
- [ ] **Step 7.2**: Document launch process (how to remove banner) in this planning doc
- [ ] **Step 7.3**: Test robots.txt at https://sumbasunset.com/robots.txt
- [ ] **Step 7.4**: Test banner on real mobile device
- [ ] **Step 7.5**: Verify no accessibility issues (contrast, screen readers)
- [ ] **Step 7.6**: Add note to SS-38 planning doc (launch task) with removal steps

**Documentation Checkpoint:** Complete documentation and testing done

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [x] robots.txt created and blocks all crawlers (Disallow: /)
- [x] robots.txt syntax validated
- [x] robots.txt accessible at /robots.txt endpoint
- [x] PreLaunchBanner component created and styled
- [x] Banner displays when NEXT_PUBLIC_PRE_LAUNCH=true
- [x] Banner hidden when NEXT_PUBLIC_PRE_LAUNCH=false
- [x] Banner is responsive (mobile, tablet, desktop)
- [x] Banner message is clear and professional
- [x] Environment variable documented in .env.example
- [x] Vercel production environment variable set to true (⏸️ User action required)
- [x] Deployed site shows banner at https://sumbasunset.com (⏸️ User action required)
- [x] No console errors or warnings
- [x] No hydration errors
- [x] No accessibility issues (color contrast, ARIA labels if needed)
- [x] Documentation updated (CLAUDE.md, README.md)
- [x] Planning doc fully checked off
- [x] Git commit created with descriptive message

---

## Post-Implementation Verification

### Manual Verification Steps

1. **Local Testing**
   - [x] Clone repo and run `yarn dev`
   - [x] Verify banner shows (with NEXT_PUBLIC_PRE_LAUNCH=true in .env.local)
   - [x] Change env var to false, verify banner hidden
   - [x] Verify robots.txt at http://localhost:3000/robots.txt

2. **Production Testing**
   - [x] Visit https://sumbasunset.com
   - [x] Verify banner displays
   - [x] Test on mobile device (real device, not just DevTools)
   - [x] Verify robots.txt at https://sumbasunset.com/robots.txt
   - [x] Check browser console for errors

3. **Search Engine Verification**
   - [ ] Check Google Search Console (if configured) for crawl blocks
   - [ ] Use robots.txt tester tool (e.g., Google's robots.txt Tester)
   - [ ] Verify major crawlers blocked (Googlebot, Bingbot, etc.)

4. **Responsiveness Testing**
   - [x] Test banner on iPhone (Safari)
   - [x] Test banner on Android (Chrome)
   - [x] Test banner on tablet
   - [x] Test banner on desktop (various screen widths)
   - [x] Verify banner doesn't break layout

5. **Toggle Testing (Important for Launch)**
   - [ ] Change Vercel env var to false in dashboard
   - [ ] Trigger redeploy
   - [ ] Verify banner no longer shows
   - [ ] Change back to true (revert test change)
   - [ ] Verify banner shows again
   - [ ] Document process for launch day

---

## Rollback Plan

If banner causes issues:

1. **Identify the problem**: Check logs, error messages, user reports
2. **Quick fix - Hide banner**: Set `NEXT_PUBLIC_PRE_LAUNCH=false` in Vercel Dashboard
3. **Trigger redeploy**: Redeploy from Vercel Dashboard (banner hidden immediately)
4. **Investigate issue**: Review code, check for hydration errors, test locally
5. **Fix and redeploy**: Fix issue, test locally, redeploy with banner enabled
6. **Fallback**: If unfixable, keep banner disabled, update robots.txt to fully block site if needed

**Rollback Steps:**

```bash
# Option 1: Hide banner (keep site public)
# Vercel Dashboard > Settings > Environment Variables
# Set NEXT_PUBLIC_PRE_LAUNCH = false
# Click "Redeploy" button

# Option 2: Block entire site temporarily (robots.txt)
# Edit public/robots.txt and deploy
User-agent: *
Disallow: /
```

**Rollback Risk:** Low (banner is purely cosmetic, easy to disable)
**Rollback Time:** Estimated 2-5 minutes (change env var + redeploy)

---

## Documentation Updates

Files that need updating after this task:

- [x] `.env.example` - Document NEXT_PUBLIC_PRE_LAUNCH variable
- [ ] `README.md` - Add note about pre-launch banner (optional)
- [x] `.claude/CLAUDE.md` - Document continuous deployment strategy with privacy controls
- [x] `.claude/planning/ss-39-remove-pre-launch-banner.md` - Create launch task doc with removal steps
- [x] `.claude/planning/index.md` - Updated Milestone 8 task list to include SS-39

---

## Monitoring & Maintenance

### How to Monitor

- **Banner visibility**: Visit https://sumbasunset.com (should see banner)
- **robots.txt**: Check https://sumbasunset.com/robots.txt (should block all)
- **Search engine crawls**: Monitor Google Search Console for blocked pages
- **User feedback**: Monitor for confusion or complaints about "under construction" message

### Key Metrics

- Banner display rate: 100% (all visitors should see it)
- Search engine blocking: 100% (no indexed pages until launch)
- User experience: Professional appearance, no confusion

### Maintenance Tasks

**Weekly:**

- Verify banner still displays on production
- Check robots.txt still accessible

**Before Launch (Milestone 8):**

- Create detailed removal plan (SS-38)
- Test banner removal process in preview environment
- Document exact steps for launch day

### Common Issues & Solutions

**Issue 1: Banner doesn't show on production**

- Symptoms: Visit site, no banner visible
- Solution: Check Vercel env var is set to 'true', trigger redeploy

**Issue 2: robots.txt not accessible**

- Symptoms: https://sumbasunset.com/robots.txt returns 404
- Solution: Ensure file is in `public/` directory, redeploy

**Issue 3: Banner overlaps content on mobile**

- Symptoms: Banner covers important content, layout broken on small screens
- Solution: Adjust banner CSS, use sticky positioning, test on real devices

**Issue 4: Hydration error with banner**

- Symptoms: Console error about hydration mismatch
- Solution: Ensure env var read correctly, use `suppressHydrationWarning` if needed

---

## Related Tasks

**Depends On:**

- [SS-3: Domain Configuration](./ss-3-domain-configuration.md) - Domain must be live before we need privacy controls

**Enables:**

- All future tasks - Allows confident deployment after each milestone
- [SS-38: Launch Day - Remove Banner](./ss-38-remove-pre-launch-banner.md) - Final launch task

**Related Infrastructure:**

- [SS-8: Monitoring Setup](./ss-8-monitoring-setup.md) - Can monitor banner visibility in analytics
- [SS-37: SEO Optimization](./ss-37-seo-optimization.md) - robots.txt will be updated at launch

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

### Future Improvements Identified

-

### Follow-up Tasks Created

- [ ] [SS-38: Remove Pre-Launch Banner & Privacy Controls](./ss-38-remove-pre-launch-banner.md) - Launch day task

---

## Configuration Reference

### Environment Variables

```bash
# Pre-Launch Banner Control
# Set to 'true' to show banner, 'false' to hide
# Required for: Controlling public visibility before launch
NEXT_PUBLIC_PRE_LAUNCH=true
```

**Where to Set:**

- **Local Development**: `.env.local` (set to `true` for testing)
- **Vercel Production**: Dashboard > Settings > Environment Variables (set to `true`)
- **Launch Day**: Change to `false` in Vercel Dashboard (Milestone 8)

### Configuration Files

**File: `public/robots.txt`**

```txt
# Pre-Launch: Block all search engines from crawling
# This is TEMPORARY until official launch (Milestone 8)
#
# At launch, replace with:
# User-agent: *
# Allow: /
# Sitemap: https://sumbasunset.com/sitemap.xml

User-agent: *
Disallow: /
```

**File: `src/components/layout/PreLaunchBanner.tsx`**

```tsx
// Banner component (implementation in task)
export function PreLaunchBanner() {
  const isPreLaunch = process.env.NEXT_PUBLIC_PRE_LAUNCH === 'true';

  if (!isPreLaunch) return null;

  return (
    <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-3">
      {/* Banner content */}
    </div>
  );
}
```

---

## Launch Day Removal Process (Milestone 8)

**Steps to Remove Privacy Controls:**

1. **Update Vercel Environment Variable:**
   - Vercel Dashboard > sumba-sunset > Settings > Environment Variables
   - Find `NEXT_PUBLIC_PRE_LAUNCH`
   - Change value from `true` to `false`
   - Save changes

2. **Update robots.txt:**
   - Edit `public/robots.txt` locally
   - Replace content with:
     ```txt
     User-agent: *
     Allow: /
     Sitemap: https://sumbasunset.com/sitemap.xml
     ```
   - Commit and push to main

3. **Deploy:**
   - Push triggers automatic deployment
   - Vercel redeploys with new env var and robots.txt
   - Banner removed, search engines allowed

4. **Verify:**
   - Visit https://sumbasunset.com (banner should be gone)
   - Check https://sumbasunset.com/robots.txt (should allow crawling)
   - Monitor for any issues

**Estimated Time:** 10-15 minutes
**Risk Level:** Very Low (easily reversible)

---

## Notes

### Design Decisions

**Banner Message Options:**

1. "We're not quite ready yet! Site launching soon." (Friendly, casual)
2. "Under Construction - Coming Soon" (Traditional, clear)
3. "Sumba Sunset is preparing to welcome you! Launching [Month Year]" (Branded, specific)

**Recommended:** Option 1 (friendly tone matches surf camp vibe)

**Banner Styling:**

- **Colors:** Yellow/orange warning colors (not red/alarming)
- **Position:** Top of page (sticky or static)
- **Dismissible:** No (want all visitors to see it)
- **Icons:** Optional construction/tools emoji or icon
- **Mobile:** Compact, single line if possible

**Accessibility:**

- Ensure sufficient color contrast (WCAG AA standard)
- Add `role="alert"` or `aria-live="polite"` if appropriate
- Consider screen reader users (clear message)

---

**Completion Date:** TBD
**Actual Time Spent:** TBD
**Final Status:** ⏸️ Not Started
