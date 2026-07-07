import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Investment Calculator - ROI & CAGR | CalcWise',
  description:
    'Use our free investment calculator to estimate your returns, ROI, CAGR, and inflation-adjusted growth. Plan your long-term wealth accumulation strategy.',
  keywords: [
    'investment calculator',
    'roi calculator',
    'cagr calculator',
    'investment return calculator',
    'compound annual growth rate',
    'long-term investment calculator',
  ],
  openGraph: {
    title: 'Investment Calculator - ROI & CAGR | CalcWise',
    description:
      'Calculate your investment returns, ROI, CAGR, and inflation-adjusted growth. Free, accurate, no signup required.',
    url: `${siteConfig.url}/investment-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Investment Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Calculator - ROI & CAGR | CalcWise',
    description:
      'Calculate your investment returns, ROI, CAGR, and inflation-adjusted growth.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/investment-calculator`,
  },
}