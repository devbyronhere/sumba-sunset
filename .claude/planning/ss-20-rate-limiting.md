---
task_id: ss-20
title: '[Feature] Rate Limiting for Contact Form'
status: not_started
priority: medium
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-17, ss-18]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-20/feat/rate-limiting
pr_number: null
---

[← Previous: SS-19 WhatsApp Button](./ss-19-whatsapp-button.md) | [📋 Index](./index.md) | [Next: SS-21 Image Upload →](./ss-21-image-upload.md)

# [Feature] Rate Limiting for Contact Form

## Overview

Implement rate limiting for the contact form API to prevent spam, abuse, and potential DDoS attacks. This protects both the application and the Twilio WhatsApp integration from excessive usage.

**Project Context:**
Without rate limiting, the contact form could be abused to send spam WhatsApp messages, incur Twilio costs, or overwhelm the staff. Rate limiting ensures sustainable and secure operation.

**User Story:**
As a site owner, I want to prevent abuse of the contact form so that legitimate inquiries get through while spam is blocked.

**Business Value:**

- Prevents spam and abuse
- Protects against excessive Twilio costs
- Ensures system stability
- Maintains quality of inquiries

---

## Prerequisites/Dependencies

- [x] SS-17: Contact form implemented
- [x] SS-18: Twilio integration complete
- [ ] Redis or in-memory store decision

---

## Acceptance Criteria

- [ ] **AC1**: Limits requests per IP address
- [ ] **AC2**: Limits requests per email address
- [ ] **AC3**: Returns appropriate error messages
- [ ] **AC4**: Implements exponential backoff
- [ ] **AC5**: Allows legitimate burst traffic
- [ ] **AC6**: Admin bypass capability
- [ ] **AC7**: Monitoring and alerting

---

## Test Strategy

### Test Files to Create

- `src/__tests__/lib/rateLimit/limiter.test.ts` - Core limiter tests
- `src/__tests__/lib/rateLimit/storage.test.ts` - Storage adapter tests
- `src/__tests__/api/contact-form-rate-limit.test.ts` - Integration tests

### Test Types

- **Unit Tests**: Rate limiting algorithms, storage adapters
- **Integration Tests**: API endpoint with rate limiting
- **Load Tests**: Verify limits under concurrent requests

### Coverage Target

- **100%** coverage for rate limiting logic
- **90%** coverage for storage adapters
- **85%** coverage for API integration

### Edge Cases to Test

1. **Burst traffic**: Allow reasonable bursts
2. **Distributed attacks**: Multiple IPs
3. **Time window edges**: Boundary conditions
4. **Storage failures**: Graceful degradation
5. **Clock skew**: Time synchronization
6. **IPv6 addresses**: Proper handling

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Install rate limiting packages:

  ```bash
  yarn add @upstash/ratelimit @upstash/redis
  # OR for in-memory:
  yarn add express-rate-limit memory-cache
  ```

- [ ] **Step 1.2**: Create test file for rate limiter
- [ ] **Step 1.3**: Write tests for IP-based limiting
- [ ] **Step 1.4**: Write tests for email-based limiting
- [ ] **Step 1.5**: Write tests for error responses
- [ ] **Step 1.6**: Write tests for bypass logic
- [ ] **Step 1.7**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: Rate Limiter Core

- [ ] **Step 2.1**: Create rate limiter configuration:

  ```typescript
  // src/lib/rateLimit/config.ts
  export const rateLimitConfig = {
    // Per IP limits
    ip: {
      requests: 5, // 5 requests
      window: '15m', // per 15 minutes
    },

    // Per email limits
    email: {
      requests: 3, // 3 submissions
      window: '1h', // per hour
    },

    // Global limits
    global: {
      requests: 100, // 100 total requests
      window: '15m', // per 15 minutes
    },
  };
  ```

- [ ] **Step 2.2**: Create storage adapter:

  ```typescript
  // src/lib/rateLimit/storage.ts
  interface RateLimitStorage {
    increment(key: string): Promise<number>;
    reset(key: string): Promise<void>;
    getTTL(key: string): Promise<number>;
  }

  // In-memory implementation (for development)
  export class MemoryStorage implements RateLimitStorage {
    private store = new Map<
      string,
      {
        count: number;
        expires: number;
      }
    >();

    async increment(key: string): Promise<number> {
      const now = Date.now();
      const existing = this.store.get(key);

      if (!existing || existing.expires < now) {
        this.store.set(key, {
          count: 1,
          expires: now + 15 * 60 * 1000, // 15 minutes
        });
        return 1;
      }

      existing.count++;
      return existing.count;
    }

    // Cleanup expired entries periodically
    private cleanup() {
      const now = Date.now();
      for (const [key, value] of this.store) {
        if (value.expires < now) {
          this.store.delete(key);
        }
      }
    }
  }
  ```

