import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import type { PageMetadata, CalculatorMetadata } from '@/types/seo'

// ═══════════════════════════════════════════════════════════════════════════
// 📌 TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

export interface FAQ {
  question: string
  answer: string
}

export interface Breadcrumb {
  name: string
  item: string
  position: number
}

export interface ArticleSchema {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  image: string
}

export interface TrustBadge {
  label: string
  value: string
  icon?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 SITE-WIDE METADATA | SEO + GEO + AEO Optimized
// ═══════════════════════════════════════════════════════════════════════════

export const siteMetadata = {
  name: 'CalcWisePro',
  url: 'https://www.calcwisepro.me',
  title: 'CalcWisePro – Free Financial Calculators | Mortgage, Loan, Retirement & More',
  description:
    'Free online financial calculators trusted by 100,000+ users in USA, UK, Canada & Australia. Calculate mortgage payments, loan EMI, retirement savings, debt payoff, compound interest and more. ⚡ Instant results. 🔒 No signup required. 🆓 100% free.',
  keywords: [
    // Primary Keywords
    'free financial calculator',
    'financial calculator online',
    'online calculator USA',
    'best financial calculator 2026',
    'most accurate loan calculator',
    'top rated mortgage calculator',
    'free calculator no signup',
    'financial calculator comparison',

    // Category Keywords
    'mortgage calculator',
    'loan calculator',
    'retirement calculator',
    'compound interest calculator',
    'debt payoff calculator',
    'investment calculator',
    'budget calculator',
    'financial planning tools',
    'personal finance calculator',
    'home affordability calculator',
    'refinance calculator',
    'emergency fund calculator',
    'salary calculator',
    'net worth calculator',
    'inflation calculator',
    'student loan calculator',
    'car loan calculator',
    'amortization calculator',
    'rent vs buy calculator',
    'simple interest calculator',

    // Brand & Trust
    'calcwisepro',
    'calcwisepro calculators',
    'trusted financial tools',
    'accurate financial calculators',
    'professional grade calculators',
    'fintech tools 2026',
    'financial planning suite',

    // Geo Keywords
    'usa financial calculator',
    'uk financial calculator',
    'canada financial calculator',
    'australia financial calculator',
    'international finance tools',
    'global financial planning',
    'multi-currency calculator',
    'usd gbp cad aud calculator',

    // User Intent
    'how to calculate mortgage',
    'what is my loan payment',
    'how much can I borrow',
    'retirement planning tools',
    'financial freedom calculators',
    'money management tools',
    'wealth building calculators',
    'debt reduction strategies',
    'savings growth calculator',
    'investment return estimator',
    'cagr calculator online',
    'roi calculator free',
    'emi calculator online',
    'home loan eligibility',
    'credit score impact calculator',

    // Search Trends 2026
    'financial calculator 2026',
    'best finance tools 2026',
    'ai financial calculators',
    'smart money tools',
    'digital financial planning',
    'online finance suite',
  ],
  locale: 'en_US',
  alternateLocales: ['en_GB', 'en_CA', 'en_AU', 'en_IN', 'en_IE', 'en_NZ'],
  twitterHandle: '@calcwisepro',
  ogImage: 'https://www.calcwisepro.me/og-image.png',
  favicon: '/favicon.ico',
  geo: {
    primary: 'US',
    regions: ['US', 'GB', 'CA', 'AU', 'IN', 'IE', 'NZ'],
    currencies: ['USD', 'GBP', 'CAD', 'AUD', 'EUR', 'INR'],
  },
  social: {
    twitter: '@calcwisepro',
    linkedin: 'https://www.linkedin.com/company/calcwisepro',
    github: 'https://github.com/calcwisepro',
  },
  contact: {
    email: 'um558899@gmail.com',
    responseTime: '24-48 hours',
  },
  trust: {
    users: '100,000+',
    calculators: '21',
    rating: '4.9/5',
    uptime: '99.9%',
    responseTime: '24 hours',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 STATIC PAGES METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'CalcWisePro – Free Financial Calculators | Mortgage, Loan, Retirement & More',
    description:
      '20+ free financial calculators for mortgage, loans, retirement, debt payoff, compound interest, and more. ⚡ Instant results. 🔒 No signup. 🆓 100% free. Trusted by 100,000+ users in USA, UK, Canada & Australia.',
    keywords: [
      'free financial calculator',
      'best financial calculator 2026',
      'online calculator USA',
      'mortgage calculator',
      'loan calculator',
      'retirement calculator',
      'compound interest calculator',
      'debt payoff calculator',
      'investment calculator',
      'budget calculator',
      'financial planning tools',
      'personal finance calculator',
      'free calculator no signup',
      'calcwisepro',
      'financial planning suite',
      'money management tools',
    ],
    ogTitle: 'CalcWisePro – 20+ Free Financial Calculators for Smart Money Decisions',
    ogDescription:
      'Calculate mortgage payments, loans, retirement savings, and more. 100% free. No signup required. Trusted by 100,000+ users worldwide.',
  },
  about: {
    title: 'About CalcWisePro – Free Financial Calculators for USA, UK & Canada',
    description:
      'CalcWisePro provides 20+ free, fast, and accurate financial calculators for users in USA, UK, Canada, and Australia. No ads, no signup, no data stored. Our mission: smarter financial decisions for everyone.',
    keywords: [
      'about calcwisepro',
      'free financial tools USA',
      'personal finance calculators no signup',
      'financial calculator mission',
      'who created calcwisepro',
      'calcwisepro team',
      'financial literacy tools',
      'free money calculators',
    ],
    ogTitle: 'About CalcWisePro – Free Smart Financial Tools for Everyone',
    ogDescription: 'Learn about our mission to give everyone access to professional-grade financial calculators — completely free, no signup, no data stored.',
  },
  contact: {
    title: 'Contact CalcWisePro – Questions, Feedback & Calculator Requests',
    description: 'Have a question, found a bug, or want to suggest a new calculator? Contact the CalcWisePro team. We respond to every message within 24 hours.',
    keywords: [
      'contact calcwisepro',
      'financial calculator support',
      'suggest a calculator',
      'calcwisepro feedback',
      'calcwisepro help',
      'calculator request',
      'bug report financial calculator',
      'calcwisepro team',
    ],
    ogTitle: 'Contact Us – CalcWisePro',
    ogDescription: 'Reach out to the CalcWisePro team. We love feedback and calculator suggestions.',
  },
  privacy: {
    title: 'Privacy Policy – CalcWisePro | Your Data Stays on Your Device',
    description: 'CalcWisePro never stores, sells, or shares your financial data. All calculations run entirely in your browser. Read our full privacy policy.',
    keywords: [
      'calcwisepro privacy policy',
      'financial calculator privacy',
      'no data stored calculator',
      'gdpr compliant calculators',
      'privacy first financial tools',
      'calcwisepro data policy',
      'secure financial calculators',
    ],
    ogTitle: 'Privacy Policy – CalcWisePro',
    ogDescription: 'Your financial data never leaves your device. CalcWisePro never stores or shares your information.',
  },
  terms: {
    title: 'Terms of Use – CalcWisePro Financial Calculators',
    description: 'Terms and conditions for using CalcWisePro free financial calculators. Our tools provide estimates for informational purposes — always consult a licensed financial advisor for major decisions.',
    keywords: [
      'calcwisepro terms of use',
      'financial calculator disclaimer',
      'calcwisepro legal',
      'calculator liability',
      'terms and conditions',
      'calcwisepro terms',
    ],
    ogTitle: 'Terms of Use – CalcWisePro',
    ogDescription: 'Read our terms and conditions for using CalcWisePro free financial calculator tools.',
  },
  blog: {
    title: 'Financial Blog – Expert Tips, Guides & Insights | CalcWisePro',
    description:
      'Expert financial guides, tips, and insights on investing, real estate, loans, and personal finance. Learn how to make smarter financial decisions with CalcWisePro. Stay updated with the latest money trends in 2026.',
    keywords: [
      'financial blog',
      'investment tips',
      'personal finance guides',
      'real estate advice',
      'loan tips',
      'financial planning',
      'money management',
      'calcwisepro blog',
      'finance advice 2026',
      'saving money tips',
      'retirement planning blog',
      'mortgage guides',
      'debt management strategies',
      'compound interest explained',
      'financial literacy',
      'wealth building strategies',
      'smart money habits',
      'financial freedom tips',
      'investing for beginners',
      'financial education',
    ],
    ogTitle: 'Financial Blog – Expert Tips & Guides | CalcWisePro',
    ogDescription: 'Expert financial guides, tips, and insights on investing, real estate, loans, and personal finance. Learn smarter money management.',
  },
  'sitemap': {
    title: 'Sitemap | CalcWisePro',
    description: 'Complete sitemap of CalcWisePro financial calculators and pages. Find all our free financial tools and blog articles.',
    keywords: [
      'calcwisepro sitemap',
      'financial calculator sitemap',
      'site navigation calcwisepro',
      'all calculators list',
    ],
    ogTitle: 'Sitemap | CalcWisePro',
    ogDescription: 'Complete sitemap of CalcWisePro financial calculators and pages.',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 CALCULATOR PAGES METADATA | 21 CALCULATORS
// ═══════════════════════════════════════════════════════════════════════════

export const calculatorMetadata: Record<string, CalculatorMetadata> = {

  // ──── 1. MORTGAGE CALCULATOR ────
  mortgage: {
    slug: 'mortgage-calculator',
    category: 'Home & Real Estate',
    title: 'Mortgage Calculator – Monthly Payment, Interest & Amortization Schedule | CalcWisePro',
    description: 'Free mortgage calculator. Enter home price, down payment, interest rate, and loan term to instantly calculate monthly payment, total interest paid, and full amortization schedule. Used by homebuyers in USA, UK & Canada.',
    keywords: [
      'mortgage calculator','mortgage payment calculator','home loan calculator','monthly mortgage payment calculator',
      'mortgage interest calculator','amortization schedule calculator','how much is my mortgage payment',
      'mortgage calculator USA','mortgage calculator UK','mortgage calculator Canada','free mortgage calculator online',
      'mortgage calculator with amortization','calculate mortgage payment','30 year mortgage calculator',
      '15 year mortgage calculator','what will my mortgage payment be','mortgage estimator','mortgage calculator no signup',
      'best mortgage calculator 2026','mortgage affordability','home purchase calculator','PITI calculator',
      'principal and interest calculator','mortgage comparison','refinance mortgage calculator','home loan EMI',
      'mortgage amortization schedule','monthly payment breakdown','real estate calculator','home loan calculator USA',
    ],
    ogTitle: 'Free Mortgage Calculator – Instant Monthly Payment + Full Amortization Schedule',
    ogDescription: 'Calculate your exact monthly mortgage payment and see a complete amortization breakdown. Free, instant, no signup — trusted by USA & UK homebuyers.',
    faqs: [
      { question: 'How do I calculate my monthly mortgage payment?', answer: 'Your monthly mortgage payment is calculated using the loan amount, annual interest rate, and loan term. The formula is: M = P[r(1+r)^n]/[(1+r)^n-1], where P is principal, r is monthly rate, and n is number of payments. Our mortgage calculator does this instantly.' },
      { question: 'What is included in a monthly mortgage payment?', answer: 'A typical monthly mortgage payment includes principal (reducing your loan balance), interest (lender charge), property taxes, and homeowner\'s insurance — collectively known as PITI. Some loans also include PMI if your down payment is below 20%.' },
      { question: 'How much mortgage can I afford?', answer: 'Most lenders follow the 28/36 rule: your mortgage payment should not exceed 28% of gross monthly income, and total debts should not exceed 36%. On a $80,000 annual salary, that means a maximum mortgage payment of about $1,867/month.' },
      { question: 'What is an amortization schedule?', answer: 'An amortization schedule shows every monthly payment over your loan term, broken down into principal and interest. In early years, most of your payment goes to interest. Over time, more goes to principal.' },
      { question: 'What is the difference between a 15-year and 30-year mortgage?', answer: 'A 15-year mortgage has higher monthly payments but significantly lower total interest paid and builds equity faster. A 30-year mortgage has lower monthly payments but costs much more in total interest over the life of the loan.' },
      { question: 'What is PMI and when do I pay it?', answer: 'Private Mortgage Insurance (PMI) is required when your down payment is less than 20%. It protects the lender, not you. PMI costs 0.5%-1% of the loan amount annually and can be removed once you reach 20% equity.' },
      { question: 'What are current mortgage rates in 2026?', answer: 'In 2026, 30-year fixed mortgage rates in the US are around 6.5-7%, while in the UK they are around 4.5-5.5%. Rates vary by lender, credit score, and location. Use our calculator to test different rates.' },
    ],
  },

  // ──── 2. LOAN CALCULATOR ────
  loan: {
    slug: 'loan-calculator',
    category: 'Loans & Debt',
    title: 'Loan Calculator – Monthly Payment, Total Interest & Payoff Schedule | CalcWisePro',
    description: 'Free loan calculator for personal loans, auto loans, student loans, and more. Enter loan amount, interest rate, and term to instantly calculate monthly payment, total interest, and full repayment schedule.',
    keywords: [
      'loan calculator','personal loan calculator','loan payment calculator','monthly loan payment calculator',
      'loan interest calculator','loan amortization calculator','EMI calculator','how much will my loan payment be',
      'free loan calculator USA','loan repayment calculator','personal loan monthly payment','loan payoff calculator',
      'calculate loan payment','installment loan calculator','what is my loan payment','loan calculator no signup',
      'best loan calculator 2026','loan affordability','debt consolidation calculator','loan comparison',
      'loan EMI calculator','personal loan rates','loan term calculator','loan interest rate calculator',
      'monthly installment calculator','loan calculator with extra payments','simple loan calculator',
    ],
    ogTitle: 'Free Loan Calculator – Monthly Payments, Total Interest & Repayment Schedule',
    ogDescription: 'Calculate your exact monthly loan payment and total interest instantly. Works for personal loans, auto loans, and more. Free, no signup.',
    faqs: [
      { question: 'How do I calculate my monthly loan payment?', answer: 'Monthly loan payment is calculated using: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan amount, r is the monthly interest rate (annual rate / 12), and n is total number of months.' },
      { question: 'What is a good interest rate for a personal loan in 2026?', answer: 'In the USA, personal loan rates range from 6% to 36%. With excellent credit (720+), rates are 6%-12%. Average credit (640-699) typically gets 14%-24%.' },
      { question: 'What happens if I make extra loan payments?', answer: 'Extra payments go directly toward principal, reducing total interest paid and shortening your loan term. Even one extra payment per year can save thousands on a large loan.' },
      { question: 'What is the difference between secured and unsecured loans?', answer: 'Secured loans require collateral (like a house or car) and typically offer lower rates. Unsecured loans have no collateral but higher rates. Our calculator works for both.' },
      { question: 'How does loan term affect total interest?', answer: 'A longer loan term lowers monthly payments but significantly increases total interest paid. For example, a $30,000 loan at 7% for 3 years costs $3,351 in interest; for 5 years it costs $5,642.' },
    ],
  },

  // ──── 3. COMPOUND INTEREST CALCULATOR ────
  'compound-interest': {
    slug: 'compound-interest-calculator',
    category: 'Savings & Investment',
    title: 'Compound Interest Calculator – See How Your Money Grows Over Time | CalcWisePro',
    description: 'Free compound interest calculator with yearly growth chart. Enter principal, interest rate, compounding frequency, and time to see exactly how your savings or investments grow. Daily, monthly, or annual compounding.',
    keywords: [
      'compound interest calculator','compound interest formula calculator','how does compound interest work',
      'investment growth calculator','future value calculator','savings growth calculator','daily compound interest calculator',
      'monthly compound interest calculator','compound interest USA','free compound interest calculator',
      'compound interest with monthly deposits','how to calculate compound interest','compound interest chart',
      'savings calculator with interest','investment compound calculator','compound interest no signup',
      'best compound interest calculator 2026','Rule of 72 calculator','savings growth projection',
      'compound interest rate calculator','exponential growth calculator','wealth calculator',
      'compound interest for retirement','savings account calculator','investment return calculator',
    ],
    ogTitle: 'Free Compound Interest Calculator – Watch Your Money Grow with Visual Chart',
    ogDescription: 'See exactly how compound interest grows your savings or investments over time. Year-by-year growth chart included. Free, instant, no signup.',
    faqs: [
      { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the original principal AND accumulated interest from previous periods. Unlike simple interest, it grows exponentially — your money earns interest on interest.' },
      { question: 'What is the compound interest formula?', answer: 'A = P(1 + r/n)^(nt), where A is final amount, P is principal, r is annual rate, n is compounding frequency per year, t is time in years. Example: $10,000 at 7% compounded annually for 10 years = $19,672.' },
      { question: 'What is the Rule of 72?', answer: 'Divide 72 by your annual interest rate to estimate doubling time. At 6%, money doubles in 12 years. At 9%, it doubles in 8 years. At 12%, it doubles in 6 years.' },
      { question: 'How much will $10,000 grow with compound interest?', answer: '$10,000 at 7% annual compound interest grows to: $14,026 after 5 years, $19,672 after 10 years, $38,697 after 20 years, and $76,123 after 30 years.' },
      { question: 'What is the best compounding frequency?', answer: 'More frequent compounding means more growth. Daily compounding gives slightly more than monthly, and monthly gives more than annual. However, the difference is small at typical rates.' },
      { question: 'How does inflation affect compound interest?', answer: 'Inflation reduces the real value of your money. If you earn 6% interest but inflation is 3%, your real return is only 3%. Our calculator can adjust for inflation to show real purchasing power.' },
    ],
  },

  // ──── 4. CAR LOAN CALCULATOR ────
  'car-loan': {
    slug: 'car-loan-calculator',
    category: 'Loans & Debt',
    title: 'Car Loan Calculator – Monthly Auto Payment & True Cost of Ownership | CalcWisePro',
    description: 'Free car loan calculator. Enter vehicle price, down payment, trade-in value, interest rate, and loan term to calculate exact monthly auto loan payment, total interest, and true cost of ownership.',
    keywords: [
      'car loan calculator','auto loan calculator','car payment calculator','monthly car payment calculator',
      'auto loan interest calculator','vehicle loan calculator','car financing calculator',
      'how much will my car payment be','car loan calculator USA','free auto loan calculator',
      'used car loan calculator','new car loan calculator','car loan with trade in calculator',
      'auto loan monthly payment','car payment estimator','calculate car payment online','car loan calculator no signup',
      'best car loan calculator 2026','auto loan rates','car finance calculator','car loan comparison',
      'car loan with sales tax','car loan amortization','dealership financing calculator',
    ],
    ogTitle: 'Free Car Loan Calculator – Exact Monthly Payment & True Cost Before You Buy',
    ogDescription: 'Calculate your monthly car payment, total interest, and true cost of ownership before you visit the dealership. Free, instant.',
    faqs: [
      { question: 'What is a good car loan interest rate in 2026?', answer: 'Average car loan rates in 2026: 5%-8% for new cars, 7%-12% for used cars. Rates below 6% are excellent. Credit unions often offer lower rates than dealerships.' },
      { question: 'How much should I put down on a car?', answer: 'At least 20% for new cars and 10% for used cars. This prevents being underwater on your loan since cars depreciate quickly.' },
      { question: 'What car loan term should I choose?', answer: 'Most experts recommend 48-60 months as the sweet spot. Shorter terms save interest; longer terms (72-84 months) risk negative equity and cost more overall.' },
      { question: 'How does trade-in value affect my car loan?', answer: 'A higher trade-in value reduces the amount you need to finance, lowering your monthly payment and total interest. Our calculator includes trade-in value and any remaining loan balance on the trade-in.' },
      { question: 'Should I pay off my car loan early?', answer: 'Yes, if there is no prepayment penalty. Paying early saves interest and frees up monthly cash flow. Use our extra payment option to see the impact.' },
    ],
  },

  // ──── 5. RETIREMENT CALCULATOR ────
  retirement: {
    slug: 'retirement-calculator',
    category: 'Retirement',
    title: 'Retirement Calculator – 401k, IRA & Social Security | Are You on Track? | CalcWisePro',
    description: 'Free retirement savings calculator. Enter age, current savings, monthly contributions, and expected return to see if you are on track. Includes 401k, IRA, Roth IRA, and Social Security projections with healthcare costs.',
    keywords: [
      'retirement calculator','401k calculator','retirement savings calculator','how much do I need to retire',
      'retirement planning calculator','IRA calculator','Roth IRA calculator','retirement income calculator',
      'am I saving enough for retirement','retirement calculator USA','free retirement calculator',
      'FIRE calculator','4% rule calculator','retirement nest egg calculator','when can I retire calculator',
      'Social Security retirement calculator','early retirement calculator','retirement savings by age',
      'comprehensive retirement calculator','retirement planning USA','retirement fund calculator',
      'retirement withdrawal calculator','401k employer match','traditional vs roth 401k','retirement readiness',
      'retirement healthcare costs','retirement tax planning','retirement lifestyle calculator',
      'best retirement calculator 2026','pension calculator','retirement income projection',
    ],
    ogTitle: 'Free Retirement Calculator – Are You on Track to Retire Comfortably?',
    ogDescription: 'Enter your savings and contributions to see your projected retirement balance. Includes 401k, IRA, Social Security, and healthcare cost estimates.',
    faqs: [
      { question: 'How much money do I need to retire?', answer: 'The 4% rule: save 25x your annual expenses. Spending $50,000/year needs $1.25 million. Spending $80,000/year needs $2 million. Our calculator gives a personalized estimate.' },
      { question: 'How much should I have saved by age?', answer: 'Fidelity benchmark: 1x salary by 30, 3x by 40, 6x by 50, 8x by 60, 10x by 67. On $60,000 salary: $60k by 30, $180k by 40, $600k by 67.' },
      { question: 'What is the difference between Traditional and Roth 401k?', answer: 'Traditional 401k: pre-tax contributions, taxed withdrawals. Roth 401k: after-tax contributions, tax-free withdrawals. Choose Traditional if you expect lower taxes in retirement; Roth if higher.' },
      { question: 'How does Social Security affect retirement savings?', answer: 'Social Security replaces about 40% of pre-retirement income for average earners. Average benefit in 2026 is about $1,800/month. Subtract this from your income need to find how much savings must generate.' },
      { question: 'What is the 4% rule?', answer: 'The 4% rule says you can withdraw 4% of your retirement savings in year one, then adjust for inflation each year, and your money should last 30+ years. Our calculator uses this rule with inflation adjustments.' },
      { question: 'How do healthcare costs affect retirement planning?', answer: 'Healthcare is a major retirement expense. Medicare starts at 65, but doesn\'t cover everything. Our calculator includes healthcare cost projections to ensure you save enough for medical expenses in retirement.' },
      { question: 'What is the FIRE movement?', answer: 'Financial Independence, Retire Early (FIRE) is a lifestyle movement where people save aggressively (50-70% of income) to retire in their 30s or 40s. Our calculator includes early retirement options.' },
    ],
  },

  // ──── 6. CREDIT CARD PAYOFF CALCULATOR ────
  'credit-card': {
    slug: 'credit-card-payoff-calculator',
    category: 'Loans & Debt',
    title: 'Credit Card Payoff Calculator – Find Your Exact Debt-Free Date | CalcWisePro',
    description: 'Free credit card payoff calculator. Enter balance, APR, and monthly payment to see exactly when you will be debt free and total interest paid. See how increasing payments dramatically accelerates payoff.',
    keywords: [
      'credit card payoff calculator','credit card debt calculator','how long to pay off credit card',
      'credit card interest calculator','minimum payment calculator credit card','credit card payoff date calculator',
      'pay off credit card faster','credit card APR calculator','free credit card payoff calculator',
      'when will I pay off my credit card','credit card debt calculator USA','credit card payoff planner',
      'credit card payoff no signup','best credit card payoff calculator 2026','credit card debt strategy',
      'credit card minimum payment','credit card interest saving','credit card payoff snowball',
      'credit card debt avalanche','credit card balance transfer calculator','credit card debt consolidation',
    ],
    ogTitle: 'Free Credit Card Payoff Calculator – See Your Exact Debt-Free Date',
    ogDescription: 'Enter your balance and monthly payment to see exactly when you will be debt free. See how $50 more per month saves thousands.',
    faqs: [
      { question: 'How long does it take to pay off credit card debt?', answer: 'A $5,000 balance at 20% APR paying only the minimum takes over 20 years and costs $7,700 in interest. Paying $250/month pays it off in 2 years and costs only $820 in interest.' },
      { question: 'Should I pay more than the minimum on my credit card?', answer: 'Always. Minimum payments maximize interest paid to the lender. On a $3,000 balance at 20% APR, minimum payments take 14+ years. Paying $150/month pays it off in 2 years.' },
      { question: 'What is the best strategy to pay off credit card debt?', answer: 'Debt Avalanche (highest APR first) saves the most money. Debt Snowball (smallest balance first) is better for motivation. Use our calculator to compare both.' },
      { question: 'What is a balance transfer and does it help?', answer: 'A balance transfer moves debt to a new card with a lower or 0% introductory APR. It can save interest, but watch out for transfer fees (usually 3-5%). Our calculator can show the impact of a lower rate.' },
      { question: 'Should I use my emergency fund to pay off credit cards?', answer: 'Generally, only if you have stable income and the debt is at a high APR. Keeping some emergency cash is important. Consider a balance transfer instead.' },
    ],
  },

  // ──── 7. INVESTMENT CALCULATOR ────
  investment: {
    slug: 'investment-calculator',
    category: 'Savings & Investment',
    title: 'Investment Calculator – ROI, CAGR & Portfolio Growth | CalcWisePro',
    description: 'Free investment return calculator. Calculate ROI, CAGR, and inflation-adjusted returns. See how your portfolio grows with monthly contributions over any time period. Visual growth chart included.',
    keywords: [
      'investment calculator','investment return calculator','ROI calculator','CAGR calculator',
      'portfolio growth calculator','stock market return calculator','investment growth calculator USA',
      'how much will my investment be worth','free investment calculator','investment calculator with monthly contributions',
      'future investment value calculator','investment profit calculator','annual return calculator',
      'inflation adjusted return calculator','S&P 500 return calculator','investment calculator no signup',
      'best investment calculator 2026','stock calculator','mutual fund calculator','real estate investment calculator',
      'investment analysis tool','capital gains calculator','portfolio tracker','dividend reinvestment calculator',
    ],
    ogTitle: 'Free Investment Calculator – ROI, CAGR & Inflation-Adjusted Growth Chart',
    ogDescription: 'Calculate investment returns and CAGR with a year-by-year visual chart. Includes inflation adjustment and monthly contribution options.',
    faqs: [
      { question: 'What is ROI?', answer: 'ROI = (Current Value - Cost) / Cost x 100. Investing $10,000 that grows to $15,000 = 50% ROI.' },
      { question: 'What is CAGR?', answer: 'Compound Annual Growth Rate: the steady annual rate taking an investment from beginning to ending value. More useful than average return for comparing investments.' },
      { question: 'How much does $500/month invested grow to?', answer: '$500/month at 7% annual return: $41,000 after 5 years, $104,000 after 10 years, $303,000 after 20 years, $681,000 after 30 years.' },
      { question: 'How do fees and taxes affect investment returns?', answer: 'Management fees, trading costs, and taxes on capital gains can significantly reduce net returns. Our calculator includes options for annual maintenance fees and tax rates to show true net profit.' },
      { question: 'Should I reinvest dividends?', answer: 'Reinvesting dividends can significantly increase total returns due to compound growth. Our calculator includes a toggle for dividend reinvestment to show the difference.' },
    ],
  },

  // ──── 8. DEBT PAYOFF CALCULATOR ────
  'debt-payoff': {
    slug: 'debt-payoff-calculator',
    category: 'Loans & Debt',
    title: 'Debt Payoff Calculator – Snowball vs Avalanche Method Comparison | CalcWisePro',
    description: 'Free debt payoff calculator. Enter multiple debts and compare Debt Snowball vs Debt Avalanche methods side by side. See your exact debt-free date, total interest saved, and month-by-month payoff plan.',
    keywords: [
      'debt payoff calculator','debt snowball calculator','debt avalanche calculator',
      'snowball vs avalanche calculator','how to pay off debt fast','multiple debt payoff calculator',
      'debt free date calculator','debt consolidation calculator','debt payoff planner',
      'free debt payoff calculator USA','become debt free calculator','debt reduction calculator',
      'pay off all debt calculator','debt payoff calculator no signup','best debt payoff calculator 2026',
      'debt management tool','debt strategy calculator','debt snowball method','debt avalanche method',
      'debt freedom calculator','loan payoff calculator','credit card debt payoff','student loan debt payoff',
    ],
    ogTitle: 'Free Debt Payoff Calculator – Snowball vs Avalanche | See Your Debt-Free Date',
    ogDescription: 'Compare Snowball vs Avalanche debt payoff strategies. See exactly when you will be debt free and total interest saved.',
    faqs: [
      { question: 'What is the Debt Snowball method?', answer: 'Pay debts from smallest to largest balance. Provides quick psychological wins and motivation. Popularized by Dave Ramsey.' },
      { question: 'What is the Debt Avalanche method?', answer: 'Pay debts from highest to lowest interest rate. Saves the most money in total interest paid.' },
      { question: 'Should I pay off debt or invest?', answer: 'If debt rate is above 7%, pay it off first. Below 4%, consider investing simultaneously. Always get the full 401k employer match regardless.' },
      { question: 'How much extra should I pay each month?', answer: 'Even $50 extra per month can dramatically shorten your payoff time. Our calculator shows the impact of any extra payment amount you can afford.' },
      { question: 'What is the difference between debt consolidation and debt payoff?', answer: 'Debt consolidation combines multiple debts into one loan, potentially lowering your rate. Debt payoff is the actual strategy to eliminate debt. Our calculator helps with both.' },
    ],
  },

  // ──── 9. SAVINGS GOAL CALCULATOR ────
  'savings-goal': {
    slug: 'savings-goal-calculator',
    category: 'Savings & Investment',
    title: 'Savings Goal Calculator – How Long to Reach Your Target Amount? | CalcWisePro',
    description: 'Free savings goal calculator. Enter your target amount, current savings, monthly contribution, and interest rate to see exactly when you will reach your goal. Includes a savings plan to get there faster.',
    keywords: [
      'savings goal calculator','how long to save money','savings calculator','money goal calculator',
      'savings target calculator','how much to save per month','savings planner online',
      'free savings calculator USA','when will I reach my savings goal','savings milestone calculator',
      'savings timeline calculator','monthly savings calculator','savings goal date calculator','savings calculator no signup',
      'best savings goal calculator 2026','savings projection','savings plan generator',
      'savings tracker','goal setting calculator','financial goal calculator','savings with interest',
      'savings account growth','high yield savings calculator','compound savings calculator',
    ],
    ogTitle: 'Free Savings Goal Calculator – See Exactly When You Will Reach Your Target',
    ogDescription: 'Enter your goal and monthly savings to see your exact target date. Adjust contributions to reach your goal faster.',
    faqs: [
      { question: 'How much should I save per month?', answer: 'The 50/30/20 rule recommends saving at least 20% of take-home pay. Use our calculator to work backward from your goal.' },
      { question: 'How long does it take to save $10,000?', answer: '$500/month takes 19 months, $750/month takes 13 months, $1,000/month takes 10 months.' },
      { question: 'Where should I keep savings to reach my goal faster?', answer: 'A High-Yield Savings Account (HYSA) earns 4%-5% APY in 2026 — about 10x more than traditional savings accounts.' },
      { question: 'What if I can\'t reach my savings goal on time?', answer: 'Try increasing your monthly contribution, reducing expenses, or extending your timeframe. The calculator lets you test different scenarios to find a realistic plan.' },
      { question: 'How does compound interest help me reach my savings goal?', answer: 'Interest earned on your savings can help you reach your goal faster. Our calculator includes an expected annual return to show the impact of compounding.' },
    ],
  },

  // ──── 10. STUDENT LOAN CALCULATOR ────
  'student-loan': {
    slug: 'student-loan-calculator',
    category: 'Loans & Debt',
    title: 'Student Loan Calculator – Compare Repayment Plans & Monthly Payments | CalcWisePro',
    description: 'Free student loan calculator. Compare Standard, Graduated, and Income-Based repayment plans. Calculate monthly payments, total interest, and payoff dates for federal and private student loans.',
    keywords: [
      'student loan calculator','student loan repayment calculator','income-based repayment calculator',
      'student loan payoff calculator','federal student loan calculator','private student loan calculator',
      'student loan monthly payment calculator','how long to pay off student loans','student loan calculator USA',
      'free student loan calculator','IBR calculator','student debt calculator','student loan payoff date',
      'student loan payment calculator no signup','best student loan calculator 2026','student loan consolidation',
      'student loan forgiveness calculator','graduated repayment plan','standard repayment plan',
      'student loan refinance calculator','student loan interest calculator','student loan debt strategy',
    ],
    ogTitle: 'Free Student Loan Calculator – Compare All Repayment Plans Side by Side',
    ogDescription: 'Calculate monthly payments for Standard, Graduated, and Income-Based repayment plans. See total interest and payoff dates.',
    faqs: [
      { question: 'What is the average monthly student loan payment?', answer: 'About $350-$400/month for a 10-year Standard plan. Graduate borrowers may pay $700-$1,500/month.' },
      { question: 'What is Income-Based Repayment (IBR)?', answer: 'IBR caps payments at 10%-15% of discretionary income. After 20-25 years, remaining balances may be forgiven.' },
      { question: 'Should I pay off student loans or invest?', answer: 'If loan rate is below 6%, consider investing simultaneously. Above 6%, aggressively pay loans. Always get the full 401k employer match.' },
      { question: 'Should I consolidate my student loans?', answer: 'Consolidation can simplify payments and potentially lower interest rates, but it may extend your repayment term and increase total interest. Use our calculator to compare before and after.' },
      { question: 'What is the difference between federal and private student loans?', answer: 'Federal loans have more flexible repayment options, deferment, and forgiveness programs. Private loans usually have higher rates and fewer protections. Our calculator works for both types.' },
    ],
  },

  // ──── 11. AMORTIZATION CALCULATOR ────
  amortization: {
    slug: 'amortization-calculator',
    category: 'Loans & Debt',
    title: 'Amortization Calculator – Full Month-by-Month Payment Schedule | CalcWisePro',
    description: 'Free amortization calculator. Generate a complete month-by-month amortization schedule for any loan. See exactly how much of each payment goes to principal vs interest. Includes extra payment analysis.',
    keywords: [
      'amortization calculator','amortization schedule calculator','loan amortization calculator',
      'amortization table generator','principal vs interest calculator','mortgage amortization calculator',
      'loan payment schedule calculator','free amortization calculator','amortization with extra payments',
      'generate amortization schedule','amortization calculator online','amortization calculator no signup',
      'best amortization calculator 2026','monthly amortization table','loan payment breakdown',
      'amortization formula','amortization chart','loan amortization schedule printable',
    ],
    ogTitle: 'Free Amortization Calculator – Complete Month-by-Month Payment Schedule',
    ogDescription: 'See every payment broken down into principal and interest. Includes extra payment analysis to show how much you can save.',
    faqs: [
      { question: 'What is amortization?', answer: 'Paying off a loan through regular scheduled payments. Early payments are mostly interest; later payments go mostly to principal.' },
      { question: 'How do extra payments affect amortization?', answer: 'Extra payments reduce principal faster, saving significant interest. On a $300,000 mortgage at 7%, an extra $200/month saves about $60,000 in interest and cuts 5 years off the term.' },
      { question: 'Can I see the amortization schedule monthly?', answer: 'Yes, our calculator provides a full month-by-month schedule that you can view. It shows the remaining balance after each payment.' },
      { question: 'What is the difference between simple and amortized loans?', answer: 'Amortized loans have fixed payments covering both principal and interest over the term, while simple interest loans may have separate principal and interest payments. Our calculator handles amortized loans.' },
    ],
  },

  // ──── 12. RENT VS BUY CALCULATOR ────
  'rent-vs-buy': {
    slug: 'rent-vs-buy-calculator',
    category: 'Home & Real Estate',
    title: 'Rent vs Buy Calculator – Is It Better to Rent or Buy a Home in 2026? | CalcWisePro',
    description: 'Free rent vs buy calculator. Compare true total cost of renting vs buying over any time period. Includes home appreciation, property taxes, maintenance costs, opportunity cost, and tax benefits.',
    keywords: [
      'rent vs buy calculator','should I rent or buy a home','renting vs buying calculator',
      'is it better to rent or buy 2026','home buying vs renting calculator','rent vs mortgage calculator',
      'rent vs buy USA 2026','free rent vs buy calculator','break even rent vs buy calculator',
      'should I buy a house now','rent vs buy 5 year calculator','home ownership cost calculator',
      'best rent vs buy calculator 2026','rent vs buy comparison','real estate calculator',
      'home buying advice','rent or buy decision','home appreciation calculator','rent increase calculator',
    ],
    ogTitle: 'Free Rent vs Buy Calculator – Is It Cheaper to Rent or Own in 2026?',
    ogDescription: 'Compare the true cost of renting vs buying including appreciation, taxes, maintenance, and opportunity cost.',
    faqs: [
      { question: 'Is it better to rent or buy in 2026?', answer: 'Buying makes more sense if you plan to stay 5+ years and can afford 20% down. In high-cost cities, renting may be cheaper short-term.' },
      { question: 'What is the break-even point for buying vs renting?', answer: 'Typically 3-7 years depending on local home prices, rent, and mortgage rates. Our calculator finds your specific break-even timeline.' },
      { question: 'What hidden costs should I consider in homeownership?', answer: 'Property taxes (1%-2% annually), homeowner\'s insurance ($1,000-$2,000/year), maintenance (1%-2% annually), HOA fees, and closing costs (2%-5% of purchase price).' },
      { question: 'How does home appreciation affect the decision?', answer: 'If home prices rise faster than inflation, buying can be a great investment. Our calculator includes an appreciation rate so you can see the potential equity growth.' },
      { question: 'What is the opportunity cost of buying?', answer: 'The down payment could have been invested elsewhere. Our calculator accounts for this by comparing investment returns on the down payment vs home equity growth.' },
    ],
  },

  // ──── 13. NET WORTH CALCULATOR ────
  'net-worth': {
    slug: 'net-worth-calculator',
    category: 'Personal Finance',
    title: 'Net Worth Calculator – Calculate Your Total Wealth Instantly | CalcWisePro',
    description: 'Free net worth calculator. Add your assets (savings, investments, home, vehicles) and subtract your liabilities (mortgage, loans, credit cards) to calculate your exact net worth instantly.',
    keywords: [
      'net worth calculator','calculate my net worth online','net worth tracker',
      'assets and liabilities calculator','personal net worth calculator','total wealth calculator',
      'how to calculate net worth','net worth calculator USA','free net worth calculator',
      'what is my net worth','net worth by age calculator','personal balance sheet calculator',
      'net worth calculator no signup','best net worth calculator 2026','financial health calculator',
      'wealth tracker','net worth tracker free','assets vs liabilities','personal financial statement',
      'net worth by income','net worth benchmark','financial wellness calculator',
    ],
    ogTitle: 'Free Net Worth Calculator – Add Assets, Subtract Liabilities, Know Your Worth',
    ogDescription: 'Calculate your exact net worth instantly. Enter assets and liabilities to see your complete financial picture.',
    faqs: [
      { question: 'What is net worth?', answer: 'Net worth = Total Assets - Total Liabilities. Positive net worth means you own more than you owe.' },
      { question: 'What is the average net worth by age in the USA?', answer: 'Federal Reserve data: Under 35: $39,000, Ages 35-44: $135,000, Ages 45-54: $247,000, Ages 55-64: $364,000, Ages 65-74: $410,000 (median).' },
      { question: 'How can I increase my net worth?', answer: 'Pay off high-interest debt, maximize 401k with employer match, invest in index funds, increase income, and reduce unnecessary expenses.' },
      { question: 'What should I include as assets?', answer: 'Include cash, savings, investments, retirement accounts, real estate (home value minus mortgage), vehicles, and any other valuable possessions.' },
      { question: 'How often should I calculate my net worth?', answer: 'It\'s recommended to calculate your net worth at least once a year, but many do it quarterly or monthly to track progress toward financial goals.' },
    ],
  },

  // ──── 14. BUDGET CALCULATOR ────
  budget: {
    slug: 'budget-calculator',
    category: 'Personal Finance',
    title: 'Budget Calculator – Monthly Budget Planner & Spending Tracker | CalcWisePro',
    description: 'Free monthly budget calculator. Enter income and expenses to see your spending breakdown based on the 50/30/20 rule. Identify where to cut spending and how much you can save each month.',
    keywords: [
      'budget calculator','monthly budget calculator','budget planner online','personal budget calculator',
      'income vs expenses calculator','50 30 20 rule calculator','how to make a budget',
      'household budget calculator USA','free budget calculator','where does my money go calculator',
      'budget planning calculator','monthly budget planner free','budget calculator no signup',
      'best budget calculator 2026','family budget planner','money management tool','expense tracker',
      'budgeting app alternative','financial planning tool','spending habits analyzer','budget spreadsheet',
    ],
    ogTitle: 'Free Monthly Budget Calculator – See Exactly Where Your Money Goes',
    ogDescription: 'Build a budget based on the 50/30/20 rule. See where to cut spending and how much you can save each month.',
    faqs: [
      { question: 'What is the 50/30/20 budget rule?', answer: '50% for needs (rent, food, utilities), 30% for wants (dining, entertainment), 20% for savings and debt repayment.' },
      { question: 'How much should I budget for housing?', answer: 'No more than 30% of gross income. On $60,000/year, that is $1,500/month.' },
      { question: 'How much should I save from my paycheck?', answer: 'Aim for at least 20% of take-home pay. Start with what you can and increase by 1% every few months.' },
      { question: 'What if my budget shows a deficit?', answer: 'If expenses exceed income, look for areas to cut back—like dining out, subscriptions, or entertainment. Even small cuts can make a difference. Our calculator highlights the biggest expense categories.' },
      { question: 'How often should I update my budget?', answer: 'Most people update their budget monthly, but if your income or expenses change frequently, consider weekly reviews. Our calculator makes it easy to test different scenarios.' },
    ],
  },

  // ──── 15. INFLATION CALCULATOR ────
  inflation: {
    slug: 'inflation-calculator',
    category: 'Personal Finance',
    title: 'Inflation Calculator – How Inflation Affects Your Money Over Time | CalcWisePro',
    description: 'Free inflation calculator. See how inflation erodes purchasing power. Calculate the future value of today\'s dollars or find historical price equivalents using US CPI data.',
    keywords: [
      'inflation calculator','purchasing power calculator','inflation impact calculator','CPI calculator USA',
      'cost of living calculator','inflation rate calculator 2026','future value of money calculator',
      'what will money be worth in the future','free inflation calculator','dollar value calculator over time',
      'buying power calculator','money value over time calculator','inflation effect on savings',
      'inflation calculator USA','inflation calculator no signup','best inflation calculator 2026',
      'inflation adjusted returns','real value calculator','historical inflation calculator',
      'CPI inflation calculator','inflation vs investment','inflation protection calculator',
    ],
    ogTitle: 'Free Inflation Calculator – See How Inflation Erodes Your Purchasing Power',
    ogDescription: 'Calculate how inflation affects the real value of your money. See what today\'s dollars will be worth in 10, 20, or 30 years.',
    faqs: [
      { question: 'What is inflation?', answer: 'The rate at which prices rise over time, reducing purchasing power. At 3% inflation, $100 today = $74 in buying power in 10 years. The Fed targets 2% annually.' },
      { question: 'How does inflation affect savings?', answer: 'At 1% savings rate with 3% inflation, you lose 2% purchasing power per year. $100,000 is effectively worth $81,000 in 10 years. High-yield savings accounts (4%-5% APY) help combat this.' },
      { question: 'What investments beat inflation?', answer: 'Historically: stocks (S&P 500 ~10%/year), real estate, TIPS, I-Bonds, and commodities. Cash and traditional savings typically do not keep pace.' },
      { question: 'What is the current inflation rate in 2026?', answer: 'In 2026, US inflation is around 2.5-3%, UK around 2-2.5%, and Eurozone around 2%. Our calculator uses up-to-date CPI data for accuracy.' },
      { question: 'How can I protect my money against inflation?', answer: 'Invest in assets that historically outpace inflation, such as stocks, real estate, or inflation-protected bonds (TIPS). Our investment calculators can show the impact of different returns.' },
    ],
  },

  // ──── 16. SIMPLE INTEREST CALCULATOR ────
  'simple-interest': {
    slug: 'simple-interest-calculator',
    category: 'Savings & Investment',
    title: 'Simple Interest Calculator – Calculate Interest Earned or Owed Instantly | CalcWisePro',
    description: 'Free simple interest calculator. Enter principal, annual interest rate, and time to instantly calculate interest earned or owed. Includes formula explanation and comparison with compound interest.',
    keywords: [
      'simple interest calculator','simple interest formula calculator','how to calculate simple interest',
      'interest calculator online','loan interest calculator','principal and interest calculator',
      'simple vs compound interest calculator','free interest calculator','SI calculator',
      'interest earned calculator','bank interest calculator','simple interest rate calculator','simple interest no signup',
      'best simple interest calculator 2026','simple interest loan','simple interest savings',
      'interest calculation tool','annual interest calculator','time value of money calculator',
    ],
    ogTitle: 'Free Simple Interest Calculator – Instant Calculation with Formula',
    ogDescription: 'Calculate simple interest on any amount instantly. Formula explained with step-by-step breakdown and compound interest comparison.',
    faqs: [
      { question: 'What is the simple interest formula?', answer: 'SI = P x R x T. Example: $5,000 at 6% for 3 years = $5,000 x 0.06 x 3 = $900 interest. Total = $5,900.' },
      { question: 'Simple vs compound interest — what is the difference?', answer: 'Simple interest is calculated only on original principal. Compound interest earns on principal AND accumulated interest. Over 10 years, $10,000 at 5% simple = $15,000; compound = $16,289.' },
      { question: 'When is simple interest used?', answer: 'Simple interest is often used for short-term loans, bonds, and some savings accounts. It\'s less common for long-term investments where compound interest dominates.' },
      { question: 'How do taxes and fees affect simple interest?', answer: 'Our calculator includes options for tax rate and maintenance fees to show net profit after deductions, giving you a realistic picture of your returns.' },
    ],
  },

  // ──── 17. HOME AFFORDABILITY CALCULATOR ────
  affordability: {
    slug: 'home-affordability-calculator',
    category: 'Home & Real Estate',
    title: 'Home Affordability Calculator – How Much House Can I Afford in 2026? | CalcWisePro',
    description: 'Free home affordability calculator. Based on income, monthly debts, down payment, and interest rate, calculate the maximum home price you can comfortably afford using the 28/36 rule.',
    keywords: [
      'home affordability calculator','how much house can I afford','mortgage affordability calculator',
      'how much mortgage can I qualify for','can I afford to buy a house','28/36 rule calculator',
      'home affordability calculator USA 2026','free home affordability calculator',
      'first time home buyer calculator','how much house on my salary',
      'debt to income ratio home calculator','home buying budget calculator','affordability calculator no signup',
      'best home affordability calculator 2026','mortgage prequalification','home buying guide',
      'affordable home price','max home price calculator','home budget calculator',
    ],
    ogTitle: 'Free Home Affordability Calculator – How Much House Can You Afford in 2026?',
    ogDescription: 'Find the maximum home price you can afford based on income, debts, and down payment using the 28/36 rule.',
    faqs: [
      { question: 'How much house can I afford on an $80,000 salary?', answer: 'Using 28% rule: $6,667/month gross x 28% = $1,867/month max housing. At 7% mortgage rate, that is approximately $250,000-$280,000 with 20% down.' },
      { question: 'What is the 28/36 rule?', answer: 'Housing costs under 28% of gross monthly income; total debts under 36%. Standard guideline used by mortgage lenders.' },
      { question: 'What credit score do I need to buy a house?', answer: '580+ for FHA (3.5% down), 620+ for conventional. 700+ gets the best rates. A 760 vs 620 score can mean 1%-1.5% lower rate, saving $100,000+ over 30 years.' },
      { question: 'What other costs should I consider when buying a home?', answer: 'Beyond the mortgage, consider property taxes, homeowners insurance, HOA fees, and maintenance costs. Our calculator includes these to give you a realistic total monthly cost.' },
      { question: 'How much down payment do I need to buy a house?', answer: 'You can buy a home with as little as 3% down (conventional loan) or 3.5% (FHA loan). However, 20% down avoids Private Mortgage Insurance (PMI) and lowers your monthly payment.' },
    ],
  },

  // ──── 18. REFINANCE CALCULATOR ────
  refinance: {
    slug: 'refinance-calculator',
    category: 'Home & Real Estate',
    title: 'Mortgage Refinance Calculator – Should I Refinance My Home Loan? | CalcWisePro',
    description: 'Free mortgage refinance calculator. Compare current mortgage with a new refinanced loan to calculate monthly savings, break-even point, and total lifetime interest savings. Is refinancing worth it?',
    keywords: [
      'refinance calculator','mortgage refinance calculator','should I refinance my mortgage',
      'refinancing calculator USA','refinance break-even calculator','cash out refinance calculator',
      'is refinancing worth it','refinance calculator 2026','free refinance calculator',
      'lower mortgage payment calculator','refinance cost benefit calculator','refinance comparison calculator',
      'refinance calculator no signup','best refinance calculator 2026','mortgage rate comparison',
      'refinance savings calculator','rate and term refinance','mortgage refinance guide',
    ],
    ogTitle: 'Free Refinance Calculator – Is Refinancing Worth It? Find Your Break-Even Point',
    ogDescription: 'See exact monthly savings, break-even timeline, and lifetime interest savings from refinancing. Know before you commit.',
    faqs: [
      { question: 'When should I refinance my mortgage?', answer: 'When you can lower your rate by 0.5%-1%+, plan to stay past the break-even point, or your credit score has significantly improved.' },
      { question: 'What is the break-even point for refinancing?', answer: 'Closing Costs / Monthly Savings. $4,800 closing costs / $200 monthly savings = 24 months break-even. Stay longer than that to profit.' },
      { question: 'How much does refinancing cost?', answer: '2%-5% of the loan amount in closing costs. On a $300,000 mortgage: $6,000-$15,000. Some lenders offer no-closing-cost refinances at a higher rate.' },
      { question: 'What are common refinance closing costs?', answer: 'Typical refinance closing costs include appraisal fees, title search, application fees, and points. They can range from 2% to 5% of the loan amount. Our calculator lets you input exact costs.' },
      { question: 'Should I choose a cash-out refinance?', answer: 'Cash-out refinance lets you access home equity for other uses, but it increases your loan balance. Use our calculator to see the impact on monthly payments and total interest.' },
    ],
  },

  // ──── 19. EMERGENCY FUND CALCULATOR ────
  'emergency-fund': {
    slug: 'emergency-fund-calculator',
    category: 'Personal Finance',
    title: 'Emergency Fund Calculator – How Much Should You Save? | CalcWisePro',
    description: 'Free emergency fund calculator. Find out exactly how much you need in your emergency fund based on monthly expenses, job stability, and dependents. Includes a personalized savings plan.',
    keywords: [
      'emergency fund calculator','how much emergency fund do I need','emergency savings calculator',
      'rainy day fund calculator','3 month emergency fund calculator','6 month emergency fund calculator',
      'how to build an emergency fund','free emergency fund calculator USA','financial safety net calculator',
      'how many months of expenses to save','emergency fund amount calculator','emergency fund no signup',
      'best emergency fund calculator 2026','emergency fund savings goal','financial security calculator',
      'emergency fund tracker','savings for emergencies','financial cushion calculator',
    ],
    ogTitle: 'Free Emergency Fund Calculator – How Much Do You Actually Need to Save?',
    ogDescription: 'Calculate your ideal emergency fund size. Get a personalized monthly savings plan to reach your goal.',
    faqs: [
      { question: 'How much should I have in an emergency fund?', answer: '3-6 months of essential living expenses. Self-employed or variable income: 6-12 months. If essentials are $3,500/month, you need $10,500-$21,000.' },
      { question: 'Where should I keep my emergency fund?', answer: 'High-Yield Savings Account (HYSA) earning 4%-5% APY — liquid, FDIC insured, separate from checking. Popular: Marcus, Ally, SoFi.' },
      { question: 'Should I pay off debt or build an emergency fund first?', answer: 'Build a $1,000 mini emergency fund first. Then pay high-interest debt. Then build the full 3-6 months. Without a cushion, emergencies push you back into debt.' },
      { question: 'How do I start building an emergency fund?', answer: 'Start by saving a small amount each month, even if it\'s $20-$50. Use our savings goal calculator to project when you\'ll reach your target based on your contributions.' },
      { question: 'What qualifies as an emergency?', answer: 'Emergencies are unexpected expenses like job loss, medical bills, urgent home or car repairs. It\'s not for planned expenses like vacations or holidays.' },
    ],
  },

  // ──── 20. SALARY CALCULATOR ────
  salary: {
    slug: 'salary-calculator',
    category: 'Personal Finance',
    title: 'Salary Calculator – Convert Annual to Hourly, Weekly & Monthly Pay | CalcWisePro',
    description: 'Free salary calculator. Convert any annual salary to hourly, weekly, bi-weekly, and monthly pay. Includes estimated take-home pay after federal taxes, Social Security, and Medicare for USA.',
    keywords: [
      'salary calculator','annual salary to hourly calculator','hourly rate calculator','salary to hourly USA',
      'how much is my hourly rate','monthly salary calculator','weekly pay calculator',
      'take home pay calculator USA','salary converter online','free salary calculator',
      'salary after tax calculator USA','net pay calculator','gross to net salary calculator',
      'how much do I make per hour','paycheck calculator USA','salary calculator 2026','salary calculator no signup',
      'best salary calculator 2026','overtime pay calculator','salary comparison tool',
      'annual to monthly salary','hourly to annual salary','tax rate calculator','salary breakdown',
    ],
    ogTitle: 'Free Salary Calculator – Convert Annual to Hourly, Weekly & Monthly Instantly',
    ogDescription: 'Convert any salary to hourly, weekly, or monthly pay in seconds. Includes estimated take-home pay after US federal taxes.',
    faqs: [
      { question: 'How do I convert annual salary to hourly rate?', answer: 'Divide by 2,080 (52 weeks x 40 hours). $40,000/year = $19.23/hour. $60,000 = $28.85/hour. $100,000 = $48.08/hour.' },
      { question: 'How much is $20 an hour annually?', answer: '$20 x 40 hours x 52 weeks = $41,600/year gross. Take-home after taxes: approximately $28,000-$30,000/year.' },
      { question: 'What is the difference between gross and net pay?', answer: 'Gross is before deductions. Net (take-home) is after federal tax, state tax, Social Security (6.2%), Medicare (1.45%), and pre-tax deductions like 401k.' },
      { question: 'How do I include vacation and holidays in my salary calculation?', answer: 'Our calculator includes options for paid vacation weeks and paid holidays, so you can compute your effective hourly rate including paid time off.' },
      { question: 'What is the average salary in the US in 2026?', answer: 'The median US salary in 2026 is approximately $62,000/year. The average hourly wage is around $30/hour. Use our calculator to compare your salary to these benchmarks.' },
    ],
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 SCHEMA GENERATORS (JSON-LD)
// ═══════════════════════════════════════════════════════════════════════════

export function generateFAQSchema(faqs: FAQ[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}

export function generateBreadcrumbSchema(items: Breadcrumb[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: `https://www.calcwisepro.me${item.item}`,
    })),
  })
}

export function getCalculatorBreadcrumbs(slug: string): Breadcrumb[] {
  const meta = getCalculatorMetadata(slug)
  if (!meta) return []
  return [
    { name: 'Home', item: '/', position: 1 },
    { name: 'Calculators', item: '/', position: 2 },
    { name: meta.category || 'Tools', item: `/${meta.slug}`, position: 3 },
  ]
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CalcWisePro',
  url: 'https://www.calcwisepro.me',
  logo: 'https://www.calcwisepro.me/logo.svg',
  description: 'Free online financial calculators for USA, UK, Canada & Australia.',
  sameAs: [
    'https://twitter.com/calcwisepro',
    'https://www.linkedin.com/company/calcwisepro',
    'https://github.com/calcwisepro',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'um558899@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English'],
  },
}

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CalcWisePro Financial Calculators',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getCalculatorMetadata(slug: string): CalculatorMetadata | undefined {
  const key = Object.keys(calculatorMetadata).find(
    (k) => calculatorMetadata[k].slug === slug
  )
  return key ? calculatorMetadata[key] : undefined
}

export function getCalculatorsByCategory(): Record<string, CalculatorMetadata[]> {
  return Object.values(calculatorMetadata).reduce(
    (acc, calc) => {
      const cat = calc.category || 'Other'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(calc)
      return acc
    },
    {} as Record<string, CalculatorMetadata[]>
  )
}

export function getAllSlugs(): string[] {
  return Object.values(calculatorMetadata).map((c) => c.slug)
}

export function getCalculatorPageMetadata(slug: string): Metadata {
  const meta = getCalculatorMetadata(slug)
  if (!meta) {
    return {
      title: 'Calculator Not Found | CalcWisePro',
      description: 'The requested calculator could not be found. Browse our 20+ free financial calculators.',
    }
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      url: `${siteConfig.url}/${meta.slug}`,
      type: 'website',
      siteName: 'CalcWisePro',
      locale: 'en_US',
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      images: [`${siteConfig.url}/og-image.png`],
      creator: '@calcwisepro',
      site: '@calcwisepro',
    },
    alternates: {
      canonical: `${siteConfig.url}/${meta.slug}`,
      languages: {
        'en-US': `${siteConfig.url}/${meta.slug}`,
        'en-GB': `${siteConfig.url}/${meta.slug}?gb=1`,
        'en-CA': `${siteConfig.url}/${meta.slug}?ca=1`,
        'en-AU': `${siteConfig.url}/${meta.slug}?au=1`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: 'CalcWisePro Team', url: siteConfig.url }],
    category: meta.category || 'Financial Calculator',
    classification: 'Financial Tools, Calculators, Personal Finance',
    creator: 'CalcWisePro',
    publisher: 'CalcWisePro',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  }
}

