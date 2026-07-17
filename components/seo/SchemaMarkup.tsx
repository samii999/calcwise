'use client'

import { useEffect } from 'react'

interface SchemaMarkupProps {
  schema: Record<string, any>
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  useEffect(() => {
    // Remove any existing script with the same id
    const existingScript = document.getElementById('schema-markup')
    if (existingScript) {
      existingScript.remove()
    }

    // Create and inject the script
    const script = document.createElement('script')
    script.id = 'schema-markup'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('schema-markup')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [schema])

  return null
}

// Helper function to create WebApplication schema
export function createWebApplicationSchema(
  name: string,
  description: string,
  url: string,
  applicationCategory: string = 'FinancialApplication'
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

// Helper function to create FAQ schema
export function createFAQSchema(
  faqs: { question: string; answer: string }[]
): Record<string, any> {
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

// Helper function to create Breadcrumb schema
export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, any> {
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

// Helper function to create Organization schema
export function createOrganizationSchema(
  name: string,
  url: string,
  logo: string,
  description: string
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs: [
      'https://twitter.com/calcwisepro',
      'https://github.com/calcwisepro',
    ],
  }
}