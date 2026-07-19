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
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-amber-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Budget Planner Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Plan your monthly budget by tracking income and expenses. See where your money goes and identify savings opportunities. Perfect for personal finance management, family budgeting, and achieving financial goals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Add Income Sources</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Salary</strong> - Your main income</li>
                    <li>• <strong>Freelance</strong> - Side income</li>
                    <li>• <strong>Investments</strong> - Dividends, interest</li>
                    <li>• <strong>Rental</strong> - Property income</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Expenses</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Housing</strong> - Rent/Mortgage</li>
                    <li>• <strong>Food</strong> - Groceries, dining</li>
                    <li>• <strong>Transportation</strong> - Car, gas</li>
                    <li>• <strong>Utilities</strong> - Electric, water</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Choose Budget Rule</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>50/30/20</strong> - Needs/Wants/Savings</li>
                    <li>• <strong>80/20</strong> - Expenses/Savings</li>
                    <li>• <strong>Custom</strong> - Your own rule</li>
                    <li>• <strong>Compare</strong> - See recommendations</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review & Optimize</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Surplus/Deficit</strong> - Monthly cash flow</li>
                    <li>• <strong>Savings Rate</strong> - % of income saved</li>
                    <li>• <strong>Spending Trends</strong> - Where money goes</li>
                    <li>• <strong>Optimize</strong> - Find savings</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 text-lg">💡</span>
                  <p className="text-sm text-amber-800">
                    <strong>Pro Tip:</strong> The 50/30/20 rule is a great starting point: 50% for needs (housing, food, utilities), 30% for wants (entertainment, shopping), and 20% for savings and debt repayment. Our calculator shows you exactly how your spending compares to this golden rule!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Budget Planner Calculator?</strong> Our free budget planner calculator helps you track your income and expenses, identify spending patterns, and find savings opportunities. Whether you're following the 50/30/20 rule, 80/20 rule, or creating a custom budget, our tool provides accurate calculations with detailed category breakdowns. Plan your monthly budget, track your progress, and achieve your financial goals with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

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