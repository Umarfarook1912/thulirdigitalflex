import { Phone, MapPin } from 'lucide-react'
import { BUSINESS_ADDRESS, BUSINESS_NAME, BUSINESS_PHONES } from '@/lib/constants'
import { Reveal } from '@/components/shared/layout/reveal'

const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31398.70668303702!2d77.94517636299129!3d10.354808407152012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00abec67823709%3A0xc5d17bc0cf1b3b4d!2sThulir%20Digitalflex!5e0!3m2!1sen!2sin!4v1785607632689!5m2!1sen!2sin'

export function ContactSection() {
  return (
    <section id="contact" className="bg-brand-dark px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Contact</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Visit the shop or call us
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Ready for your next flex, UV, or signage order. Call ahead or drop by.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-[0.8fr_0.8fr_1.4fr]">
          <Reveal delay={80}>
            <div className="interactive-card h-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <div className="bg-primary/15 text-primary flex size-11 items-center justify-center rounded-xl">
                <MapPin className="size-5" />
              </div>
              <p className="text-primary mt-6 text-xs font-semibold tracking-[0.2em] uppercase">
                Address
              </p>
              <p className="mt-3 font-medium">{BUSINESS_NAME}</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
                {BUSINESS_ADDRESS}
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="interactive-card h-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <div className="bg-primary/15 text-primary flex size-11 items-center justify-center rounded-xl">
                <Phone className="size-5" />
              </div>
              <p className="text-primary mt-6 text-xs font-semibold tracking-[0.2em] uppercase">
                Phone
              </p>
              <ul className="mt-3 space-y-2">
                {BUSINESS_PHONES.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone}`}
                      className="text-lg font-medium transition hover:text-primary"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="h-full min-h-80 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={MAP_URL}
                title={`${BUSINESS_NAME} location`}
                className="h-full min-h-80 w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
