'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutDashboard, Users, Wallet } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/utils/cn'

const NAV = [
  { href: ROUTES.dashboard, label: 'Home', icon: LayoutDashboard },
  { href: ROUTES.invoices, label: 'Invoices', icon: FileText },
  { href: ROUTES.finance, label: 'Finance', icon: Wallet },
  { href: ROUTES.staff, label: 'Staff', icon: Users, adminOnly: true },
]

export function DashboardMobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className="bg-background no-print border-b md:hidden">
      <div className="flex gap-1 overflow-x-auto px-2 py-2">
        {NAV.filter((item) => !item.adminOnly || user?.role === 'Admin').map((item) => {
          const active =
            item.href === ROUTES.dashboard
              ? pathname === item.href
              : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap',
                active ? 'bg-primary/15 text-brand-dark font-medium' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
