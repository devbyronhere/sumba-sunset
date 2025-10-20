---
task_id: ss-4
title: '[Infrastructure] Third-Party Credentials & Access Setup'
status: not_started
priority: high
estimated_time: '1-2 hours'
actual_time: null
dependencies: [ss-1, ss-2, ss-3]
created: 2025-01-17
started: null
completed: null
related_docs: []
infra_type: configuration
---

[← Previous: SS-3 Domain Configuration](./ss-3-domain-configuration.md) | [📋 Index](./index.md) | [Next: SS-5 Beds24 Setup →](./ss-5-beds24-setup.md)

# [Infrastructure] Third-Party Credentials & Access Setup

## Overview

Before enabling autonomous work with skip permissions, verify access to all third-party services and set up environment variables. This task ensures Claude has the credentials needed to develop and test integrations without interruption.

**Infrastructure Type:** Configuration
**Impact:** All future feature development
**Risk Level:** Medium (requires handling sensitive credentials)

**Business Value:**

- Unblock development of third-party integrations (Twilio, Smoobu, Vercel Blob, etc.)
- Enable testing of API integrations locally
- Establish security best practices for credential management
- Identify missing permissions or access before starting feature work
- Enable autonomous Claude Code workflow without interruptions

---

## Problem Statement

### Current Situation

- `.env.example` exists with all required environment variables documented
- No `.env.local` file with actual credentials
- No third-party accounts exist.
- Unknown what access level is available on each third-party accounts
- Uncertain what Claude Code permissions need to be configured
- Need to verify credentials work before starting feature development
- Risk of interruptions mid-feature if credentials are missing

### Pain Points

- Cannot test third-party integrations (Twilio, Smoobu, Vercel Blob)
- May discover missing API keys mid-implementation
- Unclear which services have sandbox/test environments
- Don't know what permissions Claude should be granted
- Need to establish security best practices upfront

### Desired Outcome

After this task:

- `.env.local` file exists with all obtainable credentials
- Clear documentation of which services are ready to use
- Clear documentation of which services need accounts/setup
- Claude Code permissions configured appropriately
- Security guidelines established for credential usage
- Disallow rules configured to prevent unintentional damage

---

## Solution Design

### Proposed Infrastructure

**Two-Phase Approach:**

**Phase 1: Inventory & Documentation (Human-Led)**

1. User provides access status for each service
2. Document which credentials are available
3. Create `.env.local` with provided credentials
4. Document which services need setup before feature work

**Phase 2: Verification & Configuration (Claude-Assisted)**

1. Verify `.env.local` structure matches `.env.example`
2. Configure Claude Code permissions for autonomous work
3. Establish disallow rules to prevent damage
4. Document credential management best practices (local vs. Vercel)
5. Create troubleshooting guide for common issues
6. Document Vercel environment variable setup for production

### Services Requiring Credentials

From `.env.example`, we need access to:

#### 1. Twilio (Contact Form → WhatsApp)

**Required:**

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_NUMBER`
- `STAFF_WHATSAPP_NUMBER`

**Usage:** Contact form submissions forwarded to staff WhatsApp

**Test Environment:** Twilio has sandbox mode for WhatsApp testing

#### 2. Beds24 (Booking Management)

**Required:**

- `BEDS24_API_KEY` (account-level API key)
- `BEDS24_PROP_KEY` (property-specific key for widget)

**Usage:**

- Booking widget integration (requires PROP_KEY at minimum)
- API integration for advanced features (requires both keys)
- Channel manager integration (Airbnb, Booking.com sync)

**Test Environment:** Beds24 supports test bookings on live system

#### 3. Vercel Blob (Image Storage)

**Required:**

- `BLOB_READ_WRITE_TOKEN`

**Usage:** Image uploads and media management

**Test Environment:** Vercel provides test stores

#### 4. Sentry (Error Monitoring)

**Required:**

- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`

**Usage:** Production error tracking

**Test Environment:** Sentry free tier for development

#### 5. Google Analytics 4

**Required:**

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

**Usage:** User behavior tracking and analytics

