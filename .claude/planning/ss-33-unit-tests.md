---
task_id: ss-33
title: '[Testing] Unit Tests for Utilities and Validations'
status: not_started
priority: high
estimated_time: '4-6 hours'
actual_time: null
dependencies: []
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-32/test/unit-tests
pr_number: null
---

[← Previous: SS-31 Mobile-First Responsive Design](./ss-31-mobile-responsive-design.md) | [📋 Index](./index.md) | [Next: SS-33 Integration Tests →](./ss-33-integration-tests.md)

# [Testing] Unit Tests for Utilities and Validations

## Overview

Write comprehensive unit tests for all utility functions, validation schemas (Zod), helper functions, and business logic across the codebase. Achieve ≥80% test coverage for non-UI code.

**User Story:**
As a developer, I want comprehensive unit tests so that I can refactor confidently and catch bugs early.

---

## Acceptance Criteria

- [ ] **AC1**: All Zod schemas have 100% test coverage
- [ ] **AC2**: All utility functions have ≥80% test coverage
- [ ] **AC3**: All helper functions tested with edge cases
- [ ] **AC4**: Image optimization/validation utilities tested
- [ ] **AC5**: YouTube URL generation utilities tested
- [ ] **AC6**: Pricing/currency formatting utilities tested
- [ ] **AC7**: Responsive breakpoint utilities tested
- [ ] **AC8**: Date/time utilities tested (if any)
- [ ] **AC9**: All tests pass consistently
- [ ] **AC10**: Test coverage report generated

---

## Implementation Steps

### Phase 1: Identify Test Targets

- [ ] **Step 1.1**: Audit codebase for all utility files
  - `src/lib/*.ts` files
  - Zod schemas in `src/lib/validations/*.ts`
  - Helper functions
- [ ] **Step 1.2**: List all functions needing tests
- [ ] **Step 1.3**: Prioritize by criticality (validation > utilities > helpers)

### Phase 2: Validation Schema Tests

- [ ] **Step 2.1**: Test contact form schema
  - Valid inputs pass
  - Invalid emails fail
  - Missing required fields fail
  - XSS attempts sanitized
- [ ] **Step 2.2**: Test image validation schema (if applicable)
  - Valid file types pass
  - Invalid types fail
  - Size limits enforced
- [ ] **Step 2.3**: Run tests → verify 100% coverage for schemas

### Phase 3: Utility Function Tests

- [ ] **Step 3.1**: Test image utilities (`imageConfig.ts`, `imageOptimization.ts`)
  - Size calculations correct
  - Srcset generation correct
  - Format conversion works
- [ ] **Step 3.2**: Test YouTube utilities (`youtubeHelpers.ts`)
  - Valid video IDs accepted
  - Invalid IDs rejected
  - URL parameters correct (loop, mute, etc.)
- [ ] **Step 3.3**: Test pricing utilities (`pricingUtils.ts` if exists)
  - USD formatting: $1,234
  - IDR formatting: Rp 1,234,567
  - Currency conversion (if applicable)
- [ ] **Step 3.4**: Test breakpoint utilities
  - `isMobile()`, `isTablet()`, `isDesktop()` correct
  - Touch target size calculations correct
- [ ] **Step 3.5**: Run tests → verify ≥80% coverage for utilities

### Phase 4: Edge Cases & Error Handling

- [ ] **Step 4.1**: Test error conditions
  - Network failures
  - Invalid inputs
  - Boundary values (max/min)
- [ ] **Step 4.2**: Test edge cases
  - Empty strings
  - Null/undefined values
  - Very large numbers
  - Special characters

### Phase 5: Coverage Report & Refinement

- [ ] **Step 5.1**: Generate coverage report: `yarn test --coverage`
- [ ] **Step 5.2**: Identify untested code paths
- [ ] **Step 5.3**: Write tests for uncovered paths
- [ ] **Step 5.4**: Achieve ≥80% overall coverage for `src/lib/**`

---

## Quality Gates

- [ ] All tests passing
- [ ] Coverage ≥80% for `src/lib/**`
- [ ] Coverage 100% for `src/lib/validations/**`
- [ ] No flaky tests (tests pass consistently)
- [ ] Fast test execution (< 30s for all unit tests)

---

## Post-Implementation Verification

1. **Run full test suite**: `yarn test`
2. **Generate coverage**: `yarn test --coverage`
3. **Review coverage report**: Open `coverage/index.html`
4. **Verify**: All critical paths covered

---

## Notes

**Test Organization:**

```
src/__tests__/
  lib/
    imageConfig.test.ts
    imageOptimization.test.ts
    youtubeHelpers.test.ts
    pricingUtils.test.ts
    breakpoints.test.ts
  validations/
    contactFormSchema.test.ts
    imageValidation.test.ts
```

**Coverage Goals:**

- **Zod schemas**: 100%
- **Utilities**: ≥80%
- **Components**: ≥60% (tested in SS-33)
- **Overall**: ≥70%

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
