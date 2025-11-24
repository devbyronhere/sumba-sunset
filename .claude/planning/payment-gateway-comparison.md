# Payment Gateway Comparison for Sumba Sunset (Beds24 Integration)

**Date:** 2025-01-18
**Context:** Evaluating payment gateway options for Beds24 booking system integration
**Business Location:** Indonesia (Sumba)
**Developer Location:** South Africa
**Target Customers:** International surfers + local Indonesian guests

---

## Executive Summary

### Quick Recommendation

**🎯 Best Option: Midtrans (via Custom Gateway Integration)**

**Why:**

- ✅ Accepts international cards (Visa, Mastercard, Amex, JCB)
- ✅ Native Indonesian business support (no US entity needed)
- ✅ Lowest setup cost ($0 vs $500+ for Stripe Atlas)
- ✅ Native IDR currency support
- ✅ Reasonable fees (2.9% for credit cards)
- ✅ Can integrate via Beds24 Custom Gateway
- ⚠️ Requires custom integration work (not native Beds24 plugin)

**Alternative: Xendit** (if Midtrans integration is too complex)

---

## Payment Gateway Options Overview

| Gateway             | Countries Supported            | Setup Cost        | Transaction Fees                           | International Cards | Indonesia Support | Beds24 Integration |
| ------------------- | ------------------------------ | ----------------- | ------------------------------------------ | ------------------- | ----------------- | ------------------ |
| **Stripe**          | 46 countries (NOT Indonesia)   | $500 (Atlas)      | 2.9% + $0.30 + 1% intl + 1.5% cross-border | ✅ Yes              | ❌ No (via Atlas) | ✅ Native          |
| **AsiaPay**         | 12 Asian countries             | Contact for quote | Setup + monthly + %                        | ✅ Yes              | ✅ Yes            | ✅ Native          |
| **Authorize.net**   | US, CA, AU, UK, EU             | $25/month         | 2.9% + $0.30 + daily batch                 | ✅ Yes              | ❌ No             | ✅ Native          |
| **BitPay**          | 233 countries                  | $0                | 2% + $0.25 (crypto)                        | ⚠️ Crypto only      | ✅ Yes            | ✅ Native          |
| **Borgun**          | Iceland, UK, EU (7 countries)  | Contact for quote | 1.4-2%                                     | ✅ Yes              | ❌ No             | ✅ Native          |
| **Global Payments** | 100+ countries                 | Contact for quote | Bespoke pricing                            | ✅ Yes              | ⚠️ Unknown        | ✅ Native          |
| **Midtrans**        | Indonesia + accepts intl cards | $0                | 2.9% (MDR)                                 | ✅ Yes              | ✅ Yes            | ⚠️ Custom Gateway  |
| **Xendit**          | Indonesia, Philippines, SEA    | $0                | Varies by volume                           | ✅ Yes              | ✅ Yes            | ⚠️ Custom Gateway  |

---

## Detailed Gateway Analysis

### 1. Stripe

**Countries Supported:**

- 46 countries worldwide
- ❌ **NOT available in Indonesia** without Stripe Atlas
- ❌ **NOT available in South Africa** for account creation

**Setup Requirements:**

- Must incorporate US Delaware company via Stripe Atlas ($500)
- Or have business entity in supported country

**Fees:**

- **Domestic cards:** 2.9% + $0.30
- **International cards:** 2.9% + $0.30 + **1% international fee** + **1.5% cross-border fee** = ~5.4% total
- **Currency conversion:** Additional 1% if currency conversion needed
- **No monthly fees**

**Setup Cost:**

- **Stripe Atlas:** $500 one-time
- **Registered agent:** $100/year (after first year)
- **Delaware franchise tax:** $175-$400+/year

**How Business Owner Gets Paid:**

- Direct deposit to US bank account (via Mercury, Wise, etc.)
- 2-7 day settlement to bank account
- Can convert USD to IDR and transfer to Indonesia

**Effort to Integrate:**

