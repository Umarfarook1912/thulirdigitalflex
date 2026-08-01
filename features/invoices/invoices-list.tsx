'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { FileText, Pencil, Plus, Printer, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/layout/page-header'
import { EmptyState } from '@/components/shared/feedback/empty-state'
import { ConfirmDialog } from '@/components/shared/forms/confirm-dialog'
import { FormDialog } from '@/components/shared/forms/form-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { InvoiceForm } from '@/features/invoices/components/invoice-form'
import { InvoiceEditDialog } from '@/features/invoices/components/invoice-edit-dialog'
import { ROUTES } from '@/lib/constants'
import {
  useDeleteInvoice,
  useGetInvoices,
  useGetNextInvoiceNo,
} from '@/services/invoices'

export function InvoicesList() {
  const { data: invoices = [], isLoading } = useGetInvoices()
  const { data: nextInvoiceNo } = useGetNextInvoiceNo()
  const deleteMutation = useDeleteInvoice()
  const [addOpen, setAddOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function handleDelete() {
    if (!deleteId) return
    try {
      await deleteMutation.mutateAsync(deleteId)
      toast.success('Invoice deleted')
      setDeleteId(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="Create and print customer invoices.">
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </PageHeader>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Create your first invoice for a customer."
          action={{ label: 'New Invoice', onClick: () => setAddOpen(true) }}
        />
      ) : (
        <div className="bg-card overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Net Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.invoice_no}</TableCell>
                  <TableCell>{format(parseISO(inv.invoice_date), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <div>
                      <p>{inv.customer_name}</p>
                      <p className="text-muted-foreground text-xs">{inv.customer_location}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(inv.net_total).toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        nativeButton={false}
                        render={<Link href={`${ROUTES.invoices}/${inv.id}`} />}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => setEditId(inv.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => setDeleteId(inv.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <FormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="New Invoice"
        description="Add customer details and products."
        maxWidth="2xl"
      >
        {addOpen && (
          <InvoiceForm
            key="create-invoice"
            nextInvoiceNo={nextInvoiceNo}
            onSuccess={() => setAddOpen(false)}
            onCancel={() => setAddOpen(false)}
          />
        )}
      </FormDialog>

      <InvoiceEditDialog
        invoiceId={editId}
        open={!!editId}
        onOpenChange={(open) => !open && setEditId(null)}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete invoice?"
        description="This will permanently remove the invoice and its line items."
        confirmLabel="Delete"
        variant="destructive"
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}
