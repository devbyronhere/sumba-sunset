# Sumba Sunset - Planning Index

> **Last Updated:** 2025-01-17
> **Active Tasks:** 0
> **Completed Tasks:** 2

This is the master planning document for the Sumba Sunset project. It replaces traditional task management systems (Jira, Trello) and serves as the single source of truth for all work.

---

## 🏄 Project Overview

**Sumba Sunset** is a surf camp website for a property in Sumba, Indonesia. The site is primarily **marketing and informational**, with booking handled through Smoobu widget integration.

**Live Site:** https://sumba-sunset-m96okb7l6-byrons-projects-a07d9676.vercel.app/ (We will but a domain at a later stage)

**Key Features:**

- 📱 Mobile-first design (primary user device)
- 🏖️ Static content (pages, images, videos)
- 📅 Smoobu widget for bookings & payments
- 💬 Contact form → Twilio → Staff WhatsApp
- 🖼️ Image hosting via Vercel Blob
- 📊 Analytics & monitoring (GA4, Sentry, UptimeRobot)

**Tech Stack:**

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest
- **Hosting**: Vercel
- **External Services**: Smoobu (bookings), Twilio (WhatsApp), Vercel Blob (images)

**No Database Needed:** Smoobu handles bookings, Vercel Blob handles images, site is mostly static content.

---

## 📊 Project Status Overview

- **Total Tasks:** 31 (SS-1 through SS-31)
- **Completed:** 2 (6%)
- **In Progress:** 0
- **Not Started:** 29
- **Blocked:** 0

---

## 🎯 Current Sprint Focus

_No active tasks - ready for new work_

---

## 📋 Task Status Board

### ✅ Completed

| ID                              | Task                       | Priority | Est. Time | Actual Time | Completed  | PR  | Dependencies |
| ------------------------------- | -------------------------- | -------- | --------- | ----------- | ---------- | --- | ------------ |
| [SS-1](./ss-1-nextjs-setup.md)  | Next.js Project Setup      | High     | 1-2h      | 1.5h        | 2025-01-17 | N/A | None         |
| [SS-2](./ss-2-linting-setup.md) | Linting & Formatting Setup | High     | 2-3h      | 2.5h        | 2025-01-17 | N/A | SS-1         |

### 🚧 In Progress

_No tasks currently in progress_

**Template:**
| ID | Task | Priority | Branch | PR Status | Started | Dependencies |
|----|------|----------|--------|-----------|---------|--------------|
| Example | Example Task | High | ss-X/feat/name | 🔄 In Review | 2025-01-17 | SS-1 |

### 📝 Not Started

_No tasks currently planned_

**Template:**
| ID | Task | Priority | Est. Time | Dependencies | Notes |
|----|------|----------|-----------|--------------|-------|
| Example | Example Task | Medium | 2-3h | None | Ready to start |

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

- [ ] shadcn/ui setup and base components
- [ ] Vitest testing setup
- [ ] Vercel Blob integration for images
- [ ] Sentry error monitoring setup
- [ ] Google Analytics 4 integration
- [ ] UptimeRobot monitoring setup

### Phase 3: Communication & Booking (Not Started)

- [ ] Contact form with React Hook Form + Zod
- [ ] Twilio integration (form → WhatsApp)
- [ ] WhatsApp Click-to-Chat button
- [ ] Smoobu widget integration (booking & payments)
- [ ] Rate limiting for contact form

### Phase 4: Media & Content (Not Started)

- [ ] Image upload system (Vercel Blob with pre-optimization)
- [ ] YouTube video embeds (loop, no ads)
- [ ] Image gallery component
- [ ] Responsive images for mobile/desktop

### Phase 5: Marketing Pages (Not Started)

- [ ] Homepage (hero, features, gallery, CTA)
- [ ] About page (surf camp story, team)
- [ ] Rooms & Accommodation page
- [ ] Activities & Surf Info page
- [ ] Mobile-first responsive design

### Phase 6: Testing & Quality (Not Started)

- [ ] Unit tests for utilities and validations
- [ ] Integration tests for forms and API routes
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] SEO optimization

### Phase 7: Launch & Post-MVP (Not Started)

- [ ] Vercel deployment setup
- [ ] Custom domain configuration
- [ ] Environment variables configuration
- [ ] Pre-launch testing checklist
- [ ] Booking.com listing integration (future)
- [ ] Airbnb listing integration (future)
- [ ] Agoda listing integration (future)

---

## 📈 Milestones

### Milestone 1: Development Environment Setup ✅

**Status:** Complete
**Target Date:** 2025-01-17
**Completed:** 2025-01-17

**Tasks:**

- [x] SS-1: Next.js Project Setup
- [x] SS-2: Linting & Formatting Setup

**Outcome:** Development environment fully configured with Next.js 15, TypeScript, Tailwind CSS, ESLint, Prettier, and Git hooks.

---

### Milestone 2: Core Infrastructure & Components

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 1

**Tasks:**

- [ ] SS-3: shadcn/ui setup with base components
- [ ] SS-4: Vitest testing framework setup
- [ ] SS-5: Vercel Blob integration for images
- [ ] SS-6: Monitoring setup (Sentry, GA4, UptimeRobot)

