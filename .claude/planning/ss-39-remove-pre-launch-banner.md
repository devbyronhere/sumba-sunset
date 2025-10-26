---
task_id: ss-39
title: '[Launch] Remove Pre-Launch Privacy Controls'
status: not_started
priority: high
estimated_time: '30-60 minutes'
actual_time: null
dependencies: [ss-6, ss-37, ss-38]
created: 2025-10-26
started: null
completed: null
related_docs: [ss-6-pre-launch-privacy.md]
infra_type: configuration
---

[← Previous: SS-38 Final Pre-Launch QA](./ss-38-final-pre-launch-qa.md) | [📋 Index](./index.md) | [Next: SS-40 Go Live Announcement →](./ss-40-go-live-announcement.md)

# [Launch] Remove Pre-Launch Privacy Controls

## Overview

Remove the pre-launch privacy controls (banner and robots.txt blocking) that were implemented in SS-6 to make the site fully public and allow search engine indexing.

**Infrastructure Type:** Configuration
**Impact:** All visitors and search engines
**Risk Level:** Low (easily reversible)

**Business Value:**

- **Public launch**: Site becomes fully visible to all visitors and search engines
- **SEO activation**: Search engines can begin crawling and indexing the site
- **Professional appearance**: No "under construction" banner for launch day
- **Zero downtime**: Simple configuration change with no deployment interruption

---

## Problem Statement

### Current Situation

The site is live at sumbasunset.com with pre-launch privacy controls active:

- Pre-launch banner displays to all visitors: "We're not quite ready yet! Site launching soon."
- `robots.txt` blocks all search engine crawlers with `Disallow: /`
- `NEXT_PUBLIC_PRE_LAUNCH=true` environment variable controls banner visibility
- Site is production-tested and ready for public launch

### Desired Outcome

After removing privacy controls:

- ✅ No banner displays to visitors
- ✅ Search engines allowed to crawl and index site
- ✅ Site fully public and discoverable
- ✅ Professional appearance for launch announcement
- ✅ Zero downtime during launch process

---

## Solution Design

### Launch Process

**Two-Step Launch Configuration:**

1. **Update Vercel Environment Variable**: Set `NEXT_PUBLIC_PRE_LAUNCH=false` to hide banner
2. **Update robots.txt**: Change from blocking all crawlers to allowing all crawlers

### Architecture/Flow Diagram

```
Before Launch:
Visitor → sumbasunset.com → Check NEXT_PUBLIC_PRE_LAUNCH=true → Show banner
Search Engine → robots.txt → Disallow: / → Blocked from crawling

After Launch:
Visitor → sumbasunset.com → Check NEXT_PUBLIC_PRE_LAUNCH=false → No banner
Search Engine → robots.txt → Allow: / → Can crawl and index
```

### Tools & Technologies

- **Vercel Dashboard**: Update environment variable
- **Git**: Commit robots.txt changes
- **Public Files**: Update `public/robots.txt`

### Configuration Changes

Files to modify:

- `public/robots.txt` - Change from blocking to allowing crawlers
- Vercel Dashboard - Set `NEXT_PUBLIC_PRE_LAUNCH=false` for Production

---

## Prerequisites/Dependencies

- [x] SS-6: Pre-Launch Privacy Controls implemented
- [ ] SS-37: SEO Optimization completed (meta tags, sitemap ready)
- [ ] SS-38: Final Pre-Launch QA completed (all tests passing)
- [ ] User has access to Vercel Dashboard
- [ ] All milestone features complete and tested
- [ ] Content finalized and reviewed
- [ ] Launch announcement prepared

---

## Acceptance Criteria

- [ ] **AC1**: Banner does NOT display on any page when visiting sumbasunset.com
- [ ] **AC2**: robots.txt allows all major search engine crawlers (Google, Bing, etc.)
- [ ] **AC3**: robots.txt includes sitemap URL
- [ ] **AC4**: No console errors or warnings in production
- [ ] **AC5**: Site remains fully functional after changes
- [ ] **AC6**: Environment variable change documented
- [ ] **AC7**: Launch timestamp recorded in planning docs

---

## Implementation Steps

### Phase 1: Pre-Launch Verification

- [ ] **Step 1.1**: Verify all Milestone 7 tasks complete (SS-37: SEO, SS-38: QA)
- [ ] **Step 1.2**: Verify sitemap.xml exists and is accessible at /sitemap.xml
- [ ] **Step 1.3**: Verify all content finalized and reviewed
- [ ] **Step 1.4**: Verify launch announcement content prepared
- [ ] **Step 1.5**: Create rollback plan (how to quickly re-enable privacy if needed)

