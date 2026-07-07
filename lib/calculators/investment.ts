/**
 * Investment Return Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface InvestmentInputs {
  initialCapital: number
  endValue: number
  investmentYears: number
  investmentMonths: number
  maintenanceFees: number
  upfrontFees: number
  outgoingFees: number
  dividends: number
  dividendYield: number
  reinvestDividends: boolean
  country: string
}

export interface InvestmentResults {
  netProfit: number
  totalROI: number
  cagr: number
  totalDividends: number
  totalFees: number
  yearlyData: YearlyData[]
  benchmarkComparison?: {
    sp500: number
    nasdaq: number
    housing: number
    beatSP500: boolean
    beatNasdaq: boolean
  }
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
    maintenanceFees = 0,
    upfrontFees = 0,
    outgoingFees = 0,
    dividends = 0,
    dividendYield = 0,
    reinvestDividends = false,
  } = inputs

  // ===== 1. CALCULATE TOTAL TIME IN YEARS =====
  const totalYears = investmentYears + investmentMonths / 12

  // ===== 2. CALCULATE TOTAL DIVIDENDS =====
  let totalDividends = dividends
  if (dividendYield > 0 && totalYears > 0) {
    // ✅ More accurate: Use geometric average for dividends
    if (reinvestDividends) {
      // With reinvestment, dividends compound
      let balance = initialCapital
      for (let y = 0; y < Math.floor(totalYears); y++) {
        const yearDividend = balance * (dividendYield / 100)
        balance += yearDividend
        totalDividends += yearDividend
      }
      // Handle partial year
      const remainder = totalYears - Math.floor(totalYears)
      if (remainder > 0) {
        const partialDividend = balance * (dividendYield / 100) * remainder
        totalDividends += partialDividend
      }
    } else {
      // Simple average method for non-reinvested dividends
      const avgCapital = (initialCapital + endValue) / 2
      totalDividends = avgCapital * (dividendYield / 100) * totalYears
    }
  }

  // ===== 3. CALCULATE NET PROFIT =====
  const totalFees = upfrontFees + outgoingFees + (maintenanceFees * totalYears)
  const totalInvested = initialCapital + totalFees
  const netProfit = (endValue + totalDividends) - totalInvested

  // ===== 4. CALCULATE ROI =====
  const totalROI = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0

  // ===== 5. CALCULATE CAGR =====
  let cagr = 0
  if (totalYears > 0 && initialCapital > 0) {
    const totalReturn = (endValue + totalDividends) / (initialCapital + upfrontFees)
    if (totalReturn > 0) {
      cagr = (Math.pow(totalReturn, 1 / totalYears) - 1) * 100
    }
  }

  // ===== 6. YEARLY DATA =====
  const yearlyData: YearlyData[] = []
  let currentBalance = initialCapital
  const totalPeriods = Math.max(1, Math.ceil(totalYears))

  // ✅ Use CAGR for projections (consistent annual growth)
  const annualReturnRate = cagr / 100

  for (let year = 1; year <= totalPeriods; year++) {
    const yearReturn = currentBalance * annualReturnRate

    // Calculate dividends for this year
    const yearDividends = currentBalance * (dividendYield / 100)
    const yearFees = maintenanceFees

    // Update balance based on reinvestment option
    if (reinvestDividends) {
      currentBalance = currentBalance + yearReturn + yearDividends - yearFees
    } else {
      // Dividends taken as cash (not reinvested)
      currentBalance = currentBalance + yearReturn - yearFees
      // Dividends added to total but not to balance
    }

    yearlyData.push({
      year,
      balance: Math.round(currentBalance),
      contributions: Math.round(initialCapital),
      returns: Math.round(yearReturn),
      dividends: Math.round(yearDividends),
      fees: Math.round(yearFees),
    })
  }

  // ===== 7. BENCHMARK COMPARISON =====
  // ✅ Corrected: Use compound growth for benchmarks
  const sp500AnnualReturn = 10 // 10% average annual return
  const nasdaqAnnualReturn = 12 // 12% average annual return
  const housingAnnualReturn = 4.5 // 4.5% average annual return

  // Calculate compounded returns
  const sp500Return = totalYears > 0 ? (Math.pow(1 + sp500AnnualReturn / 100, totalYears) - 1) * 100 : 0
  const nasdaqReturn = totalYears > 0 ? (Math.pow(1 + nasdaqAnnualReturn / 100, totalYears) - 1) * 100 : 0
  const housingReturn = totalYears > 0 ? (Math.pow(1 + housingAnnualReturn / 100, totalYears) - 1) * 100 : 0

  // Calculate investment's total return
  const investmentTotalReturn = totalYears > 0 ? ((endValue + totalDividends) / (initialCapital + upfrontFees) - 1) * 100 : 0
  const investmentAnnualized = cagr

  const benchmarkComparison = {
    sp500: Math.round(sp500Return * 100) / 100,
    nasdaq: Math.round(nasdaqReturn * 100) / 100,
    housing: Math.round(housingReturn * 100) / 100,
    beatSP500: investmentTotalReturn > sp500Return,
    beatNasdaq: investmentTotalReturn > nasdaqReturn,
  }

  return {
    netProfit: Math.round(netProfit),
    totalROI: Math.round(totalROI * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    totalDividends: Math.round(totalDividends),
    totalFees: Math.round(totalFees),
    yearlyData,
    benchmarkComparison,
  }
}