/**
 * Emergency Fund Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface EmergencyFundInputs {
  monthlyExpenses: number
  coverageMonths: number
  currentSavings: number
  monthlyContribution: number
  targetMonths: 3 | 6 | 9 | 12
  country: string
}

export interface EmergencyFundResults {
  targetAmount: number
  currentProgress: number
  monthsToGoal: number
  yearsToGoal: number
  completionDate: string
  status: 'on_track' | 'behind' | 'ahead' | 'complete'
  statusLabel: string
  monthlyData: MonthlyData[]
  summary: {
    targetAmount: number
    currentSavings: number
    shortfall: number
    monthlyContribution: number
    monthsToGoal: number
  }
  riskReport: {
    liquidityScore: number
    coverageMonths: number
    riskLevel: 'low' | 'medium' | 'high'
    riskMessage: string
  }
}

export interface MonthlyData {
  month: number
  balance: number
  contribution: number
  totalContributions: number
  progress: number
}

export function calculateEmergencyFund(inputs: EmergencyFundInputs): EmergencyFundResults {
  const {
    monthlyExpenses,
    coverageMonths,
    currentSavings,
    monthlyContribution,
    targetMonths,
  } = inputs

  // ===== 1. TARGET AMOUNT =====
  const targetAmount = monthlyExpenses * targetMonths
  const shortfall = Math.max(0, targetAmount - currentSavings)
  const progress = Math.min(100, (currentSavings / targetAmount) * 100)

  // ===== 2. TIME TO GOAL =====
  let monthsToGoal = 0
  let balance = currentSavings
  let totalContributions = currentSavings

  if (monthlyContribution > 0 && shortfall > 0) {
    while (balance < targetAmount && monthsToGoal < 1200) {
      monthsToGoal++
      balance += monthlyContribution
      totalContributions += monthlyContribution
    }
  } else if (shortfall === 0) {
    monthsToGoal = 0
  } else {
    monthsToGoal = Infinity
  }

  // ===== 3. MONTHLY DATA =====
  const monthlyData: MonthlyData[] = []
  let currentBalance = currentSavings
  let cumulativeContributions = currentSavings

  const maxMonths = Math.min(monthsToGoal, 120)

  for (let month = 1; month <= maxMonths; month++) {
    if (currentBalance >= targetAmount) break
    currentBalance += monthlyContribution
    cumulativeContributions += monthlyContribution

    monthlyData.push({
      month,
      balance: Math.round(currentBalance),
      contribution: Math.round(monthlyContribution),
      totalContributions: Math.round(cumulativeContributions),
      progress: Math.min(100, (currentBalance / targetAmount) * 100),
    })
  }

  // ===== 4. STATUS =====
  let status: 'on_track' | 'behind' | 'ahead' | 'complete'
  let statusLabel: string

  if (currentSavings >= targetAmount) {
    status = 'complete'
    statusLabel = '🎉 Complete! You have reached your emergency fund goal!'
  } else if (progress >= 75) {
    status = 'ahead'
    statusLabel = '📈 Ahead - You are making excellent progress!'
  } else if (progress >= 25) {
    status = 'on_track'
    statusLabel = '📊 On Track - Keep going!'
  } else {
    status = 'behind'
    statusLabel = '⚠️ Behind - Consider increasing your savings'
  }

  // ===== 5. COMPLETION DATE =====
  const now = new Date()
  const completionDate = new Date(now)
  if (monthsToGoal > 0 && isFinite(monthsToGoal)) {
    completionDate.setMonth(completionDate.getMonth() + monthsToGoal)
  } else {
    completionDate.setFullYear(completionDate.getFullYear() + 10)
  }

  const yearsToGoal = monthsToGoal / 12

  // ===== 6. RISK REPORT =====
  const currentCoverage = currentSavings / monthlyExpenses
  let riskLevel: 'low' | 'medium' | 'high'
  let riskMessage = ''

  if (currentCoverage >= targetMonths) {
    riskLevel = 'low'
    riskMessage = `🛡️ Low Risk: Your emergency fund covers ${currentCoverage.toFixed(1)} months of expenses. You are well prepared for financial emergencies.`
  } else if (currentCoverage >= targetMonths * 0.5) {
    riskLevel = 'medium'
    riskMessage = `⚠️ Medium Risk: Your emergency fund covers ${currentCoverage.toFixed(1)} months of expenses. Consider building to ${targetMonths} months for better security.`
  } else {
    riskLevel = 'high'
    riskMessage = `🚨 High Risk: Your emergency fund covers only ${currentCoverage.toFixed(1)} months of expenses. You are vulnerable to financial emergencies.`
  }

  const liquidityScore = Math.min(100, (currentCoverage / targetMonths) * 100)

  return {
    targetAmount: Math.round(targetAmount),
    currentProgress: Math.round(progress * 10) / 10,
    monthsToGoal: isFinite(monthsToGoal) ? monthsToGoal : 0,
    yearsToGoal: Math.round(yearsToGoal * 10) / 10,
    completionDate: isFinite(monthsToGoal) && monthsToGoal > 0 
      ? completionDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : 'Already achieved!',
    status,
    statusLabel,
    monthlyData,
    summary: {
      targetAmount: Math.round(targetAmount),
      currentSavings: Math.round(currentSavings),
      shortfall: Math.round(shortfall),
      monthlyContribution: Math.round(monthlyContribution),
      monthsToGoal: isFinite(monthsToGoal) ? monthsToGoal : 0,
    },
    riskReport: {
      liquidityScore: Math.round(liquidityScore * 10) / 10,
      coverageMonths: Math.round(currentCoverage * 10) / 10,
      riskLevel,
      riskMessage,
    },
  }
}