# Deployment Guide

This document provides detailed information about deploying the Sumba Sunset application, including environment configuration, build process, and CI/CD setup.

---

## Environment Variables

### Required (Production - Vercel)

```bash
# Twilio (Contact form → WhatsApp) ✅ READY
TWILIO_ACCOUNT_SID=your_account_sid  # Obtain from Twilio console
TWILIO_AUTH_TOKEN=your_auth_token    # Obtain from Twilio console
TWILIO_WHATSAPP_NUMBER=whatsapp:+16067558767  # Purchased number
STAFF_WHATSAPP_NUMBER=whatsapp:+27787787591   # Dev number (change to staff post-deployment)

# Beds24 (Booking widget integration)
BEDS24_API_KEY=your_api_key        # Obtain from Beds24: Account → Settings → API
BEDS24_PROP_KEY=your_property_key  # Obtain from Beds24: Property → Settings → API Key
```

**IMPORTANT:** Beds24 requires TWO API keys:

1. **Account-level API key** (BEDS24_API_KEY) - for account-wide API access
2. **Property-level key** (BEDS24_PROP_KEY) - for embedding the booking widget

Both are required for full functionality. Widget may work with PROP_KEY only, but API integration needs both.

```bash
# Analytics & Monitoring (NOT YET CONFIGURED)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Create GA4 property
SENTRY_DSN=your_sentry_dsn                  # Create Sentry project (optional)
SENTRY_AUTH_TOKEN=your_auth_token           # Create Sentry project (optional)

# Site Configuration ✅ READY
NEXT_PUBLIC_SITE_URL=https://sumbasunset.com
NEXT_PUBLIC_PRE_LAUNCH=true  # Set to 'false' on official launch day
```

### Local Development

- Create `.env.local` (gitignored) - see `.env.example` template
- Use production credentials for Twilio (already upgraded with credits)
- Use production credentials for Beds24 (paid service)

---

## Build Process

### Build Commands

```bash
# Install dependencies
yarn install

# Run type checking
yarn type-check

# Run linting
yarn lint

# Run tests
yarn test

# Build for production
yarn build
```

### Build Settings

- Build Command: `yarn build`
- Output Directory: `.next`
- Install Command: `yarn install`
- Node Version: 18.x

---

## Hosting Platform

### Vercel (✅ ACTIVE)

- **Hosting**: Vercel edge network with CDN
- **Domain**: sumbasunset.com (purchased from Hostinger, DNS pointing to Vercel)
- **SSL**: Automatic, managed by Vercel
- **Deployment Method**: Automatic from GitHub main branch
- **Environment Variables**: Configure in Vercel dashboard
- **Static Assets**: Vercel Blob for images and media

### Deployment Strategy

**Live Domain Deployment (Continuous Deployment Approach)**

Deploy to production domain (sumbasunset.com) after every milestone:

- **Why Live Domain?** Catch DNS/SSL/domain-specific issues early, test third-party integrations (Beds24, Twilio) in real environment, zero cutover risk at launch
- **Pre-Launch Privacy**: Use "under construction" banner or `robots.txt` to block search engines until official launch
- **Milestone Flow**: Complete milestone → Merge PR → Auto-deploy to sumbasunset.com → Smoke test → Move to next milestone
- **Official Launch**: Simply remove banner/unblock search engines (no technical deployment needed)

**Vercel Automatic CI/CD:**

- Push to `main` branch → Automatic deployment to sumbasunset.com
- Preview deployments for all pull requests (testing only, not milestone deployments)
- Automatic builds with Next.js optimization
- Edge network deployment worldwide
- Zero configuration required

---

## Pre-Launch Privacy Controls

Since we deploy to the live domain (sumbasunset.com) after each milestone, we need to control public visibility until official launch.

### Option 1: Under Construction Banner (Recommended)

Add a banner component that displays during pre-launch:

```typescript
// In root layout or header component
const isPreLaunch = process.env.NEXT_PUBLIC_PRE_LAUNCH === 'true';

{isPreLaunch && (
  <div className="bg-yellow-500 text-black text-center py-2 text-sm font-medium">
    🚧 Site under development - Official launch coming soon
  </div>
)}
```

