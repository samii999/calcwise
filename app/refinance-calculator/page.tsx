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