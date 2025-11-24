---
task_id: ss-43
title: '[Infrastructure] Gmail Email Integration for info@sumbasunset.com'
status: not_started
priority: medium
estimated_time: '1-2 hours'
actual_time: null
dependencies: []
created: 2025-01-19
started: null
completed: null
related_docs: []
infra_type: configuration
---

[← Previous: SS-42 Go Live Announcement](./ss-42-go-live-announcement.md) | [📋 Index](./index.md)

# [Infrastructure] Gmail Email Integration for info@sumbasunset.com

## Overview

Configure Gmail to receive and send emails using the `info@sumbasunset.com` email address (hosted on Hostinger). This enables professional email communication through a familiar Gmail interface.

**Infrastructure Type:** Configuration (Email Integration)
**Impact:** Business communication workflows
**Risk Level:** Low (configuration only, no code changes)

**Business Value:**

- Professional email communication with guests from Gmail
- Unified inbox (all emails in one place)
- Superior spam filtering and search via Gmail
- Mobile access through Gmail apps
- Team collaboration ready (can add multiple team members later)

---

## Problem Statement

### Current Situation

The `info@sumbasunset.com` email address exists on Hostinger but:

- Must be accessed through Hostinger's webmail interface (clunky)
- Not integrated with personal email workflow
- Difficult to manage on mobile devices
- No advanced search or filtering capabilities
- Harder to collaborate with team members

### Pain Points

- Context switching between Gmail and Hostinger webmail
- Poor mobile experience with Hostinger webmail
- Limited spam filtering on Hostinger
- Difficult to find old emails (search is limited)
- No integration with other Google tools

### Desired Outcome

- Receive all `info@sumbasunset.com` emails in Gmail inbox
- Send emails AS `info@sumbasunset.com` from Gmail interface
- Maintain professional appearance (from address shows info@sumbasunset.com)
- Access on all devices (desktop, mobile, tablet)
- No cost (use free Gmail account)

---

## Solution Design

### Proposed Infrastructure

Use Gmail's built-in "Check mail from other accounts" feature (FREE) to:

1. **Fetch emails** from Hostinger using POP3/IMAP
2. **Send emails** through Hostinger using SMTP
3. **Label incoming emails** for organization
4. **Maintain professional appearance** with custom from address

### Architecture/Flow Diagram

```
Incoming Email Flow:
Guest sends email → info@sumbasunset.com (Hostinger) → Gmail fetches via IMAP → Gmail Inbox

Outgoing Email Flow:
Reply in Gmail → Gmail sends via Hostinger SMTP → Recipient sees "from: info@sumbasunset.com"
```

### Tools & Technologies

- **Gmail**: Free email client with advanced features
- **Hostinger Email**: Email hosting service (already configured)
- **IMAP Protocol**: For receiving emails (port 993, SSL)
- **SMTP Protocol**: For sending emails (port 465, SSL)

### Configuration Details

**Hostinger Mail Server Settings:**

```
Incoming Mail (IMAP):
- Server: imap.hostinger.com
- Port: 993
- Security: SSL/TLS
- Username: info@sumbasunset.com
- Password: [From Hostinger hPanel]

Outgoing Mail (SMTP):
- Server: smtp.hostinger.com
- Port: 465
- Security: SSL/TLS
- Username: info@sumbasunset.com
- Password: [Same as IMAP]
```

### Alternatives Considered

**Alternative 1: Email Forwarding Only**

- Pros: Simple setup (1 step)
- Cons: Cannot send from info@sumbasunset.com, only receive
- Why rejected: Need to maintain professional appearance when replying to guests

**Alternative 2: Google Workspace (Paid)**

- Pros: Native integration, admin controls, team features
- Cons: $6-18/month per user, overkill for current needs
- Why rejected: Free Gmail feature is sufficient for now

**Alternative 3: Continue using Hostinger Webmail**

- Pros: No configuration needed
- Cons: Poor UX, no mobile app, limited features
- Why rejected: Inefficient workflow, poor guest experience

---

## Prerequisites/Dependencies

- [x] `info@sumbasunset.com` email account exists on Hostinger
- [ ] Know Hostinger email password (retrieve from hPanel if needed)
- [ ] Have access to Gmail account for configuration
- [ ] Hostinger account login credentials available

---

## Acceptance Criteria

