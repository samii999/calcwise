/**
 * Home Affordability Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface HomeAffordabilityInputs {
  annualIncome: number
  monthlyDebt: number
  downPayment: number
  interestRate: number
  loanTerm: number
  propertyTaxRate: number
  homeInsurance: number
  hoaDues: number
  maintenancePercent: number
  maxDtiRatio: number
  country: string
}

export interface HomeAffordabilityResults {
  maxHomePrice: number
  maxLoanAmount: number
  monthlyPayment: number
  downPayment: number
  dtiRatio: number
  status: 'ideal' | 'acceptable' | 'warning' | 'critical'
  statusLabel: string
  affordabilitySummary: AffordabilitySummary
  recommendedHomePrice: number
  maxAllowedPayment: number
  conservative: AffordabilityTier
  moderate: AffordabilityTier
  aggressive: AffordabilityTier
}

export interface AffordabilityTier {
  maxHomePrice: number
  maxLoanAmount: number
  monthlyPayment: number
  dtiRatio: number
}

export interface AffordabilitySummary {
  income: number
  debt: number
  maxPayment: number
  actualPayment: number
  remainingBudget: number
  dtiRatio: number
}

export function calculateHomeAffordability(
  inputs: HomeAffordabilityInputs
): HomeAffordabilityResults {
  const {
    annualIncome,
    monthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,    // ✅ Use input value (auto-filled by country selector)
    homeInsurance,
    hoaDues,
    maintenancePercent,
    maxDtiRatio = 36,
    country,            // ⚠️ Kept for completeness, not used directly
  } = inputs

  // ❌ Removed: import { getCountryTaxRate } and const propertyTaxRate = getCountryTaxRate(country)

  const monthlyIncome = annualIncome / 12

  // ===== 1. CALCULATE THREE TIERS =====
  const conservativeDti = 28
  const moderateDti = 36
  const aggressiveDti = 43

  const conservative = calculateTier(
    monthlyIncome,
    monthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,   // ✅ Pass input rate
    homeInsurance,
    hoaDues,
    maintenancePercent,
    conservativeDti
  )

  const moderate = calculateTier(
    monthlyIncome,
    monthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeInsurance,
    hoaDues,
    maintenancePercent,
    moderateDti
  )

  const aggressive = calculateTier(
    monthlyIncome,
    monthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeInsurance,
    hoaDues,
    maintenancePercent,
    aggressiveDti
  )

  // ===== 2. STATUS =====
  const dtiRatio = moderate.dtiRatio
  let status: 'ideal' | 'acceptable' | 'warning' | 'critical'
  let statusLabel: string

  if (dtiRatio < 28) {
    status = 'ideal'
    statusLabel = '🌟 Ideal - Excellent financial position'
  } else if (dtiRatio <= 36) {
    status = 'acceptable'
    statusLabel = '✅ Acceptable - Within recommended limits'
  } else if (dtiRatio <= 43) {
    status = 'warning'
    statusLabel = '⚠️ Warning - Close to lending limits'
  } else {
    status = 'critical'
    statusLabel = '🚨 Critical - Exceeds recommended DTI limits'
  }

  // ===== 3. AFFORDABILITY SUMMARY =====
  const maxAllowedPayment = monthlyIncome * (maxDtiRatio / 100) - monthlyDebt

  const affordabilitySummary: AffordabilitySummary = {
    income: Math.round(monthlyIncome),
    debt: Math.round(monthlyDebt),
    maxPayment: Math.round(maxAllowedPayment),
    actualPayment: Math.round(moderate.monthlyPayment),
    remainingBudget: Math.round(maxAllowedPayment - moderate.monthlyPayment),
    dtiRatio: Math.round(dtiRatio * 10) / 10,
  }

  // ===== 4. RECOMMENDED HOME PRICE =====
  const recommendedDti = maxDtiRatio - 5
  const recommended = calculateTier(
    monthlyIncome,
    monthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeInsurance,
    hoaDues,
    maintenancePercent,
    recommendedDti
  )

  return {
    maxHomePrice: moderate.maxHomePrice,
    maxLoanAmount: moderate.maxLoanAmount,
    monthlyPayment: moderate.monthlyPayment,
    downPayment: Math.round(downPayment),
    dtiRatio: Math.round(dtiRatio * 10) / 10,
    status,
    statusLabel,
    affordabilitySummary,
    recommendedHomePrice: recommended.maxHomePrice,
    maxAllowedPayment: Math.round(maxAllowedPayment),
    conservative,
    moderate,
    aggressive,
  }
}

function calculateTier(
  monthlyIncome: number,
  monthlyDebt: number,
  downPayment: number,
  interestRate: number,
  loanTerm: number,
  propertyTaxRate: number,
  homeInsurance: number,
  hoaDues: number,
  maintenancePercent: number,
  dtiLimit: number
): AffordabilityTier {
  const maxMonthlyPayment = monthlyIncome * (dtiLimit / 100) - monthlyDebt
  const monthlyRate = interestRate / 100 / 12
  const totalMonths = loanTerm * 12

  // Calculate max loan amount (principal + interest only)
  let maxLoanAmount = 0
  if (maxMonthlyPayment > 0 && monthlyRate > 0) {
    maxLoanAmount =
      (maxMonthlyPayment * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
  } else if (maxMonthlyPayment > 0) {
    maxLoanAmount = maxMonthlyPayment * totalMonths
  }

  // Adjust for taxes, insurance, HOA, maintenance
  const maxHomePrice = maxLoanAmount + downPayment

  // Calculate actual payment for this tier
  const loanAmount = maxLoanAmount
  let principalAndInterest = 0
  if (loanAmount > 0 && monthlyRate > 0) {
    principalAndInterest =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  } else if (loanAmount > 0) {
    principalAndInterest = loanAmount / totalMonths
  }

  const monthlyTax = maxHomePrice * (propertyTaxRate / 100) / 12
  const monthlyInsurance = homeInsurance / 12
  const monthlyMaintenance = maxHomePrice * (maintenancePercent / 100) / 12
  const monthlyHoa = hoaDues

  const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyMaintenance + monthlyHoa

  // Calculate actual DTI for this tier
  const dtiRatio = ((totalMonthlyPayment + monthlyDebt) / monthlyIncome) * 100

  return {
    maxHomePrice: Math.round(maxHomePrice),
    maxLoanAmount: Math.round(maxLoanAmount),
    monthlyPayment: Math.round(totalMonthlyPayment),
    dtiRatio: Math.round(dtiRatio * 10) / 10,
  }
}