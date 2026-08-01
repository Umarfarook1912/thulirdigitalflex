export const APP_NAME = 'Thulir Digital Flex'
export const BUSINESS_NAME = 'THULIR DIGITAL FLEX & PRINTERS'
export const BUSINESS_ADDRESS =
  'No.5 Makka Pallivasal Compound, Gandhiji New Road, Begambur, Dindigul - 1'
export const BUSINESS_PHONES = ['8056510547', '9790449344'] as const
export const APP_LOGO = '/logo.png'
export const INVOICE_FOOTER_NOTE = 'WIRE, THINGS & FITTING CHARGES EXTRA'
export const INVOICE_COURTESY =
  'We will be happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention.'

export const USER_ROLES = ['Admin', 'Staff'] as const

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  authCallback: '/auth/callback',
  dashboard: '/dashboard',
  invoices: '/dashboard/invoices',
  finance: '/dashboard/finance',
  staff: '/dashboard/staff',
} as const

export const QUERY_KEYS = {
  invoices: 'invoices',
  invoice: 'invoice',
  finance: 'finance',
  staff: 'staff',
  dashboardStats: 'dashboard-stats',
  nextInvoiceNo: 'next-invoice-no',
} as const

export const STALE_TIME = {
  short: 30 * 1000,
  medium: 60 * 1000,
  long: 5 * 60 * 1000,
} as const
