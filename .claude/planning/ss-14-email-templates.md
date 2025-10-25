---
task_id: ss-14
title: '[Infrastructure] Beds24 Email Templates Configuration'
status: not_started
priority: medium
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-11]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-14/infra/email-templates
pr_number: null
---

[← Previous: SS-13 Payment Config](./ss-13-payment-configuration.md) | [📋 Index](./index.md) | [Next: SS-15 Widget CSS →](./ss-15-widget-customization.md)

# [Infrastructure] Beds24 Email Templates Configuration

## Overview

Configure and customize automated email templates in Beds24 for the complete guest communication journey: booking confirmation, pre-arrival information, check-in details, and post-stay thank you messages.

**Project Context:**
Professional automated emails are crucial for guest experience and reducing manual communication workload. These templates will handle 90% of guest communication automatically.

**User Story:**
As a surf camp owner, I need automated professional emails so that guests receive timely information without manual intervention.

**Business Value:**

- Reduced staff workload (automated communication)
- Consistent professional messaging
- Improved guest experience
- Reduced support inquiries

---

## Prerequisites/Dependencies

- [x] SS-11: Beds24 account setup completed
- [ ] Email content prepared (or willing to write)
- [ ] Logo/branding assets ready
- [ ] WhatsApp number confirmed

---

## Acceptance Criteria

**This is a configuration task - verification through test emails.**

- [ ] **AC1**: Booking confirmation email configured and tested
- [ ] **AC2**: Pre-arrival email (7 days before) configured
- [ ] **AC3**: Check-in details email (1 day before) configured
- [ ] **AC4**: Post-stay thank you email configured
- [ ] **AC5**: All emails mobile-responsive
- [ ] **AC6**: Branding consistent across templates

---

## Implementation Steps

### Phase 1: Email Settings Configuration

**User Actions with Claude Guidance:**

- [ ] **Step 1.1**: Login to Beds24 → Settings → Email
- [ ] **Step 1.2**: Configure sender details:

  ```
  From Name: Sumba Sunset Surf Camp
  From Email: bookings@sumbasunset.com
  Reply-To: info@sumbasunset.com
  BCC Admin: admin@sumbasunset.com (optional)
  ```

- [ ] **Step 1.3**: Set email formatting:

  ```
  Format: HTML with Plain Text fallback
  Character Set: UTF-8
  Logo Position: Top center
  Footer: Include property contact details
  ```

- [ ] **Step 1.4**: Upload logo/branding:
  - Logo file (PNG, max 200px height)
  - Brand colors for email design

**Email Settings Checkpoint:** Basic configuration complete

---

### Phase 2: Booking Confirmation Template

**User & Claude create content:**

- [ ] **Step 2.1**: Go to Auto Email → Booking Confirmation
- [ ] **Step 2.2**: Configure trigger:

  ```
  Send: Immediately after booking
  Condition: Booking status = Confirmed
  Include: Attach invoice PDF
  ```

- [ ] **Step 2.3**: Create email template:

  ```html
  Subject: Booking Confirmed - Sumba Sunset Surf Camp Dear [Guest Name], 🏄 Your
  surf adventure is confirmed! Booking Details: - Confirmation #: [Booking ID] -
  Check-in: [Check-in Date] - Check-out: [Check-out Date] - Room: [Room Type] -
  Guests: [Number of Guests] - Total: [Total Amount] - Deposit Paid: [Deposit
  Amount] ✅ - Balance Due on Arrival: [Balance Amount] What's Next: 1. We'll
  send pre-arrival information 7 days before 2. Save this confirmation for your
  records 3. Contact us anytime via WhatsApp: +27 78 778 7591 Questions? Reply
  to this email or WhatsApp us! Mahalo, The Sumba Sunset Team [Property Address]
  [Contact Details]
  ```

- [ ] **Step 2.4**: Test confirmation email:
  - Create test booking
  - Verify email received
  - Check mobile display

