import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata = {
  title: 'Privacy Policy - CalcWise',
  description:
    'Read CalcWise privacy policy. We respect your privacy and never store your financial data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">1. Introduction</h2>
            <p>
              At CalcWise, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your personal information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect minimal information:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>Anonymous Usage Data:</strong> We use Google Analytics to understand how visitors use our site. This data is anonymized.</li>
              <li><strong>Ad Data:</strong> We use Google AdSense, which may collect cookies for personalized ads.</li>
              <li><strong>No Personal Data:</strong> We do not collect any personal information such as your name, email, or financial data.</li>
              <li><strong>No Account Required:</strong> You can use all calculators without creating an account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>To improve our website and calculators</li>
              <li>To display relevant advertisements</li>
              <li>To analyze usage patterns (anonymously)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">4. Cookies</h2>
            <p>
              CalcWise uses cookies to enhance your browsing experience. These include:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
              <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
              <li><strong>Ad Cookies:</strong> Used by Google AdSense to show relevant ads</li>
            </ul>
            <p className="mt-2">
              You can control cookie settings in your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">5. Data Security</h2>
            <p>
              All calculations run directly in your browser. We never store your financial data 
              on our servers. Your privacy is completely protected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">6. Third-Party Services</h2>
            <p>
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
              <li><strong>Google AdSense:</strong> For advertising</li>
              <li><strong>Google Analytics:</strong> For anonymous usage tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
              <li>Request information about your data</li>
              <li>Opt out of personalized ads</li>
              <li>Clear cookies in your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CalcWise. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}