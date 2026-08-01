'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { DASHBOARD_NAV } from '@/components/shared/layout/dashboard-nav'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useAuth } from '@/hooks/use-auth'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/utils/cn'

export function DashboardMobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { sidebarMobileOpen, setSidebarMobileOpen } = useUIStore()

  useEffect(() => {
    setSidebarMobileOpen(false)
  }, [pathname, setSidebarMobileOpen])

  return (
    <Sheet open={sidebarMobileOpen} onOpenChange={setSidebarMobileOpen}>
      <SheetContent side="left" className="bg-sidebar text-sidebar-foreground no-print p-0 md:hidden">
        <SheetHeader className="h-14 justify-center border-b border-sidebar-border px-4 py-0">
          <SheetTitle className="flex items-center gap-3 text-sidebar-foreground">
            <Image src={APP_LOGO} alt={BUSINESS_NAME} width={36} height={36} />
            <span className="font-heading text-sm font-semibold">
              DIGITAL <span className="text-primary">FLEX</span>
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">Dashboard navigation</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-3 py-4">
          {DASHBOARD_NAV.filter((item) => !item.adminOnly || user?.role === 'Admin').map((item) => {
          const active =
            item.href === ROUTES.dashboard
              ? pathname === item.href
              : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <Icon className={cn('size-4', active && 'text-sidebar-primary')} />
              {item.label}
            </Link>
          )
        })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
