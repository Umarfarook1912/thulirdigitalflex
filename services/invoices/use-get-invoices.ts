'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseBrowserClient, hasSupabaseEnv } from '@/lib/supabase/client'
import { QUERY_KEYS, STALE_TIME } from '@/lib/constants'
import type { Invoice, InvoiceFilters } from '@/services/invoices/invoices.types'

function escapeIlike(value: string) {
  return value.replace(/[%_,]/g, '\\$&')
}

export function useGetInvoices(filters: InvoiceFilters = {}) {
  const search = filters.search?.trim() ?? ''

  return useQuery({
    queryKey: [QUERY_KEYS.invoices, search || null, filters.from ?? null, filters.to ?? null],
    enabled: hasSupabaseEnv(),
    staleTime: STALE_TIME.medium,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      let query = supabase
        .from('invoices')
        .select('*')
        .order('invoice_no', { ascending: false })

      if (filters.from) query = query.gte('invoice_date', filters.from)
      if (filters.to) query = query.lte('invoice_date', filters.to)

      if (search) {
        const safe = escapeIlike(search)
        const asNumber = Number(search)
        if (Number.isInteger(asNumber) && String(asNumber) === search) {
          query = query.or(
            `invoice_no.eq.${asNumber},customer_name.ilike.%${safe}%,customer_location.ilike.%${safe}%`
          )
        } else {
          query = query.or(
            `customer_name.ilike.%${safe}%,customer_location.ilike.%${safe}%`
          )
        }
      }

      const { data, error } = await query
      if (error) throw error
      return (data ?? []) as Invoice[]
    },
  })
}
