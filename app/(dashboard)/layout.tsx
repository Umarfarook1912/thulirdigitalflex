import { DashboardSidebar } from '@/components/shared/layout/dashboard-sidebar'
import { DashboardMobileNav } from '@/components/shared/layout/dashboard-mobile-nav'
import { DashboardNavbar } from '@/components/shared/layout/dashboard-navbar'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="hidden md:flex">
        <DashboardSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar />
        <DashboardMobileNav />
        <main className="page-enter flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
