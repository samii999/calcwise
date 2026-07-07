'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateRentVsBuy } from '@/lib/calculators/rent-vs-buy'
import { AdUnit } from '@/components/ui/AdUnit'

export default function RentVsBuyCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateRentVsBuy({
      homePrice: values.homePrice,
      downPaymentPercent: values.downPaymentPercent || 20,
      mortgageRate: values.mortgageRate,
      loanTerm: values.loanTerm || 30,
      monthlyRent: values.monthlyRent,
      rentIncreaseRate: values.rentIncreaseRate || 3,
      propertyTaxRate: values.propertyTaxRate || 1.25,
      homeInsurance: values.homeInsurance || 1500,
      maintenancePercent: values.maintenancePercent || 1,
      closingCostsPercent: values.closingCostsPercent || 3,
      sellingCostsPercent: values.sellingCostsPercent || 6,
      homeAppreciationRate: values.homeAppreciationRate || 4,
      investmentReturn: values.investmentReturn || 8,
      comparisonYears: values.comparisonYears || 10,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'number' as const,
      value: 400000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Purchase price of the home',
      required: true,
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment %',
      type: 'number' as const,
      value: 20,
      min: 0,
      max: 100,
      step: 1,
      suffix: '%',
      tooltip: 'Percentage of home price as down payment',
    },
    {
      id: 'mortgageRate',
      label: 'Mortgage Rate',
      type: 'range' as const,
      value: 6.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual mortgage interest rate',
      required: true,
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'range' as const,
      value: 30,
      min: 5,
      max: 40,
      step: 1,
      suffix: ' years',
      tooltip: 'Length of the mortgage',
    },
    {
      id: 'monthlyRent',
      label: 'Monthly Rent',
      type: 'number' as const,
      value: 2000,
      min: 0,
      max: 50000,
      step: 100,
      prefix: '$',
      tooltip: 'Current monthly rent',
      required: true,
    },
    {
      id: 'comparisonYears',
      label: 'Years to Compare',
      type: 'range' as const,
      value: 10,
      min: 1,
      max: 30,
      step: 1,
      suffix: ' years',
      tooltip: 'How many years to compare',
      required: true,
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
        title="🏘️ Rent vs Buy Calculator"
        description="Compare renting versus buying a home. See which option saves you more money over time with all costs included."
        icon="🏘️"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
              showCountry={true}
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