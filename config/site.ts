export const siteConfig = {
  name: 'CalcWisePro',
  description: 'Free financial calculators for everyone. Smart calculations, smarter decisions.',
  url: 'https://www.calcwisepro.me',
  author: 'CalcWisePro',
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
  email: 'contact@calcwisepro.me',
  year: new Date().getFullYear(),
  social: {
    twitter: '@calcwisepro',
    github: 'calcwisepro',
  },
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || '',
  },
}

export type SiteConfig = typeof siteConfig