- ✅ **Easy** - Native Beds24 integration (click to connect)
- Well-documented API
- 1-2 hours setup time

**Pros:**

- ✅ Best-in-class developer experience
- ✅ Comprehensive documentation
- ✅ Native Beds24 integration (easiest setup)
- ✅ Widely trusted by international customers
- ✅ Advanced fraud protection
- ✅ Supports 135+ currencies

**Cons:**

- ❌ **NOT available in Indonesia or South Africa** without Atlas
- ❌ **$500+ setup cost** (Atlas + ongoing fees)
- ❌ **High fees for international cards** (~5.4% total)
- ❌ Must maintain US entity (tax filings, compliance)
- ❌ Currency conversion fees (USD → IDR)
- ❌ Complex tax implications (US + Indonesia)

**Best For:** Businesses already in US/EU or processing high volume (>$10k/month) to justify Atlas cost

---

### 2. AsiaPay (PayDollar)

**Countries Supported:**

- 12 Asian countries: Hong Kong, China, India, **Indonesia**, Malaysia, Singapore, Philippines, Taiwan, Thailand, Vietnam, Australia, UK
- ✅ **Direct Indonesia support** via PT AsiaPay Technology Indonesia

**Setup Requirements:**

- Indonesian business entity required
- KYB (Know Your Business) verification
- Indonesian bank account

**Fees:**

- **Pricing model:** Setup fee + monthly fee + transaction % + per-transaction fee
- **Specific rates:** NOT publicly disclosed (must contact sales)
- Typical range: 2.5-3.5% + fixed fee (estimated)

**Setup Cost:**

- **Unknown** - must contact AsiaPay Indonesia for quote
- Likely includes setup fee + monthly subscription

**How Business Owner Gets Paid:**

- Direct settlement to Indonesian bank account
- Supports IDR currency natively
- Settlement timeframe: 2-7 days (typical)

**Effort to Integrate:**

- ✅ **Easy** - Native Beds24 integration
- 150+ payment methods on one platform
- Connects to 100+ Asian bank acquirers
- 2-4 hours setup time (after account approval)

**Pros:**

- ✅ **Native Indonesia support** (subsidiary in Jakarta & Bali)
- ✅ Supports 150+ Asian payment methods
- ✅ Native IDR settlement
- ✅ 144 currencies, 12 languages supported
- ✅ Native Beds24 integration (easy setup)
- ✅ Designed for Asian hospitality businesses
- ✅ Flexible settlement in 11 countries

**Cons:**

- ❌ **Opaque pricing** (must contact sales)
- ❌ Likely higher fees than Midtrans/Xendit
- ❌ Monthly subscription fees (unknown amount)
- ❌ Setup fee required (unknown amount)
- ❌ May require minimum transaction volume
- ❌ Slower customer support (48-72 hours typical)

**Best For:** Established hospitality businesses with high volume, need for multiple Asian payment methods (Alipay, WeChat Pay, etc.)

---

### 3. Authorize.net

**Countries Supported:**

- United States, Canada, Australia, United Kingdom, Europe
- ❌ **NOT available in Indonesia**
- ❌ **NOT available in South Africa**

**Setup Requirements:**

- Must have business entity in US, CA, AU, or UK
- Requires merchant account in supported country

**Fees:**

- **Monthly gateway fee:** $25/month
- **Transaction fee:** 2.9% + $0.30
- **Daily batch fee:** Additional (amount varies)
- **No setup fees or contracts**

**Setup Cost:**

- $0 upfront
- $25/month ongoing = **$300/year**

**How Business Owner Gets Paid:**

- Settlement to merchant account in supported country
- 2-3 day settlement period
- Must have bank account in US, CA, AU, or UK

**Effort to Integrate:**

- ✅ **Easy** - Native Beds24 integration
- 2-3 hours setup time
- Well-documented API

**Pros:**

- ✅ Native Beds24 integration
- ✅ No setup fees or contracts
- ✅ No early termination fees
- ✅ Supports 9 currencies
- ✅ Reliable uptime (99.9%)

