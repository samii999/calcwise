/**
 * Rent vs Buy Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface RentVsBuyInputs {
  homePrice: number
  downPaymentPercent: number
  mortgageRate: number
  loanTerm: number
  monthlyRent: number
  rentIncreaseRate: number
  propertyTaxRate: number
  homeInsurance: number
  maintenancePercent: number
  closingCostsPercent: number
  sellingCostsPercent: number
  homeAppreciationRate: number
  investmentReturn: number
  comparisonYears: number
  country: string
}

export interface RentVsBuyResults {
  buyTotalCost: number
  rentTotalCost: number
  buyEquity: number
  rentSavings: number
  buyBetter: boolean
  breakEvenYear: number
  verdict: string
  verdictMessage: string
  yearlyComparison: YearlyComparison[]
  buySummary: CostSummary
  rentSummary: CostSummary
}

export interface YearlyComparison {
  year: number
  buyCost: number
  rentCost: number
  buyEquity: number
  rentSavings: number
  cumulativeDifference: number
}

export interface CostSummary {
  totalCost: number
  totalInterest: number
  totalTax: number
  totalInsurance: number
  totalMaintenance: number
  totalClosingCosts: number
  totalSellingCosts: number
  equity: number
}

export function calculateRentVsBuy(inputs: RentVsBuyInputs): RentVsBuyResults {
  const {
    homePrice,
    downPaymentPercent,
    mortgageRate,
    loanTerm,
    monthlyRent,
    rentIncreaseRate,
    propertyTaxRate,         // ✅ Use the user-provided value
    homeInsurance,
    maintenancePercent,
    closingCostsPercent,
    sellingCostsPercent,
    homeAppreciationRate,
    investmentReturn,
    comparisonYears,
    country,                 // ⚠️ Kept for completeness, but not used in calculation
  } = inputs

  // ❌ Removed: const propertyTaxRate = getCountryTaxRate(country)
  // ✅ The country selector only auto-fills the input; user can override.

  const downPayment = homePrice * (downPaymentPercent / 100)
  const loanAmount = homePrice - downPayment
  const monthlyRate = mortgageRate / 100 / 12
  const totalMonths = loanTerm * 12

  // ===== 1. MORTGAGE PAYMENT =====
  let monthlyMortgage = 0
  if (loanAmount === 0) {
    monthlyMortgage = 0
  } else if (monthlyRate === 0) {
    monthlyMortgage = loanAmount / totalMonths
  } else {
    monthlyMortgage =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  }

  const closingCosts = homePrice * (closingCostsPercent / 100)
  const sellingCosts = homePrice * (sellingCostsPercent / 100)

  // ===== 2. YEARLY SIMULATION =====
  let buyTotalCost = 0
  let rentTotalCost = 0
  let buyEquity = downPayment
  let rentSavings = 0
  let breakEvenYear = 0
  let buyBetter = false
  let cumulativeDifference = -downPayment - closingCosts

  const yearlyComparison: YearlyComparison[] = []
  let currentRent = monthlyRent * 12
  let currentHomeValue = homePrice
  let currentLoanBalance = loanAmount
  let totalInterest = 0
  let totalTax = 0
  let totalInsurance = 0
  let totalMaintenance = 0
  let totalClosingCosts = closingCosts
  let totalSellingCosts = sellingCosts

  let investedRentSavings = 0
  let totalRent = 0

  for (let year = 1; year <= comparisonYears; year++) {
    // ===== BUY COSTS =====
    const annualMortgage = monthlyMortgage * 12
    const annualTax = homePrice * (propertyTaxRate / 100)   // ✅ Uses input rate
    const annualInsurance = homeInsurance
    const annualMaintenance = homePrice * (maintenancePercent / 100)

    // Mortgage interest for the year
    let yearInterest = 0
    for (let month = 1; month <= 12; month++) {
      if (currentLoanBalance <= 0) break
      const monthlyInterest = currentLoanBalance * monthlyRate
      const monthlyPrincipal = monthlyMortgage - monthlyInterest
      currentLoanBalance -= monthlyPrincipal
      yearInterest += monthlyInterest
    }

    totalInterest += yearInterest
    totalTax += annualTax
    totalInsurance += annualInsurance
    totalMaintenance += annualMaintenance

    const buyYearCost = annualMortgage + annualTax + annualInsurance + annualMaintenance
    buyTotalCost += buyYearCost

    // Home appreciation
    currentHomeValue = currentHomeValue * (1 + homeAppreciationRate / 100)

    // Equity = home value - loan balance + down payment
    buyEquity = currentHomeValue - Math.max(0, currentLoanBalance)

    // ===== RENT COSTS =====
    const rentYearCost = currentRent
    rentTotalCost += rentYearCost
    totalRent += rentYearCost

    // Rent increase
    currentRent = currentRent * (1 + rentIncreaseRate / 100)

    // Investment opportunity (rent savings invested)
    const rentSavingsYear = buyYearCost - rentYearCost
    if (rentSavingsYear > 0) {
      investedRentSavings = investedRentSavings * (1 + investmentReturn / 100) + rentSavingsYear
    }
    rentSavings = investedRentSavings

    // Cumulative difference
    cumulativeDifference = buyEquity - rentSavings - closingCosts - sellingCosts

    yearlyComparison.push({
      year,
      buyCost: Math.round(buyYearCost),
      rentCost: Math.round(rentYearCost),
      buyEquity: Math.round(buyEquity),
      rentSavings: Math.round(rentSavings),
      cumulativeDifference: Math.round(cumulativeDifference),
    })

    // Check break-even
    if (cumulativeDifference > 0 && breakEvenYear === 0) {
      breakEvenYear = year
    }
  }

  // ===== 3. FINAL SUMMARY =====
  buyBetter = cumulativeDifference > 0

  // ===== 4. VERDICT =====
  let verdict = ''
  let verdictMessage = ''

  if (buyBetter) {
    verdict = 'Buying is the financial winner!'
    verdictMessage = `By staying in this property for ${comparisonYears} years, choosing to Buy will increase your long-term wealth by an estimated $${Math.abs(cumulativeDifference).toLocaleString()} compared to Renting!`
  } else {
    verdict = 'Renting is the financial winner!'
    verdictMessage = `By staying in this property for ${comparisonYears} years, choosing to Rent will increase your long-term wealth by an estimated $${Math.abs(cumulativeDifference).toLocaleString()} compared to Buying!`
  }

  return {
    buyTotalCost: Math.round(buyTotalCost),
    rentTotalCost: Math.round(rentTotalCost),
    buyEquity: Math.round(buyEquity),
    rentSavings: Math.round(rentSavings),
    buyBetter,
    breakEvenYear,
    verdict,
    verdictMessage,
    yearlyComparison,
    buySummary: {
      totalCost: Math.round(buyTotalCost + downPayment + closingCosts + sellingCosts),
      totalInterest: Math.round(totalInterest),
      totalTax: Math.round(totalTax),
      totalInsurance: Math.round(totalInsurance),
      totalMaintenance: Math.round(totalMaintenance),
      totalClosingCosts: Math.round(totalClosingCosts),
      totalSellingCosts: Math.round(totalSellingCosts),
      equity: Math.round(buyEquity),
    },
    rentSummary: {
      totalCost: Math.round(rentTotalCost),
      totalInterest: 0,
      totalTax: 0,
      totalInsurance: 0,
      totalMaintenance: 0,
      totalClosingCosts: 0,
      totalSellingCosts: 0,
      equity: Math.round(rentSavings),
    },
  }
}