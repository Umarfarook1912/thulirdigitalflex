'use client'

import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="from-brand-dark via-brand-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br to-[var(--brand-dark)]">
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

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-16 text-center">
        <Image
          src={APP_LOGO}
          alt={BUSINESS_NAME}
          width={140}
          height={140}
          priority
          className="mb-8 animate-[fadeUp_0.8s_ease-out] rounded-xl shadow-2xl"
        />
        <h1 className="font-heading animate-[fadeUp_0.9s_ease-out] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {BUSINESS_NAME}
        </h1>
        <p className="mt-5 max-w-xl animate-[fadeUp_1s_ease-out] text-base text-white/75 sm:text-lg">
          Sharp flex, UV print, and signage — crafted in Dindigul with care and speed.
        </p>
        <div className="mt-8 flex animate-[fadeUp_1.1s_ease-out] flex-wrap items-center justify-center gap-3">
          <Button nativeButton={false} render={<Link href={ROUTES.login} />} size="lg">
            Staff Login
          </Button>
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
