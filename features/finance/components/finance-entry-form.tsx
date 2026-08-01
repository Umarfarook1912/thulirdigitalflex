'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormFieldWrapper } from '@/components/shared/forms/form-field-wrapper'
import { financeEntrySchema, type FinanceEntryInput } from '@/lib/validations/finance'
import type { FinanceEntry } from '@/services/finance'

interface FinanceEntryFormProps {
  entry?: FinanceEntry
  onSubmit: (data: FinanceEntryInput) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function FinanceEntryForm({ entry, onSubmit, onCancel, loading }: FinanceEntryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FinanceEntryInput>({
    resolver: zodResolver(financeEntrySchema),
    defaultValues: entry
      ? {
          entry_date: entry.entry_date,
          customer_name: entry.customer_name,
          description: entry.description,
          size: entry.size ?? '',
          quantity: entry.quantity ?? '',
          expense: Number(entry.expense),
          income: Number(entry.income),
        }
      : {
          entry_date: format(new Date(), 'yyyy-MM-dd'),
          customer_name: '',
          description: '',
          size: '',
          quantity: '',
          expense: 0,
          income: 0,
        },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label="Date" required error={errors.entry_date}>
          <Input type="date" {...register('entry_date')} />
        </FormFieldWrapper>
        <FormFieldWrapper label="Customer name" required error={errors.customer_name}>
          <Input {...register('customer_name')} />
        </FormFieldWrapper>
        <FormFieldWrapper label="Description" required error={errors.description} className="sm:col-span-2">
          <Input {...register('description')} />
        </FormFieldWrapper>
        <FormFieldWrapper label="Size" error={errors.size}>
          <Input {...register('size')} placeholder="e.g. 33 x 5" />
        </FormFieldWrapper>
        <FormFieldWrapper label="Quantity" error={errors.quantity}>
          <Input {...register('quantity')} />
        </FormFieldWrapper>
        <FormFieldWrapper label="Expense" error={errors.expense}>
          <Input type="number" step="0.01" {...register('expense', { valueAsNumber: true })} />
        </FormFieldWrapper>
        <FormFieldWrapper label="Income" error={errors.income}>
          <Input type="number" step="0.01" {...register('income', { valueAsNumber: true })} />
        </FormFieldWrapper>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting || loading}>
          {(isSubmitting || loading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {entry ? 'Update' : 'Add entry'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
