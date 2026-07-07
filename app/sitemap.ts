import { MetadataRoute } from 'next'
import { calculators } from '@/data/calculators'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const currentDate = new Date()

  // Static pages
  const staticPages = [
    { route: '', priority: 1.0, changefreq: 'weekly' as const },
    { route: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/contact', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/privacy-policy', priority: 0.5, changefreq: 'yearly' as const },
    { route: '/terms', priority: 0.5, changefreq: 'yearly' as const },
  ]

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: currentDate,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }))

  // Calculator pages
  const calculatorUrls = calculators.map((calculator) => ({
    url: `${baseUrl}/${calculator.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticUrls, ...calculatorUrls]
}