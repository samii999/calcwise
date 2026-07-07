import { useEffect, useState, useCallback, useRef } from 'react'

/**
 * Debounce hook - delays execution until after a specified delay
 * Useful for search inputs and real-time calculations
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Debounced callback hook - returns a debounced version of the callback
 * Useful for expensive calculations
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
        timeoutRef.current = null
      }, delay)
    },
    [callback, delay]
  )
}

/**
 * Throttle hook - limits how often a function can be called
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number = 300
): (...args: Parameters<T>) => void {
  const lastCallRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastCallRef.current >= limit) {
        lastCallRef.current = now
        callback(...args)
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now()
          callback(...args)
          timeoutRef.current = null
        }, limit - (now - lastCallRef.current))
      }
    },
    [callback, limit]
  )
}