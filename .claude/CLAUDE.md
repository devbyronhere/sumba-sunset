# CLAUDE.md

This file provides core guidance to Claude Code (claude.ai/code) when working with code in this repository.

**📚 For detailed documentation, see:**

- [Architecture & Tech Stack](./docs/architecture.md)
- [Coding Standards & Best Practices](./docs/coding-standards.md)
- [Deployment Guide](./docs/deployment.md)
- [Planning Templates](./planning/_templates/)

---

## Working with Claude on This Project

### Roles & Responsibilities

**User's Role:**

- Create detailed implementation plans in "SS-X-..." planning documents
- Guide Claude during the planning phase with requirements and clarifications
- Set up third-party accounts and services (Twilio, Beds24, Vercel, etc.)
- Handle tasks that require external access or permissions
- Verify completed tasks before moving to the next one
- Review PRs and approve merges

**Claude's Role:**

- Implement ALL code, tests, and technical work as specified in planning documents
- Follow TDD workflow for all features
- Update planning documents in real-time during implementation
- Run all quality gates (tests, linting, type-checking)
- Create commits, branches, and pull requests
- Ask clarifying questions when requirements are unclear
- Report blockers (missing API keys, permission issues, etc.) to user

**Collaborative Workflow:**

1. User creates/guides planning document creation
2. Claude implements the task following the plan
3. Claude reports completion and provides manual testing checklist
4. User verifies the implementation
5. User merges PR, then instructs Claude to proceed to next task

---

## Test-Driven Development Requirements

**Claude MUST follow Test-Driven Development (TDD) for all feature development on this project:**

1. **New Features**: First write tests to define AC. Run tests to ensure code quality and functionality before committing. Always write tests unless explicitly told not to.

**EXCEPTION: Infrastructure/Configuration Tasks**

Infrastructure and configuration tasks (setup, deployment, DNS, credentials, etc.) do NOT require TDD tests:

- **No unit/integration tests needed** for: DNS configuration, environment setup, account creation, API key generation, third-party service configuration
- **Verification instead of tests**: These tasks use manual verification checklists in the planning document
- **Examples**: SS-3 (Domain Config), SS-4 (Credentials), SS-5 (Beds24 Setup) - all use verification, not tests

**Test Strategy Section in Planning Docs:**

- **Feature tasks**: Must include comprehensive test strategy with unit/integration tests
- **Infrastructure tasks**: Replace "Test Strategy" with "Verification Steps" or "Manual Testing Checklist"

### Development Workflow (for Feature Development)

1. **Understand Requirements**: Clarify what needs to be built or fixed
2. **Write Tests First**: Create failing tests that define the expected behavior
3. **Implement Solution**: Write the minimum code to make tests pass
4. **Refactor**: Clean up code while keeping tests green
5. **Verify**: Run all tests and ensure no regressions

This approach ensures robust, maintainable code with comprehensive test coverage across the Sumba Sunset platform.

---

## Planning Document System

**CRITICAL: Claude MUST NOT implement ANY feature without a planning document first.**

The `.claude/planning/` directory is the single source of truth for all work. It replaces traditional task management systems (Jira, Trello, etc.) and provides:

- **Complete work history**: What has been done
- **Current progress tracking**: What is being done and how far along
- **Future roadmap**: What needs to be done next

### Planning Document Requirements

**Before Starting ANY Task:**

1. **Planning document MUST exist** in `.claude/planning/` directory
2. **Document MUST follow the standard template** (see `.claude/planning/_templates/`)
3. **Document MUST include**:
   - Frontmatter metadata (task_id, status, dependencies, etc.)
   - Test Strategy section defining all tests to write
   - Acceptance Criteria defining "done"
   - Implementation Steps with checkboxes
   - Quality Gates checklist
   - Post-implementation verification steps

**IMPORTANT: SS-X Planning Documents vs. Research Documents**

- **SS-X docs (e.g., `ss-13-beds24-setup.md`)**: Implementation steps ONLY
  - Focus on "how to implement" not "why we chose this"
  - Step-by-step instructions with checkboxes
  - Technical configuration details
  - Quality gates and testing steps

- **Research/Feasibility docs (e.g., `beds24-feasibility-research.md`)**: Analysis and decisions
  - Why we chose a technology/service
  - Technical concerns and risk analysis
  - Cost-benefit analysis
  - Alternatives considered
  - Decision records

