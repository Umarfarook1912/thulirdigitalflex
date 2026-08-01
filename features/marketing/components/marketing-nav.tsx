'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#why-thulir', label: 'Why Thulir' },
  { href: '#contact', label: 'Contact' },
]

export function MarketingNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-brand-dark-foreground/95 text-brand-dark fixed inset-x-0 top-0 z-40 border-b border-brand-dark/10 shadow-sm backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <Image
            src={APP_LOGO}
            alt={BUSINESS_NAME}
            width={44}
            height={44}
            className="h-auto w-10 object-contain"
          />
          <span className="font-heading text-sm font-bold tracking-wide">
            DIGITAL <span className="text-primary">FLEX</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-dark/65 hover:text-primary text-sm transition"
            >
              {link.label}
            </a>
          ))}
          <Button
            nativeButton={false}
            render={<Link href={ROUTES.login} />}
            size="sm"
            className="bg-brand-dark text-white hover:bg-brand-dark/80"
          >
            Staff Login
          </Button>
        </nav>
        <Button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && (
        <nav className="bg-brand-dark-foreground border-t border-brand-dark/10 px-4 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:bg-brand-dark/5 rounded-lg px-3 py-2.5 text-sm font-medium transition"
              >
                {link.label}
              </a>
            ))}
            <Button
              nativeButton={false}
              render={<Link href={ROUTES.login} />}
              className="mt-2 w-full bg-brand-dark text-white hover:bg-brand-dark/80"
            >
              Staff Login
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
