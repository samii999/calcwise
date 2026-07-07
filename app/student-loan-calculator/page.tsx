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