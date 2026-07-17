'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateCarLoan } from '@/lib/calculators/car-loan'
import { AdUnit } from '@/components/ui/AdUnit'

export default function CarLoanCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateCarLoan({
      vehiclePrice: values.vehiclePrice,
      downPayment: values.downPayment,
      downPaymentPercent: values.downPaymentPercent,
      tradeInValue: values.tradeInValue || 0,
      tradeInOwed: values.tradeInOwed || 0,
      interestRate: values.interestRate,
      loanTerm: values.loanTerm,
      salesTax: values.salesTax || 0,
      registrationFees: values.registrationFees || 0,
      dealerFees: values.dealerFees || 0,
      feeCapitalization: values.feeCapitalization === 'yes',
      extraPayment: values.extraPayment || 0,
      biWeeklyMode: values.biWeeklyMode === 'biweekly',
      country: values.country || 'US',
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    // Vehicle & Equity Inputs
    {
      id: 'vehiclePrice',
      label: 'Vehicle Purchase Price',
      type: 'number' as const,
      value: 35000,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'The negotiated price of the car before any added options, taxes, or registrations',
      required: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number' as const,
      value: 7000,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'Upfront cash paid directly to the dealer',
      required: false,
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
      tooltip: 'Percentage of vehicle price (recalculates cash down payment)',
      required: false,
    },
    {
      id: 'tradeInValue',
      label: 'Trade-In Value',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'The total value the dealer is offering for your old car',
      required: false,
    },
    {
      id: 'tradeInOwed',
      label: 'Trade-In Owed / Lien Balance',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 500000,
      step: 500,
      prefix: '$',
      tooltip: 'Any remaining loan balance on the vehicle you are trading in (creates negative equity if owed more than trade-in value)',
      required: false,
    },
    // Loan & Rate Parameters
    {
      id: 'interestRate',
      label: 'Interest Rate / APR',
      type: 'range' as const,
      value: 5.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: '%',
      tooltip: 'The annualized cost of the loan',
      required: true,
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'range' as const,
      value: 5,
      min: 1,
      max: 7,
      step: 0.5,
      suffix: ' years',
      tooltip: 'The duration of the loan (typically 24, 36, 48, 60, 72, or 84 months)',
      required: true,
    },
    // Government, Dealer Fees & Controls
    {
      id: 'salesTax',
      label: 'Sales Tax',
      type: 'number' as const,
      value: 7,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: '%',
      tooltip: 'Your local or state vehicle sales tax rate',
      required: false,
    },
    {
      id: 'registrationFees',
      label: 'Registration & Title Fees',
      type: 'number' as const,
      value: 500,
      min: 0,
      max: 5000,
      step: 50,
      prefix: '$',
      tooltip: 'DMV-specific state licensing and registration costs',
      required: false,
    },
    {
      id: 'dealerFees',
      label: 'Dealer Documentation / Processing Fee',
      type: 'number' as const,
      value: 299,
      min: 0,
      max: 2000,
      step: 25,
      prefix: '$',
      tooltip: 'The fee dealerships charge to process paperwork (typically $150 to $800)',
      required: false,
    },
    {
      id: 'feeCapitalization',
      label: 'Fee Capitalization',
      type: 'select' as const,
      value: 'no',
      options: [
        { value: 'no', label: 'Pay Fees Upfront (Cash)' },
        { value: 'yes', label: 'Roll Fees into Loan' },
      ],
      tooltip: 'If "Roll Fees into Loan", taxes and fees are funded by the bank (increases loan principal). If "Pay Fees Upfront", fees must be paid out-of-pocket.',
      required: false,
    },
    // Optimization & Accelerated Tracks
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
      tooltip: 'Additional principal added voluntarily to the regular monthly check',
      helpText: 'Pay extra to save interest and get debt-free faster!',
      required: false,
    },
    {
      id: 'biWeeklyMode',
      label: 'Payment Mode',
      type: 'select' as const,
      value: 'monthly',
      options: [
        { value: 'monthly', label: 'Monthly Payments' },
        { value: 'biweekly', label: 'Accelerated Bi-Weekly' },
      ],
      tooltip: 'Accelerated Bi-Weekly splits the monthly payment in half and applies it every 2 weeks (26 half-payments = 13 full monthly payments per year)',
      helpText: 'Speed up your debt-free date with bi-weekly payments!',
      required: false,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🚗 Car Loan Calculator"
        description="Calculate your monthly car payments including sales tax, registration fees, and trade-in value. See total cost with amortization schedule."
        icon="🚗"
      >
        {/* 📖 How to Use Guide - SEO Optimized */}
        <div className="mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border border-green-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                How to Use This Car Loan Calculator
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculate your monthly car payments, estimate total cost including taxes and fees, and explore trade-in options with our comprehensive car loan calculator. Perfect for new car purchases, used cars, and dealer financing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Enter Vehicle Details</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Vehicle Price</strong> - Negotiated car price</li>
                    <li>• <strong>Down Payment</strong> - Cash upfront</li>
                    <li>• <strong>Trade-In Value</strong> - Your old car value</li>
                    <li>• <strong>Trade-In Owed</strong> - Remaining balance</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Add Fees & Taxes</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Sales Tax</strong> - State tax rate</li>
                    <li>• <strong>Registration Fees</strong> - DMV costs</li>
                    <li>• <strong>Dealer Fees</strong> - Processing fee</li>
                    <li>• <strong>Fee Capitalization</strong> - Roll into loan</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Set Loan Terms</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Interest Rate</strong> - APR from dealer</li>
                    <li>• <strong>Loan Term</strong> - Years to pay</li>
                    <li>• <strong>Payment Mode</strong> - Monthly/Bi-Weekly</li>
                    <li>• <strong>Extra Payment</strong> - Pay more monthly</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center text-lime-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Review Results</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Monthly Payment</strong> - Your obligation</li>
                    <li>• <strong>Total Interest</strong> - Finance cost</li>
                    <li>• <strong>Upfront Cash</strong> - Due at signing</li>
                    <li>• <strong>Payoff Date</strong> - When debt-free</li>
                  </ul>
                </div>
              </div>

              {/* SEO Content Section */}
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/50">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">💡</span>
                    <p className="text-sm text-green-800">
                      <strong>Pro Tip:</strong> Trading in your car can reduce your taxable amount and lower your sales tax. Our calculator automatically applies the trade-in tax shield to show you the real savings!
                    </p>
                  </div>
                </div>
                
                <div className="p-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Why Use Our Car Loan Calculator?</strong> Our free car loan calculator helps you estimate your monthly car payments, including sales tax, registration fees, and dealer documentation fees. Whether you're buying new or used, our tool provides accurate calculations with detailed amortization schedules. Compare different loan terms, interest rates, and trade-in options to make informed financial decisions.
                  </p>
                </div>
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
              showLoanTermButtons={true}
              showPaymentFrequency={true}
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