'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { QUERY_KEYS } from '@/lib/constants'
import type { FinanceEntryInput } from '@/lib/validations/finance'

async function nextDaySerial(entryDate: string) {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('finance_entries')
    .select('day_serial')
    .eq('entry_date', entryDate)
    .order('day_serial', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return (data?.day_serial ?? 0) + 1
}

export function useCreateFinanceEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: FinanceEntryInput) => {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const daySerial = await nextDaySerial(input.entry_date)

      const { data, error } = await supabase
        .from('finance_entries')
        .insert({
          entry_date: input.entry_date,
          day_serial: daySerial,
          customer_name: input.customer_name,
          description: input.description,
          size: input.size || null,
          quantity: input.quantity || null,
          expense: input.expense ?? 0,
          income: input.income ?? 0,
          created_by: user?.id ?? null,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.finance] })
    },
  })
}

export function useUpdateFinanceEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: FinanceEntryInput }) => {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from('finance_entries')
        .update({
          entry_date: input.entry_date,
          customer_name: input.customer_name,
          description: input.description,
          size: input.size || null,
          quantity: input.quantity || null,
          expense: input.expense ?? 0,
          income: input.income ?? 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.finance] })
    },
  })
}

export function useDeleteFinanceEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.from('finance_entries').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.finance] })
    },
  })
}
