/**
 * Budget Planner Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface BudgetCategory {
  id: string
  name: string
  planned: number
  actual: number
  category: 'income' | 'housing' | 'transportation' | 'food' | 'utilities' | 'insurance' | 'healthcare' | 'entertainment' | 'shopping' | 'debt' | 'savings' | 'other'
}

export interface BudgetInputs {
  income: BudgetCategory[]
  expenses: BudgetCategory[]
  rulePreset: '50-30-20' | '80-20' | 'custom'
}

export interface BudgetResults {
  totalIncome: number
  totalExpenses: number
  surplus: number
  savingsRate: number
  expenseBreakdown: BreakdownItem[]
  categoryComparison: CategoryComparison[]
  status: 'excellent' | 'good' | 'warning' | 'critical'
  statusLabel: string
  monthlySummary: MonthlySummary[]
  ruleComparison: {
    needs: number
    wants: number
    savings: number
    needsTarget: number
    wantsTarget: number
    savingsTarget: number
    needsVariance: number
    wantsVariance: number
    savingsVariance: number
  }
  lifestyleAdjuster?: {
    wantsReduction: number
    freedAmount: number
    annualSavings: number
    monthsSaved: number
  }
}

export interface BreakdownItem {
  category: string
  planned: number
  actual: number
  variance: number
  variancePercent: number
}

export interface CategoryComparison {
  category: string
  amount: number
  percentage: number
  type: 'income' | 'expense'
}

export interface MonthlySummary {
  month: number
  income: number
  expenses: number
  surplus: number
}

export function calculateBudget(inputs: BudgetInputs): BudgetResults {
  const { income, expenses, rulePreset = '50-30-20' } = inputs

  // ===== 1. CALCULATE TOTALS =====
  const totalIncome = income.reduce((sum, i) => sum + i.actual, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.actual, 0)
  const surplus = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (surplus / totalIncome) * 100 : 0

  // ===== 2. EXPENSE BREAKDOWN =====
  const expenseBreakdown: BreakdownItem[] = expenses.map((e) => ({
    category: e.name,
    planned: e.planned,
    actual: e.actual,
    variance: e.actual - e.planned,
    variancePercent: e.planned > 0 ? ((e.actual - e.planned) / e.planned) * 100 : 0,
  }))

  // ===== 3. CATEGORY COMPARISON =====
  const categoryComparison: CategoryComparison[] = [
    ...income.map((i) => ({
      category: i.name,
      amount: i.actual,
      percentage: totalIncome > 0 ? (i.actual / totalIncome) * 100 : 0,
      type: 'income' as const,
    })),
    ...expenses.map((e) => ({
      category: e.name,
      amount: e.actual,
      percentage: totalExpenses > 0 ? (e.actual / totalExpenses) * 100 : 0,
      type: 'expense' as const,
    })),
  ]

  // ===== 4. RULE COMPARISON =====
  // Group expenses by type
  const needs = expenses
    .filter(e => ['housing', 'food', 'utilities', 'insurance', 'healthcare', 'transportation'].includes(e.category))
    .reduce((sum, e) => sum + e.actual, 0)
  const wants = expenses
    .filter(e => ['entertainment', 'shopping', 'other'].includes(e.category))
    .reduce((sum, e) => sum + e.actual, 0)
  const savings = expenses
    .filter(e => ['savings', 'debt'].includes(e.category))
    .reduce((sum, e) => sum + e.actual, 0)

  let needsTarget = 0
  let wantsTarget = 0
  let savingsTarget = 0

  if (rulePreset === '50-30-20') {
    needsTarget = totalIncome * 0.5
    wantsTarget = totalIncome * 0.3
    savingsTarget = totalIncome * 0.2
  } else if (rulePreset === '80-20') {
    needsTarget = totalIncome * 0.8
    wantsTarget = totalIncome * 0.2
    savingsTarget = 0
  } else {
    needsTarget = 0
    wantsTarget = 0
    savingsTarget = 0
  }

  const ruleComparison = {
    needs,
    wants,
    savings,
    needsTarget,
    wantsTarget,
    savingsTarget,
    needsVariance: needsTarget > 0 ? ((needs - needsTarget) / needsTarget) * 100 : 0,
    wantsVariance: wantsTarget > 0 ? ((wants - wantsTarget) / wantsTarget) * 100 : 0,
    savingsVariance: savingsTarget > 0 ? ((savings - savingsTarget) / savingsTarget) * 100 : 0,
  }

  // ===== 5. LIFESTYLE ADJUSTER =====
  let lifestyleAdjuster = undefined
  const wantsReduction = 15 // 15% reduction
  const wantsReduced = wants * (wantsReduction / 100)
  const freedAmount = wantsReduced
  const annualSavings = freedAmount * 12

  if (wantsReduced > 0) {
    // Calculate months saved to reach a goal (simplified)
    const monthsSaved = Math.round(annualSavings / 1000 * 12)
    lifestyleAdjuster = {
      wantsReduction,
      freedAmount: Math.round(freedAmount),
      annualSavings: Math.round(annualSavings),
      monthsSaved: Math.max(1, monthsSaved),
    }
  }

  // ===== 6. STATUS =====
  let status: 'excellent' | 'good' | 'warning' | 'critical'
  let statusLabel: string

  if (surplus > totalIncome * 0.2) {
    status = 'excellent'
    statusLabel = '🌟 Excellent - Saving over 20% of income!'
  } else if (surplus > 0) {
    status = 'good'
    statusLabel = '✅ Good - Living within your means'
  } else if (surplus > -totalIncome * 0.1) {
    status = 'warning'
    statusLabel = '⚠️ Warning - Spending slightly exceeds income'
  } else {
    status = 'critical'
    statusLabel = '🚨 Critical - Spending significantly exceeds income'
  }

  // ===== 7. MONTHLY SUMMARY =====
  const monthlySummary: MonthlySummary[] = []
  for (let month = 1; month <= 12; month++) {
    const monthIncome = totalIncome
    const monthExpenses = totalExpenses
    monthlySummary.push({
      month,
      income: Math.round(monthIncome),
      expenses: Math.round(monthExpenses),
      surplus: Math.round(monthIncome - monthExpenses),
    })
  }

  return {
    totalIncome: Math.round(totalIncome),
    totalExpenses: Math.round(totalExpenses),
    surplus: Math.round(surplus),
    savingsRate: Math.round(savingsRate * 10) / 10,
    expenseBreakdown,
    categoryComparison,
    status,
    statusLabel,
    monthlySummary,
    ruleComparison,
    lifestyleAdjuster,
  }
}