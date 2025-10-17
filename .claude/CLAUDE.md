# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working with Claude on This Project

### Test-Driven Development Requirements

**Claude MUST follow Test-Driven Development (TDD) for all work on this project:**

1. **New Features**: First write tests to define AC. Run tests to ensure code quality and functionality before committing. Always write tests unless explicitly told not to.

### Development Workflow

1. **Understand Requirements**: Clarify what needs to be built or fixed
2. **Write Tests First**: Create failing tests that define the expected behavior
3. **Implement Solution**: Write the minimum code to make tests pass
4. **Refactor**: Clean up code while keeping tests green
5. **Verify**: Run all tests and ensure no regressions

This approach ensures robust, maintainable code with comprehensive test coverage across the Sumba Sunset platform.

### Planning Document System

**CRITICAL: Claude MUST NOT implement ANY feature without a planning document first.**

The `.claude/planning/` directory is the single source of truth for all work. It replaces traditional task management systems (Jira, Trello, etc.) and provides:

- **Complete work history**: What has been done
- **Current progress tracking**: What is being done and how far along
- **Future roadmap**: What needs to be done next

#### Planning Document Requirements

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

**During Implementation:**

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

**After Implementation:**

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

#### Planning Document Structure

Every planning document MUST include:

````markdown
---
task_id: ss-X
title: 'Descriptive task title'
status: not_started | in_progress | completed | blocked
priority: high | medium | low
estimated_time: '2-4 hours'
actual_time: null
dependencies: [ss-Y, ss-Z]
created: YYYY-MM-DD
started: null
completed: null
assigned_to: claude | human | pair
related_docs: []
---

[← Previous: SS-X Task](./ss-X-task.md) | [📋 Index](./index.md) | [Next: SS-X Task →](./ss-X-task.md)

# Task Title

## Overview

Brief description of what this task accomplishes and why it's needed.

## Prerequisites/Dependencies

- [ ] Dependency 1 must be completed
- [ ] Required tools/packages installed

## Acceptance Criteria

Clear, testable criteria that define "done":

- [ ] Criterion 1
- [ ] Criterion 2

## Test Strategy

### Test Files to Create

- `src/__tests__/feature.test.ts` - Unit tests for feature logic
- `src/__tests__/integration/feature.integration.test.ts` - Integration tests

### Test Types

- Unit tests for core functionality
- Integration tests for API interactions
- E2E tests for user flows (if applicable)

### Coverage Target

- Minimum 80% coverage for new code
- 100% coverage for critical paths

### Edge Cases to Test

1. Empty input handling
2. Error scenarios
3. Boundary conditions

## Implementation Steps

### Phase 1: Setup & Tests (TDD)

- [ ] Step 1: Create test files
- [ ] Step 2: Write failing tests for acceptance criteria
- [ ] Step 3: Verify tests fail appropriately

### Phase 2: Implementation

- [ ] Step 4: Implement minimum code to pass tests
- [ ] Step 5: Verify tests pass
- [ ] Step 6: Add error handling

### Phase 3: Refinement

- [ ] Step 7: Refactor for clarity
- [ ] Step 8: Add documentation
- [ ] Step 9: Update related files

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] All tests passing (`yarn test`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] Linting passes (`yarn lint`)
- [ ] Formatting passes (`yarn format:check`)
- [ ] No console errors/warnings in dev mode
- [ ] Code coverage meets target (X%)
- [ ] Documentation updated (README, JSDoc, etc.)
- [ ] Planning doc fully checked off
- [ ] Git commit created with descriptive message

## Post-Implementation Verification

**IMPORTANT: Claude should complete ALL automated work first, then provide this manual testing checklist to the user. DO NOT interrupt the implementation workflow to ask the user to manually test. Save all manual testing for the END.**

**Manual testing checklist for user:**

1. Start dev server and verify feature works
2. Test edge cases manually
3. Check browser console for errors
4. Verify UI/UX matches requirements
5. Test on different browsers/devices (if applicable)

**Claude's responsibility:**

- Complete all automated tests, linting, type-checking, and quality gates
- Mark the task as complete in the planning doc
- Provide the user with a clear, actionable manual testing checklist
- List any specific scenarios or edge cases to test manually

**User's responsibility:**

- Review Claude's implementation
- Run through the manual testing checklist
- Report any issues found for Claude to fix

## Rollback Plan

If this change needs to be reverted:

1. Step to undo change 1
2. Step to undo change 2

## Documentation Updates

Files that need updating after this task:

- [ ] README.md
- [ ] CLAUDE.md
- [ ] API documentation
- [ ] User guide

## Git Workflow

**Branch Naming Convention:** `ss-{task_id}/{type}/{short-description}`

- Example: `ss-3/feat/authentication`
- Example: `ss-4/fix/login-bug`

**Commit Strategy:**

- Make atomic commits during implementation
- Each major step = one commit
- Follow conventional commit format: `feat:`, `fix:`, `refactor:`, etc.

**Pull Request:**

