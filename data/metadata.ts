interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
}

interface CalculatorMetadata extends PageMetadata {
  slug: string
  ogImage?: string
}

export const siteMetadata: PageMetadata = {
  title: 'CalcWise - Free Financial Calculators',
  description: 'Free financial calculators for everyone. Smart calculations, smarter decisions.',
  keywords: [
    'financial calculator',
    'free calculator',
    'mortgage calculator',
    'loan calculator',
    'investment calculator',
    'retirement calculator',
  ],
}

export const pageMetadata: Record<string, PageMetadata> = {
  about: {
    title: 'About Us - Free Financial Calculators | CalcWise',
    description: 'Learn about CalcWise - our mission to provide free, accurate financial calculators for everyone.',
  },
  contact: {
    title: 'Contact Us - Free Financial Calculators | CalcWise',
    description: 'Get in touch with CalcWise. Have questions or suggestions? We\'d love to hear from you.',
  },
  privacy: {
    title: 'Privacy Policy - CalcWise',
    description: 'Read CalcWise privacy policy. We respect your privacy and never store your financial data.',
  },
  terms: {
    title: 'Terms of Use - CalcWise',
    description: 'Read CalcWise terms of use. Understand the terms and conditions for using our free financial calculators.',
  },
}

export const calculatorMetadata: Record<string, CalculatorMetadata> = {
  mortgage: {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator - Calculate Monthly Payments | CalcWise',
    description: 'Use our free mortgage calculator to estimate your monthly payments, total interest, and amortization schedule.',
    keywords: ['mortgage calculator', 'home loan calculator', 'mortgage payment calculator'],
  },
  loan: {
    slug: 'loan-calculator',
    title: 'Loan Calculator - Calculate Monthly Payments | CalcWise',
    description: 'Use our free loan calculator to estimate monthly payments, total interest, and amortization schedule.',
    keywords: ['loan calculator', 'personal loan calculator', 'emi calculator'],
  },
  'compound-interest': {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator - Free Online Tool | CalcWise',
    description: 'Use our free compound interest calculator to see how your money grows over time.',
    keywords: ['compound interest calculator', 'investment calculator', 'future value calculator'],
  },
  'car-loan': {
    slug: 'car-loan-calculator',
    title: 'Car Loan Calculator - Free Online Tool | CalcWise',
    description: 'Use our free car loan calculator to estimate monthly payments, total interest, and amortization schedule.',
    keywords: ['car loan calculator', 'auto loan calculator', 'car payment calculator'],
  },
  retirement: {
    slug: 'retirement-calculator',
    title: 'Retirement Calculator - Plan Your Future | CalcWise',
    description: 'Use our free retirement calculator to estimate your retirement savings and monthly income.',
    keywords: ['retirement calculator', '401k calculator', 'retirement savings calculator'],
  },
  'credit-card': {
    slug: 'credit-card-payoff-calculator',
    title: 'Credit Card Payoff Calculator - Free Online Tool | CalcWise',
    description: 'Use our free credit card payoff calculator to see how long it takes to pay off your debt.',
    keywords: ['credit card payoff calculator', 'credit card debt calculator', 'debt payoff calculator'],
  },
  investment: {
    slug: 'investment-calculator',
    title: 'Investment Calculator - ROI & CAGR | CalcWise',
    description: 'Use our free investment calculator to estimate your returns, ROI, CAGR, and inflation-adjusted growth.',
    keywords: ['investment calculator', 'roi calculator', 'cagr calculator'],
  },
  'debt-payoff': {
    slug: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator - Snowball & Avalanche | CalcWise',
    description: 'Use our free debt payoff calculator to compare Snowball and Avalanche methods.',
    keywords: ['debt payoff calculator', 'snowball method', 'avalanche method'],
  },
  'savings-goal': {
    slug: 'savings-goal-calculator',
    title: 'Savings Goal Calculator - Free Online Tool | CalcWise',
    description: 'Use our free savings goal calculator to see how long it takes to reach your target.',
    keywords: ['savings goal calculator', 'savings calculator', 'goal tracker calculator'],
  },
  'student-loan': {
    slug: 'student-loan-calculator',
    title: 'Student Loan Calculator - Payment Plans | CalcWise',
    description: 'Use our free student loan calculator to compare different repayment plans.',
    keywords: ['student loan calculator', 'student loan repayment calculator', 'income-based repayment calculator'],
  },
  amortization: {
    slug: 'amortization-calculator',
    title: 'Amortization Calculator - Full Schedule | CalcWise',
    description: 'Use our free amortization calculator to generate a complete payment schedule.',
    keywords: ['amortization calculator', 'amortization schedule', 'loan amortization calculator'],
  },
  'rent-vs-buy': {
    slug: 'rent-vs-buy-calculator',
    title: 'Rent vs Buy Calculator - Free Online Tool | CalcWise',
    description: 'Use our free rent vs buy calculator to compare renting versus buying a home.',
    keywords: ['rent vs buy calculator', 'rent vs buy', 'should I rent or buy'],
  },
  'net-worth': {
    slug: 'net-worth-calculator',
    title: 'Net Worth Calculator - Track Your Wealth | CalcWise',
    description: 'Use our free net worth calculator to calculate your total assets, liabilities, and net worth.',
    keywords: ['net worth calculator', 'net worth tracker', 'asset calculator'],
  },
  budget: {
    slug: 'budget-calculator',
    title: 'Budget Calculator - Monthly Budget Planner | CalcWise',
    description: 'Use our free budget calculator to plan your monthly budget and track income vs expenses.',
    keywords: ['budget calculator', 'monthly budget planner', 'budget tracker'],
  },
  inflation: {
    slug: 'inflation-calculator',
    title: 'Inflation Calculator - Purchasing Power | CalcWise',
    description: 'Use our free inflation calculator to see how inflation affects your money over time.',
    keywords: ['inflation calculator', 'purchasing power calculator', 'inflation impact calculator'],
  },
  'simple-interest': {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator - Free Online Tool | CalcWise',
    description: 'Use our free simple interest calculator to calculate interest on your investment or loan.',
    keywords: ['simple interest calculator', 'interest calculator', 'simple interest formula'],
  },
  affordability: {
    slug: 'home-affordability-calculator',
    title: 'Home Affordability Calculator - How Much Can I Afford | CalcWise',
    description: 'Use our free home affordability calculator to find out how much home you can afford.',
    keywords: ['home affordability calculator', 'how much home can I afford', 'home buying calculator'],
  },
  refinance: {
    slug: 'refinance-calculator',
    title: 'Refinance Calculator - Should I Refinance? | CalcWise',
    description: 'Use our free refinance calculator to compare your current mortgage with a new loan.',
    keywords: ['refinance calculator', 'mortgage refinance calculator', 'should I refinance'],
  },
  'emergency-fund': {
    slug: 'emergency-fund-calculator',
    title: 'Emergency Fund Calculator - Save for Rainy Day | CalcWise',
    description: 'Use our free emergency fund calculator to find out how much you need to save.',
    keywords: ['emergency fund calculator', 'emergency savings calculator', 'rainy day fund calculator'],
  },
  salary: {
    slug: 'salary-calculator',
    title: 'Salary Calculator - Convert Annual to Hourly | CalcWise',
    description: 'Use our free salary calculator to convert your annual salary to hourly, weekly, and monthly rates.',
    keywords: ['salary calculator', 'annual to hourly calculator', 'hourly rate calculator'],
  },
}

// Helper function to get metadata for a calculator
export function getCalculatorMetadata(slug: string): CalculatorMetadata | undefined {
  const key = Object.keys(calculatorMetadata).find(
    (k) => calculatorMetadata[k].slug === slug
  )
  return key ? calculatorMetadata[key] : undefined
}