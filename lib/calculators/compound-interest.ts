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
  contributionFrequency: 'monthly' | 'annually'
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

  const periodsPerYear = FREQUENCIES[compoundFrequency]
  const ratePerPeriod = annualRate / 100 / periodsPerYear
  const totalPeriods = years * periodsPerYear

  // ===== 1. FUTURE VALUE OF PRINCIPAL =====
  const futureValuePrincipal = principal * Math.pow(1 + ratePerPeriod, totalPeriods)

  // ===== 2. FUTURE VALUE OF CONTRIBUTIONS =====
  let futureValueContributions = 0
  let totalContributions = 0

  if (contributionFrequency === 'monthly') {
    const months = years * 12
    const monthlyRate = annualRate / 100 / 12
    const contribution = monthlyContribution

    if (monthlyRate === 0) {
      futureValueContributions = contribution * months
      totalContributions = contribution * months
    } else {
      const factor = Math.pow(1 + monthlyRate, months)
      // ✅ Correct formula: For beginning, multiply by (1+r) once
      if (contributionTiming === 'beginning') {
        futureValueContributions = contribution * (1 + monthlyRate) * ((factor - 1) / monthlyRate)
      } else {
        futureValueContributions = contribution * ((factor - 1) / monthlyRate)
      }
      totalContributions = contribution * months
    }
  } else {
    // Annual contributions
    const annualContribution = monthlyContribution * 12
    const annualRateDecimal = annualRate / 100
    let balance = 0

    for (let year = 1; year <= years; year++) {
      if (contributionTiming === 'beginning') {
        balance = (balance + annualContribution) * (1 + annualRateDecimal)
      } else {
        balance = balance * (1 + annualRateDecimal) + annualContribution
      }
      totalContributions += annualContribution
    }
    futureValueContributions = balance
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

    if (contributionFrequency === 'monthly') {
      const monthlyRate = annualRate / 100 / 12
      for (let month = 1; month <= 12; month++) {
        if (contributionTiming === 'beginning') {
          yearEndBalance = (yearEndBalance + monthlyContribution) * (1 + monthlyRate)
          yearContributions += monthlyContribution
        } else {
          yearEndBalance = yearEndBalance * (1 + monthlyRate) + monthlyContribution
          yearContributions += monthlyContribution
        }
      }
    } else {
      const annualRateDecimal = annualRate / 100
      const annualContribution = monthlyContribution * 12
      if (contributionTiming === 'beginning') {
        yearEndBalance = (yearEndBalance + annualContribution) * (1 + annualRateDecimal)
      } else {
        yearEndBalance = yearEndBalance * (1 + annualRateDecimal) + annualContribution
      }
      yearContributions = annualContribution
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

    // Calculate directly without recursion
    const extraMonthlyContribution = monthlyContribution + extraContribution
    let extraFutureValue = 0

    if (contributionFrequency === 'monthly') {
      const months = years * 12
      const monthlyRate = annualRate / 100 / 12
      const contribution = extraMonthlyContribution

      if (monthlyRate === 0) {
        extraFutureValue = contribution * months
      } else {
        const factor = Math.pow(1 + monthlyRate, months)
        // ✅ Same correction here
        if (contributionTiming === 'beginning') {
          extraFutureValue = contribution * (1 + monthlyRate) * ((factor - 1) / monthlyRate)
        } else {
          extraFutureValue = contribution * ((factor - 1) / monthlyRate)
        }
      }
    } else {
      const annualContribution = extraMonthlyContribution * 12
      const annualRateDecimal = annualRate / 100
      let balance = 0
      for (let year = 1; year <= years; year++) {
        if (contributionTiming === 'beginning') {
          balance = (balance + annualContribution) * (1 + annualRateDecimal)
        } else {
          balance = balance * (1 + annualRateDecimal) + annualContribution
        }
      }
      extraFutureValue = balance
    }

    const extraFutureValuePrincipal = principal * Math.pow(1 + ratePerPeriod, totalPeriods)
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