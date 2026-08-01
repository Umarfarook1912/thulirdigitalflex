import { z } from 'zod'

export const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  total_sqft: z.number().min(0).nullable().optional(),
  rate_per_sqft: z.number().min(0, 'Rate per sqft is required'),
  amount: z.number().min(0),
})

export const invoiceSchema = z.object({
  invoice_no: z.number().int().min(1, 'Invoice number is required'),
  invoice_date: z.string().min(1, 'Date is required'),
  customer_name: z.string().min(1, 'Customer name is required'),
  customer_location: z.string().min(1, 'Location is required'),
  items: z.array(invoiceItemSchema).min(1, 'Add at least one product'),
})

export type InvoiceItemInput = z.infer<typeof invoiceItemSchema>
export type InvoiceInput = z.infer<typeof invoiceSchema>

/** Amount = Quantity (Nos) × Rate Per Sqft × Total Sqft (missing sqft counts as 1). */
export function calcLineAmount(
  totalSqft: number | null | undefined,
  ratePerSqft: number,
  quantity: string
): number {
  const rate = Number(ratePerSqft) || 0
  const sqft = Number(totalSqft) > 0 ? Number(totalSqft) : 1
  const qtyNum = parseFloat(String(quantity).replace(/[^\d.]/g, ''))
  const qty = !Number.isNaN(qtyNum) && qtyNum > 0 ? qtyNum : 0

  return Math.round(qty * rate * sqft)
}
