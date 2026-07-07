'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateBudget } from '@/lib/calculators/budget'
import { AdUnit } from '@/components/ui/AdUnit'

export default function BudgetCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const income = parseItems(values.incomeInput, 'income')
    const expenses = parseItems(values.expensesInput, 'expense')
    const result = calculateBudget({
      income,
      expenses,
      rulePreset: values.rulePreset || '50-30-20',
    })
    setResults(result)
  }, [])

  const parseItems = (text: string, type: 'income' | 'expense') => {
    try {
      const lines = text.split('\n').filter((line) => line.trim())
      return lines.map((line, index) => {
        const parts = line.split(',').map((p) => p.trim())
        const categoryMap: Record<string, any> = {
          income: {
            salary: 'income',
            freelance: 'income',
            investment: 'income',
            rental: 'income',
            other: 'income',
          },
          expense: {
            housing: 'housing',
            transportation: 'transportation',
            food: 'food',
            utilities: 'utilities',
            insurance: 'insurance',
            healthcare: 'healthcare',
            entertainment: 'entertainment',
            shopping: 'shopping',
            debt: 'debt',
            savings: 'savings',
            other: 'other',
          },
        }
        return {
          id: `${type}-${index}`,
          name: parts[0] || `${type} ${index + 1}`,
          planned: parseFloat(parts[1]) || 0,
          actual: parseFloat(parts[2]) || 0,
          category: type === 'income' ? 'income' : (parts[3] ? categoryMap[type][parts[3].toLowerCase()] || 'other' : 'other'),
        }
      })
    } catch {
      if (type === 'income') {
        return [
          { id: 'inc-0', name: 'Salary', planned: 5000, actual: 5000, category: 'income' },
          { id: 'inc-1', name: 'Freelance', planned: 500, actual: 600, category: 'income' },
          { id: 'inc-2', name: 'Investments', planned: 200, actual: 150, category: 'income' },
        ]
      } else {
        return [
          { id: 'exp-0', name: 'Rent/Mortgage', planned: 1500, actual: 1500, category: 'housing' },
          { id: 'exp-1', name: 'Groceries', planned: 500, actual: 550, category: 'food' },
          { id: 'exp-2', name: 'Utilities', planned: 200, actual: 180, category: 'utilities' },
          { id: 'exp-3', name: 'Transportation', planned: 300, actual: 280, category: 'transportation' },
          { id: 'exp-4', name: 'Insurance', planned: 200, actual: 200, category: 'insurance' },
          { id: 'exp-5', name: 'Healthcare', planned: 100, actual: 120, category: 'healthcare' },
          { id: 'exp-6', name: 'Entertainment', planned: 150, actual: 200, category: 'entertainment' },
          { id: 'exp-7', name: 'Shopping', planned: 200, actual: 180, category: 'shopping' },
          { id: 'exp-8', name: 'Debt Payments', planned: 300, actual: 300, category: 'debt' },
          { id: 'exp-9', name: 'Savings', planned: 500, actual: 400, category: 'savings' },
          { id: 'exp-10', name: 'Other', planned: 100, actual: 90, category: 'other' },
        ]
      }
    }
  }

  const inputs = useMemo(() => [
    {
      id: 'incomeInput',
      label: 'Income (Name, Planned, Actual)',
      type: 'text' as const,
      value: `Salary, 5000, 5000\nFreelance, 500, 600\nInvestments, 200, 150`,
      tooltip: 'Enter each income on a new line: Name, Planned Amount, Actual Amount',
      helpText: 'Example: Salary, 5000, 5000',
      required: true,
    },
    {
      id: 'expensesInput',
      label: 'Expenses (Name, Planned, Actual)',
      type: 'text' as const,
      value: `Rent/Mortgage, 1500, 1500\nGroceries, 500, 550\nUtilities, 200, 180\nTransportation, 300, 280\nInsurance, 200, 200\nHealthcare, 100, 120\nEntertainment, 150, 200\nShopping, 200, 180\nDebt Payments, 300, 300\nSavings, 500, 400\nOther, 100, 90`,
      tooltip: 'Enter each expense on a new line: Name, Planned Amount, Actual Amount',
      helpText: 'Example: Rent, 1500, 1500',
      required: true,
    },
    {
      id: 'rulePreset',
      label: 'Budget Rule',
      type: 'select' as const,
      value: '50-30-20',
      options: [
        { value: '50-30-20', label: '50/30/20 Rule (Needs/Wants/Savings)' },
        { value: '80-20', label: '80/20 Rule (Expenses/Savings)' },
        { value: 'custom', label: 'Custom (No Preset)' },
      ],
      tooltip: 'Choose a budgeting framework for comparison',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📝 Budget Planner Calculator"
        description="Plan your monthly budget by tracking income and expenses. See where your money goes and identify savings opportunities."
        icon="📝"
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