---
task_id: ss-1
title: '[Infrastructure] Next.js Project Setup'
status: completed
priority: high
estimated_time: '1-2 hours'
actual_time: '1.5 hours'
dependencies: []
created: 2025-01-17
started: 2025-01-17
completed: 2025-01-17
related_docs: []
infra_type: tooling
---

[📋 Index](./index.md) | [Next: SS-2 Linting Setup →](./ss-2-linting-setup.md)

# [Infrastructure] Next.js Project Setup

## Overview

Initialize a new Next.js 15 project with TypeScript, Tailwind CSS, and App Router to serve as the foundation for the Sumba Sunset platform.

**Infrastructure Type:** Tooling
**Impact:** All developers
**Risk Level:** Low

**Business Value:**

- Modern React framework with SSR/SSG capabilities
- TypeScript for type safety and better developer experience
- Tailwind CSS for rapid UI development
- App Router for improved performance and developer experience

---

## Problem Statement

### Current Situation

No project structure exists. Need to bootstrap a modern web application with best practices from the start.

### Pain Points

- No development environment
- No build system
- No routing structure
- No styling system

### Desired Outcome

A fully functional Next.js 15 application with TypeScript and Tailwind CSS, ready for feature development.

---

## Solution Design

### Proposed Infrastructure

Use Next.js 15's official create-next-app tool to bootstrap the project with:

- Next.js 15 (latest version)
- App Router (not Pages Router)
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality

### Architecture/Flow Diagram

```
Project Structure:
sumba-sunset/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Home page (Coming Soon)
│       └── globals.css     # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.mjs
```

### Tools & Technologies

- **Next.js 15**: React framework with App Router, Server Components
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Turbopack**: Next.js dev server bundler (default in Next.js 15)

### Configuration Files

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind

### Alternatives Considered

**Alternative 1: Vite + React**

- Pros: Faster build times, simpler setup
- Cons: No built-in SSR, no built-in routing, more setup required
- Why rejected: Next.js provides more out-of-the-box features

**Alternative 2: Remix**

- Pros: Great data loading patterns, nested routing
- Cons: Smaller ecosystem, less mature than Next.js
- Why rejected: Next.js has larger community and more resources

---

## Prerequisites/Dependencies

- [x] Node.js installed (v18+)
- [x] Yarn package manager installed
- [x] Git initialized
- [x] GitHub repository created

---

## Acceptance Criteria

- [x] **AC1**: Next.js 15 project created with App Router
- [x] **AC2**: TypeScript configured and working
- [x] **AC3**: Tailwind CSS configured and working
- [x] **AC4**: Development server runs successfully
- [x] **AC5**: "Coming Soon" homepage created and displayed
- [x] **AC6**: Project structure follows Next.js best practices

---

## Test Strategy

### How to Verify Infrastructure Works

Since this is infrastructure setup, testing involves manual verification:

1. **Project Creation**: Verify create-next-app succeeds
2. **Dev Server**: Verify `yarn dev` starts without errors
3. **Type Checking**: Verify TypeScript compilation works
4. **Styling**: Verify Tailwind CSS classes work
5. **Hot Reload**: Verify changes reflect immediately

### Verification Steps

- [x] Run `yarn dev` successfully
- [x] Visit http://localhost:3000
- [x] See "Coming Soon" page
- [x] Make a change and verify hot reload works
- [x] Run `yarn build` successfully
- [x] Run type-check (when configured)

### Success Metrics

- Project setup time: < 10 minutes
- Dev server starts in < 5 seconds
- Hot reload works in < 2 seconds
- No TypeScript errors
- No console errors

---

## Implementation Steps

### Phase 1: Project Initialization

- [x] **Step 1.1**: Run `npx create-next-app@latest sumba-sunset` with options:
  - TypeScript: Yes
  - ESLint: Yes
  - Tailwind CSS: Yes
  - `src/` directory: Yes
  - App Router: Yes
  - Customize import alias: Yes (`@/*`)
- [x] **Step 1.2**: Navigate to project directory
- [x] **Step 1.3**: Verify all files created correctly
- [x] **Step 1.4**: Review generated configuration files

**Initialization Checkpoint:** ✅ Project created with all files

---

### Phase 2: Configuration Verification

- [x] **Step 2.1**: Review `package.json` dependencies
- [x] **Step 2.2**: Review `tsconfig.json` settings
- [x] **Step 2.3**: Review `next.config.ts`
- [x] **Step 2.4**: Review `tailwind.config.ts`
- [x] **Step 2.5**: Ensure `@/` import alias configured

**Configuration Checkpoint:** ✅ All configurations verified

---

### Phase 3: Initial Development

- [x] **Step 3.1**: Start dev server: `yarn dev`
- [x] **Step 3.2**: Verify default page loads at http://localhost:3000
- [x] **Step 3.3**: Create "Coming Soon" homepage in `src/app/page.tsx`
- [x] **Step 3.4**: Style homepage with Tailwind CSS
- [x] **Step 3.5**: Test hot reload functionality

**Development Checkpoint:** ✅ Dev server working, Coming Soon page created

---

### Phase 4: Build Verification

