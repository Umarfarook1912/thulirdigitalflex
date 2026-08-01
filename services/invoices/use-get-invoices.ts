'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseBrowserClient, hasSupabaseEnv } from '@/lib/supabase/client'
import { QUERY_KEYS, STALE_TIME } from '@/lib/constants'
import type { Invoice } from '@/services/invoices/invoices.types'

export function useGetInvoices() {
  return useQuery({
    queryKey: [QUERY_KEYS.invoices],
    enabled: hasSupabaseEnv(),
    staleTime: STALE_TIME.medium,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('invoice_no', { ascending: false })

      if (error) throw error
      return (data ?? []) as Invoice[]
    },
  })
}
