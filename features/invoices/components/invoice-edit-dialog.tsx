'use client'

import { FormDialog } from '@/components/shared/forms/form-dialog'
import { InvoiceForm } from '@/features/invoices/components/invoice-form'
import { useGetInvoice } from '@/services/invoices'

interface InvoiceEditDialogProps {
  invoiceId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InvoiceEditDialog({ invoiceId, open, onOpenChange }: InvoiceEditDialogProps) {
  const { data: invoice, isLoading } = useGetInvoice(invoiceId ?? undefined)

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={invoice ? `Edit Invoice #${invoice.invoice_no}` : 'Edit Invoice'}
      description="Update invoice details and products."
      maxWidth="2xl"
    >
      {isLoading && <p className="text-muted-foreground text-sm">Loading…</p>}
      {invoice && (
        <InvoiceForm
          key={invoice.id}
          invoice={invoice}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      )}
    </FormDialog>
  )
}
