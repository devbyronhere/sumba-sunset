---
task_id: ss-X
title: '[Feature] Short descriptive title'
status: not_started
priority: medium
estimated_time: '2-4 hours'
actual_time: null
dependencies: []
created: YYYY-MM-DD
started: null
completed: null
related_docs: []
branch: ss-X/feat/short-description
pr_number: null
---

[← Previous: SS-X Task](./ss-X-task.md) | [📋 Index](./index.md) | [Next: SS-X Task →](./ss-X-task.md)

# [Feature] Short Descriptive Title

## Overview

Brief description of what this feature accomplishes and why it's needed.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). Features should align with:

- 📱 Mobile-first design (primary user device)
- ⚡ Performance optimization (fast loading, optimized images)
- 💬 Simple communication (WhatsApp, Beds24 widget)
- 📄 Static content where possible (no database needed)

**User Story:**
As a [user type], I want to [action] so that [benefit].

**Business Value:**

- Value point 1
- Value point 2

---

## Prerequisites/Dependencies

- [ ] Dependency 1 must be completed (link to SS-X)
- [ ] Required packages installed
- [ ] Database migrations run (if applicable)
- [ ] Environment variables configured (if applicable)

---

## Acceptance Criteria

Clear, testable criteria that define "done":

- [ ] **AC1**: Specific behavior or outcome
- [ ] **AC2**: Specific behavior or outcome
- [ ] **AC3**: Specific behavior or outcome
- [ ] **AC4**: Error handling works correctly
- [ ] **AC5**: Performance meets requirements

---

## Test Strategy

### Test Files to Create

- `src/__tests__/[feature].test.ts` - Unit tests for core logic
- `src/__tests__/integration/[feature].integration.test.ts` - Integration tests
- `src/__tests__/e2e/[feature].e2e.test.ts` - E2E tests (if applicable)

### Test Types

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test feature integration with other systems
- **E2E Tests**: Test complete user workflows (if applicable)

### Coverage Target

- Minimum **80%** coverage for new code
- **100%** coverage for critical paths and business logic

### Edge Cases to Test

1. **Empty/null inputs**: How does feature handle missing data?
2. **Invalid inputs**: How does feature handle malformed data?
3. **Boundary conditions**: Max/min values, edge cases
4. **Error scenarios**: Network failures, timeouts, validation errors
5. **Race conditions**: Concurrent operations (if applicable)
6. **Permission checks**: Unauthorized access attempts

### Performance Benchmarks

- API response time < 200ms for typical requests
- Component render time < 100ms
- Database queries < 50ms
- Bundle size increase < 50KB

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files with proper structure
- [ ] **Step 1.2**: Write failing tests for AC1 (describe expected behavior)
- [ ] **Step 1.3**: Write failing tests for AC2
- [ ] **Step 1.4**: Write failing tests for AC3
- [ ] **Step 1.5**: Write failing tests for AC4 (error handling)
- [ ] **Step 1.6**: Write failing tests for AC5 (performance/edge cases)
- [ ] **Step 1.7**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create base component/function structure
- [ ] **Step 2.2**: Implement minimum code to pass AC1 tests
- [ ] **Step 2.3**: Verify AC1 tests pass
- [ ] **Step 2.4**: Implement code to pass AC2 tests
- [ ] **Step 2.5**: Verify AC2 tests pass
- [ ] **Step 2.6**: Implement code to pass AC3 tests
- [ ] **Step 2.7**: Verify AC3 tests pass
- [ ] **Step 2.8**: Implement error handling for AC4
- [ ] **Step 2.9**: Verify AC4 tests pass
- [ ] **Step 2.10**: Optimize for AC5 requirements
- [ ] **Step 2.11**: Verify AC5 tests pass

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Integrate with existing features
- [ ] **Step 3.2**: Add TypeScript types and interfaces
- [ ] **Step 3.3**: Add JSDoc comments for public APIs
- [ ] **Step 3.4**: Implement loading and error states
- [ ] **Step 3.5**: Add accessibility attributes (ARIA labels, etc.)
- [ ] **Step 3.6**: Ensure responsive design (if UI component)
- [ ] **Step 3.7**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with feature description
- [ ] **Step 4.2**: Add inline code comments for complex logic
- [ ] **Step 4.3**: Create/update API documentation (if applicable)
- [ ] **Step 4.4**: Add usage examples in comments or docs
- [ ] **Step 4.5**: Update CLAUDE.md if new patterns introduced
- [ ] **Step 4.6**: Refactor for code clarity (keep tests green)

**Documentation Checkpoint:** All documentation complete and up-to-date

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings in dev mode
- [ ] Code coverage meets target (≥80%)
- [ ] All acceptance criteria verified ✅
- [ ] Documentation updated (README, JSDoc, API docs)
- [ ] Planning doc fully checked off
- [ ] Git commit(s) created with descriptive messages
- [ ] Performance benchmarks met
- [ ] Accessibility requirements met (if UI)
- [ ] Mobile responsive (if UI)
- [ ] No regressions in existing features

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Navigate to feature
   - [ ] Perform typical user action
   - [ ] Verify expected outcome

2. **Edge Case Testing**
   - [ ] Test with empty/null data
   - [ ] Test with invalid inputs
   - [ ] Test with maximum data
   - [ ] Verify error messages are user-friendly

3. **Integration Testing**
   - [ ] Verify feature works with related features
   - [ ] Check navigation flows
   - [ ] Test data persistence (if applicable)

4. **Browser Testing** (if UI)
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Mobile browsers

5. **Performance Testing**
   - [ ] Check Network tab for request times
   - [ ] Check Performance tab for render times
   - [ ] Verify no memory leaks

6. **Accessibility Testing** (if UI)
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces correctly
   - [ ] Color contrast meets WCAG standards
   - [ ] Focus indicators visible

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Remove test files**: Delete test files created for this feature
3. **Restore dependencies**: Run `yarn install` if packages were added
4. **Database rollback**: Run down migration (if applicable)
5. **Update documentation**: Revert doc changes
6. **Notify stakeholders**: Communicate rollback and reason

**Risk Assessment:** Low | Medium | High
**Rollback Difficulty:** Easy | Moderate | Complex

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add feature description and usage
- [ ] `.claude/CLAUDE.md` - Add any new patterns or conventions
- [ ] `docs/API.md` - Document new API endpoints (if applicable)
- [ ] `docs/COMPONENTS.md` - Document new components (if applicable)
- [ ] `package.json` - Add new scripts or dependencies documentation

---

## Related Tasks

**Depends On:**

- [SS-X: Task Name](./ss-X-task.md) - Why this is needed first

**Blocks:**

- [SS-X: Task Name](./ss-X-task.md) - Why that task needs this

**Related:**

- [SS-X: Task Name](./ss-X-task.md) - How tasks are related

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

### Technical Debt Created

-

### Follow-up Tasks Created

- [ ] [SS-X: Task Name](./ss-X-task.md) - Description
- [ ] [SS-X: Task Name](./ss-X-task.md) - Description

---

## Notes

_Use this section for any additional context, decisions, or information that doesn't fit elsewhere._

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
