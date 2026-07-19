'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateStudentLoan } from '@/lib/calculators/student-loan'
import { AdUnit } from '@/components/ui/AdUnit'

export default function StudentLoanCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateStudentLoan({
      loanBalance: values.loanBalance,
      interestRate: values.interestRate,
      loanTerm: values.loanTerm,
      extraPayment: values.extraPayment || 0,
      defermentMonths: values.defermentMonths || 0,
      defermentAccrues: values.defermentAccrues || true,
      repaymentType: values.repaymentType || 'standard',
      annualIncome: values.annualIncome || 0,
      incomeGrowthRate: values.incomeGrowthRate || 3,
      familySize: values.familySize || 1,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'loanBalance',
      label: 'Loan Balance',
      type: 'number' as const,
      value: 40000,
      min: 0,
      max: 500000,
      step: 100,
      prefix: '$',
      tooltip: 'Your total student loan balance',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 6.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual interest rate',
      required: true,
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'range' as const,
      value: 10,
      min: 1,
      max: 30,
      step: 1,
      suffix: ' years',
      tooltip: 'Length of the loan',
      required: true,
    },
    {
      id: 'repaymentType',
      label: 'Repayment Type',
      type: 'select' as const,
      value: 'standard',
      options: [
        { value: 'standard', label: 'Standard (Fixed)' },
        { value: 'income-driven', label: 'Income-Driven (IDR)' },
      ],
      tooltip: 'Choose your repayment plan',
    },
    {
      id: 'defermentMonths',
      label: 'Deferment Period',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 36,
      step: 1,
      suffix: ' months',
      tooltip: 'Grace/deferment period after graduation',
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
      helpText: 'Even $50/month saves thousands in interest!',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🎓 Student Loan Calculator"
        description="Plan your student loan repayment with Standard and Income-Driven plans. See how extra payments save you money and time."
        icon="🎓"
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
                How to Use This Student Loan Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Plan your student loan repayment with Standard and Income-Driven plans. See how extra payments save you money and time. Perfect for federal loans, private loans, and student debt consolidation planning.
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
                    <li>• <strong>Loan Balance</strong> - Total student debt</li>
                    <li>• <strong>Interest Rate</strong> - APR on the loan</li>
                    <li>• <strong>Loan Term</strong> - Years to repay</li>
                    <li>• <strong>Repayment Type</strong> - Standard/Income-Driven</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Repayment Options</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Deferment Period</strong> - Grace months</li>
                    <li>• <strong>Extra Payment</strong> - Pay more monthly</li>
                    <li>• <strong>Income Details</strong> - For IDR plans</li>
                    <li>• <strong>Family Size</strong> - IDR calculation</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Compare Plans</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Standard Plan</strong> - Fixed 10-year</li>
                    <li>• <strong>Income-Driven</strong> - % of income</li>
                    <li>• <strong>Interest Cost</strong> - Total paid</li>
                    <li>• <strong>Monthly Payment</strong> - Your obligation</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review & Save</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Interest</strong> - Cost of debt</li>
                    <li>• <strong>Payoff Date</strong> - When debt-free</li>
                    <li>• <strong>Interest Saved</strong> - Extra payments</li>
                    <li>• <strong>Forgiveness</strong> - IDR forgiveness</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Income-Driven Repayment (IDR) plans cap your monthly payment at 10-20% of your discretionary income and offer forgiveness after 20-25 years. However, you'll pay more interest over time. Our calculator compares both plans so you can choose the best option for your financial situation!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Student Loan Calculator?</strong> Our free student loan calculator helps you estimate your monthly payments, total interest, and payoff date for both Standard and Income-Driven repayment plans. Whether you have federal or private student loans, our tool provides accurate calculations with detailed amortization schedules. Compare different repayment strategies, extra payments, and loan terms to make informed decisions about your student loan debt.
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