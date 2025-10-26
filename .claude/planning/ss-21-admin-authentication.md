---
task_id: ss-21
title: '[Feature] Admin Authentication with Password Protection'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-7]
created: 2025-10-26
started: null
completed: null
related_docs: []
branch: ss-21/feat/admin-authentication
pr_number: null
---

[← Previous: SS-20 Rate Limiting](./ss-20-rate-limiting.md) | [📋 Index](./index.md) | [Next: SS-22 Image Upload System →](./ss-22-image-upload-system.md)

# [Feature] Admin Authentication with Password Protection

## Overview

Implement a simple, secure admin authentication system using environment-based password protection. This will protect admin routes (like `/admin/upload`) from unauthorized access without requiring a complex authentication system or database.

**Project Context:**
Sumba Sunset is a surf camp website (mobile-first, marketing-focused, no database). The authentication system must:

- 🔒 Protect admin routes from unauthorized access
- 🚀 Simple implementation (no database required)
- 🔑 Environment-based password (secure and flexible)
- 📱 Works seamlessly on mobile and desktop
- ⚡ Minimal performance impact

**User Story:**
As a site administrator, I want to log in with a password so that only authorized users can access admin features like image uploads and content management.

**Business Value:**

- Prevents unauthorized access to admin features
- Protects sensitive operations (uploads, content management)
- Simple enough for single-admin use case
- Can be extended later if multiple admins needed
- No database overhead or complexity

---

## Prerequisites/Dependencies

- [x] SS-7: Vercel Blob integration (admin will upload images)
- [ ] Next.js middleware understanding
- [ ] Session management with cookies
- [ ] Environment variables configured

---

## Acceptance Criteria

- [ ] **AC1**: Admin password stored securely in environment variable (`ADMIN_PASSWORD`)
- [ ] **AC2**: Login page at `/admin/login` with password input field
- [ ] **AC3**: Successful login creates secure session cookie
- [ ] **AC4**: All `/admin/*` routes (except `/admin/login`) are protected by middleware
- [ ] **AC5**: Unauthenticated users redirected to `/admin/login` when accessing protected routes
- [ ] **AC6**: Authenticated users can access all `/admin/*` routes
- [ ] **AC7**: Logout functionality clears session and redirects to home
- [ ] **AC8**: Session expires after configurable time (default: 24 hours)
- [ ] **AC9**: Error messages for invalid password (no information leakage)
- [ ] **AC10**: Mobile-responsive login page

---

## Test Strategy

### Test Files to Create

- `src/__tests__/lib/auth.test.ts` - Unit tests for auth utilities
- `src/__tests__/middleware.test.ts` - Tests for auth middleware
- `src/__tests__/api/admin/login.test.ts` - Integration tests for login API
- `src/__tests__/api/admin/logout.test.ts` - Integration tests for logout API
- `src/__tests__/app/admin/login/page.test.tsx` - Component tests for login page

### Test Types

- **Unit Tests**: Test password verification, session creation, cookie management
- **Integration Tests**: Test login/logout API routes, middleware protection
- **Component Tests**: Test login form UI, validation, loading states

### Coverage Target

- Minimum **80%** coverage for auth logic
- **100%** coverage for security-critical paths (password verification, session validation)

### Edge Cases to Test

1. **Invalid password**: Wrong password returns error, no session created
2. **Empty password**: Form validation prevents submission
3. **Missing environment variable**: Graceful error handling
4. **Expired session**: User redirected to login after session expires
5. **Concurrent sessions**: Multiple devices can be logged in simultaneously
6. **Cookie tampering**: Invalid or modified cookies rejected
7. **Direct route access**: Unauthenticated users cannot access `/admin/upload`
8. **CSRF protection**: Login endpoint protected from CSRF attacks

### Performance Benchmarks

