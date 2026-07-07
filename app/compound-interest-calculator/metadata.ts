import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Free Online Tool | CalcWise',
  description:
    'Use our free compound interest calculator to see how your money grows over time. Calculate future value with monthly contributions and compounding frequencies.',
  keywords: [
    'compound interest calculator',
    'compound interest',
    'investment calculator',
    'future value calculator',
    'savings calculator',
    'compound interest formula',
  ],
  openGraph: {
    title: 'Compound Interest Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate how your money grows with compound interest. Free, accurate, no signup required.',
    url: `${siteConfig.url}/compound-interest-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate how your money grows with compound interest. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/compound-interest-calculator`,
  },
}