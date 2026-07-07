import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Loan Calculator - Calculate Monthly Payments | CalcWise',
  description:
    'Use our free loan calculator to estimate monthly payments, total interest, and amortization schedule. Supports personal, home, car, and education loans.',
  keywords: [
    'loan calculator',
    'personal loan calculator',
    'home loan calculator',
    'car loan calculator',
    'education loan calculator',
    'emi calculator',
    'loan amortization calculator',
    'monthly payment calculator',
    'loan interest calculator',
  ],
  openGraph: {
    title: 'Loan Calculator - Calculate Monthly Payments | CalcWise',
    description:
      'Calculate your loan payments instantly. Supports personal, home, car, and education loans. Free, accurate, no signup required.',
    url: `${siteConfig.url}/loan-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Loan Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator - Calculate Monthly Payments | CalcWise',
    description:
      'Calculate your loan payments instantly. Supports personal, home, car, and education loans.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/loan-calculator`,
  },
}