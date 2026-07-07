'use client'

import { useEffect, useRef, useState } from 'react'

interface AdUnitProps {
  slot?: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  style?: React.CSSProperties
  className?: string
  layout?: string
  layoutKey?: string
  refreshOnRouteChange?: boolean
}

export function AdUnit({
  slot,
  format = 'auto',
  style,
  className = '',
  layout,
  layoutKey,
  refreshOnRouteChange = false,
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isAdLoaded = useRef(false)
  const [hasError, setHasError] = useState(false)
  const retryCount = useRef(0)
  const maxRetries = 3
  const [isVisible, setIsVisible] = useState(false)

  // Function to load ad
  const loadAd = () => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // ✅ Check if container has width
    if (adRef.current) {
      const rect = adRef.current.getBoundingClientRect()
      if (rect.width === 0) {
        // Container not visible yet, retry later
        setTimeout(loadAd, 300)
        return
      }
    }

    // Check if ad already exists in this container
    if (adRef.current) {
      const existingIns = adRef.current.querySelector('ins.adsbygoogle')
      if (existingIns && existingIns.getAttribute('data-ad-status') === 'filled') {
        return
      }
    }

    // Check if AdSense is loaded
    try {
      // @ts-ignore
      if (window.adsbygoogle && !isAdLoaded.current) {
        // @ts-ignore
        window.adsbygoogle.push({})
        isAdLoaded.current = true
        setHasError(false)
        retryCount.current = 0
      }
    } catch (error) {
      // Ignore "already have ads" error
      if (error instanceof Error && !error.message.includes('already have ads')) {
        console.error('AdSense error:', error)
        setHasError(true)
      }
    }
  }

  // Load ad on mount with delay
  useEffect(() => {
    // ✅ Wait for DOM to render
    const timer = setTimeout(() => {
      setIsVisible(true)
      loadAd()
    }, 500)

    return () => {
      clearTimeout(timer)
      isAdLoaded.current = false
    }
  }, [])

  // Refresh ad on route change if enabled
  useEffect(() => {
    if (refreshOnRouteChange) {
      isAdLoaded.current = false
      const timer = setTimeout(() => {
        loadAd()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [refreshOnRouteChange])

  // Retry loading if ad failed (with max retries)
  useEffect(() => {
    if (hasError && retryCount.current < maxRetries) {
      const timer = setTimeout(() => {
        retryCount.current += 1
        setHasError(false)
        loadAd()
      }, 3000 * retryCount.current)
      return () => clearTimeout(timer)
    }
  }, [hasError])

  // No AdSense ID configured
  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{
          minHeight: '90px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#94a3b8',
          border: '1px dashed #e2e8f0',
          ...style,
        }}
      >
        <span>📢 Ad Space</span>
      </div>
    )
  }

  // ✅ Show placeholder until visible
  if (!isVisible) {
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{
          minHeight: '90px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          ...style,
        }}
      />
    )
  }

  return (
    <div
      ref={adRef}
      className={`ad-unit ${className}`}
      style={{
        minHeight: '90px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: '90px',
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
      />
    </div>
  )
}

// ===== Pre-configured Ad Placements =====

export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <AdUnit 
      format="horizontal" 
      slot="banner-ad-slot" 
      className={className}
      style={{ maxWidth: '728px', margin: '0 auto' }}
    />
  )
}

export function AdRectangle({ className = '' }: { className?: string }) {
  return (
    <AdUnit 
      format="rectangle" 
      slot="rectangle-ad-slot" 
      className={className}
      style={{ maxWidth: '336px', margin: '0 auto' }}
    />
  )
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <AdUnit
      format="vertical"
      slot="sidebar-ad-slot"
      className={className}
      style={{ 
        minHeight: '250px', 
        minWidth: '160px', 
        maxWidth: '300px',
        position: 'sticky', 
        top: '100px',
        margin: '0 auto',
      }}
    />
  )
}

export function AdInArticle({ className = '' }: { className?: string }) {
  return (
    <AdUnit 
      format="rectangle" 
      slot="in-article-ad-slot" 
      className={className}
      style={{ margin: '20px auto' }}
    />
  )
}

export function AdResponsive({ className = '' }: { className?: string }) {
  return (
    <AdUnit 
      format="auto" 
      slot="responsive-ad-slot" 
      className={className}
    />
  )
}

export function AdFooter({ className = '' }: { className?: string }) {
  return (
    <AdUnit 
      format="horizontal" 
      slot="footer-ad-slot" 
      className={className}
      style={{ maxWidth: '728px', margin: '0 auto' }}
    />
  )
}