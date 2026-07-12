/**
 * Mortgage Calculator - Pure JavaScript Math Logic
 * Competition-Ready with Bi-Weekly, Extra Payments, and Full Amortization
 */

export interface MortgageInputs {
  homePrice: number
  downPayment: number
  downPaymentPercent: number
  loanTerm: number
  interestRate: number
  propertyTax: number
  homeInsurance: number
  hoaDues: number
  pmi: number
  extraPayment: number
  country: string
  isBiWeekly?: boolean
  isAcceleratedBiWeekly?: boolean
  oneTimePayments?: { year: number; amount: number }[]
}

export interface MortgageResults {
  monthlyPayment: number
  principalAndInterest: number
  totalInterest: number
  totalPayment: number
  loanAmount: number
  downPayment: number
  downPaymentPercent: number
  payoffDate: string
  propertyTaxMonthly: number
  totalTaxPaid: number
  insuranceMonthly: number
  totalInsurancePaid: number
  pmiMonthly: number
  totalPMIPaid: number
  hoaMonthly: number
  totalHOAPaid: number
  extraPaymentSavings: number
  extraPayoffMonths: number
  amortizationSchedule: AmortizationRow[]
  biWeeklySavings?: {
    interestSaved: number
    yearsSaved: number
    monthlyEquivalent: number
    biWeeklyPayment: number
  }
  oneTimePaymentImpact?: {
    interestSaved: number
    monthsSaved: number
  }
}

export interface AmortizationRow {
  year: number
  payment: number
  principal: number
  interest: number
  balance: number
  totalPaid: number
  extraPaymentApplied?: number
  oneTimePaymentApplied?: number
}

/**
 * Calculate mortgage payment and amortization schedule
 */
