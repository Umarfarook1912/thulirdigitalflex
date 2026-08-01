import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/layout/reveal'
import { BUSINESS_PHONES, ROUTES } from '@/lib/constants'

export function CtaSection() {
  const primaryPhone = BUSINESS_PHONES[0]

  return (
    <section className="bg-secondary/60 px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <Reveal>
        <div className="bg-brand-dark relative mx-auto w-full max-w-7xl overflow-hidden rounded-[1.75rem] px-6 py-12 text-white shadow-[0_24px_70px_-28px_color-mix(in_oklab,var(--brand-dark)_75%,transparent)] sm:px-14 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--brand-primary) 35%, transparent), transparent 45%), linear-gradient(105deg, var(--brand-dark) 0%, color-mix(in oklab, var(--brand-dark) 78%, black) 100%)',
            }}
          />
          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <p className="text-primary text-[11px] font-bold tracking-[0.24em] uppercase">
                Ready to print
              </p>
              <h2 className="font-heading mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Need flex, UV, boards, or a full shop front?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                Factory-direct finishing · Local Dindigul support · Clear coordination from quote to
                install
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                nativeButton={false}
                render={<a href={`tel:${primaryPhone}`} />}
                size="lg"
                className="gap-2"
              >
                Call us
                <ArrowRight className="size-4" />
              </Button>
              <Button
                nativeButton={false}
                render={<Link href={ROUTES.login} />}
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Staff Login
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
