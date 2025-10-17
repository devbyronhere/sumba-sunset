# Linting & Formatting Setup Plan

## Overview

Setting up ESLint, Prettier, lint-staged, and Husky for automated code quality checks.

**Flow (EA-INCLUSION Wrapper Script Pattern):**

- Commit code → Husky pre-commit hook runs
- Hook calls `yarn _git:pre-commit` → `yarn code:pre-commit` → `yarn lint-staged`
- lint-staged runs Prettier + ESLint on staged files only
- If passing, commit succeeds
- On push → Husky pre-push hook runs
- Hook calls `yarn _git:pre-push` → `yarn code:fix` → full lint + format check

**Why Wrapper Scripts?**

- Easy to add type-checking and tests later without editing shell scripts
- Discoverable: `yarn code:pre-commit` can be run manually for testing
- Consistent with ea-inclusion project pattern
- Simpler to chain multiple commands in package.json

---

## Implementation Checklist

### 1. Install Dependencies

#### 1.1 Install main linting dependencies

- [x] Run: `yarn add -D eslint eslint-config-next prettier prettier-plugin-tailwindcss lint-staged husky`

#### 1.2 Install TypeScript dependencies

- [x] Run: `yarn add -D typescript @types/react @types/node @typescript-eslint/parser @typescript-eslint/eslint-plugin`

---

### 2. Create .eslintrc.cjs

- [x] Create `.eslintrc.cjs` in project root
- [x] Configure with TypeScript and Next.js rules
- [x] Include import order rules
- [x] Set appropriate parser options

**Expected content:**

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
  rules: {
    // Add custom rules here
  },
};
```

---

### 3. Create prettier.config.js

- [x] Create `prettier.config.js` in project root
- [x] Add Tailwind CSS plugin configuration
- [x] Set formatting preferences (quotes, semicolons, etc.)

**Expected content:**

```javascript
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
```

---

### 4. Create .lintstagedrc.cjs

- [x] Create `.lintstagedrc.cjs` in project root
- [x] Configure to run Prettier on ALL files first, then ESLint on JS/TS files
- [x] Match ea-inclusion pattern for consistency

**Expected content:**

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

**Why this pattern?**

- Prettier runs on ALL file types first (safer, catches everything)
- ESLint runs only on JS/TS files (faster)
- Uses Next.js lint wrapper for consistency
- Matches ea-inclusion setup

---

### 5. Setup Husky

#### 5.1 Initialize Husky

- [x] Run: `yarn husky init`
- [x] Verify `.husky/` directory is created

#### 5.2 Create pre-commit hook

- [x] Create `.husky/pre-commit` file
- [x] Use wrapper script pattern (calls package.json script)

**Expected content:**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn _git:pre-commit
```

- [x] Make pre-commit hook executable: `chmod +x .husky/pre-commit`

**Why wrapper script?**

- Hook calls `_git:pre-commit` which calls `code:pre-commit`
- Easy to add type-check and tests later by editing package.json
- No need to modify this hook file again

#### 5.3 Create pre-push hook

- [x] Create `.husky/pre-push` file
- [x] Use wrapper script pattern for consistency

