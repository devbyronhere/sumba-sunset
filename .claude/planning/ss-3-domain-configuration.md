---
task_id: ss-3
title: '[Infrastructure] Domain Configuration - Point Hostinger Domain to Vercel'
status: not_started
priority: high
estimated_time: '30 minutes active work (DNS propagation 5min-48h wait time)'
actual_work_time: null # Track active work separately
propagation_wait: null # Track propagation wait time separately
dependencies: []
created: 2025-01-19
started: null
completed: null
related_docs: []
infra_type: configuration
---

[← Previous: SS-2 Linting Setup](./ss-2-linting-setup.md) | [📋 Index](./index.md) | [Next: SS-4 Pre-Launch Privacy Controls →](./ss-4-pre-launch-privacy.md)

**Milestone:** 2 - Core Infrastructure

# [Infrastructure] Domain Configuration - Point Hostinger Domain to Vercel

## Overview

Configure DNS settings in Hostinger to point the `sumbasunset.com` domain to Vercel's hosting platform. This is a manual configuration task that connects the domain purchased from Hostinger to the application hosted on Vercel.

**Infrastructure Type:** Configuration (DNS)
**Impact:** Production domain access
**Risk Level:** Low (can revert DNS changes anytime)

**Business Value:**

- Enable production domain (sumbasunset.com) instead of Vercel's default URL
- Professional branding for marketing and SEO
- Automatic SSL certificate provisioning by Vercel
- Unblock production launch

---

## Problem Statement

### Current Situation

- Domain `sumbasunset.com` purchased from Hostinger
- Application hosted on Vercel with temporary URL (e.g., `sumba-sunset-xxx.vercel.app`)
- Domain and hosting are not connected
- Cannot launch to production with custom domain

### Desired Outcome

After this task:

- `sumbasunset.com` points to Vercel hosting
- `www.sumbasunset.com` redirects to root domain
- Vercel automatically provisions SSL certificate
- DNS changes propagated globally
- Production site accessible at custom domain

---

## Solution Design

### DNS Configuration Flow

```
1. Add Domain in Vercel Dashboard
   ↓
2. Vercel Provides DNS Records
   ↓
3. Update DNS in Hostinger Dashboard
   ↓
4. Wait for DNS Propagation (5 min - 48 hours)
   ↓
5. Vercel Provisions SSL Certificate
   ↓
6. Domain Live with HTTPS
```

### Configuration Method

**Option 1: A Records + CNAME (Recommended)**

- Keep Hostinger as DNS host
- Update A record to point to Vercel's IP
- Update CNAME for www subdomain
- Easier to manage, familiar interface

**Option 2: Nameserver Change**

- Change nameservers to Vercel's
- All DNS managed in Vercel
- More complex, requires moving all DNS records

**Decision: Use Option 1** (A Records + CNAME) for simplicity

---

## Prerequisites/Dependencies

- [ ] Vercel account with project deployed
- [ ] Hostinger account with access to DNS settings
- [ ] Domain `sumbasunset.com` purchased and active
- [ ] Vercel project URL (current deployment)

---

## Acceptance Criteria

- [ ] **AC1**: Domain added to Vercel project
- [ ] **AC2**: DNS records provided by Vercel documented
- [ ] **AC3**: DNS A record updated in Hostinger
- [ ] **AC4**: CNAME record for www subdomain configured
- [ ] **AC5**: DNS propagation verified
- [ ] **AC6**: `sumbasunset.com` loads the application
- [ ] **AC7**: `www.sumbasunset.com` redirects to root domain
- [ ] **AC8**: SSL certificate active (HTTPS working)
- [ ] **AC9**: No mixed content warnings
- [ ] **AC10**: DNS changes documented in this file

---

## Implementation Steps

### Phase 1: Add Domain in Vercel (USER - 5 minutes)

- [ ] **Step 1.1**: Log into Vercel dashboard
- [ ] **Step 1.2**: Select the sumba-sunset project
- [ ] **Step 1.3**: Navigate to **Settings → Domains**
- [ ] **Step 1.4**: Click **Add Domain**
- [ ] **Step 1.5**: Enter `sumbasunset.com`
- [ ] **Step 1.6**: Click **Add**
- [ ] **Step 1.7**: Vercel will show DNS configuration instructions
- [ ] **Step 1.8**: Document the DNS records provided:
  - A Record: `@` → `76.76.21.21` (example - use actual Vercel IP)
  - CNAME: `www` → `cname.vercel-dns.com` (example - use actual)
- [ ] **Step 1.9**: Optionally add `www.sumbasunset.com` as well (recommended)

**Checkpoint:** DNS records documented, ready to update Hostinger

---

### Phase 2: Update DNS in Hostinger (USER - 10 minutes)

