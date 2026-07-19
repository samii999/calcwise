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
    window.location.href = `mailto:um558899@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
          {/* Email */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📧
              </div>
              <div>
                <h3 className="font-semibold text-secondary text-sm uppercase tracking-wider text-gray-400">Email</h3>
                <a 
                  href="mailto:um558899@gmail.com" 
                  className="text-primary hover:underline text-sm font-medium"
                >
                  um558899@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔗
              </div>
              <div>
                <h3 className="font-semibold text-secondary text-sm uppercase tracking-wider text-gray-400">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/muhammad-usman-004b363a4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Muhammad Usman
                </a>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⏱️
              </div>
              <div>
                <h3 className="font-semibold text-secondary text-sm uppercase tracking-wider text-gray-400">Response Time</h3>
                <p className="text-sm text-gray-700 font-medium">Within 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                👨‍💻
              </div>
              <div>
                <h3 className="font-semibold text-secondary text-sm uppercase tracking-wider text-gray-400">Developer</h3>
                <p className="text-sm text-gray-700 font-medium">Muhammad Usman</p>
                <a
                  href="https://www.linkedin.com/in/muhammad-usman-004b363a4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
                <p className="text-gray-500">Thank you for reaching out. We'll get back to you soon.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="mt-6 text-primary hover:underline font-medium"
                >
                  Send another message →
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
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 hover:bg-white focus:bg-white"
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
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 hover:bg-white focus:bg-white"
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
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    placeholder="How can we help you? Tell us about your question, suggestion, or feedback..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-3.5 px-6 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 text-base"
                >
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

      {/* FAQ Section */}
      <div className="mt-16 bg-white rounded-2xl p-8 shadow-card border border-gray-100">
        <h2 className="text-2xl font-bold text-secondary text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-secondary">How do I use the calculators?</h4>
            <p className="text-sm text-gray-500">Simply enter your numbers in the input fields and click Calculate. Each calculator has a guide at the top to help you get started.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-secondary">Are the calculators free?</h4>
            <p className="text-sm text-gray-500">Yes! All calculators on CalcWise Pro are completely free to use with no registration required.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-secondary">How accurate are the calculations?</h4>
            <p className="text-sm text-gray-500">Our calculations use standard financial formulas and are updated with current rates. However, always verify with official sources for final decisions.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-secondary">Can I suggest a new calculator?</h4>
            <p className="text-sm text-gray-500">Absolutely! We'd love to hear your suggestions. Send us a message using the form above.</p>
          </div>
        </div>
      </div>
    </div>
  )
}