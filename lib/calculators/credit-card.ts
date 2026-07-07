/**
 * Credit Card Payoff Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface CreditCardInputs {
  balance: number
  interestRate: number
  monthlyPayment: number
  extraPayment: number
  paymentStrategy: 'minimum' | 'fixed' | 'target-date'
  minPaymentPercent: number
  minPaymentFloor: number
  targetPayoffMonths: number
}

export interface CreditCardResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  payoffMonths: number
  payoffDate: string
  extraPaymentSavings: number
  extraPayoffMonths: number
  amortizationSchedule: AmortizationRow[]
  isNegativeAmortization: boolean
  warningMessage?: string
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

export function calculateCreditCardPayoff(inputs: CreditCardInputs): CreditCardResults {
  const {
    balance,
    interestRate,
    monthlyPayment,
    extraPayment = 0,
    paymentStrategy = 'fixed',
    minPaymentPercent = 2.5,
    minPaymentFloor = 25,
    targetPayoffMonths = 24,
  } = inputs

  const monthlyRate = interestRate / 100 / 12
  let isNegativeAmortization = false
  let warningMessage = undefined

  // ===== 1. DETERMINE PAYMENT AMOUNT =====
  let basePayment = monthlyPayment

  if (paymentStrategy === 'minimum') {
    const percentPayment = balance * (minPaymentPercent / 100)
    basePayment = Math.max(percentPayment, minPaymentFloor)
  } else if (paymentStrategy === 'target-date') {
    // Calculate required payment to hit target date
    if (targetPayoffMonths > 0 && monthlyRate > 0) {
      basePayment =
        (balance * monthlyRate * Math.pow(1 + monthlyRate, targetPayoffMonths)) /
        (Math.pow(1 + monthlyRate, targetPayoffMonths) - 1)
    } else if (targetPayoffMonths > 0) {
      basePayment = balance / targetPayoffMonths
    } else {
      basePayment = monthlyPayment
    }
  }

  const totalMonthly = basePayment + extraPayment

  // ===== 2. CHECK NEGATIVE AMORTIZATION =====
  const firstMonthInterest = balance * monthlyRate
  if (totalMonthly < firstMonthInterest) {
    isNegativeAmortization = true
    warningMessage = `⚠️ Warning: Your payment of $${totalMonthly.toFixed(2)} is less than the monthly interest of $${firstMonthInterest.toFixed(2)}. The balance will grow indefinitely!`
  }

  // ===== 3. AMORTIZATION SCHEDULE =====
  const amortizationSchedule: AmortizationRow[] = []
  let currentBalance = balance
  let totalInterest = 0
  let totalPrincipal = 0
  let monthsPaid = 0
  let maxMonths = 1200 // 100 years max

  // If negative amortization, limit to 100 months and show warning
  if (isNegativeAmortization) {
    maxMonths = 100
  }

  while (currentBalance > 0 && monthsPaid < maxMonths) {
    monthsPaid++
    const interestThisMonth = currentBalance * monthlyRate
    let principalThisMonth = totalMonthly - interestThisMonth

    // If principal is negative, only pay interest (negative amortization)
    if (principalThisMonth < 0) {
      principalThisMonth = 0
      currentBalance += interestThisMonth // Balance grows
    } else {
      principalThisMonth = Math.min(principalThisMonth, currentBalance)
      currentBalance -= principalThisMonth
    }

    totalInterest += interestThisMonth
    totalPrincipal += principalThisMonth

    amortizationSchedule.push({
      month: monthsPaid,
      payment: Math.round(totalMonthly),
      principal: Math.round(principalThisMonth),
      interest: Math.round(interestThisMonth),
      balance: Math.round(Math.max(0, currentBalance)),
      totalPaid: Math.round(totalPrincipal + totalInterest),
      extraPaymentApplied: extraPayment > 0 ? Math.round(extraPayment) : undefined,
    })

    // If balance grows too large, break
    if (currentBalance > balance * 10) break
  }

  // ===== 4. CALCULATE TOTALS =====
  const totalPayment = totalPrincipal + totalInterest

  // ===== 5. EXTRA PAYMENT SAVINGS =====
  let extraPaymentSavings = 0
  let extraPayoffMonths = 0

  if (extraPayment > 0) {
    // Calculate without extra payment
    const baseResult = calculateCreditCardPayoff({
      ...inputs,
      extraPayment: 0,
    })
    const baseTotalInterest = baseResult.totalInterest
    const basePayoffMonths = baseResult.payoffMonths

    extraPaymentSavings = Math.max(0, Math.round(baseTotalInterest - totalInterest))
    extraPayoffMonths = Math.max(0, basePayoffMonths - monthsPaid)
  }

  // ===== 6. PAYOFF DATE =====
  const now = new Date()
  const payoffDate = new Date(now)
  payoffDate.setMonth(payoffDate.getMonth() + monthsPaid)
  const payoffDateStr = isNegativeAmortization 
    ? 'Never (Balance growing)' 
    : payoffDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })

  return {
    monthlyPayment: Math.round(totalMonthly),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    payoffMonths: isNegativeAmortization ? Infinity : monthsPaid,
    payoffDate: payoffDateStr,
    extraPaymentSavings,
    extraPayoffMonths,
    amortizationSchedule,
    isNegativeAmortization,
    warningMessage,
  }
}