import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Simple Interest Calculator - Free Online Tool | CalcWise',
  description:
    'Use our free simple interest calculator to calculate interest on your investment or loan. See how interest grows over time with monthly contributions.',
  keywords: [
    'simple interest calculator',
    'interest calculator',
    'simple interest formula',
    'interest rate calculator',
    'investment interest calculator',
    'loan interest calculator',
  ],
  openGraph: {
    title: 'Simple Interest Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate simple interest instantly. Free, accurate, no signup required.',
    url: `${siteConfig.url}/simple-interest-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Simple Interest Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Interest Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate simple interest instantly. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/simple-interest-calculator`,
  },
}