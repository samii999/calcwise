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
      monthlyContribution: values.monthlyContribution || 0,
      contributionFrequency: values.contributionFrequency || 'monthly',
      maintenanceFees: values.maintenanceFees || 0,
      upfrontFees: values.upfrontFees || 0,
      outgoingFees: values.outgoingFees || 0,
      dividends: values.dividends || 0,
      dividendYield: values.dividendYield || 0,
      dividendGrowthRate: values.dividendGrowthRate || 0,
      reinvestDividends: values.reinvestDividends === 'yes',
      inflationRate: values.inflationRate || 3,
      taxRate: values.taxRate || 15,
      dividendTaxRate: values.dividendTaxRate || 15,
      investmentType: values.investmentType || 'stocks',
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'initialCapital',
      label: 'Initial Investment',
      type: 'number' as const,
      value: 20000,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: '$',
      tooltip: 'Starting investment amount',
      required: true,
    },
    {
      id: 'endValue',
      label: 'Current/End Value',
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
      label: 'Investment Period',
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
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: '$',
      tooltip: 'Regular monthly additions (DCA)',
      helpText: 'Dollar-cost averaging strategy',
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select' as const,
      value: 'monthly',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'bi-weekly', label: 'Bi-Weekly' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'annually', label: 'Annually' },
      ],
      tooltip: 'How often you add money',
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
      id: 'dividendGrowthRate',
      label: 'Dividend Growth Rate',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 20,
      step: 0.5,
      suffix: '%',
      tooltip: 'Annual dividend growth rate',
      helpText: 'For dividend growth stocks',
    },
    {
      id: 'reinvestDividends',
      label: 'Reinvest Dividends?',
      type: 'select' as const,
      value: 'yes',
      options: [
        { value: 'yes', label: 'Yes - Compound Growth' },
        { value: 'no', label: 'No - Take as Cash' },
      ],
      tooltip: 'Reinvest dividends for compound growth',
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
      tooltip: 'Ongoing annual fees (expense ratio)',
    },
    {
      id: 'upfrontFees',
      label: 'Upfront/Load Fees',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: '$',
      tooltip: 'One-time purchase fees',
    },
    {
      id: 'outgoingFees',
      label: 'Exit/Sale Fees',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: '$',
      tooltip: 'Fees when selling investment',
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'number' as const,
      value: 3,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: '%',
      tooltip: 'Expected annual inflation rate',
      helpText: 'For real return calculation',
    },
    {
      id: 'taxRate',
      label: 'Capital Gains Tax Rate',
      type: 'number' as const,
      value: 15,
      min: 0,
      max: 50,
      step: 1,
      suffix: '%',
      tooltip: 'Tax rate on investment gains',
      helpText: 'Varies by holding period and income',
    },
    {
      id: 'dividendTaxRate',
      label: 'Dividend Tax Rate',
      type: 'number' as const,
      value: 15,
      min: 0,
      max: 50,
      step: 1,
      suffix: '%',
      tooltip: 'Tax rate on dividend income',
    },
    {
      id: 'investmentType',
      label: 'Investment Type',
      type: 'select' as const,
      value: 'stocks',
      options: [
        { value: 'stocks', label: 'Stocks/ETFs' },
        { value: 'bonds', label: 'Bonds' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'crypto', label: 'Cryptocurrency' },
        { value: 'mutual-fund', label: 'Mutual Fund' },
        { value: 'other', label: 'Other' },
      ],
      tooltip: 'Type of investment for benchmarking',
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
                    <li>• <strong>Initial Investment</strong> - Starting amount</li>
                    <li>• <strong>Current Value</strong> - End/Selling price</li>
                    <li>• <strong>Investment Period</strong> - Years + months</li>
                    <li>• <strong>Contributions</strong> - Regular additions</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Income & Growth</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Dividend Yield</strong> - Annual income %</li>
                    <li>• <strong>Dividend Growth</strong> - Yield increase rate</li>
                    <li>• <strong>Reinvest Dividends</strong> - Compound growth</li>
                    <li>• <strong>Contribution Freq</strong> - DCA strategy</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Costs & Taxes</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Maintenance Fees</strong> - Expense ratio</li>
                    <li>• <strong>Upfront/Exit Fees</strong> - Load fees</li>
                    <li>• <strong>Capital Gains Tax</strong> - Profit tax rate</li>
                    <li>• <strong>Dividend Tax</strong> - Income tax rate</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Real Returns</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Inflation Rate</strong> - Purchasing power loss</li>
                    <li>• <strong>Real CAGR</strong> - Inflation-adjusted</li>
                    <li>• <strong>After-Tax Profit</strong> - Net gains</li>
                    <li>• <strong>Impact Analysis</strong> - Fee/tax effects</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 text-lg">💡</span>
                  <p className="text-sm text-emerald-800">
                    <strong>Pro Tip:</strong> Dollar-cost averaging (regular monthly contributions) reduces market timing risk and can improve long-term returns. Dividend reinvestment accelerates compound growth significantly over time.
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
              showContributionFrequency={true}
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay results={results} formValues={formValues} currency={currency} />
          </div>
        </div>

        {/* ===== INVESTMENT STRATEGIES INFO ===== */}
        {results && (
          <div className="mt-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border border-emerald-100/50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Investment Strategies & Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2">📈 Dollar-Cost Averaging</h4>
                <p className="text-xs text-gray-600">Invest fixed amounts regularly. Reduces market timing risk and smooths out volatility.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2">💰 Dividend Reinvestment</h4>
                <p className="text-xs text-gray-600">Reinvest dividends for compound growth. Significantly accelerates wealth building over time.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                <h4 className="font-medium text-gray-800 mb-2">🎯 Fee Awareness</h4>
                <p className="text-xs text-gray-600">Low expense ratios (0.5% or less) can save thousands over long investment horizons.</p>
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