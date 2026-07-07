import Link from 'next/link'
import { calculators } from '@/data/calculators'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/mortgage-calculator" className="btn-secondary">
            Mortgage Calculator
          </Link>
          <Link href="/loan-calculator" className="btn-secondary">
            Loan Calculator
          </Link>
        </div>

        {/* All Calculators */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            All Calculators
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {calculators.slice(0, 10).map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="text-sm text-gray-600 hover:text-primary transition-colors px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {calc.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}