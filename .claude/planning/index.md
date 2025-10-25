# Sumba Sunset - Planning Index

> **Last Updated:** 2025-10-25
> **Active Tasks:** 0
> **Completed Tasks:** 3 (SS-1, SS-2, SS-3)

This is the master planning document for the Sumba Sunset project. It replaces traditional task management systems (Jira, Trello) and serves as the single source of truth for all work.

---

## 🏄 Project Overview

**Sumba Sunset** is a surf camp website for a property in Sumba, Indonesia. The site is primarily **marketing and informational**, with booking handled through Beds24 widget integration.

**Live Site:** [https://sumbasunset.com] ✅

**Key Features:**

- 📱 Mobile-first design (primary user device)
- 🏖️ Static content (pages, images, videos)
- 📅 Beds24 widget for bookings & payments
- 💬 Contact form → Twilio → Staff WhatsApp
- 🖼️ Image hosting via Vercel Blob
- 📊 Analytics & monitoring (GA4, Sentry, UptimeRobot)

**Tech Stack:**

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest
- **Hosting**: Vercel
- **External Services**: Beds24 (bookings), Twilio (WhatsApp), Vercel Blob (images)

**No Database Needed:** Beds24 handles bookings, Vercel Blob handles images, site is mostly static content.

---

## 📊 Project Status Overview

- **Total Tasks:** 49 (SS-1 through SS-49)
- **Completed:** 3 (6%)
- **In Progress:** 0
- **Not Started:** 46
- **Blocked:** 0

---

## 🎯 Current Sprint Focus

**Next Up:** SS-4 - Third-Party Credentials & Access Setup (Now that domain is live, time to configure credentials)

---

## 📋 Task Status Board

### ✅ Completed

| ID                                     | Task                                             | Priority | Est. Time | Actual Time | Completed  | PR  | Dependencies |
| -------------------------------------- | ------------------------------------------------ | -------- | --------- | ----------- | ---------- | --- | ------------ |
| [SS-1](./ss-1-nextjs-setup.md)         | Next.js Project Setup                            | High     | 1-2h      | 1.5h        | 2025-01-17 | N/A | None         |
| [SS-2](./ss-2-linting-setup.md)        | Linting & Formatting Setup                       | High     | 2-3h      | 2.5h        | 2025-01-17 | N/A | SS-1         |
| [SS-3](./ss-3-domain-configuration.md) | Domain Configuration - Point Hostinger to Vercel | High     | 30min-48h | 45min       | 2025-10-25 | N/A | None         |

### 🚧 In Progress

_No tasks currently in progress_

**Template:**
| ID | Task | Priority | Branch | PR Status | Started | Dependencies |
|----|------|----------|--------|-----------|---------|--------------|
| Example | Example Task | High | ss-X/feat/name | 🔄 In Review | 2025-01-17 | SS-1 |

### 📝 Not Started

| ID                                  | Task                                            | Priority | Est. Time | Dependencies | Notes                                                                      |
| ----------------------------------- | ----------------------------------------------- | -------- | --------- | ------------ | -------------------------------------------------------------------------- |
| [SS-4](./ss-4-credentials-setup.md) | Third-Party Credentials & Access Setup          | High     | 1-2h      | SS-1, SS-2   | Setup .env.local and verify access to all third-party services             |
| [SS-9](./ss-9-beds24-validation.md) | Beds24 Integration Validation (Technical Spike) | High     | 30-60 min | SS-1, SS-2   | Quick test to validate Beds24 widget works in Next.js 15 before full setup |
| [SS-10](./ss-10-beds24-setup.md)    | Beds24 Account Setup & Configuration            | High     | 8-12h     | SS-4, SS-9   | Complex setup - booking platform configuration (human-led)                 |

### ⏸️ Blocked

_No blocked tasks_

**Template:**
| ID | Task | Priority | Blocked By | Blocker Type | Notes |
|----|------|----------|------------|--------------|-------|
| Example | Example Task | High | SS-3 PR Review | Waiting on Review | Can't proceed until SS-3 merges |

**Blocker Types:**

- **Waiting on Review** - PR awaiting your approval
- **Waiting on Merge** - PR approved, awaiting merge
- **Waiting on External** - Third-party dependency (API keys, etc.)
- **Waiting on Decision** - Need architectural/design decision
- **Technical Blocker** - Bug or issue preventing progress

---

## 🗺️ Project Roadmap

### Phase 1: Foundation ✅ COMPLETE

- [x] **SS-1**: Next.js Project Setup
- [x] **SS-2**: Linting & Formatting Setup

### Phase 2: Core Infrastructure (Not Started)

- [x] **SS-3**: Domain Configuration ✅
- [ ] **SS-4**: Third-Party Credentials & Access Setup
- [ ] **SS-5**: shadcn/ui setup and base components
- [ ] **SS-6**: Vitest testing setup
- [ ] **SS-7**: Vercel Blob integration for images
- [ ] **SS-8**: Monitoring setup (Sentry, GA4, UptimeRobot)

### Phase 2.5: Beds24 Setup & Integration (Not Started)

- [ ] **SS-10**: Beds24 Integration Validation (30-60 min technical spike)
- [ ] **SS-11**: Beds24 Account Setup & Configuration (8-12 hours, human-led)
- [ ] **SS-12**: Beds24 widget integration
- [ ] **SS-13**: Beds24 payment configuration (Stripe, deposits)
- [ ] **SS-14**: Beds24 email templates
- [ ] **SS-15**: Beds24 widget CSS customization
- [ ] **SS-16**: Currency Switch Spike - Investigate USD → IDR migration

### Phase 3: Communication Features (Not Started)

- [ ] **SS-17**: Contact form with React Hook Form + Zod
- [ ] **SS-18**: Twilio integration (form → WhatsApp to +27 78 778 7591)
- [ ] **SS-19**: WhatsApp Click-to-Chat button
- [ ] **SS-20**: Rate limiting for contact form

### Phase 4: Media & Content (Not Started)

- [ ] **SS-21**: Image upload system (Vercel Blob with pre-optimization)
- [ ] **SS-22**: YouTube video embeds (loop, no ads)
- [ ] **SS-23**: Image gallery component
- [ ] **SS-24**: Responsive images for mobile/desktop

### Phase 5: Marketing Pages & UI Polish (Not Started)

- [ ] **SS-25**: Homepage (hero, features, gallery, CTA)
- [ ] **SS-26**: About page (surf camp story, team)
- [ ] **SS-27**: Rooms & Accommodation page
- [ ] **SS-28**: Activities & Surf Info page
- [ ] **SS-29**: Polish contact/booking pages
- [ ] **SS-30**: Mobile-first responsive design

### Phase 6: Currency Investigation (Not Started)

- [ ] **SS-39**: Currency Switch Spike - Investigate USD → IDR migration

### Phase 7: Testing & Quality (Not Started)

- [ ] **SS-31**: Unit tests for utilities and validations
- [ ] **SS-32**: Integration tests for forms and API routes
- [ ] **SS-33**: Mobile device testing
- [ ] **SS-34**: Performance optimization
- [ ] **SS-35**: SEO optimization

### Phase 8: MVP Launch (Not Started)

- [ ] **SS-36**: Remove pre-launch banner (set NEXT_PUBLIC_PRE_LAUNCH=false)
- [ ] **SS-37**: Update robots.txt to allow search engine indexing
- [ ] **SS-38**: Final pre-launch checklist (comprehensive QA)
- [ ] **SS-39**: Go live announcement! (social media, press, etc.)

### Post-MVP: OTA Channel Integrations (Future)

- [ ] Booking.com listing via Beds24 channel manager
- [ ] Airbnb listing via Beds24 channel manager
- [ ] Agoda listing via Beds24 channel manager

**Note:** Beds24 includes built-in channel manager - OTA integrations are configured within Beds24 dashboard, not as separate site integrations.

---

## 🚀 Continuous Deployment Strategy

**IMPORTANT: Deploy after every milestone completion to avoid big issues at project end.**

### Deployment Workflow

After completing each milestone:

1. **Verify all quality gates pass** (tests, linting, type-checking)
2. **Create Pull Request** for milestone branch
3. **User reviews and approves** PR
4. **Merge to main** branch
5. **Vercel automatically deploys** to production (via GitHub integration)
6. **Verify deployment successful** at production URL
7. **User performs smoke testing** on production site
8. **Document any deployment issues** in retrospective

### Why Continuous Deployment?

- **Early issue detection**: Catch deployment problems early, not at launch
- **Incremental validation**: Each milestone is production-tested
- **Reduced risk**: Small, frequent deployments are safer than one big bang
- **Real environment testing**: Test integrations (Beds24, Twilio) in production
- **Confidence building**: Progressive validation that everything works
- **Rollback simplicity**: Easy to revert small changes vs. large releases

### Vercel Deployment Process

**Automatic Deployments:**

- Every push to `main` → Production deployment
- Every PR branch → Preview deployment
- GitHub integration handles all automation

**What Gets Deployed:**

- Next.js application build
- Environment variables (configured in Vercel Dashboard)
- Static assets
- API routes

**Deployment Strategy:**

- Deploy to **live domain (sumbasunset.com)** after each milestone merge
- Use `robots.txt` and "under construction" banner for pre-launch privacy
- Zero cutover risk at official launch (just remove banner)
- Catch DNS/SSL/domain issues early in development

**Post-Deployment Checklist (After Each Milestone):**

- [ ] Deployment succeeded (check Vercel dashboard)
- [ ] Production site loads at https://sumbasunset.com
- [ ] SSL certificate active (HTTPS green padlock)
- [ ] No console errors in browser DevTools
- [ ] New features from milestone are visible and functional
- [ ] No regressions in existing features
- [ ] Environment variables working correctly (if applicable)
- [ ] Mobile experience acceptable (test on real device)

### Milestone Deployment Status

| Milestone                     | Status      | Deployed   | Deployment Date | Production URL              |
| ----------------------------- | ----------- | ---------- | --------------- | --------------------------- |
| 1: Dev Environment ✅         | Complete    | ✅ Yes     | 2025-01-17      | sumbasunset.com             |
| 2: Core Infrastructure        | Not Started | ⏸️ Pending | TBD             | sumbasunset.com             |
| 3: Beds24 + Currency Decision | Not Started | ⏸️ Pending | TBD             | sumbasunset.com             |
| 4: Communication              | Not Started | ⏸️ Pending | TBD             | sumbasunset.com             |
| 5: Media & Content            | Not Started | ⏸️ Pending | TBD             | sumbasunset.com             |
| 6: Marketing Pages            | Not Started | ⏸️ Pending | TBD             | sumbasunset.com             |
| 7: Testing & Quality          | Not Started | ⏸️ Pending | TBD             | sumbasunset.com             |
| 8: MVP Launch 🚀              | Not Started | ⏸️ Pending | TBD             | sumbasunset.com (🎉 Public) |

---

## 📈 Milestones

### Milestone 1: Development Environment Setup ✅

**Status:** Complete
**Target Date:** 2025-01-17
**Completed:** 2025-01-17
**Deployed:** ✅ Yes (2025-01-17)
**Deployed:** ✅ Yes (2025-01-17)

**Tasks:**

- [x] SS-1: Next.js Project Setup
- [x] SS-2: Linting & Formatting Setup

**Outcome:** Development environment fully configured with Next.js 15, TypeScript, Tailwind CSS, ESLint, Prettier, and Git hooks.

**Deployment:** Automatic deployment to Vercel completed. Base Next.js app live. Domain will be configured in Milestone 2 (SS-3).

---

### Milestone 2: Core Infrastructure

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 1

**Tasks:**

- [ ] SS-3: Domain Configuration (Point sumbasunset.com to Vercel)
- [ ] SS-4: Pre-Launch Privacy Controls (robots.txt + banner + env var)
- [ ] SS-5: Third-Party Credentials & Access Setup
- [ ] SS-6: shadcn/ui setup with base components
- [ ] SS-7: Vitest testing framework setup
- [ ] SS-8: Vercel Blob integration for images
- [ ] SS-9: Monitoring setup (Sentry, GA4, UptimeRobot)

**Outcome:** Core infrastructure ready for feature development with testing and monitoring in place. Domain configured and pointing to live site with pre-launch privacy controls active.

**Deployment:** After milestone completion, merge to main and deploy to **sumbasunset.com**. Verify:

- DNS resolves to Vercel
- SSL certificate active (HTTPS)
- "Under construction" banner displays
- robots.txt blocks search engines
- Monitoring dashboards receiving data

---

### Milestone 3: Beds24 Setup & Integration + Currency Decision

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 2 (requires SS-5 credentials)

**📋 Research & Analysis:**

- [Beds24 Feasibility Research](./beds24-feasibility-research.md) - Technical analysis, risk assessment, and decision rationale for choosing Beds24 over alternatives (Smoobu, custom solution). Covers CORS concerns, Next.js 15 compatibility, hydration issues, and cost-benefit analysis. **Read this first** to understand the "why" before implementation.

**Tasks:**

- [ ] SS-10: Beds24 Integration Validation (30-60 min technical spike)
- [ ] SS-11: Beds24 Account Setup & Configuration (USER creates account, 8-12 hours)
- [ ] SS-12: Beds24 widget integration (basic placeholder booking page)
- [ ] SS-13: Beds24 payment configuration (Stripe integration, 50% deposit model)
- [ ] SS-14: Beds24 email templates (booking confirmation, pre-arrival, post-stay)
- [ ] SS-15: Beds24 widget CSS customization (mobile-first responsive design)
- [ ] SS-16: Currency Switch Spike - Investigate USD → IDR migration

**Outcome:** Fully functional booking system with Beds24 widget integrated, payment processing configured, and automated email workflows set up. **Currency decision made** before building marketing pages (avoids rework if switching from USD to IDR).

**Note:** User will create Beds24 account at start of this milestone. Claude will guide through configuration steps in SS-11 planning doc.

**Why Currency Decision Here?** Making the USD vs. IDR decision NOW (before Milestone 5-6 marketing pages) means:

- If you choose IDR, we build all pricing displays with IDR from the start
- No rework needed to update currency formatting in already-built pages
- Beds24 currency is set correctly before any content references it

**Deployment:** After milestone completion, merge to main and deploy. **CRITICAL**: Test end-to-end booking flow in production with real Stripe test cards. Verify email automation triggers correctly. Document currency decision for all future work.

---

### Milestone 4: Communication Features (Basic Placeholders)

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 3 (Beds24 + Currency Decision)

**Tasks:**

- [ ] SS-17: Contact form with React Hook Form + Zod (basic placeholder page)
- [ ] SS-18: Twilio integration (WhatsApp forwarding to +27 78 778 7591)
- [ ] SS-19: WhatsApp Click-to-Chat button
- [ ] SS-20: Rate limiting for contact form

**Outcome:** Functional communication flows (contact form and WhatsApp) with basic placeholder pages. Validated and working after booking system and currency decision are complete.

**Deployment:** After milestone completion, merge to main and deploy. **CRITICAL**: Test contact form → Twilio → WhatsApp flow in production. Verify rate limiting works.

---

### Milestone 5: Media & Content (Basic Placeholders)

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 4 (Communication Features)

**Tasks:**

- [ ] SS-21: Image upload system (Vercel Blob with pre-optimization)
- [ ] SS-22: YouTube video embeds (loop, no ads)
- [ ] SS-23: Image gallery component (basic version)
- [ ] SS-24: Responsive images for mobile/desktop

**Outcome:** Media systems functional with basic placeholder pages. Nice UI comes in Milestone 6.

**Content Strategy:**

- **Images**: Use placeholder images (stock photos or AI-generated mockups) for initial launch
- **Post-Launch**: Professional photographer will visit property and replace placeholders with real photos
- **Copy**: User will provide copy during Milestone 6 (knows property intimately)
- **Currency**: Use currency decided in Milestone 3 for any pricing displays

**Deployment:** After milestone completion, merge to main and deploy. Verify Vercel Blob image uploads work in production, test YouTube embeds, confirm responsive images load correctly.

---

### Milestone 6: Marketing Pages & UI Polish

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 5 (Media & Content)

**Tasks:**

- [ ] SS-25: Homepage with hero, features, gallery, CTA (polished UI)
- [ ] SS-26: About page (surf camp story, team)
- [ ] SS-27: Rooms & Accommodation page (polished UI)
- [ ] SS-28: Activities & Surf Info page (polished UI)
- [ ] SS-29: Polish contact/booking pages with nice UI
- [ ] SS-30: Mobile-first responsive design across all pages

**Outcome:** All pages have polished, beautiful UI. Site looks professional and ready for users. **Currency from M3 decision is already integrated** throughout all pricing displays.

**Content Workflow:**

- User provides copy for each page as we build it (knows property and area intimately)
- Claude implements UI with user-provided content
- Placeholder images used until professional photography available post-launch
- All pricing displays use currency decided in Milestone 3

**Deployment:** After milestone completion, merge to main and deploy. Perform comprehensive cross-browser and mobile device testing in production. Verify all pages render correctly and currency displays consistently.

---

### Milestone 7: Testing & Quality

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 6 (Marketing Pages & UI Polish)

**Tasks:**

- [ ] SS-31: Unit tests for utilities and validations
- [ ] SS-32: Integration tests for forms and API routes
- [ ] SS-33: Mobile device testing
- [ ] SS-34: Performance optimization
- [ ] SS-35: SEO optimization

**Outcome:** Site is tested, optimized, and production-ready. All features work correctly with the currency chosen in Milestone 3.

**Deployment:** After milestone completion, merge to main and deploy. Run full test suite in production environment. Verify performance improvements (Lighthouse scores), confirm SEO meta tags, test on real mobile devices.

---

### Milestone 9: MVP Launch

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 8 (Testing & Quality)

**Tasks:**

- [ ] SS-36: Remove pre-launch banner (set NEXT_PUBLIC_PRE_LAUNCH=false)
- [ ] SS-37: Update robots.txt to allow search engine indexing
- [ ] SS-38: Final pre-launch checklist (comprehensive QA)
- [ ] SS-39: Go live announcement! (social media, press, etc.)

**Outcome:** Fully functional, tested, and polished surf camp website publicly launched at sumbasunset.com with chosen currency (USD or IDR from M3 decision).

**Deployment:** This milestone **does NOT require new deployment** - the site is already live on sumbasunset.com from previous milestones. This milestone simply:

1. Removes privacy controls (banner + robots.txt)
2. Performs final QA
3. Makes public announcement

The site has been production-tested throughout development with the correct currency. Launch is just flipping the "public" switch.

---

## 🔗 Dependencies Graph

```
Milestone 1: Foundation ✅ COMPLETE
├─ SS-1 (Next.js Setup)
└─ SS-2 (Linting Setup)
       ↓
Milestone 2: Core Infrastructure 🚧 NEXT
├─ SS-3 (Domain Configuration - Hostinger → Vercel)
├─ SS-4 (Third-Party Credentials & Access)
├─ SS-5 (shadcn/ui setup)
├─ SS-6 (Vitest setup)
├─ SS-7 (Vercel Blob integration)
└─ SS-8 (Monitoring: Sentry, GA4, UptimeRobot)
       ↓
Milestone 3: Beds24 Setup & Integration + Currency Decision
├─ SS-10 (Beds24 validation - 30-60 min spike)
├─ SS-11 (Beds24 account setup)
├─ SS-12 (Beds24 widget integration)
├─ SS-13 (Payment config - Stripe, deposits)
├─ SS-14 (Email templates)
├─ SS-15 (Widget CSS customization)
└─ SS-16 (Currency Switch Spike - USD vs IDR decision)
       ↓
Milestone 4: Communication Features
├─ SS-17 (Contact form)
├─ SS-18 (Twilio → WhatsApp)
├─ SS-19 (WhatsApp Click-to-Chat)
└─ SS-20 (Rate limiting)
       ↓
Milestone 5: Media & Content (Basic Placeholders)
├─ SS-21 (Image upload system)
├─ SS-22 (YouTube embeds)
├─ SS-23 (Image gallery - basic)
└─ SS-24 (Responsive images)
       ↓
Milestone 6: Marketing Pages & UI Polish
├─ SS-25 (Homepage - polished UI)
├─ SS-26 (About page - polished UI)
├─ SS-27 (Rooms page - polished UI)
├─ SS-28 (Activities page - polished UI)
├─ SS-29 (Polish contact/booking pages)
└─ SS-30 (Mobile-first responsive - all pages)
       ↓
Milestone 7: Testing & Quality
├─ SS-31 (Unit tests)
├─ SS-32 (Integration tests)
├─ SS-33 (Mobile device testing)
├─ SS-34 (Performance optimization)
└─ SS-35 (SEO optimization)
       ↓
Milestone 8: MVP Launch
├─ SS-36 (Remove pre-launch banner)
├─ SS-37 (Update robots.txt)
├─ SS-38 (Final pre-launch QA)
└─ SS-39 (Go live announcement! 🚀)
       ↓
Post-MVP: Booking Site Integrations
├─ Booking.com (via Beds24 channel manager)
├─ Airbnb (via Beds24 channel manager)
└─ Agoda (via Beds24 channel manager)
```

**Key Strategy:**

- **Sequential milestone completion**: Each system validated before starting the next
- **Milestone 3**: Beds24 booking system + **Currency decision** (USD vs IDR) - decided BEFORE building marketing pages to avoid rework
- **Milestone 4-5**: Communication and media features with basic placeholder pages
- **Milestone 6**: Polish everything with beautiful UI using currency from M3 decision
- **Milestone 7-8**: Testing, quality, and launch
- **Currency decision early**: By choosing currency in M3, all pricing displays in M5-6 are built correctly from the start

---

## 📝 Decision Log

### Decision 1: Use Next.js 15 with App Router

**Date:** 2025-01-17
**Context:** Need modern React framework with SSR/SSG capabilities
**Decision:** Use Next.js 15 with App Router (not Pages Router)
**Rationale:**

- Server Components by default (better performance)
- Improved data fetching patterns
- Built-in optimizations
- Future-proof architecture

**Status:** ✅ Implemented in SS-1

---

### Decision 2: Wrapper Script Pattern for Git Hooks

**Date:** 2025-01-17
**Context:** Need flexible, maintainable git hook system
**Decision:** Use wrapper scripts (`_git:*` → `code:*`) instead of direct commands in hooks
**Rationale:**

- Easy to add type-checking and tests later without editing shell scripts
- Discoverable: can run `yarn code:pre-commit` manually
- Consistent with ea-inclusion project pattern
- Simpler to chain multiple commands in package.json

**Alternatives Considered:**

- Direct commands in Husky hooks (rejected: harder to maintain)
- Complex shell scripts (rejected: less discoverable)

**Status:** ✅ Implemented in SS-2

---

### Decision 3: Planning Document System

**Date:** 2025-01-17
**Context:** Need reliable task tracking and implementation verification
**Decision:** Use markdown planning documents with metadata, checklists, and TDD approach
**Rationale:**

- Version controlled alongside code
- No external dependencies (Jira, etc.)
- Clear source of truth for work history
- Enables retrospective review
- Forces planning before implementation
- Integrates with Claude Code workflow

**Status:** ✅ Active system

---

### Decision 4: Use Beds24 Instead of Smoobu for Booking Management

**Date:** 2025-01-19
**Context:** Need booking management system with payment processing and channel manager
**Decision:** Use Beds24 (£3.50/month or $40-50/month) instead of Smoobu ($128.56/month + 0.9% booking fees)
**Rationale:**

- **Cost savings**: ~$1,267/year (Beds24 base plan vs Smoobu with fees)
- **No booking commission**: Beds24 has flat monthly fee, Smoobu charges 0.9% per booking
- **Built-in channel manager**: Syncs with Booking.com, Airbnb, Agoda (same as Smoobu)
- **Stripe integration**: Supports 50% deposit model required by client
- **Adequate features**: All required functionality present despite dated UI

**Trade-offs Accepted:**

- **Dated UI**: Less modern interface than Smoobu (mitigated with CSS customization)
- **Longer setup time**: 3-5 days vs 1-2 days for Smoobu (acceptable for cost savings)
- **More technical**: Requires CSS knowledge for widget customization (Claude can handle)
- **Manual configuration**: Channel manager setup less automated (one-time setup cost)

**Alternatives Considered:**

- Smoobu (rejected: 3x more expensive, booking fees add up)
- Building custom system (rejected: too complex, payment processing difficult)
- Manual calendar management (rejected: no payment processing, error-prone)

**Migration Strategy:**

If Beds24's UI becomes a conversion problem (users abandoning bookings):

1. First: Heavily customize CSS to modernize widget appearance
2. Second: Build custom booking form using Beds24 API backend
3. Last resort: Migrate to Smoobu or similar if revenue justifies cost

**Status:** 🚧 To be implemented in SS-10

---

## 📚 Quick Links

### Planning Resources

- [Planning Document Template - Feature](./_templates/feature-template.md)
- [Planning Document Template - Bugfix](./_templates/bugfix-template.md)
- [Planning Document Template - Refactor](./_templates/refactor-template.md)
- [Planning Document Template - Infrastructure](./_templates/infrastructure-template.md)

### Project Documentation

- [CLAUDE.md](../CLAUDE.md) - Claude Code instructions
- [README.md](../../README.md) - Project overview

### Custom Slash Commands

- `/scope-feature` - Comprehensive feature scoping with TDD planning
- `/plan-feature` - Create implementation plan from scoping doc
- `/implement-feature` - Implement based on planning doc (TDD approach)

---

## 📊 Statistics

### Time Tracking

- **Total Estimated Time:** 3-5 hours
- **Total Actual Time:** 4 hours
- **Estimation Accuracy:** 80% (slightly over estimate)

### Task Breakdown by Type

- Infrastructure: 2 (100%)
- Features: 0 (0%)
- Bug Fixes: 0 (0%)
- Refactoring: 0 (0%)

### Task Breakdown by Priority

- High: 2 (100%)
- Medium: 0 (0%)
- Low: 0 (0%)

---

## 🎓 Key Learnings Repository

### From SS-1 (Next.js Setup)

- Next.js 15 creates App Router structure by default
- Turbopack is now default in dev mode (much faster)
- TypeScript strict mode catches issues early

### From SS-2 (Linting Setup)

- Wrapper script pattern makes hooks more maintainable
- lint-staged on pre-commit + full check on pre-push is ideal balance
- Prettier should run on ALL files, ESLint only on JS/TS

---

## 📖 How to Use This Index

### Adding a New Task

1. Copy appropriate template from `.claude/planning/_templates/`
2. Rename to `ss-X-task-name.md` (use next available ID)
3. Fill in all metadata and sections
4. Add entry to "Not Started" section above
5. Update dependency graph if needed
6. Link from related tasks

### Starting a Task

1. Move task from "Not Started" to "In Progress"
2. Update frontmatter in task file: `status: in_progress`
3. Add `started` timestamp
4. Update "Current Sprint Focus" if high priority

### Completing a Task

1. Verify ALL quality gates pass in task document
2. Add retrospective notes to task document
3. Move task from "In Progress" to "Completed"
4. Update frontmatter: `status: completed`, add `completed` and `actual_time`
5. Update statistics and milestones as needed
6. Create follow-up tasks if discovered during implementation

### Blocking a Task

1. Move task to "Blocked" section
2. Update frontmatter: `status: blocked`
3. Add clear note explaining blocker
4. Create task to resolve blocker if possible
5. Notify team/user if external blocker

---

## 🔄 Maintenance Schedule

This index should be updated:

- ✅ **Immediately** when task status changes
- ✅ **Immediately** when new tasks are added
- 📅 **Weekly** for statistics and trends review
- 📅 **After each milestone** for retrospective updates

---

_This planning system replaces external task management tools and provides complete visibility into project progress, decisions, and learnings._
