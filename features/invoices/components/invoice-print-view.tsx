import Image from 'next/image'
import {
  APP_LOGO,
  BUSINESS_ADDRESS,
  BUSINESS_NAME,
  BUSINESS_PHONES,
  INVOICE_COURTESY,
  INVOICE_FOOTER_NOTE,
} from '@/lib/constants'
import type { InvoiceWithItems } from '@/services/invoices'
import { format, parseISO } from 'date-fns'

interface InvoicePrintViewProps {
  invoice: InvoiceWithItems
}

export function InvoicePrintView({ invoice }: InvoicePrintViewProps) {
  const dateLabel = format(parseISO(invoice.invoice_date), 'dd.MM.yyyy')

  return (
    <article className="invoice-sheet border-border text-brand-dark mx-auto max-w-3xl overflow-hidden border bg-white shadow-sm print:shadow-none">
      <div className="flex h-2">
        <div className="bg-primary w-1/3" />
        <div className="bg-brand-dark flex-1" />
      </div>

      <div className="invoice-content flex min-h-[1086px] flex-col p-8 print:p-5">
        <header className="flex items-start justify-between gap-8">
          <div className="flex min-w-0 items-center gap-5">
            <Image
              src={APP_LOGO}
              alt="Thulir"
              width={104}
              height={59}
              className="h-auto w-24 shrink-0 object-contain"
            />
            <div className="border-border border-l pl-5">
              <h1 className="text-lg font-bold tracking-[0.08em] uppercase">
                Digital Flex &amp; Printers
              </h1>
              <p className="text-muted-foreground mt-2 max-w-sm text-xs leading-relaxed">
                {BUSINESS_ADDRESS}
              </p>
              <p className="mt-1 text-xs font-medium">{BUSINESS_PHONES.join('  •  ')}</p>
            </div>
          </div>

          <div className="min-w-40 shrink-0 text-right">
            <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Tax Invoice
            </p>
            <p className="mt-1 text-3xl font-light tracking-[0.12em]">INVOICE</p>
            <div className="border-primary mt-3 ml-auto w-12 border-t-2" />
          </div>
        </header>

        <section className="border-border mt-7 grid grid-cols-[1fr_auto] gap-8 border-y py-4">
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
              Bill To
            </p>
            <p className="mt-2 text-base font-bold uppercase">{invoice.customer_name}</p>
            <p className="text-muted-foreground mt-0.5 text-sm font-medium uppercase">
              {invoice.customer_location}
            </p>
          </div>
          <dl className="grid grid-cols-[auto_auto] content-start gap-x-5 gap-y-1 text-xs">
            <dt className="text-muted-foreground text-right">Invoice number</dt>
            <dd className="font-bold">{invoice.invoice_no}</dd>
            <dt className="text-muted-foreground text-right">Invoice date</dt>
            <dd className="font-bold">{dateLabel}</dd>
          </dl>
        </section>

        <div className="mt-6">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="border-brand-dark bg-brand-dark border-y text-white">
                <th className="w-12 border border-black px-3 py-3 text-left font-semibold">#</th>
                <th className="border border-black px-3 py-3 text-left font-semibold">
                  Description
                </th>
                <th className="border border-black px-3 py-3 text-left font-semibold">Quantity</th>
                <th className="border border-black px-3 py-3 text-right font-semibold">
                  Total Sqft
                </th>
                <th className="border border-black px-3 py-3 text-right font-semibold">
                  Rate / Sqft
                </th>
                <th className="border border-black px-3 py-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.invoice_items.map((item) => (
                <tr key={item.id}>
                  <td className="text-muted-foreground border border-black px-3 py-3">
                    {item.sl_no}
                  </td>
                  <td className="border border-black px-3 py-3 font-semibold uppercase">
                    {item.description}
                  </td>
                  <td className="border border-black px-3 py-3">{item.quantity}</td>
                  <td className="border border-black px-3 py-3 text-right">
                    {item.total_sqft != null
                      ? Number(item.total_sqft).toLocaleString('en-IN')
                      : '—'}
                  </td>
                  <td className="border border-black px-3 py-3 text-right">
                    {Number(item.rate_per_sqft).toLocaleString('en-IN')}
                  </td>
                  <td className="border border-black px-3 py-3 text-right font-semibold">
                    {Number(item.amount).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div className="mt-auto pt-10">
          <div className="flex justify-end">
            <div className="border-brand-dark w-64 border-y py-3">
              <div className="flex items-center justify-between gap-6 px-2">
                <span className="text-sm font-semibold">Net Total</span>
                <span className="text-xl font-bold">
                  {Number(invoice.net_total).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <section className="bg-accent/50 border-primary mt-5 border-l-2 px-4 py-3 text-center">
            <p className="text-xs font-bold tracking-wide">{INVOICE_FOOTER_NOTE}</p>
            <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed">
              {INVOICE_COURTESY}
            </p>
          </section>

          <footer className="flex items-end justify-between pt-16 text-xs">
            <div>
              <div className="border-border mb-2 w-36 border-b" />
              <p>Signature</p>
            </div>
            <div className="text-right">
              <p className="font-bold">For {BUSINESS_NAME}</p>
              <p className="text-muted-foreground mt-10">Authorized Signatory</p>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