**Pre-Launch Checkpoint:** All systems verified and ready for public launch

---

### Phase 2: Update Vercel Environment Variable

- [ ] **Step 2.1**: Navigate to Vercel Dashboard > Project Settings > Environment Variables
- [ ] **Step 2.2**: Find `NEXT_PUBLIC_PRE_LAUNCH` variable for Production environment
- [ ] **Step 2.3**: Change value from `true` to `false`
- [ ] **Step 2.4**: Save changes in Vercel Dashboard
- [ ] **Step 2.5**: Trigger redeploy (or wait for next deployment)

**Environment Variable Checkpoint:** Banner will be hidden on next deployment

---

### Phase 3: Update robots.txt

- [ ] **Step 3.1**: Open `public/robots.txt` locally
- [ ] **Step 3.2**: Replace blocking content with allowing content (see below)
- [ ] **Step 3.3**: Verify sitemap URL is correct
- [ ] **Step 3.4**: Commit changes with descriptive message
- [ ] **Step 3.5**: Push to main branch (triggers auto-deployment)

**robots.txt Content:**

```txt
# Public Launch - Allow all search engines to crawl
# Launched: 2025-MM-DD

User-agent: *
Allow: /
Sitemap: https://sumbasunset.com/sitemap.xml
```

**robots.txt Checkpoint:** Search engines can now crawl and index site

---

### Phase 4: Verify Launch

- [ ] **Step 4.1**: Wait for Vercel deployment to complete
- [ ] **Step 4.2**: Visit https://sumbasunset.com and verify no banner displays
- [ ] **Step 4.3**: Check https://sumbasunset.com/robots.txt and verify allows crawling
- [ ] **Step 4.4**: Test on mobile device (banner should not appear)
- [ ] **Step 4.5**: Check browser console for any errors
- [ ] **Step 4.6**: Verify all pages still load correctly

**Launch Verification Checkpoint:** Site is now public and search engine friendly

---

### Phase 5: Documentation & Announcement

- [ ] **Step 5.1**: Update this planning doc with actual launch timestamp
- [ ] **Step 5.2**: Update Planning Index with launch milestone status
- [ ] **Step 5.3**: Document any issues encountered during launch
- [ ] **Step 5.4**: Proceed to SS-40: Go Live Announcement

**Documentation Checkpoint:** Launch process documented

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] Banner does not display on production (sumbasunset.com)
- [ ] robots.txt allows all crawlers
- [ ] robots.txt includes sitemap URL
- [ ] robots.txt syntax validated
- [ ] Vercel environment variable updated to false
- [ ] Site fully functional after changes
- [ ] No console errors or warnings
- [ ] No broken links or missing content
- [ ] Mobile experience verified
- [ ] Planning doc updated with launch timestamp
- [ ] Git commit created with launch message

---

## Rollback Plan

If issues arise after removing privacy controls:

### Quick Rollback (Hide Banner, Keep Search Engines Blocked)

1. **Revert robots.txt**: Change back to `Disallow: /` and push to main
2. **Revert env var**: Set `NEXT_PUBLIC_PRE_LAUNCH=true` in Vercel Dashboard
3. **Trigger redeploy**: Redeploy from Vercel Dashboard
4. **Verify**: Check banner displays again, robots.txt blocks crawlers

### Rollback Steps

```bash
# Revert robots.txt
# Edit public/robots.txt locally:
User-agent: *
Disallow: /

# Commit and push
git add public/robots.txt
git commit -m "revert: Re-enable pre-launch privacy controls"
git push origin main

# Update Vercel env var in dashboard:
# NEXT_PUBLIC_PRE_LAUNCH = true
# Click "Redeploy"
```

**Rollback Risk:** Very Low (simple configuration revert)
**Rollback Time:** 5-10 minutes (change env var + redeploy)

---

## Post-Launch Verification

### Manual Verification Steps

1. **Banner Removal Verification**
   - [ ] Visit https://sumbasunset.com (no banner)
   - [ ] Test on iPhone (Safari) - no banner
   - [ ] Test on Android (Chrome) - no banner
   - [ ] Test on tablet - no banner
   - [ ] Check browser console - no errors

2. **robots.txt Verification**
   - [ ] Visit https://sumbasunset.com/robots.txt
   - [ ] Verify shows `Allow: /`
   - [ ] Verify includes sitemap URL
   - [ ] Use Google's robots.txt Tester tool
   - [ ] Verify Googlebot allowed, Bingbot allowed

3. **Search Engine Verification (Post-Launch)**
   - [ ] Submit sitemap to Google Search Console (if configured)
   - [ ] Monitor Google Search Console for crawl activity
   - [ ] Check for any crawl errors
   - [ ] Verify pages begin appearing in search results (may take days/weeks)

