'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateEmergencyFund } from '@/lib/calculators/emergency-fund'
import { AdUnit } from '@/components/ui/AdUnit'

export default function EmergencyFundCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateEmergencyFund({
      monthlyExpenses: values.monthlyExpenses,
      coverageMonths: values.coverageMonths || 6,
      currentSavings: values.currentSavings || 0,
      monthlyContribution: values.monthlyContribution || 0,
      targetMonths: values.targetMonths || 6,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'number' as const,
      value: 4000,
      min: 0,
      max: 100000,
      step: 100,
      prefix: '$',
      tooltip: 'Your total monthly living expenses',
      required: true,
    },
    {
      id: 'targetMonths',
      label: 'Target Coverage Months',
      type: 'select' as const,
      value: 6,
      options: [
        { value: 3, label: '3 Months' },
        { value: 6, label: '6 Months (Recommended)' },
        { value: 9, label: '9 Months' },
        { value: 12, label: '12 Months (Conservative)' },
      ],
      tooltip: 'How many months of expenses you want to save',
    },
    {
      id: 'currentSavings',
      label: 'Current Emergency Cash',
      type: 'number' as const,
      value: 1000,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: '$',
      tooltip: 'Current emergency fund balance',
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number' as const,
      value: 300,
      min: 0,
      max: 100000,
      step: 50,
      prefix: '$',
      tooltip: 'Amount you can save each month',
      helpText: 'Even $100/month adds up over time!',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🛡️ Emergency Fund Calculator"
        description="Calculate how much you need for a secure emergency fund (3-12 months of expenses). Track your progress and see how long to reach your goal."
        icon="🛡️"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs as any} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
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