**Cons:**

- ❌ **NOT available in Indonesia or South Africa**
- ❌ **$25/month fee** regardless of transaction volume
- ❌ Limited to North America, Australia, UK
- ❌ Daily batch fees add up
- ❌ Must maintain merchant account in supported country
- ❌ Dated interface compared to Stripe

**Best For:** North American businesses with existing merchant accounts

---

### 4. BitPay (Cryptocurrency)

**Countries Supported:**

- 233 countries for cryptocurrency settlement
- 38 countries for direct bank deposits
- ✅ **Indonesia supported** for crypto settlement
- ✅ **South Africa supported** for crypto settlement

**Setup Requirements:**

- Business registration (any country)
- Can accept payments globally in crypto
- Can settle in USD, EUR, GBP (auto-converts crypto to fiat)

**Fees:**

- **Low volume (<$500k/month):** 2% + $0.25
- **Medium volume ($500k-$1M/month):** 1.5% + $0.25
- **High volume (>$1M/month):** 1% + $0.25
- **No monthly fees**

**Setup Cost:**

- $0 upfront
- $0 monthly fees

**How Business Owner Gets Paid:**

- **Option 1:** Receive cryptocurrency (Bitcoin, Ethereum, etc.)
- **Option 2:** Auto-convert to USD/EUR/GBP and settle to bank account
- **Settlement time:** 2 business days (USD via ACH)
- **Minimum settlement:** $20 USD

**Effort to Integrate:**

- ✅ **Easy** - Native Beds24 integration
- 2-3 hours setup time
- API available for custom integration

**Pros:**

- ✅ **Lowest transaction fees** (1-2% vs 2.9%+)
- ✅ **Global availability** (233 countries)
- ✅ No monthly fees
- ✅ Auto-convert crypto to fiat (avoid volatility)
- ✅ Native Beds24 integration
- ✅ Supports 16+ cryptocurrencies
- ✅ Settlement in USD, EUR, GBP

**Cons:**

- ❌ **Cryptocurrency only** - most guests don't use crypto
- ❌ Very low adoption for hospitality bookings (<1% of guests)
- ❌ Perceived as complex/risky by mainstream customers
- ❌ Volatility risk if not auto-converting to fiat
- ❌ May deter traditional bookers
- ❌ Limited to USD/EUR/GBP settlement (not IDR)

**Best For:** Tech-forward businesses targeting crypto-native customers (unlikely for surf camp)

---

### 5. Borgun (Iceland/Europe)

**Countries Supported:**

- Iceland, United Kingdom, Hungary, Czechia, Germany, Denmark, Sweden
- ❌ **NOT available in Indonesia**
- ❌ **NOT available in South Africa**

**Setup Requirements:**

- Business entity in supported European country
- European bank account

**Fees:**

- **Transaction fees:** 1.4-2% (estimated range)
- **Specific pricing:** Contact Borgun for quote
- **No setup fees for SMEs** (stated policy)

**Setup Cost:**

- $0 setup fees for small businesses
- Monthly fees unknown (contact for quote)

**How Business Owner Gets Paid:**

- Direct deposit to European bank account
- Next-day settlement (in supported countries)
- Supports EUR, GBP, ISK, USD, and others

**Effort to Integrate:**

- ✅ **Easy** - Native Beds24 integration
- 2-3 hours setup time

**Pros:**

- ✅ **Low transaction fees** (1.4-2%)
- ✅ Next-day settlement
- ✅ No setup fees for SMEs
- ✅ Native Beds24 integration
- ✅ Supports major card networks (Visa, Mastercard, Amex, UnionPay, JCB)

**Cons:**

- ❌ **Limited to Iceland/Europe**
- ❌ **NOT available in Indonesia or South Africa**
- ❌ Must have European business entity
- ❌ Limited documentation in English

**Best For:** European hospitality businesses, particularly in Nordic region

---

### 6. Global Payments

