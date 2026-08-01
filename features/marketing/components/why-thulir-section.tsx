import { Clock3, MapPin, Ruler, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/shared/layout/reveal'

const BENEFITS = [
  { title: 'Made to measure', description: 'Accurate sizing for each location and use.', icon: Ruler },
  { title: 'Clean output', description: 'Sharp detail, strong colour, and careful finishing.', icon: Sparkles },
  { title: 'Prompt service', description: 'Clear coordination from requirement to delivery.', icon: Clock3 },
  { title: 'Local support', description: 'Easy access from our Dindigul print shop.', icon: MapPin },
]

export function WhyThulirSection() {
  return (
    <section id="why-thulir" className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <div className="bg-brand-dark relative overflow-hidden rounded-3xl p-7 text-white sm:p-12">
            <div className="bg-primary absolute -top-16 -right-16 size-48 rounded-full opacity-20 blur-3xl" />
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              Why Thulir
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Practical print solutions, made with attention.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              We focus on the details that matter: the right size, suitable material, readable
              output, and a finish that presents your business well.
            </p>
            <div className="bg-primary mt-10 h-1 w-16" />
          </div>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Reveal key={benefit.title} delay={index * 90}>
                <div className="group">
                  <Icon className="text-primary size-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-heading mt-4 font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
