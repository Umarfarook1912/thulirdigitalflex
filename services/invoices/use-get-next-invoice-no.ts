'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseBrowserClient, hasSupabaseEnv } from '@/lib/supabase/client'
import { QUERY_KEYS, STALE_TIME } from '@/lib/constants'

export function useGetNextInvoiceNo() {
  return useQuery({
    queryKey: [QUERY_KEYS.nextInvoiceNo],
    enabled: hasSupabaseEnv(),
    staleTime: STALE_TIME.short,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('invoices')
        .select('invoice_no')
        .order('invoice_no', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) throw error
      return (data?.invoice_no ?? 0) + 1
    },
  })
}
