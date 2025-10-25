---
task_id: ss-16
title: '[Infrastructure] Currency Switch Spike - USD vs IDR Decision'
status: not_started
priority: high
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-11]
created: 2025-01-20
started: null
completed: null
related_docs: []
branch: ss-16/spike/currency-decision
pr_number: null
---

[← Previous: SS-15 Widget CSS](./ss-15-widget-customization.md) | [📋 Index](./index.md) | [Next: SS-17 Contact Form →](./ss-17-contact-form.md)

# [Infrastructure] Currency Switch Spike - USD vs IDR Decision

## Overview

Research and make a final decision on whether to use USD or Indonesian Rupiah (IDR) as the primary currency for pricing and payments. This decision impacts all future development and must be made before building marketing pages.

**Project Context:**
The surf camp operates in Indonesia but caters to international guests. The currency choice affects payment processing, pricing display, guest perception, and accounting complexity.

**User Story:**
As a business owner, I need to choose the optimal currency that maximizes bookings while minimizing operational complexity and currency conversion losses.

**Business Value:**

- Reduced friction in booking process
- Minimized currency conversion fees
- Simplified accounting
- Clear pricing for target market

---

## Prerequisites/Dependencies

- [x] SS-11: Beds24 account (to test currency settings)
- [ ] Understanding of target guest demographics
- [ ] Bank account capabilities (USD vs IDR)
- [ ] Stripe account region settings

---

## Acceptance Criteria

**This is a research and decision task - no code implementation.**

- [ ] **AC1**: Research completed on both currency options
- [ ] **AC2**: Pros/cons documented for each option
- [ ] **AC3**: Cost analysis performed (fees, conversion)
- [ ] **AC4**: Final decision documented with rationale
- [ ] **AC5**: Implementation plan created for chosen currency
- [ ] **AC6**: All stakeholders aligned on decision

---

## Research & Analysis Steps

### Phase 1: Market Research

**Data to Gather:**

- [ ] **Step 1.1**: Analyze target guest demographics:

  ```
  Questions to answer:
  - What % of guests are international vs domestic?
  - Which countries do most guests come from?
  - What currencies do competitors use?
  - What do guests expect to see?
  ```

- [ ] **Step 1.2**: Research competitor pricing:

  ```
  Surf camps to check:
  - Sumba surf camps
  - Bali surf camps
  - Similar Indonesian properties
  - Note their currency choice and why
  ```

- [ ] **Step 1.3**: Survey existing/past guests (if any):
  ```
  Questions:
  - Preferred currency for booking?
  - Confusion about pricing?
  - Payment method preferences?
  ```

**Market Research Checkpoint:** Guest preferences understood

---

### Phase 2: Technical Feasibility

**Technical Analysis:**

- [ ] **Step 2.1**: Test Beds24 currency options:

  ```
  Test both scenarios:
  1. Set to USD:
     - How does it display?
     - Payment processing flow?
     - Guest experience?

  2. Set to IDR:
     - Large number display (millions)?
     - International card processing?
     - Clarity for foreign guests?
  ```

- [ ] **Step 2.2**: Check Stripe capabilities:

  ```
  Research:
  - USD processing from Indonesia?
  - IDR processing fees?
  - Currency conversion at payment time?
  - Settlement currency options?
  ```

- [ ] **Step 2.3**: Bank account requirements:
  ```
  Check with bank:
  - USD account available?
  - Fees for USD vs IDR?
  - Conversion rates offered?
  - Wire transfer capabilities?
  ```

**Technical Checkpoint:** Systems support both options

---

### Phase 3: Financial Analysis

**Cost Comparison:**

- [ ] **Step 3.1**: Calculate USD scenario costs:

  ```
  USD Pricing Model:
  - Room rate: $100/night
  - Stripe fee: 2.9% + $0.30 = $3.20
  - Bank conversion (if needed): ~2%
  - Total cost per $100 booking: ~$5.20
  ```

- [ ] **Step 3.2**: Calculate IDR scenario costs:

  ```
  IDR Pricing Model:
  - Room rate: Rp 1,500,000/night
  - Stripe fee: 2.9% + Rp 5,000 = Rp 48,500
  - No conversion needed
  - Total cost per Rp 1,500,000: Rp 48,500
  ```

- [ ] **Step 3.3**: Model annual impact:

  ```
  Assumptions:
  - 200 bookings/year
  - Average booking: $300 (or Rp 4,500,000)

  USD Model Annual Fees: $_____
  IDR Model Annual Fees: Rp _____
  Difference: $_____
  ```

**Financial Checkpoint:** Cost difference quantified

---

### Phase 4: Pros & Cons Analysis

**USD Option:**

- [ ] **Step 4.1**: Document USD advantages:

  ```
  PROS:
  ✓ Familiar to international guests
  ✓ Stable currency
  ✓ Simple pricing ($100 vs Rp 1,500,000)
  ✓ Easy price comparisons
  ✓ Premium perception
  ✓ No mental math for Western guests

  CONS:
  ✗ Currency conversion fees
  ✗ Bank may require special account
  ✗ Local guests might prefer IDR
  ✗ Exchange rate fluctuations
  ✗ Potential tax complications
  ```

