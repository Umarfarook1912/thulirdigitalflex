'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { QUERY_KEYS } from '@/lib/constants'
import type { InvoiceInput } from '@/lib/validations/invoice'
import { calcLineAmount } from '@/lib/validations/invoice'

export function useCreateInvoice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: InvoiceInput) => {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const items = input.items.map((item, index) => {
        const amount = calcLineAmount(item.total_sqft, item.rate_per_sqft, item.quantity)
        return {
          sl_no: index + 1,
          description: item.description,
          quantity: item.quantity,
          total_sqft: item.total_sqft || null,
          rate_per_sqft: item.rate_per_sqft,
          amount,
        }
      })
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

      const { error: itemsError } = await supabase.from('invoice_items').insert(
        items.map((item) => ({ ...item, invoice_id: invoice.id }))
      )
      if (itemsError) throw itemsError

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

      const items = input.items.map((item, index) => {
        const amount = calcLineAmount(item.total_sqft, item.rate_per_sqft, item.quantity)
        return {
          sl_no: index + 1,
          description: item.description,
          quantity: item.quantity,
          total_sqft: item.total_sqft || null,
          rate_per_sqft: item.rate_per_sqft,
          amount,
          invoice_id: id,
        }
      })
      const netTotal = items.reduce((sum, i) => sum + i.amount, 0)

      const { error } = await supabase
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

      if (error) throw error

      const { error: delError } = await supabase.from('invoice_items').delete().eq('invoice_id', id)
      if (delError) throw delError

      const { error: itemsError } = await supabase.from('invoice_items').insert(items)
      if (itemsError) throw itemsError

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
