---
task_id: ss-36
title: '[Infrastructure] Upgrade Twilio WhatsApp to Production Number'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-18, ss-35]
created: 2025-10-25
started: null
completed: null
related_docs: [ss-4-credentials-setup.md, ss-18-twilio-integration.md]
infra_type: configuration
---

[← Previous: SS-35 SEO Optimization](./ss-35-seo-optimization.md) | [📋 Index](./index.md) | [Next: SS-37 Remove Pre-Launch Banner →](./ss-37-remove-banner.md)

# [Infrastructure] Upgrade Twilio WhatsApp to Production Number

## Overview

Upgrade from Twilio Sandbox WhatsApp number (used during development) to a production WhatsApp-enabled Twilio number before official launch. This ensures professional WhatsApp business integration and removes sandbox limitations.

**Infrastructure Type:** Configuration
**Impact:** Production only (contact form WhatsApp integration)
**Risk Level:** Low (simple environment variable update)

**Business Value:**

- Professional WhatsApp integration (no sandbox join code required for guests)
- Reliable message delivery without sandbox limitations
- WhatsApp Business features (profile, verified business badge)
- Better deliverability and trust with Meta/WhatsApp platform
- Consistent sender number (sandbox number can change)

---

## Problem Statement

### Current Situation

During development (SS-4 through SS-35), the contact form uses **Twilio Sandbox** for WhatsApp:

