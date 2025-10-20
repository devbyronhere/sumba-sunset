# Architecture Documentation

This document provides detailed information about the Sumba Sunset technical architecture, tech stack, and external service integrations.

---

## Project Purpose

**Sumba Sunset** is a surf camp website for a property in Sumba, Indonesia. The site is primarily **marketing and informational**, with booking handled through the Beds24 widget integration.

**Domain:** sumbasunset.com (purchased from Hostinger, hosted on Vercel)

**Key Characteristics:**

- Mobile-first design (most users browse on phones)
- Static content heavy (pages, images, videos)
- No database needed (Beds24 handles bookings)
- Simple communication flow (contact forms → WhatsApp)
- Focus on visual appeal and ease of use

---

## Tech Stack

### Core Framework

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js 18+
- **Package Manager**: Yarn (NEVER use npm or npx)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest
- **Dev Tools**: ESLint, Prettier, Husky, lint-staged

### External Services

#### Hosting: Vercel

- Automatic deployments from GitHub
- Edge network with CDN
- Automatic SSL certificates
- Built-in CI/CD pipeline

#### Domain Registrar: Hostinger

- Domain: sumbasunset.com
- DNS configured to point to Vercel
- Domain management only (not hosting)

#### Booking & Payments: Beds24

- **PAID SERVICE** - £3.50/month (~$4.50/month) base plan OR $40-50/month for full-featured plan
- Booking management system
- Payment gateway through Stripe (requires configuration)
- Deposits: 50% upfront, remainder cash on arrival (configurable)
- Widget embedded on site for live availability
- **Includes channel manager** for Airbnb, Booking.com, Agoda sync
- **Note:** More technical setup required than simpler alternatives (expect 3-5 days)

#### Communication: Twilio

- Upgraded account with WhatsApp enabled
- $20 USD credits purchased
- Number: (606) 755-8767
- Purpose: Contact form → WhatsApp forwarding

#### Media Storage: Vercel Blob

- Integrated image storage with Vercel
- Automatic optimization and CDN delivery
- Pre-optimization before upload recommended

#### Video: YouTube (embedded)

- Loop videos to prevent suggestions
- De-monetized channel (no ads)
- No background music

#### Communication Flow

- **Pre-booking**: Contact form → Twilio (606-755-8767) → Staff WhatsApp
- **During booking**: Beds24 widget with special requests
- **Post-booking**: Beds24 automated confirmation emails
- **Post-stay**: Beds24 thank you emails (review automation requires manual setup)
- **Direct contact**: WhatsApp Click-to-Chat button

### Monitoring & Analytics (To Be Configured)

- **Uptime Monitoring**: UptimeRobot (not yet configured)
- **Analytics**: Google Analytics 4 (account not yet created)
- **Error Tracking**: Sentry (account not yet created - can defer until post-MVP)

### Future Integrations (Post-MVP - via Beds24 Channel Manager)

- Booking.com listing (configured in Beds24 dashboard)
- Airbnb listing (configured in Beds24 dashboard)
- Agoda listing (configured in Beds24 dashboard)

**Note:** These are configured within Beds24's channel manager, not as separate website integrations. Calendar sync is automatic once connected.

---

## Architecture Philosophy

### No Database Needed

- Beds24 handles all booking data
- Vercel hosts the application with edge network
- Vercel Blob handles media storage
- Site is primarily static content (pages, layouts, images)
- Dynamic data comes from Beds24 API/widget

### Mobile-First

- Design and test on mobile devices first
- Desktop is secondary experience
- Touch-friendly interactions
- Optimized images for mobile bandwidth

### Performance-First

- Static generation where possible (Next.js SSG)
- Image optimization via Vercel Blob with CDN
- Minimal JavaScript bundle
- Vercel edge network with automatic SSL

### Simple Communication Flow

```
User → Contact Form → Twilio (606-755-8767) → Staff WhatsApp
User → Beds24 Widget → Booking Confirmation → Automated Emails
User → WhatsApp Button → Direct Chat
```

---

## Beds24 Integration Details

### Setup Complexity

Expect 3-5 days for full setup and customization

### Key Characteristics

- **Dated UI**: Less intuitive dashboard, more technical
- **Widget Customization**: Requires CSS knowledge to match brand
- **API Structure**: Two-tier API key system (account + property)
- **Channel Manager**: Built-in, but configuration is more manual
- **Mobile Experience**: Widget is functional but requires CSS optimization
- **Email Templates**: Basic templates, need HTML customization for professional look

### Widget Integration Steps

