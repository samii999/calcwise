'use client'

import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  Area,
  AreaChart,
} from 'recharts'

interface ChartsProps {
  data: any[]
  monthlyBreakdown?: {
    principalInterest: number
    tax: number
    insurance: number
    pmi: number
    hoa: number
  }
  type?: 'amortization' | 'investment' | 'growth' | 'retirement' | 'debt' | 'budget' | 'salary' | 'inflation' | 'rent-vs-buy' | 'net-worth' | 'refinance' | 'affordability' | 'emergency' | 'simple-interest'
  currency?: 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR' | 'INR' | 'PKR'
}

const COLORS = ['#0d9488', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#10b981', '#ec4899', '#6366f1']

export function Charts({ data, monthlyBreakdown, type, currency = 'USD' }: ChartsProps) {
  // ===== CURRENCY SYMBOL =====
  const currencySymbols: Record<string, string> = {
    USD: '$',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    EUR: '€',
    INR: '₹',
    PKR: '₨',
  }
  const symbol = currencySymbols[currency] || '$'

  // ===== DATA VALIDATION =====
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-400 text-sm">Enter values to see charts</p>
      </div>
    )
  }

  const validData = data.filter((item) => item && typeof item === 'object')

  if (validData.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-400 text-sm">No valid data</p>
      </div>
    )
  }

  // ===== DATA TYPE DETECTION =====
  const first = validData[0]

  // Amortization (Mortgage, Loan, Car Loan, Credit Card, Amortization, Student Loan, Debt Payoff)
  const isAmortization = validData.some((item) =>
    (item.principal !== undefined || item.payment !== undefined) &&
    (item.interest !== undefined || item.balance !== undefined)
  )

  // Investment (Investment Return)
  const isInvestment = validData.some((item) =>
    item.contributions !== undefined && item.returns !== undefined && item.dividends !== undefined
  )

  // Growth (Compound Interest, Savings Goal)
  const isGrowth = type === 'growth' || validData.some((item) =>
    item.contributions !== undefined && item.interest !== undefined && item.returns === undefined
  )

  // Retirement
  const isRetirement = validData.some((item) =>
    item.employerMatch !== undefined || (item.contributions !== undefined && item.isRetired !== undefined)
  )

  // Budget
  const isBudget = validData.some((item) =>
    item.income !== undefined && item.expenses !== undefined
  )

  // Inflation
  const isInflation = validData.some((item) =>
    item.nominalValue !== undefined && item.realValue !== undefined
  )

  // Rent vs Buy
  const isRentVsBuy = validData.some((item) =>
    item.buyCost !== undefined && item.rentCost !== undefined
  )

  // Net Worth – detect if data has category and value, or assets/liabilities
  const isNetWorth = validData.some((item) =>
    item.assets !== undefined || item.liabilities !== undefined || item.category !== undefined
  )

  // Refinance
  const isRefinance = validData.some((item) =>
    item.currentBalance !== undefined && item.newBalance !== undefined
  )

  // Home Affordability
  const isAffordability = validData.some((item) =>
    item.maxHomePrice !== undefined && item.dtiRatio !== undefined
  )

  // Emergency Fund
  const isEmergency = validData.some((item) =>
    item.progress !== undefined
  )

  // Salary
  const isSalary = validData.some((item) =>
    item.grossPay !== undefined || item.netPay !== undefined
  )

  // Simple Interest
  const isSimpleInterest = validData.some((item) =>
    item.taxes !== undefined && item.fees !== undefined
  )

  // Debt Payoff
  const isDebt = validData.some((item) =>
    item.totalPaid !== undefined && item.remainingBalance !== undefined
  )

  // ===== PIE CHART DATA =====
  const pieData = useMemo(() => {
    // 1. Monthly Breakdown (Mortgage, Loan, Car Loan)
    if (monthlyBreakdown) {
      const items = []
      if (monthlyBreakdown.principalInterest > 0) items.push({ name: 'Principal & Interest', value: Math.round(monthlyBreakdown.principalInterest) })
      if (monthlyBreakdown.tax > 0) items.push({ name: 'Property Tax', value: Math.round(monthlyBreakdown.tax) })
      if (monthlyBreakdown.insurance > 0) items.push({ name: 'Insurance', value: Math.round(monthlyBreakdown.insurance) })
      if (monthlyBreakdown.pmi > 0) items.push({ name: 'PMI', value: Math.round(monthlyBreakdown.pmi) })
      if (monthlyBreakdown.hoa > 0) items.push({ name: 'HOA', value: Math.round(monthlyBreakdown.hoa) })
      return items
    }

    // 2. Amortization (Mortgage, Loan, Car Loan, Credit Card, Amortization, Student Loan)
    if (isAmortization) {
      const totalPrincipal = validData.reduce((sum, item) => sum + (item.principal || 0), 0)
      const totalInterest = validData.reduce((sum, item) => sum + (item.interest || 0), 0)
      const items = []
      if (totalPrincipal > 0) items.push({ name: 'Principal', value: Math.round(totalPrincipal) })
      if (totalInterest > 0) items.push({ name: 'Interest', value: Math.round(totalInterest) })
      return items.length > 0 ? items : [{ name: 'Balance', value: Math.round(validData[validData.length - 1]?.balance || 0) }]
    }

    // 3. Investment
    if (isInvestment) {
      const totalContributions = validData.reduce((sum, item) => sum + (item.contributions || 0), 0)
      const totalReturns = validData.reduce((sum, item) => sum + (item.returns || 0), 0)
      const totalDividends = validData.reduce((sum, item) => sum + (item.dividends || 0), 0)
      const items = []
      if (totalContributions > 0) items.push({ name: 'Contributions', value: Math.round(totalContributions) })
      if (totalReturns > 0) items.push({ name: 'Returns', value: Math.round(totalReturns) })
      if (totalDividends > 0) items.push({ name: 'Dividends', value: Math.round(totalDividends) })
      return items
    }

    // 4. Growth (Compound Interest, Savings Goal) - FIX: compute growth from final balance
    if (isGrowth) {
      const totalContributions = validData.reduce((sum, item) => sum + (item.contributions || 0), 0)
      const finalBalance = validData[validData.length - 1]?.balance || 0
      const growth = Math.max(finalBalance - totalContributions, 0) // avoid negative if data is incomplete
      const items = []
      if (totalContributions > 0) items.push({ name: 'Contributions', value: Math.round(totalContributions) })
      if (growth > 0) items.push({ name: 'Interest Earned', value: Math.round(growth) })
      return items
    }

    // 5. Retirement - FIX: compute growth from final balance
    if (isRetirement) {
      const totalContributions = validData.reduce((sum, item) => sum + (item.contributions || 0), 0)
      const totalEmployerMatch = validData.reduce((sum, item) => sum + (item.employerMatch || 0), 0)
      const finalBalance = validData[validData.length - 1]?.balance || 0
      const growth = Math.max(finalBalance - totalContributions - totalEmployerMatch, 0)
      const items = []
      if (totalContributions > 0) items.push({ name: 'Your Contributions', value: Math.round(totalContributions) })
      if (totalEmployerMatch > 0) items.push({ name: 'Employer Match', value: Math.round(totalEmployerMatch) })
      if (growth > 0) items.push({ name: 'Growth', value: Math.round(growth) })
      return items
    }

    // 6. Budget
    if (isBudget) {
      const totalIncome = validData.reduce((sum, item) => sum + (item.income || 0), 0)
      const totalExpenses = validData.reduce((sum, item) => sum + (item.expenses || 0), 0)
      const items = []
      if (totalIncome > 0) items.push({ name: 'Income', value: Math.round(totalIncome) })
      if (totalExpenses > 0) items.push({ name: 'Expenses', value: Math.round(totalExpenses) })
      return items
    }

    // 7. Inflation
    if (isInflation) {
      const totalNominal = validData.reduce((sum, item) => sum + (item.nominalValue || 0), 0)
      const totalReal = validData.reduce((sum, item) => sum + (item.realValue || 0), 0)
      const items = []
      if (totalNominal > 0) items.push({ name: 'Nominal Value', value: Math.round(totalNominal) })
      if (totalReal > 0) items.push({ name: 'Real Value', value: Math.round(totalReal) })
      return items
    }

    // 8. Rent vs Buy
    if (isRentVsBuy) {
      const totalBuy = validData.reduce((sum, item) => sum + (item.buyCost || 0), 0)
      const totalRent = validData.reduce((sum, item) => sum + (item.rentCost || 0), 0)
      const items = []
      if (totalBuy > 0) items.push({ name: 'Buy Cost', value: Math.round(totalBuy) })
      if (totalRent > 0) items.push({ name: 'Rent Cost', value: Math.round(totalRent) })
      return items
    }

    // 9. Net Worth
    if (isNetWorth) {
      // Check if data is in category/value format (from asset/liability breakdown)
      const totalAssets = validData.some(item => item.assets !== undefined) 
        ? validData.reduce((sum, item) => sum + (item.assets || 0), 0)
        : validData.filter(item => item.type === 'Asset').reduce((sum, item) => sum + (item.value || 0), 0)
      const totalLiabilities = validData.some(item => item.liabilities !== undefined)
        ? validData.reduce((sum, item) => sum + (item.liabilities || 0), 0)
        : validData.filter(item => item.type === 'Liability').reduce((sum, item) => sum + (item.value || 0), 0)
      const items = []
      if (totalAssets > 0) items.push({ name: 'Assets', value: Math.round(totalAssets) })
      if (totalLiabilities > 0) items.push({ name: 'Liabilities', value: Math.round(totalLiabilities) })
      return items
    }

    // 10. Refinance
    if (isRefinance) {
      const totalCurrent = validData.reduce((sum, item) => sum + (item.currentBalance || 0), 0)
      const totalNew = validData.reduce((sum, item) => sum + (item.newBalance || 0), 0)
      const items = []
      if (totalCurrent > 0) items.push({ name: 'Current Balance', value: Math.round(totalCurrent) })
      if (totalNew > 0) items.push({ name: 'New Balance', value: Math.round(totalNew) })
      return items
    }

    // 11. Home Affordability
    if (isAffordability) {
      const conservative = validData.find((item) => item.tier === 'Conservative') || validData[0]
      const moderate = validData.find((item) => item.tier === 'Moderate') || validData[1]
      const aggressive = validData.find((item) => item.tier === 'Aggressive') || validData[2]
      const items = []
      if (conservative?.maxHomePrice) items.push({ name: 'Conservative', value: Math.round(conservative.maxHomePrice) })
      if (moderate?.maxHomePrice) items.push({ name: 'Moderate', value: Math.round(moderate.maxHomePrice) })
      if (aggressive?.maxHomePrice) items.push({ name: 'Aggressive', value: Math.round(aggressive.maxHomePrice) })
      return items
    }

    // 12. Emergency Fund
    if (isEmergency) {
      const current = validData[validData.length - 1]?.balance || 0
      const target = validData[validData.length - 1]?.targetAmount || current * 2
      return [
        { name: 'Current Savings', value: Math.round(current) },
        { name: 'Target', value: Math.round(target - current) },
      ]
    }

    // 13. Simple Interest
    if (isSimpleInterest) {
      const totalPrincipal = validData.reduce((sum, item) => sum + (item.principal || 0), 0)
      const totalInterest = validData.reduce((sum, item) => sum + (item.interest || 0), 0)
      const totalTaxes = validData.reduce((sum, item) => sum + (item.taxes || 0), 0)
      const items = []
      if (totalPrincipal > 0) items.push({ name: 'Principal', value: Math.round(totalPrincipal) })
      if (totalInterest > 0) items.push({ name: 'Interest', value: Math.round(totalInterest) })
      if (totalTaxes > 0) items.push({ name: 'Taxes', value: Math.round(totalTaxes) })
      return items
    }

    // 14. Salary
    if (isSalary) {
      const totalGross = validData.reduce((sum, item) => sum + (item.grossPay || 0), 0)
      const totalNet = validData.reduce((sum, item) => sum + (item.netPay || 0), 0)
      const totalTaxes = validData.reduce((sum, item) => sum + (item.taxes || 0), 0)
      const items = []
      if (totalGross > 0) items.push({ name: 'Gross Pay', value: Math.round(totalGross) })
      if (totalNet > 0) items.push({ name: 'Net Pay', value: Math.round(totalNet) })
      if (totalTaxes > 0) items.push({ name: 'Taxes', value: Math.round(totalTaxes) })
      return items
    }

    // 15. Debt Payoff
    if (isDebt) {
      const totalPaid = validData.reduce((sum, item) => sum + (item.totalPaid || 0), 0)
      const totalInterest = validData.reduce((sum, item) => sum + (item.totalInterest || 0), 0)
      const items = []
      if (totalPaid > 0) items.push({ name: 'Total Paid', value: Math.round(totalPaid) })
      if (totalInterest > 0) items.push({ name: 'Interest', value: Math.round(totalInterest) })
      return items
    }

    // 16. Fallback: Balance
    const lastBalance = validData[validData.length - 1]?.balance || 0
    return [{ name: 'Balance', value: Math.round(lastBalance) }]
  }, [validData, isAmortization, isInvestment, isGrowth, isRetirement, isBudget, isInflation, isRentVsBuy, isNetWorth, isRefinance, isAffordability, isEmergency, isSimpleInterest, isSalary, isDebt, monthlyBreakdown])

  // ===== AREA CHART DATA (unchanged) =====
  const areaData = useMemo(() => {
    if (!isAmortization && !isRetirement && !isGrowth && !isInvestment && !isDebt && !isInflation && !isEmergency && !isRentVsBuy && !isRefinance) return []

    let cumulative = 0
    return validData.map((item) => {
      const val = item.interest || item.returns || 0
      cumulative += val
      return {
        period: item.year || item.month || 0,
        balance: Math.round((item.balance || 0) / 1000),
        cumulative: Math.round(cumulative / 1000),
        ...(isInflation && item.realValue !== undefined ? {
          realValue: Math.round((item.realValue || 0) / 1000),
        } : {}),
        ...(isRentVsBuy && item.buyEquity !== undefined ? {
          buyEquity: Math.round((item.buyEquity || 0) / 1000),
        } : {}),
        ...(isRefinance && item.currentBalance !== undefined ? {
          currentBalance: Math.round((item.currentBalance || 0) / 1000),
          newBalance: Math.round((item.newBalance || 0) / 1000),
        } : {}),
      }
    })
  }, [validData, isAmortization, isRetirement, isGrowth, isInvestment, isDebt, isInflation, isEmergency, isRentVsBuy, isRefinance])

  // ===== BAR CHART DATA (unchanged) =====
  const barData = useMemo(() => {
    const sliceData = validData.slice(0, 10)
    return sliceData.map((item) => {
      const base: any = { period: item.year || item.month || 0 }

      if (isAmortization) {
        base.principal = Math.round((item.principal || 0) / 1000)
        base.interest = Math.round((item.interest || 0) / 1000)
      } else if (isInvestment || isRetirement) {
        base.contributions = Math.round((item.contributions || 0) / 1000)
        base.returns = Math.round((item.returns || 0) / 1000)
      } else if (isGrowth) {
        base.contributions = Math.round((item.contributions || 0) / 1000)
        base.interest = Math.round((item.interest || 0) / 1000)
      } else if (isBudget) {
        base.income = Math.round((item.income || 0) / 1000)
        base.expenses = Math.round((item.expenses || 0) / 1000)
      } else if (isSalary) {
        base.gross = Math.round((item.grossPay || 0) / 1000)
        base.net = Math.round((item.netPay || 0) / 1000)
      } else if (isRentVsBuy) {
        base.buy = Math.round((item.buyCost || 0) / 1000)
        base.rent = Math.round((item.rentCost || 0) / 1000)
      } else {
        base.value = Math.round((item.balance || 0) / 1000)
      }
      return base
    })
  }, [validData, isAmortization, isInvestment, isRetirement, isGrowth, isBudget, isSalary, isRentVsBuy])

  // ===== LINE CHART DATA (unchanged) =====
  const lineData = useMemo(() => {
    return validData.map((item) => ({
      period: item.year || item.month || 0,
      balance: Math.round((item.balance || 0) / 1000),
      ...(isInflation && item.realValue !== undefined ? {
        realValue: Math.round((item.realValue || 0) / 1000),
      } : {}),
    }))
  }, [validData, isInflation])

  const hasPieData = pieData.some((d) => d.value > 0)
  const hasAreaData = areaData.length > 0
  const hasBarData = barData.length > 0 && barData.some((item) => {
    const values = Object.values(item).filter(v => typeof v === 'number' && v !== 0 && v !== item.period)
    return values.length > 0
  })
  const hasLineData = lineData.length > 0 && lineData.some((item) => item.balance > 0)

  // ===== GET CHART TITLES (unchanged) =====
  const getPieTitle = () => {
    if (monthlyBreakdown) return 'Monthly Payment Breakdown'
    if (isAmortization) return 'Payment Breakdown'
    if (isInvestment || isRetirement || isGrowth) return 'Growth Breakdown'
    if (isBudget) return 'Budget Breakdown'
    if (isInflation) return 'Inflation Impact'
    if (isRentVsBuy) return 'Rent vs Buy Cost'
    if (isNetWorth) return 'Net Worth Breakdown'
    if (isRefinance) return 'Refinance Comparison'
    if (isAffordability) return 'Affordability Tiers'
    if (isEmergency) return 'Emergency Fund Progress'
    if (isSimpleInterest) return 'Simple Interest Breakdown'
    if (isSalary) return 'Salary Breakdown'
    if (isDebt) return 'Debt Breakdown'
    return 'Breakdown'
  }

  const getAreaTitle = () => {
    if (isRetirement) return 'Retirement Balance vs Cumulative Growth'
    if (isInflation) return 'Nominal vs Real Value Over Time'
    if (isRentVsBuy) return 'Equity vs Savings Over Time'
    if (isRefinance) return 'Current vs New Balance Over Time'
    if (isEmergency) return 'Emergency Fund Progress Over Time'
    return 'Balance vs Cumulative Interest'
  }

  const getBarTitle = () => {
    if (isAmortization) return 'Principal vs Interest (First 10)'
    if (isInvestment || isRetirement) return 'Contributions vs Returns (First 10)'
    if (isGrowth) return 'Contributions vs Interest (First 10)'
    if (isBudget) return 'Income vs Expenses (First 10)'
    if (isSalary) return 'Gross vs Net Pay (First 10)'
    if (isRentVsBuy) return 'Buy vs Rent Cost (First 10)'
    return 'Period Breakdown'
  }

  return (
    <div className="space-y-6">
      {/* ===== PIE / DONUT CHART ===== */}
      {hasPieData && (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{getPieTitle()}</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    percent && percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => {
                    const num = typeof value === 'number' ? value : Number(value) || 0
                    return [`${symbol}${num.toLocaleString()}`, '']
                  }}
                />
                <Legend />
                {/* Center Label for Monthly Breakdown */}
                {monthlyBreakdown && (
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-sm font-bold fill-secondary"
                  >
                    <tspan x="50%" dy="-6" className="text-xs fill-gray-500">Total</tspan>
                    <tspan x="50%" dy="20" className="text-lg fill-primary">
                      {symbol}{Math.round(
                        monthlyBreakdown.principalInterest +
                        monthlyBreakdown.tax +
                        monthlyBreakdown.insurance +
                        monthlyBreakdown.pmi +
                        monthlyBreakdown.hoa
                      ).toLocaleString()}
                    </tspan>
                  </text>
                )}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ===== AREA CHART ===== */}
      {hasAreaData && (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{getAreaTitle()}</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `${symbol}${value}k`} />
                <Tooltip
                  formatter={(value: any) => {
                    const num = typeof value === 'number' ? value : Number(value) || 0
                    return [`${symbol}${num.toLocaleString()}k`, '']
                  }}
                  labelFormatter={(label) => `Period ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="balance"
                  name="Remaining Balance"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  name="Cumulative Interest"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#cumulativeGradient)"
                />
                {isInflation && (
                  <Line
                    type="monotone"
                    dataKey="realValue"
                    name="Real Value"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                )}
                {isRentVsBuy && (
                  <Line
                    type="monotone"
                    dataKey="buyEquity"
                    name="Buy Equity"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {isRefinance && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="currentBalance"
                      name="Current Balance"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="newBalance"
                      name="New Balance"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ===== BAR CHART ===== */}
      {hasBarData && (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{getBarTitle()}</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `${symbol}${value}k`} />
                <Tooltip
                  formatter={(value: any, name?: string | number) => {
                    const num = typeof value === 'number' ? value : Number(value) || 0
                    return [`${symbol}${num.toLocaleString()}k`, String(name || '')]
                  }}
                  labelFormatter={(label) => `Period ${label}`}
                />
                <Legend />
                {isAmortization ? (
                  <>
                    <Bar dataKey="principal" name="Principal" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interest" name="Interest" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </>
                ) : isInvestment || isRetirement ? (
                  <>
                    <Bar dataKey="contributions" name="Contributions" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returns" name="Returns" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </>
                ) : isGrowth ? (
                  <>
                    <Bar dataKey="contributions" name="Contributions" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interest" name="Interest" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </>
                ) : isBudget ? (
                  <>
                    <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </>
                ) : isSalary ? (
                  <>
                    <Bar dataKey="gross" name="Gross Pay" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="net" name="Net Pay" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </>
                ) : isRentVsBuy ? (
                  <>
                    <Bar dataKey="buy" name="Buy Cost" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rent" name="Rent Cost" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </>
                ) : (
                  <Bar dataKey="value" name="Balance" fill="#0d9488" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ===== LINE CHART ===== */}
      {hasLineData && (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Balance Over Time</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={lineData}>
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `${symbol}${value}k`} />
                <Tooltip
                  formatter={(value: any) => {
                    const num = typeof value === 'number' ? value : Number(value) || 0
                    return [`${symbol}${num.toLocaleString()}k`, '']
                  }}
                  labelFormatter={(label) => `Period ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  name="Balance"
                  stroke="#0d9488"
                  strokeWidth={3}
                  dot={false}
                />
                {isInflation && (
                  <Line
                    type="monotone"
                    dataKey="realValue"
                    name="Real Value"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}