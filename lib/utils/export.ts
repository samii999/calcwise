export interface ExportData {
  type: 'csv' | 'json' | 'pdf'
  data: any
  filename: string
}

export function exportToCSV(data: any[], filename: string): void {
  if (!data || data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header]
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`
        }
        const stringValue = String(value ?? '')
        if (stringValue.includes(',') || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      }).join(',')
    ),
  ].join('\n')

  downloadFile(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;')
}

export function exportToJSON(data: any, filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, `${filename}.json`, 'application/json;charset=utf-8;')
}

export function exportToPDF(data: any, filename: string): void {
  // PDF export would require a library like jsPDF or react-pdf
  // For now, trigger print dialog
  window.print()
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function generateReport(results: any, inputs: any): string {
  return `
MORTGAGE CALCULATOR REPORT
==========================

INPUTS
------
Home Price: $${inputs.homePrice?.toLocaleString()}
Down Payment: $${inputs.downPayment?.toLocaleString()} (${inputs.downPaymentPercent}%)
Loan Amount: $${(inputs.homePrice - inputs.downPayment)?.toLocaleString()})
Interest Rate: ${inputs.interestRate}%
Loan Term: ${inputs.loanTerm} years
Property Tax: $${inputs.propertyTax?.toLocaleString()}/year
Home Insurance: $${inputs.homeInsurance?.toLocaleString()}/year
PMI: ${inputs.pmi}%
HOA Dues: $${inputs.hoaDues?.toLocaleString()}/month
Extra Payment: $${inputs.extraPayment?.toLocaleString()}/month

RESULTS
-------
Monthly Payment: $${results.monthlyPayment?.toLocaleString()}
Principal & Interest: $${results.principalAndInterest?.toLocaleString()}
Property Tax (Monthly): $${results.propertyTaxMonthly?.toLocaleString()}
Insurance (Monthly): $${results.insuranceMonthly?.toLocaleString()}
PMI (Monthly): $${results.pmiMonthly?.toLocaleString()}
HOA (Monthly): $${results.hoaMonthly?.toLocaleString()}

Total Interest: $${results.totalInterest?.toLocaleString()}
Total Payment: $${results.totalPayment?.toLocaleString()}
Payoff Date: ${results.payoffDate}

${results.extraPaymentSavings && results.extraPaymentSavings > 0 ? `
EXTRA PAYMENT SAVINGS
---------------------
Interest Saved: $${results.extraPaymentSavings?.toLocaleString()}
Months Saved: ${results.extraPayoffMonths}
` : ''}

Generated on: ${new Date().toLocaleDateString()}
  `.trim()
}
