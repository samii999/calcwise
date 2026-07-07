'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateCompoundInterest } from '@/lib/calculators/compound-interest'
import { AdUnit } from '@/components/ui/AdUnit'

export default function CompoundInterestCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateCompoundInterest({
      principal: values.principal,
      monthlyContribution: values.monthlyContribution || 0,
      annualRate: values.annualRate,
      years: values.years,
      compoundFrequency: values.compoundFrequency || 'monthly',
      contributionFrequency: values.contributionFrequency || 'monthly',
      contributionTiming: values.contributionTiming || 'beginning',
      inflationRate: values.inflationRate || 0,
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'principal',
      label: 'Initial Investment',
      type: 'number' as const,
      value: 10000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount you start with',
      required: true,
    },
    {
      id: 'monthlyContribution',
      label: 'Regular Contribution',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 1000000,
      step: 50,
      prefix: '$',
      tooltip: 'Amount you add regularly',
      helpText: 'Set to 0 if no regular contributions',
    },
    {
      id: 'annualRate',
      label: 'Estimated Annual Return',
      type: 'range' as const,
      value: 8,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: '%',
      tooltip: 'Expected average annual return on investment',
      required: true,
    },
    {
      id: 'years',
      label: 'Investment Horizon',
      type: 'range' as const,
      value: 20,
      min: 1,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'How long you want to invest',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📈 Compound Interest Calculator"
        description="See how your money grows with compound interest. Calculate future value with regular contributions, different compounding frequencies, and inflation adjustments."
        icon="📈"
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
              showContributionTiming={true}
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