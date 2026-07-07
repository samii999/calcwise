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