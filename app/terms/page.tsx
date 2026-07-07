import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata = {
  title: 'Terms of Use - CalcWise',
  description:
    'Read CalcWise terms of use. Understand the terms and conditions for using our free financial calculators.',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
          Terms of Use
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">1. Acceptance of Terms</h2>
            <p>
              By using CalcWise, you agree to these Terms of Use. If you do not agree, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">2. Free Service</h2>
            <p>
              CalcWise provides free financial calculators. No payment is required for any of our tools. 
              We reserve the right to modify or discontinue any feature without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">3. Accuracy of Calculations</h2>
            <p>
              While we strive for accuracy, our calculators provide estimates only. They should not be 
              used as the sole basis for financial decisions. Always consult with a qualified financial 
              professional for personalized advice.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3 text-sm text-amber-800">
              ⚠️ <strong>Disclaimer:</strong> All calculations are for informational purposes only. 
              Results may vary based on your specific situation. We are not responsible for any 
              financial decisions made based on these calculations.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">4. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
              <li>Use the calculators responsibly</li>
              <li>Not misuse or abuse our services</li>
              <li>Not attempt to disrupt our website</li>
              <li>Verify critical calculations independently</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">5. Intellectual Property</h2>
            <p>
              All content on CalcWise, including text, graphics, code, and design, is owned by CalcWise 
              and protected by copyright laws. You may not reproduce, distribute, or modify our content 
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">6. Advertising</h2>
            <p>
              CalcWise displays advertisements to keep our service free. We use Google AdSense and 
              other ad networks. We are not responsible for the content of advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">7. Limitation of Liability</h2>
            <p>
              CalcWise is provided "as is" without warranties of any kind. We are not liable for any 
              damages arising from the use of our calculators or website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">8. Changes to Terms</h2>
            <p>
              We may update these Terms of Use at any time. Continued use of our website constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the United States. Any disputes shall be resolved 
              in accordance with these laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary mb-3">10. Contact</h2>
            <p>
              For questions about these Terms, please{' '}
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