**Confirmation Template Checkpoint:** Tested and working

---

### Phase 3: Pre-Arrival Information Template

**User & Claude create content:**

- [ ] **Step 3.1**: Go to Auto Email → New Auto Email
- [ ] **Step 3.2**: Configure pre-arrival trigger:

  ```
  Name: Pre-Arrival Information
  Send: 7 days before check-in
  Time: 09:00 guest timezone
  Condition: Booking confirmed
  ```

- [ ] **Step 3.3**: Create pre-arrival template:

  ```html
  Subject: Get Ready for Sumba! - Pre-Arrival Information Aloha [Guest Name]!
  Your Sumba adventure starts in 7 days! 🌴 GETTING HERE: 📍 Airport: Tambolaka
  Airport (TMC) ✈️ Flights: Multiple daily from Bali (1.5 hours) 🚗 Airport
  Transfer: - We can arrange pickup ($X per car) - Journey time: 1.5 hours -
  WhatsApp us to arrange: +27 78 778 7591 WHAT TO BRING: ☀️ Reef-safe sunscreen
  (important!) 👙 Swimwear & beach clothes 🩴 Flip-flops/sandals 📷 Camera for
  amazing sunsets 💵 Cash for balance payment & activities SURF INFO: 🏄 Current
  conditions: [Season-appropriate info] 📏 Boards available for rent 👨‍🏫 Lessons
  available (book now to secure spot) PAYMENT REMINDER: 💳 Deposit paid:
  [Deposit Amount] 💵 Balance due on arrival: [Balance Amount] Payment methods:
  Cash (USD/IDR) or card Questions? We're here to help! WhatsApp: +27 78 778
  7591 See you soon! The Sumba Sunset Team
  ```

- [ ] **Step 3.4**: Test with date calculation

**Pre-Arrival Template Checkpoint:** Configured and tested

---

### Phase 4: Check-In Details Template

**User & Claude create content:**

- [ ] **Step 4.1**: Create check-in reminder:
- [ ] **Step 4.2**: Configure trigger:

  ```
  Name: Check-in Details
  Send: 1 day before arrival
  Time: 15:00 guest timezone
  ```

- [ ] **Step 4.3**: Create check-in template:

  ```html
  Subject: Tomorrow's the Day! Check-in Details Hi [Guest Name]! We're excited
  to welcome you tomorrow! 🎉 CHECK-IN DETAILS: 📅 Date: [Check-in Date] ⏰
  Check-in Time: 14:00 (2 PM) 📍 Location: [Property Address] 📱 WhatsApp on
  arrival: +27 78 778 7591 DIRECTIONS: [Detailed directions from airport/town]
  Google Maps: [Link] ARRIVAL CHECKLIST: ✓ Passport/ID for check-in ✓ Booking
  confirmation (this email) ✓ Balance payment: [Balance Amount] ✓ Smile - you're
  in paradise! 😊 EARLY/LATE ARRIVAL: - Early? We'll store your bags - Late? No
  problem, just let us know - Night arrival? We'll leave your key WiFi Password:
  [Will provide on arrival] Safe travels! The Sumba Sunset Team
  ```

- [ ] **Step 4.4**: Test timing accuracy

**Check-in Template Checkpoint:** Ready for guests

---

### Phase 5: Post-Stay Thank You Template

**User & Claude create content:**

- [ ] **Step 5.1**: Create post-stay email:
- [ ] **Step 5.2**: Configure trigger:

  ```
  Name: Thank You & Review Request
  Send: 1 day after check-out
  Time: 10:00 guest timezone
  ```