- **Rule**: If content is about "why" or "what if", it belongs in a research doc, not an SS-X doc
- **Reference**: SS-X docs should link to related research docs in frontmatter `related_docs` field

### During Implementation

1. **Read the planning document FIRST** - understand ALL steps before beginning
2. **Create feature branch**: `git checkout -b ss-{task_id}/{type}/{description}`
3. **Update status in real-time**:
   - Change `- [ ]` to `- [x]` immediately after completing each step
   - Add timestamps and notes: `- [x] Step 1 (✅ 2025-01-15 14:30 - Completed by Claude)`
   - Mark blocked items: `- [ ] Step 4 (⏸️ Blocked - Waiting for API keys)`
4. **Update frontmatter status**:
   - `not_started` → `in_progress` when you begin
   - `in_progress` → `completed` only when ALL quality gates pass
   - `in_progress` → `blocked` if you cannot proceed
5. **Commit incrementally**: Make atomic commits as you complete major steps
6. **NEVER batch updates** - update the planning doc after EVERY completed step
7. **Track time**: Update `started` and `completed` timestamps, record `actual_time`

### After Implementation

1. **Complete the Quality Gates checklist** - ALL items must pass
2. **Add Retrospective section** documenting learnings
3. **Push branch**: `git push -u origin <branch-name>`
4. **Create Pull Request** using `gh pr create` with:
   - Descriptive title from planning doc
   - Summary of changes
   - Link to planning doc
   - Manual testing checklist for user
5. **Update the Planning Index** (`.claude/planning/index.md`) to move task to "Completed"
6. **Link PR in planning doc** - Add PR number/URL to retrospective
7. **Link to related tasks** if follow-up work is needed

### Planning Templates

See `.claude/planning/_templates/` for detailed templates:

- `feature-template.md` - For new features (includes full structure example)
- `bugfix-template.md` - For bug fixes
- `refactor-template.md` - For refactoring tasks
- `infrastructure-template.md` - For tooling/setup

**To create a new task:**

1. Copy appropriate template to `.claude/planning/`
2. Rename to `ss-X-task-name.md` (next available task_id)
3. Fill in all frontmatter and sections
4. Add to Planning Index under "Not Started"
5. Link from previous/next tasks for navigation

### Custom Slash Commands for Planning

Use these commands for planning workflows:

- `/scope-feature` - Comprehensive feature scoping with TDD planning
- `/plan-feature` - Create implementation plan from scoping doc
- `/implement-feature` - Implement based on planning doc (TDD approach)

---

## Git Workflow

### Branch Naming Convention

`ss-{task_id}/{type}/{short-description}`

- Example: `ss-3/feat/authentication`
- Example: `ss-4/fix/login-bug`

### Commit Strategy

- Make atomic commits during implementation
- Each major step = one commit
- Follow conventional commit format: `feat:`, `fix:`, `refactor:`, etc.

### Pull Request Creation

- Create PR when all quality gates pass
- Link PR to planning doc
- Include manual testing checklist in PR description

### Claude's Git Responsibilities

1. Create feature branch at start of task
2. Commit incrementally during implementation (atomic commits)
3. Push branch when all quality gates pass
4. Create PR with comprehensive description
5. Link PR URL back to planning doc

### User's Git Responsibilities

1. Review PR and code changes
2. Run manual testing checklist
3. Approve and merge PR (or request changes)
4. **Verify deployment** after merge to main (Vercel auto-deploys)
5. **Perform smoke testing** on production after each milestone deployment

### Handling PR Review Delays

When a PR is waiting for review and blocking dependent work:

**Strategy 1: Work on Independent Tasks (Preferred)**

- Check Planning Index for tasks with no dependencies
- Prioritize independent work while waiting for PR approval
- Keeps git history clean and simple

**Strategy 2: Stack Branches (When No Independent Work Available)**

- Branch off the unmerged feature branch
- Example: `ss-4/feat/profile` branches from `ss-3/feat/auth`
- Create PR with base branch set to parent feature branch
- **IMPORTANT**: Clearly document the dependency chain

**When Stacking Branches:**

1. **Branch Creation:**

   ```bash
   git checkout ss-3/feat/auth
   git checkout -b ss-4/feat/profile
   ```

