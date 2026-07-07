'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateCarLoan } from '@/lib/calculators/car-loan'
import { AdUnit } from '@/components/ui/AdUnit'

export default function CarLoanCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateCarLoan({
      vehiclePrice: values.vehiclePrice,
      downPayment: values.downPayment,
      downPaymentPercent: values.downPaymentPercent,
      tradeInValue: values.tradeInValue || 0,
      interestRate: values.interestRate,
      loanTerm: values.loanTerm,
      salesTax: values.salesTax || 0,
      registrationFees: values.registrationFees || 0,
      warrantyCost: values.warrantyCost || 0,
      warrantyRollIn: values.warrantyRollIn || false,
      extraPayment: values.extraPayment || 0,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'vehiclePrice',
      label: 'Vehicle Price',
      type: 'number' as const,
      value: 35000,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'Total price of the vehicle',
      required: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number' as const,
      value: 7000,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'Upfront payment you make',
      required: true,
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment %',
      type: 'number' as const,
      value: 20,
      min: 0,
      max: 100,
      step: 0.5,
      suffix: '%',
      tooltip: 'Percentage of vehicle price',
      required: true,
    },
    {
      id: 'tradeInValue',
      label: 'Trade-In Value',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'Value of your current vehicle if trading in',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 5.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual interest rate',
      required: true,
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'range' as const,
      value: 5,
      min: 1,
      max: 7,
      step: 0.5,
      suffix: ' years',
      tooltip: 'Length of the loan',
      required: true,
    },
    {
      id: 'salesTax',
      label: 'Sales Tax',
      type: 'number' as const,
      value: 7,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: '%',
      tooltip: 'Sales tax rate in your area',
    },
    {
      id: 'registrationFees',
      label: 'Registration Fees',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 5000,
      step: 50,
      prefix: '$',
      tooltip: 'Registration and documentation fees',
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
        title="🚗 Car Loan Calculator"
        description="Calculate your monthly car payments including sales tax, registration fees, and trade-in value. See total cost with amortization schedule."
        icon="🚗"
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
              showLoanTermButtons={true}
              showPaymentFrequency={true}
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