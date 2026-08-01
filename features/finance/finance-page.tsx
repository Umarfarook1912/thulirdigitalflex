'use client'

import { useMemo, useState } from 'react'
import { format, parseISO, startOfMonth } from 'date-fns'
import { Pencil, Plus, Trash2, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/layout/page-header'
import { StatsCard } from '@/components/shared/data-display/stats-card'
import { EmptyState } from '@/components/shared/feedback/empty-state'
import { ConfirmDialog } from '@/components/shared/forms/confirm-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FinanceEntryForm } from '@/features/finance/components/finance-entry-form'
import type { FinanceEntryInput } from '@/lib/validations/finance'
import {
  useCreateFinanceEntry,
  useDeleteFinanceEntry,
  useGetFinanceEntries,
  useUpdateFinanceEntry,
  type FinanceEntry,
} from '@/services/finance'

export function FinancePage() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd')
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(today)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<FinanceEntry | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: entries = [], isLoading } = useGetFinanceEntries({ from, to })
  const createMutation = useCreateFinanceEntry()
  const updateMutation = useUpdateFinanceEntry()
  const deleteMutation = useDeleteFinanceEntry()

  const totals = useMemo(() => {
    const expense = entries.reduce((s, e) => s + Number(e.expense), 0)
    const income = entries.reduce((s, e) => s + Number(e.income), 0)
    return { expense, income, savings: income - expense }
  }, [entries])

  async function handleSubmit(data: FinanceEntryInput) {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: data })
        toast.success('Entry updated')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Entry added')
      }
      setDialogOpen(false)
      setEditing(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await deleteMutation.mutateAsync(deleteId)
      toast.success('Entry deleted')
      setDeleteId(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Finance" description="Daily expense, income, and savings.">
        <Button
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4" />
          Add entry
        </Button>
      </PageHeader>

      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="from">From</Label>
          <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="to">To</Label>
          <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Expense" value={totals.expense.toLocaleString('en-IN')} icon={Wallet} variant="warning" />
        <StatsCard title="Income" value={totals.income.toLocaleString('en-IN')} icon={Wallet} variant="success" />
        <StatsCard title="Savings" value={totals.savings.toLocaleString('en-IN')} icon={Wallet} variant="primary" />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : entries.length === 0 ? (
        <EmptyState icon={Wallet} title="No entries in this range" description="Add your first finance entry." />
      ) : (
        <div className="bg-card overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Expense</TableHead>
                <TableHead className="text-right">Income</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.day_serial}</TableCell>
                  <TableCell>{format(parseISO(entry.entry_date), 'dd MMM yyyy')}</TableCell>
                  <TableCell>{entry.customer_name}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.size ?? '—'}</TableCell>
                  <TableCell>{entry.quantity ?? '—'}</TableCell>
                  <TableCell className="text-right">{Number(entry.expense).toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-right">{Number(entry.income).toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => {
                          setEditing(entry)
                          setDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={() => setDeleteId(entry.id)}>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit entry' : 'Add finance entry'}</DialogTitle>
          </DialogHeader>
          <FinanceEntryForm
            entry={editing ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setDialogOpen(false)
              setEditing(null)
            }}
            loading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete entry?"
        description="This finance entry will be permanently removed."
        confirmLabel="Delete"
        variant="destructive"
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}
