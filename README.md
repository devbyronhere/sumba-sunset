# Sumba Sunset

A surf camp website for a property in Sumba, Indonesia. Mobile-first design with integrated booking and communication systems.

**Live Site:** https://sumba-sunset-m96okb7l6-byrons-projects-a07d9676.vercel.app/

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Testing:** Vitest
- **Hosting:** Vercel (domain: sumbasunset.com via Hostinger)
- **External Services:** Beds24 (bookings), Twilio (WhatsApp), Vercel Blob (images)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager (required - do not use npm)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sumba-sunset.git
cd sumba-sunset
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
# Copy the example file to create your local environment file
cp .env.example .env.local
```

4. Edit `.env.local` and fill in your actual values:

**Required for local development:**

- `TWILIO_ACCOUNT_SID` - Get from [Twilio Console](https://console.twilio.com/)
- `TWILIO_AUTH_TOKEN` - Get from [Twilio Console](https://console.twilio.com/)
- `TWILIO_WHATSAPP_NUMBER` - Your Twilio WhatsApp number (format: `whatsapp:+1234567890`)
- `STAFF_WHATSAPP_NUMBER` - Staff WhatsApp number for contact form (format: `whatsapp:+1234567890`)
- `BLOB_READ_WRITE_TOKEN` - Get from [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- `NEXT_PUBLIC_SITE_URL` - Use `http://localhost:3000` for local development

**Optional (add when needed):**

- `BEDS24_API_KEY` - Beds24 account-level API key (required for API integration)
- `BEDS24_PROP_KEY` - Beds24 property-specific key (required for booking widget)
- `SENTRY_DSN` - For error monitoring in production
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - For Google Analytics tracking

5. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Environment Variables

**Important Notes:**

- **Never commit `.env.local`** to version control (it's gitignored)
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- For production, add environment variables to [Vercel Dashboard](https://vercel.com/docs/environment-variables)
- See [`.env.example`](./.env.example) for detailed documentation of all variables

## Development

### Available Commands

```bash
# Development
yarn dev                # Start development server with Turbopack
yarn build              # Build for production
yarn start              # Start production server locally

# Code Quality
yarn type-check         # Run TypeScript type checking
yarn lint               # Run ESLint
yarn lint:fix           # Run ESLint with auto-fix
yarn format             # Format code with Prettier
yarn format:check       # Check code formatting

# Git Hooks (run automatically)
yarn code:pre-commit    # Type-check + lint staged files (pre-commit hook)
yarn code:fix           # Lint + format check (pre-push hook)
```

### Git Hooks

This project uses Husky to enforce code quality:

- **Pre-commit:** Runs `yarn type-check` + `yarn lint-staged` on staged files
- **Pre-push:** Runs `yarn lint:fix` + `yarn format:check` on entire codebase

### Coding Standards

- **Package Manager:** Always use `yarn`, never `npm` or `npx`
- **Imports:** Use absolute imports with `@/` prefix (e.g., `import { Button } from '@/components/ui/Button'`)
- **TypeScript:** Strict mode enabled
- **Components:** PascalCase for components, camelCase for variables
- **Styling:** Tailwind CSS classes, sorted by Prettier plugin

See [`.claude/CLAUDE.md`](./.claude/CLAUDE.md) for comprehensive coding guidelines.

## Project Structure

```
sumba-sunset/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── forms/       # Form components
│   │   └── layout/      # Layout components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── .claude/             # Claude Code configuration
│   ├── planning/        # Planning documents
│   └── CLAUDE.md        # Development guidelines
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## Deployment

### Vercel (Automatic)

This project is configured for automatic deployment with Vercel:

- **Production:** Pushes to `main` branch automatically deploy
- **Preview:** Pull requests get unique preview URLs
- **Environment Variables:** Configure in Vercel Dashboard

### Manual Deployment

```bash
# Install Vercel CLI
yarn global add vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Key Features

- Mobile-first responsive design
- Contact form with Twilio → WhatsApp integration
- Beds24 booking widget integration
- Image optimization with Vercel Blob
- Google Analytics 4 tracking
- Sentry error monitoring
- UptimeRobot monitoring

## Contributing

This project follows Test-Driven Development (TDD):

1. Write tests first to define behavior
2. Implement minimum code to pass tests
3. Refactor while keeping tests green

See [`.claude/planning/`](./.claude/planning/) for task management and planning documents.

## Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Project Documentation

- [CLAUDE.md](./.claude/CLAUDE.md) - Development guidelines for Claude Code
- [Planning Index](./.claude/planning/index.md) - Project roadmap and task tracking

## License

Private project - All rights reserved
