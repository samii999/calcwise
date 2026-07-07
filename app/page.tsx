import Image from 'next/image'
import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { CalculatorCard } from '@/components/ui/CalculatorCard'
import { calculators } from '@/data/calculators'
import { siteConfig } from '@/config/site'

export const metadata = {
  title: `${siteConfig.name} - Free Financial Calculators for Everyone`,
  description: siteConfig.description,
  openGraph: {
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Calculator Grid Section */}
      <section id="calculators" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
              All Financial Calculators
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose from {calculators.length} free financial calculators. No signup required.
              Get instant results right in your browser.
            </p>
          </div>

          {/* Calculator Grid - 20 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />
    </>
  )
}