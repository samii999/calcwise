/**
 * Savings Goal Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface SavingsGoalInputs {
  targetAmount: number
  currentSavings: number
  monthlyContribution: number
  annualRate: number
  years: number
  contributionFrequency: 'weekly' | 'biweekly' | 'monthly'
  compoundFrequency: 'daily' | 'monthly' | 'annually'
  strategy: 'calculate-contribution' | 'calculate-time'
  targetTimeframeYears: number
  targetTimeframeMonths: number
}

export interface SavingsGoalResults {
  futureValue: number
  totalContributions: number
  totalInterest: number
  targetAchieved: boolean
  shortfall: number
  requiredMonthlyContribution: number
  yearlyData: YearlyData[]
  apyImpact?: {
    standardAPY: number
    highYieldAPY: number
    extraInterest: number
    monthsSaved: number
  }
}

export interface YearlyData {
  year: number
  balance: number
  contributions: number
  interest: number
  totalContributions: number
  inflationAdjusted?: number
}

export function calculateSavingsGoal(inputs: SavingsGoalInputs): SavingsGoalResults {
  const {
    targetAmount,
    currentSavings,
    monthlyContribution,
    annualRate,
    years,
    contributionFrequency = 'monthly',
    compoundFrequency = 'monthly',
    strategy = 'calculate-contribution',
    targetTimeframeYears = 3,
    targetTimeframeMonths = 0,
  } = inputs

  // ===== 1. DETERMINE TIME FRAME =====
  let totalYears = years
  if (strategy === 'calculate-contribution') {
    totalYears = targetTimeframeYears + targetTimeframeMonths / 12
  }

  // ===== 2. COMPOUNDING FREQUENCY =====
  const freqMap = {
    daily: 365,
    monthly: 12,
    annually: 1,
  }
  const periodsPerYear = freqMap[compoundFrequency]
  const ratePerPeriod = annualRate / 100 / periodsPerYear
  const totalPeriods = totalYears * periodsPerYear

  // ===== 3. CONTRIBUTION FREQUENCY =====
  let contribPerPeriod = monthlyContribution
  if (contributionFrequency === 'weekly') {
    contribPerPeriod = monthlyContribution / 4.33
  } else if (contributionFrequency === 'biweekly') {
    contribPerPeriod = monthlyContribution / 2.17
  }

  // ===== 4. FUTURE VALUE =====
  // Future value of current savings
  const futureValueSavings = currentSavings * Math.pow(1 + ratePerPeriod, totalPeriods)

  // Future value of contributions
  let futureValueContributions = 0
  if (contribPerPeriod > 0 && ratePerPeriod > 0) {
    futureValueContributions =
      contribPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod) *
      (1 + ratePerPeriod)
  } else if (contribPerPeriod > 0) {
    futureValueContributions = contribPerPeriod * totalPeriods
  }

  const futureValue = futureValueSavings + futureValueContributions

  // ===== 5. REQUIRED CONTRIBUTION =====
  let requiredMonthlyContribution = 0
  if (strategy === 'calculate-contribution') {
    const remaining = targetAmount - futureValueSavings
    if (remaining > 0 && ratePerPeriod > 0) {
      const annuityFactor = ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod) *
        (1 + ratePerPeriod)
      requiredMonthlyContribution = remaining / annuityFactor
      // Convert back to monthly based on frequency
      if (contributionFrequency === 'weekly') {
        requiredMonthlyContribution = requiredMonthlyContribution * 4.33
      } else if (contributionFrequency === 'biweekly') {
        requiredMonthlyContribution = requiredMonthlyContribution * 2.17
      }
    } else if (remaining > 0) {
      requiredMonthlyContribution = remaining / totalPeriods
    }
  }

  // ===== 6. TARGET ACHIEVED =====
  const targetAchieved = futureValue >= targetAmount
  const shortfall = Math.max(0, targetAmount - futureValue)

  // ===== 7. YEARLY DATA =====
  const yearlyData: YearlyData[] = []
  let balance = currentSavings
  let totalContributions = currentSavings
  let totalInterest = 0
  const periodsPerYearLocal = periodsPerYear

  for (let year = 1; year <= Math.ceil(totalYears); year++) {
    let yearContributions = 0
    let yearEndBalance = balance

    for (let period = 1; period <= periodsPerYearLocal; period++) {
      const periodContrib = contribPerPeriod
      const periodInterest = yearEndBalance * ratePerPeriod
      yearEndBalance = yearEndBalance + periodContrib + periodInterest
      yearContributions += periodContrib
    }

    const yearInterest = yearEndBalance - balance - yearContributions
    totalInterest += yearInterest
    totalContributions += yearContributions
    balance = yearEndBalance

    yearlyData.push({
      year,
      balance: Math.round(balance),
      contributions: Math.round(yearContributions),
      interest: Math.round(yearInterest),
      totalContributions: Math.round(totalContributions),
    })
  }

  // ===== 8. APY IMPACT =====
  let apyImpact = undefined
  if (strategy === 'calculate-time' && monthlyContribution > 0) {
    // Standard checking account (0.01% APY) vs High-Yield Savings (4.5% APY)
    const standardRate = 0.01
    const highYieldRate = 4.5

    const standardResult = calculateSavingsGoal({
      ...inputs,
      annualRate: standardRate,
      strategy: 'calculate-time',
    })
    const highYieldResult = calculateSavingsGoal({
      ...inputs,
      annualRate: highYieldRate,
      strategy: 'calculate-time',
    })

    apyImpact = {
      standardAPY: standardRate,
      highYieldAPY: highYieldRate,
      extraInterest: Math.max(0, highYieldResult.futureValue - standardResult.futureValue),
      monthsSaved: Math.max(0, standardResult.yearlyData.length * 12 - highYieldResult.yearlyData.length * 12),
    }
  }

  return {
    futureValue: Math.round(futureValue),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    targetAchieved,
    shortfall: Math.round(shortfall),
    requiredMonthlyContribution: Math.round(requiredMonthlyContribution),
    yearlyData,
    apyImpact,
  }
}