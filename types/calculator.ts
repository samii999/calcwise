export interface Calculator {
  slug: string
  name: string
  shortName: string
  description: string
  icon: string
  color: string
  category: 'mortgage' | 'loan' | 'investment' | 'retirement' | 'budget' | 'other'
  searchVolume: 'High' | 'Medium' | 'Low'
  rpmRange: string
}

export interface CalculatorInputs {
  [key: string]: number | string
}

export interface CalculatorResults {
  [key: string]: number | string | any[]
}

export interface CalculatorConfig {
  id: string
  name: string
  inputs: CalculatorInputField[]
  calculate: (inputs: CalculatorInputs) => CalculatorResults
}

export interface CalculatorInputField {
  id: string
  label: string
  type: 'number' | 'text' | 'select' | 'range'
  placeholder?: string
  defaultValue?: number | string
  min?: number
  max?: number
  step?: number
  options?: { label: string; value: string | number }[]
  suffix?: string
  prefix?: string
  helpText?: string
}