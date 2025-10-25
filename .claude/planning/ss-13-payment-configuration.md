---
task_id: ss-13
title: '[Infrastructure] Beds24 Payment Configuration with Stripe'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-11]
created: 2025-01-20
started: null
completed: null
related_docs: ['./beds24-feasibility-research.md']
branch: ss-13/infra/payment-config
pr_number: null
---

[← Previous: SS-12 Widget Integration](./ss-12-beds24-widget-integration.md) | [📋 Index](./index.md) | [Next: SS-14 Email Templates →](./ss-14-email-templates.md)

# [Infrastructure] Beds24 Payment Configuration with Stripe

## Overview

Configure Stripe payment processing within Beds24 to handle the 50% deposit model. This includes setting up Stripe integration, configuring payment rules, testing payment flow, and ensuring PCI compliance through Beds24's secure payment handling.

**Project Context:**
Sumba Sunset requires a 50% deposit at booking time with the balance due on arrival. Stripe will process online payments while Beds24 handles the payment flow securely.

**User Story:**
As a surf camp owner, I need automated payment processing so that deposits are collected at booking time without manual intervention.

**Business Value:**

- Automated deposit collection
- Reduced no-shows with upfront payment
- Secure PCI-compliant payment processing
- Multiple currency support

---

## Prerequisites/Dependencies

- [x] SS-11: Beds24 account setup completed
- [ ] Stripe account created (or willing to create)
- [ ] Business bank account for payouts
- [ ] Business documentation for Stripe verification

---

## Acceptance Criteria

**This is a configuration task - verification through manual testing.**

- [ ] **AC1**: Stripe account connected to Beds24
- [ ] **AC2**: 50% deposit rule configured
- [ ] **AC3**: Payment methods enabled (Visa, Mastercard, etc.)
- [ ] **AC4**: Test payment processes successfully
- [ ] **AC5**: Confirmation emails include payment details
- [ ] **AC6**: Refund process configured

---

## Verification Steps

### Payment Gateway Verification

- [ ] Stripe shows as connected in Beds24
- [ ] Test payment succeeds
- [ ] Webhook connection verified

### Deposit Configuration

- [ ] 50% calculated correctly
- [ ] Balance amount shown clearly
- [ ] Payment schedule displayed

### Security Verification

- [ ] PCI compliance maintained
- [ ] No card details stored locally
- [ ] Secure payment page (HTTPS)

---

## Implementation Steps

### Phase 1: Stripe Account Setup

**User Actions Required:**

- [ ] **Step 1.1**: Go to https://stripe.com and click "Start now"
- [ ] **Step 1.2**: Create Stripe account:
  - Business email
  - Business type (Individual/Company)
  - Country: Indonesia (or your business country)
  - Business details

- [ ] **Step 1.3**: Complete Stripe verification:
  - Business documentation
  - Bank account details
  - Tax information
  - Identity verification

- [ ] **Step 1.4**: Configure Stripe basics:
  - Business name: "Sumba Sunset Surf Camp"
  - Statement descriptor: "SUMBA SUNSET"
  - Support email and phone

- [ ] **Step 1.5**: Note Stripe API keys:
  - Publishable key (starts with pk\_)
  - Secret key (starts with sk\_)
  - Keep TEST keys for initial setup

**Stripe Setup Checkpoint:** Account verified and activated

---

### Phase 2: Beds24 Payment Gateway Configuration

**User Actions with Claude Guidance:**

- [ ] **Step 2.1**: Login to Beds24 dashboard
- [ ] **Step 2.2**: Navigate to Settings → Payments → Payment Gateways
- [ ] **Step 2.3**: Click "Add Payment Gateway"
- [ ] **Step 2.4**: Select "Stripe" from gateway list

- [ ] **Step 2.5**: Configure Stripe connection:

  ```
  Gateway Name: Stripe
  Status: Active
  Test Mode: Yes (initially)
  Publishable Key: [Your Stripe publishable key]
  Secret Key: [Your Stripe secret key]
  ```

