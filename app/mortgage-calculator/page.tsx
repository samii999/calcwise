'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateMortgage } from '@/lib/calculators/mortgage'
import { AdUnit } from '@/components/ui/AdUnit'
import { COUNTRIES } from '@/data/countries'

export default function MortgageCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR' | 'INR' | 'PKR'>('USD')
  const [isBiWeekly, setIsBiWeekly] = useState(false)
  const [oneTimePayments, setOneTimePayments] = useState<{ year: number; amount: number }[]>([])
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    
    const otpInput = values.oneTimePayments || ''
    let parsedOTP: { year: number; amount: number }[] = []
    if (otpInput) {
      try {
        const lines = otpInput.split('\n').filter((line: string) => line.trim())
        parsedOTP = lines.map((line: string) => {
          const parts = line.split(',').map((p: string) => p.trim())
          return {
            year: parseInt(parts[0]) || 1,
            amount: parseFloat(parts[1]) || 0,
          }
        }).filter((otp: any) => otp.amount > 0)
      } catch (e) {
        console.error('Error parsing one-time payments:', e)
      }
    }

    const result = calculateMortgage({
      homePrice: values.homePrice,
      downPayment: values.downPayment,
      downPaymentPercent: values.downPaymentPercent,
      loanTerm: values.loanTerm,
      interestRate: values.interestRate,
      propertyTax: values.propertyTax || 0,
      homeInsurance: values.homeInsurance || 0,
      hoaDues: values.hoaDues || 0,
      pmi: values.pmi || 0,
      extraPayment: values.extraPayment || 0,
      country: values.country || 'US',
      isBiWeekly: isBiWeekly,
      oneTimePayments: parsedOTP,
    })
    setResults(result)
  }, [isBiWeekly])

  const handleBiWeeklyToggle = useCallback((value: boolean) => {
    setIsBiWeekly(value)
  }, [])

  // ✅ Add country field back to inputs
  const mortgageInputs = useMemo(() => [
    {
      id: 'country',
      label: 'Country',
      type: 'select' as const,
      value: 'US',
      options: COUNTRIES.map((c) => ({ 
        value: c.value, 
        label: `${c.flag} ${c.label} (${c.taxRate}% avg tax)` 
      })),
      tooltip: 'Select your country for property tax rate',
      required: true,
    },
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'number' as const,
      value: 450000,
      min: 10000,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Total purchase price of the home',
      required: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number' as const,
      value: 90000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Upfront amount you pay. 20%+ avoids PMI.',
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
      tooltip: 'Percentage of home price you\'re putting down.',
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
      tooltip: 'Length of the mortgage in years',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 6.75,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'Current market interest rate',
      required: true,
    },
    {
      id: 'propertyTax',
      label: 'Property Tax',
      type: 'number' as const,
      value: 1.25,
      min: 0,
      max: 10,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual property tax rate or flat amount',
    },
    {
      id: 'homeInsurance',
      label: 'Home Insurance',
      type: 'number' as const,
      value: 1600,
      min: 0,
      step: 100,
      prefix: '$',
      suffix: '/yr',
      tooltip: 'Annual homeowners insurance premium.',
    },
    {
      id: 'hoaDues',
      label: 'HOA Dues',
      type: 'number' as const,
      value: 0,
      min: 0,
      step: 10,
      prefix: '$',
      suffix: '/mo',
      tooltip: 'Monthly HOA fees. Enter 0 if not applicable.',
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
      tooltip: 'Extra amount to pay each month to save interest.',
      helpText: 'Even $50/month can save thousands!',
    },
    {
      id: 'oneTimePayments',
      label: 'One-Time Payments (Year, Amount)',
      type: 'text' as const,
      value: '3, 5000\n5, 10000',
      tooltip: 'Enter one-time extra payments. Format: Year, Amount (one per line)',
      helpText: 'Example: 3, 5000 (pay $5,000 in year 3)',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🏠 Mortgage Calculator"
        description="Calculate your monthly mortgage payment with taxes, insurance, PMI, HOA fees, and extra payments. Get instant results with amortization schedule and interactive charts."
        icon="🏠"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={mortgageInputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
              showAdvanced={true}
              showExtra={true}
              showCountry={false}   // ✅ Set to false to avoid duplicate
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay 
              results={results} 
              formValues={{
                ...formValues,
                isBiWeekly,
                onBiWeeklyToggle: handleBiWeeklyToggle,
              }}
              currency={currency}
            />
          </div>
        </div>
      </CalculatorLayout>

      {isPageLoaded && (
        <div className="container mx-auto px-4 mt-8 space-y-8">
          <AdUnit format="horizontal" slot="banner-ad-slot" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AdUnit format="rectangle" slot="rectangle-ad-slot" />
            </div>
            <div className="hidden md:block">
              <AdUnit 
                format="vertical" 
                slot="sidebar-ad-slot"
                style={{ minHeight: '250px', minWidth: '160px', position: 'sticky', top: '100px' }}
              />
            </div>
          </div>
          
          <AdUnit format="rectangle" slot="in-article-ad-slot" />
        </div>
      )}
    </>
  )
}