- **Sandbox Number**: `whatsapp:+14155238886` (Twilio's shared test number)
- **Limitation**: Recipients must "join" sandbox by sending a code before receiving messages
- **Not suitable for production**: Guests can't receive messages without joining sandbox first
- **Purpose**: Free testing during development without purchasing production number

### Pain Points

- **Guest friction**: Users can't receive WhatsApp responses without joining Twilio sandbox
- **Not professional**: Sandbox is for testing only, not production use
- **Shared resource**: Sandbox number shared with other Twilio developers
- **No business profile**: Can't set up WhatsApp Business profile with sandbox
- **Rate limits**: Sandbox has stricter rate limits than production

### Desired Outcome

After this task:

- Production WhatsApp-enabled Twilio number purchased and configured
- Staff WhatsApp receives contact form submissions from production number
- No sandbox join code required for guests
- WhatsApp Business profile configured (name, description, profile image)
- All contact form messages use production number
- Environment variables updated in `.env.local` and Vercel

---

## Solution Design

### Proposed Infrastructure

**Simple upgrade process:**

1. Purchase WhatsApp-enabled Twilio phone number (~$1-2/month)
2. Complete Facebook Business verification (required by Meta for WhatsApp)
3. Configure WhatsApp Business profile
4. Update **ONLY** `TWILIO_WHATSAPP_NUMBER` environment variable
5. Test contact form end-to-end with production number

**Key Point:** All other Twilio credentials stay the same (Account SID, Auth Token, Staff WhatsApp Number).

### Architecture/Flow Diagram

```
BEFORE (Sandbox - Development):
Guest submits contact form
    ↓
Next.js API Route
    ↓
Twilio API (Account SID + Auth Token)
    ↓
WhatsApp message FROM: whatsapp:+14155238886 (sandbox)
    ↓
Staff WhatsApp (must have joined sandbox to receive)

AFTER (Production - Launch):
Guest submits contact form
    ↓
Next.js API Route
    ↓
Twilio API (SAME Account SID + Auth Token)
    ↓
WhatsApp message FROM: whatsapp:+1234567890 (your production number)
    ↓
Staff WhatsApp (no sandbox join required)
```

### Tools & Technologies

- **Twilio Phone Number**: WhatsApp-enabled number (~$1-2/month)
- **Facebook Business Manager**: Required for WhatsApp Business verification
- **Twilio Console**: Configure WhatsApp settings
- **Vercel Dashboard**: Update production environment variables
- **.env.local**: Update local development environment

### Configuration Files

Environment variable updates only (no code changes):

- `.env.local` - Update `TWILIO_WHATSAPP_NUMBER` locally
- Vercel Environment Variables - Update `TWILIO_WHATSAPP_NUMBER` in production

### Alternatives Considered

**Alternative 1: Continue with Sandbox**

- Pros: Free, no setup required
- Cons: Not suitable for production, guests can't receive messages
- Why rejected: Not viable for production use

**Alternative 2: Use Different Service (WhatsApp Business API)**

- Pros: Direct Meta integration
- Cons: More expensive, complex setup, requires Facebook Business verification anyway
- Why rejected: Twilio already integrated, simpler upgrade path

**Alternative 3: Use SMS Instead of WhatsApp**

- Pros: No WhatsApp verification needed
- Cons: Staff preference is WhatsApp, higher cost per message
- Why rejected: WhatsApp is staff's preferred communication channel

---

## Prerequisites/Dependencies

- [ ] SS-18 completed (Twilio integration with sandbox)
- [ ] SS-35 completed (all features tested and ready for launch)
- [ ] Twilio account in good standing (no payment issues)
- [ ] Credit card added to Twilio account (for purchasing number)
- [ ] Access to Vercel Dashboard (for updating environment variables)
- [ ] Facebook Business Manager account created (for WhatsApp verification)

**User Prerequisites:**

- [ ] Budget approved for Twilio number (~$1-2/month recurring)
- [ ] Time allocated for Facebook Business verification (can take 1-3 days)

---

## Acceptance Criteria

- [ ] **AC1**: Production WhatsApp-enabled Twilio number purchased and active
- [ ] **AC2**: Facebook Business verification completed (WhatsApp approved)
- [ ] **AC3**: WhatsApp Business profile configured (name, description, profile image)
- [ ] **AC4**: `TWILIO_WHATSAPP_NUMBER` updated in `.env.local`
- [ ] **AC5**: `TWILIO_WHATSAPP_NUMBER` updated in Vercel (all environments)
- [ ] **AC6**: Contact form sends messages from production number successfully
- [ ] **AC7**: Staff WhatsApp receives messages without sandbox join code
- [ ] **AC8**: No sandbox references remain in environment variables
- [ ] **AC9**: Documentation updated with production number setup
- [ ] **AC10**: Old sandbox configuration documented for reference (in case rollback needed)

---

## Verification Steps

Since this is infrastructure configuration (no code changes), verification is manual:

### 1. **Purchase Verification**

- [ ] WhatsApp-enabled number purchased in Twilio Console
- [ ] Number shows as "Active" in Twilio Dashboard
- [ ] WhatsApp capability enabled on number

### 2. **Facebook Verification**

- [ ] Facebook Business Manager account created/linked
- [ ] WhatsApp Business verification submitted
- [ ] Verification approved (can take 1-3 days)
- [ ] WhatsApp Business profile visible in Twilio Console

### 3. **Environment Variable Verification**

- [ ] `.env.local` updated with production number
- [ ] Vercel environment variables updated (Production, Preview, Development)
- [ ] No references to sandbox number remain

### 4. **End-to-End Testing**

- [ ] Submit contact form on local development (should use production number)
- [ ] Staff WhatsApp receives message from production number
- [ ] Submit contact form on Vercel Preview deployment
- [ ] Staff WhatsApp receives message from production number
- [ ] Submit contact form on production (sumbasunset.com)
- [ ] Staff WhatsApp receives message from production number
- [ ] Test multiple submissions (verify no rate limiting issues)

### 5. **Business Profile Verification**

- [ ] WhatsApp Business profile displays correctly
- [ ] Profile name: "Sumba Sunset Surf Camp" (or similar)
- [ ] Profile description populated
- [ ] Profile image uploaded (optional but recommended)

### Success Metrics

- Number purchase time: < 5 minutes
- Environment variable update time: < 10 minutes
- Facebook verification approval: 1-3 business days
- Total setup time (excluding FB verification wait): < 1 hour
- Message delivery success rate: 100%
- No sandbox join code required

---

## Implementation Steps

### Phase 1: Purchase WhatsApp-Enabled Number

- [ ] **Step 1.1**: Log in to Twilio Console
- [ ] **Step 1.2**: Navigate to Phone Numbers → Buy a Number
- [ ] **Step 1.3**: Filter by "WhatsApp" capability
- [ ] **Step 1.4**: Choose country (recommend US number: +1 for reliability)
- [ ] **Step 1.5**: Purchase number (~$1-2/month + one-time setup fee)
- [ ] **Step 1.6**: Copy purchased number (format: `+1234567890`)
- [ ] **Step 1.7**: Verify number shows as "Active" in console

**Purchase Checkpoint:** ✅ WhatsApp-enabled number purchased and active

---

### Phase 2: Facebook Business Verification

- [ ] **Step 2.1**: Navigate to Twilio Console → Messaging → WhatsApp Senders
- [ ] **Step 2.2**: Click "Set up WhatsApp" or "Connect Facebook Business Manager"
- [ ] **Step 2.3**: Create or link Facebook Business Manager account
- [ ] **Step 2.4**: Submit business verification to Meta (requires business details)
- [ ] **Step 2.5**: Wait for Meta approval (typically 1-3 business days)
- [ ] **Step 2.6**: Receive approval notification from Meta/Twilio
- [ ] **Step 2.7**: Configure WhatsApp Business profile in Twilio Console

**Facebook Verification Checkpoint:** ✅ WhatsApp Business approved by Meta

**Note to User:** This step requires waiting for Meta approval (1-3 days). Claude will pause implementation here and wait for your confirmation that approval is complete.

---

### Phase 3: Configure WhatsApp Business Profile

- [ ] **Step 3.1**: Navigate to Twilio Console → WhatsApp Senders → Your Number
- [ ] **Step 3.2**: Set Display Name: "Sumba Sunset Surf Camp"
- [ ] **Step 3.3**: Set Description: "Surf camp in Sumba, Indonesia. Contact us for bookings and inquiries."
- [ ] **Step 3.4**: Upload profile image (optional - can use logo or property photo)
- [ ] **Step 3.5**: Set business category: "Travel & Hospitality" or "Hotel & Lodging"
- [ ] **Step 3.6**: Save WhatsApp Business profile
- [ ] **Step 3.7**: Verify profile displays correctly in test message

**Profile Configuration Checkpoint:** ✅ WhatsApp Business profile configured

---

### Phase 4: Update Environment Variables

- [ ] **Step 4.1**: Format production number correctly: `whatsapp:+1234567890`
- [ ] **Step 4.2**: Open `.env.local` in project root
- [ ] **Step 4.3**: Find `TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886`
- [ ] **Step 4.4**: Replace with production number: `TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890`
- [ ] **Step 4.5**: Save `.env.local`
- [ ] **Step 4.6**: Verify other Twilio variables unchanged (Account SID, Auth Token, Staff Number)
- [ ] **Step 4.7**: Commit `.env.local` changes (if tracked - usually gitignored)

**Local Environment Checkpoint:** ✅ `.env.local` updated with production number

---

### Phase 5: Update Vercel Environment Variables

- [ ] **Step 5.1**: Log in to Vercel Dashboard
- [ ] **Step 5.2**: Navigate to sumba-sunset project → Settings → Environment Variables
- [ ] **Step 5.3**: Find `TWILIO_WHATSAPP_NUMBER` variable
- [ ] **Step 5.4**: Click "Edit" on `TWILIO_WHATSAPP_NUMBER`
- [ ] **Step 5.5**: Update value to `whatsapp:+1234567890` (production number)
- [ ] **Step 5.6**: Ensure variable applies to: Production ✅ Preview ✅ Development ✅
- [ ] **Step 5.7**: Save changes
- [ ] **Step 5.8**: Trigger redeploy (Vercel → Deployments → Latest → Redeploy)
- [ ] **Step 5.9**: Wait for deployment to complete
- [ ] **Step 5.10**: Verify deployment succeeded (no errors)

**Vercel Environment Checkpoint:** ✅ Production environment variables updated

---

### Phase 6: End-to-End Testing

- [ ] **Step 6.1**: Test locally - submit contact form on `localhost:3000`
- [ ] **Step 6.2**: Verify staff WhatsApp receives message from production number
- [ ] **Step 6.3**: Check message metadata (should show production number as sender)
- [ ] **Step 6.4**: Test on Vercel Preview deployment
- [ ] **Step 6.5**: Verify staff WhatsApp receives message from production number
- [ ] **Step 6.6**: Test on production (https://sumbasunset.com)
- [ ] **Step 6.7**: Verify staff WhatsApp receives message from production number
- [ ] **Step 6.8**: Test multiple rapid submissions (verify no rate limiting)
- [ ] **Step 6.9**: Test with different message content (verify all fields pass through)
- [ ] **Step 6.10**: Verify no sandbox join code required

**Testing Checkpoint:** ✅ Contact form working with production WhatsApp number

---

### Phase 7: Documentation & Cleanup

- [ ] **Step 7.1**: Update SS-4 planning doc with production number (mark sandbox as deprecated)
- [ ] **Step 7.2**: Update SS-18 planning doc with production number details
- [ ] **Step 7.3**: Document sandbox configuration for reference (in case rollback needed)
- [ ] **Step 7.4**: Add production number to `.env.example` template
- [ ] **Step 7.5**: Update CLAUDE.md with production WhatsApp setup notes (if needed)
- [ ] **Step 7.6**: Update README.md with production environment variables (if listed)
- [ ] **Step 7.7**: Create troubleshooting guide for WhatsApp message delivery issues

**Documentation Checkpoint:** ✅ All documentation updated with production setup

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] Production WhatsApp-enabled number purchased and active
- [ ] Facebook Business verification approved by Meta
- [ ] WhatsApp Business profile configured (name, description)
- [ ] `.env.local` updated with production number
- [ ] Vercel environment variables updated (all environments)
- [ ] Contact form tested locally - messages delivered successfully
- [ ] Contact form tested on Vercel Preview - messages delivered successfully
- [ ] Contact form tested on production - messages delivered successfully
- [ ] Staff WhatsApp receives messages without sandbox join code
- [ ] Message delivery success rate: 100%
- [ ] No sandbox references remain in environment variables
- [ ] Documentation updated (SS-4, SS-18, .env.example)
- [ ] Troubleshooting guide created
- [ ] Rollback plan documented (how to revert to sandbox if needed)
- [ ] Planning doc fully checked off
- [ ] Git commit created (if applicable)

---

## Post-Implementation Verification

### Manual Verification Steps (User Required)

1. **Production Message Testing**
   - [ ] Submit real contact form on https://sumbasunset.com
   - [ ] Verify message arrives on staff WhatsApp within 30 seconds
   - [ ] Verify sender shows as production number (not sandbox)
   - [ ] Verify all form fields appear in message (name, email, message)
   - [ ] Reply to message on WhatsApp to verify two-way communication works

2. **WhatsApp Business Profile Check**
   - [ ] Open received message on WhatsApp
   - [ ] Tap on sender profile
   - [ ] Verify business name displays: "Sumba Sunset Surf Camp"
   - [ ] Verify business description appears
   - [ ] Verify profile image displays (if uploaded)

3. **Rate Limiting Test**
   - [ ] Submit contact form 3 times rapidly (within 1 minute)
   - [ ] Verify all 3 messages arrive (rate limiting allows legitimate use)
   - [ ] Verify no error messages on form

4. **Cross-Device Testing**
   - [ ] Test contact form on desktop browser
   - [ ] Test contact form on mobile browser
   - [ ] Test contact form on different browsers (Chrome, Safari, Firefox)
   - [ ] Verify all messages deliver successfully

5. **Monitoring Setup**
   - [ ] Check Twilio Console → Monitor → Logs for message delivery
   - [ ] Verify no errors in message logs
   - [ ] Set up Twilio alerts for failed messages (optional but recommended)

---

## Rollback Plan

If production WhatsApp number causes issues:

**Rollback Risk:** Low (simple environment variable change)
**Rollback Time:** < 5 minutes

### Rollback Steps

```bash
# 1. Revert .env.local to sandbox number
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# 2. Update Vercel environment variable back to sandbox
# (via Vercel Dashboard → Settings → Environment Variables)

# 3. Redeploy production
# (via Vercel Dashboard → Deployments → Redeploy)
```

### When to Rollback

- Production number not receiving messages
- Facebook Business verification rejected/revoked
- Message delivery rate < 90%
- Twilio account suspended/payment issues
- Critical bug only affecting production number

### Rollback Verification

- [ ] Sandbox number restored in `.env.local`
- [ ] Sandbox number restored in Vercel
- [ ] Contact form sends messages successfully
- [ ] Staff WhatsApp receives messages (must rejoin sandbox)
- [ ] Document reason for rollback

**After Rollback:**

- Investigate root cause
- Fix underlying issue
- Attempt production upgrade again

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.env.example` - Update example value to production number format
- [ ] `ss-4-credentials-setup.md` - Add note about production upgrade
- [ ] `ss-18-twilio-integration.md` - Document production number usage
- [ ] `.claude/CLAUDE.md` - Update Twilio WhatsApp configuration notes (if needed)
- [ ] `README.md` - Update environment variables section (if applicable)

---

## Monitoring & Maintenance

### How to Monitor

**Twilio Console Dashboard:**

- URL: https://console.twilio.com/monitor/logs/messages
- Check daily for failed message deliveries
- Look for error codes: 30008 (unknown number), 63016 (rate limit)

**Key Metrics:**

- Message delivery success rate: Should be > 99%
- Average delivery time: < 5 seconds
- Failed messages per day: Should be 0 (unless guest WhatsApp unreachable)

**Alert Thresholds:**

- 3+ failed messages in 1 hour: Investigate immediately
- Delivery time > 30 seconds: Check Twilio service status
- WhatsApp number suspended: Contact Twilio support urgently

### Maintenance Tasks

**Monthly:**

- Review Twilio bill (should be ~$1-2/month)
- Check message logs for patterns/issues
- Verify WhatsApp Business profile still active

**Quarterly:**

- Review message delivery success rate
- Update WhatsApp Business profile if business details change
- Verify Facebook Business Manager account in good standing

**As Needed:**

- Renew Facebook Business verification (typically annual)
- Update business profile (name, description, image)
- Respond to Twilio/Meta compliance requests

### Common Issues & Solutions

**Issue 1: Messages Not Delivering**

- Symptoms: Staff WhatsApp not receiving contact form messages
- Solutions:
  1. Check Twilio Console logs for error codes
  2. Verify `TWILIO_WHATSAPP_NUMBER` in Vercel is correct format
  3. Verify `STAFF_WHATSAPP_NUMBER` is correct and has WhatsApp installed
  4. Check Twilio account balance (low balance can pause messages)
  5. Verify WhatsApp Business profile not suspended

**Issue 2: Facebook Business Verification Rejected**

- Symptoms: Meta rejects WhatsApp Business verification
- Solutions:
  1. Ensure business information is accurate and complete
  2. Provide additional documentation (business license, website)
  3. Contact Meta/Twilio support for clarification
  4. Temporary fallback: Use sandbox number until approval

**Issue 3: Rate Limiting**

- Symptoms: Contact form shows error "Too many requests"
- Solutions:
  1. Review rate limiting rules in Next.js API route
  2. Check Twilio account limits (may need upgrade for high volume)
  3. Verify not being spammed (implement CAPTCHA if needed)

**Issue 4: WhatsApp Number Suspended**

- Symptoms: Messages stop delivering, Twilio shows number suspended
- Solutions:
  1. Check Twilio/Meta notifications for suspension reason
  2. Address compliance issue (usually spam complaints)
  3. Contact Twilio support to appeal suspension
  4. Implement stricter rate limiting to prevent abuse

---

## Related Tasks

**Depends On:**

- [SS-4: Third-Party Credentials & Access Setup](./ss-4-credentials-setup.md) - Initial Twilio setup with sandbox
- [SS-18: Twilio Integration (WhatsApp Forwarding)](./ss-18-twilio-integration.md) - Contact form → WhatsApp integration
- [SS-35: SEO Optimization](./ss-35-seo-optimization.md) - All features complete and tested

**Enables:**

- [SS-37: Remove Pre-Launch Banner](./ss-37-remove-banner.md) - Site ready for public launch
- [SS-39: Final Pre-Launch Checklist](./ss-39-final-checklist.md) - Production WhatsApp required for launch QA

**Related Infrastructure:**

- [SS-4: Credentials Setup](./ss-4-credentials-setup.md) - Original Twilio sandbox configuration

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

### Future Improvements Identified

-

### Follow-up Tasks Created

- [ ] [SS-X: Task Name](./ss-X-task.md) - Description

---

## Configuration Reference

### Environment Variables

```bash
# Production WhatsApp Configuration
TWILIO_ACCOUNT_SID=AC... # (unchanged from sandbox setup)
TWILIO_AUTH_TOKEN=... # (unchanged from sandbox setup)
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890 # UPDATED: Production number
STAFF_WHATSAPP_NUMBER=whatsapp:+62... # (unchanged from sandbox setup)
```

**Important:** Only `TWILIO_WHATSAPP_NUMBER` changes during this upgrade. All other credentials remain the same.

### WhatsApp Number Format

```bash
# Correct format (include country code, no spaces, no dashes)
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# Incorrect formats (will fail)
TWILIO_WHATSAPP_NUMBER=+1234567890 # Missing "whatsapp:" prefix
TWILIO_WHATSAPP_NUMBER=whatsapp:1234567890 # Missing "+"
TWILIO_WHATSAPP_NUMBER=whatsapp:+1 234-567-8900 # Contains spaces/dashes
```

### Twilio Console Quick Links

- **Buy WhatsApp Number**: https://console.twilio.com/us1/develop/phone-numbers/manage/search
- **WhatsApp Senders**: https://console.twilio.com/us1/develop/sms/senders/whatsapp-senders
- **Message Logs**: https://console.twilio.com/monitor/logs/messages
- **Account Balance**: https://console.twilio.com/billing

---

## Notes

### Facebook Business Verification Timeline

- **Submission**: Immediate
- **Review**: Typically 1-3 business days
- **Approval**: Email notification from Meta/Twilio
- **Retry**: If rejected, can resubmit with additional documentation

**Important:** This task cannot be fully completed until Facebook Business verification is approved. Plan accordingly - do not wait until launch day to start this process.

### Cost Breakdown

- **WhatsApp-enabled number**: ~$1-2/month (varies by country)
- **Message delivery**: ~$0.005-0.01 per message (varies by destination)
- **Estimated monthly cost**: $5-10/month for low volume contact form

### Testing Notes

**Before marking complete:**

- Test contact form at least 5 times from production
- Test from different devices/browsers
- Verify all messages arrive within 30 seconds
- Confirm no sandbox join code required

### Security Considerations

- Never commit `.env.local` with production credentials
- Rotate Twilio Auth Token if ever exposed
- Use Vercel's "Sensitive" flag for `TWILIO_AUTH_TOKEN`
- Monitor Twilio logs for suspicious activity

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