- Create PR when all quality gates pass
- Link PR to this planning doc
- Include manual testing checklist in PR description

**Claude's Git Responsibilities:**

1. Create feature branch at start of task
2. Commit incrementally during implementation (atomic commits)
3. Push branch when all quality gates pass
4. Create PR with comprehensive description
5. Link PR URL back to this planning doc

**User's Git Responsibilities:**

1. Review PR and code changes
2. Run manual testing checklist
3. Approve and merge PR (or request changes)

---

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
````

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

**Risk Management:**

| Risk                          | Mitigation                                                |
| ----------------------------- | --------------------------------------------------------- |
| Parent PR gets major changes  | Review child PR after parent changes; may need updates    |
| Merge conflicts during rebase | Claude will handle or ask for guidance                    |
| Complex dependency chain      | Limit to 2 levels deep (parent → child, no grandchildren) |
| Lost work if parent rejected  | Planning docs preserve context; easy to recreate on main  |

**Communication Protocol:**

When blocked by unmerged PR, Claude will:

1. Check Planning Index for independent work
2. If independent work exists → start that
3. If no independent work → ask you:
   - "SS-3 is waiting for review. Should I:"
   - "A) Stack SS-4 on SS-3's branch (faster, more complex)"
   - "B) Wait for SS-3 approval (slower, cleaner)"
   - "C) Work on different priority task (your suggestion)"

**Best Practices:**

- ✅ Prefer independent work when possible
- ✅ Limit branch stacking to 2 levels maximum
- ✅ Document all dependencies clearly
- ✅ Keep PRs small and focused (easier to review quickly)
- ✅ Mark urgent/blocking PRs in Planning Index
- ⚠️ Avoid stacking for infrastructure changes (high risk)
- ⚠️ Rebase requires clear communication

---

## Retrospective

_(Fill out after completion)_

### What Went Well

-

### What Could Improve

-

### Key Learnings

-

### Technical Decisions Made

- Decision 1: Why it was made
- Decision 2: Alternatives considered

### Follow-up Tasks Created

- [ ] Link to follow-up task 1
- [ ] Link to follow-up task 2

### Related PR

- Pull Request: #X (link to PR)

````

#### Planning Index (`index.md`)

The Planning Index provides a Kanban-style overview:

**Sections:**

1. **Not Started** - Planned but not begun
2. **In Progress** - Currently being worked on
3. **Completed** - Finished and verified
4. **Blocked** - Cannot proceed (with reason)

**Each entry includes:**

- Task ID and linked title
- Priority indicator
- Estimated vs actual time
- Dependencies
- Brief status note

#### Using Templates

Templates are in `.claude/planning/_templates/`:

- `feature-template.md` - For new features
- `bugfix-template.md` - For bug fixes
- `refactor-template.md` - For refactoring tasks
- `infrastructure-template.md` - For tooling/setup

**To create a new task:**

1. Copy appropriate template to `.claude/planning/`
2. Rename to `ss-X-task-name.md` (next available task_id)
3. Fill in all frontmatter and sections
4. Add to Planning Index under "Not Started"
5. Link from previous/next tasks for navigation

#### Custom Slash Commands for Planning

Use these commands for planning workflows:

- `/scope-feature` - Comprehensive feature scoping with TDD planning
- `/plan-feature` - Create implementation plan from scoping doc
- `/implement-feature` - Implement based on planning doc (TDD approach)

Planning documents serve as both a roadmap and progress tracker. They provide peace of mind that work follows the plan and enable retrospective review of what was done.

## Claude Code Configuration

### Project Configuration Structure

This project has an active `.claude/` directory (hidden by default) containing:

- **`.claude/settings.json`**: Team-wide permissions and shared configuration (committed to git)
- **`.claude/settings.local.json`**: Personal project-specific overrides (automatically gitignored)
- **`.claude/commands/`**: Custom slash commands for common workflows

## Common Development Commands

### Project Setup

### Development Server

```bash
# Start development server with Turbopack
yarn dev
````

### Testing

```bash
# Run type checking
yarn type-check
```

### Code Quality

```bash
# Run ESLint
yarn lint

# Run ESLint with auto-fix
yarn lint:fix

# Run Prettier check
yarn format:check

# Run Prettier fix
yarn format

# Run type-check + lint-staged (pre-commit workflow)
yarn code:pre-commit

# Run full validation: lint + format check (pre-push workflow)
yarn code:fix

