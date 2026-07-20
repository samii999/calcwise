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
  desiredRetirementIncome: number
  socialSecurityIncome: number
  pensionIncome: number
  otherRetirementIncome: number
  preRetirementTaxRate: number
  postRetirementTaxRate: number
  annualHealthcareCost: number
  accountType: 'traditional401k' | 'roth401k' | 'traditionalira' | 'rothira' | 'taxable'
  maritalStatus: 'single' | 'married' | 'widowed'
  expectedLumpSum: number
  retirementExpenseMultiplier: number
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
  totalRetirementIncome: number
  incomeGap: number
  savingsGoal: number
  projectedSocialSecurity: number
  totalHealthcareCosts: number
  taxSavings: number
  recommendedContribution: number
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
  salary: number
  taxesPaid: number
  healthcareCost: number
  totalIncome: number
  totalExpenses: number
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
    desiredRetirementIncome,
    socialSecurityIncome,
    pensionIncome,
    otherRetirementIncome,
    preRetirementTaxRate,
    postRetirementTaxRate,
    annualHealthcareCost,
    accountType,
    maritalStatus,
    expectedLumpSum,
    retirementExpenseMultiplier,
  } = inputs

  const yearsUntilRetirement = Math.max(0, retirementAge - currentAge)
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge)
  const totalYears = yearsUntilRetirement + yearsInRetirement

  // ===== 1. CALCULATE SAVINGS GOAL =====
  const annualExpenses = currentSalary * (retirementExpenseMultiplier / 100)
  const totalAnnualIncomeNeeded = desiredRetirementIncome || annualExpenses
  const totalRetirementIncome = socialSecurityIncome + pensionIncome + otherRetirementIncome
  const incomeFromSavingsNeeded = Math.max(0, totalAnnualIncomeNeeded - totalRetirementIncome)
  const savingsGoal = incomeFromSavingsNeeded * 25 // 4% rule inverse

  // ===== 2. EMPLOYER MATCH CALCULATION =====
  const personalContribution = currentSalary * (contributionRate / 100)
  const maxMatch = currentSalary * (employerMatchLimit / 100)
  const employerMatch = Math.min(personalContribution * (employerMatchRate / 100), maxMatch)
  
  // ===== 3. TAX SAVINGS CALCULATION =====
  let taxSavings = 0
  if (accountType === 'traditional401k' || accountType === 'traditionalira') {
    taxSavings = personalContribution * (preRetirementTaxRate / 100)
  }

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

  // ===== 4. RECOMMENDED CONTRIBUTION =====
  const yearsToGrow = retirementAge - currentAge
  const futureValueNeeded = savingsGoal - currentSavings * Math.pow(1 + preRetirementReturn / 100, yearsToGrow)
  const annualContributionNeeded = futureValueNeeded > 0 
    ? futureValueNeeded / (((Math.pow(1 + preRetirementReturn / 100, yearsToGrow) - 1) / (preRetirementReturn / 100)))
    : 0
  const recommendedContribution = Math.max(0, annualContributionNeeded)
  
  // ===== 5. SIMULATION LOOP =====
  const yearlyData: YearlyData[] = []
  let balance = currentSavings
  let salary = currentSalary
  let totalPersonalContributions = 0
  let totalEmployerMatch = 0
  let totalReturns = 0
  let shortfall = 0
  let isSustainable = true
  let totalHealthcareCosts = 0
  let totalTaxesPaid = 0
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
    let yearTaxes = 0
    let yearHealthcare = 0

    if (!isRetired) {
      // Salary growth (only if year > 1, but we apply it at start of each year)
      if (year > 1) {
        salary = salary * (1 + salaryGrowthRate / 100)
      }

      const personalContrib = salary * (contributionRate / 100)
      const maxMatchAmount = salary * (employerMatchLimit / 100)
      const employerMatchAmount = Math.min(personalContrib * (employerMatchRate / 100), maxMatchAmount)
      
      // Calculate tax savings from contributions
      const yearTaxSavings = (accountType === 'traditional401k' || accountType === 'traditionalira')
        ? personalContrib * (preRetirementTaxRate / 100)
        : 0
      yearTaxes = yearTaxSavings
      totalTaxesPaid += yearTaxSavings

      yearContributions = personalContrib
      yearEmployerMatch = employerMatchAmount
      totalPersonalContributions += personalContrib
      totalEmployerMatch += employerMatchAmount
    } else {
      // Healthcare costs in retirement (inflated)
      yearHealthcare = annualHealthcareCost * Math.pow(1 + inflationRate / 100, year - yearsUntilRetirement)
      totalHealthcareCosts += yearHealthcare
      
      // Taxes on withdrawals (for traditional accounts)
      if (accountType === 'traditional401k' || accountType === 'traditionalira') {
        yearTaxes = annualWithdrawal * (postRetirementTaxRate / 100)
        totalTaxesPaid += yearTaxes
      }
    }

    // Calculate withdrawal
    let yearWithdrawal = 0
    let totalYearlyIncome = 0
    let totalYearlyExpenses = 0
    
    if (isRetired) {
      // Add expected lump sum at retirement year
      if (age === retirementAge && expectedLumpSum > 0) {
        balance += expectedLumpSum
      }
      
      yearWithdrawal = annualWithdrawal || incomeFromSavingsNeeded
      
      // Calculate total income in retirement
      const inflatedSocialSecurity = socialSecurityIncome * Math.pow(1 + inflationRate / 100, year - yearsUntilRetirement)
      const inflatedPension = pensionIncome * Math.pow(1 + inflationRate / 100, year - yearsUntilRetirement)
      const inflatedOtherIncome = otherRetirementIncome * Math.pow(1 + inflationRate / 100, year - yearsUntilRetirement)
      
      totalYearlyIncome = inflatedSocialSecurity + inflatedPension + inflatedOtherIncome + yearWithdrawal
      totalYearlyExpenses = yearHealthcare + yearWithdrawal + yearTaxes
    }

    // Calculate return
    const yearReturn = balance * annualReturnRate

    // Update balance
    balance = balance + yearContributions + yearEmployerMatch + yearReturn - yearWithdrawal - yearHealthcare

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
      salary: Math.round(salary),
      taxesPaid: Math.round(yearTaxes),
      healthcareCost: Math.round(yearHealthcare),
      totalIncome: Math.round(totalYearlyIncome),
      totalExpenses: Math.round(totalYearlyExpenses),
    })

    // Early exit if balance is zero and retired
    if (balance <= epsilon && isRetired) break
  }

  // ===== 4. RETIREMENT BALANCE =====
  const retirementBalance = yearlyData.find(d => d.age === retirementAge)?.balance || 0

  // ===== 6. MONTHLY INCOME (4% Rule) =====
  const monthlyIncome = retirementBalance * 0.04 / 12
  const inflationAdjustedIncome = monthlyIncome / Math.pow(1 + inflationRate / 100, yearsUntilRetirement)
  
  // ===== 7. INCOME GAP ANALYSIS =====
  const totalMonthlyRetirementIncome = (socialSecurityIncome + pensionIncome + otherRetirementIncome + monthlyIncome) / 12
  const monthlyIncomeNeeded = totalAnnualIncomeNeeded / 12
  const incomeGap = Math.max(0, monthlyIncomeNeeded - totalMonthlyRetirementIncome)
  
  // ===== 8. PROJECTED SOCIAL SECURITY =====
  const projectedSocialSecurity = socialSecurityIncome * Math.pow(1 + inflationRate / 100, yearsUntilRetirement)

  // ===== 9. SUSTAINABILITY CHECK =====
  const effectiveWithdrawalRate = annualWithdrawal > 0 ? annualWithdrawal / retirementBalance : 0
  isSustainable = effectiveWithdrawalRate <= 0.04 && retirementBalance >= savingsGoal * 0.8

  // ===== 10. SHORTFALL =====
  if (!isSustainable && retirementBalance > 0) {
    shortfall = Math.round(savingsGoal - retirementBalance)
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
    totalRetirementIncome: Math.round(totalRetirementIncome),
    incomeGap: Math.round(incomeGap),
    savingsGoal: Math.round(savingsGoal),
    projectedSocialSecurity: Math.round(projectedSocialSecurity),
    totalHealthcareCosts: Math.round(totalHealthcareCosts),
    taxSavings: Math.round(taxSavings + totalTaxesPaid),
    recommendedContribution: Math.round(recommendedContribution),
  }
}