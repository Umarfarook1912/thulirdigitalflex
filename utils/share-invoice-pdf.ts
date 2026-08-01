import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import { format, parseISO } from 'date-fns'

function buildInvoiceFileName(customerName: string, invoiceDate: string) {
  const safeName = customerName
    .trim()
    .replace(/[<>:"/\\|?*]+/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
  const dateLabel = format(parseISO(invoiceDate), 'dd-MM-yyyy')
  return `${safeName || 'Invoice'}_${dateLabel}.pdf`
}

export async function createInvoicePdfFile(
  customerName: string,
  invoiceDate: string
): Promise<File> {
  const sheet = document.querySelector('.invoice-sheet') as HTMLElement | null
  if (!sheet) throw new Error('Invoice preview not found')

  const canvas = await html2canvas(sheet, {
    scale: 2,
    useCORS: true,
    backgroundColor: 'white',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 8
  const availableWidth = pageWidth - margin * 2
  const availableHeight = pageHeight - margin * 2
  const imageRatio = canvas.width / canvas.height
  let renderWidth = availableWidth
  let renderHeight = renderWidth / imageRatio

  if (renderHeight > availableHeight) {
    renderHeight = availableHeight
    renderWidth = renderHeight * imageRatio
  }

  const x = (pageWidth - renderWidth) / 2
  const y = (pageHeight - renderHeight) / 2
  pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight)

  const blob = pdf.output('blob')
  return new File([blob], buildInvoiceFileName(customerName, invoiceDate), {
    type: 'application/pdf',
  })
}

function downloadFile(file: File) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = file.name
  link.click()
  URL.revokeObjectURL(url)
}

export async function shareInvoicePdf(options: {
  invoiceNo: number
  customerName: string
  invoiceDate: string
  netTotal: number
}) {
  const { invoiceNo, customerName, invoiceDate, netTotal } = options
  const title = `Invoice #${invoiceNo}`
  const text = `Invoice #${invoiceNo} for ${customerName} — Net Total ${Number(netTotal).toLocaleString('en-IN')}`

  const file = await createInvoicePdfFile(customerName, invoiceDate)
  const payload: ShareData = { title, text, files: [file] }

  if (navigator.canShare?.(payload)) {
    await navigator.share(payload)
    return 'shared' as const
  }

  downloadFile(file)
  return 'downloaded' as const
}