4. **Site Functionality Verification**
   - [ ] Homepage loads correctly
   - [ ] All navigation links work
   - [ ] Contact form functional
   - [ ] Booking widget loads
   - [ ] WhatsApp click-to-chat works
   - [ ] Mobile responsive on all pages

---

## Launch Timeline

**Recommended Launch Timing:**

- **Day of Week**: Weekday morning (Tuesday-Thursday preferred)
- **Time**: 9-11 AM local time (staff available for monitoring)
- **Avoid**: Friday afternoon, weekends, holidays (reduced support availability)

**Launch Day Checklist:**

1. **T-60 minutes**: Final QA sweep (SS-38)
2. **T-30 minutes**: Update Vercel env var to false
3. **T-15 minutes**: Update robots.txt and push
4. **T-0 (Launch)**: Verify deployment complete, banner removed
5. **T+15 minutes**: Post launch announcement (SS-40)
6. **T+30 minutes**: Monitor for errors, check analytics
7. **T+2 hours**: Check again for any issues
8. **T+24 hours**: Review analytics, search console, user feedback

---

## Monitoring After Launch

### What to Monitor (First 24-48 Hours)

- **Error Monitoring (Sentry)**: Watch for any new errors or increased error rates
- **Analytics (GA4)**: Monitor traffic, bounce rate, popular pages
- **Uptime (UptimeRobot)**: Verify site stays online
- **Contact Form**: Verify messages still reaching WhatsApp
- **Booking Widget**: Verify Beds24 widget still functional
- **Search Console**: Check for crawl errors (may take 24-48h)

### Key Metrics to Track

- **Site Uptime**: Should be 100%
- **Error Rate**: Should remain low (<1%)
- **Response Time**: Should be fast (<2s)
- **Conversion Rate**: Contact form submissions, booking widget clicks
- **Search Visibility**: Monitor Google Search Console impressions (gradual increase expected)

---

## Related Tasks

**Depends On:**

- [SS-6: Pre-Launch Privacy Controls](./ss-6-pre-launch-privacy.md) - Privacy controls to remove
- [SS-37: SEO Optimization](./ss-37-seo-optimization.md) - Meta tags and sitemap ready
- [SS-38: Final Pre-Launch QA](./ss-38-final-pre-launch-qa.md) - All systems verified

**Enables:**

- [SS-40: Go Live Announcement](./ss-40-go-live-announcement.md) - Public announcement after privacy removed

**Related Launch Tasks:**

- [SS-36: Upgrade Twilio WhatsApp](./ss-36-upgrade-twilio-whatsapp.md) - Production WhatsApp number
- [SS-37: SEO Optimization](./ss-37-seo-optimization.md) - Search engine optimization
- [SS-38: Final Pre-Launch QA](./ss-38-final-pre-launch-qa.md) - Final testing

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

### Launch Metrics

- **Launch Date**: TBD
- **Launch Time**: TBD
- **Downtime During Launch**: TBD
- **Issues Encountered**: TBD
- **Time to Resolve Issues**: TBD

---

## Configuration Reference

### Before Launch (Current State)

**Environment Variables:**

```bash
NEXT_PUBLIC_PRE_LAUNCH=true  # Banner displays
```

**robots.txt:**

```txt
User-agent: *
Disallow: /  # Blocks all crawlers
```

### After Launch (Target State)

**Environment Variables:**

```bash
NEXT_PUBLIC_PRE_LAUNCH=false  # No banner
```

**robots.txt:**

```txt
User-agent: *
Allow: /
Sitemap: https://sumbasunset.com/sitemap.xml  # Allow all crawlers
```

---

## Notes

### Launch Day Communication

**Internal Team:**

- Notify all team members of launch time
- Ensure staff available for first 2-4 hours post-launch
- Have rollback plan ready if issues arise

**External Stakeholders:**

- Prepare social media posts (SS-40)
- Prepare email announcement (if applicable)
- Notify any partners or affiliates

### Post-Launch Expectations

**Immediate (0-24 hours):**

- Site is public but not yet in search results
- Traffic primarily from direct URLs and social media
- Monitor for technical issues closely

**Short-term (1-7 days):**

- Search engines begin crawling site
- Some pages may appear in search results
- Traffic gradually increases as SEO takes effect

**Long-term (1-3 months):**

- Site fully indexed by search engines
- Organic search traffic increases
- Search rankings improve for target keywords

---

**Completion Date:** TBD
**Actual Time Spent:** TBD
**Launch Timestamp:** TBD
**Final Status:** ⏸️ Not Started