- [ ] **AC1**: Gmail configured to receive emails from info@sumbasunset.com
- [ ] **AC2**: Gmail configured to send emails AS info@sumbasunset.com
- [ ] **AC3**: Test email sent TO info@sumbasunset.com arrives in Gmail
- [ ] **AC4**: Test email sent FROM Gmail shows "info@sumbasunset.com" in recipient's inbox
- [ ] **AC5**: Reply-to address is info@sumbasunset.com (not personal Gmail)
- [ ] **AC6**: Email verification completed (Gmail confirmation process)
- [ ] **AC7**: Mobile access confirmed (Gmail app on phone)
- [ ] **AC8**: Documentation updated with setup details

---

## Verification Steps

Since this is infrastructure configuration (not code), verification is manual:

### Manual Testing Checklist

1. **Receiving Test**
   - [ ] Send test email TO info@sumbasunset.com from external address
   - [ ] Email appears in Gmail inbox within 5 minutes
   - [ ] Email has correct label/folder (if configured)
   - [ ] No delivery errors

2. **Sending Test**
   - [ ] Compose new email in Gmail, select "From: info@sumbasunset.com"
   - [ ] Send to test recipient (personal email)
   - [ ] Recipient sees "From: info@sumbasunset.com" (NOT personal Gmail)
   - [ ] Email delivers successfully

3. **Reply Test**
   - [ ] Reply to test email received in step 1
   - [ ] Send reply using info@sumbasunset.com from address
   - [ ] Recipient receives reply with correct from address
   - [ ] Reply-to header is info@sumbasunset.com

4. **Mobile Test**
   - [ ] Open Gmail app on mobile device
   - [ ] Verify info@sumbasunset.com emails visible
   - [ ] Send test email from mobile using info@sumbasunset.com
   - [ ] Confirm delivery and correct from address

5. **Error Handling Test**
   - [ ] Verify error message clear if wrong password
   - [ ] Test what happens if Hostinger server down (graceful failure)
   - [ ] Verify Gmail continues to work for personal emails

---

## Implementation Steps

### Phase 1: Retrieve Hostinger Email Credentials (USER - 15 minutes)

- [ ] **Step 1.1**: Log into Hostinger hPanel
  - Visit: https://hpanel.hostinger.com
  - Enter your Hostinger account credentials
  - Navigate to dashboard

- [ ] **Step 1.2**: Find email account settings
  - Click **Emails** in left sidebar
  - Click **Email Accounts**
  - Find `info@sumbasunset.com` in list

- [ ] **Step 1.3**: Retrieve or reset password
  - Click **Manage** next to info@sumbasunset.com
  - Option A: View existing password (if available)
  - Option B: Change password to new strong password
  - Store password in password manager (1Password, LastPass, etc.)

- [ ] **Step 1.4**: Verify mail server settings
  - Confirm server addresses:
    - IMAP: `imap.hostinger.com`
    - SMTP: `smtp.hostinger.com`
  - Note ports: 993 (IMAP), 465 (SMTP)
  - Document settings for next phase

**Checkpoint:** Have Hostinger email password and server settings ready

---

### Phase 2: Configure Gmail to Receive Emails (USER - 20 minutes)

- [ ] **Step 2.1**: Open Gmail settings
  - Open Gmail in browser: https://mail.google.com
  - Click **Settings** (gear icon) in top right
  - Click **See all settings**
  - Navigate to **Accounts and Import** tab

- [ ] **Step 2.2**: Add email account
  - Under "Check mail from other accounts", click **Add a mail account**
  - Enter: `info@sumbasunset.com`
  - Click **Next**

- [ ] **Step 2.3**: Choose import method
  - Select: **Import emails from my other account (POP3)**
  - Click **Next**
  - _(Note: IMAP is preferred but Gmail only supports POP3 for this feature)_

- [ ] **Step 2.4**: Enter Hostinger POP3 settings
  - **Username**: `info@sumbasunset.com`
  - **Password**: [Password from Phase 1]
  - **POP Server**: `pop.hostinger.com`
  - **Port**: `995`
  - ✅ Check "Always use a secure connection (SSL)"
  - ✅ Check "Label incoming messages" (recommended)
    - Label will be: "info@sumbasunset.com"
  - ❌ Uncheck "Archive incoming messages" (keep in inbox)
  - Click **Add Account**

- [ ] **Step 2.5**: Wait for Gmail verification
  - Gmail will test connection
  - Should succeed within 30 seconds
  - If error: double-check username, password, server address

**Checkpoint:** Gmail successfully fetching emails from info@sumbasunset.com

---

### Phase 3: Configure Gmail to Send Emails (USER - 20 minutes)

