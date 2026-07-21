/**
 * Debt Payoff Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface DebtItem {
  id: string
  name: string
  balance: number
  interestRate: number
  minimumPayment: number
}

export interface DebtPayoffInputs {
  debts: DebtItem[]
  totalMonthlyBudget: number
  strategy: 'avalanche' | 'snowball'
  extraPayment: number
  hasConsolidation?: boolean
  consolidationRate?: number
  consolidationTerm?: number
  consolidationFee?: number
}

export interface DebtPayoffResults {
  totalDebt: number
  totalInterest: number
  totalPayment: number
  payoffMonths: number
  payoffDate: string
  strategyWinner: string
  strategyMessage: string
  monthlyBreakdown: MonthlyBreakdown[]
  avalancheResults?: StrategyResult
  snowballResults?: StrategyResult
  consolidationSavings?: number
  consolidationMonthlyPayment?: number
  consolidationTotalInterest?: number
  consolidationPayoffMonths?: number
  recommendedConsolidation?: boolean
}

export interface StrategyResult {
  totalInterest: number
  totalPayment: number
  payoffMonths: number
}

export interface MonthlyBreakdown {
  month: number
  totalPaid: number
  totalInterest: number
  remainingBalance: number
  payments: {
    name: string
    amount: number
    balance: number
  }[]
}

export function calculateDebtPayoff(inputs: DebtPayoffInputs): DebtPayoffResults {
  const { 
    debts, 
    totalMonthlyBudget, 
    strategy, 
    extraPayment = 0,
    hasConsolidation = false,
    consolidationRate = 8,
    consolidationTerm = 5,
    consolidationFee = 3,
  } = inputs

  // ===== 1. VALIDATE INPUTS =====
  const totalMinimums = debts.reduce((sum, d) => sum + d.minimumPayment, 0)
  if (totalMonthlyBudget < totalMinimums) {
    return {
      totalDebt: debts.reduce((sum, d) => sum + d.balance, 0),
      totalInterest: 0,
      totalPayment: 0,
      payoffMonths: 0,
      payoffDate: 'Insufficient budget to cover minimum payments',
      strategyWinner: 'N/A',
      strategyMessage: 'Increase your budget to cover minimum payments',
      monthlyBreakdown: [],
    }
  }

  // ===== 2. CALCULATE BOTH STRATEGIES =====
  const avalancheResult = simulatePayoff(debts, totalMonthlyBudget, 'avalanche', extraPayment)
  const snowballResult = simulatePayoff(debts, totalMonthlyBudget, 'snowball', extraPayment)

  // ===== 3. DETERMINE WINNER =====
  let strategyWinner = ''
  let strategyMessage = ''

  if (avalancheResult.totalInterest < snowballResult.totalInterest) {
    strategyWinner = 'Avalanche'
    strategyMessage = `💡 Strategy Winner: Avalanche saves you $${(snowballResult.totalInterest - avalancheResult.totalInterest).toLocaleString()} in total interest and clears your debt ${avalancheResult.payoffMonths < snowballResult.payoffMonths ? avalancheResult.payoffMonths : snowballResult.payoffMonths} months faster than Snowball!`
  } else if (snowballResult.totalInterest < avalancheResult.totalInterest) {
    strategyWinner = 'Snowball'
    strategyMessage = `💡 Strategy Winner: Snowball saves you $${(avalancheResult.totalInterest - snowballResult.totalInterest).toLocaleString()} in total interest and clears your debt ${snowballResult.payoffMonths < avalancheResult.payoffMonths ? snowballResult.payoffMonths : avalancheResult.payoffMonths} months faster than Avalanche!`
  } else {
    strategyWinner = 'Tie'
    strategyMessage = 'Both strategies yield the same result.'
  }

  // ===== 4. GET SELECTED STRATEGY RESULT =====
  const selectedResult = strategy === 'avalanche' ? avalancheResult : snowballResult

  // ===== 5. PAYOFF DATE =====
  const now = new Date()
  const payoffDate = new Date(now)
  payoffDate.setMonth(payoffDate.getMonth() + selectedResult.payoffMonths)
  const payoffDateStr = payoffDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  // ===== 6. CALCULATE CONSOLIDATION SAVINGS =====
  let consolidationSavings = 0
  let consolidationMonthlyPayment = 0
  let consolidationTotalInterest = 0
  let consolidationPayoffMonths = 0
  let recommendedConsolidation = false

  if (hasConsolidation) {
    const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0)
    const feeAmount = totalDebt * (consolidationFee / 100)
    const loanAmount = totalDebt + feeAmount
    const monthlyRate = consolidationRate / 100 / 12
    const totalMonths = consolidationTerm * 12

    // Calculate monthly payment for consolidation loan
    if (monthlyRate > 0) {
      consolidationMonthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    } else {
      consolidationMonthlyPayment = loanAmount / totalMonths
    }

    consolidationTotalInterest = (consolidationMonthlyPayment * totalMonths) - loanAmount
    consolidationPayoffMonths = totalMonths
    consolidationSavings = Math.max(0, selectedResult.totalInterest - consolidationTotalInterest)
    recommendedConsolidation = consolidationSavings > 0 && consolidationMonthlyPayment <= totalMonthlyBudget
  }

  return {
    totalDebt: Math.round(selectedResult.totalDebt),
    totalInterest: Math.round(selectedResult.totalInterest),
    totalPayment: Math.round(selectedResult.totalPayment),
    payoffMonths: selectedResult.payoffMonths,
    payoffDate: payoffDateStr,
    strategyWinner,
    strategyMessage,
    monthlyBreakdown: selectedResult.monthlyBreakdown,
    avalancheResults: {
      totalInterest: Math.round(avalancheResult.totalInterest),
      totalPayment: Math.round(avalancheResult.totalPayment),
      payoffMonths: avalancheResult.payoffMonths,
    },
    snowballResults: {
      totalInterest: Math.round(snowballResult.totalInterest),
      totalPayment: Math.round(snowballResult.totalPayment),
      payoffMonths: snowballResult.payoffMonths,
    },
    consolidationSavings: Math.round(consolidationSavings),
    consolidationMonthlyPayment: Math.round(consolidationMonthlyPayment),
    consolidationTotalInterest: Math.round(consolidationTotalInterest),
    consolidationPayoffMonths,
    recommendedConsolidation,
  }
}

function simulatePayoff(
  debts: DebtItem[],
  totalBudget: number,
  strategy: 'avalanche' | 'snowball',
  extraPayment: number
): {
  totalDebt: number
  totalInterest: number
  totalPayment: number
  payoffMonths: number
  monthlyBreakdown: MonthlyBreakdown[]
} {
  // Sort debts based on strategy
  let sortedDebts = [...debts]
  if (strategy === 'avalanche') {
    sortedDebts.sort((a, b) => b.interestRate - a.interestRate)
  } else {
    sortedDebts.sort((a, b) => a.balance - b.balance)
  }

  const activeDebts = sortedDebts.map((d) => ({
    ...d,
    remaining: d.balance,
  }))

  const monthlyBreakdown: MonthlyBreakdown[] = []
  let totalInterest = 0
  let totalPaid = 0
  let currentMonth = 0
  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0)

  const minTotal = activeDebts.reduce((sum, d) => sum + d.minimumPayment, 0)
  const extraAvailable = Math.max(0, totalBudget - minTotal + extraPayment)

  while (activeDebts.some((d) => d.remaining > 0) && currentMonth < 1200) {
    currentMonth++
    let monthTotalPaid = 0
    let monthTotalInterest = 0
    const payments: MonthlyBreakdown['payments'] = []

    let extraThisMonth = extraAvailable

    // Make minimum payments
    for (const debt of activeDebts) {
      if (debt.remaining <= 0) continue

      const monthlyRate = debt.interestRate / 100 / 12
      const interest = debt.remaining * monthlyRate
      const minPayment = Math.min(debt.minimumPayment, debt.remaining + interest)

      const principalPaid = Math.min(minPayment - interest, debt.remaining)
      debt.remaining -= principalPaid
      totalInterest += interest
      monthTotalInterest += interest
      monthTotalPaid += minPayment

      payments.push({
        name: debt.name,
        amount: Math.round(minPayment),
        balance: Math.round(Math.max(0, debt.remaining)),
      })

      // Extra payment to first debt with remaining balance
      if (extraThisMonth > 0 && debt.remaining > 0) {
        const extraPrincipal = Math.min(extraThisMonth, debt.remaining)
        debt.remaining -= extraPrincipal
        extraThisMonth -= extraPrincipal
        monthTotalPaid += extraPrincipal
        payments[payments.length - 1].amount = Math.round(minPayment + extraPrincipal)
        payments[payments.length - 1].balance = Math.round(Math.max(0, debt.remaining))
      }
    }

    monthlyBreakdown.push({
      month: currentMonth,
      totalPaid: Math.round(monthTotalPaid),
      totalInterest: Math.round(monthTotalInterest),
      remainingBalance: Math.round(activeDebts.reduce((sum, d) => sum + d.remaining, 0)),
      payments,
    })

    totalPaid += monthTotalPaid
  }

  return {
    totalDebt,
    totalInterest,
    totalPayment: totalPaid,
    payoffMonths: currentMonth,
    monthlyBreakdown,
  }
}