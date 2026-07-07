/**
 * Simple Interest Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface SimpleInterestInputs {
  principal: number
  rate: number
  timeValue: number
  timeUnit: 'days' | 'months' | 'years'
  taxRate: number
  maintenanceFees: number
  feeFrequency: 'monthly' | 'yearly'
  country: string
}

export interface SimpleInterestResults {
  interest: number
  totalAmount: number
  taxLiability: number
  totalFees: number
  netProfit: number
  netYield: number
  yearlyData: YearlyData[]
  compoundComparison?: {
    compoundInterest: number
    compoundAmount: number
    extraEarned: number
  }
}

export interface YearlyData {
  year: number
  balance: number
  interest: number
  taxes: number
  fees: number
  netBalance: number
}

export function calculateSimpleInterest(inputs: SimpleInterestInputs): SimpleInterestResults {
  const {
    principal,
    rate,
    timeValue,
    timeUnit,
    taxRate = 0,
    maintenanceFees = 0,
    feeFrequency = 'yearly',
  } = inputs

  // ===== 1. NORMALIZE TIME =====
  let years = timeValue
  if (timeUnit === 'months') years = timeValue / 12
  if (timeUnit === 'days') years = timeValue / 365

  const rateDecimal = rate / 100

  // ===== 2. CALCULATE INTEREST =====
  const interest = principal * rateDecimal * years
  const totalAmount = principal + interest

  // ===== 3. TAX LIABILITY =====
  const taxLiability = interest * (taxRate / 100)

  // ===== 4. FEES =====
  let totalFees = 0
  if (feeFrequency === 'monthly') {
    totalFees = maintenanceFees * years * 12
  } else {
    totalFees = maintenanceFees * years
  }

  // ===== 5. NET PROFIT =====
  const netProfit = interest - taxLiability - totalFees
  const netBalance = principal + netProfit
  const netYield = principal > 0 ? (netProfit / principal) * 100 : 0

  // ===== 6. YEARLY DATA =====
  const yearlyData: YearlyData[] = []
  let balance = principal
  const yearlyInterest = principal * rateDecimal

  for (let year = 1; year <= Math.ceil(years); year++) {
    const yearInterest = yearlyInterest
    const yearTax = yearInterest * (taxRate / 100)
    const yearFees = feeFrequency === 'monthly' ? maintenanceFees * 12 : maintenanceFees
    
    balance += yearInterest - yearTax - yearFees

    yearlyData.push({
      year,
      balance: Math.round(balance),
      interest: Math.round(yearInterest),
      taxes: Math.round(yearTax),
      fees: Math.round(yearFees),
      netBalance: Math.round(balance),
    })
  }

  // ===== 7. COMPOUND COMPARISON =====
  let compoundComparison = undefined
  if (years > 0 && principal > 0) {
    const monthlyRate = rate / 100 / 12
    const totalMonths = years * 12
    const compoundAmount = principal * Math.pow(1 + monthlyRate, totalMonths)
    const compoundInterest = compoundAmount - principal
    const extraEarned = Math.max(0, compoundInterest - interest)

    compoundComparison = {
      compoundInterest: Math.round(compoundInterest),
      compoundAmount: Math.round(compoundAmount),
      extraEarned: Math.round(extraEarned),
    }
  }

  return {
    interest: Math.round(interest),
    totalAmount: Math.round(totalAmount),
    taxLiability: Math.round(taxLiability),
    totalFees: Math.round(totalFees),
    netProfit: Math.round(netProfit),
    netYield: Math.round(netYield * 100) / 100,
    yearlyData,
    compoundComparison,
  }
}