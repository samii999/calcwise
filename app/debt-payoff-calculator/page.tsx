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
      hasConsolidation: values.hasConsolidation === 'yes',
      consolidationRate: values.consolidationRate || 8,
      consolidationTerm: values.consolidationTerm || 5,
      consolidationFee: values.consolidationFee || 3,
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
    {
      id: 'hasConsolidation',
      label: 'Consider Debt Consolidation',
      type: 'select' as const,
      value: 'no',
      options: [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' },
      ],
      tooltip: 'Calculate potential savings from consolidating debts into one loan',
      helpText: 'Compare consolidation loan offers',
    },
    {
      id: 'consolidationRate',
      label: 'Consolidation Loan Rate (%)',
      type: 'number' as const,
      value: 8,
      min: 0,
      max: 30,
      step: 0.5,
      suffix: '%',
      tooltip: 'Interest rate for consolidation loan',
      helpText: 'Typically lower than credit card rates',
    },
    {
      id: 'consolidationTerm',
      label: 'Consolidation Loan Term (Years)',
      type: 'number' as const,
      value: 5,
      min: 1,
      max: 30,
      step: 1,
      suffix: ' years',
      tooltip: 'Repayment period for consolidation loan',
      helpText: 'Shorter term = less interest but higher payments',
    },
    {
      id: 'consolidationFee',
      label: 'Consolidation Fee (%)',
      type: 'number' as const,
      value: 3,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: '%',
      tooltip: 'Origination or processing fee for consolidation loan',
      helpText: 'Usually 1-5% of loan amount',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📉 Debt Payoff Calculator"
        description="Get out of debt faster using Avalanche or Snowball method. Compare strategies and see how extra payments save you money."
        icon="📉"
      >
        {/* ===== COMPREHENSIVE TIPS SECTION AT TOP ===== */}
        <div className="mb-8 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl p-6 border border-amber-100/50 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Expert Debt Payoff Tips & Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">⛰️</span> Avalanche Method
              </h4>
              <p className="text-xs text-gray-600">Pay highest interest rate debt first. Saves the most money in interest payments. Best for math-focused debtors.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">❄️</span> Snowball Method
              </h4>
              <p className="text-xs text-gray-600">Pay smallest balance debt first. Provides psychological wins and motivation. Best for behavior-focused debtors.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">💰</span> Extra Payments
              </h4>
              <p className="text-xs text-gray-600">Even $50 extra monthly can save thousands in interest and shave years off your payoff timeline.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">🔄</span> Balance Transfer
              </h4>
              <p className="text-xs text-gray-600">Transfer high-interest debt to 0% APR cards. Can save significant interest if you pay off before the promo ends.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">📊</span> Debt Consolidation
              </h4>
              <p className="text-xs text-gray-600">Combine multiple debts into one loan with lower rate. Simplifies payments and can reduce total interest.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">🎯</span> Stay Motivated
              </h4>
              <p className="text-xs text-gray-600">Track progress, celebrate milestones, and adjust budget as debts are paid off. Consistency is key to success.</p>
            </div>
          </div>
        </div>

        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 rounded-2xl p-6 border border-red-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Debt Payoff Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get out of debt faster using Avalanche or Snowball method. Compare strategies and see how extra payments save you money. Perfect for credit card debt, personal loans, student loans, and any other type of debt.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Your Debts</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Name</strong> - Credit card or loan name</li>
                    <li>• <strong>Balance</strong> - Current amount owed</li>
                    <li>• <strong>Rate%</strong> - APR interest rate</li>
                    <li>• <strong>Min Payment</strong> - Minimum monthly payment</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Your Budget</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Budget</strong> - Total available</li>
                    <li>• <strong>Extra Payment</strong> - Pay more monthly</li>
                    <li>• <strong>Strategy</strong> - Avalanche or Snowball</li>
                    <li>• <strong>Compare Both</strong> - See the difference</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Choose Strategy</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Avalanche</strong> - Highest interest first</li>
                    <li>• <strong>Snowball</strong> - Smallest balance first</li>
                    <li>• <strong>Compare</strong> - See which saves more</li>
                    <li>• <strong>Switch</strong> - Try both strategies</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review & Save</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Interest</strong> - Cost of debt</li>
                    <li>• <strong>Payoff Date</strong> - When debt-free</li>
                    <li>• <strong>Interest Saved</strong> - Extra payments</li>
                    <li>• <strong>Strategy Winner</strong> - Best approach</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-xl border border-red-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 text-lg">💡</span>
                  <p className="text-sm text-red-800">
                    <strong>Pro Tip:</strong> The Avalanche method saves the most money ($578 less interest in this example), but the Snowball method provides psychological wins by clearing smaller debts first. Choose the strategy that motivates you to stay on track!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Debt Payoff Calculator?</strong> Our free debt payoff calculator helps you compare the Avalanche and Snowball methods to find the fastest way to become debt-free. Whether you're paying off credit cards, personal loans, student loans, or medical bills, our tool provides accurate calculations with detailed month-by-month amortization schedules. Compare different strategies, extra payments, and budgets to make informed debt reduction decisions and save thousands in interest.
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
              showExtra={true}
              showAdvanced={true}
              showStrategySelector={true}
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay results={results} formValues={formValues} currency={currency} />
          </div>
        </div>

        {/* ===== DEBT STRATEGIES INFO SECTION ===== */}
        {results && (
          <div className="mt-8 bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 rounded-2xl p-6 border border-rose-100/50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Debt Payoff Strategies Explained
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-lg">⛰️</span> Avalanche Method
                </h4>
                <p className="text-xs text-gray-600 mb-2">Pay highest interest rate debt first. Maximizes interest savings.</p>
                <div className="text-xs text-gray-500">
                  <strong>Best for:</strong> Math-focused debtors who want to save the most money.
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-lg">❄️</span> Snowball Method
                </h4>
                <p className="text-xs text-gray-600 mb-2">Pay smallest balance debt first. Builds momentum and motivation.</p>
                <div className="text-xs text-gray-500">
                  <strong>Best for:</strong> Behavior-focused debtors who need quick wins to stay motivated.
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-lg">🔄</span> Debt Consolidation
                </h4>
                <p className="text-xs text-gray-600 mb-2">Combine debts into one lower-rate loan. Simplifies payments.</p>
                <div className="text-xs text-gray-500">
                  <strong>Best for:</strong> Multiple high-interest debts with available consolidation offers.
                </div>
              </div>
            </div>
          </div>
        )}
      </CalculatorLayout>

      <div className="container mx-auto px-4 mt-8">
        <AdUnit format="horizontal" slot="banner-ad-slot" />
      </div>
    </>
  )
}