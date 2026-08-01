'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { DASHBOARD_NAV } from '@/components/shared/layout/dashboard-nav'
import { useAuth } from '@/hooks/use-auth'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/utils/cn'

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground no-print relative flex h-full shrink-0 flex-col border-r border-sidebar-border transition-all duration-300',
        sidebarCollapsed ? 'w-[60px]' : 'w-[220px]'
      )}
    >
      <div className="flex h-14 items-center gap-3 overflow-hidden border-b border-sidebar-border px-3">
        <Image src={APP_LOGO} alt={BUSINESS_NAME} width={40} height={40} className="object-contain" />
        {!sidebarCollapsed && (
          <p className="font-heading whitespace-nowrap text-sm font-semibold text-sidebar-foreground">
            DIGITAL <span className="text-primary">FLEX</span>
          </p>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2 py-4">
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
              title={sidebarCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                sidebarCollapsed && 'justify-center px-0'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', active && 'text-sidebar-primary')} />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {!sidebarCollapsed && user && (
        <div className="border-t border-sidebar-border p-3">
          <p className="truncate text-xs font-medium">{user.fullName}</p>
          <p className="text-sidebar-foreground/60 truncate text-xs">{user.role}</p>
        </div>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="absolute top-5 -right-3 size-6 rounded-full border-sidebar-border shadow-sm"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
      </Button>
    </aside>
  )
}