2. **PR Creation:**

   ```bash
   gh pr create --base ss-3/feat/auth --title "feat: User profile (depends on SS-3)"
   ```

3. **In Planning Doc Frontmatter:**

   ```yaml
   dependencies: [ss-3]
   base_branch: ss-3/feat/auth
   notes: 'Stacked on SS-3 - will need rebase after SS-3 merges'
   ```

4. **After Parent Merges:**
   - Claude will notify you that parent merged
   - Merge parent into child, or Claude can recreate branch from main
   - Alternative: Ask permission to rebase child branch onto main (requires approval - rebase is blocked by default)
   - Update PR base to main after rebase/merge

**Best Practices:**

- ✅ Prefer independent work when possible
- ✅ Limit branch stacking to 2 levels maximum
- ✅ Document all dependencies clearly
- ✅ Keep PRs small and focused (easier to review quickly)
- ✅ Mark urgent/blocking PRs in Planning Index
- ⚠️ Avoid stacking for infrastructure changes (high risk)
- ⚠️ Rebase requires clear communication

---

## Continuous Deployment Strategy

**CRITICAL: Deploy after every milestone to avoid big issues at project end.**

### Why Continuous Deployment?

- **Early issue detection**: Catch deployment problems early, not at launch
- **Incremental validation**: Each milestone is production-tested
- **Reduced risk**: Small, frequent deployments are safer than one big bang
- **Real environment testing**: Test integrations (Beds24, Twilio) in production
- **Confidence building**: Progressive validation that everything works

### Deployment Process (After Each Milestone)

1. **Complete all tasks** in milestone
2. **Pass all quality gates** (tests, linting, type-checking)
3. **Create milestone PR** with comprehensive description
4. **User reviews and approves** PR
5. **Merge to main** → Vercel auto-deploys to production
6. **Verify deployment** succeeds (check Vercel dashboard)
7. **User performs smoke testing** on production site
8. **Document deployment** in Planning Index milestone status table

### Post-Deployment Checklist (User Required)

After each milestone deployment, user must verify:

- [ ] Deployment succeeded (check Vercel dashboard - no errors)
- [ ] Production site loads without errors
- [ ] No console errors in browser DevTools
- [ ] New features from milestone are visible and functional
- [ ] No regressions in existing features
- [ ] Environment variables working correctly (if applicable)
- [ ] SSL certificate active (HTTPS green padlock)
- [ ] Mobile experience acceptable (test on real device)

### Critical Milestone Deployments

Some milestones require extra validation in production:

- **Milestone 3 (Beds24)**: Test full booking flow with Stripe test cards
- **Milestone 4 (Communication)**: Test contact form → Twilio → WhatsApp flow
- **Milestone 5 (Media)**: Verify Vercel Blob uploads work in production
- **Milestone 6 (UI Polish)**: Cross-browser and device testing
- **Milestone 8 (Testing & Quality)**: Run performance audits (Lighthouse)

### Rollback Strategy

If deployment causes production issues:

1. **Immediate**: Revert merge commit on main branch
2. **Redeploy**: Vercel auto-deploys previous working version
3. **Investigate**: Claude fixes issues in feature branch
4. **Retry**: Create new PR when fixed

**Note**: Small, frequent deployments make rollbacks simple and low-risk.

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings in dev mode
- [ ] Code coverage meets target (typically 80%)
- [ ] Documentation updated (README, JSDoc, etc.)
- [ ] Planning doc fully checked off
- [ ] Git commit created with descriptive message

---

## Post-Implementation Verification

**IMPORTANT: Claude should complete ALL automated work first, then provide this manual testing checklist to the user. DO NOT interrupt the implementation workflow to ask the user to manually test. Save all manual testing for the END.**

**Claude's responsibility:**

- Complete all automated tests, linting, type-checking, and quality gates
- Mark the task as complete in the planning doc
- Provide the user with a clear, actionable manual testing checklist
- List any specific scenarios or edge cases to test manually

**User's responsibility:**

- Review Claude's implementation
- Run through the manual testing checklist
- Report any issues found for Claude to fix

---

## Critical Conventions

### Package Manager

**ALWAYS use `yarn` commands, NEVER use `npm` or `npx`**

