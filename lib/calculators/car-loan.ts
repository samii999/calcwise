/**
 * Car Loan Calculator - High-Precision Mathematical Engine
 * Includes correct regional trade-in tax shields and true accelerated bi-weekly mechanics.
 */

export interface CarLoanInputs {
  vehiclePrice: number
  downPayment: number
  downPaymentPercent: number
  tradeInValue: number
  tradeInOwed: number // Remaining loan balance on trade-in vehicle
  interestRate: number
  loanTerm: number // in years
  salesTax: number // percentage, e.g., 6.25 for 6.25%
  registrationFees: number
  dealerFees: number // Dealer documentation/processing fee
  feeCapitalization: boolean // Roll fees into loan?
  extraPayment: number
  biWeeklyMode: boolean // Accelerated bi-weekly payment mode
  country: string
}

export interface CarLoanResults {
  monthlyPayment: number // Base monthly structural layout minimum
  totalInterest: number
  totalPayment: number // Total out-of-pocket tracking for financing
  loanAmount: number // True financed net balance
  downPayment: number
  downPaymentPercent: number
  tradeInValue: number
  salesTaxAmount: number
  totalCost: number // Real-world asset out-of-pocket expense tracking
  upfrontCashRequired: number // Cash required at signing when fees are not capitalized
  payoffDate: string
  extraPaymentSavings: number
  extraPayoffMonths: number
  amortizationSchedule: AmortizationRow[]
  biWeeklySavings?: {
    interestSaved: number
    yearsSaved: number
    monthlyEquivalent: number
  }
}

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
  totalPaid: number
  extraPaymentApplied?: number
}

