'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateAmortization } from '@/lib/calculators/amortization'
import { AdUnit } from '@/components/ui/AdUnit'

export default function AmortizationCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateAmortization({
      principal: values.principal,
      interestRate: values.interestRate,
      loanTermYears: values.loanTermYears,
      loanTermMonths: values.loanTermMonths || 0,
      startDate: values.startDate || new Date().toISOString().split('T')[0],
      paymentFrequency: values.paymentFrequency || 'monthly',
      extraMonthly: values.extraMonthly || 0,
      extraAnnual: values.extraAnnual || 0,
      extraAnnualMonth: values.extraAnnualMonth || 1,
      extraLumpSum: values.extraLumpSum || 0,
      extraLumpSumPeriod: values.extraLumpSumPeriod || 0,
    })
    setResults(result)
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const inputs = useMemo(() => [
    {
      id: 'principal',
      label: 'Principal Amount',
      type: 'number' as const,
      value: 200000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Total loan amount',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 7,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual interest rate',
      required: true,
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number' as const,
      value: 30,
      min: 0,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'Length of the loan in years',
      required: true,
    },
    {
      id: 'loanTermMonths',
      label: 'Additional Months',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 11,
      step: 1,
      suffix: ' months',
      tooltip: 'Additional months beyond full years',
    },
    {
      id: 'startDate',
      label: 'Start Date',
      type: 'text' as const,
      value: today,
      tooltip: 'When the loan starts',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📋 Amortization Calculator"
        description="Generate a complete amortization schedule with principal and interest breakdown. See how extra payments affect your loan payoff."
        icon="📋"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-6 border border-teal-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-teal-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Amortization Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate a complete amortization schedule with principal and interest breakdown. See how extra payments affect your loan payoff. Perfect for mortgages, auto loans, personal loans, and any other fixed-rate loan.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Loan Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Principal Amount</strong> - Total loan amount</li>
                    <li>• <strong>Interest Rate</strong> - APR</li>
                    <li>• <strong>Loan Term</strong> - Years to repay</li>
                    <li>• <strong>Start Date</strong> - When loan begins</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Payment Options</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Payment Frequency</strong> - Monthly/Bi-Weekly</li>
                    <li>• <strong>Extra Monthly</strong> - Pay more each month</li>
                    <li>• <strong>Extra Annual</strong> - Yearly bonus payment</li>
                    <li>• <strong>Lump Sum</strong> - One-time payment</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Schedule</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Payment</strong> - Your obligation</li>
                    <li>• <strong>Amortization Schedule</strong> - Year-by-year</li>
                    <li>• <strong>Interest Breakdown</strong> - Cost of loan</li>
                    <li>• <strong>Balance Over Time</strong> - Track progress</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Save & Compare</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Interest</strong> - Full cost</li>
                    <li>• <strong>Payoff Date</strong> - When debt-free</li>
                    <li>• <strong>Interest Saved</strong> - Extra payments</li>
                    <li>• <strong>Export Schedule</strong> - Download CSV</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-teal-500 text-lg">💡</span>
                  <p className="text-sm text-teal-800">
                    <strong>Pro Tip:</strong> Even a $100 monthly extra payment can save you thousands in interest and shorten your loan by years. Try adding extra payments in our calculator to see the impact! For a $200,000 loan at 7%, $100 extra saves ~$28,000 in interest and pays off 2.5 years early!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Amortization Calculator?</strong> Our free amortization calculator helps you generate a complete loan amortization schedule with principal and interest breakdowns for any fixed-rate loan. Whether you're planning a mortgage, auto loan, or personal loan, our tool provides accurate calculations with detailed year-by-year and month-by-month schedules. Compare different loan terms, interest rates, and extra payment strategies to make informed borrowing decisions and save thousands in interest.
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
              showPaymentFrequency={true}
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