const SERVICES = [
  {
    title: 'Flex & Banner',
    description: 'Outdoor and indoor flex printing sized to your site, cut clean and finished right.',
  },
  {
    title: 'UV & Board Print',
    description: 'Original UV print on boards and rigid media for sharp colour that lasts.',
  },
  {
    title: 'Signage & Fit',
    description: 'Letters, strip lights, and installation support for shop fronts and events.',
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-brand-dark text-3xl font-bold tracking-tight sm:text-4xl">
          What we print
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg text-base">
          From one-off boards to full shop branding — we handle the job end to end.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} className="border-primary border-t-2 pt-6">
              <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
