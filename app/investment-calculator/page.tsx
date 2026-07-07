'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateInvestment } from '@/lib/calculators/investment'
import { AdUnit } from '@/components/ui/AdUnit'

export default function InvestmentCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateInvestment({
      initialCapital: values.initialCapital,
      endValue: values.endValue,
      investmentYears: values.investmentYears,
      investmentMonths: values.investmentMonths || 0,
      maintenanceFees: values.maintenanceFees || 0,
      upfrontFees: values.upfrontFees || 0,
      outgoingFees: values.outgoingFees || 0,
      dividends: values.dividends || 0,
      dividendYield: values.dividendYield || 0,
      reinvestDividends: values.reinvestDividends || false,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'initialCapital',
      label: 'Initial Capital',
      type: 'number' as const,
      value: 20000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount you start with',
      required: true,
    },
    {
      id: 'endValue',
      label: 'End Value / Current Value',
      type: 'number' as const,
      value: 35000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Current or selling value of investment',
      required: true,
    },
    {
      id: 'investmentYears',
      label: 'Investment Years',
      type: 'number' as const,
      value: 5,
      min: 0,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'Number of years held',
      required: true,
    },
    {
      id: 'investmentMonths',
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
      id: 'dividendYield',
      label: 'Dividend Yield',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 20,
      step: 0.5,
      suffix: '%',
      tooltip: 'Annual dividend yield percentage',
    },
    {
      id: 'maintenanceFees',
      label: 'Annual Maintenance Fees',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 50,
      prefix: '$',
      suffix: '/yr',
      tooltip: 'Ongoing annual fees',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📊 Investment Return Calculator"
        description="Calculate your investment ROI, CAGR, and benchmark against market indices. See how fees and dividends affect your returns."
        icon="📊"
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