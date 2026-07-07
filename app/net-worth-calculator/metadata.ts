import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Net Worth Calculator - Track Your Wealth | CalcWise',
  description:
    'Use our free net worth calculator to calculate your total assets, liabilities, and net worth. Track your financial progress over time.',
  keywords: [
    'net worth calculator',
    'net worth tracker',
    'asset calculator',
    'liability calculator',
    'financial health check',
    'personal finance tracker',
  ],
  openGraph: {
    title: 'Net Worth Calculator - Track Your Wealth | CalcWise',
    description:
      'Calculate your net worth instantly. Free, accurate, no signup required.',
    url: `${siteConfig.url}/net-worth-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Net Worth Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator - Track Your Wealth | CalcWise',
    description:
      'Calculate your net worth instantly. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/net-worth-calculator`,
  },
}