---
task_id: ss-18
title: '[Feature] Twilio Integration - Form to WhatsApp'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-17, ss-4]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-18/feat/twilio-whatsapp
pr_number: null
---

[← Previous: SS-17 Contact Form](./ss-17-contact-form.md) | [📋 Index](./index.md) | [Next: SS-19 WhatsApp Button →](./ss-19-whatsapp-button.md)

# [Feature] Twilio Integration - Form to WhatsApp

## Overview

Integrate Twilio to forward contact form submissions to the staff WhatsApp number (+27 78 778 7591). This creates an instant notification system for inquiries while maintaining a professional web presence.

**Project Context:**
Staff prefer WhatsApp for communication. Twilio bridges the gap between web forms and WhatsApp, ensuring no inquiries are missed while keeping communication in a familiar channel.

**User Story:**
As a staff member, I want to receive contact form submissions instantly on WhatsApp so that I can respond quickly to guest inquiries.

**Business Value:**

- Instant notification of inquiries
- No missed leads
- Familiar WhatsApp interface for staff
- Audit trail of all communications

---

## Prerequisites/Dependencies

- [x] SS-17: Contact form implemented
- [x] SS-4: Twilio credentials in environment
- [ ] Twilio account with WhatsApp enabled
- [ ] Staff WhatsApp number verified

---

## Acceptance Criteria

- [ ] **AC1**: Form submissions send WhatsApp message
- [ ] **AC2**: Message includes all form fields
- [ ] **AC3**: Formatted for easy reading on mobile
- [ ] **AC4**: Errors handled gracefully
- [ ] **AC5**: Retry logic for failed sends
- [ ] **AC6**: Success/failure logged appropriately
- [ ] **AC7**: Rate limiting respected (Twilio limits)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/lib/twilio/whatsapp.test.ts` - Twilio client tests
- `src/__tests__/api/contact-form-integration.test.ts` - Integration tests
- `src/__tests__/lib/utils/messageFormatter.test.ts` - Formatting tests

### Test Types

- **Unit Tests**: Message formatting, error handling, retry logic
- **Integration Tests**: API to Twilio flow (mocked)
- **E2E Tests**: Full flow (manual with test numbers)

### Coverage Target

- Minimum **90%** coverage for Twilio utilities
- **85%** coverage for API integration
- **100%** coverage for error handling

### Edge Cases to Test

1. **Twilio service down**: Graceful degradation
2. **Invalid phone numbers**: Error handling
3. **Message too long**: Truncation/splitting
4. **Special characters**: Proper encoding
5. **Rate limiting**: Queue implementation
6. **Network timeouts**: Retry mechanism

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Install Twilio SDK:

  ```bash
  yarn add twilio
  ```

- [ ] **Step 1.2**: Create test file for Twilio client
- [ ] **Step 1.3**: Write tests for message formatting
- [ ] **Step 1.4**: Write tests for WhatsApp sending
- [ ] **Step 1.5**: Write tests for error scenarios
- [ ] **Step 1.6**: Write tests for retry logic
- [ ] **Step 1.7**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Twilio Client Setup

- [ ] **Step 2.1**: Create Twilio configuration:

  ```typescript
  // src/lib/twilio/config.ts
  export const twilioConfig = {
    accountSid: process.env.TWILIO_ACCOUNT_SID!,
    authToken: process.env.TWILIO_AUTH_TOKEN!,
    fromNumber: process.env.TWILIO_WHATSAPP_NUMBER!,
    toNumber: process.env.STAFF_WHATSAPP_NUMBER!,
  };
  ```

- [ ] **Step 2.2**: Initialize Twilio client:

  ```typescript
  // src/lib/twilio/client.ts
  import twilio from 'twilio';
  import { twilioConfig } from './config';

  export const getTwilioClient = () => {
    return twilio(twilioConfig.accountSid, twilioConfig.authToken);
  };
  ```

- [ ] **Step 2.3**: Add validation:

  ```typescript
  // Validate configuration on startup
  export function validateTwilioConfig() {
    const required = [
      'TWILIO_ACCOUNT_SID',
      'TWILIO_AUTH_TOKEN',
      'TWILIO_WHATSAPP_NUMBER',
      'STAFF_WHATSAPP_NUMBER',
    ];

    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing Twilio config: ${missing.join(', ')}`);
    }
  }
  ```

**Client Setup Checkpoint:** Twilio client configured

---

### Phase 3: Message Formatting

- [ ] **Step 3.1**: Create message formatter:

  ```typescript
  // src/lib/twilio/messageFormatter.ts
  import { ContactFormData } from '@/lib/validations/contact';

  export function formatWhatsAppMessage(data: ContactFormData): string {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta'
    });

    return `
  📬 *New Contact Form Submission*
  ```

_From:_ ${data.name}
*Email:* ${data.email}
${data.phone ? `*Phone:* ${data.phone}` : ''}
_Time:_ ${timestamp}

_Subject:_ ${data.subject}

_Message:_
${data.message}

---

_Reply via email or WhatsApp the guest directly_
`.trim();
}

