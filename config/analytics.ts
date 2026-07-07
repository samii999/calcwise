interface AnalyticsConfig {
  googleAnalyticsId: string
  enabled: boolean
  debugMode: boolean
}

export const analyticsConfig: AnalyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  enabled: process.env.NODE_ENV === 'production',
  debugMode: process.env.NODE_ENV === 'development',
}

// Analytics Events
export const ANALYTICS_EVENTS = {
  // Calculator Events
  CALCULATOR_VIEW: 'calculator_view',
  CALCULATOR_CALCULATE: 'calculator_calculate',
  CALCULATOR_EXPORT: 'calculator_export',
  
  // User Actions
  SEARCH: 'search',
  NAVIGATION: 'navigation',
  
  // Conversions
  ADSENSE_CLICK: 'adsense_click',
  SHARE: 'share',
} as const

export type AnalyticsEvent = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]

// Analytics Helper Functions
export function trackEvent(event: AnalyticsEvent, data?: Record<string, any>) {
  if (typeof window === 'undefined' || !analyticsConfig.enabled) return
  
  try {
    // @ts-ignore - gtag is loaded by Google Analytics
    if (window.gtag) {
      // @ts-ignore
      window.gtag('event', event, data)
    }
  } catch (error) {
    console.error('Analytics error:', error)
  }
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !analyticsConfig.enabled) return
  
  try {
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag('config', analyticsConfig.googleAnalyticsId, {
        page_path: url,
      })
    }
  } catch (error) {
    console.error('Analytics error:', error)
  }
}