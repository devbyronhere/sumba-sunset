---
task_id: ss-X
title: '[Bug] Short descriptive title'
status: not_started
priority: high
estimated_time: '1-2 hours'
actual_time: null
dependencies: []
created: YYYY-MM-DD
started: null
completed: null
assigned_to: claude
related_docs: []
severity: critical | high | medium | low
bug_type: functional | performance | security | ui | data
---

[← Previous: SS-X Task](./ss-X-task.md) | [📋 Index](./index.md) | [Next: SS-X Task →](./ss-X-task.md)

# [Bug] Short Descriptive Title

## Overview

Brief description of the bug and its impact.

**Severity:** Critical | High | Medium | Low
**Bug Type:** Functional | Performance | Security | UI | Data
**Affected Users:** All users | Specific user group | Edge case

---

## Bug Details

### Current Behavior

## Describe what currently happens (the bug):

### Expected Behavior

## Describe what should happen instead:

### Steps to Reproduce

1. Step 1
2. Step 2
3. Step 3
4. Observe incorrect behavior

### Environment

- **OS:** macOS / Windows / Linux
- **Browser:** Chrome / Firefox / Safari (version X)
- **Node Version:** X.X.X
- **Next.js Version:** X.X.X
- **Other relevant versions:**

### Error Messages/Logs

```
Paste error messages or relevant logs here
```

### Screenshots/Videos

_Attach or link to screenshots/videos if available_

---

## Root Cause Analysis

### Investigation Steps

- [ ] Reproduce bug locally
- [ ] Check error logs
- [ ] Review related code
- [ ] Identify root cause
- [ ] Document findings

### Root Cause

_What is causing this bug?_

### Affected Code

**Files involved:**

- `src/path/to/file.ts:123` - Description of issue
- `src/path/to/other.ts:456` - Description of related issue

---

## Prerequisites/Dependencies

- [ ] Bug reproduced locally
- [ ] Root cause identified
- [ ] Related code reviewed
- [ ] Existing tests reviewed (if any)

---

## Acceptance Criteria

- [ ] **AC1**: Bug no longer occurs when following reproduction steps
- [ ] **AC2**: Existing functionality still works correctly
- [ ] **AC3**: No new console errors or warnings
- [ ] **AC4**: Regression test added to prevent bug from returning
- [ ] **AC5**: Edge cases handled properly

---

## Test Strategy

### Test Files to Create/Update

- `src/__tests__/[feature].test.ts` - Add regression test
- `src/__tests__/[bugfix].test.ts` - Create new test file if needed

### Test Types

- **Regression Test**: Ensure bug doesn't return
- **Unit Tests**: Test fixed code in isolation
- **Integration Tests**: Verify fix doesn't break related features

### Coverage Target

- **100%** coverage for bug fix code
- Add regression test that would have caught this bug

### Test Cases

1. **Regression Test**: Reproduce original bug scenario (should pass after fix)
2. **Edge Cases**: Test boundary conditions related to bug
3. **Related Features**: Ensure fix doesn't break related functionality
4. **Performance**: Verify fix doesn't introduce performance issues (if applicable)

---

## Implementation Steps

### Phase 1: Reproduce & Write Tests (TDD)

- [ ] **Step 1.1**: Reproduce bug locally with exact steps
- [ ] **Step 1.2**: Write failing test that reproduces the bug
- [ ] **Step 1.3**: Verify test fails with current code
- [ ] **Step 1.4**: Write additional tests for edge cases
- [ ] **Step 1.5**: Document expected behavior in tests

**TDD Checkpoint:** Tests written that reproduce the bug

---

### Phase 2: Fix Implementation

- [ ] **Step 2.1**: Implement minimal fix for root cause
- [ ] **Step 2.2**: Run regression test - verify it now passes
- [ ] **Step 2.3**: Run all related tests - verify no regressions
- [ ] **Step 2.4**: Test edge cases manually
- [ ] **Step 2.5**: Add defensive code if needed (input validation, error handling)

