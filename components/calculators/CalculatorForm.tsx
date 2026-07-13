'use client'

import { useState, useEffect, useCallback } from 'react'
import { InputField } from './InputField'
import { COUNTRIES } from '@/data/countries'

interface InputConfig {
  id: string
  label: string
  type: 'number' | 'text' | 'range' | 'select'
  value: any
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  tooltip?: string
  helpText?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

interface CalculatorFormProps {
  inputs: InputConfig[]
  onCalculate: (values: Record<string, any>) => void
  onCurrencyChange?: (currency: 'USD' | 'GBP' | 'CAD' | 'AUD') => void
  showAdvanced?: boolean
  showExtra?: boolean
  showCountry?: boolean
  showCurrency?: boolean
  showLoanTermButtons?: boolean
  showPaymentFrequency?: boolean
  showRepaymentType?: boolean
  showOriginationFee?: boolean
  showContributionFrequency?: boolean
  showContributionTiming?: boolean
  showCompoundingFrequency?: boolean
  showDebtArray?: boolean
  showStrategySelector?: boolean
  showModeToggle?: boolean
}

// Currency symbols
const CURRENCIES = {
  USD: { symbol: '$', label: 'USD' },
  GBP: { symbol: '£', label: 'GBP' },
  CAD: { symbol: 'C$', label: 'CAD' },
  AUD: { symbol: 'A$', label: 'AUD' },
}

// Payment Frequencies
const PAYMENT_FREQUENCIES = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'biweekly', label: 'Bi-Weekly' },
  { value: 'weekly', label: 'Weekly' },
]

// Compounding Frequencies
const COMPOUNDING_FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semi-annually', label: 'Semi-Annually' },
  { value: 'annually', label: 'Annually' },
]