**Test Environment:** GA4 has test/development properties

#### 6. Site Configuration

**Required:**

- `NEXT_PUBLIC_SITE_URL`

**Usage:** SEO, OG tags, canonical URLs

**Value:** Can use Vercel preview URL for now

### Claude Code Permissions Strategy

**Files Claude Should Access:**

- ✅ All project files in `/src`
- ✅ Configuration files (`.eslintrc.cjs`, `prettier.config.js`, etc.)
- ✅ Planning documents in `.claude/planning`
- ✅ Test files
- ✅ `.env.example` (template only, no secrets)

**Files Claude Should NOT Access:**

- ❌ `.env.local` (contains local development secrets)
- ❌ Any `.env.*` files with real credentials (should not exist in repo)
- ❌ `.git/config` (git configuration)

**Commands Claude Should Run:**

- ✅ `yarn dev`, `yarn build`, `yarn test`
- ✅ `yarn lint`, `yarn format`, `yarn type-check`
- ✅ `git add`, `git commit`, `git push`, `git checkout`
- ✅ File operations (read, write, edit)

**Commands Claude Should NOT Run:**

- ❌ `rm -rf` on critical directories
- ❌ Commands that modify `.git` directly
- ❌ Commands that expose environment variables (`env`, `printenv`)
- ❌ Network commands that send data externally (except git push)

### Alternatives Considered

**Alternative 1: Mock all third-party services**

- Pros: No real credentials needed, safe
- Cons: Can't verify real integrations work
- Why rejected: Need to test real API behavior

**Alternative 2: Setup all services immediately**

- Pros: Complete access from the start
- Cons: Expensive, time-consuming, may not need all services yet
- Why rejected: Can prioritize services based on development order

---

## Prerequisites/Dependencies

- [x] SS-1: Next.js project setup completed
- [x] SS-2: Linting & formatting setup completed
- [ ] User has access to GitHub repo
- [ ] User can create/obtain API keys for services
- [ ] `.env.example` file exists and is up to date

---

## Acceptance Criteria

- [ ] **AC1**: Inventory completed of all required services
- [ ] **AC2**: `.env.local` created with all available credentials
- [ ] **AC3**: Documentation of which services are ready vs. need setup
- [ ] **AC4**: Claude Code permissions configured for autonomous work
- [ ] **AC5**: Disallow rules established to prevent damage
- [ ] **AC6**: Security best practices documented
- [ ] **AC7**: Verification plan for each service documented
- [ ] **AC8**: Clear guidance on when to use test vs. production credentials

---

## Test Strategy

### How to Verify Credentials Work

**Since this is configuration, testing means verification:**

1. **File Structure Test**: Verify `.env.local` matches `.env.example` format
2. **Validation Test**: Ensure no syntax errors in `.env.local`
3. **Load Test**: Verify Next.js can load environment variables
4. **Documentation Test**: Confirm all services documented with status
5. **Permission Test**: Verify Claude can't access sensitive files
6. **Disallow Test**: Verify dangerous commands are blocked

### Verification Steps

**Phase 1: Environment File Verification**

- [ ] `.env.local` exists and is gitignored
- [ ] All required variables from `.env.example` present in `.env.local`
- [ ] No syntax errors (no spaces around `=`, proper quoting)
- [ ] Values are populated (not placeholder text)

**Phase 2: Service Status Verification**

- [ ] Document which services have credentials
- [ ] Document which services need setup
- [ ] Document test vs. production environments
- [ ] Create priority order for service setup

**Phase 3: Claude Code Configuration**

- [ ] Permissions configured in `.claude/settings.json`
- [ ] Disallow rules prevent dangerous operations
- [ ] Claude can read necessary files
- [ ] Claude cannot read `.env.local`

### Success Metrics

- Environment variables load without errors
- Clear documentation of service status
- No blockers for upcoming feature work
- Security best practices in place
- Claude can work autonomously without credential interruptions

---

## Implementation Steps

### Phase 1: Service Inventory (Human-Led)

**USER ACTION REQUIRED FOR ALL STEPS IN THIS PHASE**

