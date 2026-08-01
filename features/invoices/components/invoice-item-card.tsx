import type { UseFormRegister } from 'react-hook-form'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { InvoiceInput } from '@/lib/validations/invoice'

interface InvoiceItemCardProps {
  index: number
  amount: number
  itemCount: number
  register: UseFormRegister<InvoiceInput>
  onRecalculate: (index: number) => void
  onRemove: (index: number) => void
}

export function InvoiceItemCard({
  index,
  amount,
  itemCount,
  register,
  onRecalculate,
  onRemove,
}: InvoiceItemCardProps) {
  return (
    <div className="bg-card space-y-4 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Product {index + 1}</p>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          disabled={itemCount === 1}
          onClick={() => onRemove(index)}
          aria-label={`Remove product ${index + 1}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      <label className="block space-y-1.5 text-sm font-medium">
        <span>Description</span>
        <Input
          {...register(`items.${index}.description`)}
          placeholder="e.g. SPECIAL WHITE TILE"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1.5 text-sm font-medium">
          <span>Quantity</span>
          <Input
            {...register(`items.${index}.quantity`)}
            placeholder="e.g. 4 Nos"
            onBlur={() => onRecalculate(index)}
          />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          <span>Total Sqft</span>
          <Input
            type="number"
            step="0.01"
            min={0}
            placeholder="180"
            {...register(`items.${index}.total_sqft`, {
              setValueAs: (value) =>
                value === '' || value == null || Number.isNaN(Number(value))
                  ? null
                  : Number(value),
            })}
            onBlur={() => onRecalculate(index)}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 items-end gap-3">
        <label className="space-y-1.5 text-sm font-medium">
          <span>Rate / Sqft</span>
          <Input
            type="number"
            step="0.01"
            min={0}
            placeholder="55"
            {...register(`items.${index}.rate_per_sqft`, { valueAsNumber: true })}
            onBlur={() => onRecalculate(index)}
          />
        </label>
        <div className="bg-muted rounded-lg px-3 py-2">
          <p className="text-muted-foreground text-xs">Amount</p>
          <p className="font-semibold tabular-nums">{amount.toLocaleString('en-IN')}</p>
          <input
            type="hidden"
            {...register(`items.${index}.amount`, { valueAsNumber: true })}
          />
        </div>
      </div>
    </div>
  )
}
