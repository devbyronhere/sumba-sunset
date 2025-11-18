/**
 * Analytics utilities for tracking custom events in Google Analytics 4
 *
 * This module provides helper functions for tracking user interactions and
 * custom events throughout the application.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a custom event in Google Analytics
 *
 * @param action - The event action (e.g., 'click', 'submit', 'view')
 * @param category - The event category (e.g., 'booking', 'contact_form', 'navigation')
 * @param label - Optional label for additional context
 * @param value - Optional numeric value associated with the event
 *
 * @example
 * ```typescript
 * // Track booking widget open
 * trackEvent('click', 'booking', 'widget_open');
 *
 * // Track contact form submission
 * trackEvent('submit', 'contact_form', 'whatsapp');
 *
 * // Track navigation with value
 * trackEvent('navigate', 'menu', 'mobile_menu', 1);
 * ```
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  // Only track in browser environment
  if (typeof window === 'undefined') {
    return;
  }

  // Only track if gtag is available
  if (typeof window.gtag !== 'function') {
    return;
  }

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (error) {
    // Silently fail - don't disrupt user experience if tracking fails
    console.error('Analytics tracking error:', error);
  }
};

/**
 * Track page view (automatically handled by GA4, but useful for SPAs)
 *
 * @param pagePath - The page path to track
 * @param pageTitle - Optional page title
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  try {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  } catch (error) {
    console.error('Analytics page view error:', error);
  }
};

/**
 * Predefined event types for common tracking scenarios
 */
export const AnalyticsEvents = {
  // Booking related events
  BOOKING_WIDGET_OPEN: () => trackEvent('click', 'booking', 'widget_open'),
  BOOKING_WIDGET_CLOSE: () => trackEvent('click', 'booking', 'widget_close'),
  BOOKING_STARTED: () => trackEvent('engage', 'booking', 'booking_started'),
  BOOKING_COMPLETED: (value?: number) =>
    trackEvent('conversion', 'booking', 'booking_completed', value),

  // Contact related events
  CONTACT_FORM_SUBMIT: () =>
    trackEvent('submit', 'contact_form', 'form_submitted'),
  WHATSAPP_CLICK: () => trackEvent('click', 'contact', 'whatsapp_click'),
  PHONE_CLICK: () => trackEvent('click', 'contact', 'phone_click'),

  // Navigation related events
  MOBILE_MENU_OPEN: () => trackEvent('click', 'navigation', 'mobile_menu_open'),
  MOBILE_MENU_CLOSE: () =>
    trackEvent('click', 'navigation', 'mobile_menu_close'),

  // Gallery related events
  GALLERY_VIEW: () => trackEvent('view', 'media', 'gallery_view'),
  IMAGE_EXPAND: () => trackEvent('click', 'media', 'image_expand'),

  // Social media events
  SOCIAL_MEDIA_CLICK: (platform: string) =>
    trackEvent('click', 'social_media', platform),
} as const;
