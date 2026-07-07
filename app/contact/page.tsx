'use client'

import { useState } from 'react'
import { siteConfig } from '@/config/site'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Contact from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="text-2xl mb-2">📧</div>
            <h3 className="font-semibold text-secondary">Email</h3>
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline text-sm">
              {siteConfig.email}
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="text-2xl mb-2">🐦</div>
            <h3 className="font-semibold text-secondary">Twitter</h3>
            <a
              href={`https://twitter.com/${siteConfig.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              @{siteConfig.social.twitter}
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="text-2xl mb-2">💡</div>
            <h3 className="font-semibold text-secondary">Response Time</h3>
            <p className="text-sm text-gray-500">We aim to respond within 24-48 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
                <p className="text-gray-500">Thank you for reaching out. We'll get back to you soon.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-4 text-primary hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="w-full btn-primary">
                  Send Message ✉️
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our privacy policy. Your data will not be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}