**IDR Option:**

- [ ] **Step 4.2**: Document IDR advantages:

  ```
  PROS:
  ✓ Local currency (no conversion)
  ✓ Simpler accounting
  ✓ Lower payment processing fees
  ✓ Aligns with local regulations
  ✓ Domestic guests comfortable

  CONS:
  ✗ Large numbers confusing (millions)
  ✗ International guests unfamiliar
  ✗ Appears "expensive" at first glance
  ✗ Harder to compare prices
  ✗ Currency volatility concerns
  ```

**Pros/Cons Checkpoint:** Trade-offs documented

---

### Phase 5: Decision Matrix

**Scoring Criteria (1-10):**

- [ ] **Step 5.1**: Create decision matrix:

  ```
  | Criteria              | Weight | USD | IDR |
  |-----------------------|--------|-----|-----|
  | Guest Experience      | 30%    |     |     |
  | Operational Simplicity| 25%    |     |     |
  | Cost Efficiency       | 20%    |     |     |
  | Market Positioning    | 15%    |     |     |
  | Future Flexibility    | 10%    |     |     |
  | TOTAL SCORE           | 100%   |     |     |
  ```

- [ ] **Step 5.2**: Score each option objectively

- [ ] **Step 5.3**: Calculate weighted scores

**Decision Matrix Checkpoint:** Objective comparison complete

---

### Phase 6: Implementation Planning

**For Chosen Currency:**

- [ ] **Step 6.1**: Create implementation checklist:

  ```
  If USD chosen:
  □ Configure Beds24 for USD
  □ Set Stripe to USD processing
  □ Open USD bank account (if needed)
  □ Design pricing with $ symbol
  □ Create currency explanation FAQ

  If IDR chosen:
  □ Configure Beds24 for IDR
  □ Set Stripe to IDR processing
  □ Format large numbers (1.5M vs 1,500,000)
  □ Add currency converter widget
  □ Create IDR explanation for international guests
  ```

- [ ] **Step 6.2**: Update project planning:

  ```
  Documents to update:
  - Planning index
  - Architecture docs
  - Environment variables
  - Marketing copy
  ```

- [ ] **Step 6.3**: Communication plan:
  ```
  Notify:
  - Development team (Claude)
  - Any existing partners
  - Update all documentation
  ```

**Implementation Checkpoint:** Ready to execute decision

---

### Phase 7: Final Decision & Documentation

- [ ] **Step 7.1**: Make final decision:

  ```
  FINAL DECISION: [USD / IDR]

  Primary Reasons:
  1. ________________________
  2. ________________________
  3. ________________________

  Risk Mitigation:
  - ________________________
  - ________________________
  ```

- [ ] **Step 7.2**: Document in Decision Log:

  ```markdown
  ## Decision #5: Currency Selection

  Date: 2025-01-\_\_
  Decision: Use [USD/IDR] as primary currency

  Rationale:
  [Detailed explanation]

  Alternatives Considered:

  - USD: [Why rejected/accepted]
  - IDR: [Why rejected/accepted]
  - Dual currency: [Why not viable]

  Review Date: 6 months after launch
  ```

- [ ] **Step 7.3**: Update all planning docs:
  - Update index.md decision log
  - Update README if needed
  - Update architecture.md

**Decision Checkpoint:** Decision final and documented

---

## Quality Gates Checklist

- [ ] Market research completed
- [ ] Technical feasibility confirmed
- [ ] Financial analysis done
- [ ] Pros/cons documented
- [ ] Decision matrix scored
- [ ] Stakeholder alignment
- [ ] Implementation plan created
- [ ] Decision documented
- [ ] Planning docs updated
- [ ] Team notified

---

## Post-Implementation Verification

### Verification Steps

1. **Configuration Check**
   - [ ] Beds24 currency setting updated
   - [ ] Stripe currency configured
   - [ ] Test booking shows correct currency

2. **Documentation Check**
   - [ ] All docs reference correct currency
   - [ ] No conflicting currency info
   - [ ] Decision rationale recorded

3. **Communication Check**
   - [ ] Team aware of decision
   - [ ] No confusion about currency

---

## Notes

### Currency Considerations

**USD Considerations:**

- Most surf camps globally use USD
- Easier for Americans/Europeans
- Stable, recognized currency
- May seem "premium"

**IDR Considerations:**

- Authentic local experience
- Required for domestic bookings
- Simpler tax reporting
- No conversion losses

### Hybrid Approach (Not Recommended)

Showing both currencies adds complexity:

- Confusion about which is charged
- Exchange rate management
- Technical complexity
- Accounting nightmare

### Future Flexibility

Consider ability to switch later:

- Historical booking data
- Customer communication
- SEO impact of price changes
- Marketing material updates

### Regional Examples

**Bali Properties:**

- Luxury: Usually USD
- Mid-range: Mixed
- Budget: Usually IDR

**Competitor Analysis:**

- [Research specific competitors]

---

**Completion Date:** \***\*\_\_\_\*\***
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started
**Decision Made:** [USD / IDR]
