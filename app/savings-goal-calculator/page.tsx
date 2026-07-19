'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateSavingsGoal } from '@/lib/calculators/savings-goal'
import { AdUnit } from '@/components/ui/AdUnit'

export default function SavingsGoalCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateSavingsGoal({
      targetAmount: values.targetAmount,
      currentSavings: values.currentSavings || 0,
      monthlyContribution: values.monthlyContribution || 0,
      annualRate: values.annualRate,
      years: values.years,
      contributionFrequency: values.contributionFrequency || 'monthly',
      compoundFrequency: values.compoundFrequency || 'monthly',
      strategy: values.strategy || 'calculate-contribution',
      targetTimeframeYears: values.targetTimeframeYears || 3,
      targetTimeframeMonths: values.targetTimeframeMonths || 0,
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'targetAmount',
      label: 'Savings Goal',
      type: 'number' as const,
      value: 50000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your target savings amount',
      required: true,
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'number' as const,
      value: 5000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount you have already saved',
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 1000000,
      step: 50,
      prefix: '$',
      tooltip: 'Amount you can save each month',
    },
    {
      id: 'annualRate',
      label: 'Expected Annual Return',
      type: 'range' as const,
      value: 4.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'Expected average annual return on savings',
      required: true,
    },
    {
      id: 'years',
      label: 'Time to Reach Goal',
      type: 'range' as const,
      value: 5,
      min: 1,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'How many years you have to save',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🎯 Savings Goal Calculator"
        description="See how long it takes to reach your savings goal. Calculate required monthly contributions and track your progress."
        icon="🎯"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Savings Goal Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                See how long it takes to reach your savings goal. Calculate required monthly contributions and track your progress. Perfect for retirement planning, down payment savings, vacation funds, and any other financial goal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Set Your Goal</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Savings Goal</strong> - Target amount</li>
                    <li>• <strong>Current Savings</strong> - What you have</li>
                    <li>• <strong>Monthly Contribution</strong> - Amount to save</li>
                    <li>• <strong>Time Frame</strong> - Years to goal</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Return Expectations</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Annual Return</strong> - Expected growth rate</li>
                    <li>• <strong>Contribution Frequency</strong> - Monthly/Weekly</li>
                    <li>• <strong>Compound Frequency</strong> - How often compounds</li>
                    <li>• <strong>Inflation</strong> - Adjust for purchasing power</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Projections</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Future Value</strong> - Projected balance</li>
                    <li>• <strong>Total Contributions</strong> - What you save</li>
                    <li>• <strong>Interest Earned</strong> - Growth amount</li>
                    <li>• <strong>Target Achieved</strong> - Yes/No</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Adjust & Optimize</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Increase Contributions</strong> - Faster goal</li>
                    <li>• <strong>Higher Returns</strong> - Better investments</li>
                    <li>• <strong>Longer Timeframe</strong> - More flexibility</li>
                    <li>• <strong>Compare Scenarios</strong> - Find best plan</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> The earlier you start saving, the more time compound interest has to work its magic. Even small monthly contributions can grow significantly over time. Our calculator shows you exactly how long it will take to reach your goal and what adjustments you can make to get there faster!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Savings Goal Calculator?</strong> Our free savings goal calculator helps you determine how long it will take to reach your financial goals and what monthly contributions are required. Whether you're saving for a down payment, vacation, emergency fund, or retirement, our tool provides accurate calculations with detailed year-by-year projections. Compare different contribution amounts, investment returns, and timeframes to create a realistic savings plan that works for you.
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
              showAdvanced={true}
              showContributionFrequency={true}
              showCompoundingFrequency={true}
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