---
task_id: ss-11
title: '[Infrastructure] Beds24 Account Setup & Configuration'
status: not_started
priority: high
estimated_time: '8-12 hours'
actual_time: null
dependencies: [ss-4, ss-14]
created: 2025-01-19
started: null
completed: null
related_docs: ['beds24-feasibility-research.md']
infra_type: configuration
currency_decision: USD
currency_rationale: 'Start with USD for simplicity - most international surf travelers expect USD. SS-16 (in this milestone) will investigate USD→IDR currency switch BEFORE building marketing pages to avoid rework.'
---

[← Previous: SS-10 Beds24 Validation](./ss-10-beds24-validation.md) | [📋 Index](./index.md) | [Next: SS-12 Widget Integration →](./ss-12-beds24-widget.md)

# [Infrastructure] Beds24 Account Setup & Configuration

## Overview

Create and fully configure a Beds24 account for booking management, including property setup, pricing rules, availability calendar, payment gateway (Stripe), and widget generation.

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
5. **Payment Gateway** - Connect Stripe, configure deposit rules
6. **Booking Widget** - Generate embed code, test functionality
7. **Email Automation** - Booking confirmation, pre-arrival, check-in, post-stay
8. **API Keys** - Obtain account + property keys for integration

**⚠️ Currency Decision:** This task sets up Beds24 with USD initially. **SS-16 (Currency Investigation)** in this same milestone will investigate switching to IDR. If you decide on IDR, you'll update the Beds24 currency setting before completing this milestone. This ensures marketing pages (M5-6) are built with the correct currency from the start.

---

## Prerequisites/Dependencies

- [x] SS-5: Credentials setup document exists
- [ ] Budget approved for Beds24 ($40-50/month for 9-room property)
- [ ] Stripe account ready (for payment gateway connection)
- [ ] Property details documented (rooms, capacity, amenities, photos)
- [ ] Pricing strategy defined (base rates, seasonal rates, weekend rates)
- [ ] Business email for Beds24 account

---

## Acceptance Criteria

- [ ] **AC1**: Beds24 account created and plan selected
- [ ] **AC2**: Property added with complete details (name, address, description, photos)
- [ ] **AC3**: Room types configured with capacity and amenities
- [ ] **AC4**: Pricing calendar set up with base rates and seasonal variations
- [ ] **AC5**: Availability rules configured (min/max nights, advance booking)
- [ ] **AC6**: Stripe payment gateway connected
- [ ] **AC7**: Deposit payment model configured (50% upfront)
- [ ] **AC8**: Booking widget generated and embed code obtained
- [ ] **AC9**: Widget tested on mobile and desktop
- [ ] **AC10**: Automated email templates customized
- [ ] **AC11**: Test booking completed end-to-end
- [ ] **AC12**: Account-level API key obtained
- [ ] **AC13**: Property-level API key obtained
- [ ] **AC14**: API keys added to `.env.local`
- [ ] **AC15**: Beds24 setup documented in beds24-setup-guide.md

---

## Implementation Steps

### Phase 1: Account Creation (USER - 1 hour)

