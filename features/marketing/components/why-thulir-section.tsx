import { Clock3, MapPin, Ruler, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/shared/layout/reveal'

const BENEFITS = [
  {
    title: 'Made to measure',
    description: 'Accurate sizing for each location and use case, without guesswork.',
    icon: Ruler,
  },
  {
    title: 'Clean output',
    description: 'Sharp detail, strong colour, and careful finishing on every job.',
    icon: Sparkles,
  },
  {
    title: 'Prompt service',
    description: 'Clear coordination from requirement to delivery and install.',
    icon: Clock3,
  },
  {
    title: 'Local support',
    description: 'Easy access and hands-on help from our Dindigul print shop.',
    icon: MapPin,
  },
]

export function WhyThulirSection() {
  return (
    <section
      id="why-thulir"
      className="relative overflow-hidden bg-brand-dark px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(circle at 15% 20%, color-mix(in oklab, var(--brand-primary) 16%, transparent) 0%, transparent 55%)',
            'radial-gradient(circle at 85% 80%, color-mix(in oklab, var(--brand-primary) 12%, transparent) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-primary text-[11px] font-bold tracking-[0.28em] uppercase">
            Why partner with us
          </p>
          <h2 className="font-heading mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Why choose Thulir Digital Flex
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
            Practical print solutions with attention to size, material, readability, and finish.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Reveal key={benefit.title} delay={index * 90}>
                <article className="glass-panel group relative flex h-full min-h-56 flex-col overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1.5 hover:border-primary/40">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 12% 12%, color-mix(in oklab, var(--brand-primary) 14%, transparent), transparent 65%)',
                    }}
                  />
                  <div className="bg-primary/15 text-primary relative flex size-14 items-center justify-center rounded-2xl">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="relative mt-6 text-lg font-bold tracking-tight">{benefit.title}</h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-white/60">
                    {benefit.description}
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