export function calculateCarLoan(inputs: CarLoanInputs): CarLoanResults {
  const {
    vehiclePrice,
    downPayment,
    downPaymentPercent,
    tradeInValue = 0,
    tradeInOwed = 0,
    interestRate,
    loanTerm,
    salesTax = 0,
    registrationFees = 0,
    dealerFees = 0,
    feeCapitalization = false,
    extraPayment = 0,
    biWeeklyMode = false,
    country = 'US',
  } = inputs

  // ===== 1. CALCULATE HIGH-PRECISION LOAN BASE PRINCIPAL =====
  // Use the provided down payment value directly, don't recalculate from percentage
  const downPaymentAmount = downPayment > 0 ? downPayment : vehiclePrice * (downPaymentPercent / 100)
  const actualDownPaymentPercent = vehiclePrice > 0 ? (downPaymentAmount / vehiclePrice) * 100 : 0

  // Step A: Trade-In Tax Shield (Net Taxable Base)
  const taxableAmount = Math.max(0, vehiclePrice - tradeInValue)
  
  // Step B: Precise Sales Tax Amount
  const salesTaxAmount = taxableAmount * (salesTax / 100)
  
  // Step C: True Net Financed Principal (P)
  let loanAmount: number
  if (feeCapitalization) {
    // Rolling fees INTO the loan
    loanAmount = Math.max(0,
      vehiclePrice - tradeInValue + tradeInOwed +
      salesTaxAmount + registrationFees + dealerFees -
      downPaymentAmount
    )
  } else {
    // Paying fees UPFRONT in cash
    loanAmount = Math.max(0,
      vehiclePrice - tradeInValue + tradeInOwed -
      downPaymentAmount
    )
  }

  // ===== 2. BASE MONTHLY AMORTIZATION MATH =====
  const monthlyRate = interestRate / 100 / 12
  const totalMonths = loanTerm * 12

  let baseMonthlyPayment = 0
  if (loanAmount > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      baseMonthlyPayment = loanAmount / totalMonths
    } else {
      baseMonthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }
  }

  // ===== 3. DYNAMIC SIMULATION RUN WITH EXTRA PAYMENTS =====
  const amortizationSchedule: AmortizationRow[] = []
  let balance = loanAmount
  let totalInterest = 0
  let totalPrincipal = 0
  let monthsPaid = 0
  const targetMonthlyPayment = baseMonthlyPayment + extraPayment

  while (balance > 0 && monthsPaid < totalMonths * 2) {
    monthsPaid++
    const monthlyInterest = balance * monthlyRate
    
    let principalPaid = targetMonthlyPayment - monthlyInterest
    let activeExtraApplied = extraPayment

    if (principalPaid > balance) {
      principalPaid = balance
      activeExtraApplied = Math.max(0, principalPaid + monthlyInterest - baseMonthlyPayment)
    }

    balance -= principalPaid
    totalInterest += monthlyInterest
    totalPrincipal += principalPaid

    const actualMonthlyOutflow = principalPaid + monthlyInterest

    amortizationSchedule.push({
      month: monthsPaid,
      payment: Math.round(actualMonthlyOutflow),
      principal: Math.round(principalPaid),
      interest: Math.round(monthlyInterest),
      balance: Math.round(Math.max(0, balance)),
      totalPaid: Math.round(totalPrincipal + totalInterest),
      extraPaymentApplied: activeExtraApplied > 0 ? Math.round(activeExtraApplied) : undefined,
    })

    if (balance <= 0) break
  }

  // ===== 4. COUNTER-FACTUAL EVALUATION (BASELINE INTEREST) =====
  let baselineTotalInterest = 0
  if (loanAmount > 0 && monthlyRate > 0) {
    let baseBalance = loanAmount
    for (let m = 1; m <= totalMonths; m++) {
      const bInt = baseBalance * monthlyRate
      const bPrin = baseMonthlyPayment - bInt
      baseBalance -= bPrin
      baselineTotalInterest += bInt
    }
  }

  const extraPaymentSavings = Math.max(0, Math.round(baselineTotalInterest - totalInterest))
  const extraPayoffMonths = Math.max(0, totalMonths - monthsPaid)

  // ===== 5. CALENDAR MATURITY PROJECTIONS =====
  const now = new Date()
  now.setMonth(now.getMonth() + Math.ceil(monthsPaid))
  const payoffDateStr = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  // ===== 6. TRUE ACCELERATED BI-WEEKLY INTEREST SAVINGS ENGINES =====
  let biWeeklySavings = undefined
  if (loanAmount > 0 && totalMonths > 0) {
    const biWeeklyRate = interestRate / 100 / 26
    const acceleratedBiWeeklyPayment = baseMonthlyPayment / 2
    
    let biWeeklyBalance = loanAmount
    let biWeeklyPeriodsPaid = 0
    let biWeeklyTotalInterest = 0

    // Simulate accelerated payout schedule tracking engine (26 periods/year)
    while (biWeeklyBalance > 0 && biWeeklyPeriodsPaid < totalMonths * 3) {
      biWeeklyPeriodsPaid++
      const biInterest = biWeeklyBalance * biWeeklyRate
      let biPrincipal = acceleratedBiWeeklyPayment - biInterest

      if (biPrincipal > biWeeklyBalance) {
        biPrincipal = biWeeklyBalance
      }

      biWeeklyBalance -= biPrincipal
      biWeeklyTotalInterest += biInterest
    }

    const biWeeklyMonthsEquivalent = biWeeklyPeriodsPaid * (12 / 26)
    const yearsSaved = Math.max(0, (totalMonths - biWeeklyMonthsEquivalent) / 12)

    biWeeklySavings = {
      interestSaved: Math.max(0, Math.round(baselineTotalInterest - biWeeklyTotalInterest)),
      yearsSaved: Math.round(yearsSaved * 10) / 10,
      monthlyEquivalent: Math.round(acceleratedBiWeeklyPayment * 26 / 12),
    }
  }

  // Calculate upfront cash required when fees are not capitalized
  const upfrontCashRequired = feeCapitalization 
    ? downPaymentAmount 
    : downPaymentAmount + salesTaxAmount + registrationFees + dealerFees

  const totalFinancingPayments = amortizationSchedule.reduce((sum, row) => sum + row.payment, 0)
  // Total cost = down payment + all loan payments + fees (if paid upfront) - trade-in value (money you get back)
  const totalCost = downPaymentAmount + totalFinancingPayments + (feeCapitalization ? 0 : salesTaxAmount + registrationFees + dealerFees) - tradeInValue

  return {
    monthlyPayment: Math.round(baseMonthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalFinancingPayments),
    loanAmount: Math.round(loanAmount),
    downPayment: Math.round(downPaymentAmount),
    downPaymentPercent: actualDownPaymentPercent,
    tradeInValue: Math.round(tradeInValue),
    salesTaxAmount: Math.round(salesTaxAmount),
    upfrontCashRequired: Math.round(upfrontCashRequired),
    totalCost: Math.round(totalCost),
    payoffDate: payoffDateStr,
    extraPaymentSavings,
    extraPayoffMonths,
    amortizationSchedule,
    biWeeklySavings,
  }
}