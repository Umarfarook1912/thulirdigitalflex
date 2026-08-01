'use client'

import Link from 'next/link'
import { FileText, Plus, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/shared/layout/page-header'
import { StatsCard } from '@/components/shared/data-display/stats-card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/constants'
import { useGetInvoices } from '@/services/invoices'
import { useGetFinanceEntries } from '@/services/finance'
import { format } from 'date-fns'

export function DashboardHome() {
  const { user } = useAuth()
  const { data: invoices = [] } = useGetInvoices()
  const today = format(new Date(), 'yyyy-MM-dd')
  const { data: finance = [] } = useGetFinanceEntries({ from: today, to: today })

  const todayIncome = finance.reduce((s, e) => s + Number(e.income), 0)
  const todayExpense = finance.reduce((s, e) => s + Number(e.expense), 0)

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome${user?.fullName ? `, ${user.fullName}` : ''}`}
        description="Manage invoices and daily finance for Thulir Digital Flex."
      >
        <Button nativeButton={false} render={<Link href={ROUTES.invoices} />}>
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard
          title="Invoices"
          value={invoices.length}
          icon={FileText}
          variant="primary"
          description="Total saved"
        />
        <StatsCard
          title="Today Income"
          value={todayIncome.toLocaleString('en-IN')}
          icon={Wallet}
          variant="success"
        />
        <StatsCard
          title="Today Expense"
          value={todayExpense.toLocaleString('en-IN')}
          icon={Wallet}
          variant="warning"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href={ROUTES.invoices}
          className="bg-card hover:border-primary rounded-xl border p-6 transition"
        >
          <FileText className="text-primary mb-3 h-6 w-6" />
          <h2 className="font-heading text-lg font-semibold">Invoices</h2>
          <p className="text-muted-foreground mt-1 text-sm">Create, edit, and print customer bills.</p>
        </Link>
        <Link
          href={ROUTES.finance}
          className="bg-card hover:border-primary rounded-xl border p-6 transition"
        >
          <Wallet className="text-primary mb-3 h-6 w-6" />
          <h2 className="font-heading text-lg font-semibold">Finance</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Track expense, income, and savings by day.
          </p>
        </Link>
      </div>
    </div>
  )
}
