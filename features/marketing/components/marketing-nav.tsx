'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#why-thulir', label: 'Why Thulir' },
  { href: '#contact', label: 'Contact' },
]

export function MarketingNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const overHero = !scrolled

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300',
        overHero
          ? 'border-white/10 bg-brand-dark/25 text-white shadow-none backdrop-blur-md'
          : 'border-brand-dark/10 bg-background/95 text-brand-dark shadow-sm backdrop-blur-xl'
      )}
    >
      <div className="flex h-18 w-full items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <Image
            src={APP_LOGO}
            alt={BUSINESS_NAME}
            width={48}
            height={48}
            preload
            className="h-auto w-11 object-contain sm:w-12"
          />
          <span className="font-heading text-sm font-bold tracking-wide sm:text-base">
            DIGITAL <span className="text-primary">FLEX</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition',
                overHero
                  ? 'text-white/75 hover:text-primary'
                  : 'text-brand-dark/65 hover:text-primary'
              )}
            >
              {link.label}
            </a>
          ))}
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.login} />}
            size="sm"
            className="ml-2"
          >
            Staff Login
          </Button>
        </nav>

        <Button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          variant="ghost"
          size="icon"
          className={cn('md:hidden', overHero && 'text-white hover:bg-white/10 hover:text-white')}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-brand-dark px-4 py-4 text-white shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button
              nativeButton={false}
              render={<Link href={ROUTES.login} />}
              className="mt-2 w-full"
            >
              Staff Login
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
