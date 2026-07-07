'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateSimpleInterest } from '@/lib/calculators/simple-interest'
import { AdUnit } from '@/components/ui/AdUnit'

export default function SimpleInterestCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateSimpleInterest({
      principal: values.principal,
      rate: values.rate,
      timeValue: values.timeValue,
      timeUnit: values.timeUnit || 'years',
      taxRate: values.taxRate || 0,
      maintenanceFees: values.maintenanceFees || 0,
      feeFrequency: values.feeFrequency || 'yearly',
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'principal',
      label: 'Principal Amount',
      type: 'number' as const,
      value: 10000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Initial amount of money',
      required: true,
    },
    {
      id: 'rate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 6,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual interest rate',
      required: true,
    },
    {
      id: 'timeValue',
      label: 'Time Period',
      type: 'number' as const,
      value: 5,
      min: 0,
      max: 50,
      step: 1,
      tooltip: 'Length of the time period',
      required: true,
    },
    {
      id: 'timeUnit',
      label: 'Time Unit',
      type: 'select' as const,
      value: 'years',
      options: [
        { value: 'years', label: 'Years' },
        { value: 'months', label: 'Months' },
        { value: 'days', label: 'Days' },
      ],
      tooltip: 'Unit for the time period',
    },
    {
      id: 'taxRate',
      label: 'Tax Rate on Interest',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 50,
      step: 0.5,
      suffix: '%',
      tooltip: 'Income tax rate on interest earned',
    },
    {
      id: 'maintenanceFees',
      label: 'Maintenance Fees',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 10,
      prefix: '$',
      tooltip: 'Periodic maintenance fees',
    },
    {
      id: 'feeFrequency',
      label: 'Fee Frequency',
      type: 'select' as const,
      value: 'yearly',
      options: [
        { value: 'yearly', label: 'Yearly' },
        { value: 'monthly', label: 'Monthly' },
      ],
      tooltip: 'How often fees are charged',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🧮 Simple Interest Calculator"
        description="Calculate simple interest on your investment or loan. See how interest grows over time with tax and fee adjustments."
        icon="🧮"
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