export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    hoaDues,
    pmi,
    extraPayment = 0,
    isBiWeekly = false,
    isAcceleratedBiWeekly = false,
    oneTimePayments = [],
  } = inputs

  // 1. Calculate Loan Amount
  const loanAmount = Math.max(0, homePrice - downPayment)
  const downPaymentPercent = (downPayment / homePrice) * 100

  // ✅ PMI only applies if down payment < 20%
  const pmiRate = downPaymentPercent < 20 ? pmi : 0

  // 2. Calculate Monthly Payment (Principal + Interest)
  // ✅ Canadian mortgage rules
  const rAnnual = interestRate / 100
  let monthlyRate = rAnnual / 12

  if (inputs.country?.toUpperCase() === 'CA' && rAnnual > 0) {
    // Canadian Law: Semi-annual compounding geometric conversion
    monthlyRate = Math.pow(1 + rAnnual / 2, 2 / 12) - 1
  }

  const totalPayments = loanTerm * 12

  let principalAndInterest = 0
  if (loanAmount === 0) {
    principalAndInterest = 0
  } else if (monthlyRate === 0) {
    principalAndInterest = loanAmount / totalPayments
  } else {
    principalAndInterest =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
  }

  // 4. Calculate Monthly Costs
  const propertyTaxMonthly = propertyTax / 12
  const insuranceMonthly = homeInsurance / 12
  const pmiMonthly = (loanAmount * (pmiRate / 100)) / 12  // ✅ Using pmiRate
  const hoaMonthly = hoaDues

  // 3. Bi-Weekly Calculation
  let biWeeklySavings = undefined
  let effectiveMonthlyPayment = principalAndInterest + extraPayment
  let effectiveLoanTerm = loanTerm
  let effectiveTotalPayments = totalPayments

  if (isBiWeekly && principalAndInterest > 0) {
    const monthlyPITI = principalAndInterest + propertyTaxMonthly + insuranceMonthly + pmiMonthly + hoaMonthly
    let biWeeklyPayment: number
    
    if (isAcceleratedBiWeekly) {
      // Accelerated Bi-Weekly: Monthly PITI / 2 (26 half-payments = 13 full payments/year)
      biWeeklyPayment = monthlyPITI / 2
    } else {
      // Standard Bi-Weekly: Monthly * 12 / 26
      biWeeklyPayment = (monthlyPITI * 12) / 26
    }
    
    let biWeeklyRate = interestRate / 100 / 26

    // ✅ Canadian bi-weekly rate
    if (inputs.country?.toUpperCase() === 'CA' && rAnnual > 0) {
      biWeeklyRate = Math.pow(1 + rAnnual / 2, 2 / 26) - 1
    }

    // Calculate effective payoff
    let biBalance = loanAmount
    let biPeriods = 0
    let biInterest = 0
    let biTotalPaid = 0

    // ✅ Convert one-time payments to bi-weekly periods correctly
    const biOneTimePayments = oneTimePayments.map((otp) => ({
      period: Math.round(otp.year * 26),
      amount: otp.amount,
    }))

    while (biBalance > 0 && biPeriods < 1200) {
      biPeriods++
      const biInterestPayment = biBalance * biWeeklyRate
      let biPrincipalPayment = biWeeklyPayment - biInterestPayment

      // Check for one-time payment at this period
      const otp = biOneTimePayments.find((p) => p.period === biPeriods)
      if (otp) {
        biPrincipalPayment += otp.amount
      }

      biPrincipalPayment = Math.min(biPrincipalPayment, biBalance)
      biBalance -= biPrincipalPayment
      biInterest += biInterestPayment
      biTotalPaid += biWeeklyPayment + (otp ? otp.amount : 0)
    }

    const biTotalMonths = Math.ceil(biPeriods / 26 * 12)

    biWeeklySavings = {
      interestSaved: Math.round(calculateRegularInterest(loanAmount, monthlyRate, totalPayments) - biInterest),
      yearsSaved: Math.round((totalPayments / 12 - biTotalMonths / 12) * 10) / 10,
      monthlyEquivalent: Math.round(biWeeklyPayment * 26 / 12),
      biWeeklyPayment: Math.round(biWeeklyPayment),
    }

    effectiveLoanTerm = Math.ceil(biTotalMonths / 12)
    effectiveTotalPayments = biTotalMonths
  }

  // 5. Total Monthly Payment
  let monthlyPayment =
    principalAndInterest +
    propertyTaxMonthly +
    insuranceMonthly +
    pmiMonthly +
    hoaMonthly

  // ✅ If bi-weekly, show bi-weekly equivalent as monthly payment
  if (isBiWeekly && biWeeklySavings) {
    monthlyPayment = biWeeklySavings.monthlyEquivalent
  }

  // 6. Amortization Schedule with Extra Payment & One-Time Payments
  const amortizationSchedule: AmortizationRow[] = []
  let balance = loanAmount
  let totalInterest = 0
  let totalPrincipal = 0
  let totalMonthlyWithExtra: number
  let monthsPaid = 0
  let totalPayoffMonths: number
  let effectivePrincipalAndInterest = principalAndInterest

  // ✅ If bi-weekly, use bi-weekly payment for all calculations
  if (isBiWeekly && biWeeklySavings) {
    effectivePrincipalAndInterest = biWeeklySavings.monthlyEquivalent - propertyTaxMonthly - insuranceMonthly - pmiMonthly - hoaMonthly
    totalMonthlyWithExtra = effectivePrincipalAndInterest + extraPayment
    totalPayoffMonths = effectiveTotalPayments
  } else {
    totalMonthlyWithExtra = principalAndInterest + extraPayment
    totalPayoffMonths = totalPayments
  }

  // Create map for one-time payments by year
  const oneTimePaymentMap = new Map<number, number>()
  oneTimePayments.forEach((otp) => {
    if (oneTimePaymentMap.has(otp.year)) {
      oneTimePaymentMap.set(otp.year, (oneTimePaymentMap.get(otp.year) || 0) + otp.amount)
    } else {
      oneTimePaymentMap.set(otp.year, otp.amount)
    }
  })

  // ✅ Determine max years for loop (if bi-weekly, use effective term, else loan term)
  const maxYears = isBiWeekly ? Math.min(effectiveLoanTerm + 5, 40) : loanTerm

  for (let year = 1; year <= maxYears; year++) {
    if (balance <= 0) break

    let yearInterest = 0
    let yearPrincipal = 0
    let yearExtraPayment = 0
    let yearOneTimePayment = 0

    const oneTimeAmount = oneTimePaymentMap.get(year) || 0

    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break
      monthsPaid++

      // ✅ Apply one-time payment at the start of the year (month 1)
      if (month === 1 && oneTimeAmount > 0) {
        const otpPrincipal = Math.min(oneTimeAmount, balance)
        balance -= otpPrincipal
        yearOneTimePayment += otpPrincipal
        totalPrincipal += otpPrincipal
      }

      const monthlyInterest = balance * monthlyRate
      let monthlyPrincipal = Math.min(totalMonthlyWithExtra - monthlyInterest, balance)

      balance -= monthlyPrincipal
      yearInterest += monthlyInterest
      yearPrincipal += monthlyPrincipal
      yearExtraPayment += extraPayment

      if (balance <= 0) {
        balance = 0
        totalPayoffMonths = monthsPaid
        break
      }
    }

    if (balance < 0) balance = 0

    totalInterest += yearInterest
    totalPrincipal += yearPrincipal

    amortizationSchedule.push({
      year: year,
      payment: Math.round((effectivePrincipalAndInterest + extraPayment) * 12 + (yearOneTimePayment > 0 ? yearOneTimePayment : 0)),
      principal: Math.round(yearPrincipal + yearOneTimePayment),
      interest: Math.round(yearInterest),
      balance: Math.round(Math.max(0, balance)),
      totalPaid: Math.round(totalPrincipal + totalInterest),
      extraPaymentApplied: yearExtraPayment > 0 ? Math.round(yearExtraPayment) : undefined,
      oneTimePaymentApplied: yearOneTimePayment > 0 ? Math.round(yearOneTimePayment) : undefined,
    })

    if (balance === 0) break
  }

  // 7. Calculate Totals
  const totalPayment = loanAmount + totalInterest
  const actualLoanTerm = isBiWeekly ? effectiveLoanTerm : loanTerm
  const totalTaxPaid = propertyTax * actualLoanTerm
  const totalInsurancePaid = homeInsurance * actualLoanTerm
  const totalPMIPaid = pmiMonthly * 12 * actualLoanTerm
  const totalHOAPaid = hoaDues * 12 * actualLoanTerm

  // 8. Extra Payment Savings
  const regularTotalInterest = calculateRegularInterest(loanAmount, monthlyRate, totalPayments)
  const extraPaymentSavings = Math.max(0, Math.round(regularTotalInterest - totalInterest))
  const extraPayoffMonths = Math.max(0, totalPayments - totalPayoffMonths)

  // 9. One-Time Payment Impact
  let oneTimePaymentImpact = undefined
  if (oneTimePayments.length > 0 && oneTimePayments.some((otp) => otp.amount > 0)) {
    const baseResult = calculateMortgage({
      ...inputs,
      oneTimePayments: [],
    })
    const baseTotalInterest = baseResult.totalInterest
    const interestSaved = Math.max(0, baseTotalInterest - totalInterest)
    const monthsSaved = Math.max(0, baseResult.amortizationSchedule.length * 12 - amortizationSchedule.length * 12)

    oneTimePaymentImpact = {
      interestSaved: Math.round(interestSaved),
      monthsSaved: Math.round(monthsSaved),
    }
  }

  // 10. Payoff Date
  const now = new Date()
  const payoffDate = new Date(now)
  payoffDate.setMonth(payoffDate.getMonth() + totalPayoffMonths)
  const payoffDateStr = payoffDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return {
    monthlyPayment: Math.round(monthlyPayment),
    principalAndInterest: Math.round(effectivePrincipalAndInterest),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    loanAmount: Math.round(loanAmount),
    downPayment: Math.round(downPayment),
    downPaymentPercent,
    payoffDate: payoffDateStr,
    propertyTaxMonthly: Math.round(propertyTaxMonthly),
    totalTaxPaid: Math.round(totalTaxPaid),
    insuranceMonthly: Math.round(insuranceMonthly),
    totalInsurancePaid: Math.round(totalInsurancePaid),
    pmiMonthly: Math.round(pmiMonthly),
    totalPMIPaid: Math.round(totalPMIPaid),
    hoaMonthly: Math.round(hoaMonthly),
    totalHOAPaid: Math.round(totalHOAPaid),
    extraPaymentSavings,
    extraPayoffMonths,
    amortizationSchedule,
    biWeeklySavings,
    oneTimePaymentImpact,
  }
}

/**
 * Calculate regular interest (without extra payments)
 */
function calculateRegularInterest(
  loanAmount: number,
  monthlyRate: number,
  totalPayments: number
): number {
  let balance = loanAmount
  let totalInterest = 0

  if (monthlyRate === 0) return 0

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)

  for (let month = 1; month <= totalPayments; month++) {
    if (balance <= 0) break
    const monthlyInterest = balance * monthlyRate
    const monthlyPrincipal = monthlyPayment - monthlyInterest
    balance -= monthlyPrincipal
    totalInterest += monthlyInterest
  }

  return totalInterest
}