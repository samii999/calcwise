'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateRefinance } from '@/lib/calculators/refinance'
import { AdUnit } from '@/components/ui/AdUnit'

export default function RefinanceCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateRefinance({
      currentBalance: values.currentBalance,
      currentRate: values.currentRate,
      currentTerm: values.currentTerm || 30,
      currentPayment: values.currentPayment,
      yearsPaid: values.yearsPaid || 0,
      newRate: values.newRate,
      newTerm: values.newTerm || 30,
      closingCosts: values.closingCosts || 0,
      closingCostsType: values.closingCostsType || 'flat',
      extraPayment: values.extraPayment || 0,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'currentBalance',
      label: 'Current Loan Balance',
      type: 'number' as const,
      value: 250000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your current remaining loan balance',
      required: true,
    },
    {
      id: 'currentRate',
      label: 'Current Interest Rate',
      type: 'range' as const,
      value: 7.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Your current mortgage interest rate',
      required: true,
    },
    {
      id: 'currentPayment',
      label: 'Current Monthly Payment',
      type: 'number' as const,
      value: 1800,
      min: 0,
      max: 100000,
      step: 50,
      prefix: '$',
      tooltip: 'Your current monthly payment',
      required: true,
    },
    {
      id: 'yearsPaid',
      label: 'Years Already Paid',
      type: 'number' as const,
      value: 5,
      min: 0,
      max: 30,
      step: 1,
      suffix: ' years',
      tooltip: 'How many years you have already paid',
    },
    {
      id: 'newRate',
      label: 'New Interest Rate',
      type: 'range' as const,
      value: 5.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'The new interest rate you can get',
      required: true,
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'number' as const,
      value: 5000,
      min: 0,
      max: 50000,
      step: 100,
      prefix: '$',
      tooltip: 'Total closing costs for refinance',
    },
    {
      id: 'extraPayment',
      label: 'Extra Monthly Payment',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 10000,
      step: 50,
      prefix: '$',
      suffix: '/mo',
      tooltip: 'Extra amount to pay each month',
      helpText: 'Pay extra to save even more interest!',
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select' as const,
      value: 'US',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🔄 Refinance Calculator"
        description="Compare your current mortgage with a new refinance loan. See if refinancing saves you money and how long it takes to break even."
        icon="🔄"
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
                How to Use This Refinance Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Compare your current mortgage with a new refinance loan. See if refinancing saves you money and how long it takes to break even. Perfect for homeowners considering rate reductions, cash-out refinancing, or shortening their loan term.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Current Loan</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Balance</strong> - Remaining loan amount</li>
                    <li>• <strong>Rate</strong> - Current APR</li>
                    <li>• <strong>Payment</strong> - Monthly mortgage</li>
                    <li>• <strong>Years Paid</strong> - How long so far</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add New Loan Terms</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>New Rate</strong> - Offered APR</li>
                    <li>• <strong>New Term</strong> - 15/20/30 years</li>
                    <li>• <strong>Closing Costs</strong> - Refinance fees</li>
                    <li>• <strong>Extra Payment</strong> - Pay more monthly</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Compare & Analyze</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>New Payment</strong> - Updated monthly</li>
                    <li>• <strong>Monthly Savings</strong> - Cash flow</li>
                    <li>• <strong>Total Interest</strong> - Cost comparison</li>
                    <li>• <strong>Break Even</strong> - Payback period</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Decide & Save</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Verdict</strong> - Refinance or not</li>
                    <li>• <strong>Interest Saved</strong> - Lifetime savings</li>
                    <li>• <strong>Break Even</strong> - When it pays off</li>
                    <li>• <strong>Action Plan</strong> - Next steps</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> A good rule of thumb is to refinance if you can lower your rate by at least 1% and plan to stay in your home for at least 2-3 years. Our calculator shows you the exact break-even point - the time it takes for your monthly savings to cover the closing costs!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Refinance Calculator?</strong> Our free refinance calculator helps you compare your current mortgage with a new loan to determine if refinancing makes financial sense. Whether you're looking to lower your rate, shorten your term, or access home equity, our tool provides accurate calculations with detailed payment breakdowns and break-even analysis. Compare different rates, terms, and closing costs to make an informed decision about your mortgage refinance.
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
              showCountry={true}
              showExtra={true}
              showAdvanced={true}
              showLoanTermButtons={true}
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