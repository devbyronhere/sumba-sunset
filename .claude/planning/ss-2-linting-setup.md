---
task_id: ss-2
title: '[Infrastructure] Linting & Formatting Setup'
status: completed
priority: high
estimated_time: '2-3 hours'
actual_time: '2.5 hours'
dependencies: [ss-1]
created: 2025-01-17
started: 2025-01-17
completed: 2025-01-17
related_docs: []
infra_type: tooling
---

[← Previous: SS-1 Next.js Setup](./ss-1-nextjs-setup.md) | [📋 Index](./index.md) | [Next: SS-3 Credentials Setup →](./ss-3-credentials-setup.md)

# [Infrastructure] Linting & Formatting Setup

## Overview

Set up ESLint, Prettier, lint-staged, and Husky for automated code quality checks with git hooks.

**Infrastructure Type:** Tooling
**Impact:** All developers
**Risk Level:** Low

**Business Value:**

- Consistent code style across team
- Catch errors before they reach production
- Automate code quality checks
- Reduce code review friction
- Improve maintainability

---

## Problem Statement

### Current Situation

Next.js project exists but lacks automated code quality enforcement. No formatting standards, no automated linting, no git hooks.

### Pain Points

- Inconsistent code formatting
- Manual linting (easy to forget)
- No automated checks before commit/push
- Potential for committing code with errors

### Desired Outcome

Automated code quality system that:

- Formats code on save (in IDE)
- Checks staged files before commit
- Runs full validation before push
- Makes adding tests/type-checking easy later

---

## Solution Design

### Proposed Infrastructure

Implement wrapper script pattern for git hooks:

**Flow:**

```
Commit → Husky pre-commit hook
       → yarn _git:pre-commit
       → yarn code:pre-commit
       → yarn lint-staged
       → Prettier + ESLint on staged files
       → ✅ Commit succeeds

Push → Husky pre-push hook
     → yarn _git:pre-push
     → yarn code:fix
     → yarn lint:fix && yarn format:check (full codebase)
     → ✅ Push succeeds
```

**Why Wrapper Scripts?**

- Easy to add type-checking and tests later without editing shell scripts
- Discoverable: `yarn code:pre-commit` can be run manually for testing
- Consistent with ea-inclusion project pattern
- Simpler to chain multiple commands in package.json

### Architecture/Flow Diagram

```
Developer writes code
       ↓
Git commit attempt
       ↓
Husky pre-commit (.husky/pre-commit)
       ↓
yarn _git:pre-commit (wrapper)
       ↓
yarn code:pre-commit
       ↓
yarn lint-staged
       ↓
lint-staged runs on staged files only:
  1. Prettier --write (all files)
  2. ESLint --fix (JS/TS files)
       ↓
✅ Commit succeeds (or ❌ fails with fixable issues)
       ↓
Git push attempt
       ↓
Husky pre-push (.husky/pre-push)
       ↓
yarn _git:pre-push (wrapper)
       ↓
yarn code:fix
       ↓
yarn lint:fix && yarn format:check (full codebase)
       ↓
✅ Push succeeds (or ❌ fails if issues found)
```

### Tools & Technologies

- **ESLint**: JavaScript/TypeScript linting with Next.js rules
- **Prettier**: Code formatting with Tailwind CSS class sorting
- **lint-staged**: Run linters on staged files only (faster)
- **Husky**: Git hooks management
- **TypeScript ESLint**: TypeScript-specific linting rules

### Configuration Files

- `.eslintrc.cjs` - ESLint configuration
- `prettier.config.js` - Prettier configuration
- `.lintstagedrc.cjs` - lint-staged configuration
- `.husky/pre-commit` - Pre-commit git hook
- `.husky/pre-push` - Pre-push git hook
- `.vscode/settings.json` - VS Code integration

### Alternatives Considered

**Alternative 1: Direct commands in Husky hooks**

- Pros: Simpler, fewer layers
- Cons: Harder to extend, less discoverable, difficult to test manually
- Why rejected: Wrapper script pattern more maintainable

**Alternative 2: Only pre-commit hook (no pre-push)**

