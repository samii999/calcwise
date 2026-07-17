'use client'

import { useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils/formatters'
import { Charts } from './Charts'
import { ExportOptions } from './ExportOptions'
import { COUNTRIES } from '@/data/countries'

interface ResultsDisplayProps {
  results: any
  formValues?: any
  onBiWeeklyToggle?: (value: boolean) => void
  onAcceleratedBiWeeklyToggle?: (value: boolean) => void
  onExtraPaymentChange?: (year: number, amount: number) => void
  currency?: 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR' | 'INR' | 'PKR'
}

export function ResultsDisplay({ 
  results, 
  formValues, 
  onBiWeeklyToggle,
  onAcceleratedBiWeeklyToggle,
  onExtraPaymentChange,
  currency = 'USD'
}: ResultsDisplayProps) {
  const [showAmortization, setShowAmortization] = useState(false)
  const [isBiWeekly, setIsBiWeekly] = useState(formValues?.isBiWeekly || false)
  const [isAcceleratedBiWeekly, setIsAcceleratedBiWeekly] = useState(formValues?.isAcceleratedBiWeekly || false)

  // Sync local state with parent formValues
  useEffect(() => {
    if (formValues?.isBiWeekly !== undefined) {
      setIsBiWeekly(formValues.isBiWeekly)
    }
    if (formValues?.isAcceleratedBiWeekly !== undefined) {
      setIsAcceleratedBiWeekly(formValues.isAcceleratedBiWeekly)
    }
  }, [formValues?.isBiWeekly, formValues?.isAcceleratedBiWeekly])

  // ===== CHECK RESULTS =====
  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-gray-500">Enter values to see results</p>
        <p className="text-xs text-gray-400 mt-1">Results update automatically</p>
      </div>
    )
  }

  // ===== COUNTRY DATA =====
  const countryData = formValues?.country ? COUNTRIES.find((c) => c.value === formValues.country) : null

  // ===== CALCULATOR DETECTION =====
  const isMortgage = results.downPaymentPercent !== undefined
  const isLoan = results.loanAmount !== undefined && results.downPaymentPercent === undefined
  const isInvestment = (results.futureValue !== undefined && results.totalReturns !== undefined) || (results.netProfit !== undefined && results.cagr !== undefined)
  const isCompoundInterest = results.endingBalance !== undefined && results.interestEarned !== undefined
  const isSimpleInterest = results.interest !== undefined && results.totalAmount !== undefined
  const isRetirement = results.retirementBalance !== undefined && results.monthlyIncome !== undefined
  const isDebtPayoff = results.totalDebt !== undefined && results.payoffMonths !== undefined
  const isRefinance = results.newMonthlyPayment !== undefined && results.breakEvenMonths !== undefined
  const isEmergencyFund = results.targetAmount !== undefined && results.currentProgress !== undefined
  const isRentVsBuy = results.buyTotalCost !== undefined && results.rentTotalCost !== undefined
  const isNetWorth = results.totalAssets !== undefined
  const isBudget = results.totalIncome !== undefined && results.totalExpenses !== undefined
  const isSalary = results.hourlyRate !== undefined && results.monthlyRate !== undefined
  const isInflation = results.futureValue !== undefined && results.inflationAdjustedValue !== undefined
  const isSavingsGoal = results.targetAchieved !== undefined && results.requiredMonthlyContribution !== undefined
  const isCarLoan = results.totalCost !== undefined && (results.salesTaxAmount !== undefined || results.taxAmount !== undefined)
  const isHomeAffordability = results.maxHomePrice !== undefined && results.dtiRatio !== undefined
  const isAmortization = results.summary !== undefined && results.amortizationSchedule !== undefined
  const isStudentLoan = results.forgivenessAmount !== undefined || results.monthlyIncomeRequired !== undefined
  const isCreditCard = results.isNegativeAmortization !== undefined || results.warningMessage !== undefined

  // ===== DATA SOURCES =====
  const hasAmortization = results.amortizationSchedule && results.amortizationSchedule.length > 0
  const hasYearlyData = results.yearlyData && results.yearlyData.length > 0
  const hasMonthlySummary = results.monthlySummary && results.monthlySummary.length > 0
  const hasYearlyBreakdown = results.yearlyBreakdown && results.yearlyBreakdown.length > 0
  const hasMonthlyData = results.monthlyData && results.monthlyData.length > 0
  const hasYearlyComparison = results.yearlyComparison && results.yearlyComparison.length > 0
  const hasMonthlyBreakdown = results.monthlyBreakdown && results.monthlyBreakdown.length > 0
  const hasComparison = results.amortizationComparison && results.amortizationComparison.length > 0

  // ===== CHART DATA (for Charts component) =====
  const chartData = hasYearlyData ? results.yearlyData : (hasAmortization ? results.amortizationSchedule : [])
  const isMonthBased = hasAmortization && results.amortizationSchedule[0]?.month !== undefined

  // ===== YEARLY DATA TYPE DETECTION =====
  const firstYearlyRow = hasYearlyData ? results.yearlyData[0] : null
  const isYearlyInvestment = !!firstYearlyRow && firstYearlyRow.returns !== undefined && firstYearlyRow.dividends !== undefined
  const isYearlyRetirement = !!firstYearlyRow && firstYearlyRow.employerMatch !== undefined
  const isYearlyGrowth = !!firstYearlyRow && firstYearlyRow.interest !== undefined && firstYearlyRow.returns === undefined
  const isInflationTable = !!firstYearlyRow && firstYearlyRow.nominalValue !== undefined
  const isSimpleInterestTable = !!firstYearlyRow && firstYearlyRow.taxes !== undefined && firstYearlyRow.fees !== undefined

  // ===== MONTHLY BREAKDOWN (for mortgage charts only) =====
  const monthlyBreakdown = isMortgage && (results.principalAndInterest !== undefined || results.monthlyPayment !== undefined) ? {
    principalInterest: results.principalAndInterest || results.monthlyPayment || 0,
    tax: results.propertyTaxMonthly || 0,
    insurance: results.insuranceMonthly || 0,
    pmi: results.pmiMonthly || 0,
    hoa: results.hoaMonthly || 0,
  } : undefined

  // ===== CHART TYPE =====
  let chartType: 'amortization' | 'investment' | 'growth' | 'retirement' | 'debt' | 'budget' | 'salary' | undefined = undefined
  if (isAmortization || isMortgage || isLoan || isCarLoan || isDebtPayoff || isCreditCard) {
    chartType = 'amortization'
  } else if (isInvestment) {
    chartType = 'investment'
  } else if (isCompoundInterest || isSavingsGoal || isYearlyGrowth) {
    chartType = 'growth'
  } else if (isRetirement || isYearlyRetirement) {
    chartType = 'retirement'
  } else if (isBudget) {
    chartType = 'budget'
  }

  // ===== BI-WEEKLY TOGGLE =====
  const handleBiWeeklyToggle = () => {
    setIsBiWeekly(!isBiWeekly)
    if (onBiWeeklyToggle) {
      onBiWeeklyToggle(!isBiWeekly)
    }
  }

  const handleAcceleratedBiWeeklyToggle = () => {
    setIsAcceleratedBiWeekly(!isAcceleratedBiWeekly)
    if (onAcceleratedBiWeeklyToggle) {
      onAcceleratedBiWeeklyToggle(!isAcceleratedBiWeekly)
    }
  }

  // ===== PRIMARY VALUE =====
  const getPrimaryValue = () => {
    if (results.monthlyPayment) return results.monthlyPayment
    if (results.endingBalance) return results.endingBalance
    if (results.futureValue) return results.futureValue
    if (results.totalAmount) return results.totalAmount
    if (results.retirementBalance) return results.retirementBalance
    if (results.totalDebt) return results.totalDebt
    if (results.newMonthlyPayment) return results.newMonthlyPayment
    if (results.targetAmount) return results.targetAmount
    if (results.buyTotalCost) return results.buyTotalCost
    if (results.netWorth) return results.netWorth
    if (results.surplus) return results.surplus
    if (results.monthlyRate) return results.monthlyRate
    if (results.maxHomePrice) return results.maxHomePrice
    if (results.netProfit !== undefined) return results.netProfit
    if (results.cagr !== undefined) return results.cagr
    return 0
  }

  const getPrimaryLabel = () => {
    if (isMortgage) return 'Total Monthly Payment'
    if (isLoan) return 'Monthly Payment'
    if (isInvestment || isCompoundInterest) return 'Future Value'
    if (isSimpleInterest) return 'Total Amount'
    if (isRetirement) return 'Retirement Balance'
    if (isDebtPayoff) return 'Total Debt'
    if (isRefinance) return 'New Monthly Payment'
    if (isEmergencyFund) return 'Target Amount'
    if (isRentVsBuy) return 'Buy Total Cost'
    if (isNetWorth) return 'Net Worth'
    if (isBudget) return 'Monthly Surplus'
    if (isSalary) return 'Monthly Salary'
    if (isInflation) return 'Future Value'
    if (isSavingsGoal) return 'Future Value'
    if (isHomeAffordability) return 'Max Home Price'
    if (isCarLoan) return 'Total Cost'
    if (isAmortization) return 'Monthly Payment'
    if (isStudentLoan) return 'Monthly Payment'
    if (isCreditCard) return 'Monthly Payment'
    return 'Result'
  }

  // ===== RENDER TABLE FUNCTION =====
  const renderTable = () => {
    // ===== INFLATION TABLE =====
    if (isInflationTable && hasYearlyData) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-right text-gray-600">Nominal Value</th>
              <th className="px-4 py-2 text-right text-gray-600">Real Value</th>
              <th className="px-4 py-2 text-right text-gray-600">Cumulative Inflation</th>
              <th className="px-4 py-2 text-right text-gray-600">Annual Rate</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyData.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.nominalValue || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.realValue || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{row.cumulativeInflation || 0}%</td>
                <td className="px-4 py-2 text-right text-gray-600">{row.annualInflationRate || 0}%</td>
              </tr>
            ))}
            {results.yearlyData.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={5} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyData.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== RETIREMENT TABLE =====
    if (isYearlyRetirement && hasYearlyData) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-left text-gray-600">Age</th>
              <th className="px-4 py-2 text-right text-gray-600">Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">Contributions</th>
              <th className="px-4 py-2 text-right text-gray-600">Employer Match</th>
              <th className="px-4 py-2 text-right text-gray-600">Returns</th>
              <th className="px-4 py-2 text-center text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyData.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-gray-700">{row.age}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.contributions || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.employerMatch || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.returns || 0, currency)}</td>
                <td className="px-4 py-2 text-center text-gray-600">{row.isRetired ? 'Retired' : 'Working'}</td>
              </tr>
            ))}
            {results.yearlyData.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={7} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyData.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== INVESTMENT TABLE =====
    if (isYearlyInvestment && hasYearlyData) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-right text-gray-600">Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">Contributions</th>
              <th className="px-4 py-2 text-right text-gray-600">Returns</th>
              <th className="px-4 py-2 text-right text-gray-600">Dividends</th>
              <th className="px-4 py-2 text-right text-gray-600">Fees</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyData.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.contributions || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.returns || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.dividends || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.fees || 0, currency)}</td>
              </tr>
            ))}
            {results.yearlyData.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={6} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyData.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== GROWTH TABLE (Compound Interest, Savings Goal) =====
    if (isYearlyGrowth && hasYearlyData) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-right text-gray-600">Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">Contributions</th>
              <th className="px-4 py-2 text-right text-gray-600">Interest</th>
              <th className="px-4 py-2 text-right text-gray-600">Total Interest</th>
              <th className="px-4 py-2 text-right text-gray-600">Inflation Adjusted</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyData.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.contributions || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.interest || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.totalInterest || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.inflationAdjusted || 0, currency)}</td>
              </tr>
            ))}
            {results.yearlyData.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={6} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyData.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== SIMPLE INTEREST TABLE =====
    if (isSimpleInterestTable && hasYearlyData) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-right text-gray-600">Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">Interest</th>
              <th className="px-4 py-2 text-right text-gray-600">Taxes</th>
              <th className="px-4 py-2 text-right text-gray-600">Fees</th>
              <th className="px-4 py-2 text-right text-gray-600">Net Balance</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyData.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.interest || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.taxes || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.fees || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.netBalance || 0, currency)}</td>
              </tr>
            ))}
            {results.yearlyData.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={6} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyData.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== BUDGET TABLE =====
    if (isBudget && hasMonthlySummary) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Month</th>
              <th className="px-4 py-2 text-right text-gray-600">Income</th>
              <th className="px-4 py-2 text-right text-gray-600">Expenses</th>
              <th className="px-4 py-2 text-right text-gray-600">Surplus</th>
            </tr>
          </thead>
          <tbody>
            {results.monthlySummary.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.month}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.income || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.expenses || 0, currency)}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.surplus || 0, currency)}</td>
              </tr>
            ))}
            {results.monthlySummary.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={4} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.monthlySummary.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== SALARY TABLE =====
    if (isSalary && hasYearlyBreakdown) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Month</th>
              <th className="px-4 py-2 text-right text-gray-600">Gross Pay</th>
              <th className="px-4 py-2 text-right text-gray-600">Net Pay</th>
              <th className="px-4 py-2 text-right text-gray-600">Taxes</th>
              <th className="px-4 py-2 text-right text-gray-600">Cumulative Gross</th>
              <th className="px-4 py-2 text-right text-gray-600">Cumulative Net</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyBreakdown.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.month}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.grossPay || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.netPay || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.taxes || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.cumulativeGross || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.cumulativeNet || 0, currency)}</td>
              </tr>
            ))}
            {results.yearlyBreakdown.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={6} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyBreakdown.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== EMERGENCY FUND TABLE =====
    if (isEmergencyFund && hasMonthlyData) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Month</th>
              <th className="px-4 py-2 text-right text-gray-600">Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">Contribution</th>
              <th className="px-4 py-2 text-right text-gray-600">Progress</th>
            </tr>
          </thead>
          <tbody>
            {results.monthlyData.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.month}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.contribution || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{row.progress || 0}%</td>
              </tr>
            ))}
            {results.monthlyData.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={4} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.monthlyData.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== RENT VS BUY TABLE =====
    if (isRentVsBuy && hasYearlyComparison) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-right text-gray-600">Buy Cost</th>
              <th className="px-4 py-2 text-right text-gray-600">Rent Cost</th>
              <th className="px-4 py-2 text-right text-gray-600">Buy Equity</th>
              <th className="px-4 py-2 text-right text-gray-600">Cumulative Difference</th>
            </tr>
          </thead>
          <tbody>
            {results.yearlyComparison.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.buyCost || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.rentCost || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.buyEquity || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.cumulativeDifference || 0, currency)}</td>
              </tr>
            ))}
            {results.yearlyComparison.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={5} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.yearlyComparison.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== NET WORTH TABLE =====
    if (isNetWorth && (results.assetBreakdown || results.liabilityBreakdown)) {
      const assets = results.assetBreakdown || []
      const liabilities = results.liabilityBreakdown || []
      const combined = [
        ...assets.map((a: any) => ({ type: 'Asset', name: a.name, value: a.value, percentage: a.percentage })),
        ...liabilities.map((l: any) => ({ type: 'Liability', name: l.name, value: l.value, percentage: l.percentage })),
      ]
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Type</th>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-right text-gray-600">Amount</th>
              <th className="px-4 py-2 text-right text-gray-600">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {combined.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.type}</td>
                <td className="px-4 py-2 text-gray-700">{row.name}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.value || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{row.percentage || 0}%</td>
              </tr>
            ))}
            {combined.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={4} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {combined.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== DEBT PAYOFF TABLE =====
    if (isDebtPayoff && hasMonthlyBreakdown) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Month</th>
              <th className="px-4 py-2 text-right text-gray-600">Total Paid</th>
              <th className="px-4 py-2 text-right text-gray-600">Total Interest</th>
              <th className="px-4 py-2 text-right text-gray-600">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {results.monthlyBreakdown.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.month}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.totalPaid || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.totalInterest || 0, currency)}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.remainingBalance || 0, currency)}</td>
              </tr>
            ))}
            {results.monthlyBreakdown.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={4} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.monthlyBreakdown.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== REFINANCE TABLE =====
    if (isRefinance && hasComparison) {
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Year</th>
              <th className="px-4 py-2 text-right text-gray-600">Current Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">New Balance</th>
              <th className="px-4 py-2 text-right text-gray-600">Current Interest</th>
              <th className="px-4 py-2 text-right text-gray-600">New Interest</th>
            </tr>
          </thead>
          <tbody>
            {results.amortizationComparison.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{row.year}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.currentBalance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.newBalance || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.currentInterest || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(row.newInterest || 0, currency)}</td>
              </tr>
            ))}
            {results.amortizationComparison.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={5} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.amortizationComparison.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // ===== HOME AFFORDABILITY TABLE =====
    if (isHomeAffordability && (results.conservative || results.moderate || results.aggressive)) {
      const tiers = [
        { name: 'Conservative', data: results.conservative },
        { name: 'Moderate', data: results.moderate },
        { name: 'Aggressive', data: results.aggressive },
      ].filter(t => t.data)
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Tier</th>
              <th className="px-4 py-2 text-right text-gray-600">Max Home Price</th>
              <th className="px-4 py-2 text-right text-gray-600">Monthly Payment</th>
              <th className="px-4 py-2 text-right text-gray-600">DTI Ratio</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, index) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{tier.name}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(tier.data.maxHomePrice || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{formatCurrency(tier.data.monthlyPayment || 0, currency)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{tier.data.dtiRatio || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }

    // ===== DEFAULT AMORTIZATION TABLE =====
    if (hasAmortization) {
      const showExtraPayment = isMortgage || isLoan || isCarLoan
      return (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">
                {isMonthBased ? 'Month' : 'Year'}
              </th>
              <th className="px-4 py-2 text-right text-gray-600">Payment</th>
              <th className="px-4 py-2 text-right text-gray-600">Principal</th>
              <th className="px-4 py-2 text-right text-gray-600">Interest</th>
              <th className="px-4 py-2 text-right text-gray-600">Balance</th>
              {showExtraPayment && (
                <th className="px-4 py-2 text-center text-gray-600">Extra Payment</th>
              )}
            </tr>
          </thead>
          <tbody>
            {results.amortizationSchedule.slice(0, 30).map((row: any, index: number) => (
              <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">
                  {row.month || row.year || row.period || index + 1}
                </td>
                <td className="px-4 py-2 text-right font-medium">
                  {formatCurrency(row.payment || 0, currency)}
                </td>
                <td className="px-4 py-2 text-right text-gray-600">
                  {formatCurrency(row.principal || 0, currency)}
                </td>
                <td className="px-4 py-2 text-right text-gray-600">
                  {formatCurrency(row.interest || 0, currency)}
                </td>
                <td className="px-4 py-2 text-right font-medium">
                  {formatCurrency(row.balance || 0, currency)}
                </td>
                {showExtraPayment && (
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      placeholder="+ Add"
                      min="0"
                      step="100"
                      className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        if (val > 0 && onExtraPaymentChange) {
                          onExtraPaymentChange(row.year || row.month || row.period || index + 1, val)
                        }
                      }}
                    />
                  </td>
                )}
              </tr>
            ))}
            {results.amortizationSchedule.length > 30 && (
              <tr className="border-t border-gray-200">
                <td colSpan={showExtraPayment ? 6 : 5} className="px-4 py-3 text-center text-gray-400 text-sm">
                  ... and {results.amortizationSchedule.length - 30} more rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }

    // Fallback: no data
    return <p className="text-gray-400 text-sm">No schedule data available.</p>
  }

  return (
    <div id="results-content" className="space-y-6">
      {/* ===== MASTER OUTPUT ===== */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-center text-white">
        <p className="text-sm font-medium text-white/80">{getPrimaryLabel()}</p>
        <p className="text-4xl md:text-5xl font-bold">
          {formatCurrency(getPrimaryValue(), currency)}
        </p>
        {results.principalAndInterest !== undefined && (
          <p className="text-sm text-white/60 mt-1">
            Principal & Interest: {formatCurrency(results.principalAndInterest, currency)}
          </p>
        )}
        {results.totalAssets !== undefined && results.totalLiabilities !== undefined && (
          <p className="text-sm text-white/60 mt-1">
            Assets: {formatCurrency(results.totalAssets, currency)} | Liabilities: {formatCurrency(results.totalLiabilities, currency)}
          </p>
        )}
        {countryData && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-xs text-white/70">
              📍 {countryData.flag} {countryData.label} - Tax rate: {countryData.taxRate}%
              <br />
              <a
                href={countryData.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline hover:text-white transition-colors"
              >
                🔗 Verify official tax rate →
              </a>
            </p>
          </div>
        )}
      </div>

      {/* ===== CREDIT CARD WARNING ===== */}
      {isCreditCard && results.warningMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-800 font-semibold">{results.warningMessage}</p>
        </div>
      )}

      {/* ===== BI-WEEKLY TOGGLE ===== */}
      {(isMortgage || isLoan || isCarLoan) && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-secondary">💡 Switch to Bi-Weekly</h4>
              <p className="text-sm text-gray-500">Pay half every two weeks = 13 full payments per year</p>
            </div>
            <button
              onClick={handleBiWeeklyToggle}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isBiWeekly ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  isBiWeekly ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
          {isBiWeekly && results.biWeeklySavings && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold">
                💰 Save <strong>{formatCurrency(results.biWeeklySavings.interestSaved, currency)}</strong> in interest
              </p>
              <p className="text-green-600 text-sm">
                and finish <strong>{results.biWeeklySavings.yearsSaved} years</strong> earlier!
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Equivalent monthly payment: {formatCurrency(results.biWeeklySavings.monthlyEquivalent, currency)}
              </p>
            </div>
          )}
          {isBiWeekly && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-secondary">🚀 Accelerated Bi-Weekly</h4>
                  <p className="text-sm text-gray-500">Monthly payment ÷ 2 (max savings)</p>
                </div>
                <button
                  onClick={handleAcceleratedBiWeeklyToggle}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    isAcceleratedBiWeekly ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      isAcceleratedBiWeekly ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>
              {isAcceleratedBiWeekly && results.biWeeklySavings && (
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-emerald-800 font-semibold">
                    ⚡ Bi-Weekly Payment: <strong>{formatCurrency(results.biWeeklySavings.biWeeklyPayment, currency)}</strong>
                  </p>
                  <p className="text-emerald-600 text-sm">
                    Save <strong>{formatCurrency(results.biWeeklySavings.interestSaved, currency)}</strong> in interest
                  </p>
                  <p className="text-emerald-600 text-sm">
                    Finish <strong>{results.biWeeklySavings.yearsSaved} years</strong> earlier!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===== EXTRA PAYMENT SAVINGS ===== */}
      {results.extraPaymentSavings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 font-semibold">
            💰 You will save <strong>{formatCurrency(results.extraPaymentSavings, currency)}</strong> in interest
          </p>
          <p className="text-green-600 text-sm">
            and pay off your loan <strong>{results.extraPayoffMonths} months</strong> earlier!
          </p>
        </div>
      )}

      {/* ===== ONE-TIME PAYMENT IMPACT ===== */}
      {results.oneTimePaymentImpact && results.oneTimePaymentImpact.interestSaved > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-blue-800 font-semibold">
            💡 One-time payments will save <strong>{formatCurrency(results.oneTimePaymentImpact.interestSaved, currency)}</strong> in interest
          </p>
          <p className="text-blue-600 text-sm">
            and shorten your loan by <strong>{results.oneTimePaymentImpact.monthsSaved} months</strong>!
          </p>
        </div>
      )}

      {/* ===== STRATEGY WINNER ===== */}
      {results.strategyWinner && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <p className="text-purple-800 font-semibold">
            💡 Strategy Winner: {results.strategyWinner}
          </p>
          <p className="text-purple-600 text-sm">{results.strategyMessage}</p>
        </div>
      )}

      {/* ===== STATUS BADGE ===== */}
      {results.status && results.statusLabel && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <p className="text-blue-800 font-medium">{results.statusLabel}</p>
        </div>
      )}

      {/* ===== VERDICT ===== */}
      {results.verdict && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
          <p className="text-indigo-800 font-semibold">📋 Verdict: {results.verdict}</p>
          <p className="text-indigo-600 text-sm">{results.verdictMessage}</p>
        </div>
      )}

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-2 gap-3">
        {results.loanAmount !== undefined && results.loanAmount > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Loan Amount</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.loanAmount, currency)}
            </p>
          </div>
        )}

        {(isMortgage || isCarLoan) && results.downPayment !== undefined && results.downPayment > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Down Payment</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.downPayment, currency)}
            </p>
            {results.downPaymentPercent !== undefined && (
              <p className="text-xs text-gray-400">{results.downPaymentPercent.toFixed(1)}%</p>
            )}
          </div>
        )}

        {isCarLoan && results.upfrontCashRequired !== undefined && results.upfrontCashRequired > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Upfront Cash Required</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.upfrontCashRequired, currency)}
            </p>
            <p className="text-xs text-gray-400">At signing</p>
          </div>
        )}

        {results.totalInterest !== undefined && results.totalInterest > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Total Interest</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.totalInterest, currency)}
            </p>
          </div>
        )}

        {results.totalPayment !== undefined && results.totalPayment > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Total Payment</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.totalPayment, currency)}
            </p>
          </div>
        )}

        {results.payoffDate && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Payoff Date</p>
            <p className="text-lg font-semibold text-secondary">{results.payoffDate}</p>
          </div>
        )}

        {results.trueAPR !== undefined && results.trueAPR > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">True APR</p>
            <p className="text-lg font-semibold text-secondary">{results.trueAPR}%</p>
          </div>
        )}

        {results.originationFeeAmount !== undefined && results.originationFeeAmount > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Origination Fee</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.originationFeeAmount, currency)}
            </p>
          </div>
        )}

        {results.paymentFrequency && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Payment Frequency</p>
            <p className="text-lg font-semibold text-secondary">{results.paymentFrequency}</p>
          </div>
        )}

        {results.totalContributions !== undefined && results.totalContributions > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Total Contributions</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.totalContributions, currency)}
            </p>
          </div>
        )}

        {results.interestEarned !== undefined && results.interestEarned > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Interest Earned</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.interestEarned, currency)}
            </p>
          </div>
        )}

        {results.inflationAdjustedValue !== undefined && results.inflationAdjustedValue > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Inflation Adjusted</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.inflationAdjustedValue, currency)}
            </p>
          </div>
        )}

        {results.purchasingPower !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Purchasing Power</p>
            <p className="text-lg font-semibold text-secondary">{results.purchasingPower}%</p>
          </div>
        )}

        {results.currentProgress !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Progress</p>
            <p className="text-lg font-semibold text-secondary">{results.currentProgress}%</p>
          </div>
        )}

        {results.targetAchieved !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Target Achieved</p>
            <p className="text-lg font-semibold text-secondary">
              {results.targetAchieved ? '✅ Yes' : '❌ No'}
            </p>
          </div>
        )}

        {isMortgage && results.pmiMonthly !== undefined && results.pmiMonthly > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Monthly PMI</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.pmiMonthly, currency)}
            </p>
          </div>
        )}

        {results.dtiRatio !== undefined && results.dtiRatio > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">DTI Ratio</p>
            <p className="text-lg font-semibold text-secondary">{results.dtiRatio}%</p>
          </div>
        )}

        {results.breakEvenMonths !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Break Even</p>
            <p className="text-lg font-semibold text-secondary">
              {results.breakEvenMonths > 0 ? `${results.breakEvenMonths} months` : 'Never'}
            </p>
          </div>
        )}

        {results.roi !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">ROI</p>
            <p className="text-lg font-semibold text-secondary">{results.roi}%</p>
          </div>
        )}
        
        {results.cagr !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">CAGR</p>
            <p className="text-lg font-semibold text-secondary">{results.cagr}%</p>
          </div>
        )}

        {results.netProfit !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Net Profit</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.netProfit, currency)}
            </p>
          </div>
        )}

        {results.totalROI !== undefined && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Total ROI</p>
            <p className="text-lg font-semibold text-secondary">{results.totalROI}%</p>
          </div>
        )}

        {results.totalDividends !== undefined && results.totalDividends > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Total Dividends</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.totalDividends, currency)}
            </p>
          </div>
        )}

        {results.totalFees !== undefined && results.totalFees > 0 && (
          <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">Total Fees</p>
            <p className="text-lg font-semibold text-secondary">
              {formatCurrency(results.totalFees, currency)}
            </p>
          </div>
        )}

        {isSalary && (
          <>
            <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
              <p className="text-xs text-gray-500">Hourly Rate</p>
              <p className="text-lg font-semibold text-secondary">
                {formatCurrency(results.hourlyRate, currency)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
              <p className="text-xs text-gray-500">Weekly Rate</p>
              <p className="text-lg font-semibold text-secondary">
                {formatCurrency(results.weeklyRate, currency)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* ===== CHARTS ===== */}
      {(hasAmortization || hasYearlyData) && chartData.length > 0 && (
        <div className="mt-2">
          <Charts 
            data={chartData} 
            type={chartType}
            monthlyBreakdown={monthlyBreakdown}
            currency={currency}
          />
        </div>
      )}

      {/* ===== SCHEDULE TABLE ===== */}
      {(hasAmortization || hasYearlyData || hasMonthlySummary || hasYearlyBreakdown || hasMonthlyData || hasYearlyComparison || hasMonthlyBreakdown || hasComparison) && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-700">📋 Full Schedule</span>
            <span className="text-primary">{showAmortization ? '▼' : '▶'}</span>
          </button>

          {showAmortization && (
            <div className="overflow-x-auto">
              {renderTable()}
              <ExportOptions data={chartData} results={results} title="Schedule" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}