- ✅ Preferred: `yarn add`, `yarn dev`, `yarn build`
- ❌ Avoid: `npm install`, `npm run dev`, `npx`

### Import Style

**ALWAYS use absolute imports with `@/` prefix, NEVER use relative imports**

- ✅ Preferred: `import { Button } from '@/components/ui/Button';`
- ❌ Avoid: `import { Button } from '../../components/ui/Button';`

### Variable Naming

**Claude MUST always use descriptive variable names:**

- Choose variable names that clearly describe their purpose and content
- Avoid single-letter or cryptic variable names (except conventional cases)
- Prefer longer, self-explanatory names over brevity

**Examples:**

```typescript
// ✅ Preferred: Descriptive names
const userEmail = form.get('email');
const isAuthenticated = user?.role === 'admin';
const filteredProducts = products.filter((product) => product.inStock);

// ❌ Avoid: Cryptic names
const e = form.get('email');
const auth = user?.role === 'admin';
const fp = products.filter((p) => p.inStock);
```

### Parse, Don't Validate (Zod)

**Claude MUST follow the "Parse, don't validate" principle using Zod for all data validation:**

- Transform untrusted inputs into trusted types (don't just check them)
- Use Zod schemas to define and enforce data contracts at runtime
- Derive TypeScript types from Zod schemas using `z.infer<typeof schema>`
- Fail fast with detailed error messages when data doesn't match expectations

**Quick Example:**

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().int().positive(),
});

type User = z.infer<typeof UserSchema>;

function processUser(data: unknown): User {
  return UserSchema.parse(data); // Throws if invalid
}
```

**For detailed examples and patterns, see:** [Coding Standards - Parse Don't Validate](./docs/coding-standards.md#parse-dont-validate-using-zod)

---

## Common Development Commands

### Development

```bash
yarn dev              # Start dev server with Turbopack
yarn type-check       # Run TypeScript type checking
```

### Code Quality

```bash
yarn lint             # Run ESLint
yarn lint:fix         # Run ESLint with auto-fix
yarn format:check     # Run Prettier check
yarn format           # Run Prettier fix
yarn code:pre-commit  # Run type-check + lint-staged (pre-commit)
yarn code:fix         # Run full validation (pre-push)
```

**Git Hooks (automatic):**

- **Pre-commit**: Runs `yarn type-check` then `yarn lint-staged` on staged files only
- **Pre-push**: Runs `yarn lint:fix` and `yarn format:check` on entire codebase

### Build & Deploy

```bash
yarn build            # Build for production
yarn start            # Start production server locally
```

**Hosting:** Vercel (domain: sumbasunset.com)

---

## Project Context

For project overview, tech stack details, and business context, see:

- **[README.md](../README.md)** - Getting started & project overview
- **[Architecture Documentation](./docs/architecture.md)** - Complete technical details

---

## Server Components vs Client Components

- **Default**: Use Server Components unless you need interactivity
- **Server Components**: Static pages, data fetching, SEO-critical content
- **Client Components**: Forms, interactive UI, event handlers, client-side state
- **Best Practice**: Add `"use client"` only when necessary, keep client components small

**For detailed guidelines, see:** [Architecture - Server vs Client Components](./docs/architecture.md#server-components-vs-client-components)

---

## Documentation Quick Links

- **[Architecture & Tech Stack](./docs/architecture.md)**: Project structure, services, Beds24 integration, testing strategy
- **[Coding Standards](./docs/coding-standards.md)**: Naming conventions, code quality, examples, development commands
- **[Deployment Guide](./docs/deployment.md)**: Environment variables, build process, CI/CD, troubleshooting
- **[Planning Templates](./planning/_templates/)**: Feature, bugfix, refactor, and infrastructure templates
- **[Planning Index](./planning/index.md)**: Current task status and roadmap

---

## Claude Code Configuration

This project has an active `.claude/` directory containing:

- **`.claude/settings.json`**: Team-wide permissions and shared configuration (committed to git)
- **`.claude/settings.local.json`**: Personal project-specific overrides (automatically gitignored)
- **`.claude/commands/`**: Custom slash commands for common workflows
- **`.claude/docs/`**: Detailed documentation (architecture, coding standards, deployment)
- **`.claude/planning/`**: Planning documents and templates
