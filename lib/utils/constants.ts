/**
 * Common constants for all calculators
 */

export const CONSTANTS = {
  // Mortgage
  DEFAULT_MORTGAGE_RATE: 6.5,
  DEFAULT_MORTGAGE_TERM: 30,
  DEFAULT_DOWN_PAYMENT: 20,
  MAX_MORTGAGE_AMOUNT: 10000000,
  MIN_MORTGAGE_AMOUNT: 10000,

  // Loan
  DEFAULT_LOAN_RATE: 10.5,
  DEFAULT_LOAN_TERM: 3,
  MAX_LOAN_AMOUNT: 10000000,
  MIN_LOAN_AMOUNT: 100,

  // Investment
  DEFAULT_INVESTMENT_RATE: 7,
  DEFAULT_INVESTMENT_TERM: 10,

  // Retirement
  DEFAULT_RETIREMENT_AGE: 65,
  DEFAULT_RETIREMENT_CONTRIBUTION: 500,
  DEFAULT_RETIREMENT_RETURN: 7,
  DEFAULT_INFLATION_RATE: 3,
  DEFAULT_LIFE_EXPECTANCY: 90,

  // Credit Card
  DEFAULT_CREDIT_CARD_RATE: 22,
  DEFAULT_CREDIT_CARD_BALANCE: 5000,
  DEFAULT_CREDIT_CARD_PAYMENT: 200,

  // Car Loan
  DEFAULT_CAR_LOAN_RATE: 6.5,
  DEFAULT_CAR_LOAN_TERM: 5,
  DEFAULT_CAR_PRICE: 35000,
  DEFAULT_SALES_TAX: 7,

  // Student Loan
  DEFAULT_STUDENT_LOAN_RATE: 5.5,
  DEFAULT_STUDENT_LOAN_TERM: 10,
  DEFAULT_GRACE_PERIOD: 6,

  // Emergency Fund
  DEFAULT_EMERGENCY_MONTHS: 6,
  DEFAULT_MONTHLY_EXPENSES: 4000,

  // Salary
  DEFAULT_HOURS_PER_WEEK: 40,
  DEFAULT_WEEKS_PER_YEAR: 52,
  DEFAULT_TAX_RATE: 22,

  // Rent vs Buy
  DEFAULT_RENT_INCREASE: 3,
  DEFAULT_PROPERTY_TAX_RATE: 1.25,
  DEFAULT_HOME_INSURANCE: 1500,
  DEFAULT_MAINTENANCE_PERCENT: 1,
  DEFAULT_CLOSING_COSTS: 3,
  DEFAULT_SELLING_COSTS: 6,
  DEFAULT_APPRECIATION_RATE: 3,

  // Colors for Charts
  CHART_COLORS: {
    primary: '#0d9488',
    primaryLight: '#14b8a6',
    secondary: '#1e293b',
    accent: '#f59e0b',
    green: '#10b981',
    red: '#ef4444',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f97316',
    teal: '#06b6d4',
  },

  // Currency
  CURRENCY: 'USD',
  LOCALE: 'en-US',

  // Date formats
  DATE_FORMAT: {
    short: 'MMM d, yyyy',
    long: 'MMMM d, yyyy',
    full: 'EEEE, MMMM d, yyyy',
  },

  // Number formats
  NUMBER_FORMAT: {
    compact: 'compact',
    standard: 'standard',
  },
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const DEBOUNCE_DELAY = 300

export const MAX_RETRY_ATTEMPTS = 3
export const RETRY_DELAY = 1000