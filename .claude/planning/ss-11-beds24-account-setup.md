---
task_id: ss-11
title: '[Infrastructure] Beds24 Account Setup & Configuration'
status: not_started
priority: high
estimated_time: '8-12 hours'
actual_time: null
dependencies: [ss-4, ss-10]
created: 2025-01-20
started: null
completed: null
related_docs: ['./beds24-feasibility-research.md']
branch: ss-11/infra/beds24-account-setup
pr_number: null
---

[← Previous: SS-10 Beds24 Validation](./ss-10-beds24-validation.md) | [📋 Index](./index.md) | [Next: SS-12 Beds24 Widget Integration →](./ss-12-beds24-widget.md)

# [Infrastructure] Beds24 Account Setup & Configuration

## Overview

Complete setup and configuration of Beds24 account including property details, room inventory, pricing rules, availability calendar, and base configuration. This is a human-led task with Claude providing guidance and verification.

**Project Context:**
Sumba Sunset is a surf camp in Indonesia that needs a comprehensive booking management system. Beds24 was chosen for its cost-effectiveness ($40-50/month) and built-in channel manager capabilities.

**User Story:**
As a surf camp owner, I need a fully configured booking system so that guests can check availability, make bookings, and process payments online.

**Business Value:**

- Automated booking management (no manual calendar tracking)
- Payment processing with 50% deposit model
- Channel manager for OTA integration (future)
- Professional guest communication workflow

---

## Prerequisites/Dependencies

- [x] SS-4: Credentials setup completed (environment for API keys)
- [x] SS-10: Beds24 technical validation passed
- [ ] User has credit card ready for Beds24 subscription
- [ ] User has Stripe account (or willing to create one)
- [ ] Property details ready (rooms, amenities, photos, descriptions)

---

## Acceptance Criteria

**This is a configuration task - no code tests required. Verification through manual testing.**

- [ ] **AC1**: Beds24 account created and subscription active
- [ ] **AC2**: Property configured with all rooms and amenities
- [ ] **AC3**: Pricing structure implemented (base rates + seasonality)
- [ ] **AC4**: Availability calendar configured for next 18 months
- [ ] **AC5**: Booking rules set (min stay, advance booking, etc.)
- [ ] **AC6**: API keys generated and stored in .env.local
- [ ] **AC7**: Property verified as "live" in Beds24 dashboard

---

## Verification Steps

### Account Verification

- [ ] Can login to Beds24 dashboard
- [ ] Subscription status shows as active
- [ ] Property appears in property list

### Configuration Verification

- [ ] All rooms visible in inventory
- [ ] Pricing displays correctly for test dates
- [ ] Calendar shows correct availability
- [ ] Booking rules enforce properly in test booking

### API Verification

- [ ] Account-level API key works (test with curl)
- [ ] Property-level key works (test with curl)
- [ ] Keys stored securely in .env.local

---

## Implementation Steps

### Phase 1: Account Creation & Subscription

**User Actions Required:**

- [ ] **Step 1.1**: Navigate to https://www.beds24.com/join.html
- [ ] **Step 1.2**: Create account with business email
- [ ] **Step 1.3**: Verify email address
- [ ] **Step 1.4**: Login to dashboard
- [ ] **Step 1.5**: Navigate to Settings → Account → Subscription
- [ ] **Step 1.6**: Select appropriate plan ($40-50/month for full features)
- [ ] **Step 1.7**: Enter payment details and activate subscription
- [ ] **Step 1.8**: Document account credentials securely (password manager)

**Account Setup Checkpoint:** Subscription active, can access full dashboard

---

### Phase 2: Property Configuration

**User Actions with Claude Guidance:**