````

- [ ] **Step 3.2**: Handle special characters:
```typescript
export function escapeWhatsAppFormatting(text: string): string {
  // Escape WhatsApp formatting characters
  return text
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/~/g, '\\~');
}
````

- [ ] **Step 3.3**: Add message truncation:

  ```typescript
  const MAX_MESSAGE_LENGTH = 1600; // WhatsApp limit

  export function truncateMessage(message: string): string {
    if (message.length <= MAX_MESSAGE_LENGTH) return message;

    return message.substring(0, MAX_MESSAGE_LENGTH - 20) + '\n... [truncated]';
  }
  ```

**Formatting Checkpoint:** Messages properly formatted

---

### Phase 4: WhatsApp Sending Logic

- [ ] **Step 4.1**: Create sending function:

  ```typescript
  // src/lib/twilio/whatsapp.ts
  import { getTwilioClient } from './client';
  import { formatWhatsAppMessage } from './messageFormatter';

  export async function sendWhatsAppNotification(
    data: ContactFormData
  ): Promise<boolean> {
    try {
      const client = getTwilioClient();
      const message = formatWhatsAppMessage(data);

      const result = await client.messages.create({
        body: message,
        from: twilioConfig.fromNumber,
        to: twilioConfig.toNumber,
      });

      console.log(`WhatsApp sent: ${result.sid}`);
      return true;
    } catch (error) {
      console.error('WhatsApp send failed:', error);
      throw error;
    }
  }
  ```

- [ ] **Step 4.2**: Add retry logic:

  ```typescript
  export async function sendWithRetry(
    data: ContactFormData,
    maxRetries = 3
  ): Promise<boolean> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await sendWhatsAppNotification(data);
      } catch (error) {
        if (attempt === maxRetries) throw error;

        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    return false;
  }
  ```

- [ ] **Step 4.3**: Add error categorization:
  ```typescript
  export function categorizeError(error: any): ErrorCategory {
    if (error.code === 20003) return 'AUTH_ERROR';
    if (error.code === 21211) return 'INVALID_NUMBER';
    if (error.code === 429) return 'RATE_LIMIT';
    if (error.code >= 500) return 'TWILIO_ERROR';
    return 'UNKNOWN_ERROR';
  }
  ```

**Sending Logic Checkpoint:** WhatsApp integration complete

---

### Phase 5: API Route Integration

- [ ] **Step 5.1**: Update contact form API:

  ```typescript
  // src/app/api/contact-form/route.ts
  import { sendWithRetry } from '@/lib/twilio/whatsapp';

  export async function POST(request: Request) {
    try {
      // ... existing validation code ...

      // Send WhatsApp notification
      try {
        await sendWithRetry(validatedData);
      } catch (twilioError) {
        // Log error but don't fail the request
        console.error('WhatsApp notification failed:', twilioError);
        // Could queue for later retry or send email fallback
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
      });
    } catch (error) {
      // ... error handling ...
    }
  }
  ```

- [ ] **Step 5.2**: Add fallback mechanism:

  ```typescript
  // If WhatsApp fails, queue for retry or email
  async function handleNotificationFailure(
    data: ContactFormData,
    error: Error
  ) {
    // Log to error tracking
    console.error('Notification failure:', error);

    // TODO: Implement email fallback
    // TODO: Or queue for background retry
  }
  ```

**API Integration Checkpoint:** Form connected to WhatsApp

---

### Phase 6: Monitoring & Logging

- [ ] **Step 6.1**: Add structured logging:

  ```typescript
  interface WhatsAppLog {
    timestamp: Date;
    formId: string;
    success: boolean;
    errorCode?: string;
    retryCount?: number;
    messageSid?: string;
  }

  export function logWhatsAppEvent(log: WhatsAppLog) {
    // In production, send to monitoring service
    console.log('[WhatsApp]', JSON.stringify(log));
  }
  ```

- [ ] **Step 6.2**: Track success metrics:

  ```typescript
  let stats = {
    sent: 0,
    failed: 0,
    retried: 0,
  };

  // Update stats after each send
  ```

- [ ] **Step 6.3**: Add health check:
  ```typescript
  export async function checkTwilioHealth(): Promise<boolean> {
    try {
      const client = getTwilioClient();
      await client.api.accounts(twilioConfig.accountSid).fetch();
      return true;
    } catch {
      return false;
    }
  }
  ```

**Monitoring Checkpoint:** Observability in place

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] WhatsApp messages send successfully
- [ ] Formatting looks good on mobile
- [ ] Retry logic works
- [ ] Errors handled gracefully
- [ ] Rate limiting respected
- [ ] Monitoring in place
- [ ] Documentation updated
- [ ] Environment variables documented

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Submit contact form
   - [ ] Check WhatsApp received
   - [ ] Verify formatting correct
   - [ ] All fields present

2. **Error Handling Test**
   - [ ] Test with invalid credentials
   - [ ] Test network failure (disconnect)
   - [ ] Verify graceful degradation

3. **Message Formatting Test**
   - [ ] Test with special characters
   - [ ] Test with very long message
   - [ ] Test with minimal data
   - [ ] Test with all fields filled

4. **Production Test**
   - [ ] Send test from production
   - [ ] Verify received on correct number
   - [ ] Check response time

---

## Documentation Updates

Files that need updating:

- [ ] Update `.env.example` with Twilio variables
- [ ] Document Twilio setup in README
- [ ] Create `docs/twilio-setup.md` guide
- [ ] Add troubleshooting section

---

## Related Tasks

**Depends On:**

- [SS-17: Contact Form](./ss-17-contact-form.md) - Need form to integrate
- [SS-4: Credentials](./ss-4-credentials-setup.md) - Twilio credentials

**Blocks:**
None directly, but enhances SS-17

**Related:**

- [SS-19: WhatsApp Button](./ss-19-whatsapp-button.md) - Direct WhatsApp
- [SS-20: Rate Limiting](./ss-20-rate-limiting.md) - Prevent abuse

---

## Notes

### Twilio WhatsApp Setup

1. Twilio account must have WhatsApp enabled
2. Follow Twilio's WhatsApp sandbox setup
3. For production, need approved WhatsApp Business account
4. Templates may be required for outbound messages

### Message Formatting Tips

- Use bold (_text_) for labels
- Keep under 1600 characters
- Include timestamp in local timezone
- Make actionable (include email/phone)

### Cost Considerations

- WhatsApp messages: ~$0.005 each
- Budget ~$5-10/month for typical usage
- Monitor usage to prevent abuse

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
