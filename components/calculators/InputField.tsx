'use client'

import { useState, useEffect } from 'react'
import { Tooltip } from './Tooltip'

interface InputFieldProps {
  id: string
  label: string
  type: 'number' | 'text' | 'range'
  value: number | string | undefined
  onChange: (value: any) => void
  placeholder?: string
  min?: number
  max?: number
  step?: number
  suffix?: string
  prefix?: string
  helpText?: string
  tooltip?: string
  required?: boolean
  error?: string
  disabled?: boolean
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  min,
  max,
  step = 1,
  suffix,
  prefix,
  helpText,
  tooltip,
  required = false,
  error,
  disabled = false,
}: InputFieldProps) {
  // Local state to preserve user input while typing
  const [localValue, setLocalValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)

  // Sync local state with prop value when it changes from outside
  // Only update if the user is not currently focused on the input
  useEffect(() => {
    if (!isFocused) {
      if (value === undefined || value === null) {
        setLocalValue('')
      } else if (typeof value === 'string') {
        setLocalValue(value)
      } else {
        setLocalValue(String(value))
      }
    }
  }, [value, isFocused])

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setLocalValue(raw)

    // ✅ Allow empty field
    if (raw === '') {
      onChange(undefined)
      return
    }

    // ✅ Pass the raw string value to preserve user input exactly
    // This prevents automatic value changes while typing
    onChange(raw)
  }

  // Handle range input change
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value))
  }

  // ✅ Display value: use local state to preserve user input while typing
  const displayValue = localValue

  return (
    <div className="space-y-1.5">
      {/* Label with Tooltip */}
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <Tooltip content={tooltip}>
            <span className="text-xs text-primary hover:text-primary-dark cursor-help">
              ⓘ
            </span>
          </Tooltip>
        )}
      </div>

      {/* Input */}
      <div className="relative">
        {/* Prefix */}
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {prefix}
          </span>
        )}

        {/* Range Slider */}
        {type === 'range' ? (
          <div className="space-y-2">
            <input
              id={id}
              type="range"
              value={value}
              onChange={handleRangeChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${
                  ((Number(value || 0) - Number(min || 0)) / (Number(max || 100) - Number(min || 0))) * 100
                }%, #e5e7eb ${
                  ((Number(value || 0) - Number(min || 0)) / (Number(max || 100) - Number(min || 0))) * 100
                }%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{prefix}{min}{suffix}</span>
              <span className="font-semibold text-primary">{prefix}{value || 0}{suffix}</span>
              <span>{prefix}{max}{suffix}</span>
            </div>
          </div>
        ) : (
          /* Number Input */
          <>
            <input
              id={id}
              type="number"
              value={displayValue}
              onChange={handleNumberChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 transition-all
                ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}
                ${prefix ? 'pl-8' : ''}
                ${suffix ? 'pr-12' : ''}
                ${disabled ? 'bg-gray-50 opacity-60 cursor-not-allowed' : 'bg-white'}
              `}
            />
            {/* Suffix */}
            {suffix && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                {suffix}
              </span>
            )}
          </>
        )}
      </div>

      {/* Help Text / Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  )
}