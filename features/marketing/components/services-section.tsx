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
    <section id="services" className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Our services</p>
          <h2 className="font-heading mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Print that makes your business visible
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base">
            From one-off boards to complete shop branding, every job is produced with careful
            finishing and dependable service.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 100}>
                <article className="interactive-card bg-card h-full rounded-2xl border p-7">
                  <div className="bg-primary/15 text-primary flex size-11 items-center justify-center rounded-xl">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
