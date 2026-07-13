'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateCompoundInterest } from '@/lib/calculators/compound-interest'
import { AdUnit } from '@/components/ui/AdUnit'

export default function CompoundInterestCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateCompoundInterest({
      principal: values.principal,
      monthlyContribution: values.monthlyContribution || 0,
      annualRate: values.annualRate,
      years: values.years,
      compoundFrequency: values.compoundFrequency || 'monthly',
      contributionFrequency: values.contributionFrequency || 'monthly',
      contributionTiming: values.contributionTiming || 'beginning',
      inflationRate: values.inflationRate || 0,
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'principal',
      label: 'Initial Investment',
      type: 'number' as const,
      value: 10000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount you start with',
      required: true,
    },
    {
      id: 'monthlyContribution',
      label: 'Regular Contribution',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 1000000,
      step: 50,
      prefix: '$',
      tooltip: 'Amount you add regularly',
      helpText: 'Set to 0 if no regular contributions',
    },
    {
      id: 'annualRate',
      label: 'Estimated Annual Return',
      type: 'range' as const,
      value: 8,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: '%',
      tooltip: 'Expected average annual return on investment',
      required: true,
    },
    {
      id: 'years',
      label: 'Investment Horizon',
      type: 'range' as const,
      value: 20,
      min: 1,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'How long you want to invest',
      required: true,
    },
    {
      id: 'inflationRate',
      label: 'Annual Inflation Rate',
      type: 'range' as const,
      value: 0,
      min: 0,
      max: 10,
      step: 0.1,
      suffix: '%',
      tooltip: 'Expected annual inflation rate to calculate real purchasing power',
      helpText: 'Set to 0% to see nominal value only',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📈 Compound Interest Calculator"
        description="See how your money grows with compound interest. Calculate future value with regular contributions, different compounding frequencies, and inflation adjustments."
        icon="📈"
      >
        {/* 📖 How to Use Guide - SEO Optimized */}
        <div className="mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border border-green-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Compound Interest Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate your investment growth with compound interest, regular contributions, and inflation adjustments. Perfect for retirement planning, savings goals, and understanding the power of compound growth over time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Investment Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Initial Investment</strong> - Starting amount</li>
                    <li>• <strong>Regular Contribution</strong> - Add periodically</li>
                    <li>• <strong>Annual Return</strong> - Expected growth rate</li>
                    <li>• <strong>Investment Horizon</strong> - Time period</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Frequency Options</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Contribution Frequency</strong> - Weekly to Annually</li>
                    <li>• <strong>Compounding Frequency</strong> - Daily to Annually</li>
                    <li>• <strong>Contribution Timing</strong> - Beginning/End</li>
                    <li>• <strong>Inflation Rate</strong> - Real purchasing power</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">View Your Growth</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Balance</strong> - Final investment value</li>
                    <li>• <strong>Total Contributions</strong> - Amount deposited</li>
                    <li>• <strong>Interest Earned</strong> - Growth from compounding</li>
                    <li>• <strong>Real Value</strong> - Inflation-adjusted</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Optimize Returns</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Weekly Contributions</strong> - Maximize growth</li>
                    <li>• <strong>Daily Compounding</strong> - Faster growth</li>
                    <li>• <strong>Beginning Timing</strong> - Extra compounding</li>
                    <li>• <strong>Inflation Impact</strong> - Real purchasing power</li>
                  </ul>
                </div>
              </div>

              {/* SEO Content Section */}
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/50">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">💡</span>
                    <p className="text-sm text-green-800">
                      <strong>Pro Tip:</strong> <strong>Weekly contributions</strong> with <strong>daily compounding</strong> can significantly boost your returns compared to monthly contributions. Our calculator shows you exactly how different frequencies affect your growth!
                    </p>
                  </div>
                </div>
                
                <div className="p-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Why Use Our Compound Interest Calculator?</strong> Our free compound interest calculator helps you estimate your investment growth with regular contributions and different compounding frequencies. Whether you're planning for retirement, saving for a goal, or understanding the power of compound growth, our tool provides accurate calculations with detailed year-by-year breakdowns. Compare different contribution frequencies, compounding periods, and inflation scenarios to make informed investment decisions.
                  </p>
                </div>
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
              showContributionTiming={true}
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