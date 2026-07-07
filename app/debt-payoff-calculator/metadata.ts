import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator - Snowball & Avalanche | CalcWise',
  description:
    'Use our free debt payoff calculator to compare Snowball and Avalanche methods. See how extra payments save you interest and time.',
  keywords: [
    'debt payoff calculator',
    'snowball method',
    'avalanche method',
    'debt snowball calculator',
    'pay off debt fast',
    'debt repayment calculator',
  ],
  openGraph: {
    title: 'Debt Payoff Calculator - Snowball & Avalanche | CalcWise',
    description:
      'Compare Snowball and Avalanche debt payoff methods. Free, accurate, no signup required.',
    url: `${siteConfig.url}/debt-payoff-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Debt Payoff Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator - Snowball & Avalanche | CalcWise',
    description:
      'Compare Snowball and Avalanche debt payoff methods. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/debt-payoff-calculator`,
  },
}