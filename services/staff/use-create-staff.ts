'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/lib/constants'
import type { CreateStaffInput } from '@/lib/validations/auth'

export function useCreateStaff() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateStaffInput) => {
      // Not retried on purpose: a repeat POST could create a duplicate account.
      const res = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.message ?? `Failed to create staff (${res.status})`)
      }
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.staff] })
    },
  })
}
