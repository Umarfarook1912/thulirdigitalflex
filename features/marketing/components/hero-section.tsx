'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

const STATS = [
  { value: 'Flex', label: 'Outdoor banners' },
  { value: 'UV', label: 'Board printing' },
  { value: 'Sign', label: 'Shop branding' },
  { value: 'Fit', label: 'Install support' },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label={`${BUSINESS_NAME} hero`}
      className="relative flex min-h-svh flex-col overflow-hidden bg-brand-dark text-white lg:min-h-[860px]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 18% 28%, color-mix(in oklab, var(--brand-primary) 42%, transparent) 0%, transparent 42%), radial-gradient(circle at 82% 70%, color-mix(in oklab, var(--brand-primary) 28%, transparent) 0%, transparent 36%), linear-gradient(135deg, var(--brand-dark) 0%, color-mix(in oklab, var(--brand-dark) 88%, black) 100%)',
          }}
        />
        <div
          className="hero-float absolute -top-24 -left-16 size-[28rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--brand-primary) 70%, transparent), transparent 70%)',
          }}
        />
        <div
          className="hero-float-reverse absolute -right-20 bottom-0 size-[26rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--brand-primary) 55%, transparent), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 56px, white 56px, white 57px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, color-mix(in oklab, var(--brand-dark) 92%, black) 0%, color-mix(in oklab, var(--brand-dark) 68%, transparent) 52%, color-mix(in oklab, var(--brand-dark) 28%, transparent) 100%)',
          }}
        />
      </div>

      <div className="bg-white/10 absolute inset-x-0 top-0 z-20 h-0.5" aria-hidden="true">
        <div className="hero-progress bg-primary h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 pb-8 sm:px-6 sm:pt-32 sm:pb-10 lg:px-10">
        <div className="max-w-3xl">
          <p className="hero-enter text-primary inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] uppercase">
            <span className="bg-primary size-1.5 rounded-full" />
            Dindigul print shop
          </p>

          <h1
            className="hero-enter font-heading mt-5 text-[2.1rem] font-black tracking-tight sm:text-5xl lg:text-[3.5rem]"
            style={{ animationDelay: '120ms', lineHeight: 1.02 }}
          >
            Flex, UV &amp; Signage
            <br />
            that makes your
            <br />
            <span className="text-primary">business stand out</span>
          </h1>

          <p
            className="hero-enter mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            Sharp outdoor flex, durable UV board print, and shop-front branding —
            finished with care and delivered with speed at Thulir Digital Flex.
          </p>

          <div
            className="hero-enter mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row"
            style={{ animationDelay: '360ms' }}
          >
            <Button nativeButton={false} render={<a href="#contact" />} size="lg" className="gap-2">
              Get a Quote
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#services" />}
              variant="outline"
              size="lg"
              className="border-white/35 bg-white/5 text-white backdrop-blur hover:bg-white/10 hover:text-white"
            >
              View Services
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={ROUTES.login} />}
              variant="ghost"
              size="lg"
              className="text-white/80 hover:bg-white/10 hover:text-white sm:hidden"
            >
              Staff Login
            </Button>
          </div>
        </div>

        <div
          className="hero-enter mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-6"
          style={{ animationDelay: '480ms' }}
          aria-label="Key offerings"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="group">
              <p className="text-primary text-2xl font-black tracking-tight sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-white/65 sm:text-sm">{stat.label}</p>
              <div className="bg-primary mt-2 h-0.5 w-10 origin-left scale-x-100 rounded-full opacity-80 transition group-hover:w-14" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
