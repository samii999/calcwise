'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateCreditCardPayoff } from '@/lib/calculators/credit-card'
import { AdUnit } from '@/components/ui/AdUnit'

export default function CreditCardPayoffCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateCreditCardPayoff({
      balance: values.balance,
      interestRate: values.interestRate,
      monthlyPayment: values.monthlyPayment,
      extraPayment: values.extraPayment || 0,
      paymentStrategy: values.paymentStrategy || 'fixed',
      minPaymentPercent: values.minPaymentPercent || 2.5,
      minPaymentFloor: values.minPaymentFloor || 25,
      targetPayoffMonths: values.targetPayoffMonths || 24,
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'balance',
      label: 'Current Balance',
      type: 'number' as const,
      value: 5000,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: '$',
      tooltip: 'Total credit card balance',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (APR)',
      type: 'range' as const,
      value: 21.99,
      min: 0,
      max: 40,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual percentage rate',
      required: true,
    },
    {
      id: 'paymentStrategy',
      label: 'Payment Strategy',
      type: 'select' as const,
      value: 'fixed',
      options: [
        { value: 'minimum', label: 'Minimum Payment Only' },
        { value: 'fixed', label: 'Fixed Monthly Amount' },
        { value: 'target-date', label: 'Payoff by Target Date' },
      ],
      tooltip: 'Choose your payment strategy',
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'number' as const,
      value: 200,
      min: 0,
      max: 100000,
      step: 10,
      prefix: '$',
      tooltip: 'Amount you pay each month',
      required: true,
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
      helpText: 'Pay extra to save interest and get debt-free faster!',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="💳 Credit Card Payoff Calculator"
        description="Find out how long it will take to pay off your credit card debt and how much interest you'll save by paying extra each month."
        icon="💳"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl p-6 border border-red-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Credit Card Payoff Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Find out how long it will take to pay off your credit card debt and how much interest you'll save by paying extra each month. Perfect for debt reduction, balance transfer planning, and achieving financial freedom.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Balance</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Current Balance</strong> - Total debt</li>
                    <li>• <strong>APR</strong> - Annual interest rate</li>
                    <li>• <strong>Payment Strategy</strong> - Fixed/Minimum/Target</li>
                    <li>• <strong>Monthly Payment</strong> - Your budget</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Choose Strategy</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Minimum Only</strong> - Slowest payoff</li>
                    <li>• <strong>Fixed Amount</strong> - Set monthly payment</li>
                    <li>• <strong>Target Date</strong> - Payoff by specific date</li>
                    <li>• <strong>Extra Payment</strong> - Accelerate payoff</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Impact</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Interest</strong> - Cost of debt</li>
                    <li>• <strong>Payoff Date</strong> - When debt-free</li>
                    <li>• <strong>Interest Saved</strong> - Extra payments</li>
                    <li>• <strong>Monthly Cash Flow</strong> - Payment impact</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Optimize Plan</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Increase Payment</strong> - Save more</li>
                    <li>• <strong>Balance Transfer</strong> - Lower rates</li>
                    <li>• <strong>Debt Avalanche</strong> - Highest rate first</li>
                    <li>• <strong>Debt Snowball</strong> - Smallest balance first</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl border border-red-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 text-lg">💡</span>
                  <p className="text-sm text-red-800">
                    <strong>Pro Tip:</strong> Paying just $50 extra per month can save you hundreds in interest and shorten your payoff time significantly. Our calculator shows you exactly how much you'll save with extra payments!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Credit Card Payoff Calculator?</strong> Our free credit card payoff calculator helps you estimate how long it will take to become debt-free, including interest charges and payment strategies. Whether you're using the debt snowball method, debt avalanche method, or just want to know your payoff date, our tool provides accurate calculations with detailed month-by-month amortization schedules. Compare different payment amounts, extra payments, and strategies to make informed debt reduction decisions.
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
              showExtra={true}
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