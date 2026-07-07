import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Retirement Calculator - Plan Your Future | CalcWise',
  description:
    'Use our free retirement calculator to estimate your retirement savings, monthly income, and see if you are on track for a comfortable retirement.',
  keywords: [
    'retirement calculator',
    '401k calculator',
    'retirement savings calculator',
    'retirement income calculator',
    'retirement planning',
    '401k calculator with employer match',
  ],
  openGraph: {
    title: 'Retirement Calculator - Plan Your Future | CalcWise',
    description:
      'Plan your retirement savings with 401k, IRA, and employer matching. Free, accurate, no signup required.',
    url: `${siteConfig.url}/retirement-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Retirement Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator - Plan Your Future | CalcWise',
    description:
      'Plan your retirement savings with 401k, IRA, and employer matching. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/retirement-calculator`,
  },
}