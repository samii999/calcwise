/**
 * Loan Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface LoanInputs {
  loanAmount: number
  interestRate: number
  loanTerm: number
  extraPayment: number
  loanType: 'personal' | 'home' | 'car' | 'education' | 'custom'
  originationFee: number
  originationFeeType: 'percent' | 'flat'
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly'
  repaymentType: 'standard' | 'interest-only'
  country: string
}

export interface LoanResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  loanAmount: number
  effectiveLoanAmount: number
  originationFeeAmount: number
  payoffDate: string
  extraPaymentSavings: number
  extraPayoffMonths: number
  amortizationSchedule: AmortizationRow[]
  trueAPR: number
  totalCost: number
  paymentFrequency: string
  repaymentType: string
  biWeeklySavings?: {
    interestSaved: number
    yearsSaved: number
    monthlyEquivalent: number
  }
  oneTimePaymentImpact?: {
    interestSaved: number
    monthsSaved: number
  }
}

export interface AmortizationRow {
  period: number
  payment: number
  principal: number
  interest: number
  balance: number
  totalPaid: number
  extraPaymentApplied?: number
  oneTimePaymentApplied?: number
}

export const LOAN_TYPE_RATES: Record<string, number> = {
  personal: 11.5,
  home: 8.5,
  car: 9.5,
  education: 8.0,
  custom: 10.0,
}

export const LOAN_TYPE_LABELS: Record<string, string> = {
  personal: 'Personal Loan',
  home: 'Home Loan',
  car: 'Car Loan',
  education: 'Education Loan',
  custom: 'Custom Loan',
}

/**
 * Calculate loan with all features
 */
