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
      hasBalanceTransfer: values.hasBalanceTransfer === 'yes',
      transferAPR: values.transferAPR || 0,
      transferPeriod: values.transferPeriod || 12,
      transferFee: values.transferFee || 3,
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
      tooltip: 'Total credit card balance you owe',
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
      tooltip: 'Annual percentage rate on your card',
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
      tooltip: 'Choose how you want to pay off your debt',
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
      tooltip: 'Amount you pay each month (for fixed strategy)',
      required: true,
    },
    {
      id: 'minPaymentPercent',
      label: 'Minimum Payment %',
      type: 'number' as const,
      value: 2.5,
      min: 1,
      max: 10,
      step: 0.1,
      suffix: '%',
      tooltip: 'Percentage of balance required as minimum payment',
      helpText: 'Typically 2-3% of balance',
    },
    {
      id: 'minPaymentFloor',
      label: 'Minimum Payment Floor',
      type: 'number' as const,
      value: 25,
      min: 10,
      max: 100,
      step: 5,
      prefix: '$',
      tooltip: 'Absolute minimum payment required',
      helpText: 'Usually $25-$35',
    },
    {
      id: 'targetPayoffMonths',
      label: 'Target Payoff Time',
      type: 'number' as const,
      value: 24,
      min: 1,
      max: 120,
      step: 1,
      suffix: ' months',
      tooltip: 'How many months to pay off debt (for target-date strategy)',
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
      tooltip: 'Additional amount to pay each month',
      helpText: 'Pay extra to save thousands in interest!',
    },
    {
      id: 'hasBalanceTransfer',
      label: 'Consider Balance Transfer?',
      type: 'select' as const,
      value: 'no',
      options: [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes - Calculate Savings' },
      ],
      tooltip: 'See if a balance transfer card could save you money',
    },
    {
      id: 'transferAPR',
      label: 'Balance Transfer APR',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Promotional APR on balance transfer card',
      helpText: 'Usually 0% for 12-18 months',
    },
    {
      id: 'transferPeriod',
      label: 'Promotional Period',
      type: 'number' as const,
      value: 12,
      min: 6,
      max: 24,
      step: 1,
      suffix: ' months',
      tooltip: 'Length of promotional APR period',
    },
    {
      id: 'transferFee',
      label: 'Balance Transfer Fee',
      type: 'number' as const,
      value: 3,
      min: 0,
      max: 5,
      step: 0.5,
      suffix: '%',
      tooltip: 'Fee charged for balance transfer (usually 3-5%)',
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
                    <li>• <strong>Current Balance</strong> - Total debt owed</li>
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
                    <h4 className="font-medium text-gray-800">Customize Payment</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Minimum %</strong> - Usually 2-3% of balance</li>
                    <li>• <strong>Minimum Floor</strong> - Usually $25-$35</li>
                    <li>• <strong>Target Time</strong> - Months to payoff</li>
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
                    <li>• <strong>Recommended</strong> - Optimal payment</li>
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
                    <li>• <strong>Balance Transfer</strong> - 0% APR options</li>
                    <li>• <strong>Transfer Fee</strong> - Usually 3-5%</li>
                    <li>• <strong>Promo Period</strong> - 12-18 months</li>
                    <li>• <strong>Savings</strong> - See potential savings</li>
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

        {/* ===== CREDIT CARD SPECIFIC INFO ===== */}
        {results && (
          <div className="mt-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Credit Card Payoff Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2">🎯 Debt Avalanche</h4>
                <p className="text-xs text-gray-600">Pay highest APR cards first. Saves the most money in interest.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2">❄️ Debt Snowball</h4>
                <p className="text-xs text-gray-600">Pay smallest balances first. Builds motivation and momentum.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2">💳 Balance Transfer</h4>
                <p className="text-xs text-gray-600">Move debt to 0% APR card. Watch for transfer fees (3-5%).</p>
              </div>
            </div>
          </div>
        )}
      </CalculatorLayout>

      <div className="container mx-auto px-4 mt-8">
        <AdUnit format="horizontal" slot="banner-ad-slot" />
      </div>
    </>
  )
}