---
task_id: ss-6
title: '[Infrastructure] Vitest Testing Framework Setup'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-1, ss-2]
created: 2025-01-20
started: null
completed: null
related_docs: ['.claude/CLAUDE.md', '.claude/docs/architecture.md']
branch: ss-6/infra/vitest-setup
pr_number: null
---

[← Previous: SS-5 shadcn/ui Setup](./ss-5-shadcn-ui-setup.md) | [📋 Index](./index.md) | [Next: SS-7 Vercel Blob →](./ss-7-vercel-blob-integration.md)

# [Infrastructure] Vitest Testing Framework Setup

## Overview

Install and configure Vitest as the testing framework for the Sumba Sunset project. This enables Test-Driven Development (TDD) as required by the project guidelines, providing fast, modern testing for React components, utilities, and API routes.

**Project Context:**

- TDD is **mandatory** for all feature development
- Need fast test execution for rapid development cycles
- Must support React component testing
- Must integrate with existing TypeScript/Next.js setup

**Business Value:**

- Enables TDD workflow (write tests first)
- Ensures code reliability and prevents regressions
- Faster than Jest (uses Vite instead of Webpack)
- Better developer experience with hot module replacement
- Native TypeScript support without configuration

---

## Prerequisites/Dependencies

- [x] SS-1: Next.js Project Setup completed
- [x] SS-2: Linting & Formatting Setup completed
- [x] TypeScript configured (part of SS-1)
- [x] React 19 installed (part of SS-1)

---

## Acceptance Criteria

Clear, testable criteria that define "done":

- [ ] **AC1**: Vitest installed and configured
- [ ] **AC2**: Testing scripts added to package.json
- [ ] **AC3**: React Testing Library configured
- [ ] **AC4**: Test utilities and helpers created
- [ ] **AC5**: Coverage reporting configured (80% target)
- [ ] **AC6**: Example tests created and passing
- [ ] **AC7**: CI/CD ready (tests can run in GitHub Actions)
- [ ] **AC8**: TDD workflow documented

---

## Verification Steps

_Note: This is an infrastructure task - we verify the testing setup works_

### Setup Verification

1. **Installation Verification**
   - Vitest config file exists
   - Dependencies in package.json
   - Test scripts runnable

2. **Test Execution Verification**
   - Example unit test passes
   - Example component test passes
   - Coverage report generates
   - Watch mode works

3. **Integration Verification**
   - TypeScript types work in tests
   - Path aliases (@/) work
   - React components testable
   - Async tests work properly

---

## Implementation Steps

### Phase 1: Install Vitest and Dependencies

- [ ] **Step 1.1**: Install core testing packages

  ```bash
  yarn add -D vitest @vitejs/plugin-react @vitest/ui
  ```

- [ ] **Step 1.2**: Install React Testing Library

  ```bash
  yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```

- [ ] **Step 1.3**: Install testing utilities

  ```bash
  yarn add -D jsdom @types/testing-library__jest-dom
  ```

- [ ] **Step 1.4**: Install coverage reporter
  ```bash
  yarn add -D @vitest/coverage-v8
  ```

**Checkpoint:** All testing dependencies installed

---

### Phase 2: Configure Vitest

- [ ] **Step 2.1**: Create Vitest config file

  ```typescript
  // vitest.config.ts
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '*.config.*',
          'src/types/',
          'src/**/*.d.ts',
        ],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  });
  ```

- [ ] **Step 2.2**: Create test setup file

  ```typescript
  // src/test/setup.ts
  import '@testing-library/jest-dom';
  import { cleanup } from '@testing-library/react';
  import { afterEach } from 'vitest';

  // Cleanup after each test
  afterEach(() => {
    cleanup();
  });
  ```

