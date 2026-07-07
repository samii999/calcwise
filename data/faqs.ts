interface FAQ {
  question: string
  answer: string
}

interface FAQs {
  [key: string]: FAQ[]
}

export const faqs: FAQs = {
  'mortgage-calculator': [
    {
      question: 'What is a mortgage calculator?',
      answer: 'A mortgage calculator estimates your monthly mortgage payments based on home price, down payment, interest rate, and loan term.',
    },
    {
      question: 'How much house can I afford?',
      answer: 'Most lenders recommend spending no more than 28% of your gross monthly income on housing costs, and keeping total debt payments under 36% of your income.',
    },
    {
      question: 'What is PMI and when do I pay it?',
      answer: 'PMI (Private Mortgage Insurance) is required when your down payment is less than 20% of the home price. It protects the lender if you default.',
    },
    {
      question: 'Should I choose a 15-year or 30-year mortgage?',
      answer: 'A 15-year mortgage has higher monthly payments but saves thousands in interest. A 30-year mortgage has lower monthly payments but costs more in interest over time.',
    },
  ],
  'loan-calculator': [
    {
      question: 'What is the difference between secured and unsecured loans?',
      answer: 'Secured loans require collateral (like a car or house). Unsecured loans (like personal loans) do not require collateral but often have higher interest rates.',
    },
    {
      question: 'How is my loan interest calculated?',
      answer: 'Most loans use simple interest: Interest = Principal × Rate × Time. Your monthly payment goes toward both principal and interest.',
    },
  ],
  'compound-interest-calculator': [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is interest earned on both your initial principal and the accumulated interest from previous periods. It helps your money grow faster over time.',
    },
    {
      question: 'How often should I compound my interest?',
      answer: 'More frequent compounding (daily vs monthly) results in slightly higher returns. Monthly compounding is most common and provides good results.',
    },
  ],
  'car-loan-calculator': [
    {
      question: 'What is a good interest rate for a car loan?',
      answer: 'For 2026, good car loan rates range from 5% to 7% for well-qualified buyers. Rates vary based on credit score and loan term.',
    },
    {
      question: 'How long should my car loan be?',
      answer: 'A 36-60 month term is ideal. Longer terms (72-84 months) may have lower monthly payments but cost significantly more in interest.',
    },
  ],
  'retirement-calculator': [
    {
      question: 'How much money do I need to retire?',
      answer: 'A common rule of thumb is to save 25x your annual expenses. The 4% rule suggests you can withdraw 4% of your savings each year in retirement.',
    },
    {
      question: 'What is a good retirement age?',
      answer: 'The typical retirement age is 65, but many retire between 62-67. Your ideal retirement age depends on your savings, health, and lifestyle goals.',
    },
  ],
  'credit-card-payoff-calculator': [
    {
      question: 'How can I pay off credit card debt faster?',
      answer: 'Pay more than the minimum, use the debt avalanche method (highest interest first) or snowball method (smallest balance first).',
    },
    {
      question: 'What is a good credit card interest rate?',
      answer: 'The average credit card APR is around 22%. Low-interest cards offer 12-18% for well-qualified applicants.',
    },
  ],
  'investment-calculator': [
    {
      question: 'What is a good return on investment?',
      answer: 'The average stock market return is historically around 7-10% annually before inflation. A good ROI depends on your risk tolerance and investment timeline.',
    },
    {
      question: 'What is the difference between ROI and CAGR?',
      answer: 'ROI (Return on Investment) measures total return. CAGR (Compound Annual Growth Rate) measures the average annual growth rate over a specific period.',
    },
  ],
  'debt-payoff-calculator': [
    {
      question: 'What is the debt snowball method?',
      answer: 'The debt snowball method involves paying off your smallest debt first while making minimum payments on others. Once the smallest is paid off, you roll that payment into the next smallest debt.',
    },
    {
      question: 'What is the debt avalanche method?',
      answer: 'The debt avalanche method involves paying off debts with the highest interest rates first. This saves the most money in interest over time.',
    },
  ],
  'savings-goal-calculator': [
    {
      question: 'How much should I save each month?',
      answer: 'A common rule is to save at least 20% of your income. The 50/30/20 budget suggests 50% for needs, 30% for wants, and 20% for savings.',
    },
  ],
  'student-loan-calculator': [
    {
      question: 'What is the average student loan interest rate?',
      answer: 'Federal student loan rates for 2026 range from 4.5% to 7.5%. Private student loans can range from 4% to 14% based on credit score.',
    },
    {
      question: 'What are the different student loan repayment plans?',
      answer: 'Standard (10-year fixed), Graduated (starts low, increases), Income-Based (10% of income), and Extended (25-year) plans are available.',
    },
  ],
  'amortization-calculator': [
    {
      question: 'What is an amortization schedule?',
      answer: 'An amortization schedule shows how each payment is split between principal and interest over the life of the loan.',
    },
  ],
  'rent-vs-buy-calculator': [
    {
      question: 'Is it better to rent or buy?',
      answer: 'Buying builds equity but has higher upfront costs. Renting offers flexibility but you build no equity. The right choice depends on your financial situation and plans.',
    },
  ],
  'net-worth-calculator': [
    {
      question: 'What is a good net worth?',
      answer: 'Net worth depends on age and income. A common benchmark is: Net worth = Age × Annual Income ÷ 10.',
    },
  ],
  'budget-calculator': [
    {
      question: 'What is the 50/30/20 budget rule?',
      answer: 'The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.',
    },
  ],
  'inflation-calculator': [
    {
      question: 'How does inflation affect my savings?',
      answer: 'Inflation reduces the purchasing power of your money over time. A dollar today will buy less in the future as prices increase.',
    },
  ],
  'simple-interest-calculator': [
    {
      question: 'What is the difference between simple and compound interest?',
      answer: 'Simple interest is calculated only on the principal amount. Compound interest is calculated on both the principal and accumulated interest.',
    },
  ],
  'home-affordability-calculator': [
    {
      question: 'How much home can I afford?',
      answer: 'Most experts recommend spending no more than 28% of your gross income on housing and keeping total debt under 36% of income.',
    },
  ],
  'refinance-calculator': [
    {
      question: 'When should I refinance my mortgage?',
      answer: 'Refinance when interest rates are at least 0.5-1% lower than your current rate and you plan to stay in the home long enough to recoup closing costs.',
    },
  ],
  'emergency-fund-calculator': [
    {
      question: 'How much should I have in my emergency fund?',
      answer: 'Financial experts recommend saving 3-6 months of living expenses in an easily accessible account.',
    },
  ],
  'salary-calculator': [
    {
      question: 'How do I convert annual salary to hourly rate?',
      answer: 'Hourly rate = Annual Salary ÷ (Hours per Week × Weeks per Year). For a $75,000 salary with 40-hour weeks, the hourly rate is about $36.06.',
    },
  ],
}