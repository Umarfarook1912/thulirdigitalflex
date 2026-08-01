'use client'

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InvoiceItemCard } from '@/features/invoices/components/invoice-item-card'
import { calcLineAmount, type InvoiceInput } from '@/lib/validations/invoice'

export function InvoiceItemsEditor() {
  const { control, register, setValue, getValues } = useFormContext<InvoiceInput>()
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const items = useWatch({ control, name: 'items' })

  function recalc(index: number) {
    const row = getValues(`items.${index}`)
    if (!row) return
    setValue(
      `items.${index}.amount`,
      calcLineAmount(row.total_sqft, Number(row.rate_per_sqft) || 0, row.quantity || ''),
      { shouldValidate: true }
    )
  }

  const netTotal = (items ?? []).reduce((sum, item) => sum + (Number(item.amount) || 0), 0)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold">Products</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            append({
              description: '',
              quantity: '',
              total_sqft: null,
              rate_per_sqft: 0,
              amount: 0,
            })
          }
        >
          <Plus className="h-4 w-4" />
          Add product
        </Button>
      </div>

      <div className="space-y-3 md:hidden">
        {fields.map((field, index) => (
          <InvoiceItemCard
            key={field.id}
            index={index}
            amount={Number(items?.[index]?.amount) || 0}
            itemCount={fields.length}
            register={register}
            onRecalculate={recalc}
            onRemove={remove}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <table className="w-full min-w-[780px] text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 px-2 py-2 text-left font-semibold">Sl.No</th>
              <th className="px-2 py-2 text-left font-semibold">Description</th>
              <th className="w-28 px-2 py-2 text-left font-semibold">Quantity</th>
              <th className="w-28 px-2 py-2 text-left font-semibold">Total Sqft</th>
              <th className="w-32 px-2 py-2 text-left font-semibold">Rate Per Sqft</th>
              <th className="w-28 px-2 py-2 text-right font-semibold">Amount</th>
              <th className="w-10 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="border-t">
                <td className="px-2 py-2 text-center">{index + 1}</td>
                <td className="px-2 py-2">
                  <Input
                    {...register(`items.${index}.description`)}
                    placeholder="e.g. SPECIAL WHITE TILE"
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    {...register(`items.${index}.quantity`)}
                    placeholder="e.g. 4 Nos"
                    onBlur={() => recalc(index)}
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="180"
                    {...register(`items.${index}.total_sqft`, {
                      setValueAs: (v) =>
                        v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v),
                    })}
                    onBlur={() => recalc(index)}
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="55"
                    {...register(`items.${index}.rate_per_sqft`, { valueAsNumber: true })}
                    onBlur={() => recalc(index)}
                  />
                </td>
                <td className="px-2 py-2 text-right font-medium tabular-nums">
                  {(Number(items?.[index]?.amount) || 0).toLocaleString('en-IN')}
                  <input
                    type="hidden"
                    {...register(`items.${index}.amount`, { valueAsNumber: true })}
                  />
                </td>
                <td className="px-2 py-2">
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-right text-base font-bold">
        Net Total: {netTotal.toLocaleString('en-IN')}
      </p>
    </div>
  )
}
