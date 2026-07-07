/**
 * Retirement Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface RetirementInputs {
  currentAge: number
  retirementAge: number
  currentSalary: number
  currentSavings: number
  contributionRate: number
  employerMatchRate: number
  employerMatchLimit: number
  preRetirementReturn: number
  postRetirementReturn: number
  salaryGrowthRate: number
  lifeExpectancy: number
  inflationRate: number
  annualWithdrawal: number
  country: string
}

export interface RetirementResults {
  retirementBalance: number
  monthlyIncome: number
  totalPersonalContributions: number
  totalEmployerMatch: number
  totalReturns: number
  inflationAdjustedIncome: number
  isSustainable: boolean
  yearsUntilRetirement: number
  yearlyData: YearlyData[]
  shortfall?: number
  employerMatchAlert?: {
    currentContribution: number
    maxMatch: number
    additionalNeeded: number
    additionalMatch: number
  }
}

export interface YearlyData {
  year: number
  age: number
  balance: number
  contributions: number
  employerMatch: number
  returns: number
  isRetired: boolean
  inflationAdjusted?: number
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResults {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    currentSavings,
    contributionRate,
    employerMatchRate,
    employerMatchLimit,
    preRetirementReturn,
    postRetirementReturn,
    salaryGrowthRate,
    lifeExpectancy,
    inflationRate,
    annualWithdrawal,
  } = inputs

  const yearsUntilRetirement = Math.max(0, retirementAge - currentAge)
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge)
  const totalYears = yearsUntilRetirement + yearsInRetirement

  // ===== 1. EMPLOYER MATCH CALCULATION =====
  const personalContribution = currentSalary * (contributionRate / 100)
  const maxMatch = currentSalary * (employerMatchLimit / 100)
  const employerMatch = Math.min(personalContribution * (employerMatchRate / 100), maxMatch)

  // ===== 2. EMPLOYER MATCH ALERT =====
  let employerMatchAlert = undefined
  if (contributionRate < employerMatchLimit && employerMatchRate > 0 && employerMatchLimit > 0) {
    const additionalNeeded = employerMatchLimit - contributionRate
    const additionalMatch = currentSalary * (additionalNeeded / 100) * (employerMatchRate / 100)
    employerMatchAlert = {
      currentContribution: Math.round(personalContribution),
      maxMatch: Math.round(maxMatch),
      additionalNeeded: Math.round(additionalNeeded),
      additionalMatch: Math.round(additionalMatch),
    }
  }

  // ===== 3. SIMULATION LOOP =====
  const yearlyData: YearlyData[] = []
  let balance = currentSavings
  let salary = currentSalary
  let totalPersonalContributions = 0
  let totalEmployerMatch = 0
  let totalReturns = 0
  let shortfall = 0
  let isSustainable = true
  const epsilon = 1e-9

  for (let year = 1; year <= totalYears; year++) {
    const age = currentAge + year
    const isRetired = age >= retirementAge

    // Determine return rate
    const returnRate = isRetired ? postRetirementReturn : preRetirementReturn
    const annualReturnRate = returnRate / 100

    // Calculate contributions
    let yearContributions = 0
    let yearEmployerMatch = 0

    if (!isRetired) {
      // Salary growth (only if year > 1, but we apply it at start of each year)
      if (year > 1) {
        salary = salary * (1 + salaryGrowthRate / 100)
      }

      const personalContrib = salary * (contributionRate / 100)
      const maxMatchAmount = salary * (employerMatchLimit / 100)
      const employerMatchAmount = Math.min(personalContrib * (employerMatchRate / 100), maxMatchAmount)

      yearContributions = personalContrib
      yearEmployerMatch = employerMatchAmount
      totalPersonalContributions += personalContrib
      totalEmployerMatch += employerMatchAmount
    }

    // Calculate withdrawal
    let yearWithdrawal = 0
    if (isRetired) {
      yearWithdrawal = annualWithdrawal
    }

    // Calculate return
    const yearReturn = balance * annualReturnRate

    // Update balance
    balance = balance + yearContributions + yearEmployerMatch + yearReturn - yearWithdrawal

    // Handle negative balance
    if (balance < 0) {
      balance = 0
      shortfall = Math.abs(balance)
      isSustainable = false
    }

    totalReturns += yearReturn

    yearlyData.push({
      year,
      age,
      balance: Math.round(Math.max(0, balance)),
      contributions: Math.round(yearContributions),
      employerMatch: Math.round(yearEmployerMatch),
      returns: Math.round(yearReturn),
      isRetired,
      inflationAdjusted: Math.round(Math.max(0, balance) / Math.pow(1 + inflationRate / 100, year)),
    })

    // Early exit if balance is zero and retired
    if (balance <= epsilon && isRetired) break
  }

  // ===== 4. RETIREMENT BALANCE =====
  const retirementBalance = yearlyData.find(d => d.age === retirementAge)?.balance || 0

  // ===== 5. MONTHLY INCOME (4% Rule) =====
  const monthlyIncome = retirementBalance * 0.04 / 12
  const inflationAdjustedIncome = monthlyIncome / Math.pow(1 + inflationRate / 100, yearsUntilRetirement)

  // ===== 6. SUSTAINABILITY CHECK =====
  if (annualWithdrawal > 0 && retirementBalance > 0) {
    const withdrawalRate = annualWithdrawal / retirementBalance
    isSustainable = withdrawalRate <= 0.04
  }

  // ===== 7. SHORTFALL =====
  if (!isSustainable && retirementBalance > 0) {
    shortfall = Math.round(annualWithdrawal - retirementBalance * 0.04)
  }

  return {
    retirementBalance: Math.round(retirementBalance),
    monthlyIncome: Math.round(monthlyIncome),
    totalPersonalContributions: Math.round(totalPersonalContributions),
    totalEmployerMatch: Math.round(totalEmployerMatch),
    totalReturns: Math.round(totalReturns),
    inflationAdjustedIncome: Math.round(inflationAdjustedIncome),
    isSustainable,
    yearsUntilRetirement,
    yearlyData,
    shortfall: Math.round(shortfall),
    employerMatchAlert,
  }
}