- [ ] **Step 1.1**: Review `.env.example` to understand all required services
- [ ] **Step 1.2**: Check which third-party accounts already exist:
  - [ ] Twilio account status: \***\*\_\_\_\*\***
  - [ ] Smoobu account status: \***\*\_\_\_\*\***
  - [ ] Vercel account status: \***\*\_\_\_\*\***
  - [ ] Sentry account status: \***\*\_\_\_\*\***
  - [ ] Google Analytics account status: \***\*\_\_\_\*\***
- [ ] **Step 1.3**: For existing accounts, obtain API keys/credentials
- [ ] **Step 1.4**: Identify which accounts need to be created
- [ ] **Step 1.5**: Determine priority order for account creation
- [ ] **Step 1.6**: Document sandbox/test environments available

**Inventory Checkpoint:** Clear list of available vs. needed credentials

---

### Phase 2: Create .env.local File (Human-Led)

**USER ACTION REQUIRED FOR ALL STEPS IN THIS PHASE**

- [ ] **Step 2.1**: Copy `.env.example` to `.env.local`
  ```bash
  cp .env.example .env.local
  ```
- [ ] **Step 2.2**: Verify `.env.local` is in `.gitignore`
  ```bash
  git check-ignore .env.local
  # Should output: .env.local
  ```
- [ ] **Step 2.3**: Fill in available credentials in `.env.local`:
  - [ ] Twilio credentials (if available)
  - [ ] Smoobu API key (if available)
  - [ ] Vercel Blob token (if available)
  - [ ] Sentry DSN (if available)
  - [ ] Google Analytics ID (if available)
  - [ ] Site URL (use Vercel preview URL or localhost for now)
- [ ] **Step 2.4**: For unavailable services, add comment like:
  ```bash
  # TWILIO_ACCOUNT_SID=TODO_create_account
  ```
- [ ] **Step 2.5**: Test that Next.js loads environment variables:
  ```bash
  yarn dev
  # Check for any environment variable errors in console
  ```

**Environment File Checkpoint:** `.env.local` exists with all available credentials

---

### Phase 3: Document Service Status (Human-Led)

- [ ] **Step 3.1**: Create service status table below:

| Service          | Status | Environment | Blocking Tasks            | Priority |
| ---------------- | ------ | ----------- | ------------------------- | -------- |
| Twilio           | **\_** | **\_**      | SS-9 (Twilio integration) | **\_**   |
| Smoobu           | **\_** | **\_**      | SS-10 (Smoobu widget)     | **\_**   |
| Vercel Blob      | **\_** | **\_**      | SS-6 (Image storage)      | **\_**   |
| Sentry           | **\_** | **\_**      | SS-7 (Monitoring)         | **\_**   |
| Google Analytics | **\_** | **\_**      | SS-7 (Analytics)          | **\_**   |

**Status Values:**

- ✅ Ready (credentials available and tested)
- ⏸️ Needs Setup (account needs to be created)
- 🔄 In Progress (account being created)
- ❌ Blocked (waiting on external factor)

- [ ] **Step 3.2**: Identify which tasks can proceed vs. blocked
- [ ] **Step 3.3**: Create setup tasks for missing services

**Documentation Checkpoint:** Clear service status documented

---

### Phase 4: Configure Claude Code Permissions (Human-Led)

**USER ACTION REQUIRED: Review and configure permissions**

- [ ] **Step 4.1**: Review current `.claude/settings.json` permissions
- [ ] **Step 4.2**: Consider enabling "dangerous skip permissions" for:
  - [ ] Bash commands (yarn, git, etc.)
  - [ ] File operations (Read, Write, Edit)
  - [ ] Git operations (add, commit, push)
- [ ] **Step 4.3**: Decide on read restrictions:
  - Should Claude be able to read `.env.local`? (Recommend: NO)
  - Should Claude be able to read all files? (Recommend: YES except secrets)
- [ ] **Step 4.4**: Document permission decisions in notes below

**Permission Strategy:**

**Recommended Permissions:**