- [ ] **Step 2.6**: Configure webhook endpoint:
  - Copy webhook URL from Beds24
  - Add to Stripe Dashboard → Webhooks
  - Select events: payment_intent.succeeded, payment_intent.failed

- [ ] **Step 2.7**: Test connection:
  - Click "Test Connection"
  - Verify success message

**Gateway Configuration Checkpoint:** Stripe connected to Beds24

---

### Phase 3: Deposit Rules Configuration

**User Actions with Claude Guidance:**

- [ ] **Step 3.1**: Go to Properties → [Your Property] → Booking Rules
- [ ] **Step 3.2**: Navigate to "Deposit/Payment" section

- [ ] **Step 3.3**: Configure deposit settings:

  ```
  Deposit Required: Yes
  Deposit Type: Percentage
  Deposit Amount: 50%
  Deposit Due: Immediately at booking

  Balance Due: On arrival
  Balance Payment: Cash or Card (on-site)
  ```

- [ ] **Step 3.4**: Set payment collection timing:

  ```
  Automatic Charge: Yes
  Charge Timing: Immediate
  Authorization Only: No (full charge)
  Hold Duration: N/A
  ```

- [ ] **Step 3.5**: Configure payment methods:

  ```
  Accepted Cards:
  ☑ Visa
  ☑ Mastercard
  ☑ American Express
  ☐ Discover (optional)
  ☐ JCB (optional)
  ```

- [ ] **Step 3.6**: Set currency handling:
  ```
  Payment Currency: USD (or IDR based on decision)
  Currency Conversion: Stripe handles
  Show Original Currency: Yes
  ```

**Deposit Rules Checkpoint:** 50% deposit model configured

---

### Phase 4: Payment Page Customization

**User Actions with Claude Guidance:**

- [ ] **Step 4.1**: Navigate to Settings → Payments → Payment Page

- [ ] **Step 4.2**: Customize payment page text:

  ```
  Page Title: Secure Payment

  Introduction Text:
  "Your payment is processed securely through Stripe.
  A 50% deposit is required to confirm your booking.
  The remaining balance is due upon arrival."

  Success Message:
  "Payment successful! Your booking is confirmed.
  Check your email for confirmation details."

  Failure Message:
  "Payment could not be processed. Please try again
  or contact us for assistance."
  ```

- [ ] **Step 4.3**: Add security badges/text:

  ```
  Security Text:
  "🔒 Secure Payment - Your card details are encrypted
  and never stored on our servers."

  PCI Compliance: Display badge
  SSL Certificate: Display badge
  ```

- [ ] **Step 4.4**: Configure payment form fields:
  ```
  Required Fields:
  ☑ Cardholder Name
  ☑ Card Number
  ☑ Expiry Date
  ☑ CVV
  ☑ Billing Address
  ☐ Phone Number (optional)
  ```

**Payment Page Checkpoint:** Customized and professional

---

### Phase 5: Refund Policy Setup

**User Actions with Claude Guidance:**

- [ ] **Step 5.1**: Go to Settings → Payments → Refund Settings

- [ ] **Step 5.2**: Configure refund rules:

  ```
  Refund Policy:
  - 30+ days before: 100% minus $25 processing fee
  - 14-29 days: 50% refund
  - 7-13 days: 25% refund
  - <7 days: No refund

  Processing Fee: $25 (or equivalent)
  Refund Method: Original payment method
  Refund Timing: 5-7 business days
  ```

- [ ] **Step 5.3**: Set refund permissions:

  ```
  Who Can Process Refunds: Admin only
  Require Reason: Yes
  Send Notification: Yes (to guest and admin)
  ```

- [ ] **Step 5.4**: Create refund email template:

  ```
  Subject: Refund Processed - Sumba Sunset Booking

  Body: Include refund amount, reason, timeline
  ```

**Refund Configuration Checkpoint:** Policy configured

---

### Phase 6: Testing Payment Flow

**Critical: Use Stripe TEST mode first!**

- [ ] **Step 6.1**: Create test booking in Beds24:
  - Select future dates
  - Choose room
  - Enter test guest details

