import { MonitorUp, PanelsTopLeft, ScanLine } from 'lucide-react'
import { Reveal } from '@/components/shared/layout/reveal'

const SERVICES = [
  {
    title: 'Flex & Banner',
    description: 'Outdoor and indoor flex printing sized to your site, cut clean and finished right.',
    icon: PanelsTopLeft,
  },
  {
    title: 'UV & Board Print',
    description: 'Original UV print on boards and rigid media for sharp colour that lasts.',
    icon: ScanLine,
  },
  {
    title: 'Signage & Fit',
    description: 'Letters, strip lights, and installation support for shop fronts and events.',
    icon: MonitorUp,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-secondary/70 px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-primary inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase">
                <span className="bg-primary h-px w-5" aria-hidden="true" />
                Product services
              </p>
              <h2 className="font-heading mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Print that makes your business visible
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed sm:text-base">
              From one-off boards to complete shop branding, every job is produced with careful
              finishing and dependable service.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 100}>
                <article className="interactive-card bg-card group flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-7 shadow-[0_4px_20px_-12px_color-mix(in_oklab,var(--foreground)_20%,transparent)]">
                  <div className="bg-primary/12 text-primary flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-heading mt-7 text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="bg-primary/70 mt-8 h-0.5 w-10 origin-left rounded-full transition-all duration-300 group-hover:w-16" />
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
