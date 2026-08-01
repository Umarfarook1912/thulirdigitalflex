'use client'

import { useState } from 'react'
import { Loader2, Pencil, Printer, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/layout/page-header'
import { Button } from '@/components/ui/button'
import { InvoicePrintView } from '@/features/invoices/components/invoice-print-view'
import { InvoiceEditDialog } from '@/features/invoices/components/invoice-edit-dialog'
import { useGetInvoice } from '@/services/invoices'
import { shareInvoicePdf } from '@/utils/share-invoice-pdf'

interface InvoiceDetailProps {
  id: string
}

export function InvoiceDetail({ id }: InvoiceDetailProps) {
  const { data: invoice, isLoading, error } = useGetInvoice(id)
  const [editOpen, setEditOpen] = useState(false)
  const [sharing, setSharing] = useState(false)

  async function handleShare() {
    if (!invoice) return
    setSharing(true)
    try {
      const result = await shareInvoicePdf({
        invoiceNo: invoice.invoice_no,
        customerName: invoice.customer_name,
        invoiceDate: invoice.invoice_date,
        netTotal: Number(invoice.net_total),
      })
      if (result === 'downloaded') {
        toast.success('PDF downloaded. Attach it in WhatsApp or any social app.')
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      toast.error(err instanceof Error ? err.message : 'Unable to share invoice')
    } finally {
      setSharing(false)
    }
  }

  if (isLoading) return <p className="text-muted-foreground text-sm">Loading invoice…</p>
  if (error || !invoice) {
    return <p className="text-destructive text-sm">Invoice not found.</p>
  }

  return (
    <div className="invoice-page space-y-6">
      <div className="no-print">
        <PageHeader
          title={`Invoice #${invoice.invoice_no}`}
          description={`${invoice.customer_name} — ${invoice.customer_location}`}
        >
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" onClick={handleShare} disabled={sharing}>
              {sharing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              Share
            </Button>
            <Button onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print / PDF
            </Button>
          </div>
        </PageHeader>
      </div>

      <InvoicePrintView invoice={invoice} />

      <InvoiceEditDialog invoiceId={id} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}
