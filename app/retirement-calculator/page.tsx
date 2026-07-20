'use client'

import { useState, useCallback, useMemo } from 'react'
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CalculatorForm } from '@/components/calculators/CalculatorForm'
import { ResultsDisplay } from '@/components/calculators/ResultsDisplay'
import { calculateRetirement } from '@/lib/calculators/retirement'
import { AdUnit } from '@/components/ui/AdUnit'

export default function RetirementCalculatorPage() {
  const [results, setResults] = useState<any>(null)
  const [formValues, setFormValues] = useState<any>(null)
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'CAD' | 'AUD'>('USD')

  const handleCalculate = useCallback((values: any) => {
    setFormValues(values)
    const result = calculateRetirement({
      currentAge: values.currentAge,
      retirementAge: values.retirementAge,
      currentSalary: values.currentSalary,
      currentSavings: values.currentSavings,
      contributionRate: values.contributionRate,
      employerMatchRate: values.employerMatchRate || 0,
      employerMatchLimit: values.employerMatchLimit || 0,
      preRetirementReturn: values.preRetirementReturn || 8,
      postRetirementReturn: values.postRetirementReturn || 5,
      salaryGrowthRate: values.salaryGrowthRate || 2,
      lifeExpectancy: values.lifeExpectancy || 85,
      inflationRate: values.inflationRate || 2.5,
      annualWithdrawal: values.annualWithdrawal || 0,
      country: values.country || 'US',
      desiredRetirementIncome: values.desiredRetirementIncome || 0,
      socialSecurityIncome: values.socialSecurityIncome || 0,
      pensionIncome: values.pensionIncome || 0,
      otherRetirementIncome: values.otherRetirementIncome || 0,
      preRetirementTaxRate: values.preRetirementTaxRate || 22,
      postRetirementTaxRate: values.postRetirementTaxRate || 15,
      annualHealthcareCost: values.annualHealthcareCost || 12000,
      accountType: values.accountType || 'traditional401k',
      maritalStatus: values.maritalStatus || 'single',
      expectedLumpSum: values.expectedLumpSum || 0,
      retirementExpenseMultiplier: values.retirementExpenseMultiplier || 80,
    })
    setResults(result)
  }, [])

  const inputs = useMemo(() => [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number' as const,
      value: 30,
      min: 18,
      max: 70,
      step: 1,
      suffix: ' years',
      tooltip: 'Your current age',
      required: true,
    },
    {
      id: 'retirementAge',
      label: 'Target Retirement Age',
      type: 'number' as const,
      value: 67,
      min: 40,
      max: 80,
      step: 1,
      suffix: ' years',
      tooltip: 'Age you plan to retire',
      required: true,
    },
    {
      id: 'currentSalary',
      label: 'Current Annual Salary',
      type: 'number' as const,
      value: 80000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Your current annual income',
      required: true,
    },
    {
      id: 'currentSavings',
      label: 'Current Retirement Savings',
      type: 'number' as const,
      value: 25000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: '$',
      tooltip: 'Current balance in retirement accounts',
      required: true,
    },
    {
      id: 'contributionRate',
      label: 'Contribution Rate',
      type: 'range' as const,
      value: 10,
      min: 0,
      max: 30,
      step: 0.5,
      suffix: '%',
      tooltip: 'Percentage of salary you contribute',
      required: true,
    },
    {
      id: 'accountType',
      label: 'Account Type',
      type: 'select' as const,
      value: 'traditional401k',
      options: [
        { value: 'traditional401k', label: 'Traditional 401(k)' },
        { value: 'roth401k', label: 'Roth 401(k)' },
        { value: 'traditionalira', label: 'Traditional IRA' },
        { value: 'rothira', label: 'Roth IRA' },
        { value: 'taxable', label: 'Taxable Account' },
      ],
      tooltip: 'Type of retirement account for tax calculations',
      required: true,
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select' as const,
      value: 'single',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'widowed', label: 'Widowed' },
      ],
      tooltip: 'Marital status affects tax calculations',
      required: true,
    },
    {
      id: 'desiredRetirementIncome',
      label: 'Desired Annual Retirement Income',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 500000,
      step: 1000,
      prefix: '$',
      tooltip: 'Annual income needed in retirement (leave 0 to use 80% of current salary)',
      required: false,
    },
    {
      id: 'socialSecurityIncome',
      label: 'Expected Social Security (Annual)',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 100000,
      step: 500,
      prefix: '$',
      tooltip: 'Expected annual Social Security benefits',
      required: false,
    },
    {
      id: 'pensionIncome',
      label: 'Pension Income (Annual)',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 200000,
      step: 1000,
      prefix: '$',
      tooltip: 'Annual pension income from employer',
      required: false,
    },
    {
      id: 'otherRetirementIncome',
      label: 'Other Retirement Income (Annual)',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 200000,
      step: 1000,
      prefix: '$',
      tooltip: 'Other annual income (rentals, investments, etc.)',
      required: false,
    },
    {
      id: 'retirementExpenseMultiplier',
      label: 'Retirement Expenses (% of Current Salary)',
      type: 'range' as const,
      value: 80,
      min: 50,
      max: 120,
      step: 5,
      suffix: '%',
      tooltip: 'Percentage of current salary needed in retirement (80% is typical)',
      required: true,
    },
    {
      id: 'employerMatchRate',
      label: 'Employer Match Rate',
      type: 'number' as const,
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      suffix: '%',
      tooltip: 'Percentage of your contribution matched by employer',
      required: false,
    },
    {
      id: 'employerMatchLimit',
      label: 'Employer Match Limit',
      type: 'number' as const,
      value: 6,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: '%',
      tooltip: 'Maximum percentage of salary employer will match',
      required: false,
    },
    {
      id: 'preRetirementReturn',
      label: 'Pre-Retirement Return Rate',
      type: 'range' as const,
      value: 8,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: '%',
      tooltip: 'Expected annual investment return before retirement',
      required: true,
    },
    {
      id: 'postRetirementReturn',
      label: 'Post-Retirement Return Rate',
      type: 'range' as const,
      value: 5,
      min: 1,
      max: 10,
      step: 0.5,
      suffix: '%',
      tooltip: 'Expected annual investment return after retirement (conservative)',
      required: true,
    },
    {
      id: 'salaryGrowthRate',
      label: 'Salary Growth Rate',
      type: 'range' as const,
      value: 2,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: '%',
      tooltip: 'Expected annual salary increase',
      required: true,
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number' as const,
      value: 85,
      min: 70,
      max: 100,
      step: 1,
      suffix: ' years',
      tooltip: 'Age to which you want your savings to last',
      required: true,
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'range' as const,
      value: 2.5,
      min: 0,
      max: 6,
      step: 0.1,
      suffix: '%',
      tooltip: 'Expected annual inflation rate',
      required: true,
    },
    {
      id: 'annualWithdrawal',
      label: 'Annual Withdrawal (Optional)',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 200000,
      step: 1000,
      prefix: '$',
      tooltip: 'Fixed annual withdrawal amount (leave 0 for 4% rule)',
      required: false,
    },
    {
      id: 'preRetirementTaxRate',
      label: 'Pre-Retirement Tax Rate',
      type: 'range' as const,
      value: 22,
      min: 10,
      max: 50,
      step: 1,
      suffix: '%',
      tooltip: 'Current marginal tax rate for tax calculations',
      required: true,
    },
    {
      id: 'postRetirementTaxRate',
      label: 'Post-Retirement Tax Rate',
      type: 'range' as const,
      value: 15,
      min: 0,
      max: 40,
      step: 1,
      suffix: '%',
      tooltip: 'Expected tax rate in retirement',
      required: true,
    },
    {
      id: 'annualHealthcareCost',
      label: 'Annual Healthcare Cost',
      type: 'number' as const,
      value: 12000,
      min: 0,
      max: 50000,
      step: 1000,
      prefix: '$',
      tooltip: 'Expected annual healthcare expenses in retirement',
      required: true,
    },
    {
      id: 'expectedLumpSum',
      label: 'Expected Lump Sum at Retirement',
      type: 'number' as const,
      value: 0,
      min: 0,
      max: 1000000,
      step: 5000,
      prefix: '$',
      tooltip: 'Expected lump sum (inheritance, bonus, sale) at retirement',
      required: false,
    },
  ], [])

  return (
    <>
      <CalculatorLayout
        title="🏦 Comprehensive Retirement Calculator"
        description="Plan your retirement with Social Security, pensions, healthcare costs, tax implications, and multiple account types. See if you're on track for a comfortable retirement."
        icon="🏦"
      >
        {/* ✅ Comprehensive Guide at the TOP */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                📖
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                Comprehensive Retirement Planning Guide
                <span className="text-xs font-normal text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200/50">
                  Free & Accurate
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Plan your retirement with advanced features including Social Security, pensions, healthcare costs, tax implications, and multiple account types (401k, IRA, Roth). Perfect for FIRE movement, traditional retirement, and comprehensive financial planning.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Step 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h4 className="font-medium text-gray-800">Personal Profile</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Current Age</strong> - Your age today</li>
                    <li>• <strong>Retirement Age</strong> - When to retire</li>
                    <li>• <strong>Annual Salary</strong> - Current income</li>
                    <li>• <strong>Current Savings</strong> - Retirement balance</li>
                    <li>• <strong>Marital Status</strong> - Tax implications</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h4 className="font-medium text-gray-800">Account & Contributions</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Account Type</strong> - 401k, IRA, Roth</li>
                    <li>• <strong>Contribution Rate</strong> - % of salary</li>
                    <li>• <strong>Employer Match</strong> - Free money!</li>
                    <li>• <strong>Salary Growth</strong> - Expected raises</li>
                    <li>• <strong>Tax Rates</strong> - Pre & post-retirement</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h4 className="font-medium text-gray-800">Retirement Income</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Social Security</strong> - Annual benefits</li>
                    <li>• <strong>Pension Income</strong> - Company pension</li>
                    <li>• <strong>Other Income</strong> - Rentals, investments</li>
                    <li>• <strong>Desired Income</strong> - Lifestyle goal</li>
                    <li>• <strong>Expense Ratio</strong> - % of current salary</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <h4 className="font-medium text-gray-800">Advanced Settings</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li>• <strong>Healthcare Costs</strong> - Medical expenses</li>
                    <li>• <strong>Investment Returns</strong> - Pre & post-retirement</li>
                    <li>• <strong>Inflation</strong> - Cost of living</li>
                    <li>• <strong>Life Expectancy</strong> - Planning horizon</li>
                    <li>• <strong>Lump Sum</strong> - Inheritance, bonus</li>
                  </ul>
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-500">✓</span>
                    <span className="font-medium text-gray-800 text-sm">Multiple Account Types</span>
                  </div>
                  <p className="text-xs text-gray-600">Traditional 401(k), Roth 401(k), Traditional IRA, Roth IRA, Taxable accounts with tax-optimized calculations</p>
                </div>
                <div className="p-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-500">✓</span>
                    <span className="font-medium text-gray-800 text-sm">Income Sources</span>
                  </div>
                  <p className="text-xs text-gray-600">Social Security projections, pension income, rental income, and other retirement income streams</p>
                </div>
                <div className="p-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-500">✓</span>
                    <span className="font-medium text-gray-800 text-sm">Tax & Healthcare</span>
                  </div>
                  <p className="text-xs text-gray-600">Pre and post-retirement tax rates, healthcare cost projections, and inflation-adjusted analysis</p>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> The 4% Rule suggests you can withdraw 4% of your retirement savings annually for 30+ years. Our calculator enhances this with Social Security, pensions, healthcare costs, and tax implications to give you a complete picture of retirement readiness. Maximize your employer match first - it's free money!
                  </p>
                </div>
              </div>

              {/* SEO Content */}
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Why Use Our Retirement Calculator?</strong> Our comprehensive retirement calculator helps you estimate retirement savings growth with advanced features including Social Security projections, pension income, healthcare costs, tax implications, and multiple account types (401k, IRA, Roth). Whether you're planning for early retirement (FIRE), traditional retirement, or calculating required contributions, our tool provides accurate calculations with detailed year-by-year projections, inflation-adjusted analysis, and personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <CalculatorForm 
              inputs={inputs} 
              onCalculate={handleCalculate}
              onCurrencyChange={setCurrency}
              showCurrency={true}
              showAdvanced={true}
            />
          </div>
          <div className="lg:col-span-2">
            <ResultsDisplay results={results} formValues={formValues} currency={currency} />
          </div>
        </div>
      </CalculatorLayout>

      <div className="container mx-auto px-4 mt-8">
        <AdUnit format="horizontal" slot="banner-ad-slot" />
      </div>
    </>
  )
}