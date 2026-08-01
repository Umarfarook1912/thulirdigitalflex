export type UserRole = 'Admin' | 'Staff'

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          invoice_no: number
          invoice_date: string
          customer_name: string
          customer_location: string
          net_total: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invoice_no: number
          invoice_date: string
          customer_name: string
          customer_location?: string
          net_total?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invoice_no?: number
          invoice_date?: string
          customer_name?: string
          customer_location?: string
          net_total?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string
          sl_no: number
          description: string
          quantity: string
          total_sqft: number | null
          rate_per_sqft: number
          amount: number
        }
        Insert: {
          id?: string
          invoice_id: string
          sl_no: number
          description: string
          quantity: string
          total_sqft?: number | null
          rate_per_sqft: number
          amount: number
        }
        Update: {
          id?: string
          invoice_id?: string
          sl_no?: number
          description?: string
          quantity?: string
          total_sqft?: number | null
          rate_per_sqft?: number
          amount?: number
        }
      }
      finance_entries: {
        Row: {
          id: string
          entry_date: string
          day_serial: number
          customer_name: string
          description: string
          size: string | null
          quantity: string | null
          expense: number
          income: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          entry_date: string
          day_serial: number
          customer_name: string
          description: string
          size?: string | null
          quantity?: string | null
          expense?: number
          income?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          entry_date?: string
          day_serial?: number
          customer_name?: string
          description?: string
          size?: string | null
          quantity?: string | null
          expense?: number
          income?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      user_role: UserRole
    }
  }
}
