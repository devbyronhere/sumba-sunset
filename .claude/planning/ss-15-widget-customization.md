---
task_id: ss-15
title: '[Feature] Beds24 Widget CSS Customization'
status: not_started
priority: medium
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-12]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-15/feat/widget-css
pr_number: null
---

[← Previous: SS-14 Email Templates](./ss-14-email-templates.md) | [📋 Index](./index.md) | [Next: SS-16 Currency Decision →](./ss-16-currency-decision.md)

# [Feature] Beds24 Widget CSS Customization

## Overview

Create comprehensive CSS customization for the Beds24 booking widget to match the Sumba Sunset brand aesthetic and ensure mobile-first responsive design. This involves overriding default widget styles while maintaining functionality.

**Project Context:**
The default Beds24 widget has a dated appearance that doesn't match modern web design standards. Custom CSS will transform it into a professional, mobile-optimized booking interface.

**User Story:**
As a potential guest, I want a visually appealing and easy-to-use booking interface that works seamlessly on my mobile device.

**Business Value:**

- Increased conversion rates through better UX
- Professional appearance builds trust
- Mobile optimization captures more bookings
- Brand consistency throughout the experience

---

## Prerequisites/Dependencies

- [x] SS-12: Widget integration completed
- [ ] Widget rendering in application
- [ ] Brand colors and fonts defined
- [ ] Mobile testing devices available

---

## Acceptance Criteria

- [ ] **AC1**: Widget matches site color scheme and typography
- [ ] **AC2**: Mobile-responsive layout (320px to 768px+)
- [ ] **AC3**: Touch-friendly inputs and buttons (min 44px)
- [ ] **AC4**: Calendar is easy to navigate on mobile
- [ ] **AC5**: Loading states and transitions smooth
- [ ] **AC6**: Accessibility maintained (contrast, focus states)
- [ ] **AC7**: Cross-browser compatibility verified

---

## Test Strategy

### Test Files to Create

- `src/__tests__/styles/widget-styles.test.tsx` - Style injection tests
- `src/__tests__/integration/widget-responsive.test.tsx` - Responsive tests
- `src/__tests__/utils/css-helpers.test.ts` - CSS utility tests

### Test Types

- **Unit Tests**: CSS injection logic, utility functions
- **Integration Tests**: Style application, responsive behavior
- **Visual Tests**: Manual cross-device testing

### Coverage Target

- Minimum **80%** coverage for style utilities
- **100%** coverage for critical path functions

### Edge Cases to Test

1. **Very small screens**: 320px width (iPhone SE)
2. **Landscape mobile**: Orientation changes
3. **CSS conflicts**: Ensure no global style leaks
4. **Dynamic content**: Calendar month changes
5. **Long text**: Room names, descriptions
6. **RTL languages**: Future internationalization

---

## Implementation Steps

### Phase 1: Setup & Test Writing (TDD)

- [ ] **Step 1.1**: Create test files for CSS utilities
- [ ] **Step 1.2**: Write tests for style injection function
- [ ] **Step 1.3**: Write tests for responsive breakpoints
- [ ] **Step 1.4**: Write tests for theme variable application
- [ ] **Step 1.5**: Write tests for CSS scoping
- [ ] **Step 1.6**: Run tests to verify they fail

**TDD Checkpoint:** All tests written and failing

---

### Phase 2: CSS Architecture Setup

- [ ] **Step 2.1**: Create widget styles structure:

  ```scss
  // src/styles/beds24/
  ├── _variables.scss     // Brand colors, fonts
  ├── _reset.scss        // Reset widget defaults
  ├── _layout.scss       // Responsive layout
  ├── _components.scss   // Individual components
  ├── _mobile.scss       // Mobile-specific
  └── widget.scss        // Main import file
  ```

- [ ] **Step 2.2**: Define CSS variables:

  ```scss
  :root {
    --b24-primary: #00a8e8; // Ocean blue
    --b24-secondary: #ff6b35; // Sunset orange
    --b24-success: #00c851;
    --b24-danger: #ff4444;
    --b24-text: #2c3e50;
    --b24-border: #e0e0e0;
    --b24-bg: #ffffff;
    --b24-font: 'Inter', sans-serif;
    --b24-radius: 8px;
    --b24-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  ```

- [ ] **Step 2.3**: Create style injection utility:
  ```typescript
  // src/lib/widget/styleInjector.ts
  export function injectWidgetStyles() {
    // Inject styles after widget loads
    // Use MutationObserver for dynamic content
  }
  ```

**Architecture Checkpoint:** CSS structure established

---

### Phase 3: Core Component Styling

- [ ] **Step 3.1**: Style form elements:

  ```scss
  // Inputs and selects
  .beds24-widget input,
  .beds24-widget select {
    height: 48px; // Touch-friendly
    padding: 12px 16px;
    font-size: 16px; // Prevent zoom on iOS
    border: 2px solid var(--b24-border);
    border-radius: var(--b24-radius);

    &:focus {
      border-color: var(--b24-primary);
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 168, 232, 0.1);
    }
  }
  ```

- [ ] **Step 3.2**: Style buttons:

  ```scss
  .beds24-widget button,
  .beds24-widget .submit-button {
    min-height: 48px;
    padding: 12px 24px;
    background: var(--b24-primary);
    color: white;
    font-weight: 600;
    border-radius: var(--b24-radius);
    transition: all 0.2s;

    &:active {
      transform: scale(0.98);
    }
  }
  ```

