---
task_id: ss-17
title: '[Feature] Contact Form with React Hook Form + Zod'
status: not_started
priority: high
estimated_time: '3-4 hours'
actual_time: null
dependencies: [ss-5, ss-4]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-17/feat/contact-form
pr_number: null
---

[← Previous: SS-16 Add Real Room Info](./ss-16-real-room-info.md) | [📋 Index](./index.md) | [Next: SS-18 Twilio Integration →](./ss-18-twilio-integration.md)

# [Feature] Contact Form with React Hook Form + Zod

## Overview

Build a fully functional contact form component using React Hook Form for form management and Zod for validation. This form will be the primary method for guests to contact the surf camp with inquiries.

**Project Context:**
The contact form is crucial for capturing leads and answering pre-booking questions. It must be mobile-optimized, accessible, and integrate with the Twilio WhatsApp forwarding system (SS-18).

**User Story:**
As a potential guest, I want to easily contact the surf camp with questions so that I can get information before booking.

**Business Value:**

- Lead generation and capture
- Reduced phone calls (async communication)
- 24/7 availability for inquiries
- Trackable communication metrics

---

## Prerequisites/Dependencies

- [x] SS-5: shadcn/ui components setup
- [x] SS-4: Environment variables configured
- [ ] React Hook Form installed
- [ ] Zod installed

---

## Acceptance Criteria

- [ ] **AC1**: Form renders with all required fields
- [ ] **AC2**: Validation works on blur and submit
- [ ] **AC3**: Error messages are clear and accessible
- [ ] **AC4**: Success state shows confirmation message
- [ ] **AC5**: Form is fully keyboard navigable
- [ ] **AC6**: Mobile-responsive with proper input types
- [ ] **AC7**: Loading state during submission
- [ ] **AC8**: Honeypot field prevents basic spam

---

## Test Strategy

### Test Files to Create

- `src/__tests__/components/ContactForm.test.tsx` - Component tests
- `src/__tests__/lib/validations/contact.test.ts` - Schema tests
- `src/__tests__/app/api/contact-form/route.test.ts` - API route tests

### Test Types

- **Unit Tests**: Validation schemas, form logic, error handling
- **Integration Tests**: Form submission flow, API interaction
- **Accessibility Tests**: Keyboard nav, screen reader support

### Coverage Target

- Minimum **90%** coverage for validation logic
- **85%** coverage for component
- **100%** coverage for API route

### Edge Cases to Test

1. **Empty form submission**: All errors display
2. **Invalid email formats**: Validation catches all cases
3. **XSS attempts**: Input sanitization works
4. **Long messages**: Character limits enforced
5. **Rapid submissions**: Rate limiting (future)
6. **Network failures**: Error handling graceful

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Install required packages:

  ```bash
  yarn add react-hook-form zod @hookform/resolvers
  ```

- [ ] **Step 1.2**: Create test file for Zod schema
- [ ] **Step 1.3**: Write tests for all validation rules
- [ ] **Step 1.4**: Create test file for ContactForm component
- [ ] **Step 1.5**: Write tests for form rendering
- [ ] **Step 1.6**: Write tests for validation behavior
- [ ] **Step 1.7**: Write tests for submission flow
- [ ] **Step 1.8**: Write tests for error states
- [ ] **Step 1.9**: Write tests for success state

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Schema Definition

- [ ] **Step 2.1**: Create Zod schema:

  ```typescript
  // src/lib/validations/contact.ts
  import { z } from 'zod';

  export const contactFormSchema = z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),

    email: z.string().email('Please enter a valid email address'),

    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[\d\s-()]+$/.test(val),
        'Please enter a valid phone number'
      ),

    subject: z
      .string()
      .min(5, 'Subject must be at least 5 characters')
      .max(100, 'Subject must be less than 100 characters'),

    message: z
      .string()
      .min(10, 'Message must be at least 10 characters')
      .max(1000, 'Message must be less than 1000 characters'),

    // Honeypot field (should be empty)
    website: z.string().max(0),
  });

  export type ContactFormData = z.infer<typeof contactFormSchema>;
  ```

- [ ] **Step 2.2**: Verify schema tests pass

**Schema Checkpoint:** Validation logic complete

---

### Phase 3: Component Implementation

- [ ] **Step 3.1**: Create ContactForm component:

  ```typescript
  // src/components/forms/ContactForm.tsx
  'use client';

  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import {
    contactFormSchema,
    ContactFormData,
  } from '@/lib/validations/contact';
  ```

- [ ] **Step 3.2**: Implement form structure:

  ```typescript
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      website: '', // honeypot
    },
  });
  ```

- [ ] **Step 3.3**: Create form fields:

  ```tsx
  // Name field
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Name *</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  ```

- [ ] **Step 3.4**: Add honeypot field:

  ```tsx
  // Hidden from users, catches bots
  <input
    type="text"
    {...form.register('website')}
    className="sr-only"
    tabIndex={-1}
    autoComplete="off"
  />
  ```

