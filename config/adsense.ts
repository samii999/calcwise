import { CSSProperties } from 'react'

interface AdSenseConfig {
  publisherId: string
  adSlots: {
    banner: string
    rectangle: string
    sidebar: string
    inArticle: string
  }
  adFormats: {
    banner: 'auto' | 'rectangle' | 'horizontal'
    rectangle: 'auto' | 'rectangle'
    sidebar: 'auto' | 'vertical'
    inArticle: 'auto' | 'rectangle'
  }
  adStyles: {
    banner: CSSProperties
    rectangle: CSSProperties
    sidebar: CSSProperties
    inArticle: CSSProperties
  }
}

export const adsenseConfig: AdSenseConfig = {
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || '',
  adSlots: {
    banner: 'banner-ad-slot',
    rectangle: 'rectangle-ad-slot',
    sidebar: 'sidebar-ad-slot',
    inArticle: 'in-article-ad-slot',
  },
  adFormats: {
    banner: 'auto',
    rectangle: 'rectangle',
    sidebar: 'vertical',
    inArticle: 'rectangle',
  },
  adStyles: {
    banner: {
      minHeight: '90px',
      maxWidth: '728px',
      margin: '0 auto',
    },
    rectangle: {
      minHeight: '250px',
      minWidth: '300px',
      margin: '0 auto',
    },
    sidebar: {
      minHeight: '250px',
      minWidth: '160px',
      position: 'sticky',
      top: '100px',
    },
    inArticle: {
      minHeight: '250px',
      minWidth: '300px',
      margin: '20px auto',
    },
  },
}

export const adPlacements = {
  // Ad placements on calculator pages
  calculator: {
    above: 'banner', // Above calculator
    inside: 'inArticle', // Inside results
    below: 'rectangle', // Below calculator
  },
  // Ad placements on homepage
  homepage: {
    hero: 'banner',
    grid: 'rectangle',
  },
}