export function calculateLoan(inputs: LoanInputs): LoanResults {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    extraPayment = 0,
    loanType,
    originationFee = 0,
    originationFeeType = 'percent',
    paymentFrequency = 'monthly',
    repaymentType = 'standard',
    country = 'US',
  } = inputs

  // ===== 1. FREQUENCY MAPPING =====
  const frequencyMap = {
    monthly: { periodsPerYear: 12, label: 'Monthly' },
    biweekly: { periodsPerYear: 26, label: 'Bi-Weekly' },
    weekly: { periodsPerYear: 52, label: 'Weekly' },
  }

  const freq = frequencyMap[paymentFrequency]
  const periodsPerYear = freq.periodsPerYear
  const totalPeriods = loanTerm * periodsPerYear

  // ===== 2. ORIGINATION FEE =====
  let originationFeeAmount = 0
  if (originationFeeType === 'percent') {
    originationFeeAmount = loanAmount * (originationFee / 100)
  } else {
    originationFeeAmount = originationFee
  }

  const effectiveLoanAmount = loanAmount + originationFeeAmount

  // ===== 3. INTEREST RATE PER PERIOD (with country-specific rules if needed) =====
  let rAnnual = interestRate / 100
  let rPeriodic = rAnnual / periodsPerYear

  // Canadian rule: semi-annual compounding for mortgages - apply only if requested, but for personal loans it's usually simple
  // We'll keep it as an optional extension; for loan calculator, simple compounding is standard.
  // However, we can add a check for country if needed, but we'll keep it simple.

  // ===== 4. PAYMENT CALCULATION =====
  let monthlyPayment = 0
  let amortizationSchedule: AmortizationRow[] = []

  if (repaymentType === 'interest-only') {
    // Interest-only payment
    if (rPeriodic === 0) {
      monthlyPayment = 0
    } else {
      monthlyPayment = effectiveLoanAmount * rPeriodic
    }
    amortizationSchedule = calculateInterestOnlySchedule(
      effectiveLoanAmount,
      rPeriodic,
      totalPeriods,
      loanAmount,
      extraPayment
    )
  } else {
    // Standard amortization
    if (effectiveLoanAmount === 0) {
      monthlyPayment = 0
    } else if (rPeriodic === 0) {
      monthlyPayment = effectiveLoanAmount / totalPeriods
    } else {
      monthlyPayment =
        (effectiveLoanAmount * rPeriodic * Math.pow(1 + rPeriodic, totalPeriods)) /
        (Math.pow(1 + rPeriodic, totalPeriods) - 1)
    }

    amortizationSchedule = calculateAmortizationSchedule(
      effectiveLoanAmount,
      rPeriodic,
      totalPeriods,
      monthlyPayment,
      extraPayment,
      loanAmount
    )
  }

  // ===== 5. CALCULATE TOTALS =====
  let totalInterest = 0
  let totalPrincipal = 0
  let totalPayments = 0

  amortizationSchedule.forEach((row) => {
    totalInterest += row.interest
    totalPrincipal += row.principal
    totalPayments += row.payment
  })

  // ===== 6. EXTRA PAYMENT SAVINGS =====
  let regularTotalInterest = 0
  if (repaymentType === 'standard') {
    const regularSchedule = calculateAmortizationSchedule(
      effectiveLoanAmount,
      rPeriodic,
      totalPeriods,
      monthlyPayment,
      0,
      loanAmount
    )
    regularTotalInterest = regularSchedule.reduce((sum, row) => sum + row.interest, 0)
  } else {
    regularTotalInterest = totalInterest
  }

  const extraPaymentSavings = Math.max(0, Math.round(regularTotalInterest - totalInterest))
  const extraPayoffMonths = Math.max(0, Math.round(totalPeriods / (periodsPerYear / 12) - amortizationSchedule.length / (periodsPerYear / 12)))

  // ===== 7. TRUE APR (Simplified, accurate) =====
  const trueAPR = calculateTrueAPR(
    loanAmount,
    monthlyPayment,
    totalPeriods,
    originationFeeAmount,
    periodsPerYear
  )

  // ===== 8. PAYOFF DATE (Precise) =====
  const now = new Date()
  const payoffMonths = Math.round(amortizationSchedule.length * 12 / periodsPerYear)
  const payoffDate = new Date(now)
  payoffDate.setMonth(payoffDate.getMonth() + payoffMonths)
  const payoffDateStr = payoffDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  const totalCost = totalPayments + (originationFeeType === 'flat' ? originationFeeAmount : 0)

  // ===== 9. BI-WEEKLY SAVINGS (Direct Calculation - No Recursion) =====
  let biWeeklySavings = undefined
  if (paymentFrequency === 'monthly' && repaymentType === 'standard' && loanAmount > 0) {
    const biWeeklyPeriods = 26
    const biWeeklyRate = interestRate / 100 / biWeeklyPeriods
    const totalBiWeeklyPeriods = loanTerm * biWeeklyPeriods

    let biWeeklyPayment = 0
    if (effectiveLoanAmount === 0) {
      biWeeklyPayment = 0
    } else if (biWeeklyRate === 0) {
      biWeeklyPayment = effectiveLoanAmount / totalBiWeeklyPeriods
    } else {
      biWeeklyPayment =
        (effectiveLoanAmount * biWeeklyRate * Math.pow(1 + biWeeklyRate, totalBiWeeklyPeriods)) /
        (Math.pow(1 + biWeeklyRate, totalBiWeeklyPeriods) - 1)
    }

    const biWeeklySchedule = calculateAmortizationSchedule(
      effectiveLoanAmount,
      biWeeklyRate,
      totalBiWeeklyPeriods,
      biWeeklyPayment,
      0,
      loanAmount
    )

    const biWeeklyTotalInterest = biWeeklySchedule.reduce((sum, row) => sum + row.interest, 0)
    const biWeeklyPeriodsPaid = biWeeklySchedule.length
    const biWeeklyYears = biWeeklyPeriodsPaid / biWeeklyPeriods

    const regularSchedule = calculateAmortizationSchedule(
      effectiveLoanAmount,
      rPeriodic,
      totalPeriods,
      monthlyPayment,
      0,
      loanAmount
    )
    const regularTotalInterest = regularSchedule.reduce((sum, row) => sum + row.interest, 0)

    biWeeklySavings = {
      interestSaved: Math.max(0, Math.round(regularTotalInterest - biWeeklyTotalInterest)),
      yearsSaved: Math.max(0, Math.round((loanTerm - biWeeklyYears) * 10) / 10),
      monthlyEquivalent: Math.round(biWeeklyPayment * 26 / 12),
    }
  }

  // ===== 10. ONE-TIME PAYMENT IMPACT (Direct calculation - No Recursion) =====
  let oneTimePaymentImpact = undefined
  if (extraPayment > 0) {
    // Calculate base schedule without extra payment directly
    const baseSchedule = calculateAmortizationSchedule(
      effectiveLoanAmount,
      rPeriodic,
      totalPeriods,
      monthlyPayment,
      0,
      loanAmount
    )
    const baseInterest = baseSchedule.reduce((sum, row) => sum + row.interest, 0)
    const interestSaved = Math.max(0, baseInterest - totalInterest)
    const baseMonths = Math.round(baseSchedule.length * 12 / periodsPerYear)
    const currentMonths = Math.round(amortizationSchedule.length * 12 / periodsPerYear)
    const monthsSaved = Math.max(0, baseMonths - currentMonths)

    if (interestSaved > 0) {
      oneTimePaymentImpact = {
        interestSaved: Math.round(interestSaved),
        monthsSaved: Math.round(monthsSaved),
      }
    }
  }

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayments),
    loanAmount: Math.round(loanAmount),
    effectiveLoanAmount: Math.round(effectiveLoanAmount),
    originationFeeAmount: Math.round(originationFeeAmount),
    payoffDate: payoffDateStr,
    extraPaymentSavings,
    extraPayoffMonths,
    amortizationSchedule,
    trueAPR: Math.round(trueAPR * 100) / 100,
    totalCost: Math.round(totalCost),
    paymentFrequency: freq.label,
    repaymentType: repaymentType === 'standard' ? 'Standard (Amortized)' : 'Interest-Only',
    biWeeklySavings,
    oneTimePaymentImpact,
  }
}

