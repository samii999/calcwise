'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateInflation } from '@/lib/calculators/inflation'
import { AdUnit } from '@/components/ui/AdUnit'

export default function InflationCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateInflation({
      amount: values.amount,
      startYear: values.startYear,
      endYear: values.endYear,
      customRate: values.customRate || 3.2,
      mode: values.mode || 'historical',
      useCustomRate: values.useCustomRate || false,
      currency: values.currency || 'USD',
    })
    setResults(result)
  }, [])

  const currentYear = new Date().getFullYear()
  const startYears = Array.from({ length: 50 }, (_, i) => 1975 + i)
  const endYears = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i)

  const inputs = useMemo(() => [
    {
      id: 'amount',
      label: 'Starting Amount',
      type: 'number' as const,
      value: 10000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount of money you want to compare',
      required: true,
    },
    {
      id: 'mode',
      label: 'Mode',
      type: 'select' as const,
      value: 'historical',
      options: [
        { value: 'historical', label: 'Historical Inflation Impact' },
        { value: 'forward', label: 'Forward Projection' },
      ],
      tooltip: 'Choose between historical or forward projection',
    },
    {
      id: 'startYear',
      label: 'Start Year',
      type: 'select' as const,
      value: 2020,
      options: startYears.map((y) => ({ value: y.toString(), label: y.toString() })),
      tooltip: 'Starting year for the calculation',
    },
    {
      id: 'endYear',
      label: 'End Year',
      type: 'select' as const,
      value: currentYear,
      options: endYears.map((y) => ({ value: y.toString(), label: y.toString() })),
      tooltip: 'Ending year for the calculation',
    },
    {
      id: 'useCustomRate',
      label: 'Use Custom Rate',
      type: 'select' as const,
      value: false,
      options: [
        { value: 'false', label: 'Use Historical CPI Rates' },
        { value: 'true', label: 'Use Custom Annual Rate' },
      ],
      tooltip: 'Toggle between historical CPI or custom rate',
    },
    {
      id: 'customRate',
      label: 'Custom Annual Rate',
      type: 'range' as const,
      value: 3.2,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Custom annual inflation rate',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📉 Inflation Calculator"
        description="See how inflation affects the purchasing power of your money over time. Calculate the future value and real value of your savings."
        icon="📉"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-2xl p-6 border border-rose-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-rose-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Inflation Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                See how inflation affects the purchasing power of your money over time. Calculate the future value and real value of your savings. Perfect for retirement planning, investment analysis, and understanding the true cost of living increases.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Amount</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Starting Amount</strong> - Money to compare</li>
                    <li>• <strong>Currency</strong> - USD, GBP, CAD, AUD</li>
                    <li>• <strong>Start Year</strong> - When it starts</li>
                    <li>• <strong>End Year</strong> - When to compare</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Choose Mode</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Historical</strong> - Actual CPI data</li>
                    <li>• <strong>Forward</strong> - Future projection</li>
                    <li>• <strong>Custom Rate</strong> - Your own rate</li>
                    <li>• <strong>CPI Rate</strong> - Government data</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Select Years</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Start Year</strong> - Beginning period</li>
                    <li>• <strong>End Year</strong> - End period</li>
                    <li>• <strong>Years Difference</strong> - Time span</li>
                    <li>• <strong>Historical Data</strong> - CPI rates</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review Impact</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Future Value</strong> - Nominal growth</li>
                    <li>• <strong>Real Value</strong> - Purchasing power</li>
                    <li>• <strong>Loss</strong> - Value eroded</li>
                    <li>• <strong>Purchasing Power</strong> - % remaining</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-xl border border-rose-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 text-lg">💡</span>
                  <p className="text-sm text-rose-800">
                    <strong>Pro Tip:</strong> Inflation erodes purchasing power over time. For example, $10,000 in 2020 is worth about $7,900 today in real terms. Our calculator shows you exactly how much purchasing power you've lost (or will lose) due to inflation!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Inflation Calculator?</strong> Our free inflation calculator helps you understand the impact of inflation on your money over time, using either historical CPI data or custom inflation rates. Whether you're planning for retirement, analyzing investment returns, or budgeting for the future, our tool provides accurate calculations with detailed year-by-year breakdowns. Compare purchasing power across different time periods and make informed financial decisions.
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
              showModeToggle={true}
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