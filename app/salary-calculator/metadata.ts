import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Salary Calculator - Convert Annual to Hourly | CalcWise',
  description:
    'Use our free salary calculator to convert your annual salary to hourly, weekly, bi-weekly, and monthly rates with estimated tax breakdown.',
  keywords: [
    'salary calculator',
    'annual to hourly calculator',
    'hourly rate calculator',
    'salary converter',
    'hourly to salary calculator',
    'paycheck calculator',
    'salary breakdown calculator',
  ],
  openGraph: {
    title: 'Salary Calculator - Convert Annual to Hourly | CalcWise',
    description:
      'Convert your annual salary to hourly, weekly, and monthly rates. Free, accurate, no signup required.',
    url: `${siteConfig.url}/salary-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Salary Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Calculator - Convert Annual to Hourly | CalcWise',
    description:
      'Convert your annual salary to hourly, weekly, and monthly rates. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/salary-calculator`,
  },
}