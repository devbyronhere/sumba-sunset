---
task_id: ss-16
title: '[Infrastructure] Add Real Room Info to Beds24'
status: not_started
priority: medium
estimated_time: '2-3 hours'
actual_time: null
dependencies: [ss-11]
created: 2025-01-20
started: null
completed: null
related_docs: ['ss-11-beds24-account-setup.md']
branch: ss-16/infra/real-room-info
pr_number: null
---

[← Previous: SS-15 Widget CSS](./ss-15-widget-customization.md) | [📋 Index](./index.md) | [Next: SS-17 Contact Form →](./ss-17-contact-form.md)

# [Infrastructure] Add Real Room Info to Beds24

## Overview

Replace mock/test room data in Beds24 with actual room details provided by the property owner. This includes real room names, capacities, amenities, pricing in IDR, and photos.

**Project Context:**
SS-11 set up Beds24 with 2 test rooms using placeholder data. Once the property owner provides real information, this task updates the Beds24 configuration with accurate room details.

**User Story:**
As a property owner, I need the booking system to reflect my actual rooms, pricing, and amenities so that guests see accurate information and can book the right accommodation.

**Business Value:**

- Accurate room inventory for bookings
- Real pricing in IDR reflects actual costs
- Professional photos showcase property
- Complete amenity information builds trust

---

## Prerequisites/Dependencies

- [x] SS-11: Beds24 account setup (with test rooms)
- [ ] Property owner provides real room details
- [ ] Property owner provides real pricing in IDR
- [ ] Property owner provides room photos
- [ ] Property owner provides amenities list

---

## Acceptance Criteria

- [ ] **AC1**: All test rooms removed from Beds24
- [ ] **AC2**: Real room types added with accurate names
- [ ] **AC3**: Real capacity (max guests, adults, children) configured
- [ ] **AC4**: Real bed configurations set (double, single, bunk, etc.)
- [ ] **AC5**: Real room amenities added (AC, private bathroom, ocean view, etc.)
- [ ] **AC6**: Real pricing in IDR configured for each room
- [ ] **AC7**: Real room photos uploaded (2-3 per room minimum)
- [ ] **AC8**: Property-level amenities updated (WiFi, parking, kitchen, etc.)
- [ ] **AC9**: Real house rules added (check-in/out times, quiet hours, etc.)
- [ ] **AC10**: Test booking with real rooms works end-to-end

---

## Information Needed from Property Owner

Before starting this task, the property owner must provide:

### Room Details (For Each Room Type)

- **Room Name**: (e.g., "Deluxe Ocean View", "Standard Garden Room", "Shared Dorm")
- **Room Type**: Private room, Shared room, Dorm bed
- **Quantity**: How many of this room type? (e.g., 2 Ocean View rooms)
- **Capacity**:
  - Max guests total: \_\_\_
  - Max adults: \_\_\_
  - Max children: \_\_\_
- **Bed Configuration**:
  - 1 Double bed
  - 2 Single beds
  - 4 Bunk beds (2 bunk frames)
  - Other: \***\*\_\_\_\*\***
- **Room Size**: \_\_\_ square meters (optional)
- **Room Amenities** (check all that apply):
  - [ ] Private bathroom
  - [ ] Shared bathroom
  - [ ] Air conditioning
  - [ ] Fan only
  - [ ] Ocean view
  - [ ] Garden view
  - [ ] Balcony/terrace
  - [ ] Desk
  - [ ] Storage/closet
  - [ ] Mosquito net
  - [ ] Other: \***\*\_\_\_\*\***

### Pricing (in IDR)

- **Room Type 1**: Rp **\_\_\_** per night
- **Room Type 2**: Rp **\_\_\_** per night
- **Room Type 3**: Rp **\_\_\_** per night
- (Add more as needed)

### Photos

- **Property Hero Shot**: Main exterior/beach/sunset photo
- **Room Type 1 Photos**: 2-3 photos showing room, bed, amenities
- **Room Type 2 Photos**: 2-3 photos
- **Room Type 3 Photos**: 2-3 photos
- **Common Areas**: Lounge, dining, outdoor spaces
- **Facilities**: Kitchen, bathrooms, surf storage

**Photo Guidelines:**

- High resolution (at least 1920x1080)
- Horizontal orientation (landscape)
- Well-lit (natural light preferred)
- Clean, decluttered spaces
- Show actual property (no stock photos)

### Property-Level Details

- **Property Amenities** (check all that apply):
  - [ ] WiFi
  - [ ] Free parking
  - [ ] Outdoor space/garden
  - [ ] Communal kitchen
  - [ ] Laundry facilities
  - [ ] Surf equipment storage
  - [ ] Board rental available
  - [ ] Breakfast included
  - [ ] Beach access
  - [ ] Other: \***\*\_\_\_\*\***