**Environment Variable:**

```bash
# Add to Vercel environment variables
NEXT_PUBLIC_PRE_LAUNCH=true  # Set to 'false' on official launch day
```

**Pros:** Site is functional and testable, clear messaging to visitors, easy to toggle on/off

**Cons:** Site is still indexed by search engines (may want this for SEO head start)

### Option 2: Block Search Engines with robots.txt

Prevent search engine indexing until launch:

```txt
# public/robots.txt (during pre-launch)
User-agent: *
Disallow: /

# Sitemap: https://sumbasunset.com/sitemap.xml (uncomment on launch)
```

On launch day, update to:

```txt
# public/robots.txt (after launch)
User-agent: *
Allow: /

Sitemap: https://sumbasunset.com/sitemap.xml
```

**Pros:** Site not indexed by Google, full privacy during development

**Cons:** Delays SEO benefits, requires file change on launch day

### Recommended Approach

**Use both strategies:**

1. Block search engines with `robots.txt` (prevents indexing)
2. Show banner to visitors (clear messaging if someone finds the site)
3. On launch day:
   - Update `robots.txt` to allow indexing
   - Set `NEXT_PUBLIC_PRE_LAUNCH=false` in Vercel
   - Redeploy (or let auto-deploy handle it)

**Implementation Timeline:**

- **Milestone 2 (SS-4)**: Add banner component and `robots.txt` blocking
- **Milestone 8 (Launch)**: Remove banner and unblock search engines

---

## Domain Configuration

### Manual Setup Required

See [SS-3 Domain Configuration Task](../planning/ss-3-domain-configuration.md) for detailed steps:

#### 1. In Vercel Dashboard

- Add domain `sumbasunset.com` to project
- Vercel provides DNS records (A, CNAME, or nameservers)

#### 2. In Hostinger DNS Settings

- Update DNS records to point to Vercel
- Add A/CNAME records provided by Vercel
- OR update nameservers to Vercel's nameservers

#### 3. Wait for DNS Propagation

- Can take up to 48 hours
- Usually completes in 5-30 minutes
- Verify with `dig sumbasunset.com` or online DNS checkers

---

## CI/CD Pipeline

### Vercel Automatic Deployments (✅ ACTIVE)

Vercel provides built-in CI/CD:

#### On Push to `main`

- Automatic build triggered
- Runs `yarn build`
- Deploys to production
- SSL certificate auto-renewed

#### On Pull Request

- Creates preview deployment
- Unique URL for testing
- Comments PR with deployment link

#### Git Hooks (Local)

- Pre-commit: Type-check + lint-staged
- Pre-push: Full lint + format check
- All checks must pass before push succeeds

### Manual Deployment (if needed)

```bash
# Install Vercel CLI
yarn global add vercel

# Deploy manually
vercel --prod
```

---

## Deployment Checklist

### Per-Milestone Deployment (After Each Milestone)

Before merging PR to trigger deployment:

- [ ] All milestone tasks completed and checked off in planning doc
- [ ] Build succeeds locally: `yarn build`
- [ ] All tests pass: `yarn test`
- [ ] Type checking passes: `yarn type-check`
- [ ] Linting passes: `yarn lint`
- [ ] Feature branch tested locally
- [ ] Quality gates checklist completed in planning doc
- [ ] PR created with manual testing checklist
- [ ] User has reviewed and approved PR

After merge to main (auto-deploys to sumbasunset.com):

- [ ] Verify deployment succeeded (check Vercel dashboard)
- [ ] Run post-deployment smoke tests (see below)
- [ ] Update planning doc with deployment timestamp
- [ ] Verify no regressions in previously deployed features

### Final Deployment Checklist (Official Launch)

Additional checks before removing "under construction" and announcing:

