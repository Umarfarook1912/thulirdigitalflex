'use client'

import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function MarketingNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <Image src={APP_LOGO} alt={BUSINESS_NAME} width={44} height={44} className="rounded-md" />
          <span className="font-heading hidden text-sm font-semibold tracking-wide text-white sm:block">
            THULIR
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden text-sm text-white/80 transition hover:text-white sm:inline"
          >
            Contact
          </a>
          <Button nativeButton={false} render={<Link href={ROUTES.login} />} size="sm">
            Staff Login
          </Button>
        </nav>
      </div>
    </header>
  )
}