- Login API response time < 200ms
- Middleware auth check < 10ms (doesn't block fast routes)
- Session cookie size < 500 bytes
- Login page render time < 100ms

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test file structure for auth utilities, middleware, and API routes
- [ ] **Step 1.2**: Write failing tests for password verification (AC1, AC9)
  - Test correct password succeeds
  - Test wrong password fails with generic error
  - Test missing ADMIN_PASSWORD env var
- [ ] **Step 1.3**: Write failing tests for session management (AC3, AC8)
  - Test session creation with expiry
  - Test session validation
  - Test expired session rejection
- [ ] **Step 1.4**: Write failing tests for login API route (AC2, AC3, AC9)
  - Test successful login creates session
  - Test invalid password returns error
  - Test empty password returns validation error
- [ ] **Step 1.5**: Write failing tests for logout API route (AC7)
  - Test logout clears session cookie
  - Test logout redirects to home
- [ ] **Step 1.6**: Write failing tests for auth middleware (AC4, AC5, AC6)
  - Test `/admin/*` routes (except login) require authentication
  - Test unauthenticated requests redirect to login
  - Test authenticated requests allowed through
- [ ] **Step 1.7**: Write failing tests for login page component (AC2, AC10)
  - Test form submission
  - Test loading states
  - Test error display
  - Test mobile responsiveness
- [ ] **Step 1.8**: Run tests to verify they fail appropriately

**TDD Checkpoint:** All tests written and failing as expected

---

### Phase 2: Core Implementation

- [ ] **Step 2.1**: Create auth utilities in `src/lib/auth.ts`
  - Implement password verification (compare hashed values)
  - Implement session creation with JWT or signed cookie
  - Implement session validation
- [ ] **Step 2.2**: Verify auth utilities tests pass (AC1, AC3, AC8)
- [ ] **Step 2.3**: Create login API route `src/app/api/admin/login/route.ts`
  - Parse password from request body
  - Verify password using auth utility
  - Create session cookie on success
  - Return appropriate error on failure
- [ ] **Step 2.4**: Verify login API tests pass (AC2, AC3, AC9)
- [ ] **Step 2.5**: Create logout API route `src/app/api/admin/logout/route.ts`
  - Clear session cookie
  - Return redirect response
- [ ] **Step 2.6**: Verify logout API tests pass (AC7)
- [ ] **Step 2.7**: Create auth middleware in `src/middleware.ts`
  - Check for valid session on `/admin/*` routes
  - Redirect to `/admin/login` if unauthenticated
  - Allow `/admin/login` without authentication
- [ ] **Step 2.8**: Verify middleware tests pass (AC4, AC5, AC6)
- [ ] **Step 2.9**: Create login page `src/app/admin/login/page.tsx`
  - Password input field with validation
  - Submit button with loading state
  - Error message display
  - Mobile-responsive design
- [ ] **Step 2.10**: Verify login page tests pass (AC2, AC10)

**Implementation Checkpoint:** All acceptance criteria tests passing

---

### Phase 3: Integration & Polish

- [ ] **Step 3.1**: Add TypeScript types for auth in `src/types/auth.ts`

  ```typescript
  export type AuthSession = {
    authenticated: boolean;
    expiresAt: number;
  };

  export type LoginRequest = {
    password: string;
  };

  export type LoginResponse = {
    success: boolean;
    error?: string;
  };
  ```

- [ ] **Step 3.2**: Add logout button to admin layout `src/app/admin/layout.tsx`
  - Show "Logout" button in admin nav
  - Call logout API on click
  - Redirect to home after logout
- [ ] **Step 3.3**: Add environment variable documentation to `.env.example`
  ```
  # Admin Authentication
  ADMIN_PASSWORD=your-secure-password-here
  ```
- [ ] **Step 3.4**: Add loading states with skeleton loaders during login
- [ ] **Step 3.5**: Add accessibility attributes (ARIA labels, focus management)
- [ ] **Step 3.6**: Implement rate limiting on login endpoint (prevent brute force)
- [ ] **Step 3.7**: Run full test suite to ensure no regressions

**Integration Checkpoint:** Feature fully integrated and polished

---

### Phase 4: Documentation & Refinement

- [ ] **Step 4.1**: Update README.md with admin authentication setup instructions
- [ ] **Step 4.2**: Add JSDoc comments for auth utilities and middleware
- [ ] **Step 4.3**: Document session management in architecture.md
- [ ] **Step 4.4**: Add usage examples for protected routes
- [ ] **Step 4.5**: Document environment variables needed (`ADMIN_PASSWORD`)
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
- [ ] Documentation updated (README, JSDoc, architecture.md)
- [ ] Planning doc fully checked off
- [ ] Git commits created with descriptive messages
- [ ] Performance benchmarks met (login < 200ms, middleware < 10ms)
- [ ] Accessibility requirements met (keyboard navigation, ARIA labels)
- [ ] Mobile responsive (login page works on mobile)
- [ ] No regressions in existing features
- [ ] Security review completed (no password leakage, secure cookies)

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Happy Path Test**
   - [ ] Start dev server: `yarn dev`
   - [ ] Navigate to `/admin/upload` (should redirect to `/admin/login`)
   - [ ] Enter correct password on login page
   - [ ] Verify redirect to `/admin/upload` after successful login
   - [ ] Verify access to admin features works

2. **Edge Case Testing**
   - [ ] Enter wrong password → verify error message displays
   - [ ] Submit empty password → verify validation error
   - [ ] Access `/admin/login` while logged in → verify redirect to `/admin`
   - [ ] Logout → verify redirect to home and session cleared
   - [ ] Try accessing `/admin/upload` after logout → verify redirect to login

3. **Session Testing**
   - [ ] Login and close browser → reopen and verify still logged in
   - [ ] Wait for session expiry (or manually expire cookie) → verify redirect to login
   - [ ] Login on mobile device → verify session works correctly

4. **Security Testing**
   - [ ] Inspect cookie in DevTools → verify it's httpOnly and secure
   - [ ] Modify cookie value → verify middleware rejects invalid cookie
   - [ ] Test with missing `ADMIN_PASSWORD` env var → verify graceful error

5. **Browser Testing**
   - [ ] Chrome (desktop & mobile)
   - [ ] Safari (desktop & mobile)
   - [ ] Firefox

6. **Performance Testing**
   - [ ] Check Network tab: login API response < 200ms
   - [ ] Check Performance tab: middleware overhead < 10ms
   - [ ] Verify no memory leaks after multiple login/logout cycles

7. **Accessibility Testing**
   - [ ] Keyboard navigation works (tab through login form)
   - [ ] Screen reader announces form fields correctly
   - [ ] Focus indicators visible on password input
   - [ ] Error messages announced by screen reader

---

## Rollback Plan

If this change needs to be reverted:

1. **Revert commit(s)**: `git revert <commit-hash>`
2. **Remove middleware**: Delete or comment out auth middleware in `src/middleware.ts`
3. **Remove login page**: Delete `/admin/login` directory
4. **Remove API routes**: Delete `/api/admin/login` and `/api/admin/logout`
5. **Remove test files**: Delete auth-related test files
6. **Update documentation**: Revert doc changes
7. **Notify stakeholders**: Communicate rollback and reason

**Risk Assessment:** Low (no database changes, only adds new routes)
**Rollback Difficulty:** Easy (self-contained feature, no migrations)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add admin authentication setup instructions
- [ ] `.claude/docs/architecture.md` - Document auth middleware and session management
- [ ] `.env.example` - Add `ADMIN_PASSWORD` variable
- [ ] `.claude/docs/deployment.md` - Document setting `ADMIN_PASSWORD` in Vercel

---

## Related Tasks

**Depends On:**

- [SS-7: Vercel Blob Integration](./ss-7-vercel-blob-integration.md) - Admin will upload images after authentication

**Blocks:**

- [SS-22: Image Upload System](./ss-22-image-upload-system.md) - Upload system requires admin authentication

**Related:**

- [SS-20: Rate Limiting](./ss-20-rate-limiting.md) - Login endpoint should be rate limited

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

---

## Notes

**Reference Documentation:**

- **MUST READ**: [Vercel Blob SDK Documentation](https://vercel.com/docs/vercel-blob/using-blob-sdk)
  - Review client-side upload patterns for admin image uploads
  - Understand authentication requirements for Blob storage
  - Learn about upload tokens and security best practices
  - Note: Admin authentication (SS-21) protects routes, but Vercel Blob has its own token system

**Authentication Strategy:**

- **Option 1: Simple Password (Chosen for MVP)**
  - Single admin password in environment variable
  - Session managed with httpOnly, secure cookies
  - JWT or signed cookie for session validation
  - Sufficient for single-admin use case
  - Can be extended later if needed

- **Future Enhancements (Post-MVP):**
  - Multiple admin users with database
  - Role-based access control (RBAC)
  - OAuth integration (Google, GitHub)
  - Two-factor authentication (2FA)
  - Audit logging for admin actions

**Security Considerations:**

- Password stored as environment variable (never committed to git)
- Session cookie is httpOnly (prevents XSS attacks)
- Session cookie is secure (HTTPS only in production)
- Session cookie is signed (prevents tampering)
- Login endpoint rate limited (prevents brute force)
- Generic error messages (no information leakage about valid/invalid passwords)
- Session expires after 24 hours (configurable)

**Session Implementation Options:**

1. **JWT (JSON Web Token)**: Self-contained, stateless, easy to implement
2. **Signed Cookie**: Simple, built into Next.js, good for MVP
3. **Server-side Session Store**: More secure but requires database/Redis

For this MVP, we'll use **Signed Cookie** with Next.js built-in session management for simplicity.

**Integration with Vercel Blob:**

- Admin authentication (SS-21) protects the `/admin/*` routes from unauthorized access
- Vercel Blob has its own security via `BLOB_READ_WRITE_TOKEN` (environment variable)
- The combination provides two layers of security:
  1. Admin auth prevents unauthorized users from accessing upload UI
  2. Blob token ensures only authorized apps can write to storage
- When implementing SS-22 (Image Upload), reference Vercel Blob SDK docs for proper token handling

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ✅ Completed | ⏸️ Blocked | ❌ Cancelled