1. Create account at beds24.com
2. Add property with room details, pricing, availability rules
3. Generate property-specific API key (Property → Settings → API Key)
4. Embed widget code in Next.js booking page
5. Customize widget CSS for mobile-first responsive design
6. Test booking flow thoroughly on mobile devices
7. Configure Stripe payment integration
8. Set up deposit payment rules (50% upfront model)
9. Create automated email templates (booking confirmation, pre-arrival, check-in, post-stay)

### Widget Customization

The Beds24 widget requires significant CSS customization to:

- Match Sumba Sunset brand colors and fonts
- Optimize for mobile (most users browse on phones)
- Ensure touch-friendly interactions
- Display pricing clearly
- Show availability with visual calendar

Budget 2-3 hours for widget styling to achieve a polished, mobile-first design.

### Testing Strategy

- Test booking flow on iOS Safari (primary user device)
- Test on Android Chrome
- Test desktop browsers (secondary)
- Verify payment processing with test credit card
- Test automated email delivery
- Verify calendar sync if using OTA channels

### Cost Structure

- Monthly cost: £3.50/month (~$4.50) base plan OR $40-50/month for full features
- No booking commission fees (flat monthly fee only)
- Cost-effective for small-to-medium booking volumes

### When to Upgrade/Change

If Beds24's dated UI becomes a conversion problem (users abandoning bookings), consider:

1. Heavily customizing CSS to modernize appearance
2. Building custom booking form that uses Beds24 API backend
3. Switching to more modern platform if revenue justifies higher cost

---

## Project Structure

### Directory Layout

```
sumba-sunset/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/       # Marketing pages group
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/         # About page
│   │   │   ├── rooms/         # Rooms & accommodation
│   │   │   ├── activities/    # Activities & surf info
│   │   │   └── contact/       # Contact page
│   │   ├── api/               # API routes
│   │   │   └── contact-form/  # Contact form handler → Twilio
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── forms/             # Form components
│   │   ├── layout/            # Layout components (Header, Footer)
│   │   └── sections/          # Page sections (Hero, Features)
│   ├── lib/                   # Utility functions
│   │   ├── validations/       # Zod schemas
│   │   ├── api/               # API client functions
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets (favicons, etc.)
├── .claude/                   # Claude Code configuration
│   ├── planning/              # Planning documents
│   ├── docs/                  # Detailed documentation
│   └── CLAUDE.md             # Core workflow instructions
├── .husky/                    # Git hooks
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

### Key Files & Their Purpose

- **`src/app/layout.tsx`**: Root layout with global metadata, fonts, analytics
- **`src/app/page.tsx`**: Homepage (hero, features, CTA)
- **`src/app/api/contact-form/route.ts`**: Handles contact form → Twilio → WhatsApp
- **`src/components/ui/`**: shadcn/ui components (Button, Input, Card, etc.)
- **`src/lib/validations/`**: Zod schemas for form validation
- **`next.config.ts`**: Vercel Blob configuration, image domains

---

## Server Components vs Client Components

### Default: Use Server Components

Use Server Components unless you need interactivity

### Server Components

- Static pages (Home, About, Rooms, Activities)
- Data fetching from APIs
- SEO-critical content

### Client Components

- Forms (contact form, booking widget integration)
- Interactive UI (image carousels, modals, accordions)
- Client-side state management
- Event handlers (clicks, form submissions)

### Best Practices

- Add `"use client"` only when necessary
- Keep client components small and focused
- Pass data from Server → Client Components as props
- Use React Hook Form + Zod for all forms

---

## Testing Strategy

### Unit Tests (Vitest)

**What to Test:**

- Utility functions (date formatting, text processing)
- Zod validation schemas
- React Hook Form logic
- Helper functions

**Coverage Goal:** 80% minimum for utilities and validations

### Integration Tests (Vitest + Testing Library)

**What to Test:**

- Contact form submission flow
- Beds24 widget integration
- WhatsApp button behavior
- Form validation with Zod
- API route handlers (contact form → Twilio)

**Coverage Goal:** Critical user flows must have integration tests

### E2E Tests (Optional - Playwright)

**What to Test (Post-MVP):**

- Full booking flow with Beds24 widget
- Contact form to WhatsApp journey
- Mobile navigation and interactions
- Image loading and optimization

**Note:** E2E tests are optional initially; prioritize unit and integration tests

### Test Coverage Goals

- **Utilities**: 80%+ coverage
- **Form validation**: 100% coverage
- **API routes**: 80%+ coverage
- **Components**: 60%+ coverage (focus on logic, not UI)
- **Critical flows**: 100% integration test coverage
