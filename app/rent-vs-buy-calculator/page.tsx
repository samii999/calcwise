'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateRentVsBuy } from '@/lib/calculators/rent-vs-buy'
import { AdUnit } from '@/components/ui/AdUnit'

export default function RentVsBuyCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateRentVsBuy({
      homePrice: values.homePrice,
      downPaymentPercent: values.downPaymentPercent || 20,
      mortgageRate: values.mortgageRate,
      loanTerm: values.loanTerm || 30,
      monthlyRent: values.monthlyRent,
      rentIncreaseRate: values.rentIncreaseRate || 3,
      propertyTaxRate: values.propertyTaxRate || 1.25,
      homeInsurance: values.homeInsurance || 1500,
      maintenancePercent: values.maintenancePercent || 1,
      closingCostsPercent: values.closingCostsPercent || 3,
      sellingCostsPercent: values.sellingCostsPercent || 6,
      homeAppreciationRate: values.homeAppreciationRate || 4,
      investmentReturn: values.investmentReturn || 8,
      comparisonYears: values.comparisonYears || 10,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'number' as const,
      value: 88000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Purchase price of the home',
      required: true,
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment %',
      type: 'number' as const,
      value: 20,
      min: 0,
      max: 100,
      step: 1,
      suffix: '%',
      tooltip: 'Percentage of home price as down payment',
    },
    {
      id: 'mortgageRate',
      label: 'Mortgage Rate',
      type: 'range' as const,
      value: 7,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
      tooltip: 'Annual mortgage interest rate',
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
      id: 'monthlyRent',
      label: 'Monthly Rent',
      type: 'number' as const,
      value: 2000,
      min: 0,
      max: 50000,
      step: 100,
      prefix: '$',
      tooltip: 'Current monthly rent',
      required: true,
    },
    {
      id: 'comparisonYears',
      label: 'Years to Compare',
      type: 'range' as const,
      value: 13,
      min: 1,
      max: 30,
      step: 1,
      suffix: ' years',
      tooltip: 'How many years to compare',
      required: true,
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
        title="🏘️ Rent vs Buy Calculator"
        description="Compare renting versus buying a home. See which option saves you more money over time with all costs included."
        icon="🏘️"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 border border-emerald-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Rent vs Buy Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Compare renting versus buying a home. See which option saves you more money over time with all costs included. Perfect for first-time homebuyers, renters considering purchase, and real estate investment analysis.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Property Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Home Price</strong> - Purchase price</li>
                    <li>• <strong>Down Payment %</strong> - % of home price</li>
                    <li>• <strong>Mortgage Rate</strong> - Current APR</li>
                    <li>• <strong>Loan Term</strong> - 15/20/30 years</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Rent Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Rent</strong> - Current rent</li>
                    <li>• <strong>Rent Increase</strong> - Annual % increase</li>
                    <li>• <strong>Comparison Years</strong> - How long to compare</li>
                    <li>• <strong>Investment Return</strong> - Opportunity cost</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Add Costs</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Property Tax</strong> - Annual tax rate</li>
                    <li>• <strong>Home Insurance</strong> - Annual premium</li>
                    <li>• <strong>Maintenance</strong> - Annual % of home</li>
                    <li>• <strong>Closing/Selling Costs</strong> - Transaction fees</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review & Decide</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Total Cost</strong> - Buy vs Rent</li>
                    <li>• <strong>Equity Built</strong> - Homeownership</li>
                    <li>• <strong>Wealth Difference</strong> - Which wins?</li>
                    <li>• <strong>Break-Even Point</strong> - When buying wins</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 text-lg">💡</span>
                  <p className="text-sm text-emerald-800">
                    <strong>Pro Tip:</strong> The break-even point is typically 5-7 years. If you plan to stay longer than 5 years, buying usually wins. This calculator shows you the exact break-even point for your specific situation! In this example, buying wins after just 1-2 years due to the high rent vs low home price ratio.
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Rent vs Buy Calculator?</strong> Our free rent vs buy calculator helps you compare the total cost of renting versus buying a home, including mortgage payments, property taxes, insurance, maintenance, and rent increases. Whether you're a first-time homebuyer or considering an investment property, our tool provides accurate calculations with detailed year-by-year comparisons. Make informed real estate decisions by analyzing home appreciation, opportunity cost, and the true wealth difference between renting and buying.
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