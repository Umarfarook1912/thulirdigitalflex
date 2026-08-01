import { CheckCircle2 } from 'lucide-react'

const CAPABILITIES = [
  'Custom sizes',
  'Sharp colour',
  'Clean finishing',
  'Local support',
]

export function CapabilitiesStrip() {
  return (
    <section aria-label="Service highlights" className="border-b bg-background px-4 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 sm:grid-cols-4">
        {CAPABILITIES.map((item, index) => (
          <div
            key={item}
            className={[
              'flex items-center justify-center gap-2 px-3 py-5 text-center text-xs font-semibold sm:py-6 sm:text-sm',
              index === 0 ? 'border-r border-b sm:border-b-0' : '',
              index === 1 ? 'border-b sm:border-r sm:border-b-0' : '',
              index === 2 ? 'border-r' : '',
            ].join(' ')}
          >
            <CheckCircle2 className="size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
