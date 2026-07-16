import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogTitle?: string
  ogDescription?: string
}

interface CalculatorMetadata extends PageMetadata {
  slug: string
  ogImage?: string
  category?: string
  faqs?: { question: string; answer: string }[]
}

// ─── Site-wide Metadata ────────────────────────────────────────────────────
export const siteMetadata = {
  name: 'CalcWisePro',
  url: 'https://www.calcwisepro.me',
  title: 'CalcWisePro – Free Financial Calculators for USA & UK',
  description:
    'Free online financial calculators for mortgage, loan, retirement, debt payoff, compound interest and more. Trusted by users in USA, UK, Canada & Australia. No signup required.',
  keywords: [
    'free financial calculator',
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
    'calcwisepro',
  ],
  locale: 'en_US',
  twitterHandle: '@calcwisepro',
  ogImage: 'https://www.calcwisepro.me/og-image.png',
}

// ─── Static Pages Metadata ─────────────────────────────────────────────────
export const pageMetadata: Record<string, PageMetadata> = {
  about: {
    title: 'About CalcWisePro – Free Financial Calculators for Everyone',
    description:
      'CalcWisePro provides free, fast, and accurate financial calculators for users in USA, UK, Canada, and Australia. Our mission: smarter financial decisions for everyone, for free.',
    keywords: ['about calcwisepro', 'free financial tools', 'personal finance calculators'],
    ogTitle: 'About CalcWisePro – Smart Financial Tools, Zero Cost',
    ogDescription:
      'Learn about our mission to give everyone access to professional-grade financial calculators. Completely free, no signup required.',
  },
  contact: {
    title: 'Contact CalcWisePro – Get Help or Share Feedback',
    description:
      'Have a question, found a bug, or want to suggest a new calculator? Contact the CalcWisePro team — we read every message.',
    keywords: ['contact calcwisepro', 'financial calculator support', 'feedback'],
    ogTitle: 'Contact Us – CalcWisePro',
    ogDescription: 'Reach out to the CalcWisePro team. We love feedback and suggestions.',
  },
  privacy: {
    title: 'Privacy Policy – CalcWisePro',
    description:
      'CalcWisePro privacy policy. We never store, sell, or share your financial data. All calculations happen in your browser. Read how we protect your privacy.',
    keywords: ['calcwisepro privacy policy', 'financial calculator privacy', 'data protection'],
    ogTitle: 'Privacy Policy – CalcWisePro',
    ogDescription:
      'Your data stays on your device. CalcWisePro never stores or shares your financial information.',
  },
  terms: {
    title: 'Terms of Use – CalcWisePro',
    description:
      'Terms and conditions for using CalcWisePro free financial calculators. Our tools are for informational purposes — always consult a financial advisor for major decisions.',
    keywords: ['calcwisepro terms of use', 'financial calculator disclaimer'],
    ogTitle: 'Terms of Use – CalcWisePro',
    ogDescription: 'Read the terms and conditions for using CalcWisePro free financial tools.',
  },
}

