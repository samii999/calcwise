import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Car Loan Calculator - Free Online Tool | CalcWise',
  description:
    'Use our free car loan calculator to estimate monthly payments, total interest, and amortization schedule. Includes sales tax, registration fees, and trade-in value.',
  keywords: [
    'car loan calculator',
    'auto loan calculator',
    'car payment calculator',
    'vehicle loan calculator',
    'car loan interest calculator',
    'auto finance calculator',
  ],
  openGraph: {
    title: 'Car Loan Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate your car loan payments instantly. Includes tax, registration, and trade-in. Free, accurate, no signup required.',
    url: `${siteConfig.url}/car-loan-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Car Loan Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Loan Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate your car loan payments instantly. Includes tax, registration, and trade-in.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/car-loan-calculator`,
  },
}