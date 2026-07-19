'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateEmergencyFund } from '@/lib/calculators/emergency-fund'
import { AdUnit } from '@/components/ui/AdUnit'

export default function EmergencyFundCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateEmergencyFund({
      monthlyExpenses: values.monthlyExpenses,
      coverageMonths: values.coverageMonths || 6,
      currentSavings: values.currentSavings || 0,
      monthlyContribution: values.monthlyContribution || 0,
      targetMonths: values.targetMonths || 6,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'number' as const,
      value: 4000,
      min: 0,
      max: 100000,
      step: 100,
      prefix: '$',
      tooltip: 'Your total monthly living expenses',
      required: true,
    },
    {
      id: 'targetMonths',
      label: 'Target Coverage Months',
      type: 'select' as const,
      value: 6,
      options: [
        { value: 3, label: '3 Months' },
        { value: 6, label: '6 Months (Recommended)' },
        { value: 9, label: '9 Months' },
        { value: 12, label: '12 Months (Conservative)' },
      ],
      tooltip: 'How many months of expenses you want to save',
    },
    {
      id: 'currentSavings',
      label: 'Current Emergency Cash',
      type: 'number' as const,
      value: 1000,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: '$',
      tooltip: 'Current emergency fund balance',
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number' as const,
      value: 300,
      min: 0,
      max: 100000,
      step: 50,
      prefix: '$',
      tooltip: 'Amount you can save each month',
      helpText: 'Even $100/month adds up over time!',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🛡️ Emergency Fund Calculator"
        description="Calculate how much you need for a secure emergency fund (3-12 months of expenses). Track your progress and see how long to reach your goal."
        icon="🛡️"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 border border-orange-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Emergency Fund Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate how much you need for a secure emergency fund (3-12 months of expenses). Track your progress and see how long to reach your goal. Perfect for building financial security, preparing for job loss, and achieving peace of mind.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Expenses</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Expenses</strong> - Rent, food, bills</li>
                    <li>• <strong>Coverage Months</strong> - 3, 6, 9, or 12 months</li>
                    <li>• <strong>Target Amount</strong> - Calculated automatically</li>
                    <li>• <strong>Currency</strong> - USD, GBP, CAD, AUD</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Track Savings</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Current Savings</strong> - What you have now</li>
                    <li>• <strong>Monthly Contribution</strong> - How much you save</li>
                    <li>• <strong>Progress %</strong> - How close you are</li>
                    <li>• <strong>Status</strong> - On track or behind</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Timeline</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Time to Goal</strong> - Months/years needed</li>
                    <li>• <strong>Projected Date</strong> - When you'll reach it</li>
                    <li>• <strong>Gap Analysis</strong> - How much more needed</li>
                    <li>• <strong>Year-by-Year</strong> - Progress schedule</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Take Action</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Increase Savings</strong> - Speed up timeline</li>
                    <li>• <strong>Reduce Expenses</strong> - Lower target</li>
                    <li>• <strong>Set Milestones</strong> - Celebrate progress</li>
                    <li>• <strong>Stay Consistent</strong> - Regular contributions</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 text-lg">💡</span>
                  <p className="text-sm text-orange-800">
                    <strong>Pro Tip:</strong> Financial experts recommend saving 3-6 months of expenses for an emergency fund. If you have a stable job, 3 months may be enough. If you have variable income or dependents, aim for 6-12 months. Our calculator shows you exactly how long it will take to reach your goal!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Emergency Fund Calculator?</strong> Our free emergency fund calculator helps you determine how much you need for a secure emergency fund and how long it will take to reach your goal. Whether you're building your first emergency fund or checking your progress, our tool provides accurate calculations with detailed year-by-year projections. Track your savings progress, understand your coverage, and achieve financial peace of mind with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs as any} 
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