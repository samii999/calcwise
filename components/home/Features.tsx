export function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Calculate as you type. No submit button needed. Get results in real-time.',
    },
    {
      icon: '💰',
      title: '100% Free',
      description: 'No signup, no hidden fees, no credit card required. All calculators are completely free.',
    },
    {
      icon: '🔒',
      title: 'Your Data Stays Private',
      description: 'All calculations run in your browser. We never store or share your financial data.',
    },
    {
      icon: '📊',
      title: 'Beautiful Charts',
      description: 'Visualize your finances with interactive pie charts, bar graphs, and amortization tables.',
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Perfectly optimized for phones, tablets, and desktops. Calculate anywhere, anytime.',
    },
    {
      icon: '🧮',
      title: '20+ Calculators',
      description: 'From mortgages to retirement, we have all the financial calculators you need.',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
            Why Choose <span className="gradient-text">CalcWise</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Everything you need to make smarter financial decisions. Fast, free, and private.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#calculators"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Explore All Calculators
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}