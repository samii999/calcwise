export const siteConfig = {
  name: 'CalcWise',
  description: 'Free financial calculators for everyone. Smart calculations, smarter decisions.',
  url: 'https://calcwise.com',
  author: 'CalcWise',
  keywords: [
    'financial calculator',
    'free calculator',
    'mortgage calculator',
    'loan calculator',
    'investment calculator',
    'retirement calculator',
    'compound interest calculator',
    'personal finance',
    'budget calculator',
    'debt calculator',
  ],
  email: 'contact@calcwise.com',
  year: new Date().getFullYear(),
  social: {
    twitter: '@calcwise',
    github: 'calcwise',
  },
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || '',
  },
}

export type SiteConfig = typeof siteConfig