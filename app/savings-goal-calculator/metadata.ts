import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Savings Goal Calculator - Free Online Tool | CalcWise',
  description:
    'Use our free savings goal calculator to see how long it takes to reach your target. Calculate required monthly contributions and track your progress.',
  keywords: [
    'savings goal calculator',
    'savings calculator',
    'goal tracker calculator',
    'savings target calculator',
    'monthly savings calculator',
    'financial goal calculator',
  ],
  openGraph: {
    title: 'Savings Goal Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate your savings goal progress. Free, accurate, no signup required.',
    url: `${siteConfig.url}/savings-goal-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Savings Goal Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Goal Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate your savings goal progress. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/savings-goal-calculator`,
  },
}