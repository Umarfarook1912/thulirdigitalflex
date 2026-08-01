import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, BUSINESS_ADDRESS, BUSINESS_NAME, BUSINESS_PHONES, ROUTES } from '@/lib/constants'

export function MarketingFooter() {
  return (
    <footer className="bg-brand-dark-foreground text-brand-dark border-t border-brand-dark/10 px-4 pt-12 pb-8 sm:px-6 sm:pt-14 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={APP_LOGO}
              alt={BUSINESS_NAME}
              width={40}
              height={40}
              className="h-auto w-10 object-contain"
            />
            <div>
              <p className="font-heading text-sm font-semibold tracking-wide">DIGITAL FLEX</p>
              <p className="text-primary text-xs font-medium">& Printers</p>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
            Flex, UV, boards, and shop signage produced with clean finishing and reliable service
            in Dindigul.
          </p>
        </div>

        <div>
          <p className="text-brand-dark/45 text-xs font-bold tracking-[0.18em] uppercase">Explore</p>
          <div className="text-brand-dark/70 mt-4 flex flex-col gap-2 text-sm">
            <a href="#services" className="transition hover:text-primary">
              Services
            </a>
            <a href="#process" className="transition hover:text-primary">
              Process
            </a>
            <a href="#why-thulir" className="transition hover:text-primary">
              Why Thulir
            </a>
            <a href="#contact" className="transition hover:text-primary">
              Contact
            </a>
            <Link href={ROUTES.login} className="transition hover:text-primary">
              Staff Login
            </Link>
          </div>
        </div>

        <div>
          <p className="text-brand-dark/45 text-xs font-bold tracking-[0.18em] uppercase">
            Reach us
          </p>
          <p className="text-brand-dark/70 mt-4 text-sm leading-relaxed">{BUSINESS_ADDRESS}</p>
          <div className="text-brand-dark/70 mt-3 space-y-1 text-sm">
            {BUSINESS_PHONES.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className="block transition hover:text-primary">
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-brand-dark/45 mx-auto mt-12 flex w-full max-w-[1600px] flex-col gap-2 border-t border-brand-dark/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </p>
        <p>Begambur, Dindigul</p>
      </div>
    </footer>
  )
}
