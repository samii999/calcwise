'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils/formatters'

interface ExportOptionsProps {
  data: any[]
  results: any
  title: string
}

export function ExportOptions({ data, results, title }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)

  // ===== CSV Export with Full Data =====
  const handleCSV = () => {
    setIsExporting(true)
    try {
      // Check what data we have
      const hasExtraPayment = data.some((row: any) => row.extraPaymentApplied !== undefined)
      const hasOneTimePayment = data.some((row: any) => row.oneTimePaymentApplied !== undefined)
      const hasContributions = data.some((row: any) => row.contributions !== undefined)
      const hasReturns = data.some((row: any) => row.returns !== undefined)
      const hasDividends = data.some((row: any) => row.dividends !== undefined)
      const hasFees = data.some((row: any) => row.fees !== undefined)
      const hasEmployerMatch = data.some((row: any) => row.employerMatch !== undefined)
      const hasTotalInterest = data.some((row: any) => row.totalInterest !== undefined)
      const hasInflationAdjusted = data.some((row: any) => row.inflationAdjusted !== undefined)
      const isMonthBased = data.some((row: any) => row.month !== undefined)
      const isYearBased = data.some((row: any) => row.year !== undefined)

      // Build headers dynamically
      let headers = []
      if (isMonthBased) headers.push('Month')
      else if (isYearBased) headers.push('Year')
      else headers.push('Period')
      
      if (data[0]?.payment !== undefined) headers.push('Payment')
      if (data[0]?.principal !== undefined) headers.push('Principal')
      if (data[0]?.interest !== undefined) headers.push('Interest')
      if (data[0]?.balance !== undefined) headers.push('Balance')
      if (data[0]?.totalPaid !== undefined) headers.push('Total Paid')
      if (hasContributions) headers.push('Contributions')
      if (hasReturns) headers.push('Returns')
      if (hasDividends) headers.push('Dividends')
      if (hasFees) headers.push('Fees')
      if (hasEmployerMatch) headers.push('Employer Match')
      if (hasTotalInterest) headers.push('Total Interest')
      if (hasInflationAdjusted) headers.push('Inflation Adjusted')
      if (hasExtraPayment) headers.push('Extra Payment')
      if (hasOneTimePayment) headers.push('One-Time Payment')

      // Build rows
      const rows = data.map((row: any) => {
        const rowData = []
        rowData.push(row.month || row.year || 0)
        if (row.payment !== undefined) rowData.push(row.payment || 0)
        if (row.principal !== undefined) rowData.push(row.principal || 0)
        if (row.interest !== undefined) rowData.push(row.interest || 0)
        if (row.balance !== undefined) rowData.push(row.balance || 0)
        if (row.totalPaid !== undefined) rowData.push(row.totalPaid || 0)
        if (hasContributions) rowData.push(row.contributions || 0)
        if (hasReturns) rowData.push(row.returns || 0)
        if (hasDividends) rowData.push(row.dividends || 0)
        if (hasFees) rowData.push(row.fees || 0)
        if (hasEmployerMatch) rowData.push(row.employerMatch || 0)
        if (hasTotalInterest) rowData.push(row.totalInterest || 0)
        if (hasInflationAdjusted) rowData.push(row.inflationAdjusted || 0)
        if (hasExtraPayment) rowData.push(row.extraPaymentApplied || 0)
        if (hasOneTimePayment) rowData.push(row.oneTimePaymentApplied || 0)
        return rowData
      })

      // Create CSV content
      let csvContent = headers.join(',') + '\n'
      rows.forEach((row) => {
        csvContent += row.join(',') + '\n'
      })

      // Add summary section
      csvContent += '\n'
      csvContent += 'SUMMARY\n'
      
      // Universal summary fields
      const summaryFields = [
        { key: 'totalPayment', label: 'Total Payment' },
        { key: 'totalInterest', label: 'Total Interest' },
        { key: 'loanAmount', label: 'Loan Amount' },
        { key: 'totalContributions', label: 'Total Contributions' },
        { key: 'totalReturns', label: 'Total Returns' },
        { key: 'futureValue', label: 'Future Value' },
        { key: 'endingBalance', label: 'Ending Balance' },
        { key: 'interestEarned', label: 'Interest Earned' },
        { key: 'retirementBalance', label: 'Retirement Balance' },
        { key: 'totalDebt', label: 'Total Debt' },
        { key: 'newMonthlyPayment', label: 'New Monthly Payment' },
        { key: 'targetAmount', label: 'Target Amount' },
        { key: 'netWorth', label: 'Net Worth' },
        { key: 'surplus', label: 'Surplus' },
        { key: 'monthlyRate', label: 'Monthly Rate' },
        { key: 'payoffDate', label: 'Payoff Date' },
        { key: 'extraPaymentSavings', label: 'Extra Payment Savings' },
        { key: 'extraPayoffMonths', label: 'Extra Payoff Months' },
        { key: 'roi', label: 'ROI (%)' },
        { key: 'cagr', label: 'CAGR (%)' },
        { key: 'savingsRate', label: 'Savings Rate (%)' },
        { key: 'dtiRatio', label: 'DTI Ratio (%)' },
        { key: 'breakEvenMonths', label: 'Break Even Months' },
        { key: 'isWorthIt', label: 'Is Worth It' },
        { key: 'isSustainable', label: 'Is Sustainable' },
        { key: 'targetAchieved', label: 'Target Achieved' },
        { key: 'purchasingPower', label: 'Purchasing Power (%)' },
        { key: 'hourlyRate', label: 'Hourly Rate' },
        { key: 'weeklyRate', label: 'Weekly Rate' },
        { key: 'biWeeklyRate', label: 'Bi-Weekly Rate' },
      ]

      summaryFields.forEach((field) => {
        if (results[field.key] !== undefined && results[field.key] !== null && results[field.key] !== '') {
          csvContent += `${field.label},${results[field.key]}\n`
        }
      })

      // Bi-Weekly savings
      if (results.biWeeklySavings) {
        csvContent += `Bi-Weekly Interest Saved,${results.biWeeklySavings.interestSaved}\n`
        csvContent += `Bi-Weekly Years Saved,${results.biWeeklySavings.yearsSaved}\n`
      }

      // One-time payment impact
      if (results.oneTimePaymentImpact) {
        csvContent += `One-Time Interest Saved,${results.oneTimePaymentImpact.interestSaved}\n`
        csvContent += `One-Time Months Saved,${results.oneTimePaymentImpact.monthsSaved}\n`
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('CSV export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // ===== PDF Export =====
  const handlePDF = async () => {
    setIsExporting(true)
    try {
      const { default: jsPDF } = await import('jspdf')
      const { default: autoTable } = await import('jspdf-autotable')

      const doc = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()

      // Title
      doc.setFontSize(20)
      doc.setTextColor(13, 148, 136)
      doc.text(title, pageWidth / 2, 20, { align: 'center' })

      // Date
      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30)

      // Summary
      doc.setFontSize(11)
      doc.setTextColor(50)
      let summaryY = 40
      
      const summaryFields = [
        { key: 'totalPayment', label: 'Total Payment' },
        { key: 'totalInterest', label: 'Total Interest' },
        { key: 'loanAmount', label: 'Loan Amount' },
        { key: 'futureValue', label: 'Future Value' },
        { key: 'endingBalance', label: 'Ending Balance' },
        { key: 'retirementBalance', label: 'Retirement Balance' },
        { key: 'totalDebt', label: 'Total Debt' },
        { key: 'netWorth', label: 'Net Worth' },
        { key: 'surplus', label: 'Surplus' },
        { key: 'payoffDate', label: 'Payoff Date' },
      ]

      let firstRow = true
      summaryFields.forEach((field) => {
        if (results[field.key] !== undefined && results[field.key] !== null) {
          const value = typeof results[field.key] === 'number' 
            ? `$${results[field.key].toLocaleString()}` 
            : results[field.key]
          if (firstRow) {
            doc.text(`${field.label}: ${value}`, 14, summaryY)
            firstRow = false
          } else {
            doc.text(`${field.label}: ${value}`, 80, summaryY)
          }
          summaryY += 6
        }
      })

      // Table
      const isMonthBased = data.some((row: any) => row.month !== undefined)
      const hasExtraPayment = data.some((row: any) => row.extraPaymentApplied !== undefined)
      const hasOneTimePayment = data.some((row: any) => row.oneTimePaymentApplied !== undefined)
      const hasContributions = data.some((row: any) => row.contributions !== undefined)
      const hasReturns = data.some((row: any) => row.returns !== undefined)
      const hasDividends = data.some((row: any) => row.dividends !== undefined)
      const hasFees = data.some((row: any) => row.fees !== undefined)
      const hasEmployerMatch = data.some((row: any) => row.employerMatch !== undefined)
      const hasTotalInterest = data.some((row: any) => row.totalInterest !== undefined)

      let tableHeaders = []
      tableHeaders.push(isMonthBased ? 'Month' : 'Year')
      if (data[0]?.payment !== undefined) tableHeaders.push('Payment')
      if (data[0]?.principal !== undefined) tableHeaders.push('Principal')
      if (data[0]?.interest !== undefined) tableHeaders.push('Interest')
      if (data[0]?.balance !== undefined) tableHeaders.push('Balance')
      if (hasContributions) tableHeaders.push('Contributions')
      if (hasReturns) tableHeaders.push('Returns')
      if (hasDividends) tableHeaders.push('Dividends')
      if (hasFees) tableHeaders.push('Fees')
      if (hasEmployerMatch) tableHeaders.push('Employer Match')
      if (hasTotalInterest) tableHeaders.push('Total Interest')
      if (hasExtraPayment) tableHeaders.push('Extra Payment')
      if (hasOneTimePayment) tableHeaders.push('One-Time')

      const tableRows = data.slice(0, 100).map((row: any) => {
        const rowData = []
        rowData.push((row.month || row.year || 0).toString())
        if (row.payment !== undefined) rowData.push(`$${(row.payment || 0).toLocaleString()}`)
        if (row.principal !== undefined) rowData.push(`$${(row.principal || 0).toLocaleString()}`)
        if (row.interest !== undefined) rowData.push(`$${(row.interest || 0).toLocaleString()}`)
        if (row.balance !== undefined) rowData.push(`$${(row.balance || 0).toLocaleString()}`)
        if (hasContributions) rowData.push(`$${(row.contributions || 0).toLocaleString()}`)
        if (hasReturns) rowData.push(`$${(row.returns || 0).toLocaleString()}`)
        if (hasDividends) rowData.push(`$${(row.dividends || 0).toLocaleString()}`)
        if (hasFees) rowData.push(`$${(row.fees || 0).toLocaleString()}`)
        if (hasEmployerMatch) rowData.push(`$${(row.employerMatch || 0).toLocaleString()}`)
        if (hasTotalInterest) rowData.push(`$${(row.totalInterest || 0).toLocaleString()}`)
        if (hasExtraPayment) rowData.push(`$${(row.extraPaymentApplied || 0).toLocaleString()}`)
        if (hasOneTimePayment) rowData.push(`$${(row.oneTimePaymentApplied || 0).toLocaleString()}`)
        return rowData
      })

      autoTable(doc, {
        head: [tableHeaders],
        body: tableRows,
        startY: summaryY + 10,
        theme: 'striped',
        headStyles: {
          fillColor: [13, 148, 136],
          textColor: [255, 255, 255],
          fontSize: 9,
        },
        styles: { fontSize: 7, cellPadding: 1.5 },
      })

      // Footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150)
        doc.text(
          `calcwisepro - ${title} | Page ${i} of ${pageCount}`,
          14,
          doc.internal.pageSize.getHeight() - 10
        )
      }

      doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('PDF export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // ===== Print =====
  const handlePrint = () => {
    window.print()
  }

  // ===== Share =====
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('✅ Link copied to clipboard!')
    } catch {
      alert('Failed to copy link. Please copy the URL manually.')
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
      <button
        onClick={handleCSV}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        📊 CSV
      </button>
      <button
        onClick={handlePDF}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        📄 PDF
      </button>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
      >
        🖨️ Print
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
      >
        🔗 Share
      </button>
      {isExporting && (
        <span className="text-xs text-gray-400 flex items-center ml-2">⏳ Exporting...</span>
      )}
    </div>
  )
}