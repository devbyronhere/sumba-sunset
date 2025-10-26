---
task_id: ss-33
title: '[Testing] Integration Tests for Forms and API Routes'
status: not_started
priority: high
estimated_time: '5-7 hours'
actual_time: null
dependencies: [ss-32]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-33/test/integration-tests
pr_number: null
---

[← Previous: SS-32 Unit Tests](./ss-32-unit-tests.md) | [📋 Index](./index.md) | [Next: SS-34 Mobile Device Testing →](./ss-34-mobile-device-testing.md)

# [Testing] Integration Tests for Forms and API Routes

## Overview

Write integration tests for critical user flows: contact form submission, Beds24 widget loading, image uploads, and API route handlers. Test end-to-end behavior including external service integrations.

**User Story:**
As a developer, I want integration tests for critical flows so that I know the system works correctly when components interact.

---

## Acceptance Criteria

- [ ] **AC1**: Contact form submission flow tested (form → API route → Twilio)
- [ ] **AC2**: WhatsApp Click-to-Chat button tested
- [ ] **AC3**: Image upload flow tested (upload → optimization → Blob storage)
- [ ] **AC4**: Beds24 widget loading tested
- [ ] **AC5**: Rate limiting tested on contact form
- [ ] **AC6**: Error handling tested for each flow
- [ ] **AC7**: All critical user flows have integration tests
- [ ] **AC8**: Tests use mocked external services (Twilio, Vercel Blob)
- [ ] **AC9**: Tests run in isolated environment
- [ ] **AC10**: Tests pass consistently

---

## Implementation Steps

### Phase 1: Test Setup & Mocking

- [ ] **Step 1.1**: Set up Vitest environment for integration tests
- [ ] **Step 1.2**: Create mocks for external services
  - Mock Twilio API
  - Mock Vercel Blob API
  - Mock Beds24 API (if applicable)
- [ ] **Step 1.3**: Create test utilities and fixtures

### Phase 2: Contact Form Integration Tests

- [ ] **Step 2.1**: Test successful contact form submission
  - Fill form with valid data
  - Submit form
  - Verify API route called
  - Verify Twilio API called with correct data
  - Verify success message displayed
- [ ] **Step 2.2**: Test form validation errors
  - Submit with invalid email → verify error
  - Submit with missing fields → verify errors
- [ ] **Step 2.3**: Test network failure handling
  - Mock Twilio API failure
  - Verify user sees error message
- [ ] **Step 2.4**: Test rate limiting
  - Submit form multiple times rapidly
  - Verify rate limit triggered after N submissions

### Phase 3: Image Upload Integration Tests

- [ ] **Step 3.1**: Test successful image upload
  - Select valid image file
  - Upload image
  - Verify optimization runs
  - Verify upload to Blob storage
  - Verify success state displayed
- [ ] **Step 3.2**: Test image validation errors
  - Upload invalid file type → verify error
  - Upload oversized file → verify error
- [ ] **Step 3.3**: Test upload failure handling
  - Mock Blob storage failure
  - Verify error message displayed

### Phase 4: Beds24 Widget Integration Tests

- [ ] **Step 4.1**: Test widget loads correctly
  - Navigate to `/booking`
  - Verify Beds24 IFrame present
  - Verify widget parameters correct (property ID, etc.)
- [ ] **Step 4.2**: Test widget error handling
  - Mock widget load failure
  - Verify fallback or error message

### Phase 5: WhatsApp Integration Tests

- [ ] **Step 5.1**: Test WhatsApp button click
  - Click "Chat on WhatsApp" button
  - Verify correct WhatsApp URL generated
  - Verify URL includes correct phone number

### Phase 6: Coverage & Refinement

- [ ] **Step 6.1**: Run integration tests: `yarn test:integration`
- [ ] **Step 6.2**: Verify all critical flows covered
- [ ] **Step 6.3**: Fix flaky tests
- [ ] **Step 6.4**: Document test patterns

---

## Quality Gates

- [ ] All integration tests passing
- [ ] Tests use mocked external services (no real API calls)
- [ ] Tests run in < 60s
- [ ] No flaky tests
- [ ] Coverage for all critical user flows

---

## Post-Implementation Verification

1. **Run integration tests**: `yarn test:integration`
2. **Verify no external API calls**: Check network logs during tests
3. **Verify tests pass consistently**: Run 5 times
4. **Review coverage**: Critical flows covered

---

## Notes

**Test Organization:**

```
src/__tests__/
  integration/
    contactForm.integration.test.ts
    imageUpload.integration.test.ts
    beds24Widget.integration.test.ts
    whatsappButton.integration.test.ts
    rateLimiting.integration.test.ts
```

**Mocking Strategy:**

- Use `vi.mock()` for external services
- Mock Twilio SDK
- Mock Vercel Blob SDK
- Mock fetch for API routes

**Critical Flows to Test:**

1. Contact form → Twilio → WhatsApp
2. Image upload → Optimization → Blob storage
3. Beds24 widget loading
4. WhatsApp button → WhatsApp URL
5. Rate limiting on contact form

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
