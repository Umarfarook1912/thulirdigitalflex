'use client'

import { SearchBar } from '@/components/shared/forms/search-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InvoiceFiltersBarProps {
  search: string
  from: string
  to: string
  onSearchChange: (value: string) => void
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  onClear: () => void
  hasFilters: boolean
}

export function InvoiceFiltersBar({
  search,
  from,
  to,
  onSearchChange,
  onFromChange,
  onToChange,
  onClear,
  hasFilters,
}: InvoiceFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search customer, location, or invoice no…"
        className="w-full lg:max-w-sm"
      />
      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-end sm:gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="invoice-from">From</Label>
          <Input
            id="invoice-from"
            type="date"
            className="w-full sm:w-auto"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="invoice-to">To</Label>
          <Input
            id="invoice-to"
            type="date"
            className="w-full sm:w-auto"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
          />
        </div>
      </div>
      {hasFilters && (
        <Button type="button" variant="outline" onClick={onClear} className="w-full sm:w-auto">
          Clear filters
        </Button>
      )}
    </div>
  )
}
