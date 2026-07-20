export interface SeoMetadata {
  title: string
  description: string
  keywords?: string[]
  openGraph?: OpenGraphMetadata
  twitter?: TwitterMetadata
  canonical?: string
}

export interface OpenGraphMetadata {
  title: string
  description: string
  url?: string
  type?: 'website' | 'article'
  images?: OpenGraphImage[]
  siteName?: string
}

export interface OpenGraphImage {
  url: string
  width?: number
  height?: number
  alt?: string
}

export interface TwitterMetadata {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  title: string
  description: string
  images?: string[]
  creator?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQSchema {
  question: string
  answer: string
}

export interface WebApplicationSchema {
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  browserRequirements?: string
}

// ── Data-layer interfaces (moved here from data/metadata.ts) ──────────────

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogTitle?: string
  ogDescription?: string
}

export interface CalculatorMetadata extends PageMetadata {
  slug: string
  ogImage?: string
  category?: string
  faqs?: FAQSchema[]
}