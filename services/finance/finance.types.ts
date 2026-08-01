import type { Database } from '@/types/supabase.types'

export type FinanceEntry = Database['public']['Tables']['finance_entries']['Row']
export type FinanceEntryInsert = Database['public']['Tables']['finance_entries']['Insert']

export interface FinanceFilters {
  from?: string
  to?: string
}