- [ ] All 8 milestones completed and deployed
- [ ] All environment variables configured in Vercel dashboard
- [ ] Domain configured and DNS propagated
- [ ] SSL certificate active (automatic via Vercel)
- [ ] Twilio WhatsApp integration tested end-to-end
- [ ] Beds24 widget embedded and tested with real bookings
- [ ] All images optimized and uploaded to Vercel Blob
- [ ] Analytics configured (GA4, Sentry)
- [ ] Contact form tested end-to-end
- [ ] Performance audit completed (Lighthouse score > 90)
- [ ] Cross-browser testing completed (Chrome, Safari, Firefox)
- [ ] Mobile testing on real devices (iOS Safari, Android Chrome)
- [ ] Remove pre-launch banner or update `robots.txt`

---

## Post-Deployment Verification

### After Each Milestone Deployment

Quick smoke tests to verify deployment succeeded:

1. **Verify site loads**: Visit https://sumbasunset.com
2. **Verify SSL**: Confirm HTTPS and valid certificate (green padlock)
3. **Check console errors**: Open browser DevTools and verify no errors
4. **Test new features**: Verify milestone features work as expected
5. **Regression check**: Verify previous milestone features still work
6. **Mobile check**: Quick test on mobile device (if milestone affects mobile)
7. **Review Vercel logs**: Check for any deployment warnings or errors

### Comprehensive Verification (Final Launch)

Full end-to-end testing before official launch:

1. **Verify site loads**: Visit https://sumbasunset.com
2. **Test contact form**: Submit form and verify WhatsApp message received (+27 78 778 7591)
3. **Test booking widget**: Verify Beds24 widget loads and displays availability
4. **Check mobile experience**: Test on iOS Safari and Android Chrome
5. **Verify SSL**: Confirm HTTPS and valid certificate
6. **Test all pages**: Navigate through all routes (home, about, rooms, activities, contact)
7. **Check console errors**: Open browser DevTools and verify no errors
8. **Monitor analytics**: Confirm GA4 tracking events
9. **Test WhatsApp button**: Verify click-to-chat opens correctly
10. **Performance test**: Run Lighthouse audit (target: 90+ score)
11. **Cross-browser test**: Test in Chrome, Safari, Firefox
12. **Review Vercel logs**: Check for any deployment warnings or errors

---

## Rollback Procedure

If a deployment causes issues:

### Option 1: Rollback via Vercel Dashboard

1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click "Promote to Production"
4. Vercel will instantly switch traffic to previous version

### Option 2: Revert Git Commit

```bash
# Revert to previous commit
git revert HEAD

# Push revert commit
git push origin main

# Vercel will automatically deploy the reverted version
```

### Option 3: Emergency Rollback

```bash
# Using Vercel CLI
vercel rollback
```

---

## Monitoring & Alerts

### Uptime Monitoring (To Be Configured)

- Service: UptimeRobot
- Monitor: https://sumbasunset.com
- Alert on: Downtime > 5 minutes
- Notification: Email/SMS

### Error Tracking (To Be Configured)

- Service: Sentry
- Monitor: JavaScript errors, API failures
- Alert on: Error rate > 1%
- Notification: Email/Slack

### Performance Monitoring

- Service: Vercel Speed Insights (built-in)
- Monitor: Core Web Vitals, page load times
- Alert on: Performance degradation

---

## Troubleshooting Common Issues

### Build Fails

- Check Vercel build logs for errors
- Verify all dependencies in `package.json`
- Ensure environment variables are set correctly
- Test build locally: `yarn build`

### Domain Not Resolving

- Verify DNS records in Hostinger
- Check DNS propagation: `dig sumbasunset.com`
- Wait up to 48 hours for full propagation
- Verify domain added in Vercel dashboard

### Environment Variables Missing

- Check Vercel dashboard → Settings → Environment Variables
- Ensure variables are set for Production, Preview, and Development
- Redeploy after adding new variables

### Twilio WhatsApp Not Working

- Verify TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are correct
- Check Twilio console for error logs
- Ensure WhatsApp is enabled on Twilio number
- Verify STAFF_WHATSAPP_NUMBER format: `whatsapp:+27787787591`
- **Note**: Currently using dev number; update to staff number post-deployment

### Beds24 Widget Not Loading

- Verify BEDS24_PROP_KEY is correct
- Check Beds24 dashboard for property status
- Test widget in isolation (outside Next.js)
- Review browser console for CORS or network errors