- [ ] **Step 3.1**: Add send-as address
  - After adding receive account, Gmail will ask:
    - "Would you also like to be able to send mail as info@sumbasunset.com?"
  - Click **Yes**
  - If you missed this prompt:
    - Settings → Accounts and Import → "Send mail as" → **Add another email address**

- [ ] **Step 3.2**: Configure sender details
  - **Name**: `Sumba Sunset` (or your preferred display name)
  - **Email address**: `info@sumbasunset.com`
  - ❌ Uncheck "Treat as an alias" (recommended for professional emails)
  - Click **Next Step**

- [ ] **Step 3.3**: Enter Hostinger SMTP settings
  - **SMTP Server**: `smtp.hostinger.com`
  - **Port**: `465`
  - **Username**: `info@sumbasunset.com`
  - **Password**: [Same password from Phase 1]
  - ✅ Select "Secured connection using SSL"
  - Click **Add Account**

- [ ] **Step 3.4**: Verify email address
  - Gmail will send a confirmation code to info@sumbasunset.com
  - Wait 1-2 minutes for email to arrive in Gmail inbox
    - It should appear with label "info@sumbasunset.com" (from Phase 2 setup)
  - Open the confirmation email
  - Click the verification link OR copy the confirmation code
  - Paste code in Gmail settings popup
  - Click **Verify**

- [ ] **Step 3.5**: Set as default send address (optional)
  - Settings → Accounts and Import → "Send mail as"
  - Find `info@sumbasunset.com`
  - Click **make default** (if you want to always send from this address)
  - Or leave personal Gmail as default and manually select when composing

**Checkpoint:** Can send emails from Gmail as info@sumbasunset.com

---

### Phase 4: Testing & Verification (USER - 15 minutes)

- [ ] **Step 4.1**: Test receiving emails
  - Send test email TO info@sumbasunset.com from external email
  - Wait 5 minutes (Gmail checks every 5-15 minutes by default)
  - Verify email appears in Gmail inbox
  - Check it has the correct label: "info@sumbasunset.com"

- [ ] **Step 4.2**: Test sending emails
  - Compose new email in Gmail
  - Click **From:** dropdown
  - Select `info@sumbasunset.com`
  - Send to personal email or test address
  - Check recipient sees "From: info@sumbasunset.com"

- [ ] **Step 4.3**: Test reply workflow
  - Reply to the test email from Step 4.1
  - Ensure "From: info@sumbasunset.com" is selected
  - Send reply
  - Verify recipient receives reply from info@sumbasunset.com

- [ ] **Step 4.4**: Test mobile access
  - Open Gmail app on phone
  - Refresh inbox
  - Locate test email
  - Compose new email
  - Select "From: info@sumbasunset.com"
  - Send test email
  - Verify works on mobile

- [ ] **Step 4.5**: Test with real guest scenario
  - Send email to info@sumbasunset.com from a friend's email
  - Pretend it's a booking inquiry
  - Reply professionally from Gmail using info@sumbasunset.com
  - Verify friend receives professional-looking reply

**Checkpoint:** All email flows working correctly on desktop and mobile

---

### Phase 5: Documentation & Settings Optimization (USER - 10 minutes)

- [ ] **Step 5.1**: Document credentials
  - Add to `.claude/planning/ss-4-credentials-setup.md`:

    ```markdown
    ### Hostinger Email (info@sumbasunset.com)

    - IMAP Server: imap.hostinger.com:993 (SSL)
    - SMTP Server: smtp.hostinger.com:465 (SSL)
    - Username: info@sumbasunset.com
    - Password: [Stored in password manager]
    - Configured in Gmail: Yes ✅
    - Mobile access: Gmail app ✅
    ```

- [ ] **Step 5.2**: Optimize Gmail settings
  - Settings → Accounts and Import → "Check mail from other accounts"
  - Find info@sumbasunset.com, click **Edit info**
  - Consider options:
    - ✅ "Leave a copy of retrieved message on the server" (recommended)
    - Uncheck if you want Gmail to delete from Hostinger after fetching

- [ ] **Step 5.3**: Set up filters (optional)
  - Create filter to auto-label booking inquiries
  - Create filter to highlight urgent emails
  - Create filter to forward to team member if needed

- [ ] **Step 5.4**: Configure signature
  - Settings → General → Signature
  - Create professional signature for info@sumbasunset.com:
    ```
    Sumba Sunset Surf Camp
    info@sumbasunset.com
    https://sumbasunset.com
    WhatsApp: [number]
    ```

