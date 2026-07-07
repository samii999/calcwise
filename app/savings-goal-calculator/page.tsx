'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateSavingsGoal } from '@/lib/calculators/savings-goal'
import { AdUnit } from '@/components/ui/AdUnit'

export default function SavingsGoalCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateSavingsGoal({
      targetAmount: values.targetAmount,
      currentSavings: values.currentSavings || 0,
      monthlyContribution: values.monthlyContribution || 0,
      annualRate: values.annualRate,
      years: values.years,
      contributionFrequency: values.contributionFrequency || 'monthly',
      compoundFrequency: values.compoundFrequency || 'monthly',
      strategy: values.strategy || 'calculate-contribution',
      targetTimeframeYears: values.targetTimeframeYears || 3,
      targetTimeframeMonths: values.targetTimeframeMonths || 0,
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'targetAmount',
      label: 'Savings Goal',
      type: 'number' as const,
      value: 50000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your target savings amount',
      required: true,
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'number' as const,
      value: 5000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount you have already saved',
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 1000000,
      step: 50,
      prefix: '$',
      tooltip: 'Amount you can save each month',
    },
    {
      id: 'annualRate',
      label: 'Expected Annual Return',
      type: 'range' as const,
      value: 4.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'Expected average annual return on savings',
      required: true,
    },
    {
      id: 'years',
      label: 'Time to Reach Goal',
      type: 'range' as const,
      value: 5,
      min: 1,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'How many years you have to save',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🎯 Savings Goal Calculator"
        description="See how long it takes to reach your savings goal. Calculate required monthly contributions and track your progress."
        icon="🎯"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
              showAdvanced={true}
              showContributionFrequency={true}
              showCompoundingFrequency={true}
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