- Pros: Faster workflow
- Cons: Full codebase checks never run automatically
- Why rejected: Pre-push catches issues before pushing to remote

---

## Prerequisites/Dependencies

- [x] SS-1: Next.js project setup completed
- [x] Node.js and Yarn installed
- [x] Git initialized
- [x] Base Next.js ESLint config present

---

## Acceptance Criteria

- [x] **AC1**: ESLint configured with TypeScript and Next.js rules
- [x] **AC2**: Prettier configured with Tailwind CSS plugin
- [x] **AC3**: lint-staged runs Prettier and ESLint on staged files
- [x] **AC4**: Husky pre-commit hook triggers lint-staged
- [x] **AC5**: Husky pre-push hook runs full lint + format check
- [x] **AC6**: VS Code auto-formats on save
- [x] **AC7**: Wrapper script pattern implemented
- [x] **AC8**: All quality checks passing

---

## Test Strategy

### How to Verify Infrastructure Works

1. **Linting Test**: Create file with linting errors, run `yarn lint`
2. **Formatting Test**: Create poorly formatted file, run `yarn format`
3. **Pre-commit Test**: Stage file with issues, attempt commit
4. **Pre-push Test**: Commit clean code, attempt push
5. **VS Code Test**: Edit file, save, verify auto-format

### Verification Steps

- [x] Run `yarn lint` on clean codebase
- [x] Run `yarn format` on clean codebase
- [x] Create test file with bad formatting
- [x] Stage and commit - verify pre-commit fixes issues
- [x] Push - verify pre-push runs validation
- [x] Delete test files

### Success Metrics

- Pre-commit hook runs in < 10 seconds (staged files only)
- Pre-push hook runs in < 30 seconds (full codebase)
- All linting rules pass
- Formatting is consistent
- Hooks block commits/pushes when issues found

---

## Implementation Steps

### Phase 1: Install Dependencies

- [x] **Step 1.1**: Install main linting dependencies
  ```bash
  yarn add -D eslint eslint-config-next prettier prettier-plugin-tailwindcss lint-staged husky
  ```
- [x] **Step 1.2**: Install TypeScript dependencies
  ```bash
  yarn add -D typescript @types/react @types/node @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```

**Dependencies Checkpoint:** ✅ All packages installed

---

### Phase 2: Create Configuration Files

- [x] **Step 2.1**: Create `.eslintrc.cjs` with TypeScript + Next.js rules

  ```javascript
  module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
  };
  ```

- [x] **Step 2.2**: Create `prettier.config.js` with Tailwind plugin

  ```javascript
  module.exports = {
    plugins: ['prettier-plugin-tailwindcss'],
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };
  ```

