import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Payments | CalcWise',
  description:
    'Use our free mortgage calculator to estimate your monthly payments, total interest, and amortization schedule. Includes taxes, insurance, PMI, and extra payment options.',
  keywords: [
    'mortgage calculator',
    'home loan calculator',
    'mortgage payment calculator',
    'monthly mortgage payment',
    'home affordability calculator',
    'mortgage amortization schedule',
    'mortgage calculator with taxes and insurance',
    'PMI calculator',
    'mortgage refinance calculator',
    '15 year mortgage vs 30 year',
  ],
  openGraph: {
    title: 'Mortgage Calculator - Calculate Monthly Payments | CalcWise',
    description:
      'Calculate your mortgage payments instantly. Includes taxes, insurance, PMI, and extra payment options. Free, accurate, no signup required.',
    url: `${siteConfig.url}/mortgage-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Mortgage Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator - Calculate Monthly Payments | CalcWise',
    description:
      'Calculate your mortgage payments instantly. Includes taxes, insurance, PMI, and extra payment options.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/mortgage-calculator`,
  },
}