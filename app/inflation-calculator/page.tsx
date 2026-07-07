'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateInflation } from '@/lib/calculators/inflation'
import { AdUnit } from '@/components/ui/AdUnit'

export default function InflationCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateInflation({
      amount: values.amount,
      startYear: values.startYear,
      endYear: values.endYear,
      customRate: values.customRate || 3.2,
      mode: values.mode || 'historical',
      useCustomRate: values.useCustomRate || false,
      currency: values.currency || 'USD',
    })
    setResults(result)
  }, [])

  const currentYear = new Date().getFullYear()
  const startYears = Array.from({ length: 50 }, (_, i) => 1975 + i)
  const endYears = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i)

  const inputs = useMemo(() => [
    {
      id: 'amount',
      label: 'Starting Amount',
      type: 'number' as const,
      value: 10000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount of money you want to compare',
      required: true,
    },
    {
      id: 'mode',
      label: 'Mode',
      type: 'select' as const,
      value: 'historical',
      options: [
        { value: 'historical', label: 'Historical Inflation Impact' },
        { value: 'forward', label: 'Forward Projection' },
      ],
      tooltip: 'Choose between historical or forward projection',
    },
    {
      id: 'startYear',
      label: 'Start Year',
      type: 'select' as const,
      value: 2020,
      options: startYears.map((y) => ({ value: y.toString(), label: y.toString() })),
      tooltip: 'Starting year for the calculation',
    },
    {
      id: 'endYear',
      label: 'End Year',
      type: 'select' as const,
      value: currentYear,
      options: endYears.map((y) => ({ value: y.toString(), label: y.toString() })),
      tooltip: 'Ending year for the calculation',
    },
    {
      id: 'useCustomRate',
      label: 'Use Custom Rate',
      type: 'select' as const,
      value: false,
      options: [
        { value: 'false', label: 'Use Historical CPI Rates' },
        { value: 'true', label: 'Use Custom Annual Rate' },
      ],
      tooltip: 'Toggle between historical CPI or custom rate',
    },
    {
      id: 'customRate',
      label: 'Custom Annual Rate',
      type: 'range' as const,
      value: 3.2,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Custom annual inflation rate',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📉 Inflation Calculator"
        description="See how inflation affects the purchasing power of your money over time. Calculate the future value and real value of your savings."
        icon="📉"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
              showAdvanced={true}
              showModeToggle={true}
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