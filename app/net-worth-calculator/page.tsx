'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateNetWorth } from '@/lib/calculators/net-worth'
import { AdUnit } from '@/components/ui/AdUnit'

export default function NetWorthCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const assets = parseItems(values.assetsInput, 'asset')
    const liabilities = parseItems(values.liabilitiesInput, 'liability')
    const result = calculateNetWorth({ assets, liabilities })
    setResults(result)
  }, [])

  const parseItems = (text: string, type: 'asset' | 'liability') => {
    try {
      const lines = text.split('\n').filter((line) => line.trim())
      return lines.map((line, index) => {
        const parts = line.split(',').map((p) => p.trim())
        const categoryMap: Record<string, any> = {
          asset: {
            cash: 'cash',
            investment: 'investments',
            real_estate: 'real_estate',
            vehicle: 'vehicles',
            other: 'other',
          },
          liability: {
            mortgage: 'mortgage',
            credit_card: 'credit_card',
            student_loan: 'student_loan',
            auto_loan: 'auto_loan',
            other: 'other',
          },
        }
        return {
          id: `${type}-${index}`,
          name: parts[0] || `${type} ${index + 1}`,
          value: parseFloat(parts[1]) || 0,
          category: parts[2] ? categoryMap[type][parts[2].toLowerCase()] || 'other' : 'other',
        }
      })
    } catch {
      if (type === 'asset') {
        return [
          { id: 'asset-0', name: 'Cash & Savings', value: 15000, category: 'cash' },
          { id: 'asset-1', name: 'Stocks & Bonds', value: 25000, category: 'investments' },
          { id: 'asset-2', name: 'House', value: 300000, category: 'real_estate' },
          { id: 'asset-3', name: 'Car', value: 15000, category: 'vehicles' },
        ]
      } else {
        return [
          { id: 'liab-0', name: 'Mortgage', value: 200000, category: 'mortgage' },
          { id: 'liab-1', name: 'Credit Card', value: 3000, category: 'credit_card' },
          { id: 'liab-2', name: 'Student Loan', value: 15000, category: 'student_loan' },
          { id: 'liab-3', name: 'Car Loan', value: 10000, category: 'auto_loan' },
        ]
      }
    }
  }

  const inputs = useMemo(() => [
    {
      id: 'assetsInput',
      label: 'Assets (Name, Value, Category)',
      type: 'text' as const,
      value: `Cash & Savings, 15000, cash\nStocks & Bonds, 25000, investments\nHouse, 300000, real_estate\nCar, 15000, vehicle`,
      tooltip: 'Enter each asset on a new line: Name, Value, Category (cash, investments, real_estate, vehicle, other)',
      helpText: 'Example: House, 300000, real_estate',
      required: true,
    },
    {
      id: 'liabilitiesInput',
      label: 'Liabilities (Name, Value, Category)',
      type: 'text' as const,
      value: `Mortgage, 200000, mortgage\nCredit Card, 3000, credit_card\nStudent Loan, 15000, student_loan\nCar Loan, 10000, auto_loan`,
      tooltip: 'Enter each liability on a new line: Name, Value, Category (mortgage, credit_card, student_loan, auto_loan, other)',
      helpText: 'Example: Credit Card, 3000, credit_card',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📒 Net Worth Calculator"
        description="Calculate your net worth by adding all assets and subtracting all liabilities. Track your financial progress over time."
        icon="📒"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 rounded-2xl p-6 border border-purple-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Net Worth Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate your net worth by adding all assets and subtracting all liabilities. Track your financial progress over time. Perfect for personal financial planning, wealth tracking, and understanding your overall financial health.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Add Assets</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Cash & Savings</strong> - Bank accounts</li>
                    <li>• <strong>Investments</strong> - Stocks, bonds, 401k</li>
                    <li>• <strong>Real Estate</strong> - Home, rental property</li>
                    <li>• <strong>Vehicles</strong> - Cars, boats, etc.</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Liabilities</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Mortgage</strong> - Home loan balance</li>
                    <li>• <strong>Credit Cards</strong> - Card balances</li>
                    <li>• <strong>Student Loans</strong> - Education debt</li>
                    <li>• <strong>Auto Loans</strong> - Car loan balances</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Summary</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Assets</strong> - Everything you own</li>
                    <li>• <strong>Total Liabilities</strong> - Everything you owe</li>
                    <li>• <strong>Net Worth</strong> - Assets - Liabilities</li>
                    <li>• <strong>Category Breakdown</strong> - Where money is</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-fuchsia-100 rounded-lg flex items-center justify-center text-fuchsia-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Track Progress</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Update Monthly</strong> - Track growth</li>
                    <li>• <strong>Set Goals</strong> - Target net worth</li>
                    <li>• <strong>Reduce Debt</strong> - Increase net worth</li>
                    <li>• <strong>Build Wealth</strong> - Grow assets</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 text-lg">💡</span>
                  <p className="text-sm text-purple-800">
                    <strong>Pro Tip:</strong> Track your net worth monthly to see your financial progress! A growing net worth means you're building wealth. Focus on increasing assets (investments, savings) and decreasing liabilities (paying off debt) to accelerate your financial freedom journey.
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Net Worth Calculator?</strong> Our free net worth calculator helps you calculate your total assets, liabilities, and net worth in one place. Whether you're tracking personal finances, planning for retirement, or building wealth, our tool provides accurate calculations with detailed category breakdowns. Track your financial progress over time and make informed decisions about saving, investing, and debt reduction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay results={results} formValues={formValues} currency={currency} />
          </div>
        </div>
      </CalculatorLayout>

      <div className="container mx-auto px-4 mt-8">
        <AdUnit format="horizontal" slot="banner-ad-slot" />
      </div>
    </>
  )
}