- [ ] **Step 2.3**: Update TypeScript config for tests
  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      // ... existing config
      "types": ["vitest/globals", "@testing-library/jest-dom"]
    },
    "include": ["src", "vitest.config.ts"]
  }
  ```

**Checkpoint:** Vitest configured with TypeScript support

---

### Phase 3: Add Testing Scripts

- [ ] **Step 3.1**: Update package.json scripts

  ```json
  {
    "scripts": {
      // ... existing scripts
      "test": "vitest",
      "test:watch": "vitest --watch",
      "test:ui": "vitest --ui",
      "test:run": "vitest run",
      "test:coverage": "vitest run --coverage",
      "test:ci": "vitest run --coverage --reporter=json"
    }
  }
  ```

- [ ] **Step 3.2**: Add test command to pre-push hook
  - Update `.husky/pre-push` to include test:run
  - Ensures tests pass before pushing

- [ ] **Step 3.3**: Document testing commands
  - Update README with test commands
  - Add to CLAUDE.md workflow

**Checkpoint:** Testing scripts configured and documented

---

### Phase 4: Create Test Utilities

- [ ] **Step 4.1**: Create render utility with providers

  ```typescript
  // src/test/utils/render.tsx
  import { ReactElement } from 'react'
  import { render, RenderOptions } from '@testing-library/react'

  // Add any providers here (Theme, Router, etc.)
  function AllTheProviders({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }

  const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
  ) => render(ui, { wrapper: AllTheProviders, ...options })

  export * from '@testing-library/react'
  export { customRender as render }
  ```

- [ ] **Step 4.2**: Create mock utilities

  ```typescript
  // src/test/utils/mocks.ts
  import { vi } from 'vitest';

  export const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  };

  export const mockEnvironment = (vars: Record<string, string>) => {
    const original = process.env;
    beforeAll(() => {
      process.env = { ...original, ...vars };
    });
    afterAll(() => {
      process.env = original;
    });
  };
  ```

- [ ] **Step 4.3**: Create test data factories

  ```typescript
  // src/test/factories/index.ts
  export const createMockUser = (overrides = {}) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    ...overrides,
  });

  export const createMockBooking = (overrides = {}) => ({
    id: '1',
    checkIn: '2025-06-01',
    checkOut: '2025-06-07',
    guests: 2,
    ...overrides,
  });
  ```

**Checkpoint:** Test utilities created for common patterns

---

### Phase 5: Create Example Tests

- [ ] **Step 5.1**: Create utility function test

  ```typescript
  // src/lib/utils.test.ts
  import { describe, it, expect } from 'vitest';
  import { cn } from './utils';

  describe('cn utility', () => {
    it('merges class names correctly', () => {
      const result = cn('px-4', 'py-2', { 'bg-blue-500': true });
      expect(result).toBe('px-4 py-2 bg-blue-500');
    });

    it('handles undefined values', () => {
      const result = cn('px-4', undefined, 'py-2');
      expect(result).toBe('px-4 py-2');
    });
  });
  ```

- [ ] **Step 5.2**: Create component test

  ```typescript
  // src/components/ui/button.test.tsx
  import { describe, it, expect, vi } from 'vitest'
  import { render, screen, fireEvent } from '@/test/utils/render'
  import { Button } from './button'

  describe('Button Component', () => {
    it('renders with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
      render(<Button disabled>Click me</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })
  ```

- [ ] **Step 5.3**: Create API route test example

  ```typescript
  // src/app/api/health/route.test.ts
  import { describe, it, expect } from 'vitest';
  import { GET } from './route';

  describe('Health Check API', () => {
    it('returns 200 OK', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ status: 'healthy' });
    });
  });
  ```

**Checkpoint:** Example tests created and passing

---

### Phase 6: Configure Coverage and CI

- [ ] **Step 6.1**: Run coverage report

  ```bash
  yarn test:coverage
  ```

  - Verify HTML report generated in `coverage/`
  - Check coverage meets thresholds

- [ ] **Step 6.2**: Add coverage to .gitignore

  ```
  # .gitignore
  coverage/
  *.lcov
  ```

- [ ] **Step 6.3**: Create GitHub Actions workflow (future)

  ```yaml
  # .github/workflows/test.yml (for future reference)
  name: Tests
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
        - run: yarn install
        - run: yarn test:ci
  ```

- [ ] **Step 6.4**: Document TDD workflow
  - Add TDD section to CLAUDE.md
  - Create testing best practices guide

**Checkpoint:** Coverage reporting and CI ready

---

## Quality Gates Checklist

**Claude MUST verify ALL items before marking task complete:**

- [ ] Vitest installed and configured
- [ ] All test scripts working (`yarn test`, etc.)
- [ ] React Testing Library configured
- [ ] Test utilities created
- [ ] Example tests passing
- [ ] Coverage reporting working (80% threshold)
- [ ] TypeScript working in tests
- [ ] Path aliases (@/) working
- [ ] No console errors during test runs
- [ ] Documentation updated
- [ ] Planning doc fully checked off
- [ ] Git commits created

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Run Tests**
   - [ ] Run `yarn test:run` - all tests pass
   - [ ] Run `yarn test:watch` - watch mode works
   - [ ] Run `yarn test:ui` - UI opens in browser
   - [ ] Run `yarn test:coverage` - coverage report generates

2. **Verify Coverage**
   - [ ] Open `coverage/index.html` in browser
   - [ ] Check coverage percentages displayed
   - [ ] Verify thresholds enforced (80%)

3. **Test Development Experience**
   - [ ] Create a new test file
   - [ ] Verify IntelliSense works
   - [ ] Check test auto-discovers
   - [ ] Verify hot reload in watch mode

4. **Integration Testing**
   - [ ] Test a React component
   - [ ] Test a utility function
   - [ ] Test with async/await
   - [ ] Test with mocks

5. **TDD Workflow Test**
   - [ ] Write a failing test
   - [ ] Implement code to pass
   - [ ] Verify test passes
   - [ ] Refactor and verify still passes

---

## TDD Workflow Documentation

### The TDD Cycle

1. **Red**: Write a failing test that defines desired behavior
2. **Green**: Write minimum code to make the test pass
3. **Refactor**: Improve code while keeping tests green

### Best Practices

**DO:**

- ✅ Write tests BEFORE implementation
- ✅ Keep tests simple and focused
- ✅ Test behavior, not implementation details
- ✅ Use descriptive test names
- ✅ Follow AAA pattern (Arrange, Act, Assert)
- ✅ Mock external dependencies
- ✅ Aim for 80%+ coverage

**DON'T:**

- ❌ Write tests after implementation
- ❌ Test private methods directly
- ❌ Write brittle tests tied to implementation
- ❌ Skip tests to save time
- ❌ Ignore failing tests

### Testing Patterns

**Component Testing:**

```typescript
describe('Component', () => {
  it('should render correctly', () => {});
  it('should handle user interaction', () => {});
  it('should display error state', () => {});
});
```

**API Testing:**

```typescript
describe('API Route', () => {
  it('should return 200 for valid request', () => {});
  it('should return 400 for invalid data', () => {});
  it('should handle errors gracefully', () => {});
});
```

**Utility Testing:**

```typescript
describe('Utility Function', () => {
  it('should handle normal input', () => {});
  it('should handle edge cases', () => {});
  it('should throw on invalid input', () => {});
});
```

---

## Rollback Plan

If Vitest setup causes issues:

1. **Remove Vitest**:

   ```bash
   yarn remove vitest @vitejs/plugin-react @vitest/ui @vitest/coverage-v8
   ```

2. **Remove testing libraries**:

   ```bash
   yarn remove @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
   ```

3. **Clean up files**:

   ```bash
   rm vitest.config.ts
   rm -rf src/test
   rm -rf coverage
   ```

4. **Restore package.json**:
   - Remove test scripts
   - Remove test dependencies

**Risk Assessment:** Low - Testing framework is isolated
**Rollback Difficulty:** Easy - Just remove packages
**Impact:** Cannot run tests, but app still works

---

## Documentation Updates

Files that need updating after this task:

- [ ] `README.md` - Add testing section with commands
- [ ] `.claude/CLAUDE.md` - Emphasize TDD requirement
- [ ] Create `docs/TESTING.md` - Testing guidelines
- [ ] Update `.gitignore` - Add coverage directory

---

## Related Tasks

**Depends On:**

- [SS-1: Next.js Setup](./ss-1-nextjs-setup.md) - Base project
- [SS-2: Linting Setup](./ss-2-linting-setup.md) - Code quality

**Enables:**

- All feature development (TDD required)
- SS-31: Unit tests for utilities
- SS-32: Integration tests
- SS-33: E2E tests (future)

**Related:**

- SS-5: shadcn/ui - Components to test
- SS-17+: All feature tasks require TDD

---

## Notes

### Why Vitest?

- **Fast**: Uses Vite, much faster than Jest
- **Compatible**: Jest-compatible API
- **Native ESM**: First-class ES modules support
- **HMR**: Hot module replacement in tests
- **TypeScript**: Works without configuration
- **UI**: Built-in test UI for debugging

### Alternative Considered

- **Jest**: Slower, more configuration needed
- **Mocha/Chai**: Less integrated with React
- **Cypress Component Testing**: E2E focused
- **React Testing Library alone**: Needs test runner

### Coverage Strategy

- **Target**: 80% minimum coverage
- **Focus**: Business logic and critical paths
- **Skip**: Generated files, types, configs
- **Enforce**: Pre-push hook checks coverage

### Future Enhancements

- Add mutation testing
- Add visual regression testing
- Add performance testing
- Add E2E tests with Playwright
- Add test data management

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

### Test Statistics

- Total tests written: \_\_\_
- Coverage achieved: \_\_\_%
- Test execution time: \_\_\_ms

### Follow-up Tasks Created

- [ ] Add mutation testing
- [ ] Create more test utilities
- [ ] Add E2E testing setup

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** X hours
**Final Status:** ⏸️ Not Started
