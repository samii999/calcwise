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
                How to Use This Salary to Hourly Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Convert your annual salary to hourly, weekly, bi-weekly, and monthly rates. See your true hourly rate with commute and expenses factored in. Perfect for job offers comparison, freelance rate calculation, and understanding your true earnings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Salary</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Salary Amount</strong> - Annual or hourly</li>
                    <li>• <strong>Mode</strong> - Annual → Hourly or vice versa</li>
                    <li>• <strong>Hours Per Week</strong> - Your work hours</li>
                    <li>• <strong>Weeks Per Year</strong> - Working weeks</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Adjustments</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Vacation Weeks</strong> - Paid time off</li>
                    <li>• <strong>Holiday Days</strong> - Paid holidays</li>
                    <li>• <strong>Commute Time</strong> - Unpaid time</li>
                    <li>• <strong>Work Expenses</strong> - Out-of-pocket costs</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Calculate Rates</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Hourly Rate</strong> - Per hour</li>
                    <li>• <strong>Weekly Rate</strong> - Per week</li>
                    <li>• <strong>Bi-Weekly Rate</strong> - Every 2 weeks</li>
                    <li>• <strong>Monthly Rate</strong> - Per month</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">True Hourly Rate</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>True Rate</strong> - After commute/expenses</li>
                    <li>• <strong>Tax Impact</strong> - After-tax rate</li>
                    <li>• <strong>Compare Offers</strong> - Job offers</li>
                    <li>• <strong>Freelance Rate</strong> - Set your price</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">💡</span>
                  <p className="text-sm text-green-800">
                    <strong>Pro Tip:</strong> Your true hourly rate is lower than you think! Factor in commute time, work expenses, and unpaid hours to get your real hourly wage. Use this to compare job offers and negotiate better salaries. Our calculator shows you the complete picture!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Salary to Hourly Calculator?</strong> Our free salary to hourly calculator helps you convert between annual salary and hourly wage, with adjustments for vacation, holidays, commute time, and work expenses. Whether you're comparing job offers, setting freelance rates, or budgeting your finances, our tool provides accurate calculations with detailed breakdowns. Know your true hourly rate and make better career decisions.
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