- [ ] **Step 3.3**: Style calendar:

  ```scss
  // Calendar grid
  .beds24-calendar {
    .cal-day {
      min-width: 44px;
      min-height: 44px;
      font-size: 14px;

      &.available {
        background: #e8f5e9;
        cursor: pointer;
      }

      &.selected {
        background: var(--b24-primary);
        color: white;
      }
    }
  }
  ```

**Component Styling Checkpoint:** Core elements styled

---

### Phase 4: Mobile Optimization

- [ ] **Step 4.1**: Implement responsive layout:

  ```scss
  @media (max-width: 768px) {
    .beds24-widget {
      .form-row {
        flex-direction: column;
      }

      .date-picker {
        width: 100%;
      }

      .room-selector {
        display: block;
        width: 100%;
      }
    }
  }
  ```

- [ ] **Step 4.2**: Optimize calendar for mobile:

  ```scss
  @media (max-width: 480px) {
    .beds24-calendar {
      // Single month view on mobile
      .month-selector {
        position: sticky;
        top: 0;
        background: white;
        z-index: 10;
      }

      // Swipe indicators
      .cal-navigation {
        font-size: 24px;
        padding: 12px;
      }
    }
  }
  ```

- [ ] **Step 4.3**: Touch gesture support:

  ```typescript
  // Add swipe support for calendar
  function addSwipeSupport() {
    // Detect swipe left/right
    // Change calendar month
  }
  ```

- [ ] **Step 4.4**: Improve form layout:
  ```scss
  // Stack fields on mobile
  .guest-details {
    @media (max-width: 640px) {
      .name-fields {
        grid-template-columns: 1fr;
      }
    }
  }
  ```

**Mobile Optimization Checkpoint:** Fully responsive

---

### Phase 5: Visual Polish

- [ ] **Step 5.1**: Add loading states:

  ```scss
  .beds24-loading {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  ```

- [ ] **Step 5.2**: Add transitions:

  ```scss
  // Smooth transitions
  .beds24-widget * {
    transition:
      background-color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
  }
  ```

- [ ] **Step 5.3**: Style pricing display:

  ```scss
  .price-breakdown {
    background: #f5f5f5;
    padding: 16px;
    border-radius: var(--b24-radius);

    .total-price {
      font-size: 24px;
      font-weight: bold;
      color: var(--b24-primary);
    }

    .deposit-info {
      color: var(--b24-secondary);
      font-size: 14px;
      margin-top: 8px;
    }
  }
  ```

- [ ] **Step 5.4**: Add error state styling:

  ```scss
  .has-error {
    input,
    select {
      border-color: var(--b24-danger);
    }

    .error-message {
      color: var(--b24-danger);
      font-size: 14px;
      margin-top: 4px;
    }
  }
  ```

**Visual Polish Checkpoint:** Professional appearance

---

### Phase 6: Cross-Browser Testing

- [ ] **Step 6.1**: Test on major browsers:
  - Chrome (latest)
  - Safari (latest)
  - Firefox (latest)
  - Edge (latest)

- [ ] **Step 6.2**: Test on mobile browsers:
  - iOS Safari (iPhone)
  - Chrome (Android)
  - Samsung Internet

- [ ] **Step 6.3**: Fix browser-specific issues:

  ```scss
  // Safari fixes
  @supports (-webkit-appearance: none) {
    select {
      -webkit-appearance: none;
      background-image: url('arrow.svg');
    }
  }
  ```

- [ ] **Step 6.4**: Verify accessibility:
  - Keyboard navigation
  - Screen reader labels
  - Color contrast (WCAG AA)
  - Focus indicators

**Cross-Browser Checkpoint:** Works everywhere

---

## Quality Gates Checklist

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] No console errors
- [ ] Mobile responsive (320px+)
- [ ] Touch targets ≥ 44px
- [ ] Brand colors applied
- [ ] Smooth transitions
- [ ] Cross-browser tested
- [ ] Accessibility verified
- [ ] Performance optimized
- [ ] Documentation updated

---

## Post-Implementation Verification

### Manual Testing Steps

1. **Mobile Device Testing**
   - [ ] iPhone SE (small screen)
   - [ ] iPhone 14 Pro
   - [ ] Samsung Galaxy
   - [ ] iPad/tablet

2. **Interaction Testing**
   - [ ] Date selection smooth
   - [ ] Form validation clear
   - [ ] Buttons responsive
   - [ ] Calendar navigation

3. **Visual Testing**
   - [ ] Brand consistency
   - [ ] No layout breaks
   - [ ] Readable text
   - [ ] Clear CTAs

4. **Performance Testing**
   - [ ] CSS file size < 10KB
   - [ ] No render blocking
   - [ ] Smooth animations

---

## Documentation Updates

Files that need updating:

- [ ] Create `docs/widget-customization-guide.md`
- [ ] Update README with theming info
- [ ] Document CSS variables
- [ ] Add screenshots of styled widget

---

## Notes

### CSS Specificity Strategy

- Use `.beds24-widget` prefix for scoping
- Avoid !important unless necessary
- Layer specificity gradually
- Document any overrides needed

### Mobile-First Approach

```scss
// Base styles (mobile)
.widget {
  width: 100%;
}

// Tablet and up
@media (min-width: 768px) {
  .widget {
    width: 600px;
  }
}

// Desktop
@media (min-width: 1024px) {
  .widget {
    width: 800px;
  }
}
```

### Performance Considerations

- Minimize CSS file size
- Use CSS variables for theming
- Avoid complex selectors
- Optimize for paint/reflow

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
