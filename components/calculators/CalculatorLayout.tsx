import { ReactNode } from 'react'

interface CalculatorLayoutProps {
  children: ReactNode
  title: string
  description: string
  icon?: string
}

export function CalculatorLayout({
  children,
  title,
  description,
  icon = '📊',
}: CalculatorLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="text-5xl mb-3">{icon}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
          {title}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 md:p-8 transition-all hover:shadow-card-hover">
        {children}
      </div>
    </div>
  )
}