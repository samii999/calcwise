'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateMortgage } from '@/lib/calculators/mortgage'
import { AdUnit } from '@/components/ui/AdUnit'
import { COUNTRIES } from '@/data/countries'

export default function MortgageCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR' | 'INR' | 'PKR'>('USD')
  const [isBiWeekly, setIsBiWeekly] = useState(false)
  const [oneTimePayments, setOneTimePayments] = useState<{ year: number; amount: number }[]>([])
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [useManualTax, setUseManualTax] = useState(false)

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    
    const otpInput = values.oneTimePayments || ''
    let parsedOTP: { year: number; amount: number }[] = []
    if (otpInput) {
      try {
        const lines = otpInput.split('\n').filter((line: string) => line.trim())
        parsedOTP = lines.map((line: string) => {
          const parts = line.split(',').map((p: string) => p.trim())
          return {
            year: parseInt(parts[0]) || 1,
            amount: parseFloat(parts[1]) || 0,
          }
        }).filter((otp: any) => otp.amount > 0)
      } catch (e) {
        console.error('Error parsing one-time payments:', e)
      }
    }

    const result = calculateMortgage({
      homePrice: values.homePrice,
      downPayment: values.downPayment,
      downPaymentPercent: values.downPaymentPercent,
      loanTerm: values.loanTerm,
      interestRate: values.interestRate,
      propertyTax: values.propertyTax || 0,
      homeInsurance: values.homeInsurance || 0,
      hoaDues: values.hoaDues || 0,
      pmi: values.pmi || 0,
      extraPayment: values.extraPayment || 0,
      country: values.country || 'US',
      isBiWeekly: isBiWeekly,
      oneTimePayments: parsedOTP,
    })
    setResults(result)
  }, [])

  const handleBiWeeklyToggle = useCallback((value: boolean) => {
    setIsBiWeekly(value)
  }, [])

  // Recalculate when bi-weekly toggle changes
  useEffect(() => {
    if (formValues) {
      const otpInput = formValues.oneTimePayments || ''
      let parsedOTP: { year: number; amount: number }[] = []
      if (otpInput) {
        try {
          const lines = otpInput.split('\n').filter((line: string) => line.trim())
          parsedOTP = lines.map((line: string) => {
            const parts = line.split(',').map((p: string) => p.trim())
            return {
              year: parseInt(parts[0]) || 1,
              amount: parseFloat(parts[1]) || 0,
            }
          }).filter((otp: any) => otp.amount > 0)
        } catch (e) {
          console.error('Error parsing one-time payments:', e)
        }
      }

      const result = calculateMortgage({
        homePrice: formValues.homePrice,
        downPayment: formValues.downPayment,
        downPaymentPercent: formValues.downPaymentPercent,
        loanTerm: formValues.loanTerm,
        interestRate: formValues.interestRate,
        propertyTax: formValues.propertyTax || 0,
        homeInsurance: formValues.homeInsurance || 0,
        hoaDues: formValues.hoaDues || 0,
        pmi: formValues.pmi || 0,
        extraPayment: formValues.extraPayment || 0,
        country: formValues.country || 'US',
        isBiWeekly: isBiWeekly,
        oneTimePayments: parsedOTP,
      })
      setResults(result)
    }
  }, [isBiWeekly])

  // ✅ Add country field back to inputs
  const mortgageInputs = useMemo(() => [
    {
      id: 'country',
      label: 'Country',
      type: 'select' as const,
      value: 'US',
      options: [
        { value: 'manual', label: '📝 Manual Entry (Enter tax yourself)' },
        ...COUNTRIES.map((c) => ({ 
          value: c.value, 
          label: `${c.flag} ${c.label} (${c.taxRate}% avg tax)` 
        }))
      ],
      tooltip: 'Select your country for property tax reference, or choose Manual Entry to enter tax yourself',
      required: true,
      onChange: (value: string) => {
        setUseManualTax(value === 'manual')
      },
    },
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'number' as const,
      value: 450000,
      min: 10000,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Total purchase price of the home',
      required: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number' as const,
      value: 90000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Upfront amount you pay. 20%+ avoids PMI.',
      required: true,
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment %',
      type: 'number' as const,
      value: 20,
      min: 0,
      max: 100,
      step: 0.5,
      suffix: '%',
      tooltip: 'Percentage of home price you\'re putting down.',
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
      tooltip: 'Length of the mortgage in years',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'range' as const,
      value: 6.75,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'Current market interest rate',
      required: true,
    },
    {
      id: 'propertyTax',
      label: 'Property Tax (Annual)',
      type: 'number' as const,
      value: 5625,
      min: 0,
      max: 100000,
      step: 100,
      prefix: '$',
      suffix: '/year',
      tooltip: useManualTax ? 'Enter your exact annual property tax amount from your tax bill' : 'Annual property tax amount. Enter the exact yearly amount from your tax bill for accurate results.',
      helpText: useManualTax ? 'You selected Manual Entry - enter your exact tax amount' : 'Check your property tax bill for the exact annual amount',
    },
    {
      id: 'homeInsurance',
      label: 'Home Insurance',
      type: 'number' as const,
      value: 1600,
      min: 0,
      step: 100,
      prefix: '$',
      suffix: '/yr',
      tooltip: 'Annual homeowners insurance premium.',
    },
    {
      id: 'hoaDues',
      label: 'HOA Dues',
      type: 'number' as const,
      value: 0,
      min: 0,
      step: 10,
      prefix: '$',
      suffix: '/mo',
      tooltip: 'Monthly HOA fees. Enter 0 if not applicable.',
    },
    {
      id: 'pmi',
      label: 'PMI Rate',
      type: 'number' as const,
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
      suffix: '%',
      tooltip: 'Private Mortgage Insurance rate (only applies if down payment < 20%). Enter 0 if you have 20%+ down payment.',
      helpText: 'Typically 0.5-1% of loan amount annually',
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
      tooltip: 'Extra amount to pay each month to save interest.',
      helpText: 'Even $50/month can save thousands!',
    },
    {
      id: 'oneTimePayments',
      label: 'One-Time Payments (Year, Amount)',
      type: 'text' as const,
      value: '3, 5000\n5, 10000',
      tooltip: 'Enter one-time extra payments. Format: Year, Amount (one per line)',
      helpText: 'Example: 3, 5000 (pay $5,000 in year 3)',
    },
  ], [useManualTax])

  return (
    <>
      <CalculatorLayout
        title="🏠 Mortgage Calculator"
        description="Calculate your monthly mortgage payment with taxes, insurance, PMI, HOA fees, and extra payments. Get instant results with amortization schedule and interactive charts."
        icon="🏠"
      >
        {/* 📖 How to Use Guide - Moved to TOP */}
        <div className="mb-8 bg-gradient-to-br from-teal-50 via-emerald-50 to-blue-50 rounded-2xl p-6 border border-teal-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-teal-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                How to Use This Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  4 Easy Steps
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Home Price</strong> &amp; <strong>Down Payment</strong></li>
                    <li>• <strong>Loan Term</strong> (15 or 30 years)</li>
                    <li>• <strong>Interest Rate</strong> from your lender</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Monthly Costs</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Property Tax</strong> (annual amount)</li>
                    <li>• <strong>Insurance</strong> &amp; <strong>HOA</strong> fees</li>
                    <li>• <strong>PMI</strong> if down payment &lt; 20%</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Pay Off Faster</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Extra Payment</strong> per month</li>
                    <li>• <strong>Bi-Weekly</strong> payment option</li>
                    <li>• <strong>One-Time</strong> lump sum payments</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review Results</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Payment</strong> breakdown</li>
                    <li>• <strong>Amortization</strong> schedule</li>
                    <li>• <strong>Charts</strong> &amp; payoff date</li>
                  </ul>
                </div>
              </div>

              {/* Pro Tip Banner */}
              <div className="mt-4 p-3 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-xl border border-teal-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-teal-500 text-lg">💡</span>
                  <p className="text-sm text-teal-800">
                    <strong>Pro Tip:</strong> Even an extra <strong>$100/month</strong> can save you <strong>thousands</strong> in interest and shorten your loan by several years!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={mortgageInputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
              showAdvanced={true}
              showExtra={true}
              showCountry={false}
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay 
              results={results} 
              formValues={{
                ...formValues,
                isBiWeekly,
                onBiWeeklyToggle: handleBiWeeklyToggle,
              }}
              currency={currency}
            />
          </div>
        </div>
      </CalculatorLayout>

      {isPageLoaded && (
        <div className="container mx-auto px-4 mt-8 space-y-8">
          <AdUnit format="horizontal" slot="banner-ad-slot" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AdUnit format="rectangle" slot="rectangle-ad-slot" />
            </div>
            <div className="hidden md:block">
              <AdUnit 
                format="vertical" 
                slot="sidebar-ad-slot"
                style={{ minHeight: '250px', minWidth: '160px', position: 'sticky', top: '100px' }}
              />
            </div>
          </div>
          
          <AdUnit format="rectangle" slot="in-article-ad-slot" />
        </div>
      )}
    </>
  )
}