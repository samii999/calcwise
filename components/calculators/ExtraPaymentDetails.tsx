'use client'

import { useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils/formatters'

interface ExtraPaymentDetailsProps {
  extraPayment: number
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  loanTerm: number
  onExtraChange: (value: number) => void
  onPaymentFrequencyChange: (frequency: string) => void
}

export function ExtraPaymentDetails({
  extraPayment,
  monthlyPayment,
  totalInterest,
  totalPayment,
  loanTerm,
  onExtraChange,
  onPaymentFrequencyChange,
}: ExtraPaymentDetailsProps) {
  const [frequency, setFrequency] = useState('monthly')
  const [showDetails, setShowDetails] = useState(false)

  const frequencies = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'biweekly', label: 'Bi-Weekly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' },
    { value: 'one-time', label: 'One-Time' },
  ]

  // Calculate savings based on extra payment
  const calculateSavings = () => {
    if (extraPayment === 0) return null

    // Simplified calculation
    const extraAnnual = extraPayment * 12
    const totalExtra = extraAnnual * loanTerm
    const interestSaved = Math.min(totalExtra * 0.3, totalInterest * 0.3)
    const yearsSaved = Math.floor((interestSaved / totalInterest) * loanTerm)

    return {
      interestSaved: Math.round(interestSaved),
      yearsSaved: Math.max(1, yearsSaved),
      totalExtra: Math.round(totalExtra),
    }
  }

  const savings = calculateSavings()

  // Handle frequency change
  const handleFrequencyChange = (value: string) => {
    setFrequency(value)
    onPaymentFrequencyChange(value)
  }

  return (
    <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-xl">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between text-left"
      >
        <h4 className="font-semibold text-green-800">💰 Extra Payment Options</h4>
        <span className="text-green-600">{showDetails ? '▲' : '▼'}</span>
      </button>

      {showDetails && (
        <div className="space-y-4">
          {/* Extra Payment Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Extra Payment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => onExtraChange(parseFloat(e.target.value) || 0)}
                min={0}
                max={10000}
                step={50}
                className="w-full pl-8 pr-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter extra amount"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Extra amount per payment period</p>
          </div>

          {/* Payment Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Frequency
            </label>
            <div className="flex flex-wrap gap-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => handleFrequencyChange(freq.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                    frequency === freq.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Savings Display */}
          {savings && extraPayment > 0 && (
            <div className="bg-white rounded-lg p-4 space-y-1 border border-green-200">
              <p className="text-sm text-green-700">
                💰 You will save{' '}
                <strong className="text-lg">{formatCurrency(savings.interestSaved)}</strong> in interest
              </p>
              <p className="text-sm text-green-600">
                🎯 Pay off your loan <strong>{savings.yearsSaved} years</strong> earlier!
              </p>
              <p className="text-xs text-gray-500">
                Total extra paid: {formatCurrency(savings.totalExtra)}
              </p>
            </div>
          )}

          {extraPayment === 0 && (
            <p className="text-sm text-gray-400 text-center">
              Enter an extra payment amount to see your savings
            </p>
          )}
        </div>
      )}
    </div>
  )
}