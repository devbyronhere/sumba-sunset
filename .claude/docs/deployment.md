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
STAFF_WHATSAPP_NUMBER=whatsapp:+1234567890     # Staff number TBD

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

Vercel provides automatic CI/CD:

- Push to `main` branch → Automatic deployment
- Preview deployments for all pull requests
- Automatic builds with Next.js optimization
- Edge network deployment worldwide
- Zero configuration required

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

Before deploying to production, ensure:

- [ ] All environment variables configured in Vercel dashboard
- [ ] Domain configured and DNS propagated
- [ ] SSL certificate active (automatic via Vercel)
- [ ] Build succeeds locally: `yarn build`
- [ ] All tests pass: `yarn test`
- [ ] Type checking passes: `yarn type-check`
- [ ] Linting passes: `yarn lint`
- [ ] Twilio WhatsApp integration tested
- [ ] Beds24 widget embedded and tested
- [ ] Images optimized and uploaded to Vercel Blob
- [ ] Analytics configured (GA4, Sentry)
- [ ] Contact form tested end-to-end

---

## Post-Deployment Verification

After deploying to production:

1. **Verify site loads**: Visit https://sumbasunset.com
2. **Test contact form**: Submit form and verify WhatsApp message received
3. **Test booking widget**: Verify Beds24 widget loads and displays availability
4. **Check mobile experience**: Test on iOS Safari and Android Chrome
5. **Verify SSL**: Confirm HTTPS and valid certificate
6. **Test all pages**: Navigate through all routes (home, about, rooms, activities, contact)
7. **Check console errors**: Open browser DevTools and verify no errors
8. **Monitor analytics**: Confirm GA4 tracking events
9. **Test WhatsApp button**: Verify click-to-chat opens correctly
10. **Review Vercel logs**: Check for any deployment warnings or errors

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
- Verify STAFF_WHATSAPP_NUMBER format: `whatsapp:+1234567890`

### Beds24 Widget Not Loading

- Verify BEDS24_PROP_KEY is correct
- Check Beds24 dashboard for property status
- Test widget in isolation (outside Next.js)
- Review browser console for CORS or network errors
