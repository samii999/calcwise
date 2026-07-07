'use client'

import { useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/utils/formatters'

interface AffordabilitySectionProps {
  homePrice: number
  interestRate: number
  loanTerm: number
  onAffordabilityChange?: (result: any) => void
}

export function AffordabilitySection({
  homePrice,
  interestRate,
  loanTerm,
  onAffordabilityChange,
}: AffordabilitySectionProps) {
  const [income, setIncome] = useState(100000)
  const [debt, setDebt] = useState(500)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const monthlyIncome = income / 12
    const maxPayment = monthlyIncome * 0.28 // 28% DTI rule
    const monthlyRate = interestRate / 100 / 12
    const totalPayments = loanTerm * 12

    // Calculate max affordable home price
    let maxLoan = 0
    if (monthlyRate === 0) {
      maxLoan = maxPayment * totalPayments
    } else {
      maxLoan =
        (maxPayment * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))
    }

    const maxHomePrice = maxLoan / 0.8 // 20% down payment assumed
    const isAffordable = homePrice <= maxHomePrice
    const dtiRatio = ((maxPayment + debt) / monthlyIncome) * 100

    const newResult = {
      maxHomePrice: Math.round(maxHomePrice),
      maxLoanAmount: Math.round(maxLoan),
      maxMonthlyPayment: Math.round(maxPayment),
      isAffordable,
      dtiRatio: Math.round(dtiRatio * 10) / 10,
      monthlyIncome: Math.round(monthlyIncome),
      monthlyDebt: debt,
    }

    setResult(newResult)
    if (onAffordabilityChange) {
      onAffordabilityChange(newResult)
    }
  }, [income, debt, homePrice, interestRate, loanTerm, onAffordabilityChange])

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
      <h4 className="font-semibold text-blue-800 mb-3">🏠 Affordability Check</h4>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-600 font-medium mb-1">
            Annual Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="100000"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600 font-medium mb-1">
            Monthly Debt
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={debt}
              onChange={(e) => setDebt(parseFloat(e.target.value) || 0)}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="500"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-3 p-3 bg-white rounded-lg space-y-1">
          <p className="text-sm">
            Max Affordable Home Price:{' '}
            <strong className="text-primary">{formatCurrency(result.maxHomePrice)}</strong>
          </p>
          <p className="text-sm">
            Max Monthly Payment:{' '}
            <strong className="text-primary">{formatCurrency(result.maxMonthlyPayment)}</strong>
          </p>
          <p className="text-sm">
            DTI Ratio:{' '}
            <strong className={result.dtiRatio > 36 ? 'text-red-600' : 'text-green-600'}>
              {result.dtiRatio}%
            </strong>
          </p>
          <p className="text-sm">
            Status:{' '}
            <span className={result.isAffordable ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {result.isAffordable ? '✅ You can afford this home!' : '❌ This home is above your budget'}
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Based on 28% DTI ratio with 20% down payment
          </p>
        </div>
      )}
    </div>
  )
}