import { FileText, LayoutDashboard, Users, Wallet } from 'lucide-react'
import { ROUTES } from '@/lib/constants'

export const DASHBOARD_NAV = [
  { href: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.invoices, label: 'Invoices', icon: FileText },
  { href: ROUTES.finance, label: 'Finance', icon: Wallet },
  { href: ROUTES.staff, label: 'Staff', icon: Users, adminOnly: true },
]
