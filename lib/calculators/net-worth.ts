/**
 * Net Worth Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface Asset {
  id: string
  name: string
  value: number
  category: 'cash' | 'investments' | 'real_estate' | 'vehicles' | 'other'
}

export interface Liability {
  id: string
  name: string
  value: number
  category: 'mortgage' | 'credit_card' | 'student_loan' | 'auto_loan' | 'other'
}

export interface NetWorthInputs {
  assets: Asset[]
  liabilities: Liability[]
}

export interface NetWorthResults {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  assetBreakdown: BreakdownItem[]
  liabilityBreakdown: BreakdownItem[]
  categorySummary: CategorySummary[]
  debtToAssetRatio: number
  liquidityRatio: number
  status: 'excellent' | 'good' | 'average' | 'poor'
  statusLabel: string
  reportCard: {
    healthCheck: string
    actionItems: string[]
  }
}

export interface BreakdownItem {
  name: string
  value: number
  percentage: number
  category: string
}

export interface CategorySummary {
  category: string
  total: number
  percentage: number
}

export function calculateNetWorth(inputs: NetWorthInputs): NetWorthResults {
  const { assets, liabilities } = inputs

  // ===== 1. CALCULATE TOTALS =====
  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0)
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0)
  const netWorth = totalAssets - totalLiabilities

  // ===== 2. ASSET BREAKDOWN =====
  const assetBreakdown: BreakdownItem[] = assets.map((a) => ({
    name: a.name,
    value: a.value,
    percentage: totalAssets > 0 ? (a.value / totalAssets) * 100 : 0,
    category: a.category,
  }))

  // ===== 3. LIABILITY BREAKDOWN =====
  const liabilityBreakdown: BreakdownItem[] = liabilities.map((l) => ({
    name: l.name,
    value: l.value,
    percentage: totalLiabilities > 0 ? (l.value / totalLiabilities) * 100 : 0,
    category: l.category,
  }))

  // ===== 4. CATEGORY SUMMARY =====
  const categoryMap = new Map<string, number>()
  assets.forEach((a) => {
    const current = categoryMap.get(a.category) || 0
    categoryMap.set(a.category, current + a.value)
  })

  const categorySummary: CategorySummary[] = Array.from(categoryMap.entries()).map(([category, total]) => ({
    category,
    total,
    percentage: (total / (totalAssets + totalLiabilities)) * 100 || 0,
  }))

  // ===== 5. RATIOS =====
  const debtToAssetRatio = totalAssets > 0 ? totalLiabilities / totalAssets : 0
  
  // ✅ Fixed: Handle division by zero
  const cashAssets = assets.filter(a => a.category === 'cash').reduce((sum, a) => sum + a.value, 0)
  const liquidityRatio = totalLiabilities > 0 ? cashAssets / totalLiabilities : 999 // Infinite liquidity

  // ===== 6. STATUS =====
  let status: 'excellent' | 'good' | 'average' | 'poor'
  let statusLabel: string

  if (netWorth > 1000000) {
    status = 'excellent'
    statusLabel = '🌟 Excellent - Millionaire status!'
  } else if (netWorth > 250000) {
    status = 'good'
    statusLabel = '💪 Good - Strong financial position'
  } else if (netWorth > 0) {
    status = 'average'
    statusLabel = '📊 Average - Positive net worth'
  } else {
    status = 'poor'
    statusLabel = '⚠️ Poor - Negative net worth. Focus on reducing debt.'
  }

  // ===== 7. REPORT CARD =====
  const actionItems: string[] = []

  // Check high-interest debt
  const highInterestDebt = liabilities.filter(l => 
    ['credit_card', 'other'].includes(l.category)
  ).reduce((sum, l) => sum + l.value, 0)

  if (highInterestDebt > 0) {
    actionItems.push(`💳 You are carrying $${highInterestDebt.toLocaleString()} in high-interest debt. Prioritizing this via an aggressive repayment strategy will increase your net worth compound trajectory.`)
  }

  // Check emergency fund (cash)
  if (cashAssets < 10000) {
    actionItems.push(`🛡️ Your liquid cash reserves are $${cashAssets.toLocaleString()}. Consider building a 3-6 month emergency fund for financial security.`)
  }

  // Check debt-to-asset ratio
  if (debtToAssetRatio > 0.5) {
    actionItems.push(`📊 Your debt-to-asset ratio is ${(debtToAssetRatio * 100).toFixed(1)}%. Reducing this below 50% would improve your financial health significantly.`)
  }

  if (actionItems.length === 0) {
    actionItems.push('✅ Your financial health looks strong! Continue maintaining your current strategy.')
  }

  // Health check verdict
  let healthCheck = ''
  if (status === 'excellent' || status === 'good') {
    healthCheck = `Your Net Worth is $${netWorth.toLocaleString()}. Your Debt-to-Asset ratio is ${(debtToAssetRatio * 100).toFixed(1)}%. Your financial position is Healthy!`
  } else if (status === 'average') {
    healthCheck = `Your Net Worth is $${netWorth.toLocaleString()}. Your Debt-to-Asset ratio is ${(debtToAssetRatio * 100).toFixed(1)}%. Action Required: Focus on debt reduction and increasing savings.`
  } else {
    healthCheck = `Your Net Worth is $${netWorth.toLocaleString()}. Your Debt-to-Asset ratio is ${(debtToAssetRatio * 100).toFixed(1)}%. Immediate Action Required: Prioritize debt reduction and building emergency savings.`
  }

  return {
    totalAssets: Math.round(totalAssets),
    totalLiabilities: Math.round(totalLiabilities),
    netWorth: Math.round(netWorth),
    assetBreakdown,
    liabilityBreakdown,
    categorySummary,
    debtToAssetRatio: Math.round(debtToAssetRatio * 1000) / 1000,
    liquidityRatio: totalLiabilities > 0 ? Math.round(liquidityRatio * 1000) / 1000 : 999,
    status,
    statusLabel,
    reportCard: {
      healthCheck,
      actionItems,
    },
  }
}