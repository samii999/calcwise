import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to read and write to localStorage
 * Returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Read from localStorage
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Write to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          window.dispatchEvent(new Event('local-storage'))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        window.dispatchEvent(new Event('local-storage'))
      }
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      if (e instanceof StorageEvent) {
        if (e.key === key && e.newValue !== null) {
          setStoredValue(JSON.parse(e.newValue))
        } else if (e.key === key && e.newValue === null) {
          setStoredValue(initialValue)
        }
      } else {
        setStoredValue(readValue())
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage' as any, handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage' as any, handleStorageChange)
    }
  }, [key, initialValue, readValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Hook to save calculator inputs to localStorage
 */
export function useCalculatorStorage<T>(calculatorId: string, initialValues: T) {
  const [storedValues, setStoredValues, clearStoredValues] = useLocalStorage<T>(
    `calcwisepro_${calculatorId}`,
    initialValues
  )

  const saveValues = useCallback(
    (values: T | ((val: T) => T)) => {
      setStoredValues(values)
    },
    [setStoredValues]
  )

  const resetValues = useCallback(() => {
    clearStoredValues()
  }, [clearStoredValues])

  return {
    values: storedValues,
    saveValues,
    resetValues,
    hasSavedValues: storedValues !== initialValues,
  }
}