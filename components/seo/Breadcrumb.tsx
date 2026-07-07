'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createBreadcrumbSchema } from './SchemaMarkup'
import { SchemaMarkup } from './SchemaMarkup'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showSchema?: boolean
}

export function Breadcrumb({ items, showSchema = true }: BreadcrumbProps) {
  const pathname = usePathname()

  // Generate schema
  const schema = showSchema ? createBreadcrumbSchema(items) : null

  // If only one item, don't show breadcrumb (just show current page)
  if (items.length <= 1) {
    return null
  }

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}
      
      <nav aria-label="Breadcrumb" className="text-sm py-3">
        <ol className="flex flex-wrap items-center gap-1 text-gray-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            
            return (
              <li key={item.url} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="text-gray-300 mx-1">/</span>
                )}
                
                {isLast ? (
                  <span className="font-medium text-primary" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// Helper: Generate breadcrumb items for any calculator page
export function getCalculatorBreadcrumb(calculatorName: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: calculatorName, url: `/${calculatorName.toLowerCase().replace(/\s+/g, '-')}` },
  ]
}

// Helper: Generate breadcrumb items for static pages
export function getStaticBreadcrumb(pageName: string): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: pageName, url: `/${pageName.toLowerCase().replace(/\s+/g, '-')}` },
  ]
}