**Countries Supported:**

- 100+ countries globally
- Processes 130+ currencies
- ⚠️ **Indonesia availability unknown** (must contact sales)

**Setup Requirements:**

- Business verification (country requirements vary)
- Merchant account setup

**Fees:**

- **Pricing model:** Bespoke/custom (based on volume and business type)
- **Options:** Blended pricing, PAYG, IC+/IC++
- **Specific rates:** NOT publicly disclosed
- **New fees added in 2025:** Infrastructure fee (~$450), increased discount rates

**Setup Cost:**

- **Unknown** - must contact Global Payments for quote
- Recent reports of hidden fees and surprise charges

**How Business Owner Gets Paid:**

- Direct settlement to merchant bank account
- Next-day settlement available
- Supports 130+ currencies

**Effort to Integrate:**

- ✅ **Easy** - Native Beds24 integration
- 2-4 hours setup time
- API available for custom integration

**Pros:**

- ✅ **Wide global coverage** (100+ countries)
- ✅ 130+ currencies supported
- ✅ Native Beds24 integration
- ✅ Next-day settlement available
- ✅ Major card networks supported

**Cons:**

- ❌ **Completely opaque pricing** (no transparency)
- ❌ **Hidden fees** reported by merchants (2025)
- ❌ **Recent fee increases** (August, September, October 2025)
- ❌ **New infrastructure fees** (~$450 added in 2025)
- ❌ Must contact sales for quote
- ❌ Likely higher fees than competitors
- ❌ Indonesia support unclear

**Best For:** Large enterprises with negotiating power for volume discounts

---

### 7. Midtrans (Indonesian Gateway - Custom Integration)

**Countries Supported:**

- **Primary:** Indonesia
- **Card acceptance:** Global (accepts international Visa, Mastercard, Amex, JCB from any country)

**Setup Requirements:**

- Indonesian business entity (or individual doing business in Indonesia)
- Indonesian bank account
- KYB verification

**Fees:**

- **Credit/Debit cards (Visa, Mastercard):** 2.9% (MDR)
- **JCB, Amex:** Higher rates (contact for quote)
- **No setup fees**
- **No monthly fees**
- **No maintenance fees**
- Fees do NOT include VAT (11% Indonesian VAT)

**Setup Cost:**

- **$0** - No setup, monthly, or maintenance fees
- Only pay per successful transaction

**How Business Owner Gets Paid:**

- Direct settlement to Indonesian bank account
- **Currency:** IDR (Indonesian Rupiah)
- **Settlement time:** 2-7 business days
- **Minimum settlement:** Varies by bank

**Effort to Integrate:**

- ⚠️ **Moderate** - Requires custom gateway integration via Beds24
- **Beds24 Custom Gateway fields needed:**
  - URL: Midtrans payment endpoint
  - POST data: Booking variables mapped to Midtrans API
  - Key: Midtrans API key (server key)
  - Title: "Pay with Credit/Debit Card (Midtrans)"
- **Estimated setup time:** 4-8 hours (custom integration + testing)
- **Technical requirements:** Understanding of REST API, POST requests, webhook configuration

**Pros:**

- ✅ **Designed for Indonesian businesses** (native support)
- ✅ **Accepts international cards** (Visa, MC, Amex, JCB from any country)
- ✅ **No setup or monthly fees** (pay only per transaction)
- ✅ **Lowest cost for Indonesian operations** (2.9% flat)
- ✅ **Native IDR settlement** (no currency conversion)
- ✅ **3D Secure authentication** (fraud protection)
- ✅ Supports installment payments (for Indonesian cards)
- ✅ Two-click and one-click payment options
- ✅ Mobile-optimized payment pages
- ✅ Comprehensive API documentation

**Cons:**

- ❌ **No native Beds24 plugin** (requires custom gateway setup)
- ❌ Requires custom integration work (4-8 hours)
- ❌ Must maintain Indonesian business entity
- ❌ VAT not included in 2.9% rate (adds 11%)
- ❌ Settlement only to Indonesian bank accounts
- ❌ Customer support primarily in Indonesian/English (may be slower)