- [ ] **Step 5.5**: Enable mobile notifications
  - Open Gmail app
  - Settings → [Your account] → Manage notifications
  - Enable for "info@sumbasunset.com" label
  - Set notification sound/vibration

**Checkpoint:** Gmail fully optimized for professional use

---

## Quality Gates Checklist

**User MUST verify ALL items before marking task complete:**

- [ ] Gmail successfully receives emails sent to info@sumbasunset.com
- [ ] Gmail can send emails with "From: info@sumbasunset.com"
- [ ] Recipients see info@sumbasunset.com as sender (not personal Gmail)
- [ ] Reply-to address is info@sumbasunset.com
- [ ] Email verification completed (no warnings in Gmail)
- [ ] Mobile access working (Gmail app)
- [ ] No delivery errors or bounces
- [ ] Professional signature configured
- [ ] Settings documented in credentials file
- [ ] Team members can replicate setup (if needed)
- [ ] Planning doc fully checked off

---

## Post-Implementation Verification

### Manual Verification Steps

1. **Guest Inquiry Simulation**
   - [ ] Have friend send "booking inquiry" to info@sumbasunset.com
   - [ ] Reply from Gmail using info@sumbasunset.com address
   - [ ] Ask friend to confirm professional appearance
   - [ ] Verify reply-to works correctly

2. **Mobile Workflow Test**
   - [ ] Receive email on mobile
   - [ ] Reply from mobile using info@sumbasunset.com
   - [ ] Verify signature appears correctly
   - [ ] Test notifications work

3. **Multi-Device Test**
   - [ ] Check email on desktop (Gmail web)
   - [ ] Check email on phone (Gmail app)
   - [ ] Check email on tablet (Gmail app)
   - [ ] Verify sync works across devices

4. **Error Scenario Test**
   - [ ] Try sending without selecting from address (should default correctly)
   - [ ] Test what happens if Hostinger temporarily down
   - [ ] Verify Gmail continues working for personal emails

5. **Performance Test**
   - [ ] Measure email delivery time (should be < 5 minutes)
   - [ ] Check if any emails bouncing or in spam
   - [ ] Verify no duplicate emails

---

## Rollback Plan

If Gmail integration causes issues:

1. **Remove from Gmail**:
   - Settings → Accounts and Import
   - "Check mail from other accounts" → Delete info@sumbasunset.com
   - "Send mail as" → Delete info@sumbasunset.com
   - Takes 30 seconds

2. **Access via Hostinger webmail**:
   - Visit: https://webmail.hostinger.com
   - Login with info@sumbasunset.com and password
   - All emails still accessible (nothing deleted)

