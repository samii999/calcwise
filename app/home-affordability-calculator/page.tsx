'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateHomeAffordability } from '@/lib/calculators/home-affordability'
import { AdUnit } from '@/components/ui/AdUnit'

export default function HomeAffordabilityCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateHomeAffordability({
      annualIncome: values.annualIncome,
      monthlyDebt: values.monthlyDebt || 0,
      downPayment: values.downPayment || 0,
      interestRate: values.interestRate,
      loanTerm: values.loanTerm || 30,
      propertyTaxRate: values.propertyTaxRate || 1.25,
      homeInsurance: values.homeInsurance || 1500,
      hoaDues: values.hoaDues || 0,
      maintenancePercent: values.maintenancePercent || 1,
      maxDtiRatio: values.maxDtiRatio || 36,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'annualIncome',
      label: 'Annual Income',
      type: 'number' as const,
      value: 100000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your total annual income before taxes',
      required: true,
    },
    {
      id: 'monthlyDebt',
      label: 'Monthly Debt Payments',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 100000,
      step: 50,
      prefix: '$',
      tooltip: 'Your current monthly debt payments',
    },
    {
      id: 'downPayment',
      label: 'Available Down Payment',
      type: 'number' as const,
      value: 80000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Cash you have for down payment',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Mortgage Interest Rate',
      type: 'range' as const,
      value: 6.8,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Current mortgage interest rate',
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
      id: 'maxDtiRatio',
      label: 'Max DTI Ratio',
      type: 'range' as const,
      value: 36,
      min: 20,
      max: 50,
      step: 1,
      suffix: '%',
      tooltip: 'Maximum Debt-to-Income ratio you want to consider',
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
        title="🏠 Home Affordability Calculator"
        description="Find out how much home you can afford based on your income, debts, and current interest rates. Get a realistic budget for your home search."
        icon="🏠"
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