import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Student Loan Calculator - Payment Plans | CalcWise',
  description:
    'Use our free student loan calculator to compare Standard, Graduated, Income-Based, and Extended repayment plans. See total interest and payoff date.',
  keywords: [
    'student loan calculator',
    'student loan repayment calculator',
    'income-based repayment calculator',
    'student loan forgiveness',
    'student loan interest calculator',
    'student loan payment plan',
  ],
  openGraph: {
    title: 'Student Loan Calculator - Payment Plans | CalcWise',
    description:
      'Compare student loan repayment plans. Free, accurate, no signup required.',
    url: `${siteConfig.url}/student-loan-calculator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Student Loan Calculator - CalcWise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Loan Calculator - Payment Plans | CalcWise',
    description:
      'Compare student loan repayment plans. Free, accurate, no signup required.',
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/student-loan-calculator`,
  },
}