- [x] **Step 4.1**: Stop dev server
- [x] **Step 4.2**: Run production build: `yarn build`
- [x] **Step 4.3**: Verify build succeeds with no errors
- [x] **Step 4.4**: Optionally start production server: `yarn start`
- [x] **Step 4.5**: Verify production build works correctly

**Build Checkpoint:** ✅ Production build successful

---

### Phase 5: Documentation

- [x] **Step 5.1**: Update README.md with project info
- [x] **Step 5.2**: Create .claude/CLAUDE.md with development guidelines
- [x] **Step 5.3**: Document available scripts (dev, build, start, lint)
- [x] **Step 5.4**: Add project structure documentation

**Documentation Checkpoint:** ✅ Basic documentation complete

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [x] Dev server runs successfully (`yarn dev`)
- [x] Production build succeeds (`yarn build`)
- [x] TypeScript compiles without errors
- [x] Tailwind CSS classes work correctly
- [x] No console errors in browser
- [x] Hot reload works correctly
- [x] Coming Soon page displays properly
- [x] Configuration files are correct
- [x] Documentation created
- [x] Planning doc fully checked off
- [x] Git commit created

---

## Post-Implementation Verification

### Manual Verification Steps

1. **Fresh Start Test**
   - [x] Clone repo in new location (simulated)
   - [x] Run `yarn install`
   - [x] Run `yarn dev`
   - [x] Verify http://localhost:3000 works

2. **Development Workflow Test**
   - [x] Make change to page.tsx
   - [x] Verify hot reload updates page
   - [x] Check browser console for errors
   - [x] Verify TypeScript works in IDE

3. **Build Test**
   - [x] Run `yarn build`
   - [x] Verify build output
   - [x] Check for warnings or errors
   - [x] Optionally test `yarn start`

4. **Configuration Test**
   - [x] Verify `@/` imports work
   - [x] Verify Tailwind classes apply
   - [x] Check TypeScript strict mode enabled
   - [x] Verify ESLint configuration present

---

## Rollback Plan

If this setup has issues:

1. **Delete project directory**
2. **Recreate with different options**
3. **Restore from git** (if committed)

**Rollback Steps:**

```bash
rm -rf sumba-sunset
# Start fresh with create-next-app
```

**Rollback Risk:** Very Low (fresh project, no dependencies)
**Rollback Time:** 5 minutes

---

## Documentation Updates

Files created/updated:

- [x] `README.md` - Project overview and setup instructions
- [x] `.claude/CLAUDE.md` - Development guidelines for Claude
- [x] This planning doc

---

## Monitoring & Maintenance

### How to Monitor

Development server runs at: http://localhost:3000

Key metrics:

- Dev server startup time: < 5 seconds
- Hot reload time: < 2 seconds
- Build time: < 30 seconds (for initial empty project)

### Maintenance Tasks

**Weekly:**

- Check for Next.js updates: `yarn outdated`
- Review Next.js changelog for breaking changes

**Monthly:**

- Update dependencies if no breaking changes
- Review Next.js blog for new features

### Common Issues & Solutions

**Issue 1: Dev server won't start**

- Symptoms: Port 3000 already in use
- Solution: Kill process on port 3000 or use different port

**Issue 2: TypeScript errors in IDE**

- Symptoms: Red squiggles but code runs
- Solution: Restart TypeScript server in IDE

---

## Related Tasks

**Enables:**

- [SS-2: Linting & Formatting Setup](./ss-2-linting-setup.md) - Code quality tools

**Future Tasks Enabled:**

- Authentication setup
- Database integration
- API routes
- UI components

---

## Retrospective

### What Went Well

- Next.js 15 setup was straightforward with create-next-app
- Turbopack is noticeably faster than webpack
- TypeScript strict mode caught potential issues early
- Tailwind CSS integration worked perfectly out of the box
- App Router structure is cleaner than Pages Router

### What Could Improve

- Could have documented more about why App Router was chosen
- Could have added more initial configuration options upfront

### Unexpected Challenges

- None - setup was smooth

### Key Learnings

- Next.js 15 uses Turbopack by default for dev server (much faster)
- create-next-app now creates `.ts` config files (not `.js`)
- App Router is now the default (Pages Router requires explicit opt-in)
- `src/` directory is now common pattern with Next.js

### Future Improvements Identified

- Add error boundary components
- Set up path aliases beyond `@/`
- Configure custom 404 page
- Add metadata configuration

### Follow-up Tasks Created

- [x] [SS-2: Linting & Formatting Setup](./ss-2-linting-setup.md) - ESLint, Prettier, Husky

---

## Configuration Reference

### Environment Variables

None required for initial setup.

Future environment variables will be documented in `.env.example`.

### Configuration Files

**File: `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**File: `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom theme extensions here
    },
  },
  plugins: [],
};
export default config;
```

### Scripts

**Package.json scripts:**

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## Notes

- Next.js 15 was released recently (October 2024)
- Turbopack is now stable and default for dev mode
- React 19 RC included (React 19 stable likely soon)
- Server Components are default in App Router
- This setup prioritizes modern best practices over backwards compatibility

---

**Completion Date:** 2025-01-17
**Actual Time Spent:** 1.5 hours
**Final Status:** ✅ Completed