// ─── Calculator Pages Metadata ─────────────────────────────────────────────
export const calculatorMetadata: Record<string, CalculatorMetadata> = {
  mortgage: {
    slug: 'mortgage-calculator',
    category: 'Home & Real Estate',
    title: 'Mortgage Calculator – Estimate Monthly Payments & Total Interest | CalcWisePro',
    description:
      'Free mortgage calculator with amortization schedule. Enter your home price, down payment, interest rate, and loan term to instantly see monthly payments, total interest, and a full year-by-year breakdown.',
    keywords: [
      'mortgage calculator',
      'mortgage payment calculator',
      'home loan calculator',
      'monthly mortgage payment',
      'amortization schedule calculator',
      'mortgage interest calculator',
      'how much will my mortgage be',
      'mortgage calculator USA',
      'mortgage calculator UK',
      'free mortgage calculator',
    ],
    ogTitle: 'Free Mortgage Calculator – Monthly Payments + Full Amortization Schedule',
    ogDescription:
      'Calculate your exact monthly mortgage payment and see a full breakdown of principal vs interest over your loan life. Free, instant, no signup.',
    faqs: [
      {
        question: 'How do I calculate my monthly mortgage payment?',
        answer:
          'Your monthly mortgage payment depends on the loan amount, interest rate, and loan term. Use our free mortgage calculator above — enter your home price, down payment, rate, and term to get an instant result.',
      },
      {
        question: 'What is included in a monthly mortgage payment?',
        answer:
          'A typical monthly mortgage payment includes principal (the loan amount), interest, property taxes, and homeowner\'s insurance — sometimes called PITI.',
      },
      {
        question: 'What is an amortization schedule?',
        answer:
          'An amortization schedule is a table showing each monthly payment over your loan term, broken down into how much goes to principal and how much goes to interest.',
      },
      {
        question: 'How much mortgage can I afford?',
        answer:
          'A common rule is to keep your mortgage payment below 28% of your gross monthly income. Use our Home Affordability Calculator for a more detailed estimate.',
      },
    ],
  },

  loan: {
    slug: 'loan-calculator',
    category: 'Loans & Debt',
    title: 'Loan Calculator – Monthly Payment & Total Interest | CalcWisePro',
    description:
      'Free loan calculator for personal loans, auto loans, and more. Enter loan amount, interest rate, and term to instantly calculate monthly payments, total interest paid, and full amortization schedule.',
    keywords: [
      'loan calculator',
      'personal loan calculator',
      'loan payment calculator',
      'monthly loan payment',
      'loan interest calculator',
      'loan amortization calculator',
      'EMI calculator',
      'how much will my loan payment be',
      'free loan calculator USA',
      'loan repayment calculator',
    ],
    ogTitle: 'Free Loan Calculator – Monthly Payments & Total Interest',
    ogDescription:
      'Instantly calculate your monthly loan payment, total interest, and full amortization schedule. Works for personal loans, auto loans, and more.',
    faqs: [
      {
        question: 'How do I calculate my monthly loan payment?',
        answer:
          'Monthly loan payment depends on the loan amount, annual interest rate, and loan term in months. Our loan calculator computes this instantly using the standard amortization formula.',
      },
      {
        question: 'What is a good interest rate for a personal loan?',
        answer:
          'Personal loan rates in the USA typically range from 6% to 36% depending on your credit score. Excellent credit (720+) can get rates below 10%.',
      },
      {
        question: 'How can I reduce the total interest I pay on a loan?',
        answer:
          'You can reduce total interest by making extra payments toward principal, choosing a shorter loan term, or refinancing to a lower rate.',
      },
    ],
  },

  'compound-interest': {
    slug: 'compound-interest-calculator',
    category: 'Savings & Investment',
    title: 'Compound Interest Calculator – Watch Your Money Grow | CalcWisePro',
    description:
      'Free compound interest calculator. See exactly how your savings or investments grow over time with daily, monthly, or annual compounding. Includes a year-by-year growth chart.',
    keywords: [
      'compound interest calculator',
      'compound interest formula',
      'how does compound interest work',
      'investment growth calculator',
      'future value calculator',
      'savings growth calculator',
      'daily compound interest calculator',
      'monthly compound interest calculator',
      'compound interest USA',
      'free compound interest calculator',
    ],
    ogTitle: 'Free Compound Interest Calculator – See Your Money Grow Over Time',
    ogDescription:
      'Enter a starting amount, interest rate, and time period to see how compound interest grows your savings. Visual chart included.',
    faqs: [
      {
        question: 'What is compound interest?',
        answer:
          'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It causes money to grow exponentially over time.',
      },
      {
        question: 'How often does compound interest compound?',
        answer:
          'Compounding frequency varies — it can be daily, monthly, quarterly, or annually. More frequent compounding means slightly more growth. Use our calculator to compare frequencies.',
      },
      {
        question: 'What is the Rule of 72?',
        answer:
          'The Rule of 72 is a quick estimate: divide 72 by your annual interest rate to find how many years it takes to double your money. At 8% interest, your money doubles in about 9 years.',
      },
    ],
  },

  'car-loan': {
    slug: 'car-loan-calculator',
    category: 'Loans & Debt',
    title: 'Car Loan Calculator – Monthly Auto Payment & Total Cost | CalcWisePro',
    description:
      'Free car loan calculator. Enter vehicle price, down payment, trade-in value, interest rate, and loan term to calculate monthly auto loan payments, total interest, and true cost of ownership.',
    keywords: [
      'car loan calculator',
      'auto loan calculator',
      'car payment calculator',
      'monthly car payment',
      'auto loan interest calculator',
      'vehicle loan calculator',
      'car financing calculator',
      'how much will my car payment be',
      'car loan calculator USA',
      'free auto loan calculator',
    ],
    ogTitle: 'Free Car Loan Calculator – Monthly Payment & True Cost of Ownership',
    ogDescription:
      'Calculate your exact monthly car payment, total interest, and total cost before you buy. Works for new and used vehicles.',
    faqs: [
      {
        question: 'What is a good car loan interest rate?',
        answer:
          'In the USA, average car loan rates range from 5% to 14% depending on credit score and whether the car is new or used. Rates below 7% are generally considered good.',
      },
      {
        question: 'How much should I put down on a car?',
        answer:
          'Financial experts recommend a down payment of at least 20% for a new car and 10% for a used car to avoid being underwater on the loan.',
      },
      {
        question: 'Should I get a shorter or longer car loan term?',
        answer:
          'Shorter terms (36–48 months) mean higher monthly payments but less total interest paid. Longer terms (72–84 months) lower monthly payments but significantly increase total cost.',
      },
    ],
  },

  retirement: {
    slug: 'retirement-calculator',
    category: 'Retirement',
    title: 'Retirement Calculator – Are You on Track? | CalcWisePro',
    description:
      'Free retirement savings calculator. Enter your age, current savings, monthly contributions, and expected return to see if you are on track to retire comfortably. Includes 401k and IRA guidance.',
    keywords: [
      'retirement calculator',
      '401k calculator',
      'retirement savings calculator',
      'how much do I need to retire',
      'retirement planning calculator',
      'IRA calculator',
      'retirement income calculator',
      'am I saving enough for retirement',
      'retirement calculator USA',
      'free retirement calculator',
    ],
    ogTitle: 'Free Retirement Calculator – See If You\'re on Track to Retire',
    ogDescription:
      'Enter your current savings and contributions to see your projected retirement balance and whether you\'ll have enough to retire comfortably.',
    faqs: [
      {
        question: 'How much do I need to retire?',
        answer:
          'A common rule is to save 25x your annual expenses (the 4% rule). So if you spend $50,000/year, you need $1.25 million saved. Use our calculator for a personalized estimate.',
      },
      {
        question: 'How much should I contribute to my 401k?',
        answer:
          'At minimum, contribute enough to get your full employer match — that\'s free money. Ideally aim for 15% of your pre-tax income including employer contributions.',
      },
      {
        question: 'What is the 4% rule in retirement?',
        answer:
          'The 4% rule suggests you can withdraw 4% of your retirement savings in year one, then adjust for inflation each year, and your money should last 30+ years.',
      },
    ],
  },

  'credit-card': {
    slug: 'credit-card-payoff-calculator',
    category: 'Loans & Debt',
    title: 'Credit Card Payoff Calculator – See Your Debt-Free Date | CalcWisePro',
    description:
      'Free credit card payoff calculator. Enter your balance, interest rate, and monthly payment to see exactly when you will be debt free and how much interest you will pay in total.',
    keywords: [
      'credit card payoff calculator',
      'credit card debt calculator',
      'how long to pay off credit card',
      'credit card interest calculator',
      'minimum payment calculator',
      'credit card payoff date',
      'pay off credit card calculator',
      'credit card debt free calculator',
      'credit card calculator USA',
      'free credit card payoff calculator',
    ],
    ogTitle: 'Free Credit Card Payoff Calculator – Find Your Debt-Free Date',
    ogDescription:
      'See exactly when you\'ll pay off your credit card and how much interest you\'ll pay. Increase your payment to see how much faster you\'ll be debt free.',
    faqs: [
      {
        question: 'How long does it take to pay off credit card debt?',
        answer:
          'It depends on your balance, interest rate, and monthly payment. Paying only the minimum on a $5,000 balance at 20% APR can take over 20 years. Use our calculator to find your exact payoff date.',
      },
      {
        question: 'Should I pay more than the minimum on my credit card?',
        answer:
          'Yes — always. Paying only the minimum means most of your payment goes to interest. Even small extra payments dramatically reduce your payoff time and total interest.',
      },
      {
        question: 'What is a good strategy for paying off credit card debt?',
        answer:
          'Two popular strategies are the Debt Snowball (pay smallest balance first for motivation) and the Debt Avalanche (pay highest interest rate first to save money). Use our Debt Payoff Calculator to compare.',
      },
    ],
  },

  investment: {
    slug: 'investment-calculator',
    category: 'Savings & Investment',
    title: 'Investment Return Calculator – ROI, CAGR & Growth | CalcWisePro',
    description:
      'Free investment return calculator. Calculate ROI, CAGR, and inflation-adjusted returns on any investment. See how your portfolio grows with monthly contributions over time.',
    keywords: [
      'investment calculator',
      'investment return calculator',
      'ROI calculator',
      'CAGR calculator',
      'stock market return calculator',
      'portfolio growth calculator',
      'investment growth calculator',
      'how much will my investment be worth',
      'investment calculator USA',
      'free investment calculator',
    ],
    ogTitle: 'Free Investment Return Calculator – ROI, CAGR & Inflation-Adjusted Growth',
    ogDescription:
      'Calculate your investment returns, ROI, and CAGR. See a year-by-year chart of how your portfolio grows.',
    faqs: [
      {
        question: 'What is a good return on investment?',
        answer:
          'The S&P 500 has historically returned about 10% annually (7% adjusted for inflation). Individual investments vary widely — always compare risk vs reward.',
      },
      {
        question: 'What is CAGR?',
        answer:
          'CAGR stands for Compound Annual Growth Rate. It represents the steady annual growth rate that would take an investment from its beginning value to its ending value over a given time period.',
      },
    ],
  },

  'debt-payoff': {
    slug: 'debt-payoff-calculator',
    category: 'Loans & Debt',
    title: 'Debt Payoff Calculator – Snowball vs Avalanche Method | CalcWisePro',
    description:
      'Free debt payoff calculator. Compare the Debt Snowball and Debt Avalanche methods to find the fastest and cheapest way to become debt free. Works for multiple debts simultaneously.',
    keywords: [
      'debt payoff calculator',
      'debt snowball calculator',
      'debt avalanche calculator',
      'snowball vs avalanche method',
      'how to pay off debt fast',
      'debt free calculator',
      'multiple debt payoff calculator',
      'debt consolidation calculator',
      'debt payoff calculator USA',
      'free debt payoff calculator',
    ],
    ogTitle: 'Free Debt Payoff Calculator – Snowball vs Avalanche Comparison',
    ogDescription:
      'Enter all your debts and compare Snowball vs Avalanche strategies. See your debt-free date and total interest saved.',
    faqs: [
      {
        question: 'What is the Debt Snowball method?',
        answer:
          'The Debt Snowball method pays off debts from smallest balance to largest, regardless of interest rate. It builds momentum and motivation as you eliminate debts quickly.',
      },
      {
        question: 'What is the Debt Avalanche method?',
        answer:
          'The Debt Avalanche method pays off debts from highest interest rate to lowest. It saves the most money in total interest paid.',
      },
      {
        question: 'Which is better — Snowball or Avalanche?',
        answer:
          'Avalanche saves more money. Snowball is better for motivation. Use our calculator to compare both and see the exact difference in your situation.',
      },
    ],
  },

  'savings-goal': {
    slug: 'savings-goal-calculator',
    category: 'Savings & Investment',
    title: 'Savings Goal Calculator – How Long to Reach Your Target? | CalcWisePro',
    description:
      'Free savings goal calculator. Enter your savings goal, current balance, monthly contribution, and interest rate to see exactly when you will reach your target.',
    keywords: [
      'savings goal calculator',
      'how long to save money',
      'savings calculator',
      'money goal calculator',
      'savings target calculator',
      'how much to save per month',
      'savings planner',
      'goal savings calculator',
      'free savings calculator USA',
      'savings goal tracker',
    ],
    ogTitle: 'Free Savings Goal Calculator – See When You\'ll Reach Your Target',
    ogDescription:
      'Enter your goal amount and monthly savings to see exactly when you\'ll reach your target. Adjust contributions to reach your goal faster.',
    faqs: [
      {
        question: 'How much should I save per month?',
        answer:
          'The 50/30/20 rule suggests saving at least 20% of take-home pay. Use our savings goal calculator to work backward from your target and find the exact monthly amount you need.',
      },
    ],
  },

  'student-loan': {
    slug: 'student-loan-calculator',
    category: 'Loans & Debt',
    title: 'Student Loan Calculator – Compare Repayment Plans | CalcWisePro',
    description:
      'Free student loan calculator. Compare Standard, Graduated, and Income-Based repayment plans. See monthly payments, total interest, and payoff dates for federal and private student loans.',
    keywords: [
      'student loan calculator',
      'student loan repayment calculator',
      'income-based repayment calculator',
      'student loan payoff calculator',
      'federal student loan calculator',
      'private student loan calculator',
      'student loan interest calculator',
      'how long to pay off student loans',
      'student loan calculator USA',
      'free student loan calculator',
    ],
    ogTitle: 'Free Student Loan Calculator – Compare All Repayment Plans',
    ogDescription:
      'Compare Standard, Graduated, and Income-Based repayment plans side by side. See your exact monthly payment and total interest for each.',
    faqs: [
      {
        question: 'What is the average student loan payment?',
        answer:
          'The average monthly student loan payment in the USA is about $350–$400 for a 10-year Standard repayment plan. Use our calculator for your specific loan amount and rate.',
      },
      {
        question: 'What is Income-Based Repayment (IBR)?',
        answer:
          'IBR caps your federal student loan payments at 10–15% of your discretionary income. After 20–25 years of qualifying payments, remaining balances may be forgiven.',
      },
    ],
  },

  amortization: {
    slug: 'amortization-calculator',
    category: 'Loans & Debt',
    title: 'Amortization Calculator – Full Payment Schedule | CalcWisePro',
    description:
      'Free amortization calculator. Generate a complete month-by-month amortization schedule for any loan. See exactly how much goes to principal vs interest every single month.',
    keywords: [
      'amortization calculator',
      'amortization schedule',
      'loan amortization calculator',
      'amortization table',
      'principal vs interest calculator',
      'mortgage amortization calculator',
      'loan payment schedule',
      'amortization schedule calculator USA',
      'free amortization calculator',
      'monthly payment breakdown',
    ],
    ogTitle: 'Free Amortization Calculator – Full Month-by-Month Payment Schedule',
    ogDescription:
      'Generate a complete amortization table for any loan. See every payment broken down into principal and interest.',
    faqs: [
      {
        question: 'What is amortization?',
        answer:
          'Amortization is the process of paying off a loan through regular scheduled payments. Early payments are mostly interest; later payments go mostly toward principal.',
      },
      {
        question: 'How do extra payments affect amortization?',
        answer:
          'Extra payments go directly to reducing principal, which reduces total interest paid and shortens your loan term. Even small extra monthly payments make a significant difference.',
      },
    ],
  },

  'rent-vs-buy': {
    slug: 'rent-vs-buy-calculator',
    category: 'Home & Real Estate',
    title: 'Rent vs Buy Calculator – Should I Rent or Buy a Home? | CalcWisePro',
    description:
      'Free rent vs buy calculator. Compare the true total cost of renting vs buying over 5, 10, or 30 years. Includes home appreciation, tax benefits, opportunity cost, and maintenance costs.',
    keywords: [
      'rent vs buy calculator',
      'should I rent or buy',
      'rent or buy a home calculator',
      'renting vs buying calculator',
      'is it better to rent or buy',
      'home buying calculator',
      'renting vs owning calculator',
      'rent vs mortgage calculator',
      'rent vs buy USA',
      'free rent vs buy calculator',
    ],
    ogTitle: 'Free Rent vs Buy Calculator – Is It Better to Rent or Own?',
    ogDescription:
      'Compare the true long-term cost of renting vs buying including appreciation, taxes, opportunity cost, and maintenance. Make a smarter decision.',
    faqs: [
      {
        question: 'Is it better to rent or buy a home?',
        answer:
          'It depends on your local market, how long you plan to stay, your financial situation, and lifestyle. Our calculator compares the true total cost of both options over your chosen time period.',
      },
      {
        question: 'What is the break-even point for buying a home?',
        answer:
          'The break-even point is when buying becomes cheaper than renting — typically 3–7 years depending on local home prices and rent. Use our calculator to find your specific break-even timeline.',
      },
    ],
  },

  'net-worth': {
    slug: 'net-worth-calculator',
    category: 'Personal Finance',
    title: 'Net Worth Calculator – Track Your Total Wealth | CalcWisePro',
    description:
      'Free net worth calculator. Add up all your assets (savings, investments, home, car) and subtract all your liabilities (loans, credit cards, mortgage) to calculate your exact net worth.',
    keywords: [
      'net worth calculator',
      'calculate my net worth',
      'net worth tracker',
      'assets and liabilities calculator',
      'personal net worth calculator',
      'total wealth calculator',
      'how to calculate net worth',
      'net worth calculator USA',
      'free net worth calculator',
      'financial net worth',
    ],
    ogTitle: 'Free Net Worth Calculator – Calculate Your Total Wealth Instantly',
    ogDescription:
      'Enter your assets and liabilities to instantly calculate your net worth. Track your financial health and progress over time.',
    faqs: [
      {
        question: 'What is net worth?',
        answer:
          'Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). A positive net worth means you own more than you owe.',
      },
      {
        question: 'What is a good net worth by age?',
        answer:
          'A common benchmark is to have a net worth equal to your annual salary by age 30, 3x by 40, 6x by 50, and 10x by 67 (retirement age). Use our calculator to see where you stand.',
      },
    ],
  },

  budget: {
    slug: 'budget-calculator',
    category: 'Personal Finance',
    title: 'Budget Calculator – Monthly Budget Planner | CalcWisePro',
    description:
      'Free monthly budget calculator. Enter your income and expenses to see where your money goes. Based on the 50/30/20 rule — needs, wants, and savings. Identify where to cut spending.',
    keywords: [
      'budget calculator',
      'monthly budget calculator',
      'budget planner',
      'personal budget calculator',
      'income vs expenses calculator',
      '50 30 20 rule calculator',
      'how to make a budget',
      'household budget calculator',
      'budget calculator USA',
      'free budget planner',
    ],
    ogTitle: 'Free Monthly Budget Calculator – Plan Your Spending & Savings',
    ogDescription:
      'Enter your income and expenses to build a monthly budget. See exactly where your money is going and how to save more.',
    faqs: [
      {
        question: 'What is the 50/30/20 budget rule?',
        answer:
          'The 50/30/20 rule suggests spending 50% of take-home pay on needs, 30% on wants, and saving 20%. It\'s a simple starting framework for budgeting.',
      },
      {
        question: 'How do I start budgeting?',
        answer:
          'Start by tracking your income and all expenses for one month. Then categorize them and compare to the 50/30/20 rule. Use our budget calculator to do this instantly.',
      },
    ],
  },

  inflation: {
    slug: 'inflation-calculator',
    category: 'Personal Finance',
    title: 'Inflation Calculator – How Inflation Affects Your Money | CalcWisePro',
    description:
      'Free inflation calculator. See how inflation erodes purchasing power over time. Calculate the future value of today\'s dollars or find out what past prices equal today using US CPI data.',
    keywords: [
      'inflation calculator',
      'purchasing power calculator',
      'inflation impact calculator',
      'CPI calculator',
      'cost of living calculator',
      'inflation rate calculator',
      'future value of money calculator',
      'what will money be worth in the future',
      'inflation calculator USA',
      'free inflation calculator',
    ],
    ogTitle: 'Free Inflation Calculator – See How Inflation Erodes Your Purchasing Power',
    ogDescription:
      'Calculate how inflation affects the real value of your money over time. See what today\'s dollars will be worth in the future.',
    faqs: [
      {
        question: 'What is inflation?',
        answer:
          'Inflation is the rate at which the general price level of goods and services rises over time, reducing purchasing power. The US Federal Reserve targets 2% annual inflation.',
      },
      {
        question: 'How does inflation affect savings?',
        answer:
          'If your savings account earns 1% interest but inflation is 3%, you\'re effectively losing 2% of purchasing power per year. Investing in assets that beat inflation is critical for long-term wealth.',
      },
    ],
  },

  'simple-interest': {
    slug: 'simple-interest-calculator',
    category: 'Savings & Investment',
    title: 'Simple Interest Calculator – Calculate Interest Instantly | CalcWisePro',
    description:
      'Free simple interest calculator. Enter principal, interest rate, and time period to instantly calculate simple interest earned or owed. Includes formula explanation and comparison with compound interest.',
    keywords: [
      'simple interest calculator',
      'simple interest formula',
      'how to calculate simple interest',
      'interest calculator',
      'loan interest calculator',
      'principal and interest calculator',
      'simple vs compound interest',
      'simple interest calculator USA',
      'free interest calculator',
      'annual interest calculator',
    ],
    ogTitle: 'Free Simple Interest Calculator – Instant Results with Formula Explanation',
    ogDescription:
      'Calculate simple interest on any principal amount. See the formula, step-by-step calculation, and how it compares to compound interest.',
    faqs: [
      {
        question: 'What is the simple interest formula?',
        answer:
          'Simple Interest = Principal × Rate × Time. For example, $1,000 at 5% for 3 years = $1,000 × 0.05 × 3 = $150 in interest.',
      },
      {
        question: 'What is the difference between simple and compound interest?',
        answer:
          'Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest — making it grow faster.',
      },
    ],
  },

  affordability: {
    slug: 'home-affordability-calculator',
    category: 'Home & Real Estate',
    title: 'Home Affordability Calculator – How Much House Can I Afford? | CalcWisePro',
    description:
      'Free home affordability calculator. Based on your income, monthly debts, down payment, and interest rate, find out the maximum home price you can comfortably afford using the 28/36 rule.',
    keywords: [
      'home affordability calculator',
      'how much house can I afford',
      'home buying calculator',
      'mortgage affordability calculator',
      'how much mortgage can I get',
      'house price calculator',
      'can I afford a house',
      '28/36 rule calculator',
      'home affordability calculator USA',
      'free home affordability calculator',
    ],
    ogTitle: 'Free Home Affordability Calculator – How Much House Can You Afford?',
    ogDescription:
      'Find the maximum home price you can comfortably afford based on your income, debts, and down payment. Based on the trusted 28/36 rule.',
    faqs: [
      {
        question: 'How much house can I afford on my salary?',
        answer:
          'A common guideline is to spend no more than 28% of gross monthly income on housing. On a $80,000 salary that\'s about $1,867/month for housing costs. Use our calculator for your specific situation.',
      },
      {
        question: 'What is the 28/36 rule for home buying?',
        answer:
          'The 28/36 rule says your housing costs should not exceed 28% of gross monthly income, and total debt payments should not exceed 36% of gross monthly income.',
      },
      {
        question: 'How much down payment do I need to buy a house?',
        answer:
          'You can buy a home with as little as 3% down (conventional loan) or 3.5% (FHA loan). However, 20% down avoids Private Mortgage Insurance (PMI) and lowers your monthly payment.',
      },
    ],
  },

  refinance: {
    slug: 'refinance-calculator',
    category: 'Home & Real Estate',
    title: 'Mortgage Refinance Calculator – Should I Refinance? | CalcWisePro',
    description:
      'Free mortgage refinance calculator. Compare your current mortgage with a new refinanced loan to see monthly savings, break-even point, and total interest savings over the life of the loan.',
    keywords: [
      'refinance calculator',
      'mortgage refinance calculator',
      'should I refinance my mortgage',
      'refinancing calculator',
      'refinance break-even calculator',
      'cash out refinance calculator',
      'refinance savings calculator',
      'when should I refinance',
      'refinance calculator USA',
      'free refinance calculator',
    ],
    ogTitle: 'Free Refinance Calculator – Find Out If Refinancing Saves You Money',
    ogDescription:
      'Compare your current mortgage with a new rate to see monthly savings, break-even point, and lifetime interest savings.',
    faqs: [
      {
        question: 'When should I refinance my mortgage?',
        answer:
          'Refinancing generally makes sense if you can lower your rate by at least 0.5–1%, plan to stay in the home past the break-even point, and have good credit. Use our calculator to find your exact break-even.',
      },
      {
        question: 'What is the break-even point on a refinance?',
        answer:
          'The refinance break-even point is when your cumulative monthly savings exceed the closing costs. If closing costs are $4,000 and you save $200/month, your break-even is 20 months.',
      },
    ],
  },

  'emergency-fund': {
    slug: 'emergency-fund-calculator',
    category: 'Personal Finance',
    title: 'Emergency Fund Calculator – How Much Should You Save? | CalcWisePro',
    description:
      'Free emergency fund calculator. Find out exactly how much you need in your emergency fund based on your monthly expenses, job stability, and number of dependents. See a savings plan to get there.',
    keywords: [
      'emergency fund calculator',
      'how much emergency fund do I need',
      'emergency savings calculator',
      'rainy day fund calculator',
      '3 to 6 months expenses calculator',
      'emergency fund goal calculator',
      'how to build an emergency fund',
      'emergency fund USA',
      'free emergency fund calculator',
      'financial safety net calculator',
    ],
    ogTitle: 'Free Emergency Fund Calculator – How Much Do You Actually Need?',
    ogDescription:
      'Calculate your ideal emergency fund size based on your expenses and situation. Get a personalized savings plan to reach your goal.',
    faqs: [
      {
        question: 'How much should I have in an emergency fund?',
        answer:
          'Financial experts recommend saving 3–6 months of living expenses. Self-employed individuals or those with variable income should aim for 6–12 months.',
      },
      {
        question: 'Where should I keep my emergency fund?',
        answer:
          'Keep your emergency fund in a High-Yield Savings Account (HYSA) — it should be liquid (accessible immediately) but separate from your checking account to avoid spending it.',
      },
    ],
  },

  salary: {
    slug: 'salary-calculator',
    category: 'Personal Finance',
    title: 'Salary Calculator – Convert Annual to Hourly, Weekly & Monthly | CalcWisePro',
    description:
      'Free salary calculator. Convert any annual salary to hourly, weekly, bi-weekly, and monthly pay. Includes tax estimate, overtime calculator, and take-home pay breakdown for USA.',
    keywords: [
      'salary calculator',
      'annual salary to hourly calculator',
      'hourly rate calculator',
      'salary to hourly USA',
      'how much is my hourly rate',
      'monthly salary calculator',
      'weekly pay calculator',
      'take home pay calculator',
      'salary converter',
      'free salary calculator USA',
    ],
    ogTitle: 'Free Salary Calculator – Annual to Hourly, Weekly & Monthly Pay',
    ogDescription:
      'Convert any salary to hourly, weekly, or monthly pay instantly. Includes estimated take-home pay and overtime calculator.',
    faqs: [
      {
        question: 'How do I convert annual salary to hourly?',
        answer:
          'Divide your annual salary by 2,080 (52 weeks × 40 hours). A $60,000 salary equals about $28.85/hour.',
      },
      {
        question: 'How much is $20 an hour annually?',
        answer:
          '$20/hour × 40 hours/week × 52 weeks = $41,600 per year before taxes.',
      },
      {
        question: 'What is take-home pay?',
        answer:
          'Take-home pay is your net salary after federal taxes, state taxes, Social Security (6.2%), and Medicare (1.45%) are deducted from your gross pay.',
      },
    ],
  },
}

// ─── Helper Functions ──────────────────────────────────────────────────────
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

// Convert central metadata to Next.js Metadata format
export function getCalculatorPageMetadata(slug: string): Metadata {
  const meta = getCalculatorMetadata(slug)
  if (!meta) {
    return {
      title: 'Calculator Not Found',
      description: 'The requested calculator could not be found.',
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
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      images: [`${siteConfig.url}/og-image.png`],
    },
    alternates: {
      canonical: `${siteConfig.url}/${meta.slug}`,
    },
  }
}

export function getPageMetadata(pageKey: string): Metadata {
  const meta = pageMetadata[pageKey]
  if (!meta) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
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
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      images: [`${siteConfig.url}/og-image.png`],
    },
    alternates: {
      canonical: `${siteConfig.url}/${pageKey}`,
    },
  }
}