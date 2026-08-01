'use client'

import Link from 'next/link'
import { ArrowUpRight, FileText, Plus, Wallet } from 'lucide-react'
import { format } from 'date-fns'
import { PageHeader } from '@/components/shared/layout/page-header'
import { Reveal } from '@/components/shared/layout/reveal'
import { StatsCard } from '@/components/shared/data-display/stats-card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/constants'
import { useGetInvoices } from '@/services/invoices'
import { useGetFinanceEntries } from '@/services/finance'

export function DashboardHome() {
  const { user } = useAuth()
  const { data: invoices = [] } = useGetInvoices()
  const today = format(new Date(), 'yyyy-MM-dd')
  const { data: finance = [] } = useGetFinanceEntries({ from: today, to: today })

  const todayIncome = finance.reduce((sum, entry) => sum + Number(entry.income), 0)
  const todayExpense = finance.reduce((sum, entry) => sum + Number(entry.expense), 0)
  const todaySavings = todayIncome - todayExpense

  return (
    <div className="space-y-8">
      <Reveal>
        <PageHeader
          title={`Welcome${user?.fullName ? `, ${user.fullName}` : ''}`}
          description="Manage invoices and daily finance for Thulir Digital Flex."
        >
          <Button nativeButton={false} render={<Link href={ROUTES.invoices} />}>
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </PageHeader>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Reveal delay={40}>
          <StatsCard
            title="Invoices"
            value={invoices.length}
            icon={FileText}
            variant="primary"
            description="Total saved"
            className="interactive-card"
          />
        </Reveal>
        <Reveal delay={100}>
          <StatsCard
            title="Today Income"
            value={todayIncome.toLocaleString('en-IN')}
            icon={Wallet}
            variant="success"
            className="interactive-card"
          />
        </Reveal>
        <Reveal delay={160}>
          <StatsCard
            title="Today Expense"
            value={todayExpense.toLocaleString('en-IN')}
            icon={Wallet}
            variant="warning"
            className="interactive-card"
          />
        </Reveal>
        <Reveal delay={220}>
          <StatsCard
            title="Today Savings"
            value={todaySavings.toLocaleString('en-IN')}
            icon={Wallet}
            variant="default"
            className="interactive-card"
          />
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal delay={80}>
          <Link
            href={ROUTES.invoices}
            className="interactive-card bg-card group block rounded-2xl border p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="bg-primary/15 text-primary rounded-xl p-3">
                <FileText className="h-6 w-6" />
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
            <h2 className="font-heading mt-5 text-lg font-semibold">Invoices</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Create, edit, print, and share customer bills with product line items.
            </p>
          </Link>
        </Reveal>

        <Reveal delay={140}>
          <Link
            href={ROUTES.finance}
            className="interactive-card bg-card group block rounded-2xl border p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="bg-primary/15 text-primary rounded-xl p-3">
                <Wallet className="h-6 w-6" />
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
            <h2 className="font-heading mt-5 text-lg font-semibold">Finance</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Track expense, income, and savings day by day with a clear ledger view.
            </p>
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
