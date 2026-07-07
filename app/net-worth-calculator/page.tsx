'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateNetWorth } from '@/lib/calculators/net-worth'
import { AdUnit } from '@/components/ui/AdUnit'

export default function NetWorthCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const assets = parseItems(values.assetsInput, 'asset')
    const liabilities = parseItems(values.liabilitiesInput, 'liability')
    const result = calculateNetWorth({ assets, liabilities })
    setResults(result)
  }, [])

  const parseItems = (text: string, type: 'asset' | 'liability') => {
    try {
      const lines = text.split('\n').filter((line) => line.trim())
      return lines.map((line, index) => {
        const parts = line.split(',').map((p) => p.trim())
        const categoryMap: Record<string, any> = {
          asset: {
            cash: 'cash',
            investment: 'investments',
            real_estate: 'real_estate',
            vehicle: 'vehicles',
            other: 'other',
          },
          liability: {
            mortgage: 'mortgage',
            credit_card: 'credit_card',
            student_loan: 'student_loan',
            auto_loan: 'auto_loan',
            other: 'other',
          },
        }
        return {
          id: `${type}-${index}`,
          name: parts[0] || `${type} ${index + 1}`,
          value: parseFloat(parts[1]) || 0,
          category: parts[2] ? categoryMap[type][parts[2].toLowerCase()] || 'other' : 'other',
        }
      })
    } catch {
      if (type === 'asset') {
        return [
          { id: 'asset-0', name: 'Cash & Savings', value: 15000, category: 'cash' },
          { id: 'asset-1', name: 'Stocks & Bonds', value: 25000, category: 'investments' },
          { id: 'asset-2', name: 'House', value: 300000, category: 'real_estate' },
          { id: 'asset-3', name: 'Car', value: 15000, category: 'vehicles' },
        ]
      } else {
        return [
          { id: 'liab-0', name: 'Mortgage', value: 200000, category: 'mortgage' },
          { id: 'liab-1', name: 'Credit Card', value: 3000, category: 'credit_card' },
          { id: 'liab-2', name: 'Student Loan', value: 15000, category: 'student_loan' },
          { id: 'liab-3', name: 'Car Loan', value: 10000, category: 'auto_loan' },
        ]
      }
    }
  }

  const inputs = useMemo(() => [
    {
      id: 'assetsInput',
      label: 'Assets (Name, Value, Category)',
      type: 'text' as const,
      value: `Cash & Savings, 15000, cash\nStocks & Bonds, 25000, investments\nHouse, 300000, real_estate\nCar, 15000, vehicle`,
      tooltip: 'Enter each asset on a new line: Name, Value, Category (cash, investments, real_estate, vehicle, other)',
      helpText: 'Example: House, 300000, real_estate',
      required: true,
    },
    {
      id: 'liabilitiesInput',
      label: 'Liabilities (Name, Value, Category)',
      type: 'text' as const,
      value: `Mortgage, 200000, mortgage\nCredit Card, 3000, credit_card\nStudent Loan, 15000, student_loan\nCar Loan, 10000, auto_loan`,
      tooltip: 'Enter each liability on a new line: Name, Value, Category (mortgage, credit_card, student_loan, auto_loan, other)',
      helpText: 'Example: Credit Card, 3000, credit_card',
      required: true,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📒 Net Worth Calculator"
        description="Calculate your net worth by adding all assets and subtracting all liabilities. Track your financial progress over time."
        icon="📒"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
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