- **House Rules**:
  - Check-in time: **\_** (e.g., 2:00 PM)
  - Check-out time: **\_** (e.g., 11:00 AM)
  - Quiet hours: **\_** (e.g., 10:00 PM - 7:00 AM)
  - Smoking policy: \***\*\_\_\_\*\***
  - Other rules: \***\*\_\_\_\*\***

---

## Implementation Steps

### Phase 1: Gather Information (USER)

- [ ] **Step 1.1**: Request room details from property owner
  - Send questionnaire above
  - Request room names, capacities, bed configs
  - Request amenities lists

- [ ] **Step 1.2**: Request pricing in IDR
  - Ask for price per night for each room type
  - Confirm if pricing is fixed or seasonal

- [ ] **Step 1.3**: Request and collect photos
  - Ask for high-res photos of each room type
  - Request property exterior and common area photos
  - Verify photos meet quality guidelines

- [ ] **Step 1.4**: Request property amenities and house rules
  - Get complete amenities list
  - Confirm check-in/out times
  - Confirm house rules

**Checkpoint:** All real information collected from property owner

---

### Phase 2: Remove Test Rooms (USER - 15 minutes)

- [ ] **Step 2.1**: Log into Beds24 dashboard
- [ ] **Step 2.2**: Navigate to Property → Rooms
- [ ] **Step 2.3**: Delete or deactivate all test rooms
  - Ensure no active bookings on test rooms first
- [ ] **Step 2.4**: Verify test rooms removed

**Checkpoint:** Clean slate for real rooms

---

### Phase 3: Add Real Rooms (USER - 1-2 hours)

For each real room type provided by property owner:

- [ ] **Step 3.1**: Add Room Type 1
  - Navigate to: Property → Rooms → Add Room
  - **Room Name**: [From property owner]
  - **Room Type**: [Private/Shared/Dorm]
  - **Quantity**: [Number of this room type]
  - **Max Guests**: [Total capacity]
  - **Max Adults**: [Adult capacity]
  - **Max Children**: [Child capacity]
  - **Bed Configuration**: [Beds from property owner]
  - **Room Size**: [Square meters]
  - **Amenities**: Check all that apply from property owner's list
  - **Pricing**: Rp **\_\_\_** per night (in IDR)

- [ ] **Step 3.2**: Upload Room Type 1 photos
  - Upload 2-3 photos for this room
  - Set primary photo (best angle)
  - Add photo captions/descriptions

- [ ] **Step 3.3**: Add Room Type 2 (if applicable)
  - Repeat Step 3.1 with Room Type 2 details
  - Upload Room Type 2 photos

- [ ] **Step 3.4**: Add Room Type 3 (if applicable)
  - Repeat Step 3.1 with Room Type 3 details
  - Upload Room Type 3 photos

- [ ] **Step 3.5**: Add more room types as needed

**Checkpoint:** All real room types added with accurate details

---

### Phase 4: Update Property Details (USER - 30 minutes)

- [ ] **Step 4.1**: Update property photos
  - Navigate to: Property → Photos
  - Upload property hero shot
  - Upload common area photos
  - Upload facility photos
  - Reorder photos (best first)

