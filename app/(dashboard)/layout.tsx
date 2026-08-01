import { DashboardSidebar } from '@/components/shared/layout/dashboard-sidebar'
import { DashboardMobileNav } from '@/components/shared/layout/dashboard-mobile-nav'
import { DashboardNavbar } from '@/components/shared/layout/dashboard-navbar'
import { DashboardScrollLock } from '@/components/shared/layout/dashboard-scroll-lock'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-muted/40 print:block print:h-auto print:max-h-none print:overflow-visible">
      <DashboardScrollLock />
      <div className="hidden h-full md:block">
        <DashboardSidebar />
      </div>
      <DashboardMobileNav />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden print:block print:overflow-visible">
        <DashboardNavbar />
        <main className="page-enter min-h-0 flex-1 overflow-y-auto p-4 md:p-6 print:overflow-visible">
          {children}
        </main>
      </div>
    </div>
  )
}
