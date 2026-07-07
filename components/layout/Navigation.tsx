'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { headerNav } from '@/data/navigation'
import { calculators } from '@/data/calculators'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close calculators dropdown on route change
  useEffect(() => {
    setIsCalculatorsOpen(false)
  }, [pathname])

  // Close calculators dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.calculators-dropdown')) {
        setIsCalculatorsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {headerNav.map((item) => {
          if (item.href === '/#calculators') {
            return (
              <div key={item.href} className="relative calculators-dropdown">
                <button
                  onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    isCalculatorsOpen || pathname.includes('calculator')
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Calculators
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCalculatorsOpen && (
                  <div className="absolute left-0 mt-2 w-[600px] bg-white rounded-lg shadow-dropdown border border-gray-100 py-3 px-2 max-h-[400px] overflow-y-auto scrollbar-thin z-50">
                    {/* ✅ Grid Layout: 3 columns on large screens, 2 on medium */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                      {calculators.map((calc) => (
                        <Link
                          key={calc.slug}
                          href={`/${calc.slug}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                          onClick={() => setIsCalculatorsOpen(false)}
                        >
                          <span className="text-xl flex-shrink-0">{calc.icon}</span>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-700 truncate">{calc.name}</div>
                            <div className="text-xs text-gray-400 capitalize">{calc.category}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href) ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4 px-4 shadow-lg animate-slide-down max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              {headerNav.map((item) => {
                if (item.href === '/#calculators') {
                  return (
                    <div key={item.href} className="space-y-1">
                      <button
                        onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-primary"
                      >
                        <span>Calculators</span>
                        <svg className={`w-4 h-4 transition-transform ${isCalculatorsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isCalculatorsOpen && (
                        <div className="pl-4 space-y-1 max-h-60 overflow-y-auto scrollbar-thin">
                          {/* ✅ Mobile grid: 2 columns */}
                          <div className="grid grid-cols-2 gap-1">
                            {calculators.map((calc) => (
                              <Link
                                key={calc.slug}
                                href={`/${calc.slug}`}
                                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm"
                                onClick={() => {
                                  setIsOpen(false)
                                  setIsCalculatorsOpen(false)
                                }}
                              >
                                <span className="text-xl flex-shrink-0">{calc.icon}</span>
                                <span className="text-gray-700 truncate">{calc.shortName}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                      isActive(item.href) ? 'text-primary' : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}