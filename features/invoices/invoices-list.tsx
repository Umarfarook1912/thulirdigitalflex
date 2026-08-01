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
import { InvoiceFiltersBar } from '@/features/invoices/components/invoice-filters-bar'
import { useDebounce } from '@/hooks/use-debounce'
import { getErrorMessage } from '@/utils/error-message'
import { ROUTES } from '@/lib/constants'
import {
  useDeleteInvoice,
  useGetInvoices,
  useGetNextInvoiceNo,
} from '@/services/invoices'

export function InvoicesList() {
  const [search, setSearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const debouncedSearch = useDebounce(search)
  const hasFilters = Boolean(search || from || to)

  const { data: invoices = [], isLoading } = useGetInvoices({
    search: debouncedSearch,
    from: from || undefined,
    to: to || undefined,
  })
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
      toast.error(getErrorMessage(err, 'Delete failed'))
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

      <InvoiceFiltersBar
        search={search}
        from={from}
        to={to}
        onSearchChange={setSearch}
        onFromChange={setFrom}
        onToChange={setTo}
        onClear={() => {
          setSearch('')
          setFrom('')
          setTo('')
        }}
        hasFilters={hasFilters}
      />

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={hasFilters ? 'No invoices match your filters' : 'No invoices yet'}
          description={
            hasFilters
              ? 'Try a different search or date range.'
              : 'Create your first invoice for a customer.'
          }
          action={
            hasFilters
              ? {
                  label: 'Clear filters',
                  onClick: () => {
                    setSearch('')
                    setFrom('')
                    setTo('')
                  },
                }
              : { label: 'New Invoice', onClick: () => setAddOpen(true) }
          }
        />
      ) : (
        <div className="bg-card overflow-x-auto rounded-xl border">
          <Table className="min-w-[640px]">
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