export function getPageMetadata(pageKey: string): Metadata {
  const meta = pageMetadata[pageKey]
  if (!meta) {
    return {
      title: 'Page Not Found | CalcWisePro',
      description: 'The requested page could not be found. Browse our 20+ free financial calculators.',
    }
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      url: `${siteConfig.url}/${pageKey}`,
      type: 'website',
      siteName: 'CalcWisePro',
      locale: 'en_US',
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      images: [`${siteConfig.url}/og-image.png`],
      creator: '@calcwisepro',
      site: '@calcwisepro',
    },
    alternates: {
      canonical: `${siteConfig.url}/${pageKey}`,
      languages: {
        'en-US': `${siteConfig.url}/${pageKey}`,
        'en-GB': `${siteConfig.url}/${pageKey}?gb=1`,
        'en-CA': `${siteConfig.url}/${pageKey}?ca=1`,
        'en-AU': `${siteConfig.url}/${pageKey}?au=1`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: 'CalcWisePro Team', url: siteConfig.url }],
    creator: 'CalcWisePro',
    publisher: 'CalcWisePro',
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 TRUST BADGES (Optional)
// ═══════════════════════════════════════════════════════════════════════════

export const trustBadges: TrustBadge[] = [
  { label: 'Trusted by', value: '100,000+ users' },
  { label: 'Calculators', value: '21 tools' },
  { label: 'Rating', value: '4.9/5' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Response Time', value: '24 hours' },
]