- [ ] **Step 2.3**: Create rate limiter:

  ```typescript
  // src/lib/rateLimit/limiter.ts
  export class RateLimiter {
    constructor(private storage: RateLimitStorage) {}

    async checkLimit(
      identifier: string,
      limit: number,
      window: string
    ): Promise<{
      allowed: boolean;
      remaining: number;
      reset: Date;
    }> {
      const key = `rate_limit:${identifier}`;
      const count = await this.storage.increment(key);

      const allowed = count <= limit;
      const remaining = Math.max(0, limit - count);
      const reset = new Date(Date.now() + parseWindow(window));

      return { allowed, remaining, reset };
    }
  }
  ```

**Core Limiter Checkpoint:** Basic rate limiting working

---

### Phase 3: Advanced Features

- [ ] **Step 3.1**: Implement sliding window:

  ```typescript
  // More accurate than fixed windows
  export class SlidingWindowLimiter {
    async checkLimit(
      identifier: string,
      limit: number,
      windowMs: number
    ): Promise<boolean> {
      const now = Date.now();
      const windowStart = now - windowMs;

      // Get all requests in window
      const requests = await this.getRequests(identifier, windowStart);

      // Remove old requests
      const validRequests = requests.filter((t) => t > windowStart);

      if (validRequests.length >= limit) {
        return false;
      }

      // Add current request
      await this.addRequest(identifier, now);
      return true;
    }
  }
  ```

- [ ] **Step 3.2**: Add exponential backoff:

  ```typescript
  export function getBackoffDelay(attempts: number): number {
    // Exponential backoff with jitter
    const baseDelay = Math.pow(2, attempts) * 1000;
    const jitter = Math.random() * 1000;
    return Math.min(baseDelay + jitter, 60000); // Max 1 minute
  }
  ```

- [ ] **Step 3.3**: Implement token bucket:

  ```typescript
  // Allows burst traffic while maintaining average rate
  export class TokenBucket {
    private tokens: number;
    private lastRefill: number;

    constructor(
      private capacity: number,
      private refillRate: number
    ) {
      this.tokens = capacity;
      this.lastRefill = Date.now();
    }

    consume(tokens = 1): boolean {
      this.refill();

      if (this.tokens >= tokens) {
        this.tokens -= tokens;
        return true;
      }

      return false;
    }

    private refill() {
      const now = Date.now();
      const elapsed = now - this.lastRefill;
      const tokensToAdd = (elapsed / 1000) * this.refillRate;

      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }
  ```

**Advanced Features Checkpoint:** Sophisticated limiting ready

---

### Phase 4: API Integration

- [ ] **Step 4.1**: Create rate limit middleware:

  ```typescript
  // src/lib/rateLimit/middleware.ts
  import { NextRequest, NextResponse } from 'next/server';

  export async function rateLimitMiddleware(
    request: NextRequest,
    identifier: string
  ): Promise<NextResponse | null> {
    const limiter = getRateLimiter();

    // Check IP-based limit
    const ip =
      request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const ipLimit = await limiter.checkLimit(
      `ip:${ip}`,
      rateLimitConfig.ip.requests,
      rateLimitConfig.ip.window
    );

    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          retryAfter: ipLimit.reset,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (ipLimit.reset.getTime() - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': rateLimitConfig.ip.requests.toString(),
            'X-RateLimit-Remaining': ipLimit.remaining.toString(),
            'X-RateLimit-Reset': ipLimit.reset.toISOString(),
          },
        }
      );
    }

    return null; // Continue to handler
  }
  ```

- [ ] **Step 4.2**: Update contact form API:

  ```typescript
  // src/app/api/contact-form/route.ts
  import { rateLimitMiddleware } from '@/lib/rateLimit/middleware';

  export async function POST(request: NextRequest) {
    // Apply rate limiting
    const rateLimitResponse = await rateLimitMiddleware(
      request,
      'contact-form'
    );
    if (rateLimitResponse) return rateLimitResponse;

    try {
      const body = await request.json();
      const validatedData = contactFormSchema.parse(body);

      // Additional email-based rate limiting
      const emailLimit = await limiter.checkLimit(
        `email:${validatedData.email}`,
        rateLimitConfig.email.requests,
        rateLimitConfig.email.window
      );

      if (!emailLimit.allowed) {
        return NextResponse.json(
          {
            error: 'Too many submissions from this email',
            retryAfter: emailLimit.reset,
          },
          { status: 429 }
        );
      }

      // Process form...
    } catch (error) {
      // Error handling...
    }
  }
  ```