- [ ] **Step 4.2**: Update property description
  - Navigate to: Property → Description
  - Write guest-facing description (or use property owner's copy)
  - Include location, vibe, nearby surf breaks
  - Mention key amenities

- [ ] **Step 4.3**: Update property-level amenities
  - Navigate to: Property → Amenities
  - Check all amenities from property owner's list
  - WiFi, parking, kitchen, laundry, surf storage, etc.

- [ ] **Step 4.4**: Update house rules
  - Navigate to: Property → House Rules
  - Set real check-in time
  - Set real check-out time
  - Add quiet hours
  - Add smoking policy
  - Add other rules

**Checkpoint:** Property details fully updated with real information

---

### Phase 5: Update Pricing (USER - 30 minutes)

- [ ] **Step 5.1**: Navigate to Property → Prices
- [ ] **Step 5.2**: Set base rates for each real room type
  - Room Type 1: Rp **\_\_\_** per night
  - Room Type 2: Rp **\_\_\_** per night
  - Room Type 3: Rp **\_\_\_** per night
- [ ] **Step 5.3**: Set date range: Next 12 months
- [ ] **Step 5.4**: Verify currency is IDR
- [ ] **Step 5.5**: Save pricing changes

**Checkpoint:** Real pricing configured in IDR

---

### Phase 6: Testing & Verification (USER - 30 minutes)

- [ ] **Step 6.1**: Test booking flow with real rooms
  - Navigate to booking widget preview
  - Select dates
  - Verify real room names appear
  - Verify real pricing in IDR displays correctly
  - Select a real room
  - Complete test booking

- [ ] **Step 6.2**: Verify confirmation email
  - Check email shows real room name
  - Check pricing in IDR is correct
  - Check property details are accurate

- [ ] **Step 6.3**: Verify widget displays correctly
  - Test on test page
  - Verify room photos load
  - Verify amenities display
  - Verify pricing in IDR

- [ ] **Step 6.4**: Test on mobile device
  - Open widget on actual phone
  - Test booking flow
  - Verify photos and details legible

**Checkpoint:** All real room info working correctly

---

## Quality Gates Checklist

- [ ] All test rooms removed
- [ ] All real rooms added with accurate details
- [ ] Real pricing in IDR configured
- [ ] Real room photos uploaded
- [ ] Property photos updated
- [ ] Property amenities updated
- [ ] House rules updated
- [ ] Test booking with real room successful
- [ ] Confirmation email accurate
- [ ] Widget displays real rooms correctly
- [ ] Mobile experience acceptable
- [ ] No test data remaining in Beds24

---

## Post-Implementation Verification

### Manual Testing Steps (USER REQUIRED)

1. **Booking Widget Test**
   - [ ] Open widget on test page
   - [ ] Verify only real rooms appear (no test rooms)
   - [ ] Verify real room names accurate
   - [ ] Verify pricing in IDR correct
   - [ ] Verify photos display

2. **End-to-End Booking Test**
   - [ ] Select dates
   - [ ] Select a real room
   - [ ] Fill in guest details
   - [ ] Complete test booking
   - [ ] Verify confirmation email shows real room info

3. **Dashboard Verification**
   - [ ] Log into Beds24
   - [ ] Check calendar shows real rooms
   - [ ] Verify pricing calendar correct
   - [ ] Check no test rooms remain

4. **Mobile Testing**
   - [ ] Test widget on iPhone
   - [ ] Test widget on Android
   - [ ] Verify photos load quickly
   - [ ] Verify text is readable

---

## Rollback Plan

If real room data has issues:

1. **Revert to test rooms temporarily**
2. **Fix room data in Beds24**
3. **Re-test booking flow**
4. **Verify all corrections**

**Rollback Risk:** Low (pure configuration, no code changes)
**Rollback Time:** 30 minutes

---

## Documentation Updates

Files that need updating after this task:

- [ ] `.claude/planning/ss-11-beds24-account-setup.md` - Update status to "Real room info added"
- [ ] `.claude/planning/index.md` - Mark SS-16 as complete
- [ ] This file - Add retrospective notes

---

## Related Tasks

**Depends On:**

- [SS-11: Beds24 Account Setup](./ss-11-beds24-account-setup.md) - Beds24 configured with test rooms

**Blocks:**

- [SS-28: Rooms & Accommodation Page](./ss-28-rooms-page.md) - Needs real room info for display
- Future marketing pages - Need accurate room details

**Related:**

- [SS-12: Beds24 Widget Integration](./ss-12-beds24-widget-integration.md) - Widget will show real rooms
- [SS-15: Widget CSS Customization](./ss-15-widget-customization.md) - Styling for real room display

---

## Notes

### Important Reminders

1. **Backup First**: Take screenshots of current test setup before removing
2. **No Active Bookings**: Ensure test rooms have no active bookings before deletion
3. **Photo Quality**: Ensure property owner provides high-res photos
4. **IDR Pricing**: All pricing must be in Indonesian Rupiah
5. **Test Thoroughly**: Complete end-to-end test booking after changes

### Common Issues

**Issue:** Photos too large (slow loading)
**Solution:** Resize to max 1920x1080 before upload

**Issue:** Pricing displays wrong currency
**Solution:** Verify property currency setting is IDR, not USD

**Issue:** Room not available in widget
**Solution:** Check room quantity > 0 and dates not blocked

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

### Time Spent Breakdown

- Information gathering: \_\_\_ hours
- Remove test rooms: \_\_\_ hours
- Add real rooms: \_\_\_ hours
- Update property details: \_\_\_ hours
- Testing: \_\_\_ hours
- **Total: \_\_\_ hours** (vs. estimated 2-3 hours)

---

**Completion Date:** YYYY-MM-DD
**Actual Time Spent:** \_\_\_ hours
**Final Status:** ⏸️ Not Started (Waiting for property owner info)
