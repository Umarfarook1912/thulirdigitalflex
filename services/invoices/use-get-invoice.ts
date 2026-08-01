'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseBrowserClient, hasSupabaseEnv } from '@/lib/supabase/client'
import { QUERY_KEYS, STALE_TIME } from '@/lib/constants'
import type { InvoiceWithItems } from '@/services/invoices/invoices.types'

export function useGetInvoice(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.invoice, id],
    enabled: !!id && hasSupabaseEnv(),
    staleTime: STALE_TIME.short,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('invoices')
        .select('*, invoice_items(*)')
        .eq('id', id!)
        .single()

      if (error) throw error
      const invoice = data as InvoiceWithItems
      invoice.invoice_items = [...(invoice.invoice_items ?? [])].sort((a, b) => a.sl_no - b.sl_no)
      return invoice
    },
  })
}
