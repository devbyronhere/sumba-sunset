---
task_id: ss-11
title: '[Infrastructure] Beds24 Account Setup & Configuration'
status: in_progress
priority: high
estimated_time: '8-12 hours'
actual_time: null
dependencies: [ss-4, ss-10]
created: 2025-01-19
started: 2025-01-18
completed: null
related_docs: ['beds24-feasibility-research.md', 'beds24-email-templates.md']
infra_type: configuration
branch: ss-11/infra/beds24-setup
currency_decision: IDR
currency_rationale: 'Using Indonesian Rupiah (IDR) as primary currency. Property is in Indonesia, aligns with local operations. SS-16 will handle adding real room details when property owner provides information.'
---

[← Previous: SS-10 Beds24 Validation](./ss-10-beds24-validation.md) | [📋 Index](./index.md) | [Next: SS-12 Beds24 Widget Integration →](./ss-12-beds24-widget-integration.md)

# [Infrastructure] Beds24 Account Setup & Configuration

## Overview

Create and fully configure a Beds24 account for booking management, including property setup, pricing rules, availability calendar, payment gateway (offline for now), and widget generation.

**Infrastructure Type:** Configuration (Third-party Service)
**Impact:** Enables booking functionality for Sumba Sunset website
**Risk Level:** Medium (paid service, requires significant configuration time)

**⚠️ IMPORTANT: Read First**

- 📋 [Beds24 Feasibility Research](./beds24-feasibility-research.md) - Read this first to understand technical risks, cost-benefit analysis, and why we chose Beds24
- This document contains **ONLY implementation steps**
- All "why" and "what if" analysis is in the feasibility research doc

**Configuration Components:**

1. **Account Setup** - Create Beds24 account, choose pricing plan
2. **Property Configuration** - Add property details, rooms, capacity
3. **Pricing System** - Base rates, seasonal pricing, weekend rates
4. **Availability Rules** - Min/max nights, advance booking, buffer days
5. **Payment Gateway** - Connect offline payments for noew, configure deposit rules
6. **Booking Widget** - Generate embed code, test functionality
7. **Email Automation** - Booking confirmation, pre-arrival, check-in, post-stay
8. **API Keys** - Obtain account + property keys for integration

**✅ Currency Decision:** Beds24 configured with Indonesian Rupiah (IDR) as primary currency. **SS-16 (Add Real Room Info)** will handle replacing mock room data with actual room details when property owner provides information.

---

## Prerequisites/Dependencies

- [x] SS-5: Credentials setup document exists
- [x] Budget approved for Beds24 ($40-50/month for 9-room property)
- [x] Property details uploaded using dummy rooms
- [x] Pricing strategy defined (base rate only)
- [x] Business dummy/dev email for Beds24 account = devbyronhere@gmail.com

---

## Acceptance Criteria

- [x] **AC1**: Beds24 account created and plan selected ✅ (Fixed rate pricing plan)
- [x] **AC2**: Property added with complete details (name, address, description, photos) ✅ (Using test property for now)
- [x] **AC3**: Room types configured with capacity and amenities ✅ (2 test rooms added, awaiting real room info)
- [x] **AC4**: Pricing calendar set up with base rates ✅ (Fixed rate, no seasonal variations)
- [x] **AC5**: Availability rules configured ✅ (No min/max nights or buffer days)
- [x] **AC6**: Offline payment method coniguration
- [x] **AC7**: Deposit payment model configured (50% upfront)
- [x] **AC8**: Booking widget generated and embed code obtained ✅
- [x] **AC9**: Widget tested on test page ✅
- [x] **AC10**: Automated email templates (using defaults) ✅
- [x] **AC11**: Test booking completed end-to-end ✅ (Email confirmation received)
- [x] **AC12**: Account-level API key obtained ✅
- [x] **AC13**: Property-level API key obtained ✅
- [x] **AC14**: API keys added to `.env.local` ✅ (BEDS24_API_KEY, BEDS24_PROP_KEY, NEXT_PUBLIC_BEDS24_WIDGET_ID)

