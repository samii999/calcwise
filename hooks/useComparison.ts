import { useState, useCallback } from 'react'

interface ComparisonState<T> {
  scenario1: T | null
  scenario2: T | null
  isComparing: boolean
}

export function useComparison<T>() {
  const [state, setState] = useState<ComparisonState<T>>({
    scenario1: null,
    scenario2: null,
    isComparing: false,
  })

  // Set scenario 1 (current/base)
  const setScenario1 = useCallback((data: T) => {
    setState((prev) => ({
      ...prev,
      scenario1: data,
      isComparing: prev.scenario2 !== null,
    }))
  }, [])

  // Set scenario 2 (alternative)
  const setScenario2 = useCallback((data: T) => {
    setState((prev) => ({
      ...prev,
      scenario2: data,
      isComparing: prev.scenario1 !== null,
    }))
  }, [])

  // Clear both scenarios
  const clearComparison = useCallback(() => {
    setState({
      scenario1: null,
      scenario2: null,
      isComparing: false,
    })
  }, [])

  // Get difference between two scenarios
  const getDifference = useCallback(
    (key: keyof T): number => {
      if (!state.scenario1 || !state.scenario2) return 0
      const val1 = state.scenario1[key] as number
      const val2 = state.scenario2[key] as number
      return Number(val2) - Number(val1)
    },
    [state.scenario1, state.scenario2]
  )

  // Get percentage difference
  const getPercentageDifference = useCallback(
    (key: keyof T): number => {
      if (!state.scenario1 || !state.scenario2) return 0
      const val1 = state.scenario1[key] as number
      const val2 = state.scenario2[key] as number
      if (val1 === 0) return 0
      return ((Number(val2) - Number(val1)) / Number(val1)) * 100
    },
    [state.scenario1, state.scenario2]
  )

  // Check which scenario is better (lower is better for costs, higher for savings)
  const getBetterScenario = useCallback(
    (key: keyof T, lowerIsBetter: boolean = true): 'scenario1' | 'scenario2' | null => {
      if (!state.scenario1 || !state.scenario2) return null
      const val1 = state.scenario1[key] as number
      const val2 = state.scenario2[key] as number
      
      if (lowerIsBetter) {
        return val1 <= val2 ? 'scenario1' : 'scenario2'
      } else {
        return val1 >= val2 ? 'scenario1' : 'scenario2'
      }
    },
    [state.scenario1, state.scenario2]
  )

  return {
    // State
    scenario1: state.scenario1,
    scenario2: state.scenario2,
    isComparing: state.isComparing,
    
    // Actions
    setScenario1,
    setScenario2,
    clearComparison,
    
    // Helpers
    getDifference,
    getPercentageDifference,
    getBetterScenario,
  }
}