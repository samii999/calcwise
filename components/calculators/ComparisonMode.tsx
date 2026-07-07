'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils/formatters'

interface ComparisonModeProps {
  currentResults: any
  alternativeResults: any
  onCompare: () => void
  onReset?: () => void
}

export function ComparisonMode({
  currentResults,
  alternativeResults,
  onCompare,
  onReset,
}: ComparisonModeProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    if (!isVisible) {
      onCompare()
    }
    setIsVisible(!isVisible)
  }

  const handleReset = () => {
    setIsVisible(false)
    if (onReset) onReset()
  }

  // If no results, show compare button
  if (!currentResults || !alternativeResults) {
    return (
      <button
        onClick={handleToggle}
        className="w-full py-3 px-4 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-all"
      >
        📊 Compare: 15-Year vs 30-Year
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-secondary">📊 Comparison</h4>
        <button
          onClick={handleReset}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕ Close
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Current (30-Year) */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h5 className="font-medium text-gray-600 text-sm">30-Year Fixed</h5>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(currentResults.monthlyPayment || 0)}
          </p>
          <p className="text-xs text-gray-400">Monthly Payment</p>
          <hr className="my-2" />
          <p className="text-sm">
            Interest: <span className="font-medium">{formatCurrency(currentResults.totalInterest || 0)}</span>
          </p>
          <p className="text-sm">
            Total: <span className="font-medium">{formatCurrency(currentResults.totalPayment || 0)}</span>
          </p>
        </div>

        {/* Alternative (15-Year) */}
        <div className="bg-primary/5 rounded-xl p-4 border-2 border-primary">
          <h5 className="font-medium text-primary text-sm">15-Year Fixed</h5>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(alternativeResults.monthlyPayment || 0)}
          </p>
          <p className="text-xs text-gray-400">Monthly Payment</p>
          <hr className="my-2" />
          <p className="text-sm">
            Interest: <span className="font-medium">{formatCurrency(alternativeResults.totalInterest || 0)}</span>
          </p>
          <p className="text-sm">
            Total: <span className="font-medium">{formatCurrency(alternativeResults.totalPayment || 0)}</span>
          </p>
          {currentResults.totalInterest && alternativeResults.totalInterest && (
            <p className="text-xs text-green-600 font-medium mt-1">
              ✅ Save {formatCurrency(currentResults.totalInterest - alternativeResults.totalInterest)} in interest!
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleToggle}
        className="w-full py-2 text-sm text-primary hover:text-primary-dark font-medium"
      >
        🔄 Refresh Comparison
      </button>
    </div>
  )
}