'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { calculators } from '@/data/calculators'
import { SearchBar } from '@/components/ui/SearchBar'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-gray-100 to-gray-900 border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo - Bigger Size */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="calcwisepro"
              width={80}
              height={80}
              className="w-20 h-20 transition-transform group-hover:scale-110 flex-shrink-0 drop-shadow-lg"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Home
            </Link>
            
            {/* Calculators Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1">
                Calculators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[700px] bg-white rounded-lg shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 max-h-[400px] overflow-y-auto scrollbar-thin">
                  <div className="grid grid-cols-3 gap-1">
                    {calculators.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/${calc.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <Image
                          src={`/icons/${calc.icon}.svg`}
                          alt={calc.name}
                          width={20}
                          height={20}
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">{calc.name}</div>
                          <div className="text-xs text-gray-500 capitalize">{calc.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block w-48">
            <SearchBar />
          </div>

          {/* Mobile Menu Button - FIXED CONTRAST FOR DARK GRADIENT BACKGROUND */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800/50 text-zinc-100 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down bg-white rounded-b-xl shadow-inner">
            <div className="space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="px-3 py-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">All Calculators</div>
                <div className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto scrollbar-thin">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/${calc.slug}`}
                      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm text-gray-700 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src={`/icons/${calc.icon}.svg`}
                        alt={calc.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 flex-shrink-0"
                      />
                      <span className="truncate">{calc.shortName}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                href="/about" 
                className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}