**Best For:** Indonesian businesses accepting both local and international guests - **PERFECT for Sumba Sunset**

---

### 8. Xendit (Indonesian Gateway - Custom Integration)

**Countries Supported:**

- Indonesia, Philippines, Malaysia, Thailand, Vietnam
- **Card acceptance:** Global (accepts international cards from any country)

**Setup Requirements:**

- Indonesian business entity or individual
- Indonesian bank account
- KYB verification

**Fees:**

- **Pricing:** Varies by payment method, volume, and country
- **Credit/Debit cards:** Estimated 2.5-3% (not publicly disclosed)
- **No setup fees**
- **No monthly fees**
- **No maintenance fees**
- **No withdrawal fees**

**Setup Cost:**

- **$0** - No setup, monthly, maintenance, or termination fees
- Only pay per successful transaction

**How Business Owner Gets Paid:**

- Direct settlement to Indonesian bank account
- **Currency:** IDR (Indonesian Rupiah)
- **Settlement time:** 1-3 business days (faster than Midtrans)
- **No minimum settlement amount**

**Effort to Integrate:**

- ⚠️ **Moderate** - Requires custom gateway integration via Beds24
- Similar setup process to Midtrans (custom gateway)
- **Estimated setup time:** 4-8 hours (custom integration + testing)
- Comprehensive API documentation available

**Pros:**

- ✅ **Designed for Indonesian businesses**
- ✅ **Accepts international cards** (Visa, MC, Amex, JCB)
- ✅ **No fees except per-transaction** (no setup/monthly/withdrawal)
- ✅ **Faster settlement** than Midtrans (1-3 days vs 2-7 days)
- ✅ **Native IDR settlement**
- ✅ **USD charging available** (cards charged in USD, settled in IDR)
- ✅ Well-documented API
- ✅ Modern developer experience (similar to Stripe)
- ✅ Virtual accounts, e-wallets, bank transfers supported

**Cons:**

- ❌ **No native Beds24 plugin** (requires custom gateway setup)
- ❌ **Opaque pricing** (must contact for exact rates)
- ❌ Requires custom integration work (4-8 hours)
- ❌ Must maintain Indonesian business entity
- ❌ Settlement only to Indonesian bank accounts

**Best For:** Indonesian businesses wanting faster settlement and modern developer experience - **ALTERNATIVE to Midtrans**

---

## Custom Gateway Integration (Beds24)

**What is it?**
Beds24 allows you to integrate ANY payment gateway (including Midtrans, Xendit, or others) by configuring four fields:

1. **URL:** Payment gateway endpoint (e.g., `https://app.midtrans.com/snap/v1/transactions`)
2. **POST data:** Booking variables sent to gateway (e.g., `amount=[PAYMENTAMOUNT]&bookingId=[BOOKID]&currency=IDR`)
3. **Key:** Your payment gateway API key (secret server key)
4. **Title:** Display name for payment button (e.g., "Pay with Credit/Debit Card")

**How it works:**

1. Guest clicks "Pay" button in Beds24 booking widget
2. Beds24 POSTs booking data to your payment gateway URL
3. Payment gateway processes payment and redirects guest to confirmation
4. Gateway sends webhook notification to Beds24 (payment success/failure)
5. Beds24 updates booking status and sends confirmation email

**Complexity:**

- ⚠️ **Moderate technical effort** (4-8 hours setup + testing)
- Requires understanding of REST APIs, POST requests, and webhooks
- Must configure payment gateway to send success notifications back to Beds24
- Must test end-to-end booking flow thoroughly

**Benefits:**

- ✅ Allows use of Indonesian gateways (Midtrans, Xendit)
- ✅ No middleman fees (direct integration)
- ✅ Full control over payment flow
- ✅ Can customize payment page appearance

---

## Comparative Analysis

### Cost Comparison (Annual - Estimated)