**Fix Checkpoint:** Bug fixed and regression test passes

---

### Phase 3: Verification & Prevention

- [ ] **Step 3.1**: Run full test suite
- [ ] **Step 3.2**: Manually test original reproduction steps
- [ ] **Step 3.3**: Test related features for regressions
- [ ] **Step 3.4**: Check for similar bugs in codebase
- [ ] **Step 3.5**: Add JSDoc comments explaining the fix
- [ ] **Step 3.6**: Update error messages if applicable

**Verification Checkpoint:** All tests passing, no regressions found

---

### Phase 4: Documentation

- [ ] **Step 4.1**: Update code comments near fix
- [ ] **Step 4.2**: Add/update JSDoc if function signature changed
- [ ] **Step 4.3**: Update README if user-facing behavior changed
- [ ] **Step 4.4**: Document in changelog (if maintained)
- [ ] **Step 4.5**: Add notes about what caused bug and how to prevent similar ones

**Documentation Checkpoint:** Fix properly documented

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings in dev mode
- [ ] Regression test added and passing
- [ ] Original bug no longer reproducible
- [ ] No regressions in related features
- [ ] Code coverage maintained or improved
- [ ] Documentation updated
- [ ] Planning doc fully checked off
- [ ] Git commit created with descriptive message

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Bug Reproduction Test**
   - [ ] Follow original reproduction steps
   - [ ] Verify bug no longer occurs
   - [ ] Check console for errors

2. **Regression Testing**
   - [ ] Test related features
   - [ ] Verify nothing else broke
   - [ ] Test edge cases manually

3. **Different Environments** (if applicable)
   - [ ] Test in different browsers
   - [ ] Test on different devices
   - [ ] Test with different data sets

4. **Performance Check**
   - [ ] Verify fix doesn't impact performance
   - [ ] Check for memory leaks
   - [ ] Monitor load times

---

## Rollback Plan

If this fix causes issues:

1. **Revert commit**: `git revert <commit-hash>`
2. **Remove tests**: Delete regression tests if they cause issues
3. **Restore previous behavior**: Ensure original code is restored
4. **Re-open bug ticket**: Document why fix was reverted
5. **Plan alternative fix**: Investigate different approach

**Rollback Risk:** Low | Medium | High

---

## Documentation Updates

Files that need updating after this fix:

- [ ] `CHANGELOG.md` - Add bug fix entry (if maintained)
- [ ] `README.md` - Update if user-facing behavior changed
- [ ] `.claude/CLAUDE.md` - Add pattern to prevent similar bugs
- [ ] Code comments - Explain fix near changed code

---

## Prevention Strategy

### How to Prevent This Bug in Future

1. Pattern/practice to adopt:
2. Code review checklist item:
3. Test coverage improvement:
4. Linting rule to add (if applicable):

### Similar Bugs to Check For

- [ ] Check location X for similar pattern
- [ ] Review feature Y for related issue
- [ ] Audit component Z for same mistake

---

## Related Tasks

**Related Bugs:**

- [SS-X: Related Bug](./ss-X-task.md) - How bugs are related

**Caused By:**

- [SS-X: Task Name](./ss-X-task.md) - Why this bug was introduced

**Follow-up Work:**

- [SS-X: Task Name](./ss-X-task.md) - Additional improvements needed

---

## Retrospective

_(Fill out after completion)_

### Root Cause Summary

-

### What Went Well

-

### What Could Improve

-

### Why This Bug Occurred

-

### Prevention Measures Implemented

-

### Key Learnings

-

### Follow-up Tasks Created

- [ ] [SS-X: Task Name](./ss-X-task.md) - Description
- [ ] [SS-X: Task Name](./ss-X-task.md) - Description

---

## Notes

_Use this section for any additional context, investigation notes, or information that doesn't fit elsewhere._

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Fixed | ⏸️ Blocked | ❌ Won't Fix
