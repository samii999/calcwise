/**
 * Compound Interest Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface CompoundInterestInputs {
  principal: number
  monthlyContribution: number
  annualRate: number
  years: number
  compoundFrequency: 'daily' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually'
  contributionFrequency: 'weekly' | 'bi-weekly' | 'monthly' | 'annually'
  contributionTiming: 'beginning' | 'end'
  inflationRate: number
}

export interface CompoundInterestResults {
  endingBalance: number
  totalPrincipal: number
  totalContributions: number
  interestEarned: number
  inflationAdjustedValue: number
  realReturn: number
  yearlyData: YearlyData[]
  contributionImpact?: {
    extraContribution: number
    extraGrowth: number
  }
}

export interface YearlyData {
  year: number
  balance: number
  contributions: number
  interest: number
  totalInterest: number
  inflationAdjusted?: number
}

const FREQUENCIES = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  'semi-annually': 2,
  annually: 1,
}

const CONTRIBUTION_PERIODS = {
  weekly: 52,
  'bi-weekly': 26,
  monthly: 12,
  annually: 1,
}

/**
 * Calculate compound interest with all features
 */
export function calculateCompoundInterest(
  inputs: CompoundInterestInputs
): CompoundInterestResults {
  const {
    principal,
    monthlyContribution,
    annualRate,
    years,
    compoundFrequency = 'monthly',
    contributionFrequency = 'monthly',
    contributionTiming = 'beginning',
    inflationRate = 0,
  } = inputs

  const compoundPeriodsPerYear = FREQUENCIES[compoundFrequency]
  const compoundRatePerPeriod = annualRate / 100 / compoundPeriodsPerYear
  const compoundTotalPeriods = years * compoundPeriodsPerYear

  const contributionPeriodsPerYear = CONTRIBUTION_PERIODS[contributionFrequency]
  const contributionTotalPeriods = years * contributionPeriodsPerYear
  const contributionPerPeriod = monthlyContribution * 12 / contributionPeriodsPerYear

  // ===== 1. FUTURE VALUE OF PRINCIPAL =====
  const futureValuePrincipal = principal * Math.pow(1 + compoundRatePerPeriod, compoundTotalPeriods)

  // ===== 2. FUTURE VALUE OF CONTRIBUTIONS =====
  let futureValueContributions = 0
  let totalContributions = 0
  
  // Calculate future value of each contribution
  // Each contribution compounds at the compound frequency from when it's made
  for (let i = 0; i < contributionTotalPeriods; i++) {
    // This contribution is made at period i (0-indexed)
    // If timing is 'beginning', it compounds for (totalPeriods - i) periods
    // If timing is 'end', it compounds for (totalPeriods - i - 1) periods
    let periodsToCompound = contributionTotalPeriods - i
    if (contributionTiming === 'end') {
      periodsToCompound -= 1
    }
    
    if (periodsToCompound <= 0) continue
    
    // Convert contribution periods to compound periods
    const compoundPeriodsToCompound = periodsToCompound * (compoundPeriodsPerYear / contributionPeriodsPerYear)
    
    // Future value of this contribution
    if (compoundRatePerPeriod === 0) {
      futureValueContributions += contributionPerPeriod
    } else {
      futureValueContributions += contributionPerPeriod * Math.pow(1 + compoundRatePerPeriod, compoundPeriodsToCompound)
    }
    totalContributions += contributionPerPeriod
  }

  // ===== 3. ENDING BALANCE =====
  const endingBalance = futureValuePrincipal + futureValueContributions
  const interestEarned = endingBalance - principal - totalContributions

  // ===== 4. INFLATION ADJUSTED VALUE =====
  const inflationFactor = Math.pow(1 + inflationRate / 100, years)
  const inflationAdjustedValue = endingBalance / inflationFactor
  const realReturn = ((1 + annualRate / 100) / (1 + inflationRate / 100) - 1) * 100

  // ===== 5. YEARLY DATA =====
  const yearlyData: YearlyData[] = []
  let currentBalance = principal
  let totalInterestSoFar = 0
  let totalContributionsSoFar = principal

  for (let year = 1; year <= years; year++) {
    let yearContributions = 0
    let yearEndBalance = currentBalance
    
    // Compound the existing balance for one year
    const yearCompoundPeriods = compoundPeriodsPerYear
    yearEndBalance = yearEndBalance * Math.pow(1 + compoundRatePerPeriod, yearCompoundPeriods)
    
    // Add contributions made during this year
    const yearStartContributionIndex = (year - 1) * contributionPeriodsPerYear
    const yearEndContributionIndex = year * contributionPeriodsPerYear
    
    for (let i = yearStartContributionIndex; i < yearEndContributionIndex; i++) {
      // This contribution is made at period i
      // Calculate how many compound periods it has within this year
      let periodsToCompound = yearEndContributionIndex - i
      if (contributionTiming === 'end') {
        periodsToCompound -= 1
      }
      
      if (periodsToCompound <= 0) continue
      
      // Convert contribution periods to compound periods
      const compoundPeriodsToCompound = periodsToCompound * (compoundPeriodsPerYear / contributionPeriodsPerYear)
      
      // Future value of this contribution by end of year
      if (compoundRatePerPeriod === 0) {
        yearEndBalance += contributionPerPeriod
      } else {
        yearEndBalance += contributionPerPeriod * Math.pow(1 + compoundRatePerPeriod, compoundPeriodsToCompound)
      }
      yearContributions += contributionPerPeriod
    }

    const yearInterest = yearEndBalance - currentBalance - yearContributions
    totalInterestSoFar += yearInterest
    totalContributionsSoFar += yearContributions
    currentBalance = yearEndBalance

    yearlyData.push({
      year,
      balance: Math.round(yearEndBalance),
      contributions: Math.round(yearContributions),
      interest: Math.round(yearInterest),
      totalInterest: Math.round(totalInterestSoFar),
      inflationAdjusted: inflationRate > 0 ? Math.round(yearEndBalance / Math.pow(1 + inflationRate / 100, year)) : undefined,
    })
  }

  // ===== 6. CONTRIBUTION IMPACT (Direct Calculation - No Recursion) =====
  let contributionImpact = undefined
  if (monthlyContribution > 0) {
    const extraContribution = Math.round(monthlyContribution * 0.25)

    // Calculate directly without recursion using same logic as main calculation
    const extraMonthlyContribution = monthlyContribution + extraContribution
    const extraContributionPerPeriod = extraMonthlyContribution * 12 / contributionPeriodsPerYear
    let extraFutureValue = 0

    for (let i = 0; i < contributionTotalPeriods; i++) {
      let periodsToCompound = contributionTotalPeriods - i
      if (contributionTiming === 'end') {
        periodsToCompound -= 1
      }
      
      if (periodsToCompound <= 0) continue
      
      const compoundPeriodsToCompound = periodsToCompound * (compoundPeriodsPerYear / contributionPeriodsPerYear)
      
      if (compoundRatePerPeriod === 0) {
        extraFutureValue += extraContributionPerPeriod
      } else {
        extraFutureValue += extraContributionPerPeriod * Math.pow(1 + compoundRatePerPeriod, compoundPeriodsToCompound)
      }
    }

    const extraFutureValuePrincipal = principal * Math.pow(1 + compoundRatePerPeriod, compoundTotalPeriods)
    const extraEndingBalance = extraFutureValuePrincipal + extraFutureValue
    const extraGrowth = extraEndingBalance - endingBalance

    contributionImpact = {
      extraContribution,
      extraGrowth: Math.round(extraGrowth),
    }
  }

  return {
    endingBalance: Math.round(endingBalance),
    totalPrincipal: Math.round(principal),
    totalContributions: Math.round(totalContributions),
    interestEarned: Math.round(interestEarned),
    inflationAdjustedValue: Math.round(inflationAdjustedValue),
    realReturn: Math.round(realReturn * 100) / 100,
    yearlyData,
    contributionImpact,
  }
}