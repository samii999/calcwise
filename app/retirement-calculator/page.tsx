'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateRetirement } from '@/lib/calculators/retirement'
import { AdUnit } from '@/components/ui/AdUnit'

export default function RetirementCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateRetirement({
      currentAge: values.currentAge,
      retirementAge: values.retirementAge,
      currentSalary: values.currentSalary,
      currentSavings: values.currentSavings,
      contributionRate: values.contributionRate,
      employerMatchRate: values.employerMatchRate || 0,
      employerMatchLimit: values.employerMatchLimit || 0,
      preRetirementReturn: values.preRetirementReturn || 8,
      postRetirementReturn: values.postRetirementReturn || 5,
      salaryGrowthRate: values.salaryGrowthRate || 2,
      lifeExpectancy: values.lifeExpectancy || 85,
      inflationRate: values.inflationRate || 2.5,
      annualWithdrawal: values.annualWithdrawal || 0,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number' as const,
      value: 30,
      min: 18,
      max: 70,
      step: 1,
      suffix: ' years',
      tooltip: 'Your current age',
      required: true,
    },
    {
      id: 'retirementAge',
      label: 'Target Retirement Age',
      type: 'number' as const,
      value: 67,
      min: 40,
      max: 80,
      step: 1,
      suffix: ' years',
      tooltip: 'Age you plan to retire',
      required: true,
    },
    {
      id: 'currentSalary',
      label: 'Current Annual Salary',
      type: 'number' as const,
      value: 80000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your current annual income',
      required: true,
    },
    {
      id: 'currentSavings',
      label: 'Current Retirement Savings',
      type: 'number' as const,
      value: 25000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Current balance in retirement accounts',
      required: true,
    },
    {
      id: 'contributionRate',
      label: 'Contribution Rate',
      type: 'range' as const,
      value: 10,
      min: 0,
      max: 30,
      step: 0.5,
      suffix: '%',
      tooltip: 'Percentage of salary you contribute',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🏦 Retirement Calculator"
        description="Plan your retirement savings with 401k, IRA, and employer matching. See if you're on track for a comfortable retirement."
        icon="🏦"
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
                How to Use This Retirement Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Plan your retirement savings with 401k, IRA, and employer matching. See if you're on track for a comfortable retirement. Perfect for retirement planning, FIRE movement, and understanding the power of compound growth over time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Your Profile</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Current Age</strong> - Your age today</li>
                    <li>• <strong>Retirement Age</strong> - When to retire</li>
                    <li>• <strong>Annual Salary</strong> - Your income</li>
                    <li>• <strong>Current Savings</strong> - Retirement balance</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Contribution Rate</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Contribution Rate</strong> - % saved</li>
                    <li>• <strong>Employer Match</strong> - Free money!</li>
                    <li>• <strong>Salary Growth</strong> - Expected raises</li>
                    <li>• <strong>Return Rate</strong> - Investment growth</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Add Advanced Options</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Inflation Rate</strong> - Purchasing power</li>
                    <li>• <strong>Life Expectancy</strong> - Plan long enough</li>
                    <li>• <strong>Withdrawal Rate</strong> - 4% rule</li>
                    <li>• <strong>Post-Retirement Return</strong> - Safer investing</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review Your Plan</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Retirement Balance</strong> - Future value</li>
                    <li>• <strong>Monthly Income</strong> - Cash flow</li>
                    <li>• <strong>Savings Goal</strong> - Target amount</li>
                    <li>• <strong>Gap Analysis</strong> - On track?</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> The 4% Rule suggests you can withdraw 4% of your retirement savings annually for 30+ years. Our calculator shows you exactly how much you need to retire comfortably based on your lifestyle goals and current savings.
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Retirement Calculator?</strong> Our free retirement calculator helps you estimate your retirement savings growth, including employer matching, inflation, and investment returns. Whether you're planning for early retirement (FIRE) or a traditional retirement, our tool provides accurate calculations with detailed year-by-year projections. Compare different contribution rates, investment returns, and retirement ages to make informed decisions about your financial future.
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