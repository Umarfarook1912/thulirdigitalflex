'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseBrowserClient, hasSupabaseEnv } from '@/lib/supabase/client'
import { QUERY_KEYS, STALE_TIME } from '@/lib/constants'
import type { StaffProfile } from '@/services/staff/staff.types'

export function useGetStaff() {
  return useQuery({
    queryKey: [QUERY_KEYS.staff],
    enabled: hasSupabaseEnv(),
    staleTime: STALE_TIME.medium,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data ?? []) as StaffProfile[]
    },
  })
}
