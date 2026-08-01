import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/layout/reveal'
import { BUSINESS_PHONES, ROUTES } from '@/lib/constants'

export function CtaSection() {
  const primaryPhone = BUSINESS_PHONES[0]

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <Reveal>
        <div className="bg-brand-dark relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl px-6 py-12 text-center text-white sm:px-14 sm:py-14">
          <div className="bg-primary/25 pointer-events-none absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full blur-3xl" />
          <p className="text-primary relative text-xs font-bold tracking-[0.2em] uppercase">
            Ready to print
          </p>
          <h2 className="font-heading relative mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us what you need next
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Call the shop for flex, UV, boards, or signage — or sign in if you are on the team.
          </p>
          <div className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button nativeButton={false} render={<a href={`tel:${primaryPhone}`} />} size="lg">
              Call {primaryPhone}
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={ROUTES.login} />}
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Staff Login
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