- [ ] **Step 2.1**: Go to Properties → Add New Property
- [ ] **Step 2.2**: Enter property details:
  - Property name: "Sumba Sunset Surf Camp"
  - Property type: "Guest House" or "Hostel"
  - Location: Sumba, Indonesia (exact address)
  - Time zone: Asia/Makassar (WITA/UTC+8)
  - Default language: English
  - Currency: USD (or IDR based on Decision #4)

- [ ] **Step 2.3**: Configure property amenities:

  ```
  Suggested amenities to enable:
  - Free WiFi
  - Airport shuttle (surcharge)
  - Beachfront
  - Surfing lessons
  - Restaurant/Bar
  - Laundry service
  - Tour desk
  - Terrace/Garden
  - Free parking
  ```

- [ ] **Step 2.4**: Add property description (marketing copy)
- [ ] **Step 2.5**: Upload property photos (hero image for now)
- [ ] **Step 2.6**: Set check-in/check-out times:
  - Check-in: 14:00 (2 PM)
  - Check-out: 11:00 (11 AM)
  - Late check-in: Allowed with notice

- [ ] **Step 2.7**: Configure contact information:
  - Email: [business email]
  - Phone: +62 [phone number]
  - WhatsApp: +27 78 778 7591

**Property Configuration Checkpoint:** Property created and basic info complete

---

### Phase 3: Room Inventory Setup

**User Actions with Claude Guidance:**

- [ ] **Step 3.1**: Navigate to Properties → [Your Property] → Rooms
- [ ] **Step 3.2**: Add each room type (repeat for each):

  **Example Room Configuration:**

  ```
  Room Type: Ocean View Bungalow
  - Quantity: 4 units
  - Max Occupancy: 2 adults
  - Base price: $X per night
  - Room size: X sqm
  - Bed configuration: 1 king or 2 singles
  - Amenities: Private bathroom, AC, Ocean view
  ```

- [ ] **Step 3.3**: Set room-specific amenities for each type
- [ ] **Step 3.4**: Upload room photos (placeholder images ok)
- [ ] **Step 3.5**: Add room descriptions (highlight unique features)
- [ ] **Step 3.6**: Configure extra bed/person charges if applicable

**Room Inventory Checkpoint:** All room types configured with details

---

### Phase 4: Pricing Configuration

**User Actions with Claude Guidance:**

- [ ] **Step 4.1**: Go to Prices → Rate Plans
- [ ] **Step 4.2**: Create base rate plan:
  - Name: "Standard Rate"
  - Type: "Per Room Per Night"
  - Includes: Breakfast (if applicable)

- [ ] **Step 4.3**: Set base prices for each room type
- [ ] **Step 4.4**: Configure seasonal pricing:

  ```
  High Season (July-August, December-January):
  - +25% on base rates

  Low Season (February-May):
  - -15% on base rates

  Standard Season (all other dates):
  - Base rates apply
  ```

- [ ] **Step 4.5**: Set length-of-stay discounts:
  - 7+ nights: 10% discount
  - 14+ nights: 15% discount
  - 28+ nights: 20% discount

- [ ] **Step 4.6**: Configure last-minute discounts (optional):
  - Booking within 3 days: 10% off

**Pricing Configuration Checkpoint:** Dynamic pricing structure active

---

### Phase 5: Availability Calendar Setup

**User Actions with Claude Guidance:**

- [ ] **Step 5.1**: Navigate to Calendar view
- [ ] **Step 5.2**: Set availability for next 18 months:
  - Open all dates initially
  - Block any known closure periods
  - Block any already-booked dates (if migrating)

- [ ] **Step 5.3**: Configure booking rules:
  - Minimum stay: 3 nights (adjustable by season)
  - Maximum stay: 30 nights
  - Advance booking: Up to 365 days
  - Same-day booking: Allowed until 18:00 local time

- [ ] **Step 5.4**: Set arrival/departure rules:
  - Arrivals: Any day
  - Departures: Any day
  - (Adjust if specific day restrictions needed)

- [ ] **Step 5.5**: Configure overbooking protection:
  - Enable "Prevent Overbooking"
  - Set buffer time between bookings (if needed)

**Calendar Configuration Checkpoint:** 18 months of availability configured

---

### Phase 6: Booking Rules & Policies

**User Actions with Claude Guidance:**

- [ ] **Step 6.1**: Go to Properties → Settings → Booking Rules
- [ ] **Step 6.2**: Configure cancellation policy:

  ```
  Suggested Cancellation Policy:
  - 30+ days before arrival: Full refund minus processing fee
  - 14-29 days: 50% refund
  - 7-13 days: 25% refund
  - Less than 7 days: No refund
  - No-show: No refund
  ```

- [ ] **Step 6.3**: Set payment terms:
  - Deposit: 50% at booking
  - Balance: Due on arrival (cash or card)
  - Accepted methods: Credit card via Stripe, Cash on arrival

- [ ] **Step 6.4**: Configure age restrictions:
  - Minimum age to book: 18 years
  - Children allowed: Yes
  - Infants: Free (under 2 years)

- [ ] **Step 6.5**: Add house rules:
  - No smoking in rooms
  - Quiet hours: 22:00 - 07:00
  - No parties/events
  - Pets: Not allowed (or specify)

- [ ] **Step 6.6**: Set damage deposit (if applicable):
  - Amount: $X
  - Collection: On arrival
  - Return: On departure (minus any damages)

**Booking Rules Checkpoint:** All policies configured and active

---

### Phase 7: API Key Generation

**Claude Actions (Guiding User):**

- [ ] **Step 7.1**: Navigate to Settings → Account → API
- [ ] **Step 7.2**: Generate Account-level API key:
  - Click "Generate New Key"
  - Name it: "Sumba Sunset Website"
  - Copy the key immediately (won't be shown again)

- [ ] **Step 7.3**: Navigate to Properties → [Your Property] → Settings → API
- [ ] **Step 7.4**: Generate Property-specific key:
  - Click "Generate Property Key"
  - Copy the key immediately

- [ ] **Step 7.5**: Update .env.local file:

  ```bash
  # Beds24 API Configuration
  BEDS24_API_KEY=your_account_level_api_key_here
  BEDS24_PROP_KEY=your_property_specific_key_here
  BEDS24_PROPERTY_ID=your_property_id_here
  ```

- [ ] **Step 7.6**: Test API keys with curl:

  ```bash
  # Test account API
  curl -X GET "https://api.beds24.com/json/getAccount" \
    -H "ApiKey: your_api_key_here"

  # Should return account details
  ```

**API Configuration Checkpoint:** Both API keys working and stored

---

### Phase 8: Final Verification

**Joint User-Claude Verification:**

- [ ] **Step 8.1**: Create test booking through dashboard:
  - Select future dates
  - Choose a room
  - Enter guest details
  - Verify pricing calculations
  - Cancel test booking

- [ ] **Step 8.2**: Review all settings:
  - Property details complete
  - All rooms configured
  - Pricing looks correct
  - Calendar shows availability
  - Policies are set

- [ ] **Step 8.3**: Check API access:

  ```bash
  # Get property details via API
  curl -X GET "https://api.beds24.com/json/getProperty" \
    -H "ApiKey: your_api_key_here" \
    -d "propertyId=your_property_id"
  ```

- [ ] **Step 8.4**: Document important IDs:
  - Property ID: \***\*\_\*\***
  - Room Type IDs: \***\*\_\*\***
  - Rate Plan IDs: \***\*\_\*\***

- [ ] **Step 8.5**: Enable property:
  - Set status to "Live" in dashboard
  - Verify "Bookable" badge appears

**Final Verification Checkpoint:** Property fully configured and live

---

## Quality Gates Checklist

**User & Claude MUST verify ALL items before marking task complete:**

- [ ] Beds24 account active with paid subscription
- [ ] Property configured with all details
- [ ] All room types added with photos and descriptions
- [ ] Pricing structure implemented (base + seasonal)
- [ ] 18 months of availability calendar configured
- [ ] Booking rules and policies set
- [ ] Cancellation policy configured
- [ ] API keys generated and tested
- [ ] Keys stored in .env.local file
- [ ] Property status set to "Live"
- [ ] Test booking works in dashboard
- [ ] API responds with property data
- [ ] All configuration documented

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Dashboard Access Test**
   - [ ] Login to Beds24 dashboard
   - [ ] Navigate to property
   - [ ] Verify all sections accessible

2. **Booking Flow Test**
   - [ ] Select dates in calendar
   - [ ] See available rooms
   - [ ] Check pricing calculation
   - [ ] Verify minimum stay enforced
   - [ ] Test cancellation policy display

3. **API Access Test**
   - [ ] Run API test commands
   - [ ] Verify property data returned
   - [ ] Check availability endpoint
   - [ ] Test rate calculation endpoint

4. **Documentation Check**
   - [ ] All IDs documented
   - [ ] API keys in .env.local
   - [ ] Important URLs bookmarked
   - [ ] Admin credentials in password manager

---

## Rollback Plan

If configuration has issues:

1. **Immediate**: Property can be set to "Not Bookable" status
2. **Reconfigure**: Fix specific settings without losing data
3. **Support**: Contact Beds24 support (support@beds24.com)
4. **Worst case**: Cancel subscription, get pro-rated refund

**Risk Assessment:** Low (can be reconfigured anytime)
**Rollback Difficulty:** Easy (just status change)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.env.local` - Add Beds24 API keys and property ID
- [ ] `.env.example` - Add placeholder entries for Beds24 config
- [ ] `README.md` - Add note about Beds24 configuration requirement
- [ ] Create `docs/beds24-setup.md` - Document property IDs and configuration

---

## Related Tasks

**Depends On:**

- [SS-4: Credentials Setup](./ss-4-credentials-setup.md) - Need .env.local file
- [SS-10: Beds24 Validation](./ss-10-beds24-validation.md) - Technical validation passed

**Blocks:**

- [SS-12: Beds24 Widget Integration](./ss-12-beds24-widget.md) - Need API keys
- [SS-13: Payment Configuration](./ss-13-payment-config.md) - Need Beds24 account
- [SS-14: Email Templates](./ss-14-email-templates.md) - Need property configured

**Related:**

- [Beds24 Feasibility Research](./beds24-feasibility-research.md) - Why we chose Beds24

---

## Notes

### Important Beds24 Limitations

- Dashboard UI is dated - expect 1990s-style interface
- Configuration is complex - many nested menus
- Save frequently - some sections don't auto-save
- API has rate limits - don't hammer endpoints
- Channel manager setup is separate task (post-MVP)

### Time-Saving Tips

1. **Prepare all content first**: Room descriptions, policies, photos
2. **Use bulk operations**: When adding multiple similar rooms
3. **Test incrementally**: Don't wait until end to test
4. **Document everything**: IDs, settings, configuration choices
5. **Ask support**: Beds24 support is helpful for complex setup

### Currency Decision Impact

Based on Milestone 3 currency decision (SS-16):

- If USD: Keep all pricing in USD throughout
- If IDR: Convert all pricing to IDR, update currency setting

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
