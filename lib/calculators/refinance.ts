/**
 * Refinance Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface RefinanceInputs {
  currentBalance: number
  currentRate: number
  currentTerm: number
  currentPayment: number
  yearsPaid: number
  newRate: number
  newTerm: number
  closingCosts: number
  closingCostsType: 'flat' | 'percent'
  extraPayment: number
  country: string
}

export interface RefinanceResults {
  newMonthlyPayment: number
  interestSavings: number
  monthlyPaymentChange: number
  breakEvenMonths: number
  breakEvenDate: string
  totalSavings: number
  newTotalInterest: number
  currentTotalInterest: number
  isWorthIt: boolean
  amortizationComparison: ComparisonRow[]
  summary: {
    currentPayment: number
    newPayment: number
    savingsPerMonth: number
    totalInterestCurrent: number
    totalInterestNew: number
    closingCosts: number
    breakEvenMonths: number
    totalSavings: number
  }
  verdict: string
  recommendation: string
}

export interface ComparisonRow {
  year: number
  currentBalance: number
  newBalance: number
  currentInterest: number
  newInterest: number
  currentPayment: number
  newPayment: number
}

export function calculateRefinance(inputs: RefinanceInputs): RefinanceResults {
  const {
    currentBalance,
    currentRate,
    currentTerm,
    currentPayment,
    yearsPaid,
    newRate,
    newTerm,
    closingCosts,
    closingCostsType = 'flat',
    extraPayment = 0,
  } = inputs

  // ✅ Validate inputs
  const remainingMonths = Math.max(0, (currentTerm - yearsPaid) * 12)
  if (remainingMonths <= 0) {
    // Loan already paid off
    return {
      newMonthlyPayment: 0,
      interestSavings: 0,
      monthlyPaymentChange: 0,
      breakEvenMonths: 0,
      breakEvenDate: 'Already paid off',
      totalSavings: 0,
      newTotalInterest: 0,
      currentTotalInterest: 0,
      isWorthIt: false,
      amortizationComparison: [],
      summary: {
        currentPayment: currentPayment,
        newPayment: 0,
        savingsPerMonth: 0,
        totalInterestCurrent: 0,
        totalInterestNew: 0,
        closingCosts: 0,
        breakEvenMonths: 0,
        totalSavings: 0,
      },
      verdict: 'Loan already paid off',
      recommendation: 'No refinance needed',
    }
  }

  const currentMonthlyRate = currentRate / 100 / 12
  const newMonthlyRate = newRate / 100 / 12
  const newTotalMonths = newTerm * 12

  // ===== 1. CLOSING COSTS =====
  let closingCostsAmount = closingCosts
  if (closingCostsType === 'percent') {
    closingCostsAmount = currentBalance * (closingCosts / 100)
  }

  // ===== 2. CURRENT LOAN REMAINING INTEREST =====
  let currentTotalInterest = 0
  let currentTotalPaid = 0
  const currentAmortization: { year: number; balance: number; interest: number; payment: number }[] = []

  let tempBalance = currentBalance
  // ✅ Use actual current payment (input) but cap at balance
  const effectiveCurrentPayment = Math.min(currentPayment, tempBalance)

  for (let month = 1; month <= remainingMonths; month++) {
    if (tempBalance <= 0) break
    const interest = tempBalance * currentMonthlyRate
    const principal = Math.min(effectiveCurrentPayment - interest, tempBalance)
    tempBalance -= principal
    currentTotalInterest += interest
    currentTotalPaid += effectiveCurrentPayment

    if (month % 12 === 0 || tempBalance <= 0) {
      currentAmortization.push({
        year: Math.ceil(month / 12),
        balance: Math.round(Math.max(0, tempBalance)),
        interest: Math.round(interest * 12),
        payment: Math.round(effectiveCurrentPayment * 12),
      })
    }
    if (tempBalance <= 0) break
  }

  // ===== 3. NEW LOAN CALCULATION =====
  let newMonthlyPayment = 0
  if (newTotalMonths <= 0) {
    newMonthlyPayment = 0
  } else if (newMonthlyRate === 0) {
    newMonthlyPayment = currentBalance / newTotalMonths
  } else {
    newMonthlyPayment =
      (currentBalance * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTotalMonths)) /
      (Math.pow(1 + newMonthlyRate, newTotalMonths) - 1)
  }

  const newMonthlyWithExtra = newMonthlyPayment + extraPayment

  // ===== 4. NEW LOAN INTEREST =====
  let newBalance = currentBalance
  let newTotalInterest = 0
  let newTotalPaid = 0
  let monthsToPayoff = 0
  const newAmortization: { year: number; balance: number; interest: number; payment: number }[] = []

  for (let month = 1; month <= newTotalMonths; month++) {
    if (newBalance <= 0) break
    const interest = newBalance * newMonthlyRate
    const principal = Math.min(newMonthlyWithExtra - interest, newBalance)
    newBalance -= principal
    newTotalInterest += interest
    newTotalPaid += newMonthlyWithExtra
    monthsToPayoff = month

    if (month % 12 === 0 || newBalance <= 0) {
      newAmortization.push({
        year: Math.ceil(month / 12),
        balance: Math.round(Math.max(0, newBalance)),
        interest: Math.round(interest * 12),
        payment: Math.round(newMonthlyWithExtra * 12),
      })
    }
    if (newBalance <= 0) break
  }

  // ===== 5. TOTALS =====
  const totalNewCost = newTotalPaid + closingCostsAmount
  const totalCurrentCost = currentTotalPaid

  const interestSavings = Math.max(0, currentTotalInterest - newTotalInterest)
  const monthlyPaymentChange = effectiveCurrentPayment - newMonthlyWithExtra
  const totalSavings = Math.max(0, totalCurrentCost - totalNewCost)

  // ===== 6. BREAK-EVEN =====
  const monthlySavings = effectiveCurrentPayment - newMonthlyWithExtra
  let breakEvenMonths = 0
  if (monthlySavings > 0) {
    breakEvenMonths = Math.ceil(closingCostsAmount / monthlySavings)
  } else {
    breakEvenMonths = Infinity
  }

  const now = new Date()
  const breakEvenDate = new Date(now)
  breakEvenDate.setMonth(breakEvenDate.getMonth() + breakEvenMonths)

  // ===== 7. COMPARISON DATA =====
  const comparisonRows: ComparisonRow[] = []
  const maxYears = Math.max(currentAmortization.length, newAmortization.length)

  for (let i = 0; i < maxYears; i++) {
    const current = currentAmortization[i] || { balance: 0, interest: 0, payment: 0 }
    const newData = newAmortization[i] || { balance: 0, interest: 0, payment: 0 }

    comparisonRows.push({
      year: i + 1,
      currentBalance: current.balance || 0,
      newBalance: newData.balance || 0,
      currentInterest: current.interest || 0,
      newInterest: newData.interest || 0,
      currentPayment: current.payment || 0,
      newPayment: newData.payment || 0,
    })
  }

  const isWorthIt = totalSavings > 0 && breakEvenMonths < remainingMonths

  // ===== 8. VERDICT =====
  let verdict = ''
  let recommendation = ''

  if (isWorthIt && isFinite(breakEvenMonths)) {
    verdict = `🎯 Refinance Verdict: Refinancing will save you $${Math.round(monthlySavings).toLocaleString()}/month and $${Math.round(totalSavings).toLocaleString()} in lifetime interest costs.`
    recommendation = `Your break-even period is ${breakEvenMonths} months (${(breakEvenMonths / 12).toFixed(1)} years). If you plan to remain in this home longer than ${breakEvenMonths} months, this transaction is highly profitable.`
    if (breakEvenMonths < 12) {
      recommendation += ' 🎉 You will recover costs in under 1 year - this is an excellent deal!'
    } else if (breakEvenMonths < 36) {
      recommendation += ' ✅ This is a good deal if you plan to stay for a few years.'
    } else {
      recommendation += ' 📊 Consider if you plan to stay long enough to recoup these costs.'
    }
  } else if (isFinite(breakEvenMonths)) {
    verdict = `📋 Refinance Verdict: Refinancing would save you $${Math.round(monthlySavings).toLocaleString()}/month but cost $${Math.round(-totalSavings).toLocaleString()} in lifetime interest.`
    recommendation = `Your break-even period is ${breakEvenMonths} months. If you move before this, you will lose money.`
  } else {
    verdict = '⚠️ Refinance Not Recommended'
    recommendation = 'Your monthly payment does not decrease enough to cover closing costs.'
  }

  return {
    newMonthlyPayment: Math.round(newMonthlyWithExtra),
    interestSavings: Math.round(interestSavings),
    monthlyPaymentChange: Math.round(monthlyPaymentChange),
    breakEvenMonths: isFinite(breakEvenMonths) ? breakEvenMonths : 0,
    breakEvenDate: isFinite(breakEvenMonths) ? breakEvenDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Never',
    totalSavings: Math.round(totalSavings),
    newTotalInterest: Math.round(newTotalInterest),
    currentTotalInterest: Math.round(currentTotalInterest),
    isWorthIt,
    amortizationComparison: comparisonRows,
    summary: {
      currentPayment: Math.round(effectiveCurrentPayment),
      newPayment: Math.round(newMonthlyWithExtra),
      savingsPerMonth: Math.round(monthlySavings),
      totalInterestCurrent: Math.round(currentTotalInterest),
      totalInterestNew: Math.round(newTotalInterest),
      closingCosts: Math.round(closingCostsAmount),
      breakEvenMonths: isFinite(breakEvenMonths) ? breakEvenMonths : 0,
      totalSavings: Math.round(totalSavings),
    },
    verdict,
    recommendation,
  }
}