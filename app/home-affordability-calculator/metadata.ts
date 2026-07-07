import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Home Affordability Calculator - How Much Can I Afford | CalcWise',
  description:
    'Use our free home affordability calculator to find out how much home you can afford based on your income, debts, and current interest rates.',
  keywords: [
    'home affordability calculator',
    'how much home can I afford',
    'home buying calculator',
    'affordability calculator',
    'house affordability calculator',
    'mortgage affordability calculator',
  ],
  openGraph: {
    title: 'Home Affordability Calculator - How Much Can I Afford | CalcWise',
    description:
      'Find out how much home you can afford. Free, accurate, no signup required.',
    url: `${siteConfig.url}/home-affordability-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Home Affordability Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Affordability Calculator - How Much Can I Afford | CalcWise',
    description:
      'Find out how much home you can afford. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/home-affordability-calculator`,
  },
}