**API Integration Checkpoint:** Rate limiting applied

---

### Phase 5: Monitoring & Analytics

- [ ] **Step 5.1**: Add metrics tracking:

  ```typescript
  interface RateLimitMetrics {
    totalRequests: number;
    blockedRequests: number;
    uniqueIPs: Set<string>;
    topOffenders: Map<string, number>;
  }

  export class MetricsCollector {
    private metrics: RateLimitMetrics = {
      totalRequests: 0,
      blockedRequests: 0,
      uniqueIPs: new Set(),
      topOffenders: new Map(),
    };

    recordRequest(ip: string, blocked: boolean) {
      this.metrics.totalRequests++;
      if (blocked) {
        this.metrics.blockedRequests++;
        this.updateTopOffenders(ip);
      }
      this.metrics.uniqueIPs.add(ip);
    }

    getMetrics(): RateLimitMetrics {
      return { ...this.metrics };
    }
  }
  ```

- [ ] **Step 5.2**: Add alerting:

  ```typescript
  export async function checkForAbuse() {
    const metrics = collector.getMetrics();

    // Alert if >50% requests blocked
    const blockRate = metrics.blockedRequests / metrics.totalRequests;
    if (blockRate > 0.5) {
      console.error('High block rate detected:', blockRate);
      // Send alert to monitoring service
    }

    // Alert on suspected DDoS
    if (metrics.totalRequests > 1000) {
      console.error('Possible DDoS attack');
      // Trigger additional protection
    }
  }
  ```

- [ ] **Step 5.3**: Create admin dashboard endpoint:

  ```typescript
  // src/app/api/admin/rate-limits/route.ts
  export async function GET(request: NextRequest) {
    // Verify admin authentication
    const metrics = collector.getMetrics();

    return NextResponse.json({
      metrics,
      config: rateLimitConfig,
      topOffenders: Array.from(metrics.topOffenders)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
    });
  }
  ```

**Monitoring Checkpoint:** Observability in place

---

### Phase 6: Bypass & Configuration

- [ ] **Step 6.1**: Add bypass for testing:

  ```typescript
  // Allow bypass with secret header
  const bypassToken = request.headers.get('X-Bypass-Token');
  if (
    bypassToken === process.env.RATE_LIMIT_BYPASS_TOKEN &&
    process.env.NODE_ENV !== 'production'
  ) {
    return null; // Skip rate limiting
  }
  ```

- [ ] **Step 6.2**: Environment-based config:
  ```typescript
  const config = {
    development: {
      ip: { requests: 100, window: '1m' },
      email: { requests: 50, window: '1m' },
    },
    production: {
      ip: { requests: 5, window: '15m' },
      email: { requests: 3, window: '1h' },
    },
  };
  ```

**Configuration Checkpoint:** Flexible configuration ready

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Rate limiting works correctly
- [ ] Error messages clear
- [ ] Headers set properly
- [ ] Monitoring in place
- [ ] Bypass works (dev only)
- [ ] No memory leaks
- [ ] Documentation updated

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Basic Rate Limiting**
   - [ ] Submit form 5 times quickly
   - [ ] Verify 6th submission blocked
   - [ ] Check error message
   - [ ] Wait and verify reset

2. **Email-Based Limiting**
   - [ ] Submit with same email 3 times
   - [ ] Verify 4th blocked
   - [ ] Try different email

3. **Load Testing**
   - [ ] Run concurrent requests
   - [ ] Verify limits hold
   - [ ] Check performance

4. **Monitoring**
   - [ ] Check metrics endpoint
   - [ ] Verify data accurate
   - [ ] Test alerting

---

## Documentation Updates

Files that need updating:

- [ ] Document rate limits in README
- [ ] Add troubleshooting guide
- [ ] Create ops documentation
- [ ] Update API documentation

---

## Related Tasks

**Depends On:**

- [SS-17: Contact Form](./ss-17-contact-form.md) - Form to protect
- [SS-18: Twilio Integration](./ss-18-twilio-integration.md) - Cost protection

**Related:**
Future enhancement could add CAPTCHA for additional protection

---

## Notes

### Rate Limit Strategy

1. **IP-based**: Primary defense
2. **Email-based**: Prevent same user abuse
3. **Global**: Protect system resources

### Storage Options

**In-Memory (Development):**

- Simple, no dependencies
- Lost on restart
- Not suitable for production

**Redis (Production):**

- Persistent across restarts
- Shared across instances
- Better performance

**Upstash Redis (Recommended):**

- Serverless Redis
- Pay per request
- Global edge network

### Common Attack Patterns

- Rapid fire: Many requests quickly
- Distributed: Multiple IPs
- Slow drip: Stay under limits
- Email flooding: Different emails

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
