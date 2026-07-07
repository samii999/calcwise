import { useState, useCallback } from 'react'

interface UseExportOptions {
  filename?: string
  title?: string
}

export function useExport(options: UseExportOptions = {}) {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { filename = 'export', title = 'Export' } = options

  // Export to CSV
  const exportToCSV = useCallback(
    (data: any[], headers: string[], customFilename?: string) => {
      setIsExporting(true)
      setError(null)

      try {
        const rows = data.map((row) =>
          headers.map((h) => {
            const value = row[h]
            return typeof value === 'string' && value.includes(',')
              ? `"${value}"`
              : value ?? ''
          })
        )

        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${customFilename || filename}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'CSV export failed')
      } finally {
        setIsExporting(false)
      }
    },
    [filename]
  )

  // Export to PDF (requires jspdf and jspdf-autotable)
  const exportToPDF = useCallback(
    async (
      data: any[],
      headers: string[],
      rows: any[][],
      customTitle?: string,
      customFilename?: string
    ) => {
      setIsExporting(true)
      setError(null)

      try {
        const { default: jsPDF } = await import('jspdf')
        const { default: autoTable } = await import('jspdf-autotable')

        const doc = new jsPDF('landscape', 'mm', 'a4')
        const pageWidth = doc.internal.pageSize.getWidth()

        // Title
        doc.setFontSize(20)
        doc.setTextColor(13, 148, 136)
        doc.text(customTitle || title, pageWidth / 2, 20, { align: 'center' })

        // Date
        doc.setFontSize(10)
        doc.setTextColor(100)
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30)

        // Table
        autoTable(doc, {
          head: [headers],
          body: rows,
          startY: 40,
          theme: 'striped',
          headStyles: {
            fillColor: [13, 148, 136],
            textColor: [255, 255, 255],
            fontSize: 10,
          },
          styles: { fontSize: 8, cellPadding: 2 },
        })

        doc.save(`${customFilename || filename}.pdf`)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'PDF export failed')
      } finally {
        setIsExporting(false)
      }
    },
    [filename, title]
  )

  // Print
  const print = useCallback((elementId: string) => {
    try {
      const printContents = document.getElementById(elementId)
      if (!printContents) {
        setError('Content not found')
        return
      }

      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents.innerHTML
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Print failed')
    }
  }, [])

  // Share
  const share = useCallback(async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      return true
    } catch {
      return false
    }
  }, [])

  return {
    isExporting,
    error,
    exportToCSV,
    exportToPDF,
    print,
    share,
    clearError: () => setError(null),
  }
}