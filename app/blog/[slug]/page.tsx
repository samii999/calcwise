import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, blogPosts } from '@/data/blogs'
import { siteMetadata } from '@/data/metadata'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: `${post.title} | ${siteMetadata.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteMetadata.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate || post.publishedDate,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params  // ✅ FIX: await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Convert markdown-like content to HTML-like structure
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    let html = []
    let inTable = false
    let tableRows = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Handle tables
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true
          tableRows = []
        }
        
        // Skip separator lines
        if (line.includes('---')) {
          continue
        }

        const cells = line.split('|').filter(cell => cell.trim() !== '')
        tableRows.push(cells)
      } else {
        if (inTable) {
          html.push(
            <div key={`table-${i}`} className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-100' : ''}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-2 text-sm"
                        >
                          {cell.trim()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          inTable = false
          tableRows = []
        }

        // Handle headers
        if (line.startsWith('## ')) {
          html.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>)
        } else if (line.startsWith('### ')) {
          html.push(<h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('### ', '')}</h3>)
        } else if (line.startsWith('# ')) {
          html.push(<h1 key={i} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.replace('# ', '')}</h1>)
        }
        // Handle lists
        else if (line.startsWith('- **')) {
          const match = line.match(/- \*\*(.+?)\*\*:?(.*)/)
          if (match) {
            html.push(
              <li key={i} className="ml-4 mb-2">
                <strong>{match[1]}</strong>{match[2] && `: ${match[2]}`}
              </li>
            )
          }
        } else if (line.startsWith('- ')) {
          html.push(<li key={i} className="ml-4 mb-2">{line.replace('- ', '')}</li>)
        }
        // Handle bold text
        else if (line.includes('**') && !line.startsWith('#') && !line.startsWith('-')) {
          const parts = line.split('**')
          html.push(
            <p key={i} className="text-gray-700 mb-4 leading-relaxed">
              {parts.map((part, idx) => 
                idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
              )}
            </p>
          )
        }
        // Handle links
        else if (line.includes('[') && line.includes('](')) {
          const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/g)
          if (linkMatch) {
            html.push(
              <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                {line.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, idx) => {
                  const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
                  if (match) {
                    return (
                      <Link
                        key={idx}
                        href={match[2]}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {match[1]}
                      </Link>
                    )
                  }
                  return part
                })}
              </p>
            )
          } else {
            html.push(<p key={i} className="text-gray-700 mb-4 leading-relaxed">{line}</p>)
          }
        }
        // Handle regular paragraphs
        else if (line.trim() !== '') {
          html.push(<p key={i} className="text-gray-700 mb-4 leading-relaxed">{line}</p>)
        }
      }
    }

    // Handle any remaining table
    if (inTable && tableRows.length > 0) {
      html.push(
        <div key={`table-final`} className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {tableRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-100' : ''}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-2 text-sm"
                    >
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return html
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-blue-200 text-sm">
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-blue-200 text-sm">• {post.readTime} min read</span>
          </div>

         <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{post.description}</p>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Financial Expert</p>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Calculators */}
            {post.relatedCalculators.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {post.relatedCalculators.map((calcSlug) => (
                    <Link
                      key={calcSlug}
                      href={`/${calcSlug}`}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <p className="font-medium text-gray-900">
                        {calcSlug
                          .split('-')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')
                          .replace('Calculator', '')
                          .trim()} Calculator
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}