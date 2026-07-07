import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator - Free Online Tool | CalcWise',
  description:
    'Use our free rent vs buy calculator to compare renting versus buying a home. See which option is more affordable with all costs included.',
  keywords: [
    'rent vs buy calculator',
    'rent vs buy',
    'should I rent or buy',
    'renting vs buying calculator',
    'rent vs mortgage calculator',
    'home buying calculator',
  ],
  openGraph: {
    title: 'Rent vs Buy Calculator - Free Online Tool | CalcWise',
    description:
      'Compare renting versus buying a home. Free, accurate, no signup required.',
    url: `${siteConfig.url}/rent-vs-buy-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Rent vs Buy Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator - Free Online Tool | CalcWise',
    description:
      'Compare renting versus buying a home. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/rent-vs-buy-calculator`,
  },
}