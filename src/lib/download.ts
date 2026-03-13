export function downloadFile(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

export function downloadCsv(fileName: string, rows: string[][]) {
  const content = rows.map((row) => row.join(',')).join('\n')
  downloadFile(fileName, content, 'text/csv;charset=utf-8')
}
