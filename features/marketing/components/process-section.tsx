import { CheckCircle2, MessageSquareText, Printer } from 'lucide-react'
import { Reveal } from '@/components/shared/layout/reveal'

const STEPS = [
  {
    number: '01',
    title: 'Share your requirement',
    description: 'Tell us the size, material, quantity, and where the print will be used.',
    icon: MessageSquareText,
  },
  {
    number: '02',
    title: 'We prepare & print',
    description: 'We confirm the details, prepare the job, and produce it with sharp output.',
    icon: Printer,
  },
  {
    number: '03',
    title: 'Collect or install',
    description: 'Collect the finished work or coordinate fitting support for your location.',
    icon: CheckCircle2,
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="bg-muted/50 overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="text-center">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">How it works</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple from brief to finish
          </h2>
        </Reveal>

        <div className="relative mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          <div className="border-primary/30 absolute top-8 right-[16%] left-[16%] hidden border-t border-dashed md:block" />
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.number} delay={index * 120}>
                <article className="bg-card relative h-full rounded-2xl border p-7">
                  <div className="bg-primary text-primary-foreground relative z-10 flex size-16 items-center justify-center rounded-2xl shadow-sm">
                    <Icon className="size-6" />
                  </div>
                  <p className="text-primary mt-6 text-xs font-bold tracking-widest">
                    STEP {step.number}
                  </p>
                  <h3 className="font-heading mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {step.description}
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