```json
{
  "dangerouslySkipPermissions": {
    "bash": ["yarn *", "git *", "chmod *"],
    "read": ["/**", "!/.env.local", "!/.env*"],
    "write": ["/src/**", "/.claude/**", "!/.env.local", "!/.env*"],
    "edit": ["/src/**", "/.claude/**", "!/.env.local", "!/.env*"]
  }
}
```

**Note:** Production credentials should NEVER be in the codebase. They belong in Vercel Dashboard → Settings → Environment Variables.

**Permission Decision:** ********\*\*\*\*********\_\_\_********\*\*\*\*********

**Permissions Checkpoint:** Claude Code permissions configured

---

### Phase 5: Establish Disallow Rules (Human-Led)

**USER ACTION REQUIRED: Configure disallow rules**

- [ ] **Step 5.1**: Review dangerous operations to prevent:
  - [ ] Deleting `.git` directory
  - [ ] Running `rm -rf` on critical directories
  - [ ] Exposing environment variables
  - [ ] Force pushing to main branch
  - [ ] Modifying `.env.local` directly

- [ ] **Step 5.2**: Add disallow patterns to `.claude/settings.json` (if supported)

- [ ] **Step 5.3**: Document forbidden operations in CLAUDE.md

**Forbidden Operations:**

1. ❌ `rm -rf .git`
2. ❌ `git push --force origin main`
3. ❌ `cat .env.local` or any exposure of secrets
4. ❌ Direct modification of `.env.local`
5. ❌ Network commands outside of git push
6. ❌ Commands that change file permissions unsafely

**Disallow Rules Checkpoint:** Safety guardrails in place

---

### Phase 6: Verification & Documentation (Claude-Assisted)

- [ ] **Step 6.1**: Claude verifies `.env.local` structure (without reading secrets)
  - Check file exists: `ls -la .env.local`
  - Verify gitignored: `git check-ignore .env.local`
  - Compare variable names with `.env.example` (via structure analysis)

- [ ] **Step 6.2**: Claude documents credential management best practices
  - Add section to CLAUDE.md about environment variables
  - Document how to rotate credentials
  - Document separation of local dev vs. Vercel production
  - Document Vercel Dashboard environment variable setup

- [ ] **Step 6.3**: Claude creates troubleshooting guide
  - Common environment variable errors
  - How to verify credentials are loaded
  - How to test each service connection

- [ ] **Step 6.4**: Claude updates planning docs
  - Mark tasks as ready or blocked based on service status
  - Update dependencies in planning index
  - Create setup tasks for missing services

**Verification Checkpoint:** All documentation and verification complete

---

## Quality Gates Checklist

**USER must verify these items (Claude cannot access secrets):**

- [ ] `.env.local` exists and is gitignored
- [ ] All available credentials populated in `.env.local`
- [ ] Next.js loads environment variables without errors (`yarn dev`)
- [ ] Service status documented with clear blockers
- [ ] Claude Code permissions configured appropriately
- [ ] Disallow rules prevent dangerous operations
- [ ] No secrets committed to git (verify with `git status`)
- [ ] Documentation updated in CLAUDE.md
- [ ] Planning docs updated with service readiness
- [ ] This planning doc fully checked off

---

## Post-Implementation Verification

### Manual Verification Steps (USER REQUIRED)

1. **Environment Variables Test**
   - [ ] Run `yarn dev` and check console for errors
   - [ ] Verify no "missing environment variable" warnings
   - [ ] Check that `process.env` loads variables correctly

2. **Git Safety Test**
   - [ ] Run `git status` - verify `.env.local` not listed
   - [ ] Run `git check-ignore .env.local` - should return `.env.local`
   - [ ] Verify no `.env.*` files except `.env.example` in repo: `ls -la .env*`
   - [ ] Verify no secrets in git history: `git log --all -p | grep -i "API_KEY"`

3. **Service Connectivity Test (for available services)**
   - [ ] Test Twilio credentials (if available): Create test API call
   - [ ] Test Vercel Blob (if available): Create test upload
   - [ ] Test Sentry (if available): Trigger test error
   - [ ] Test Google Analytics (if available): Verify tracking ID format

