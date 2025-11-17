# Sumba Sunset - Planning Index

This is the master planning document for the Sumba Sunset project. It replaces traditional task management systems (Jira, Trello) and serves as the single source of truth for all work.

---

## 🏄 Project Overview

**Sumba Sunset** is a surf camp website for a property in Sumba, Indonesia. The site is primarily **marketing and informational**, with booking handled through Beds24 widget integration.

**Live Site:** [https://sumbasunset.com] ✅

---

## 📊 Project Status Overview

- **Completed:** See checked tasks under milestones
- **Current Sprint Focus:** See the first unchecked tasks for out current focus. Tasks are ordered sequentially from ss-1 to ss-42

---

## 🎯 Current Sprint Focus

**Next Up:** SS-7 - Vitest testing framework setup

---

## 📋 Task Status Board

### Completed

See checked items in roadmap

### Not started

See unchecked items in roadmap

### 🚧 In Progress

See first unchecked item in roadmap

### ⏸️ Blocked

_No blocked tasks_

---

## 🚀 Continuous Deployment Strategy

**IMPORTANT: Deploy after every milestone completion to avoid big issues at project end.**

### Deployment Workflow

After completing each milestone:

1. **Verify all quality gates pass** (tests, linting, type-checking)
2. **Claude stages all changes** and notifies user
3. **User reviews staged changes** using the Source Control window in VS Code
4. **User approves** and instructs Claude to commit and push
5. **Claude creates Pull Request** for milestone branch
6. **User reviews, approves and merges to main** PR
7. **Vercel automatically deploys** to production (via GitHub integration)
8. **Verify deployment successful** at production URL
9. **User performs smoke testing** on production site
10. **Document any deployment issues** in retrospective

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

- [x] SS-3: Domain Configuration (Point sumbasunset.com to Vercel)
- [x] SS-4: Third-Party Credentials & Access Setup
- [x] SS-5: shadcn/ui setup with base components
- [x] SS-6: Pre-Launch Privacy Controls (robots.txt + banner + env var)
- [x] SS-7: Vitest testing framework setup
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
**Dependencies:** Milestone 2 (requires SS-4 credentials)

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
- [ ] SS-18: Twilio integration (WhatsApp forwarding to staff WhatsApp - uses sandbox initially)
- [ ] SS-19: WhatsApp Click-to-Chat button
- [ ] SS-20: Rate limiting for contact form

**Outcome:** Functional communication flows (contact form and WhatsApp) with basic placeholder pages. Validated and working after booking system and currency decision are complete.

**Note:** SS-18 will use Twilio Sandbox (`whatsapp:+14155238886`) for testing. Production WhatsApp number upgrade happens in Milestone 8 before launch.

**Deployment:** After milestone completion, merge to main and deploy. **CRITICAL**: Test contact form → Twilio → WhatsApp flow in production. Verify rate limiting works.

---

### Milestone 5: Media & Content (Basic Placeholders)

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 4 (Communication Features)

**Tasks:**

- [ ] SS-21: Admin Authentication (basic password-protected admin routes)
- [ ] SS-22: Image upload system (Vercel Blob with pre-optimization)
- [ ] SS-23: YouTube video embeds (loop, no ads)
- [ ] SS-24: Image gallery component (basic version)
- [ ] SS-25: Responsive images for mobile/desktop

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

- [ ] SS-26: Homepage with hero, features, gallery, CTA (polished UI)
- [ ] SS-27: About page (surf camp story, team)
- [ ] SS-28: Rooms & Accommodation page (polished UI)
- [ ] SS-29: Activities & Surf Info page (polished UI)
- [ ] SS-30: Polish contact/booking pages with nice UI
- [ ] SS-31: Mobile-first responsive design across all pages

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

- [ ] SS-33: Unit tests for utilities and validations
- [ ] SS-34: Integration tests for forms and API routes
- [ ] SS-35: Mobile device testing
- [ ] SS-36: Performance optimization
- [ ] SS-37: SEO optimization

**Outcome:** Site is tested, optimized, and production-ready. All features work correctly with the currency chosen in Milestone 3.

**Deployment:** After milestone completion, merge to main and deploy. Run full test suite in production environment. Verify performance improvements (Lighthouse scores), confirm SEO meta tags, test on real mobile devices.

---

### Milestone 8: MVP Launch

**Status:** Not Started
**Target Date:** TBD
**Dependencies:** Milestone 7 (Testing & Quality)

**Tasks:**

- [ ] SS-38: Upgrade Twilio WhatsApp to production number (purchase WhatsApp-enabled Twilio number, update environment variables)
- [ ] SS-39: SEO Optimization (meta tags, sitemap.xml, structured data)
- [ ] SS-40: Remove pre-launch banner (set NEXT_PUBLIC_PRE_LAUNCH=false)
- [ ] SS-41: Final pre-launch checklist (comprehensive QA)
- [ ] SS-42: Go live announcement! (social media, press, etc.)

**Outcome:** Fully functional, tested, and polished surf camp website publicly launched at sumbasunset.com with chosen currency (USD or IDR from M3 decision) and production WhatsApp integration.

**Pre-Launch Upgrade (SS-38):**

- Purchase WhatsApp-enabled Twilio number (~$1-2/month)
- Complete Facebook Business verification for WhatsApp
- Update ONLY `TWILIO_WHATSAPP_NUMBER` in `.env.local` and Vercel (all other credentials stay the same)
- Test end-to-end contact form flow with production number

**Deployment:** This milestone **does NOT require new deployment** - the site is already live on sumbasunset.com from previous milestones. This milestone simply:

1. Upgrades Twilio to production WhatsApp number
2. Removes privacy controls (banner + robots.txt)
3. Performs final QA
4. Makes public announcement

The site has been production-tested throughout development with the correct currency and Twilio sandbox. Launch requires only upgrading the WhatsApp number and flipping the "public" switch.

---

## 📖 How to Use This Index

### Adding a New Task

1. Copy appropriate template from `.claude/planning/_templates/`
2. Rename to `ss-X-task-name.md` (use next available ID)
3. Fill in all metadata and sections
4. Add entry to the Milestones section
5. update the numbering of tasks in this index and in all affected plannign docs

### Starting a Task

1. Update "Current Sprint Focus" if high priority
2. Open relevant planning doc [ss-?] and start working through this implementation plan
3. Check each item in the relevant implementation planning doc as you work through it

### Completing a Task

1. Verify ALL quality gates pass in task document
2. Add retrospective notes to task document
3. **Stage all changes** (`git add -A`) and notify user
4. **Wait for user review** - user verifies staged changes before commit
5. After user approval, commit and push changes
6. Create PR and await user merge
7. Check the task's checkbox in the milestones section
8. Create follow-up tasks if discovered during implementation

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
- 📅 **After each milestone** for retrospective updates

---

_This planning system replaces external task management tools and provides complete visibility into project progress, decisions, and learnings._