Assuming **$20,000 USD annual booking revenue** (modest surf camp estimate):

| Gateway               | Setup   | Monthly | Transaction Fees (2.9% avg) | Annual Total      | Notes                        |
| --------------------- | ------- | ------- | --------------------------- | ----------------- | ---------------------------- |
| **Midtrans**          | $0      | $0      | $580                        | **$580**          | Lowest cost ✅               |
| **Xendit**            | $0      | $0      | $580                        | **$580**          | Lowest cost ✅               |
| **Stripe (no Atlas)** | N/A     | $0      | N/A                         | **Not available** | ❌                           |
| **Stripe (Atlas)**    | $500    | $0      | $1,080 (5.4% intl)          | **$1,955**        | + $175 franchise tax         |
| **Authorize.net**     | $0      | $300    | $580                        | **$880**          | + daily batch fees           |
| **AsiaPay**           | Unknown | Unknown | ~$600                       | **$1,200+**       | Estimated (opaque)           |
| **Global Payments**   | Unknown | Unknown | ~$600                       | **$1,500+**       | Estimated (opaque)           |
| **BitPay**            | $0      | $0      | $400 (2%)                   | **$400**          | Only if guests pay crypto ⚠️ |

**Winner: Midtrans or Xendit** (tie at $580/year)

---

### Ease of Setup Ranking

1. **Stripe** - ⭐⭐⭐⭐⭐ Native Beds24, click to connect (but requires Atlas $$)
2. **Authorize.net** - ⭐⭐⭐⭐⭐ Native Beds24, click to connect (but not available in Indonesia)
3. **AsiaPay** - ⭐⭐⭐⭐ Native Beds24, account approval + setup (2-4 hours)
4. **Global Payments** - ⭐⭐⭐⭐ Native Beds24, account approval + setup (2-4 hours)
5. **BitPay** - ⭐⭐⭐⭐ Native Beds24, crypto wallet setup (2-3 hours)
6. **Borgun** - ⭐⭐⭐⭐ Native Beds24 (but not available in Indonesia)
7. **Midtrans** - ⭐⭐⭐ Custom gateway integration required (4-8 hours)
8. **Xendit** - ⭐⭐⭐ Custom gateway integration required (4-8 hours)

---

### Best for Sumba Sunset (Indonesia)

**Criteria:**

- ✅ Must accept international credit cards (surfers from USA, Australia, Europe)
- ✅ Must support Indonesian business entity
- ✅ Lowest setup + ongoing costs
- ✅ Direct IDR settlement to Indonesian bank account
- ✅ Reasonable transaction fees (2-3%)

**Ranking for Sumba Sunset:**

1. **🥇 Midtrans** - Best overall (low cost, Indonesian native, accepts international cards)
2. **🥈 Xendit** - Close second (faster settlement, similar cost, modern API)
3. **🥉 AsiaPay** - Distant third (native Beds24 plugin but opaque pricing + fees)
4. ❌ **Stripe** - Too expensive ($500 Atlas + ongoing fees + 5.4% intl fees)
5. ❌ **Others** - Not available in Indonesia or too expensive

---

## Final Recommendation

### 🎯 Recommended Solution: Midtrans (via Custom Gateway)

**Why Midtrans:**

1. **Lowest total cost:** $0 setup + $0 monthly + 2.9% transaction fee = **$580/year** for $20k revenue
2. **Indonesian native:** Designed for Indonesian businesses, native IDR settlement
3. **International card support:** Accepts Visa, Mastercard, Amex, JCB from any country
4. **3D Secure:** Built-in fraud protection for card payments
5. **Mobile-optimized:** Payment pages work well on mobile devices (critical for surf camp guests)

**Trade-off:**

- ⚠️ Requires custom gateway integration (4-8 hours setup time)
- ⚠️ Not a native Beds24 plugin (but Beds24 supports custom gateways)

**Implementation Steps:**

