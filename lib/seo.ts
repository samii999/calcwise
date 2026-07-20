import { siteConfig } from '@/config/site'
import { getCalculatorMetadata } from '@/data/metadata'
import type { SeoMetadata, BreadcrumbItem, FAQSchema } from '@/types/seo'

/**
 * Generate metadata for a calculator page
 */
export function generateCalculatorMetadata(calculatorSlug: string): SeoMetadata {
  const metadata = getCalculatorMetadata(calculatorSlug)
  
  if (!metadata) {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
    }
  }

  const baseUrl = siteConfig.url
  const slug = metadata.slug

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${slug}`,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${baseUrl}/og-image.png`],
    },
    canonical: `${baseUrl}/${slug}`,
  }
}

/**
 * Generate metadata for a static page
 */
export function generatePageMetadata(
  page: string,
  title: string,
  description: string,
  keywords?: string[]
): SeoMetadata {
  const baseUrl = siteConfig.url

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${page}`,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    canonical: `${baseUrl}/${page}`,
  }
}

/**
 * Generate home page metadata
 */
export function generateHomeMetadata(): SeoMetadata {
  const baseUrl = siteConfig.url

  return {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: baseUrl,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${baseUrl}/og-image.png`],
    },
    canonical: baseUrl,
  }
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: FAQSchema[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate WebApplication schema
 */
export function generateWebApplicationSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}