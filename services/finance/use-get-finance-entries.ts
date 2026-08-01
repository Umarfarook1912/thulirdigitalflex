'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseBrowserClient, hasSupabaseEnv } from '@/lib/supabase/client'
import { QUERY_KEYS, STALE_TIME } from '@/lib/constants'
import type { FinanceEntry, FinanceFilters } from '@/services/finance/finance.types'

export function useGetFinanceEntries(filters: FinanceFilters = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.finance, filters.from ?? null, filters.to ?? null],
    enabled: hasSupabaseEnv(),
    staleTime: STALE_TIME.medium,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      let query = supabase
        .from('finance_entries')
        .select('*')
        .order('entry_date', { ascending: false })
        .order('day_serial', { ascending: true })

      if (filters.from) query = query.gte('entry_date', filters.from)
      if (filters.to) query = query.lte('entry_date', filters.to)

      const { data, error } = await query
      if (error) throw error
      return (data ?? []) as FinanceEntry[]
    },
  })
}
