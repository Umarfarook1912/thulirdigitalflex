import type { Database } from '@/types/supabase.types'

export type StaffProfile = Database['public']['Tables']['profiles']['Row']
