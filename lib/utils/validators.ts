/**
 * Validation utilities for calculator inputs
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validate a number is within range
 */
export function validateNumber(
  value: number,
  min: number,
  max: number,
  fieldName: string
): ValidationResult {
  if (isNaN(value) || value === undefined || value === null) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  if (value < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` }
  }
  if (value > max) {
    return { isValid: false, error: `${fieldName} must be at most ${max}` }
  }
  return { isValid: true }
}

/**
 * Validate a number is positive
 */
export function validatePositive(value: number, fieldName: string): ValidationResult {
  if (isNaN(value) || value === undefined || value === null) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  if (value < 0) {
    return { isValid: false, error: `${fieldName} must be positive` }
  }
  return { isValid: true }
}

/**
 * Validate a percentage (0-100)
 */
export function validatePercentage(value: number, fieldName: string): ValidationResult {
  if (isNaN(value) || value === undefined || value === null) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  if (value < 0) {
    return { isValid: false, error: `${fieldName} cannot be negative` }
  }
  if (value > 100) {
    return { isValid: false, error: `${fieldName} cannot exceed 100%` }
  }
  return { isValid: true }
}

/**
 * Validate interest rate (0-40)
 */
export function validateInterestRate(value: number): ValidationResult {
  if (isNaN(value) || value === undefined || value === null) {
    return { isValid: false, error: 'Interest rate is required' }
  }
  if (value < 0) {
    return { isValid: false, error: 'Interest rate cannot be negative' }
  }
  if (value > 40) {
    return { isValid: false, error: 'Interest rate cannot exceed 40%' }
  }
  return { isValid: true }
}

/**
 * Validate loan term (1-50 years)
 */
export function validateLoanTerm(value: number): ValidationResult {
  if (isNaN(value) || value === undefined || value === null) {
    return { isValid: false, error: 'Loan term is required' }
  }
  if (value < 1) {
    return { isValid: false, error: 'Loan term must be at least 1 year' }
  }
  if (value > 50) {
    return { isValid: false, error: 'Loan term cannot exceed 50 years' }
  }
  return { isValid: true }
}

/**
 * Validate all fields in an object
 */
export function validateFields(
  fields: { value: any; validation: (val: any) => ValidationResult }[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  let isValid = true

  for (const field of fields) {
    const result = field.validation(field.value)
    if (!result.isValid) {
      isValid = false
      if (result.error) {
        errors.push(result.error)
      }
    }
  }

  return { isValid, errors }
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: string[]): string {
  return errors.join('. ')
}