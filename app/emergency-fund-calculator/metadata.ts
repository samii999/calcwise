import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator - Save for Rainy Day | CalcWise',
  description:
    'Use our free emergency fund calculator to find out how much you need to save for 3-6 months of expenses. Track your progress and reach your goal faster.',
  keywords: [
    'emergency fund calculator',
    'emergency savings calculator',
    'rainy day fund calculator',
    'savings goal calculator',
    'financial safety net',
    'emergency fund tracker',
  ],
  openGraph: {
    title: 'Emergency Fund Calculator - Save for Rainy Day | CalcWise',
    description:
      'Calculate your emergency fund goal. Free, accurate, no signup required.',
    url: `${siteConfig.url}/emergency-fund-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Emergency Fund Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Fund Calculator - Save for Rainy Day | CalcWise',
    description:
      'Calculate your emergency fund goal. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/emergency-fund-calculator`,
  },
}