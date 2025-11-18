# Monitoring & Observability Runbook

This document provides guidance on monitoring the Sumba Sunset website, responding to alerts, and maintaining observability across all systems.

## Table of Contents

- [Monitoring Overview](#monitoring-overview)
- [Dashboard Links](#dashboard-links)
- [Alert Response](#alert-response)
- [Common Issues](#common-issues)
- [Metrics & KPIs](#metrics--kpis)
- [Troubleshooting](#troubleshooting)

---

## Monitoring Overview

The Sumba Sunset website uses a multi-layered monitoring approach:

### 1. Error Tracking (Sentry)

**Purpose:** Catch and track JavaScript errors, API errors, and performance issues

**What it monitors:**

- Client-side JavaScript errors
- Server-side Node.js errors
- API route failures
- Performance regressions
- User session replays (on error)

**Dashboard:** [Sentry Dashboard](https://sentry.io) (URL to be added after setup)

### 2. Analytics (Google Analytics 4)

**Purpose:** Understand user behavior and track conversions

**What it monitors:**

- Page views and navigation patterns
- Custom events (booking interactions, contact form submissions)
- Traffic sources and campaigns
- Device types (mobile vs desktop)
- Conversion rates

**Dashboard:** [Google Analytics 4](https://analytics.google.com) (URL to be added after setup)

### 3. Uptime Monitoring (UptimeRobot)

**Purpose:** Ensure website availability 24/7

**What it monitors:**

- Main site uptime (5-minute intervals)
- Response times
- SSL certificate validity
- HTTP status codes

**Dashboard:** [UptimeRobot Dashboard](https://uptimerobot.com/dashboard) (URL to be added after setup)

**Status Page:** [Public Status](https://stats.uptimerobot.com/) (URL to be added after setup)

### 4. Performance Monitoring (Vercel Analytics)

**Purpose:** Track Core Web Vitals and performance metrics

**What it monitors:**

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

**Dashboard:** [Vercel Analytics](https://vercel.com/dashboard/analytics)

---

## Dashboard Links

| Service          | Dashboard URL                                    | Purpose             | Update Frequency  |
| ---------------- | ------------------------------------------------ | ------------------- | ----------------- |
| Sentry           | TBD                                              | Error tracking      | Real-time         |
| Google Analytics | TBD                                              | User analytics      | Real-time + daily |
| UptimeRobot      | TBD                                              | Uptime monitoring   | 5 minutes         |
| Vercel Analytics | [Vercel Dashboard](https://vercel.com/dashboard) | Performance metrics | Real-time         |
| Vercel Logs      | [Vercel Logs](https://vercel.com/dashboard)      | Server logs         | Real-time         |

**Action Required:** Update this table with actual URLs after setting up each service.

---

## Alert Response

### Alert Priority Levels

#### 🚨 P0 - Critical (Respond Immediately)

- **Site Down:** Main website is unreachable
- **Payment Processing Failure:** Bookings cannot be completed
- **Database Connection Lost:** Data access issues

**Response Time:** < 15 minutes
**Action:** Immediate investigation and resolution

#### ⚠️ P1 - High (Respond within 1 hour)

- **Error Rate Spike:** > 5% error rate
- **Slow Response Times:** > 5 seconds
- **Critical Feature Broken:** Booking widget, contact form

**Response Time:** < 1 hour
**Action:** Investigate root cause and deploy fix

#### ⚡ P2 - Medium (Respond within 4 hours)

- **Performance Degradation:** Slow page loads
- **Non-Critical Error:** Minor UI bug
- **Analytics Tracking Issue:** Missing events

**Response Time:** < 4 hours
**Action:** Schedule fix for next deployment

#### 📊 P3 - Low (Respond within 24 hours)

- **Information Only:** Traffic spike, user behavior change
- **Maintenance Reminder:** SSL renewal, dependency updates

**Response Time:** < 24 hours
**Action:** Review and document

---

## Alert Response Procedures

### Site Down (P0)

1. **Verify Issue:**
   - Check [Vercel Status](https://vercel-status.com)
   - Test site from multiple locations/devices
   - Check DNS resolution: `dig sumbasunset.com`

2. **Identify Cause:**
   - Check Vercel deployment logs
   - Review recent changes in Git history
   - Check Sentry for error spikes

3. **Immediate Actions:**
   - If deployment issue: Roll back to previous deployment
   - If DNS issue: Verify Vercel nameservers
   - If SSL issue: Check certificate validity

4. **Resolution:**
   - Deploy fix or rollback
   - Verify site is accessible
   - Monitor for 15 minutes
   - Update status page
   - Post-mortem documentation

### Error Rate Spike (P1)

1. **Check Sentry Dashboard:**
   - Identify new error patterns
   - Review error frequency graph
   - Check affected user count

2. **Analyze Error:**
   - Read stack trace
   - Identify affected component/route
   - Check recent code changes

3. **Reproduce:**
   - Try to reproduce locally
   - Check browser console
   - Test in production (incognito)

4. **Resolution:**
   - Deploy hotfix if critical
   - Add additional error handling
   - Monitor error rate post-fix

### Performance Issues (P1-P2)

1. **Check Metrics:**
   - Vercel Analytics: Core Web Vitals
   - Google Analytics: Page load times
   - Sentry: Performance traces

2. **Identify Bottleneck:**
   - Large bundle size?
   - Slow API responses?
   - Unoptimized images?
   - Third-party scripts?

3. **Quick Wins:**
   - Enable caching
   - Optimize images
   - Defer non-critical scripts
   - Review Next.js build output

4. **Long-term Fixes:**
   - Code splitting
   - Lazy loading
   - Database query optimization
   - CDN configuration

---

## Common Issues

### 1. High Error Rate After Deployment

**Symptoms:** Sentry shows spike in errors immediately after deploy

**Cause:** New code introduced bugs

**Resolution:**

```bash
# Roll back to previous deployment
vercel rollback

# Or redeploy previous commit
git revert HEAD
git push
```

**Prevention:** Improve test coverage, staging environment testing

### 2. Analytics Not Tracking

**Symptoms:** No data in Google Analytics

**Possible Causes:**

- User declined cookie consent
- Running in development mode
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` not set
- Ad blocker enabled

**Resolution:**

- Check environment variables in Vercel
- Verify GA4 property ID is correct
- Test in production mode
- Check browser console for gtag errors

### 3. Slow Page Load Times

**Symptoms:** Vercel Analytics shows high LCP/FCP

**Common Causes:**

- Large unoptimized images
- Blocking third-party scripts
- Large JavaScript bundle
- Slow API responses

**Resolution:**

```bash
# Check bundle size
yarn build
# Review output for large chunks

# Analyze with source maps
yarn analyze

# Check image optimization
# Ensure all images use Next.js Image component
```

---

## Metrics & KPIs

### Performance Targets

| Metric                         | Target  | Warning | Critical |
| ------------------------------ | ------- | ------- | -------- |
| Homepage Load Time             | < 2s    | > 3s    | > 5s     |
| API Response Time              | < 500ms | > 1s    | > 2s     |
| Error Rate                     | < 0.1%  | > 1%    | > 5%     |
| Uptime                         | > 99.9% | < 99.9% | < 99%    |
| LCP (Largest Contentful Paint) | < 2.5s  | > 4s    | > 4s     |
| CLS (Cumulative Layout Shift)  | < 0.1   | > 0.25  | > 0.25   |
| FID (First Input Delay)        | < 100ms | > 300ms | > 300ms  |

### Business KPIs

| Metric                   | Target      | Dashboard        |
| ------------------------ | ----------- | ---------------- |
| Conversion Rate          | > 5%        | Google Analytics |
| Bounce Rate              | < 40%       | Google Analytics |
| Avg Session Duration     | > 2 min     | Google Analytics |
| Contact Form Submissions | Track trend | Google Analytics |
| Booking Widget Clicks    | Track trend | Google Analytics |

---

## Troubleshooting

### Check Service Health

```bash
# Check if site is reachable
curl -I https://sumbasunset.com

# Check DNS resolution
dig sumbasunset.com

# Check SSL certificate
openssl s_client -connect sumbasunset.com:443 -servername sumbasunset.com

# Check response time
time curl -w "@curl-format.txt" -o /dev/null -s https://sumbasunset.com
```

### Debug Sentry Issues

1. Check DSN is configured correctly
2. Verify error is actually thrown (add test error)
3. Check browser console for Sentry initialization
4. Review source maps are uploaded correctly

### Debug Analytics Issues

1. Check GA4 Measurement ID is correct
2. Verify user has accepted cookies
3. Test in production mode (GA4 disabled in dev)
4. Use GA4 DebugView for real-time debugging

### Check Environment Variables

```bash
# In Vercel CLI
vercel env ls

# Or in dashboard:
# https://vercel.com/your-team/sumba-sunset/settings/environment-variables
```

---

## Monthly Monitoring Tasks

### Week 1: Performance Review

- Review Vercel Analytics for trends
- Check Core Web Vitals scores
- Identify slow pages/routes
- Review bundle size changes

### Week 2: Error Review

- Review Sentry error trends
- Close resolved issues
- Prioritize recurring errors
- Update error handling

### Week 3: Analytics Review

- Review traffic trends
- Check conversion rates
- Analyze user behavior changes
- Review marketing campaign effectiveness

### Week 4: Uptime & Availability

- Review uptime statistics
- Check response time trends
- Update status page if needed
- Plan maintenance windows

---

## Contact & Escalation

### Alert Recipients

| Alert Type   | Primary | Secondary |
| ------------ | ------- | --------- |
| Site Down    | [Email] | [Email]   |
| Error Spikes | [Email] | [Email]   |
| Performance  | [Email] | [Email]   |
| Analytics    | [Email] | N/A       |

**Action Required:** Update with actual contact information

### Support Contacts

- **Vercel Support:** support@vercel.com
- **Sentry Support:** support@sentry.io
- **Google Analytics:** [Support](https://support.google.com/analytics)
- **UptimeRobot Support:** support@uptimerobot.com

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Google Analytics 4 Guide](https://support.google.com/analytics/answer/10089681)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [UptimeRobot Help](https://uptimerobot.com/help/)

---

**Last Updated:** 2025-01-18
**Maintained By:** Development Team
**Review Frequency:** Monthly
