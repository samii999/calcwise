import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Inflation Calculator - Purchasing Power | CalcWise',
  description:
    'Use our free inflation calculator to see how inflation affects the purchasing power of your money over time. Calculate future value and real value.',
  keywords: [
    'inflation calculator',
    'purchasing power calculator',
    'inflation impact calculator',
    'inflation adjusted value',
    'future value calculator',
    'inflation rate calculator',
  ],
  openGraph: {
    title: 'Inflation Calculator - Purchasing Power | CalcWise',
    description:
      'Calculate inflation impact on your money. Free, accurate, no signup required.',
    url: `${siteConfig.url}/inflation-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Inflation Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator - Purchasing Power | CalcWise',
    description:
      'Calculate inflation impact on your money. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/inflation-calculator`,
  },
}