- [ ] **Step 1.1**: Visit [beds24.com](https://beds24.com) and create account
  - Click "Sign Up" or "Create Account"
  - Fill in business details:
    - Business name: "Sumba Sunset Surf Camp"
    - Email: Your business email
    - Password: Strong password (store in password manager)
    - Country: Indonesia

- [ ] **Step 1.2**: Verify email address

- [ ] **Step 1.3**: Choose pricing plan:
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
    - Payment gateway integration (Stripe)
  - Document plan choice and features included

- [ ] **Step 1.4**: Complete account profile
  - Company information:
    - Business name: "Sumba Sunset Surf Camp"
    - Address: Sumba, Indonesia
    - Phone number
    - Tax ID (if applicable in Indonesia)
  - **Time zone**: Asia/Makassar (WITA) - CRITICAL for Sumba
  - **Default currency**: USD (firm decision - see frontmatter for rationale)
  - **Default currency**: USD (firm decision - see frontmatter for rationale)
  - **Language**: English

- [ ] **Step 1.5**: Set up billing information

**Checkpoint:** Account created, plan activated

---

### Phase 2: Property Configuration (USER - 2-3 hours)

- [ ] **Step 2.1**: Add new property
  - Navigate to: Dashboard → Properties → Add Property
  - Property name: "Sumba Sunset Surf Camp"
  - Address: [Full Sumba, Indonesia address]
  - Property type: Guest House / Surf Camp
  - GPS coordinates: [Latitude, Longitude] (for map display)
  - Currency: USD (firm decision - see frontmatter for rationale)
  - Currency: USD (firm decision - see frontmatter for rationale)

- [ ] **Step 2.2**: Upload property photos
  - **Essential Photos (10-15 minimum)**:
    1. Hero shot (exterior with beach/sunset)
    2. Each room type (2-3 photos per room)
    3. Communal areas (lounge, dining, outdoor space)
    4. Kitchen facilities
    5. Bathroom facilities
    6. Surf/beach views
    7. Activity photos (surfing, social areas)
    8. Nearby attractions
  - **Photo Guidelines**:
    - High resolution (at least 1920x1080)
    - Horizontal orientation (landscape)
    - Well-lit (natural light preferred)
    - Clean, decluttered spaces
    - Show actual property (no stock photos)
    - First photo is the hero image (most important)

- [ ] **Step 2.3**: Write property description
  - **Guest-facing copy** (example):

    ```
    Sumba Sunset is a surf camp located in [location], Sumba, Indonesia.

    Nestled on the edge of [beach name], we offer the perfect base for your
    surf adventure. Our property features [number] comfortable rooms, communal
    areas for relaxing after a day in the water, and easy access to some of
    Sumba's best surf breaks.

    [Add more details about amenities, nearby surf spots, vibe, etc.]
    ```

  - Include:
    - Surf camp overview
    - Location highlights
    - Amenities and facilities
    - Nearby surf breaks
    - Property vibe and atmosphere

- [ ] **Step 2.4**: Configure rooms/accommodation

  **For each room type:**
  1. **Room Name**: "Ocean View Private Room", "Shared Dorm - 4 Beds", etc.
  2. **Room Type**: Private room, Shared room, Dorm bed
  3. **Capacity**:
     - Max guests: [number]
     - Max adults: [number]
     - Max children: [number]
  4. **Bed Configuration**:
     - 1 Double bed, or
     - 2 Single beds, or
     - 4 Bunk beds, etc.
  5. **Room Size**: [square meters]
  6. **Room Amenities**:
     - Private bathroom or shared
     - Air conditioning or fan
     - Ocean view
     - Balcony
     - [Other amenities]
  7. **Quantity**: Number of this room type available
  8. **Photos**: Upload 2-3 photos per room type

  **Example Room Setup for Sumba Sunset:**
  - **Room Type 1**: Ocean View Private (2 rooms)
    - 2 guests, 1 double bed, private bathroom, AC, balcony
    - Price: $XX/night

  - **Room Type 2**: Standard Private (3 rooms)
    - 2 guests, 1 double bed, shared bathroom, fan
    - Price: $XX/night

  - **Room Type 3**: Shared Dorm - 4 Beds (1 room)
    - 4 guests, 4 single beds (bunk beds), shared bathroom, fan
    - Price: $XX/night per bed

- [ ] **Step 2.5**: Set property-level amenities
  - Check all that apply:
    - WiFi
    - Parking
    - Outdoor space / Garden
    - Communal kitchen
    - Laundry facilities
    - Surf equipment storage
    - Board rental
    - [Other amenities specific to property]

- [ ] **Step 2.6**: Set house rules
  - Check-in time: [e.g., 2:00 PM]
  - Check-out time: [e.g., 11:00 AM]
  - Quiet hours: [e.g., 10:00 PM - 7:00 AM]
  - No smoking indoors
  - Respect communal spaces
  - [Other rules]

**Checkpoint:** Property fully configured with rooms and details

---

### Phase 3: Pricing Setup (USER - 2-3 hours)

- [ ] **Step 3.1**: Set base rates per room type
  - Navigate to: Property → Prices
  - Set base rate per room type:
    - Ocean View Private: $XX/night
    - Standard Private: $XX/night
    - Shared Dorm Bed: $XX/night
  - Set date range: Next 12 months
  - Document pricing strategy

- [ ] **Step 3.2**: Set up seasonal pricing

  **Strategy for Sumba (Surf Seasons):**
  - **High Season** (Best Surf): May - October
    - Increase base rates by 20-30%
    - Example: Ocean View $XX → $XX

  - **Shoulder Season**: April, November
    - Keep base rates or slight discount

  - **Low Season**: December - March
    - Reduce rates by 10-20% to fill occupancy
    - Example: Ocean View $XX → $XX

  **Implementation:**
  1. Navigate to: Property → Calendar → Prices
  2. Select date range for high season
  3. Adjust rates for all room types
  4. Repeat for shoulder and low seasons
  5. Save changes

- [ ] **Step 3.3**: Configure weekend pricing (optional)
  - **For Sumba:** Likely not needed (surf travelers book weekly stays, not weekends)
  - If needed:
    1. Navigate to: Property → Prices → Day of Week
    2. Set Friday/Saturday premium (+10-20%)

- [ ] **Step 3.4**: Set minimum stay requirements
  - Navigate to: Property → Booking Rules
  - **Minimum Stay**:
    - High season: 3 nights minimum
    - Low season: 2 nights minimum
    - Special dates (holidays): 5-7 nights
  - **Maximum Stay**:
    - No maximum (encourage long stays)

- [ ] **Step 3.5**: Configure advance booking rules
  - **Advance Booking**:
    - Open bookings: 12 months in advance
    - Last-minute cutoff: Same day bookings allowed (or 24 hours)

- [ ] **Step 3.6**: Add buffer days (optional)
  - **Buffer Days** (Optional):
    - 0 days (back-to-back bookings OK)
    - Or 1 day between bookings for deep cleaning
  - Navigate to: Property → Booking Rules
  - Add buffer days if needed

- [ ] **Step 3.7**: Block closed dates
  - Mark any dates you're closed for maintenance
  - Mark dates already booked outside Beds24
  - Navigate to calendar and block dates

**Checkpoint:** Pricing calendar fully configured

---

### Phase 4: Payment Gateway Setup (USER - 1-2 hours)

- [ ] **Step 4.1**: Connect Stripe account to Beds24
  - **Prerequisites**:
    - Stripe account already created
    - Stripe verified and active
    - Know your Stripe API keys
  - **Steps**:
    1. Navigate to: Settings → Payments → Payment Gateways
    2. Select "Stripe"
    3. Enter Stripe credentials:
       - Publishable Key: `pk_live_...`
       - Secret Key: `sk_live_...`
    4. Test connection
    5. Save settings

- [ ] **Step 4.2**: Configure payment rules
  - **Sumba Sunset Requirements**:
    - Deposit: 50% due at booking
    - Remainder: Cash on arrival
  - **Implementation**:
    1. Navigate to: Settings → Payments → Payment Rules
    2. **Deposit Amount**:
       - Select "Percentage"
       - Enter `50`
       - Due: "At time of booking"
    3. **Remainder Payment**:
       - Select "Manual" or "Cash"
       - Instructions for guest: "Remainder payment due in cash on arrival"
       - Add to booking confirmation email
    4. **Currency**: USD (firm decision - see frontmatter for rationale)
    5. **Accepted Cards**: All major cards (Visa, Mastercard, Amex)

- [ ] **Step 4.3**: Set up refund & cancellation policy
  - **Recommended Policy for Surf Camp**:
    - **Flexible** (0-14 days before): Full refund minus processing fee
    - **Moderate** (14-30 days before): 50% refund
    - **Strict** (30+ days before): No refund, but can reschedule
  - **Implementation**:
    1. Navigate to: Settings → Policies → Cancellation
    2. Select policy tier or create custom
    3. Define refund amounts per timeframe
    4. Add policy text to booking confirmation

- [ ] **Step 4.4**: Configure invoice settings
  - **Invoice Template**:
    - Company name: Sumba Sunset Surf Camp
    - Logo: Upload property logo
    - Address: Sumba, Indonesia address
    - Tax ID: If applicable
  - **Email Settings**:
    - Send invoice automatically on booking
    - Send receipt on payment received
  - **Tax Configuration** (if applicable):
    - Indonesia VAT: [X%] (research local requirements)
    - Tourist tax: [X IDR per night] (if applicable)

- [ ] **Step 4.5**: Test payment flow with test credit card
  - Make test booking
  - Enter test credit card: `4242 4242 4242 4242`
  - Process test payment
  - Verify deposit amount correct (50%)
  - Check confirmation email sent
  - Verify booking appears in dashboard

**Checkpoint:** Payments working correctly

---

### Phase 5: Widget Generation & Customization (USER - 2-3 hours)

- [ ] **Step 5.1**: Generate booking widget
  - Navigate to: Widgets → Create New Widget
  - Choose widget type:
    - **Calendar View** (recommended) - Visual availability
    - **Date Picker** - Simpler, less visual
  - Configure widget settings:
    - Language: English (primary), add Indonesian if needed
    - Currency: USD (firm decision - see frontmatter for rationale)
    - Currency: USD (firm decision - see frontmatter for rationale)
    - Date format: DD/MM/YYYY or MM/DD/YYYY
    - Show prices: Yes
    - Show availability: Yes
    - Number of months to show: 2-3
  - Generate widget code

- [ ] **Step 5.2**: Get embed code

  **Option 1: iFrame Embed** (simpler, less customizable):

  ```html
  <iframe
    src="https://beds24.com/booking.php?propid=XXXXX"
    width="100%"
    height="800px"
    frameborder="0"
  >
  </iframe>
  ```

  **Option 2: JavaScript Embed** (more customizable):

  ```html
  <div id="beds24-widget"></div>
  <script src="https://beds24.com/widget.js?propid=XXXXX"></script>
  ```

  - Copy both options - will decide in SS-10

- [ ] **Step 5.3**: Test widget in Beds24 preview
  - Use Beds24's widget preview feature
  - Test all interactions (date selection, room choice, etc.)
  - Check mobile responsiveness
  - Test booking flow
  - Verify pricing displays correctly
  - Check availability calendar

- [ ] **Step 5.4**: Test on actual devices
  - iPhone (iOS Safari)
  - Android phone (Chrome)
  - Tablet (iPad)
  - Desktop (Chrome, Firefox, Safari)

- [ ] **Step 5.5**: Identify CSS customization needs

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

### Phase 6: Email Template Customization (USER - 1-2 hours)

Beds24 provides basic templates. Customize for professional appearance:

- [ ] **Step 6.1**: Customize booking confirmation email

  **Purpose:** Sent immediately after booking

  **Template Structure:**

  ```
  Subject: Booking Confirmed - Sumba Sunset Surf Camp

  Hi [Guest Name],

  🌅 Your Sumba Sunset adventure is booked!

  BOOKING DETAILS:
  - Check-in: [Date]
  - Check-out: [Date]
  - Nights: [X]
  - Room: [Room Type]
  - Guests: [Number]

  PAYMENT SUMMARY:
  - Total: $[Total]
  - Deposit Paid: $[Deposit] ✅
  - Balance Due: $[Balance] (cash on arrival)

  NEXT STEPS:
  1. We'll send check-in details 3 days before your arrival
  2. Review our surf guide: [link]
  3. Pack your boardshorts and stoke!

  Questions? Reply to this email or WhatsApp: [number]

  See you soon,
  The Sumba Sunset Team

  [Branding footer with logo, social links]
  ```

  **Implementation:**
  1. Navigate to: Settings → Templates → Booking Confirmation
  2. Replace default with custom HTML
  3. Use merge fields: `{guestname}`, `{checkin}`, `{checkout}`, etc.
  4. Test send to your email

- [ ] **Step 6.2**: Customize pre-arrival email (sent 3-7 days before)

  **Purpose:** Sent 3-7 days before check-in

  **Template Structure:**

  ```
  Subject: Get Ready for Sumba! Check-in Info for [Guest Name]

  Hi [Guest Name],

  You're just [X] days away from Sumba Sunset!

  HOW TO GET HERE:
  - From Tambolaka Airport: [directions]
  - GPS Coordinates: [coordinates]
  - Airport pickup available: [booking link or price]

  WHAT TO BRING:
  - Surf equipment (or rent ours - $X/day)
  - Reef booties (rocky entry at some breaks)
  - Sunscreen (reef-safe only!)
  - Cash for remainder payment ($[Balance])
  - Mosquito repellent
  - Your best surf stoke 🏄

  CHECK-IN DETAILS:
  - Time: 2:00 PM onwards
  - Location: [address]
  - WiFi password: (we'll share on arrival)

  WEATHER & SURF:
  Current conditions: [link to forecast]
  Best breaks this week: [surf report]

  Can't wait to host you!

  The Sumba Sunset Team

  [Branding footer]
  ```

  **Implementation:**
  1. Navigate to: Settings → Templates → Pre-Arrival
  2. Set trigger: 3 days before check-in
  3. Customize content
  4. Test send

- [ ] **Step 6.3**: Customize check-in email (sent day of arrival)

  **Purpose:** Sent on day of arrival

  **Template Structure:**

  ```
  Subject: Welcome to Sumba Sunset! Check-in Today

  Hi [Guest Name],

  Welcome day! 🌅

  CHECK-IN INFO:
  - Time: From 2:00 PM
  - Address: [full address]
  - Contact: [phone number]

  IMPORTANT INFO:
  - WiFi: SumbaSunset / Password: [password]
  - Breakfast: 7:00 AM - 9:00 AM
  - Surf report board in common area
  - Checkout: 11:00 AM on [date]

  HOUSE RULES:
  - No shoes inside
  - Quiet hours: 10 PM - 7 AM
  - Respect communal spaces
  - Rinse surf gear outside

  EMERGENCY CONTACTS:
  - Property manager: [number]
  - Local clinic: [number]
  - Police: [number]

  Need anything? We're here to help!

  The Sumba Sunset Team

  [Branding footer]
  ```

  **Implementation:**
  1. Navigate to: Settings → Templates → Check-in
  2. Set trigger: Day of arrival (8:00 AM)
  3. Customize content
  4. Test send

- [ ] **Step 6.4**: Customize post-stay email (sent after checkout)

  **Purpose:** Sent 1-2 days after checkout

  **Template Structure:**

  ```
  Subject: Thanks for staying at Sumba Sunset! 🌅

  Hi [Guest Name],

  We hope you caught some epic waves!

  SHARE YOUR EXPERIENCE:
  We'd love to hear about your stay:
  - Google Review: [link]
  - TripAdvisor: [link]
  - Instagram: Tag @sumbasunset

  Your feedback helps future surfers find us.

  COME BACK SOON:
  Use code RETURN15 for 15% off your next stay.

  STAY CONNECTED:
  - Instagram: @sumbasunset
  - Facebook: /sumbasunset
  - Surf blog: [link]

  Until next time, may the surf be with you! 🏄

  The Sumba Sunset Team

  [Branding footer]
  ```

  **Implementation:**
  1. Navigate to: Settings → Templates → Post-Stay
  2. Set trigger: 1 day after checkout (10:00 AM)
  3. Customize content
  4. Test send

- [ ] **Step 6.5**: Configure email triggers
  1. Navigate to: Settings → Automation → Email Triggers
  2. Configure timing:
     - Confirmation: Immediate (on booking)
     - Pre-arrival: 3 days before check-in (8:00 AM)
     - Check-in: Day of arrival (8:00 AM)
     - Post-stay: 1 day after checkout (10:00 AM)
  3. Test all triggers with test booking

- [ ] **Step 6.6**: Email design tips
  - **Mobile-first**: 60%+ will read on phone
  - **Keep it concise**: Highlight key info
  - **Clear CTAs**: Make links/buttons obvious
  - **Branding**: Use logo and brand colors
  - **Personal touch**: Friendly, casual tone for surf vibe
  - **Test thoroughly**: Send to various email clients

**Checkpoint:** Email automation configured and tested

---

### Phase 7: API Keys & Integration Prep (USER - 30 minutes)

- [ ] **Step 7.1**: Obtain account-level API key
  - Navigate to: Account → Settings → API
  - Generate new API key (if not exists)
  - Copy `BEDS24_API_KEY`
  - Store securely

- [ ] **Step 7.2**: Obtain property-level API key
  - Navigate to: Property → Settings → API Key
  - Generate property key (if not exists)
  - Copy `BEDS24_PROP_KEY`
  - Store securely

- [ ] **Step 7.3**: Add keys to `.env.local`

  ```bash
  BEDS24_API_KEY=your_account_level_key_here
  BEDS24_PROP_KEY=your_property_level_key_here
  ```

- [ ] **Step 7.4**: Verify `.env.local` is gitignored

  ```bash
  git check-ignore .env.local
  # Should output: .env.local
  ```

- [ ] **Step 7.5**: Test API keys work

  **API Documentation:**
  - Official docs: [beds24.com/api](https://beds24.com/api)
  - API endpoints for:
    - Fetch bookings
    - Check availability
    - Create booking
    - Update booking
    - Fetch pricing
    - Fetch property details

  **Simple test (Terminal):**

  ```bash
  # Test account-level API key
  curl -X GET "https://beds24.com/api/json/getProperties" \
    -H "apiKey: YOUR_ACCOUNT_API_KEY"

  # Should return list of properties
  ```

  **In Next.js (SS-10 will implement this):**

  ```typescript
  // src/lib/beds24-api.ts
  const BEDS24_API_KEY = process.env.BEDS24_API_KEY;
  const BEDS24_PROP_KEY = process.env.BEDS24_PROP_KEY;

  export async function testBeds24Connection() {
    const response = await fetch('https://beds24.com/api/json/getProperties', {
      headers: {
        apiKey: BEDS24_API_KEY!,
      },
    });

    const data = await response.json();
    console.log('Beds24 properties:', data);
    return data;
  }
  ```

**Checkpoint:** API keys obtained and stored securely

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

#### Issue: Payment failing

**Symptoms:** Guest can't complete booking, payment error

**Solutions:**

1. Verify Stripe connection active
2. Check Stripe account is verified (not in restricted mode)
3. Test with test credit card: `4242 4242 4242 4242`
4. Check Beds24 payment settings (currency, amount)
5. Verify deposit percentage is correct (50%)

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
   - Secure payment info (Beds24 + Stripe handle this)

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
- Stripe Support: support@stripe.com (for payment issues)
- Sumba Sunset Staff WhatsApp: [number] (for booking questions)

---

## Quality Gates Checklist

**USER must verify ALL items:**

- [ ] Beds24 account active and paid
- [ ] Property fully configured with all details
- [ ] Pricing calendar complete for next 12 months
- [ ] Stripe payment gateway connected and tested
- [ ] Test booking completed successfully (end-to-end)
- [ ] Test payment processed correctly (50% deposit)
- [ ] Confirmation email received and formatted correctly
- [ ] Widget embed code obtained
- [ ] Widget tested on mobile device (actual phone, not just browser resize)
- [ ] Email templates customized and professional
- [ ] All automated emails trigger correctly
- [ ] Account-level API key obtained and stored in `.env.local`
- [ ] Property-level API key obtained and stored in `.env.local`
- [ ] API keys tested and working
- [ ] `.env.local` confirmed gitignored (not in `git status`)
- [ ] Documentation complete (beds24-setup-guide.md)
- [ ] SS-4 updated with "Beds24 Ready" status

---

## Post-Implementation Verification

### Manual Testing Steps (USER REQUIRED)

1. **End-to-End Booking Test**
   - [ ] Open Beds24 widget (in Beds24 dashboard preview)
   - [ ] Select dates (2-night stay)
   - [ ] Select room type
   - [ ] Fill in guest details (use real email)
   - [ ] Enter test credit card (Stripe test mode)
   - [ ] Complete booking
   - [ ] Verify 50% deposit charged (not full amount)
   - [ ] Check confirmation email received
   - [ ] Verify booking appears in Beds24 dashboard

2. **Mobile Experience Test**
   - [ ] Open widget on actual mobile phone (iOS/Android)
   - [ ] Test calendar date selection (touch targets)
   - [ ] Test room selection
   - [ ] Test form fields (guest details)
   - [ ] Verify pricing displays clearly
   - [ ] Test payment flow on mobile
   - [ ] Check mobile email formatting

3. **Email Automation Test**
   - [ ] Trigger pre-arrival email (manually or wait for schedule)
   - [ ] Check formatting and content
   - [ ] Verify all links work
   - [ ] Test on mobile email app

4. **Admin Dashboard Test**
   - [ ] Log into Beds24 dashboard
   - [ ] View bookings calendar
   - [ ] Edit test booking
   - [ ] Cancel test booking (test refund process)
   - [ ] Generate report (revenue, occupancy)
   - [ ] Test mobile app (if available)

5. **API Keys Test**
   - [ ] Run `yarn dev` locally
   - [ ] Check no environment variable errors
   - [ ] Verify API keys load from `.env.local`
   - [ ] Test API connection (SS-10 will do full integration)

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
- SS-16: Currency Investigation - Needs Beds24 account to test currency switch

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
- **Currency** - USD confirmed (see frontmatter). Future spike story (SS-39) will investigate USD→IDR switch after Milestone 6
- **Currency** - USD confirmed (see frontmatter). Future spike story (SS-39) will investigate USD→IDR switch after Milestone 6

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