1. Create Midtrans account at https://midtrans.com
2. Complete KYB verification (Indonesian business entity)
3. Obtain Midtrans API keys (Server Key + Client Key)
4. Configure Beds24 Custom Gateway:
   - URL: `https://app.midtrans.com/snap/v1/transactions`
   - POST data: Map Beds24 variables to Midtrans API format
   - Key: Midtrans Server Key
   - Title: "Pay with Credit/Debit Card"
5. Configure Midtrans webhook to notify Beds24 on payment success
6. Test end-to-end booking flow with test credit card
7. Go live

---

### 🥈 Alternative Solution: Xendit (via Custom Gateway)

**If Midtrans integration is too complex or you want faster settlement:**

- Same cost structure ($0 setup + $0 monthly + ~2.9% transaction)
- Faster settlement (1-3 days vs 2-7 days)
- Modern developer experience (API similar to Stripe)
- Same custom gateway setup required

---

### ❌ NOT Recommended: Stripe (via Atlas)

**Why NOT Stripe:**

- $500 upfront cost + $175/year franchise tax + $100/year registered agent = **$775 first year, $275/year ongoing**
- 5.4% total fees for international cards (vs 2.9% for Midtrans)
- Must maintain US entity (tax filings, compliance burden)
- Currency conversion fees (USD → IDR)

**When Stripe WOULD make sense:**

- If you're already processing $50k+/month (high volume justifies Atlas cost)
- If you need to scale to multiple countries quickly
- If majority of guests are US-based (domestic Stripe fees are lower)

---

## Next Steps

### If Choosing Midtrans:

1. **Pause Stripe account creation** ✅ (already done)
2. **Create Midtrans account:**
   - Visit: https://midtrans.com
   - Sign up with Indonesian business details
   - Submit KYB verification documents
   - Wait for account approval (1-3 business days)
3. **Update SS-11 planning document:**
   - Change Phase 4 "Payment Gateway Setup" from Stripe to Midtrans
   - Add custom gateway integration steps
   - Update acceptance criteria
4. **Research custom gateway integration:**
   - Read Beds24 Custom Gateway wiki: https://wiki.beds24.com/index.php/Custom_Gateway
   - Read Midtrans API docs: https://docs.midtrans.com
   - Plan integration workflow
5. **Implement and test:**
   - Configure custom gateway in Beds24
   - Test with Midtrans sandbox (test credit cards)
   - Verify webhook notifications work
   - Test end-to-end booking flow
   - Go live

---

## Questions to Ask Property Owner

Before finalizing payment gateway choice:

1. **Do you have an Indonesian business entity?**
   - If yes → Midtrans/Xendit/AsiaPay viable
   - If no → Must use Stripe Atlas or incorporate in Indonesia first

2. **Do you have an Indonesian bank account for the business?**
   - Required for Midtrans, Xendit, AsiaPay settlement

3. **What percentage of guests will be international vs Indonesian?**
   - High international → Prioritize international card support (all options have this)
   - High local → Indonesian gateway better (Midtrans/Xendit)

4. **What's your technical comfort level?**
   - Comfortable with custom integration → Midtrans/Xendit (best value)
   - Want plug-and-play → AsiaPay (but higher cost)

5. **What's your budget for payment processing setup?**
   - $0 budget → Midtrans/Xendit only option
   - $500+ budget → Could consider Stripe Atlas (but not recommended)

6. **How important is fast settlement?**
   - Very important → Xendit (1-3 days)
   - Can wait → Midtrans (2-7 days)

---

## References

- Beds24 Custom Gateway Wiki: https://wiki.beds24.com/index.php/Custom_Gateway
- Midtrans Documentation: https://docs.midtrans.com
- Midtrans Pricing: https://midtrans.com/pricing
- Xendit Pricing: https://www.xendit.co/en-id/pricing/
- Stripe Atlas Pricing: https://stripe.com/atlas
- AsiaPay (PayDollar): https://www.paydollar.com

---

**Last Updated:** 2025-01-18
**Next Review:** After property owner provides business entity details
