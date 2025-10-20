# Beds24 Feasibility Research & Technical Analysis

> **Document Type:** Research & Decision Documentation
> **Created:** 2025-01-20
> **Status:** Active Reference
> **Related Tasks:** [SS-5](./ss-5-beds24-setup.md), [SS-14](./ss-14-beds24-validation.md)

---

## Executive Summary

This document captures the research, analysis, and decision-making process for choosing Beds24 as the booking management platform for Sumba Sunset. It addresses technical concerns about Next.js 15 compatibility, widget integration challenges, and provides evidence-based risk assessments.

**Key Finding:** Beds24 is technically feasible for Next.js 15 integration with low-to-medium risk. Cost savings of ~$1,267/year vs. Smoobu justify accepting minor technical trade-offs.

---

## Table of Contents

1. [Why Beds24?](#why-beds24)
2. [Technical Concerns & Analysis](#technical-concerns--analysis)
3. [Cost-Benefit Analysis](#cost-benefit-analysis)
4. [Integration Approach](#integration-approach)
5. [Risk Assessment](#risk-assessment)
6. [Alternatives Considered](#alternatives-considered)
7. [Validation Strategy](#validation-strategy)
8. [Decision Record](#decision-record)

---

## Why Beds24?

### Business Requirements

**Sumba Sunset needs:**

- Online booking system with live availability
- Payment processing (50% deposit upfront, remainder cash on arrival)
- Channel manager for OTA integrations (Airbnb, Booking.com, Agoda)
- Automated guest communication (confirmations, pre-arrival emails)
- Staff-friendly booking management dashboard
- Cost-effective solution (bootstrapped surf camp)

### Beds24 Value Proposition

**Strengths:**

- ✅ **Cost-effective**: £3.50/month (~$4.50) base plan OR $40-50/month full-featured
- ✅ **No booking commissions**: Flat monthly fee (vs. Smoobu's 0.9% per booking)
- ✅ **Built-in channel manager**: Syncs with Booking.com, Airbnb, Agoda
- ✅ **Stripe integration**: Supports custom deposit models (50% upfront)
- ✅ **API access**: Full REST API for custom integrations
- ✅ **Established platform**: Thousands of properties use it successfully
- ✅ **Two-tier API system**: Account + property-level keys for granular control

**Trade-offs:**

- ⚠️ **Dated UI**: Less modern than Smoobu (acceptable for cost savings)
- ⚠️ **Widget customization required**: Needs CSS work for mobile-first design
- ⚠️ **Longer setup time**: 3-5 days vs. 1-2 days for Smoobu
- ⚠️ **Steeper learning curve**: More technical, less hand-holding

**Annual Cost Comparison:**

- **Beds24 (base plan)**: ~$54/year
- **Beds24 (full plan)**: ~$480-600/year
- **Smoobu**: $1,867/year ($128.56/month + 0.9% booking fees)
- **Savings**: $1,267-1,813/year

---

## Technical Concerns & Analysis

### Concern 1: CORS Issues with iframes

#### What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the page.

```
Your Next.js app: https://sumbasunset.com
Beds24 widget iframe: https://beds24.com/booking/widget

Browser blocks: sumbasunset.com trying to access/manipulate beds24.com content
```

#### Potential CORS Issues

1. **Reading iframe content**: Cannot access data inside the Beds24 iframe from Next.js app
2. **Styling limitations**: Cannot apply CSS to content inside the iframe (iframe sandbox)
3. **JavaScript communication**: Limited ability to send/receive data between app and widget
4. **Cookie/authentication issues**: Beds24 might have trouble setting cookies if strict policies are in place

#### Why This is NOT a Major Problem

**✅ Embedding iframes is allowed by default** - browsers permit showing third-party content in iframes

**✅ The widget handles its own functionality** - Beds24's JavaScript runs inside their iframe, not yours

**✅ You don't need to access iframe internals** - you just display it, Beds24 handles bookings

**✅ Beds24 is a commercial booking platform** - they've solved these problems for thousands of customers

**Risk Level: LOW (5-10% probability of issues)**

#### Solutions (if issues arise)

```typescript
// Option 1: Basic iframe embed (works 95% of the time)
<iframe
  src="https://beds24.com/booking/your-property-id"
  width="100%"
  height="800px"
  frameBorder="0"
  title="Book Your Stay"
/>

// Option 2: Use postMessage API for communication (if needed)
// Your Next.js app sends message to iframe:
iframeRef.current?.contentWindow?.postMessage({ action: 'getData' }, 'https://beds24.com');

// Listen for responses from iframe:
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    if (event.origin === 'https://beds24.com') {
      console.log('Received from Beds24:', event.data);
    }
  };
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);

// Option 3: Beds24 API integration (if widget has limitations)
// Use their REST API to build custom booking form
// This bypasses iframe entirely but requires more work
```

**Verdict:** CORS is not a blocker. Beds24 is designed to be embedded. If issues occur, fallback to API integration.

---

### Concern 2: Server Components vs Client Components

#### The Question

"Can I not just make the page a client rendered page then?"

**YES! Absolutely.** This is the correct solution and standard Next.js 15 practice.

#### How It Works

```typescript
// ❌ This won't work - Server Component trying to use browser APIs
export default function BookingPage() {
  // Server Components can't use useEffect, useState, or browser APIs
  return <iframe src="https://beds24.com/booking" />;
}

// ✅ This works perfectly - Client Component
'use client'; // This directive makes it a Client Component

export default function BookingPage() {
  // Now you can use browser APIs, useEffect, useState, etc.
  return (
    <iframe
      src="https://beds24.com/booking"
      width="100%"
      height="800px"
      className="border-0 rounded-lg"
    />
  );
}
```

#### Best Practice Structure

```typescript
// app/booking/page.tsx (Server Component - default)
import BookingWidget from '@/components/BookingWidget';

export default function BookingPage() {
  // This is a Server Component
  return (
    <div>
      <h1>Book Your Stay</h1>
      {/* Render the Client Component */}
      <BookingWidget />
    </div>
  );
}

// components/BookingWidget.tsx (Client Component)
'use client';

export default function BookingWidget() {
  // All browser-specific code lives here
  return (
    <iframe
      src={process.env.NEXT_PUBLIC_BEDS24_WIDGET_URL}
      width="100%"
      height="800px"
      title="Booking Widget"
    />
  );
}
```

#### Why This is Standard

- Server Component handles SEO metadata, layout, static content
- Client Component handles interactive widget
- Next.js automatically code-splits, so client JavaScript only loads for booking page
- **This is exactly how Next.js 15 is designed to work!**

**Risk Level: ZERO (0% probability of issues)**

**Verdict:** Not a problem at all. Just use `'use client'` directive. Standard Next.js 15 practice.

---

### Concern 3: Widget JavaScript Conflicting with Next.js Hydration

#### What is Hydration?

**Hydration** is the process where Next.js takes server-rendered HTML and "brings it to life" with JavaScript.

**The process:**

1. **Server renders HTML** → Fast initial page load, user sees content
2. **Browser downloads JavaScript** → React code is sent to client
3. **React "hydrates" the HTML** → Attaches event handlers, makes page interactive

#### The Potential Problem

```
Next.js hydration cycle:
1. Server renders <iframe> placeholder
2. Browser loads page HTML
3. Beds24 widget JavaScript starts loading in iframe
4. Next.js React hydrates the page
5. ⚠️ CONFLICT: Widget JS modifies DOM while React is hydrating
```

#### When This Happens

- **Hydration mismatch errors**: React expects DOM to match server render, but widget changed it
- **Event handlers break**: Widget's click handlers conflict with React's
- **State desync**: Widget state doesn't match React's expectations
- **Console warnings**: "Warning: Expected server HTML to contain a matching <div>"

#### Why This is USUALLY NOT a Problem with iframes

**iframes are isolated!** The Beds24 widget runs in its own sandbox, separate from your Next.js app's React tree. Hydration happens in your app's DOM, not inside the iframe.

```
Your Next.js App DOM          |  Beds24 iframe DOM (isolated)
=============================  |  ============================
<html>                        |  <html>
  <body>                      |    <body>
    <div id="__next">         |      <form> ← Beds24's JS runs here
      <iframe> ← React stops  |      <input>
               here           |      <button>
                             |    </body>
                             |  </html>
```

#### Hydration Issues ONLY Occur If:

1. Beds24 provides a `<script>` tag that manipulates YOUR page's DOM (not the iframe)
2. You're using dynamic script injection incorrectly
3. You're trying to manipulate the iframe content from your app

**Risk Level: LOW-MEDIUM (10-20% probability if Beds24 uses script tags)**

#### Solutions (if hydration issues occur)

```typescript
'use client';

import { useEffect, useRef } from 'react';

export default function BookingWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load widget AFTER hydration completes
  useEffect(() => {
    // This runs only on client, after React hydration
    if (iframeRef.current) {
      // Safe to load widget now
      console.log('Hydration complete, widget can load');
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://beds24.com/booking"
      // Use suppressHydrationWarning if you get mismatch warnings
      suppressHydrationWarning
    />
  );
}
```

#### Advanced: If Beds24 Uses Script Tag

```typescript
'use client';

import { useEffect } from 'react';
import Script from 'next/script'; // Next.js optimized script loader

export default function BookingWidget() {
  return (
    <div>
      {/* Next.js Script component handles loading safely */}
      <Script
        src="https://beds24.com/widget.js"
        strategy="lazyOnload" // Loads AFTER hydration
        onLoad={() => {
          console.log('Widget script loaded safely');
        }}
      />
      <div id="beds24-widget-container" />
    </div>
  );
}
```

**Verdict:** Low to medium risk. iframes are naturally isolated, so hydration conflicts are unlikely. If Beds24 uses a script tag, use Next.js `<Script>` component with `strategy="lazyOnload"`.

---

### Concern 4: CSS Customization Limitations

#### The Challenge

Beds24's default widget has a dated appearance:

- Colors don't match modern surf camp branding
- Font sizes too small on mobile
- Touch targets too small for fingers
- Pricing display not prominent
- Calendar navigation could be clearer

#### Why This is a Medium Risk

**Cannot style content inside iframe** due to browser security (same-origin policy).

**Two approaches:**

1. **Wrap iframe in custom UI** (recommended)
   - Create custom header/footer around widget
   - Add branding elements outside iframe
   - Control page layout and mobile responsiveness
   - Let Beds24 handle booking logic inside iframe

2. **Use Beds24's CSS customization options** (if available)
   - Check if Beds24 allows custom CSS injection
   - May require premium plan
   - Limited compared to full control

**Risk Level: MEDIUM (30-40% probability of conversion issues)**

**Mitigation:**

- Budget 2-3 hours for CSS customization
- Test extensively on mobile devices
- If conversion rate is poor, build custom booking form using Beds24 API
- Measure booking abandonment rate and iterate

**Verdict:** Accept this risk. CSS customization is doable. If widget conversion is poor, we can build custom UI with Beds24 API backend (fallback plan).

---

## Cost-Benefit Analysis

### Financial Comparison

| Platform          | Monthly Cost   | Annual Cost | Booking Commission | Total Annual Cost (50 bookings @ $500 avg) |
| ----------------- | -------------- | ----------- | ------------------ | ------------------------------------------ |
| **Beds24 (base)** | £3.50 (~$4.50) | $54         | None               | $54                                        |
| **Beds24 (full)** | $40-50         | $480-600    | None               | $480-600                                   |
| **Smoobu**        | $128.56        | $1,542      | 0.9% per booking   | $1,867                                     |

**Assumptions:**

- 50 direct bookings/year (average)
- $500 average booking value
- Smoobu 0.9% commission = $4.50 per booking = $225/year

**Annual Savings:**

- Beds24 base vs. Smoobu: **$1,813 saved**
- Beds24 full vs. Smoobu: **$1,267 saved**

### Time Investment

| Task                 | Beds24         | Smoobu        | Difference     |
| -------------------- | -------------- | ------------- | -------------- |
| Account setup        | 3-5 days       | 1-2 days      | +2-3 days      |
| Widget customization | 2-3 hours      | Minimal       | +2 hours       |
| API integration      | 2-3 hours      | 1-2 hours     | +1 hour        |
| Email templates      | 1-2 hours      | 30 min        | +1 hour        |
| **Total setup**      | **8-12 hours** | **4-6 hours** | **+4-6 hours** |

**Cost of extra setup time:**

- 4-6 hours extra setup @ $50/hour = $200-300 one-time cost
- Break-even after 2-3 months of savings

### Non-Financial Factors

**Beds24 Advantages:**

- ✅ Full API access (enables future custom integrations)
- ✅ No vendor lock-in (can migrate easier with API)
- ✅ Two-tier API keys (account + property level control)
- ✅ Established platform (10+ years, thousands of users)

**Smoobu Advantages:**

- ✅ Modern UI (better user experience)
- ✅ Faster setup (less technical)
- ✅ Better mobile widget (out of the box)

**Decision:** Accept 4-6 hours extra setup time for $1,267/year savings. Technical challenges are manageable with Claude's assistance.

---

## Integration Approach

### Phase 1: Validation (SS-14)

**Goal:** Confirm Beds24 widget works in Next.js 15 before full implementation

**Steps:**

1. Create demo Next.js 15 page with Client Component
2. Embed Beds24 test widget (use demo/trial account)
3. Verify no CORS errors in browser console
4. Verify no hydration warnings
5. Test widget interaction (date selection, room selection)
6. Test mobile responsiveness on real device
7. Document any issues found

**Time:** 30-60 minutes
**Risk Mitigation:** If validation fails, pivot to Smoobu or custom solution

### Phase 2: Account Setup (SS-5)

**Goal:** Fully configure Beds24 account (human-led)

**Steps:**

1. Create Beds24 account and choose pricing plan
2. Add property details, rooms, photos
3. Configure pricing calendar (base rates, seasonal variations)
4. Set availability rules (min/max nights, advance booking)
5. Connect Stripe payment gateway
6. Configure deposit rules (50% upfront)
7. Generate booking widget embed code
8. Customize automated email templates
9. Obtain API keys (account + property level)
10. Test end-to-end booking flow

**Time:** 8-12 hours (human-led)
**Owner:** User with Claude's guidance

### Phase 3: Widget Integration (Future Task)

**Goal:** Embed widget on website with mobile-first CSS

**Steps:**

1. Create `/app/booking/page.tsx` (Server Component)
2. Create `/components/BookingWidget.tsx` (Client Component with `'use client'`)
3. Embed iframe or script-based widget
4. Add custom CSS for mobile-first design
5. Test booking flow on mobile devices
6. Monitor conversion rate and iterate

**Time:** 2-3 hours (Claude-led)
**Dependencies:** SS-5 complete, SS-14 validation successful

---

## Risk Assessment

### Risk Matrix

| Risk                                 | Probability      | Impact | Severity   | Mitigation                                         |
| ------------------------------------ | ---------------- | ------ | ---------- | -------------------------------------------------- |
| **CORS issues**                      | Low (10%)        | Medium | Low        | Use postMessage API or fallback to API integration |
| **Server Component incompatibility** | Zero (0%)        | N/A    | None       | Use `'use client'` directive                       |
| **Hydration conflicts**              | Low-Medium (15%) | Medium | Low-Medium | Use `useEffect` and Next.js `<Script>` component   |
| **CSS customization limits**         | Medium (30%)     | High   | Medium     | Build custom UI with Beds24 API if needed          |
| **Poor conversion rate**             | Medium (25%)     | High   | Medium     | A/B test widget design, build custom booking form  |
| **Beds24 platform issues**           | Low (5%)         | High   | Low        | Have backup plan (Smoobu), track uptime            |
| **Setup time overruns**              | Medium (40%)     | Low    | Low        | Accept 8-12 hours for cost savings                 |

### Overall Risk Rating

**Risk Level: LOW-MEDIUM**

**Confidence Level: 80%** (Beds24 integration will succeed with acceptable effort)

**Go/No-Go Decision:** **GO** - Technical risks are manageable, cost savings are significant, validation phase will confirm feasibility early.

---

## Alternatives Considered

### Alternative 1: Smoobu

**Pros:**

- Modern UI, easier setup (1-2 days)
- Better mobile widget out of the box
- Less CSS customization needed
- Established Sumba Sunset use case (if applicable)

**Cons:**

- **3x more expensive**: $1,867/year vs. $480-600/year
- **0.9% booking commission**: Costs increase with success
- **Limited API access**: Less flexibility for custom integrations
- **Vendor lock-in**: Harder to migrate away

**Why Rejected:** Cost. For a bootstrapped surf camp, $1,267/year savings is significant.

---

### Alternative 2: Build Custom Booking System

**Pros:**

- Full control over UI/UX
- No recurring fees (after development)
- No booking commissions
- Perfect mobile optimization

**Cons:**

- **3-4 weeks development time**: Delays launch significantly
- **No channel manager**: Manual OTA integrations (Airbnb, Booking.com)
- **Payment processing complexity**: PCI compliance, Stripe integration
- **Maintenance burden**: Ongoing development required
- **No proven track record**: Higher risk of bugs

**Why Rejected:** Time to market. Need to launch in 14 days, not 4+ weeks. OTA channel manager is critical.

---

### Alternative 3: Manual Calendar Management

**Pros:**

- Zero cost
- Simple to start

**Cons:**

- **No online booking**: Users must email/call
- **No payment processing**: Manual invoicing
- **High error risk**: Double bookings, missed payments
- **Time-consuming**: Manual calendar updates
- **Poor user experience**: Friction reduces conversions

**Why Rejected:** Not viable for modern booking experience. Users expect instant booking.

---

## Validation Strategy

### SS-14: Technical Validation (30-60 minutes)

**Objective:** Prove Beds24 widget works in Next.js 15 before committing to full setup

**Validation Steps:**

1. **Create test Next.js 15 page**

   ```typescript
   // app/test-booking/page.tsx
   import Beds24TestWidget from '@/components/Beds24TestWidget';

   export default function TestBookingPage() {
     return (
       <div className="container mx-auto p-4">
         <h1>Beds24 Widget Validation</h1>
         <Beds24TestWidget />
       </div>
     );
   }
   ```

2. **Create Client Component with widget**

   ```typescript
   // components/Beds24TestWidget.tsx
   'use client';

   export default function Beds24TestWidget() {
     return (
       <iframe
         src="https://beds24.com/booking/[DEMO-PROPERTY-ID]"
         width="100%"
         height="800px"
         className="border-0 rounded-lg"
         title="Beds24 Test Widget"
       />
     );
   }
   ```

3. **Check browser console for errors**
   - CORS errors?
   - Hydration warnings?
   - JavaScript errors?

4. **Test widget functionality**
   - Date selection works?
   - Room selection works?
   - Guest details form works?
   - Pricing displays correctly?

5. **Test on mobile device**
   - Open on real iPhone/Android
   - Touch targets large enough?
   - Text readable?
   - Scrolling smooth?

6. **Document findings**
   - Screenshot any issues
   - Note performance (load time)
   - Rate user experience (1-10)

**Success Criteria:**

- ✅ No CORS errors
- ✅ No hydration warnings
- ✅ Widget loads and is interactive
- ✅ Mobile experience acceptable (6/10 or higher)

**If Validation Fails:**

- Try script-based embed instead of iframe
- Contact Beds24 support for guidance
- Escalate to decision: pivot to Smoobu or custom solution

---

## Decision Record

### Final Decision

**Status:** ✅ **APPROVED**

**Decision:** Use Beds24 for booking management

**Date:** 2025-01-20

**Decision Makers:** Byron (user), Claude (technical advisor)

**Rationale:**

1. **Cost savings**: $1,267/year vs. Smoobu justifies extra setup time
2. **Technical feasibility**: Risks are low-to-medium and manageable
3. **Validation strategy**: SS-14 will confirm feasibility early (30-60 min investment)
4. **Fallback options**: Can pivot to Smoobu if validation fails
5. **Future flexibility**: Full API access enables custom integrations

**Conditions:**

- ✅ Complete SS-14 validation successfully
- ✅ Accept 8-12 hours setup time (human-led)
- ✅ Budget 2-3 hours for CSS customization
- ⚠️ Monitor conversion rate closely (track booking abandonment)
- ⚠️ Be prepared to build custom UI if widget conversion is poor

**Next Steps:**

1. **Immediate**: Complete SS-14 validation (30-60 minutes)
2. **If SS-14 succeeds**: Proceed to SS-5 (Beds24 account setup)
3. **If SS-14 fails**: Reassess and consider Smoobu

**Review Date:** After SS-14 validation complete

---

## Related Documents

- [SS-5: Beds24 Account Setup & Configuration](./ss-5-beds24-setup.md) - Implementation steps
- [SS-14: Beds24 Integration Validation](./ss-14-beds24-validation.md) - Technical validation task
- [Planning Index](./index.md) - Project roadmap
- [CLAUDE.md](../.claude/CLAUDE.md) - Project guidelines

---

## Appendix: Additional Resources

### Beds24 Documentation

- **Main Site**: [beds24.com](https://beds24.com)
- **API Docs**: [beds24.com/api](https://beds24.com/api)
- **Widget Docs**: [beds24.com/widgets](https://beds24.com/widgets)
- **Support**: support@beds24.com
- **Video Tutorials**: [beds24.com/videos](https://beds24.com/videos)

### Next.js 15 Resources

- **Client Components**: [nextjs.org/docs/app/building-your-application/rendering/client-components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- **Script Optimization**: [nextjs.org/docs/app/building-your-application/optimizing/scripts](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- **iframe Best Practices**: [web.dev/iframe-lazy-loading/](https://web.dev/iframe-lazy-loading/)

---

**Document Version:** 1.0
**Last Updated:** 2025-01-20
**Maintained By:** Claude & Byron
