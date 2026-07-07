/**
 * Format a number as currency (USD)
 * Example: 1234567 -> $1,234,567
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount === 0) return '$0'
  if (!amount || isNaN(amount)) return '$0'

  const currencySymbols: Record<string, string> = {
    USD: '$',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    EUR: '€',
    INR: '₹',
    PKR: '₨',
  }

  const symbol = currencySymbols[currency] || '$'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'PKR' || currency === 'INR' ? 'USD' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\$/g, symbol)
}

/**
 * Format a number as currency with decimals
 * Example: 1234567.89 -> $1,234,567.89
 */
export function formatCurrencyDecimals(amount: number): string {
  if (!amount || isNaN(amount)) return '$0.00'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a number as percentage
 * Example: 6.5 -> 6.50%
 */
export function formatPercentage(value: number): string {
  if (!value || isNaN(value)) return '0%'
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

/**
 * Format a number with commas
 * Example: 1234567 -> 1,234,567
 */
export function formatNumber(value: number): string {
  if (!value || isNaN(value)) return '0'
  
  return new Intl.NumberFormat('en-US').format(value)
}

/**
 * Format a number in compact form
 * Example: 1234567 -> 1.2M
 */
export function formatCompactNumber(value: number): string {
  if (!value || isNaN(value)) return '0'
  
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value)
}

/**
 * Format a date
 * Example: new Date() -> Jul 4, 2026
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/**
 * Format a date with time
 * Example: new Date() -> Jul 4, 2026 3:30 PM
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/**
 * Abbreviate a number
 * Example: 1500000 -> 1.5M, 2500 -> 2.5K
 */
export function abbreviateNumber(value: number): string {
  if (!value || isNaN(value)) return '0'
  
  if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B'
  if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
  if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K'
  
  return value.toString()
}

/**
 * Format as USD with cents
 * Example: 1234.5 -> $1,234.50
 */
export function formatMoney(amount: number): string {
  if (!amount || isNaN(amount)) return '$0.00'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Parse currency string to number
 * Example: "$1,234.56" -> 1234.56
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, ''))
}

/**
 * Format percentage for display
 * Example: 0.065 -> 6.5%
 */
export function formatRate(rate: number): string {
  if (!rate || isNaN(rate)) return '0%'
  return (rate * 100).toFixed(2) + '%'
}