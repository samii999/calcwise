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
        {/* SEO-Optimized Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">📊 Complete Loan Calculator Guide</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>🎯 How to Use:</strong> Enter your loan amount, select loan type, adjust interest rate and term. Toggle payment frequency (Monthly/Bi-Weekly/Weekly) to see how it affects your payments. Add origination fees to calculate True APR.</p>
            <p><strong>💡 Payment Frequency Impact:</strong> Bi-weekly payments can save thousands in interest and pay off loans faster. Weekly payments offer even greater savings for disciplined borrowers.</p>
            <p><strong>📈 True APR vs. Interest Rate:</strong> The True APR includes origination fees and other costs, giving you the real cost of borrowing. Always compare APRs, not just interest rates.</p>
            <p><strong>⚡ Extra Payments:</strong> Even small extra payments ($50-$100/month) can significantly reduce total interest and shorten your loan term by years.</p>
            <p><strong>🏦 Loan Types:</strong> Personal loans (11.5% avg), Home loans (8.5% avg), Car loans (9.5% avg), Education loans (8.0% avg). Rates vary by credit score and lender.</p>
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