**Outcome:** Core infrastructure ready for feature development with testing and monitoring in place.

---

### Milestone 3: Communication & Booking (Basic Placeholders)

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 2

**Tasks:**

- [ ] SS-7: Contact form with React Hook Form + Zod (basic placeholder page)
- [ ] SS-8: Twilio integration (WhatsApp forwarding)
- [ ] SS-9: Smoobu widget integration (basic placeholder page)
- [ ] SS-10: WhatsApp Click-to-Chat button
- [ ] SS-11: Rate limiting for contact form

**Outcome:** Functional communication and booking flows with basic placeholder pages. UI polish comes later in Milestone 5.

---

### Milestone 4: Media & Content (Basic Placeholders)

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 3

**Tasks:**

- [ ] SS-12: Image upload system (Vercel Blob with pre-optimization)
- [ ] SS-13: YouTube video embeds (loop, no ads)
- [ ] SS-14: Image gallery component (basic version)
- [ ] SS-15: Responsive images for mobile/desktop

**Outcome:** Media systems functional with basic placeholder pages. Nice UI comes in Milestone 5.

---

### Milestone 5: Marketing Pages & UI Polish

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 4

**Tasks:**

- [ ] SS-16: Homepage with hero, features, gallery, CTA (polished UI)
- [ ] SS-17: About page (surf camp story, team)
- [ ] SS-18: Rooms & Accommodation page (polished UI)
- [ ] SS-19: Activities & Surf Info page (polished UI)
- [ ] SS-20: Polish contact/booking pages with nice UI
- [ ] SS-21: Mobile-first responsive design across all pages

**Outcome:** All pages have polished, beautiful UI. Site looks professional and ready for users.

---

### Milestone 6: Testing & Quality

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 5

**Tasks:**

- [ ] SS-22: Unit tests for utilities and validations
- [ ] SS-23: Integration tests for forms and API routes
- [ ] SS-24: Mobile device testing
- [ ] SS-25: Performance optimization
- [ ] SS-26: SEO optimization

**Outcome:** Site is tested, optimized, and production-ready.

---

### Milestone 7: MVP Launch

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 6

**Tasks:**

- [ ] SS-27: Vercel deployment setup
- [ ] SS-28: Custom domain configuration
- [ ] SS-29: Environment variables configuration
- [ ] SS-30: Pre-launch testing checklist
- [ ] SS-31: Go live!

**Outcome:** Fully functional, tested, and polished surf camp website live in production.

---

## 🔗 Dependencies Graph

```
Milestone 1: Foundation ✅ COMPLETE
├─ SS-1 (Next.js Setup)
└─ SS-2 (Linting Setup)
       ↓
Milestone 2: Core Infrastructure
├─ SS-3 (shadcn/ui setup)
├─ SS-4 (Vitest setup)
├─ SS-5 (Vercel Blob integration)
└─ SS-6 (Monitoring: Sentry, GA4, UptimeRobot)
       ↓
Milestone 3: Communication & Booking (Basic Placeholders)
├─ SS-7 (Contact form - basic page)
├─ SS-8 (Twilio → WhatsApp)
├─ SS-9 (Smoobu widget - basic page)
├─ SS-10 (WhatsApp Click-to-Chat)
└─ SS-11 (Rate limiting)
       ↓
Milestone 4: Media & Content (Basic Placeholders)
├─ SS-12 (Image upload system)
├─ SS-13 (YouTube embeds)
├─ SS-14 (Image gallery - basic)
└─ SS-15 (Responsive images)
       ↓
Milestone 5: Marketing Pages & UI Polish
├─ SS-16 (Homepage - polished UI)
├─ SS-17 (About page - polished UI)
├─ SS-18 (Rooms page - polished UI)
├─ SS-19 (Activities page - polished UI)
├─ SS-20 (Polish contact/booking pages)
└─ SS-21 (Mobile-first responsive - all pages)
       ↓
Milestone 6: Testing & Quality
├─ SS-22 (Unit tests)
├─ SS-23 (Integration tests)
├─ SS-24 (Mobile device testing)
├─ SS-25 (Performance optimization)
└─ SS-26 (SEO optimization)
       ↓
Milestone 7: MVP Launch
├─ SS-27 (Vercel deployment setup)
├─ SS-28 (Custom domain)
├─ SS-29 (Environment variables)
├─ SS-30 (Pre-launch QA)
└─ SS-31 (Go live! 🚀)
       ↓
Post-MVP: Booking Site Integrations
├─ Booking.com
├─ Airbnb
└─ Agoda
```

**Key Strategy:**

- Milestones 3-4: Build functional flows with **basic placeholder pages**
- Milestone 5: Polish everything with **beautiful UI and marketing copy**
- This allows early testing of functionality before investing in design

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

## 📚 Quick Links

### Planning Resources

- [Planning Document Template - Feature](./_templates/feature-template.md)
- [Planning Document Template - Bugfix](./_templates/bugfix-template.md)
- [Planning Document Template - Refactor](./_templates/refactor-template.md)
- [Planning Document Template - Infrastructure](./_templates/infrastructure-template.md)

### Project Documentation

- [CLAUDE.md](..CLAUDE.md) - Claude Code instructions
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