4. **Claude Permissions Test**
   - [ ] Verify Claude can read project files
   - [ ] Verify Claude cannot read `.env.local` (ask Claude to confirm)
   - [ ] Verify Claude can run approved bash commands
   - [ ] Verify disallow rules block dangerous operations

5. **Documentation Review**
   - [ ] All services have status documented
   - [ ] Next steps clear for missing services
   - [ ] Security best practices documented
   - [ ] Troubleshooting guide complete

---

## Rollback Plan

If credential setup causes issues:

1. **Remove .env.local**: `rm .env.local`
2. **Revert permissions**: Restore previous `.claude/settings.json`
3. **Clear any exposed secrets**:
   - If secrets committed to git: Rotate credentials immediately
   - Remove from git history: `git filter-branch` or contact GitHub support
4. **Rotate exposed credentials** in service dashboards:
   - Twilio: Regenerate Auth Token
   - Vercel: Regenerate Blob token
   - Sentry: Regenerate DSN
5. **Start over**: Use this planning doc to try again

**Rollback Risk:** Low (no code changes, only configuration) - High if secrets exposed
**Rollback Time:** 5 minutes (or several hours if secrets need rotation)

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.claude/CLAUDE.md` - Add environment variables section
- [ ] `.claude/CLAUDE.md` - Document credential management best practices
- [ ] `.claude/CLAUDE.md` - Add security guidelines
- [ ] `.claude/planning/index.md` - Update task status and blockers
- [ ] This planning doc - Document service status table
- [ ] Create troubleshooting guide (new file or in CLAUDE.md)

---

## Security Best Practices

### Credential Management

**DO:**

- ✅ Store **local development** credentials in `.env.local` (gitignored)
- ✅ Store **production** credentials in **Vercel Dashboard** (Settings → Environment Variables)
- ✅ Use test/sandbox credentials for local development
- ✅ Rotate credentials periodically (every 90 days recommended)
- ✅ Use Vercel's environment variable management (supports Preview vs. Production)
- ✅ Limit credential scope (read-only when possible)
- ✅ Document which credentials are test vs. production

**DON'T:**

- ❌ Commit `.env.local` to git
- ❌ Create `.env.production` file (use Vercel Dashboard instead)
- ❌ Commit ANY `.env.*` files except `.env.example`
- ❌ Share credentials in Slack/email/Discord
- ❌ Use production credentials in local development
- ❌ Store credentials in code files
- ❌ Log credential values to console
- ❌ Expose credentials in error messages

---

### Environment Variable Locations

| Environment           | Where Credentials Live                 | Committed to Git?        | Access Method               |
| --------------------- | -------------------------------------- | ------------------------ | --------------------------- |
| **Local Dev**         | `.env.local` on your machine           | ❌ NO (gitignored)       | `process.env.VAR_NAME`      |
| **Vercel Preview**    | Vercel Dashboard (marked "Preview")    | ❌ NO (stored by Vercel) | Auto-injected at build time |
| **Vercel Production** | Vercel Dashboard (marked "Production") | ❌ NO (stored by Vercel) | Auto-injected at build time |
| **Template**          | `.env.example`                         | ✅ YES (no real values)  | Reference only              |

**Important:** The ONLY `.env` file in your git repo should be `.env.example` (template with placeholder values).

### Claude Code Safety

**Claude Should:**

- ✅ Use environment variables via `process.env.VARIABLE_NAME`
- ✅ Check for missing variables and provide clear errors
- ✅ Never log credential values
- ✅ Use credentials only for intended purposes
- ✅ Document when new credentials are needed

**Claude Should NOT:**

- ❌ Read `.env.local` file directly
- ❌ Echo/print environment variables
- ❌ Commit any credential-containing files
- ❌ Modify `.env.local` without explicit permission
- ❌ Share credentials in responses to user

---

## Related Tasks

**Depends On:**

- [SS-1: Next.js Project Setup](./ss-1-nextjs-setup.md) - Base project needed
- [SS-2: Linting & Formatting Setup](./ss-2-linting-setup.md) - Development environment ready

**Blocks:**

- SS-6: Vercel Blob integration (needs BLOB_READ_WRITE_TOKEN)
- SS-7: Monitoring setup (needs SENTRY_DSN, GA_MEASUREMENT_ID)
- SS-9: Twilio integration (needs Twilio credentials)
- SS-10: Smoobu widget integration (needs SMOOBU_API_KEY)

**Enables:**

- All future third-party integration work
- Autonomous Claude Code workflow
- Testing of real API integrations

---

## Service Status Table

**Updated: 2025-01-17**

| Service          | Status          | Account Exists?     | Credentials Available? | Environment   | Blocking Tasks | Priority | Notes                                                                                                                                        |
| ---------------- | --------------- | ------------------- | ---------------------- | ------------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Twilio**       | ✅ Ready        | ☑ Yes              | ⏸️ Pending             | ☑ Production | SS-9           | High     | Upgraded account, WhatsApp enabled, $20 USD credits, Number: (606) 755-8767. **Need to obtain Account SID & Auth Token from console**        |
| **Beds24**       | ⏸️ Setup Needed | ☐ No                | ☐ No                   | N/A           | SS-10          | High     | **PAID SERVICE** - £3.50-50/month. Need to: 1) Create account, 2) Add property, 3) Obtain API keys (Account + Property), 4) Configure widget |
| **Hostinger**    | ✅ Ready        | ☑ Yes              | ⏸️ Pending             | ☑ Production | SS-3           | High     | Domain: sumbasunset.com. **Domain registrar ONLY** - DNS points to Vercel. Need DNS configuration for SS-3                                   |
| **Vercel**       | ✅ Ready        | ☑ Yes              | ☑ Yes                 | ☑ Production | SS-3, SS-6     | High     | Hosting platform (automatic deployments from GitHub). Free tier includes hosting + automatic SSL                                             |
| Vercel Blob      | ⏸️ Setup Needed | ☑ Yes (via Vercel) | ☐ No                   | N/A           | SS-6           | Medium   | Image storage via Vercel. Need to create blob store and obtain BLOB_READ_WRITE_TOKEN                                                         |
| Sentry           | ⏸️ Pending      | ☐ No                | ☐ No                   | Development   | SS-7           | Low      | Can defer until after MVP launch                                                                                                             |
| Google Analytics | ⏸️ Pending      | ☐ No                | ☐ No                   | Production    | SS-7           | Low      | Can defer until after MVP launch                                                                                                             |

**Summary:**

- **Ready to Use:** 3 services (Twilio, Hostinger domain, Vercel hosting)
- **Need Credentials:** Twilio (SID/Token), Vercel Blob (token)
- **Need Account Creation:** 2 services (Beds24, Sentry, GA4) - Beds24 is HIGH priority
- **Can Proceed With:** SS-3 (Domain → Vercel), SS-9 (Twilio), SS-6 (Vercel Blob)
- **Blocked:** SS-10 (Beds24 widget) until account created and configured
- **Deferred:** SS-7 (Sentry, GA4 - post-MVP)

---

## Questions for User

**ANSWERED - 2025-01-17:**

1. **Which third-party accounts already exist?**
   - Twilio: ☑ Yes - Upgraded account, WhatsApp enabled, $20 credits, Number: (606) 755-8767
   - Beds24: ☐ No - Need to create account
   - Hostinger: ☑ Yes - Domain sumbasunset.com (domain registrar ONLY, not hosting)
   - Vercel: ☑ Yes - Hosting platform for Next.js app
   - Sentry: ☐ No - Need to create
   - Google Analytics: ☐ No - Need to create

2. **For existing accounts, can you provide credentials now?**
   - ☑ Yes, I can provide some credentials (Twilio - need to obtain from console)
   - ☐ Need to create: Beds24 account
   - ☐ Need to obtain: Vercel Blob token (via Vercel dashboard)

3. **What environment should we use for local development?**
   - ☑ Production for Twilio (already upgraded, has credits)
   - ☑ Production for Beds24 (paid service)
   - ☑ Development for Vercel Blob (free tier)

   **Note:** Using production credentials for paid services, dev credentials for free services

4. **Claude Code permissions - what level of autonomy?**
   - ☑ Full autonomy (skip most permission prompts) - Based on existing approvals

5. **Hosting environment variables - configuration needed?**
   - ☑ Using **Vercel** for hosting (automatic deployments from GitHub)
   - ☑ Using **Hostinger** for domain registration only
   - Domain: sumbasunset.com (DNS points to Vercel via SS-3)
   - SSL: Automatic via Vercel (Let's Encrypt)
   - Environment variables: Set in Vercel Dashboard → Settings → Environment Variables

6. **Are there any additional credentials or services not in `.env.example`?**
   - ☐ No - All services documented in `.env.example`

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

### Credentials Obtained

- [x] **Twilio (production)**: Account upgraded, WhatsApp enabled, $20 USD credits, Number: (606) 755-8767
- [x] **Hostinger (production)**: Domain sumbasunset.com, SSL certificate active
- [ ] **Beds24**: Not yet created - HIGH PRIORITY (blocks SS-10)
- [ ] Vercel Blob: Not needed initially (using Hostinger)
- [ ] Sentry: Still needed for error monitoring
- [ ] Google Analytics: Still needed for analytics

### Still Needed

- Twilio Account SID and Auth Token (obtain from Twilio console)
- Beds24 account creation (£3.50-50/month)
- Beds24 API Key (account-level, from Account → Settings → API)
- Beds24 Property Key (property-level, from Property → Settings → API Key)
- Beds24 widget configuration and customization
- Vercel Blob token (obtain from Vercel Dashboard → Storage → Blob)
- DNS configuration in Hostinger (point to Vercel via SS-3)
- Staff WhatsApp number for forwarding
- Sentry account creation (can defer)
- Google Analytics property creation (can defer)

### Follow-up Tasks Created

- [x] ~~Create Twilio account~~ - DONE (upgraded, WhatsApp enabled)
- [x] ~~Setup domain~~ - DONE (Hostinger domain registration)
- [x] ~~Setup hosting~~ - DONE (Vercel hosting platform)
- [ ] **HIGH PRIORITY**: Create Beds24 account (budget £40-50/month)
- [ ] **HIGH PRIORITY**: Configure property in Beds24 dashboard
- [ ] **HIGH PRIORITY**: Obtain Beds24 API keys (Account + Property)
- [ ] **HIGH PRIORITY**: Obtain Twilio credentials from console
- [ ] **HIGH PRIORITY**: Configure DNS in Hostinger to point to Vercel (SS-3)
- [ ] **MEDIUM PRIORITY**: Setup Vercel Blob storage and obtain token (SS-6)
- [ ] **MEDIUM PRIORITY**: Customize Beds24 widget with CSS for mobile-first design
- [ ] **MEDIUM PRIORITY**: Test Beds24 booking flow on mobile and desktop
- [ ] Setup Sentry project (low priority)
- [ ] Setup Google Analytics property (low priority)

---

## Notes

**Important Reminders:**

1. **NEVER commit `.env.local` to git** - verify with `git status` before every commit
2. **NEVER create `.env.production`** - use Vercel Dashboard for production credentials
3. **ONLY `.env.example` should be in git** - all other `.env.*` files should be gitignored
4. **Use test/sandbox credentials** in `.env.local` for local development (where available)
5. **Use Vercel Dashboard** for all production credentials (Settings → Environment Variables)
6. **Rotate production credentials** immediately if accidentally exposed
7. **Hostinger is domain registrar ONLY** - DNS points to Vercel, hosting is on Vercel
8. **Document any credential issues** encountered during setup
9. **Update this planning doc** with actual service status as you discover it

**Next Steps After This Task:**

1. Review service status table
2. Create accounts for missing services (as separate tasks if needed)
3. Prioritize feature work based on credential availability
4. Update planning index with any new blockers

---

**Completion Date:** TBD
**Actual Time Spent:** TBD
**Final Status:** Not Started
