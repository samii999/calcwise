'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateSimpleInterest } from '@/lib/calculators/simple-interest'
import { AdUnit } from '@/components/ui/AdUnit'

export default function SimpleInterestCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateSimpleInterest({
      principal: values.principal,
      rate: values.rate,
      timeValue: values.timeValue,
      timeUnit: values.timeUnit || 'years',
      taxRate: values.taxRate || 0,
      maintenanceFees: values.maintenanceFees || 0,
      feeFrequency: values.feeFrequency || 'yearly',
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'principal',
      label: 'Principal Amount',
      type: 'number' as const,
      value: 10000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Initial amount of money',
      required: true,
    },
    {
      id: 'rate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 6,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual interest rate',
      required: true,
    },
    {
      id: 'timeValue',
      label: 'Time Period',
      type: 'number' as const,
      value: 5,
      min: 0,
      max: 50,
      step: 1,
      tooltip: 'Length of the time period',
      required: true,
    },
    {
      id: 'timeUnit',
      label: 'Time Unit',
      type: 'select' as const,
      value: 'years',
      options: [
        { value: 'years', label: 'Years' },
        { value: 'months', label: 'Months' },
        { value: 'days', label: 'Days' },
      ],
      tooltip: 'Unit for the time period',
    },
    {
      id: 'taxRate',
      label: 'Tax Rate on Interest',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 50,
      step: 0.5,
      suffix: '%',
      tooltip: 'Income tax rate on interest earned',
    },
    {
      id: 'maintenanceFees',
      label: 'Maintenance Fees',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 10,
      prefix: '$',
      tooltip: 'Periodic maintenance fees',
    },
    {
      id: 'feeFrequency',
      label: 'Fee Frequency',
      type: 'select' as const,
      value: 'yearly',
      options: [
        { value: 'yearly', label: 'Yearly' },
        { value: 'monthly', label: 'Monthly' },
      ],
      tooltip: 'How often fees are charged',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🧮 Simple Interest Calculator"
        description="Calculate simple interest on your investment or loan. See how interest grows over time with tax and fee adjustments."
        icon="🧮"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Simple Interest Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate simple interest on your investment or loan. See how interest grows over time with tax and fee adjustments. Perfect for savings accounts, bonds, short-term loans, and understanding basic interest concepts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Investment</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Principal</strong> - Initial amount</li>
                    <li>• <strong>Interest Rate</strong> - Annual rate</li>
                    <li>• <strong>Time Period</strong> - Duration</li>
                    <li>• <strong>Time Unit</strong> - Years/Months/Days</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Adjustments</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Tax Rate</strong> - Interest tax</li>
                    <li>• <strong>Maintenance Fees</strong> - Account costs</li>
                    <li>• <strong>Fee Frequency</strong> - Yearly/Monthly</li>
                    <li>• <strong>Country</strong> - Tax reference</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Returns</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Interest Earned</strong> - Simple interest</li>
                    <li>• <strong>Total Amount</strong> - Principal + Interest</li>
                    <li>• <strong>Net Profit</strong> - After taxes/fees</li>
                    <li>• <strong>Growth</strong> - Year-by-year</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Compare Scenarios</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Compound vs Simple</strong> - Compare</li>
                    <li>• <strong>Different Rates</strong> - Change rate</li>
                    <li>• <strong>Time Impact</strong> - Longer vs shorter</li>
                    <li>• <strong>Tax Impact</strong> - After-tax return</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Simple interest only grows on the principal amount, not on accumulated interest. For long-term investments, compound interest typically yields higher returns. Use our Compound Interest Calculator to see the difference!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Simple Interest Calculator?</strong> Our free simple interest calculator helps you calculate interest on your investment or loan using the formula I = P × R × T. Whether you're comparing savings accounts, analyzing bond returns, or planning short-term loans, our tool provides accurate calculations with detailed year-by-year breakdowns. Adjust for taxes, maintenance fees, and different time periods to make informed financial decisions.
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