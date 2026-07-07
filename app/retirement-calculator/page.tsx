'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateRetirement } from '@/lib/calculators/retirement'
import { AdUnit } from '@/components/ui/AdUnit'

export default function RetirementCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateRetirement({
      currentAge: values.currentAge,
      retirementAge: values.retirementAge,
      currentSalary: values.currentSalary,
      currentSavings: values.currentSavings,
      contributionRate: values.contributionRate,
      employerMatchRate: values.employerMatchRate || 0,
      employerMatchLimit: values.employerMatchLimit || 0,
      preRetirementReturn: values.preRetirementReturn || 8,
      postRetirementReturn: values.postRetirementReturn || 5,
      salaryGrowthRate: values.salaryGrowthRate || 2,
      lifeExpectancy: values.lifeExpectancy || 85,
      inflationRate: values.inflationRate || 2.5,
      annualWithdrawal: values.annualWithdrawal || 0,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number' as const,
      value: 30,
      min: 18,
      max: 70,
      step: 1,
      suffix: ' years',
      tooltip: 'Your current age',
      required: true,
    },
    {
      id: 'retirementAge',
      label: 'Target Retirement Age',
      type: 'number' as const,
      value: 67,
      min: 40,
      max: 80,
      step: 1,
      suffix: ' years',
      tooltip: 'Age you plan to retire',
      required: true,
    },
    {
      id: 'currentSalary',
      label: 'Current Annual Salary',
      type: 'number' as const,
      value: 80000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your current annual income',
      required: true,
    },
    {
      id: 'currentSavings',
      label: 'Current Retirement Savings',
      type: 'number' as const,
      value: 25000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Current balance in retirement accounts',
      required: true,
    },
    {
      id: 'contributionRate',
      label: 'Contribution Rate',
      type: 'range' as const,
      value: 10,
      min: 0,
      max: 30,
      step: 0.5,
      suffix: '%',
      tooltip: 'Percentage of salary you contribute',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🏦 Retirement Calculator"
        description="Plan your retirement savings with 401k, IRA, and employer matching. See if you're on track for a comfortable retirement."
        icon="🏦"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
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