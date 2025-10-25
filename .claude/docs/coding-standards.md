# Coding Standards & Best Practices

This document provides detailed coding standards, conventions, and best practices for the Sumba Sunset project.

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

---

## Naming Conventions

### Components & Files

- **Components**: PascalCase (e.g., `ContactForm.tsx`, `HeroSection.tsx`)
- **Props & Variables**: camelCase (e.g., `userName`, `bookingData`)
- **Types/Interfaces**: PascalCase (e.g., `ContactFormData`, `BookingInfo`)
- **Files**:
  - Components: PascalCase (e.g., `Button.tsx`)
  - Utilities: camelCase (e.g., `formatDate.ts`)
  - Config: kebab-case (e.g., `next.config.ts`)
- **Directories**: kebab-case (e.g., `components/`, `contact-form/`)

### API Routes & Server Actions

- **API Routes**: kebab-case (e.g., `/api/contact-form/route.ts`)
- **Server Actions**: camelCase starting with action verb (e.g., `submitContactForm`, `sendToWhatsApp`)
- **Route Handlers**: Standard Next.js convention (GET, POST, etc.)

### Images & Media

- **Image files**: kebab-case with descriptive names
  - ✅ `hero-sunset-beach.jpg`
  - ✅ `room-ocean-view.jpg`
  - ❌ `IMG_1234.jpg`
- **Optimize before upload**: Use Vercel Blob with pre-optimization
- **Alt text**: Always required, descriptive for SEO and accessibility

---

## Programming Principles

### Variable Naming

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

---

### Parse, Don't Validate (using Zod)

**Claude MUST follow the "Parse, don't validate" principle using Zod for all data validation:**

This project follows the "Parse, don't validate" philosophy, which means:

- **Transform untrusted inputs into trusted types** rather than just checking them
- **Use Zod schemas** to define and enforce data contracts at runtime
- **Derive TypeScript types from Zod schemas** using `z.infer<typeof schema>`
- **Fail fast** with detailed error messages when data doesn't match expectations

#### Key Principles

1. **Define schemas first**: Create Zod schemas for all external data (API responses, form inputs, environment variables, etc.)
2. **Parse at boundaries**: Validate data as it enters your system (API routes, server actions, form submissions)
3. **Type safety**: Extract TypeScript types from schemas with `z.infer<>`
4. **No manual validation**: Replace manual type guards and validation logic with Zod schemas
5. **Composability**: Build complex schemas from simple ones using Zod's composition methods

#### Examples

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

#### Common Patterns

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

#### Benefits

- Runtime type safety complements TypeScript's compile-time checks
- Clear, self-documenting data contracts
- Detailed error messages for debugging
- No need to maintain separate validation logic and types
- Prevents invalid data from propagating through your application

---

## Code Quality Practices

### Next.js/React/TypeScript

- **ESLint**: TypeScript + Next.js rules enabled
- **Prettier**: Enabled with Tailwind CSS plugin for class sorting
- **Git Hooks**: Husky manages pre-commit (lint-staged) and pre-push (full lint check)
- **lint-staged**: Runs Prettier + ESLint on staged files only
- **Import Order**: Enforced by ESLint
- **TypeScript**: Strict mode enabled

### Error Handling

- Use Zod for runtime validation at boundaries (forms, API inputs)
- Use TypeScript for compile-time safety
- Implement error boundaries for React components
- Log errors to Sentry for monitoring
- Show user-friendly error messages (never expose stack traces)

### Performance Optimization

#### Mobile-First Performance

- Lazy load images with Next.js `<Image>` component
- Use WebP format for images (Vercel Blob optimization)
- Minimize JavaScript bundle size
- Defer non-critical scripts
- Use Vercel Speed Insights to monitor

#### Static Generation

- Generate static pages at build time (SSG)
- Only use server-side rendering (SSR) when necessary
- Cache API responses appropriately

#### Image Optimization

- Pre-optimize images before uploading to Vercel Blob
- Use appropriate image sizes for mobile vs desktop
- Implement responsive images with `srcset`
- Lazy load below-the-fold images

### Security Best Practices

- Never commit API keys or secrets (use environment variables)
- Validate all user inputs with Zod schemas
- Sanitize data before sending to external services (Twilio, Beds24)
- Use HTTPS only (enforced by Vercel)
- Implement rate limiting on contact form (prevent spam)
- Set appropriate CORS headers for API routes
- Use Vercel's built-in security features

---

## Common Development Commands

### Project Setup

```bash
# Install dependencies
yarn install
```

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

```bash
# Build for production
yarn build

# Start production server locally
yarn start
```