- [x] **Step 2.3**: Create `.lintstagedrc.cjs` with staged file configuration

  ```javascript
  const path = require('path');

  const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`;

  module.exports = {
    '*': 'prettier --write --ignore-unknown',
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  };
  ```

**Configuration Checkpoint:** ✅ All config files created

---

### Phase 3: Setup Husky & Git Hooks

- [x] **Step 3.1**: Initialize Husky

  ```bash
  yarn husky init
  ```

- [x] **Step 3.2**: Create `.husky/pre-commit` hook

  ```bash
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  yarn _git:pre-commit
  ```

- [x] **Step 3.3**: Make pre-commit executable

  ```bash
  chmod +x .husky/pre-commit
  ```

- [x] **Step 3.4**: Create `.husky/pre-push` hook

  ```bash
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  yarn _git:pre-push
  ```

- [x] **Step 3.5**: Make pre-push executable
  ```bash
  chmod +x .husky/pre-push
  ```

**Husky Checkpoint:** ✅ Git hooks configured and executable

---

### Phase 4: Add Scripts to package.json

- [x] **Step 4.1**: Add wrapper scripts and utility commands
  ```json
  {
    "scripts": {
      "_git:pre-commit": "yarn code:pre-commit",
      "_git:pre-push": "yarn code:fix",
      "lint:fix": "next lint --fix",
      "format": "prettier --write .",
      "format:check": "prettier --check .",
      "code:pre-commit": "yarn type-check && yarn lint-staged --allow-empty",
      "code:fix": "yarn lint:fix && yarn format:check",
      "lint-staged": "lint-staged",
      "type-check": "tsc --noEmit",
      "prepare": "husky install"
    }
  }
  ```

**Scripts Checkpoint:** ✅ All scripts added to package.json

---

### Phase 5: VS Code Integration

- [x] **Step 5.1**: Create `.vscode/` directory
- [x] **Step 5.2**: Create `.vscode/settings.json`
  ```json
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
  ```

**VS Code Checkpoint:** ✅ IDE integration configured

---

### Phase 6: Testing & Verification

- [x] **Step 6.1**: Test Prettier
  - Created `test-format.tsx` with bad formatting
  - Ran `yarn format`
  - Verified auto-formatting
  - Deleted test file

- [x] **Step 6.2**: Test ESLint
  - Created `test-lint.tsx` with linting violations
  - Ran `yarn lint`
  - Verified errors reported
  - Fixed and verified passing
  - Deleted test file

- [x] **Step 6.3**: Test Husky pre-commit hook
  - Created file with formatting issues
  - Staged file: `git add .`
  - Attempted commit
  - Verified lint-staged ran and fixed formatting
  - Verified commit succeeded

- [x] **Step 6.4**: Test Husky pre-push hook
  - Made commit with properly formatted code
  - Attempted push
  - Verified pre-push hook ran validation
  - Verified push succeeded

**Testing Checkpoint:** ✅ All manual tests passed

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [x] All dependencies installed in package.json
- [x] Configuration files created (.eslintrc.cjs, prettier.config.js, .lintstagedrc.cjs)
- [x] Husky hooks exist and are executable (.husky/pre-commit, .husky/pre-push)
- [x] Scripts added to package.json (wrapper pattern)
- [x] VS Code settings configured
- [x] `yarn lint` passes
- [x] `yarn format:check` passes
- [x] `yarn type-check` passes
- [x] Pre-commit hook tested and working
- [x] Pre-push hook tested and working
- [x] No console errors/warnings
- [x] Documentation updated
- [x] Planning doc fully checked off
- [x] Git commits created

---

## Post-Implementation Verification

### Manual Verification Steps

1. **Linting Verification**
   - [x] Run `yarn lint` - all files pass
   - [x] Check ESLint errors can be caught
   - [x] Verify auto-fix works

2. **Formatting Verification**
   - [x] Run `yarn format:check` - all files pass
   - [x] Create badly formatted file
   - [x] Run `yarn format` - file formatted

3. **Git Hooks Verification**
   - [x] Test pre-commit with bad formatting
   - [x] Verify pre-commit fixes issues
   - [x] Test pre-push with clean code
   - [x] Verify pre-push validates codebase

4. **IDE Verification**
   - [x] Edit file in VS Code
   - [x] Save file
   - [x] Verify auto-format occurs

---

## Rollback Plan

If linting/formatting setup causes issues:

1. **Remove Husky hooks**:

   ```bash
   rm -rf .husky
   ```

2. **Revert package.json scripts**:

   ```bash
   git checkout package.json
   ```

3. **Uninstall packages**:

   ```bash
   yarn remove eslint prettier lint-staged husky
   ```

4. **Remove config files**:
   ```bash
   rm .eslintrc.cjs prettier.config.js .lintstagedrc.cjs
   ```

**Rollback Risk:** Low
**Rollback Time:** 5 minutes

---

## Documentation Updates

Files created/updated:

- [x] `.claude/CLAUDE.md` - Added code quality commands and git hooks section
- [x] This planning doc

---

## Monitoring & Maintenance

### How to Monitor

Check logs when hooks run:

- Pre-commit output shows lint-staged results
- Pre-push output shows full lint + format check results

### Maintenance Tasks

**Weekly:**

- Review any ESLint warnings that aren't auto-fixable
- Check for outdated linting packages

**Monthly:**

- Update ESLint and Prettier to latest versions
- Review new rules from updates

### Common Issues & Solutions

**Issue 1: Husky hooks not running**

- Symptoms: Commits succeed without running checks
- Solution:
  ```bash
  chmod +x .husky/pre-commit .husky/pre-push
  yarn husky install
  ```

**Issue 2: Prettier/ESLint conflicts**

- Symptoms: Formatting keeps changing back and forth
- Solution: Ensure 'prettier' is last in ESLint extends array

**Issue 3: VS Code not formatting**

- Symptoms: Files don't format on save
- Solution:
  - Install Prettier extension: `esbenp.prettier-vscode`
  - Install ESLint extension: `dbaeumer.vscode-eslint`
  - Reload VS Code window

---

## Related Tasks

**Depends On:**

- [SS-1: Next.js Project Setup](./ss-1-nextjs-setup.md) - Base project needed first

**Enables:**

- Future testing setup (Jest/Vitest)
- Type-checking in pre-commit
- Future features with code quality guarantee

---

## Retrospective

### What Went Well

- Wrapper script pattern makes future extensions easy
- lint-staged significantly faster than linting entire codebase
- Pre-commit + pre-push balance speed and thoroughness perfectly
- Prettier + Tailwind plugin sorts classes automatically
- Husky setup was straightforward

### What Could Improve

- Could have documented common ESLint rules to disable/enable
- Could have added more VSCode extensions recommendations

### Unexpected Challenges

- Had to ensure correct execution permissions on hook files
- Needed to test wrapper script pattern thoroughly

### Key Learnings

- Wrapper script pattern (`_git:*` → `code:*`) is highly maintainable
- lint-staged on pre-commit + full check on pre-push is ideal balance
- Prettier should run on ALL files, ESLint only on JS/TS (faster)
- Next.js lint wrapper provides better Next.js-specific error messages
- TypeScript type-checking can be added to pre-commit later without changing hooks

### Future Improvements Identified

When ready to add type-checking and tests to pre-commit:

```json
{
  "code:pre-commit": "yarn type-check && yarn test:changed && yarn lint-staged --allow-empty"
}
```

No need to edit Husky hook files - just update package.json!

### Follow-up Tasks Created

- [ ] Add Jest or Vitest for testing
- [ ] Add test running to pre-commit (test:changed)
- [ ] Consider adding commit message linting (commitlint)
- [ ] Add more strict ESLint rules as team agrees

---

## Configuration Reference

### Environment Variables

None required.

### Key Configuration Files

**File: `.eslintrc.cjs`**

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier', // Must be last!
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    // Add custom rules here
  },
};
```

