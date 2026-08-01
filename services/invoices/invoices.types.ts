import type { Database } from '@/types/supabase.types'

export type Invoice = Database['public']['Tables']['invoices']['Row']
export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert']
export type InvoiceItem = Database['public']['Tables']['invoice_items']['Row']
export type InvoiceItemInsert = Database['public']['Tables']['invoice_items']['Insert']

export type InvoiceWithItems = Invoice & {
  invoice_items: InvoiceItem[]
}
