'use client'

import { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false)
    }
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false)
      }
    }
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isVisible])

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800',
  }

  return (
    <span className="relative inline-flex items-center">
      {/* Trigger */}
      <span
        ref={triggerRef}
        className="inline-flex items-center cursor-help text-primary hover:text-primary-dark transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        role="button"
        tabIndex={0}
        aria-label="More information"
      >
        {children}
      </span>

      {/* Tooltip */}
      {isVisible && (
        <>
          {/* Backdrop for click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Tooltip Content */}
          <div
            ref={tooltipRef}
            className={`absolute z-50 ${positionClasses[position]} w-72 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-xl animate-fade-in`}
            role="tooltip"
            aria-live="polite"
          >
            <div className="leading-relaxed">{content}</div>
            <div
              className={`absolute ${arrowClasses[position]} border-8 border-transparent`}
            />
          </div>
        </>
      )}
    </span>
  )
}