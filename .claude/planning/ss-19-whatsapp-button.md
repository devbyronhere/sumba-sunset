---
task_id: ss-19
title: '[Feature] WhatsApp Click-to-Chat Button'
status: not_started
priority: medium
estimated_time: '1-2 hours'
actual_time: null
dependencies: [ss-5]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-19/feat/whatsapp-button
pr_number: null
---

[← Previous: SS-18 Twilio Integration](./ss-18-twilio-integration.md) | [📋 Index](./index.md) | [Next: SS-20 Rate Limiting →](./ss-20-rate-limiting.md)

# [Feature] WhatsApp Click-to-Chat Button

## Overview

Implement a floating WhatsApp click-to-chat button that allows visitors to instantly start a WhatsApp conversation with the surf camp. This provides direct, friction-free communication for users who prefer WhatsApp over forms.

**Project Context:**
Many international travelers prefer WhatsApp for instant communication. A prominent WhatsApp button reduces barriers to contact and can increase conversion rates.

**User Story:**
As a visitor, I want to quickly start a WhatsApp chat with the surf camp so that I can ask questions without filling out a form.

**Business Value:**

- Instant communication channel
- Lower friction than forms
- Familiar interface for users
- Higher engagement rates

---

## Prerequisites/Dependencies

- [x] SS-5: shadcn/ui components
- [ ] WhatsApp number configured (+27 78 778 7591)
- [ ] Pre-written welcome message

---

## Acceptance Criteria

- [ ] **AC1**: Floating button visible on all pages
- [ ] **AC2**: Opens WhatsApp with pre-filled message
- [ ] **AC3**: Works on desktop (WhatsApp Web) and mobile
- [ ] **AC4**: Accessible and keyboard navigable
- [ ] **AC5**: Smooth animations and hover states
- [ ] **AC6**: Can be dismissed/minimized
- [ ] **AC7**: Respects user preferences (localStorage)

---

## Test Strategy

### Test Files to Create

- `src/__tests__/components/WhatsAppButton.test.tsx` - Component tests
- `src/__tests__/lib/utils/whatsapp.test.ts` - URL generation tests
- `src/__tests__/hooks/useWhatsAppButton.test.ts` - Hook tests

### Test Types

- **Unit Tests**: URL generation, visibility logic, preferences
- **Component Tests**: Rendering, interactions, animations
- **Integration Tests**: Click behavior, localStorage

### Coverage Target

- Minimum **90%** coverage for utilities
- **85%** coverage for component
- **100%** coverage for URL generation

### Edge Cases to Test

1. **No WhatsApp installed**: Graceful fallback
2. **Invalid phone number**: Error handling
3. **Long pre-filled message**: URL encoding
4. **Special characters**: Proper encoding
5. **Multiple clicks**: Prevent duplicates
6. **Ad blockers**: Still functional

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test file for WhatsApp utilities
- [ ] **Step 1.2**: Write tests for URL generation
- [ ] **Step 1.3**: Create component test file
- [ ] **Step 1.4**: Write tests for button rendering
- [ ] **Step 1.5**: Write tests for click behavior
- [ ] **Step 1.6**: Write tests for preferences
- [ ] **Step 1.7**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: WhatsApp Utilities

- [ ] **Step 2.1**: Create WhatsApp URL generator:

  ```typescript
  // src/lib/utils/whatsapp.ts
  export function generateWhatsAppUrl(
    phoneNumber: string,
    message?: string
  ): string {
    // Remove all non-digits from phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    // Build WhatsApp URL
    const baseUrl = 'https://wa.me/';
    const url = new URL(`${baseUrl}${cleanNumber}`);

    if (message) {
      url.searchParams.append('text', message);
    }

    return url.toString();
  }
  ```

