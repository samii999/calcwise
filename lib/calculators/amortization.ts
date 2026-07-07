/**
 * Amortization Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface AmortizationInputs {
  principal: number
  interestRate: number
  loanTermYears: number
  loanTermMonths: number
  startDate: string
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly' | 'quarterly' | 'semi-annually' | 'annually'
  extraMonthly: number
  extraAnnual: number
  extraAnnualMonth: number
  extraLumpSum: number
  extraLumpSumPeriod: number
}

export interface AmortizationResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  payoffDate: string
  extraPaymentSavings: number
  extraPayoffPeriods: number
  amortizationSchedule: AmortizationRow[]
  summary: {
    totalPrincipal: number
    totalInterestPaid: number
    totalPayments: number
    averagePayment: number
    yearsToPayoff: number
  }
  scheduleOptimization?: {
    termReduction: number
    interestSaved: number
  }
}

export interface AmortizationRow {
  period: number
  date: string
  payment: number
  principal: number
  interest: number
  balance: number
  cumulativeInterest: number
  cumulativePrincipal: number
  extraPaymentApplied?: number
}

export function calculateAmortization(inputs: AmortizationInputs): AmortizationResults {
  const {
    principal,
    interestRate,
    loanTermYears,
    loanTermMonths = 0,
    startDate,
    paymentFrequency = 'monthly',
    extraMonthly = 0,
    extraAnnual = 0,
    extraAnnualMonth = 1,
    extraLumpSum = 0,
    extraLumpSumPeriod = 0,
  } = inputs

  // ===== 1. FREQUENCY MAPPING =====
  const frequencyMap = {
    monthly: { periodsPerYear: 12, label: 'Monthly' },
    biweekly: { periodsPerYear: 26, label: 'Bi-Weekly' },
    weekly: { periodsPerYear: 52, label: 'Weekly' },
    quarterly: { periodsPerYear: 4, label: 'Quarterly' },
    'semi-annually': { periodsPerYear: 2, label: 'Semi-Annually' },
    annually: { periodsPerYear: 1, label: 'Annually' },
  }

  const freq = frequencyMap[paymentFrequency]
  const periodsPerYear = freq.periodsPerYear
  const totalYears = loanTermYears + loanTermMonths / 12
  const totalPeriods = Math.round(totalYears * periodsPerYear)

  // ===== 2. INTEREST RATE =====
  const ratePerPeriod = interestRate / 100 / periodsPerYear

  // ===== 3. REGULAR PAYMENT =====
  let monthlyPayment = 0
  if (principal === 0) {
    monthlyPayment = 0
  } else if (ratePerPeriod === 0) {
    monthlyPayment = principal / totalPeriods
  } else {
    monthlyPayment =
      (principal * ratePerPeriod * Math.pow(1 + ratePerPeriod, totalPeriods)) /
      (Math.pow(1 + ratePerPeriod, totalPeriods) - 1)
  }

  // ===== 4. AMORTIZATION SCHEDULE WITH EXTRA PAYMENTS =====
  const amortizationSchedule: AmortizationRow[] = []
  let balance = principal
  let totalInterest = 0
  let totalPrincipal = 0
  let period = 0
  const start = new Date(startDate)

  // Calculate extra payment per period
  let extraPaymentPerPeriod = 0
  if (paymentFrequency === 'monthly') {
    extraPaymentPerPeriod = extraMonthly
  } else if (paymentFrequency === 'biweekly') {
    extraPaymentPerPeriod = extraMonthly / 2.17
  } else if (paymentFrequency === 'weekly') {
    extraPaymentPerPeriod = extraMonthly / 4.33
  } else {
    extraPaymentPerPeriod = extraMonthly / (periodsPerYear / 12)
  }

  // Annual extra payment (applied on specific month/period)
  const extraAnnualPerPeriod = extraAnnual / periodsPerYear

  // ✅ Use epsilon for floating point precision
  const epsilon = 1e-9

  while (balance > epsilon && period < totalPeriods * 2) {
    period++
    const currentDate = new Date(start)
    if (paymentFrequency === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() + period)
    } else if (paymentFrequency === 'biweekly') {
      currentDate.setDate(currentDate.getDate() + period * 14)
    } else if (paymentFrequency === 'weekly') {
      currentDate.setDate(currentDate.getDate() + period * 7)
    } else if (paymentFrequency === 'quarterly') {
      currentDate.setMonth(currentDate.getMonth() + period * 3)
    } else if (paymentFrequency === 'semi-annually') {
      currentDate.setMonth(currentDate.getMonth() + period * 6)
    } else {
      currentDate.setFullYear(currentDate.getFullYear() + period)
    }

    const monthNum = currentDate.getMonth() + 1

    // Calculate interest and principal
    const interestPayment = balance * ratePerPeriod
    let totalPaymentAmount = monthlyPayment + extraPaymentPerPeriod

    // ✅ Add annual extra payment (only once per year)
    if ((monthNum === extraAnnualMonth || period % Math.round(periodsPerYear) === 0) && extraAnnual > 0) {
      totalPaymentAmount += extraAnnualPerPeriod
    }

    // Add lump sum payment
    if (period === extraLumpSumPeriod && extraLumpSum > 0) {
      totalPaymentAmount += extraLumpSum
    }

    let principalPayment = Math.min(totalPaymentAmount - interestPayment, balance)
    principalPayment = Math.max(0, principalPayment)

    balance -= principalPayment
    totalInterest += interestPayment
    totalPrincipal += principalPayment

    amortizationSchedule.push({
      period,
      date: currentDate.toISOString().split('T')[0],
      payment: Math.round(totalPaymentAmount),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      balance: Math.round(Math.max(0, balance)),
      cumulativeInterest: Math.round(totalInterest),
      cumulativePrincipal: Math.round(totalPrincipal),
      extraPaymentApplied: (extraPaymentPerPeriod > 0 || extraAnnual > 0 || (period === extraLumpSumPeriod && extraLumpSum > 0))
        ? Math.round(totalPaymentAmount - monthlyPayment)
        : undefined,
    })

    if (balance <= epsilon) break
  }

  // ===== 5. CALCULATE TOTALS =====
  const totalPayment = totalPrincipal + totalInterest
  const totalPayments = amortizationSchedule.length
  const averagePayment = totalPayments > 0 ? totalPayment / totalPayments : 0

  // ===== 6. SCHEDULE OPTIMIZATION =====
  const regularSchedule = calculateRegularAmortization(principal, ratePerPeriod, totalPeriods)
  const regularTotalInterest = regularSchedule.reduce((sum, row) => sum + row.interest, 0)
  const regularTotalPeriods = regularSchedule.length

  const termReduction = Math.round((regularTotalPeriods - totalPayments) / (periodsPerYear / 12) * 10) / 10
  const interestSaved = Math.max(0, Math.round(regularTotalInterest - totalInterest))

  const scheduleOptimization = {
    termReduction: Math.max(0, termReduction),
    interestSaved,
  }

  // ===== 7. PAYOFF DATE =====
  const payoffDate = new Date(start)
  if (paymentFrequency === 'monthly') {
    payoffDate.setMonth(payoffDate.getMonth() + totalPayments)
  } else if (paymentFrequency === 'biweekly') {
    payoffDate.setDate(payoffDate.getDate() + totalPayments * 14)
  } else if (paymentFrequency === 'weekly') {
    payoffDate.setDate(payoffDate.getDate() + totalPayments * 7)
  } else if (paymentFrequency === 'quarterly') {
    payoffDate.setMonth(payoffDate.getMonth() + totalPayments * 3)
  } else if (paymentFrequency === 'semi-annually') {
    payoffDate.setMonth(payoffDate.getMonth() + totalPayments * 6)
  } else {
    payoffDate.setFullYear(payoffDate.getFullYear() + totalPayments)
  }
  const payoffDateStr = payoffDate.toISOString().split('T')[0]

  // ===== 8. EXTRA SAVINGS =====
  const extraPaymentSavings = interestSaved
  const extraPayoffPeriods = Math.max(0, regularTotalPeriods - totalPayments)

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    payoffDate: payoffDateStr,
    extraPaymentSavings,
    extraPayoffPeriods,
    amortizationSchedule,
    summary: {
      totalPrincipal: Math.round(totalPrincipal),
      totalInterestPaid: Math.round(totalInterest),
      totalPayments,
      averagePayment: Math.round(averagePayment),
      yearsToPayoff: Math.round((totalPayments / periodsPerYear) * 10) / 10,
    },
    scheduleOptimization,
  }
}

function calculateRegularAmortization(
  principal: number,
  ratePerPeriod: number,
  totalPeriods: number
): { period: number; payment: number; principal: number; interest: number; balance: number }[] {
  const schedule = []
  let balance = principal
  const epsilon = 1e-9

  if (ratePerPeriod === 0) {
    const payment = principal / totalPeriods
    for (let i = 1; i <= totalPeriods; i++) {
      const remaining = balance
      balance -= payment
      schedule.push({ 
        period: i, 
        payment, 
        principal: Math.min(payment, remaining), 
        interest: 0, 
        balance: Math.max(0, balance) 
      })
    }
    return schedule
  }

  const payment =
    (principal * ratePerPeriod * Math.pow(1 + ratePerPeriod, totalPeriods)) /
    (Math.pow(1 + ratePerPeriod, totalPeriods) - 1)

  for (let i = 1; i <= totalPeriods; i++) {
    if (balance <= epsilon) break
    const interest = balance * ratePerPeriod
    const principalPaid = Math.min(payment - interest, balance)
    balance -= principalPaid
    schedule.push({ period: i, payment, principal: principalPaid, interest, balance: Math.max(0, balance) })
  }

  return schedule
}