**Expected content:**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn _git:pre-push
```

- [x] Make pre-push hook executable: `chmod +x .husky/pre-push`

**Why wrapper script?**

- Hook calls `_git:pre-push` which calls `code:fix`
- Consistent pattern with pre-commit
- Easy to modify validation steps in package.json

---

### 6. Add Scripts to package.json

- [x] Open `package.json`
- [x] Add wrapper scripts and utility commands following ea-inclusion pattern

**Expected scripts to add:**

```json
{
  "scripts": {
    "_git:pre-commit": "yarn code:pre-commit",
    "_git:pre-push": "yarn code:fix",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "code:pre-commit": "yarn lint-staged --allow-empty",
    "code:fix": "yarn lint:fix && yarn format:check",
    "lint-staged": "lint-staged",
    "prepare": "husky install"
  }
}
```

**Script Breakdown:**

- `_git:pre-commit` - Called by Husky pre-commit hook
- `_git:pre-push` - Called by Husky pre-push hook
- `code:pre-commit` - Runs lint-staged on staged files
- `code:fix` - Runs full lint fix + format check
- `lint:fix` - ESLint with auto-fix
- `format` - Format all files with Prettier
- `format:check` - Check formatting without modifying
- `prepare` - Auto-installs Husky hooks on yarn install

**Note:** `"lint"` script should already exist from Next.js setup (keep it)

---

### 7. VS Code Integration

- [x] Create `.vscode/` directory if it doesn't exist
- [x] Create `.vscode/settings.json`
- [x] Configure auto-format on save
- [x] Set Prettier as default formatter

**Expected content:**

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

---

### 8. Test the Setup

#### 8.1 Test Prettier

- [x] Create a test file with bad formatting: `test-format.tsx`
- [x] Add intentionally messy code (inconsistent spacing, quotes, etc.)
- [x] Run: `yarn format`
- [x] Verify file is auto-formatted
- [x] Delete test file

#### 8.2 Test ESLint

- [x] Create a test file with linting issues: `test-lint.tsx`
- [x] Add code with linting violations (unused vars, any types, etc.)
- [x] Run: `yarn lint`
- [x] Verify errors are reported
- [x] Fix errors and verify lint passes
- [x] Delete test file

#### 8.3 Test Husky Pre-commit Hook

- [x] Create a file with formatting issues
- [x] Stage the file: `git add .`
- [x] Attempt to commit: `git commit -m "test: husky pre-commit"`
- [x] Verify lint-staged runs and fixes formatting
- [x] Verify commit succeeds with formatted code

**Manual test completed:** ✅ Pre-commit hook successfully formatted test-hook.tsx and committed.

#### 8.4 Test Husky Pre-push Hook

- [x] Make a commit with properly formatted code
- [x] Attempt to push: `git push`
- [x] Verify pre-push hook runs `yarn lint` and `yarn format:check`
- [x] Verify push succeeds if checks pass

**Manual test completed:** ✅ Pre-push hook successfully ran validation checks before push.

---

## Verification Checklist

After completing all steps, verify:

- [x] All dependencies are installed in `package.json`
- [x] Configuration files exist: `.eslintrc.cjs`, `prettier.config.js`, `.lintstagedrc.cjs`
- [x] Husky hooks exist: `.husky/pre-commit`, `.husky/pre-push`
- [x] Scripts are added to `package.json`
- [x] VS Code settings are configured
- [x] Prettier formats code correctly
- [x] ESLint catches linting errors
- [x] Pre-commit hook runs on commit (manual test)
- [x] Pre-push hook runs on push (manual test)

---

## Troubleshooting

If issues occur:

1. **Husky hooks not running:**
   - Verify hooks are executable: `ls -la .husky/`
   - Re-run: `chmod +x .husky/pre-commit .husky/pre-push`

2. **Prettier/ESLint conflicts:**
   - Ensure `prettier` is last in ESLint extends array
   - Check for conflicting rules

3. **VS Code not formatting:**
   - Install Prettier extension: `esbenp.prettier-vscode`
   - Install ESLint extension: `dbaeumer.vscode-eslint`
   - Reload VS Code window

---

## Notes

- Use `yarn` for all commands (not npm/npx)
- Husky hooks will only run on actual git operations
- lint-staged only checks staged files (faster)
- Pre-push runs full checks (slower but comprehensive)
- Wrapper scripts (`_git:*`, `code:*`) make it easy to add type-checking and tests later
- Manual testing: Run `yarn code:pre-commit` to test pre-commit workflow without committing

## Future Enhancements (Planned)

When ready to add type-checking and tests to pre-commit, simply update package.json:

```json
{
  "code:pre-commit": "yarn type-check && yarn test:changed && yarn lint-staged --allow-empty"
}
```

No need to edit Husky hook files!
