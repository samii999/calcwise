'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateInvestment } from '@/lib/calculators/investment'
import { AdUnit } from '@/components/ui/AdUnit'

export default function InvestmentCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateInvestment({
      initialCapital: values.initialCapital,
      endValue: values.endValue,
      investmentYears: values.investmentYears,
      investmentMonths: values.investmentMonths || 0,
      maintenanceFees: values.maintenanceFees || 0,
      upfrontFees: values.upfrontFees || 0,
      outgoingFees: values.outgoingFees || 0,
      dividends: values.dividends || 0,
      dividendYield: values.dividendYield || 0,
      reinvestDividends: values.reinvestDividends || false,
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'initialCapital',
      label: 'Initial Capital',
      type: 'number' as const,
      value: 20000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Amount you start with',
      required: true,
    },
    {
      id: 'endValue',
      label: 'End Value / Current Value',
      type: 'number' as const,
      value: 35000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Current or selling value of investment',
      required: true,
    },
    {
      id: 'investmentYears',
      label: 'Investment Years',
      type: 'number' as const,
      value: 5,
      min: 0,
      max: 50,
      step: 1,
      suffix: ' years',
      tooltip: 'Number of years held',
      required: true,
    },
    {
      id: 'investmentMonths',
      label: 'Additional Months',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 11,
      step: 1,
      suffix: ' months',
      tooltip: 'Additional months beyond full years',
    },
    {
      id: 'dividendYield',
      label: 'Dividend Yield',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 20,
      step: 0.5,
      suffix: '%',
      tooltip: 'Annual dividend yield percentage',
    },
    {
      id: 'maintenanceFees',
      label: 'Annual Maintenance Fees',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 50,
      prefix: '$',
      suffix: '/yr',
      tooltip: 'Ongoing annual fees',
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="📊 Investment Return Calculator"
        description="Calculate your investment ROI, CAGR, and benchmark against market indices. See how fees and dividends affect your returns."
        icon="📊"
      >
        {/* ✅ SEO-Optimized Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border border-emerald-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Investment Return Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate your investment ROI, CAGR, and benchmark against market indices. See how fees and dividends affect your returns. Perfect for portfolio evaluation, mutual fund analysis, and stock investment tracking.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Investment</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Initial Capital</strong> - Amount invested</li>
                    <li>• <strong>End Value</strong> - Current/Selling price</li>
                    <li>• <strong>Investment Years</strong> - Holding period</li>
                    <li>• <strong>Months</strong> - Additional time</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Income & Fees</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Dividend Yield</strong> - Annual income %</li>
                    <li>• <strong>Maintenance Fees</strong> - Ongoing costs</li>
                    <li>• <strong>Reinvest Dividends</strong> - Compound growth</li>
                    <li>• <strong>Upfront/Outgoing Fees</strong> - One-time costs</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Review Returns</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>CAGR</strong> - Annualized growth</li>
                    <li>• <strong>Total ROI</strong> - Overall return %</li>
                    <li>• <strong>Net Profit</strong> - Total gain/loss</li>
                    <li>• <strong>Inflation Adjusted</strong> - Real return</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Compare & Optimize</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Benchmark</strong> - Compare to S&P 500</li>
                    <li>• <strong>Fee Impact</strong> - Cost of fees</li>
                    <li>• <strong>Dividend Effect</strong> - Income boost</li>
                    <li>• <strong>Tax Consideration</strong> - After-tax returns</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 text-lg">💡</span>
                  <p className="text-sm text-emerald-800">
                    <strong>Pro Tip:</strong> The S&P 500 historically returns ~10% annually (before inflation). Our calculator helps you compare your investment performance against this benchmark. A CAGR above 10% suggests you're beating the market!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Investment Return Calculator?</strong> Our free investment return calculator helps you evaluate your portfolio performance, calculate CAGR (Compound Annual Growth Rate), and determine total ROI (Return on Investment). Whether you're analyzing stocks, mutual funds, real estate, or cryptocurrency, our tool provides accurate calculations with detailed year-by-year growth projections. Compare different investment scenarios, account for fees and dividends, and make informed portfolio decisions.
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