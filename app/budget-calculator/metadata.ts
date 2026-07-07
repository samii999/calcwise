import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Budget Calculator - Monthly Budget Planner | CalcWise',
  description:
    'Use our free budget calculator to plan your monthly budget, track income vs expenses, and identify savings opportunities.',
  keywords: [
    'budget calculator',
    'monthly budget planner',
    'budget tracker',
    'personal budget calculator',
    'expense tracker',
    'income vs expenses calculator',
  ],
  openGraph: {
    title: 'Budget Calculator - Monthly Budget Planner | CalcWise',
    description:
      'Plan your monthly budget instantly. Free, accurate, no signup required.',
    url: `${siteConfig.url}/budget-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Budget Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator - Monthly Budget Planner | CalcWise',
    description:
      'Plan your monthly budget instantly. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/budget-calculator`,
  },
}