export interface Calculator {
  slug: string
  name: string
  shortName: string
  description: string
  icon: string
  color: string
  category: 'mortgage' | 'loan' | 'investment' | 'retirement' | 'budget' | 'other'
  searchVolume: 'High' | 'Medium' | 'Low'
  rpmRange: string
}

export const calculators: Calculator[] = [
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    shortName: 'Mortgage',
    description: 'Calculate your monthly mortgage payments, interest, and amortization schedule.',
    icon: 'mortgage',
    color: '#0d9488',
    category: 'mortgage',
    searchVolume: 'High',
    rpmRange: '$25–$40',
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    shortName: 'Loan',
    description: 'Estimate monthly payments, total interest, and payoff date for any loan.',
    icon: 'loan',
    color: '#3b82f6',
    category: 'loan',
    searchVolume: 'High',
    rpmRange: '$20–$35',
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortName: 'Compound Interest',
    description: 'See how your money grows with compound interest over time.',
    icon: 'compound-interest',
    color: '#8b5cf6',
    category: 'investment',
    searchVolume: 'High',
    rpmRange: '$15–$25',
  },
  {
    slug: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    shortName: 'Car Loan',
    description: 'Calculate your auto loan payments, interest, and total cost.',
    icon: 'car-loan',
    color: '#f59e0b',
    category: 'loan',
    searchVolume: 'High',
    rpmRange: '$20–$30',
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    shortName: 'Retirement',
    description: 'Plan your retirement savings with 401k, IRA, and investment growth.',
    icon: 'retirement',
    color: '#ec4899',
    category: 'retirement',
    searchVolume: 'High',
    rpmRange: '$20–$35',
  },
  {
    slug: 'credit-card-payoff-calculator',
    name: 'Credit Card Payoff Calculator',
    shortName: 'Credit Card Payoff',
    description: 'Find out how long it takes to pay off your credit card debt.',
    icon: 'credit-card',
    color: '#ef4444',
    category: 'budget',
    searchVolume: 'High',
    rpmRange: '$20–$30',
  },
  {
    slug: 'investment-calculator',
    name: 'Investment Return Calculator',
    shortName: 'Investment',
    description: 'Calculate potential returns on your investments over time.',
    icon: 'investment',
    color: '#10b981',
    category: 'investment',
    searchVolume: 'High',
    rpmRange: '$15–$25',
  },
  {
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    shortName: 'Debt Payoff',
    description: 'Use debt snowball or avalanche method to pay off debt faster.',
    icon: 'debt-payoff',
    color: '#f97316',
    category: 'budget',
    searchVolume: 'High',
    rpmRange: '$18–$28',
  },
  {
    slug: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    shortName: 'Savings Goal',
    description: 'Calculate how much to save monthly to reach your financial goals.',
    icon: 'savings-goal',
    color: '#14b8a6',
    category: 'budget',
    searchVolume: 'Medium',
    rpmRange: '$12–$22',
  },
  {
    slug: 'student-loan-calculator',
    name: 'Student Loan Calculator',
    shortName: 'Student Loan',
    description: 'Estimate student loan payments, interest, and repayment plans.',
    icon: 'student-loan',
    color: '#6366f1',
    category: 'loan',
    searchVolume: 'High',
    rpmRange: '$18–$28',
  },
  {
    slug: 'amortization-calculator',
    name: 'Amortization Calculator',
    shortName: 'Amortization',
    description: 'View full amortization schedule with principal and interest breakdown.',
    icon: 'amortization',
    color: '#06b6d4',
    category: 'mortgage',
    searchVolume: 'Medium',
    rpmRange: '$15–$25',
  },
  {
    slug: 'rent-vs-buy-calculator',
    name: 'Rent vs Buy Calculator',
    shortName: 'Rent vs Buy',
    description: 'Compare renting vs buying a home to make the best financial decision.',
    icon: 'rent-vs-buy',
    color: '#8b5cf6',
    category: 'mortgage',
    searchVolume: 'Medium',
    rpmRange: '$20–$35',
  },
  {
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    shortName: 'Net Worth',
    description: 'Calculate your net worth by adding assets and subtracting liabilities.',
    icon: 'net-worth',
    color: '#f472b6',
    category: 'budget',
    searchVolume: 'Medium',
    rpmRange: '$12–$20',
  },
  {
    slug: 'budget-calculator',
    name: 'Budget Planner Calculator',
    shortName: 'Budget Planner',
    description: 'Create a monthly budget to track income, expenses, and savings.',
    icon: 'budget',
    color: '#22c55e',
    category: 'budget',
    searchVolume: 'High',
    rpmRange: '$10–$18',
  },
  {
    slug: 'inflation-calculator',
    name: 'Inflation Calculator',
    shortName: 'Inflation',
    description: 'Calculate how inflation affects the purchasing power of your money.',
    icon: 'inflation',
    color: '#f43f5e',
    category: 'other',
    searchVolume: 'Medium',
    rpmRange: '$10–$18',
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortName: 'Simple Interest',
    description: 'Calculate simple interest on loans, savings, and investments.',
    icon: 'simple-interest',
    color: '#0ea5e9',
    category: 'investment',
    searchVolume: 'Medium',
    rpmRange: '$10–$18',
  },
  {
    slug: 'home-affordability-calculator',
    name: 'Home Affordability Calculator',
    shortName: 'Home Affordability',
    description: 'Find out how much house you can afford based on your income and debt.',
    icon: 'home-affordability',
    color: '#0d9488',
    category: 'mortgage',
    searchVolume: 'High',
    rpmRange: '$22–$35',
  },
  {
    slug: 'refinance-calculator',
    name: 'Mortgage Refinance Calculator',
    shortName: 'Refinance',
    description: 'Calculate if refinancing your mortgage saves you money.',
    icon: 'refinance',
    color: '#8b5cf6',
    category: 'mortgage',
    searchVolume: 'Medium',
    rpmRange: '$20–$30',
  },
  {
    slug: 'emergency-fund-calculator',
    name: 'Emergency Fund Calculator',
    shortName: 'Emergency Fund',
    description: 'Calculate how much you need for a 3-6 month emergency fund.',
    icon: 'emergency-fund',
    color: '#f59e0b',
    category: 'budget',
    searchVolume: 'Medium',
    rpmRange: '$10–$18',
  },
  {
    slug: 'salary-calculator',
    name: 'Salary to Hourly Calculator',
    shortName: 'Salary Calculator',
    description: 'Convert annual salary to hourly, weekly, bi-weekly, and monthly pay.',
    icon: 'salary',
    color: '#10b981',
    category: 'other',
    searchVolume: 'High',
    rpmRange: '$10–$20',
  },
]

// Helper functions
export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug)
}

export function getCalculatorsByCategory(category: Calculator['category']): Calculator[] {
  return calculators.filter((c) => c.category === category)
}

export function getRelatedCalculators(currentSlug: string, count: number = 4): Calculator[] {
  const current = getCalculatorBySlug(currentSlug)
  if (!current) return []
  return calculators
    .filter((c) => c.slug !== currentSlug && c.category === current.category)
    .slice(0, count)
}