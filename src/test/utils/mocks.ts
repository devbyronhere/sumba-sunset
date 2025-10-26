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
