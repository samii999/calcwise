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