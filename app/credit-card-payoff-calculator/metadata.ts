import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator - Free Online Tool | CalcWise',
  description:
    'Use our free credit card payoff calculator to see how long it will take to pay off your debt and how much interest you can save with extra payments.',
  keywords: [
    'credit card payoff calculator',
    'credit card debt calculator',
    'debt payoff calculator',
    'credit card interest calculator',
    'pay off credit card debt',
  ],
  openGraph: {
    title: 'Credit Card Payoff Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate your credit card payoff plan instantly. Free, accurate, no signup required.',
    url: `${siteConfig.url}/credit-card-payoff-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Credit Card Payoff Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Payoff Calculator - Free Online Tool | CalcWise',
    description:
      'Calculate your credit card payoff plan instantly. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/credit-card-payoff-calculator`,
  },
}