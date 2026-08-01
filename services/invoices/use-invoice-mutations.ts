'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { QUERY_KEYS } from '@/lib/constants'
import type { InvoiceInput } from '@/lib/validations/invoice'
import { calcLineAmount } from '@/lib/validations/invoice'

/** invoice_no is unique in the database, so block the clash with a clear message. */
async function assertInvoiceNoAvailable(invoiceNo: number, excludeId?: string) {
  const supabase = getSupabaseBrowserClient()
  let query = supabase.from('invoices').select('id').eq('invoice_no', invoiceNo).limit(1)
  if (excludeId) query = query.neq('id', excludeId)

  const { data, error } = await query
  if (error) throw error
  if (data?.length) {
    throw new Error(`Invoice number ${invoiceNo} is already used. Choose a different number.`)
  }
}

function buildItems(input: InvoiceInput, invoiceId?: string) {
  return input.items.map((item, index) => ({
    sl_no: index + 1,
    description: item.description,
    quantity: item.quantity,
    total_sqft: item.total_sqft || null,
    rate_per_sqft: item.rate_per_sqft,
    amount: calcLineAmount(item.total_sqft, item.rate_per_sqft, item.quantity),
    ...(invoiceId ? { invoice_id: invoiceId } : {}),
  }))
}

export function useCreateInvoice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: InvoiceInput) => {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      await assertInvoiceNoAvailable(input.invoice_no)

      const items = buildItems(input)
      const netTotal = items.reduce((sum, i) => sum + i.amount, 0)

      const { data: invoice, error } = await supabase
        .from('invoices')
        .insert({
          invoice_no: input.invoice_no,
          invoice_date: input.invoice_date,
          customer_name: input.customer_name,
          customer_location: input.customer_location,
          net_total: netTotal,
          created_by: user?.id ?? null,
        })
        .select()
        .single()

      if (error) throw error

      try {
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(items.map((item) => ({ ...item, invoice_id: invoice.id })))
        if (itemsError) throw itemsError
      } catch (itemsError) {
        // Don't leave an invoice with no products behind.
        await supabase.from('invoices').delete().eq('id', invoice.id)
        throw itemsError
      }

      return invoice
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.invoices] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.nextInvoiceNo] })
    },
  })
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: InvoiceInput }) => {
      const supabase = getSupabaseBrowserClient()

      await assertInvoiceNoAvailable(input.invoice_no, id)

      const items = buildItems(input, id)
      const netTotal = items.reduce((sum, i) => sum + i.amount, 0)

      const { data: previousRows, error: previousError } = await supabase
        .from('invoice_items')
        .select('id')
        .eq('invoice_id', id)
      if (previousError) throw previousError
      const previousItemIds = (previousRows ?? []).map((item) => item.id as string)

      const { error: updateError } = await supabase
        .from('invoices')
        .update({
          invoice_no: input.invoice_no,
          invoice_date: input.invoice_date,
          customer_name: input.customer_name,
          customer_location: input.customer_location,
          net_total: netTotal,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
      if (updateError) throw updateError

      // Insert replacements before removing the old rows so a failure can't wipe the products.
      const { error: insertError } = await supabase.from('invoice_items').insert(items)
      if (insertError) throw insertError

      if (previousItemIds.length) {
        const { error: deleteError } = await supabase
          .from('invoice_items')
          .delete()
          .in('id', previousItemIds)
        if (deleteError) throw deleteError
      }

      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.invoices] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.invoice, id] })
    },
  })
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.from('invoices').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.invoices] })
    },
  })
}
