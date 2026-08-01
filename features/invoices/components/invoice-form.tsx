'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormFieldWrapper } from '@/components/shared/forms/form-field-wrapper'
import { InvoiceItemsEditor } from '@/features/invoices/components/invoice-items-editor'
import { invoiceSchema, type InvoiceInput } from '@/lib/validations/invoice'
import { getErrorMessage } from '@/utils/error-message'
import { useCreateInvoice, useUpdateInvoice, type InvoiceWithItems } from '@/services/invoices'

interface InvoiceFormProps {
  invoice?: InvoiceWithItems
  nextInvoiceNo?: number
  onSuccess?: () => void
  onCancel?: () => void
}

export function InvoiceForm({ invoice, nextInvoiceNo, onSuccess, onCancel }: InvoiceFormProps) {
  const createMutation = useCreateInvoice()
  const updateMutation = useUpdateInvoice()
  const isEdit = !!invoice

  const methods = useForm<InvoiceInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoice_no: invoice?.invoice_no ?? nextInvoiceNo ?? 1,
      invoice_date: invoice?.invoice_date ?? format(new Date(), 'yyyy-MM-dd'),
      customer_name: invoice?.customer_name ?? '',
      customer_location: invoice?.customer_location ?? '',
      items: invoice
        ? invoice.invoice_items.map((i) => ({
            description: i.description,
            quantity: i.quantity,
            total_sqft: i.total_sqft,
            rate_per_sqft: Number(i.rate_per_sqft),
            amount: Number(i.amount),
          }))
        : [
            {
              description: '',
              quantity: '',
              total_sqft: null,
              rate_per_sqft: 0,
              amount: 0,
            },
          ],
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods

  useEffect(() => {
    if (invoice) {
      reset({
        invoice_no: invoice.invoice_no,
        invoice_date: invoice.invoice_date,
        customer_name: invoice.customer_name,
        customer_location: invoice.customer_location,
        items: invoice.invoice_items.map((i) => ({
          description: i.description,
          quantity: i.quantity,
          total_sqft: i.total_sqft,
          rate_per_sqft: Number(i.rate_per_sqft),
          amount: Number(i.amount),
        })),
      })
    } else if (nextInvoiceNo != null) {
      reset((values) => ({ ...values, invoice_no: nextInvoiceNo }))
    }
  }, [invoice, nextInvoiceNo, reset])

  async function onSubmit(data: InvoiceInput) {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: invoice.id, input: data })
        toast.success('Invoice updated')
      } else {
        await createMutation.mutateAsync(data)
        toast.success('Invoice created')
      }
      onSuccess?.()
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to save invoice'))
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <FormFieldWrapper label="Invoice No" required error={errors.invoice_no}>
            <Input
              type="number"
              min={1}
              {...register('invoice_no', { valueAsNumber: true })}
            />
          </FormFieldWrapper>
          <FormFieldWrapper label="Date" required error={errors.invoice_date}>
            <Input type="date" {...register('invoice_date')} />
          </FormFieldWrapper>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormFieldWrapper label="To (Customer)" required error={errors.customer_name}>
            <Input {...register('customer_name')} placeholder="Customer name" />
          </FormFieldWrapper>
          <FormFieldWrapper label="Location" required error={errors.customer_location}>
            <Input {...register('customer_location')} placeholder="e.g. DINDIGUL" />
          </FormFieldWrapper>
        </div>

        <InvoiceItemsEditor />
        {errors.items && (
          <p className="text-destructive text-sm">
            {errors.items.message ?? errors.items.root?.message}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? 'Update Invoice' : 'Create Invoice'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
