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
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border border-green-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Home Affordability Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Find out how much home you can afford based on your income, debts, and current interest rates. Get a realistic budget for your home search. Perfect for first-time homebuyers, pre-qualification planning, and understanding your purchasing power.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Finances</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Annual Income</strong> - Total yearly earnings</li>
                    <li>• <strong>Monthly Debts</strong> - Car, loans, cards</li>
                    <li>• <strong>Down Payment</strong> - Cash available</li>
                    <li>• <strong>DTI Limit</strong> - Your comfort zone</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Set Mortgage Terms</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Interest Rate</strong> - Current APR</li>
                    <li>• <strong>Loan Term</strong> - 15/20/30 years</li>
                    <li>• <strong>Property Tax</strong> - Local tax rate</li>
                    <li>• <strong>Insurance & HOA</strong> - Monthly costs</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Calculate</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Max Home Price</strong> - Your budget</li>
                    <li>• <strong>Monthly Payment</strong> - Total housing cost</li>
                    <li>• <strong>DTI Ratio</strong> - Debt-to-income</li>
                    <li>• <strong>Status</strong> - Safe/At Risk/Exceeds</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Adjust & Compare</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Change DTI</strong> - See different budgets</li>
                    <li>• <strong>Adjust Down Payment</strong> - Impact on price</li>
                    <li>• <strong>Rates Change</strong> - Current market</li>
                    <li>• <strong>Find Homes</strong> - Within your range</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">💡</span>
                  <p className="text-sm text-green-800">
                    <strong>Pro Tip:</strong> Most lenders recommend a DTI ratio below 36% (28% for housing costs). Use our calculator to find the sweet spot where you can comfortably afford your home. Remember to factor in property taxes, insurance, and maintenance costs - they can add 20-30% to your monthly payment!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Home Affordability Calculator?</strong> Our free home affordability calculator helps you determine how much house you can afford based on your income, debts, down payment, and current interest rates. Whether you're a first-time homebuyer or looking to upgrade, our tool provides accurate calculations with detailed payment breakdowns. Compare different DTI ratios, loan terms, and down payment amounts to find your ideal home budget and get pre-qualified with confidence.
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