import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Amortization Calculator - Full Schedule | CalcWise',
  description:
    'Use our free amortization calculator to generate a complete payment schedule with principal and interest breakdown for any loan.',
  keywords: [
    'amortization calculator',
    'amortization schedule',
    'loan amortization calculator',
    'mortgage amortization',
    'payment schedule calculator',
    'loan repayment schedule',
  ],
  openGraph: {
    title: 'Amortization Calculator - Full Schedule | CalcWise',
    description:
      'Generate a complete amortization schedule. Free, accurate, no signup required.',
    url: `${siteConfig.url}/amortization-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Amortization Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amortization Calculator - Full Schedule | CalcWise',
    description:
      'Generate a complete amortization schedule. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/amortization-calculator`,
  },
}