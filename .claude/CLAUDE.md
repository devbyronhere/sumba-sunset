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

### Working with Planning Documents

When implementing from a planning document in `.claude/planning/`:

1. **Read the planning document first** to understand all steps before beginning
2. **Check off each item** in the markdown file using `[x]` as you complete it
3. **Update the checklist in real-time** - don't batch updates at the end
4. **Use Edit tool** to change `- [ ]` to `- [x]` immediately after completing each step
5. **Keep planning docs as source of truth** for tracking implementation progress
6. **Mark items as done only when fully complete** - if blocked or partially done, leave unchecked and add notes

Planning documents serve as both a roadmap and progress tracker. Keeping them updated ensures visibility into what's been completed and what remains.

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
```

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