- [ ] **Step 5.3**: Create thank you template:

  ```html
  Subject: Mahalo from Sumba Sunset! Dear [Guest Name], Thank you for choosing
  Sumba Sunset! 🙏 We hope you enjoyed your stay and caught some amazing waves
  (and sunsets!). SHARE YOUR EXPERIENCE: Your feedback helps us improve and
  helps other travelers discover Sumba. 📝 Review us on: - Google: [Link] -
  TripAdvisor: [Link] - Facebook: [Link] 📸 Tag us in your photos: - Instagram:
  @sumbasunset - Use #SumbaSunset COME BACK SOON: 🎁 Returning guests get 10%
  off! 📅 Book direct for best rates STAY CONNECTED: - Newsletter: [Subscribe
  Link] - Instagram: @sumbasunset - WhatsApp: +27 78 778 7591 Missing something?
  Let us know and we'll help! Until next time, The Sumba Sunset Team P.S. Did
  you know? "Mahalo" means thank you in Hawaiian - surfers' universal language!
  🤙
  ```

- [ ] **Step 5.4**: Configure review platform links

**Post-Stay Template Checkpoint:** Feedback loop created

---

### Phase 6: Additional Templates

**Optional but recommended:**

- [ ] **Step 6.1**: Payment reminder (if needed):

  ```
  For bookings with payment plans
  Send 3 days before due date
  ```

- [ ] **Step 6.2**: Cancellation confirmation:

  ```
  Confirms cancellation
  States refund policy
  Provides refund timeline
  ```

- [ ] **Step 6.3**: Modification confirmation:

  ```
  Confirms date/room changes
  Updates payment if needed
  ```

- [ ] **Step 6.4**: Special offers template:
  ```
  For past guests
  Seasonal promotions
  Last-minute deals
  ```

**Additional Templates Checkpoint:** Optional templates configured

---

### Phase 7: Testing & Refinement

- [ ] **Step 7.1**: Create test booking for full cycle:
  - Confirmation email
  - Pre-arrival (adjust date to test)
  - Check-in details
  - Thank you email

- [ ] **Step 7.2**: Test on multiple devices:
  - Desktop email clients
  - Mobile Gmail app
  - Mobile Apple Mail
  - Web-based email

- [ ] **Step 7.3**: Check spam scoring:
  - Use mail-tester.com
  - Fix any spam triggers
  - Verify SPF/DKIM if needed

- [ ] **Step 7.4**: Get feedback:
  - Send to team members
  - Check readability
  - Verify all links work

**Testing Checkpoint:** All emails tested and optimized

---

## Quality Gates Checklist

- [ ] All 4 core templates configured
- [ ] Triggers set correctly
- [ ] Mobile responsive verified
- [ ] Branding consistent
- [ ] No spelling/grammar errors
- [ ] Links tested and working
- [ ] Personalization tokens work
- [ ] Test emails delivered (not spam)
- [ ] Admin BCC working
- [ ] PDF attachments included

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Full Cycle Test**
   - [ ] Create future test booking
   - [ ] Receive confirmation
   - [ ] Manually trigger pre-arrival
   - [ ] Manually trigger check-in
   - [ ] Manually trigger thank you

2. **Content Review**
   - [ ] Information accurate
   - [ ] Tone appropriate
   - [ ] No placeholder text
   - [ ] Contact details correct

3. **Mobile Testing**
   - [ ] iPhone Mail app
   - [ ] Gmail mobile app
   - [ ] Android default mail

4. **Link Testing**
   - [ ] WhatsApp link opens chat
   - [ ] Google Maps link works
   - [ ] Review platform links correct
   - [ ] Social media links work

---

## Notes

### Email Best Practices

- Subject lines under 50 characters
- Preheader text for mobile preview
- Single column layout for mobile
- Buttons at least 44px tall
- Alt text for images
- Plain text fallback

### Personalization Tokens

Common Beds24 tokens:

- [Guest Name] - Guest's full name
- [First Name] - First name only
- [Booking ID] - Confirmation number
- [Check-in Date] - Formatted date
- [Room Type] - Room name
- [Total Amount] - Total price
- [Balance Amount] - Remaining due

### Timing Considerations

- Send pre-arrival when guests likely planning
- Check-in details when packing/traveling
- Thank you while experience fresh
- Avoid late night sends

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