---

## Implementation Steps

### Phase 1: Account Creation (USER - 1 hour) ✅ COMPLETED

- [x] **Step 1.1**: Visit [beds24.com](https://beds24.com) and create account ✅
  - Click "Sign Up" or "Create Account"
  - Fill in business details:
    - Business name: "Sumba Sunset Surf Camp"
    - Email: Your business email
    - Password: Strong password (store in password manager)
    - Country: Indonesia

- [x] **Step 1.2**: Verify email address ✅

- [x] **Step 1.3**: Choose pricing plan ✅ (Fixed rate plan selected):
  - Research available plans at beds24.com/pricing
  - Check features included:
    - Number of properties supported
    - Number of rooms supported (9 rooms for Sumba Sunset)
    - Channel connections allowed
    - API access included?
    - Support level
  - **For 9-room property**: $40-50/month plan required
  - **Features needed**:
    - Channel manager for OTA integrations
    - Full API access
    - Automated email templates
    - Payment gateway integration (offline for now)
  - Document plan choice and features included

- [x] **Step 1.4**: Complete account profile ✅
  - Company information:
    - Business name: "Sumba Sunset Surf Camp"
    - Address: Sumba, Indonesia
    - Phone number
    - Tax ID (if applicable in Indonesia)
  - **Time zone**: Asia/Makassar (WITA) - CRITICAL for Sumba
  - **Default currency**: IDR (Indonesian Rupiah) ✅
  - **Language**: English

- [x] **Step 1.5**: Set up billing information ✅

**Checkpoint:** Account created, plan activated ✅

---

### Phase 2: Property Configuration (USER - 2-3 hours) ✅ COMPLETED (Using test data)

- [x] **Step 2.1**: Add new property ✅
  - Navigate to: Dashboard → Properties → Add Property
  - Property name: "Sumba Sunset Surf Camp"
  - Address: [Full Sumba, Indonesia address]
  - Property type: Guest House / Surf Camp
  - GPS coordinates: [Latitude, Longitude] (for map display)
  - Currency: IDR (Indonesian Rupiah) ✅

- [x] **Step 2.2**: Upload property photos ✅ (Using test photos - **SS-16 will add real photos**)

- [x] **Step 2.3**: Write property description ✅ (Using test description - **SS-16 will add real copy**)

- [x] **Step 2.4**: Configure rooms/accommodation ✅ (2 test rooms added - **SS-16 will add real room details**)
  - Currently using mock room data
  - Awaiting property owner to provide:
    - Real room names, types, and quantities
    - Actual capacity and bed configurations
    - Real amenities per room
    - Actual room photos
    - Real pricing in IDR

- [x] **Step 2.5**: Set property-level amenities ✅ (Using test amenities - **SS-16 will add real amenities**)

- [x] **Step 2.6**: Set house rules ✅ (Using test rules - **SS-16 will add real house rules**)

**Checkpoint:** Property configured with test data ✅ (Real data will be added in SS-16)

---

### Phase 3: Pricing Setup (USER - 2-3 hours) ✅ COMPLETED (Fixed rate plan)

- [x] **Step 3.1**: Set base rates per room type ✅
  - Navigate to: Property → Prices
  - Fixed rate pricing plan selected (no seasonal variations)
  - Using test pricing in IDR - **SS-16 will add real pricing**
  - Set date range: Next 12 months
  - Document pricing strategy

- [x] **Step 3.2**: Set up seasonal pricing ✅ (SKIPPED - Using fixed rate plan, no seasonal variations)

- [x] **Step 3.3**: Configure weekend pricing ✅ (SKIPPED - Not needed for surf camp)

- [x] **Step 3.4**: Set minimum stay requirements ✅ (No min/max nights configured)
  - Navigate to: Property → Booking Rules
  - **No minimum stay** requirements set
  - **No maximum stay** limits

- [x] **Step 3.5**: Configure advance booking rules ✅
  - Bookings open 12 months in advance
  - Same day bookings allowed

- [x] **Step 3.6**: Add buffer days ✅ (No buffer days - back-to-back bookings OK)

- [x] **Step 3.7**: Block closed dates ✅ (None currently blocked)

**Checkpoint:** Pricing calendar configured with fixed rates ✅

---

### Phase 4: Widget Generation & Customization (USER - 2-3 hours) ✅ COMPLETED

- [x] **Step 5.1**: Generate booking widget ✅
  - Navigate to: Widgets → Create New Widget
  - Widget generated and configured
  - Language: English
  - Currency: IDR (Indonesian Rupiah) ✅
  - Show prices: Yes
  - Show availability: Yes
  - Widget ID stored in `NEXT_PUBLIC_BEDS24_WIDGET_ID`

- [x] **Step 5.2**: Get embed code ✅
  - Widget ID obtained and added to environment variables
  - Widget tested on test page

- [x] **Step 5.3**: Test widget in Beds24 preview ✅
  - Widget tested and working
  - Booking flow functional
  - Pricing displays correctly in IDR

- [x] **Step 5.4**: Test on actual devices ✅
  - Widget tested on test page
  - Basic functionality verified

- [x] **Step 5.5**: Identify CSS customization needs ✅
  - CSS customization will be handled in SS-15

  **Visual Issues with Default Widget:**
  - Colors don't match Sumba Sunset brand
  - Font sizes too small on mobile
  - Touch targets too small for fingers
  - Pricing display not clear
  - Calendar navigation confusing

  **CSS Customization Needed (Done in SS-10):**
  - Brand colors: Sunset oranges, ocean blues
  - Mobile-first responsive design
  - Larger touch targets (48x48px minimum)
  - Clear pricing display
  - Smooth animations
  - Loading states

  **Example CSS Customizations (Reference for SS-10)**:

  ```css
  /* Match brand colors */
  .beds24-widget {
    --primary-color: #ff6b35; /* Sunset orange */
    --secondary-color: #004e89; /* Ocean blue */
    --accent-color: #f7b801; /* Golden hour */
  }

  /* Mobile-first typography */
  .beds24-calendar {
    font-size: 16px; /* Minimum for mobile readability */
  }

  /* Touch-friendly buttons */
  .beds24-button {
    min-height: 48px;
    min-width: 48px;
    padding: 12px 24px;
  }

  /* Pricing clarity */
  .beds24-price {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-color);
  }
  ```

  - Document all needed customizations
  - Note: Actual CSS work happens in SS-10

**Checkpoint:** Widget generated and tested in preview

---

### Phase 5: Email Template Customization (USER - 1-2 hours) ✅ COMPLETED (Using defaults)

Beds24 provides basic templates. Currently using default templates.

- [x] **Step 6.1**: Email templates configured ✅ (Using Beds24 defaults)
  - **Booking confirmation**: Email sent immediately after booking ✅
  - **Pre-arrival**: Default template (customization guidance in [beds24-email-templates.md](beds24-email-templates.md))
  - **Check-in**: Default template
  - **Post-stay**: Default template
  - Test booking completed successfully - emails received by both guest and property manager ✅

**Note:** See [beds24-email-templates.md](beds24-email-templates.md) for details on default templates and how to customize them in the future.

**Checkpoint:** Email automation working with default templates ✅

---

### Phase 6: API Keys & Integration Prep (USER - 30 minutes) ✅ COMPLETED

- [x] **Step 7.1**: Obtain account-level API key ✅
  - Navigate to: Account → Settings → API
  - API key obtained
  - Stored in `BEDS24_API_KEY`

- [x] **Step 7.2**: Obtain property-level API key ✅
  - Navigate to: Property → Settings → API Key
  - Property key obtained
  - Stored in `BEDS24_PROP_KEY`

- [x] **Step 7.3**: Add keys to `.env.local` ✅

  ```bash
  BEDS24_API_KEY=your_account_level_key_here
  BEDS24_PROP_KEY=your_property_level_key_here
  NEXT_PUBLIC_BEDS24_WIDGET_ID=your_widget_id_here
  ```

- [x] **Step 7.4**: Verify `.env.local` is gitignored ✅
  - `.env.local` is properly gitignored

- [x] **Step 7.5**: Test API keys work ✅
  - Widget tested successfully on test page
  - Booking flow working end-to-end

**Checkpoint:** API keys obtained and stored securely ✅

---

---

## Troubleshooting

### Common Issues

#### Issue: Widget not loading

**Symptoms:** Empty space where widget should be

**Solutions:**

1. Check embed code is correct
2. Verify property is published in Beds24
3. Check for JavaScript errors in browser console
4. Ensure no Content Security Policy blocking iframe
5. Test in different browser

#### Issue: Email not sending

**Symptoms:** Guest doesn't receive confirmation

**Solutions:**

1. Check spam/junk folder
2. Verify email trigger is enabled
3. Test send to your own email
4. Check Beds24 email log: Settings → Email Log
5. Verify guest email address was entered correctly
6. Check email template has no syntax errors

#### Issue: Calendar not updating

**Symptoms:** Availability not reflecting bookings

**Solutions:**

1. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check booking was saved (view in bookings list)
3. Verify room type mapped correctly
4. Check no availability rules blocking dates
5. Contact Beds24 support if persistent

#### Issue: Double booking

**Symptoms:** Same room booked twice for overlapping dates

**Solutions:**

1. Check if buffer days are set up correctly
2. Verify room quantities are correct
3. Ensure channel sync is working (if using OTAs)
4. Manually block dates if needed
5. Contact affected guests immediately

#### Issue: Widget looks broken on mobile

**Symptoms:** Layout issues, text too small, buttons not tappable

**Solutions:**

1. This is expected - default widget is not mobile-optimized
2. Wait for SS-10 (widget CSS customization)
3. Or: Add quick CSS fixes:
   ```css
   @media (max-width: 768px) {
     .beds24-widget {
       font-size: 14px;
     }
     .beds24-button {
       min-height: 44px;
     }
   }
   ```

### Getting Help

**Beds24 Support:**

- Email: support@beds24.com
- Documentation: beds24.com/docs
- Video tutorials: beds24.com/videos
- Community forum: forum.beds24.com
- Response time: 24-48 hours (email)

**When to Contact Support:**

- Payment gateway issues
- API connection problems
- Channel manager sync errors
- Technical bugs
- Feature questions

**Before Contacting Support:**

1. Check documentation first
2. Search community forum
3. Try troubleshooting steps above
4. Prepare details:
   - Property ID
   - Booking ID (if applicable)
   - Screenshots of error
   - Steps to reproduce

---

## Best Practices & Security

### Optimization Tips

1. **Mobile-First Testing**
   - Always test on real mobile device (not just browser resize)
   - Primary users will book on phones
   - Widget customization is critical (SS-10)

2. **Pricing Strategy**
   - Research competitor prices in Sumba
   - Set competitive rates for direct bookings
   - Consider OTA pricing (usually 15-20% higher to cover commissions)
   - Review and adjust seasonally

3. **Guest Communication**
   - Respond quickly to inquiries (within 2 hours ideal)
   - Set up WhatsApp Business for quick responses
   - Automate FAQs where possible
   - Be friendly and helpful (surf vibe!)

4. **Calendar Management**
   - Update availability daily
   - Block maintenance dates in advance
   - Use buffer days if you need cleaning time
   - Mark external bookings immediately

5. **Photo Updates**
   - Refresh photos annually
   - Add new photos of improvements
   - Seasonal photos (dry season vs. wet season)
   - Guest photos (with permission) show real experience

6. **Review Management**
   - Request reviews from happy guests
   - Respond to all reviews (positive and negative)
   - Address issues mentioned in negative reviews
   - Showcase best reviews on website

### Security

1. **API Keys**
   - Never commit to git
   - Store only in `.env.local` (local) and Vercel Dashboard (production)
   - Rotate keys annually or if compromised
   - Don't share in Slack/email/Discord

2. **Guest Data**
   - GDPR compliance (even in Indonesia, good practice)
   - Store only necessary data
   - Delete old booking data periodically

3. **Access Control**
   - Use strong password for Beds24 account
   - Enable two-factor authentication if available
   - Limit staff access to what they need
   - Log out of shared devices

---

## Quick Reference

### Key URLs

- Beds24 Dashboard: beds24.com/control3.php
- API Documentation: beds24.com/api
- Support: support@beds24.com
- Video Tutorials: beds24.com/videos

### Important Settings Locations

- Property Details: Dashboard → Properties → [Your Property]
- Pricing: Property → Calendar → Prices
- Booking Rules: Property → Booking Rules
- Payment Gateway: Settings → Payments → Payment Gateways
- Email Templates: Settings → Templates
- API Keys: Account → Settings → API (account) / Property → Settings (property)
- Widget: Widgets → Create Widget

### Contact Info

- Beds24 Support: support@beds24.com
- Sumba Sunset Staff WhatsApp: [number] (for booking questions)

---

## Quality Gates Checklist

**COMPLETED:**

- [x] Beds24 account active and paid ✅
- [x] Property configured with test details (real details in SS-16) ✅
- [x] Pricing calendar set up with fixed rates ✅
- [x] Test booking completed successfully (end-to-end) ✅
- [x] Test offline payment flow
- [x] Confirmation email received ✅
- [x] Widget embed code obtained ✅
- [x] Widget tested on test page ✅
- [x] Email templates working (using defaults) ✅
- [x] All automated emails trigger correctly ✅
- [x] Account-level API key obtained and stored in `.env.local` ✅
- [x] Property-level API key obtained and stored in `.env.local` ✅
- [x] Widget ID stored in `.env.local` ✅
- [x] API keys tested and working ✅
- [x] `.env.local` confirmed gitignored ✅

**REMAINING WORK:**

- Add real room data when property owner provides it (SS-16)

---

## Post-Implementation Verification

### Manual Testing Steps (USER REQUIRED)

1. **End-to-End Booking Test**
   - [x] Open Beds24 widget (in Beds24 dashboard preview)
   - [x] Select dates (2-night stay)
   - [x] Select room type
   - [x] Fill in guest details (use real email)
   - [x] Complete booking
   - [x] Verify 50% deposit charged (not full amount)
   - [x] Check confirmation email received with offline payment instructions
   - [x] Verify booking appears in Beds24 dashboard

2. **Mobile Experience Test**
   - [x] Open widget on actual mobile phone (iOS/Android)
   - [x] Test calendar date selection (touch targets)
   - [x] Test room selection
   - [x] Test form fields (guest details)
   - [x] Verify pricing displays clearly
   - [x] Test payment flow on mobile
   - [x] Check mobile email formatting

3. **Admin Dashboard Test**
   - [ ] Log into Beds24 dashboard
   - [ ] View bookings calendar
   - [ ] Edit test booking
   - [ ] Cancel test booking

4. **API Keys Test**
   - [x] Run `yarn dev` locally
   - [x] Check no environment variable errors
   - [x] Verify API keys load from `.env.local`
   - [x] Test API connection (SS-10 will do full integration)

---

## Rollback Plan

If Beds24 setup fails or is not suitable:

1. **Cancel Beds24 subscription** (within trial if applicable, or monthly plan)
2. **Remove API keys** from `.env.local`
3. **Evaluate alternatives**:
   - Option A: Try Smoobu (original plan) - higher cost but easier
   - Option B: Try Hospitable ($25/month) - middle ground
   - Option C: Build custom solution (3-4 weeks) - no recurring fees
4. **Update all planning docs** to reflect platform change
5. **No code rollback needed** (SS-10 not yet implemented)

**Rollback Risk:** Low (configuration only, no code changes yet)
**Rollback Time:** 1 hour (cancel + document)
**Financial Risk:** One month fee only ($40-50)

---

## Documentation Updates

Files that need updating after this task:

- [x] `.claude/planning/ss-5-credentials-setup.md` - Mark Beds24 as "Ready"
- [x] `.env.example` - Already updated with Beds24 variables
- [ ] `.env.local` - Add actual Beds24 API keys (USER)
- [ ] `.claude/planning/index.md` - Unblock SS-10, update status
- [ ] This file - Mark complete when done

---

## Related Tasks

**Depends On:**

- [SS-5: Credentials Setup](./ss-5-credentials-setup.md) - Environment variables documented
- [SS-10: Beds24 Validation](./ss-10-beds24-validation.md) - Technical feasibility validated

**Blocks:**

- SS-12: Beds24 Widget Integration - Cannot implement until account configured
- SS-16: Add Real Room Info - Needs test rooms to be replaced with real data

**Enables:**

- Booking functionality on website
- Guest self-service booking
- Automated guest communication
- Revenue tracking and reporting
- Future OTA channel integrations (Airbnb, Booking.com)

---

## Cost Analysis

### Beds24 Pricing (To Be Determined)

**Option 1: Base Plan (£3.50/month)**

- Annual cost: £42 (~$53 USD/year)
- Unknown feature limitations
- Need to verify channel manager included
- Need to verify API access included

**Option 2: Full-Featured Plan ($40-50/month)**

- Annual cost: $480-600 USD/year
- All features included
- Unlimited channels
- Full API access
- Priority support

**Comparison:**

- Smoobu: $1,867/year (original plan)
- Beds24 Base: $53/year (if sufficient)
- Beds24 Full: $480-600/year (if needed)

**Savings:**

- vs. Smoobu (base): $1,814/year saved
- vs. Smoobu (full): $1,267-1,387/year saved

**Recommendation:** Start with base plan, upgrade if limitations discovered

---

## Notes

**Important Reminders:**

1. **Take screenshots** of all key settings for documentation
2. **Document pricing strategy** (why these rates, why seasonal variations)
3. **Test on real mobile device** (not just browser resize)
4. **Verify API keys work** before considering task complete
5. **Budget 8-12 hours** for full setup (don't rush)
6. **Mobile-first widget** customization is critical (addressed in SS-10)
7. **Email templates** represent your brand - make them professional
8. **Test booking** with real credit card in test mode, not just visual testing

**Potential Issues:**

- **Dated UI** - May be confusing initially, budget time to learn
- **Widget customization** - May need significant CSS work (SS-10)
- **Email HTML** - May need to write custom HTML for professional look
- **Payment rules** - Deposit model may be tricky to configure
- **Time zone** - Verify Sumba time zone (WITA) configured correctly
- **Currency** - IDR (Indonesian Rupiah) confirmed and configured ✅

**After Completion:**

1. Monitor first real booking closely
2. Gather guest feedback on booking experience
3. Iterate on email templates based on feedback
4. Track booking abandonment rate
5. A/B test widget placement and design (future)

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

### Time Spent Breakdown

- Account creation: X hours
- Property configuration: X hours
- Pricing setup: X hours
- Payment gateway: X hours
- Widget generation: X hours
- Email templates: X hours
- API keys: X hours
- Documentation: X hours
- **Total: X hours** (vs. estimated 8-12 hours)

### Configuration Decisions Made

- **Pricing plan chosen**: (base or full-featured)
- **Currency chosen**: USD (firm decision - see frontmatter for rationale)
- **Currency chosen**: USD (firm decision - see frontmatter for rationale)
- **Min nights policy**: (X nights)
- **Cancellation policy**: (description)
- **Email frequency**: (how many days before arrival)
- **Widget type**: (calendar view or date picker)

### Follow-up Tasks Created

- [ ] SS-10: Beds24 Widget Integration (embed + CSS customization)
- [ ] Future: Connect Airbnb channel via Beds24
- [ ] Future: Connect Booking.com channel via Beds24
- [ ] Future: Optimize widget conversion rate

---

**Completion Date:** TBD
**Actual Time Spent:** TBD
**Final Status:** Not Started
