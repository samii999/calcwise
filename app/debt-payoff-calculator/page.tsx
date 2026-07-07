'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateDebtPayoff } from '@/lib/calculators/debt-payoff'
import { AdUnit } from '@/components/ui/AdUnit'

export default function DebtPayoffCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const debts = parseDebts(values.debtsInput)
    const result = calculateDebtPayoff({
      debts,
      totalMonthlyBudget: values.totalMonthlyBudget,
      strategy: values.strategy || 'avalanche',
      extraPayment: values.extraPayment || 0,
    })
    setResults(result)
  }, [])

  const parseDebts = (text: string): { id: string; name: string; balance: number; interestRate: number; minimumPayment: number }[] => {
    try {
      const lines = text.split('\n').filter((line) => line.trim())
      return lines.map((line, index) => {
        const parts = line.split(',').map((p) => p.trim())
        return {
          id: `debt-${index}`,
          name: parts[0] || `Debt ${index + 1}`,
          balance: parseFloat(parts[1]) || 0,
          interestRate: parseFloat(parts[2]) || 0,
          minimumPayment: parseFloat(parts[3]) || 0,
        }
      })
    } catch {
      return [
        { id: 'debt-1', name: 'Credit Card A', balance: 5000, interestRate: 22, minimumPayment: 150 },
        { id: 'debt-2', name: 'Credit Card B', balance: 3000, interestRate: 18, minimumPayment: 100 },
        { id: 'debt-3', name: 'Personal Loan', balance: 2000, interestRate: 12, minimumPayment: 75 },
      ]
    }
  }

  const inputs = useMemo(() => [
    {
      id: 'debtsInput',
      label: 'Debts (Name, Balance, Rate%, Min Payment)',
      type: 'text' as const,
      value: `Credit Card A, 5000, 22, 150\nCredit Card B, 3000, 18, 100\nPersonal Loan, 2000, 12, 75`,
      tooltip: 'Enter each debt on a new line: Name, Balance, Interest Rate %, Minimum Payment',
      helpText: 'Example: Credit Card, 5000, 22, 150',
      required: true,
    },
    {
      id: 'totalMonthlyBudget',
      label: 'Total Monthly Budget',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 100000,
      step: 10,
      prefix: '$',
      tooltip: 'Total amount you can pay toward debts each month',
      required: true,
    },
    {
      id: 'strategy',
      label: 'Payoff Strategy',
      type: 'select' as const,
      value: 'avalanche',
      options: [
        { value: 'avalanche', label: '⛰️ Avalanche (Highest Interest First)' },
        { value: 'snowball', label: '❄️ Snowball (Smallest Balance First)' },
      ],
      tooltip: 'Avalanche saves the most money. Snowball gives psychological wins.',
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
      tooltip: 'Extra amount to pay toward debt each month',
      helpText: 'Even $50/month can make a big difference!',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📉 Debt Payoff Calculator"
        description="Get out of debt faster using Avalanche or Snowball method. Compare strategies and see how extra payments save you money."
        icon="📉"
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
              showStrategySelector={true}
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