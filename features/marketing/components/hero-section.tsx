'use client'

import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

const HIGHLIGHTS = [
  { label: 'Flex & UV', value: 'Print' },
  { label: 'Local shop', value: 'Dindigul' },
  { label: 'Finish', value: 'Reliable' },
]

export function HeroSection() {
  return (
    <section className="from-brand-dark via-brand-dark relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-br to-[var(--brand-dark)] pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, var(--brand-primary) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--brand-primary) 0%, transparent 35%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 48px, white 48px, white 49px)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-16 sm:pb-20 lg:px-10">
        <Image
          src={APP_LOGO}
          alt={BUSINESS_NAME}
          width={140}
          height={140}
          priority
          className="mb-6 h-auto w-24 animate-[fadeUp_0.8s_ease-out] object-contain shadow-2xl sm:mb-8 sm:w-36"
        />
        <h1 className="font-heading max-w-5xl animate-[fadeUp_0.9s_ease-out] text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {BUSINESS_NAME}
        </h1>
        <p className="mt-5 max-w-xl animate-[fadeUp_1s_ease-out] text-base text-white/75 sm:text-lg">
          Sharp flex, UV print, and signage for shops, boards, events, and outdoor branding —
          produced in Dindigul with care and speed.
        </p>
        <div className="mt-8 flex animate-[fadeUp_1.1s_ease-out] flex-wrap items-center justify-center gap-3">
          <Button nativeButton={false} render={<Link href={ROUTES.login} />} size="lg">
            Staff Login
          </Button>
          <Button
            nativeButton={false}
            render={<a href="#services" />}
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Explore Services
          </Button>
        </div>

        <div className="mt-10 grid w-full max-w-5xl animate-[fadeUp_1.2s_ease-out] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur"
            >
              <p className="text-primary text-sm font-semibold">{item.value}</p>
              <p className="mt-1 text-xs text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
