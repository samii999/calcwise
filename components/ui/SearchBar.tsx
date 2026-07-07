'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { calculators } from '@/data/calculators'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredCalculators = calculators.filter((calc) =>
    calc.name.toLowerCase().includes(query.toLowerCase()) ||
    calc.description.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-secondary"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-dropdown border border-gray-100 max-h-72 overflow-y-auto scrollbar-thin z-50">
          {filteredCalculators.length > 0 ? (
            <div className="p-2">
              {filteredCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  onClick={() => {
                    setQuery('')
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={`/icons/${calc.icon}.svg`}
                    alt={calc.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700">{calc.name}</div>
                    <div className="text-xs text-gray-400 truncate">{calc.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No calculators found
            </div>
          )}
        </div>
      )}
    </div>
  )
}