- [ ] **Step 3.5**: Implement submission handler:

  ```typescript
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setShowSuccess(true);
      form.reset();
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  ```

**Component Checkpoint:** Form component functional

---

### Phase 4: API Route Creation

- [ ] **Step 4.1**: Create API route:

  ```typescript
  // src/app/api/contact-form/route.ts
  import { NextResponse } from 'next/server';
  import { contactFormSchema } from '@/lib/validations/contact';
  ```

- [ ] **Step 4.2**: Implement request handler:

  ```typescript
  export async function POST(request: Request) {
    try {
      const body = await request.json();

      // Validate with Zod
      const validatedData = contactFormSchema.parse(body);

      // Check honeypot
      if (validatedData.website) {
        return NextResponse.json(
          { error: 'Invalid submission' },
          { status: 400 }
        );
      }

      // TODO: Send to Twilio (SS-18)
      console.log('Contact form submission:', validatedData);

      return NextResponse.json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', issues: error.errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  ```

- [ ] **Step 4.3**: Add rate limiting stub:
  ```typescript
  // TODO: Implement rate limiting in SS-20
  // For now, just add a comment placeholder
  ```

**API Route Checkpoint:** Backend ready

---

### Phase 5: UI/UX Enhancement

- [ ] **Step 5.1**: Add loading states:

  ```tsx
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Sending...
      </>
    ) : (
      'Send Message'
    )}
  </Button>
  ```

- [ ] **Step 5.2**: Create success message:

  ```tsx
  {
    showSuccess && (
      <Alert className="mt-4">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Message Sent!</AlertTitle>
        <AlertDescription>
          We'll get back to you within 24 hours.
        </AlertDescription>
      </Alert>
    );
  }
  ```

- [ ] **Step 5.3**: Add error display:

  ```tsx
  {
    error && (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  ```

- [ ] **Step 5.4**: Implement proper input types:

  ```tsx
  // Email field with correct type
  <Input
    type="email"
    inputMode="email"
    autoComplete="email"
    {...field}
  />

  // Phone field with tel type
  <Input
    type="tel"
    inputMode="tel"
    autoComplete="tel"
    {...field}
  />
  ```

**UX Enhancement Checkpoint:** User-friendly interface

---

### Phase 6: Mobile Optimization

- [ ] **Step 6.1**: Ensure touch-friendly sizing:

  ```css
  input,
  textarea,
  button {
    min-height: 48px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
  ```

- [ ] **Step 6.2**: Add proper labels and placeholders
- [ ] **Step 6.3**: Test on mobile devices
- [ ] **Step 6.4**: Verify keyboard types (email, tel)

**Mobile Checkpoint:** Optimized for mobile users

---

### Phase 7: Accessibility

- [ ] **Step 7.1**: Add ARIA labels where needed
- [ ] **Step 7.2**: Ensure proper focus management
- [ ] **Step 7.3**: Test keyboard navigation
- [ ] **Step 7.4**: Verify screen reader compatibility
- [ ] **Step 7.5**: Check color contrast ratios

**Accessibility Checkpoint:** WCAG AA compliant

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] No console errors
- [ ] Form validates correctly
- [ ] Error messages clear
- [ ] Success state works
- [ ] Mobile responsive
- [ ] Keyboard navigable
- [ ] API route works
- [ ] Honeypot field hidden
- [ ] Loading states smooth
- [ ] Code coverage met

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Fill all required fields
   - [ ] Submit successfully
   - [ ] See success message
   - [ ] Form resets

2. **Validation Test**
   - [ ] Submit empty form
   - [ ] See all error messages
   - [ ] Fix errors one by one
   - [ ] Errors clear on correction

3. **Mobile Test**
   - [ ] Test on iPhone
   - [ ] Test on Android
   - [ ] Keyboard types correct
   - [ ] No zoom on focus

4. **Accessibility Test**
   - [ ] Tab through form
   - [ ] Submit with Enter key
   - [ ] Screen reader test
   - [ ] Check focus indicators

---

## Documentation Updates

Files that need updating:

- [ ] Create `docs/forms.md` documentation
- [ ] Update README with form info
- [ ] Document validation rules
- [ ] Add to component library docs

---

## Related Tasks

**Depends On:**

- [SS-5: shadcn/ui setup](./ss-5-shadcn-setup.md) - UI components
- [SS-4: Credentials](./ss-4-credentials-setup.md) - Environment setup

**Blocks:**

- [SS-18: Twilio Integration](./ss-18-twilio-integration.md) - Needs form to send

**Related:**

- [SS-20: Rate Limiting](./ss-20-rate-limiting.md) - Prevent spam

---

## Notes

### Form Best Practices

- Single column layout on mobile
- Clear error messages below fields
- Disable submit during processing
- Show loading state
- Success feedback important

### Validation Strategy

- Client-side: Immediate feedback
- Server-side: Security and final validation
- Both use same Zod schema

### Spam Prevention

- Honeypot field (basic)
- Rate limiting (SS-20)
- Future: reCAPTCHA if needed

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
