import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Refinance Calculator - Should I Refinance? | CalcWise',
  description:
    'Use our free refinance calculator to compare your current mortgage with a new loan. See if refinancing saves you money and how long to break even.',
  keywords: [
    'refinance calculator',
    'mortgage refinance calculator',
    'should I refinance',
    'refinance savings calculator',
    'refinance break-even calculator',
    'refinance comparison calculator',
  ],
  openGraph: {
    title: 'Refinance Calculator - Should I Refinance? | CalcWise',
    description:
      'Compare your current mortgage with refinance options. Free, accurate, no signup required.',
    url: `${siteConfig.url}/refinance-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Refinance Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refinance Calculator - Should I Refinance? | CalcWise',
    description:
      'Compare your current mortgage with refinance options. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/refinance-calculator`,
  },
}