**File: `prettier.config.js`**

```javascript
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
```

**File: `.lintstagedrc.cjs`**

```javascript
const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
```

### Scripts Reference

```json
{
  "scripts": {
    // Git hook wrappers (called by Husky)
    "_git:pre-commit": "yarn code:pre-commit",
    "_git:pre-push": "yarn code:fix",

    // Code quality commands
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",

    // Workflow commands
    "code:pre-commit": "yarn type-check && yarn lint-staged --allow-empty",
    "code:fix": "yarn lint:fix && yarn format:check",
    "lint-staged": "lint-staged",

    // Husky setup
    "prepare": "husky install"
  }
}
```

**Command Breakdown:**

- `yarn lint` - Check for linting errors
- `yarn lint:fix` - Fix auto-fixable linting errors
- `yarn format` - Format all files
- `yarn format:check` - Check if files are formatted (CI)
- `yarn type-check` - Run TypeScript compiler in check mode
- `yarn code:pre-commit` - Pre-commit workflow (manual testing)
- `yarn code:fix` - Pre-push workflow (manual testing)
- `yarn lint-staged` - Run lint-staged manually

---

## Notes

- Use `yarn` for all commands (not npm/npx)
- Husky hooks only run on actual git operations
- lint-staged only checks staged files (faster)
- Pre-push runs full checks (slower but comprehensive)
- Wrapper scripts make it easy to add type-checking and tests later
- Manual testing: Run `yarn code:pre-commit` to test pre-commit workflow without committing

---

**Completion Date:** 2025-01-17
**Actual Time Spent:** 2.5 hours
**Final Status:** ✅ Completed
