/**
 * Salary to Hourly Calculator - Complete with Competition Features
 * Pure JavaScript Math Logic - No dependencies
 */

export interface SalaryInputs {
  salaryAmount: number
  mode: 'annual-to-hourly' | 'hourly-to-annual'
  hoursPerWeek: number
  weeksPerYear: number
  paidVacationWeeks: number
  paidHolidayDays: number
  commuteMinutes: number
  commuteDaysPerWeek: number
  workExpenses: number
  taxRate: number
  country: string
}

export interface SalaryResults {
  hourlyRate: number
  dailyRate: number
  weeklyRate: number
  biWeeklyRate: number
  monthlyRate: number
  annualSalary: number
  trueHourlyRate: number
  totalCommuteHours: number
  totalWorkExpenses: number
  uncompensatedTime: number
  timeValueLost: number
  yearlyBreakdown: YearlyBreakdown[]
  comparison: ComparisonRates
}

export interface YearlyBreakdown {
  month: string
  grossPay: number
  netPay: number
  taxes: number
  cumulativeGross: number
  cumulativeNet: number
}

export interface ComparisonRates {
  hourly: number
  daily: number
  weekly: number
  biWeekly: number
  monthly: number
  annual: number
  trueHourly: number
}

export function calculateSalary(inputs: SalaryInputs): SalaryResults {
  const {
    salaryAmount,
    mode,
    hoursPerWeek,
    weeksPerYear,
    paidVacationWeeks = 2,
    paidHolidayDays = 10,
    commuteMinutes = 0,
    commuteDaysPerWeek = 5,
    workExpenses = 0,
    taxRate = 0,
  } = inputs

  // ===== 1. BASE CONVERSION =====
  let hourlyRate = 0
  let dailyRate = 0
  let weeklyRate = 0
  let biWeeklyRate = 0
  let monthlyRate = 0
  let annualSalary = 0

  const effectiveWorkWeeks = weeksPerYear - paidVacationWeeks - (paidHolidayDays / 5)
  const effectiveHours = effectiveWorkWeeks * hoursPerWeek

  if (mode === 'annual-to-hourly') {
    annualSalary = salaryAmount
    hourlyRate = annualSalary / (weeksPerYear * hoursPerWeek)
    dailyRate = annualSalary / (weeksPerYear * 5)
    weeklyRate = annualSalary / weeksPerYear
    biWeeklyRate = annualSalary / (weeksPerYear / 2)
    monthlyRate = annualSalary / 12
  } else {
    // Hourly to Annual
    hourlyRate = salaryAmount
    dailyRate = hourlyRate * hoursPerWeek / 5
    weeklyRate = hourlyRate * hoursPerWeek
    biWeeklyRate = weeklyRate * 2
    monthlyRate = weeklyRate * 4.33
    annualSalary = weeklyRate * weeksPerYear
  }

  // ===== 2. TRUE ADJUSTED HOURLY RATE =====
  // Total commute hours per year
  const totalCommuteHours = (commuteMinutes / 60) * commuteDaysPerWeek * effectiveWorkWeeks
  
  // Total work expenses per year
  const totalWorkExpenses = workExpenses * 12

  // Uncompensated time (commute + unpaid breaks, etc.)
  const uncompensatedTime = totalCommuteHours

  // True adjusted hours (actual working + commute time)
  const trueHours = effectiveHours + uncompensatedTime

  // True hourly rate = (annual salary - work expenses) / true hours
  const trueAnnualIncome = annualSalary - totalWorkExpenses
  const trueHourlyRate = trueHours > 0 ? trueAnnualIncome / trueHours : hourlyRate

  // Time value lost = hourlyRate * uncompensatedTime
  const timeValueLost = hourlyRate * uncompensatedTime

  // ===== 3. TAX BREAKDOWN =====
  const totalTax = annualSalary * (taxRate / 100)
  const annualAfterTax = annualSalary - totalTax
  const monthlyAfterTax = annualAfterTax / 12
  const weeklyAfterTax = annualAfterTax / weeksPerYear
  const biWeeklyAfterTax = annualAfterTax / (weeksPerYear / 2)
  const hourlyAfterTax = annualAfterTax / (weeksPerYear * hoursPerWeek)

  // ===== 4. MONTHLY BREAKDOWN =====
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const yearlyBreakdown: YearlyBreakdown[] = []
  let cumulativeGross = 0
  let cumulativeNet = 0

  for (let i = 0; i < 12; i++) {
    const grossPay = monthlyRate
    const taxes = grossPay * (taxRate / 100)
    const netPay = grossPay - taxes
    cumulativeGross += grossPay
    cumulativeNet += netPay

    yearlyBreakdown.push({
      month: months[i],
      grossPay: Math.round(grossPay),
      netPay: Math.round(netPay),
      taxes: Math.round(taxes),
      cumulativeGross: Math.round(cumulativeGross),
      cumulativeNet: Math.round(cumulativeNet),
    })
  }

  // ===== 5. COMPARISON RATES =====
  const comparison: ComparisonRates = {
    hourly: Math.round(hourlyRate * 100) / 100,
    daily: Math.round(dailyRate * 100) / 100,
    weekly: Math.round(weeklyRate * 100) / 100,
    biWeekly: Math.round(biWeeklyRate * 100) / 100,
    monthly: Math.round(monthlyRate * 100) / 100,
    annual: Math.round(annualSalary * 100) / 100,
    trueHourly: Math.round(trueHourlyRate * 100) / 100,
  }

  return {
    hourlyRate: Math.round(hourlyRate * 100) / 100,
    dailyRate: Math.round(dailyRate * 100) / 100,
    weeklyRate: Math.round(weeklyRate * 100) / 100,
    biWeeklyRate: Math.round(biWeeklyRate * 100) / 100,
    monthlyRate: Math.round(monthlyRate * 100) / 100,
    annualSalary: Math.round(annualSalary * 100) / 100,
    trueHourlyRate: Math.round(trueHourlyRate * 100) / 100,
    totalCommuteHours: Math.round(totalCommuteHours * 10) / 10,
    totalWorkExpenses: Math.round(totalWorkExpenses * 100) / 100,
    uncompensatedTime: Math.round(uncompensatedTime * 10) / 10,
    timeValueLost: Math.round(timeValueLost * 100) / 100,
    yearlyBreakdown,
    comparison,
  }
}