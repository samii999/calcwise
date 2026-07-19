import { MetadataRoute } from 'next'
import { calculators } from '@/data/calculators'
// Named import ke sath data array directly extract karein
import { blogPosts } from '@/data/blogs' 
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const currentDate = new Date()

  // 1. Static pages
  const staticPages = [
    { route: '', priority: 1.0, changefreq: 'weekly' as const },
    { route: '/blog', priority: 0.9, changefreq: 'daily' as const },
    { route: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/contact', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/privacy-policy', priority: 0.3, changefreq: 'yearly' as const },
    { route: '/terms', priority: 0.3, changefreq: 'yearly' as const },
  ]

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: currentDate,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }))

  // 2. Calculator dynamic pages
  const calculatorUrls = calculators.map((calculator) => ({
    url: `${baseUrl}/${calculator.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 3. Dynamic Blog Post pages (Using your new structure)
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Agar custom updatedDate hai to woh use karein, warna publishedDate ko target karein
    lastModified: post.updatedDate ? new Date(post.updatedDate) : new Date(post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticUrls, ...calculatorUrls, ...blogUrls]
}