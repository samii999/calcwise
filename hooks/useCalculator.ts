import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from './useDebounce'
import { useLocalStorage } from './useLocalStorage'

interface UseCalculatorOptions {
  debounceDelay?: number
  saveToLocalStorage?: boolean
  storageKey?: string
}

interface CalculatorState<T> {
  inputs: T
  results: any
  isCalculating: boolean
  error: string | null
}

/**
 * Generic calculator hook for all calculators
 */
export function useCalculator<T extends Record<string, any>>(
  initialInputs: T,
  calculateFn: (inputs: T) => any,
  options: UseCalculatorOptions = {}
) {
  const { debounceDelay = 300, saveToLocalStorage = true, storageKey = '' } = options

  // State
  const [inputs, setInputs] = useState<T>(initialInputs)
  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounced inputs for calculation
  const debouncedInputs = useDebounce(inputs, debounceDelay)

  // Local storage for saving inputs
  const [savedInputs, saveInputs, clearSavedInputs] = useLocalStorage<T>(
    storageKey || `calcwise_${Object.keys(initialInputs).join('_')}`,
    initialInputs
  )

  // Load saved inputs on mount
  useEffect(() => {
    if (saveToLocalStorage && storageKey) {
      // Check if saved inputs exist and are different from initial
      const hasSaved = Object.keys(savedInputs).some(
        (key) => savedInputs[key] !== initialInputs[key]
      )
      if (hasSaved) {
        setInputs(savedInputs)
      }
    }
  }, [])

  // Update a single input field
  const updateInput = useCallback(
    (key: keyof T, value: any) => {
      setInputs((prev) => {
        const newInputs = { ...prev, [key]: value }
        // Auto-save to localStorage
        if (saveToLocalStorage && storageKey) {
          saveInputs(newInputs)
        }
        return newInputs
      })
    },
    [saveToLocalStorage, storageKey, saveInputs]
  )

  // Update multiple inputs at once
  const updateInputs = useCallback(
    (newInputs: Partial<T>) => {
      setInputs((prev) => {
        const updated = { ...prev, ...newInputs }
        if (saveToLocalStorage && storageKey) {
          saveInputs(updated)
        }
        return updated
      })
    },
    [saveToLocalStorage, storageKey, saveInputs]
  )

  // Reset inputs to initial values
  const resetInputs = useCallback(() => {
    setInputs(initialInputs)
    if (saveToLocalStorage && storageKey) {
      clearSavedInputs()
    }
    setResults(null)
    setError(null)
  }, [initialInputs, saveToLocalStorage, storageKey, clearSavedInputs])

  // Calculate results
  const calculate = useCallback(() => {
    setIsCalculating(true)
    setError(null)

    try {
      const result = calculateFn(inputs)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed')
      setResults(null)
    } finally {
      setIsCalculating(false)
    }
  }, [inputs, calculateFn])

  // Auto-calculate when debounced inputs change
  useEffect(() => {
    calculate()
  }, [debouncedInputs, calculate])

  return {
    // State
    inputs,
    results,
    isCalculating,
    error,

    // Actions
    updateInput,
    updateInputs,
    resetInputs,
    calculate,

    // Local storage helpers
    hasSavedValues: saveToLocalStorage && storageKey,
    clearSaved: clearSavedInputs,
  }
}