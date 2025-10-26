export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

export const createMockBooking = (overrides = {}) => ({
  id: '1',
  checkIn: '2025-06-01',
  checkOut: '2025-06-07',
  guests: 2,
  ...overrides,
});
