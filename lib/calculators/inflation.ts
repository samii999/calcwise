/**
 * Inflation Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface InflationInputs {
  amount: number
  startYear: number
  endYear: number
  customRate: number
  mode: 'historical' | 'forward'
  useCustomRate: boolean
  currency: string
}

export interface InflationResults {
  futureValue: number
  inflationAdjustedValue: number
  totalLoss: number
  purchasingPower: number
  requiredReturn: number
  yearlyData: YearlyData[]
  cpiData: CPIData[]
  basketComparison: BasketItem[]
}

export interface YearlyData {
  year: number
  nominalValue: number
  realValue: number
  cumulativeInflation: number
  annualInflationRate: number
}

export interface CPIData {
  year: number
  cpi: number
  inflationRate: number
}

export interface BasketItem {
  item: string
  startPrice: number
  endPrice: number
  percentChange: number
}

// Historical CPI data (USA - approximate averages)
const HISTORICAL_CPI: { [key: number]: number } = {
  1920: 20.0, 1925: 17.5, 1930: 16.7, 1935: 13.7, 1940: 14.0,
  1945: 18.0, 1950: 24.1, 1955: 26.8, 1960: 29.6, 1965: 31.5,
  1970: 38.8, 1975: 53.8, 1980: 82.4, 1985: 107.6, 1990: 130.7,
  1995: 152.4, 2000: 172.2, 2005: 195.3, 2010: 218.1, 2015: 237.0,
  2020: 258.8, 2021: 270.0, 2022: 292.7, 2023: 304.7, 2024: 313.5,
  2025: 322.5, 2026: 330.0,
}

// ✅ Fallback for missing CPI years
const getCPI = (year: number): number => {
  if (HISTORICAL_CPI[year]) return HISTORICAL_CPI[year]
  // Find nearest available year
  const years = Object.keys(HISTORICAL_CPI).map(Number).sort((a, b) => a - b)
  let closest = years[0]
  for (const y of years) {
    if (Math.abs(y - year) < Math.abs(closest - year)) {
      closest = y
    }
  }
  return HISTORICAL_CPI[closest] || 100
}

// Common basket items for comparison
const BASKET_ITEMS = [
  { item: 'Gallon of Milk', basePrice: 4.50 },
  { item: 'Dozen Eggs', basePrice: 3.50 },
  { item: 'Loaf of Bread', basePrice: 2.50 },
  { item: 'Gallon of Gas', basePrice: 3.50 },
  { item: 'Movie Ticket', basePrice: 12.00 },
  { item: 'Restaurant Meal', basePrice: 20.00 },
]

export function calculateInflation(inputs: InflationInputs): InflationResults {
  const {
    amount,
    startYear,
    endYear,
    customRate,
    mode,
    useCustomRate,
  } = inputs

  const years = endYear - startYear
  const yearsArray = Array.from({ length: years + 1 }, (_, i) => startYear + i)

  // ===== 1. DETERMINE INFLATION RATES =====
  let yearlyRates: { [year: number]: number } = {}

  if (mode === 'historical' && !useCustomRate) {
    // Use historical CPI data
    for (let i = 0; i < yearsArray.length - 1; i++) {
      const year = yearsArray[i]
      const nextYear = yearsArray[i + 1]
      const cpi = getCPI(year)
      const nextCpi = getCPI(nextYear)
      yearlyRates[year] = cpi > 0 ? ((nextCpi - cpi) / cpi) * 100 : customRate
    }
  } else {
    // ✅ Use custom rate for all years
    for (const year of yearsArray) {
      yearlyRates[year] = customRate
    }
  }

  // ===== 2. CALCULATE INFLATION IMPACT =====
  let futureValue = amount
  const yearlyData: YearlyData[] = []
  let cumulativeInflation = 0

  for (let i = 0; i < yearsArray.length; i++) {
    const year = yearsArray[i]
    const annualRate = yearlyRates[year] || customRate

    if (i > 0) {
      futureValue = futureValue * (1 + annualRate / 100)
    }

    const realValue = amount / Math.pow(1 + cumulativeInflation / 100, i)
    cumulativeInflation += annualRate

    yearlyData.push({
      year,
      nominalValue: Math.round(futureValue),
      realValue: Math.round(realValue),
      cumulativeInflation: Math.round(cumulativeInflation * 10) / 10,
      annualInflationRate: Math.round(annualRate * 10) / 10,
    })
  }

  // ===== 3. FINAL RESULTS =====
  const inflationAdjustedValue = amount / Math.pow(1 + cumulativeInflation / 100, years)
  const totalLoss = futureValue - inflationAdjustedValue
  const purchasingPower = years > 0 ? (inflationAdjustedValue / futureValue) * 100 : 100
  const requiredReturn = years > 0 ? ((1 + cumulativeInflation / 100 / years) * 100) - 100 : 0

  // ===== 4. CPI DATA =====
  const cpiData: CPIData[] = yearsArray.map((year) => ({
    year,
    cpi: Math.round(getCPI(year) * 10) / 10,
    inflationRate: Math.round((yearlyRates[year] || customRate) * 10) / 10,
  }))

  // ===== 5. BASKET COMPARISON =====
  const startCpi = getCPI(startYear)
  const endCpi = getCPI(endYear)
  const cpiChange = startCpi > 0 ? endCpi / startCpi : 1

  const basketComparison: BasketItem[] = BASKET_ITEMS.map((item) => ({
    item: item.item,
    startPrice: Math.round(item.basePrice * 100) / 100,
    endPrice: Math.round(item.basePrice * cpiChange * 100) / 100,
    percentChange: Math.round((cpiChange - 1) * 1000) / 10,
  }))

  return {
    futureValue: Math.round(futureValue),
    inflationAdjustedValue: Math.round(inflationAdjustedValue),
    totalLoss: Math.round(totalLoss),
    purchasingPower: Math.round(purchasingPower * 10) / 10,
    requiredReturn: Math.round(requiredReturn * 10) / 10,
    yearlyData,
    cpiData,
    basketComparison,
  }
}