/**
 * Investment Return Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface InvestmentInputs {
  initialCapital: number
  endValue: number
  investmentYears: number
  investmentMonths: number
  monthlyContribution?: number
  contributionFrequency?: 'monthly' | 'bi-weekly' | 'weekly' | 'annually'
  maintenanceFees: number
  upfrontFees: number
  outgoingFees: number
  dividends: number
  dividendYield: number
  dividendGrowthRate?: number
  reinvestDividends: boolean
  inflationRate?: number
  taxRate?: number
  dividendTaxRate?: number
  investmentType?: string
  country: string
}

export interface InvestmentResults {
  netProfit: number
  totalROI: number
  cagr: number
  totalDividends: number
  totalFees: number
  totalContributions: number
  inflationAdjustedValue: number
  realCAGR: number
  afterTaxProfit: number
  afterTaxROI: number
  yearlyData: YearlyData[]
  benchmarkComparison?: {
    sp500: number
    nasdaq: number
    housing: number
    beatSP500: boolean
    beatNasdaq: boolean
  }
  feeImpact?: number
  dividendImpact?: number
  taxImpact?: number
  inflationImpact?: number
}

export interface YearlyData {
  year: number
  balance: number
  contributions: number
  returns: number
  dividends: number
  fees: number
}

export function calculateInvestment(inputs: InvestmentInputs): InvestmentResults {
  const {
    initialCapital,
    endValue,
    investmentYears,
    investmentMonths,
    monthlyContribution = 0,
    contributionFrequency = 'monthly',
    maintenanceFees = 0,
    upfrontFees = 0,
    outgoingFees = 0,
    dividends = 0,
    dividendYield = 0,
    dividendGrowthRate = 0,
    reinvestDividends = false,
    inflationRate = 3,
    taxRate = 15,
    dividendTaxRate = 15,
  } = inputs

  // ===== 1. CALCULATE TOTAL TIME IN YEARS =====
  const totalYears = investmentYears + investmentMonths / 12

  // ===== 2. CALCULATE CONTRIBUTIONS =====
  let totalContributions = 0
  const contributionsPerYear = (() => {
    switch (contributionFrequency) {
      case 'weekly': return monthlyContribution * 52
      case 'bi-weekly': return monthlyContribution * 26
      case 'annually': return monthlyContribution * 12
      default: return monthlyContribution * 12
    }
  })()
  totalContributions = contributionsPerYear * totalYears

  // ===== 3. CALCULATE TOTAL DIVIDENDS WITH GROWTH =====
  let totalDividends = dividends
  let currentDividendYield = dividendYield
  
  if (dividendYield > 0 && totalYears > 0) {
    if (reinvestDividends) {
      // With reinvestment and growth
      let balance = initialCapital
      for (let y = 0; y < Math.floor(totalYears); y++) {
        const yearDividend = balance * (currentDividendYield / 100)
        balance += yearDividend + contributionsPerYear
        totalDividends += yearDividend
        currentDividendYield *= (1 + dividendGrowthRate / 100)
      }
      // Handle partial year
      const remainder = totalYears - Math.floor(totalYears)
      if (remainder > 0) {
        const partialDividend = balance * (currentDividendYield / 100) * remainder
        totalDividends += partialDividend
      }
    } else {
      // Without reinvestment, with growth
      let avgBalance = initialCapital
      for (let y = 0; y < Math.floor(totalYears); y++) {
        const yearDividend = avgBalance * (currentDividendYield / 100)
        totalDividends += yearDividend
        avgBalance += contributionsPerYear
        currentDividendYield *= (1 + dividendGrowthRate / 100)
      }
    }
  }

  // ===== 4. CALCULATE FEES =====
  const totalFees = upfrontFees + outgoingFees + (maintenanceFees * totalYears)

  // ===== 5. CALCULATE NET PROFIT =====
  const totalInvested = initialCapital + totalContributions + totalFees
  const grossProfit = (endValue + totalDividends) - totalInvested
  
  // ===== 6. CALCULATE TAX IMPACT =====
  const capitalGains = endValue - (initialCapital + totalContributions)
  const capitalGainsTax = Math.max(0, capitalGains * (taxRate / 100))
  const dividendTax = totalDividends * (dividendTaxRate / 100)
  const totalTax = capitalGainsTax + dividendTax
  const afterTaxProfit = grossProfit - totalTax

  // ===== 7. CALCULATE ROI =====
  const totalROI = totalInvested > 0 ? (grossProfit / totalInvested) * 100 : 0
  const afterTaxROI = totalInvested > 0 ? (afterTaxProfit / totalInvested) * 100 : 0

  // ===== 8. CALCULATE CAGR =====
  let cagr = 0
  if (totalYears > 0 && initialCapital > 0) {
    const totalReturn = (endValue + totalDividends) / (initialCapital + upfrontFees + totalContributions)
    if (totalReturn > 0) {
      cagr = (Math.pow(totalReturn, 1 / totalYears) - 1) * 100
    }
  }

  // ===== 9. INFLATION ADJUSTMENT =====
  const inflationFactor = Math.pow(1 + inflationRate / 100, totalYears)
  const inflationAdjustedValue = endValue / inflationFactor
  const realCAGR = ((1 + cagr / 100) / (1 + inflationRate / 100) - 1) * 100

  // ===== 10. YEARLY DATA =====
  const yearlyData: YearlyData[] = []
  let currentBalance = initialCapital
  const totalPeriods = Math.max(1, Math.ceil(totalYears))
  const annualReturnRate = cagr / 100
  currentDividendYield = dividendYield

  for (let year = 1; year <= totalPeriods; year++) {
    const yearReturn = currentBalance * annualReturnRate
    const yearDividends = currentBalance * (currentDividendYield / 100)
    const yearFees = maintenanceFees
    const yearContributions = contributionsPerYear

    if (reinvestDividends) {
      currentBalance = currentBalance + yearReturn + yearDividends + yearContributions - yearFees
    } else {
      currentBalance = currentBalance + yearReturn + yearContributions - yearFees
    }

    currentDividendYield *= (1 + dividendGrowthRate / 100)

    yearlyData.push({
      year,
      balance: Math.round(currentBalance),
      contributions: Math.round(yearContributions),
      returns: Math.round(yearReturn),
      dividends: Math.round(yearDividends),
      fees: Math.round(yearFees),
    })
  }

  // ===== 11. BENCHMARK COMPARISON =====
  const sp500AnnualReturn = 10
  const nasdaqAnnualReturn = 12
  const housingAnnualReturn = 4.5

  const sp500Return = totalYears > 0 ? (Math.pow(1 + sp500AnnualReturn / 100, totalYears) - 1) * 100 : 0
  const nasdaqReturn = totalYears > 0 ? (Math.pow(1 + nasdaqAnnualReturn / 100, totalYears) - 1) * 100 : 0
  const housingReturn = totalYears > 0 ? (Math.pow(1 + housingAnnualReturn / 100, totalYears) - 1) * 100 : 0

  const investmentTotalReturn = totalYears > 0 ? ((endValue + totalDividends) / (initialCapital + upfrontFees + totalContributions) - 1) * 100 : 0

  const benchmarkComparison = {
    sp500: Math.round(sp500Return * 100) / 100,
    nasdaq: Math.round(nasdaqReturn * 100) / 100,
    housing: Math.round(housingReturn * 100) / 100,
    beatSP500: investmentTotalReturn > sp500Return,
    beatNasdaq: investmentTotalReturn > nasdaqReturn,
  }

  // ===== 12. IMPACT ANALYSIS =====
  const feeImpact = totalFees
  const dividendImpact = totalDividends
  const taxImpact = totalTax
  const inflationImpact = endValue - inflationAdjustedValue

  return {
    netProfit: Math.round(grossProfit),
    totalROI: Math.round(totalROI * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    totalDividends: Math.round(totalDividends),
    totalFees: Math.round(totalFees),
    totalContributions: Math.round(totalContributions),
    inflationAdjustedValue: Math.round(inflationAdjustedValue),
    realCAGR: Math.round(realCAGR * 100) / 100,
    afterTaxProfit: Math.round(afterTaxProfit),
    afterTaxROI: Math.round(afterTaxROI * 100) / 100,
    yearlyData,
    benchmarkComparison,
    feeImpact: Math.round(feeImpact),
    dividendImpact: Math.round(dividendImpact),
    taxImpact: Math.round(taxImpact),
    inflationImpact: Math.round(inflationImpact),
  }
}