# Run lint-staged manually
yarn lint-staged
```

**Git Hooks (automatic):**

- **Pre-commit**: Runs `yarn type-check` then `yarn lint-staged` on staged files only
- **Pre-push**: Runs `yarn lint:fix` and `yarn format:check` on entire codebase

### Building & Deployment

## Architecture Overview

### Tech Stack

#### Frontend Stack (Next.js)

- **Framework**:
- **Language**:
- **Runtime**:
- **Package Manager**:
- **Styling**:
- **UI Components**:
- **State Management**:
- **Data Fetching**:
- **Forms**:
- **Testing**:
- **Development Tools**:

### Critical Coding Standards & Conventions

#### Next.js/React/TypeScript

- **ESLint**: TypeScript + Next.js rules enabled
- **Prettier**: Enabled with Tailwind CSS plugin for class sorting
- **Git Hooks**: Husky manages pre-commit (lint-staged) and pre-push (full lint check)
- **lint-staged**: Runs Prettier + ESLint on staged files only
- **Import Order**: Enforced by ESLint
- **TypeScript**: Strict mode enabled
- **Package Manager**: **ALWAYS use `yarn` commands, NEVER use `npm` or `npx`**
  - ✅ Preferred: `yarn add`, `yarn dev`, `yarn build`
  - ❌ Avoid: `npm install`, `npm run dev`, `npx`
- **Import Convention**: **ALWAYS use absolute imports with `@/` prefix, NEVER use relative imports**
  - ✅ Preferred: `import { Button } from '@/components/ui/Button';`
  - ❌ Avoid: `import { Button } from '../../components/ui/Button';`

#### Server Components vs Client Components

- **Default**:
- **Server Components**:
- **Client Components**:
- **Best Practices**:

### Naming Conventions

#### Components & Files

- **Components**:
- **Props & Variables**:
- **Types/Interfaces**:
- **Files**:
- **Directories**:

#### API Routes & Server Actions

- **API Routes**:
- **Server Actions**:
- **Route Handlers**:

#### Database & Models (if applicable)

- **Tables**:
- **Models**:
- **Fields**:
- **Relations**:

## Code Quality Practices

### Programming Principles

#### Variable Naming

**Claude MUST always use descriptive variable names:**

- **Choose variable names that clearly describe their purpose and content**
- **Avoid single-letter or cryptic variable names** (except in conventional cases like loop indices)
- **Prefer longer, self-explanatory names over brevity**

**Examples:**

```typescript
// ✅ Preferred: Descriptive names
const userEmail = form.get('email');
const isAuthenticated = user?.role === 'admin';
const filteredProducts = products.filter((product) => product.inStock);
const totalOrderAmount = items.reduce((sum, item) => sum + item.price, 0);

// ❌ Avoid: Cryptic or single-letter names
const e = form.get('email');
const auth = user?.role === 'admin';
const fp = products.filter((p) => p.inStock);
const tot = items.reduce((s, i) => s + i.price, 0);
```

**Acceptable exceptions:**

- Loop indices: `i`, `j`, `k` for simple iterations
- Common conventions: `e` for error in catch blocks, `_` for unused parameters
- Mathematical operations where single letters match domain conventions

#### Parse, Don't Validate (using Zod)

**Claude MUST follow the "Parse, don't validate" principle using Zod for all data validation:**

This project follows the "Parse, don't validate" philosophy, which means:

- **Transform untrusted inputs into trusted types** rather than just checking them
- **Use Zod schemas** to define and enforce data contracts at runtime
- **Derive TypeScript types from Zod schemas** using `z.infer<typeof schema>`
- **Fail fast** with detailed error messages when data doesn't match expectations

**Key Principles:**

1. **Define schemas first**: Create Zod schemas for all external data (API responses, form inputs, environment variables, etc.)
2. **Parse at boundaries**: Validate data as it enters your system (API routes, server actions, form submissions)
3. **Type safety**: Extract TypeScript types from schemas with `z.infer<>`
4. **No manual validation**: Replace manual type guards and validation logic with Zod schemas
5. **Composability**: Build complex schemas from simple ones using Zod's composition methods

**Examples:**

```typescript
// ✅ Preferred: Parse, don't validate
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().positive(),
  role: z.enum(['admin', 'user', 'guest']),
});

type User = z.infer<typeof UserSchema>;

function processUser(data: unknown): User {
  // Parse returns typed data or throws ZodError
  return UserSchema.parse(data);
}

// ❌ Avoid: Manual validation
function processUserManual(data: any): User | null {
  if (!data.id || typeof data.id !== 'string') return null;
  if (!data.email || typeof data.email !== 'string') return null;
  // ... more manual checks
  return data as User;
}
```

**Common Patterns:**

```typescript
// API Route validation
export async function POST(request: Request) {
  const body = await request.json();
  const validatedData = CreateUserSchema.parse(body);
  // validatedData is now typed and validated
}

// Server Action validation
export async function createUser(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedUser = UserSchema.parse(data);
  // Safe to use validatedUser
}

// Environment variables
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
```

**Benefits:**

- Runtime type safety complements TypeScript's compile-time checks
- Clear, self-documenting data contracts
- Detailed error messages for debugging
- No need to maintain separate validation logic and types
- Prevents invalid data from propagating through your application

### Error Handling

### Performance Optimization

### Security Best Practices

## Project Structure

### Directory Layout

### Key Files & Their Purpose

## Testing Strategy

### Unit Tests

### Integration Tests

### E2E Tests

### Test Coverage Goals

## Deployment

### Environment Variables

### Build Process

### Hosting Platform

### CI/CD Pipeline
