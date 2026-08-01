import { z } from 'zod'

export const financeEntrySchema = z.object({
  entry_date: z.string().min(1, 'Date is required'),
  customer_name: z.string().min(1, 'Customer name is required'),
  description: z.string().min(1, 'Description is required'),
  size: z.string().optional().nullable(),
  quantity: z.string().optional().nullable(),
  expense: z.number().min(0),
  income: z.number().min(0),
})

export type FinanceEntryInput = z.infer<typeof financeEntrySchema>
