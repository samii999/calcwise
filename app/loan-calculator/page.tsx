'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateLoan } from '@/lib/calculators/loan'
import { AdUnit } from '@/components/ui/AdUnit'

export default function LoanCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateLoan({
      loanAmount: values.loanAmount,
      interestRate: values.interestRate,
      loanTerm: values.loanTerm,
      extraPayment: values.extraPayment || 0,
      loanType: values.loanType || 'personal',
      originationFee: values.originationFee || 1,
      originationFeeType: values.originationFeeType || 'percent',
      paymentFrequency: values.paymentFrequency || 'monthly',
      repaymentType: values.repaymentType || 'standard',
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const loanInputs = useMemo(() => [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number' as const,
      value: 30000,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: '$',
      tooltip: 'Total amount you want to borrow',
      required: true,
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select' as const,
      value: 'personal',
      options: [
        { value: 'personal', label: '💰 Personal Loan' },
        { value: 'home', label: '🏠 Home Loan' },
        { value: 'car', label: '🚗 Car Loan' },
        { value: 'education', label: '🎓 Education Loan' },
        { value: 'custom', label: '⚙️ Custom Loan' },
      ],
      tooltip: 'Select loan type - interest rate auto-adjusts',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 8.5,
      min: 0,
      max: 30,
      step: 0.05,
      suffix: '%',
      tooltip: 'Annual interest rate. Auto-set based on loan type.',
      required: true,
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'range' as const,
      value: 3,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: ' years',
      tooltip: 'Length of the loan in years',
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
      tooltip: 'Extra amount to pay each month to save interest.',
      helpText: 'Even $50/month can save thousands!',
    },
    {
      id: 'originationFee',
      label: 'Origination Fee',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 10,
      step: 0.1,
      suffix: '%',
      tooltip: 'Processing fee charged by lender (optional)',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="💰 Loan Calculator"
        description="Calculate your monthly loan payments, total interest, and amortization schedule. Compare different loan types, payment frequencies, and see how extra payments help."
        icon="💰"
      >
        {/* 📖 How to Use Guide - SEO Optimized */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Loan Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate your monthly loan payments, estimate total interest, and explore payoff strategies with our comprehensive loan calculator. Perfect for personal loans, car loans, student loans, and any other type of borrowing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Loan Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Loan Amount</strong> - Total you want to borrow</li>
                    <li>• <strong>Loan Type</strong> - Personal, Car, Home, etc.</li>
                    <li>• <strong>Interest Rate</strong> - Annual rate (auto-set)</li>
                    <li>• <strong>Loan Term</strong> - Length in years</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Choose Payment Options</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Payment Frequency</strong> - Monthly/Bi-Weekly</li>
                    <li>• <strong>Repayment Type</strong> - Standard/Balloon</li>
                    <li>• <strong>Origination Fee</strong> - Processing costs</li>
                    <li>• <strong>Extra Payments</strong> - Pay more monthly</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Calculate & Compare</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Payment</strong> - Your obligation</li>
                    <li>• <strong>Total Interest</strong> - Cost of borrowing</li>
                    <li>• <strong>True APR</strong> - Real cost with fees</li>
                    <li>• <strong>Payoff Date</strong> - When you'll be debt-free</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Optimize Your Loan</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Extra Payments</strong> - Save thousands</li>
                    <li>• <strong>Bi-Weekly</strong> - Pay off faster</li>
                    <li>• <strong>Compare Types</strong> - Find best rate</li>
                    <li>• <strong>Amortization</strong> - Year-by-year view</li>
                  </ul>
                </div>
              </div>

              {/* SEO Content Section */}
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 text-lg">💡</span>
                    <p className="text-sm text-blue-800">
                      <strong>Pro Tip:</strong> Switching to <strong>bi-weekly payments</strong> can save you thousands in interest and pay off your loan years earlier. Our calculator shows you exactly how much you'll save!
                    </p>
                  </div>
                </div>
                
                <div className="p-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Why Use Our Loan Calculator?</strong> Our free loan calculator helps you estimate your monthly loan payments, including principal, interest, and fees. Whether you're taking a personal loan, car loan, or student loan, our tool provides accurate calculations with detailed amortization schedules. Compare different loan terms, interest rates, and payoff strategies to make informed financial decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={loanInputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showExtra={true}
              showCurrency={true}
              showAdvanced={true}
              showLoanTermButtons={true}
              showPaymentFrequency={true}
              showRepaymentType={true}
              showOriginationFee={true}
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