3. **Alternative solution**:
   - Try email forwarding instead (simpler but can't send)
   - Or use desktop email client (Apple Mail, Thunderbird)

**Rollback Risk:** None (no data loss, can always access via Hostinger)
**Rollback Time:** 1 minute
**Financial Impact:** None (no costs involved)

---

## Troubleshooting

### Common Issues

#### Issue: Gmail can't connect to Hostinger

**Symptoms:** "Authentication failed" error

**Solutions:**

1. Verify username is full email: `info@sumbasunset.com` (not just "info")
2. Double-check password (no extra spaces)
3. Verify server addresses: `pop.hostinger.com` and `smtp.hostinger.com`
4. Check ports: 995 (POP3), 465 (SMTP)
5. Ensure SSL/TLS enabled
6. Try resetting password in Hostinger hPanel

#### Issue: Emails not appearing in Gmail

**Symptoms:** Sent test email but nothing arrives

**Solutions:**

1. Wait 15 minutes (Gmail checks every 5-15 minutes, not real-time)
2. Check spam folder
3. Verify email arrived in Hostinger webmail first
4. Force refresh: Settings → Accounts → "Check mail now"
5. Check filter isn't auto-archiving emails

#### Issue: Recipients see personal Gmail address instead of info@sumbasunset.com

**Symptoms:** Friend says email shows "yourname@gmail.com"

**Solutions:**

1. Verify you selected "From: info@sumbasunset.com" when composing
2. Check send-as settings: Settings → Accounts → "Send mail as"
3. Ensure verification completed (look for "unverified" warning)
4. Try setting info@sumbasunset.com as default sender

#### Issue: Verification email not arriving

**Symptoms:** Gmail sent verification code but can't find it

**Solutions:**

1. Wait 5-10 minutes (Gmail fetching may be delayed)
2. Check spam folder
3. Check Hostinger webmail directly: https://webmail.hostinger.com
4. Resend verification email from Gmail settings
5. Try "Enter code manually" option in Gmail popup

#### Issue: Mobile notifications not working

**Symptoms:** Emails arrive but no notification on phone

**Solutions:**

1. Check Gmail app notification settings
2. Verify label notifications enabled for "info@sumbasunset.com"
3. Check phone notification settings (not just Gmail app)
4. Ensure Gmail app has notification permissions
5. Try turning notifications off and back on

---

## Best Practices

### Email Management

1. **Organize with labels**
   - Create label: "Booking Inquiries"
   - Create label: "Guest Questions"
   - Create label: "Urgent"
   - Set up filters to auto-label

2. **Use templates for common replies**
   - Settings → Advanced → Templates (enable)
   - Create template: "Booking inquiry response"
   - Create template: "Check-in instructions"
   - Create template: "Thank you for staying"

3. **Set up vacation responder**
   - When traveling or unavailable
   - Settings → General → Vacation responder
   - Custom message for info@sumbasunset.com

4. **Archive old emails regularly**
   - Keep inbox clean (process to zero daily)
   - Archive conversations after resolved
   - Delete spam aggressively

5. **Monitor response time**
   - Aim for < 2 hour response during business hours
   - Set expectations with auto-responder if longer
   - Use mobile app for quick replies

### Security

1. **Enable 2-factor authentication**
   - On Gmail account (protect access)
   - On Hostinger account (protect source)

2. **Review access regularly**
   - Check "Connected apps" in Gmail
   - Remove unused integrations
   - Verify no suspicious activity

3. **Use strong passwords**
   - Password manager for Hostinger password
   - Never share password via email/chat
   - Rotate password annually

4. **Be cautious with forwarding rules**
   - Don't auto-forward to personal email (all business email)
   - Review filters regularly
   - Delete old/unused filters

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.claude/planning/ss-4-credentials-setup.md` - Add Hostinger email settings
- [ ] `.claude/planning/index.md` - Mark SS-43 as complete
- [ ] This file - Mark complete when done

---

## Related Tasks

**Depends On:**

- None (standalone infrastructure task)

**Enables:**

- Better guest communication workflows
- Professional email management
- Team collaboration (future)
- Integration with CRM tools (future)

**Related Infrastructure:**

- [SS-4: Credentials Setup](./ss-4-credentials-setup.md) - Where credentials are documented
- [SS-17: Contact Form](./ss-17-contact-form.md) - Contact form emails go to info@sumbasunset.com
- [SS-18: Twilio Integration](./ss-18-twilio-integration.md) - WhatsApp notifications complement email

---

## Notes

**Important Reminders:**

1. **No cost** - This is completely free using Gmail's built-in feature
2. **No code changes** - Pure configuration, no development needed
3. **Reversible** - Can remove integration anytime without data loss
4. **Mobile-friendly** - Gmail app provides excellent mobile experience
5. **Team-ready** - Can add multiple team members to same Gmail account later
6. **Works with Beds24** - Booking confirmations from Beds24 will arrive in Gmail

**Potential Issues:**

- **Fetch delay**: Gmail checks every 5-15 minutes, not real-time (acceptable for business email)
- **POP3 limitation**: Gmail uses POP3 (not IMAP), so emails only sync one-way
- **Quota limits**: Hostinger may have email storage limits, monitor usage
- **Mobile data**: Gmail app requires internet, won't work offline

**Future Improvements:**

- Add team members to shared info@sumbasunset.com inbox (via Google Workspace if needed)
- Set up email analytics to track response times
- Integrate with CRM tool (HubSpot, Pipedrive, etc.)
- Create email templates for common guest scenarios
- Set up automated follow-up sequences

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

- Phase 1 (Credentials): \_\_\_ minutes
- Phase 2 (Receive Setup): \_\_\_ minutes
- Phase 3 (Send Setup): \_\_\_ minutes
- Phase 4 (Testing): \_\_\_ minutes
- Phase 5 (Documentation): \_\_\_ minutes
- **Total: \_\_\_ hours** (vs. estimated 1-2 hours)

### Follow-up Tasks Created

- [ ] Future: Add team members to info@sumbasunset.com inbox
- [ ] Future: Set up email templates for common responses
- [ ] Future: Integrate with CRM tool for guest management
- [ ] Future: Set up email analytics dashboard

---

**Completion Date:** TBD
**Actual Time Spent:** TBD
**Final Status:** Not Started
