'use client'

import { SchemaMarkup, createFAQSchema } from './SchemaMarkup'
import { faqs } from '@/data/faqs'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
  title?: string
}

export function FAQSchema({ faqs, title = 'Frequently Asked Questions' }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const schema = createFAQSchema(faqs)

  return (
    <>
      <SchemaMarkup schema={schema} />
      
      <section className="mt-12" aria-label={title}>
        <h2 className="text-2xl font-bold text-secondary mb-6">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-card border border-gray-100"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="font-semibold text-secondary mb-2" itemProp="name">
                {faq.question}
              </h3>
              <div className="text-gray-600" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// Helper: Get FAQs for any calculator
export function getFAQsForCalculator(calculatorSlug: string): FAQItem[] {
  return faqs[calculatorSlug] || []
}
