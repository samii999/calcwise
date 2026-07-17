import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata = {
  title: 'About Us - Free Financial Calculators | calcwisepro',
  description:
    'Learn about calcwisepro - our mission to provide free, accurate financial calculators for everyone. No signup, no hidden fees, just smart financial tools.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          About <span className="gradient-text">calcwisepro</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Smart Calculations, Smarter Decisions
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          At calcwisepro, we believe that everyone deserves access to accurate financial tools 
          without paying a penny. Our mission is to provide free, fast, and reliable 
          financial calculators that help you make smarter decisions about your money.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Whether you're planning to buy a home, save for retirement, or pay off debt, 
          our calculators are designed to give you instant, accurate results - no signup 
          required, no hidden fees, just pure financial clarity.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-semibold text-secondary">Fast & Accurate</h3>
          <p className="text-sm text-gray-500 mt-2">
            Real-time calculations with precise financial formulas
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-semibold text-secondary">100% Free</h3>
          <p className="text-sm text-gray-500 mt-2">
            No signup, no credit card, no hidden fees. Ever.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-semibold text-secondary">Private & Secure</h3>
          <p className="text-sm text-gray-500 mt-2">
            All calculations run in your browser. We never store your data.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-bold text-primary">20+</p>
            <p className="text-sm text-gray-500">Calculators</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-gray-500">Free</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-gray-500">Signup Required</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">∞</p>
            <p className="text-sm text-gray-500">Privacy</p>
          </div>
        </div>
      </div>

      {/* Contact Link */}
      <div className="text-center mt-8">
        <p className="text-gray-500">
          Have questions? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
        </p>
      </div>
    </div>
  )
}