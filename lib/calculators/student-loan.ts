/**
 * Student Loan Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface StudentLoanInputs {
  loanBalance: number
  interestRate: number
  loanTerm: number
  extraPayment: number
  defermentMonths: number
  defermentAccrues: boolean
  repaymentType: 'standard' | 'income-driven'
  annualIncome: number
  incomeGrowthRate: number
  familySize: number
  country: string
}

export interface StudentLoanResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  payoffDate: string
  extraPaymentSavings: number
  extraPayoffMonths: number
  forgivenessAmount: number
  monthlyIncomeRequired: number
  amortizationSchedule: AmortizationRow[]
  pslfEligible: boolean
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

// Poverty line guidelines (approx for 2026)
const POVERTY_LINE = 15000 // Annual

export function calculateStudentLoan(inputs: StudentLoanInputs): StudentLoanResults {
  const {
    loanBalance,
    interestRate,
    loanTerm,
    extraPayment = 0,
    defermentMonths = 0,
    defermentAccrues = true,
    repaymentType = 'standard',
    annualIncome = 0,
    incomeGrowthRate = 3,
    familySize = 1,
  } = inputs

  // ===== 1. DEFERMENT PERIOD =====
  let adjustedBalance = loanBalance
  const monthlyRate = interestRate / 100 / 12

  if (defermentMonths > 0 && defermentAccrues) {
    for (let i = 0; i < defermentMonths; i++) {
      adjustedBalance += adjustedBalance * monthlyRate
    }
  }

  // ===== 2. DETERMINE PAYMENT =====
  let monthlyPayment = 0
  const totalMonths = loanTerm * 12

  if (repaymentType === 'income-driven') {
    // Income-Driven Repayment (IDR) - 10% of discretionary income
    const povertyLine = POVERTY_LINE * familySize
    const discretionaryIncome = Math.max(0, annualIncome - povertyLine)
    monthlyPayment = Math.min(
      discretionaryIncome * 0.1 / 12,
      calculateStandardPayment(adjustedBalance, monthlyRate, totalMonths)
    )
  } else {
    // Standard repayment
    monthlyPayment = calculateStandardPayment(adjustedBalance, monthlyRate, totalMonths)
  }

  // ===== 3. AMORTIZATION SCHEDULE =====
  const amortizationSchedule: AmortizationRow[] = []
  let balance = adjustedBalance
  let totalInterest = 0
  let totalPrincipal = 0
  let monthlyIncome = annualIncome / 12
  const totalMonthlyWithExtra = monthlyPayment + extraPayment
  let monthsPaid = 0
  let forgivenessAmount = 0

  // Simulate income growth for IDR
  let currentIncome = annualIncome

  for (let month = 1; month <= totalMonths; month++) {
    if (balance <= 0) break

    // Update income annually for IDR
    if (repaymentType === 'income-driven' && month % 12 === 0) {
      currentIncome = currentIncome * (1 + incomeGrowthRate / 100)
      const povertyLine = POVERTY_LINE * familySize
      const discretionaryIncome = Math.max(0, currentIncome - povertyLine)
      const newPayment = Math.min(
        discretionaryIncome * 0.1 / 12,
        calculateStandardPayment(balance, monthlyRate, totalMonths - month + 1)
      )
      // Only update if it's higher than current payment
      if (newPayment > monthlyPayment) {
        monthlyPayment = newPayment
      }
    }

    const monthlyInterest = balance * monthlyRate
    const monthlyPrincipal = Math.min(totalMonthlyWithExtra - monthlyInterest, balance)

    balance -= monthlyPrincipal
    totalInterest += monthlyInterest
    totalPrincipal += monthlyPrincipal
    monthsPaid++

    amortizationSchedule.push({
      month,
      payment: Math.round(totalMonthlyWithExtra),
      principal: Math.round(monthlyPrincipal),
      interest: Math.round(monthlyInterest),
      balance: Math.round(Math.max(0, balance)),
      totalPaid: Math.round(totalPrincipal + totalInterest),
      extraPaymentApplied: extraPayment > 0 ? Math.round(extraPayment) : undefined,
    })

    if (balance <= 0) break

    // Check for forgiveness (20 years for IDR)
    if (repaymentType === 'income-driven' && month >= 240 && balance > 0) {
      forgivenessAmount = balance
      balance = 0
      break
    }
  }

  // ===== 4. CALCULATE TOTALS =====
  const totalPayment = totalPrincipal + totalInterest

  // ===== 5. EXTRA PAYMENT SAVINGS =====
  let extraPaymentSavings = 0
  let extraPayoffMonths = 0

  if (extraPayment > 0) {
    const baseSchedule = calculateAmortizationSchedule(
      adjustedBalance,
      monthlyRate,
      totalMonths,
      monthlyPayment,
      0
    )
    const baseInterest = baseSchedule.reduce((sum, row) => sum + row.interest, 0)
    extraPaymentSavings = Math.max(0, Math.round(baseInterest - totalInterest))
    extraPayoffMonths = Math.max(0, totalMonths - monthsPaid)
  }

  // ===== 6. PAYOFF DATE =====
  const now = new Date()
  const payoffDate = new Date(now)
  payoffDate.setMonth(payoffDate.getMonth() + monthsPaid + defermentMonths)
  const payoffDateStr = payoffDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  // ===== 7. MONTHLY INCOME REQUIRED =====
  const monthlyIncomeRequired = Math.round(monthlyPayment * 12 / 0.1 + POVERTY_LINE * familySize)

  // ===== 8. PSLF ELIGIBILITY =====
  const pslfEligible = repaymentType === 'income-driven' && familySize > 0

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    payoffDate: payoffDateStr,
    extraPaymentSavings,
    extraPayoffMonths,
    forgivenessAmount: Math.round(forgivenessAmount),
    monthlyIncomeRequired,
    amortizationSchedule,
    pslfEligible,
  }
}

function calculateStandardPayment(
  principal: number,
  monthlyRate: number,
  totalMonths: number
): number {
  if (principal === 0) return 0
  if (monthlyRate === 0) return principal / totalMonths
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  )
}

function calculateAmortizationSchedule(
  principal: number,
  monthlyRate: number,
  totalMonths: number,
  payment: number,
  extraPayment: number
): { month: number; payment: number; principal: number; interest: number; balance: number }[] {
  const schedule = []
  let balance = principal
  const totalPayment = payment + extraPayment

  for (let month = 1; month <= totalMonths; month++) {
    if (balance <= 0) break
    const interest = balance * monthlyRate
    const principalPaid = Math.min(totalPayment - interest, balance)
    balance -= principalPaid
    schedule.push({ month, payment: totalPayment, principal: principalPaid, interest, balance })
  }

  return schedule
}