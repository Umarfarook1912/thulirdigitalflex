'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutDashboard, Users, Wallet } from 'lucide-react'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/utils/cn'

const NAV = [
  { href: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.invoices, label: 'Invoices', icon: FileText },
  { href: ROUTES.finance, label: 'Finance', icon: Wallet },
  { href: ROUTES.staff, label: 'Staff', icon: Users, adminOnly: true },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <aside className="bg-sidebar text-sidebar-foreground no-print flex w-64 shrink-0 flex-col border-r border-sidebar-border">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <Image src={APP_LOGO} alt={BUSINESS_NAME} width={40} height={40} className="rounded-md" />
        <div className="min-w-0">
          <p className="font-heading truncate text-sm font-semibold text-white">THULIR</p>
          <p className="truncate text-xs text-white/50">Digital Flex</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
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
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-white/70 hover:bg-sidebar-accent/60 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

    </aside>
  )
}