- [ ] **Step 2.1**: Log into Hostinger account
- [ ] **Step 2.2**: Navigate to **Domains → DNS Zone**
- [ ] **Step 2.3**: Select `sumbasunset.com`
- [ ] **Step 2.4**: Update or add A record:
  - Type: `A`
  - Name: `@` (root domain)
  - Value: [Vercel's IP address from Step 1.8]
  - TTL: `14400` (4 hours) or default
- [ ] **Step 2.5**: Update or add CNAME record:
  - Type: `CNAME`
  - Name: `www`
  - Value: [Vercel's CNAME from Step 1.8]
  - TTL: `14400` or default
- [ ] **Step 2.6**: Remove conflicting records (if any):
  - Old A records pointing to Hostinger
  - Old CNAME records for www
- [ ] **Step 2.7**: Save DNS changes
- [ ] **Step 2.8**: Document changes made with timestamp

**Checkpoint:** DNS records updated in Hostinger

---

### Phase 3: Wait for DNS Propagation (USER - 5 minutes - 48 hours)

- [ ] **Step 3.1**: Note the time DNS changes were saved
- [ ] **Step 3.2**: Wait at least 5 minutes before testing
- [ ] **Step 3.3**: Check DNS propagation with online tools:
  - Visit: https://www.whatsmydns.net
  - Enter: `sumbasunset.com`
  - Check A record shows Vercel's IP globally
- [ ] **Step 3.4**: Check with command line (if available):

  ```bash
  dig sumbasunset.com
  # Look for Vercel's IP in ANSWER section

  dig www.sumbasunset.com
  # Look for CNAME pointing to Vercel
  ```

- [ ] **Step 3.5**: If not propagated, wait longer (can take up to 48 hours)
- [ ] **Step 3.6**: Document propagation time

**Checkpoint:** DNS propagated globally

---

### Phase 4: Verify Domain & SSL (USER - 5 minutes)

- [ ] **Step 4.1**: Visit `http://sumbasunset.com` (note: http not https)
- [ ] **Step 4.2**: Verify site loads (may redirect to https automatically)
- [ ] **Step 4.3**: Visit `https://sumbasunset.com`
- [ ] **Step 4.4**: Verify SSL certificate is valid:
  - Click padlock icon in browser
  - Check certificate issued by "Let's Encrypt" via Vercel
  - Verify no certificate errors
- [ ] **Step 4.5**: Visit `https://www.sumbasunset.com`
- [ ] **Step 4.6**: Verify it redirects to `https://sumbasunset.com`
- [ ] **Step 4.7**: Test on mobile device (actual phone, not just browser resize)
- [ ] **Step 4.8**: Check browser console for any errors
- [ ] **Step 4.9**: Verify no mixed content warnings (HTTP resources on HTTPS page)

**Checkpoint:** Domain live with SSL

---

### Phase 5: Documentation (CLAUDE - 5 minutes)

- [ ] **Step 5.1**: Claude updates CLAUDE.md with domain status
- [ ] **Step 5.2**: Claude updates README.md with production URL
- [ ] **Step 5.3**: Claude updates planning index
- [ ] **Step 5.4**: Claude documents DNS configuration for future reference

**Checkpoint:** Documentation complete

---

## Quality Gates Checklist

**USER must verify ALL items:**

- [ ] Domain added to Vercel project
- [ ] DNS A record updated in Hostinger
- [ ] DNS CNAME record configured
- [ ] DNS propagation verified with online tool
- [ ] `sumbasunset.com` loads the application
- [ ] `www.sumbasunset.com` redirects correctly
- [ ] SSL certificate active and valid
- [ ] HTTPS works without warnings
- [ ] No mixed content errors
- [ ] Site loads on mobile device
- [ ] Old Vercel URL still works (as fallback)
- [ ] Documentation updated (this file + CLAUDE.md)

---

## Post-Implementation Verification

### Manual Testing Steps (USER REQUIRED)

1. **DNS Propagation Check**
   - [ ] Visit https://www.whatsmydns.net
   - [ ] Enter `sumbasunset.com`
   - [ ] Verify A record shows Vercel's IP in all regions
   - [ ] Repeat for `www.sumbasunset.com` (CNAME check)

2. **Domain Access Test**
   - [ ] Open incognito/private browser window
   - [ ] Visit `sumbasunset.com` (no protocol)
   - [ ] Verify site loads with HTTPS
   - [ ] Visit `www.sumbasunset.com`
   - [ ] Verify redirects to root domain

3. **SSL Certificate Test**
   - [ ] Visit `https://sumbasunset.com`
   - [ ] Click padlock icon
   - [ ] Verify certificate valid and issued by "Let's Encrypt"
   - [ ] Check certificate expiry date (should be ~90 days)
   - [ ] Verify Vercel auto-renews (no action needed)

4. **Mobile Device Test**
   - [ ] Open `sumbasunset.com` on actual phone
   - [ ] Verify site loads quickly
   - [ ] Check SSL padlock shows in mobile browser
   - [ ] Test navigation works

5. **Browser Compatibility Test**
   - [ ] Chrome: Visit `sumbasunset.com`
   - [ ] Safari: Visit `sumbasunset.com`
   - [ ] Firefox: Visit `sumbasunset.com`
   - [ ] Check console for errors in each

---

## Rollback Plan

If domain configuration causes issues:

1. **Revert DNS Records in Hostinger**:
   - Change A record back to Hostinger's IP (if previously hosted there)
   - OR remove A record entirely (domain will be offline)
   - Save changes and wait for propagation

2. **Remove Domain from Vercel**:
   - Go to Vercel → Settings → Domains
   - Click the domain
   - Click "Remove"

3. **Fallback URL**:
   - Application remains accessible at `sumba-sunset-xxx.vercel.app`
   - No functionality lost, only URL changes

**Rollback Risk:** Very Low (DNS changes are reversible)
**Rollback Time:** 5 minutes + DNS propagation
**Impact:** Domain temporarily offline during rollback

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.claude/CLAUDE.md` - Update domain status from "TBD" to "Active"
- [ ] `README.md` - Update live site URL
- [ ] `.claude/planning/index.md` - Mark task complete
- [ ] This file - Add completion notes

---

## Troubleshooting Guide

### Issue: DNS Not Propagating After 1 Hour

**Symptoms:** `dig sumbasunset.com` still shows old IP or no IP

**Solutions:**

1. Clear local DNS cache:
   - **Mac**: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - **Windows**: `ipconfig /flushdns`
   - **Linux**: `sudo systemd-resolve --flush-caches`
2. Check Hostinger DNS saved correctly (go back to DNS Zone, verify)
3. Wait longer - some ISPs cache DNS for 24-48 hours
4. Try different network (mobile hotspot, coffee shop wifi)

---

### Issue: SSL Certificate Not Provisioning

**Symptoms:** Site loads but shows "Not Secure" or certificate error

**Solutions:**

1. Wait 10-15 minutes after DNS propagates (Vercel needs time)
2. Check Vercel dashboard for SSL status (Settings → Domains → SSL)
3. Verify DNS records point to correct Vercel servers
4. Remove and re-add domain in Vercel to trigger new SSL request
5. Contact Vercel support if issue persists after 1 hour

---

### Issue: www Subdomain Not Redirecting

**Symptoms:** `www.sumbasunset.com` shows error or doesn't redirect

**Solutions:**

1. Verify CNAME record added in Hostinger for `www`
2. Add `www.sumbasunset.com` as separate domain in Vercel
3. Vercel automatically redirects www → root if both added
4. Check DNS propagation for www subdomain separately

---

### Issue: Mixed Content Warnings

**Symptoms:** Padlock shows warning, some resources load over HTTP

**Solutions:**

1. Check all image URLs use HTTPS or relative paths
2. Check external scripts/stylesheets use HTTPS
3. Update `NEXT_PUBLIC_SITE_URL` env variable to use HTTPS
4. Search codebase for hardcoded `http://` URLs

---

## Notes

**Important Reminders:**

1. **DNS propagation varies** - can be 5 minutes or 48 hours, be patient
2. **Don't delete old DNS records** before adding new ones (causes downtime)
3. **Test in incognito** to avoid browser cache issues
4. **Vercel auto-renews SSL** - no manual renewal needed every 90 days
5. **Keep Vercel default URL** as fallback (never delete)

**After Completion:**

1. Update all marketing materials with production URL
2. Update social media links
3. Submit to Google Search Console (future - SEO task)
4. Set up Google Analytics with production domain (future)
5. Monitor uptime with UptimeRobot (future)

---

## Retrospective

_(Fill out after completion)_

### What Went Well

-

### What Could Improve

-

### DNS Records Configured

```
Type: A
Name: @
Value: [Vercel IP]
TTL: [value]

Type: CNAME
Name: www
Value: [Vercel CNAME]
TTL: [value]
```

### Propagation Time

- DNS changes saved at: [timestamp]
- First successful ping at: [timestamp]
- Total propagation time: [duration]

### Issues Encountered

- Issue 1: [description and solution]
- Issue 2: [description and solution]

### Follow-up Tasks Created

- [ ] SS-XX: Submit domain to Google Search Console (SEO)
- [ ] SS-XX: Configure email forwarding with Hostinger (if needed)
- [ ] SS-XX: Set up custom email (info@sumbasunset.com) - optional

---

**Completion Date:** TBD
**Actual Time Spent:** TBD (excluding DNS propagation wait)
**Final Status:** Not Started
