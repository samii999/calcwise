export interface NavLink {
  name: string
  href: string
  icon?: string
}

export interface NavSection {
  title: string
  links: NavLink[]
}

// Header Navigation
export const headerNav: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Calculators', href: '/#calculators' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

// Footer Navigation - Quick Links
export const footerQuickLinks: NavLink[] = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Use', href: '/terms' },
]

// Footer - Calculator Categories
export const footerCalculatorLinks: NavLink[] = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
  { name: 'Loan Calculator', href: '/loan-calculator' },
  { name: 'Compound Interest Calculator', href: '/compound-interest-calculator' },
  { name: 'Retirement Calculator', href: '/retirement-calculator' },
  { name: 'Credit Card Payoff Calculator', href: '/credit-card-payoff-calculator' },
  { name: 'Investment Calculator', href: '/investment-calculator' },
  { name: 'View All Calculators', href: '/' },
]

// Footer - Trust Section
export const trustFeatures = [
  {
    icon: '✓',
    text: 'No Signup Required',
  },
  {
    icon: '⚡',
    text: 'Instant Results',
  },
  {
    icon: '💰',
    text: '100% Free',
  },
  {
    icon: '📊',
    text: 'Accurate Calculations',
  },
]