- [ ] **Step 2.2**: Add message templates:

  ```typescript
  export const whatsAppMessages = {
    default: `Hi! I'm interested in staying at Sumba Sunset. Can you tell me more about availability and rates?`,

    booking: `Hello! I'd like to book a stay at Sumba Sunset. I'm interested in [dates]. Are these available?`,

    surfing: `Hi! I'm interested in the surf packages at Sumba Sunset. What's included?`,

    info: `Hello! I have a question about Sumba Sunset surf camp.`,
  };
  ```

- [ ] **Step 2.3**: Device detection:

  ```typescript
  export function isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  export function getWhatsAppUrl(phone: string, message?: string): string {
    // Use different URL for mobile vs desktop
    const isMobile = isMobileDevice();

    if (isMobile) {
      // Mobile: Use whatsapp:// protocol
      const text = message ? `?text=${encodeURIComponent(message)}` : '';
      return `whatsapp://send?phone=${phone}${text}`;
    }

    // Desktop: Use web.whatsapp.com
    return generateWhatsAppUrl(phone, message);
  }
  ```

**Utilities Checkpoint:** WhatsApp helpers complete

---

### Phase 3: Button Component

- [ ] **Step 3.1**: Create WhatsApp button component:

  ```typescript
  // src/components/ui/WhatsAppButton.tsx
  'use client';

  import { useState, useEffect } from 'react';
  import { MessageCircle, X } from 'lucide-react';
  import { getWhatsAppUrl, whatsAppMessages } from '@/lib/utils/whatsapp';
  ```

- [ ] **Step 3.2**: Implement button structure:

  ```tsx
  export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    // Check localStorage for user preference
    useEffect(() => {
      const hidden = localStorage.getItem('whatsapp-hidden');
      if (hidden === 'true') {
        setIsVisible(false);
      }
    }, []);

    const handleClick = () => {
      const url = getWhatsAppUrl(
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!,
        whatsAppMessages.default
      );
      window.open(url, '_blank');

      // Track event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
        });
      }
    };

    if (!isVisible) return null;

    return (
      <div className="fixed right-6 bottom-6 z-50">
        {/* Button implementation */}
      </div>
    );
  }
  ```

- [ ] **Step 3.3**: Add button styling:

  ```tsx
  <button
    onClick={handleClick}
    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 focus:ring-4 focus:ring-green-500/30 focus:outline-none"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-6 w-6" />

    {/* Pulse animation */}
    <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
  </button>
  ```

- [ ] **Step 3.4**: Add dismiss button:
  ```tsx
  <button
    onClick={() => {
      setIsVisible(false);
      localStorage.setItem('whatsapp-hidden', 'true');
    }}
    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-800 text-white opacity-0 transition-opacity group-hover:opacity-100"
    aria-label="Dismiss WhatsApp button"
  >
    <X className="h-4 w-4" />
  </button>
  ```

**Component Checkpoint:** Button component functional

---

### Phase 4: Enhanced Features

- [ ] **Step 4.1**: Add tooltip on hover:

  ```tsx
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={handleClick}>{/* Button content */}</button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Chat with us on WhatsApp!</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  ```

- [ ] **Step 4.2**: Add entrance animation:

  ```tsx
  // Delayed entrance for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);
  ```

- [ ] **Step 4.3**: Add notification badge:

  ```tsx
  {
    showNotification && (
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
      </span>
    );
  }
  ```

- [ ] **Step 4.4**: Business hours indicator:

  ```tsx
  const isBusinessHours = () => {
    const now = new Date();
    const hours = now.getUTCHours() + 8; // WITA timezone
    return hours >= 8 && hours < 20;
  };

  {
    isBusinessHours() ? (
      <span className="text-green-500">● Online</span>
    ) : (
      <span className="text-gray-500">● We'll reply soon</span>
    );
  }
  ```

**Enhanced Features Checkpoint:** Advanced functionality added

---

### Phase 5: Mobile Optimization

- [ ] **Step 5.1**: Adjust position for mobile:

  ```css
  @media (max-width: 640px) {
    .whatsapp-button {
      bottom: 20px;
      right: 20px;
    }
  }
  ```

- [ ] **Step 5.2**: Ensure doesn't overlap content
- [ ] **Step 5.3**: Test on various devices
- [ ] **Step 5.4**: Verify touch targets adequate

**Mobile Checkpoint:** Optimized for mobile

---

### Phase 6: Integration

- [ ] **Step 6.1**: Add to root layout:

  ```tsx
  // src/app/layout.tsx
  import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          {children}
          <WhatsAppButton />
        </body>
      </html>
    );
  }
  ```

- [ ] **Step 6.2**: Add environment variable:

  ```bash
  # .env.local
  NEXT_PUBLIC_WHATSAPP_NUMBER=27787787591
  ```

- [ ] **Step 6.3**: Configure display rules:
  ```typescript
  // Don't show on booking page (avoid clutter)
  const pathname = usePathname();
  if (pathname === '/booking') return null;
  ```

**Integration Checkpoint:** Button integrated site-wide

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Button displays correctly
- [ ] Opens WhatsApp properly
- [ ] Works on mobile/desktop
- [ ] Animations smooth
- [ ] Preferences saved
- [ ] Accessible (keyboard/screen reader)
- [ ] No layout shifts
- [ ] Documentation updated

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Desktop Testing**
   - [ ] Click opens WhatsApp Web
   - [ ] Pre-filled message correct
   - [ ] Dismiss button works
   - [ ] Preference saved

2. **Mobile Testing**
   - [ ] Opens WhatsApp app
   - [ ] Message pre-filled
   - [ ] Position doesn't block content
   - [ ] Touch targets adequate

3. **Cross-Browser**
   - [ ] Chrome
   - [ ] Safari
   - [ ] Firefox
   - [ ] Edge

4. **Accessibility**
   - [ ] Keyboard accessible
   - [ ] Screen reader compatible
   - [ ] Focus indicators visible

---

## Documentation Updates

Files that need updating:

- [ ] Add to component documentation
- [ ] Update README with WhatsApp info
- [ ] Document environment variable
- [ ] Add usage guidelines

---

## Related Tasks

**Depends On:**

- [SS-5: shadcn/ui](./ss-5-shadcn-setup.md) - UI components

**Related:**

- [SS-17: Contact Form](./ss-17-contact-form.md) - Alternative contact
- [SS-18: Twilio Integration](./ss-18-twilio-integration.md) - Form to WhatsApp

---

## Notes

### WhatsApp URL Formats

- Desktop: `https://wa.me/27787787591?text=Hello`
- Mobile: `whatsapp://send?phone=27787787591&text=Hello`
- No "+" in phone number for URL

### Best Practices

- Don't show immediately (3-5 second delay)
- Allow dismissing (respect user choice)
- Keep pre-filled message short
- Include online/offline indicator
- Track clicks for analytics

### Legal Considerations

- WhatsApp Business account recommended
- Follow WhatsApp Business Policy
- Don't spam or auto-message
- Respect privacy regulations

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