- [ ] **Step 6.2**: Test with Stripe test cards:

  ```
  Success: 4242 4242 4242 4242
  Decline: 4000 0000 0000 0002
  3D Secure: 4000 0025 0000 3155
  ```

- [ ] **Step 6.3**: Verify payment flow:
  - [ ] Payment page loads securely (HTTPS)
  - [ ] 50% amount calculated correctly
  - [ ] Card validation works
  - [ ] Success redirects properly
  - [ ] Confirmation email sent

- [ ] **Step 6.4**: Check Stripe dashboard:
  - [ ] Payment appears in test payments
  - [ ] Amount matches 50% of booking
  - [ ] Customer created
  - [ ] Webhook delivered

- [ ] **Step 6.5**: Test refund process:
  - Process refund from Beds24
  - Verify in Stripe dashboard
  - Check refund email sent

**Testing Checkpoint:** All payment scenarios tested

---

### Phase 7: Production Activation

**User Actions Required:**

- [ ] **Step 7.1**: Complete Stripe account activation:
  - All verification complete
  - Bank account verified
  - Business details approved

- [ ] **Step 7.2**: Switch to live keys in Beds24:

  ```
  Test Mode: No
  Live Publishable Key: pk_live_...
  Live Secret Key: sk_live_...
  ```

- [ ] **Step 7.3**: Update webhook for production:
  - Add production webhook URL
  - Configure live endpoint

- [ ] **Step 7.4**: Do final live test:
  - Small amount booking ($1)
  - Verify in live Stripe dashboard
  - Process refund

- [ ] **Step 7.5**: Document configuration:
  - Payment gateway ID
  - Webhook endpoint URL
  - Refund policy details

**Production Checkpoint:** Live payments active

---

## Quality Gates Checklist

**User & Claude MUST verify ALL items:**

- [ ] Stripe account verified and active
- [ ] Stripe connected to Beds24
- [ ] 50% deposit rule configured
- [ ] Test payments successful
- [ ] Refund process works
- [ ] Payment page customized
- [ ] Security badges displayed
- [ ] Confirmation emails include payment info
- [ ] Webhook connection verified
- [ ] Production keys configured (when ready)
- [ ] Documentation complete

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Test Mode Verification**
   - [ ] Create test booking
   - [ ] Pay with test card 4242...
   - [ ] Verify in Stripe test dashboard
   - [ ] Check confirmation email

2. **Payment Calculation Test**
   - [ ] Book $100 room → $50 deposit
   - [ ] Book $200 room → $100 deposit
   - [ ] Multi-night calculations correct

3. **Error Handling Test**
   - [ ] Declined card shows error
   - [ ] Invalid card rejected
   - [ ] Network error handled

4. **Refund Test**
   - [ ] Process partial refund
   - [ ] Process full refund
   - [ ] Verify in Stripe

5. **Production Test (when live)**
   - [ ] Small real payment
   - [ ] Immediate refund
   - [ ] Verify bank deposit (3-5 days)

---

## Rollback Plan

If payment issues occur:

1. **Immediate**: Disable payment gateway in Beds24
2. **Fallback**: Accept bank transfers temporarily
3. **Fix**: Debug with Stripe support
4. **Alternative**: Consider PayPal as backup

**Risk Assessment:** Medium (payment is critical)
**Rollback Difficulty:** Easy (just disable gateway)

---

## Notes

### Stripe Fees (2024)

- Indonesia: 2.9% + $0.30 per transaction
- International cards: +1% additional
- Currency conversion: +2% if applicable
- Refunds: Fees not returned

### PCI Compliance

- Beds24 handles PCI compliance
- Never store card details locally
- Always use HTTPS for payment pages
- Regular security updates required

### Common Issues

1. **3D Secure**: Some cards require additional authentication
2. **Currency**: Ensure consistency (USD vs IDR)
3. **Webhooks**: Must be HTTPS endpoint
4. **Timeouts**: Set appropriate timeout values

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
