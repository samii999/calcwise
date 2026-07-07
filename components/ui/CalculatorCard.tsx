import Link from 'next/link'
import Image from 'next/image'
import type { Calculator } from '@/data/calculators'

interface CalculatorCardProps {
  calculator: Calculator
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Link
      href={`/${calculator.slug}`}
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${calculator.color} 0%, ${calculator.color}dd 100%)` }}
      />
      
      {/* Top Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: calculator.color }}
      />

      <div className="relative">
        {/* Icon Container */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{ 
            backgroundColor: `${calculator.color}12`,
            boxShadow: `0 4px 20px ${calculator.color}30`
          }}
        >
          <Image
            src={`/icons/${calculator.icon}.svg`}
            alt={calculator.name}
            width={32}
            height={32}
            className="w-8 h-8"
            style={{ filter: `drop-shadow(0 2px 4px ${calculator.color}40)` }}
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 text-lg mb-2">
            {calculator.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {calculator.description}
          </p>
          
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span 
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: `${calculator.color}15`,
                color: calculator.color
              }}
            >
              {calculator.category}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {calculator.searchVolume} Volume
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors">
            <span>Calculate Now</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}