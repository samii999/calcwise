'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateSalary } from '@/lib/calculators/salary'
import { AdUnit } from '@/components/ui/AdUnit'

export default function SalaryCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateSalary({
      salaryAmount: values.salaryAmount,
      mode: values.mode || 'annual-to-hourly',
      hoursPerWeek: values.hoursPerWeek || 40,
      weeksPerYear: values.weeksPerYear || 52,
      paidVacationWeeks: values.paidVacationWeeks || 2,
      paidHolidayDays: values.paidHolidayDays || 10,
      commuteMinutes: values.commuteMinutes || 0,
      commuteDaysPerWeek: values.commuteDaysPerWeek || 5,
      workExpenses: values.workExpenses || 0,
      taxRate: values.taxRate || 0,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'mode',
      label: 'Conversion Mode',
      type: 'select' as const,
      value: 'annual-to-hourly',
      options: [
        { value: 'annual-to-hourly', label: 'Annual Salary → Hourly Rate' },
        { value: 'hourly-to-annual', label: 'Hourly Wage → Annual Salary' },
      ],
      tooltip: 'Choose conversion direction',
    },
    {
      id: 'salaryAmount',
      label: 'Salary Amount',
      type: 'number' as const,
      value: 75000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Enter your annual salary or hourly wage',
      required: true,
    },
    {
      id: 'hoursPerWeek',
      label: 'Hours Per Week',
      type: 'number' as const,
      value: 40,
      min: 1,
      max: 80,
      step: 1,
      suffix: ' hours',
      tooltip: 'Standard working hours per week',
    },
    {
      id: 'weeksPerYear',
      label: 'Weeks Per Year',
      type: 'number' as const,
      value: 52,
      min: 40,
      max: 52,
      step: 1,
      suffix: ' weeks',
      tooltip: 'Number of working weeks per year',
    },
    {
      id: 'paidVacationWeeks',
      label: 'Paid Vacation Weeks',
      type: 'number' as const,
      value: 2,
      min: 0,
      max: 10,
      step: 1,
      suffix: ' weeks',
      tooltip: 'Paid vacation weeks per year',
    },
    {
      id: 'paidHolidayDays',
      label: 'Paid Holiday Days',
      type: 'number' as const,
      value: 10,
      min: 0,
      max: 20,
      step: 1,
      suffix: ' days',
      tooltip: 'Paid holiday days per year',
    },
    {
      id: 'commuteMinutes',
      label: 'Daily Commute (Minutes)',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 240,
      step: 5,
      suffix: ' min',
      tooltip: 'Round-trip commute time per day',
    },
    {
      id: 'workExpenses',
      label: 'Monthly Work Expenses',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 10000,
      step: 50,
      prefix: '$',
      tooltip: 'Monthly out-of-pocket work expenses',
    },
    {
      id: 'taxRate',
      label: 'Estimated Tax Rate',
      type: 'range' as const,
      value: 22,
      min: 0,
      max: 50,
      step: 0.5,
      suffix: '%',
      tooltip: 'Estimated combined tax rate',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="💵 Salary to Hourly Calculator"
        description="Convert your annual salary to hourly, weekly, bi-weekly, and monthly rates. See your true hourly rate with commute and expenses factored in."
        icon="💵"
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