// ===== HELPER FUNCTIONS =====

function calculateAmortizationSchedule(
  principal: number,
  ratePerPeriod: number,
  totalPeriods: number,
  monthlyPayment: number,
  extraPayment: number,
  originalPrincipal: number
): AmortizationRow[] {
  const schedule: AmortizationRow[] = []
  let balance = principal
  let totalInterest = 0
  let totalPrincipal = 0
  const totalPayment = monthlyPayment + extraPayment
  let period = 0
  const epsilon = 1e-9

  while (balance > epsilon && period < totalPeriods * 2) {
    period++
    const interestPayment = balance * ratePerPeriod
    let principalPayment = totalPayment - interestPayment

    // Prevent negative principal
    if (principalPayment < 0) {
      principalPayment = 0
    }
    // Cap principal at remaining balance
    if (principalPayment > balance) {
      principalPayment = balance
    }

    balance -= principalPayment
    totalInterest += interestPayment
    totalPrincipal += principalPayment

    schedule.push({
      period,
      payment: Math.round(totalPayment),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      balance: Math.round(Math.max(0, balance)),
      totalPaid: Math.round(totalPrincipal + totalInterest),
      extraPaymentApplied: extraPayment > 0 ? Math.round(extraPayment) : undefined,
    })

    if (balance <= epsilon) break
  }

  return schedule
}

function calculateInterestOnlySchedule(
  principal: number,
  ratePerPeriod: number,
  totalPeriods: number,
  originalPrincipal: number,
  extraPayment: number
): AmortizationRow[] {
  const schedule: AmortizationRow[] = []
  let balance = principal
  let totalInterest = 0
  let totalPrincipal = 0
  let period = 0
  const epsilon = 1e-9

  while (balance > epsilon && period < totalPeriods) {
    period++
    const interestPayment = balance * ratePerPeriod
    let principalPayment = 0

    if (extraPayment > 0) {
      principalPayment = Math.min(extraPayment, balance)
    }

    // On the final period, pay off remaining balance
    if (period === totalPeriods) {
      principalPayment = balance
    }

    balance -= principalPayment
    totalInterest += interestPayment
    totalPrincipal += principalPayment

    schedule.push({
      period,
      payment: Math.round(interestPayment + principalPayment),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      balance: Math.round(Math.max(0, balance)),
      totalPaid: Math.round(totalPrincipal + totalInterest),
      extraPaymentApplied: extraPayment > 0 ? Math.round(extraPayment) : undefined,
    })

    if (balance <= epsilon) break
  }

  return schedule
}

function calculateTrueAPR(
  loanAmount: number,
  monthlyPayment: number,
  totalPeriods: number,
  originationFee: number,
  periodsPerYear: number
): number {
  if (loanAmount === 0 || monthlyPayment === 0) return 0

  const totalPaid = monthlyPayment * totalPeriods
  const totalInterest = totalPaid - loanAmount
  const totalFees = originationFee
  const totalCost = totalInterest + totalFees
  const years = totalPeriods / periodsPerYear

  if (years === 0) return 0

  const apr = (totalCost / loanAmount) / years * 100
  return Math.round(apr * 100) / 100
}