export function CalculatorForm({
  inputs,
  onCalculate,
  onCurrencyChange,
  showAdvanced = false,
  showExtra = false,
  showCountry = false,
  showCurrency = false,
  showLoanTermButtons = false,
  showPaymentFrequency = false,
  showRepaymentType = false,
  showOriginationFee = false,
  showContributionFrequency = false,
  showContributionTiming = false,
  showCompoundingFrequency = false,
  showDebtArray = false,
  showStrategySelector = false,
  showModeToggle = false,
}: CalculatorFormProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {}
    inputs.forEach((input) => {
      initial[input.id] = input.value
    })
    return {
      ...initial,
      country: 'US',
      contributionFrequency: 'monthly',
      compoundingFrequency: 'monthly',
      contributionTiming: 'beginning',
      inflationRate: 0,
    }
  })

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [isExtraOpen, setIsExtraOpen] = useState(false)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')
  const [taxType, setTaxType] = useState<'percent' | 'flat'>('percent')
  const [isCustomTerm, setIsCustomTerm] = useState(false)
  const [repaymentType, setRepaymentType] = useState<'standard' | 'interest-only'>('standard')
  const [originationFeeType, setOriginationFeeType] = useState<'percent' | 'flat'>('percent')
  const [contributionTiming, setContributionTiming] = useState<'beginning' | 'end'>('beginning')
  const [modeToggle, setModeToggle] = useState<'historical' | 'forward'>('historical')

  const currencySymbol = CURRENCIES[currency].symbol

  // ✅ NEW: Handle country change - auto update property tax
  const handleCountryChange = useCallback((country: string) => {
    const countryData = COUNTRIES.find((c) => c.value === country)
    if (countryData) {
      const taxRate = countryData.taxRate / 100
      setValues((prev) => {
        const homePrice = prev.homePrice || 450000
        return {
          ...prev,
          country,
          propertyTax: Math.round(homePrice * taxRate * 100) / 100,
        }
      })
    }
  }, [])

  // Handle field changes
  const handleChange = useCallback((id: string, value: any) => {
    setValues((prev) => {
      const newValues = { ...prev, [id]: value }

      // Auto-update loan type rate
      if (id === 'loanType') {
        const loanTypeRates: Record<string, number> = {
          personal: 12.0,
          home: 8.5,
          car: 10.5,
          education: 9.0,
          custom: 11.0,
        }
        newValues.interestRate = loanTypeRates[value] || 11.0
      }

      // Auto-update down payment percentage for mortgage
      if (id === 'homePrice' || id === 'downPayment') {
        const homePrice = newValues.homePrice || 0
        const downPayment = newValues.downPayment || 0
        if (homePrice > 0) {
          newValues.downPaymentPercent = Math.round((downPayment / homePrice) * 1000) / 10
        }
        const percent = newValues.downPaymentPercent || 0
        newValues.pmi = percent < 20 ? 0.5 : 0
      }

      if (id === 'downPaymentPercent') {
        const homePrice = newValues.homePrice || 0
        const percent = newValues.downPaymentPercent || 0
        newValues.downPayment = Math.round((percent / 100) * homePrice)
        newValues.pmi = percent < 20 ? 0.5 : 0
      }

      // Auto-update contribution timing
      if (id === 'contributionTiming') {
        setContributionTiming(value)
      }

      // Auto-update repayment type
      if (id === 'repaymentType') {
        setRepaymentType(value)
      }

      // Auto-update mode toggle
      if (id === 'modeToggle') {
        setModeToggle(value)
      }

      return newValues
    })
  }, [])

  // Auto-calculate on every change
  useEffect(() => {
    onCalculate(values)
  }, [values, onCalculate])

  // Separate inputs by type
  const advancedInputs = inputs.filter((input) =>
    ['homeInsurance', 'hoaDues', 'pmi', 'originationFee', 'compoundingFrequency', 'inflationRate'].includes(input.id)
  )

  const extraInputs = inputs.filter((input) =>
    ['extraPayment', 'extraContribution'].includes(input.id)
  )

  const mainInputs = inputs.filter((input) =>
  !['homeInsurance', 'hoaDues', 'pmi', 'originationFee', 'compoundingFrequency', 'inflationRate', 'extraPayment', 'extraContribution'].includes(input.id)
)

  // Country input
  const countryInput = inputs.find((input) => input.id === 'country')

  // Check if this is a mortgage calculator
  const isMortgage = inputs.some((i) => i.id === 'homePrice' || i.id === 'downPayment')
  
  // Check if this is a loan calculator
  const isLoan = inputs.some((i) => i.id === 'loanAmount')
  
  // Check if this is a car loan calculator
  const isCarLoan = inputs.some((i) => i.id === 'vehiclePrice' || i.id === 'carPrice')
  
  // Check if this is a retirement calculator
  const isRetirement = inputs.some((i) => i.id === 'currentAge' || i.id === 'retirementAge')

  return (
    <div className="space-y-6">
      {/* ===== MAIN INPUTS ===== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
          <span className="text-primary">●</span> Basic Inputs
        </h3>

        {/* Currency Toggle */}
        {showCurrency && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500 mr-2">Currency:</span>
            {Object.entries(CURRENCIES).map(([key, curr]) => (
              <button
                key={key}
                onClick={() => {
                  const selectedCurrency = key as 'USD' | 'GBP' | 'CAD' | 'AUD'
                  setCurrency(selectedCurrency)
                  onCurrencyChange?.(selectedCurrency)
                }}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  currency === key
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {curr.label}
              </button>
            ))}
          </div>
        )}

        {/* Mode Toggle (Inflation Calculator) */}
        {showModeToggle && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mode <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setModeToggle('historical')
                  handleChange('modeToggle', 'historical')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                  modeToggle === 'historical'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Historical
              </button>
              <button
                onClick={() => {
                  setModeToggle('forward')
                  handleChange('modeToggle', 'forward')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                  modeToggle === 'forward'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Forward Projection
              </button>
            </div>
          </div>
        )}

        {/* ✅ Country Selector - Updated with handleCountryChange */}
        {showCountry && countryInput && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              value={values.country || 'US'}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
            >
              {COUNTRIES.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.flag} {country.label} ({country.taxRate}% avg tax)
                </option>
              ))}
            </select>
            {values.country && (
              <p className="text-xs text-gray-400 mt-1">
                {COUNTRIES.find((c) => c.value === values.country)?.note}
                <a
                  href={COUNTRIES.find((c) => c.value === values.country)?.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Verify official rate →
                </a>
              </p>
            )}
          </div>
        )}

        {/* Main Inputs */}
        {mainInputs.map((input) => {
          // Handle select input
          if (input.type === 'select') {
            return (
              <div key={input.id} className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                  value={values[input.id] || ''}
                  onChange={(e) => {
                    handleChange(input.id, e.target.value)
                    // Call custom onChange if provided
                    if ((input as any).onChange) {
                      (input as any).onChange(e.target.value)
                    }
                  }}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                >
                  {input.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {input.tooltip && (
                  <p className="text-xs text-gray-400">{input.tooltip}</p>
                )}
              </div>
            )
          }

          // Handle text input (for debt/budget text areas)
          if (input.type === 'text') {
            return (
              <div key={input.id} className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                  id={input.id}
                  value={values[input.id] || ''}
                  onChange={(e) => handleChange(input.id, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white font-mono text-sm"
                  placeholder={input.helpText || ''}
                />
                {input.tooltip && (
                  <p className="text-xs text-gray-400">{input.tooltip}</p>
                )}
              </div>
            )
          }

          // Handle range input
          if (input.type === 'range') {
            return (
              <InputField
                key={input.id}
                id={input.id}
                label={input.label}
                type="range"
                value={values[input.id]}
                onChange={(val) => handleChange(input.id, val)}
                min={input.min}
                max={input.max}
                step={input.step}
                suffix={input.suffix}
                tooltip={input.tooltip}
                helpText={input.helpText}
                required={input.required}
              />
            )
          }

          // Handle number input with currency
          const isCurrencyField = ['homePrice', 'downPayment', 'propertyTax', 'homeInsurance', 'hoaDues', 'extraPayment', 'extraContribution', 'loanAmount', 'vehiclePrice', 'carPrice', 'tradeInValue', 'currentSavings', 'retirementBalance', 'initialInvestment', 'principal', 'balance', 'targetAmount', 'currentBalance', 'annualSalary', 'salary'].includes(input.id)

          return (
            <InputField
              key={input.id}
              id={input.id}
              label={input.label}
              type="number"
              value={values[input.id]}
              onChange={(val) => handleChange(input.id, val)}
              min={input.min}
              max={input.max}
              step={input.step}
              prefix={isCurrencyField && showCurrency ? currencySymbol : input.prefix}
              suffix={input.suffix}
              tooltip={input.tooltip}
              helpText={input.helpText}
              required={input.required}
            />
          )
        })}

        {/* LOAN TERM - Segmented UI (for Mortgage, Loan, Car Loan) */}
        {(isMortgage || isLoan || isCarLoan) && showLoanTermButtons && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Loan Term <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {[3, 5, 7, 10, 15, 30].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setIsCustomTerm(false)
                    handleChange('loanTerm', term)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                    values.loanTerm === term && !isCustomTerm
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {term}-Yr
                </button>
              ))}
              <button
                onClick={() => {
                  setIsCustomTerm(!isCustomTerm)
                  if (!isCustomTerm) {
                    handleChange('loanTerm', 10)
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                  isCustomTerm
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Custom
              </button>
            </div>

            {isCustomTerm && (
              <div className="mt-3">
                <InputField
                  id="loanTermCustom"
                  label="Custom Term"
                  type="range"
                  value={values.loanTerm}
                  onChange={(val) => handleChange('loanTerm', val)}
                  min={1}
                  max={40}
                  step={1}
                  suffix=" years"
                  tooltip="Choose any term from 1 to 40 years"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== ADVANCED OPTIONS ===== */}
      {showAdvanced && advancedInputs.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-2 transition-all w-full text-left"
          >
            {isAdvancedOpen ? '▼ Hide Advanced Options' : '▶ Show Advanced Options 🚀'}
          </button>

          {isAdvancedOpen && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
                <span className="text-primary">●</span> Advanced Inputs
              </h3>

              {/* Payment Frequency (Loan, Car Loan) */}
              {showPaymentFrequency && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payment Frequency
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {PAYMENT_FREQUENCIES.map((freq) => (
                      <button
                        key={freq.value}
                        onClick={() => handleChange('paymentFrequency', freq.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                          values.paymentFrequency === freq.value
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compounding Frequency (Compound Interest, Savings Goal) */}
              {showCompoundingFrequency && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Compounding Frequency
                  </label>
                  <select
                    value={values.compoundingFrequency}
                    onChange={(e) => handleChange('compoundingFrequency', e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                  >
                    {COMPOUNDING_FREQUENCIES.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Repayment Type (Loan) */}
              {showRepaymentType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Repayment Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setRepaymentType('standard')
                        handleChange('repaymentType', 'standard')
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        repaymentType === 'standard'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Standard (Amortized)
                    </button>
                    <button
                      onClick={() => {
                        setRepaymentType('interest-only')
                        handleChange('repaymentType', 'interest-only')
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        repaymentType === 'interest-only'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Interest-Only
                    </button>
                  </div>
                </div>
              )}

              {/* Origination Fee (Loan) */}
              {showOriginationFee && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Origination Fee</label>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => setOriginationFeeType('percent')}
                        className={`px-2 py-0.5 text-xs rounded transition-all ${
                          originationFeeType === 'percent'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setOriginationFeeType('flat')}
                        className={`px-2 py-0.5 text-xs rounded transition-all ${
                          originationFeeType === 'flat'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                  <InputField
                    id="originationFee"
                    label=""
                    type="number"
                    value={values.originationFee}
                    onChange={(val) => handleChange('originationFee', val)}
                    min={0}
                    max={originationFeeType === 'percent' ? 10 : 10000}
                    step={originationFeeType === 'percent' ? 0.1 : 100}
                    prefix={originationFeeType === 'flat' ? currencySymbol : undefined}
                    suffix={originationFeeType === 'percent' ? '%' : '$'}
                    tooltip="Origination fee charged by lender"
                  />
                </div>
              )}

              {/* Contribution Frequency (Compound Interest, Retirement) */}
              {showContributionFrequency && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contribution Frequency
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleChange('contributionFrequency', 'weekly')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        values.contributionFrequency === 'weekly'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => handleChange('contributionFrequency', 'bi-weekly')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        values.contributionFrequency === 'bi-weekly'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Bi-Weekly
                    </button>
                    <button
                      onClick={() => handleChange('contributionFrequency', 'monthly')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        values.contributionFrequency === 'monthly'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => handleChange('contributionFrequency', 'annually')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        values.contributionFrequency === 'annually'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Annually
                    </button>
                  </div>
                </div>
              )}

              {/* Contribution Timing (Compound Interest) */}
              {showContributionTiming && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contribution Timing
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setContributionTiming('beginning')
                        handleChange('contributionTiming', 'beginning')
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        contributionTiming === 'beginning'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Beginning of Period
                    </button>
                    <button
                      onClick={() => {
                        setContributionTiming('end')
                        handleChange('contributionTiming', 'end')
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        contributionTiming === 'end'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      End of Period
                    </button>
                  </div>
                </div>
              )}

              {/* Strategy Selector (Debt Payoff) */}
              {showStrategySelector && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payoff Strategy
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleChange('strategy', 'avalanche')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        values.strategy === 'avalanche'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Avalanche (Highest Interest)
                    </button>
                    <button
                      onClick={() => handleChange('strategy', 'snowball')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                        values.strategy === 'snowball'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Snowball (Smallest Balance)
                    </button>
                  </div>
                </div>
              )}

              {/* Inflation Rate (Compound Interest) */}
              {showCompoundingFrequency && advancedInputs.some(input => input.id === 'inflationRate') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Annual Inflation Rate
                  </label>
                  <InputField
                    id="inflationRate"
                    label=""
                    type="range"
                    value={values.inflationRate || 0}
                    onChange={(val) => handleChange('inflationRate', val)}
                    min={0}
                    max={10}
                    step={0.1}
                    suffix="%"
                    tooltip="Expected annual inflation rate to calculate real purchasing power"
                  />
                </div>
              )}

              {/* Advanced Input Fields */}
              {advancedInputs
                .filter((input) => input.id !== 'propertyTax' && input.id !== 'originationFee' && input.id !== 'compoundingFrequency' && input.id !== 'inflationRate')
                .map((input) => (
                  <InputField
                    key={input.id}
                    id={input.id}
                    label={input.label}
                    type="number"
                    value={values[input.id]}
                    onChange={(val) => handleChange(input.id, val)}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    prefix={input.prefix}
                    suffix={input.suffix}
                    tooltip={input.tooltip}
                    helpText={input.helpText}
                  />
                ))}
            </div>
          )}
        </>
      )}

      {/* ===== EXTRA PAYMENT / CONTRIBUTION ===== */}
      {showExtra && extraInputs.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setIsExtraOpen(!isExtraOpen)}
            className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-2 transition-all w-full text-left"
          >
            {isExtraOpen ? '▼ Hide Extra Payments' : '▶ What if I pay extra? 💰'}
          </button>

          {isExtraOpen && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {extraInputs.map((input) => (
                <InputField
                  key={input.id}
                  id={input.id}
                  label={input.label}
                  type="number"
                  value={values[input.id]}
                  onChange={(val) => handleChange(input.id, val)}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  prefix={showCurrency ? currencySymbol : input.prefix}
                  suffix={input.suffix}
                  tooltip={input.tooltip}
                  helpText={input.helpText}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== DEBT ARRAY (Debt Payoff) ===== */}
      {showDebtArray && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <span className="text-primary">●</span> Debts
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Add your debts below</p>
          </div>
        </div>
      )}

      {/* ===== DISCLAIMER ===== */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-4 mt-2">
        <p>
          💡 All calculations are estimates. Rates vary by lender and location.
          Please verify with official sources for accurate numbers.
        </p>
      </div>
    </div>
  )
}